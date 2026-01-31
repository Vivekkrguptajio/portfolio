import React from 'react';
import { Download, ExternalLink, ArrowDown } from 'lucide-react';

const Hero = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen pt-24 px-4 text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-white/5 border border-white/10 mb-6 md:mb-8 backdrop-blur-sm">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                <span className="text-xs md:text-sm text-gray-300">Open to opportunities</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-4 md:mb-6 tracking-tight leading-tight">
                Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-violet-500 to-indigo-500 block sm:inline">Vivek Kumar Gupta</span>
            </h1>

            {/* Subheading & Description */}
            <h2 className="text-lg md:text-2xl text-gray-400 mb-4 font-light max-w-lg md:max-w-none mx-auto">
                Final Year CSE Student | MERN Stack Developer
            </h2>
            <p className="max-w-xl text-gray-500 mb-8 md:mb-10 text-base md:text-lg mx-auto">
                Building scalable, real-world web applications with clean backend architecture.
            </p>

            {/* Scroll Indicator (Visual only as per design) */}
            <div className="flex flex-col items-center gap-2 text-gray-500 text-[10px] md:text-xs tracking-widest uppercase mb-6 md:mb-4">
                Scroll
                <ArrowDown size={14} className="animate-bounce md:w-4 md:h-4" />
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-2 w-full sm:w-auto px-4 sm:px-0">
                <a
                    href="#projects"
                    className="group flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 px-8 py-3 rounded-lg font-semibold text-white shadow-[0_0_20px_rgba(124,58,237,0.3)] hover:shadow-[0_0_30px_rgba(124,58,237,0.5)] transition-all hover:-translate-y-0.5 w-full sm:w-auto"
                >
                    View Projects
                    <ExternalLink size={18} className="group-hover:translate-x-0.5 transition-transform" />
                </a>

                <a
                    href="/Resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-center gap-2 px-8 py-3 rounded-lg font-semibold text-gray-300 border border-white/10 hover:bg-white/5 transition-all hover:-translate-y-0.5 w-full sm:w-auto"
                >
                    Download Resume
                    <Download size={18} className="group-hover:translate-y-0.5 transition-transform" />
                </a>
            </div>
        </div>
    );
};

export default Hero;
