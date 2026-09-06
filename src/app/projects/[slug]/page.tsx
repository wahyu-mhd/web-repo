import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { projects } from '@/data/projects';
import { readArticle } from '@/lib/article';
import { ArticleBody } from '@/components/article/ArticleBody';
import { TableOfContents } from '@/components/article/TableOfContents';
import { ProjectArtwork } from '@/components/ProjectArtwork';
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return { title: 'Project not found' };
  return {
    title: project.title,
    description: project.shortDescription,
    alternates: { canonical: '/projects/' + slug },
    openGraph: {
      title: project.title,
      description: project.shortDescription,
      url: '/projects/' + slug,
      type: 'article',
      ...(project.cover
        ? {
            images: [
              {
                url: project.cover.src,
                alt: project.cover.alt,
                width: project.cover.width,
                height: project.cover.height,
              },
            ],
          }
        : {}),
    },
  };
}
export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();
  const { markdown, toc } = await readArticle(slug);
  const nextProject =
    projects[(projects.indexOf(project) + 1) % projects.length];
  return (
    <div className="shell article-page">
      <Link href="/#projects" className="back-link">
        <ArrowLeft size={16} />
        Back to selected work
      </Link>
      <header className="article-header">
        <p className="eyebrow">{project.category}</p>
        <h1>{project.title}</h1>
        <p className="article-summary">{project.shortDescription}</p>
        <ul className="tags">
          {project.technologies.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
        <div className="article-external-links">
          {project.links?.github && (
            <a href={project.links.github}>Repository ↗</a>
          )}
          {project.links?.demo && <a href={project.links.demo}>Demo ↗</a>}
          {project.links?.live && (
            <a href={project.links.live}>Visit project ↗</a>
          )}
        </div>
      </header>
      <div className="article-layout">
        <TableOfContents entries={toc} />
        <article className="article-content" aria-label={project.title}>
          {project.cover ? (
            <Image
              src={project.cover.src}
              alt={project.cover.alt}
              width={project.cover.width}
              height={project.cover.height}
              sizes="(max-width: 800px) 100vw, 740px"
            />
          ) : (
            <ProjectArtwork kind={project.motif} />
          )}
          <ArticleBody markdown={markdown} />
          {project.writeupPending && (
            <aside className="writeup-note">
              <span className="small-dot" />
              <div>
                <strong>Detailed write-up coming soon.</strong>
                <p>
                  A short project overview for now. The full technical
                  walkthrough will follow.
                </p>
              </div>
            </aside>
          )}
        </article>
      </div>
      <Link href={`/projects/${nextProject.slug}`} className="next-project">
        <span className="eyebrow">EXPLORE ANOTHER PROJECT</span>
        <span>
          {nextProject.title}
          <ArrowUpRight />
        </span>
      </Link>
    </div>
  );
}
