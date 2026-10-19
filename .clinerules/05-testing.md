# Testing

Write automated tests for **every isolated module** — anything with clear inputs
and an expected outcome: services, helpers, algorithms (e.g. the cache-policy
decisions), API endpoints, and Vue components with non-trivial logic.

Do **not** write tests for pure bootstrapping/smoke ("the browser launches", "the
page loads"). That is hard to test meaningfully and its breakage is obvious by
inspection. Test the *logic*, not the shell.

## Principles

- **The module is the test unit.** Modules are encapsulated with explicit inputs
  and outputs, so each behaviour gets a test: the normal case, edge/empty cases,
  and expected failures.
- **Deterministic and independent.** One behaviour per test where practical; no
  test-order dependence; no reliance on real network, filesystem, or wall clock
  unless that is the exact thing under test (then keep it small and explicit).
- **Isolation enables testing.** If a piece of logic is hard to test, extract it
  into a module with clearer boundaries (see `01-architecture-imports.md`).

## Layout (industry standard)

**Backend — Python / FastAPI → `pytest`.** Tests live in a top-level
`backend/tests/` directory that mirrors the package layout:

```
backend/
  app/
    services/
      thumbnail.py
  tests/
    services/
      test_thumbnail.py
    api/
      test_health.py
```

Name files `test_*.py` and test functions `test_*`. Tests import the code under
test through its public package path (`from app.services.thumbnail import ...`).

**Frontend — Vue / Vite → `Vitest` + `@vue/test-utils`.** Co-locate a `*.spec.js`
next to the file it covers:

```
frontend/src/
  components/
    AppHeader.vue
    AppHeader.spec.js
  app/
    ProjectApp.vue
    ProjectApp.spec.js
```

Test component logic (computed values, events, conditional rendering) — not the
browser itself.

Add `pytest` (and test plugins as needed) and `vitest` + `@vue/test-utils` as
development dependencies when the first tests are introduced.
