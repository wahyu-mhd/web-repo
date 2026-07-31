export interface Project {
    slug: string;
    title: string;
    summary: string;
    problem: string;
    motivation: string;
    features: string[];
    technologies: string[];
    securityConsiderations: string[];
    engineeringChallenges: string[];
    myContribution: string;
    category: 'Software Engineering' | 'Cybersecurity' | 'Infrastructure' | 'Cloud' | 'Other';
    status: 'Completed' | 'In Progress' | 'Archived';
    date: string;
    links: {
        github?: string;
        live?: string;
        demo?: string;
        docs?: string;
    };
    featured: boolean;
    outcomes: string[];
}

export const projects: Project[] = [
    {
        slug: 'chunkvault',
        title: 'ChunkVault',
        summary: 'A self-hosted secure personal cloud storage platform with AES-GCM encryption.',
        problem: 'Standard cloud providers have full visibility into personal stored data, risking data exposure on breaches without explicit client-side encryption controls.',
        motivation: 'To explore robust self-hosted infrastructure, data streaming architecture, and applied cryptography over a performant backend.',
        features: [
            'File chunking and streaming support up to 50GB',
            'AES-256-GCM encryption before storage',
            'SHA-256 integrity verification',
            'Deduplication engine reducing storage overlap',
            'Secure file reconstruction and download pipeline'
        ],
        technologies: ['FastAPI', 'Next.js', 'PostgreSQL', 'SQLAlchemy', 'Docker', 'Tailscale', 'Python'],
        securityConsiderations: [
            'Encryption happens on the stream boundary ensuring at-rest security.',
            'Tailscale mesh networking creates a dark deployment inaccessible from the public internet.',
            'Auth tokens are strictly validated via short-lived JWTs.'
        ],
        engineeringChallenges: [
            'Designing a reliable multipart chunking strategy to bypass memory bottlenecks when uploading large video files.',
            'Ensuring the SQLAlchemy ORM layer securely mapped chunks to parent file nodes with atomic commits avoiding corrupt states.'
        ],
        myContribution: 'Architected and built the entire backend pipeline and database schema, alongside the user interface.',
        category: 'Cybersecurity',
        status: 'Completed',
        date: '2025',
        links: { github: 'https://github.com' },
        featured: true,
        outcomes: ['Achieved 30MB/s encrypted upload throughput.', 'Currently securing 2TB of personal backups.']
    },
    {
        slug: 'wazuh-soc-lab',
        title: 'Wazuh SOC Mini-Lab',
        summary: 'A home cybersecurity monitoring lab demonstrating detection engineering capabilities.',
        problem: 'Theoretical security knowledge required practical validation via active monitoring and realistic alert analysis environments.',
        motivation: 'To gain hands-on experience tuning SIEM configurations and understanding live attack footprint metrics.',
        features: [
            'Wazuh SIEM deployed on a segmented network',
            'Simulated SSH brute-force and privilege escalation attacks',
            'Custom detection rules mapped to MITRE ATT&CK',
            'Automated log ingestion and alert firing'
        ],
        technologies: ['Linux', 'Wazuh', 'Bash', 'Docker', 'Security Operations'],
        securityConsiderations: [
            'Lab isolated strictly from host networks to prevent accidental compromise propagation.',
            'Least-privilege auditing configurations applied on watched endpoints.'
        ],
        engineeringChallenges: [
            'Writing performant decoders and rules that did not swamp the SIEM instance under high load log generation.',
            'Creating realistic attacks without relying strictly on automated noisy tools, mimicking real adversary behavior.'
        ],
        myContribution: 'Configured the infrastructure, developed the attack scripts, and tuned the detection logic.',
        category: 'Cybersecurity',
        status: 'Completed',
        date: '2024',
        links: {},
        featured: true,
        outcomes: ['Successfully caught and alarmed on 95% of simulated lateral movement attempts.', 'Wrote 12 custom detection rules.']
    }
];
