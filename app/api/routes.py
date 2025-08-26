# API route definitions
import uuid
import asyncio
import logging
from fastapi import APIRouter, HTTPException
from app.api.schemas import ProcessIn, ProcessOut
from app.services.downloader import download_audio_from_youtube, cleanup_audio_file, trim_audio
from app.services.transcriber import transcribe
from app.services.summarizer import summarize_transcript
from app.services.generators import generate_assets

logger = logging.getLogger(__name__)
router = APIRouter()

@router.get("/health")
def health():
    return {"status": "ok"}

@router.post("/process", response_model=ProcessOut)
async def process(payload: ProcessIn):
    audio_path = None
    try:
        logger.info(f"Processing request for URL: {payload.url}")
        
        # 1) download audio
        audio_path = await asyncio.to_thread(download_audio_from_youtube, str(payload.url))
        
        # Fast mode optional trim
        if payload.fast_mode:
            try:
                trimmed = await asyncio.to_thread(trim_audio, audio_path)
                audio_path = trimmed
            except Exception as te:
                logger.warning(f"Fast mode trim failed, continuing full audio: {te}")

        # 2) transcribe (CPU-bound, run in thread)
        transcript = await asyncio.to_thread(transcribe, audio_path, payload.fast_mode)
        if not transcript or len(transcript.strip()) < 10:
            raise HTTPException(status_code=400, detail="Failed to transcribe audio or transcript too short")
        
        # 3) summarize with audience + language
        summary = await asyncio.to_thread(
            summarize_transcript,
            transcript,
            audience=payload.audience or "founders, marketers",
            language=payload.language or "en",
        )
        
        # 4) generate selected assets with tone/audience/language
        requested_outputs = [str(o) for o in (payload.outputs or ["blog", "linkedin", "twitter", "thumbnail"])]
        assets = await generate_assets(
            summary,
            tone=payload.tone,
            audience=payload.audience or "founders, marketers",
            language=payload.language or "en",
            outputs=requested_outputs,
        )
        
        logger.info(f"Successfully processed request for URL: {payload.url}")
        return {
            "id": str(uuid.uuid4()),
            "input_url": str(payload.url),
            "summary": summary,
            **assets,
        }
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error processing request for {payload.url}: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")
    finally:
        # Clean up audio file
        if audio_path:
            await asyncio.to_thread(cleanup_audio_file, audio_path)

@router.get("/process")
def process_usage():
    """Helper endpoint so visiting /process in a browser (GET) doesn't 405.
    Returns instructions on how to use the POST /process endpoint.
    """
    return {
        "usage": "POST /process",
        "required_body": {"url": "https://www.youtube.com/watch?v=..."},
        "optional_fields": ["tone", "audience", "language", "outputs"],
        "example_curl": "curl -X POST http://127.0.0.1:8000/process -H 'Content-Type: application/json' -d '{\\n  \"url\": \"https://www.youtube.com/watch?v=VIDEO_ID\"\\n}'"
    }
