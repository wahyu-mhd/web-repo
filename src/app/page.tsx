import type { Metadata } from 'next';
import Image from 'next/image';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import { ProjectShowcase } from '@/components/ProjectShowcase';
import { Contact } from '@/components/sections/Contact';
import { credentials, profile } from '@/data/profile';
export const metadata: Metadata = {
  title: 'Wahyu Mahendra | Software Engineering & Cybersecurity',
  alternates: { canonical: '/' },
};
export default function Home() {
  return (
    <div className="shell engineering-page">
      <section id="home" className="hero">
        <div className="hero-main">
          <p className="eyebrow">
            <span className="small-dot" /> HELLO, I’M WAHYU
          </p>
          <h1>
            Building systems.
            <br />
            <em>Thinking securely.</em>
          </h1>
          <p className="hero-description">
            I’m I Putu Wahyu Mahendra, an Advanced Computing student at the
            University of Sydney. I build backend systems, explore
            cybersecurity, and connect the pieces in between.
          </p>
          <div className="hero-actions">
            <a href="#projects" className="button-primary">
              Explore my work <ArrowDownRight size={17} />
            </a>
            <a href="/resume.pdf" className="text-link">
              View CV <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
        <aside className="hero-note">
          <div className="note-index">A LITTLE CONTEXT</div>
          <p>
            Code, infrastructure,
            <br />
            and a curious eye.
          </p>
          <div className="note-divider" />
          <dl>
            <div>
              <dt>Studying</dt>
              <dd>
                Computer Science
                <br />& Cybersecurity
              </dd>
            </div>
            <div>
              <dt>Based in</dt>
              <dd>Sydney, Australia</dd>
            </div>
          </dl>
          <a href="/photography">
            The photography side <ArrowUpRight size={14} />
          </a>
        </aside>
      </section>
      <ProjectShowcase />
      <section id="experience" className="section-space experience-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">02 / WORKING WITH OTHERS</p>
            <h2>Beyond personal projects.</h2>
          </div>
          <p>Building things is a team effort.</p>
        </div>
        <div className="experience-list">
          <article className="experience-row">
            <div className="experience-date">Feb 2026 — Present</div>
            <div>
              <h3>Tech Specialist Executive</h3>
              <p className="organization">
                University of Sydney Cyber Security Society
              </p>
              <p>
                Managing cloud infrastructure for CTF competitions, automating
                security challenge deployment with Docker and IaC principles,
                and supporting workshops and training.
              </p>
              <p className="experience-note">
                Linux, networking, and keeping competitions running.
              </p>
            </div>
            <span className="role-label">CyberSoc</span>
          </article>
          <article className="experience-row">
            <div className="experience-date">Jan 2025 — Feb 2026</div>
            <div>
              <h3>CTF Subcommittee Member</h3>
              <p className="organization">
                University of Sydney Cyber Security Society
              </p>
              <p>
                Contributed to competition challenges and training materials,
                and helped the executive team organise society events.
              </p>
            </div>
            <span className="role-label">CyberSoc</span>
          </article>
          <article className="experience-row">
            <div className="experience-date">Jan 2025 — Present</div>
            <div>
              <h3>Information Technology Directorate</h3>
              <p className="organization">
                Perhimpunan Pelajar Indonesia di Australia
              </p>
              <p>
                Contributed to website backend development, database
                development, and data management as part of the IT team.
              </p>
            </div>
            <span className="role-label">PPIA</span>
          </article>
        </div>
      </section>
      <section id="about" className="section-space about-section">
        <div className="about-photo">
          <Image
            src="/profile.jpg"
            alt="I Putu Wahyu Mahendra"
            width={681}
            height={955}
            sizes="(max-width: 700px) 70vw, 300px"
          />
          <span className="photo-label">The person behind the projects.</span>
        </div>
        <div className="about-copy">
          <p className="eyebrow">03 / A LITTLE ABOUT ME</p>
          <h2>
            Curiosity is the
            <br />
            <em>common thread.</em>
          </h2>
          <p>
            I’m a penultimate-year Bachelor of Advanced Computing student at the
            University of Sydney, majoring in Computer Science and
            Cybersecurity.
          </p>
          <p>
            I’m interested in how systems and security fit together—from backend
            development to understanding vulnerabilities and investigating logs.
            Away from engineering, photography is another interest of mine.
          </p>
          <div className="education-note">
            <strong>University of Sydney</strong>
            <span>Bachelor of Advanced Computing · Jul 2024 — Present</span>
            <span>Computer Science & Cybersecurity · Distinction WAM</span>
          </div>
          <div className="education-note">
            <strong>Indonesia Maju Scholarship (Affirmation)</strong>
            <span>Batch 3 awardee · 2023 — Present</span>
          </div>
          <div className="about-links">
            <a href={profile.github}>GitHub ↗</a>
            <a href={profile.linkedin}>LinkedIn ↗</a>
            <span>Indonesian & English</span>
          </div>
        </div>
      </section>
      <section id="skills" className="section-space toolkit">
        <div className="section-heading">
          <div>
            <p className="eyebrow">04 / THE TOOLKIT</p>
            <h2>Tools I work with.</h2>
          </div>
          <p>Best understood through the work above.</p>
        </div>
        <div className="skill-grid">
          {[
            [
              'Languages & web',
              'Python, SQL, Java, C, R, JavaScript, HTML, CSS, React, Next.js',
            ],
            [
              'Backend & infrastructure',
              'FastAPI, PostgreSQL, SQLAlchemy, Docker, Jenkins, Gradle, Alibaba Cloud',
            ],
            [
              'Security & investigation',
              'Wazuh, Kali Linux, Wireshark, Burp Suite, Linux networking',
            ],
          ].map(([title, text]) => (
            <div key={title}>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          ))}
        </div>
        <details className="credentials">
          <summary>
            Credentials & continued learning{' '}
            <span>
              {credentials.length} credentials <span aria-hidden="true">+</span>
            </span>
          </summary>
          <ul>
            {credentials.map((c) => (
              <li key={c.title}>
                <strong>{c.title}</strong>
                <span>
                  {c.issuer} · {c.date}
                </span>
              </li>
            ))}
          </ul>
        </details>
      </section>
      <Contact />
    </div>
  );
}
