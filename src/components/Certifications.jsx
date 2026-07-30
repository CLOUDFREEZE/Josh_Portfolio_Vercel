import './Certifications.css'

const MODULES = [
  {
    name: 'OPSWAT Academy',
    detail: 'Beyond the Firewall: One-Way Data Transfer',
  },
  {
    name: 'Refocus (2022)',
    detail: 'How to Become a Successful Data Analyst',
  },
  {
    name: 'Refocus (2022)',
    detail: 'Starting in Data Analytics with SQL and Python',
  },
]

export default function Certifications() {
  return (
    <section id="certifications">
      <div className="container">
        <span className="cmd-label">ls -la modules/installed</span>
        <h2 className="section-title">Seminars &amp; Webinars</h2>

        <div className="module-list">
          {MODULES.map((m, i) => (
            <div key={i} className="panel module-row">
              <span className="mono module-index">{String(i + 1).padStart(2, '0')}</span>
              <div className="module-info">
                <p className="module-name">{m.name}</p>
                <p className="muted module-detail">{m.detail}</p>
              </div>
              <span className="status-pill dot">ATTENDED</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
