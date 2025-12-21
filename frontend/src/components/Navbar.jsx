import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const navLinks = ['About', 'Skills', 'Projects', 'Experience', 'Contact'];

    return (
        <>
            {/* Desktop & Mobile Navbar */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a1a]/80 backdrop-blur-xl border-b border-white/5">
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
                                    className="text-sm text-gray-300 hover:text-white transition-colors relative group"
                                >
                                    {link}
                                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-indigo-500 group-hover:w-full transition-all duration-300"></span>
                                </a>
                            ))}
                            <button className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-5 py-2 rounded-full text-sm font-medium hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105">
                                Let's Talk
                            </button>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="md:hidden text-gray-300 hover:text-white transition-colors"
                            aria-label="Toggle menu"
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
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
                    <div className="absolute top-20 left-4 right-4 bg-[#0a0a1a]/95 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl shadow-purple-500/20 overflow-hidden">
                        <div className="p-6 space-y-1">
                            {navLinks.map((link, index) => (
                                <a
                                    key={link}
                                    href={`#${link.toLowerCase()}`}
                                    onClick={() => setIsOpen(false)}
                                    className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-all"
                                    style={{ animationDelay: `${index * 50}ms` }}
                                >
                                    {link}
                                </a>
                            ))}
                            <button
                                onClick={() => setIsOpen(false)}
                                className="w-full mt-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-5 py-3 rounded-lg font-medium hover:shadow-lg hover:shadow-purple-500/50 transition-all"
                            >
                                Let's Talk
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Navbar;
