'use client';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, X, Expand } from 'lucide-react';
import type { Photo } from '@/data/photos';
export function PhotoGallery({ photos }: { photos: Photo[] }) {
  const [selected, setSelected] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLButtonElement | null>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const photo = selected === null ? null : photos[selected];
  useEffect(() => {
    const modal = dialog.current;
    if (selected === null || !modal) return;
    if (!modal.open) {
      modal.showModal();
      closeButton.current?.focus();
    }
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [selected]);
  function close() {
    dialog.current?.close();
    setSelected(null);
    opener.current?.focus();
  }
  function step(delta: number) {
    setSelected((index) =>
      index === null ? null : (index + delta + photos.length) % photos.length,
    );
  }
  return (
    <>
      <div className="photo-grid">
        {photos.map((item, index) => (
          <figure key={item.id}>
            <button
              className="photo-thumbnail"
              aria-label={`Enlarge: ${item.alt}`}
              onClick={(event) => {
                opener.current = event.currentTarget;
                setSelected(index);
              }}
            >
              <Image
                src={item.src}
                alt={item.alt}
                width={item.width}
                height={item.height}
                sizes="(max-width: 650px) 100vw, (max-width: 1000px) 50vw, 33vw"
              />
              <span className="enlarge-icon">
                <Expand size={18} />
              </span>
            </button>
            {(item.caption || item.location) && (
              <figcaption>
                {item.caption}
                {item.location && <span>{item.location}</span>}
              </figcaption>
            )}
          </figure>
        ))}
      </div>
      <dialog
        ref={dialog}
        className="photo-dialog"
        aria-label="Photograph viewer"
        onCancel={(event) => {
          event.preventDefault();
          close();
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) close();
        }}
        onKeyDown={(event) => {
          if (event.key === 'ArrowLeft') {
            event.preventDefault();
            step(-1);
          }
          if (event.key === 'ArrowRight') {
            event.preventDefault();
            step(1);
          }
        }}
      >
        <button
          ref={closeButton}
          className="viewer-close icon-button"
          onClick={close}
          aria-label="Close photograph"
        >
          <X />
        </button>
        {photo && (
          <div className="viewer-content">
            <Image
              src={photo.src}
              alt={photo.alt}
              width={photo.width}
              height={photo.height}
              sizes="95vw"
              className="viewer-image"
            />
            <div className="viewer-caption" aria-live="polite">
              <p>{photo.caption || photo.alt}</p>
              <span>
                {[photo.location, photo.date, photo.camera]
                  .filter(Boolean)
                  .join(' · ')}
              </span>
            </div>
            <div className="viewer-controls">
              <button
                className="icon-button"
                onClick={() => step(-1)}
                aria-label="Previous photograph"
                disabled={photos.length < 2}
              >
                <ArrowLeft />
              </button>
              <span aria-live="polite">
                {(selected ?? 0) + 1} / {photos.length}
              </span>
              <button
                className="icon-button"
                onClick={() => step(1)}
                aria-label="Next photograph"
                disabled={photos.length < 2}
              >
                <ArrowRight />
              </button>
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}
