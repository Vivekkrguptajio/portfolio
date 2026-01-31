import React from 'react';
import { Github, ExternalLink } from 'lucide-react';
import { projects } from '../data/projectsData';

const Projects = () => {
    return (
        <section id="projects" className="min-h-screen bg-[#0a0a1a] py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Section Label */}
                <div className="text-center mb-4">
                    <span className="text-sm text-blue-400 tracking-widest uppercase">Portfolio</span>
                </div>

                {/* Heading */}
                <h2 className="text-4xl md:text-5xl font-bold text-center mb-6">
                    <span className="text-white">Featured </span>
                    <span className="bg-gradient-to-r from-purple-500 via-violet-500 to-indigo-500 bg-clip-text text-transparent">
                        Projects
                    </span>
                </h2>

                {/* Description */}
                <p className="text-center text-gray-400 max-w-3xl mx-auto mb-16">
                    Real-world applications built with modern technologies and best practices
                </p>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    {projects.map((project, index) => (
                        <div
                            key={index}
                            className="bg-[#0f0f1f]/80 backdrop-blur-sm border border-white/5 rounded-2xl overflow-hidden hover:border-purple-500/30 transition-all duration-300 group max-w-sm mx-auto"
                        >
                            {/* Project Image */}
                            <div className="h-64 overflow-hidden relative">
                                <img
                                    src={project.img}
                                    alt={project.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f1f] to-transparent opacity-60"></div>
                            </div>

                            <div className="p-6">
                                {/* Header */}
                                <div className="flex items-start justify-between mb-4">
                                    <h3 className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors">
                                        {project.title}
                                    </h3>
                                    <div className="flex gap-2">
                                        <a
                                            href={project.github}
                                            className="p-1.5 bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
                                            aria-label="GitHub"
                                        >
                                            <Github className="w-4 h-4 text-gray-400 hover:text-white" />
                                        </a>
                                        <a
                                            href={project.live}
                                            className="p-1.5 bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
                                            aria-label="Live Demo"
                                        >
                                            <ExternalLink className="w-4 h-4 text-gray-400 hover:text-white" />
                                        </a>
                                    </div>
                                </div>

                                {/* Description */}
                                <p className="text-sm text-gray-400 mb-6 leading-relaxed line-clamp-3">
                                    {project.description}
                                </p>

                                {/* Tech Stack Pills */}
                                <div className="flex flex-wrap gap-2">
                                    {project.techStack.map((tech, idx) => (
                                        <span
                                            key={idx}
                                            className="px-3 py-1 bg-[#1a1a2e] border border-white/5 rounded-full text-xs text-purple-300 hover:bg-purple-500/10 hover:border-purple-500/30 transition-colors"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* View All Button */}
                <div className="text-center">
                    <a
                        href="https://github.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-lg text-gray-300 hover:bg-white/10 hover:border-purple-500/30 transition-all duration-300"
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
