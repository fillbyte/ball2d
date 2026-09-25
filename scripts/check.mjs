import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { auditSdkStructure } from './sdk-structure.mjs';
import { verifyRuntimeIntegrity } from './runtime-integrity.mjs';

const structure = await auditSdkStructure('.');
const manifest = JSON.parse(await readFile('runtime-manifest.json', 'utf8'));
const pkg = JSON.parse(await readFile('package.json', 'utf8'));
await verifyRuntimeIntegrity('.', manifest, pkg.version, structure.paths);
await WebAssembly.compile(await readFile('dist/core.wasm'));
const sdk = await import('../dist/node.js');
assert.equal(typeof sdk.createRoom, 'function');
await assert.rejects(sdk.createRoom({}), /valid API key is required/);
console.log(
  `Verified ${structure.files} pinned runtime files and ${structure.declarations} public declarations.`,
);
