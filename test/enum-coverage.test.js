import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { loadJSON, listJSON, root } from './helpers/load-schema.js';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

// --- Extract all enum definitions from the schema ---

function extractEnums(schema, path = '') {
  const results = [];
  if (schema && typeof schema === 'object') {
    if (Array.isArray(schema.enum) && schema.enum.every(v => typeof v === 'string')) {
      results.push({ path, values: schema.enum });
    }
    for (const [key, value] of Object.entries(schema)) {
      if (key === 'enum') continue;
      const childPath = key === 'properties'
        ? path
        : key === 'items'
          ? `${path}[]`
          : path ? `${path}.${key}` : key;
      results.push(...extractEnums(value, childPath));
    }
  }
  return results;
}

// --- Collect all values from all valid fixtures ---

function collectValues(data, path = '') {
  const results = new Map(); // path -> Set of values
  if (data && typeof data === 'object') {
    if (Array.isArray(data)) {
      for (const item of data) {
        for (const [p, vals] of collectValues(item, path + '[]')) {
          if (!results.has(p)) results.set(p, new Set());
          for (const v of vals) results.get(p).add(v);
        }
      }
    } else {
      for (const [key, value] of Object.entries(data)) {
        const childPath = path ? `${path}.${key}` : key;
        if (typeof value === 'string') {
          if (!results.has(childPath)) results.set(childPath, new Set());
          results.get(childPath).add(value);
        }
        for (const [p, vals] of collectValues(value, childPath)) {
          if (!results.has(p)) results.set(p, new Set());
          for (const v of vals) results.get(p).add(v);
        }
      }
    }
  }
  return results;
}

// Normalize paths for matching: remove leading dots, normalize array brackets
function normalizePath(p) {
  return p.replace(/^\./, '').replace(/\[\]\[\]/g, '[]');
}

// --- Load schema and all valid fixtures ---

const schema = JSON.parse(
  readFileSync(resolve(root, 'spec/schema/halos-provenance-v0.3.schema.json'), 'utf-8')
);

const enumDefs = extractEnums(schema)
  // Skip the halos_version const (it's not really an enum to exercise)
  .filter(e => e.path !== 'halos_version' && e.values.length > 1);

// Load all valid fixtures (test fixtures + existing domain examples)
const allValidFiles = [
  ...listJSON('examples').filter(
    f => (f.endsWith('.halos.json') || f === 'examples/v0.2-graph.json')
      && !f.includes('embedded/')
  ),
  ...listJSON('test/fixtures/valid'),
];

// Collect all string values from all fixtures, keyed by path
const allValues = new Map();
for (const file of allValidFiles) {
  const data = loadJSON(file);
  for (const [path, vals] of collectValues(data)) {
    if (!allValues.has(path)) allValues.set(path, new Set());
    for (const v of vals) allValues.get(path).add(v);
  }
}

// --- Tests ---

describe('enum coverage', () => {
  for (const enumDef of enumDefs) {
    const normalizedEnumPath = normalizePath(enumDef.path);

    describe(`${normalizedEnumPath} (${enumDef.values.length} values)`, () => {
      // Find matching paths in collected values (fuzzy match on path suffix)
      const matchingPaths = [...allValues.keys()].filter(p => {
        const np = normalizePath(p);
        return np === normalizedEnumPath || np.endsWith('.' + normalizedEnumPath) || normalizedEnumPath.endsWith('.' + np);
      });

      const exercisedValues = new Set();
      for (const mp of matchingPaths) {
        for (const v of allValues.get(mp)) {
          exercisedValues.add(v);
        }
      }

      for (const value of enumDef.values) {
        it(`"${value}" is exercised in at least one fixture`, () => {
          assert.ok(
            exercisedValues.has(value),
            `Enum value "${value}" at path "${normalizedEnumPath}" is not exercised in any valid fixture. Add a fixture that uses this value.`
          );
        });
      }
    });
  }
});
