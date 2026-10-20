import pytest
from fastapi.testclient import TestClient

from app.main import app


@pytest.fixture
def client():
    with TestClient(app) as test_client:
        yield test_client


def test_scan_folder(client, tmp_path):
    (tmp_path / "a.jpg").write_bytes(b"x")
    (tmp_path / "b.png").write_bytes(b"xx")

    response = client.post("/api/folders/scan", json={"path": str(tmp_path)})

    assert response.status_code == 200
    names = [p["name"] for p in response.json()]
    assert names == ["a.jpg", "b.png"]


def test_scan_folder_requires_path(client):
    response = client.post("/api/folders/scan", json={"path": "   "})

    assert response.status_code == 422
