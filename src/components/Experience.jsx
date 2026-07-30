import './Experience.css'

export default function Experience() {
  return (
    <section id="experience">
      <div className="container">
        <span className="cmd-label">tail -f experience.log</span>
        <h2 className="section-title">Work Experience</h2>

        <div className="panel log-entry">
          <div className="log-meta mono">
            <span className="status-pill dot">INTERNSHIP</span>
            <span className="muted">December 2025 – March 2026</span>
          </div>
          <h3 className="log-role">Quality Assurance / Accreditation Department</h3>
          <p className="log-org muted">Bestlink College of the Philippines</p>
          <p className="log-desc">
            Assisted the Quality Assurance and Accreditation Department in organizing,
            digitizing, and managing institutional documents required for accreditation
            compliance. Supported the preparation of reports and data submissions to
            accrediting bodies while applying IT skills to streamline digital recordkeeping
            and file management systems.
          </p>
        </div>
      </div>
    </section>
  )
}
