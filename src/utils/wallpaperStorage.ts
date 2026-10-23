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
  WALLPAPER_SETTINGS: 'hungthai_wallpaper_advanced_settings',
};

export interface WallpaperAdvancedSettings {
  dimmerOpacity: number; // 0 - 80 (%)
  blurAmount: number; // 0 - 24 (px)
  parallaxEnabled: boolean;
  dayNightEnabled: boolean;
  dayWallpaperId: string;
  nightWallpaperId: string;
  slideshowEnabled: boolean;
  slideshowIntervalMinutes: number; // 0.5, 1, 3, 5
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


