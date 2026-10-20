from app.db.projects import ProjectRepository


def _project(**overrides):
    base = {
        "id": "1",
        "name": "Trip",
        "description": "",
        "folder": "/photos/trip",
        "created_at": "2025-07-15T10:00:00Z",
    }
    base.update(overrides)
    return base


def test_insert_and_list(tmp_path):
    repo = ProjectRepository(tmp_path / "test.sqlite3")
    repo.insert(_project())

    assert repo.list_all() == [_project()]


def test_list_all_orders_newest_first(tmp_path):
    repo = ProjectRepository(tmp_path / "test.sqlite3")
    repo.insert(_project(id="a", created_at="2025-01-01T00:00:00Z"))
    repo.insert(_project(id="b", created_at="2025-02-01T00:00:00Z"))

    ids = [p["id"] for p in repo.list_all()]
    assert ids == ["b", "a"]


def test_get_returns_record(tmp_path):
    repo = ProjectRepository(tmp_path / "test.sqlite3")
    repo.insert(_project(id="abc"))

    assert repo.get("abc") == _project(id="abc")


def test_get_returns_none_when_missing(tmp_path):
    repo = ProjectRepository(tmp_path / "test.sqlite3")

    assert repo.get("missing") is None


def test_delete_removes_record(tmp_path):
    repo = ProjectRepository(tmp_path / "test.sqlite3")
    repo.insert(_project(id="abc"))

    assert repo.delete("abc") is True
    assert repo.get("abc") is None
    assert repo.list_all() == []


def test_delete_returns_false_when_missing(tmp_path):
    repo = ProjectRepository(tmp_path / "test.sqlite3")

    assert repo.delete("missing") is False
