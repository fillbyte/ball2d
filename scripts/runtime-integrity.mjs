import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { join } from 'node:path';

/** Verify the exact audited inventory before reading any manifest-supplied path. */
export async function verifyRuntimeIntegrity(root, manifest, version, paths) {
  assert.equal(manifest.version, version, 'Runtime manifest version');
  assert(manifest.files && typeof manifest.files === 'object' && !Array.isArray(manifest.files));
  assert.deepEqual(Object.keys(manifest.files).sort(), [...paths].sort(), 'Runtime inventory');
  for (const path of paths) {
    const expected = manifest.files[path];
    assert.match(expected, /^[a-f0-9]{64}$/, `Invalid digest: ${path}`);
    assert.equal(
      createHash('sha256')
        .update(await readFile(join(root, path)))
        .digest('hex'),
      expected,
      `Runtime digest: ${path}`,
    );
  }
}
