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
                        {project.links?.github && (
                            <a href={project.links.github} target="_blank" className="inline-flex items-center gap-2 px-4 py-2 border border-border bg-card hover:bg-secondary rounded-md text-sm transition-colors">
                                <FaGithub className="w-4 h-4" /> Code
                            </a>
                        )}
                        {project.links?.demo && (
                            <a href={project.links.demo} target="_blank" className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary border border-primary/30 hover:bg-primary hover:text-primary-foreground rounded-md text-sm transition-colors">
                                <ExternalLink className="w-4 h-4" /> Live Demo
                            </a>
                        )}
                    </div>
                </div>

                <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl">
                    {/* Minimal intro or first desc line as motivation if we wanted, but we can just use the description block directly. */}
                </p>
                {project.images && project.images.length > 0 && (
                    <div className="flex flex-col gap-6 w-full max-w-4xl mt-8 mb-8">
                        {project.images.map((imgSrc, idx) => (
                            <div key={idx} className="overflow-hidden rounded-xl border border-border/50 shadow-md">
                                <img src={imgSrc} alt={`${project.title} screenshot ${idx + 1}`} className="w-full h-auto object-cover" />
                            </div>
                        ))}
                    </div>
                )}
            </header>

            <div className="max-w-3xl space-y-8 text-foreground/90 leading-relaxed text-lg">
                {project.description.map((desc, i) => (
                    <p key={i}>
                        {desc}
                    </p>
                ))}

                {project.subBullets && project.subBullets.length > 0 && (
                    <ul className="list-disc pl-6 space-y-2 mt-4 marker:text-primary/70">
                        {project.subBullets.map((bullet, i) => (
                            <li key={i}>{bullet}</li>
                        ))}
                    </ul>
                )}

                {project.descriptionContinuation && (
                    <p className="mt-6">
                        {project.descriptionContinuation}
                    </p>
                )}
            </div>
        </div>
    );
}
