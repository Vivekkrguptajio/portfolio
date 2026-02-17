import React from 'react';
import { infoCards } from '../data/aboutData';

const About = () => {

    return (
        <section id="about" className="min-h-screen bg-gray-50 dark:bg-[#0a0a1a] py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Section Label */}
                <div className="text-center mb-4">
                    <span className="text-sm text-purple-600 dark:text-blue-400 tracking-widest uppercase">About Me</span>
                </div>

                {/* Heading */}
                <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
                    <span className="text-gray-900 dark:text-white">Passionate Developer</span>
                    <br />
                    <span className="bg-gradient-to-r from-purple-500 via-violet-500 to-indigo-500 bg-clip-text text-transparent">
                        Building for the Future
                    </span>
                </h2>

                {/* Content Grid */}
                <div className="grid md:grid-cols-2 gap-8 items-start">
                    {/* Left: Bio */}
                    <div className="space-y-6 text-gray-600 dark:text-gray-300 leading-relaxed text-justify">
                        <p>
                            Passionate AI/ML Engineer with hands-on expertise in Deep Learning, Computer Vision, and Machine Learning. Skilled in building, training, and deploying neural networks (DenseNet, CNNs) using TensorFlow, Keras, and PyTorch.
                        </p>
                        <p>
                            Experienced in data preprocessing, feature engineering, and model optimization for supervised and unsupervised learning tasks. Strong foundation in Data Structures, Algorithms, Statistics, and Linear Algebra.
                        </p>
                        <p>
                            Proficient with Python, Git, Docker, and cloud deployment with growing expertise in MLOps, model pipeline orchestration, and production deployment.
                        </p>
                    </div>

                    {/* Right: Info Cards */}
                    <div className="space-y-4">
                        {infoCards.map((card, index) => {
                            const Icon = card.icon;
                            return (
                                <div
                                    key={index}
                                    className="bg-white/80 dark:bg-[#0f0f1f]/80 backdrop-blur-sm border border-gray-200 dark:border-white/5 rounded-xl p-4 hover:border-purple-500/30 transition-all duration-300 group cursor-pointer shadow-lg dark:shadow-none"
                                >
                                    <div className="flex items-start gap-4">
                                        <div className={`p-3 ${card.iconBg} rounded-xl transition-all duration-300`}>
                                            <Icon className="w-5 h-5 text-white" />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{card.title}</h3>
                                            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{card.description}</p>
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
