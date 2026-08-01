export interface Project {
    slug: string;
    title: string;
    description: string[];
    subBullets?: string[];
    descriptionContinuation?: string; // used for paragraph splits in CV
    category: 'Software Engineering' | 'Cybersecurity' | 'Infrastructure' | 'Cloud' | 'Other';
    featured: boolean;
    links?: {
        github?: string;
        live?: string;
        demo?: string;
    };
}

export const projects: Project[] = [
    {
        slug: 'wazuh-soc-lab',
        title: 'Mini SOC Lab (Wazuh SIEM)',
        description: [
            'Designed and deployed a mini Security Operations Center (SOC) lab on VirtualBox by configuring a multi-node environment: Wazuh Manager/Indexer/Dashboard, Ubuntu endpoint, and Kali Linux attacker and simulating real world attacks mapped to MITRE ATT&CK:'
        ],
        subBullets: [
            'Brute Force (T1110) using Hydra',
            'Privilege Escalation (T1548.003) via sudo abuse',
            'Valid Accounts (T1078) using Netcat'
        ],
        descriptionContinuation: 'Monitored and analyzed logs to generate actionable alerts via Wazuh Dashboard by troubleshooting network configurations (NAT, Host-Only, Internal Network) to ensure proper agent-server communication, and understanding of log collection, SIEM pipelines, and detection engineering fundamentals.',
        category: 'Cybersecurity',
        featured: true
    },
    {
        slug: 'cicd-automation',
        title: 'Automation & CI/CD Pipeline Project',
        description: [
            'Designed and implemented a CI/CD pipeline using Jenkins, integrated with GitHub for automated build and deployment workflows by configuring Gradle as the build system to manage dependencies and automate project compilation and exposing local services using ngrok to enable external webhook triggers and testing'
        ],
        category: 'Infrastructure',
        featured: true
    }
];
