export interface DetailedSkill {
    name: string;
    description?: string;
}

export interface SkillCategory {
    category: string;
    items: (DetailedSkill | string)[];
}

export const skillsData: SkillCategory[] = [
    {
        category: 'Programming & Technical',
        items: [
            { name: 'Languages', description: 'Intermediate proficiency in Python and Java (OOP); foundation-level skills in JavaScript, C, React, and Next.js.' },
            { name: 'Cloud & Infrastructure', description: 'Hands-on experience with Alibaba Cloud (IaC, DevOps, Disaster Recovery) and managing CTF server infrastructure.' },
            { name: 'Security Toolset', description: 'Solid working knowledge of Kali Linux, Wireshark, and Burp Suite for traffic analysis; experience with Wazuh SIEM for log monitoring.' }
        ]
    },
    {
        category: 'Soft Skills',
        items: [
            { name: 'Leadership & Project Management', description: 'Leading technical teams as Tech Specialist Lead for USYD CyberSoc.' },
            { name: 'AI-Enhanced Productivity', description: 'Leveraging AI tools to accelerate debugging, documentation, and technical research workflows.' },
            { name: 'Team Collaboration', description: 'Experience working in cross-functional teams and society environments.' },
            { name: 'Research & Analytical Thinking' }
        ]
    },
    {
        category: 'Languages',
        items: [
            { name: 'Indonesian (Native)' },
            { name: 'English (Fluent)' }
        ]
    },
    {
        category: 'Interests',
        items: [
            { name: 'Cybersecurity & Ethical Hacking', description: 'Passionate about understanding system vulnerabilities, penetration testing, and secure software design. Curious to explore how systems and security integrate, and eager to deepen that knowledge through practical experience.' },
            { name: 'Problem Solving & Algorithms', description: 'Enjoy tackling complex problems through structured reasoning and efficient algorithm design.' },
            { name: 'Software Engineering & Scalable System Development', description: 'Interested in designing and building scalable applications. Previously developed simple Java projects using Gradle as a build automation tool.' },
            { name: 'Technology & Innovation', description: 'Interested in emerging tech trends like AI in cybersecurity and cloud security architectures.' }
        ]
    }
];
