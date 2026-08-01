'use client';
import { motion } from 'framer-motion';

export function About() {
    return (
        <section id="about" className="min-h-screen flex flex-col justify-center w-full py-24 relative bg-black/20 border-y border-border/50">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="max-w-6xl mx-auto"
                >
                    <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr_300px] gap-8 xl:gap-12 items-start">

                        {/* LEFT COLUMN: Picture */}
                        <div className="w-full">
                            <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden border border-border/50 group shadow-sm">
                                <img
                                    src="/profile.webp"
                                    alt="Wahyu Mahendra"
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    // onError={(e) => {
                                    //     // Fallback if no image is found
                                    //     e.currentTarget.src = "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=800";
                                    // }}
                                />
                                <div className="absolute inset-0 border-[2px] border-primary/10 rounded-2xl z-10 pointer-events-none mix-blend-overlay" />
                                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent z-0 pointer-events-none" />
                            </div>
                        </div>

                        {/* MIDDLE COLUMN: Text */}
                        <div className="w-full space-y-6 text-muted-foreground leading-relaxed text-lg font-sans">
                            <h2 className="text-3xl font-bold text-foreground mb-6 font-heading tracking-tight">About Background</h2>
                            <p>
                                I build secure, reliable, and user-centric systems. With a strong foundation in computer science and a specialized interest in <strong className="text-foreground font-medium">cybersecurity and cloud infrastructure</strong>, I try to bridge the gap between performance, security, and the developer experience.
                            </p>
                            <p>
                                Whether it's writing robust backend services in Rust or creating resilient cloud architectures using Terraform, my focus is always on engineering pragmatic solutions for complex problems with a "security-first" mindset.
                            </p>
                        </div>

                        {/* RIGHT COLUMN: Sys Profile & Credentials */}
                        <div className="w-full space-y-6 text-sm">
                            <div className="bg-background/50 border border-border/60 rounded-xl p-6 shadow-sm backdrop-blur-sm">
                                <h3 className="font-mono text-sm text-primary mb-4 flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                                    sys.profile
                                </h3>
                                <ul className="space-y-4">
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
                                        <span className="text-muted-foreground">Major</span>
                                        <span className="col-span-2 font-mono text-xs mt-0.5">Computer Science & Cybersecurity</span>
                                    </li>
                                    <li className="grid grid-cols-3 gap-2">
                                        <span className="text-muted-foreground">Achievement</span>
                                        <span className="col-span-2 font-medium text-emerald-400">WAM: Distinction</span>
                                    </li>
                                </ul>
                            </div>

                            <div className="bg-background/50 border border-border/60 rounded-xl p-6 shadow-sm backdrop-blur-sm">
                                <h3 className="font-mono text-sm text-primary mb-4 flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-primary" />
                                    Credentials
                                </h3>
                                <ul className="space-y-3 text-xs border-t border-border/50 pt-4">
                                    <li className="flex flex-col gap-1 border-b border-border/20 pb-2">
                                        <strong className="text-foreground">Kali Linux for Ethical Hackers</strong>
                                        <span className="text-muted-foreground">Udemy — Mar 2025</span>
                                    </li>
                                    <li className="flex flex-col gap-1 border-b border-border/20 pb-2">
                                        <strong className="text-foreground">ACA System Operator</strong>
                                        <span className="text-muted-foreground">Alibaba Cloud — Mar 2025</span>
                                    </li>
                                    <li className="flex flex-col gap-1 border-b border-border/20 pb-2">
                                        <strong className="text-foreground">Automate and Scale (IaC/DevOps)</strong>
                                        <span className="text-muted-foreground">Alibaba Cloud — Mar 2025</span>
                                    </li>
                                    <li className="flex flex-col gap-1 border-b border-border/20 pb-2">
                                        <strong className="text-foreground">Disaster-Proof Your Business</strong>
                                        <span className="text-muted-foreground">Alibaba Cloud — Mar 2025</span>
                                    </li>
                                    <li className="flex flex-col gap-1">
                                        <strong className="text-foreground">Intro to Infra as Code (IaC)</strong>
                                        <span className="text-muted-foreground">Alibaba Cloud — Mar 2025</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                    </div>
                </motion.div>
            </div>
        </section>
    );
}
