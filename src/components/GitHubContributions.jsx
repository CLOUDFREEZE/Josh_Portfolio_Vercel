import { useState, useEffect } from "react";
import "./GitHubContributions.css";

const MONTH_LABELS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

// Buckets a contribution count into an intensity level 0-4 for coloring.
function levelFor(count) {
  if (count === 0) return 0;
  if (count <= 2) return 1;
  if (count <= 5) return 2;
  if (count <= 9) return 3;
  return 4;
}

// Groups a flat list of {date, count} days into week columns (Sun-Sat),
// the same layout GitHub's own calendar uses.
function toWeeks(days) {
  const weeks = [];
  let currentWeek = [];

  // Pad the first week so it starts on a Sunday.
  const firstDay = new Date(days[0].date).getDay();
  for (let i = 0; i < firstDay; i++) currentWeek.push(null);

  for (const day of days) {
    currentWeek.push(day);
    if (currentWeek.length === 7) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  }
  if (currentWeek.length > 0) {
    while (currentWeek.length < 7) currentWeek.push(null);
    weeks.push(currentWeek);
  }
  return weeks;
}

export default function GitHubContributions({ username = "octocat", year = "last" }) {
  const [weeks, setWeeks] = useState([]);
  const [total, setTotal] = useState(0);
  const [status, setStatus] = useState("loading"); // loading | ready | error

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setStatus("loading");
      try {
        const res = await fetch(
          `https://github-contributions-api.jogruber.de/v4/${username}?y=${year}`
        );
        if (!res.ok) throw new Error(`Contributions API returned ${res.status}`);
        const data = await res.json();
        if (!cancelled) {
          setWeeks(toWeeks(data.contributions));
          setTotal(data.total?.[year] ?? data.total?.lastYear ?? 0);
          setStatus("ready");
        }
      } catch (err) {
        if (!cancelled) setStatus("error");
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [username, year]);

  if (status === "loading") {
    return (
      <div className="github-contrib">
        <div className="github-contrib__skeleton" />
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="github-contrib">
        <p className="github-contrib__empty">Couldn't load contribution data right now.</p>
      </div>
    );
  }

  // Show a month label above the first week column that falls in that month.
  const monthLabels = [];
  let lastMonth = -1;
  weeks.forEach((week, i) => {
    const firstReal = week.find((d) => d !== null);
    if (!firstReal) return;
    const month = new Date(firstReal.date).getMonth();
    if (month !== lastMonth) {
      monthLabels.push({ index: i, label: MONTH_LABELS[month] });
      lastMonth = month;
    }
  });

  return (
    <section className="github-contrib" id="GitHubContributions">
      <div className="github-contrib__header">
        <h2 className="github-contrib__title">GitHub Contributions</h2>
        <span className="github-contrib__total">{total} contributions</span>
      </div>

      <div className="github-contrib__scroll">
        <div className="github-contrib__months">
          {monthLabels.map(({ index, label }) => (
            <span
              key={index}
              className="github-contrib__month"
              style={{ gridColumnStart: index + 1 }}
            >
              {label}
            </span>
          ))}
        </div>

        <div className="github-contrib__grid">
          {weeks.map((week, wi) => (
            <div className="github-contrib__week" key={wi}>
              {week.map((day, di) =>
                day ? (
                  <div
                    key={di}
                    className="github-contrib__day"
                    data-level={levelFor(day.count)}
                    title={`${day.count} contribution${day.count === 1 ? "" : "s"} on ${day.date}`}
                  />
                ) : (
                  <div key={di} className="github-contrib__day github-contrib__day--empty" />
                )
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="github-contrib__legend">
        <span>Less</span>
        {[0, 1, 2, 3, 4].map((level) => (
          <div key={level} className="github-contrib__day" data-level={level} />
        ))}
        <span>More</span>
      </div>
    </section>
  );
}
