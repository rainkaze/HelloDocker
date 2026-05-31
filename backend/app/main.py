from datetime import datetime, timezone
import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware


APP_NAME = os.getenv("APP_NAME", "HelloDocker")
APP_ENV = os.getenv("APP_ENV", "development")

app = FastAPI(
    title=f"{APP_NAME} API",
    description="A small API used to learn Docker with uv and FastAPI.",
    version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/health")
def health() -> dict[str, str]:
    return {
        "status": "ok",
        "service": "backend",
        "app": APP_NAME,
        "environment": APP_ENV,
        "time": datetime.now(timezone.utc).isoformat(),
    }


@app.get("/api/message")
def message() -> dict[str, str]:
    return {
        "title": APP_NAME,
        "message": "Frontend container -> browser -> FastAPI backend is working.",
    }
