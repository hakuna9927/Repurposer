## Repurposer - AI Content Repurposer

Turns a YouTube video into: transcript summary, blog draft, LinkedIn post, Twitter thread, thumbnail text ideas.

### 1. Setup
```bash
python -m venv .venv
# Linux / macOS
source .venv/bin/activate
# Windows PowerShell
.venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

Copy & edit env file:
```bash
cp env.example .env  # (Windows) copy env.example .env
```
Add your `GOOGLE_API_KEY` (Gemini key from Google AI Studio).

Install FFmpeg:
* Windows: https://www.gyan.dev/ffmpeg/builds/ extract then add `bin` folder to PATH or set `FFMPEG_BIN` in `.env`.
* macOS: `brew install ffmpeg`
* Linux (Debian/Ubuntu): `sudo apt-get install ffmpeg`

### 2. Run API
```bash
uvicorn app.main:app --reload
```

Open: http://127.0.0.1:8000/docs

### 3. API Endpoints
* `GET /health` – basic health check
* `POST /process` – body:
```json
{
	"url": "https://www.youtube.com/watch?v=...",
	"tone": "professional",
	"audience": "founders, marketers",
	"language": "en",
	"outputs": ["blog", "linkedin", "twitter", "thumbnail"]
}
```

### 4. Features
* **Input Validation**: Validates YouTube URLs and input parameters
* **Error Handling**: Comprehensive error handling with proper HTTP status codes
* **Resource Management**: Automatic cleanup of temporary files
* **Logging**: Detailed logging for debugging and monitoring
* **CORS Support**: Cross-origin resource sharing enabled
* **API Documentation**: Auto-generated OpenAPI documentation

### 5. Notes
* Provide `GEMINI_API_KEY` (Google AI Studio). `OPENAI_API_KEY` no longer used.
* Whisper model downloads on first run; choose a smaller model for speed.
* Thumbnail ideas are truncated to <= 40 chars.
* Temporary audio files are automatically cleaned up after processing.

### 6. Testing
```bash
pytest tests/
```

### 7. Docker
```bash
docker build -t repurposer .
docker run -p 8000:8000 --env-file .env repurposer
```

### 8. Recent Improvements
- ✅ Fixed duplicate Dockerfile content
- ✅ Added proper error handling and validation
- ✅ Implemented resource cleanup
- ✅ Added comprehensive logging
- ✅ Enhanced test coverage
- ✅ Added input validation for URLs and parameters
- ✅ Created missing env.example file

