// src/data/photos.ts
export interface Photo {
  thumbnail: string;
  full: string;
  alt: string;
  category: string;
}

const thumbnails = import.meta.glob('/src/assets/photos/thumbnails/**/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}', { eager: true });
const fulls = import.meta.glob('/src/assets/photos/*/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}', { eager: true });

function mapPhotos(): Photo[] {
  const photos: Photo[] = [];

  Object.entries(fulls).forEach(([fullPath, fullMod]) => {
    const match = fullPath.match(/photos\/(.*?)\/([^\/]+\.(jpg|png|jpeg|webp))/i);
    if (!match) return;
    const [, category, filename] = match;

    const thumbPath = `/src/assets/photos/thumbnails/${category}/${filename}`;
    const thumbnail = (thumbnails[thumbPath] as any)?.default;

    if (thumbnail) {
      photos.push({
        thumbnail,
        full: (fullMod as any).default,
        alt: filename,
        category
      });
    }
  });

  // Shuffle once per load
  for (let i = photos.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [photos[i], photos[j]] = [photos[j], photos[i]];
  }

  return photos;
}

export const photos: Photo[] = mapPhotos();
