export interface Experience {
    id: string;
    role: string;
    company: string;
    duration: string;
    location: string;
    description: string;
    technologies: string[];
    type: 'Employment' | 'Society' | 'Academic' | 'Hackathon';
}

export const experiences: Experience[] = [
    {
        id: 'exp1',
        role: 'Cybersecurity Analyst Intern',
        company: 'TechDefense Sec',
        duration: 'Nov 2024 - Feb 2025',
        location: 'Sydney, Australia',
        description: 'Developed automated log parsing pipelines supporting incident response tasks, accelerating initial triage by 40%.',
        technologies: ['Python', 'Wazuh', 'Splunk', 'Bash'],
        type: 'Employment'
    },
    {
        id: 'exp2',
        role: 'Technical Executive',
        company: 'University Cybersecurity Society',
        duration: 'Mar 2024 - Present',
        location: 'University of Sydney',
        description: 'Designed and deployed infrastructure for semesterly Capture The Flag (CTF) events utilizing Docker Swarm to isolate vulnerable containers.',
        technologies: ['Docker', 'Nginx', 'Linux'],
        type: 'Society'
    },
    {
        id: 'exp3',
        role: 'Participant, 2nd Place',
        company: 'HackMac 2025',
        duration: 'May 2025',
        location: 'Sydney',
        description: 'Built a peer-to-peer secure messaging prototype over WebRTC during a 48-hour continuous sprint.',
        technologies: ['WebRTC', 'TypeScript', 'Node.js'],
        type: 'Hackathon'
    }
];
