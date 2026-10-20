import pytest
from fastapi.testclient import TestClient

from app.api.projects import get_service
from app.db.projects import ProjectRepository
from app.main import app
from app.services.projects import ProjectService


@pytest.fixture
def client(tmp_path):
    repository = ProjectRepository(tmp_path / "test.sqlite3")
    app.dependency_overrides[get_service] = lambda: ProjectService(repository)
    with TestClient(app) as test_client:
        yield test_client
    app.dependency_overrides.clear()


def test_create_project(client):
    response = client.post(
        "/api/projects",
        json={"name": "Trip", "folder": "/photos/trip", "description": "My notes"},
    )

    assert response.status_code == 201
    body = response.json()
    assert body["name"] == "Trip"
    assert body["folder"] == "/photos/trip"
    assert body["description"] == "My notes"
    assert body["id"]
    assert body["created_at"].endswith("Z")


def test_create_project_defaults_description(client):
    response = client.post("/api/projects", json={"name": "Trip", "folder": "/photos"})

    assert response.status_code == 201
    assert response.json()["description"] == ""


def test_create_project_rejects_empty_name(client):
    response = client.post("/api/projects", json={"name": "", "folder": "/photos"})

    assert response.status_code == 422


def test_list_projects(client):
    client.post("/api/projects", json={"name": "Trip", "folder": "/photos"})

    response = client.get("/api/projects")

    assert response.status_code == 200
    assert len(response.json()) == 1


def test_get_project(client):
    created = client.post(
        "/api/projects", json={"name": "Trip", "folder": "/photos"}
    ).json()

    response = client.get(f"/api/projects/{created['id']}")

    assert response.status_code == 200
    assert response.json()["name"] == "Trip"


def test_get_missing_project(client):
    response = client.get("/api/projects/does-not-exist")

    assert response.status_code == 404
