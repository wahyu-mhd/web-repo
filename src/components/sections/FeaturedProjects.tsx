'use client';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';
import { projects, Project } from '@/data/projects';
import { Globe, TerminalSquare, ShieldAlert } from 'lucide-react';
import { FaGithub } from 'react-icons/fa6';

function ProjectCard({ project, index }: { project: Project, index: number }) {
    const [activeTab, setActiveTab] = useState<'overview' | 'tech' | 'security'>('overview');

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-card border border-border/60 rounded-2xl p-6 md:p-8 shadow-sm flex flex-col group overflow-hidden relative"
        >
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-[100px] -z-10 group-hover:bg-primary/10 transition-colors" />

            <div className="flex justify-between items-start mb-6">
                <div>
                    <span className="font-mono text-xs text-primary mb-2 block">{project.category}</span>
                    <h3 className="text-2xl font-bold tracking-tight">{project.title}</h3>
                </div>
                <div className="flex gap-2">
                    {project.links?.github && (
                        <a href={project.links.github} target="_blank" className="p-2 border border-border rounded-md hover:bg-secondary transition-colors" aria-label="GitHub">
                            <FaGithub className="w-5 h-5" />
                        </a>
                    )}
                    {project.links?.demo && (
                        <a href={project.links.demo} target="_blank" className="p-2 border border-border rounded-md hover:bg-secondary transition-colors bg-primary/10 text-primary border-primary/30" aria-label="Live Demo">
                            <Globe className="w-5 h-5" />
                        </a>
                    )}
                </div>
            </div>

            <div className="flex-grow space-y-4">
                <p className="text-muted-foreground text-sm leading-relaxed whitespace-pre-line">
                    {project.shortDescription || project.description[0]}
                </p>
            </div>

            <div className="mt-8 pt-6 border-t border-border/50 transition-colors">
                <Link href={`/projects/${project.slug}`} className="inline-flex items-center text-primary font-medium hover:underline text-sm group-hover:text-cyan-400">
                    Read Detailed Breakdown <span className="ml-1 transition-transform group-hover:translate-x-1">→</span>
                </Link>
            </div>
        </motion.div>
    );
}

export function FeaturedProjects() {
    const featured = projects.filter(p => p.featured);

    return (
        <section id="projects" className="py-24 container mx-auto px-6 max-w-6xl">
            <div className="mb-16">
                <h2 className="text-3xl font-bold tracking-tight mb-4 text-foreground">Featured Engineering Work</h2>
                <p className="text-muted-foreground max-w-2xl">
                    Selected projects demonstrating backend architecture, applied cryptography, and systems programming.
                </p>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                {featured.map((project, i) => (
                    <ProjectCard key={project.slug} project={project} index={i} />
                ))}
            </div>
        </section>
    );
}
