'use client';
import { motion } from 'framer-motion';
import { Terminal, ArrowRight, Download } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa6';
import { useEffect, useState } from 'react';

// A lightweight pure CSS / JS particle mesh for the cybersecurity feel without heavy canvas
const NetworkMesh = () => {
    const [nodes, setNodes] = useState<{ x: number, y: number, delay: number }[]>([]);

    useEffect(() => {
        // Generate static points to prevent hydration mismatch
        const generated = Array.from({ length: 20 }).map(() => ({
            x: Math.random() * 100,
            y: Math.random() * 100,
            delay: Math.random() * 5
        }));
        setNodes(generated);
    }, []);

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20 dark:opacity-30">
            {nodes.map((node, i) => (
                <motion.div
                    key={i}
                    className="absolute w-1.5 h-1.5 bg-blue-500 rounded-full"
                    style={{ left: `${node.x}%`, top: `${node.y}%` }}
                    animate={{
                        y: [0, -30, 0],
                        opacity: [0.2, 0.8, 0.2],
                        scale: [1, 1.5, 1]
                    }}
                    transition={{
                        duration: 8 + (node.delay * 2),
                        repeat: Infinity,
                        ease: "linear",
                        delay: node.delay
                    }}
                />
            ))}
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10" />
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_40%,#000_10%,transparent_100%)]" />
        </div>
    );
};

import { useSectionNavigation } from '@/lib/section-context';

export function Hero() {
    const { goToSection } = useSectionNavigation();

    return (
        <section id="home" className="relative min-h-[90vh] flex items-center justify-center pt-24 overflow-hidden">
            <NetworkMesh />

            <div className="container relative z-20 px-6 mx-auto flex flex-col items-start max-w-5xl">
                {/* <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex items-center gap-2 px-3 py-1 mb-6 text-sm border rounded-full border-blue-500/30 bg-blue-500/10 text-blue-400 font-mono"
                >
                    <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                    Status: Available for Fall 2025 Internships
                </motion.div> */}

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-4xl md:text-6xl font-bold tracking-tight text-foreground max-w-3xl leading-[1.1] mb-6"
                >
                    Hi, I'm <span className="text-primary">I Putu Wahyu Mahendra</span>. Building <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-500">Secure & Reliable Systems</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 leading-relaxed font-sans"
                >
                    I'm currently at the <strong>University of Sydney</strong> focusing on practical software engineering, cloud infrastructure, and cybersecurity. I build tools that solve robust challenges using modern web stacks and systems languages.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="flex flex-col sm:flex-row gap-4"
                >
                    <button onClick={() => goToSection(3)} className="inline-flex h-12 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring gap-2 group">
                        View Projects
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>

                    <a href="/resume.pdf" target="_blank" className="inline-flex h-12 items-center justify-center rounded-md border border-border bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring gap-2">
                        <Download className="w-4 h-4" />
                        Resume
                    </a>

                    <div className="flex gap-2 ml-0 sm:ml-4">
                        <a href="https://github.com/wahyu-mhd" target="_blank" className="inline-flex h-12 w-12 items-center justify-center rounded-md border border-border bg-background shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground">
                            <FaGithub className="w-5 h-5" />
                        </a>
                        <a href="https://www.linkedin.com/in/i-putu-wahyu-mahendra-591242286" target="_blank" className="inline-flex h-12 w-12 items-center justify-center rounded-md border border-border bg-background shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground">
                            <FaLinkedin className="w-5 h-5" />
                        </a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
