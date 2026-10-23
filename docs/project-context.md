# Project context

> Living document — read at the start of every task and updated on every task.
> It always captures the latest state of the current chats.

## Current state

- Reviewed date handling in the reusable filtering component
  (`frontend/src/components/records-filter/`) and fixed date/datetime range
  comparisons.
- Added a shared date/time helper `frontend/src/components/format/datetime.js`
  (`toDate`, `toDateString`, `toDateTimeLocalString`).
- `RangeInput` now emits native `Date` objects for `date`/`datetime` kinds (was
  raw strings from the native inputs).
- `FormatDateTime` now uses the shared `toDate` helper too.
- Added the "`Date` objects inside the JS app" principle to
  `.clinerules/06-dates-and-time.md`.

## Observations & findings

- `new Date(string)` is ambiguous: a bare `YYYY-MM-DD` parses as UTC midnight,
  while `YYYY-MM-DDTHH:mm` (from `<input type="datetime-local">`) parses as
  local time. Mixing these caused off-by-one-day range matches around timezone
  boundaries.
- The matcher (`matchers.js`) already compared epoch ms via `getTime()`, not raw
  `>=`/`<=` on strings, but it still normalized each side with `new Date(...)`
  independently, so the ambiguity above leaked in.

## Decisions & reasoning

- Centralized date parsing/formatting in `components/format/datetime.js` instead
  of duplicating the tricky rules in `matchers.js` and `RangeInput.vue`.
- Treat a bare `YYYY-MM-DD` as a *local* calendar date (via
  `new Date(y, m - 1, d)`) to match the "user-entered dates are local" rule.
- Kept the comparison on `Date` objects (compared as `getTime()`), preserving
  blank-filter semantics (a blank range still matches everything, even invalid
  field dates).

## Open questions

