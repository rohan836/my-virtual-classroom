import { readFile, readdir } from 'node:fs/promises';
import { join } from 'node:path';

export const STAGES = ['published', 'testing'];
export const SUBJECTS = ['electronics', 'artificial-intelligence'];

export const SUBJECT_META = {
  electronics: {
    slug: 'electronics',
    label: '/electronics',
    title: 'Electronics & Robotics',
    headlineMain: 'Electronics',
    headlineSub: 'components, cutaways & circuits',
    subtitle: "3d components, cutaways, live ohm's law & working circuits",
    description:
      'Explore 3D electronic parts, inspect internal cutaways, and test live current, voltage, and switching circuits.',
    curriculum: 'Grades 5–9 Atal Tinkering Lab (ATL) hands-on electronics & robotics studies.',
    accentClass: 'section-slug--electronics',
    dotColor: 'red',
  },
  'artificial-intelligence': {
    slug: 'artificial-intelligence',
    label: '/artificial-intelligence',
    title: 'Artificial Intelligence & Python',
    headlineMain: 'Artificial Intelligence',
    headlineSub: 'rules, data & neural vision',
    subtitle: 'fixed rules, machine learning, neural vision & live python code',
    description:
      'Compare fixed rules against learning from data, bend decision boundaries, inspect pixels, and read clean Python.',
    curriculum: 'Grades 5–9 Atal Tinkering Lab (ATL) AI literacy & beginner Python studies.',
    accentClass: 'section-slug--ai',
    dotColor: 'blue',
  },
};

const ACRONYMS = new Set([
  'ai', 'ml', 'atl', 'led', 'dc', 'ac', 'rc', 'rlc', 'ic', 'rgb',
  'ldr', 'ir', 'pwm', 'npn', 'pnp', 'mosfet', 'bjt', 'io', 'cpu', 'gpu', 'upi',
]);

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function isValidSlug(slug) {
  return typeof slug === 'string' && SLUG_PATTERN.test(slug);
}

export function formatSlugTitle(slug) {
  return slug
    .split('-')
    .filter(Boolean)
    .map((word) => {
      if (ACRONYMS.has(word.toLowerCase())) return word.toUpperCase();
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(' ');
}

export function decodeHtmlEntities(str) {
  if (!str) return '';
  return str
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&times;/g, '×')
    .replace(/&rarr;/g, '→')
    .replace(/&larr;/g, '←')
    .replace(/&middot;/g, '·')
    .replace(/&ndash;/g, '–')
    .replace(/&mdash;/g, '—')
    .replace(/&plusmn;/g, '±')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function escapeHtml(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function stripTags(html) {
  return decodeHtmlEntities(html.replace(/<[^>]+>/g, ' '));
}

export function extractLabMetadata(html, slug) {
  const fallbackTitle = formatSlugTitle(slug);
  if (!html || typeof html !== 'string') {
    return {
      title: fallbackTitle,
      description: 'Interactive hands-on virtual classroom lab.',
      formula: 'interactive simulation',
      figureCount: 1,
    };
  }

  let title = fallbackTitle;
  const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  if (titleMatch) {
    const raw = stripTags(titleMatch[1]);
    const cleaned = raw.replace(/^\/[a-z\s-]+\s*[—–-]\s*/i, '').trim();
    if (cleaned) title = cleaned;
  }

  let description = '';
  const metaDesc = html.match(/<meta\s+[^>]*name=["']description["'][^>]*content=["']([^"']+)["'][^>]*>/i)
    || html.match(/<meta\s+[^>]*content=["']([^"']+)["'][^>]*name=["']description["'][^>]*>/i);
  if (metaDesc) {
    description = decodeHtmlEntities(metaDesc[1]);
  }
  if (!description) {
    const introTag = html.match(/<p[^>]*id=["'](?:editorial-intro|ed-intro)["'][^>]*>([\s\S]*?)<\/p>/i);
    if (introTag && stripTags(introTag[1])) {
      description = stripTags(introTag[1]);
    }
  }
  if (!description) {
    const jsIntro = html.match(/\bintro\s*:\s*['"`]((?:\\.|[^'"`]){20,360})['"`]/);
    if (jsIntro) {
      description = jsIntro[1].replace(/\\'/g, "'").replace(/\\"/g, '"').trim();
    }
  }
  if (!description) {
    description = 'Interactive classroom simulation with live controls and visual inspection.';
  }

  let formula = '';
  const metaFormula = html.match(/<meta\s+[^>]*name=["']lab-formula["'][^>]*content=["']([^"']+)["'][^>]*>/i)
    || html.match(/<meta\s+[^>]*content=["']([^"']+)["'][^>]*name=["']lab-formula["'][^>]*>/i);
  if (metaFormula) {
    formula = decodeHtmlEntities(metaFormula[1]);
  }
  if (!formula) {
    const eqTag = html.match(/<[^>]*id=["'](?:nav-equation|nav-formula)["'][^>]*>([\s\S]*?)<\/[^>]+>/i);
    if (eqTag) {
      formula = stripTags(eqTag[1]);
    }
  }
  if (!formula) {
    formula = 'interactive model · live inspection';
  }

  const figMatches = new Set();
  const figRegex = /\bfig\.\s*0?(\d{1,2})\b/gi;
  let m;
  while ((m = figRegex.exec(html)) !== null) {
    figMatches.add(Number(m[1]));
  }
  const figureCount = Math.max(1, figMatches.size);

  return { title, description, formula, figureCount };
}

export async function discoverActivities(rootDir, subject) {
  const activities = [];
  const seenSlugs = new Set();

  for (const stage of STAGES) {
    const stageDir = join(rootDir, stage, subject);
    let entries;
    try {
      entries = await readdir(stageDir, { withFileTypes: true });
    } catch (err) {
      if (err && err.code === 'ENOENT') continue;
      throw err;
    }

    const sorted = entries.sort((a, b) =>
      a.name.replace(/\.html$/i, '').localeCompare(b.name.replace(/\.html$/i, ''), 'en')
    );

    for (const entry of sorted) {
      if (entry.name.startsWith('.')) continue;

      if (entry.isFile() && entry.name.toLowerCase().endsWith('.html')) {
        const slug = entry.name.slice(0, -5);
        if (slug === 'index') continue;
        if (!isValidSlug(slug)) {
          throw new Error(`Use a lowercase, hyphen-separated activity filename: ${join(stageDir, entry.name)}`);
        }
        if (seenSlugs.has(slug)) continue;
        seenSlugs.add(slug);

        const sourcePath = join(stageDir, entry.name);
        const html = await readFile(sourcePath, 'utf8');
        const meta = extractLabMetadata(html, slug);
        activities.push({
          subject,
          slug,
          fileName: entry.name,
          kind: 'file',
          sourcePath,
          href: `./${subject}/${entry.name}`,
          subjectHref: `./${entry.name}`,
          ...meta,
        });
      } else if (entry.isDirectory()) {
        const activityDir = join(stageDir, entry.name);
        const files = await readdir(activityDir, { withFileTypes: true });
        if (!files.some((f) => f.name === 'index.html' && f.isFile())) continue;
        if (!isValidSlug(entry.name)) {
          throw new Error(`Use a lowercase, hyphen-separated activity folder name: ${activityDir}`);
        }
        if (seenSlugs.has(entry.name)) continue;
        seenSlugs.add(entry.name);

        const html = await readFile(join(activityDir, 'index.html'), 'utf8');
        const meta = extractLabMetadata(html, entry.name);
        activities.push({
          subject,
          slug: entry.name,
          fileName: `${entry.name}/`,
          kind: 'directory',
          sourcePath: activityDir,
          href: `./${subject}/${entry.name}/`,
          subjectHref: `./${entry.name}/`,
          ...meta,
        });
      }
    }
  }

  return activities;
}

const SUBJECT_ROADMAP = {
  electronics: [
    { slug: 'ohms-law', title: "Ohm's Law", desc: 'Voltage, current, and resistance connected in one linear graph. Slide voltage and watch current respond.', formula: 'V = I × R · live I-V slope' },
    { slug: 'led-and-diode', title: 'LED & Diode Polarity', desc: 'One-way valve for electric charge. Test forward voltage drop and reverse-bias blocking.', formula: 'Vf ≈ 2.0 V · anode vs cathode' },
    { slug: 'series-circuits', title: 'Series Circuits', desc: 'One single loop where the same current passes every component while voltage divides across parts.', formula: 'R_total = R₁ + R₂ · constant I' },
    { slug: 'parallel-circuits', title: 'Parallel Branches', desc: 'Separate branches share the same voltage while current splits between paths.', formula: '1/R = 1/R₁ + 1/R₂ · node currents' },
    { slug: 'voltage-divider', title: 'Voltage Divider', desc: 'Two resistors in series step a battery voltage down to any target reference.', formula: 'Vout = Vin · R₂/(R₁ + R₂)' },
    { slug: 'potentiometer', title: 'Potentiometer', desc: 'A sliding wiper along a resistive track turns rotary motion into a variable voltage.', formula: '0 → 10 kΩ · variable divider' },
    { slug: 'capacitor', title: 'Capacitor Charging', desc: 'Two metal plates store electric charge and release it exponentially through a resistor.', formula: 'Q = C × V · τ = RC time curve' },
    { slug: 'breadboard', title: 'Breadboard Wiring', desc: 'See inside the hidden spring clips connecting terminal strips and power rails.', formula: '5-hole rows · ± bus rails' },
    { slug: 'pushbutton-pullup', title: 'Pushbutton & Pull-Up', desc: 'Why floating digital pins misfire and how a pull-up resistor anchors HIGH and LOW.', formula: '10 kΩ pull-up · 0 V vs 5 V' },
    { slug: 'ldr-light-sensor', title: 'LDR Light Sensor', desc: 'Cadmium-sulfide track drops resistance as photons strike it, triggering an automatic night lamp.', formula: 'lux → R_LDR · dark detector' },
    { slug: 'thermistor', title: 'Thermistor & Heat', desc: 'Temperature changes resistance inside a semiconductor bead to build a digital thermometer.', formula: 'NTC curve · R drops as T rises' },
    { slug: 'piezo-buzzer', title: 'Piezo Buzzer & Tone', desc: 'Rapid square-wave pulses flex a piezoelectric disc to create musical frequencies.', formula: 'f = 1/T · Hz pitch control' },
    { slug: 'relay-switch', title: 'Electromagnetic Relay', desc: 'A tiny 5 V coil pulls an iron armature to switch a separate high-current circuit.', formula: 'coil + armature · isolated load' },
    { slug: 'dc-motor', title: 'DC Motor & Back-EMF', desc: 'Current in a magnetic field spins a commutator coil; spinning faster generates opposing voltage.', formula: 'F = IL × B · speed vs torque' },
    { slug: 'h-bridge', title: 'H-Bridge Motor Control', desc: 'Four switches arranged in an H reverse motor direction cleanly for robot wheels.', formula: 'forward / reverse / brake' },
    { slug: 'servo-pwm', title: 'Servo Motor & PWM', desc: 'Pulse width tells an internal feedback loop whether to hold 0°, 90°, or 180°.', formula: '1–2 ms pulse · 50 Hz frame' },
    { slug: 'ultrasonic-sensor', title: 'Ultrasonic Rangefinder', desc: 'Measure echo flight time of a 40 kHz sound burst to compute obstacle distance.', formula: 'd = (v_sound × t) / 2' },
  ],
  'artificial-intelligence': [
    { slug: 'rules-vs-learning', title: 'Rules vs Learning', desc: 'Compare hand-written if-else recipes against models that discover patterns directly from examples.', formula: 'if-else rules vs fitted model' },
    { slug: 'features-and-labels', title: 'Features & Labels', desc: 'Turn messy real-world objects into measurable numbers so a computer can compare them.', formula: 'x = [color, size] → y' },
    { slug: 'training-data', title: 'Training Data Quality', desc: 'Watch how noisy, missing, or unbalanced examples warp what an AI system learns.', formula: 'clean vs noisy samples' },
    { slug: 'decision-boundary', title: 'Decision Boundary', desc: 'Drag points on a 2D plane and watch the dividing line tilt and shift to separate classes.', formula: 'w₁x₁ + w₂x₂ + b = 0' },
    { slug: 'nearest-neighbors', title: 'Nearest Neighbors (k-NN)', desc: 'Classify an unknown point by asking its k closest labeled neighbors in feature space.', formula: 'd = √(Δx² + Δy²) · k votes' },
    { slug: 'linear-regression', title: 'Line of Best Fit', desc: 'Minimize squared vertical errors step by step until a line predicts continuous values.', formula: 'y = mx + c · MSE loss' },
    { slug: 'gradient-descent', title: 'Gradient Descent', desc: 'Roll downhill on an error bowl by adjusting weights in small controlled learning-rate steps.', formula: 'w ← w − η · ∂L/∂w' },
    { slug: 'overfitting', title: 'Overfitting vs Generalizing', desc: 'Memorizing every training dot fails on unseen test points; simpler curves generalize better.', formula: 'train vs test accuracy' },
    { slug: 'decision-trees', title: 'Decision Trees', desc: 'Split data with a series of crisp yes/no feature questions from root to leaf.', formula: 'entropy / impurity split' },
    { slug: 'perceptron', title: 'The Single Neuron', desc: 'Multiply inputs by weights, sum them with a bias, and pass through an activation threshold.', formula: 'y = σ(Σ wᵢxᵢ + b)' },
    { slug: 'neural-layers', title: 'Hidden Neural Layers', desc: 'Stack simple neurons together so straight lines combine into curved regions.', formula: 'input → hidden → output' },
    { slug: 'pixels-and-vision', title: 'Pixels & Computer Vision', desc: 'Zoom into an image until it turns into a grid of 0–255 brightness numbers.', formula: '28×28 matrix → edge score' },
    { slug: 'convolution-filters', title: 'Edge Filters (Kernels)', desc: 'Slide a 3×3 number grid across an image to highlight horizontal and vertical edges.', formula: 'Σ kernel × patch · feature map' },
    { slug: 'sound-and-spectrum', title: 'Sound & Spectrograms', desc: 'Break spoken words into pitch frequencies over time so models can recognize speech.', formula: 'waveform → frequency bins' },
    { slug: 'tokens-and-text', title: 'Words, Tokens & Embeddings', desc: 'Map words into coordinates where similar meanings sit close together in space.', formula: 'token → vector similarity' },
    { slug: 'next-word-prediction', title: 'Next-Token Probability', desc: 'See how language models score candidate next words and sample with temperature.', formula: 'P(word | context) · softmax' },
    { slug: 'python-and-ai', title: 'Python & AI Code', desc: 'Trace real variables, lists, and threshold functions running a classroom classifier step by step.', formula: 'def predict(x): return y' },
    { slug: 'ai-safety-and-bias', title: 'Bias, Limits & Safety', desc: 'Test when models fail outside their training experience and how humans stay in control.', formula: 'audit · fairness · human check' },
  ],
};

export function renderActivityCards(activities, subject, includeRoadmap = false) {
  const isAi = subject === 'artificial-intelligence';

  if (!activities.length) {
    return `<div class="study-empty" data-empty-subject="${escapeHtml(subject)}">
      <div class="study-empty-k">coming soon</div>
      <p>No interactive labs have been added to this subject yet.</p>
    </div>`;
  }

  const cards = activities.map((item, idx) => {
    const num = String(idx + 1);
    const figLabel = `fig. ${String(idx + 1).padStart(2, '0')}`;
    const figsNote = item.figureCount > 1 ? `${item.figureCount} studies inside` : 'interactive lab';
    const href = item.subjectHref || `./${item.fileName || `${item.slug}.html`}`;

    return `<a class="study-card" href="${escapeHtml(href)}" data-subject="${escapeHtml(subject)}">
      <div class="card-top">
        <span class="card-id"><span class="card-num${isAi ? ' card-num--blue' : ''}">[${num}]</span> /${escapeHtml(item.slug)}</span>
        <span class="card-fig">${figLabel}</span>
      </div>
      <h3 class="card-title">${escapeHtml(item.title)}</h3>
      <p class="card-desc">${escapeHtml(item.description)}</p>
      <div class="card-formula">${escapeHtml(item.formula)} &middot; ${escapeHtml(figsNote)}</div>
    </a>`;
  });

  if (includeRoadmap) {
    const usedSlugs = new Set(activities.map((a) => a.slug));
    const extras = (SUBJECT_ROADMAP[subject] || []).filter((r) => !usedSlugs.has(r.slug));
    const remaining = Math.max(0, 19 - cards.length);
    extras.slice(0, remaining).forEach((item) => {
      const idx = cards.length;
      const num = String(idx + 1);
      const figLabel = `fig. ${String(idx + 1).padStart(2, '0')}`;
      cards.push(`<div class="study-card study-card--planned" aria-disabled="true" data-subject="${escapeHtml(subject)}">
        <div class="card-top">
          <span class="card-id"><span class="card-num">[${num}]</span> /${escapeHtml(item.slug)}</span>
          <span class="card-fig">${figLabel} &middot; upcoming</span>
        </div>
        <h3 class="card-title">${escapeHtml(item.title)}</h3>
        <p class="card-desc">${escapeHtml(item.desc)}</p>
        <div class="card-formula">${escapeHtml(item.formula)}</div>
      </div>`);
    });
  }

  // Mark last-row items so flush hairline borders match field-studies.ai.studio
  const total = cards.length;
  const lastRowCount = total % 3 === 0 ? 3 : total % 3;
  for (let i = Math.max(0, total - lastRowCount); i < total; i++) {
    cards[i] = cards[i].replace('class="study-card', 'class="study-card study-card--last-row');
  }

  return `<div class="study-grid" data-grid-subject="${escapeHtml(subject)}">\n${cards.join('\n')}\n</div>`;
}

function summarizeCount(count) {
  return `${count} ${count === 1 ? 'study' : 'studies'}`;
}

export function renderHomepage(templateHtml, catalogBySubject) {
  const electronics = catalogBySubject['electronics'] || [];
  const ai = catalogBySubject['artificial-intelligence'] || [];
  const all = [...electronics, ...ai];

  const firstLab = all[0];
  const firstLabLink = firstLab
    ? `<a class="nav-cta" href="${escapeHtml(firstLab.href)}">start at fig. 01 &rarr;</a>`
    : `<span class="nav-cta nav-cta--muted">no labs yet</span>`;

  const portalCards = SUBJECTS.map((subject, idx) => {
    const meta = SUBJECT_META[subject];
    const items = catalogBySubject[subject] || [];
    const num = String(idx + 1).padStart(2, '0');
    const isAi = subject === 'artificial-intelligence';
    const countLabel = summarizeCount(items.length);

    const previewItems = items.length
      ? items.slice(0, 4).map((item, i) => {
          const figNum = String(i + 1).padStart(2, '0');
          return `<li class="portal-preview-item"><span>${escapeHtml(item.title)}</span><span class="portal-preview-fig">fig. ${figNum}</span></li>`;
        }).join('\n')
      : `<li class="portal-preview-item"><span>No labs published yet</span><span class="portal-preview-fig">&mdash;</span></li>`;

    return `<a class="portal-card portal-card--${isAi ? 'ai' : 'electronics'}" href="./${escapeHtml(subject)}/" data-subject-portal="${escapeHtml(subject)}">
      <div class="portal-top">
        <span class="portal-tag"><span class="${isAi ? 'portal-num--blue' : 'portal-num--red'}">[${num}]</span> ${escapeHtml(meta.label)}</span>
        <span class="portal-count">${escapeHtml(countLabel)}</span>
      </div>
      <h3 class="portal-title">
        <span class="portal-title-main">${escapeHtml(meta.title)}</span>
        <span class="portal-title-sub">${escapeHtml(meta.headlineSub)}</span>
      </h3>
      <p class="portal-desc">${escapeHtml(meta.description)}</p>
      <ul class="portal-preview">
        ${previewItems}
      </ul>
      <div class="portal-foot">
        <span class="portal-cta">open ${isAi ? 'artificial intelligence' : 'electronics'} page &rarr;</span>
      </div>
    </a>`;
  }).join('\n');

  const portalsHtml = `<div class="portal-grid">\n${portalCards}\n</div>`;

  return templateHtml
    .replace('<!-- subjects:portal -->', portalsHtml)
    .replace(/<!-- meta:study-count -->/g, escapeHtml(summarizeCount(all.length)))
    .replace('<!-- meta:first-lab-link -->', firstLabLink);
}

function extractSharedStyles(templateHtml) {
  const styleMatch = templateHtml.match(/<style>([\s\S]*?)<\/style>/i);
  return styleMatch ? styleMatch[1] : '';
}

function extractSharedScripts(templateHtml) {
  const scriptMatch = templateHtml.match(/<script>([\s\S]*?)<\/script>/i);
  return scriptMatch ? scriptMatch[1] : '';
}

export function renderSubjectPage(templateHtml, subject, activities) {
  const meta = SUBJECT_META[subject];
  const otherSubject = subject === 'electronics' ? 'artificial-intelligence' : 'electronics';
  const otherMeta = SUBJECT_META[otherSubject];
  const isAi = subject === 'artificial-intelligence';
  const totalStudies = activities.length > 0 ? Math.max(activities.length, 19) : 0;
  const countLabel = summarizeCount(totalStudies);
  const firstLab = activities[0];
  const firstLabHref = firstLab ? (firstLab.subjectHref || `./${firstLab.fileName}`) : null;
  const styles = extractSharedStyles(templateHtml);
  const scripts = extractSharedScripts(templateHtml);

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${escapeHtml(meta.title)} — My Virtual Classroom</title>
  <meta name="description" content="${escapeHtml(meta.description)}" />
  <meta property="og:title" content="${escapeHtml(meta.title)} — My Virtual Classroom" />
  <meta property="og:description" content="${escapeHtml(meta.description)}" />
  <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🍎</text></svg>" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:ital,wght@0,400;0,500;1,400&family=IBM+Plex+Sans:wght@300;400;500&display=swap" rel="stylesheet" />
  <style>${styles}</style>
</head>
<body>
  <div id="tiny-dot-cursor" aria-hidden="true"></div>
  <header class="topbar" data-field-nav>
    <div class="topbar-left">
      <a class="topbar-cell topbar-brand" href="./">${escapeHtml(meta.label)}</a>
      <div class="topbar-cell hide-sm">${escapeHtml(countLabel)}</div>
      <div class="topbar-cell hide-sm">${escapeHtml(meta.subtitle)}</div>
    </div>
    <div class="topbar-right">
      <a class="topbar-cell topbar-link hide-sm" href="../">/virtual classroom</a>
      <a class="topbar-cell topbar-link hide-sm" href="../${escapeHtml(otherSubject)}/">${escapeHtml(otherMeta.label)} &rarr;</a>
      ${firstLabHref ? `<a class="nav-cta" href="${escapeHtml(firstLabHref)}">start at fig. 01 &rarr;</a>` : ''}
    </div>
  </header>

  <main>
    <section class="hero" aria-label="Subject Overview">
      <div class="hero-main">
        <div>
          <div class="hero-kicker">/virtual classroom &middot; ${escapeHtml(meta.label)}</div>
          <h1 class="hero-title">
            ${escapeHtml(meta.headlineMain)}
            <span class="hero-title-sub">${escapeHtml(meta.headlineSub)}</span>
          </h1>
          <p class="hero-para">${escapeHtml(meta.description)}</p>
          <p class="hero-para">${escapeHtml(meta.curriculum)}</p>
          <div class="hero-links">
            <a class="hero-inline-link" href="../">&larr; main portal</a>
            <a class="hero-inline-link" href="../${escapeHtml(otherSubject)}/">switch to ${escapeHtml(otherMeta.label)} &rarr;</a>
          </div>
        </div>
        <canvas class="hero-cat-canvas" id="hero-cat-canvas" aria-label="Interactive pixel cat chasing particle"></canvas>
        <span class="hero-cat-hint" id="hero-cat-hint">drag the yarn away</span>
      </div>

      <aside class="hero-specs" aria-label="Subject Details">
        <div class="spec-cell">
          <h2 class="spec-heading">/curriculum</h2>
          <div>${escapeHtml(meta.curriculum)}</div>
        </div>
        <div class="spec-cell">
          <h2 class="spec-heading">/keys</h2>
          <ul class="spec-list">
            <li class="spec-kv"><span class="spec-k">&larr; &rarr;</span><span>previous / next figure</span></li>
            <li class="spec-kv"><span class="spec-k">/</span><span>return to index</span></li>
          </ul>
        </div>
        <div class="spec-cell">
          <h2 class="spec-heading">/controls</h2>
          <ul class="spec-list">
            <li class="spec-kv"><span class="spec-k">drag</span><span>orbit 3d &amp; move parts</span></li>
            <li class="spec-kv"><span class="spec-k">click</span><span>inspect parts, wires &amp; code</span></li>
          </ul>
        </div>
        <div class="spec-cell">
          <h2 class="spec-heading">/separate website</h2>
          <div class="spec-subject-links">
            <a class="spec-subject-link" href="../${escapeHtml(otherSubject)}/">
              <span>${escapeHtml(otherMeta.label)}</span>
              <span>open &rarr;</span>
            </a>
          </div>
        </div>
      </aside>
    </section>

    <section aria-labelledby="heading-${escapeHtml(subject)}">
      <div class="section-bar">
        <div class="section-bar-left">
          <h2 id="heading-${escapeHtml(subject)}" class="section-slug ${meta.accentClass}">/index</h2>
          <span class="section-subtitle">${escapeHtml(meta.subtitle)}</span>
        </div>
        <div class="section-count">${escapeHtml(countLabel)}</div>
      </div>
      ${renderActivityCards(activities, subject, true)}
    </section>
  </main>

  <footer class="site-footer">
    <span>${escapeHtml(meta.title)} &middot; orthographic projection &middot; every concept computed from its own equation</span>
    <span><a href="../">&larr; main portal</a></span>
  </footer>
  <script>${scripts}</script>
</body>
</html>`;
}
