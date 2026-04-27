import React, { useEffect, useRef } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, useSpring } from 'framer-motion';

const CustomCursor = () => {
    const cursorRef = useRef(null);
    const dotRef = useRef(null);
    const isPointer = useRef(false);

    const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
    const x = useSpring(0, springConfig);
    const y = useSpring(0, springConfig);

    useEffect(() => {
        // Only enable on pointer devices
        const hasPointer = window.matchMedia('(pointer: fine)').matches;
        if (!hasPointer) return;

        const handleMouseMove = (e) => {
            x.set(e.clientX);
            y.set(e.clientY);

            if (dotRef.current) {
                dotRef.current.style.left = `${e.clientX}px`;
                dotRef.current.style.top = `${e.clientY}px`;
            }
        };

        const handleMouseOver = (e) => {
            const target = e.target;
            if (target.closest('a, button, [role="button"], input, textarea, select, label[for]')) {
                isPointer.current = true;
                if (cursorRef.current) {
                    cursorRef.current.classList.add('cursor-hover');
                }
            }
        };

        const handleMouseOut = (e) => {
            const target = e.target;
            if (target.closest('a, button, [role="button"], input, textarea, select, label[for]')) {
                isPointer.current = false;
                if (cursorRef.current) {
                    cursorRef.current.classList.remove('cursor-hover');
                }
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseover', handleMouseOver);
        document.addEventListener('mouseout', handleMouseOut);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseover', handleMouseOver);
            document.removeEventListener('mouseout', handleMouseOut);
        };
    }, [x, y]);

    // Don't render on touch devices
    if (typeof window !== 'undefined' && !window.matchMedia('(pointer: fine)').matches) {
        return null;
    }

    return (
        <>
            {/* Outer ring — follows with spring */}
            <motion.div
                ref={cursorRef}
                className="fixed top-0 left-0 pointer-events-none z-[9999] hidden sm:block"
                style={{
                    x,
                    y,
                    translateX: '-50%',
                    translateY: '-50%',
                }}
            >
                <div
                    className="w-10 h-10 rounded-full border border-[var(--accent-cyan)] opacity-50 transition-all duration-200 ease-out
                    [.cursor-hover_&]:w-16 [.cursor-hover_&]:h-16 [.cursor-hover_&]:border-[var(--accent-violet)] [.cursor-hover_&]:opacity-80"
                    style={{ mixBlendMode: 'difference' }}
                />
            </motion.div>

            {/* Inner dot — follows precisely */}
            <div
                ref={dotRef}
                className="fixed top-0 left-0 pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 hidden sm:block"
            >
                <div
                    className="w-2 h-2 rounded-full"
                    style={{ background: 'var(--accent-cyan)', boxShadow: '0 0 10px var(--accent-cyan)' }}
                />
            </div>
        </>
    );
};

export default CustomCursor;
