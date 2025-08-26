# API schemas

from typing import List, Literal, Optional
from pydantic import BaseModel, HttpUrl, validator, Field

Platform = Literal["blog", "linkedin", "twitter", "thumbnail"]

class ProcessIn(BaseModel):
    url: HttpUrl = Field(..., description="YouTube video URL to process")
    tone: Literal["professional", "casual", "enthusiastic", "authoritative"] = Field(
        default="professional", 
        description="Tone for generated content"
    )
    audience: Optional[str] = Field(
        default="founders, marketers", 
        description="Target audience for content",
        max_length=200
    )
    language: str = Field(
        default="en", 
        description="Language for generated content",
        min_length=2,
        max_length=10
    )
    outputs: List[Platform] = Field(
        default=["blog", "linkedin", "twitter", "thumbnail"],
        description="Types of content to generate"
    )
    fast_mode: bool = Field(
        default=False,
        description="If true, only transcribe the first N seconds (FAST_MODE_SECONDS) for quicker preview"
    )
    
    @validator('url')
    def validate_youtube_url(cls, v):
        """Validate that the URL is a YouTube URL."""
        url_str = str(v)
        if 'youtube.com' not in url_str and 'youtu.be' not in url_str:
            raise ValueError('URL must be a valid YouTube URL')
        return v
    
    @validator('outputs')
    def validate_outputs(cls, v):
        """Validate that at least one output is specified."""
        if not v:
            raise ValueError('At least one output type must be specified')
        return v

class ProcessOut(BaseModel):
    id: str = Field(..., description="Unique request ID")
    input_url: str = Field(..., description="Original input URL")
    summary: str = Field(..., description="Generated summary")
    blog_draft: Optional[str] = Field(None, description="Generated blog draft")
    linkedin_post: Optional[str] = Field(None, description="Generated LinkedIn post")
    twitter_thread: Optional[str] = Field(None, description="Generated Twitter thread")
    thumbnail_texts: Optional[List[str]] = Field(None, description="Generated thumbnail text ideas")

