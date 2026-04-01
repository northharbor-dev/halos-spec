import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { loadJSON, listJSON } from './helpers/load-schema.js';

// --- Semantic check functions ---

function checkGraphRefs(record) {
  const graph = record.graph;
  if (!graph) return [];

  const knownIds = new Set();
  for (const e of graph.entities || []) knownIds.add(e.id);
  for (const a of graph.activities || []) knownIds.add(a.id);

  const errors = [];
  for (const rel of graph.relationships || []) {
    if (!knownIds.has(rel.from)) {
      errors.push(`relationship "${rel.type}" references unknown "from": "${rel.from}"`);
    }
    if (!knownIds.has(rel.to)) {
      errors.push(`relationship "${rel.type}" references unknown "to": "${rel.to}"`);
    }
  }
  return errors;
}

function checkLineageSelfRef(record) {
  if (!record.lineage || !record.artifact) return [];
  if (record.lineage.includes(record.artifact.id)) {
    return [`artifact "${record.artifact.id}" appears in its own lineage`];
  }
  return [];
}

function checkActivityTimeOrder(record) {
  const activities = record.graph?.activities || [];
  const errors = [];
  for (const a of activities) {
    if (a.startedAt && a.endedAt) {
      if (new Date(a.startedAt) > new Date(a.endedAt)) {
        errors.push(`activity "${a.id}" has startedAt (${a.startedAt}) after endedAt (${a.endedAt})`);
      }
    }
  }
  return errors;
}

function runAllChecks(record) {
  return [
    ...checkGraphRefs(record),
    ...checkLineageSelfRef(record),
    ...checkActivityTimeOrder(record),
  ];
}

// --- Valid fixtures should pass all semantic checks ---

describe('semantic validation – valid fixtures pass', () => {
  const validFiles = [
    ...listJSON('examples').filter(
      f => (f.endsWith('.halos.json') || f === 'examples/v0.2-graph.json')
        && !f.includes('embedded/')
    ),
    ...listJSON('test/fixtures/valid'),
  ];

  for (const file of validFiles) {
    it(`${file} has no semantic issues`, () => {
      const data = loadJSON(file);
      const errors = runAllChecks(data);
      assert.deepEqual(errors, [], `Semantic issues found:\n${errors.join('\n')}`);
    });
  }
});

// --- Semantic fixtures should trigger specific checks ---

describe('semantic validation – detects issues', () => {
  it('detects broken graph references', () => {
    const data = loadJSON('test/fixtures/semantic/graph-broken-ref.json');
    const errors = checkGraphRefs(data);
    assert.ok(errors.length > 0, 'Expected broken reference to be detected');
    assert.ok(
      errors.some(e => e.includes('nonexistent')),
      `Expected error about "nonexistent" reference, got: ${errors.join('; ')}`
    );
  });

  it('passes valid graph references', () => {
    const data = loadJSON('test/fixtures/semantic/graph-valid-refs.json');
    const errors = checkGraphRefs(data);
    assert.deepEqual(errors, []);
  });

  it('detects self-referencing lineage', () => {
    const data = loadJSON('test/fixtures/semantic/self-referencing-lineage.json');
    const errors = checkLineageSelfRef(data);
    assert.ok(errors.length > 0, 'Expected self-reference to be detected');
    assert.ok(errors[0].includes('self-ref'));
  });

  it('detects activity time inversion', () => {
    const data = loadJSON('test/fixtures/semantic/activity-time-inversion.json');
    const errors = checkActivityTimeOrder(data);
    assert.ok(errors.length > 0, 'Expected time inversion to be detected');
    assert.ok(errors[0].includes('startedAt'));
  });
});
