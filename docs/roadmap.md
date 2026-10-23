# TODOs

This section captures everything that comes to mind that should ideally be
updated or decided. Tasks listed here are not necessarily the highest priority.

## Decide on a better project name

The project name is inconsistent across the repo, and none of the current names
captures what the tool is actually for. AI suggestions were already tried and
none were liked.

Current names in use:

- Git repo: `AP-Photos-Manage`
  (`git@github.com:The-city-not-present/AP-Photos-Manage.git`)
- Local directory & frontend package: `apphotoassistant`
  (`frontend/package.json` and `frontend/package-lock.json` both use
  `apphotoassistant-frontend`)
- README & UI title: "App Photo Assistant" — `README.md`,
  `frontend/index.html`, `frontend/src/views/OuterLayout.vue`,
  `frontend/src/config/help-page.js`
- Backend: `app_name = "App Photo Assistant"`, env var
  `APP_PHOTO_ASSISTANT_LIBRARY`, default data dir `~/.apphotoassistant`
  (`backend/app/config.py`); package docstring `backend/app/__init__.py`

What the name should convey:

- The primary goal is not a single task but the **overall management of photos**.
- Picking/selecting the **best photos** is the top-priority task, but the tool is
  broader — more of a "manage" / "housekeep" scope: sort, assign tags, correct
  capture dates, fix GPS data, etc.
- It may later expand beyond photos to **all files** — anything that needs
  categorization and metadata correction (captured date, GPS, ...).

Constraints:

- Easy to understand for **non-native English speakers** — simple, widely
  recognized words.
- Should read as a general manager / housekeeper, not as a single-purpose tool.

Status: name not yet decided.
