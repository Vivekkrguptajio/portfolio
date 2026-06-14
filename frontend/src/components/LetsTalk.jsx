import React, { useState, useRef } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { Mail, MapPin, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { contactInfo } from '../data/contactData';

const LetsTalk = () => {
    const formRef = useRef();
    const [formData, setFormData] = useState({
        user_name: '',
        user_email: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null); // 'success' or 'error'

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus(null);

        try {
            // Using FormSubmit.co - no template needed!
            const response = await fetch(`https://formsubmit.co/ajax/${contactInfo.email}`, {
                method: "POST",
                headers: { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    name: formData.user_name,
                    email: formData.user_email,
                    message: formData.message,
                    _subject: "New Contact Form Submission from Portfolio!"
                })
            });

            if (response.ok) {
                setSubmitStatus('success');
                setFormData({ user_name: '', user_email: '', message: '' }); // Clear form
            } else {
                setSubmitStatus('error');
            }
        } catch (error) {
            console.error('Error sending email:', error);
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
            // Hide message after 5 seconds
            setTimeout(() => setSubmitStatus(null), 5000);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const inputStyles = {
        background: 'var(--bg-tertiary)',
        color: 'var(--text-primary)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
    };

    return (
        <section id="letstalk" className="py-24 px-4 sm:px-6 lg:px-8" style={{ background: 'var(--bg-primary)' }}>
            <div className="max-w-7xl mx-auto">
                {/* Section Label */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-4"
                >
                    <span className="text-sm tracking-[0.3em] uppercase" style={{ color: 'var(--accent-cyan)' }}>Contact</span>
                </motion.div>

                {/* Heading */}
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-4xl md:text-5xl font-bold text-center mb-6"
                >
                    <span style={{ color: 'var(--text-primary)' }}>Let's </span>
                    <span className="text-gradient">Connect</span>
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
                    Open to internships & full-time opportunities. Let's build something amazing together!
                </motion.p>

                {/* Content Grid */}
                <div className="grid lg:grid-cols-3 gap-12">
                    {/* Left: Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="lg:col-span-1"
                    >
                        <div className="p-8 rounded-2xl glass-strong neon-border h-full">
                            <h3 className="text-xl font-semibold mb-6" style={{ color: 'var(--text-primary)', fontFamily: "'Space Grotesk', sans-serif" }}>
                                Get in Touch
                            </h3>

                            <div className="space-y-6">
                                {/* Email */}
                                <div className="flex items-start gap-4 group">
                                    <div className="p-3 rounded-xl transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6" style={{ background: 'var(--accent-blue)' }}>
                                        <Mail className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                        <p className="text-sm mb-1" style={{ color: 'var(--text-muted)' }}>Email</p>
                                        <a
                                            href={`mailto:${contactInfo.email}`}
                                            className="transition-colors duration-300 hover:opacity-80"
                                            style={{ color: 'var(--text-primary)' }}
                                        >
                                            {contactInfo.email}
                                        </a>
                                    </div>
                                </div>

                                {/* Location */}
                                <div className="flex items-start gap-4 group">
                                    <div className="p-3 rounded-xl transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6" style={{ background: 'var(--accent-violet)' }}>
                                        <MapPin className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                        <p className="text-sm mb-1" style={{ color: 'var(--text-muted)' }}>Location</p>
                                        <p style={{ color: 'var(--text-primary)' }}>{contactInfo.location}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right: Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="lg:col-span-2"
                    >
                        <form ref={formRef} onSubmit={handleSubmit} className="space-y-6 p-8 rounded-2xl glass-strong neon-border h-full">
                            <div className="grid md:grid-cols-2 gap-6">
                                {/* Name */}
                                <div>
                                    <label htmlFor="name" className="block text-sm mb-2" style={{ color: 'var(--text-muted)' }}>
                                        Your Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="user_name"
                                        value={formData.user_name}
                                        onChange={handleChange}
                                        placeholder="John Doe"
                                        className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none transition-all duration-300 neu-inset focus:shadow-[0_0_0_2px_var(--accent-cyan)]"
                                        style={inputStyles}
                                        required
                                    />
                                </div>

                                {/* Email */}
                                <div>
                                    <label htmlFor="email" className="block text-sm mb-2" style={{ color: 'var(--text-muted)' }}>
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="user_email"
                                        value={formData.user_email}
                                        onChange={handleChange}
                                        placeholder="john@example.com"
                                        className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none transition-all duration-300 neu-inset focus:shadow-[0_0_0_2px_var(--accent-cyan)]"
                                        style={inputStyles}
                                        required
                                    />
                                </div>
                            </div>

                            {/* Message */}
                            <div>
                                <label htmlFor="message" className="block text-sm mb-2" style={{ color: 'var(--text-muted)' }}>
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder="Hi, I'd like to discuss an opportunity..."
                                    rows="6"
                                    className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none transition-all duration-300 resize-none neu-inset focus:shadow-[0_0_0_2px_var(--accent-cyan)]"
                                    style={inputStyles}
                                    required
                                />
                            </div>

                            {/* Submit Button */}
                            <motion.button
                                type="submit"
                                disabled={isSubmitting}
                                whileHover={{ y: -2, scale: 1.01 }}
                                whileTap={{ scale: 0.98 }}
                                className={`w-full px-6 py-3.5 rounded-xl font-semibold text-white flex items-center justify-center gap-2 transition-all duration-300 ${
                                    submitStatus === 'success' ? 'bg-green-500' : submitStatus === 'error' ? 'bg-red-500' : ''
                                }`}
                                style={!submitStatus ? {
                                    background: 'linear-gradient(135deg, var(--accent-cyan), var(--accent-violet))',
                                    boxShadow: '0 0 30px rgba(0, 240, 255, 0.15)',
                                } : {}}
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        Sending...
                                    </>
                                ) : submitStatus === 'success' ? (
                                    <>
                                        <CheckCircle2 className="w-5 h-5" />
                                        Message Sent Successfully!
                                    </>
                                ) : submitStatus === 'error' ? (
                                    <>
                                        <AlertCircle className="w-5 h-5" />
                                        Failed to Send. Try Again.
                                    </>
                                ) : (
                                    <>
                                        Send Message
                                        <Send className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                                    </>
                                )}
                            </motion.button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default LetsTalk;
