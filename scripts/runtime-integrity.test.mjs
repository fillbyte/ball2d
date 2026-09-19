import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, writeFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { createHash } from 'node:crypto';
import { verifyRuntimeIntegrity } from './runtime-integrity.mjs';

test('pins every audited file exactly once and rejects path aliases before reading', async () => {
  const root = await mkdtemp(join(tmpdir(), 'ball2d-integrity-'));
  try {
    await mkdir(join(root, 'dist'));
    await writeFile(join(root, 'dist/browser.js'), 'browser');
    await writeFile(join(root, 'dist/node.js'), 'node');
    const digest = (value) => createHash('sha256').update(value).digest('hex');
    const files = { 'dist/browser.js': digest('browser'), 'dist/node.js': digest('node') };
    const paths = Object.keys(files);
    const verify = (pinned, version = '1') =>
      verifyRuntimeIntegrity(root, { version, files: pinned }, '1', paths);
    await verify(files);
    for (const alias of ['dist/./browser.js', 'dist//browser.js', 'dist/../secret'])
      await assert.rejects(
        verify({ 'dist/browser.js': files['dist/browser.js'], [alias]: files['dist/browser.js'] }),
        /Runtime inventory/,
      );
    await assert.rejects(verify({ 'dist/browser.js': files['dist/browser.js'] }), /inventory/);
    await assert.rejects(verify(files, '2'), /version/);
    await assert.rejects(verify({ ...files, 'dist/node.js': 'bad' }), /Invalid digest/);
    await writeFile(join(root, 'dist/node.js'), 'modified');
    await assert.rejects(verify(files), /Runtime digest: dist\/node.js/);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});
