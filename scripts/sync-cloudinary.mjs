#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

console.log('🚀 [Cloudinary Auto-Sync] Đang đọc cấu trúc Media Library...');

const snapshotPath = path.join(rootDir, 'all_custom_cloudinary.json');
if (!fs.existsSync(snapshotPath)) {
  console.error('❌ Không tìm thấy file snapshot all_custom_cloudinary.json');
  process.exit(1);
}

const raw = JSON.parse(fs.readFileSync(snapshotPath, 'utf8'));
const images = raw.images || [];
const videos = raw.videos || [];

console.log(`📦 Tìm thấy: ${images.length} hình ảnh, ${videos.length} video.`);

const manifestItems = [];

[...images, ...videos].forEach((item, idx) => {
  const folder = item.asset_folder || item.folder || 'Uncategorized';
  const displayName = item.display_name || item.public_id;
  const publicId = item.public_id;
  const isVideo = item.resource_type === 'video';

  let matchedPage = 'general';
  let matchedComponent = 'MediaAsset';
  let matchStatus = 'MATCHED';

  if (folder.includes('Học vấn')) {
    matchedPage = 'education';
    matchedComponent = folder.includes('Bằng cấp') ? 'CertificateCard' : 'CourseBannerCard';
  } else if (folder.includes('Dự án')) {
    matchedPage = 'projects';
    matchedComponent = 'ProjectBannerCard';
  } else if (folder.includes('Hệ thống')) {
    matchedPage = 'systems';
    matchedComponent = isVideo ? 'SystemVideoPlayer' : 'SystemCardThumbnail';
  } else if (folder.includes('Kỷ niệm')) {
    matchedPage = 'memories';
    matchedComponent = 'MemoryPhotoCard';
  } else if (folder.includes('Hình Banner')) {
    matchedComponent = 'HeroBanner';
    if (displayName.includes('Thư_ngỏ')) matchedPage = 'letter';
    else if (displayName.includes('Kinh_nghiệm')) matchedPage = 'experience';
    else if (displayName.includes('Kỷ_năng')) matchedPage = 'skills';
    else if (displayName.includes('Học_vấn')) matchedPage = 'education';
    else if (displayName.includes('Dịch_vụ')) matchedPage = 'services';
  } else if (folder.includes('Video website')) {
    matchedPage = 'letter';
    matchedComponent = 'LetterVideoNarration';
  } else {
    matchStatus = 'REVIEW_REQUIRED';
  }

  manifestItems.push({
    id: `media-${idx + 1}`,
    folder,
    fileName: `${displayName}.${item.format}`,
    publicId,
    resourceType: item.resource_type,
    secureUrl: item.secure_url,
    format: item.format,
    width: item.width || 0,
    height: item.height || 0,
    duration: item.duration || null,
    alt: displayName.replace(/_/g, ' '),
    matchedPage,
    matchedComponent,
    matchStatus,
  });
});

// Group structured by Page & Component (Section 6 requirements)
const structuredLibrary = {
  home: {
    hero: {
      image: 'https://i.ibb.co/RT3jX4Mv/H-ng-Th-i-Avata-Gif.gif',
      video: '',
    },
  },
  letter: {
    banner: 'https://res.cloudinary.com/q5tpzaxk/image/upload/v1793042008/Th%C6%B0_ng%E1%BB%8F.png',
    video: 'https://res.cloudinary.com/q5tpzaxk/video/upload/v1793040322/transition-studio-take_24.mp4',
  },
  about: {
    portrait: 'https://i.ibb.co/RT3jX4Mv/H-ng-Th-i-Avata-Gif.gif',
    banner: '',
  },
  education: {
    banner: 'https://res.cloudinary.com/q5tpzaxk/image/upload/v1793042016/H%E1%BB%8Dc_v%E1%BA%A5n.png',
    courseImages: manifestItems.filter((i) => i.folder.includes('Học vấn/Banner Card')),
    certificates: manifestItems.filter((i) => i.folder.includes('Học vấn/Bằng cấp')),
  },
  services: {
    banner: 'https://res.cloudinary.com/q5tpzaxk/image/upload/v1793042018/D%E1%BB%8Bch_v%E1%BB%A5.png',
  },
  experience: {
    banner: 'https://res.cloudinary.com/q5tpzaxk/image/upload/v1793042010/Kinh_nghi%E1%BB%87m.png',
  },
  skills: {
    banner: 'https://res.cloudinary.com/q5tpzaxk/image/upload/v1793042012/K%E1%BB%B7_n%C4%83ng.png',
  },
  projects: {
    banners: manifestItems.filter((i) => i.folder.includes('Dự án')),
  },
  systems: {
    thumbnails: manifestItems.filter((i) => i.folder.includes('Hệ thống') && i.resourceType === 'image'),
    videos: manifestItems.filter((i) => i.folder.includes('Hệ thống') && i.resourceType === 'video'),
  },
  memories: {
    albums: manifestItems.filter((i) => i.folder.includes('Kỷ niệm')),
  },
};

const outputContent = `// AUTO-GENERATED CLOUDINARY MEDIA MANIFEST
// Generated at: ${new Date().toISOString()}
// Total assets: ${manifestItems.length} (${images.length} images, ${videos.length} videos)

export interface MediaItem {
  id: string;
  folder: string;
  fileName: string;
  publicId: string;
  resourceType: 'image' | 'video';
  secureUrl: string;
  format: string;
  width: number;
  height: number;
  duration: number | null;
  alt: string;
  matchedPage: string;
  matchedComponent: string;
  matchStatus: 'MATCHED' | 'REVIEW_REQUIRED' | 'NOT_FOUND';
}

export const CLOUDINARY_MEDIA_ITEMS: MediaItem[] = ${JSON.stringify(manifestItems, null, 2)};

export const mediaLibrary = ${JSON.stringify(structuredLibrary, null, 2)};

/**
 * Fast lookup helper by Public ID
 */
export function getMediaByPublicId(publicId: string): MediaItem | undefined {
  return CLOUDINARY_MEDIA_ITEMS.find((m) => m.publicId === publicId);
}

/**
 * Lookup media by folder and matching filename keyword
 */
export function findMediaInFolder(folderKeyword: string, nameKeyword: string): MediaItem | undefined {
  const normFolder = folderKeyword.toLowerCase();
  const normName = nameKeyword.toLowerCase();
  return CLOUDINARY_MEDIA_ITEMS.find(
    (m) => m.folder.toLowerCase().includes(normFolder) && m.fileName.toLowerCase().includes(normName)
  );
}

/**
 * Quick URL getter with fallback
 */
export function getCloudinaryUrl(publicIdOrKeyword: string, fallbackUrl = ''): string {
  const found = CLOUDINARY_MEDIA_ITEMS.find(
    (m) => m.publicId === publicIdOrKeyword || m.fileName.includes(publicIdOrKeyword)
  );
  return found ? found.secureUrl : fallbackUrl;
}
`;

const outputPath = path.join(rootDir, 'src', 'data', 'mediaManifest.ts');
fs.writeFileSync(outputPath, outputContent, 'utf8');

console.log(`✅ [Cloudinary Auto-Sync] Đã ghi thành công ${manifestItems.length} assets vào ${outputPath}`);
