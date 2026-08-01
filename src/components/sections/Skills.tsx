'use client';
import { motion } from 'framer-motion';
import { skillsData } from '@/data/skills';

export function Skills() {
    return (
        <section id="skills" className="min-h-screen flex flex-col justify-center w-full py-24 relative border-t border-border/50 bg-[#07070d]">
            <div className="container mx-auto px-6 max-w-5xl">
                <div className="mb-16 text-center">
                    <h2 className="text-3xl font-bold tracking-tight mb-4">Technical Proficiencies</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Practical skills acquired through academic study, personal engineering projects, and security research.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {skillsData.map((category, i) => (
                        <motion.div
                            key={category.category}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: i * 0.1 }}
                            className="bg-card border border-border/50 rounded-xl p-6"
                        >
                            <h3 className="text-xl font-semibold mb-6 flex items-center gap-3">
                                <span className="w-1 h-5 bg-primary rounded-full"></span>
                                {category.category}
                            </h3>

                            <ul className="space-y-4">
                                {category.items.map((item, idx) => {
                                    if (typeof item === 'string') {
                                        return (
                                            <li key={idx} className="flex justify-start items-center">
                                                <span className="font-mono text-sm text-foreground">{item}</span>
                                            </li>
                                        );
                                    }
                                    return (
                                        <li key={item.name} className="flex flex-col gap-1">
                                            <span className="font-mono text-sm text-foreground font-semibold">{item.name}</span>
                                            {item.description && (
                                                <span className="text-sm text-muted-foreground">{item.description}</span>
                                            )}
                                        </li>
                                    );
                                })}
                            </ul>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
