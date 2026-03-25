# Canonical Spec Location

The files in this directory (`spec/`) are the **canonical source of truth** for HALOS machine-readable specifications.

These files were originally created in `northharbor-dev/halos/spec/` and migrated here as part of [Plan 001](../plans/001-repo-reorganization.md).

The `halos` repository retains copies for Jekyll site rendering. When these files are updated, the `halos` repo copies should be synced. This will be automated in a future CI step.

## Files

| File | Purpose |
|---|---|
| `manifest.json` | Discovery entry point — version, related specs, extensions |
| `core.json` | Eight core requirements (HALOS-CORE-1 through HALOS-CORE-8) |
| `changelog.json` | Version history |
| `schema/` | JSON Schemas for validation |
