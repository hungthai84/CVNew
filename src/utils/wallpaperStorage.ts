import { WallpaperOption, WallpaperType } from '@/types';
import { WALLPAPER_OPTIONS } from '@/data/wallpapers';

const DB_NAME = 'HungThaiCV_WallpapersDB';
const DB_VERSION = 1;
const STORE_NAME = 'wallpaperStore';

const STORAGE_KEYS = {
  CUSTOM_WALLPAPERS: 'hungthai_custom_wallpapers',
  DEFAULT_WALLPAPER_ID: 'hungthai_default_wallpaper_id',
  ACTIVE_WALLPAPER: 'hungthai_active_wallpaper',
  DELETED_WALLPAPER_IDS: 'hungthai_deleted_wallpaper_ids',
};

// Open IndexedDB safely with Promise
function openDB(): Promise<IDBDatabase | null> {
  if (typeof window === 'undefined' || !window.indexedDB) {
    return Promise.resolve(null);
  }

  return new Promise((resolve) => {
    try {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME);
        }
      };

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => {
        console.warn('IndexedDB failed to open, falling back to localStorage');
        resolve(null);
      };
    } catch {
      resolve(null);
    }
  });
}

// Get item from IndexedDB with fallback to localStorage
export async function getStoredItem<T>(key: string, fallback: T): Promise<T> {
  if (typeof window === 'undefined') return fallback;

  try {
    const db = await openDB();
    if (db) {
      return new Promise((resolve) => {
        try {
          const transaction = db.transaction(STORE_NAME, 'readonly');
          const store = transaction.objectStore(STORE_NAME);
          const req = store.get(key);
          req.onsuccess = () => {
            if (req.result !== undefined && req.result !== null) {
              resolve(req.result as T);
            } else {
              // Try localStorage fallback
              const localVal = localStorage.getItem(key);
              if (localVal) {
                try {
                  resolve(JSON.parse(localVal) as T);
                } catch {
                  resolve(localVal as unknown as T);
                }
              } else {
                resolve(fallback);
              }
            }
          };
          req.onerror = () => resolve(fallback);
        } catch {
          resolve(fallback);
        }
      });
    } else {
      // LocalStorage fallback
      const localVal = localStorage.getItem(key);
      if (localVal) {
        try {
          return JSON.parse(localVal) as T;
        } catch {
          return localVal as unknown as T;
        }
      }
    }
  } catch (e) {
    console.warn(`Failed to get stored item ${key}:`, e);
  }

  return fallback;
}

// Set item in IndexedDB and localStorage (if size permits)
export async function setStoredItem<T>(key: string, value: T): Promise<void> {
  if (typeof window === 'undefined') return;

  try {
    const db = await openDB();
    if (db) {
      await new Promise<void>((resolve) => {
        try {
          const transaction = db.transaction(STORE_NAME, 'readwrite');
          const store = transaction.objectStore(STORE_NAME);
          store.put(value, key);
          transaction.oncomplete = () => resolve();
          transaction.onerror = () => resolve();
        } catch {
          resolve();
        }
      });
    }

    // Also sync to localStorage if not too large
    try {
      const strVal = typeof value === 'string' ? value : JSON.stringify(value);
      if (strVal.length < 2_000_000) {
        localStorage.setItem(key, strVal);
      }
    } catch {
      // Ignore quota errors for large base64 files
    }
  } catch (e) {
    console.warn(`Failed to set stored item ${key}:`, e);
  }
}

// Load custom wallpapers
export async function loadCustomWallpapers(): Promise<WallpaperOption[]> {
  return await getStoredItem<WallpaperOption[]>(STORAGE_KEYS.CUSTOM_WALLPAPERS, []);
}

// Save custom wallpapers
export async function saveCustomWallpapers(list: WallpaperOption[]): Promise<void> {
  await setStoredItem(STORAGE_KEYS.CUSTOM_WALLPAPERS, list);
}

// Get default wallpaper ID
export async function getDefaultWallpaperId(): Promise<string> {
  return await getStoredItem<string>(STORAGE_KEYS.DEFAULT_WALLPAPER_ID, 'aurora');
}

// Set default wallpaper ID
export async function setDefaultWallpaperId(id: string): Promise<void> {
  await setStoredItem<string>(STORAGE_KEYS.DEFAULT_WALLPAPER_ID, id);
}

// Load deleted/hidden wallpaper IDs
export async function loadDeletedWallpaperIds(): Promise<string[]> {
  return await getStoredItem<string[]>(STORAGE_KEYS.DELETED_WALLPAPER_IDS, []);
}

// Save deleted/hidden wallpaper IDs
export async function saveDeletedWallpaperIds(ids: string[]): Promise<void> {
  await setStoredItem<string[]>(STORAGE_KEYS.DELETED_WALLPAPER_IDS, ids);
}

// Auto-detect wallpaper type from single input string
export interface DetectionResult {
  type: WallpaperType;
  cleanedValue: string;
  previewStyle?: React.CSSProperties;
  label: string;
  badgeColor: string;
}

export function detectWallpaperType(rawInput: string): DetectionResult {
  const trimmed = (rawInput || '').trim();

  if (!trimmed) {
    return {
      type: 'image',
      cleanedValue: '',
      label: 'Chưa xác định',
      badgeColor: 'bg-slate-100 text-slate-500 border-slate-300',
    };
  }

  // 1. Local or Data URL Video
  if (trimmed.startsWith('data:video/')) {
    return {
      type: 'video',
      cleanedValue: trimmed,
      label: 'Tệp Video (Local)',
      badgeColor: 'bg-purple-100 text-purple-700 border-purple-300',
    };
  }

  // 2. Local or Data URL Image
  if (trimmed.startsWith('data:image/')) {
    return {
      type: 'image',
      cleanedValue: trimmed,
      previewStyle: {
        backgroundImage: `url('${trimmed}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      },
      label: 'Tệp Hình Ảnh (Local)',
      badgeColor: 'bg-emerald-100 text-emerald-700 border-emerald-300',
    };
  }

  // 3. Online Video Link: .mp4, .webm, .mov, etc.
  const videoExtRegex = /\.(mp4|webm|mov|ogg|m4v)(\?.*)?$/i;
  if (
    videoExtRegex.test(trimmed) ||
    trimmed.includes('/video/') ||
    trimmed.includes('strvid.') ||
    (trimmed.includes('cdn.scena.ai') && trimmed.endsWith('.mp4'))
  ) {
    return {
      type: 'video',
      cleanedValue: trimmed,
      label: 'Link Video Trực Tuyến',
      badgeColor: 'bg-blue-100 text-blue-700 border-blue-300',
    };
  }

  // 4. CSS Code (Gradients, Colors, Background shorthand)
  let cssCandidate = trimmed;
  if (/^background\s*:/i.test(cssCandidate)) {
    cssCandidate = cssCandidate.replace(/^background\s*:\s*/i, '').replace(/;$/, '').trim();
  } else if (/^background-image\s*:/i.test(cssCandidate)) {
    cssCandidate = cssCandidate.replace(/^background-image\s*:\s*/i, '').replace(/;$/, '').trim();
  } else if (/^background-color\s*:/i.test(cssCandidate)) {
    cssCandidate = cssCandidate.replace(/^background-color\s*:\s*/i, '').replace(/;$/, '').trim();
  }

  const isGradient =
    cssCandidate.includes('linear-gradient') ||
    cssCandidate.includes('radial-gradient') ||
    cssCandidate.includes('conic-gradient');

  if (isGradient) {
    return {
      type: 'gradient',
      cleanedValue: cssCandidate,
      previewStyle: { background: cssCandidate },
      label: 'Mã CSS Gradient',
      badgeColor: 'bg-fuchsia-100 text-fuchsia-700 border-fuchsia-300',
    };
  }

  // Hex or RGB or HSL Color
  const isColor =
    /^#([0-9a-fA-F]{3,8})$/.test(cssCandidate) ||
    /^rgba?\([^)]+\)$/i.test(cssCandidate) ||
    /^hsla?\([^)]+\)$/i.test(cssCandidate);

  if (isColor) {
    return {
      type: 'color',
      cleanedValue: cssCandidate,
      previewStyle: { background: cssCandidate },
      label: 'Mã CSS Màu Sắc',
      badgeColor: 'bg-amber-100 text-amber-700 border-amber-300',
    };
  }

  // Check if it's a CSS statement with url(...)
  if (/url\(["']?https?:\/\/[^"')]+["']?\)/i.test(trimmed)) {
    const match = trimmed.match(/url\(["']?(https?:\/\/[^"')]+)["']?\)/i);
    const extractedUrl = match ? match[1] : trimmed;
    return {
      type: 'image',
      cleanedValue: extractedUrl,
      previewStyle: {
        backgroundImage: `url('${extractedUrl}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      },
      label: 'Link Hình Ảnh (từ CSS)',
      badgeColor: 'bg-teal-100 text-teal-700 border-teal-300',
    };
  }

  // 5. Online Image Link
  const isHttpUrl = trimmed.startsWith('http://') || trimmed.startsWith('https://');
  if (isHttpUrl) {
    return {
      type: 'image',
      cleanedValue: trimmed,
      previewStyle: {
        backgroundImage: `url('${trimmed}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      },
      label: 'Link Hình Ảnh Trực Tuyến',
      badgeColor: 'bg-teal-100 text-teal-700 border-teal-300',
    };
  }

  // 6. Generic CSS fallback
  return {
    type: 'css',
    cleanedValue: cssCandidate,
    previewStyle: { background: cssCandidate },
    label: 'Mã CSS Tùy Chỉnh',
    badgeColor: 'bg-indigo-100 text-indigo-700 border-indigo-300',
  };
}

// Export custom wallpapers as a downloadable JSON file
export function exportWallpapersToJsonFile(wallpapers: WallpaperOption[]): void {
  try {
    const exportData = {
      version: '1.0',
      exportedAt: new Date().toISOString(),
      generator: 'Hung Thai Executive Portal',
      wallpapers,
    };

    const jsonStr = JSON.stringify(exportData, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `hung-thai-wallpapers-${Date.now()}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (err) {
    console.error('Failed to export wallpapers JSON:', err);
    throw err;
  }
}

// Parse imported JSON and return validated WallpaperOption array
export function parseWallpapersJson(jsonString: string): { wallpapers: WallpaperOption[]; selectedId?: string } {
  try {
    const parsed = JSON.parse(jsonString);
    let rawList: unknown[] = [];

    if (Array.isArray(parsed)) {
      rawList = parsed;
    } else if (parsed && typeof parsed === 'object') {
      const p = parsed as Record<string, unknown>;
      if (Array.isArray(p.wallpapers)) {
        rawList = [...rawList, ...p.wallpapers];
      }
      if (Array.isArray(p.customWallpapers)) {
        rawList = [...rawList, ...p.customWallpapers];
      }
      if (Array.isArray(p.allLinks)) {
        rawList = [...rawList, ...p.allLinks];
      }
    }

    if (!Array.isArray(rawList) || rawList.length === 0) {
      throw new Error('Định dạng JSON không hợp lệ: Cần một danh sách hình nền.');
    }

    const validated: WallpaperOption[] = [];
    const seenIds = new Set<string>();

    for (const rawItem of rawList) {
      if (!rawItem || typeof rawItem !== 'object') continue;
      const item = rawItem as Record<string, unknown>;

      const id = String(item.id || `custom-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`);
      if (seenIds.has(id)) continue;
      seenIds.add(id);

      const name = String(item.name || `Hình nền tùy chỉnh`);
      let type: WallpaperType = (item.type as WallpaperType) || 'image';

      // Normalize types
      if (type === ('codepen' as unknown) || type === ('floating-particles' as unknown)) {
        type = 'image';
      } else if (item.cssCode || type === 'css') {
        type = 'css';
      }

      let value = String(item.value || item.cssCode || item.url || item.previewUrl || '');
      const previewUrl = item.previewUrl ? String(item.previewUrl) : '';

      // Normalize beach / relative shorthand
      if (value === 'beach' || (!value.startsWith('http') && !value.startsWith('data:') && !value.includes('gradient') && !value.includes('background') && !value.startsWith('#'))) {
        if (previewUrl && previewUrl.startsWith('http')) {
          value = previewUrl.replace('w=200', 'w=2000').replace('w=400', 'w=2000');
        }
      }

      let previewStyle: React.CSSProperties | undefined = (item.previewStyle as React.CSSProperties) || undefined;
      if (!previewStyle) {
        if (type === 'css' || type === 'gradient' || type === 'color') {
          previewStyle = { background: String(item.cssCode || value) };
        } else if (previewUrl && previewUrl.startsWith('http')) {
          previewStyle = {
            backgroundImage: `url('${previewUrl}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          };
        } else if (value.startsWith('http')) {
          previewStyle = {
            backgroundImage: `url('${value}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          };
        }
      }

      validated.push({
        id,
        name,
        type,
        value,
        previewStyle,
        className: item.className ? String(item.className) : undefined,
        isCustom: true,
        createdAt: typeof item.createdAt === 'number' ? item.createdAt : Date.now(),
      });
    }

    const selectedId =
      parsed && typeof parsed === 'object' && 'selectedWallpaperId' in parsed
        ? String((parsed as Record<string, unknown>).selectedWallpaperId)
        : undefined;

    return { wallpapers: validated, selectedId };
  } catch (err) {
    console.error('JSON parsing error:', err);
    throw new Error('Tệp JSON không đúng định dạng hình nền.');
  }
}

// Helper to find a wallpaper by ID from built-in and custom list
export function findWallpaperById(
  id: string,
  customList: WallpaperOption[]
): WallpaperOption | undefined {
  return customList.find((w) => w.id === id) || WALLPAPER_OPTIONS.find((w) => w.id === id);
}
