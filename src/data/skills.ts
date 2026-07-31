export interface SkillCategory {
    category: string;
    skills: { name: string; level: 'Used in production' | 'Used in university' | 'Experienced' | 'Familiar' | 'Currently learning', ref?: string }[];
}

export const skillsData: SkillCategory[] = [
    {
        category: 'Programming',
        skills: [
            { name: 'TypeScript', level: 'Experienced' },
            { name: 'Python', level: 'Used in production' },
            { name: 'Rust', level: 'Currently learning' },
            { name: 'C', level: 'Used in university' },
            { name: 'SQL', level: 'Experienced' },
            { name: 'Bash', level: 'Familiar' },
        ]
    },
    {
        category: 'Security',
        skills: [
            { name: 'Secure Coding', level: 'Experienced' },
            { name: 'Cryptography', level: 'Used in university' },
            { name: 'Wazuh & SIEM', level: 'Used in university' },
            { name: 'Threat Modelling', level: 'Familiar' },
            { name: 'Vulnerability Analysis', level: 'Experienced' }
        ]
    },
    {
        category: 'Infrastructure',
        skills: [
            { name: 'Linux', level: 'Experienced' },
            { name: 'Docker', level: 'Used in production' },
            { name: 'AWS', level: 'Familiar' },
            { name: 'Terraform', level: 'Currently learning' },
            { name: 'GitHub Actions', level: 'Experienced' }
        ]
    }
];
