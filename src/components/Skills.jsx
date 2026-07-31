import './Skills.css'

const SUITES = [
  {
    name: 'systems.test',
    items: ['Database Management', 'Project Management', 'System Analysis', 'Technical Writing', 'Graphic Designing', 'Basic Video Editing', 'Canva Designing', 'Basic Networking', 'Basic Cloud Computing', 'Information Security', 'Quality Assurance Principles', 'Basic Troubleshooting'],
  },
  {
    name: 'tools.test',
    items: ['MS Office (Word, PowerPoint, Excel, Outlook)', 'Basic Programming — PHP, C++, C, Python, Java, C#, ReactJS, and ExpressJS ', 'Web Development — HTML5, CSS3, JavaScript, Bootstrap, TailwindCSS'],
  },
]

export default function Skills() {
  const total = SUITES.reduce((sum, s) => sum + s.items.length, 0)

  return (
    <section id="skills">
      <div className="container">
        <span className="cmd-label">npm run test:skills</span>
        <h2 className="section-title">Skills</h2>

        <div className="suite-grid">
          {SUITES.map((suite) => (
            <div key={suite.name} className="panel suite-card">
              <div className="suite-header mono">
                <span>{suite.name}</span>
                <span className="status-pill dot">PASS</span>
              </div>
              <ul className="suite-list">
                {suite.items.map((item) => (
                  <li key={item}>
                    <span className="check mono">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
