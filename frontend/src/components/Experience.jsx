import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { Calendar, Award } from 'lucide-react';
import { experiences, highlights } from '../data/experienceData';

const Experience = () => {
    return (
        <section id="experience" className="py-24 px-4 sm:px-6 lg:px-8" style={{ background: 'var(--bg-primary)' }}>
            <div className="max-w-7xl mx-auto">
                {/* Section Label */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-4"
                >
                    <span className="text-sm tracking-[0.3em] uppercase" style={{ color: 'var(--accent-cyan)' }}>Experience</span>
                </motion.div>

                {/* Heading */}
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-4xl md:text-5xl font-bold text-center mb-16"
                >
                    <span style={{ color: 'var(--text-primary)' }}>Journey & </span>
                    <span className="text-gradient">Achievements</span>
                </motion.h2>

                {/* Content Grid */}
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Left: Experience Timeline */}
                    <div className="lg:col-span-2 space-y-6 relative">
                        {/* Animated vertical line */}
                        <motion.div
                            initial={{ height: 0 }}
                            whileInView={{ height: '100%' }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.5, ease: 'easeOut' }}
                            className="absolute left-8 top-0 w-px hidden lg:block"
                            style={{ background: 'linear-gradient(to bottom, var(--accent-cyan), var(--accent-violet), transparent)' }}
                        />

                        {experiences.map((exp, index) => {
                            const Icon = exp.icon;
                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -40 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
                                    whileHover={{ y: -4, transition: { duration: 0.2 } }}
                                    className="p-5 rounded-2xl glass neon-border relative"
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
                                                    <h3 className="text-lg font-semibold" style={{ color: 'var(--text-primary)', fontFamily: "'Space Grotesk', sans-serif" }}>
                                                        {exp.role}
                                                    </h3>
                                                    <p className="text-sm" style={{ color: 'var(--accent-cyan)' }}>{exp.company}</p>
                                                </div>
                                                <div className="flex items-center gap-2 text-xs" style={{ color: 'var(--text-muted)' }}>
                                                    <Calendar className="w-3 h-3" />
                                                    <span>{exp.date}</span>
                                                </div>
                                            </div>
                                            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                                                {exp.description}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* Right: Highlights */}
                    <div className="lg:col-span-1">
                        <motion.div
                            initial={{ opacity: 0, x: 40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="p-6 rounded-2xl glass-strong sticky top-24 neon-border"
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 rounded-lg" style={{ background: 'var(--accent-violet)' }}>
                                    <Award className="w-5 h-5 text-white" />
                                </div>
                                <h3 className="text-xl font-semibold" style={{ color: 'var(--text-primary)', fontFamily: "'Space Grotesk', sans-serif" }}>
                                    Highlights
                                </h3>
                            </div>

                            <ul className="space-y-4">
                                {highlights.map((highlight, index) => (
                                    <motion.li
                                        key={index}
                                        initial={{ opacity: 0, x: 20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                                        className="flex items-start gap-3"
                                    >
                                        <div className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ background: 'var(--accent-cyan)' }} />
                                        <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>{highlight}</span>
                                    </motion.li>
                                ))}
                            </ul>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Experience;
