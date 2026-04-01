import Ajv from 'ajv/dist/2020.js';
import addFormats from 'ajv-formats';
import { readFileSync, readdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
export const root = resolve(__dirname, '../..');

export function compileSchema(relPath) {
  const ajv = new Ajv({ strict: true, allErrors: true });
  addFormats(ajv);
  const schema = JSON.parse(readFileSync(resolve(root, relPath), 'utf-8'));
  return ajv.compile(schema);
}

export function loadJSON(relPath) {
  return JSON.parse(readFileSync(resolve(root, relPath), 'utf-8'));
}

export function listJSON(dirRelPath) {
  const dir = resolve(root, dirRelPath);
  return readdirSync(dir, { recursive: true })
    .filter(f => f.endsWith('.json'))
    .map(f => `${dirRelPath}/${f}`);
}
