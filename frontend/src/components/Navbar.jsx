import React, { useState } from 'react';
import { Menu, X, Github, Linkedin, Moon, Sun } from 'lucide-react';
import { contactInfo } from '../data/contactData';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { theme, toggleTheme } = useTheme();

    const navLinks = ['About', 'Skills', 'Projects', 'Experience'];

    return (
        <>
            {/* Desktop & Mobile Navbar */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-[#0a0a1a]/80 backdrop-blur-xl border-b border-gray-200 dark:border-white/5 transition-colors duration-300">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo */}
                        <a href="#" className="text-xl font-bold">
                            <span className="bg-gradient-to-r from-purple-500 to-indigo-500 bg-clip-text text-transparent">
                                Portfolio
                            </span>
                        </a>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center space-x-8">
                            {navLinks.map((link) => (
                                <a
                                    key={link}
                                    href={`#${link.toLowerCase()}`}
                                    className="text-sm text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-white transition-colors relative group"
                                >
                                    {link}
                                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-indigo-500 group-hover:w-full transition-all duration-300"></span>
                                </a>
                            ))}

                            {/* Theme Toggle */}
                            <button
                                onClick={toggleTheme}
                                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/5 text-gray-600 dark:text-gray-300 transition-colors"
                                aria-label="Toggle Theme"
                            >
                                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                            </button>

                            <a
                                href="#contact"
                                className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-5 py-2 rounded-full text-sm font-medium hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105"
                            >
                                Contact
                            </a>
                            <div className="flex items-center gap-4">
                                <a
                                    href={contactInfo.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors hover:scale-110 duration-300"
                                    aria-label="GitHub"
                                >
                                    <Github size={20} />
                                </a>
                                <a
                                    href={contactInfo.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors hover:scale-110 duration-300"
                                    aria-label="LinkedIn"
                                >
                                    <Linkedin size={20} />
                                </a>
                            </div>
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="flex items-center gap-4 md:hidden">
                            <button
                                onClick={toggleTheme}
                                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/5 text-gray-600 dark:text-gray-300 transition-colors"
                            >
                                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                            </button>

                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors"
                                aria-label="Toggle menu"
                            >
                                {isOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-40 md:hidden"
                    onClick={() => setIsOpen(false)}
                >
                    {/* Backdrop */}
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

                    {/* Menu Card */}
                    <div className="absolute top-20 left-4 right-4 bg-white/95 dark:bg-[#0a0a1a]/95 backdrop-blur-xl rounded-2xl border border-gray-200 dark:border-white/10 shadow-2xl shadow-purple-500/20 overflow-hidden">
                        <div className="p-6 space-y-1">
                            {navLinks.map((link, index) => (
                                <a
                                    key={link}
                                    href={`#${link.toLowerCase()}`}
                                    onClick={() => setIsOpen(false)}
                                    className="block px-4 py-3 text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-white hover:bg-purple-50 dark:hover:bg-white/5 rounded-lg transition-all"
                                    style={{ animationDelay: `${index * 50}ms` }}
                                >
                                    {link}
                                </a>
                            ))}
                            <a
                                href="#contact"
                                onClick={() => setIsOpen(false)}
                                className="block w-full text-center mt-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-5 py-3 rounded-lg font-medium hover:shadow-lg hover:shadow-purple-500/50 transition-all"
                            >
                                Contact
                            </a>
                            <div className="flex items-center justify-center gap-6 mt-6">
                                <a
                                    href={contactInfo.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 bg-gray-100 dark:bg-white/5 rounded-full text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white hover:bg-gray-200 dark:hover:bg-white/10 transition-all"
                                    aria-label="GitHub"
                                >
                                    <Github size={24} />
                                </a>
                                <a
                                    href={contactInfo.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 bg-gray-100 dark:bg-white/5 rounded-full text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-200 dark:hover:bg-white/10 transition-all"
                                    aria-label="LinkedIn"
                                >
                                    <Linkedin size={24} />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Navbar;
