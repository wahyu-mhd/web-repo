export interface Experience {
    id: string;
    role: string;
    company: string;
    duration: string;
    location: string;
    description: string[];
    technologies?: string[];
    type?: string;
}

export const experiences: Experience[] = [
    {
        id: 'exp1',
        role: 'Tech Specialist Executive',
        company: 'University of Sydney Cyber Security Society | Organization',
        duration: 'Feb 2026 - present',
        location: 'NSW, Australia',
        description: [
            'Engineered and managed the scalable cloud-based infrastructure for society-wide CTF competitions, ensuring 99.9% uptime for 100+ concurrent participants.',
            'Collaborated with the executive and CTF teams to design and implement technical solutions that support workshops, competitions, and training activities for society members.',
            'Automated the deployment of security challenges using Docker and Infrastructure-as-Code (IaC) principles to streamline environment setup and teardown.',
            'Monitored competition traffic for "fair play" and infrastructure stability, applying troubleshooting skills in Linux and networking environments.'
        ],
        type: 'Organization'
    },
    {
        id: 'exp2',
        role: 'CTF Subcommittee Member',
        company: 'University of Sydney Cyber Security Society',
        duration: '2025-2026',
        location: 'NSW, Australia',
        description: [
            'Sub-committee member in the CTF (Capture The Flag) Division, contributing to the design and development of competition challenges and training materials for USYD CyberSoc events',
            'Assisted the executive team in organizing and running multiple society events, ensuring smooth coordination and engagement for participants',
            'Participated in cyber security workshops on Blue Teaming, Red Teaming, and Penetration Testing to strengthen practical security skills'
        ]
    },
    {
        id: 'exp3',
        role: 'Information Technology Directorate',
        company: 'Perhimpunan Pelajar Indonesia di Australia (PPIA) | Organization',
        duration: 'Jan 2025 - Present',
        location: 'NSW, Australia',
        description: [
            'Contributed to the Information Technology Directorate by collaborating on team projects and technical initiatives.',
            'Developed and maintained the backend systems for the PPIA website, focusing on database developing and data management.',
            'Participated in social, national, and seminar events to enhance personal growth and professional networking.',
            'Strengthened organizational and responsibility skills through hands-on experience in planning and execution.'
        ],
        type: 'Organization'
    },
    {
        id: 'exp4',
        role: 'Awardee',
        company: 'Indonesia Maju Scholarship (Affirmation)',
        duration: '2023 - Present',
        location: 'Bali, Indonesia',
        description: [
            'Received the opportunity as one of the fifty students of Indonesia Maju Scholarship Batch 3 to study abroad for an undergraduate degree',
            'Followed the preparation program, including English and mathematics classes, seminars, and workshops'
        ],
        type: 'Awardee'
    }
];
