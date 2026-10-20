import pytest

from app.services.folders import scan_photos


def _write(path, name, content=b"x"):
    file = path / name
    file.write_bytes(content)
    return file


def test_scan_returns_image_files_sorted(tmp_path):
    _write(tmp_path, "b.jpg")
    _write(tmp_path, "a.PNG")
    _write(tmp_path, "notes.txt")
    _write(tmp_path, "c.jpeg")

    photos = scan_photos(str(tmp_path))

    assert [p["name"] for p in photos] == ["a.PNG", "b.jpg", "c.jpeg"]


def test_scan_reports_size_and_path(tmp_path):
    _write(tmp_path, "a.jpg", b"12345")

    photos = scan_photos(str(tmp_path))

    assert photos[0]["size"] == 5
    assert photos[0]["path"].endswith("a.jpg")


def test_scan_ignores_directories(tmp_path):
    (tmp_path / "sub").mkdir()
    _write(tmp_path, "a.jpg")

    photos = scan_photos(str(tmp_path))

    assert [p["name"] for p in photos] == ["a.jpg"]


def test_scan_requires_path():
    with pytest.raises(ValueError, match="path is required"):
        scan_photos("   ")


def test_scan_rejects_missing_folder(tmp_path):
    with pytest.raises(ValueError, match="folder does not exist"):
        scan_photos(str(tmp_path / "missing"))
