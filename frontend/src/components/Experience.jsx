import React from 'react';
import { Calendar, Award } from 'lucide-react';
import { experiences, highlights } from '../data/experienceData';

const Experience = () => {

    return (
        <section id="experience" className="min-h-screen bg-white dark:bg-[#050614] py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Section Label */}
                <div className="text-center mb-4">
                    <span className="text-sm text-purple-600 dark:text-blue-400 tracking-widest uppercase">Experience</span>
                </div>

                {/* Heading */}
                <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
                    <span className="text-gray-900 dark:text-white">Journey & </span>
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
                                    className="bg-gray-50 dark:bg-[#0a0a1a]/80 backdrop-blur-sm border border-gray-200 dark:border-white/5 rounded-2xl p-5 hover:border-purple-500/30 transition-all duration-300 shadow-md dark:shadow-none"
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
                                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{exp.role}</h3>
                                                    <p className="text-sm text-purple-600 dark:text-blue-400">{exp.company}</p>
                                                </div>
                                                <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                                                    <Calendar className="w-3 h-3" />
                                                    <span>{exp.date}</span>
                                                </div>
                                            </div>
                                            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
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
                        <div className="bg-gray-50 dark:bg-[#0a0a1a]/80 backdrop-blur-sm border border-gray-200 dark:border-white/5 rounded-2xl p-5 sticky top-24 shadow-md dark:shadow-none">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-purple-500 rounded-lg">
                                    <Award className="w-5 h-5 text-white" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Highlights</h3>
                            </div>

                            <ul className="space-y-4">
                                {highlights.map((highlight, index) => (
                                    <li key={index} className="flex items-start gap-3">
                                        <div className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-2 shrink-0"></div>
                                        <span className="text-sm text-gray-600 dark:text-gray-300">{highlight}</span>
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
