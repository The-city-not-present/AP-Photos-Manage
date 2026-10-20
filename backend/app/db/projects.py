"""SQLite persistence for the global projects registry.

A project record here is only the "basic data" the selector needs: an id, a
name, a description and the source photos folder. Per-project storage (catalog,
caches, search index) will live under its own directory later; the registry is
the pointer to that container.
"""

import sqlite3
from pathlib import Path

_SCHEMA = """
CREATE TABLE IF NOT EXISTS projects (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT NOT NULL DEFAULT '',
    folder TEXT NOT NULL,
    created_at TEXT NOT NULL
);
"""

_COLUMNS = "id, name, description, folder, created_at"


class ProjectRepository:
    """SQLite-backed store for project records."""

    def __init__(self, db_path: str | Path) -> None:
        self.db_path = Path(db_path)
        self.db_path.parent.mkdir(parents=True, exist_ok=True)
        self._init_schema()

    def _connect(self) -> sqlite3.Connection:
        conn = sqlite3.connect(str(self.db_path))
        conn.row_factory = sqlite3.Row
        return conn

    def _init_schema(self) -> None:
        conn = self._connect()
        try:
            conn.execute(_SCHEMA)
            conn.commit()
        finally:
            conn.close()

    def insert(self, project: dict) -> dict:
        conn = self._connect()
        try:
            conn.execute(
                f"INSERT INTO projects ({_COLUMNS}) VALUES (?, ?, ?, ?, ?)",
                (
                    project["id"],
                    project["name"],
                    project["description"],
                    project["folder"],
                    project["created_at"],
                ),
            )
            conn.commit()
        finally:
            conn.close()
        return project

    def list_all(self) -> list[dict]:
        conn = self._connect()
        try:
            rows = conn.execute(
                f"SELECT {_COLUMNS} FROM projects ORDER BY created_at DESC, id"
            ).fetchall()
            return [dict(row) for row in rows]
        finally:
            conn.close()

    def get(self, project_id: str) -> dict | None:
        conn = self._connect()
        try:
            row = conn.execute(
                f"SELECT {_COLUMNS} FROM projects WHERE id = ?", (project_id,)
            ).fetchone()
            return dict(row) if row else None
        finally:
            conn.close()

    def delete(self, project_id: str) -> bool:
        conn = self._connect()
        try:
            cursor = conn.execute("DELETE FROM projects WHERE id = ?", (project_id,))
            conn.commit()
            return cursor.rowcount > 0
        finally:
            conn.close()
