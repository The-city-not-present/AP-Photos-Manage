# Project context

> Living document — read at the start of every task and updated on every task.
> It always captures the latest state of the current chats.

## Current state

- Added `.clinerules/00-project-context.md` (sorts first) mandating that this file
  is read at the start and updated on every task.
- Created this `docs/project-context.md` as the living summary document.
- Added a brief mention of it to `README.md` under "Development conventions".

## Observations & findings

- `.clinerules/` rules are numbered files (`01-` … `08-`); `08-commit-messages`
  has no `.md` extension while the others do. A `00-` prefix was used for the new
  rule to keep it first without renumbering the rest.
- The `docs/` directory did not exist before this task.

## Decisions & reasoning

- Named the rule file `00-project-context.md` instead of renumbering all existing
  rules, to minimize churn.
- Gave `docs/project-context.md` a small template (Current state / Observations &
  findings / Decisions & reasoning / Open questions) so future updates have a
  consistent shape and can replace outdated notes rather than append endlessly.

## Open questions
