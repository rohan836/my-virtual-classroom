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

    const sorted = entries.sort((a, b) => a.name.localeCompare(b.name, 'en'));

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

export function renderActivityCards(activities, subject) {
  const isAi = subject === 'artificial-intelligence';

  if (!activities.length) {
    return `<div class="study-empty" data-empty-subject="${escapeHtml(subject)}">
      <div class="study-empty-k">coming soon</div>
      <p>No interactive labs have been added to this subject yet.</p>
    </div>`;
  }

  const cards = activities.map((item, idx) => {
    const num = String(idx + 1).padStart(2, '0');
    const figLabel = `fig. ${num}`;
    const figsNote = item.figureCount > 1 ? `${item.figureCount} studies inside` : '1 study';
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

export function renderSubjectPage(templateHtml, subject, activities) {
  const meta = SUBJECT_META[subject];
  const otherSubject = subject === 'electronics' ? 'artificial-intelligence' : 'electronics';
  const otherMeta = SUBJECT_META[otherSubject];
  const isAi = subject === 'artificial-intelligence';
  const countLabel = summarizeCount(activities.length);
  const firstLab = activities[0];
  const firstLabHref = firstLab ? (firstLab.subjectHref || `./${firstLab.fileName}`) : null;
  const styles = extractSharedStyles(templateHtml);

  return `<!doctype html>
<html lang="en" data-theme="light">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${escapeHtml(meta.title)} — My Virtual Classroom</title>
  <meta name="description" content="${escapeHtml(meta.description)}" />
  <meta property="og:title" content="${escapeHtml(meta.title)} — My Virtual Classroom" />
  <meta property="og:description" content="${escapeHtml(meta.description)}" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:ital,wght@0,400;0,500;0,600;1,400&family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;0,6..72,700;1,6..72,400&display=swap" rel="stylesheet" />
  <style>${styles}</style>
</head>
<body>
  <header class="topbar">
    <div class="topbar-left">
      <a class="topbar-cell topbar-brand" href="../">My Virtual Classroom</a>
      <a class="topbar-cell topbar-link" href="./">${escapeHtml(meta.label)}</a>
      <div class="topbar-cell hide-sm">${escapeHtml(countLabel)}</div>
    </div>
    <div class="topbar-right">
      <a class="topbar-cell topbar-link hide-sm" href="../${escapeHtml(otherSubject)}/">${escapeHtml(otherMeta.label)} &rarr;</a>
      ${firstLabHref ? `<a class="nav-cta" href="${escapeHtml(firstLabHref)}">open fig. 01 &rarr;</a>` : ''}
      <button type="button" class="theme-toggle" id="theme-toggle" aria-label="Toggle dark mode">&#9680; Dark</button>
    </div>
  </header>

  <main>
    <section class="hero" aria-label="Subject Overview">
      <div class="hero-inner">
        <div class="hero-main">
          <div class="hero-copy">
            <div class="hero-kicker">My Virtual Classroom &middot; ${escapeHtml(meta.label)}</div>
            <h1 class="hero-title">
              <span class="hero-title-main">${escapeHtml(meta.headlineMain)}</span>
              <span class="hero-title-sub">${escapeHtml(meta.headlineSub)}</span>
            </h1>
            <div class="abstract-box">
              <span class="badge-lemon">Overview</span>
              <p class="hero-para">${escapeHtml(meta.description)}</p>
            </div>
          </div>
          <div class="hero-toolbar">
            <div class="toolbar-group">
              <a class="sci-link" href="../">&larr; back to front page</a>
              <a class="sci-link ${isAi ? 'sci-link--red' : 'sci-link--blue'}" href="../${escapeHtml(otherSubject)}/">switch to ${escapeHtml(otherMeta.label)} &rarr;</a>
            </div>
          </div>
        </div>

        <aside class="hero-specs" aria-label="Subject Details">
          <div class="spec-cell">
            <h2 class="spec-heading">Curriculum</h2>
            <p style="margin:0;">${escapeHtml(meta.curriculum)}</p>
          </div>
          <div class="spec-cell">
            <h2 class="spec-heading">Interactive Controls</h2>
            <ul class="spec-list">
              <li class="spec-kv"><span class="spec-k">&larr; &rarr;</span><span>navigate sections or figures</span></li>
              <li class="spec-kv"><span class="spec-k">click</span><span>inspect parts, wires &amp; code</span></li>
            </ul>
          </div>
          <div class="spec-cell">
            <h2 class="spec-heading">Other Subject</h2>
            <div class="spec-subject-links">
              <a class="spec-subject-link" href="../${escapeHtml(otherSubject)}/">
                <span>${escapeHtml(otherMeta.label)}</span>
                <span>open &rarr;</span>
              </a>
            </div>
          </div>
        </aside>
      </div>
    </section>

    <section class="subject-section" aria-labelledby="heading-${escapeHtml(subject)}">
      <div class="section-bar">
        <div class="section-bar-left">
          <h2 id="heading-${escapeHtml(subject)}" class="section-slug ${meta.accentClass}" style="margin:0;">${escapeHtml(meta.title)}</h2>
          <span class="section-subtitle">${escapeHtml(meta.subtitle)}</span>
        </div>
        <div class="section-count">${escapeHtml(countLabel)}</div>
      </div>
      ${renderActivityCards(activities, subject)}
    </section>
  </main>

  <footer class="site-footer">
    <span>${escapeHtml(meta.title)} &middot; My Virtual Classroom</span>
    <span><a href="../" style="color:inherit;">&larr; front page</a></span>
  </footer>

  <script>
    (function () {
      const root = document.documentElement;
      const btn = document.getElementById('theme-toggle');
      const saved = localStorage.getItem('mvc-theme');
      if (saved === 'dark' || saved === 'light') {
        root.setAttribute('data-theme', saved);
      }
      function syncLabel() {
        if (!btn) return;
        const isDark = root.getAttribute('data-theme') === 'dark';
        btn.innerHTML = isDark ? '&#9728; Light' : '&#9680; Dark';
      }
      syncLabel();
      if (btn) {
        btn.addEventListener('click', function () {
          const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
          root.setAttribute('data-theme', next);
          localStorage.setItem('mvc-theme', next);
          syncLabel();
        });
      }
    })();
  </script>
</body>
</html>`;
}
