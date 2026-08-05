import "./Projects.css";

const PROJECTS = [
  {
    branch: "main",
    name: "Capstone Project",
    title:
      "Hospital Management System I: Human Resource 2 (Talent Development & Career Pathing) with (BART-LARGE-MNLI) AI Analytics",
    description:
      "A full-featured hospital management web application with Talent Development & Career Pathing features.",
    techstack: [
      "PHP",
      "MySQL",
      "Tailwind CSS",
      "Indevfinite",
      "Postman",
    ],
    link: "https://hr2.health-ease-hospital.com/login-register.php",
    linkLabel: "View Project",
  },
  {
branch: "main",
    name: "Weather Website",
    title:
      "An Web Based Weather Application that provides real-time weather information for any location.",
    description:
      "A web application that allows users to search for weather information by city name or zip code, and displays the current weather conditions, temperature, humidity, wind speed, and a 5-day forecast.",
    techstack: [
      "React",
      "Tailwind",
      "OpenWeatherMap API",
      "Axios",
    ],
    link: "https://weather-app-josh-85th.vercel.app/",
    linkLabel: "View Project",



  }
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