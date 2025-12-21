import React from 'react';
import { FolderOpen, Github, ExternalLink } from 'lucide-react';

const Projects = () => {
    const projects = [
        {
            title: 'E-Commerce Platform',
            description: 'A full-stack e-commerce solution with user authentication, product management, cart functionality, and payment integration.',
            features: ['JWT Auth', 'Payment Gateway', 'Admin Dashboard', 'Order Tracking'],
            techStack: 'React, Node.js, Express, MongoDB, Stripe',
            github: '#',
            live: '#'
        },
        {
            title: 'Task Management System',
            description: 'A collaborative project management tool with real-time updates, team workspaces, and task assignment features.',
            features: ['Real-time Sync', 'Team Collaboration', 'Kanban Board', 'Notifications'],
            techStack: 'React, Firebase, Tailwind CSS, Redux',
            github: '#',
            live: '#'
        },
        {
            title: 'Blog CMS Platform',
            description: 'A content management system for bloggers with markdown support, SEO optimization, and analytics dashboard.',
            features: ['Markdown Editor', 'SEO Tools', 'Analytics', 'Draft System'],
            techStack: 'Next.js, PostgreSQL, Prisma, TypeScript',
            github: '#',
            live: '#'
        },
        {
            title: 'Real-time Chat Application',
            description: 'A messaging platform with real-time communication, file sharing, and group chat capabilities.',
            features: ['Real-time Messaging', 'File Sharing', 'Group Chats', 'Typing Indicators'],
            techStack: 'React, Socket.io, Node.js, MongoDB',
            github: '#',
            live: '#'
        }
    ];

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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                    {projects.map((project, index) => (
                        <div
                            key={index}
                            className="bg-[#0f0f1f]/80 backdrop-blur-sm border border-white/5 rounded-2xl p-6 hover:border-purple-500/30 transition-all duration-300 group"
                        >
                            {/* Header */}
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="p-3 bg-blue-500 rounded-xl">
                                        <FolderOpen className="w-5 h-5 text-white" />
                                    </div>
                                    <h3 className="text-xl font-semibold text-white">{project.title}</h3>
                                </div>
                                <div className="flex gap-2">
                                    <a
                                        href={project.github}
                                        className="p-2 hover:bg-white/5 rounded-lg transition-colors"
                                        aria-label="GitHub"
                                    >
                                        <Github className="w-4 h-4 text-gray-400 hover:text-white" />
                                    </a>
                                    <a
                                        href={project.live}
                                        className="p-2 hover:bg-white/5 rounded-lg transition-colors"
                                        aria-label="Live Demo"
                                    >
                                        <ExternalLink className="w-4 h-4 text-gray-400 hover:text-white" />
                                    </a>
                                </div>
                            </div>

                            {/* Description */}
                            <p className="text-sm text-gray-400 mb-4 leading-relaxed">
                                {project.description}
                            </p>

                            {/* Features */}
                            <div className="flex flex-wrap gap-2 mb-4">
                                {project.features.map((feature, idx) => (
                                    <span
                                        key={idx}
                                        className="px-3 py-1 bg-purple-500/10 border border-purple-500/20 rounded-lg text-xs text-purple-300"
                                    >
                                        {feature}
                                    </span>
                                ))}
                            </div>

                            {/* Tech Stack */}
                            <p className="text-xs text-gray-500">
                                {project.techStack}
                            </p>
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
