import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import path from 'path';

// Server-side initialization following Cloudinary Best Practices
const cloudName = process.env.CLOUDINARY_CLOUD_NAME || 'q5tpzaxk';
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;
const cloudinaryUrl = process.env.CLOUDINARY_URL;

if (cloudinaryUrl) {
  cloudinary.config({
    cloudinary_url: cloudinaryUrl,
    secure: true,
  });
} else if (apiKey && apiSecret) {
  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
    secure: true,
  });
} else {
  // Prototyping/Reading mode configuration
  cloudinary.config({
    cloud_name: cloudName,
    secure: true,
  });
}

export interface CloudinaryRawResource {
  asset_id?: string;
  public_id: string;
  format: string;
  version?: number;
  resource_type: 'image' | 'video' | 'raw';
  type?: string;
  created_at?: string;
  bytes?: number;
  width?: number;
  height?: number;
  duration?: number | null;
  asset_folder?: string;
  folder?: string;
  display_name?: string;
  url?: string;
  secure_url: string;
}

export interface CloudinaryFolder {
  name: string;
  path: string;
  itemCount?: number;
}

export interface CloudinarySyncResult {
  folders: CloudinaryFolder[];
  images: CloudinaryRawResource[];
  videos: CloudinaryRawResource[];
  totalImages: number;
  totalVideos: number;
  syncedAt: string;
  source: 'live_api' | 'static_manifest';
}

/**
 * Fetch all resources from Cloudinary Admin API with next_cursor pagination.
 * If credentials are not configured in environment, safely fallback to local snapshot.
 */
export async function fetchAllCloudinaryAssets(): Promise<CloudinarySyncResult> {
  const hasAuth = !!(cloudinaryUrl || (apiKey && apiSecret));

  if (!hasAuth) {
    return loadStaticSnapshot();
  }

  try {
    const images: CloudinaryRawResource[] = [];
    const videos: CloudinaryRawResource[] = [];

    // 1. Fetch images with pagination
    let imgCursor: string | undefined = undefined;
    do {
      const res: any = await cloudinary.api.resources({
        resource_type: 'image',
        type: 'upload',
        max_results: 500,
        next_cursor: imgCursor,
      });
      if (res?.resources) {
        images.push(...res.resources);
      }
      imgCursor = res?.next_cursor;
    } while (imgCursor);

    // 2. Fetch videos with pagination
    let vidCursor: string | undefined = undefined;
    do {
      const res: any = await cloudinary.api.resources({
        resource_type: 'video',
        type: 'upload',
        max_results: 500,
        next_cursor: vidCursor,
      });
      if (res?.resources) {
        videos.push(...res.resources);
      }
      vidCursor = res?.next_cursor;
    } while (vidCursor);

    // 3. Extract folders
    const folderSet = new Set<string>();
    [...images, ...videos].forEach((item) => {
      const f = item.asset_folder || item.folder;
      if (f) folderSet.add(f);
    });

    const folders: CloudinaryFolder[] = Array.from(folderSet).map((f) => ({
      name: f.split('/').pop() || f,
      path: f,
    }));

    return {
      folders,
      images,
      videos,
      totalImages: images.length,
      totalVideos: videos.length,
      syncedAt: new Date().toISOString(),
      source: 'live_api',
    };
  } catch (error) {
    console.warn('Cloudinary Admin API fetch failed or rate-limited, falling back to cached snapshot:', error);
    return loadStaticSnapshot();
  }
}

function loadStaticSnapshot(): CloudinarySyncResult {
  try {
    const candidates = [
      path.join(process.cwd(), 'all_custom_cloudinary.json'),
      path.join(process.cwd(), 'cloudinary_resources.json'),
    ];

    for (const filePath of candidates) {
      if (fs.existsSync(filePath)) {
        const raw = fs.readFileSync(filePath, 'utf8');
        const parsed = JSON.parse(raw);
        if (parsed.images || parsed.videos) {
          const images: CloudinaryRawResource[] = parsed.images || [];
          const videos: CloudinaryRawResource[] = parsed.videos || [];
          const folderSet = new Set<string>();
          [...images, ...videos].forEach((i) => {
            const f = i.asset_folder || i.folder;
            if (f) folderSet.add(f);
          });
          return {
            folders: Array.from(folderSet).map((f) => ({ name: f.split('/').pop() || f, path: f })),
            images,
            videos,
            totalImages: images.length,
            totalVideos: videos.length,
            syncedAt: new Date().toISOString(),
            source: 'static_manifest',
          };
        }
      }
    }
  } catch (err) {
    console.error('Error loading static Cloudinary snapshot:', err);
  }

  return {
    folders: [],
    images: [],
    videos: [],
    totalImages: 0,
    totalVideos: 0,
    syncedAt: new Date().toISOString(),
    source: 'static_manifest',
  };
}

export { cloudinary };
