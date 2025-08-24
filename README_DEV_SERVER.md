# Dev Server (Live Reload)

A tiny Python-based live reload server for this static site.

## Quick Start
```powershell
# (Optional) from Windows PowerShell, make a venv inside WSL path
python -m venv .venv
.venv\Scripts\Activate.ps1  # if running directly in Windows; in WSL use: source .venv/bin/activate

pip install -r requirements.txt
python serve.py
```
Then open (or it auto-opens) http://127.0.0.1:5500

Any edits to:
- *.html at project root
- *.css at project root
- *.js at project root
- anything under assets/

automatically trigger a browser refresh.

## Notes
- Port is 5500 (change in `serve.py`).
- If the browser doesn't auto open, manually navigate to the URL.
- Large image directories are watched recursively; if performance becomes slow, narrow the watch patterns.
- To stop: Ctrl+C in the terminal.

## Troubleshooting
- If port in use: edit `serve.py` and change the port number.
- If auto-reload fails, ensure browser allows WebSocket connections and no firewall is blocking localhost.
