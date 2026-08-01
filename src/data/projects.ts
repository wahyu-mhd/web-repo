export interface Project {
    slug: string;
    title: string;
    shortDescription?: string;
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
    images?: string[];
}

export const projects: Project[] = [
    {
        slug: 'wazuh-soc-lab',
        title: 'Mini SOC Lab (Wazuh SIEM)',
        shortDescription: `Designed and deployed a mini Security Operations Center (SOC) lab on VirtualBox by configuring a multi-node environment: Wazuh Manager/Indexer/Dashboard, Ubuntu endpoint, and Kali Linux attacker and simulating real world attacks mapped to MITRE ATT&CK:
• Brute Force (T1110) using Hydra
• Privilege Escalation (T1548.003) via sudo abuse
• Valid Accounts (T1078) using Netcat
Monitored and analyzed logs to generate actionable alerts via Wazuh Dashboard by troubleshooting network configurations (NAT, Host-Only, Internal Network) to ensure proper agent-server communication, and understanding of log collection, SIEM pipelines, and detection engineering fundamentals.`,
        images: [
            '/wazuh-1.webp',
            '/wazuh-2.webp',
            '/wazuh-3.webp',
            '/wazuh-4.webp',
            '/wazuh-5.webp'
        ],
        description: [
            'I’ve spent the last few days diving deep into the Blue Team side of cybersecurity by building a dedicated Security Operations Center (SOC) Lab to simulate, detect, and analyze real-world attacks.',
            '🔧 Lab Setup\nSetting up the environment was a lesson in systems architecture. I utilized VirtualBox to create an isolated network consisting of:\n- The Brain: Wazuh Manager, Indexer, and Dashboard.\n- The Target: An Ubuntu Server (monitored endpoint).\n- The Attacker: Kali Linux.',
            '🧪 Attack & Detection Scenarios\nI simulated several techniques and mapped them to the MITRE ATT&CK® framework:\n- Brute Force (T1110): Used Hydra to simulate SSH credential stuffing.\n- Privilege Escalation (T1548.003): Monitored suspicious sudo activity.\n- Valid account authentication events (T1078): Suspicious network service using Netcat\nSeeing these attacks move from raw logs to actionable alerts on the Wazuh Dashboard made the concept of "Detection Engineering" feel much more real.',
            '⚙️ Challenges & Lessons Learned\nSetting up the lab was not entirely straightforward. I ran into several networking issues when configuring VirtualBox adapters (NAT vs Host-Only vs Internal Network), which initially caused connectivity problems between the attacker, monitored machine, and the Wazuh server. Troubleshooting these helped me better understand how isolated lab networks work and why proper network configuration is critical for security monitoring environments.',
            'I also learned how SIEM systems rely heavily on log sources, if the endpoint logs are not generated or properly forwarded, detections will not occur even if an attack is happening.',
            'This lab helped me understand the critical importance of log integrity and the complexity of maintaining a secure monitoring environment.'
        ],


        category: 'Cybersecurity',
        featured: true
    },
    {
        slug: 'cicd-automation',
        title: 'Automation & CI/CD Pipeline Project',
        shortDescription: 'A fully automated CI/CD pipeline using Jenkins and GitHub, utilizing Gradle for builds and ngrok for external webhook testing workflows.',
        description: [
            'Designed and implemented a CI/CD pipeline using Jenkins, integrated with GitHub for automated build and deployment workflows by configuring Gradle as the build system to manage dependencies and automate project compilation and exposing local services using ngrok to enable external webhook triggers and testing'
        ],
        category: 'Infrastructure',
        featured: true
    }
];
