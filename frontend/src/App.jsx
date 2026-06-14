import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CustomCursor from './components/CustomCursor';
import SmoothScroll from './components/SmoothScroll';

const About = React.lazy(() => import('./components/About'));
const Skills = React.lazy(() => import('./components/Skills'));
const Projects = React.lazy(() => import('./components/Projects'));
const Experience = React.lazy(() => import('./components/Experience'));
const Contact = React.lazy(() => import('./components/Contact'));
const LetsTalk = React.lazy(() => import('./components/LetsTalk'));
const Footer = React.lazy(() => import('./components/Footer'));
const AddProject = React.lazy(() => import('./components/AddProject'));
const AdminDashboard = React.lazy(() => import('./components/AdminDashboard'));
const EditProject = React.lazy(() => import('./components/EditProject'));

const Home = () => (
  <SmoothScroll>
    <Navbar />
    <Hero />
    <Suspense fallback={<div className="h-20 flex items-center justify-center">Loading...</div>}>
      <Projects />
      <About />
      <Skills />
      <Experience />
      <Contact />
      <LetsTalk />
      <Footer />
    </Suspense>
  </SmoothScroll>
);

function App() {
  return (
    <Router>
      <CustomCursor />
      <div className="min-h-[100dvh] w-full overflow-x-hidden" style={{ background: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add/projects" element={<Suspense fallback={<div>Loading...</div>}><AddProject /></Suspense>} />
          <Route path="/admin" element={<Suspense fallback={<div>Loading...</div>}><AdminDashboard /></Suspense>} />
          <Route path="/edit/project/:id" element={<Suspense fallback={<div>Loading...</div>}><EditProject /></Suspense>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
