'use client';
import { motion } from 'framer-motion';
import { experiences } from '@/data/experience';

export function Experience() {
    return (
        <section id="experience" className="py-32 container mx-auto px-6 max-w-5xl">
            <div className="mb-16">
                <h2 className="text-3xl font-bold tracking-tight mb-4">Experience & Leadership</h2>
                <p className="text-muted-foreground">Professional history, technical volunteering, and academic focus.</p>
            </div>

            <div className="space-y-12 pl-4 border-l border-border/50">
                {experiences.map((exp, i) => (
                    <motion.div
                        key={exp.id}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                        className="relative pl-8"
                    >
                        {/* Timeline Node */}
                        <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_rgba(59,130,246,0.6)]" />

                        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-2">
                            <h3 className="text-xl font-semibold text-foreground">{exp.role}</h3>
                            <span className="font-mono text-sm text-muted-foreground">{exp.duration}</span>
                        </div>

                        <div className="text-primary font-medium mb-4 flex gap-3 items-center">
                            <span>{exp.company}</span>
                            <span className="text-xs border border-primary/20 bg-primary/10 px-2 py-0.5 rounded text-primary">{exp.type}</span>
                        </div>

                        <p className="text-muted-foreground mb-4 leading-relaxed max-w-3xl">
                            {exp.description}
                        </p>

                        <div className="flex flex-wrap gap-2 mt-4">
                            {exp.technologies.map(tech => (
                                <span key={tech} className="font-mono text-xs bg-secondary text-secondary-foreground px-2.5 py-1 rounded-md">
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
