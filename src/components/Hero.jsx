import { useEffect, useState } from 'react'
import './Hero.css'

const BOOT_LINES = [
  { text: 'initializing profile...', delay: 0 },
  { text: 'name       : Josh Henrick D. Catchillar', delay: 500 },
  { text: 'role       : QA Analyst / Cloud Engineer (entry-level)', delay: 950 },
  { text: 'focus      : Information Security', delay: 1400 },
  { text: 'status     : ready for deployment', delay: 1850, highlight: true },
]

export default function Hero() {
  const [visibleLines, setVisibleLines] = useState(0)
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    const timers = BOOT_LINES.map((line, i) =>
      setTimeout(() => setVisibleLines(i + 1), line.delay)
    )
    const finalTimer = setTimeout(() => setShowContent(true), 2300)
    return () => {
      timers.forEach(clearTimeout)
      clearTimeout(finalTimer)
    }
  }, [])

  return (
    <section className="hero">
      <div className="container hero-grid">
        <div className="terminal panel" role="img" aria-label="Terminal boot sequence introducing Josh Henrick Catchillar as a QA Analyst and Cloud Engineer">
          <div className="terminal-bar">
            <span className="dot red" />
            <span className="dot yellow" />
            <span className="dot green" />
            <span className="terminal-title mono">profile.sh</span>
          </div>
          <div className="terminal-body mono">
            {BOOT_LINES.slice(0, visibleLines).map((line, i) => (
              <div key={i} className={`term-line ${line.highlight ? 'ok' : ''}`}>
                {line.highlight ? <span className="prefix">[ OK ]</span> : <span className="prefix muted">{'>'}</span>}
                <span>{line.text}</span>
              </div>
            ))}
            {visibleLines < BOOT_LINES.length && <span className="cursor" aria-hidden="true">▌</span>}
          </div>
        </div>

        <div className={`hero-copy ${showContent ? 'in' : ''}`}>
          <span className="status-pill dot">SYSTEM READY</span>
          <h1 className="hero-title">
            Josh Henrick<br />D. Catchillar
          </h1>
          <p className="hero-subtitle">
            IT graduate building reliability into software and cloud systems —
            one verified check at a time.
          </p>
          <div className="hero-actions">
            <a href="#contact" className="btn btn-primary">Get in touch</a>
            <a href="#experience" className="btn btn-ghost">View background</a>
          </div>
        </div>
      </div>
    </section>
  )
}
