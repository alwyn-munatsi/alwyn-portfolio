import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Certifications from './components/Certifications'
import Skills from './components/Skills'
import Contact from './components/Contact'
import Chatbot from './components/Chatbot'

function App() {
  return (
    <div className="min-h-screen" style={{ background: '#060b14' }}>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Certifications />
        <Skills />
        <Contact />
      </main>
      <Chatbot />
    </div>
  )
}

export default App
