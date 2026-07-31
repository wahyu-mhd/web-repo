'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from '@/components/ui/command';
import { Home, User, Briefcase, FileText, Code2, Link, TerminalSquare } from 'lucide-react';

export function CommandPalette() {
    const [open, setOpen] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if ((e.key === 'k' && (e.metaKey || e.ctrlKey)) || e.key === '/') {
                if (
                    (e.target instanceof HTMLElement && e.target.isContentEditable) ||
                    e.target instanceof HTMLInputElement ||
                    e.target instanceof HTMLTextAreaElement ||
                    e.target instanceof HTMLSelectElement
                ) {
                    return;
                }
                e.preventDefault();
                setOpen((open) => !open);
            }
        };
        document.addEventListener('keydown', down);
        return () => document.removeEventListener('keydown', down);
    }, []);

    const runCommand = (command: () => void) => {
        setOpen(false);
        command();
    };

    return (
        <CommandDialog open={open} onOpenChange={setOpen}>
            <CommandInput placeholder="Type a command or search..." />
            <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup heading="Navigation">
                    <CommandItem onSelect={() => runCommand(() => router.push('/'))}><Home className="mr-2 h-4 w-4" /> Home</CommandItem>
                    <CommandItem onSelect={() => runCommand(() => router.push('/#about'))}><User className="mr-2 h-4 w-4" /> About</CommandItem>
                    <CommandItem onSelect={() => runCommand(() => router.push('/#projects'))}><Code2 className="mr-2 h-4 w-4" /> Projects</CommandItem>
                    <CommandItem onSelect={() => runCommand(() => router.push('/#experience'))}><Briefcase className="mr-2 h-4 w-4" /> Experience</CommandItem>
                </CommandGroup>
                <CommandSeparator />
                <CommandGroup heading="Actions">
                    <CommandItem onSelect={() => runCommand(() => window.open('/resume.pdf', '_blank'))}><FileText className="mr-2 h-4 w-4" /> View Resume</CommandItem>
                    <CommandItem onSelect={() => runCommand(() => window.open('https://github.com', '_blank'))}><Link className="mr-2 h-4 w-4" /> GitHub</CommandItem>
                </CommandGroup>
                <CommandSeparator />
                <CommandGroup heading="System">
                    <CommandItem onSelect={() => runCommand(() => document.documentElement.classList.toggle('dark'))}><TerminalSquare className="mr-2 h-4 w-4" /> Toggle Theme</CommandItem>
                </CommandGroup>
            </CommandList>
        </CommandDialog>
    );
}
