# Basic smoke tests
import pytest
from fastapi.testclient import TestClient
from app.main import app
from app.core.config import settings

client = TestClient(app)

def test_imports():
    """Test that all modules can be imported."""
    import app
    from app.core.config import settings
    from app.api.schemas import ProcessIn, ProcessOut
    from app.services.downloader import download_audio_from_youtube
    from app.services.transcriber import transcribe
    from app.services.summarizer import summarize_transcript
    from app.services.generators import generate_assets
    assert hasattr(settings, "GOOGLE_API_KEY")

def test_health_endpoint():
    """Test the health endpoint."""
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "ok"}

def test_process_endpoint_validation():
    """Test input validation for the process endpoint."""
    # Test with invalid URL
    response = client.post("/process", json={
        "url": "https://example.com/not-youtube",
        "outputs": ["blog"]
    })
    assert response.status_code == 422  # Validation error
    
    # Test with empty outputs
    response = client.post("/process", json={
        "url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        "outputs": []
    })
    assert response.status_code == 422  # Validation error

def test_api_documentation():
    """Test that API documentation is accessible."""
    response = client.get("/docs")
    assert response.status_code == 200

def test_openapi_schema():
    """Test that OpenAPI schema is accessible."""
    response = client.get("/openapi.json")
    assert response.status_code == 200
    schema = response.json()
    assert "paths" in schema
    assert "/health" in schema["paths"]
    assert "/process" in schema["paths"]
