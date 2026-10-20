from fastapi import FastAPI

from .api.folders import router as folders_router
from .api.health import router as health_router
from .api.projects import router as projects_router
from .config import settings

app = FastAPI(title=settings.app_name)

app.include_router(health_router)
app.include_router(projects_router)
app.include_router(folders_router)


@app.get("/")
def root() -> dict:
    return {"app": settings.app_name, "status": "ok"}

