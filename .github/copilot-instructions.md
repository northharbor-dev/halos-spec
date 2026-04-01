# Copilot Instructions — halos-spec

This is the HALOS specification repository. See `AGENTS.md` in the project root for complete agent instructions.

## Key Points

- **Spec repo, not a software project.** Primary outputs are JSON Schemas, Markdown specs, and example provenance records.
- **Run `npm test` after any change.** The test suite auto-discovers and validates all examples and schema fixtures.
- **`spec/principles/v1.0.md` is generated** — never edit it directly. Edit `spec/core.json` and run `node scripts/generate-principles.js`.
- **Active provenance spec is v0.3.** New examples must use `halos_version: "0.3"` and validate against `spec/schema/halos-provenance-v0.3.schema.json`.
- **Enum coverage is enforced.** Adding a new enum value to a schema requires a matching test fixture in `test/fixtures/valid/enum-coverage/`.
- **To generate a new domain example**, follow the structured agent prompt in `examples/GENERATE-EXAMPLE.md`.
- **If schema validation fails** on a new example, it may indicate a valid spec proposal — document it in a GitHub issue.

## Commands

- `npm install` — install dependencies
- `npm test` — run all validation and tests
- `node scripts/validate.js -s <schema> <file>` — validate a single file
- `node scripts/generate-principles.js` — regenerate principles from core.json
