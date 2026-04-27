import React, { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Github, Linkedin } from 'lucide-react';
import { contactInfo } from '../data/contactData';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const navLinks = ['About', 'Skills', 'Projects', 'Experience'];

    return (
        <>
            {/* Desktop & Mobile Navbar */}
            <nav className="fixed top-0 left-0 right-0 z-50 glass-strong">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo */}
                        <a href="#" className="text-xl font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                            <span className="text-gradient">Portfolio</span>
                        </a>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center gap-8">
                            {navLinks.map((link) => (
                                <a
                                    key={link}
                                    href={`#${link.toLowerCase()}`}
                                    className="text-sm relative group transition-colors duration-300"
                                    style={{ color: 'var(--text-secondary)' }}
                                >
                                    <span className="group-hover:text-white transition-colors">{link}</span>
                                    <span
                                        className="absolute -bottom-1 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300"
                                        style={{ background: 'var(--gradient-accent)' }}
                                    />
                                </a>
                            ))}

                            <a
                                href="#contact"
                                className="px-5 py-2 rounded-full text-sm font-medium text-white transition-all duration-300 hover:scale-105 hover:-translate-y-0.5"
                                style={{
                                    background: 'linear-gradient(135deg, var(--accent-cyan), var(--accent-violet))',
                                    boxShadow: '0 0 20px rgba(0, 240, 255, 0.15)',
                                }}
                            >
                                Contact
                            </a>

                            <div className="flex items-center gap-4">
                                <a
                                    href={contactInfo.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="transition-all duration-300 hover:scale-110"
                                    style={{ color: 'var(--text-secondary)' }}
                                    aria-label="GitHub"
                                >
                                    <Github size={20} />
                                </a>
                                <a
                                    href={contactInfo.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="transition-all duration-300 hover:scale-110"
                                    style={{ color: 'var(--text-secondary)' }}
                                    aria-label="LinkedIn"
                                >
                                    <Linkedin size={20} />
                                </a>
                            </div>
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="flex items-center gap-4 md:hidden">
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className="transition-colors"
                                style={{ color: 'var(--text-secondary)' }}
                                aria-label="Toggle menu"
                            >
                                {isOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-40 md:hidden"
                        onClick={() => setIsOpen(false)}
                    >
                        {/* Backdrop */}
                        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

                        {/* Menu Card */}
                        <motion.div
                            initial={{ opacity: 0, y: -20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -20, scale: 0.95 }}
                            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                            className="absolute top-20 left-4 right-4 rounded-2xl overflow-hidden glass-strong"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="p-6 space-y-1">
                                {navLinks.map((link, index) => (
                                    <motion.a
                                        key={link}
                                        href={`#${link.toLowerCase()}`}
                                        onClick={() => setIsOpen(false)}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        className="block px-4 py-3 rounded-lg transition-all"
                                        style={{ color: 'var(--text-secondary)' }}
                                    >
                                        {link}
                                    </motion.a>
                                ))}
                                <a
                                    href="#contact"
                                    onClick={() => setIsOpen(false)}
                                    className="block w-full text-center mt-4 text-white px-5 py-3 rounded-xl font-medium transition-all"
                                    style={{
                                        background: 'linear-gradient(135deg, var(--accent-cyan), var(--accent-violet))',
                                    }}
                                >
                                    Contact
                                </a>
                                <div className="flex items-center justify-center gap-6 mt-6">
                                    <a
                                        href={contactInfo.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-2 rounded-full glass"
                                        style={{ color: 'var(--text-secondary)' }}
                                        aria-label="GitHub"
                                    >
                                        <Github size={24} />
                                    </a>
                                    <a
                                        href={contactInfo.linkedin}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-2 rounded-full glass"
                                        style={{ color: 'var(--text-secondary)' }}
                                        aria-label="LinkedIn"
                                    >
                                        <Linkedin size={24} />
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
