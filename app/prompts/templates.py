"""Plain string prompt templates (removed LangChain dependency for Gemini)."""

SUMMARY_PROMPT = (
    "Summarize for a {audience} in {language}. Use crisp sections with bullets and key takeaways.\n\n"
    "Transcript:\n{transcript}"
)

BLOG_PROMPT = (
    "Tone: {tone}. Audience: {audience}. Language: {language}. "
    "Write a 700-900 word blog with: a compelling title, 2-3 sentence intro hook, "
    "3-5 H2 sections, one bullet list, and a short CTA conclusion.\n\n{summary}"
)

LINKEDIN_PROMPT = (
    "Tone: {tone}. Audience: {audience}. Language: {language}. "
    "Write a 120-220 word LinkedIn post with a strong hook, short lines, and 3-5 relevant hashtags at the end.\n\n{summary}"
)

TWITTER_PROMPT = (
    "Tone: {tone}. Audience: {audience}. Language: {language}. "
    "Create a 6-8 tweet thread (<280 chars each), add blank lines between tweets, "
    "use 1-2 emojis total and 1-2 hashtags total across the thread.\n\n{summary}"
)

THUMBNAIL_PROMPT = (
    "Language: {language}. Give 8 punchy thumbnail texts (<=6 words), curiosity-inducing, no clickbait.\n\n{summary}"
)

__all__ = [
    "SUMMARY_PROMPT",
    "BLOG_PROMPT",
    "LINKEDIN_PROMPT",
    "TWITTER_PROMPT",
    "THUMBNAIL_PROMPT",
]
