import pytest

from app.db.projects import ProjectRepository
from app.services.projects import ProjectService


def make_service(tmp_path):
    return ProjectService(ProjectRepository(tmp_path / "test.sqlite3"))


def test_create_strips_and_stores(tmp_path):
    service = make_service(tmp_path)
    project = service.create("  Trip  ", "  /photos/trip  ", "  My notes  ")

    assert project["name"] == "Trip"
    assert project["folder"] == "/photos/trip"
    assert project["description"] == "My notes"
    assert project["id"]
    assert project["created_at"].endswith("Z")


def test_create_defaults_description_to_empty(tmp_path):
    service = make_service(tmp_path)

    assert service.create("Trip", "/photos")["description"] == ""


def test_create_requires_name(tmp_path):
    service = make_service(tmp_path)

    with pytest.raises(ValueError, match="name is required"):
        service.create("  ", "/photos")


def test_create_requires_folder(tmp_path):
    service = make_service(tmp_path)

    with pytest.raises(ValueError, match="folder is required"):
        service.create("Trip", "  ")


def test_list_and_get(tmp_path):
    service = make_service(tmp_path)
    created = service.create("Trip", "/photos", "desc")

    assert service.list_all() == [created]
    assert service.get(created["id"]) == created
    assert service.get("missing") is None
