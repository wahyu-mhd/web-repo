'use client';
import Image, { getImageProps } from 'next/image';
import { flushSync } from 'react-dom';
import { useEffect, useRef, useState } from 'react';
import type { Photo } from '@/data/photos';
import { PhotoViewer } from './photography/PhotoViewer';

function animate(update: () => void) {
  if (document.startViewTransition && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const transition = document.startViewTransition(() => flushSync(update));
    void transition.finished.catch(() => {});
  } else update();
}
export function PhotoGallery({ photos }: { photos: Photo[] }) {
  const [selected, setSelected] = useState<number | null>(null);
  const opener = useRef<HTMLAnchorElement | null>(null);
  useEffect(() => {
    function sync() {
      const slug = new URL(location.href).searchParams.get('photo');
      const index = photos.findIndex(photo => (photo.slug || photo.id) === slug);
      animate(() => setSelected(index < 0 ? null : index));
      if (index < 0) requestAnimationFrame(() => opener.current?.focus({ preventScroll: true }));
    }
    // Direct URLs are opened after hydration without changing the gallery's scroll position.
    const slug = new URL(location.href).searchParams.get('photo');
    const initial = photos.findIndex(photo => (photo.slug || photo.id) === slug);
    if (initial >= 0) {
      opener.current = document.querySelector<HTMLAnchorElement>(`[data-photo-id="${CSS.escape(photos[initial].id)}"]`);
      setSelected(initial);
    }
    window.addEventListener('popstate', sync);
    return () => window.removeEventListener('popstate', sync);
  }, [photos]);
  useEffect(() => {
    if (selected === null || photos.length < 2) return;
    const preloads = [-1, 1].map(delta => {
      const photo = photos[(selected + delta + photos.length) % photos.length];
      const { props } = getImageProps({ src: photo.src, alt: photo.alt, width: photo.width, height: photo.height, sizes: '(max-width: 700px) 94vw, 76vw' });
      const image = new window.Image();
      image.sizes = props.sizes || ''; image.srcset = props.srcSet || ''; image.src = props.src;
      return image;
    });
    return () => { preloads.forEach(image => { image.onload = null; }); };
  }, [selected, photos]);
  function open(index: number) {
    const url = new URL(location.href); url.searchParams.set('photo', photos[index].slug || photos[index].id);
    history.pushState({ ...history.state, photographyViewer: true }, '', url);
    animate(() => setSelected(index));
  }
  function close() {
    if (history.state?.photographyViewer) history.back();
    else {
      const url = new URL(location.href); url.searchParams.delete('photo');
      history.replaceState(history.state, '', url);
      animate(() => setSelected(null));
      requestAnimationFrame(() => opener.current?.focus({ preventScroll: true }));
    }
  }
  function step(delta: number) {
    if (selected === null) return;
    const index = (selected + delta + photos.length) % photos.length;
    const url = new URL(location.href); url.searchParams.set('photo', photos[index].slug || photos[index].id);
    history.replaceState(history.state, '', url);
    setSelected(index);
  }
  return <>
    <div className="photo-grid editorial-gallery">{photos.map((photo, index) => <figure key={photo.id} className={photo.featured ? 'photo-featured' : undefined}>
      <a className="photo-thumbnail" data-photo-id={photo.id} href={`?photo=${encodeURIComponent(photo.slug || photo.id)}`} aria-label={`Open photograph: ${photo.title || photo.alt}`}
        onClick={event => {
          if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
          event.preventDefault(); opener.current = event.currentTarget; open(index);
        }}>
        <Image src={photo.src} alt={photo.alt} width={photo.width} height={photo.height}
          sizes={photo.featured ? '(max-width: 700px) 94vw, 80vw' : '(max-width: 700px) 94vw, (max-width: 1100px) 46vw, 30vw'}
          style={{ viewTransitionName: selected === index ? 'none' : `photo-${photo.id}` }} />
        <span className="photo-hover-title">{photo.title || photo.caption}</span>
      </a>
    </figure>)}</div>
    {selected !== null && <PhotoViewer photo={photos[selected]} index={selected} count={photos.length} close={close} step={step} />}
  </>;
}
