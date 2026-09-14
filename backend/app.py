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


def esc(s):
    """Escape user-controlled strings before embedding in HTML."""
    return (
        str(s)
        .replace("&", "&amp;")
        .replace("<", "&lt;")
        .replace(">", "&gt;")
        .replace('"', "&quot;")
    )


@app.route("/stats", methods=["GET"])
def stats():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    rows = conn.execute("SELECT * FROM visits ORDER BY timestamp DESC").fetchall()
    conn.close()

    total = len(rows)
    unique_ips = len({r["ip"] for r in rows})
    today = datetime.now(timezone.utc).date().isoformat()
    today_count = sum(1 for r in rows if r["timestamp"][:10] == today)

    by_page = {}
    for r in rows:
        by_page[r["page"]] = by_page.get(r["page"], 0) + 1
    top_page = max(by_page, key=by_page.get) if by_page else "\u2014"

    table_rows = ""
    for r in rows[:200]:
        try:
            dt = datetime.fromisoformat(r["timestamp"])
            date_str = dt.strftime("%b %d, %Y")
            time_str = dt.strftime("%I:%M %p").lstrip("0")
        except ValueError:
            date_str, time_str = r["timestamp"][:10], r["timestamp"][11:16]

        referrer = r["referrer"] or "Direct"
        table_rows += f"""
        <tr>
            <td>{esc(date_str)}</td>
            <td class="muted">{esc(time_str)}</td>
            <td>{esc(r["page"] or "/")}</td>
            <td class="muted">{esc(referrer)}</td>
        </tr>"""

    empty_state = """
        <div class="empty">
            <p>No visits recorded yet.</p>
            <p class="muted">Visits will appear here once your site starts getting traffic.</p>
        </div>
    """ if total == 0 else ""

    table_section = "" if total == 0 else f"""
        <table>
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Page</th>
                    <th>Referrer</th>
                </tr>
            </thead>
            <tbody>{table_rows}</tbody>
        </table>
    """

    html = f"""
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Visit stats</title>
        <style>
            /* CHANGE THESE TWO to match your portfolio's exact green */
            :root {{
                --accent: #1D9E75;
                --accent-dark: #04342C;

                --bg: #ffffff;
                --border: #e5e5e5;
                --text: #18181b;
                --text-secondary: #71717a;
            }}
            @media (prefers-color-scheme: dark) {{
                :root {{
                    --bg: #0a0a0a;
                    --border: #2a2a2a;
                    --text: #f4f4f5;
                    --text-secondary: #a1a1aa;
                    --accent-dark: #e5f5ee;
                }}
            }}
            * {{ box-sizing: border-box; }}
            body {{
                font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
                background: var(--bg);
                color: var(--text);
                margin: 0;
                padding: 3rem 1.25rem 4rem;
            }}
            .wrap {{ max-width: 680px; margin: 0 auto; }}
            h1 {{ font-size: 20px; font-weight: 500; margin: 0 0 4px; }}
            .subtitle {{ color: var(--text-secondary); font-size: 14px; margin: 0 0 2.5rem; }}

            .metrics {{
                display: grid;
                grid-template-columns: repeat(4, 1fr);
                border-top: 1px solid var(--accent);
                border-bottom: 1px solid var(--border);
                margin-bottom: 2.5rem;
            }}
            .metric {{ padding: 1rem 0.5rem; border-right: 1px solid var(--border); }}
            .metric:first-child {{ padding-left: 0; }}
            .metric:last-child {{ border-right: none; padding-right: 0; }}
            .metric .label {{
                font-size: 12px;
                color: var(--text-secondary);
                text-transform: uppercase;
                letter-spacing: 0.04em;
                margin: 0 0 8px;
            }}
            .metric .value {{
                font-size: 26px;
                font-weight: 500;
                margin: 0;
                color: var(--accent-dark);
            }}

            .section-title {{
                font-size: 13px;
                font-weight: 500;
                color: var(--text-secondary);
                text-transform: uppercase;
                letter-spacing: 0.04em;
                margin: 0 0 4px;
            }}

            table {{ width: 100%; border-collapse: collapse; font-size: 14px; }}
            thead th {{
                text-align: left;
                padding: 10px 8px;
                font-weight: 400;
                color: var(--text-secondary);
                border-bottom: 1px solid var(--accent);
                font-size: 13px;
            }}
            thead th:first-child {{ padding-left: 0; }}
            thead th:last-child {{ padding-right: 0; }}
            tbody td {{
                padding: 10px 8px;
                border-bottom: 1px solid var(--border);
                white-space: nowrap;
            }}
            tbody td:first-child {{ padding-left: 0; }}
            tbody td:last-child {{ padding-right: 0; }}
            .muted {{ color: var(--text-secondary); }}

            .empty {{
                border-top: 1px solid var(--border);
                padding: 2.5rem 0;
                text-align: center;
            }}
            .empty p {{ margin: 0 0 4px; }}

            @media (max-width: 520px) {{
                .metrics {{ grid-template-columns: repeat(2, 1fr); }}
                .metric:nth-child(2) {{ border-right: none; padding-right: 0; }}
                .metric:nth-child(3) {{ padding-left: 0; border-top: 1px solid var(--border); padding-top: 1rem; margin-top: 1rem; }}
                .metric:nth-child(4) {{ border-top: 1px solid var(--border); padding-top: 1rem; margin-top: 1rem; }}
                thead {{ display: none; }}
                table, tbody, tr, td {{ display: block; width: 100%; }}
                tbody tr {{ padding: 0.6rem 0; border-bottom: 1px solid var(--border); }}
                tbody td {{ border: none; padding: 0.1rem 0 !important; white-space: normal; }}
                tbody td:first-child {{ font-weight: 500; }}
            }}
        </style>
    </head>
    <body>
        <div class="wrap">
            <h1>Visit stats</h1>
            <p class="subtitle">Live data from your site</p>

            <div class="metrics">
                <div class="metric">
                    <p class="label">Total</p>
                    <p class="value">{total}</p>
                </div>
                <div class="metric">
                    <p class="label">Unique</p>
                    <p class="value">{unique_ips}</p>
                </div>
                <div class="metric">
                    <p class="label">Today</p>
                    <p class="value">{today_count}</p>
                </div>
                <div class="metric">
                    <p class="label">Top page</p>
                    <p class="value">{esc(top_page)}</p>
                </div>
            </div>

            <p class="section-title">Recent visits</p>
            {empty_state}
            {table_section}
        </div>
    </body>
    </html>
    """
    return html


if __name__ == "__main__":
    import os
    init_db()
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)