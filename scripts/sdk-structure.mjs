import { lstat, readdir, readFile } from 'node:fs/promises';
import { join, posix } from 'node:path';

const contracts = new Set(
  [
    'announcement',
    'browser',
    'config',
    'creation',
    'disc',
    'match-state',
    'node',
    'player',
    'replay',
    'room',
    'stadium',
    'team',
  ].map((name) => `dist/types/${name}.d.ts`),
);
const artifacts = new Set([
  'dist/browser.js',
  'dist/node.js',
  'dist/core.wasm',
  'dist/licenses/fflate.txt',
  'dist/licenses/json5.txt',
  'dist/licenses/werift.txt',
  'dist/licenses/native.json',
]);

/** Structural disclosure gate, not a provenance or vulnerability audit.
 * Applied again to the installed tarball by consumer verification.
 */
export async function auditSdkStructure(root, { forbiddenTerms = [] } = {}) {
  const files = [];
  async function walk(relative) {
    for (const name of await readdir(join(root, relative))) {
      const path = posix.join(relative, name);
      const stat = await lstat(join(root, path));
      if (stat.isSymbolicLink()) throw Error(`SDK contains a symlink: ${path}`);
      if (stat.isDirectory()) await walk(path);
      else if (stat.isFile()) files.push(path);
      else throw Error(`SDK contains a special file: ${path}`);
    }
  }
  await walk('dist');
  for (const required of [...artifacts, ...contracts])
    if (!files.includes(required)) throw Error(`SDK artifact missing: ${required}`);
  for (const path of files) {
    const stadium = /^dist\/stadiums\/(?:[a-z_]+\.hbs|provenance\.json)$/.test(path);
    if (!artifacts.has(path) && !contracts.has(path) && !stadium)
      throw Error(`Unreviewed SDK artifact: ${path}`);
    const contents = await readFile(join(root, path));
    for (const term of forbiddenTerms) {
      if (
        term &&
        (path + '\n' + contents.toString('utf8')).toLowerCase().includes(term.toLowerCase())
      )
        throw Error(`SDK contains a forbidden term: ${path}`);
    }
    if (!path.endsWith('.js') && !path.endsWith('.d.ts')) continue;
    const text = contents.toString('utf8');
    if (/sourceMappingURL\s*=|sourceURL\s*=|\/\/#region\s+(?:src\/|\\0)/.test(text))
      throw Error(`SDK contains source/debug metadata: ${path}`);
    if (contracts.has(path)) {
      for (const match of text.matchAll(/(?:from\s*|import\s*\(\s*)['"]([^'"]+)['"]/g)) {
        const specifier = match[1];
        const target = posix.join(posix.dirname(path), specifier.replace(/\.js$/, '.d.ts'));
        if (!specifier.startsWith('./') || !specifier.endsWith('.js') || !contracts.has(target))
          throw Error(`SDK declaration imports implementation or external types: ${path}`);
      }
    }
  }
  return { files: files.length, declarations: contracts.size };
}
