import React, { useState, useEffect, useRef } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';
import API_BASE_URL from '../config';

/* ─── 3D Parallax Card ─── */
const ProjectCard = ({ project, index }) => {
    const cardRef = useRef(null);
    const [rotateX, setRotateX] = useState(0);
    const [rotateY, setRotateY] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseMove = (e) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const x = (e.clientX - centerX) / (rect.width / 2);
        const y = (e.clientY - centerY) / (rect.height / 2);
        setRotateY(x * 12);
        setRotateX(-y * 12);
    };

    const handleMouseLeave = () => {
        setRotateX(0);
        setRotateY(0);
        setIsHovered(false);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="h-full"
        >
            <div
                ref={cardRef}
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={handleMouseLeave}
                className="relative group block h-full"
                style={{
                    perspective: '1000px',
                }}
            >
                <div
                    className="rounded-2xl overflow-hidden transition-all duration-300 neon-border h-full flex flex-col"
                    style={{
                        transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) ${isHovered ? 'translateY(-8px)' : 'translateY(0)'}`,
                        transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.4s ease-out',
                        background: 'var(--bg-secondary)',
                        border: `1px solid ${isHovered ? 'rgba(0, 240, 255, 0.5)' : 'rgba(0, 240, 255, 0.2)'}`,
                        boxShadow: isHovered
                            ? '0 20px 40px rgba(0, 0, 0, 0.4), 0 0 20px rgba(0, 240, 255, 0.3), inset 0 0 10px rgba(0, 240, 255, 0.1)'
                            : '0 10px 30px rgba(0, 0, 0, 0.3), 0 0 8px rgba(0, 240, 255, 0.15)',
                    }}
                >
                    {/* Image */}
                    <div className="h-48 overflow-hidden relative shrink-0">
                        <img
                            src={project.img}
                            alt={project.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-secondary)] via-transparent to-transparent opacity-80 pointer-events-none" />
                    </div>

                    {/* Content */}
                    <div className="p-5 relative z-10 flex flex-col flex-grow">
                        {/* Title & Links */}
                        <div className="flex items-start justify-between mb-4">
                            <h3
                                className="text-xl font-bold transition-colors duration-300"
                                style={{
                                    fontFamily: "'Space Grotesk', sans-serif",
                                    color: isHovered ? 'var(--accent-cyan)' : 'var(--text-primary)',
                                }}
                            >
                                {project.title}
                            </h3>
                            <div className="flex gap-2 relative z-50 shrink-0 ml-4">
                                {project.github && project.github !== '#' && (
                                    <a
                                        href={project.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-2 rounded-lg transition-all duration-300 hover:scale-110 cursor-pointer block"
                                        style={{ background: 'rgba(255,255,255,0.05)' }}
                                        aria-label="GitHub"
                                        title="View Code"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <Github className="w-5 h-5" style={{ color: 'var(--text-secondary)' }} />
                                    </a>
                                )}
                                {project.live && project.live !== '#' && (
                                    <a
                                        href={project.live}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-2 rounded-lg transition-all duration-300 hover:scale-110 glow-cyan cursor-pointer block"
                                        style={{ background: 'rgba(0, 240, 255, 0.1)' }}
                                        aria-label="Live Demo"
                                        title="Live Demo"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <ExternalLink className="w-5 h-5" style={{ color: 'var(--accent-cyan)' }} />
                                    </a>
                                )}
                            </div>
                        </div>

                        {/* Description */}
                        <p
                            className="text-sm mb-6 leading-relaxed line-clamp-3"
                            style={{ color: 'var(--text-muted)' }}
                        >
                            {project.description}
                        </p>

                        {/* Tech pills */}
                        <div className="flex flex-wrap gap-2 mt-auto">
                            {project.techStack.map((tech, idx) => (
                                <span
                                    key={idx}
                                    className="px-3 py-1 rounded-full text-xs transition-colors duration-300"
                                    style={{
                                        background: 'rgba(0, 240, 255, 0.06)',
                                        border: '1px solid var(--border-subtle)',
                                        color: 'var(--accent-cyan)',
                                    }}
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

/* ─── Projects Section ─── */
const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeFilter, setActiveFilter] = useState('All');

    const categories = [
        'All',
        'Android App',
        'Django (Python Backend)',
        'Spring Boot (Java)',
        'Node.js (JavaScript)',
        '.NET (C#)',
        'Machine Learning (AI/ML)'
    ];

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/api/projects`);
                if (response.ok) {
                    const data = await response.json();
                    if (data.length > 0) {
                        const ensureUrl = (url) => {
                            if (!url) return '';
                            url = url.trim();
                            if (url === '#' || url === '') return '';
                            if (!/^https?:\/\//i.test(url)) return `https://${url}`;
                            return url;
                        };
                        const formattedProjects = data.map(project => ({
                            title: project.title,
                            description: project.description,
                            techStack: project.techStack,
                            img: project.image,
                            github: ensureUrl(project.githubLink),
                            live: ensureUrl(project.liveLink)
                        }));
                        setProjects(formattedProjects);
                    }
                } else {
                    console.error('Failed to fetch projects');
                }
            } catch (error) {
                console.error('Error fetching projects:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    return (
        <section id="projects" className="min-h-[100dvh] py-24 px-4 sm:px-6 lg:px-8" style={{ background: 'var(--bg-secondary)' }}>
            <div className="max-w-7xl mx-auto">
                {/* Section Label */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-4"
                >
                    <span className="text-sm tracking-[0.3em] uppercase" style={{ color: 'var(--accent-cyan)' }}>Portfolio</span>
                </motion.div>

                {/* Heading */}
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-4xl md:text-5xl font-bold text-center mb-6"
                >
                    <span style={{ color: 'var(--text-primary)' }}>Featured </span>
                    <span className="text-gradient">Projects</span>
                </motion.h2>

                {/* Description */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-center max-w-3xl mx-auto mb-16"
                    style={{ color: 'var(--text-muted)' }}
                >
                    Real-world applications built with modern technologies and best practices
                </motion.p>

                {/* Filter Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-16 max-w-4xl mx-auto"
                >
                    {categories.map((category, idx) => (
                        <button
                            key={idx}
                            onClick={() => setActiveFilter(category)}
                            className={`whitespace-nowrap px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 border ${
                                activeFilter === category
                                    ? 'bg-gradient-to-r from-[var(--accent-cyan)] to-[var(--accent-violet)] text-white border-transparent shadow-[0_0_15px_rgba(0,240,255,0.3)]'
                                    : 'glass text-[var(--text-secondary)] border-white/10 hover:border-[var(--accent-cyan)] hover:text-white'
                            }`}
                        >
                            {category}
                        </button>
                    ))}
                </motion.div>

                {/* Projects Grid */}
                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="w-12 h-12 rounded-full border-2 border-t-transparent animate-spin" style={{ borderColor: 'var(--accent-cyan)', borderTopColor: 'transparent' }} />
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                        {projects
                            .filter(project => {
                                if (activeFilter === 'All') return true;
                                if (!project.techStack || !Array.isArray(project.techStack)) return false;
                                
                                return project.techStack.includes(activeFilter);
                            })
                            .map((project, index) => (
                                <ProjectCard key={index} project={project} index={index} />
                            ))}
                    </div>
                )}

                {/* View All Button */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center"
                >
                    <a
                        href="https://github.com/Vivekkrguptajio"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl glass neon-border transition-all duration-300 hover:-translate-y-1"
                        style={{ color: 'var(--text-secondary)' }}
                    >
                        View All Projects on GitHub
                        <Github className="w-4 h-4" />
                    </a>
                </motion.div>
            </div>
        </section>
    );
};

export default Projects;
