'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Command } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSectionNavigation } from '@/lib/section-context';

const NAV_LINKS = [
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Contact', href: '#contact' },
];

export function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { goToSection, sectionIds } = useSectionNavigation();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleNavClick = (e: React.MouseEvent, href: string) => {
        if (href.startsWith('#')) {
            e.preventDefault();
            const id = href.slice(1);
            const index = sectionIds.indexOf(id);
            if (index >= 0) goToSection(index);
            setMobileMenuOpen(false);
        }
    };

    return (
        <header
            className={`fixed top-0 w-full z-50 transition-all duration-300 border-b ${scrolled ? 'bg-background/80 backdrop-blur-md border-border shadow-sm' : 'bg-transparent border-transparent'
                }`}
        >
            <div className="container mx-auto px-6 h-16 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 text-primary font-bold text-xl group z-50">
                    <Command className="w-6 h-6 text-blue-500 group-hover:rotate-12 transition-transform" />
                    <span className="tracking-tight">PORTFOLIO</span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex gap-8 items-center">
                    {NAV_LINKS.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            onClick={(e) => handleNavClick(e, link.href)}
                            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors hover:underline underline-offset-4"
                        >
                            {link.name}
                        </a>
                    ))}
                    <Link href="/resume.pdf" target="_blank" className="text-sm font-semibold text-primary bg-primary/10 hover:bg-primary/20 px-4 py-2 rounded-md transition-colors border border-primary/20">
                        Resume
                    </Link>
                </nav>

                {/* Mobile Nav Button */}
                <button className="md:hidden z-50 p-2 text-foreground" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                    {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {mobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="absolute top-0 left-0 w-full h-screen bg-background/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 md:hidden"
                        >
                            {NAV_LINKS.map((link, i) => (
                                <motion.div
                                    key={link.name}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 * i }}
                                >
                                    <a
                                        href={link.href}
                                        onClick={(e) => handleNavClick(e, link.href)}
                                        className="text-2xl font-bold text-foreground"
                                    >
                                        {link.name}
                                    </a>
                                </motion.div>
                            ))}
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
                                <Link onClick={() => setMobileMenuOpen(false)} href="/resume.pdf" target="_blank" className="text-xl font-bold text-blue-500 border border-blue-500/50 px-6 py-2 rounded-full">
                                    Resume
                                </Link>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </header>
    );
}
