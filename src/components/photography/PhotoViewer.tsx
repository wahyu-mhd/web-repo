'use client';
import Image from 'next/image';
import { useLayoutEffect, useRef } from 'react';
import { ArrowLeft, ArrowRight, X } from 'lucide-react';
import type { Photo } from '@/data/photos';
import { photographyIntro } from '@/data/photos';
import { PhotoMetadata } from './PhotoMetadata';
export function PhotoViewer({ photo, index, count, close, step }: {
  photo: Photo; index: number; count: number; close: () => void; step: (delta: number) => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const touch = useRef<{ x: number; y: number } | null>(null);
  useLayoutEffect(() => {
    const modal = dialog.current!;
    const previous = document.body.style.overflow;
    modal.showModal();
    document.body.style.overflow = 'hidden';
    return () => { modal.close(); document.body.style.overflow = previous; };
  }, []);
  return <dialog ref={dialog} className="photo-dialog cinematic-viewer" aria-labelledby="photo-title"
    onCancel={(event) => { event.preventDefault(); close(); }}
    onKeyDown={(event) => {
      if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        event.preventDefault(); step(event.key === 'ArrowLeft' ? -1 : 1);
      }
    }}>
    <button autoFocus className="viewer-close icon-button" onClick={close} aria-label="Close photograph"><X size={20} /></button>
    <div className="cinematic-content">
      <div className="photo-stage" onTouchStart={(event) => {
        if (event.touches.length === 1) touch.current = { x: event.touches[0].clientX, y: event.touches[0].clientY };
        else touch.current = null;
      }} onTouchEnd={(event) => {
        const start = touch.current; touch.current = null;
        if (!start) return;
        const dx = event.changedTouches[0].clientX - start.x;
        const dy = event.changedTouches[0].clientY - start.y;
        if (Math.abs(dx) > 65 && Math.abs(dx) > Math.abs(dy) * 1.5) step(dx < 0 ? 1 : -1);
      }}>
        <Image key={photo.id} src={photo.src} alt={photo.alt} width={photo.width} height={photo.height}
          sizes="(max-width: 700px) 94vw, 76vw" loading="eager" className="viewer-image"
          style={{ viewTransitionName: `photo-${photo.id}` }} />
      </div>
      <div className="photo-information">
        <div className="photo-description"><h2 id="photo-title">{photo.title || photo.caption || photo.alt}</h2>
          {(photo.location || photo.year || photo.date) && <p>{[photo.location, photo.year || photo.date].filter(Boolean).join(' · ')}</p>}
          <small>© {photo.copyright || photographyIntro.copyright}</small>
        </div>
        <PhotoMetadata photo={photo} />
      </div>
      <nav className="cinematic-navigation" aria-label="Photograph navigation">
        <button className="icon-button photo-previous" onClick={() => step(-1)} disabled={count < 2} aria-label="Previous photograph"><ArrowLeft size={20} /></button>
        <span aria-live="polite">{String(index + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}</span>
        <button className="icon-button photo-next" onClick={() => step(1)} disabled={count < 2} aria-label="Next photograph"><ArrowRight size={20} /></button>
      </nav>
    </div>
  </dialog>;
}
