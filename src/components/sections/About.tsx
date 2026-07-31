'use client';
import { motion } from 'framer-motion';

export function About() {
    return (
        <section id="about" className="py-24 relative bg-black/20 border-y border-border/50">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="max-w-4xl mx-auto"
                >
                    <div className="flex flex-col md:flex-row gap-12 items-start">

                        <div className="flex-1 space-y-6 text-muted-foreground leading-relaxed text-lg font-sans">
                            <h2 className="text-3xl font-bold text-foreground mb-6 font-heading tracking-tight">About Background</h2>
                            <p>
                                I build secure, reliable, and user-centric systems. With a strong foundation in computer science and a specialized interest in <strong className="text-foreground font-medium">cybersecurity and cloud infrastructure</strong>, I try to bridge the gap between performance, security, and the developer experience.
                            </p>
                            <p>
                                Whether it's writing robust backend services in Rust or creating resilient cloud architectures using Terraform, my focus is always on engineering pragmatic solutions for complex problems with a "security-first" mindset.
                            </p>
                        </div>

                        <div className="w-full md:w-80 bg-background/50 border border-border/60 rounded-xl p-6 shadow-sm backdrop-blur-sm">
                            <h3 className="font-mono text-sm text-primary mb-4 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                                sys.profile
                            </h3>
                            <ul className="space-y-4 text-sm">
                                <li className="grid grid-cols-3 gap-2">
                                    <span className="text-muted-foreground">Location</span>
                                    <span className="col-span-2 font-medium">Sydney, Australia</span>
                                </li>
                                <li className="grid grid-cols-3 gap-2">
                                    <span className="text-muted-foreground">Education</span>
                                    <span className="col-span-2 font-medium">University of Sydney</span>
                                </li>
                                <li className="grid grid-cols-3 gap-2">
                                    <span className="text-muted-foreground">Degree</span>
                                    <span className="col-span-2 font-medium">B. Advanced Computing</span>
                                </li>
                                <li className="grid grid-cols-3 gap-2">
                                    <span className="text-muted-foreground">Graduation</span>
                                    <span className="col-span-2 font-mono">2028</span>
                                </li>
                            </ul>
                        </div>

                    </div>
                </motion.div>
            </div>
        </section>
    );
}
