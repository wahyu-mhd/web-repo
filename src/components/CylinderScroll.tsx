'use client';
import { useEffect, useRef, Children } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useSectionNavigation } from '@/lib/section-context';

const TRANSITION_MS = 700;
const WHEEL_THRESHOLD = 50;
const WHEEL_RESET_MS = 150;

export function CylinderScroll({ children }: { children: React.ReactNode }) {
    const { activeIndex, goToSection, goNext, goPrev, sectionIds } =
        useSectionNavigation();

    const containerRef = useRef<HTMLDivElement>(null);
    const shouldReduceMotion = useReducedMotion();
    const lockRef = useRef(false);
    const accRef = useRef(0);
    const accTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const idxRef = useRef(activeIndex);

    const sections = Children.toArray(children);

    // Keep ref in sync with state
    useEffect(() => {
        idxRef.current = activeIndex;
    }, [activeIndex]);

    // Lock body scroll
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        document.documentElement.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
        };
    }, []);

    // Sync URL hash
    useEffect(() => {
        const id = sectionIds[activeIndex];
        if (id) window.history.replaceState(null, '', `#${id}`);
    }, [activeIndex, sectionIds]);

    // Read hash on mount
    useEffect(() => {
        const hash = window.location.hash.slice(1);
        if (hash) {
            const i = sectionIds.indexOf(hash);
            if (i >= 0) goToSection(i);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // --- Helpers ---
    const doTransition = (dir: 'next' | 'prev') => {
        if (lockRef.current) return;
        const cur = idxRef.current;
        if (dir === 'next' && cur >= sectionIds.length - 1) return;
        if (dir === 'prev' && cur <= 0) return;

        lockRef.current = true;
        accRef.current = 0;
        dir === 'next' ? goNext() : goPrev();

        setTimeout(() => {
            lockRef.current = false;
        }, TRANSITION_MS + 100);
    };

    // --- Wheel ---
    useEffect(() => {
        const onWheel = (e: WheelEvent) => {
            if (lockRef.current) {
                e.preventDefault();
                return;
            }

            // Allow internal scroll if section content overflows
            const panels = containerRef.current?.querySelectorAll<HTMLElement>(
                '[data-cylinder-panel]',
            );
            const panel = panels?.[idxRef.current];
            if (panel) {
                const { scrollTop, scrollHeight, clientHeight } = panel;
                const scrollable = scrollHeight > clientHeight + 2;
                if (scrollable) {
                    if (e.deltaY > 0 && scrollTop + clientHeight < scrollHeight - 2) return;
                    if (e.deltaY < 0 && scrollTop > 1) return;
                }
            }

            e.preventDefault();

            accRef.current += e.deltaY;
            if (accTimerRef.current) clearTimeout(accTimerRef.current);
            accTimerRef.current = setTimeout(() => {
                accRef.current = 0;
            }, WHEEL_RESET_MS);

            if (Math.abs(accRef.current) < WHEEL_THRESHOLD) return;
            doTransition(accRef.current > 0 ? 'next' : 'prev');
        };

        const el = containerRef.current;
        el?.addEventListener('wheel', onWheel, { passive: false });
        return () => el?.removeEventListener('wheel', onWheel);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // --- Keyboard ---
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            const t = e.target;
            if (
                t instanceof HTMLInputElement ||
                t instanceof HTMLTextAreaElement ||
                t instanceof HTMLSelectElement ||
                (t instanceof HTMLElement && t.isContentEditable)
            )
                return;

            let dir: 'next' | 'prev' | null = null;
            switch (e.key) {
                case 'ArrowDown':
                case 'PageDown':
                    dir = 'next';
                    break;
                case 'ArrowUp':
                case 'PageUp':
                    dir = 'prev';
                    break;
                case ' ':
                    dir = e.shiftKey ? 'prev' : 'next';
                    break;
                case 'Home':
                    e.preventDefault();
                    goToSection(0);
                    return;
                case 'End':
                    e.preventDefault();
                    goToSection(sectionIds.length - 1);
                    return;
            }
            if (dir) {
                e.preventDefault();
                doTransition(dir);
            }
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // --- Touch ---
    useEffect(() => {
        let startY = 0;
        let startT = 0;

        const onStart = (e: TouchEvent) => {
            startY = e.touches[0].clientY;
            startT = Date.now();
        };
        const onEnd = (e: TouchEvent) => {
            const dy = startY - e.changedTouches[0].clientY;
            if (Math.abs(dy) < 50 || Date.now() - startT > 800) return;
            doTransition(dy > 0 ? 'next' : 'prev');
        };

        const el = containerRef.current;
        el?.addEventListener('touchstart', onStart, { passive: true });
        el?.addEventListener('touchend', onEnd, { passive: true });
        return () => {
            el?.removeEventListener('touchstart', onStart);
            el?.removeEventListener('touchend', onEnd);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // --- Hashchange (external navigation, e.g. Hero #projects link) ---
    useEffect(() => {
        const onHash = () => {
            const hash = window.location.hash.slice(1);
            const i = sectionIds.indexOf(hash);
            if (i >= 0 && i !== idxRef.current) goToSection(i);
        };
        window.addEventListener('hashchange', onHash);
        return () => window.removeEventListener('hashchange', onHash);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // --- Render ---
    return (
        <div
            ref={containerRef}
            className="fixed inset-0"
            style={{
                perspective: '1200px',
                perspectiveOrigin: '50% 50%',
            }}
        >
            <div className="relative w-full h-full" style={{ transformStyle: 'preserve-3d' }}>
                {sections.map((section, i) => {
                    const offset = i - activeIndex;
                    const nearby = Math.abs(offset) <= 1;

                    const anim = shouldReduceMotion
                        ? { opacity: offset === 0 ? 1 : 0 }
                        : {
                            rotateX: offset === 0 ? 0 : offset > 0 ? 75 : -75,
                            z: offset === 0 ? 0 : -400,
                            opacity: offset === 0 ? 1 : 0,
                            scale: offset === 0 ? 1 : 0.85,
                        };

                    const trans = shouldReduceMotion
                        ? { duration: 0.15 }
                        : { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const };

                    return (
                        <motion.div
                            key={sectionIds[i] ?? i}
                            data-cylinder-panel=""
                            className="absolute inset-0 overflow-y-auto"
                            animate={anim}
                            transition={trans}
                            style={{
                                transformOrigin: '50% 50%',
                                backfaceVisibility: 'hidden',
                                pointerEvents: offset === 0 ? 'auto' : 'none',
                                visibility: nearby ? 'visible' : 'hidden',
                                zIndex: offset === 0 ? 10 : 1,
                                willChange: 'transform, opacity',
                            }}
                        >
                            {section}
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
}
