import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Contact from './components/Contact'
import LetsTalk from './components/LetsTalk'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className='min-h-screen bg-[#050614]'>
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Contact />
      <LetsTalk />
      <Footer />
    </div>
  )
}
