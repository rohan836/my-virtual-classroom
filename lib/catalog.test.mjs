import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import {
  isValidSlug,
  formatSlugTitle,
  extractLabMetadata,
  discoverActivities,
  renderActivityCards,
  renderHomepage,
  renderSubjectPage,
} from './catalog.mjs';

test('isValidSlug accepts lowercase hyphenated slugs and rejects invalid ones', () => {
  assert.equal(isValidSlug('resistor-and-transistor'), true);
  assert.equal(isValidSlug('what-is-ai'), true);
  assert.equal(isValidSlug('ohms-law-2'), true);
  assert.equal(isValidSlug('UpperCase'), false);
  assert.equal(isValidSlug('has space'), false);
  assert.equal(isValidSlug('under_score'), false);
});

test('formatSlugTitle capitalizes acronyms cleanly', () => {
  assert.equal(formatSlugTitle('what-is-ai'), 'What Is AI');
  assert.equal(formatSlugTitle('led-and-ldr-circuit'), 'LED And LDR Circuit');
});

test('extractLabMetadata extracts title, intro, formula, and figure count', () => {
  const sampleHtml = `<!doctype html><html><head>
    <title>/electronics studies — Interactive 3D Capacitor Lab</title>
  </head><body>
    <div id="nav-equation">Q = C &times; V</div>
    <p id="editorial-intro">A capacitor stores electric charge on two metal plates.</p>
    <button>fig. 01</button><button>fig. 02</button>
  </body></html>`;

  const meta = extractLabMetadata(sampleHtml, 'capacitor');
  assert.equal(meta.title, 'Interactive 3D Capacitor Lab');
  assert.equal(meta.description, 'A capacitor stores electric charge on two metal plates.');
  assert.equal(meta.formula, 'Q = C × V');
  assert.equal(meta.figureCount, 2);
});

test('discoverActivities finds single .html files and folder index.html with clean subject URLs', async () => {
  const tempRoot = await mkdtemp(join(tmpdir(), 'classroom-catalog-'));
  try {
    await mkdir(join(tempRoot, 'published', 'electronics', 'ohms-law'), { recursive: true });
    await mkdir(join(tempRoot, 'testing', 'electronics'), { recursive: true });
    await mkdir(join(tempRoot, 'published', 'artificial-intelligence'), { recursive: true });
    await mkdir(join(tempRoot, 'testing', 'artificial-intelligence'), { recursive: true });

    await writeFile(
      join(tempRoot, 'published', 'electronics', 'ohms-law', 'index.html'),
      '<title>/electronics studies — Ohms Law</title><meta name="description" content="Explore V=IR.">'
    );
    await writeFile(
      join(tempRoot, 'testing', 'electronics', 'capacitor.html'),
      '<title>/electronics studies — Capacitor Lab</title><meta name="lab-formula" content="Q = C × V">'
    );
    await writeFile(
      join(tempRoot, 'testing', 'artificial-intelligence', 'decision-trees.html'),
      '<title>/ai studies — Decision Trees</title>'
    );

    const elec = await discoverActivities(tempRoot, 'electronics');
    assert.equal(elec.length, 2);
    assert.equal(elec[0].href, './electronics/ohms-law/');
    assert.equal(elec[0].subjectHref, './ohms-law/');
    assert.equal(elec[1].href, './electronics/capacitor.html');
    assert.equal(elec[1].subjectHref, './capacitor.html');

    const ai = await discoverActivities(tempRoot, 'artificial-intelligence');
    assert.equal(ai.length, 1);
    assert.equal(ai[0].href, './artificial-intelligence/decision-trees.html');
    assert.equal(ai[0].subjectHref, './decision-trees.html');
  } finally {
    await rm(tempRoot, { recursive: true, force: true });
  }
});

test('renderHomepage and renderSubjectPage create separate clean AI and Electronics pages without folder chrome', async () => {
  const templateHtml = await readFile(new URL('../index.html', import.meta.url), 'utf8');
  const elecItems = [
    {
      subject: 'electronics',
      slug: 'resistor-and-transistor',
      fileName: 'resistor-and-transistor.html',
      kind: 'file',
      href: './electronics/resistor-and-transistor.html',
      subjectHref: './resistor-and-transistor.html',
      title: 'Interactive 3D Resistor & Transistor Lab',
      description: 'Voltage and resistance.',
      formula: 'V = I × R',
      figureCount: 2,
    },
  ];
  const aiItems = [
    {
      subject: 'artificial-intelligence',
      slug: 'what-is-ai',
      fileName: 'what-is-ai.html',
      kind: 'file',
      href: './artificial-intelligence/what-is-ai.html',
      subjectHref: './what-is-ai.html',
      title: 'What Is AI',
      description: 'Rules vs learning.',
      formula: 'data -> model',
      figureCount: 3,
    },
  ];

  // Homepage points cleanly to separate subject webpages with no folder links or badges
  const home = renderHomepage(templateHtml, {
    electronics: elecItems,
    'artificial-intelligence': aiItems,
  });
  assert.match(home, /href="\.\/electronics\/"/);
  assert.match(home, /href="\.\/artificial-intelligence\/"/);
  assert.doesNotMatch(home, /published\/electronics/);
  assert.doesNotMatch(home, /testing\/electronics/);
  assert.doesNotMatch(home, /empty folder/);

  // Electronics page contains ONLY Electronics labs
  const elecPage = renderSubjectPage(templateHtml, 'electronics', elecItems);
  assert.match(elecPage, /Interactive 3D Resistor &amp; Transistor Lab/);
  assert.match(elecPage, /href="\.\/resistor-and-transistor\.html"/);
  assert.doesNotMatch(elecPage, /What Is AI/);
  assert.doesNotMatch(elecPage, /published\/electronics/);

  // AI page contains ONLY AI labs
  const aiPage = renderSubjectPage(templateHtml, 'artificial-intelligence', aiItems);
  assert.match(aiPage, /What Is AI/);
  assert.match(aiPage, /href="\.\/what-is-ai\.html"/);
  assert.doesNotMatch(aiPage, /Resistor &amp; Transistor/);
  assert.doesNotMatch(aiPage, /testing\/artificial-intelligence/);
});

test('renderActivityCards renders a clean student-facing empty state when no labs exist', () => {
  const emptyHtml = renderActivityCards([], 'electronics');
  assert.match(emptyHtml, /coming soon/);
  assert.doesNotMatch(emptyHtml, /published\/electronics/);
  assert.doesNotMatch(emptyHtml, /node build\.mjs/);
});
