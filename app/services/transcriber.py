# Transcriber service

from faster_whisper import WhisperModel
from app.core.config import settings

_whisper = None

def get_whisper():
    global _whisper
    if _whisper is None:
        _whisper = WhisperModel(settings.WHISPER_MODEL_SIZE, device="cpu", compute_type="int8")
    return _whisper

def transcribe(audio_path: str, fast_mode: bool = False) -> str:
    model = get_whisper()
    max_seconds = settings.FAST_MODE_SECONDS if fast_mode else None
    collected = []
    total_time = 0.0
    segments, _ = model.transcribe(audio_path, beam_size=5)
    for s in segments:
        collected.append(s.text.strip())
        if max_seconds is not None:
            # segment objects have start / end
            try:
                total_time = getattr(s, "end", total_time)
            except Exception:
                pass
            if total_time >= max_seconds:
                break
    return " ".join(collected)
