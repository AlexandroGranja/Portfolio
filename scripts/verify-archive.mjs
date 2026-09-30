import { readFileSync, existsSync } from 'node:fs';
import { createHash } from 'node:crypto';
import path from 'node:path';
import assert from 'node:assert/strict';
const root = path.resolve('archive');
const manifest = path.join(root, 'manifest-reorganization.json');
assert.ok(existsSync(manifest), 'O arquivo local não está neste checkout. Ele não faz parte do deploy.');
const entries = JSON.parse(readFileSync(manifest, 'utf8').replace(/^\uFEFF/, ''));
for (const entry of entries) {
  const file = path.join(root, 'portfolio-original', entry.path);
  assert.equal(createHash('sha256').update(readFileSync(file)).digest('hex'), entry.sha256, entry.path);
}
console.log(`${entries.length} arquivos antigos preservados e conferidos por SHA-256.`);
