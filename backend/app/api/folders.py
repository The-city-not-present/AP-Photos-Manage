"""HTTP routes for browsing folders during the import/create flow."""

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from ..services.folders import scan_photos

router = APIRouter(prefix="/api/folders", tags=["folders"])


class FolderScanRequest(BaseModel):
    path: str


class PhotoRef(BaseModel):
    name: str
    path: str
    size: int


@router.post("/scan", response_model=list[PhotoRef])
def scan_folder(payload: FolderScanRequest) -> list[PhotoRef]:
    try:
        return scan_photos(payload.path)
    except ValueError as error:
        raise HTTPException(status_code=422, detail=str(error)) from error
