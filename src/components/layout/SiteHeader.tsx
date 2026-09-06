/* Native document navigation is required for the cross-document View Transition API. */
/* eslint-disable @next/next/no-html-link-for-pages */
'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Code2, Camera, ArrowUpRight } from 'lucide-react';
export function SiteHeader() {
  const photography = usePathname().startsWith('/photography');
  return (
    <header className="site-header">
      <div className="header-inner">
        <Link className="wordmark" href="/" aria-label="Wahyu Mahendra — home">
          <span className="monogram">
            wm<span>·</span>
          </span>
          <span className="wordmark-name">Wahyu Mahendra</span>
        </Link>
        <nav className="mode-switch" aria-label="Portfolio mode">
          {/* Document links enable native cross-document View Transitions and work without JS. */}
          <a href="/" aria-current={!photography ? 'page' : undefined}>
            <Code2 size={15} aria-hidden="true" />
            Engineering
          </a>
          <a
            href="/photography"
            aria-current={photography ? 'page' : undefined}
          >
            <Camera size={15} aria-hidden="true" />
            Photography
          </a>
        </nav>
        <nav className="header-links" aria-label="Main navigation">
          <Link href="/#projects">Work</Link>
          <Link href="/#about">About</Link>
          <Link href="/#contact">Contact</Link>
          <a href="/resume.pdf" className="cv-link">
            CV <ArrowUpRight size={14} aria-hidden="true" />
          </a>
        </nav>
      </div>
    </header>
  );
}
