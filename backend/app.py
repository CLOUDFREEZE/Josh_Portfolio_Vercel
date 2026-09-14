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


@app.route("/stats", methods=["GET"])
def stats():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    rows = conn.execute("SELECT * FROM visits ORDER BY timestamp").fetchall()
    conn.close()

    total = len(rows)
    unique_ips = len({r["ip"] for r in rows})

    by_day = {}
    by_page = {}
    for r in rows:
        day = r["timestamp"][:10]
        by_day[day] = by_day.get(day, 0) + 1
        by_page[r["page"]] = by_page.get(r["page"], 0) + 1

    day_rows = "".join(f"<tr><td>{d}</td><td>{c}</td></tr>" for d, c in sorted(by_day.items()))
    page_rows = "".join(f"<tr><td>{p}</td><td>{c}</td></tr>" for p, c in sorted(by_page.items(), key=lambda x: -x[1]))

    html = f"""
    <html>
    <head>
        <title>Portfolio Visit Stats</title>
        <style>
            body {{ font-family: sans-serif; max-width: 600px; margin: 40px auto; }}
            table {{ border-collapse: collapse; width: 100%; margin-bottom: 30px; }}
            td, th {{ border: 1px solid #ccc; padding: 6px 10px; text-align: left; }}
        </style>
    </head>
    <body>
        <h1>Portfolio Visit Stats</h1>
        <p><strong>Total visits:</strong> {total}</p>
        <p><strong>Unique visitors:</strong> {unique_ips}</p>

        <h2>Visits by day</h2>
        <table><tr><th>Day</th><th>Visits</th></tr>{day_rows}</table>

        <h2>Top pages</h2>
        <table><tr><th>Page</th><th>Visits</th></tr>{page_rows}</table>
    </body>
    </html>
    """
    return html


if __name__ == "__main__":
    import os
    init_db()
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)