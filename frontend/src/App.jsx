import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';
import LetsTalk from './components/LetsTalk';
import Footer from './components/Footer';
import AddProject from './components/AddProject';
import AdminDashboard from './components/AdminDashboard';
import EditProject from './components/EditProject';
import CustomCursor from './components/CustomCursor';
import SmoothScroll from './components/SmoothScroll';

const Home = () => (
  <SmoothScroll>
    <Navbar />
    <Hero />
    <Projects />
    <About />
    <Skills />
    <Experience />
    <Contact />
    <LetsTalk />
    <Footer />
  </SmoothScroll>
);

function App() {
  return (
    <Router>
      <CustomCursor />
      <div className="min-h-screen" style={{ background: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add/projects" element={<AddProject />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/edit/project/:id" element={<EditProject />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
