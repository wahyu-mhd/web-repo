'use client';
import { useState } from 'react';
import { Mail, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

export function Contact() {
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus('loading');

        // Simulate server action latency for demonstration
        await new Promise(resolve => setTimeout(resolve, 1500));
        setStatus('success');
    };

    return (
        <section id="contact" className="min-h-screen flex flex-col justify-center w-full py-24 container mx-auto px-6 max-w-4xl relative">

            <div className="text-center mb-16">
                <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                    <h2 className="text-3xl font-bold tracking-tight mb-4">Initialise Handshake</h2>
                    <p className="text-muted-foreground">My inbox is open for internships, grad roles, networking, or tech questions.</p>
                </motion.div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="bg-card border border-border/50 rounded-2xl p-8 shadow-sm flex flex-col md:flex-row gap-12"
            >

                <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-4 text-foreground flex items-center gap-2">
                        <Mail className="w-5 h-5 text-primary" />
                        Direct Contact
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-8">
                        My inbox is always open. Whether you have a question or just want to say hi, I'll try my best to get back to you!
                    </p>

                    <button
                        onClick={() => navigator.clipboard.writeText('ipwahyumahendra@gmail.com')}
                        className="w-full justify-between flex items-center px-4 py-3 bg-secondary border border-border/50 rounded-md font-mono text-sm text-foreground hover:bg-secondary/70 transition-colors"
                    >
                        ipwahyumahendra@gmail.com
                        <span className="text-xs text-muted-foreground border border-border/50 bg-background px-2 py-0.5 rounded">Copy</span>
                    </button>

                    <button
                        onClick={() => navigator.clipboard.writeText('(+61)422-114-196')}
                        className="w-full mt-4 justify-between flex items-center px-4 py-3 bg-secondary border border-border/50 rounded-md font-mono text-sm text-foreground hover:bg-secondary/70 transition-colors"
                    >
                        (+61) 422-114-196
                        <span className="text-xs text-muted-foreground border border-border/50 bg-background px-2 py-0.5 rounded">Copy</span>
                    </button>
                </div>

                <div className="flex-[1.5] border-t md:border-t-0 md:border-l border-border/50 pt-8 md:pt-0 md:pl-8">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label htmlFor="name" className="text-xs font-medium text-foreground">Name</label>
                                <input id="name" required className="w-full bg-background border border-border/50 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary h-10" />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="email" className="text-xs font-medium text-foreground">Email</label>
                                <input id="email" type="email" required className="w-full bg-background border border-border/50 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary h-10" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="message" className="text-xs font-medium text-foreground">Message</label>
                            <textarea id="message" required className="w-full bg-background border border-border/50 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary min-h-[120px] resize-y" />
                        </div>

                        <button disabled={status === 'loading' || status === 'success'} className="h-10 px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-md hover:bg-primary/90 transition-colors w-full flex items-center justify-center gap-2 disabled:opacity-50">
                            {status === 'idle' && 'Send Message'}
                            {status === 'loading' && <><Loader2 className="w-4 h-4 animate-spin" /> Transmitting...</>}
                            {status === 'success' && <><CheckCircle2 className="w-4 h-4" /> Sent Securely</>}
                            {status === 'error' && <><AlertCircle className="w-4 h-4" /> Transfer Failed</>}
                        </button>
                    </form>
                </div>
            </motion.div>
        </section>
    );
}
