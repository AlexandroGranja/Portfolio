import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { projects } from '../src/content/projects';
import { englishProjects } from '../src/content/en-projects';
import { english } from '../src/content/translations';
import { profile } from '../src/content/profile';

test('English preserves project destinations and supplies every caption and description', () => {
  assert.equal(englishProjects.length, projects.length);
  for (const [index, translated] of englishProjects.entries()) {
    const original = projects[index];
    assert.equal(translated.slug, original.slug);
    assert.deepEqual(translated.links.map(link => link.href), original.links.map(link => link.href));
    assert.equal(translated.gallery.length, original.gallery.length);
    for (const key of ['category', 'role', 'summary', 'problem', 'contribution', 'outcome', 'imageAlt', 'imageCaption'] as const) {
      assert.ok(translated[key], `${original.slug}: missing ${key}`);
      assert.notEqual(translated[key], original[key], `${original.slug}: untranslated ${key}`);
    }
    translated.gallery.forEach((image, i) => {
      assert.equal(image.src, original.gallery[i].src);
      for (const key of ['title', 'description', 'alt'] as const) {
        assert.ok(image[key]);
        assert.notEqual(image[key], original.gallery[i][key]);
      }
    });
  }
});
test('All experience entries have translations, and both resumes exist', () => {
  for (const job of profile.experience) for (const key of ['period', 'role', 'description'] as const) assert.ok(english[job[key]], `Missing ${job[key]}`);
  for (const name of ['Curriculo', 'Resume']) assert.ok(existsSync(`public/curriculos/Alexandro_Granja_${name}.pdf`));
});
