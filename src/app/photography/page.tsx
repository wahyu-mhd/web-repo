import type { Metadata } from 'next';
import { PhotoGallery } from '@/components/PhotoGallery';
import { photographyIntro } from '@/data/photos';
import { getPhotos } from '@/lib/photography';
export const metadata: Metadata = {
  title: 'Photography',
  description: 'The photography side of I Putu Wahyu Mahendra’s portfolio.',
  alternates: { canonical: '/photography' },
};
export default async function PhotographyPage() {
  const photos = await getPhotos();
  return <div className="photography-page"><div className="shell">
    <header className="photography-intro compact-photo-intro">
      <h1>{photographyIntro.title}</h1><p>{photographyIntro.description}</p>
    </header>
    {photos.length ? <PhotoGallery photos={photos} /> : <p>Photographs coming soon.</p>}
    <footer className="photography-bottom">© {new Date().getFullYear()} {photographyIntro.copyright}</footer>
  </div></div>;
}
