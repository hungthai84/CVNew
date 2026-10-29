// Quản lý lưu trữ, áp dụng trực tiếp lên các trang, xuất file PNG/WebP 1920x360 (16:3) và tạo mã HTML/CSS
import {
  BannerConfig16x3,
  createDefaultBannerForPage,
  PAGE_BANNER_PRESETS,
} from '@/data/bannerStudioData';

const DB_NAME = 'HungThaiCV_BannerStudioDB';
const DB_VERSION = 1;
const STORE_NAME = 'bannerStudioStore';

const STORAGE_KEYS = {
  APPLIED_PAGE_BANNERS: 'hungthai_applied_page_banners_16x3',
  SAVED_BANNER_LIBRARY: 'hungthai_saved_banner_library_16x3',
  GLOBAL_BANNER_ENABLED: 'hungthai_global_banner_enabled_16x3',
};

export const BANNER_UPDATED_EVENT = 'hungthai-banner-16x3-updated';

function openBannerDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !('indexedDB' in window)) {
      reject(new Error('IndexedDB not supported'));
      return;
    }
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

async function idbGet<T>(key: string): Promise<T | null> {
  try {
    const db = await openBannerDB();
    return await new Promise<T | null>((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.get(key);
      req.onsuccess = () => resolve((req.result as T) ?? null);
      req.onerror = () => reject(req.error);
    });
  } catch {
    return null;
  }
}

async function idbSet<T>(key: string, value: T): Promise<void> {
  try {
    const db = await openBannerDB();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.put(value, key);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  } catch {
    // Fallback to localStorage handled by caller
  }
}

export function notifyBannerUpdated(): void {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(BANNER_UPDATED_EVENT));
  }
}

// 1. Đọc & Lưu danh sách Banner 16:3 đang được áp dụng cho từng trang (pageId -> BannerConfig16x3)
export async function loadAppliedPageBanners(): Promise<Record<number, BannerConfig16x3>> {
  const fromIdb = await idbGet<Record<number, BannerConfig16x3>>(STORAGE_KEYS.APPLIED_PAGE_BANNERS);
  if (fromIdb && typeof fromIdb === 'object') {
    return fromIdb;
  }
  if (typeof window !== 'undefined') {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.APPLIED_PAGE_BANNERS);
      if (raw) {
        return JSON.parse(raw) as Record<number, BannerConfig16x3>;
      }
    } catch {
      // Ignore parse error
    }
  }
  return {};
}

export async function applyBannerToPage(
  pageId: number,
  config: BannerConfig16x3
): Promise<Record<number, BannerConfig16x3>> {
  const current = await loadAppliedPageBanners();
  const updated: Record<number, BannerConfig16x3> = {
    ...current,
    [pageId]: {
      ...config,
      targetPageId: pageId,
      createdAt: new Date().toISOString(),
    },
  };
  await idbSet(STORAGE_KEYS.APPLIED_PAGE_BANNERS, updated);
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_KEYS.APPLIED_PAGE_BANNERS, JSON.stringify(updated));
    } catch {
      // Ignore quota exceeded on large base64
    }
  }
  notifyBannerUpdated();
  return updated;
}

export async function applyAllDefaultBanners16x3(): Promise<Record<number, BannerConfig16x3>> {
  const updated: Record<number, BannerConfig16x3> = {};
  for (const preset of PAGE_BANNER_PRESETS) {
    // Áp dụng cho các trang nội dung (trừ trang chủ 0 và thư ngỏ 1 nếu người dùng muốn giữ nguyên, hoặc áp dụng cho các trang 2..13)
    if (preset.pageId >= 2 && preset.pageId <= 13) {
      updated[preset.pageId] = createDefaultBannerForPage(preset.pageId);
    }
  }
  await idbSet(STORAGE_KEYS.APPLIED_PAGE_BANNERS, updated);
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_KEYS.APPLIED_PAGE_BANNERS, JSON.stringify(updated));
    } catch {
      // Ignore
    }
  }
  notifyBannerUpdated();
  return updated;
}

export async function removeBannerFromPage(
  pageId: number
): Promise<Record<number, BannerConfig16x3>> {
  const current = await loadAppliedPageBanners();
  const updated = { ...current };
  delete updated[pageId];
  await idbSet(STORAGE_KEYS.APPLIED_PAGE_BANNERS, updated);
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_KEYS.APPLIED_PAGE_BANNERS, JSON.stringify(updated));
    } catch {
      // Ignore
    }
  }
  notifyBannerUpdated();
  return updated;
}

export async function clearAllAppliedBanners(): Promise<void> {
  await idbSet(STORAGE_KEYS.APPLIED_PAGE_BANNERS, {});
  if (typeof window !== 'undefined') {
    try {
      localStorage.removeItem(STORAGE_KEYS.APPLIED_PAGE_BANNERS);
    } catch {
      // Ignore
    }
  }
  notifyBannerUpdated();
}

// 2. Đọc & Lưu Thư viện Banner cá nhân (Saved Banner Library)
export async function loadSavedBannerLibrary(): Promise<BannerConfig16x3[]> {
  const fromIdb = await idbGet<BannerConfig16x3[]>(STORAGE_KEYS.SAVED_BANNER_LIBRARY);
  if (Array.isArray(fromIdb) && fromIdb.length > 0) {
    return fromIdb;
  }
  if (typeof window !== 'undefined') {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.SAVED_BANNER_LIBRARY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {
      // Ignore
    }
  }
  // Khởi tạo sẵn 4 mẫu Banner 16:3 tiêu biểu trong thư viện để người dùng trải nghiệm ngay
  return [
    createDefaultBannerForPage(4), // Lĩnh Vực
    createDefaultBannerForPage(3), // Học Vấn
    createDefaultBannerForPage(7), // Dự Án
    createDefaultBannerForPage(8), // Hệ Thống
  ];
}

export async function saveBannerToLibrary(
  config: BannerConfig16x3
): Promise<BannerConfig16x3[]> {
  const current = await loadSavedBannerLibrary();
  const newItem: BannerConfig16x3 = {
    ...config,
    id: config.id.startsWith('custom-') ? config.id : `custom-banner-${Date.now()}`,
    createdAt: new Date().toISOString(),
  };
  const filtered = current.filter((item) => item.id !== newItem.id);
  const updated = [newItem, ...filtered].slice(0, 30);
  await idbSet(STORAGE_KEYS.SAVED_BANNER_LIBRARY, updated);
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_KEYS.SAVED_BANNER_LIBRARY, JSON.stringify(updated));
    } catch {
      // Ignore quota
    }
  }
  notifyBannerUpdated();
  return updated;
}

export async function deleteBannerFromLibrary(
  bannerId: string
): Promise<BannerConfig16x3[]> {
  const current = await loadSavedBannerLibrary();
  const updated = current.filter((item) => item.id !== bannerId);
  await idbSet(STORAGE_KEYS.SAVED_BANNER_LIBRARY, updated);
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_KEYS.SAVED_BANNER_LIBRARY, JSON.stringify(updated));
    } catch {
      // Ignore
    }
  }
  notifyBannerUpdated();
  return updated;
}

// 3. Kết xuất Banner chuẩn tỷ lệ 16:3 (1920 x 360 px) ra file ảnh chất lượng cao (PNG / WebP)
function loadImageElement(src: string): Promise<HTMLImageElement | null> {
  return new Promise((resolve) => {
    if (!src) {
      resolve(null);
      return;
    }
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = src;
  });
}

function drawRoundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number
) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}

export async function renderBannerToCanvas16x3(
  config: BannerConfig16x3,
  format: 'image/png' | 'image/webp' = 'image/png'
): Promise<string> {
  const WIDTH = 1920;
  const HEIGHT = 360; // Tỷ lệ chuẩn 16:3 (1920 / 360 = 16 / 3)
  const canvas = document.createElement('canvas');
  canvas.width = WIDTH;
  canvas.height = HEIGHT;
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';

  // 1. Vẽ nền cơ sở (Dark Executive Slate + Accent Gradient)
  const baseGrad = ctx.createLinearGradient(0, 0, WIDTH, HEIGHT);
  baseGrad.addColorStop(0, '#090d16');
  baseGrad.addColorStop(0.5, '#0f172a');
  baseGrad.addColorStop(1, '#1e1b4b');
  ctx.fillStyle = baseGrad;
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  // 2. Nếu có AI SVG hoặc ảnh nền thì vẽ lên Canvas với tỷ lệ cắt thông minh 16:3
  let bgSourceUrl = config.backgroundUrl;
  if (config.backgroundType === 'ai-svg' && config.aiSvgMarkup) {
    const svgBlob = new Blob([config.aiSvgMarkup], { type: 'image/svg+xml;charset=utf-8' });
    bgSourceUrl = URL.createObjectURL(svgBlob);
  }

  const bgImg = await loadImageElement(bgSourceUrl);
  if (bgImg && bgImg.width > 0 && bgImg.height > 0) {
    ctx.save();
    const zoomFactor = (config.bgZoom || 100) / 100;
    const targetW = WIDTH * zoomFactor;
    const scale = Math.max(targetW / bgImg.width, HEIGHT / bgImg.height);
    const drawW = bgImg.width * scale;
    const drawH = bgImg.height * scale;
    const offsetX = (WIDTH - drawW) / 2;
    const maxOffsetY = Math.max(0, drawH - HEIGHT);
    const offsetY = -(maxOffsetY * ((config.bgPositionY ?? 50) / 100));
    if (config.blurAmount > 0) {
      ctx.filter = `blur(${Math.min(12, config.blurAmount)}px)`;
    }
    ctx.drawImage(bgImg, offsetX, offsetY, drawW, drawH);
    ctx.restore();
  } else {
    // Vẽ quầng sáng Mesh Gradient nếu không dùng ảnh
    const glow1 = ctx.createRadialGradient(WIDTH * 0.2, HEIGHT * 0.3, 10, WIDTH * 0.2, HEIGHT * 0.3, 520);
    glow1.addColorStop(0, `${config.accentColor}88`);
    glow1.addColorStop(1, 'transparent');
    ctx.fillStyle = glow1;
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    const glow2 = ctx.createRadialGradient(WIDTH * 0.82, HEIGHT * 0.7, 10, WIDTH * 0.82, HEIGHT * 0.7, 480);
    glow2.addColorStop(0, `${config.secondaryColor || '#6366f1'}77`);
    glow2.addColorStop(1, 'transparent');
    ctx.fillStyle = glow2;
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
  }

  if (config.backgroundType === 'ai-svg' && bgSourceUrl.startsWith('blob:')) {
    URL.revokeObjectURL(bgSourceUrl);
  }

  // 3. Lớp phủ Contrast Scrim đảm bảo độ tương phản chữ >= 4.5:1
  const scrimAlpha = Math.min(0.92, Math.max(0.25, (config.overlayOpacity || 60) / 100));
  const scrimGrad = ctx.createLinearGradient(0, 0, WIDTH, 0);
  scrimGrad.addColorStop(0, `rgba(9, 13, 22, ${Math.min(0.95, scrimAlpha + 0.18)})`);
  scrimGrad.addColorStop(0.58, `rgba(15, 23, 42, ${scrimAlpha})`);
  scrimGrad.addColorStop(1, `rgba(15, 23, 42, ${Math.max(0.35, scrimAlpha - 0.1)})`);
  ctx.fillStyle = scrimGrad;
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  // 4. Lưới tọa độ kỹ thuật 16:3 nếu bật showGridOverlay
  if (config.showGridOverlay) {
    ctx.save();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.lineWidth = 1;
    for (let x = 0; x < WIDTH; x += 60) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, HEIGHT);
      ctx.stroke();
    }
    for (let y = 0; y < HEIGHT; y += 60) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(WIDTH, y);
      ctx.stroke();
    }
    ctx.restore();
  }

  // 5. Đường thanh sáng viền trên & dưới chuẩn Glass Neon
  const topLineGrad = ctx.createLinearGradient(0, 0, WIDTH, 0);
  topLineGrad.addColorStop(0, 'transparent');
  topLineGrad.addColorStop(0.25, config.accentColor);
  topLineGrad.addColorStop(0.75, config.secondaryColor || '#38bdf8');
  topLineGrad.addColorStop(1, 'transparent');
  ctx.fillStyle = topLineGrad;
  ctx.fillRect(0, 0, WIDTH, 4);

  // 6. Vẽ Kicker Badge, Tiêu đề chính và Phụ đề
  const leftX = config.textAlign === 'center' ? WIDTH / 2 : 76;
  ctx.textAlign = config.textAlign === 'center' ? 'center' : 'left';

  // Kicker text
  ctx.font = '700 17px "Play", sans-serif';
  ctx.fillStyle = config.accentColor || '#38bdf8';
  ctx.fillText((config.kickerBadge || 'HỒ SƠ CHUYÊN GIA NGUYỄN HÙNG THÁI').toUpperCase(), leftX, 74);

  // Main Title (tự động ngắt dòng nếu dài)
  ctx.font = '700 40px "Play", sans-serif';
  ctx.fillStyle = '#ffffff';
  const maxTitleWidth = config.textAlign === 'center' ? 1400 : 1060;
  const words = (config.title || '').split(' ');
  const lines: string[] = [];
  let currentLine = '';
  for (const w of words) {
    const test = currentLine ? `${currentLine} ${w}` : w;
    if (ctx.measureText(test).width > maxTitleWidth && currentLine) {
      lines.push(currentLine);
      currentLine = w;
    } else {
      currentLine = test;
    }
  }
  if (currentLine) lines.push(currentLine);

  let titleY = 132;
  for (const line of lines.slice(0, 2)) {
    ctx.fillText(line, leftX, titleY);
    titleY += 50;
  }

  // Subtitle
  ctx.font = '400 21px "Play", sans-serif';
  ctx.fillStyle = 'rgba(226, 232, 240, 0.9)';
  const subWords = (config.subtitle || '').split(' ');
  let subLine = '';
  let subY = titleY + 6;
  let subCount = 0;
  for (const w of subWords) {
    const test = subLine ? `${subLine} ${w}` : w;
    if (ctx.measureText(test).width > maxTitleWidth && subLine) {
      if (subCount < 2) {
        ctx.fillText(subLine, leftX, subY);
        subY += 30;
        subCount++;
      }
      subLine = w;
    } else {
      subLine = test;
    }
  }
  if (subLine && subCount < 2) {
    ctx.fillText(subLine, leftX, subY);
  }

  // 7. Vẽ 3 Thẻ Chỉ Số KPI ở phía bên phải (nếu textAlign !== 'center')
  if (config.metrics && config.metrics.length > 0 && config.textAlign !== 'center') {
    const cardW = 215;
    const cardH = 128;
    const gap = 18;
    const totalCardsW = config.metrics.slice(0, 3).length * cardW + (config.metrics.slice(0, 3).length - 1) * gap;
    const startX = WIDTH - totalCardsW - 76;
    const cardY = (HEIGHT - cardH) / 2;

    config.metrics.slice(0, 3).forEach((m, idx) => {
      const cx = startX + idx * (cardW + gap);
      ctx.save();
      drawRoundedRect(ctx, cx, cardY, cardW, cardH, 18);
      ctx.fillStyle = 'rgba(15, 23, 42, 0.78)';
      ctx.fill();
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = `${config.accentColor}88`;
      ctx.stroke();

      ctx.textAlign = 'left';
      ctx.font = '700 32px "Play", monospace';
      ctx.fillStyle = config.accentColor || '#38bdf8';
      ctx.fillText(m.value, cx + 20, cardY + 52);

      ctx.font = '700 15px "Play", sans-serif';
      ctx.fillStyle = '#f8fafc';
      ctx.fillText(m.label, cx + 20, cardY + 84);

      if (m.sub) {
        ctx.font = '400 13px "Play", sans-serif';
        ctx.fillStyle = '#94a3b8';
        ctx.fillText(m.sub, cx + 20, cardY + 108);
      }
      ctx.restore();
    });
  }

  return canvas.toDataURL(format, 0.95);
}

// 4. Trình tạo mã nhúng HTML/CSS độc lập kèm hiệu ứng chữ chuyển động (Kinetic Typography)
export function generateBannerEmbedCode16x3(config: BannerConfig16x3): string {
  const safeTitle = config.title.replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const safeSub = config.subtitle.replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const safeKicker = config.kickerBadge.replace(/</g, '&lt;').replace(/>/g, '&gt;');

  const metricsHtml = (config.metrics || [])
    .slice(0, 3)
    .map(
      (m) => `      <div class="ht-banner-kpi-card">
        <div class="ht-banner-kpi-val">${m.value}</div>
        <div class="ht-banner-kpi-lbl">${m.label}</div>
        ${m.sub ? `<div class="ht-banner-kpi-sub">${m.sub}</div>` : ''}
      </div>`
    )
    .join('\n');

  return `<!-- Banner Chuẩn Tỷ Lệ 16:3 - Hồ Sơ Chuyên Gia Nguyễn Hùng Thái -->
<div class="ht-banner-16x3 ht-anim-${config.textAnimation}">
  <div class="ht-banner-bg"></div>
  <div class="ht-banner-scrim"></div>
  <div class="ht-banner-content">
    <div class="ht-banner-main">
      <div class="ht-banner-kicker">${safeKicker}</div>
      <h2 class="ht-banner-title">${safeTitle}</h2>
      <p class="ht-banner-subtitle">${safeSub}</p>
    </div>
    <div class="ht-banner-kpis">
${metricsHtml}
    </div>
  </div>
</div>

<style>
.ht-banner-16x3 {
  position: relative;
  width: 100%;
  max-width: 1200px;
  aspect-ratio: 16 / 3;
  min-height: 180px;
  border-radius: 16px;
  overflow: hidden;
  font-family: 'Play', system-ui, sans-serif;
  color: #f8fafc;
  background: #0f172a;
  border: 1px solid ${config.accentColor}66;
  box-shadow: 0 16px 40px -8px rgba(0, 0, 0, 0.45);
}
.ht-banner-bg {
  position: absolute;
  inset: 0;
  background-image: url('${config.backgroundUrl}');
  background-size: ${config.bgZoom || 105}%;
  background-position: center ${config.bgPositionY ?? 50}%;
  filter: blur(${config.blurAmount || 0}px);
  transition: transform 0.6s ease;
}
.ht-banner-16x3:hover .ht-banner-bg {
  transform: scale(1.03);
}
.ht-banner-scrim {
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, rgba(9, 13, 22, ${(config.overlayOpacity || 62) / 100 + 0.18}) 0%, rgba(15, 23, 42, ${(config.overlayOpacity || 62) / 100}) 60%, rgba(15, 23, 42, 0.35) 100%);
}
.ht-banner-content {
  position: relative;
  z-index: 2;
  height: 100%;
  padding: 20px 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
}
.ht-banner-main {
  flex: 1;
  min-width: 0;
}
.ht-banner-kicker {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${config.accentColor};
  margin-bottom: 6px;
}
.ht-banner-title {
  font-size: clamp(1.15rem, 2vw, 1.65rem);
  font-weight: 700;
  line-height: 1.22;
  margin: 0 0 8px 0;
  color: #ffffff;
}
.ht-banner-subtitle {
  font-size: clamp(0.78rem, 1.1vw, 0.92rem);
  color: rgba(226, 232, 240, 0.88);
  margin: 0;
  line-height: 1.45;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.ht-banner-kpis {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;
}
.ht-banner-kpi-card {
  background: rgba(15, 23, 42, 0.72);
  backdrop-filter: blur(16px);
  border: 1px solid ${config.accentColor}55;
  border-radius: 12px;
  padding: 10px 14px;
  min-width: 118px;
}
.ht-banner-kpi-val {
  font-size: 1.2rem;
  font-weight: 700;
  color: ${config.accentColor};
  font-variant-numeric: tabular-nums;
}
.ht-banner-kpi-lbl {
  font-size: 0.75rem;
  font-weight: 700;
  color: #f8fafc;
}
.ht-banner-kpi-sub {
  font-size: 0.68rem;
  color: #94a3b8;
}
@keyframes htShimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
.ht-anim-shimmer .ht-banner-title {
  background: linear-gradient(90deg, #ffffff 0%, ${config.accentColor} 50%, #ffffff 100%);
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: htShimmer 5s linear infinite;
}
@media (max-width: 768px) {
  .ht-banner-16x3 { aspect-ratio: auto; min-height: 220px; }
  .ht-banner-content { flex-direction: column; align-items: flex-start; padding: 16px; }
  .ht-banner-kpis { width: 100%; overflow-x: auto; }
}
</style>`;
}
