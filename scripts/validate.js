#!/usr/bin/env node
/**
 * Validates one or more JSON data files against a JSON Schema (Draft 2020-12).
 * Uses ajv-formats to support "date-time" and "uri" format keywords.
 *
 * Usage: node scripts/validate.js -s <schema> <data> [<data> ...]
 */

import Ajv from 'ajv/dist/2020.js';
import addFormats from 'ajv-formats';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');

const args = process.argv.slice(2);
const sFlag = args.indexOf('-s');
if (sFlag === -1 || !args[sFlag + 1]) {
  console.error('Usage: node scripts/validate.js -s schema.json data1.json ...');
  process.exit(2);
}

const schemaPath = resolve(root, args[sFlag + 1]);
const dataPaths = args.filter((_, i) => i !== sFlag && i !== sFlag + 1);

const ajv = new Ajv({ strict: true, allErrors: true });
addFormats(ajv);

const schema = JSON.parse(readFileSync(schemaPath, 'utf-8'));
const validate = ajv.compile(schema);

let allPassed = true;
for (const rel of dataPaths) {
  const data = JSON.parse(readFileSync(resolve(root, rel), 'utf-8'));
  if (validate(data)) {
    console.log(`✓  ${rel}`);
  } else {
    console.error(`✗  ${rel}`);
    for (const e of validate.errors) {
      console.error(`   ${e.instancePath || '(root)'}: ${e.message}`);
    }
    allPassed = false;
  }
}

if (!allPassed) process.exit(1);
