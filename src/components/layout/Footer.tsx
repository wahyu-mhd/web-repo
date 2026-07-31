export function Footer() {
    return (
        <footer className="border-t border-border/50 bg-background py-8">
            <div className="container mx-auto px-6 text-center text-sm text-muted-foreground flex flex-col md:flex-row justify-between items-center gap-4">
                <p>&copy; {new Date().getFullYear()} John Doe. All rights reserved.</p>
                <div className="flex gap-4">
                    <a href="https://github.com" className="hover:text-primary transition-colors">GitHub</a>
                    <a href="https://linkedin.com" className="hover:text-primary transition-colors">LinkedIn</a>
                    <a href="mailto:contact@example.com" className="hover:text-primary transition-colors">Email</a>
                </div>
                <p className="text-xs opacity-70">Built with Next.js, Tailwind & TypeScript.</p>
            </div>
        </footer>
    );
}
