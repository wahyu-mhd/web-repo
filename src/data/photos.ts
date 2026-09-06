export interface Photo {
  id: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
  location?: string;
  date?: string;
  camera?: string;
}
// Add your own photographs here. See CONTENT_GUIDE.md. No sample photos are published.
export const photos: Photo[] = [];
