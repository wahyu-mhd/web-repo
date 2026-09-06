import Link from 'next/link';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { projects } from '@/data/projects';
import { ProjectArtwork } from './ProjectArtwork';
export function ProjectShowcase() {
  return (
    <section id="projects" className="showcase section-space">
      <div className="section-heading">
        <div>
          <p className="eyebrow">01 / SELECTED WORK</p>
          <h2>
            Ideas, put into practice<span className="serif-dot">.</span>
          </h2>
        </div>
        <p>
          A closer look at what I build.
          <br />
          Choose a project to explore. <ArrowDownRight size={16} />
        </p>
      </div>
      <div className="project-grid">
        {projects.filter((project) => project.featured).map((project, index) => (
          <Link
            href={`/projects/${project.slug}`}
            key={project.slug}
            className={`project-card ${index === 0 ? 'project-featured' : ''}`}
          >
            <ProjectArtwork kind={project.motif} />
            <div className="project-copy">
              <div className="project-kicker">
                <span>
                  {String(index + 1).padStart(2, '0')} / {project.category}
                </span>
                {index === 0 && (
                  <span className="featured-label">Featured</span>
                )}
              </div>
              <h3>
                {project.title}
                <ArrowUpRight aria-hidden="true" size={24} />
              </h3>
              <p>{project.shortDescription}</p>
              <ul className="tags" aria-label="Technologies">
                {project.technologies.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
              <span className="read-project">
                Explore project <span aria-hidden="true">↗</span>
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
