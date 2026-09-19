import { readdir, readFile, access } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';

const skipped = new Set([
  '.git',
  'node_modules',
  'dist',
  'target',
  'artifacts',
  '.wrangler',
  '.worker-build',
  'playwright-report',
  'test-results',
]);
const failures = [];
let documents = 0;
let links = 0;
async function walk(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    if (skipped.has(entry.name) || entry.isSymbolicLink()) continue;
    const path = join(directory, entry.name);
    if (entry.isDirectory()) await walk(path);
    else if (entry.name.endsWith('.md')) {
      documents++;
      const source = (await readFile(path, 'utf8')).replace(
        /^```[^\n]*\n[\s\S]*?^```[^\n]*$/gm,
        '',
      );
      for (const match of source.matchAll(/\]\(([^)]+)\)/g)) {
        const href = match[1].split('#')[0].replace(/^<|>$/g, '');
        if (!href || /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(href)) continue;
        links++;
        try {
          await access(resolve(dirname(path), decodeURIComponent(href)));
        } catch {
          failures.push(`${path}: missing ${href}`);
        }
      }
    }
  }
}
await walk('.');
if (failures.length) {
  console.error(failures.join('\n'));
  process.exitCode = 1;
} else console.log(`Checked ${documents} Markdown documents and ${links} local links.`);
