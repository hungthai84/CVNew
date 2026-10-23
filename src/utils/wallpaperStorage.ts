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
  FAVORITE_WALLPAPER_IDS: 'hungthai_favorite_wallpaper_ids',
  WALLPAPER_SETTINGS: 'hungthai_wallpaper_advanced_settings',
};

export type CinematicLutPresetId = 'none' | 'cyberpunk' | 'vintage' | 'nordic' | 'golden' | 'noir';

export interface CinematicLutPreset {
  id: CinematicLutPresetId;
  name: string;
  shortLabel: string;
  cssFilter: string;
  tintOverlay: string;
  mixBlendMode?: React.CSSProperties['mixBlendMode'];
  badgeColor: string;
}

export const CINEMATIC_LUT_PRESETS: CinematicLutPreset[] = [
  {
    id: 'none',
    name: 'Nguyên Bản (Original)',
    shortLabel: 'Gốc',
    cssFilter: 'none',
    tintOverlay: 'transparent',
    badgeColor: 'bg-slate-600 text-white',
  },
  {
    id: 'cyberpunk',
    name: 'Cyberpunk Teal & Orange',
    shortLabel: 'Cyberpunk',
    cssFilter: 'contrast(1.16) saturate(1.35) brightness(0.97) hue-rotate(-6deg)',
    tintOverlay:
      'linear-gradient(135deg, rgba(6, 182, 212, 0.24) 0%, rgba(15, 23, 42, 0.08) 50%, rgba(249, 115, 22, 0.24) 100%)',
    mixBlendMode: 'overlay',
    badgeColor: 'bg-cyan-600 text-white',
  },
  {
    id: 'vintage',
    name: 'Vintage Film Kodak',
    shortLabel: 'Vintage Film',
    cssFilter: 'sepia(0.34) contrast(1.06) brightness(0.96) saturate(0.88)',
    tintOverlay:
      'radial-gradient(circle at 50% 50%, rgba(251, 191, 36, 0.12) 0%, rgba(120, 53, 15, 0.26) 100%)',
    mixBlendMode: 'soft-light',
    badgeColor: 'bg-amber-700 text-white',
  },
  {
    id: 'nordic',
    name: 'Nordic Cold Arctic',
    shortLabel: 'Nordic Cold',
    cssFilter: 'saturate(0.76) contrast(1.12) brightness(1.03) hue-rotate(8deg)',
    tintOverlay:
      'linear-gradient(180deg, rgba(56, 189, 248, 0.18) 0%, rgba(30, 58, 138, 0.16) 100%)',
    mixBlendMode: 'screen',
    badgeColor: 'bg-sky-600 text-white',
  },
  {
    id: 'golden',
    name: 'Warm Golden Hour',
    shortLabel: 'Golden Hour',
    cssFilter: 'sepia(0.22) saturate(1.34) contrast(1.08) brightness(1.02)',
    tintOverlay:
      'linear-gradient(145deg, rgba(251, 146, 60, 0.24) 0%, rgba(236, 72, 153, 0.14) 60%, rgba(120, 53, 15, 0.12) 100%)',
    mixBlendMode: 'soft-light',
    badgeColor: 'bg-orange-500 text-white',
  },
  {
    id: 'noir',
    name: 'Neo-Noir Cinema',
    shortLabel: 'Neo-Noir',
    cssFilter: 'grayscale(0.74) contrast(1.26) brightness(0.92)',
    tintOverlay:
      'radial-gradient(circle at 50% 50%, transparent 35%, rgba(2, 6, 23, 0.42) 100%)',
    mixBlendMode: 'multiply',
    badgeColor: 'bg-slate-900 text-white',
  },
];

export interface WallpaperAdvancedSettings {
  dimmerOpacity: number; // 0 - 80 (%)
  blurAmount: number; // 0 - 24 (px)
  parallaxEnabled: boolean;
  dayNightEnabled: boolean;
  dayWallpaperId: string;
  nightWallpaperId: string;
  slideshowEnabled: boolean;
  slideshowIntervalMinutes: number; // 0.5, 1, 3, 5
  slideshowFavoritesOnly: boolean;
  weatherSyncEnabled: boolean;
  autoAccentGlow: boolean;
  cinematicLut: CinematicLutPresetId;
  livingMeshEnabled: boolean;
  livingMeshSpeed: 'slow' | 'normal' | 'fast';
  ambientSoundEnabled: boolean;
  ambientSoundMode: 'auto' | 'rain' | 'ocean' | 'forest' | 'cosmos';
  ambientSoundVolume: number; // 0 - 100
  pomodoroFocusMinutes: number; // 15, 25, 45
  pomodoroBreakMinutes: number; // 5, 10, 15
  pomodoroFocusWallpaperId: string;
  pomodoroBreakWallpaperId: string;
}

export const DEFAULT_WALLPAPER_SETTINGS: WallpaperAdvancedSettings = {
  dimmerOpacity: 0,
  blurAmount: 0,
  parallaxEnabled: true,
  dayNightEnabled: false,
  dayWallpaperId: 'aurora',
  nightWallpaperId: 'css-aurora-borealis',
  slideshowEnabled: false,
  slideshowIntervalMinutes: 3,
  slideshowFavoritesOnly: false,
  weatherSyncEnabled: false,
  autoAccentGlow: true,
  cinematicLut: 'none',
  livingMeshEnabled: true,
  livingMeshSpeed: 'normal',
  ambientSoundEnabled: false,
  ambientSoundMode: 'auto',
  ambientSoundVolume: 45,
  pomodoroFocusMinutes: 25,
  pomodoroBreakMinutes: 5,
  pomodoroFocusWallpaperId: 'css-deep-space',
  pomodoroBreakWallpaperId: 'aurora',
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

// Split CSS declarations by semicolon outside parentheses and quotes
function splitCssDeclarations(cssText: string): string[] {
  const result: string[] = [];
  let current = '';
  let parenDepth = 0;
  let inSingleQuote = false;
  let inDoubleQuote = false;

  for (let i = 0; i < cssText.length; i++) {
    const ch = cssText[i];
    const prev = i > 0 ? cssText[i - 1] : '';

    if (ch === "'" && !inDoubleQuote && prev !== '\\') {
      inSingleQuote = !inSingleQuote;
      current += ch;
    } else if (ch === '"' && !inSingleQuote && prev !== '\\') {
      inDoubleQuote = !inDoubleQuote;
      current += ch;
    } else if (!inSingleQuote && !inDoubleQuote) {
      if (ch === '(') {
        parenDepth++;
        current += ch;
      } else if (ch === ')') {
        parenDepth = Math.max(0, parenDepth - 1);
        current += ch;
      } else if (ch === ';' && parenDepth === 0) {
        if (current.trim()) {
          result.push(current.trim());
        }
        current = '';
      } else {
        current += ch;
      }
    } else {
      current += ch;
    }
  }

  if (current.trim()) {
    result.push(current.trim());
  }

  return result;
}

const ALLOWED_WALLPAPER_STYLE_PROPS: Record<string, keyof React.CSSProperties> = {
  background: 'background',
  'background-color': 'backgroundColor',
  backgroundcolor: 'backgroundColor',
  'background-image': 'backgroundImage',
  backgroundimage: 'backgroundImage',
  'background-size': 'backgroundSize',
  backgroundsize: 'backgroundSize',
  'background-position': 'backgroundPosition',
  backgroundposition: 'backgroundPosition',
  'background-repeat': 'backgroundRepeat',
  backgroundrepeat: 'backgroundRepeat',
  'background-attachment': 'backgroundAttachment',
  backgroundattachment: 'backgroundAttachment',
  'background-blend-mode': 'backgroundBlendMode',
  backgroundblendmode: 'backgroundBlendMode',
  'box-shadow': 'boxShadow',
  boxshadow: 'boxShadow',
  filter: 'filter',
  opacity: 'opacity',
  'mix-blend-mode': 'mixBlendMode',
  mixblendmode: 'mixBlendMode',
};

function cleanCssPropertyValue(val: string): string {
  return val
    .replace(/!important/gi, '')
    .replace(/;+\s*$/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

// Convert raw CSS string (single value or multi-property CSS block) into clean React.CSSProperties without semicolons
export function parseCssToReactStyle(
  rawCss: string,
  fallbackStyle?: React.CSSProperties
): React.CSSProperties {
  const styleObj: Record<string, string | number> = {};

  if (fallbackStyle && typeof fallbackStyle === 'object') {
    for (const [k, v] of Object.entries(fallbackStyle)) {
      if (typeof v === 'string') {
        const trimmedVal = v.trim();
        if (!trimmedVal.includes(';') && !/^[a-zA-Z-]+\s*:/.test(trimmedVal)) {
          styleObj[k] = cleanCssPropertyValue(trimmedVal);
        }
      } else if (typeof v === 'number') {
        styleObj[k] = v;
      }
    }
  }

  const trimmed = (rawCss || '').trim();
  if (!trimmed) {
    return styleObj as React.CSSProperties;
  }

  // Strip CSS comments
  let cleanedBlock = trimmed.replace(/\/\*[\s\S]*?\*\//g, '');

  // Strip nested rules like @keyframes {...} or &::before {...}
  cleanedBlock = cleanedBlock.replace(/@keyframes[^{]+\{(?:[^{}]*|\{[^{}]*\})*\}/gi, '');
  cleanedBlock = cleanedBlock.replace(/[^{};]+\{[^{}]*\}/g, '');
  cleanedBlock = cleanedBlock.trim();

  if (!cleanedBlock) {
    return styleObj as React.CSSProperties;
  }

  const declarations = splitCssDeclarations(cleanedBlock);
  let matchedAnyDeclaration = false;

  for (const decl of declarations) {
    const propMatch = decl.match(/^([a-zA-Z-]+)\s*:\s*([\s\S]+)$/);
    if (propMatch) {
      const rawProp = propMatch[1].toLowerCase().trim();
      if (rawProp !== 'http' && rawProp !== 'https' && rawProp !== 'data' && rawProp !== 'blob') {
        matchedAnyDeclaration = true;
        const mappedKey = ALLOWED_WALLPAPER_STYLE_PROPS[rawProp];
        if (mappedKey) {
          const cleanVal = cleanCssPropertyValue(propMatch[2]);
          if (cleanVal && !cleanVal.includes(';')) {
            styleObj[mappedKey as string] = cleanVal;
          }
        }
      }
    }
  }

  if (!matchedAnyDeclaration) {
    const singleVal = cleanCssPropertyValue(cleanedBlock);
    if (singleVal && !singleVal.includes(';')) {
      const isSolidColor =
        /^#([0-9a-fA-F]{3,8})$/.test(singleVal) ||
        /^rgba?\([^)]+\)$/i.test(singleVal) ||
        /^hsla?\([^)]+\)$/i.test(singleVal);
      if (isSolidColor) {
        styleObj.backgroundColor = singleVal;
        delete styleObj.background;
      } else {
        styleObj.background = singleVal;
      }
    }
  }

  // Avoid React shorthand/longhand conflict between `background` and `backgroundImage` / `backgroundSize` / `backgroundColor`
  if (
    styleObj.background &&
    (styleObj.backgroundImage ||
      styleObj.backgroundSize ||
      styleObj.backgroundPosition ||
      styleObj.backgroundRepeat ||
      styleObj.backgroundColor)
  ) {
    const bgVal = String(styleObj.background).trim();
    const isSolidColor =
      /^#([0-9a-fA-F]{3,8})$/.test(bgVal) ||
      /^rgba?\([^)]+\)$/i.test(bgVal) ||
      /^hsla?\([^)]+\)$/i.test(bgVal);
    if (isSolidColor && !styleObj.backgroundColor) {
      styleObj.backgroundColor = bgVal;
    } else if (!isSolidColor && !styleObj.backgroundImage) {
      styleObj.backgroundImage = bgVal;
    }
    delete styleObj.background;
  }

  return styleObj as React.CSSProperties;
}

// Sanitize any existing React.CSSProperties object so no value contains semicolons or raw CSS declarations
export function sanitizeWallpaperStyle(
  style?: React.CSSProperties,
  fallbackCss?: string
): React.CSSProperties {
  if (!style || typeof style !== 'object') {
    return fallbackCss ? parseCssToReactStyle(fallbackCss) : {};
  }

  const sanitized: Record<string, string | number> = {};

  for (const [key, rawVal] of Object.entries(style)) {
    if (typeof rawVal === 'number') {
      sanitized[key] = rawVal;
      continue;
    }
    if (typeof rawVal !== 'string') continue;

    const trimmed = rawVal.trim();
    if (!trimmed) continue;

    // Check if value accidentally contains raw CSS declarations (e.g. "background: ..." or semicolons outside data URLs)
    const hasDeclarationPrefix = /^(background|background-color|background-image|background-size)\s*:/i.test(trimmed);
    const hasSemicolonOutsideDataUrl =
      trimmed.includes(';') && !/^url\(['"]?data:/i.test(trimmed);

    if (hasDeclarationPrefix || hasSemicolonOutsideDataUrl) {
      const parsed = parseCssToReactStyle(trimmed);
      Object.assign(sanitized, parsed);
    } else {
      sanitized[key] = cleanCssPropertyValue(trimmed);
    }
  }

  // Resolve shorthand/longhand conflict if present
  if (
    sanitized.background &&
    (sanitized.backgroundImage ||
      sanitized.backgroundSize ||
      sanitized.backgroundPosition ||
      sanitized.backgroundRepeat ||
      sanitized.backgroundColor)
  ) {
    const bgVal = String(sanitized.background).trim();
    const isSolidColor =
      /^#([0-9a-fA-F]{3,8})$/.test(bgVal) ||
      /^rgba?\([^)]+\)$/i.test(bgVal) ||
      /^hsla?\([^)]+\)$/i.test(bgVal);
    if (isSolidColor && !sanitized.backgroundColor) {
      sanitized.backgroundColor = bgVal;
    } else if (!isSolidColor && !sanitized.backgroundImage) {
      sanitized.backgroundImage = bgVal;
    }
    delete sanitized.background;
  }

  if (Object.keys(sanitized).length === 0 && fallbackCss) {
    return parseCssToReactStyle(fallbackCss);
  }

  return sanitized as React.CSSProperties;
}

// Load custom wallpapers and automatically sanitize any legacy previewStyle objects
export async function loadCustomWallpapers(): Promise<WallpaperOption[]> {
  const list = await getStoredItem<WallpaperOption[]>(STORAGE_KEYS.CUSTOM_WALLPAPERS, []);
  if (!Array.isArray(list)) return [];

  let modified = false;
  const cleaned = list.map((wp) => {
    if (!wp || typeof wp !== 'object') return wp;
    const rawBg = wp.previewStyle?.background ? String(wp.previewStyle.background) : '';
    const needsSanitize =
      rawBg.includes(';') ||
      rawBg.includes('\n') ||
      /^(background|background-color|background-image)\s*:/i.test(rawBg.trim());

    const safePreview = sanitizeWallpaperStyle(
      wp.previewStyle,
      wp.type === 'css' || wp.type === 'gradient' || wp.type === 'color' ? wp.value : undefined
    );

    if (needsSanitize) {
      modified = true;
    }

    return {
      ...wp,
      previewStyle: safePreview,
    };
  });

  if (modified) {
    await setStoredItem(STORAGE_KEYS.CUSTOM_WALLPAPERS, cleaned);
  }

  return cleaned;
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

// Load favorite wallpaper IDs (for Favorite Playlist & Slideshow)
export async function loadFavoriteWallpaperIds(): Promise<string[]> {
  const list = await getStoredItem<string[]>(STORAGE_KEYS.FAVORITE_WALLPAPER_IDS, [
    'aurora',
    'css-aurora-borealis',
    'css-sunset-mesh',
    'css-deep-space',
  ]);
  return Array.isArray(list) ? list : [];
}

// Save favorite wallpaper IDs
export async function saveFavoriteWallpaperIds(ids: string[]): Promise<void> {
  await setStoredItem<string[]>(STORAGE_KEYS.FAVORITE_WALLPAPER_IDS, ids);
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

  // 4. CSS Code (Gradients, Colors, Background shorthand, or multi-line CSS declarations)
  const isMultiPropertyCss =
    trimmed.includes(';') ||
    /^(background|background-color|background-image|background-size)\s*:/im.test(trimmed);

  if (isMultiPropertyCss) {
    const parsedStyle = parseCssToReactStyle(trimmed);
    const hasGradient =
      trimmed.includes('linear-gradient') ||
      trimmed.includes('radial-gradient') ||
      trimmed.includes('conic-gradient');
    return {
      type: hasGradient && !trimmed.includes(';') ? 'gradient' : 'css',
      cleanedValue: trimmed,
      previewStyle: parsedStyle,
      label: hasGradient ? 'Mã CSS Gradient' : 'Mã CSS Tùy Chỉnh',
      badgeColor: hasGradient
        ? 'bg-fuchsia-100 text-fuchsia-700 border-fuchsia-300'
        : 'bg-indigo-100 text-indigo-700 border-indigo-300',
    };
  }

  const isGradient =
    trimmed.includes('linear-gradient') ||
    trimmed.includes('radial-gradient') ||
    trimmed.includes('conic-gradient');

  if (isGradient) {
    const parsedStyle = parseCssToReactStyle(trimmed);
    return {
      type: 'gradient',
      cleanedValue: cleanCssPropertyValue(trimmed),
      previewStyle: parsedStyle,
      label: 'Mã CSS Gradient',
      badgeColor: 'bg-fuchsia-100 text-fuchsia-700 border-fuchsia-300',
    };
  }

  // Hex or RGB or HSL Color
  const isColor =
    /^#([0-9a-fA-F]{3,8})$/.test(trimmed) ||
    /^rgba?\([^)]+\)$/i.test(trimmed) ||
    /^hsla?\([^)]+\)$/i.test(trimmed);

  if (isColor) {
    const cleanColor = cleanCssPropertyValue(trimmed);
    return {
      type: 'color',
      cleanedValue: cleanColor,
      previewStyle: { backgroundColor: cleanColor },
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
    cleanedValue: trimmed,
    previewStyle: parseCssToReactStyle(trimmed),
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

      let previewStyle: React.CSSProperties | undefined = item.previewStyle
        ? sanitizeWallpaperStyle(
            item.previewStyle as React.CSSProperties,
            type === 'css' || type === 'gradient' || type === 'color' ? String(item.cssCode || value) : undefined
          )
        : undefined;

      if (!previewStyle || Object.keys(previewStyle).length === 0) {
        if (type === 'css' || type === 'gradient' || type === 'color') {
          previewStyle = parseCssToReactStyle(String(item.cssCode || value));
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

// Load advanced wallpaper settings (dimmer, blur, parallax, day/night, slideshow)
export async function loadWallpaperSettings(): Promise<WallpaperAdvancedSettings> {
  const stored = await getStoredItem<Partial<WallpaperAdvancedSettings>>(
    STORAGE_KEYS.WALLPAPER_SETTINGS,
    DEFAULT_WALLPAPER_SETTINGS
  );
  if (!stored || typeof stored !== 'object') {
    return { ...DEFAULT_WALLPAPER_SETTINGS };
  }
  return {
    dimmerOpacity:
      typeof stored.dimmerOpacity === 'number'
        ? Math.min(80, Math.max(0, stored.dimmerOpacity))
        : DEFAULT_WALLPAPER_SETTINGS.dimmerOpacity,
    blurAmount:
      typeof stored.blurAmount === 'number'
        ? Math.min(24, Math.max(0, stored.blurAmount))
        : DEFAULT_WALLPAPER_SETTINGS.blurAmount,
    parallaxEnabled:
      typeof stored.parallaxEnabled === 'boolean'
        ? stored.parallaxEnabled
        : DEFAULT_WALLPAPER_SETTINGS.parallaxEnabled,
    dayNightEnabled:
      typeof stored.dayNightEnabled === 'boolean'
        ? stored.dayNightEnabled
        : DEFAULT_WALLPAPER_SETTINGS.dayNightEnabled,
    dayWallpaperId:
      typeof stored.dayWallpaperId === 'string' && stored.dayWallpaperId
        ? stored.dayWallpaperId
        : DEFAULT_WALLPAPER_SETTINGS.dayWallpaperId,
    nightWallpaperId:
      typeof stored.nightWallpaperId === 'string' && stored.nightWallpaperId
        ? stored.nightWallpaperId
        : DEFAULT_WALLPAPER_SETTINGS.nightWallpaperId,
    slideshowEnabled:
      typeof stored.slideshowEnabled === 'boolean'
        ? stored.slideshowEnabled
        : DEFAULT_WALLPAPER_SETTINGS.slideshowEnabled,
    slideshowIntervalMinutes:
      typeof stored.slideshowIntervalMinutes === 'number' && stored.slideshowIntervalMinutes > 0
        ? stored.slideshowIntervalMinutes
        : DEFAULT_WALLPAPER_SETTINGS.slideshowIntervalMinutes,
    slideshowFavoritesOnly:
      typeof stored.slideshowFavoritesOnly === 'boolean'
        ? stored.slideshowFavoritesOnly
        : DEFAULT_WALLPAPER_SETTINGS.slideshowFavoritesOnly,
    weatherSyncEnabled:
      typeof stored.weatherSyncEnabled === 'boolean'
        ? stored.weatherSyncEnabled
        : DEFAULT_WALLPAPER_SETTINGS.weatherSyncEnabled,
    autoAccentGlow:
      typeof stored.autoAccentGlow === 'boolean'
        ? stored.autoAccentGlow
        : DEFAULT_WALLPAPER_SETTINGS.autoAccentGlow,
    cinematicLut:
      stored.cinematicLut === 'cyberpunk' ||
      stored.cinematicLut === 'vintage' ||
      stored.cinematicLut === 'nordic' ||
      stored.cinematicLut === 'golden' ||
      stored.cinematicLut === 'noir' ||
      stored.cinematicLut === 'none'
        ? stored.cinematicLut
        : DEFAULT_WALLPAPER_SETTINGS.cinematicLut,
    livingMeshEnabled:
      typeof stored.livingMeshEnabled === 'boolean'
        ? stored.livingMeshEnabled
        : DEFAULT_WALLPAPER_SETTINGS.livingMeshEnabled,
    livingMeshSpeed:
      stored.livingMeshSpeed === 'slow' ||
      stored.livingMeshSpeed === 'normal' ||
      stored.livingMeshSpeed === 'fast'
        ? stored.livingMeshSpeed
        : DEFAULT_WALLPAPER_SETTINGS.livingMeshSpeed,
    ambientSoundEnabled:
      typeof stored.ambientSoundEnabled === 'boolean'
        ? stored.ambientSoundEnabled
        : DEFAULT_WALLPAPER_SETTINGS.ambientSoundEnabled,
    ambientSoundMode:
      stored.ambientSoundMode === 'auto' ||
      stored.ambientSoundMode === 'rain' ||
      stored.ambientSoundMode === 'ocean' ||
      stored.ambientSoundMode === 'forest' ||
      stored.ambientSoundMode === 'cosmos'
        ? stored.ambientSoundMode
        : DEFAULT_WALLPAPER_SETTINGS.ambientSoundMode,
    ambientSoundVolume:
      typeof stored.ambientSoundVolume === 'number'
        ? Math.min(100, Math.max(0, stored.ambientSoundVolume))
        : DEFAULT_WALLPAPER_SETTINGS.ambientSoundVolume,
    pomodoroFocusMinutes:
      typeof stored.pomodoroFocusMinutes === 'number' && stored.pomodoroFocusMinutes > 0
        ? stored.pomodoroFocusMinutes
        : DEFAULT_WALLPAPER_SETTINGS.pomodoroFocusMinutes,
    pomodoroBreakMinutes:
      typeof stored.pomodoroBreakMinutes === 'number' && stored.pomodoroBreakMinutes > 0
        ? stored.pomodoroBreakMinutes
        : DEFAULT_WALLPAPER_SETTINGS.pomodoroBreakMinutes,
    pomodoroFocusWallpaperId:
      typeof stored.pomodoroFocusWallpaperId === 'string' && stored.pomodoroFocusWallpaperId
        ? stored.pomodoroFocusWallpaperId
        : DEFAULT_WALLPAPER_SETTINGS.pomodoroFocusWallpaperId,
    pomodoroBreakWallpaperId:
      typeof stored.pomodoroBreakWallpaperId === 'string' && stored.pomodoroBreakWallpaperId
        ? stored.pomodoroBreakWallpaperId
        : DEFAULT_WALLPAPER_SETTINGS.pomodoroBreakWallpaperId,
  };
}

// Save advanced wallpaper settings
export async function saveWallpaperSettings(settings: WallpaperAdvancedSettings): Promise<void> {
  await setStoredItem<WallpaperAdvancedSettings>(STORAGE_KEYS.WALLPAPER_SETTINGS, settings);
}

// Format a clean, copy-ready CSS snippet for any CSS / Gradient / Color wallpaper
export function formatWallpaperCssSnippet(wp: WallpaperOption): string {
  const raw = (wp.value || '').trim();
  if (!raw) {
    if (wp.previewStyle?.background) {
      return `background: ${wp.previewStyle.background};`;
    }
    return '';
  }

  // If it's a built-in class like aurora-bg, use its previewStyle background if available
  if (wp.type === 'class' && wp.previewStyle?.background) {
    return `/* ${wp.name} */\nbackground: ${wp.previewStyle.background};`;
  }

  // If it already contains CSS property declarations like "background:" or "background-color:"
  if (/^(background|background-color|background-image)\s*:/im.test(raw)) {
    const endsWithSemicolon = raw.endsWith(';') || raw.endsWith('}');
    return `/* ${wp.name} */\n${raw}${endsWithSemicolon ? '' : ';'}`;
  }

  // Otherwise wrap in standard `background: ...;`
  const cleanVal = raw.replace(/;+\s*$/g, '');
  return `/* ${wp.name} */\nbackground: ${cleanVal};`;
}

// Convert Hex color to "r, g, b" string
function hexToRgbTuple(hex: string): { r: number; g: number; b: number } | null {
  const cleaned = hex.replace(/^#/, '').trim();
  if (cleaned.length === 3) {
    const r = parseInt(cleaned[0] + cleaned[0], 16);
    const g = parseInt(cleaned[1] + cleaned[1], 16);
    const b = parseInt(cleaned[2] + cleaned[2], 16);
    if (!Number.isNaN(r) && !Number.isNaN(g) && !Number.isNaN(b)) return { r, g, b };
  } else if (cleaned.length >= 6) {
    const r = parseInt(cleaned.slice(0, 2), 16);
    const g = parseInt(cleaned.slice(2, 4), 16);
    const b = parseInt(cleaned.slice(4, 6), 16);
    if (!Number.isNaN(r) && !Number.isNaN(g) && !Number.isNaN(b)) return { r, g, b };
  }
  return null;
}

function rgbToHex(r: number, g: number, b: number): string {
  const clamp = (n: number) => Math.max(0, Math.min(255, Math.round(n)));
  return (
    '#' +
    [clamp(r), clamp(g), clamp(b)]
      .map((x) => x.toString(16).padStart(2, '0'))
      .join('')
  );
}

// Boost overly dark or desaturated colors so the card glow remains vibrant and visible
function ensureVibrantAccent(r: number, g: number, b: number): { hex: string; rgb: string } {
  const maxC = Math.max(r, g, b);
  const minC = Math.min(r, g, b);
  // If too dark (e.g. #05050d or #030014), lift towards electric indigo/cyan
  if (maxC < 65) {
    return { hex: '#6366f1', rgb: '99, 102, 241' };
  }
  // If almost pure white/gray, tint towards soft sky-indigo
  if (minC > 225 && maxC - minC < 20) {
    return { hex: '#38bdf8', rgb: '56, 189, 248' };
  }
  const hex = rgbToHex(r, g, b);
  return { hex, rgb: `${r}, ${g}, ${b}` };
}

// Auto-extract the dominant vibrant accent color from any WallpaperOption
export function extractWallpaperAccentColor(wp?: WallpaperOption): {
  hex: string;
  rgb: string;
  label: string;
} {
  if (!wp) {
    return { hex: '#6366f1', rgb: '99, 102, 241', label: 'Indigo Aura' };
  }

  // Known signature presets
  const idLower = wp.id.toLowerCase();
  if (idLower.includes('aurora')) {
    return { hex: '#10b981', rgb: '16, 185, 129', label: 'Emerald Aurora' };
  }
  if (idLower.includes('cyber') || idLower.includes('neon')) {
    return { hex: '#00f2fe', rgb: '0, 242, 254', label: 'Cyber Cyan' };
  }
  if (idLower.includes('sunset')) {
    return { hex: '#ff5e62', rgb: '255, 94, 98', label: 'Sunset Coral' };
  }
  if (idLower.includes('space') || idLower.includes('cosmic') || idLower.includes('night')) {
    return { hex: '#8b5cf6', rgb: '139, 92, 246', label: 'Cosmic Violet' };
  }
  if (idLower.includes('emerald') || idLower.includes('rainforest')) {
    return { hex: '#10b981', rgb: '16, 185, 129', label: 'Emerald Matrix' };
  }
  if (idLower.includes('ocean')) {
    return { hex: '#0ea5e9', rgb: '14, 165, 233', label: 'Ocean Azure' };
  }
  if (idLower.includes('autumn')) {
    return { hex: '#f59e0b', rgb: '245, 158, 11', label: 'Golden Amber' };
  }

  // Search for hex colors in value & previewStyle
  const combinedSource = [
    wp.value || '',
    typeof wp.previewStyle?.background === 'string' ? wp.previewStyle.background : '',
    typeof wp.previewStyle?.backgroundImage === 'string' ? wp.previewStyle.backgroundImage : '',
    typeof wp.previewStyle?.backgroundColor === 'string' ? wp.previewStyle.backgroundColor : '',
  ].join(' ');

  const hexMatches = combinedSource.match(/#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})\b/g);
  if (hexMatches && hexMatches.length > 0) {
    // Pick the first hex that isn't near-black or near-white
    for (const h of hexMatches) {
      const tuple = hexToRgbTuple(h);
      if (tuple) {
        const max = Math.max(tuple.r, tuple.g, tuple.b);
        const min = Math.min(tuple.r, tuple.g, tuple.b);
        if (max >= 75 && !(min > 230 && max - min < 15)) {
          const vibrant = ensureVibrantAccent(tuple.r, tuple.g, tuple.b);
          return { ...vibrant, label: vibrant.hex.toUpperCase() };
        }
      }
    }
    const fallbackTuple = hexToRgbTuple(hexMatches[0]);
    if (fallbackTuple) {
      const vibrant = ensureVibrantAccent(fallbackTuple.r, fallbackTuple.g, fallbackTuple.b);
      return { ...vibrant, label: vibrant.hex.toUpperCase() };
    }
  }

  // Check rgba(...) or rgb(...) matches
  const rgbMatch = combinedSource.match(/rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})/i);
  if (rgbMatch) {
    const r = Number(rgbMatch[1]);
    const g = Number(rgbMatch[2]);
    const b = Number(rgbMatch[3]);
    const vibrant = ensureVibrantAccent(r, g, b);
    return { ...vibrant, label: vibrant.hex.toUpperCase() };
  }

  // Deterministic vibrant palette for Video / Image wallpapers based on ID hash
  const palette = [
    { hex: '#ec4899', rgb: '236, 72, 153', label: 'Rose Magenta' },
    { hex: '#06b6d4', rgb: '6, 182, 212', label: 'Electric Cyan' },
    { hex: '#8b5cf6', rgb: '139, 92, 246', label: 'Royal Violet' },
    { hex: '#10b981', rgb: '16, 185, 129', label: 'Emerald Glow' },
    { hex: '#f59e0b', rgb: '245, 158, 11', label: 'Solar Amber' },
    { hex: '#3b82f6', rgb: '59, 130, 246', label: 'Sapphire Blue' },
  ];
  let hash = 0;
  for (let i = 0; i < wp.id.length; i++) {
    hash = (hash * 31 + wp.id.charCodeAt(i)) >>> 0;
  }
  return palette[hash % palette.length];
}

// Gradient Studio Preset Sharing (Compact Code + JSON + Visual QR Matrix)
export interface StudioPresetShareStop {
  color: string;
  position: number;
  x: number;
  y: number;
}

export interface StudioPresetSharePayload {
  name: string;
  mode: 'linear' | 'radial' | 'mesh';
  angle: number;
  baseColor: string;
  stops: StudioPresetShareStop[];
}

// Encode a Gradient Studio preset into a compact shareable string (HTG1:...)
export function encodeStudioPresetCode(payload: StudioPresetSharePayload): string {
  const modeChar = payload.mode === 'mesh' ? 'M' : payload.mode === 'radial' ? 'R' : 'L';
  const stopsPart = payload.stops
    .map((s) => `${s.color.replace('#', '')}@${Math.round(s.position)},${Math.round(s.x)},${Math.round(s.y)}`)
    .join('|');
  const safeName = encodeURIComponent((payload.name || 'Gradient Preset').slice(0, 40));
  return `HTG1:${modeChar}:${Math.round(payload.angle)}:${payload.baseColor.replace('#', '')}:${stopsPart}:${safeName}`;
}

// Decode either a compact HTG1:... string or a JSON string back into a StudioPresetSharePayload
export function decodeStudioPresetCode(rawInput: string): StudioPresetSharePayload | null {
  const trimmed = (rawInput || '').trim();
  if (!trimmed) return null;

  // 1. Check compact HTG1:... format
  if (trimmed.startsWith('HTG1:')) {
    try {
      const parts = trimmed.split(':');
      if (parts.length < 5) return null;
      const modeChar = parts[1];
      const mode: 'linear' | 'radial' | 'mesh' =
        modeChar === 'M' ? 'mesh' : modeChar === 'R' ? 'radial' : 'linear';
      const angle = Math.min(360, Math.max(0, Number(parts[2]) || 135));
      const baseColor = `#${parts[3].replace(/^#/, '')}`;
      const rawStops = parts[4].split('|').filter(Boolean);
      const stops: StudioPresetShareStop[] = rawStops.map((token) => {
        const [hexPart, coordsPart] = token.split('@');
        const [pos, x, y] = (coordsPart || '50,50,50').split(',').map((n) => Number(n));
        return {
          color: `#${(hexPart || '6366f1').replace(/^#/, '')}`,
          position: Number.isFinite(pos) ? Math.min(100, Math.max(0, pos)) : 50,
          x: Number.isFinite(x) ? Math.min(100, Math.max(0, x)) : 50,
          y: Number.isFinite(y) ? Math.min(100, Math.max(0, y)) : 50,
        };
      });
      if (stops.length < 2) return null;
      const name = parts[5] ? decodeURIComponent(parts.slice(5).join(':')) : 'Imported Studio Preset';
      return { name, mode, angle, baseColor, stops };
    } catch {
      return null;
    }
  }

  // 2. Try JSON format
  try {
    const parsed = JSON.parse(trimmed);
    if (!parsed || typeof parsed !== 'object') return null;
    const mode: 'linear' | 'radial' | 'mesh' =
      parsed.mode === 'linear' || parsed.mode === 'radial' || parsed.mode === 'mesh'
        ? parsed.mode
        : 'mesh';
    const angle = typeof parsed.angle === 'number' ? parsed.angle : 135;
    const baseColor = typeof parsed.baseColor === 'string' ? parsed.baseColor : '#070b19';
    if (!Array.isArray(parsed.stops) || parsed.stops.length < 2) return null;
    const stops: StudioPresetShareStop[] = parsed.stops.map((s: Record<string, unknown>) => ({
      color: typeof s.color === 'string' ? s.color : '#6366f1',
      position: typeof s.position === 'number' ? s.position : 50,
      x: typeof s.x === 'number' ? s.x : 50,
      y: typeof s.y === 'number' ? s.y : 50,
    }));
    return {
      name: typeof parsed.name === 'string' ? parsed.name : 'Imported Studio Preset',
      mode,
      angle,
      baseColor,
      stops,
    };
  } catch {
    return null;
  }
}

// Generate a crisp 25x25 QR-Code-styled visual matrix from any preset code string
export function generateQrMatrix(data: string, size = 25): boolean[][] {
  const matrix: boolean[][] = Array.from({ length: size }, () => Array(size).fill(false));
  const reserved: boolean[][] = Array.from({ length: size }, () => Array(size).fill(false));

  // Helper to place 7x7 finder pattern
  const placeFinder = (rowOffset: number, colOffset: number) => {
    for (let r = -1; r <= 7; r++) {
      for (let c = -1; c <= 7; c++) {
        const rr = rowOffset + r;
        const cc = colOffset + c;
        if (rr < 0 || rr >= size || cc < 0 || cc >= size) continue;
        reserved[rr][cc] = true;
        if (r >= 0 && r <= 6 && c >= 0 && c <= 6) {
          const isBorder = r === 0 || r === 6 || c === 0 || c === 6;
          const isInner = r >= 2 && r <= 4 && c >= 2 && c <= 4;
          matrix[rr][cc] = isBorder || isInner;
        } else {
          matrix[rr][cc] = false;
        }
      }
    }
  };

  placeFinder(0, 0);
  placeFinder(0, size - 7);
  placeFinder(size - 7, 0);

  // Timing patterns
  for (let i = 8; i < size - 8; i++) {
    reserved[6][i] = true;
    matrix[6][i] = i % 2 === 0;
    reserved[i][6] = true;
    matrix[i][6] = i % 2 === 0;
  }

  // Alignment pattern at bottom-right (5x5 centered at size-7, size-7)
  const alignCenter = size - 7;
  for (let r = -2; r <= 2; r++) {
    for (let c = -2; c <= 2; c++) {
      const rr = alignCenter + r;
      const cc = alignCenter + c;
      reserved[rr][cc] = true;
      const isBorder = Math.abs(r) === 2 || Math.abs(c) === 2;
      const isCenter = r === 0 && c === 0;
      matrix[rr][cc] = isBorder || isCenter;
    }
  }

  // Convert string into a bit stream + deterministic hash padding
  const bytes: number[] = [];
  for (let i = 0; i < data.length; i++) {
    bytes.push(data.charCodeAt(i) & 0xff);
  }
  if (bytes.length === 0) bytes.push(0x48, 0x54);

  let bitIdx = 0;
  let hashState = 2166136261;
  for (const b of bytes) {
    hashState ^= b;
    hashState = Math.imul(hashState, 16777619) >>> 0;
  }

  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (reserved[r][c]) continue;
      const byteVal = bytes[Math.floor(bitIdx / 8) % bytes.length];
      const bitOffset = 7 - (bitIdx % 8);
      const dataBit = ((byteVal >> bitOffset) & 1) === 1;
      const maskBit = ((r * 17 + c * 31 + (hashState >> (bitIdx % 16))) & 1) === 1;
      matrix[r][c] = dataBit !== maskBit;
      bitIdx++;
    }
  }

  return matrix;
}

// Render any Gradient Studio configuration (Mesh, Linear, or Radial) to a high-resolution 4K PNG (3840x2160)
export async function exportGradientStudioToPng(
  payload: StudioPresetSharePayload,
  width = 3840,
  height = 2160
): Promise<void> {
  if (typeof document === 'undefined') return;

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error('Trình duyệt không hỗ trợ Canvas 2D.');
  }

  const sortedStops = [...payload.stops].sort((a, b) => a.position - b.position);

  if (payload.mode === 'linear') {
    // Convert CSS angle (0deg = bottom-to-top, 90deg = left-to-right, 135deg = top-left to bottom-right)
    const rad = ((payload.angle - 90) * Math.PI) / 180;
    const cx = width / 2;
    const cy = height / 2;
    const halfDiag = Math.sqrt(width * width + height * height) / 2;
    const x0 = cx - Math.cos(rad) * halfDiag;
    const y0 = cy - Math.sin(rad) * halfDiag;
    const x1 = cx + Math.cos(rad) * halfDiag;
    const y1 = cy + Math.sin(rad) * halfDiag;

    const grad = ctx.createLinearGradient(x0, y0, x1, y1);
    for (const stop of sortedStops) {
      grad.addColorStop(Math.min(1, Math.max(0, stop.position / 100)), stop.color);
    }
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);
  } else if (payload.mode === 'radial') {
    const centerStop = payload.stops[0] || { x: 50, y: 50 };
    const cx = (centerStop.x / 100) * width;
    const cy = (centerStop.y / 100) * height;
    const maxRadius = Math.max(width, height) * 0.85;

    ctx.fillStyle = payload.baseColor || '#030014';
    ctx.fillRect(0, 0, width, height);

    const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, maxRadius);
    for (const stop of sortedStops) {
      grad.addColorStop(Math.min(1, Math.max(0, stop.position / 100)), stop.color);
    }
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);
  } else {
    // Multi-point Mesh Gradient rendering at 4K UHD
    ctx.fillStyle = payload.baseColor || '#070b19';
    ctx.fillRect(0, 0, width, height);

    const radius = Math.max(width, height) * 0.62;
    ctx.globalCompositeOperation = 'screen';

    for (const stop of payload.stops) {
      const cx = (stop.x / 100) * width;
      const cy = (stop.y / 100) * height;
      const rgb = hexToRgbTuple(stop.color) || { r: 99, g: 102, b: 241 };

      const radial = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
      radial.addColorStop(0, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.92)`);
      radial.addColorStop(0.45, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.45)`);
      radial.addColorStop(1, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0)`);

      ctx.fillStyle = radial;
      ctx.fillRect(0, 0, width, height);
    }

    ctx.globalCompositeOperation = 'source-over';
  }

  return new Promise<void>((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error('Không thể kết xuất tệp PNG.'));
          return;
        }
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        const safeSlug = (payload.name || 'gradient-4k')
          .toLowerCase()
          .replace(/[^a-z0-9-_]+/gi, '-')
          .replace(/^-+|-+$/g, '');
        link.href = url;
        link.download = `${safeSlug || 'hung-thai-gradient'}-${width}x${height}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        resolve();
      },
      'image/png',
      1.0
    );
  });
}




