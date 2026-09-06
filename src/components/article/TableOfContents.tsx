'use client';
import { useEffect, useRef, useState } from 'react';
import type { TocEntry } from '@/lib/article';
export function TableOfContents({ entries }: { entries: TocEntry[] }) {
  const [active, setActive] = useState(entries[0]?.id ?? '');
  const disclosure = useRef<HTMLDetailsElement>(null);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      const threshold =
        (document.querySelector('header')?.getBoundingClientRect().height ??
          80) + 40;
      let current = entries[0]?.id ?? '';
      for (const entry of entries) {
        const element = document.getElementById(entry.id);
        if (element && element.getBoundingClientRect().top <= threshold)
          current = entry.id;
      }
      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 5
      )
        current = entries.at(-1)?.id ?? current;
      setActive(current);
    };
    const schedule = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    window.addEventListener('hashchange', schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      window.removeEventListener('hashchange', schedule);
    };
  }, [entries]);
  if (!entries.length) return null;
  const links = (
    <ol>
      {entries.map((entry) => (
        <li
          key={entry.id}
          className={entry.depth > 2 ? 'toc-nested' : undefined}
        >
          <a
            href={`#${entry.id}`}
            aria-current={active === entry.id ? 'location' : undefined}
            onClick={() => {
              setActive(entry.id);
              if (disclosure.current?.open) {
                disclosure.current.open = false;
                const heading = document.getElementById(entry.id);
                heading?.focus({ preventScroll: true });
              }
            }}
          >
            {entry.title}
          </a>
        </li>
      ))}
    </ol>
  );
  return (
    <aside className="article-toc">
      <nav className="desktop-toc" aria-label="On this page">
        <p className="eyebrow">ON THIS PAGE</p>
        {links}
      </nav>
      <details ref={disclosure} className="mobile-toc">
        <summary>
          On this page <span aria-hidden="true">+</span>
        </summary>
        <nav aria-label="On this page">{links}</nav>
      </details>
    </aside>
  );
}
