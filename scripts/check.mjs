import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { auditSdkStructure } from './sdk-structure.mjs';

const structure = await auditSdkStructure('.');
const manifest = JSON.parse(await readFile('runtime-manifest.json', 'utf8'));
const pkg = JSON.parse(await readFile('package.json', 'utf8'));
assert.equal(pkg.version, manifest.version);
assert.equal(Object.keys(manifest.files).length, structure.files);
for (const [path, expected] of Object.entries(manifest.files)) {
  assert.match(path, /^dist\/[a-zA-Z0-9_./-]+$/);
  assert(!path.split('/').includes('..'));
  assert.equal(
    createHash('sha256')
      .update(await readFile(path))
      .digest('hex'),
    expected,
    path,
  );
}
await WebAssembly.compile(await readFile('dist/core.wasm'));
const sdk = await import('../dist/node.js');
assert.equal(typeof sdk.createRoom, 'function');
await assert.rejects(sdk.createRoom({}), /valid API key is required/);
console.log(
  `Verified ${structure.files} pinned runtime files and ${structure.declarations} public declarations.`,
);
