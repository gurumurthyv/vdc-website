"""Minimal Flask backend to handle contact form submissions.
Run with: 
  python contact_server.py
Then the site (served from same directory) can POST to /api/contact
"""
from flask import Flask, request, jsonify
import re

app = Flask(__name__)

EMAIL_RE = re.compile(r"^[^@\s]+@[^@\s]+\.[^@\s]+$")

@app.post('/api/contact')
def contact():
    data = request.get_json(silent=True) or {}
    name = (data.get('name') or '').strip()
    email = (data.get('email') or '').strip()
    subject = (data.get('subject') or '').strip()
    message = (data.get('message') or '').strip()
    missing = [f for f,v in [('name',name),('email',email),('subject',subject),('message',message)] if not v]
    if missing:
        return jsonify(ok=False, error=f"Missing fields: {', '.join(missing)}"), 400
    if not EMAIL_RE.match(email):
        return jsonify(ok=False, error='Invalid email'), 400
    # Here you'd store in DB or send email. For now, emulate success.
    print('Contact submission:', {k: data[k] for k in ('name','email','subject','message')})
    return jsonify(ok=True, message='Message received. We will reply soon.')

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5600, debug=True)
