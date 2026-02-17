import React from 'react';
import { Github, Linkedin, Twitter, Mail } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-gray-50 dark:bg-[#0a0a1a] py-12 px-4 sm:px-6 lg:px-8 border-t border-gray-200 dark:border-white/5">
            <div className="max-w-7xl mx-auto">
                {/* Footer Content */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    {/* Left: Brand */}
                    <div>
                        <h3 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-500 dark:to-indigo-500 bg-clip-text text-transparent">
                            Portfolio
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-500 mt-1">Building the future, one line at a time.</p>
                    </div>

                    {/* Center: Quick Links */}
                    <div className="flex gap-6 text-sm">
                        <a href="#about" className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-white transition-colors">About</a>
                        <a href="#skills" className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-white transition-colors">Skills</a>
                        <a href="#projects" className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-white transition-colors">Projects</a>
                        <a href="#experience" className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-white transition-colors">Experience</a>
                        <a href="#contact" className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-white transition-colors">Contact</a>
                    </div>

                    {/* Right: Social Links */}
                    <div className="flex gap-3">
                        <a
                            href="https://github.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-gray-200 dark:bg-white/5 rounded-lg hover:bg-gray-300 dark:hover:bg-white/10 transition-colors"
                            aria-label="GitHub"
                        >
                            <Github className="w-5 h-5 text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white" />
                        </a>
                        <a
                            href="https://linkedin.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-gray-200 dark:bg-white/5 rounded-lg hover:bg-gray-300 dark:hover:bg-white/10 transition-colors"
                            aria-label="LinkedIn"
                        >
                            <Linkedin className="w-5 h-5 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-white" />
                        </a>
                        <a
                            href="mailto:your.email@example.com"
                            className="p-2 bg-gray-200 dark:bg-white/5 rounded-lg hover:bg-gray-300 dark:hover:bg-white/10 transition-colors"
                            aria-label="Email"
                        >
                            <Mail className="w-5 h-5 text-gray-600 dark:text-gray-400 hover:text-red-500 dark:hover:text-white" />
                        </a>
                    </div>
                </div>

                {/* Copyright */}
                <div className="text-center mt-8 pt-8 border-t border-gray-200 dark:border-white/5">
                    <p className="text-sm text-gray-500">
                        © 2026 Vivek Kumar Gupta. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
