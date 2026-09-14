import { useEffect } from 'react';
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Education from './components/Education'
import Certifications from './components/Certifications'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Projects from './components/Projects'
import GitHubContributions from "./components/GitHubContributions";


function App() {
  useEffect(() => {
fetch("http://localhost:5000/track", {      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        page: window.location.pathname,
        referrer: document.referrer,
      }),
    }).catch(() => {}); // fail silently if backend is down
  }, []);

  return (
    <div id="top">
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Education />
      <Certifications />
      <Projects />
      <GitHubContributions username="CLOUDFREEZE" year="last"/>
      <Contact />
      <Footer />
    </div>
  )
}

export default App
