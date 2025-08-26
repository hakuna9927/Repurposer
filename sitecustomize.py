"""Project-wide Python startup customizations.

This module is auto-imported by Python (if on sys.path) before user code.
We use it to silence noisy third-party deprecation warnings that the user
cannot act on directly (e.g., pkg_resources deprecation emitted deep inside
ctranslate2). Remove or adjust as dependencies update.
"""
import warnings

warnings.filterwarnings(
    "ignore",
    message=r"pkg_resources is deprecated as an API",
    category=UserWarning,
)
