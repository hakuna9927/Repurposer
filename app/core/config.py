# Configuration settings


from pydantic_settings import BaseSettings, SettingsConfigDict
from typing import Optional
import os


class Settings(BaseSettings):
    GOOGLE_API_KEY: Optional[str] = None  # Preferred name
    GEMINI_API_KEY: Optional[str] = None  # Backward compatibility
    GEMINI_MODEL_NAME: str = "gemini-1.5-flash"
    WHISPER_MODEL_SIZE: str = "base"
    FFMPEG_BIN: Optional[str] = None
    FAST_MODE_SECONDS: int = 120

    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    def ensure_ffmpeg_on_path(self):
        if self.FFMPEG_BIN and os.path.isdir(self.FFMPEG_BIN):
            path_parts = os.environ.get("PATH", "").split(os.pathsep)
            if self.FFMPEG_BIN not in path_parts:
                os.environ["PATH"] = self.FFMPEG_BIN + os.pathsep + os.environ.get("PATH", "")

    @property
    def effective_api_key(self) -> Optional[str]:
        return self.GOOGLE_API_KEY or self.GEMINI_API_KEY


settings = Settings()
settings.ensure_ffmpeg_on_path()
