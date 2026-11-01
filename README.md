# Rabid Printer

A personal tool for **managing** a photo library — sorting, tagging, fixing
dates and GPS, and above all **picking the best shots**. No pixel editing.

Adobe Lightroom or Bridge alone is not enough: this fills the gap on the
*library* side.

## Goals

- **Scoring** on wider scales, based on different parameters.
- **Precise GPS control** — follow the full track and see it on a time scale.
- **Balancing who is represented** in a collection — and so on.

**Picking the best photos is the top priority**, but the tool is broader — more
of a "manage / housekeep" scope: sort, assign tags, correct capture dates, fix
GPS data, and so on.

It may later grow beyond photos to **all files** — anything that needs
categorization and metadata correction (captured date, GPS, …).

## The name

**Rabid Printer** translates the Russian «Бешеный принтер»: a politician — or a
photographer on holiday — who fires off an absurd number of "prints", like a
printer gone out of control (7 000 frames from a short trip). *Rabid* keeps the
double meaning: medical (a rabid dog) and figurative (a "rabid fan"). Full story
and rejected names: [`docs/project-name.md`](docs/project-name.md).

## Run it

Prereqs: Python 3.12+ and Node.js (with npm). Two terminals:

```bash
# backend
cd backend
python3 -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

```bash
# frontend
cd frontend
npm install
npm run dev
```

Open the URL Vite prints (default http://localhost:5173).

## For developers

Everything technical lives in [`docs/developers.md`](docs/developers.md). Quick
map:

- **Architecture** — Vue 3 + Vite frontend, FastAPI + SQLite backend, two
  separate processes ([details](docs/developers.md#architecture)).
- **Build & run** — uvicorn for the backend, Vite for the frontend
  ([details](docs/developers.md#running)).
- **Non-destructive** — originals are never modified; edits live in a catalog
  and optional XMP sidecars ([details](docs/developers.md#non-destructive-editing)).
- **Performance & caching** — two-tier thumbnails, predictive prefetch,
  policy-driven caches on both sides ([details](docs/developers.md#performance)).
- **Conventions** — relative imports, testing, dates & time, etc.
  ([details](docs/developers.md#conventions) and [`.clinerules/`](.clinerules/)).
