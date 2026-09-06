import type { MetadataRoute } from 'next';
import { projects } from '@/data/projects';
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://www.wahyumhd.com',
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: 'https://www.wahyumhd.com/photography',
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: 'https://www.wahyumhd.com/resume.pdf',
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    ...projects.map((project) => ({
      url: 'https://www.wahyumhd.com/projects/' + project.slug,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ];
}
