import './Navbar.css'

const LINKS = [
  { href: '#about', label: 'about' },
  { href: '#skills', label: 'skills' },
  { href: '#experience', label: 'experience' },
  { href: '#education', label: 'education' },
  { href: '#contact', label: 'contact' },
  { href: '#projects', label: 'projects' },
  { href: '#github-contributions', label: 'GitHub Contributions' },
]

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <a href="#top" className="brand mono">JHC_</a>
        <nav className="nav-links mono">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href}>{l.label}</a>
          ))}
        </nav>
      </div>
    </header>
  )
}
