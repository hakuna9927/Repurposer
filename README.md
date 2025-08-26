## Repurposer - AI Content Repurposer

Turns a YouTube video into: transcript summary, blog draft, LinkedIn post, Twitter thread, thumbnail text ideas.


## 1. Backend Setup (FastAPI)

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
* Windows: https://www.gyan.dev/ffmpeg/builds/ (extract, add `bin` to PATH or set `FFMPEG_BIN` in `.env`)
* macOS: `brew install ffmpeg`
* Linux (Debian/Ubuntu): `sudo apt-get install ffmpeg`

---

## 2. Frontend Setup (Vite + React + Tailwind)

```bash
cd frontend
npm install
# Start dev server
npm run dev
# Build for production
npm run build
```

The dev server runs at http://localhost:5173 (default). The frontend expects the FastAPI backend at http://127.0.0.1:8000 (see `VITE_API_BASE` in code).

---

## 3. Run API (Backend)

```bash
uvicorn app.main:app --reload
```

Open: http://127.0.0.1:8000/docs

---

## 4. API Endpoints

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


## 5. Features

* **Modern UI**: Vite + React + Tailwind CSS frontend
* **Input Validation**: Validates YouTube URLs and input parameters
* **Error Handling**: Comprehensive error handling with proper HTTP status codes
* **Resource Management**: Automatic cleanup of temporary files
* **Logging**: Detailed logging for debugging and monitoring
* **CORS Support**: Cross-origin resource sharing enabled
* **API Documentation**: Auto-generated OpenAPI documentation

---

## 6. Notes

* Provide `GEMINI_API_KEY` (Google AI Studio). `OPENAI_API_KEY` no longer used.
* Whisper model downloads on first run; choose a smaller model for speed.
* Thumbnail ideas are truncated to <= 40 chars.
* Temporary audio files are automatically cleaned up after processing.

---

## 7. Testing

```bash
pytest tests/
```

---

## 8. Docker

```bash
docker build -t repurposer .
docker run -p 8000:8000 --env-file .env repurposer
```

---

## 9. Project Structure

```
Repurposer/
├── app/         # FastAPI backend
├── frontend/    # Vite + React + Tailwind frontend
├── tests/       # Backend tests
├── Dockerfile   # Backend Dockerfile
├── requirements.txt
└── ...
```

---

## 10. Recent Improvements

- ✅ Added Vite + React frontend
- ✅ Fixed duplicate Dockerfile content
- ✅ Added proper error handling and validation
- ✅ Implemented resource cleanup
- ✅ Added comprehensive logging
- ✅ Enhanced test coverage
- ✅ Added input validation for URLs and parameters
- ✅ Created missing env.example file

