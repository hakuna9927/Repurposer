# Downloader service

import os
import tempfile
import yt_dlp
import logging
from typing import Optional
import subprocess

logger = logging.getLogger(__name__)

def download_audio_from_youtube(url: str) -> str:
    """
    Downloads YouTube audio and returns the local MP3 path.
    Requires ffmpeg to be on PATH (which you already set).
    """
    tmpdir = tempfile.mkdtemp(prefix="yt_")
    outfile = os.path.join(tmpdir, "%(id)s.%(ext)s")

    ydl_opts = {
        "format": "bestaudio/best",
        "outtmpl": outfile,
        "postprocessors": [
            {"key": "FFmpegExtractAudio", "preferredcodec": "mp3", "preferredquality": "192"}
        ],
        # No ffmpeg_location needed if ffmpeg is on PATH
        "noplaylist": True,
        "quiet": True,
    }

    try:
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            logger.info(f"Downloading audio from: {url}")
            info = ydl.extract_info(url, download=True)
            audio_path = os.path.join(tmpdir, f"{info['id']}.mp3")
            
            if not os.path.exists(audio_path):
                raise FileNotFoundError(f"Audio file not found after download: {audio_path}")
            
            logger.info(f"Successfully downloaded audio: {audio_path}")
            return audio_path
            
    except Exception as e:
        logger.error(f"Failed to download audio from {url}: {str(e)}")
        # Clean up temp directory on failure
        try:
            import shutil
            shutil.rmtree(tmpdir)
        except:
            pass
        raise RuntimeError(f"Failed to download audio from YouTube: {str(e)}")

def cleanup_audio_file(audio_path: str) -> None:
    """Clean up downloaded audio file and its directory."""
    try:
        if audio_path and os.path.exists(audio_path):
            import shutil
            tmpdir = os.path.dirname(audio_path)
            shutil.rmtree(tmpdir)
            logger.info(f"Cleaned up audio file: {audio_path}")
    except Exception as e:
        logger.warning(f"Failed to cleanup audio file {audio_path}: {str(e)}")


def trim_audio(audio_path: str, seconds: int = 120) -> str:
    """Create a trimmed copy of the first `seconds` of audio to speed up preview.
    Returns path to trimmed file inside same temp directory.
    """
    base_dir = os.path.dirname(audio_path)
    trimmed_path = os.path.join(base_dir, "trimmed_preview.mp3")
    cmd = [
        "ffmpeg",
        "-y",
        "-i",
        audio_path,
        "-t",
        str(seconds),
        "-acodec",
        "copy",
        trimmed_path,
    ]
    try:
        subprocess.run(cmd, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, check=True)
        if os.path.exists(trimmed_path):
            return trimmed_path
        raise RuntimeError("Trimmed file not created")
    except Exception as e:
        raise RuntimeError(f"Failed to trim audio: {e}")
