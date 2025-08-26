"""FastAPI application entry point."""

import warnings

# Suppress noisy third‑party deprecation warning from ctranslate2 -> pkg_resources
warnings.filterwarnings(
    "ignore",
    message=r"pkg_resources is deprecated as an API",
    category=UserWarning,
)

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from app.api.routes import router as api_router
from app.core.logger import setup_logging
from app.core.config import settings

# Setup logging
setup_logging()

app = FastAPI(
    title="AI Content Repurposer",
    description="Turns YouTube videos into various content formats",
    version="1.0.0"
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Configure appropriately for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router, prefix="")

@app.get("/")
def root():
    return {"service": "repurposer", "version": "1.0.0", "endpoints": ["/health", "/process"]}

@app.on_event("startup")
async def startup_event():
    """Validate configuration on startup."""
    if not getattr(settings, "GOOGLE_API_KEY", None):
        print("ERROR: GOOGLE_API_KEY missing - generation endpoints will fail.")

# run: uvicorn app.main:app --reload

if __name__ == "__main__":
    # Allow running via: python app/main.py
    import uvicorn
    uvicorn.run("app.main:app", host="127.0.0.1", port=8000, reload=True)
