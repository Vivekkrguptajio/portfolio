import React, { useState, useEffect } from 'react';
import { Github, ExternalLink } from 'lucide-react';
import API_BASE_URL from '../config';

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/api/projects`);
                if (response.ok) {
                    const data = await response.json();
                    if (data.length > 0) {
                        // Transform backend data to match frontend structure if needed
                        const formattedProjects = data.map(project => ({
                            title: project.title,
                            description: project.description,
                            techStack: project.techStack,
                            img: project.image,
                            github: project.githubLink || '#',
                            live: project.liveLink || '#'
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
        <section id="projects" className="min-h-screen bg-gray-50 dark:bg-[#0a0a1a] py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Section Label */}
                <div className="text-center mb-4">
                    <span className="text-sm text-purple-600 dark:text-blue-400 tracking-widest uppercase">Portfolio</span>
                </div>

                {/* Heading */}
                <h2 className="text-4xl md:text-5xl font-bold text-center mb-6">
                    <span className="text-gray-900 dark:text-white">Featured </span>
                    <span className="bg-gradient-to-r from-purple-500 via-violet-500 to-indigo-500 bg-clip-text text-transparent">
                        Projects
                    </span>
                </h2>

                {/* Description */}
                <p className="text-center text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-16">
                    Real-world applications built with modern technologies and best practices
                </p>

                {/* Projects Grid */}
                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                        {projects.map((project, index) => (
                            <div
                                key={index}
                                className="bg-white/80 dark:bg-[#0f0f1f]/80 backdrop-blur-sm border border-gray-200 dark:border-white/5 rounded-2xl overflow-hidden hover:border-purple-500/30 transition-all duration-300 group max-w-sm mx-auto shadow-lg dark:shadow-none"
                            >
                                {/* Project Image */}
                                <div className="h-48 overflow-hidden relative">
                                    <img
                                        src={project.img}
                                        alt={project.title}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60"></div>
                                </div>

                                <div className="p-5">
                                    {/* Header */}
                                    <div className="flex items-start justify-between mb-4">
                                        <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                                            {project.title}
                                        </h3>
                                        <div className="flex gap-2">
                                            <a
                                                href={project.github}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="p-2 bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 rounded-lg transition-all hover:scale-110"
                                                aria-label="GitHub"
                                                title="View Code"
                                            >
                                                <Github className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                                            </a>
                                            <a
                                                href={project.live}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="p-2 bg-purple-100 dark:bg-purple-900/40 hover:bg-purple-200 dark:hover:bg-purple-900/60 rounded-lg transition-all hover:scale-110 shadow-lg shadow-purple-500/20 animate-pulse"
                                                aria-label="Live Demo"
                                                title="Live Demo"
                                            >
                                                <ExternalLink className="w-5 h-5 text-purple-600 dark:text-purple-300" />
                                            </a>
                                        </div>
                                    </div>

                                    {/* Description */}
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 leading-relaxed line-clamp-3">
                                        {project.description}
                                    </p>

                                    {/* Tech Stack Pills */}
                                    <div className="flex flex-wrap gap-2">
                                        {project.techStack.map((tech, idx) => (
                                            <span
                                                key={idx}
                                                className="px-3 py-1 bg-gray-100 dark:bg-[#1a1a2e] border border-gray-200 dark:border-white/5 rounded-full text-xs text-purple-600 dark:text-purple-300 hover:bg-purple-50 dark:hover:bg-purple-500/10 hover:border-purple-500/30 transition-colors"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* View All Button */}
                <div className="text-center">
                    <a
                        href="https://github.com/Vivekkrguptajio"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10 hover:border-purple-500/30 transition-all duration-300"
                    >
                        View All Projects on GitHub
                        <Github className="w-4 h-4" />
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Projects;
