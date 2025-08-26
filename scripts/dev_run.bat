@echo off
REM Development run script

@echo off
set PYTHONPATH=.
uvicorn app.main:app --reload --port 8000
