'use client';
import { createContext, useContext, useState, useCallback } from 'react';

const SECTION_IDS = ['home', 'about', 'experience', 'projects', 'skills', 'contact'];

interface SectionContextType {
    activeIndex: number;
    goToSection: (index: number) => void;
    goNext: () => void;
    goPrev: () => void;
    sectionIds: string[];
}

const SectionContext = createContext<SectionContextType | null>(null);

export function SectionProvider({ children }: { children: React.ReactNode }) {
    const [activeIndex, setActiveIndex] = useState(0);

    const goToSection = useCallback((index: number) => {
        if (index < 0 || index >= SECTION_IDS.length) return;
        setActiveIndex(index);
    }, []);

    const goNext = useCallback(() => {
        setActiveIndex((prev) => Math.min(prev + 1, SECTION_IDS.length - 1));
    }, []);

    const goPrev = useCallback(() => {
        setActiveIndex((prev) => Math.max(prev - 1, 0));
    }, []);

    return (
        <SectionContext.Provider value={{ activeIndex, goToSection, goNext, goPrev, sectionIds: SECTION_IDS }}>
            {children}
        </SectionContext.Provider>
    );
}

export function useSectionNavigation() {
    const context = useContext(SectionContext);
    if (!context) throw new Error('useSectionNavigation must be used within SectionProvider');
    return context;
}
