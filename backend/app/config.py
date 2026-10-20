"""Application configuration.

Kept intentionally minimal for now; exact settings (paths, catalog location,
worker counts, ...) will be decided as the app grows.
"""

import os
from pathlib import Path


class Settings:
    app_name = "App Photo Assistant"

    # Where the app keeps its own data: the global projects registry and, later,
    # one subdirectory per project (its catalog, caches and search index).
    # Override with the APP_PHOTO_ASSISTANT_LIBRARY environment variable.
    library_root = Path(
        os.environ.get("APP_PHOTO_ASSISTANT_LIBRARY") or (Path.home() / ".apphotoassistant")
    )

    @property
    def projects_db_path(self) -> Path:
        return self.library_root / "projects.sqlite3"


settings = Settings()

