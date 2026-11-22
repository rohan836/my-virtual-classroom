import { cp, mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('.', import.meta.url));
const output = join(root, 'dist');
const subjects = ['electronics', 'artificial-intelligence'];

async function copyActivity(source, destination) {
  await mkdir(destination, { recursive: true });
  for (const entry of await readdir(source, { withFileTypes: true })) {
    if (entry.name.startsWith('.')) continue;
    const from = join(source, entry.name);
    const to = join(destination, entry.name);
    if (entry.isDirectory()) await copyActivity(from, to);
    else if (entry.isFile()) await cp(from, to);
    else throw new Error(`Unsupported file in published activity: ${from}`);
  }
}

await rm(output, { recursive: true, force: true });
await mkdir(output);
let homepage = await readFile(join(root, 'index.html'), 'utf8');

for (const subject of subjects) {
  const source = join(root, 'published', subject);
  const entries = await readdir(source, { withFileTypes: true });
  const links = [];
  for (const entry of entries.sort((a, b) => a.name.localeCompare(b.name, 'en'))) {
    if (!entry.isDirectory() || entry.name.startsWith('.')) continue;
    const activity = join(source, entry.name);
    const files = await readdir(activity, { withFileTypes: true });
    if (!files.some(file => file.name === 'index.html' && file.isFile())) continue;
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(entry.name)) {
      throw new Error(`Use a lowercase, hyphen-separated activity folder name: ${activity}`);
    }
    await copyActivity(activity, join(output, 'published', subject, entry.name));
    const label = entry.name.replace(/-/g, ' ').replace(/\b\w/g, letter => letter.toUpperCase());
    links.push(`<li><a href="./published/${subject}/${entry.name}/">${label}</a></li>`);
  }
  const list = links.length ? `<ul>\n${links.join('\n')}\n</ul>` : '<p>No activities published yet.</p>';
  homepage = homepage.replace(`<!-- activities:${subject} -->`, list);
}

await writeFile(join(output, 'index.html'), homepage);
