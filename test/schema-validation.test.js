import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { compileSchema, loadJSON, listJSON } from './helpers/load-schema.js';

const validate = compileSchema('spec/schema/halos-provenance-v0.3.schema.json');

// --- Valid records ---

describe('v0.3 schema – valid records', () => {
  describe('existing domain examples', () => {
    // All .halos.json + v0.2-graph.json are v0.3 records.
    // Exclude minimal.json (v0.1) and embedded/ (envelope formats).
    const examples = listJSON('examples').filter(
      f => (f.endsWith('.halos.json') || f === 'examples/v0.2-graph.json')
        && !f.includes('embedded/')
    );

    for (const file of examples) {
      it(`validates ${file}`, () => {
        const data = loadJSON(file);
        const valid = validate(data);
        assert.equal(valid, true, JSON.stringify(validate.errors, null, 2));
      });
    }
  });

  describe('test fixtures – valid', () => {
    const fixtures = listJSON('test/fixtures/valid');

    for (const file of fixtures) {
      it(`validates ${file}`, () => {
        const data = loadJSON(file);
        const valid = validate(data);
        assert.equal(valid, true, JSON.stringify(validate.errors, null, 2));
      });
    }
  });
});

// --- Invalid records ---

describe('v0.3 schema – invalid records', () => {
  const fixtures = listJSON('test/fixtures/invalid');

  for (const file of fixtures) {
    it(`rejects ${file}`, () => {
      const data = loadJSON(file);
      const valid = validate(data);
      assert.equal(valid, false, `Expected ${file} to be rejected by the schema`);
    });
  }
});
