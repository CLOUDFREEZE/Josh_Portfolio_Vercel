"""
View your portfolio's visit stats.

Run it:
    python analyze.py
"""

import sqlite3
from collections import Counter
from datetime import datetime

DB_PATH = "visits.db"


def load_visits():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    rows = conn.execute("SELECT * FROM visits ORDER BY timestamp").fetchall()
    conn.close()
    return rows


def main():
    rows = load_visits()

    if not rows:
        print("No visits recorded yet.")
        return

    total = len(rows)
    unique_ips = len({r["ip"] for r in rows})

    by_day = Counter(r["timestamp"][:10] for r in rows)
    by_page = Counter(r["page"] for r in rows)
    by_referrer = Counter(r["referrer"] or "(direct)" for r in rows)

    print(f"Total visits: {total}")
    print(f"Unique visitors (by IP): {unique_ips}\n")

    print("Visits by day:")
    for day, count in sorted(by_day.items()):
        print(f"  {day}: {count}")

    print("\nTop pages:")
    for page, count in by_page.most_common(10):
        print(f"  {page}: {count}")

    print("\nTop referrers:")
    for ref, count in by_referrer.most_common(10):
        print(f"  {ref}: {count}")


if __name__ == "__main__":
    main()
