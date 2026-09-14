"""
Simple visit-tracking API for a React portfolio site.

Run it:
    pip install flask flask-cors --break-system-packages
    python app.py

It listens on http://localhost:5000/track
Your React app calls this endpoint once when the site loads.
"""

import sqlite3
from datetime import datetime, timezone
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # allow requests from your React app's domain

DB_PATH = "visits.db"


def init_db():
    conn = sqlite3.connect(DB_PATH)
    conn.execute("""
        CREATE TABLE IF NOT EXISTS visits (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            timestamp TEXT NOT NULL,
            page TEXT,
            referrer TEXT,
            ip TEXT,
            user_agent TEXT
        )
    """)
    conn.commit()
    conn.close()


@app.route("/track", methods=["POST"])
def track_visit():
    data = request.get_json(silent=True) or {}
    page = data.get("page", "/")
    referrer = data.get("referrer", "")
    ip = request.headers.get("X-Forwarded-For", request.remote_addr)
    user_agent = request.headers.get("User-Agent", "")

    conn = sqlite3.connect(DB_PATH)
    conn.execute(
        "INSERT INTO visits (timestamp, page, referrer, ip, user_agent) VALUES (?, ?, ?, ?, ?)",
        (datetime.now(timezone.utc).isoformat(), page, referrer, ip, user_agent),
    )
    conn.commit()
    conn.close()
    return jsonify({"status": "ok"}), 200


if __name__ == "__main__":
    import os
    init_db()
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)