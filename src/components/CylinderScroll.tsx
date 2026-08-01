'use client';
import { useEffect, useRef, Children } from 'react';
import { motion, useReducedMotion, useMotionValue, useSpring, useTransform, MotionValue } from 'framer-motion';
import { useSectionNavigation } from '@/lib/section-context';

const WHEEL_MULTIPLIER = 0.008;
const TOUCH_MULTIPLIER = 1.5;
const MAX_ADVANCE = 1.25;

function CylinderPanel({
    children,
    index,
    springProgress,
    activeIndex,
    shouldReduceMotion,
}: {
    children: React.ReactNode;
    index: number;
    springProgress: MotionValue<number>;
    activeIndex: number;
    shouldReduceMotion: boolean | null;
}) {
    // Visibility optimization: hide panels far away
    const isNearby = Math.abs(activeIndex - index) <= 1;
    const isActive = activeIndex === index;

    // Use continuous mapped values for premium physics
    const rotateX = useTransform(springProgress, [index - 1, index, index + 1], [75, 0, -75]);
    const z = useTransform(springProgress, [index - 1, index, index + 1], [-250, 0, -250]);
    const scale = useTransform(springProgress, [index - 1, index, index + 1], [0.94, 1, 0.94]);
    const opacity = useTransform(springProgress, [index - 0.7, index, index + 0.7], [0, 1, 0]);

    if (shouldReduceMotion) {
        return (
            <motion.div
                data-cylinder-panel=""
                className="absolute inset-0 overflow-y-auto"
                animate={{ opacity: isActive ? 1 : 0 }}
                transition={{ duration: 0.15 }}
                style={{
                    pointerEvents: isActive ? 'auto' : 'none',
                    visibility: isNearby ? 'visible' : 'hidden',
                    zIndex: isActive ? 10 : 1,
                }}
            >
                {children}
            </motion.div>
        );
    }

    return (
        <motion.div
            data-cylinder-panel=""
            className="absolute inset-0 overflow-y-auto"
            style={{
                rotateX,
                z,
                scale,
                opacity,
                transformOrigin: '50% 50%',
                backfaceVisibility: 'hidden',
                pointerEvents: isActive ? 'auto' : 'none',
                visibility: isNearby ? 'visible' : 'hidden',
                zIndex: isActive ? 10 : 1,
                willChange: 'transform, opacity',
            }}
        >
            {children}
        </motion.div>
    );
}

export function CylinderScroll({ children }: { children: React.ReactNode }) {
    const { activeIndex, goToSection, sectionIds } = useSectionNavigation();

    const containerRef = useRef<HTMLDivElement>(null);
    const shouldReduceMotion = useReducedMotion();

    const sections = Children.toArray(children);
    const maxIndex = sections.length - 1;

    // Track scroll intentions and prevent external conflict
    const isScrolling = useRef(false);
    const targetRef = useRef(activeIndex);
    const snapTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    // Continuous motion values backed by a critically damped spring
    const rawProgress = useMotionValue(activeIndex);
    const springProgress = useSpring(rawProgress, {
        stiffness: 60,
        damping: 18,
        restDelta: 0.001
    });

    // Sync external navigations (navbar clicks, hash changes) to virtual scroll
    useEffect(() => {
        if (!isScrolling.current) {
            targetRef.current = activeIndex;
            rawProgress.set(activeIndex);
        }
    }, [activeIndex, rawProgress]);

    // Handle generic analog delta inputs (wheel, touch)
    const processDelta = (inc: number) => {
        isScrolling.current = true;

        let newTarget = targetRef.current + inc;

        // Hard bounds
        newTarget = Math.max(0, Math.min(maxIndex, newTarget));

        // Soft momentum bounds: prevents extreme trackpad gliding skipping multiple sections
        newTarget = Math.max(activeIndex - MAX_ADVANCE, Math.min(activeIndex + MAX_ADVANCE, newTarget));

        targetRef.current = newTarget;
        rawProgress.set(newTarget);

        if (snapTimer.current) clearTimeout(snapTimer.current);
        snapTimer.current = setTimeout(() => {
            const nearest = Math.round(targetRef.current);
            const clamped = Math.max(0, Math.min(maxIndex, nearest));

            targetRef.current = clamped;
            rawProgress.set(clamped);
            goToSection(clamped);

            // Release lock shortly after
            setTimeout(() => { isScrolling.current = false; }, 50);
        }, 150);
    };

    // Global constraints
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        document.documentElement.style.overflow = 'hidden';

        const hash = window.location.hash.slice(1);
        if (hash) {
            const i = sectionIds.indexOf(hash);
            if (i >= 0) goToSection(i);
        }

        return () => {
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (!isScrolling.current) {
            const id = sectionIds[activeIndex];
            if (id) window.history.replaceState(null, '', `#${id}`);
        }
    }, [activeIndex, sectionIds]);

    // Wheel Event handling
    useEffect(() => {
        const onWheel = (e: WheelEvent) => {
            // Respect nested scrolling panels
            const panels = containerRef.current?.querySelectorAll<HTMLElement>('[data-cylinder-panel]');
            const panel = panels?.[activeIndex];
            if (panel) {
                const scrollable = panel.scrollHeight > panel.clientHeight + 2;
                if (scrollable) {
                    if (e.deltaY > 0 && Math.ceil(panel.scrollTop + panel.clientHeight) < panel.scrollHeight - 2) return;
                    if (e.deltaY < 0 && panel.scrollTop > 2) return;
                }
            }

            e.preventDefault();

            let delta = e.deltaY;
            if (Math.abs(delta) > 100) delta = Math.sign(delta) * 100;

            processDelta(delta * WHEEL_MULTIPLIER);
        };

        const el = containerRef.current;
        el?.addEventListener('wheel', onWheel, { passive: false });
        // NOTE: we add processDelta and WHEEL_MULTIPLIER implicitly to deps via their stability or refs, 
        // but it's safe to just bind on component mount lifecycle
        return () => el?.removeEventListener('wheel', onWheel);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeIndex, maxIndex]);

    // Touch Support
    useEffect(() => {
        let lastY = 0;
        let isPanelScrollable = false;

        const onTouchStart = (e: TouchEvent) => {
            lastY = e.touches[0].clientY;
            const panels = containerRef.current?.querySelectorAll<HTMLElement>('[data-cylinder-panel]');
            const panel = panels?.[activeIndex];
            if (panel) {
                isPanelScrollable = panel.scrollHeight > panel.clientHeight + 2;
            }
        };

        const onTouchMove = (e: TouchEvent) => {
            if (isPanelScrollable) {
                const panels = containerRef.current?.querySelectorAll<HTMLElement>('[data-cylinder-panel]');
                const panel = panels?.[activeIndex];
                if (panel) {
                    const dy = lastY - e.touches[0].clientY;
                    if (dy > 0 && Math.ceil(panel.scrollTop + panel.clientHeight) < panel.scrollHeight - 2) {
                        lastY = e.touches[0].clientY;
                        return;
                    }
                    if (dy < 0 && panel.scrollTop > 2) {
                        lastY = e.touches[0].clientY;
                        return;
                    }
                }
            }

            e.preventDefault();
            const currentY = e.touches[0].clientY;
            const dy = lastY - currentY;
            lastY = currentY;

            const deltaProgress = (dy / window.innerHeight) * TOUCH_MULTIPLIER;
            processDelta(deltaProgress);
        };

        const el = containerRef.current;
        el?.addEventListener('touchstart', onTouchStart, { passive: true });
        el?.addEventListener('touchmove', onTouchMove, { passive: false });
        return () => {
            el?.removeEventListener('touchstart', onTouchStart);
            el?.removeEventListener('touchmove', onTouchMove);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeIndex, maxIndex]);

    // Keyboard support
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

            let diff = 0;
            switch (e.key) {
                case 'ArrowDown':
                case 'PageDown':
                    diff = 1;
                    break;
                case 'ArrowUp':
                case 'PageUp':
                    diff = -1;
                    break;
                case ' ':
                    diff = e.shiftKey ? -1 : 1;
                    break;
                case 'Home':
                    e.preventDefault();
                    goToSection(0);
                    return;
                case 'End':
                    e.preventDefault();
                    goToSection(maxIndex);
                    return;
            }

            if (diff !== 0) {
                e.preventDefault();
                const newTarget = Math.max(0, Math.min(maxIndex, activeIndex + diff));
                targetRef.current = newTarget;
                rawProgress.set(newTarget);
                goToSection(newTarget);
            }
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeIndex, maxIndex]);

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
                {sections.map((section, i) => (
                    <CylinderPanel
                        key={sectionIds[i] ?? i}
                        index={i}
                        activeIndex={activeIndex}
                        springProgress={springProgress}
                        shouldReduceMotion={shouldReduceMotion}
                    >
                        {section}
                    </CylinderPanel>
                ))}
            </div>
        </div>
    );
}
