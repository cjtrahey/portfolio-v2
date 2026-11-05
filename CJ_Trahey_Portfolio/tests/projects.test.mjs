import test from 'node:test';
import assert from 'node:assert/strict';
import { filterProjects, projects, filters } from '../src/data.js';

test('visitors can reset the filter to see every project', () => {
  filterProjects('Interface design');
  assert.deepEqual(filterProjects('All projects').map(p => p.id), ['pokedex', 'glassius', 'maps']);
});
test('API and design filters show the intended project sets', () => {
  assert.deepEqual(filterProjects('Data & APIs').map(p => p.id), ['pokedex', 'maps']);
  assert.deepEqual(filterProjects('Interface design').map(p => p.id), ['glassius']);
  assert.equal(filters.length, 3);
});
test('every filtered project has usable detail content and a verified source destination', () => {
  for (const project of projects) {
    assert.match(project.source, /^https:\/\/github\.com\/cjtrahey\//);
    for (const field of ['title', 'overview', 'approach', 'takeaway', 'contribution']) assert.ok(project[field].trim().length > 0, `${project.id}: ${field}`);
  }
});
