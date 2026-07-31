import './Contact.css'

export default function Contact() {
  return (
    <section id="contact">
      <div className="container">
        <span className="cmd-label">./contact --send</span>
        <h2 className="section-title">Get in Touch</h2>

        <div className="panel contact-card">
          <p className="contact-lead">
            Open to entry-level QA Analyst and Cloud Engineer roles. Reach out directly —
            I usually reply within a day.
          </p>
          <div className="contact-links">
            <a href="mailto:joshhenrickc@gmail.com" className="contact-item">
              <span className="mono muted">email</span>
              <span>joshhenrickc@gmail.com</span>
            </a>
            <a href="tel:+639693218260" className="contact-item">
              <span className="mono muted">phone</span>
              <span>0969 321 8260</span>
            </a>
            <a href="https://github.com/CLOUDFREEZE" className="contact-item" target="_blank" rel="noopener noreferrer">
              <span className="mono muted">github</span>
              <span>CLOUDFREEZE</span>
            </a>
            <a href="https://www.linkedin.com/in/josh-henrick-catchillar-4701122aa/" className="contact-item" target="_blank" rel="noopener noreferrer">
              <span className="mono muted">linkedin</span>
              <span>Josh Henrick Catchillar</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
