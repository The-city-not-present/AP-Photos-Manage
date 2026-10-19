from fastapi import FastAPI

from .api.health import router as health_router
from .config import settings

app = FastAPI(title=settings.app_name)

app.include_router(health_router)


@app.get("/")
def root() -> dict:
    return {"app": settings.app_name, "status": "ok"}
