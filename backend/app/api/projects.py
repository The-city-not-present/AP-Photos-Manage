"""HTTP routes for the global projects registry."""

from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel

from ..config import settings
from ..db.projects import ProjectRepository
from ..services.projects import ProjectService

router = APIRouter(prefix="/api/projects", tags=["projects"])


class ProjectCreate(BaseModel):
    name: str
    folder: str
    description: str = ""


class ProjectRead(BaseModel):
    id: str
    name: str
    description: str
    folder: str
    created_at: str


def get_service() -> ProjectService:
    repository = ProjectRepository(settings.projects_db_path)
    return ProjectService(repository)


@router.post("", response_model=ProjectRead, status_code=201)
def create_project(payload: ProjectCreate, service: ProjectService = Depends(get_service)):
    try:
        return service.create(payload.name, payload.folder, payload.description)
    except ValueError as error:
        raise HTTPException(status_code=422, detail=str(error)) from error


@router.get("", response_model=list[ProjectRead])
def list_projects(service: ProjectService = Depends(get_service)):
    return service.list_all()


@router.get("/{project_id}", response_model=ProjectRead)
def get_project(project_id: str, service: ProjectService = Depends(get_service)):
    project = service.get(project_id)
    if project is None:
        raise HTTPException(status_code=404, detail="project not found")
    return project
