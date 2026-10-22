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
  `Promise.then` only when tasks genuinely don't need to wait for each other. A
  promise that hands a result back to its caller (e.g. a modal/dialog that
  returns the user's choice) resolves with the result and rejects when there is
  no result to return (e.g. the window was dismissed). That rejection is a
  "cancel" signal, not an error: handle it at the call site and do not forward
  it anywhere — not to the console, not to `reportError`. A rejected promise is
  an error only when the rejection represents a genuine failure.
- **Errors.** All errors must be caught and handled uniformly through the app's
  single global error reporter (`reportError`):
  1. surface them in the global error banner at the top of the app — one line per error, with no "is empty" conditional: zero errors take zero height, one error takes one line, and so on;
  2. also log them to the console so the stack trace is printed with normal browser behaviour.
  `reportError` is a plain reporter with a clear input/output contract: it always
  reports exactly the value it is given — one banner line and one console entry —
  and never filters, ignores or drops its input, whether that input is an
  `Error`, a string, `{ cancel: true }`, `undefined` or anything else. Deciding
  whether something is an error is the caller's job, done before calling
  `reportError`: catch every error and rejection, call `reportError` for genuine
  failures, and handle deliberate "cancel"/"no result" signals locally (see
  Async) without forwarding them to `reportError` or the console.
  Handle sync errors at the root caller. Catch async errors just as consistently — in timers, event handlers, `Promise.then` callbacks, and other async subroutines. Errors raised in component `setup()` are not guaranteed to reach the banner (the app may fail to render), but make a best effort to handle them consistently.
