import React from 'react';
import { Github, Linkedin, Code2, FileCode } from 'lucide-react';

const Contact = () => {
    const profiles = [
        {
            icon: Github,
            name: 'GitHub',
            username: '@yourusername',
            stat: '50+ Repositories',
            link: 'https://github.com/yourusername',
            iconBg: 'bg-gray-700'
        },
        {
            icon: Linkedin,
            name: 'LinkedIn',
            username: '/in/yourusername',
            stat: '500+ Connections',
            link: 'https://linkedin.com/in/yourusername',
            iconBg: 'bg-blue-600'
        },
        {
            icon: Code2,
            name: 'LeetCode',
            username: '@yourusername',
            stat: '300+ Problems',
            link: 'https://leetcode.com/yourusername',
            iconBg: 'bg-orange-500'
        },
        {
            icon: FileCode,
            name: 'GeeksforGeeks',
            username: '@yourusername',
            stat: '200+ Problems',
            link: 'https://auth.geeksforgeeks.org/user/yourusername',
            iconBg: 'bg-green-600'
        }
    ];

    return (
        <section id="contact" className="min-h-screen bg-[#0a0a1a] py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Section Label */}
                <div className="text-center mb-4">
                    <span className="text-sm text-blue-400 tracking-widest uppercase">Connect</span>
                </div>

                {/* Heading */}
                <h2 className="text-4xl md:text-5xl font-bold text-center mb-6">
                    <span className="text-white">Coding </span>
                    <span className="bg-gradient-to-r from-purple-500 via-violet-500 to-indigo-500 bg-clip-text text-transparent">
                        Profiles
                    </span>
                </h2>

                {/* Description */}
                <p className="text-center text-gray-400 max-w-3xl mx-auto mb-16">
                    Check out my problem-solving journey and open source contributions
                </p>

                {/* Profiles Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                    {profiles.map((profile, index) => {
                        const Icon = profile.icon;
                        return (
                            <a
                                key={index}
                                href={profile.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-[#0f0f1f]/80 backdrop-blur-sm border border-white/5 rounded-2xl p-6 hover:border-purple-500/30 hover:scale-105 transition-all duration-300 group"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className={`p-3 ${profile.iconBg} rounded-xl`}>
                                            <Icon className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-white mb-1">{profile.name}</h3>
                                            <p className="text-sm text-gray-400">{profile.username}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-medium text-blue-400">{profile.stat}</p>
                                    </div>
                                </div>
                            </a>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Contact;
