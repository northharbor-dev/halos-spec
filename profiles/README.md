# HALOS Profiles

Profiles map HALOS principles to domain-specific toolchains and practices.

HALOS principles are universal, but implementation details vary by domain. A software development shop using Git-based workflows will satisfy HALOS-CORE-3 (Attribution and Provenance) differently than a regulated healthcare organization or a consumer web platform.

---

## What Is a Profile?

A profile is a curated mapping that says: "In this domain, here's how you implement each HALOS principle using the tools and standards that are already best practice."

Each profile contains:
- `README.md` — what the profile covers and who it's for
- `profile.yaml` — machine-readable mapping of HALOS principles to domain tools
- `examples/` — concrete examples (provenance records, CI configs, commit conventions)

---

## Available Profiles

| Profile | Domain | Status |
|---|---|---|
| [software-dev](software-dev/) | Git-based software development | Stub |

---

## Creating a Profile

1. Create a directory under `profiles/` with a descriptive name
2. Add a `README.md` explaining the domain and toolchain assumptions
3. Add a `profile.yaml` with:
   - `specVersion` — the HALOS spec version this profile targets
   - `domain` — short domain description
   - `mappings` — how each HALOS-CORE requirement maps to domain tools
4. Add `examples/` with concrete, valid artifacts
5. Open a PR referencing the [contribution guide](../CONTRIBUTING.md)
