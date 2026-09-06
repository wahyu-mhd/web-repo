export interface Project {
  slug: string;
  title: string;
  shortDescription: string;
  category: string;
  technologies: string[];
  motif: 'storage' | 'soc' | 'pipeline';
  featured: boolean;

  writeupPending: boolean;
  cover?: { src: string; alt: string; width: number; height: number };
  links?: { github?: string; live?: string; demo?: string };
}
// One source for cards, articles, SEO and sitemap. Professional facts come from the CV.
export const projects: Project[] = [
  {
    slug: 'chunkvault-safevault',
    title: 'ChunkVault / SafeVault',
    shortDescription:
      'A self-hosted storage backend. Files become encrypted chunks, stored in the cloud and reconstructed for their authenticated owners.',
    category: 'Backend engineering · Security',
    technologies: ['FastAPI', 'PostgreSQL', 'Backblaze B2', 'Raspberry Pi'],
    motif: 'storage',
    featured: true,

    writeupPending: false,
  },
  {
    slug: 'wazuh-soc-lab',
    title: 'Mini SOC Lab',
    shortDescription:
      'From simulated attacks to actionable alerts. A multi-node Wazuh lab for exploring log collection and security detection.',
    category: 'Security · Infrastructure',
    technologies: ['Wazuh', 'VirtualBox', 'Ubuntu', 'Kali Linux'],
    motif: 'soc',
    featured: true,

    writeupPending: false,
  },
  {
    slug: 'cicd-automation',
    title: 'CI/CD Automation',
    shortDescription:
      'Connecting GitHub to Jenkins and Gradle for automated build and deployment workflows, with ngrok for webhook testing.',
    category: 'Developer tooling · Infrastructure',
    technologies: ['Jenkins', 'GitHub', 'Gradle', 'ngrok'],
    motif: 'pipeline',
    featured: true,

    writeupPending: true,
  },
];
