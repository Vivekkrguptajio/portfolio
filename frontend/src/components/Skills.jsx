import React from 'react';
import { skillCategories } from '../data/skillsData';

const Skills = () => {
    return (
        <section id="skills" className="min-h-screen bg-white dark:bg-[#050614] py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Section Label */}
                <div className="text-center mb-4">
                    <span className="text-sm text-purple-600 dark:text-blue-400 tracking-widest uppercase">Skills</span>
                </div>

                {/* Heading */}
                <h2 className="text-4xl md:text-5xl font-bold text-center mb-6">
                    <span className="text-gray-900 dark:text-white">Technologies I </span>
                    <span className="bg-gradient-to-r from-purple-500 via-violet-500 to-indigo-500 bg-clip-text text-transparent">
                        Work With
                    </span>
                </h2>

                {/* Description */}
                <p className="text-center text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-16">
                    A comprehensive toolkit for building modern web applications from frontend to backend
                </p>

                {/* Skills Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {skillCategories.map((category, index) => {
                        const Icon = category.icon;
                        return (
                            <div
                                key={index}
                                className="bg-gray-50 dark:bg-[#0a0a1a]/80 backdrop-blur-sm border border-gray-200 dark:border-white/5 rounded-2xl p-4 hover:border-purple-500/30 transition-all duration-300 shadow-md dark:shadow-none"
                            >
                                {/* Header */}
                                <div className="flex items-center gap-3 mb-5">
                                    <div className={`p-3 ${category.iconBg} rounded-xl`}>
                                        <Icon className="w-5 h-5 text-white" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{category.title}</h3>
                                </div>

                                {/* Skills Pills */}
                                <div className="flex flex-wrap gap-2">
                                    {category.skills.map((skill, skillIndex) => (
                                        <span
                                            key={skillIndex}
                                            className="px-3 py-1.5 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-md text-xs text-gray-700 dark:text-gray-300"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Skills;
