import React from 'react';
import { GraduationCap, Code2, Target } from 'lucide-react';

const About = () => {
    const infoCards = [
        {
            icon: GraduationCap,
            title: 'Education',
            iconBg: 'bg-blue-500',
            description: 'B.Tech in Computer Science & Engineering (2021-2025) from XYZ University with 8.5 CGPA'
        },
        {
            icon: Code2,
            title: 'Specialization',
            iconBg: 'bg-purple-500',
            description: 'Backend Development with Java & Spring Boot, Full-stack with MERN Stack'
        },
        {
            icon: Target,
            title: 'Focus',
            iconBg: 'bg-blue-500',
            description: 'Building scalable applications, clean code architecture, and solving complex problems'
        }
    ];

    return (
        <section id="about" className="min-h-screen bg-[#0a0a1a] py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Section Label */}
                <div className="text-center mb-4">
                    <span className="text-sm text-blue-400 tracking-widest uppercase">About Me</span>
                </div>

                {/* Heading */}
                <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
                    <span className="text-white">Passionate Developer</span>
                    <br />
                    <span className="bg-gradient-to-r from-purple-500 via-violet-500 to-indigo-500 bg-clip-text text-transparent">
                        Building for the Future
                    </span>
                </h2>

                {/* Content Grid */}
                <div className="grid md:grid-cols-2 gap-12 items-start">
                    {/* Left: Bio */}
                    <div className="space-y-6 text-gray-300 leading-relaxed">
                        <p>
                            I'm a final year Computer Science Engineering student with a strong passion for backend development and building full-stack web applications. My journey in programming started with C++ and evolved into mastering Java and the MERN stack.
                        </p>
                        <p>
                            I thrive on solving complex problems and translating ideas into functional, scalable applications. With a solid foundation in data structures, algorithms, and software engineering principles, I'm ready to contribute to impactful projects in the tech industry.
                        </p>
                        <p>
                            Currently seeking opportunities where I can apply my skills in backend development, contribute to innovative solutions, and continue growing as a software engineer.
                        </p>
                    </div>

                    {/* Right: Info Cards */}
                    <div className="space-y-4">
                        {infoCards.map((card, index) => {
                            const Icon = card.icon;
                            return (
                                <div
                                    key={index}
                                    className="bg-[#0f0f1f]/80 backdrop-blur-sm border border-white/5 rounded-xl p-6 hover:border-purple-500/30 transition-all duration-300 group cursor-pointer"
                                >
                                    <div className="flex items-start gap-4">
                                        <div className={`p-3 ${card.iconBg} rounded-xl transition-all duration-300`}>
                                            <Icon className="w-5 h-5 text-white" />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-lg font-semibold text-white mb-2">{card.title}</h3>
                                            <p className="text-sm text-gray-400 leading-relaxed">{card.description}</p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
