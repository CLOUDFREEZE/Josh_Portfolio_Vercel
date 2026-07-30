import './Projects.css'

const PROJECTS = [
  {
    branch: 'main',
    name: 'Capstone Project',
    title: 'Hospital Management System I: Human Resource 2 (Talent Developmennt & Career Pathing) with (BART-LARGE-MNLI) Analytics',
    description:
      'A full-featured e-learning web application that integrates gamification elements such as achievement badges, progress tracking, and interactive quizzes to enhance student engagement and learning outcomes.',
    techstack: [Laravel, MySQL, Tailwind, Indevfinite, Postman],
    link: 'https://hr2.health-ease-hospital.com/login-register.php',
    linkLabel: 'View Project',
  },
]
export default function Projects() {
  return (
    <section id="projects">
      <div className="container">
        <span className="cmd-label">git branch --list</span>
        <h2 className="section-title">Projects</h2>

        <div className="project-list">
          {PROJECTS.map((p, i) => (
            <div key={i} className="panel project-card">
              <div className="project-head mono">
                <span className="project-branch">{p.branch}</span>
                <span className="muted">{p.name}</span>
              </div>
              <h3 className="project-title">
                {p.link && p.link !== '#' ? (
                  <a href={p.link} target="_blank" rel="noopener noreferrer">
                    {p.title}
                  </a>
                ) : (
                  p.title
                )}
              </h3>
              <p className="project-desc">{p.description}</p>
              <div className="project-tech">
                {p.tech.map((t) => (
                  <span key={t} className="tech-tag">{t}</span>
                ))}
              </div>
              {p.link && p.link !== '#' && (
                <a
                  href={p.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-link"
                >
                  {p.linkLabel}
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
