import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { compileSchema, loadJSON } from './helpers/load-schema.js';

describe('schema evolution', () => {
  it('v0.1 schema compiles without errors', () => {
    assert.doesNotThrow(() => compileSchema('spec/schema/halos-provenance-v0.1.schema.json'));
  });

  it('v0.2 schema compiles without errors', () => {
    assert.doesNotThrow(() => compileSchema('spec/schema/halos-provenance-v0.2.schema.json'));
  });

  it('v0.3 schema compiles without errors', () => {
    assert.doesNotThrow(() => compileSchema('spec/schema/halos-provenance-v0.3.schema.json'));
  });

  it('minimal.json validates against v0.1 schema', () => {
    const validate = compileSchema('spec/schema/halos-provenance-v0.1.schema.json');
    const data = loadJSON('examples/minimal.json');
    assert.equal(validate(data), true, JSON.stringify(validate.errors, null, 2));
  });

  it('v0.3 record is rejected by v0.2 schema (version boundary)', () => {
    const validate = compileSchema('spec/schema/halos-provenance-v0.2.schema.json');
    const data = loadJSON('test/fixtures/valid/minimal.json'); // halos_version: "0.3"
    assert.equal(validate(data), false, 'v0.3 record should not validate against v0.2 schema');
  });

  it('v0.3 record is rejected by v0.1 schema (version boundary)', () => {
    const validate = compileSchema('spec/schema/halos-provenance-v0.1.schema.json');
    const data = loadJSON('test/fixtures/valid/minimal.json');
    assert.equal(validate(data), false, 'v0.3 record should not validate against v0.1 schema');
  });
});
