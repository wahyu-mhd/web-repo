import { photos, type Photo } from '@/data/photos';
import exifr from 'exifr';
import path from 'node:path';
import { readFile } from 'node:fs/promises';

// Server-only preparation: image bytes and EXIF parsing never reach the client.
export async function getPhotos(): Promise<Photo[]> {
  return Promise.all(photos.map(async (photo) => {
    const file = path.join(process.cwd(), 'public', photo.src);
    const parsed = await exifr.parse(await readFile(file), ['Model', 'LensModel', 'FocalLength', 'FNumber', 'ExposureTime', 'ISO', 'DateTimeOriginal']).catch(() => undefined);
    // Some edited exports retain corrupt TIFF offsets. Discard that EXIF block.
    const corrupt = Object.values(parsed || {}).some(value => typeof value === 'string' && /[\u0000-\u001f\uFFFD]/.test(value));
    const tags = corrupt ? undefined : parsed;
    const exposure = tags?.ExposureTime;
    const automatic: Partial<Photo> = {
      camera: tags?.Model,
      lens: tags?.LensModel,
      focalLength: tags?.FocalLength ? `${tags.FocalLength}mm` : undefined,
      aperture: tags?.FNumber ? `f/${tags.FNumber}` : undefined,
      shutterSpeed: exposure ? (exposure < 1 ? `1/${Math.round(1 / exposure)}s` : `${exposure}s`) : undefined,
      iso: tags?.ISO ? String(tags.ISO) : undefined,
      year: tags?.DateTimeOriginal instanceof Date ? tags.DateTimeOriginal.getFullYear() : undefined,
    };
    return { ...automatic, ...photo };
  }));
}
