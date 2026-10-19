# JavaScript & Vue SFCs

This project uses Vue 3 single-file components with `<script setup>`. These are
style preferences, not bundler constraints.

- **Consistency.** Follow the existing codebase's conventions unless asked
  otherwise; avoid unrelated refactoring or stylistic churn in a feature or fix.
- **Semicolons.** Use them at the end of statements; no semicolon after block
  statements (function/class declarations, `if`, `for`, …).
- **Exports.** Prefer one default export per module when appropriate; use named
  exports when they fit the module or existing conventions better.
- **Declarations.** Prefer `const`; use `let` only when reassigned; avoid `var`.
- **Functions.** Declarations, expressions and arrows are all acceptable — choose
  by context and existing style.
- **File naming.** Consistent, descriptive names; prefer groupings that sort
  related files together.
- **Modularity.** Prefer self-contained, loosely coupled folders that can be
  lifted into another project with minimal collision risk. Keep dependencies
  explicit; prefer relative imports; expose a clear public interface. This is a
  preference, not a hard rule.
- **Async.** Prefer `async`/`await` for simple sequences; reach for
  `Promise.then` only when tasks genuinely don't need to wait for each other.
