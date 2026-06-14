import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="py-12 px-4 sm:px-6 lg:px-8" style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-subtle)' }}>
            <div className="max-w-7xl mx-auto">
                {/* Footer Content */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    {/* Left: Brand */}
                    <div>
                        <h3 className="text-xl font-bold text-gradient" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                            Portfolio
                        </h3>
                        <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>Building the future, one line at a time.</p>
                    </div>

                    {/* Center: Quick Links */}
                    <div className="flex gap-6 text-sm">
                        {['About', 'Skills', 'Projects', 'Experience', 'Contact'].map((link) => (
                            <a
                                key={link}
                                href={`#${link.toLowerCase()}`}
                                className="transition-colors duration-300 hover:opacity-80"
                                style={{ color: 'var(--text-muted)' }}
                            >
                                {link}
                            </a>
                        ))}
                    </div>

                    {/* Right: Social Links */}
                    <div className="flex gap-3">
                        <a
                            href="https://github.com/Vivekkrguptajio"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-lg glass transition-all duration-300 hover:scale-110 hover:glow-cyan"
                            aria-label="GitHub"
                        >
                            <Github className="w-5 h-5" style={{ color: 'var(--text-muted)' }} />
                        </a>
                        <a
                            href="https://www.linkedin.com/in/vivek369"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-lg glass transition-all duration-300 hover:scale-110"
                            aria-label="LinkedIn"
                        >
                            <Linkedin className="w-5 h-5" style={{ color: 'var(--text-muted)' }} />
                        </a>
                        <a
                            href="mailto:your.email@example.com"
                            className="p-2 rounded-lg glass transition-all duration-300 hover:scale-110"
                            aria-label="Email"
                        >
                            <Mail className="w-5 h-5" style={{ color: 'var(--text-muted)' }} />
                        </a>
                    </div>
                </div>

                {/* Copyright */}
                <div className="text-center mt-8 pt-8" style={{ borderTop: '1px solid var(--border-subtle)' }}>
                    <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                        © 2026 Vivek Kumar Gupta. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
