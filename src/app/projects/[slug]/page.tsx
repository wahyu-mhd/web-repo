import { notFound } from 'next/navigation';
import { projects } from '@/data/projects';
import Link from 'next/link';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { FaGithub } from 'react-icons/fa6';

// Generates static routes at build time for performance
// export async function generateStaticParams() {
//   return projects.map((post) => ({
//     slug: post.slug,
//   }));
// }

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
    const resolvedParams = await params;
    const project = projects.find((p) => p.slug === resolvedParams.slug);

    if (!project) notFound();

    return (
        <div className="container mx-auto px-6 py-24 max-w-4xl relative">
            <Link href="/#projects" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-12 transition-colors group">
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                Back to Archive
            </Link>

            <header className="mb-16">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
                    <div>
                        <span className="font-mono text-primary mb-3 block">{project.category}</span>
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">{project.title}</h1>
                    </div>

                    <div className="flex gap-4 pb-1">
                        {project.links.github && (
                            <a href={project.links.github} target="_blank" className="inline-flex items-center gap-2 px-4 py-2 border border-border bg-card hover:bg-secondary rounded-md text-sm transition-colors">
                                <FaGithub className="w-4 h-4" /> Code
                            </a>
                        )}
                        {project.links.demo && (
                            <a href={project.links.demo} target="_blank" className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary border border-primary/30 hover:bg-primary hover:text-primary-foreground rounded-md text-sm transition-colors">
                                <ExternalLink className="w-4 h-4" /> Live Demo
                            </a>
                        )}
                    </div>
                </div>

                <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl">
                    {project.motivation}
                </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                <div className="md:col-span-2 space-y-12">

                    <section>
                        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-foreground">
                            <span className="text-primary/50 text-xl">#</span> The Problem
                        </h2>
                        <p className="text-muted-foreground leading-relaxed">
                            {project.problem}
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-foreground">
                            <span className="text-primary/50 text-xl">#</span> Architecture & Challenges
                        </h2>
                        <ul className="space-y-4">
                            {project.engineeringChallenges.map((challenge, i) => (
                                <li key={i} className="flex gap-4 items-start p-4 bg-card border border-border/50 rounded-lg">
                                    <span className="w-6 h-6 rounded bg-primary/10 text-primary flex items-center justify-center text-xs font-mono shrink-0 mt-0.5">0{i + 1}</span>
                                    <p className="text-sm text-foreground/80 leading-relaxed">{challenge}</p>
                                </li>
                            ))}
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-foreground">
                            <span className="text-destructive/50 text-xl">#</span> Security Implications
                        </h2>
                        <div className="bg-destructive/5 border border-destructive/20 p-6 rounded-xl">
                            <ul className="list-disc pl-5 space-y-2 text-muted-foreground text-sm">
                                {project.securityConsiderations.map(sec => <li key={sec}>{sec}</li>)}
                            </ul>
                        </div>
                    </section>

                </div>

                <div className="space-y-8">
                    <div className="bg-card border border-border/50 p-6 rounded-xl">
                        <h3 className="font-semibold mb-4 text-sm font-mono border-b border-border/50 pb-2">Tech Stack</h3>
                        <div className="flex flex-wrap gap-2">
                            {project.technologies.map(tech => (
                                <span key={tech} className="bg-secondary text-secondary-foreground text-xs px-2.5 py-1 rounded">
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="bg-card border border-border/50 p-6 rounded-xl">
                        <h3 className="font-semibold mb-4 text-sm font-mono border-b border-border/50 pb-2">Outcomes</h3>
                        <ul className="space-y-3">
                            {project.outcomes.map(out => (
                                <li key={out} className="text-sm text-muted-foreground flex gap-2 items-start">
                                    <span className="text-primary mt-1">▹</span>
                                    {out}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
