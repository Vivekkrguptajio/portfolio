import React from 'react';
import { Briefcase, Award, Shield, Calendar } from 'lucide-react';

const Experience = () => {
    const experiences = [
        {
            icon: Briefcase,
            iconBg: 'bg-blue-500',
            title: 'Software Development Intern',
            company: 'Tech Company XYZ',
            date: 'Jun 2024 - Aug 2024',
            description: 'Developed REST APIs using Node.js and Express, collaborated on frontend features with React, and improved application performance by 30%.'
        },
        {
            icon: Award,
            iconBg: 'bg-yellow-500',
            title: 'Winner - Smart India Hackathon',
            company: 'National Level',
            date: 'Dec 2023',
            description: 'Led a team of 6 to build an AI-powered solution for document verification. Won among 500+ participating teams.'
        },
        {
            icon: Shield,
            iconBg: 'bg-green-500',
            title: 'AWS Cloud Practitioner',
            company: 'Amazon Web Services',
            date: '2024',
            description: 'Certified in cloud computing fundamentals, AWS services, and cloud architecture best practices.'
        }
    ];

    const highlights = [
        '300+ Problems solved on LeetCode',
        '5★ Rating on HackerRank (Java)',
        'Open Source Contributor',
        'Technical Blog Writer'
    ];

    return (
        <section id="experience" className="min-h-screen bg-[#050614] py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Section Label */}
                <div className="text-center mb-4">
                    <span className="text-sm text-blue-400 tracking-widest uppercase">Experience</span>
                </div>

                {/* Heading */}
                <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
                    <span className="text-white">Journey & </span>
                    <span className="bg-gradient-to-r from-purple-500 via-violet-500 to-indigo-500 bg-clip-text text-transparent">
                        Achievements
                    </span>
                </h2>

                {/* Content Grid */}
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Left: Experience Timeline */}
                    <div className="lg:col-span-2 space-y-6">
                        {experiences.map((exp, index) => {
                            const Icon = exp.icon;
                            return (
                                <div
                                    key={index}
                                    className="bg-[#0a0a1a]/80 backdrop-blur-sm border border-white/5 rounded-2xl p-6 hover:border-purple-500/30 transition-all duration-300"
                                >
                                    <div className="flex items-start gap-4">
                                        {/* Icon */}
                                        <div className={`p-3 ${exp.iconBg} rounded-xl shrink-0`}>
                                            <Icon className="w-5 h-5 text-white" />
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1">
                                            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                                                <div>
                                                    <h3 className="text-lg font-semibold text-white">{exp.title}</h3>
                                                    <p className="text-sm text-blue-400">{exp.company}</p>
                                                </div>
                                                <div className="flex items-center gap-2 text-xs text-gray-400">
                                                    <Calendar className="w-3 h-3" />
                                                    <span>{exp.date}</span>
                                                </div>
                                            </div>
                                            <p className="text-sm text-gray-400 leading-relaxed">
                                                {exp.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Right: Highlights */}
                    <div className="lg:col-span-1">
                        <div className="bg-[#0a0a1a]/80 backdrop-blur-sm border border-white/5 rounded-2xl p-6 sticky top-24">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-purple-500 rounded-lg">
                                    <Award className="w-5 h-5 text-white" />
                                </div>
                                <h3 className="text-xl font-semibold text-white">Highlights</h3>
                            </div>

                            <ul className="space-y-4">
                                {highlights.map((highlight, index) => (
                                    <li key={index} className="flex items-start gap-3">
                                        <div className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-2 shrink-0"></div>
                                        <span className="text-sm text-gray-300">{highlight}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Experience;
