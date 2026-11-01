"""Application configuration.

Kept intentionally minimal for now; exact settings (paths, catalog location,
worker counts, ...) will be decided as the app grows.
"""

import os
from pathlib import Path


class Settings:
    app_name = "Rabid Printer"

    # Where the app keeps its own data: the global projects registry and, later,
    # one subdirectory per project (its catalog, caches and search index).
    # Override with the RABID_PRINTER_LIBRARY environment variable.
    library_root = Path(
        os.environ.get("RABID_PRINTER_LIBRARY") or (Path.home() / ".rabid-printer")
    )

    @property
    def projects_db_path(self) -> Path:
        return self.library_root / "projects.sqlite3"


settings = Settings()

