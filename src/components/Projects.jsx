import "./Projects.css";

const PROJECTS = [
  {
    branch: "main",
    name: "Capstone Project",
    title:
      "Hospital Management System I: Human Resource 2 (Talent Development & Career Pathing) with (BART-LARGE-MNLI) Analytics",
    description:
      "A full-featured hospital management web application with Talent Development & Career Pathing features.",
    techstack: [
      "PHP",
      "MySQL",
      "Tailwind CSS",
      "Indefinite",
      "Postman",
    ],
    link: "https://hr2.health-ease-hospital.com/login-register.php",
    linkLabel: "View Project",
  },
];

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
                <a href={p.link} target="_blank" rel="noopener noreferrer">
                  {p.title}
                </a>
              </h3>

              <p className="project-desc">{p.description}</p>

              <div className="project-tech">
                {p.techstack.map((t) => (
                  <span key={t} className="tech-tag">
                    {t}
                  </span>
                ))}
              </div>

              <a
                href={p.link}
                target="_blank"
                rel="noopener noreferrer"
                className="project-link"
              >
                {p.linkLabel}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}