import { cp, mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  SUBJECTS,
  discoverActivities,
  renderHomepage,
  renderSubjectPage,
} from './lib/catalog.mjs';

const root = fileURLToPath(new URL('.', import.meta.url));
const output = join(root, 'dist');

async function copyActivityDir(source, destination) {
  await mkdir(destination, { recursive: true });
  for (const entry of await readdir(source, { withFileTypes: true })) {
    if (entry.name.startsWith('.')) continue;
    const from = join(source, entry.name);
    const to = join(destination, entry.name);
    if (entry.isDirectory()) await copyActivityDir(from, to);
    else if (entry.isFile()) await cp(from, to);
    else throw new Error(`Unsupported file in activity: ${from}`);
  }
}

await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });

const template = await readFile(join(root, 'index.html'), 'utf8');
const catalogBySubject = {};

for (const subject of SUBJECTS) {
  const activities = await discoverActivities(root, subject);
  catalogBySubject[subject] = activities;

  const subjectDir = join(output, subject);
  await mkdir(subjectDir, { recursive: true });

  for (const item of activities) {
    if (item.kind === 'file') {
      await cp(item.sourcePath, join(subjectDir, item.fileName));
    } else {
      await copyActivityDir(item.sourcePath, join(subjectDir, item.slug));
    }
  }

  // Dedicated standalone webpage for each subject (/electronics/ and /artificial-intelligence/)
  await writeFile(join(subjectDir, 'index.html'), renderSubjectPage(template, subject, activities));
}

const homepage = renderHomepage(template, catalogBySubject);
await writeFile(join(output, 'index.html'), homepage);
