import React, { useEffect, useRef } from 'react';
import Lenis from 'lenis';

const SmoothScroll = ({ children }) => {
    const lenisRef = useRef(null);

    useEffect(() => {
        // Disable Lenis on mobile to prevent layout bugs with address bar and native momentum scrolling
        if (window.innerWidth < 768) {
            return;
        }

        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            smoothWheel: true,
        });

        lenisRef.current = lenis;

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        // Handle anchor clicks for smooth scrolling
        const handleAnchorClick = (e) => {
            const target = e.target.closest('a[href^="#"]');
            if (target) {
                const id = target.getAttribute('href');
                if (id && id !== '#') {
                    const el = document.querySelector(id);
                    if (el) {
                        e.preventDefault();
                        lenis.scrollTo(el, { offset: -80 });
                    }
                }
            }
        };

        document.addEventListener('click', handleAnchorClick);

        return () => {
            document.removeEventListener('click', handleAnchorClick);
            lenis.destroy();
        };
    }, []);

    return <>{children}</>;
};

export default SmoothScroll;
