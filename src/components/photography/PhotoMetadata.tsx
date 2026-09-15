import type { Photo } from '@/data/photos';
const fields = [
  ['camera', 'Camera'], ['lens', 'Lens'], ['focalLength', 'Focal length'],
  ['aperture', 'Aperture'], ['shutterSpeed', 'Shutter'], ['iso', 'ISO'],
] as const;
export function PhotoMetadata({ photo }: { photo: Photo }) {
  const available = fields.filter(([key]) => photo[key]);
  if (!available.length) return null;
  return <dl className="photo-metadata">{available.map(([key, label]) =>
    <div key={key}><dt>{label}</dt><dd>{photo[key]}</dd></div>
  )}</dl>;
}
