"""Folder scanning for the import/create flow."""

import os
from pathlib import Path

IMAGE_EXTENSIONS = {
    ".jpg", ".jpeg", ".png", ".gif", ".webp", ".bmp", ".tif", ".tiff",
    ".heic", ".heif",
    # Raw formats common in photo libraries.
    ".cr2", ".cr3", ".nef", ".arw", ".orf", ".dng", ".raf", ".rw2", ".pef", ".srw",
}


def scan_photos(folder: str) -> list[dict]:
    """List image files in a folder (non-recursive), sorted by name."""
    folder = folder.strip() if isinstance(folder, str) else ""
    if not folder:
        raise ValueError("path is required")

    path = Path(folder).expanduser()
    if not path.is_dir():
        raise ValueError("folder does not exist or is not a directory")

    photos = []
    for entry in sorted(os.scandir(path), key=lambda e: e.name.lower()):
        try:
            if not entry.is_file(follow_symlinks=False):
                continue
            if Path(entry.name).suffix.lower() not in IMAGE_EXTENSIONS:
                continue
            size = entry.stat(follow_symlinks=False).st_size
        except OSError:
            continue
        photos.append({"name": entry.name, "path": entry.path, "size": size})
    return photos
