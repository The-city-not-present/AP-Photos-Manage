"""Business logic for project creation and lookup."""

import uuid
from datetime import datetime, timezone

from ..db.projects import ProjectRepository


def _utc_now() -> str:
    """Current time as ISO-8601 UTC with an explicit 'Z' designator."""
    return datetime.now(timezone.utc).isoformat(timespec="seconds").replace("+00:00", "Z")


class ProjectService:
    """Creates and reads projects, keeping validation here (not in HTTP)."""

    def __init__(self, repository: ProjectRepository) -> None:
        self.repository = repository

    def create(self, name: str, folder: str, description: str = "") -> dict:
        name = name.strip() if isinstance(name, str) else ""
        folder = folder.strip() if isinstance(folder, str) else ""
        description = description.strip() if isinstance(description, str) else ""

        if not name:
            raise ValueError("name is required")
        if not folder:
            raise ValueError("folder is required")

        project = {
            "id": uuid.uuid4().hex,
            "name": name,
            "description": description,
            "folder": folder,
            "created_at": _utc_now(),
        }
        return self.repository.insert(project)

    def list_all(self) -> list[dict]:
        return self.repository.list_all()

    def get(self, project_id: str) -> dict | None:
        return self.repository.get(project_id)
