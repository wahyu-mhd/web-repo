'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSectionNavigation } from '@/lib/section-context';
import {
    Home,
    User,
    Briefcase,
    Code2,
    Cpu,
    Mail,
} from 'lucide-react';

const SECTIONS = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'about', label: 'About', icon: User },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'projects', label: 'Projects', icon: Code2 },
    { id: 'skills', label: 'Skills', icon: Cpu },
    { id: 'contact', label: 'Contact', icon: Mail },
];

export function SectionNav() {
    const { activeIndex, goToSection } = useSectionNavigation();
    const [hoveredSection, setHoveredSection] = useState<string | null>(null);

    return (
        <nav
            className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-end gap-3"
            aria-label="Section navigation"
        >
            {SECTIONS.map(({ id, label, icon: Icon }, i) => {
                const isActive = activeIndex === i;
                const isHovered = hoveredSection === id;

                return (
                    <button
                        key={id}
                        onClick={() => goToSection(i)}
                        onMouseEnter={() => setHoveredSection(id)}
                        onMouseLeave={() => setHoveredSection(null)}
                        className="group flex items-center gap-3 relative"
                        aria-label={`Go to ${label}`}
                        aria-current={isActive ? 'true' : undefined}
                    >
                        <AnimatePresence>
                            {isHovered && (
                                <motion.span
                                    initial={{ opacity: 0, x: 8 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 8 }}
                                    transition={{ duration: 0.15 }}
                                    className="text-xs font-medium text-foreground bg-card border border-border/60 px-3 py-1.5 rounded-md shadow-lg whitespace-nowrap pointer-events-none"
                                >
                                    {label}
                                </motion.span>
                            )}
                        </AnimatePresence>

                        <motion.div
                            className={`relative flex items-center justify-center rounded-full transition-colors duration-200 ${isActive
                                    ? 'w-10 h-10 bg-primary/15 border border-primary/40'
                                    : 'w-8 h-8 bg-card border border-border/40 hover:border-primary/30 hover:bg-primary/5'
                                }`}
                            whileHover={{ scale: 1.15 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Icon
                                className={`transition-colors duration-200 ${isActive
                                        ? 'w-4 h-4 text-primary'
                                        : 'w-3.5 h-3.5 text-muted-foreground group-hover:text-primary'
                                    }`}
                            />
                            {isActive && (
                                <motion.div
                                    layoutId="section-nav-glow"
                                    className="absolute inset-0 rounded-full bg-primary/10 shadow-[0_0_12px_rgba(59,130,246,0.3)]"
                                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                                />
                            )}
                        </motion.div>
                    </button>
                );
            })}

            <div className="absolute right-[15px] top-4 bottom-4 w-px bg-border/30 -z-10" />
        </nav>
    );
}
