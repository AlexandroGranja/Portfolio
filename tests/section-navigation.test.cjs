const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const source = fs.existsSync('section-navigation.js') ? fs.readFileSync('section-navigation.js', 'utf8') : '';
const context = { module: { exports: {} } };
vm.runInNewContext(source, context);
const select = context.module.exports.selectSection;

test('long sections remain selected while the reader is inside them', () => {
    assert.equal(typeof select, 'function');
    assert.equal(select([{ id: 'home', top: -900 }, { id: 'about', top: -300 }, { id: 'skills', top: 1100 }], 600), 'about');
});
test('switches at the reading line and handles the final section', () => {
    assert.equal(typeof select, 'function');
    assert.equal(select([{ id: 'about', top: -500 }, { id: 'skills', top: 100 }], 600), 'skills');
    assert.equal(select([{ id: 'projects', top: -900 }, { id: 'contact', top: 300 }], 600, true), 'contact');
});
test('empty layouts have no active target', () => {
    assert.equal(typeof select, 'function');
    assert.equal(select([], 600), null);
});
