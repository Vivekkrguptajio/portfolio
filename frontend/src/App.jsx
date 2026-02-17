import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useTheme } from './context/ThemeContext';
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

const Home = () => (
  <>
    <Navbar />
    <Hero />
    <Projects />
    <About />
    <Skills />
    <Experience />
    <Contact />
    <LetsTalk />
    <Footer />
  </>
);

function App() {
  const { theme } = useTheme();

  return (
    <Router>
      <div className={`min-h-screen bg-gray-50 dark:bg-[#050614] transition-colors duration-300`}>
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
