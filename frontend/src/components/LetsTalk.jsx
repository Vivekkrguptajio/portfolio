import React, { useState } from 'react';
import { Mail, MapPin, Send } from 'lucide-react';
import { contactInfo } from '../data/contactData';

const LetsTalk = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission
        console.log('Form submitted:', formData);
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <section id="letstalk" className="min-h-screen bg-white dark:bg-[#050614] py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Section Label */}
                <div className="text-center mb-4">
                    <span className="text-sm text-purple-600 dark:text-blue-400 tracking-widest uppercase">Contact</span>
                </div>

                {/* Heading */}
                <h2 className="text-4xl md:text-5xl font-bold text-center mb-6">
                    <span className="text-gray-900 dark:text-white">Let's </span>
                    <span className="bg-gradient-to-r from-purple-500 via-violet-500 to-indigo-500 bg-clip-text text-transparent">
                        Connect
                    </span>
                </h2>

                {/* Description */}
                <p className="text-center text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-16">
                    Open to internships & full-time opportunities. Let's build something amazing together!
                </p>

                {/* Content Grid */}
                <div className="grid lg:grid-cols-3 gap-12">
                    {/* Left: Contact Info */}
                    <div className="lg:col-span-1">
                        <div className="bg-gray-50 dark:bg-[#0a0a1a] p-8 rounded-2xl border border-gray-200 dark:border-white/5 shadow-lg dark:shadow-none">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Get in Touch</h3>

                            <div className="space-y-6">
                                {/* Email */}
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-blue-500 rounded-xl">
                                        <Mail className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Email</p>
                                        <a href={`mailto:${contactInfo.email}`} className="text-gray-900 dark:text-white hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                                            {contactInfo.email}
                                        </a>
                                    </div>
                                </div>

                                {/* Location */}
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-purple-500 rounded-xl">
                                        <MapPin className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Location</p>
                                        <p className="text-gray-900 dark:text-white">{contactInfo.location}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Contact Form */}
                    <div className="lg:col-span-2">
                        <form onSubmit={handleSubmit} className="space-y-6 bg-gray-50 dark:bg-[#0a0a1a] p-8 rounded-2xl border border-gray-200 dark:border-white/5 shadow-lg dark:shadow-none">
                            <div className="grid md:grid-cols-2 gap-6">
                                {/* Name */}
                                <div>
                                    <label htmlFor="name" className="block text-sm text-gray-700 dark:text-gray-400 mb-2">
                                        Your Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="John Doe"
                                        className="w-full px-4 py-3 bg-white dark:bg-white/5 border border-gray-300 dark:border-white/10 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-purple-500/50 transition-colors"
                                        required
                                    />
                                </div>

                                {/* Email */}
                                <div>
                                    <label htmlFor="email" className="block text-sm text-gray-700 dark:text-gray-400 mb-2">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="john@example.com"
                                        className="w-full px-4 py-3 bg-white dark:bg-white/5 border border-gray-300 dark:border-white/10 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-purple-500/50 transition-colors"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Message */}
                            <div>
                                <label htmlFor="message" className="block text-sm text-gray-700 dark:text-gray-400 mb-2">
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder="Hi, I'd like to discuss an opportunity..."
                                    rows="6"
                                    className="w-full px-4 py-3 bg-white dark:bg-white/5 border border-gray-300 dark:border-white/10 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-purple-500/50 transition-colors resize-none"
                                    required
                                ></textarea>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 flex items-center justify-center gap-2"
                            >
                                Send Message
                                <Send className="w-4 h-4" />
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LetsTalk;
