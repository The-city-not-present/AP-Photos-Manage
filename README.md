# App Photo Assistant

A personal photo assistant for **managing and sorting** your photo library.

The goal is the *management* side of tools like Lightroom (its Library module),
ACDSee or Adobe Bridge — everything except pixel editing. It is not about any
single task (rating, or GPS, or faces); it is about bringing all of those
together so you can curate a collection efficiently.

## What it does (the full goal, not one feature)

- **Assess / rate** photos to surface the best shots. The assessment model is
  deliberately left open for now — see below.
- **Flag / pick** the valuable and important photos — the ones that tell the
  story of a journey.
- **Tag** photos with keywords and organize them into **collections/journeys**.
- **Correct capture time** when the camera clock was wrong (including timezone
  shifts) — without ever destroying the original value.
- **Assign GPS / location** where the camera did not record it.
- **Manage people** — detect and recognize who is in each photo, and check that
  everyone on a trip is fairly represented (or understand *why* someone appears
  more often, e.g. they were more active and participating in more activities).

### Assessment — open design space

Surfacing the best shots is a primary goal, but *how* a photo is assessed is
still to be decided. Possible roads, not yet chosen:

- **A single rating scale** — for example 0–5 stars, or a finer scale such as
  1–10, 0–10, 1–100 or 0–100.
- **Parallel scales** for different characteristics — e.g. technical quality;
  significance as art (creativity); how well a shot describes the journey; how
  well it delivers emotion; or how well it documents the journey "technically"
  (like an encyclopedia entry about rarely visited, distant places).
- **Pairwise comparison** — instead of scoring each photo in isolation, compare
  two side by side and pick the better one (often easier and more consistent).
- **Best / worst elicitation** — present separate screens and let the user pick
  one best and one worst, then derive ratings from those choices mathematically.

The chosen approach (or combination) will be decided later.

Non-destructive by design: **originals are never modified**. Ratings, flags,
tags and capture-time overrides live in a catalog (SQLite) and can optionally be
written back later as XMP sidecars.

## Performance goals

The core value is fast, smooth browsing on large libraries:

- **Two-tier cache** — small thumbnails for the grid, larger previews for the
  single-photo view.
- **Predictive prefetch** — pre-decode a lookahead window in the current sort
  order so navigation feels instant.
- **Fast indexing** — hash-based dedup, SQLite in WAL mode, FTS5 full-text search.
- **Virtualized UI** — only the visible grid cells are rendered.

### Caching & prefetching — controlled on both sides

Both the **frontend** and the **backend** keep their own cache, and neither
caches blindly:

- **Frontend** — keeps decoded/rendered content in memory. When the user flips
  quickly between several photos, it may decide *not* to destroy a component and
  keep its loaded content alive for a while.
- **Backend** — keeps generated thumbnails/previews and decoded metadata, with
  more focus on *prediction*. When the user scrolls forward quickly, it can start
  preloading the next photo, or the next several, sooner.

Each cache is governed by a dedicated, isolated **cache-policy** component that
makes the keep / drop / preload decisions from explicit inputs: how much memory
the currently held objects take, and whether it should keep more, hold steady, or
reduce its appetite. Keeping this policy in one isolated place means it can be
reasoned about and unit-tested separately from the UI and storage layers.

## Architecture

Two separate processes, kept deliberately apart so every request is visible and
every component is independently debuggable:

```
┌──────────────────┐   HTTP/JSON + WebSocket   ┌───────────────────┐
│  Frontend        │ ────────────────────────▶ │  Backend          │
│  Vue 3 + Vite    │   (visible in DevTools    │  Python / FastAPI │
│                  │    Network tab)           │  SQLite catalog   │
└──────────────────┘                           └───────────────────┘
```

- **Frontend** (`frontend/`): Vue 3 + Vite + `<script setup>`.
- **Backend** (`backend/`): Python 3.12+ / FastAPI + uvicorn; SQLite as the
  catalog; image/metadata libraries (Pillow, exiftool, face detection, etc.)
  are added as needed per milestone.

Keeping them as separate processes is intentional: it gives full visibility into
network requests and a clean, explicit boundary. A native desktop wrapper can be
added later if it ever becomes necessary.

## Repository layout

```
apphotoassistant/
├── README.md
├── .gitignore
├── backend/
│   ├── requirements.txt
│   └── app/
│       ├── main.py            # FastAPI entry point
│       ├── config.py          # settings (minimal for now)
│       ├── api/               # HTTP routes — one module per resource
│       ├── db/                # catalog / persistence (SQLite)
│       └── services/          # business logic (import, thumbnails, faces…)
└── frontend/
    ├── package.json
    ├── vite.config.js
    ├── index.html
    └── src/
        ├── main.js
        ├── App.vue              # root shell — mounts the router view
        ├── router/              # route definitions (project selector ↔ app)
        ├── assets/              # global styles
        ├── components/          # common components (shared by outer + app)
        ├── views/               # outer pages: projects, import, help, 404
        └── app/                 # the loaded-project app (encapsulated instance)
            ├── ProjectApp.vue   # project shell + nested routes
            └── views/           # app pages: overview, catalog
```

### Two areas, one app

The frontend is split into two areas that share the same router and the same
common components:

- **Outer** (`src/views/`) — pick or import a project before anything is loaded:
  the project list, the "import photos" page and help.
- **App** (`src/app/`) — the encapsulated instance that runs once a project is
  loaded (its own catalog, database, index and caches). It is self-contained but
  can import common components from `src/components/`.

## Development conventions

- **Every component/module is independent and reusable.** It can be moved,
  lifted to another place in the app, or extracted into a submodule without
  breaking the rest.
- **Relative imports only.** Modules import their neighbours via `./` and `../`,
  never via an app-root path, so each component stays self-contained even if it
  is relocated.
- Keep the structure **minimal for now** — exact decisions are made later, and
  the layout will grow (with deeper nesting) as components are added.

## Roadmap

1. **M1 — Import + grid + rating/flag.** Import a folder, generate thumbnails,
   browse a virtualized grid, rate/flag with the keyboard, view/correct capture
   time. *(Proves the two risky things early: thumbnail cache and grid speed.)*
2. **M2 — Metadata.** EXIF read/write, GPS display, capture-time correction,
   XMP sidecar write-back.
3. **M3 — Tags & journeys.** Keyword tagging, collections, search.
4. **M4 — People.** Face detection, clustering, labeling, fair-representation
   report.

## Running

Backend (one terminal):

```bash
cd backend
python3 -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

Frontend (another terminal):

```bash
cd frontend
npm install
npm run dev
```

Open the URL Vite prints (default http://localhost:5173). Requests to `/api` are
proxied to the backend at http://localhost:8000.
