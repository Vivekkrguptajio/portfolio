import React, { Suspense, useMemo } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { Download, ExternalLink, ArrowDown } from 'lucide-react';
import { heroData } from '../data/heroData';
import HeroScene from './HeroScene';

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i = 0) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    }),
};

/* ─── Starfield + Shooting Stars (pure CSS, full hero bg) ─── */
const StarfieldBackground = () => {
    // Generate star positions once
    const stars = useMemo(() => {
        const arr = [];
        for (let i = 0; i < 120; i++) {
            // eslint-disable-next-line react-hooks/purity
            arr.push({
                id: i,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                size: Math.random() * 2 + 0.5,
                opacity: Math.random() * 0.6 + 0.2,
                delay: Math.random() * 5,
            });
        }
        return arr;
    }, []);

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            {/* Static twinkling stars */}
            {stars.map((s) => (
                <div
                    key={s.id}
                    className="absolute rounded-full"
                    style={{
                        left: s.left,
                        top: s.top,
                        width: s.size,
                        height: s.size,
                        background: '#fff',
                        opacity: s.opacity,
                        animation: `twinkle ${2 + s.delay * 0.4}s ease-in-out ${s.delay}s infinite alternate`,
                    }}
                />
            ))}

            {/* Shooting star 1 — Cyan */}
            <div className="absolute" style={{
                top: '0%', left: '10%', width: '50px', height: '1px',
                background: 'linear-gradient(90deg, transparent, #00f0ff88, #00f0ff)',
                borderRadius: '999px', opacity: 0,
                animation: 'shootingStar 6s ease-in 1s infinite',
            }} />

            {/* Shooting star 2 — Violet */}
            <div className="absolute" style={{
                top: '-10%', left: '45%', width: '60px', height: '1px',
                background: 'linear-gradient(90deg, transparent, #a855f788, #a855f7)',
                borderRadius: '999px', opacity: 0,
                animation: 'shootingStar 7s ease-in 4s infinite',
            }} />

            {/* Shooting star 3 — Green */}
            <div className="absolute" style={{
                top: '20%', left: '-5%', width: '45px', height: '1px',
                background: 'linear-gradient(90deg, transparent, #34d39988, #34d399)',
                borderRadius: '999px', opacity: 0,
                animation: 'shootingStar 8s ease-in 7s infinite',
            }} />



            <style>{`
                @keyframes twinkle {
                    0% { opacity: 0.15; transform: scale(0.8); }
                    100% { opacity: 0.8; transform: scale(1.2); }
                }
                @keyframes shootingStar {
                    0% { opacity: 0; transform: rotate(45deg) translateX(0); }
                    10% { opacity: 1; }
                    80% { opacity: 1; }
                    100% { opacity: 0; transform: rotate(45deg) translateX(800px); }
                }
            `}</style>
        </div>
    );
};

const Hero = () => {
    const { badge, heading, subHeading, description, buttons } = heroData;

    return (
        <section className="relative min-h-[100dvh] flex items-center overflow-hidden" style={{ background: 'linear-gradient(to bottom, #020617, #000000)' }}>
            {/* Full-hero starfield + shooting stars */}
            <StarfieldBackground />

            {/* Background gradient orbs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-20 blur-[120px]" style={{ background: 'var(--accent-cyan)' }} />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full opacity-15 blur-[120px]" style={{ background: 'var(--accent-violet)' }} />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-24 pb-12">
                <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-4">

                    {/* Left: Text Content */}
                    <div className="flex-1 flex flex-col gap-6 text-center lg:text-left items-center lg:items-start">
                        {/* Badge */}
                        <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0}>
                            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm" style={{ color: 'var(--text-secondary)' }}>
                                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                                {badge.text}
                            </span>
                        </motion.div>

                        {/* Name */}
                        <motion.h1
                            variants={fadeUp} initial="hidden" animate="visible" custom={1}
                            className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight leading-[1.1]"
                            style={{ color: 'var(--text-primary)' }}
                        >
                            {heading.greeting}{' '}
                            <span className="text-gradient block sm:inline">{heading.name}</span>
                        </motion.h1>

                        {/* Subtitle */}
                        <motion.h2
                            variants={fadeUp} initial="hidden" animate="visible" custom={2}
                            className="text-lg sm:text-xl lg:text-2xl font-light"
                            style={{ color: 'var(--text-secondary)' }}
                        >
                            {subHeading}
                        </motion.h2>

                        {/* Description */}
                        <motion.p
                            variants={fadeUp} initial="hidden" animate="visible" custom={3}
                            className="max-w-lg text-base lg:text-lg leading-relaxed"
                            style={{ color: 'var(--text-muted)' }}
                        >
                            {description}
                        </motion.p>

                        {/* Buttons */}
                        <motion.div
                            variants={fadeUp} initial="hidden" animate="visible" custom={4}
                            className="flex flex-col sm:flex-row gap-4 mt-2"
                        >
                            <a
                                href={buttons.projects.href}
                                className="group relative inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-white overflow-hidden transition-all duration-300 hover:-translate-y-1"
                                style={{
                                    background: 'linear-gradient(135deg, var(--accent-cyan), var(--accent-violet))',
                                    boxShadow: '0 0 30px rgba(0, 240, 255, 0.2), 0 10px 40px rgba(0, 240, 255, 0.1)',
                                }}
                            >
                                {buttons.projects.text}
                                <ExternalLink size={18} className="group-hover:translate-x-0.5 transition-transform" />
                            </a>
                            <a
                                href={buttons.resume.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-semibold glass hover:-translate-y-1 transition-all duration-300 neon-border"
                                style={{ color: 'var(--text-primary)' }}
                            >
                                {buttons.resume.text}
                                <Download size={18} className="group-hover:translate-y-0.5 transition-transform" />
                            </a>
                        </motion.div>

                        {/* Scroll indicator */}
                        <motion.div
                            variants={fadeUp} initial="hidden" animate="visible" custom={5}
                            className="flex flex-col items-center lg:items-start gap-2 mt-8"
                            style={{ color: 'var(--text-muted)' }}
                        >
                            <span className="text-[10px] tracking-[0.3em] uppercase">Scroll</span>
                            <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}>
                                <ArrowDown size={14} />
                            </motion.div>
                        </motion.div>
                    </div>

                    {/* Right: Solar System 3D Scene */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.85 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="flex-1 w-full overflow-hidden rounded-xl"
                        style={{ height: 'clamp(350px, 50vw, 600px)', maxWidth: '700px' }}
                    >
                        <Suspense fallback={
                            <div className="w-full h-full flex items-center justify-center">
                                <div className="w-16 h-16 rounded-full border-2 border-t-transparent animate-spin" style={{ borderColor: 'var(--accent-cyan)', borderTopColor: 'transparent' }} />
                            </div>
                        }>
                            <HeroScene />
                        </Suspense>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default Hero;
