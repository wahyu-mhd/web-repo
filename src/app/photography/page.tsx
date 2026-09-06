/* eslint-disable @next/next/no-html-link-for-pages -- Preserve cross-document mode transitions. */
import type { Metadata } from 'next';
import { Camera, ArrowUpRight } from 'lucide-react';
import { PhotoGallery } from '@/components/PhotoGallery';
import { photos } from '@/data/photos';
export const metadata: Metadata = {
  title: 'Photography',
  description: 'The photography side of I Putu Wahyu Mahendra’s portfolio.',
  alternates: { canonical: '/photography' },
  openGraph: {
    title: 'Photography | Wahyu Mahendra',
    description: 'A different lens. The photography side of my portfolio.',
    url: '/photography',
  },
};
export default function PhotographyPage() {
  return (
    <div className="photography-page">
      <div className="shell">
        <header className="photography-intro">
          <p className="eyebrow">
            <Camera size={14} /> A DIFFERENT LENS
          </p>
          <h1>
            A pause.
            <br />
            <em>A closer look.</em>
          </h1>
          <p>
            Photography is another side of my curiosity.
            <br />A space for the things I see beyond the screen.
          </p>
        </header>
        {photos.length ? (
          <PhotoGallery photos={photos} />
        ) : (
          <section
            className="gallery-empty"
            aria-labelledby="gallery-empty-title"
          >
            <div className="viewfinder" aria-hidden="true">
              <Camera size={37} strokeWidth={1} />
              <i />
              <i />
              <i />
              <i />
            </div>
            <p className="eyebrow">PHOTOGRAPHS, COMING SOON</p>
            <h2 id="gallery-empty-title">Room for a different perspective.</h2>
            <p>My photographs will find a home here soon.</p>
            <a href="/" className="text-link">
              Explore the engineering side <ArrowUpRight size={16} />
            </a>
          </section>
        )}
        <div className="photography-bottom">
          <span>Wahyu Mahendra / Photography</span>
          <span>Same curiosity. Another perspective.</span>
        </div>
      </div>
    </div>
  );
}
