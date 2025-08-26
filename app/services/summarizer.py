# Summarizer service

from typing import Optional
from langchain_google_genai import ChatGoogleGenerativeAI
from app.core.config import settings
from app.prompts.templates import SUMMARY_PROMPT

_model: Optional[ChatGoogleGenerativeAI] = None


def _get_model() -> ChatGoogleGenerativeAI:
    global _model
    if _model is None:
        key = settings.effective_api_key
        if not key:
            raise RuntimeError("Gemini API key not configured (set GOOGLE_API_KEY or GEMINI_API_KEY)")
        _model = ChatGoogleGenerativeAI(model=settings.GEMINI_MODEL_NAME, google_api_key=key, temperature=0.4)
    return _model

def _chunks(s: str, n: int = 5500):
    for i in range(0, len(s), n):
        yield s[i:i+n]

def summarize_transcript(
    transcript: str, *, audience: str = "founders, marketers", language: str = "en"
) -> str:
    """Chunk → summarize → merge, parameterized by audience & language."""
    parts = []
    model = _get_model()
    for chunk in _chunks(transcript):
        prompt_text = SUMMARY_PROMPT.format(
            transcript=chunk, audience=audience, language=language
        )
    parts.append(model.invoke(prompt_text).content.strip())

    if len(parts) == 1:
        return parts[0]

    merged = "\n\n".join(parts)
    fuse = (
        f"Merge into one clean, non-repetitive summary with clear sections "
        f"for {audience} in {language}:\n\n{merged}"
    )
    return model.invoke(fuse).content.strip()
