import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { profiles } from '../data/contactData';

const Contact = () => {
    return (
        <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8" style={{ background: 'var(--bg-secondary)' }}>
            <div className="max-w-7xl mx-auto">
                {/* Section Label */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-4"
                >
                    <span className="text-sm tracking-[0.3em] uppercase" style={{ color: 'var(--accent-cyan)' }}>Connect</span>
                </motion.div>

                {/* Heading */}
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-4xl md:text-5xl font-bold text-center mb-6"
                >
                    <span style={{ color: 'var(--text-primary)' }}>Coding </span>
                    <span className="text-gradient">Profiles</span>
                </motion.h2>

                {/* Description */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-center max-w-3xl mx-auto mb-16"
                    style={{ color: 'var(--text-muted)' }}
                >
                    Check out my problem-solving journey and open source contributions
                </motion.p>

                {/* Profiles Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                    {profiles.map((profile, index) => {
                        const Icon = profile.icon;
                        return (
                            <motion.a
                                key={index}
                                href={profile.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                whileHover={{ y: -6, scale: 1.02, transition: { duration: 0.2 } }}
                                className="block p-5 rounded-2xl glass neon-border group"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className={`p-3 ${profile.iconBg} rounded-xl transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6`}>
                                            <Icon className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <h3
                                                className="text-lg font-semibold mb-1 transition-colors duration-300"
                                                style={{
                                                    color: 'var(--text-primary)',
                                                    fontFamily: "'Space Grotesk', sans-serif",
                                                }}
                                            >
                                                {profile.name}
                                            </h3>
                                            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>{profile.username}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-medium" style={{ color: 'var(--accent-cyan)' }}>{profile.stat}</p>
                                    </div>
                                </div>
                            </motion.a>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Contact;
