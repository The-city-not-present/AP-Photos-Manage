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
  `Promise.then` only when tasks genuinely don't need to wait for each other. A rejected promise is a valid "cancel" signal — catch errors from promise-generating code, and ignore a rejection if it is not an `Error` instance; otherwise report it.
- **Errors.** All errors must be caught and handled uniformly through the app's
  single global error reporter (`reportError`):
  1. surface them in the global error banner at the top of the app — one line per error, with no "is empty" conditional: zero errors take zero height, one error takes one line, and so on;
  2. also log them to the console so the stack trace is printed with normal browser behaviour.
  Handle sync errors at the root caller. Catch async errors just as consistently — in timers, event handlers, `Promise.then` callbacks, and other async subroutines. Errors raised in component `setup()` are not guaranteed to reach the banner (the app may fail to render), but make a best effort to handle them consistently.
