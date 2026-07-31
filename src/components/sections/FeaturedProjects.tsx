'use client';
import { motion, AnimatePresence } from 'framer-motion';
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
                    {project.links.github && (
                        <a href={project.links.github} target="_blank" className="p-2 border border-border rounded-md hover:bg-secondary transition-colors" aria-label="GitHub">
                            <FaGithub className="w-5 h-5" />
                        </a>
                    )}
                    {project.links.demo && (
                        <a href={project.links.demo} target="_blank" className="p-2 border border-border rounded-md hover:bg-secondary transition-colors bg-primary/10 text-primary border-primary/30" aria-label="Live Demo">
                            <Globe className="w-5 h-5" />
                        </a>
                    )}
                </div>
            </div>

            <p className="text-muted-foreground text-lg mb-8 max-w-3xl">
                {project.summary}
            </p>

            {/* Custom Minimal Tabs */}
            <div className="flex gap-2 mb-6 border-b border-border/50 pb-2 overflow-x-auto no-scrollbar">
                <button onClick={() => setActiveTab('overview')} className={`px-4 py-2 text-sm font-medium rounded-md transition-colors whitespace-nowrap ${activeTab === 'overview' ? 'bg-secondary text-foreground' : 'text-muted-foreground hover:bg-secondary/50'}`}>Overview</button>
                <button onClick={() => setActiveTab('tech')} className={`px-4 py-2 text-sm font-medium rounded-md transition-colors whitespace-nowrap flex gap-2 items-center ${activeTab === 'tech' ? 'bg-secondary text-foreground' : 'text-muted-foreground hover:bg-secondary/50'}`}><TerminalSquare className="w-4 h-4" /> Architecture & Tech</button>
                <button onClick={() => setActiveTab('security')} className={`px-4 py-2 text-sm font-medium rounded-md transition-colors whitespace-nowrap flex gap-2 items-center ${activeTab === 'security' ? 'bg-destructive/10 text-destructive' : 'text-muted-foreground hover:bg-secondary/50'}`}><ShieldAlert className="w-4 h-4" /> Security</button>
            </div>

            <div className="min-h-[180px] flex-grow">
                <AnimatePresence mode="wait">
                    {activeTab === 'overview' && (
                        <motion.div key="overview" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                            <div className="space-y-4">
                                <div>
                                    <strong className="text-sm font-mono text-foreground mb-1 block">Problem:</strong>
                                    <p className="text-muted-foreground text-sm leading-relaxed">{project.problem}</p>
                                </div>
                                <div>
                                    <strong className="text-sm font-mono text-foreground mb-1 block">Key Features:</strong>
                                    <ul className="list-disc pl-5 text-muted-foreground text-sm space-y-1">
                                        {project.features.map(f => <li key={f}>{f}</li>)}
                                    </ul>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {activeTab === 'tech' && (
                        <motion.div key="tech" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                            <div className="space-y-6">
                                <div>
                                    <strong className="text-sm font-mono text-foreground mb-2 block">Technology Stack:</strong>
                                    <div className="flex flex-wrap gap-2">
                                        {project.technologies.map(t => <span key={t} className="font-mono text-xs bg-secondary/80 px-2 py-1 rounded">{t}</span>)}
                                    </div>
                                </div>
                                <div>
                                    <strong className="text-sm font-mono text-foreground mb-1 block">Engineering Challenges:</strong>
                                    <ul className="list-square pl-5 text-muted-foreground text-sm space-y-2 relative border-l-2 border-primary/20 ml-2">
                                        {project.engineeringChallenges.map((c, i) => (
                                            <li key={i} className="pl-4 relative before:absolute before:left-[-1.5rem] before:top-2 before:w-3 before:h-px before:bg-primary/20">{c}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {activeTab === 'security' && (
                        <motion.div key="security" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                            <div className="p-4 border border-destructive/20 bg-destructive/5 rounded-lg space-y-3">
                                <strong className="text-sm font-mono text-destructive mb-1 block">Security Considerations & Threat Models:</strong>
                                <ul className="list-disc pl-5 text-muted-foreground text-sm space-y-2">
                                    {project.securityConsiderations.map(s => <li key={s}>{s}</li>)}
                                </ul>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
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
