"""Simple live-reload dev server for the static site.

Usage:
  1. (Recommended) Create & activate a virtual environment.
  2. Install deps: pip install -r requirements.txt
  3. Run: python serve.py
  4. Your browser should open at http://127.0.0.1:5500 (auto reload on changes).

It watches html, css, js and anything inside assets/.
"""
from livereload import Server
from pathlib import Path

ROOT = Path(__file__).parent

server = Server()

# Watch top-level web assets
server.watch(str(ROOT / '*.html'))
server.watch(str(ROOT / '*.css'))
server.watch(str(ROOT / '*.js'))
# Watch everything under assets (images, etc.)
server.watch(str(ROOT / 'assets' / '**' / '*'))

# Serve root directory
server.serve(root=str(ROOT), host='127.0.0.1', port=5500, open_url_delay=1)
