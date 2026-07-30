import './Education.css'

const RELEASES = [
  {
    version: 'v4.0',
    years: '2022 – 2026',
    title: 'Bachelor of Science in Information Technology',
    org: 'Bestlink College of the Philippines',
    note: 'Major in Information Security',
    current: true,
  },
  {
    version: 'v3.0',
    years: '2020 – 2022',
    title: 'General Academic Strand (GAS)',
    org: 'Metro Manila College',
  },
  {
    version: 'v2.0',
    years: '2016 – 2020',
    title: 'Junior & Senior High School',
    org: 'Novaliches High School',
  },
  {
    version: 'v1.0',
    years: '2010 – 2016',
    title: 'Elementary Education',
    org: 'San Agustin Elementary School',
  },
]

export default function Education() {
  return (
    <section id="education">
      <div className="container">
        <span className="cmd-label">cat CHANGELOG.md</span>
        <h2 className="section-title">Education</h2>

        <div className="changelog">
          {RELEASES.map((r) => (
            <div key={r.version} className="release">
              <div className="release-marker">
                <span className="release-dot" />
              </div>
              <div className="panel release-card">
                <div className="release-head mono">
                  <span className="release-version">{r.version}</span>
                  <span className="muted">{r.years}</span>
                  {r.current && <span className="status-pill dot">CURRENT</span>}
                </div>
                <h3 className="release-title">{r.title}</h3>
                <p className="muted">{r.org}</p>
                {r.note && <p className="release-note mono">// {r.note}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
