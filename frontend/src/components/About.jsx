import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { infoCards } from '../data/aboutData';

const About = () => {
    return (
        <section id="about" className="py-24 px-4 sm:px-6 lg:px-8" style={{ background: 'var(--bg-primary)' }}>
            <div className="max-w-7xl mx-auto">
                {/* Section Label */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-4"
                >
                    <span className="text-sm tracking-[0.3em] uppercase" style={{ color: 'var(--accent-cyan)' }}>About Me</span>
                </motion.div>

                {/* Heading */}
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-4xl md:text-5xl font-bold text-center mb-16"
                >
                    <span style={{ color: 'var(--text-primary)' }}>Passionate Developer</span>
                    <br />
                    <span className="text-gradient">Building for the Future</span>
                </motion.h2>

                {/* Content Grid */}
                <div className="grid md:grid-cols-2 gap-12 items-start">
                    {/* Left: Bio */}
                    <div className="space-y-6 leading-relaxed text-justify">
                        {[
                            "Passionate AI/ML Engineer with hands-on expertise in Deep Learning, Computer Vision, and Machine Learning. Skilled in building, training, and deploying neural networks (DenseNet, CNNs) using TensorFlow, Keras, and PyTorch.",
                            "Experienced in data preprocessing, feature engineering, and model optimization for supervised and unsupervised learning tasks. Strong foundation in Data Structures, Algorithms, Statistics, and Linear Algebra.",
                            "Proficient with Python, Git, Docker, and cloud deployment with growing expertise in MLOps, model pipeline orchestration, and production deployment."
                        ].map((text, i) => (
                            <motion.p
                                key={i}
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.2 + i * 0.15 }}
                                style={{ color: 'var(--text-secondary)' }}
                            >
                                {text}
                            </motion.p>
                        ))}
                    </div>

                    {/* Right: Info Cards */}
                    <div className="space-y-4">
                        {infoCards.map((card, index) => {
                            const Icon = card.icon;
                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: 40 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: 0.2 + index * 0.12, ease: [0.22, 1, 0.36, 1] }}
                                    whileHover={{ y: -4, transition: { duration: 0.2 } }}
                                    className="p-5 rounded-xl glass neon-border group"
                                    style={{ cursor: 'pointer' }}
                                >
                                    <div className="flex items-start gap-4">
                                        <div
                                            className={`p-3 ${card.iconBg} rounded-xl transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6`}
                                        >
                                            <Icon className="w-5 h-5 text-white" />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)', fontFamily: "'Space Grotesk', sans-serif" }}>
                                                {card.title}
                                            </h3>
                                            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                                                {card.description}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
