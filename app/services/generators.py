# Generators service

import asyncio
from typing import Dict, Any, List, Optional
from langchain_google_genai import ChatGoogleGenerativeAI
from app.core.config import settings
from app.prompts.templates import (
    BLOG_PROMPT,
    LINKEDIN_PROMPT,
    TWITTER_PROMPT,
    THUMBNAIL_PROMPT,
)

_model: Optional[ChatGoogleGenerativeAI] = None


def _get_model() -> ChatGoogleGenerativeAI:
    global _model
    if _model is None:
        key = settings.effective_api_key
        if not key:
            raise RuntimeError("Gemini API key not configured (set GOOGLE_API_KEY or GEMINI_API_KEY)")
        _model = ChatGoogleGenerativeAI(model=settings.GEMINI_MODEL_NAME, google_api_key=key, temperature=0.4)
    return _model

def _gen(prompt, summary, tone, audience, language) -> str:
    model = _get_model()
    prompt_text = prompt.format(
        summary=summary, tone=tone, audience=audience, language=language
    )
    return model.invoke(prompt_text).content.strip()

async def generate_assets(
    summary: str,
    *,
    tone: str,
    audience: str,
    language: str,
    outputs: List[str],
) -> Dict[str, Any]:
    """Generate only the requested outputs; return a dict of fields."""
    tasks: Dict[str, asyncio.Task] = {}

    if "blog" in outputs:
        tasks["blog_draft"] = asyncio.create_task(
            asyncio.to_thread(_gen, BLOG_PROMPT, summary, tone, audience, language)
        )
    if "linkedin" in outputs:
        tasks["linkedin_post"] = asyncio.create_task(
            asyncio.to_thread(_gen, LINKEDIN_PROMPT, summary, tone, audience, language)
        )
    if "twitter" in outputs:
        tasks["twitter_thread"] = asyncio.create_task(
            asyncio.to_thread(_gen, TWITTER_PROMPT, summary, tone, audience, language)
        )
    if "thumbnail" in outputs:
        tasks["thumbnail_texts_raw"] = asyncio.create_task(
            asyncio.to_thread(_gen, THUMBNAIL_PROMPT, summary, tone, audience, language)
        )

    # gather keeping keys aligned
    results: Dict[str, Any] = {}
    keys = list(tasks.keys())
    values = await asyncio.gather(*tasks.values())

    for k, v in zip(keys, values):
        if k == "thumbnail_texts_raw":
            ideas = [t.strip("-• ").strip() for t in v.split("\n") if t.strip()]
            results["thumbnail_texts"] = [i for i in ideas if len(i) <= 40][:8]
        else:
            results[k] = v

    return results
