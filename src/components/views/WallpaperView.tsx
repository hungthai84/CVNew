'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { WALLPAPER_OPTIONS } from '@/data/wallpapers';
import { WEATHER_PRESETS } from '@/data/weather';
import { WallpaperOption, WeatherPreset, SiteTheme } from '@/types';
import { THEME_LIST } from '@/data/themes';
import { Clock, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { useToast } from '@/components/ui/Toast';
import { WebIcon } from '@/components/ui/WebIcon';
import { SoundEngine } from '@/components/ui/SoundEngine';
import { LiveDisplaySettings } from '@/components/ui/LiveDisplaySettings';
import { formatCardTitle } from '@/lib/utils';
import {
  loadCustomWallpapers,
  saveCustomWallpapers,
  getDefaultWallpaperId,
  setDefaultWallpaperId,
  loadDeletedWallpaperIds,
  saveDeletedWallpaperIds,
  loadFavoriteWallpaperIds,
  saveFavoriteWallpaperIds,
  detectWallpaperType,
  normalizeCodepenUrl,
  generateAutoWallpaperName,
  exportWallpapersToJsonFile,
  exportWallpapersToJsonString,
  parseWallpapersJson,
  sanitizeWallpaperStyle,
  parseCssToReactStyle,
  formatWallpaperCssSnippet,
  extractWallpaperAccentColor,
  encodeStudioPresetCode,
  decodeStudioPresetCode,
  generateQrMatrix,
  exportGradientStudioToPng,
  CINEMATIC_LUT_PRESETS,
  DEFAULT_WALLPAPER_SETTINGS,
  WallpaperAdvancedSettings,
  getWallpaperTone,
  isBlurredWallpaper,
  SlideshowThemeFilter,
  SlideshowTransitionEffect,
} from '@/utils/wallpaperStorage';
import { AMBIENT_TRACKS, AmbientTrackId } from '@/utils/ambientSoundEngine';

export interface WallpaperViewProps {
  currentTheme?: SiteTheme;
  onSelectTheme?: (theme: SiteTheme) => void;
  onOpenThemeModal?: () => void;
  onNavigatePage?: (pageIndex: number) => void;
  onSelectWallpaper: (option: WallpaperOption) => void;
  activeWallpaperId?: string;
  defaultWallpaperId?: string;
  onSetDefaultWallpaper?: (option: WallpaperOption) => void;
  onSelectWeather?: (idx: number) => void;
  weatherIdx?: number;
  currentWeather?: WeatherPreset;
  wallpaperSettings?: WallpaperAdvancedSettings;
  onUpdateWallpaperSettings?: (partial: Partial<WallpaperAdvancedSettings>) => void;
  onNextSlideshow?: () => void;
  onTriggerZenMode?: (durationSeconds?: number) => void;
  activeAccent?: { hex: string; rgb: string; label: string };
  resolvedAmbientTrack?: AmbientTrackId;
  pomodoroRunning?: boolean;
  pomodoroPhase?: 'focus' | 'break';
  pomodoroSecondsLeft?: number;
  onTogglePomodoro?: (nextRunning?: boolean, forcePhase?: 'focus' | 'break') => void;
  onResetPomodoro?: () => void;
}

interface GradientColorStop {
  id: string;
  color: string;
  position: number; // 0 - 100 for linear/radial
  x: number; // 0 - 100 for mesh draggable point
  y: number; // 0 - 100 for mesh draggable point
}

interface StudioPreset {
  id: string;
  name: string;
  mode: 'linear' | 'radial' | 'mesh';
  angle: number;
  baseColor: string;
  stops: GradientColorStop[];
}

const STUDIO_PRESETS: StudioPreset[] = [
  {
    id: 'preset-aurora-mesh',
    name: 'Cực Quang Bắc Cực',
    mode: 'mesh',
    angle: 135,
    baseColor: '#070b19',
    stops: [
      { id: 's1', color: '#10b981', position: 0, x: 18, y: 22 },
      { id: 's2', color: '#0ea5e9', position: 35, x: 82, y: 25 },
      { id: 's3', color: '#8b5cf6', position: 70, x: 75, y: 78 },
      { id: 's4', color: '#ec4899', position: 100, x: 22, y: 80 },
    ],
  },
  {
    id: 'preset-pastel-day',
    name: 'Lăng Kính Sáng Dịu',
    mode: 'mesh',
    angle: 120,
    baseColor: '#f8fafc',
    stops: [
      { id: 's1', color: '#93c5fd', position: 0, x: 15, y: 20 },
      { id: 's2', color: '#f9a8d4', position: 33, x: 85, y: 18 },
      { id: 's3', color: '#c4b5fd', position: 66, x: 80, y: 82 },
      { id: 's4', color: '#6ee7b7', position: 100, x: 20, y: 78 },
    ],
  },
  {
    id: 'preset-sunset-flow',
    name: 'Hoàng Hôn Nhiệt Đới',
    mode: 'linear',
    angle: 135,
    baseColor: '#0f172a',
    stops: [
      { id: 's1', color: '#ff5e62', position: 0, x: 20, y: 20 },
      { id: 's2', color: '#ff9966', position: 48, x: 80, y: 30 },
      { id: 's3', color: '#6b11ff', position: 100, x: 50, y: 80 },
    ],
  },
  {
    id: 'preset-cosmic-nebula',
    name: 'Tinh Vân Vũ Trụ',
    mode: 'radial',
    angle: 145,
    baseColor: '#030014',
    stops: [
      { id: 's1', color: '#6366f1', position: 0, x: 50, y: 40 },
      { id: 's2', color: '#ec4899', position: 45, x: 70, y: 60 },
      { id: 's3', color: '#030014', position: 100, x: 20, y: 80 },
    ],
  },
  {
    id: 'preset-cyber-neon',
    name: 'Neon Cyberpunk',
    mode: 'linear',
    angle: 45,
    baseColor: '#05050d',
    stops: [
      { id: 's1', color: '#00f2fe', position: 0, x: 15, y: 25 },
      { id: 's2', color: '#4facfe', position: 50, x: 50, y: 50 },
      { id: 's3', color: '#f093fb', position: 100, x: 85, y: 75 },
    ],
  },
  {
    id: 'preset-emerald-matrix',
    name: 'Ngọc Lục Bảo',
    mode: 'linear',
    angle: 160,
    baseColor: '#022c22',
    stops: [
      { id: 's1', color: '#022c22', position: 0, x: 20, y: 20 },
      { id: 's2', color: '#059669', position: 52, x: 60, y: 50 },
      { id: 's3', color: '#34d399', position: 100, x: 80, y: 80 },
    ],
  },
];

export const WallpaperView: React.FC<WallpaperViewProps> = ({
  currentTheme = 'light-glass',
  onSelectTheme,
  onOpenThemeModal,
  onNavigatePage,
  onSelectWallpaper,
  activeWallpaperId = 'aurora',
  defaultWallpaperId: propDefaultId,
  onSetDefaultWallpaper,
  onSelectWeather,
  weatherIdx = 0,
  currentWeather,
  wallpaperSettings: propSettings,
  onUpdateWallpaperSettings,
  onNextSlideshow,
  onTriggerZenMode,
  activeAccent: propAccent,
  resolvedAmbientTrack = 'cosmos',
  pomodoroRunning = false,
  pomodoroPhase = 'focus',
  pomodoroSecondsLeft = 25 * 60,
  onTogglePomodoro,
  onResetPomodoro,
}) => {
  const { showToast } = useToast();

  // Dynamic Dark/Light mode tracking for pure glassmorphism compatibility
  const [isDark, setIsDark] = useState<boolean>(currentTheme === 'dark-neon');
  const [isRightDisplaySettingsOpen, setIsRightDisplaySettingsOpen] = useState<boolean>(false);
  const [isRightThemeMenuOpen, setIsRightThemeMenuOpen] = useState<boolean>(false);
  const [isRightContactOpen, setIsRightContactOpen] = useState<boolean>(false);
  const [isRightLanguageOpen, setIsRightLanguageOpen] = useState<boolean>(false);
  const [isRightDockCollapsed, setIsRightDockCollapsed] = useState<boolean>(false);
  const [selectedLanguage, setSelectedLanguage] = useState<'vi' | 'en'>('vi');
  const [currentFontScalePercent, setCurrentFontScalePercent] = useState<number>(100);

  const rightDockRef = useRef<HTMLElement>(null);
  const rightThemeContainerRef = useRef<HTMLDivElement>(null);
  const rightDisplayContainerRef = useRef<HTMLDivElement>(null);
  const rightContactContainerRef = useRef<HTMLDivElement>(null);
  const rightLanguageContainerRef = useRef<HTMLDivElement>(null);

  // Đọc mức zoom chữ hiện tại từ html tag
  useEffect(() => {
    if (typeof document !== 'undefined') {
      const fs = document.documentElement.getAttribute('data-font-scale') || 'md';
      const map: Record<string, number> = { sm: 90, md: 100, lg: 110, '2xl': 130 };
      setCurrentFontScalePercent(map[fs] || 100);
    }
  }, []);

  // Đóng các popup khi click bên ngoài
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (rightThemeContainerRef.current && !rightThemeContainerRef.current.contains(target)) {
        setIsRightThemeMenuOpen(false);
      }
      if (rightDisplayContainerRef.current && !rightDisplayContainerRef.current.contains(target)) {
        setIsRightDisplaySettingsOpen(false);
      }
      if (rightContactContainerRef.current && !rightContactContainerRef.current.contains(target)) {
        setIsRightContactOpen(false);
      }
      if (rightLanguageContainerRef.current && !rightLanguageContainerRef.current.contains(target)) {
        setIsRightLanguageOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  useEffect(() => {
    const update = () => {
      if (typeof document !== 'undefined') {
        const dark =
          document.documentElement.classList.contains('dark') ||
          document.documentElement.getAttribute('data-theme') === 'dark-neon';
        setIsDark(dark);
      }
    };
    update();
    const obs = new MutationObserver(update);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['class', 'data-theme'] });
    return () => obs.disconnect();
  }, []);

  const [toneFilter, setToneFilter] = useState<'all' | 'light' | 'dark' | 'favorites'>('all');
  const [customList, setCustomList] = useState<WallpaperOption[]>([]);
  const [deletedIds, setDeletedIds] = useState<string[]>([]);
  const [favoriteIds, setFavoriteIds] = useState<string[]>([
    'aurora',
    'css-aurora-borealis',
    'css-sunset-mesh',
    'css-deep-space',
  ]);
  const [defaultId, setDefaultId] = useState<string>(propDefaultId || 'aurora');
  const [isAddingOpen, setIsAddingOpen] = useState<boolean>(false);
  const [addModalTab, setAddModalTab] = useState<'url' | 'gradient' | 'json'>('url');
  const [jsonTextInput, setJsonTextInput] = useState<string>('');
  const [jsonExportScope, setJsonExportScope] = useState<'custom' | 'active' | 'all'>('custom');
  const [isCustomizerOpen, setIsCustomizerOpen] = useState<boolean>(false);
  const [customizerTab, setCustomizerTab] = useState<'slideshow' | 'dimmer' | 'zen'>('slideshow');
  const [zenDuration, setZenDuration] = useState<number>(8);
  const [isStudioOpen, setIsStudioOpen] = useState<boolean>(false);
  const [isSlideshowOpen, setIsSlideshowOpen] = useState<boolean>(false);
  const [isSharePresetOpen, setIsSharePresetOpen] = useState<boolean>(false);
  const [isExportingPng, setIsExportingPng] = useState<boolean>(false);
  const [presetImportText, setPresetImportText] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Local settings fallback if not controlled from parent
  const [localSettings, setLocalSettings] = useState<WallpaperAdvancedSettings>(
    propSettings || DEFAULT_WALLPAPER_SETTINGS
  );

  useEffect(() => {
    if (propSettings) {
      setLocalSettings(propSettings);
    }
  }, [propSettings]);

  const settings = propSettings || localSettings;

  const updateSettings = (partial: Partial<WallpaperAdvancedSettings>) => {
    setLocalSettings((prev) => ({ ...prev, ...partial }));
    if (onUpdateWallpaperSettings) {
      onUpdateWallpaperSettings(partial);
    }
  };

  // Single smart input state
  const [inputValue, setInputValue] = useState<string>('');
  const [customName, setCustomName] = useState<string>('');
  const [isDragging, setIsDragging] = useState<boolean>(false);

  // Interactive CSS Gradient & Mesh Studio state
  const [studioMode, setStudioMode] = useState<'linear' | 'radial' | 'mesh'>('mesh');
  const [studioAngle, setStudioAngle] = useState<number>(135);
  const [studioBaseColor, setStudioBaseColor] = useState<string>('#070b19');
  const [studioName, setStudioName] = useState<string>('');
  const [studioStops, setStudioStops] = useState<GradientColorStop[]>(STUDIO_PRESETS[0].stops);
  const [draggingStopId, setDraggingStopId] = useState<string | null>(null);

  const studioCanvasRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const jsonInputRef = useRef<HTMLInputElement>(null);

  // Load custom wallpapers, deleted IDs, favorite IDs and default wallpaper from persistent storage on mount
  useEffect(() => {
    let mounted = true;
    (async () => {
      const stored = await loadCustomWallpapers();
      const defId = await getDefaultWallpaperId();
      const delIds = await loadDeletedWallpaperIds();
      const favIds = await loadFavoriteWallpaperIds();
      if (mounted) {
        setCustomList(stored);
        setDeletedIds(delIds);
        setFavoriteIds(favIds);
        if (defId) setDefaultId(defId);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  // Update defaultId if prop changes
  useEffect(() => {
    if (propDefaultId) {
      setDefaultId(propDefaultId);
    }
  }, [propDefaultId]);

  // Build live CSS string from Gradient Studio controls
  const generatedStudioCss = useMemo(() => {
    if (studioMode === 'linear') {
      const sorted = [...studioStops].sort((a, b) => a.position - b.position);
      const stopsStr = sorted.map((s) => `${s.color} ${s.position}%`).join(', ');
      return `linear-gradient(${studioAngle}deg, ${stopsStr})`;
    }
    if (studioMode === 'radial') {
      const sorted = [...studioStops].sort((a, b) => a.position - b.position);
      const center = studioStops[0] || { x: 50, y: 50 };
      const stopsStr = sorted.map((s) => `${s.color} ${s.position}%`).join(', ');
      return `radial-gradient(circle at ${center.x}% ${center.y}%, ${stopsStr})`;
    }
    // Mesh 4-point gradient
    const layers = studioStops.map(
      (s) => `radial-gradient(at ${s.x}% ${s.y}%, ${s.color} 0px, transparent 58%)`
    );
    return `${layers.join(', ')}, ${studioBaseColor}`;
  }, [studioMode, studioAngle, studioBaseColor, studioStops]);

  const generatedStudioStyle = useMemo(
    () => parseCssToReactStyle(generatedStudioCss),
    [generatedStudioCss]
  );

  // Handle dragging color nodes directly on the Studio Preview Canvas
  const handleCanvasPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!draggingStopId || !studioCanvasRef.current) return;
    const rect = studioCanvasRef.current.getBoundingClientRect();
    const relX = Math.min(100, Math.max(0, Math.round(((e.clientX - rect.left) / rect.width) * 100)));
    const relY = Math.min(100, Math.max(0, Math.round(((e.clientY - rect.top) / rect.height) * 100)));

    setStudioStops((prev) =>
      prev.map((s) =>
        s.id === draggingStopId
          ? {
              ...s,
              x: relX,
              y: relY,
              position: studioMode === 'linear' ? relX : s.position,
            }
          : s
      )
    );
  };

  const handleApplyStudioPreset = (preset: StudioPreset) => {
    setStudioMode(preset.mode);
    setStudioAngle(preset.angle);
    setStudioBaseColor(preset.baseColor);
    setStudioStops(preset.stops.map((s) => ({ ...s })));
    setStudioName(preset.name);
  };

  const handleAddStudioStop = () => {
    if (studioStops.length >= 6) {
      showToast('Tối đa 6 điểm màu để đảm bảo hiệu ứng mượt mà nhất.');
      return;
    }
    const palette = ['#38bdf8', '#f472b6', '#a855f7', '#34d399', '#fbbf24', '#fb7185'];
    const nextColor = palette[studioStops.length % palette.length];
    const newStop: GradientColorStop = {
      id: `stop-${Date.now()}`,
      color: nextColor,
      position: Math.min(100, Math.round((studioStops.length / (studioStops.length + 1)) * 100)),
      x: 25 + ((studioStops.length * 23) % 60),
      y: 25 + ((studioStops.length * 31) % 60),
    };
    setStudioStops((prev) => [...prev, newStop]);
  };

  const handleRemoveStudioStop = (id: string) => {
    if (studioStops.length <= 2) {
      showToast('Cần tối thiểu 2 điểm màu cho Gradient.');
      return;
    }
    setStudioStops((prev) => prev.filter((s) => s.id !== id));
  };

  const handlePreviewStudioOnSite = () => {
    const tempWp: WallpaperOption = {
      id: `studio-preview-${Date.now()}`,
      name: studioName.trim() || 'Gradient Studio Preview',
      type: studioMode === 'mesh' ? 'css' : 'gradient',
      value: generatedStudioCss,
      previewStyle: generatedStudioStyle,
      isCustom: true,
    };
    onSelectWallpaper(tempWp);
  };

  const handleSaveStudioWallpaper = async () => {
    const newId = `custom-gradient-${Date.now()}`;
    const finalName =
      studioName.trim() ||
      `Gradient ${studioMode === 'mesh' ? 'Mesh' : studioMode === 'radial' ? 'Radial' : 'Linear'} #${
        customList.length + 1
      }`;

    const newOption: WallpaperOption = {
      id: newId,
      name: finalName,
      type: studioMode === 'mesh' ? 'css' : 'gradient',
      value: generatedStudioCss,
      previewStyle: generatedStudioStyle,
      isCustom: true,
      createdAt: Date.now(),
    };

    const updated = [newOption, ...customList];
    setCustomList(updated);
    await saveCustomWallpapers(updated);
    onSelectWallpaper(newOption);
    setStudioName('');
    showToast(`Đã lưu & áp dụng "${finalName}" vào Kho Hình Nền!`);
  };

  const handleCopyStudioCss = async () => {
    const snippet = `background: ${generatedStudioCss};`;
    try {
      await navigator.clipboard.writeText(snippet);
      showToast('Đã sao chép mã CSS từ Gradient Studio vào bộ nhớ tạm!');
    } catch {
      showToast('Không thể truy cập bộ nhớ tạm trên trình duyệt này.');
    }
  };

  // Encode current Studio state into compact preset string & JSON + QR Matrix
  const currentStudioPresetPayload = useMemo(
    () => ({
      name: studioName.trim() || `Gradient ${studioMode.toUpperCase()}`,
      mode: studioMode,
      angle: studioAngle,
      baseColor: studioBaseColor,
      stops: studioStops.map((s) => ({
        color: s.color,
        position: s.position,
        x: s.x,
        y: s.y,
      })),
    }),
    [studioName, studioMode, studioAngle, studioBaseColor, studioStops]
  );

  const studioPresetCode = useMemo(
    () => encodeStudioPresetCode(currentStudioPresetPayload),
    [currentStudioPresetPayload]
  );

  const studioPresetJson = useMemo(
    () => JSON.stringify(currentStudioPresetPayload),
    [currentStudioPresetPayload]
  );

  const studioQrMatrix = useMemo(
    () => generateQrMatrix(studioPresetCode, 25),
    [studioPresetCode]
  );

  const handleCopyPresetCode = async (type: 'code' | 'json') => {
    const text = type === 'code' ? studioPresetCode : studioPresetJson;
    try {
      await navigator.clipboard.writeText(text);
      showToast(
        type === 'code'
          ? 'Đã sao chép Mã Preset rút gọn (HTG1) vào bộ nhớ tạm!'
          : 'Đã sao chép chuỗi JSON Preset vào bộ nhớ tạm!'
      );
    } catch {
      showToast('Không thể sao chép tự động trên trình duyệt này.');
    }
  };

  const handleDownloadPresetQrSvg = () => {
    const size = studioQrMatrix.length;
    const cellSize = 8;
    const padding = 16;
    const total = size * cellSize + padding * 2;
    let rects = '';
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        if (studioQrMatrix[r][c]) {
          rects += `<rect x="${padding + c * cellSize}" y="${padding + r * cellSize}" width="${cellSize}" height="${cellSize}" rx="1.5" fill="#1e1b4b"/>`;
        }
      }
    }
    const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${total} ${total}" width="${total}" height="${total}">
      <rect width="100%" height="100%" rx="16" fill="#ffffff"/>
      ${rects}
    </svg>`;
    const blob = new Blob([svgContent], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `gradient-preset-qr-${Date.now()}.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast('Đã tải xuống mã QR Preset (.svg)!');
  };

  const handleImportStudioPreset = () => {
    const decoded = decodeStudioPresetCode(presetImportText);
    if (!decoded) {
      showToast('Mã Preset hoặc chuỗi JSON không hợp lệ. Vui lòng kiểm tra lại!');
      return;
    }
    setStudioMode(decoded.mode);
    setStudioAngle(decoded.angle);
    setStudioBaseColor(decoded.baseColor);
    setStudioName(decoded.name);
    setStudioStops(
      decoded.stops.map((s, idx) => ({
        id: `imported-${Date.now()}-${idx}`,
        color: s.color,
        position: s.position,
        x: s.x,
        y: s.y,
      }))
    );
    setPresetImportText('');
    showToast(`Đã nạp thành công Preset: "${decoded.name}"!`);
  };

  // Export Gradient Studio canvas to 4K UHD (3840x2160) or Full HD (1920x1080) .PNG file
  const handleExportStudio4kPng = async (width = 3840, height = 2160) => {
    try {
      setIsExportingPng(true);
      await exportGradientStudioToPng(currentStudioPresetPayload, width, height);
      showToast(
        `Đã kết xuất & tải xuống ảnh nền ${width === 3840 ? '4K UHD' : 'Full HD'} (${width}×${height} .PNG)!`
      );
    } catch {
      showToast('Không thể kết xuất ảnh PNG trên trình duyệt này.');
    } finally {
      setIsExportingPng(false);
    }
  };

  const formattedPomodoroTime = useMemo(() => {
    const mins = Math.floor(Math.max(0, pomodoroSecondsLeft) / 60);
    const secs = Math.max(0, pomodoroSecondsLeft) % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  }, [pomodoroSecondsLeft]);

  const activeAmbientTrackMeta = useMemo(
    () => AMBIENT_TRACKS.find((t) => t.id === resolvedAmbientTrack) || AMBIENT_TRACKS[3],
    [resolvedAmbientTrack]
  );

  // Toggle favorite status for any wallpaper card
  const handleToggleFavorite = async (e: React.MouseEvent, wp: WallpaperOption) => {
    e.stopPropagation();
    const isFav = favoriteIds.includes(wp.id);
    const updated = isFav
      ? favoriteIds.filter((id) => id !== wp.id)
      : [wp.id, ...favoriteIds];
    setFavoriteIds(updated);
    await saveFavoriteWallpaperIds(updated);
    showToast(
      isFav
        ? `Đã bỏ "${wp.name}" khỏi Bộ sưu tập Yêu thích.`
        : `Đã thêm "${wp.name}" vào Bộ sưu tập Yêu thích!`
    );
  };

  // One-Click Copy CSS Snippet for any CSS/Gradient card
  const handleCopyCardCss = async (e: React.MouseEvent, wp: WallpaperOption) => {
    e.stopPropagation();
    const snippet = formatWallpaperCssSnippet(wp);
    if (!snippet) {
      showToast('Hình nền này không chứa mã CSS.');
      return;
    }
    try {
      await navigator.clipboard.writeText(snippet);
      setCopiedId(wp.id);
      setTimeout(() => {
        setCopiedId((prev) => (prev === wp.id ? null : prev));
      }, 2000);
      showToast(`Đã sao chép mã CSS của "${wp.name}"!`);
    } catch {
      showToast('Không thể sao chép tự động trên trình duyệt này.');
    }
  };

  // Real-time detection from single input
  const detection = detectWallpaperType(inputValue);

  const [filterType, setFilterType] = useState<
    'all' | 'favorites' | 'light' | 'dark' | 'blurred' | 'image' | 'video' | 'gradient' | 'css' | 'codepen'
  >('all');

  // Combined wallpapers: Custom first, then built-in (excluding deleted IDs & deduplicating)
  const combinedWallpapers: WallpaperOption[] = React.useMemo(() => {
    const raw = [...customList, ...WALLPAPER_OPTIONS];
    const seenIds = new Set<string>();
    const seenValues = new Set<string>();
    const unique: WallpaperOption[] = [];

    for (const wp of raw) {
      if (deletedIds.includes(wp.id)) continue;
      if (seenIds.has(wp.id)) continue;

      const normValue = (wp.value || '').trim();
      if (normValue && seenValues.has(normValue)) continue;

      seenIds.add(wp.id);
      if (normValue) seenValues.add(normValue);
      unique.push(wp);
    }
    return unique;
  }, [customList, deletedIds]);

  const activeWallpaperObj = useMemo(
    () => combinedWallpapers.find((w) => w.id === activeWallpaperId) || combinedWallpapers[0],
    [combinedWallpapers, activeWallpaperId]
  );

  const computedAccent = useMemo(
    () => propAccent || extractWallpaperAccentColor(activeWallpaperObj),
    [propAccent, activeWallpaperObj]
  );

  const allWallpapers: WallpaperOption[] = combinedWallpapers.filter((wp) => {
    if (filterType === 'all') return true;
    if (filterType === 'favorites') return favoriteIds.includes(wp.id);
    if (filterType === 'light') return getWallpaperTone(wp) === 'light';
    if (filterType === 'dark') return getWallpaperTone(wp) === 'dark';
    if (filterType === 'blurred') return isBlurredWallpaper(wp);
    if (filterType === 'image') return wp.type === 'image';
    if (filterType === 'video') return wp.type === 'video';
    if (filterType === 'gradient') return wp.type === 'gradient' || wp.type === 'color';
    if (filterType === 'css') return wp.type === 'css' || wp.type === 'class' || wp.type === 'gradient' || wp.type === 'color';
    if (filterType === 'codepen') return wp.type === 'codepen' || wp.value.includes('codepen.io') || wp.id.includes('codepen');
    return true;
  });

  // 1. Single click: Apply wallpaper to preview & active view (Đã tắt toast thông báo theo yêu cầu)
  const handleSingleClick = (wp: WallpaperOption) => {
    onSelectWallpaper(wp);
  };

  // 2. Set as Default wallpaper: Save permanently to localStorage and IndexedDB
  const handleSetDefault = async (wp: WallpaperOption, e?: React.MouseEvent | null) => {
    if (e) e.stopPropagation();
    onSelectWallpaper(wp);
    setDefaultId(wp.id);
    await setDefaultWallpaperId(wp.id);
    if (onSetDefaultWallpaper) {
      onSetDefaultWallpaper(wp);
    }
    showToast(`⭐ Đã lưu "${wp.name}" làm hình nền mặc định thành công! Khi tải lại website sẽ tự động áp dụng hình nền này.`);
  };

  // 3. Double click: Apply AND confirm set as default wallpaper
  const handleDoubleClick = async (wp: WallpaperOption) => {
    await handleSetDefault(wp);
  };

  // Handle local file read into Data URL
  const handleFileChosen = (file: File) => {
    if (!file) return;

    const isVideo = file.type.startsWith('video/');
    const isImage = file.type.startsWith('image/');

    if (!isVideo && !isImage) {
      showToast('Vui lòng chọn tệp hình ảnh (.jpg, .png, .gif, .webp) hoặc video (.mp4, .webm)');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (result) {
        setInputValue(result);
        if (!customName.trim()) {
          const suggestedName = file.name.replace(/\.[^/.]+$/, '');
          setCustomName(suggestedName);
        }
        showToast(`Đã nhận diện tệp cục bộ: ${file.name}`);
      }
    };
    reader.readAsDataURL(file);
  };

  // Tự động đặt tên thông minh cho hình nền mới
  useEffect(() => {
    if (detection && detection.type) {
      if (!customName || customName.startsWith('Hình Nền') || customName.startsWith('Mã CSS') || customName.startsWith('Nền CodePen')) {
        const auto = generateAutoWallpaperName(detection.type, customList.length + 1);
        setCustomName(auto);
      }
    }
  }, [detection.type, customList.length]);

  useEffect(() => {
    if (!studioName || studioName.startsWith('Hình Nền Gradient')) {
      setStudioName(`Hình Nền Gradient #${customList.length + 1}`);
    }
  }, [customList.length]);

  // Add custom wallpaper
  const handleAddWallpaper = async () => {
    if (!inputValue.trim()) {
      showToast('Vui lòng dán link hình ảnh, link video, mã CSS hoặc chọn tệp từ máy.');
      return;
    }

    const newId = `custom-${Date.now()}`;
    const autoFallback = generateAutoWallpaperName(detection.type, customList.length + 1);
    const finalName = customName.trim() || autoFallback;

    const newOption: WallpaperOption = {
      id: newId,
      name: finalName,
      type: detection.type,
      value: detection.cleanedValue,
      previewStyle: detection.previewStyle,
      isCustom: true,
      createdAt: Date.now(),
    };

    const updated = [newOption, ...customList];
    setCustomList(updated);
    await saveCustomWallpapers(updated);

    // Apply immediately
    onSelectWallpaper(newOption);

    // Reset input
    setInputValue('');
    setCustomName('');
    setIsAddingOpen(false);

    showToast(`Đã thêm thành công hình nền: ${finalName}!`);
  };

  // Delete wallpaper (both custom & built-in)
  const handleDeleteWallpaper = async (e: React.MouseEvent, id: string, name: string) => {
    e.stopPropagation();

    // 1. Remove from customList if it's custom
    const updatedCustom = customList.filter((w) => w.id !== id);
    if (updatedCustom.length !== customList.length) {
      setCustomList(updatedCustom);
      await saveCustomWallpapers(updatedCustom);
    }

    // 2. Add to deletedIds list to hide persistently
    const updatedDeleted = Array.from(new Set([...deletedIds, id]));
    setDeletedIds(updatedDeleted);
    await saveDeletedWallpaperIds(updatedDeleted);

    // 3. Reset default if the deleted one was default
    if (defaultId === id) {
      setDefaultId('aurora');
      await setDefaultWallpaperId('aurora');
    }

    showToast(`Đã xóa hình nền: "${name}"`);
  };

  // Restore deleted wallpapers
  const handleRestoreDeleted = async () => {
    setDeletedIds([]);
    await saveDeletedWallpaperIds([]);
    showToast('Đã khôi phục tất cả hình nền mặc định đã xóa!');
  };

  // Export JSON
  const handleExportJson = () => {
    try {
      exportWallpapersToJsonFile(customList);
      showToast('Đã tải xuống tệp hung-thai-wallpapers.json thành công!');
    } catch {
      showToast('Lỗi khi xuất tệp JSON.');
    }
  };

  // Danh sách hình nền xuất theo phạm vi chọn trong Tab JSON
  const jsonExportList = useMemo(() => {
    if (jsonExportScope === 'active') {
      const active =
        customList.find((w) => w.id === activeWallpaperId) ||
        WALLPAPER_OPTIONS.find((w) => w.id === activeWallpaperId);
      return active ? [active] : customList;
    }
    if (jsonExportScope === 'all') {
      return [...customList, ...WALLPAPER_OPTIONS];
    }
    return customList;
  }, [jsonExportScope, customList, activeWallpaperId]);

  const jsonExportPreview = useMemo(() => {
    return exportWallpapersToJsonString(jsonExportList);
  }, [jsonExportList]);

  const handleCopyJsonExport = async () => {
    try {
      await navigator.clipboard.writeText(jsonExportPreview);
      showToast('Đã sao chép chuỗi JSON hình nền vào bộ nhớ tạm!');
    } catch {
      showToast('Không thể sao chép tự động, vui lòng bôi đen để chép.');
    }
  };

  const handleDownloadScopedJson = () => {
    try {
      const filename = `hung-thai-wallpapers-${jsonExportScope}.json`;
      exportWallpapersToJsonFile(jsonExportList, filename);
      showToast(`Đã tải xuống tệp ${filename} thành công!`);
    } catch {
      showToast('Lỗi khi xuất tệp JSON.');
    }
  };

  const handleImportJsonFromText = async () => {
    if (!jsonTextInput.trim()) {
      showToast('Vui lòng dán nội dung JSON vào ô nhập liệu trước khi nạp.');
      return;
    }
    try {
      const { wallpapers: importedWallpapers, selectedId } = parseWallpapersJson(jsonTextInput);
      if (importedWallpapers.length === 0) {
        showToast('Chuỗi JSON không chứa hình nền hợp lệ.');
        return;
      }
      const existingIds = new Set(customList.map((w) => w.id));
      const newItems = importedWallpapers.filter((w) => !existingIds.has(w.id));
      const merged = [...newItems, ...customList];

      setCustomList(merged);
      await saveCustomWallpapers(merged);

      if (selectedId) {
        const selectedOption =
          merged.find((w) => w.id === selectedId) ||
          WALLPAPER_OPTIONS.find((w) => w.id === selectedId);
        if (selectedOption) {
          onSelectWallpaper(selectedOption);
          setDefaultId(selectedOption.id);
          await setDefaultWallpaperId(selectedOption.id);
          if (onSetDefaultWallpaper) onSetDefaultWallpaper(selectedOption);
        }
      }

      setJsonTextInput('');
      showToast(`Đã nhập thành công ${importedWallpapers.length} hình nền từ mã JSON!`);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Lỗi khi nhập mã JSON';
      showToast(message);
    }
  };

  // Import JSON
  const handleImportJsonFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const text = event.target?.result as string;
        const { wallpapers: importedWallpapers, selectedId } = parseWallpapersJson(text);

        if (importedWallpapers.length === 0) {
          showToast('Tệp JSON không chứa hình nền hợp lệ.');
          return;
        }

        // Merge: avoid duplicated IDs
        const existingIds = new Set(customList.map((w) => w.id));
        const newItems = importedWallpapers.filter((w) => !existingIds.has(w.id));
        const merged = [...newItems, ...customList];

        setCustomList(merged);
        await saveCustomWallpapers(merged);

        if (selectedId) {
          const selectedOption = merged.find((w) => w.id === selectedId) || WALLPAPER_OPTIONS.find((w) => w.id === selectedId);
          if (selectedOption) {
            onSelectWallpaper(selectedOption);
            setDefaultId(selectedOption.id);
            await setDefaultWallpaperId(selectedOption.id);
            if (onSetDefaultWallpaper) onSetDefaultWallpaper(selectedOption);
          }
        }

        showToast(`Đã nhập thành công ${importedWallpapers.length} hình nền từ JSON!`);
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Lỗi khi nhập JSON';
        showToast(message);
      } finally {
        if (jsonInputRef.current) jsonInputRef.current.value = '';
      }
    };
    reader.readAsText(file);
  };

  const [currentHour, setCurrentHour] = useState<number>(12);
  useEffect(() => {
    setCurrentHour(new Date().getHours());
  }, []);
  const isDaytimeNow = currentHour >= 6 && currentHour < 18;

  return (
    <div className="w-full flex-grow flex flex-col gap-4 max-w-7xl mx-auto justify-start select-none relative text-slate-800 dark:text-slate-100 pb-10 text-left p-0">
      {/* THANH TOOLBAR ĐIỀU KHIỂN & LỌC HÌNH NỀN (THAY THẾ BANNER) */}
      <div className="w-full p-2.5 sm:p-3 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-white/10 backdrop-blur-xl shadow-xs flex flex-wrap items-center justify-between gap-2.5 shrink-0">
        <div className="flex items-center gap-2">
          <WebIcon name="palette" className="w-4 h-4 text-fuchsia-600 dark:text-fuchsia-400" />
          <h2 className="text-xs sm:text-sm font-black font-play text-fuchsia-600 dark:text-fuchsia-400">
            {formatCardTitle("Tùy Biến Giao Diện")}
          </h2>
        </div>

        <div className="flex flex-wrap items-center justify-end gap-2.5 pt-1 px-1 relative z-10 pointer-events-auto ml-auto">
          {/* Nhóm nút lọc hình nền nằm góc dưới bên phải (kèm Bộ sưu tập Yêu thích) */}
          <div className="flex items-center gap-2 flex-wrap justify-end ml-auto">
            <div className="flex items-center gap-1.5 p-1 rounded-[999px] bg-white/90 dark:bg-slate-900/90 border border-slate-200/90 dark:border-white/15 shadow-2xs backdrop-blur-md flex-wrap">
              {[
                { id: 'all', label: 'Tất cả' },
                { id: 'favorites', label: `♥ Yêu thích (${favoriteIds.length})` },
                { id: 'light', label: '☀️ Nền Sáng' },
                { id: 'dark', label: '🌙 Nền Tối' },
                { id: 'blurred', label: '🌫️ Nền Mờ' },
                { id: 'image', label: 'Hình ảnh' },
                { id: 'video', label: 'Video động' },
                { id: 'gradient', label: 'Gradient' },
                { id: 'css', label: 'Mã CSS' },
                { id: 'codepen', label: '⚡ Nền CodePen' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setFilterType(tab.id as typeof filterType)}
                  className={`px-2.5 py-1 rounded-[999px] text-[11px] font-bold transition-all cursor-pointer ${
                    filterType === tab.id
                      ? tab.id === 'favorites'
                        ? 'bg-rose-600 text-white shadow-xs'
                        : 'bg-fuchsia-600 text-white shadow-xs'
                      : 'text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white hover:bg-white/80 dark:hover:bg-slate-800'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Restore button if any are deleted */}
            {deletedIds.length > 0 && (
              <button
                type="button"
                onClick={handleRestoreDeleted}
                className="px-2.5 py-1 rounded-[999px] text-[11px] font-bold text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/60 hover:bg-amber-100 dark:hover:bg-amber-900/60 border border-amber-300/80 dark:border-amber-600/50 transition cursor-pointer flex items-center gap-1 shadow-2xs"
                title="Khôi phục các hình nền đã xóa"
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" /></svg>
                <span>Khôi phục ({deletedIds.length})</span>
              </button>
            )}
          </div>

          {/* BÊN PHẢI: Nút Tùy Chỉnh Hình Nền (Gom Trình Chiếu, Độ Tối Mờ, Zen Mode), Thêm hình nền (Tích hợp Gradient), Nhập/Xuất JSON */}
          <div className="flex items-center gap-2 flex-wrap">
            {/* NÚT DUY NHẤT: TÙY CHỈNH HÌNH NỀN (Bấm vào xổ ra: Trình Chiếu Tự Động, Độ Tối Mờ Nền, Zen Mode) */}
            <button
              type="button"
              onClick={() => {
                setIsCustomizerOpen(!isCustomizerOpen);
                if (!isCustomizerOpen) {
                  setIsAddingOpen(false);
                }
              }}
              className={`px-3.5 py-1.5 rounded-[999px] text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all duration-200 cursor-pointer ${
                isCustomizerOpen
                  ? 'bg-gradient-to-r from-cyan-600 to-indigo-600 text-white ring-2 ring-cyan-300 shadow-md'
                  : (settings.slideshowEnabled || settings.dimmerOpacity > 0 || settings.blurAmount > 0)
                  ? 'bg-cyan-50 dark:bg-cyan-950/80 text-cyan-700 dark:text-cyan-300 border border-cyan-400/80 dark:border-cyan-500/50 shadow-2xs'
                  : 'bg-white/95 dark:bg-slate-900/80 hover:bg-cyan-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200/90 dark:border-white/10 shadow-2xs active:scale-95'
              }`}
              title="Tùy chỉnh Trình Chiếu Tự Động, Độ Tối Mờ Nền và Zen Mode"
            >
              <WebIcon name="sliders" className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
              <span>{isCustomizerOpen ? 'Đóng Tùy Chỉnh' : 'Tùy Chỉnh Hình Nền'}</span>
              {(settings.slideshowEnabled || settings.dimmerOpacity > 0 || settings.blurAmount > 0) && (
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" title="Đang kích hoạt hiệu ứng" />
              )}
            </button>

            {/* NÚT THÊM HÌNH NỀN: Tích hợp Dán Link, Tải Tệp và Tạo Nền Gradient */}
            <button
              type="button"
              onClick={() => {
                setIsAddingOpen(!isAddingOpen);
                if (!isAddingOpen) {
                  setIsCustomizerOpen(false);
                }
              }}
              className={`px-3.5 py-1.5 rounded-[999px] text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all duration-200 cursor-pointer ${
                isAddingOpen
                  ? 'bg-fuchsia-600 text-white shadow-fuchsia-500/25'
                  : 'bg-gradient-to-r from-fuchsia-600 to-indigo-600 hover:from-fuchsia-700 hover:to-indigo-700 text-white shadow-indigo-500/20 active:scale-95'
              }`}
            >
              {isAddingOpen ? (
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M18 6 6 18M6 6l12 12" /></svg>
              ) : (
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5v14" /></svg>
              )}
              <span>{isAddingOpen ? 'Đóng ô thêm' : '+ Thêm hình nền'}</span>
            </button>

            {/* NÚT LƯU LÀM MẶC ĐỊNH: Hiển thị nổi bật khi hình nền đang xem thử khác với hình nền mặc định */}
            {activeWallpaperObj && activeWallpaperObj.id !== defaultId && (
              <button
                type="button"
                onClick={() => handleSetDefault(activeWallpaperObj)}
                className="px-3.5 py-1.5 rounded-[999px] text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all duration-200 cursor-pointer bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-amber-500/30 active:scale-95 animate-pulse"
                title={`Lưu vĩnh viễn hình nền "${activeWallpaperObj.name}" làm mặc định khi tải trang`}
              >
                <WebIcon name="star" className="w-3.5 h-3.5 fill-current text-white" />
                <span>Đặt &quot;{activeWallpaperObj.name}&quot; làm mặc định</span>
              </button>
            )}

            {/* Nút Nhập JSON */}
            <button
              type="button"
              onClick={() => jsonInputRef.current?.click()}
              title="Nhập danh sách hình nền từ tệp .json"
              className="px-3 py-1.5 rounded-[999px] text-xs font-semibold bg-white/90 dark:bg-slate-900/80 hover:bg-indigo-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-300 border border-slate-300/80 dark:border-white/15 shadow-2xs flex items-center gap-1.5 transition cursor-pointer"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
              <span>Nhập JSON</span>
            </button>
            <input
              ref={jsonInputRef}
              type="file"
              accept=".json,application/json"
              className="hidden"
              onChange={handleImportJsonFile}
            />

            {/* Nút Xuất JSON */}
            <button
              type="button"
              onClick={handleExportJson}
              title="Tải về tệp sao lưu .json tất cả hình nền tùy chỉnh"
              className="px-3 py-1.5 rounded-[999px] text-xs font-semibold bg-white/90 dark:bg-slate-900/80 hover:bg-fuchsia-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 hover:text-fuchsia-600 dark:hover:text-fuchsia-300 border border-slate-300/80 dark:border-white/15 shadow-2xs flex items-center gap-1.5 transition cursor-pointer"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span>Xuất JSON</span>
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 min-w-0 w-full flex flex-col gap-4">
      {/* 2. BẢNG TÙY CHỈNH HÌNH NỀN (GOM 3 MỤC: TRÌNH CHIẾU TỰ ĐỘNG, ĐỘ TỐI MỜ NỀN, ZEN MODE) */}
      {isCustomizerOpen && (
        <div className="w-full p-4 sm:p-5 rounded-2xl bg-white/95 dark:bg-slate-900/95 border border-cyan-400/50 dark:border-cyan-500/40 shadow-xl backdrop-blur-xl animate-fade-in flex flex-col gap-4 text-left transition-all duration-300">
          {/* Header & Bộ 3 Tabs Chuyển Đổi */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200/80 dark:border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <WebIcon name="sliders" className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0" />
              <h4 className="text-xs sm:text-sm font-black font-play text-slate-900 dark:text-white tracking-tight">
                {formatCardTitle("Tùy Chỉnh Hình Nền")}
              </h4>
            </div>

            {/* 3 Nút Chọn Mục: Trình Chiếu, Độ Tối Mờ, Zen Mode */}
            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 flex-wrap">
              <button
                type="button"
                onClick={() => setCustomizerTab('slideshow')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                  customizerTab === 'slideshow'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400'
                }`}
              >
                <WebIcon name="play" className="w-3.5 h-3.5" />
                <span>Trình Chiếu Tự Động</span>
                {settings.slideshowEnabled && (
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse" />
                )}
              </button>

              <button
                type="button"
                onClick={() => setCustomizerTab('dimmer')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                  customizerTab === 'dimmer'
                    ? 'bg-fuchsia-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-300 hover:text-fuchsia-600 dark:hover:text-fuchsia-400'
                }`}
              >
                <WebIcon name="sliders" className="w-3.5 h-3.5" />
                <span>Độ Tối Mờ Nền</span>
                {(settings.dimmerOpacity > 0 || settings.blurAmount > 0) && (
                  <span className="w-1.5 h-1.5 rounded-full bg-fuchsia-300" />
                )}
              </button>

              <button
                type="button"
                onClick={() => setCustomizerTab('zen')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                  customizerTab === 'zen'
                    ? 'bg-cyan-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400'
                }`}
              >
                <WebIcon name="maximize" className="w-3.5 h-3.5" />
                <span>Zen Mode</span>
              </button>

              <button
                type="button"
                onClick={() => setIsCustomizerOpen(false)}
                className="ml-auto p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 cursor-pointer"
                title="Đóng bảng tùy chỉnh"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M18 6 6 18M6 6l12 12" /></svg>
              </button>
            </div>
          </div>

          {/* TAB 1: TRÌNH CHIẾU TỰ ĐỘNG */}
          {customizerTab === 'slideshow' && (
            <div className="flex flex-col gap-3.5 animate-fadeIn">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                <div className="flex flex-col gap-0.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black text-emerald-600 dark:text-emerald-400">
                      Chế Độ Luân Chuyển Hình Nền Tự Động
                    </span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      settings.slideshowEnabled
                        ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-400/30'
                        : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                    }`}>
                      {settings.slideshowEnabled ? `Đang chạy (${settings.slideshowIntervalMinutes} phút/lần)` : 'Đang tắt'}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Tự động đổi hình nền theo tần suất bạn chọn và đồng bộ theo giao diện Sáng / Tối.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      const next = !settings.slideshowEnabled;
                      updateSettings({ slideshowEnabled: next });
                      showToast(
                        next
                          ? `Đã bật Trình chiếu hình nền tự động (${settings.slideshowIntervalMinutes} phút/lần)!`
                          : 'Đã tắt chế độ Trình chiếu hình nền tự động.'
                      );
                    }}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold border transition cursor-pointer flex items-center gap-1.5 ${
                      settings.slideshowEnabled
                        ? 'bg-emerald-600 text-white border-emerald-500 shadow-sm'
                        : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-600 hover:border-emerald-400'
                    }`}
                  >
                    <WebIcon name={settings.slideshowEnabled ? "pause" : "play"} className="w-3.5 h-3.5" />
                    <span>{settings.slideshowEnabled ? 'Tạm dừng trình chiếu' : 'Bật trình chiếu'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      if (onNextSlideshow) {
                        onNextSlideshow();
                      } else if (allWallpapers.length > 0) {
                        const idx = allWallpapers.findIndex((w) => w.id === activeWallpaperId);
                        const nextWp = allWallpapers[(idx + 1) % allWallpapers.length];
                        onSelectWallpaper(nextWp);
                      }
                      showToast('Đã chuyển sang hình nền kế tiếp!');
                    }}
                    className="px-3 py-1.5 rounded-full text-xs font-bold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-300/80 dark:border-emerald-700/80 hover:bg-emerald-100 transition cursor-pointer flex items-center gap-1 shadow-2xs"
                  >
                    <span>Đổi nền kế tiếp</span>
                    <WebIcon name="chevron-right" className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Tần suất lặp */}
              <div className="flex flex-col gap-1.5">
                <span className="text-[11px] font-bold text-slate-600 dark:text-slate-300">
                  Tần suất chuyển hình nền:
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { val: 0.5, label: '30 giây' },
                    { val: 1, label: '1 phút' },
                    { val: 3, label: '3 phút' },
                    { val: 5, label: '5 phút' },
                  ].map((item) => (
                    <button
                      key={item.val}
                      type="button"
                      onClick={() => updateSettings({ slideshowIntervalMinutes: item.val })}
                      className={`py-1.5 px-2 rounded-xl text-xs font-bold border transition cursor-pointer text-center ${
                        settings.slideshowIntervalMinutes === item.val
                          ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                          : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:border-emerald-400'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Lọc theo giao diện */}
              <div className="flex flex-col gap-1.5">
                <span className="text-[11px] font-bold text-slate-600 dark:text-slate-300">
                  Phân loại hình nền luân chuyển:
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5">
                  {[
                    { key: 'auto', label: 'Tự động ☀️🌙' },
                    { key: 'time-of-day', label: 'Theo giờ thực ⏰' },
                    { key: 'light-only', label: 'Chỉ nền Sáng ☀️' },
                    { key: 'dark-only', label: 'Chỉ nền Tối 🌙' },
                    { key: 'all', label: 'Tất cả kho nền' },
                  ].map((m) => {
                    const currentMode = settings.slideshowThemeMode || 'auto';
                    const isSelected = currentMode === m.key;
                    return (
                      <button
                        key={m.key}
                        type="button"
                        onClick={() => {
                          updateSettings({ slideshowThemeMode: m.key as SlideshowThemeFilter });
                          showToast(`Trình chiếu: ${m.label}`);
                        }}
                        className={`py-1.5 px-1 rounded-xl text-[10.5px] font-bold border transition truncate cursor-pointer text-center ${
                          isSelected
                            ? 'bg-indigo-600 text-white border-indigo-500 shadow-xs'
                            : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:border-indigo-400'
                        }`}
                      >
                        {m.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Hiệu ứng chuyển cảnh Cross-Fade & Lựa chọn phụ */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="flex flex-col gap-1.5">
                  <span className="text-[11px] font-bold text-slate-600 dark:text-slate-300">
                    Hiệu ứng chuyển cảnh (Cross-Fade):
                  </span>
                  <div className="grid grid-cols-3 gap-1">
                    {[
                      { key: 'dissolve', label: 'Hòa tan' },
                      { key: 'blur-dissolve', label: 'Mờ ảo' },
                      { key: 'zoom-out', label: 'Thu nhỏ' },
                    ].map((eff) => {
                      const isSelected = (settings.slideshowTransitionEffect || 'dissolve') === eff.key;
                      return (
                        <button
                          key={eff.key}
                          type="button"
                          onClick={() => updateSettings({ slideshowTransitionEffect: eff.key as SlideshowTransitionEffect })}
                          className={`py-1 px-1 rounded-lg text-[10px] font-bold border transition text-center cursor-pointer ${
                            isSelected
                              ? 'bg-fuchsia-600 text-white border-fuchsia-500 shadow-2xs'
                              : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700'
                          }`}
                        >
                          {eff.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <span className="text-[11px] font-bold text-slate-600 dark:text-slate-300">
                    Tùy chọn hiển thị:
                  </span>
                  <div className="flex items-center gap-2 flex-wrap">
                    <button
                      type="button"
                      onClick={() => {
                        const nextVal = !(settings.slideshowShowCountdown ?? true);
                        updateSettings({ slideshowShowCountdown: nextVal });
                      }}
                      className={`px-2.5 py-1 rounded-lg text-[10.5px] font-bold border transition cursor-pointer flex items-center gap-1 ${
                        (settings.slideshowShowCountdown ?? true)
                          ? 'bg-cyan-600 text-white border-cyan-500 shadow-2xs'
                          : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                      }`}
                    >
                      <WebIcon name="clock" className="w-3 h-3" />
                      <span>Thanh đếm ngược</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        const nextFav = !settings.slideshowFavoritesOnly;
                        updateSettings({ slideshowFavoritesOnly: nextFav });
                      }}
                      className={`px-2.5 py-1 rounded-lg text-[10.5px] font-bold border transition cursor-pointer flex items-center gap-1 ${
                        settings.slideshowFavoritesOnly
                          ? 'bg-rose-600 text-white border-rose-500 shadow-2xs'
                          : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                      }`}
                    >
                      <WebIcon name="heart" className="w-3 h-3" />
                      <span>Chỉ Yêu thích ({favoriteIds.length})</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: ĐỘ TỐI MỜ NỀN */}
          {customizerTab === 'dimmer' && (
            <div className="flex flex-col gap-4 animate-fadeIn">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex flex-col gap-0.5">
                  <span className="text-xs font-black text-fuchsia-600 dark:text-fuchsia-400">
                    Bộ Lọc Lớp Phủ Tối & Độ Mờ Kính Hình Nền
                  </span>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Điều chỉnh độ tối và độ mờ để chữ và các thẻ nội dung hiển thị sắc nét nhất trên nền ảnh/video.
                  </p>
                </div>

                {(settings.dimmerOpacity > 0 || settings.blurAmount > 0) && (
                  <button
                    type="button"
                    onClick={() => updateSettings({ dimmerOpacity: 0, blurAmount: 0 })}
                    className="self-start sm:self-auto text-xs font-bold px-3 py-1.5 rounded-full bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border border-rose-300 dark:border-rose-700 hover:bg-rose-100 transition cursor-pointer flex items-center gap-1"
                  >
                    <span>Đặt lại về gốc (0%)</span>
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Thanh trượt Độ Tối */}
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex flex-col gap-2">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="text-slate-700 dark:text-slate-200">Lớp phủ tối (Dimmer):</span>
                    <span className="font-mono text-fuchsia-600 dark:text-fuchsia-400 text-sm">
                      {settings.dimmerOpacity}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={80}
                    step={2}
                    value={settings.dimmerOpacity}
                    onChange={(e) => updateSettings({ dimmerOpacity: Number(e.target.value) })}
                    className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-fuchsia-600"
                  />
                  <div className="flex items-center justify-between text-[10px] text-slate-400">
                    <span>0% (Sáng nguyên bản)</span>
                    <span>40% (Cân bằng)</span>
                    <span>80% (Tối sâu)</span>
                  </div>
                </div>

                {/* Thanh trượt Độ Mờ */}
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex flex-col gap-2">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="text-slate-700 dark:text-slate-200">Độ mờ kính (Blur):</span>
                    <span className="font-mono text-indigo-600 dark:text-indigo-400 text-sm">
                      {settings.blurAmount}px
                    </span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={24}
                    step={1}
                    value={settings.blurAmount}
                    onChange={(e) => updateSettings({ blurAmount: Number(e.target.value) })}
                    className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  />
                  <div className="flex items-center justify-between text-[10px] text-slate-400">
                    <span>0px (Rõ nét)</span>
                    <span>8px (Kính mờ)</span>
                    <span>24px (Siêu mờ)</span>
                  </div>
                </div>
              </div>

              {/* Các mốc chỉnh nhanh */}
              <div className="flex items-center gap-2 flex-wrap pt-1">
                <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 mr-1">
                  Chỉnh nhanh:
                </span>
                {[
                  { label: 'Nguyên Bản (0%)', dim: 0, blur: 0 },
                  { label: 'Dịu Mắt (15% tối, 2px mờ)', dim: 15, blur: 2 },
                  { label: 'Rạp Phim (35% tối, 4px mờ)', dim: 35, blur: 4 },
                  { label: 'Kính Mờ Cao Cấp (20% tối, 10px mờ)', dim: 20, blur: 10 },
                  { label: 'Đọc Sách Đêm (55% tối, 1px mờ)', dim: 55, blur: 1 },
                ].map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      updateSettings({ dimmerOpacity: preset.dim, blurAmount: preset.blur });
                      showToast(`Đã áp dụng mốc: ${preset.label}`);
                    }}
                    className="px-2.5 py-1 rounded-lg text-[10.5px] font-semibold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 cursor-pointer transition"
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: ZEN MODE */}
          {customizerTab === 'zen' && (
            <div className="flex flex-col gap-4 animate-fadeIn">
              <div className="flex flex-col gap-1">
                <span className="text-xs font-black text-cyan-600 dark:text-cyan-400">
                  Zen Mode — Chiêm Ngưỡng Hình Nền Toàn Cảnh
                </span>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                  Khi kích hoạt Zen Mode, hệ thống sẽ ẩn tạm thời Header, Footer và Thẻ chính để bạn thưởng thức trọn vẹn vẻ đẹp của hình nền hoặc video nền toàn màn hình.
                </p>
              </div>

              {/* Chọn thời gian Zen Mode */}
              <div className="flex flex-col gap-2 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
                <span className="text-[11px] font-bold text-slate-700 dark:text-slate-200">
                  Thời lượng tự động hiện lại giao diện:
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { val: 8, label: '8 giây (Nhanh)' },
                    { val: 15, label: '15 giây (Vừa)' },
                    { val: 30, label: '30 giây (Sâu)' },
                    { val: 0, label: 'Vô hạn (Nhấn ESC để thoát)' },
                  ].map((dur) => (
                    <button
                      key={dur.val}
                      type="button"
                      onClick={() => setZenDuration(dur.val)}
                      className={`py-2 px-2 rounded-xl text-xs font-bold border transition text-center cursor-pointer ${
                        zenDuration === dur.val
                          ? 'bg-cyan-600 text-white border-cyan-500 shadow-xs'
                          : 'bg-white dark:bg-slate-700/80 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-600 hover:border-cyan-400'
                      }`}
                    >
                      {dur.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Nút Kích Hoạt Zen Mode */}
              <div className="flex flex-col sm:flex-row items-center gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => {
                    if (onTriggerZenMode) {
                      onTriggerZenMode(zenDuration > 0 ? zenDuration : undefined);
                      showToast(`Đã bật Zen Mode (${zenDuration > 0 ? `${zenDuration} giây` : 'Vô hạn'} – Nhấn phím ESC để thoát sớm)`);
                    }
                  }}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-full text-xs font-black text-white bg-gradient-to-r from-cyan-600 via-indigo-600 to-fuchsia-600 hover:from-cyan-700 hover:to-fuchsia-700 shadow-md shadow-cyan-500/25 active:scale-95 transition cursor-pointer flex items-center justify-center gap-2"
                >
                  <WebIcon name="maximize" className="w-4 h-4" />
                  <span>KÍCH HOẠT ZEN MODE NGAY</span>
                </button>

                <span className="text-[11px] text-slate-500 dark:text-slate-400 italic">
                  💡 Mẹo: Nhấn phím <kbd className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-700 font-mono text-[10px] font-bold">ESC</kbd> hoặc nhấp chuột bất kỳ đâu để thoát Zen Mode bất cứ lúc nào.
                </span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 3. KHUNG THÊM HÌNH NỀN HỢP NHẤT (DÁN LINK / TỆP VÀ TẠO NỀN GRADIENT STUDIO) */}
      {isAddingOpen && (
        <div
          className={`w-full p-4 sm:p-5 rounded-2xl bg-white/95 dark:bg-slate-900/95 border shadow-xl backdrop-blur-xl transition-all duration-300 flex flex-col gap-4 text-left ${
            isDragging
              ? 'border-fuchsia-500 ring-2 ring-fuchsia-400/40'
              : 'border-fuchsia-300 dark:border-fuchsia-500/40'
          }`}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setIsDragging(false);
            const file = e.dataTransfer.files?.[0];
            if (file) handleFileChosen(file);
          }}
        >
          {/* Header & Tab Switcher: Tab 1 (Link/File/CodePen/CSS), Tab 2 (Gradient Studio) & Tab 3 (Nhập & Xuất JSON) */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200/80 dark:border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-fuchsia-600 animate-ping" />
              <h4 className="text-xs sm:text-sm font-black font-play text-slate-900 dark:text-white tracking-tight">
                {addModalTab === 'url'
                  ? 'Thêm Hình Nền Mới (Link / Tệp / CodePen / CSS)'
                  : addModalTab === 'gradient'
                  ? 'Tạo Nền Gradient & Mesh CSS Trực Quan'
                  : 'Nhập & Xuất Dữ Liệu Hình Nền JSON'}
              </h4>
            </div>

            {/* 3 Tabs: Dán Link / Tải Tệp, Tạo Nền Gradient và Nhập & Xuất JSON */}
            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 flex-wrap">
              <button
                type="button"
                onClick={() => setAddModalTab('url')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                  addModalTab === 'url'
                    ? 'bg-fuchsia-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-300 hover:text-fuchsia-600 dark:hover:text-fuchsia-400'
                }`}
              >
                <WebIcon name="link" className="w-3.5 h-3.5" />
                <span>Dán Link / Tải Tệp</span>
              </button>

              <button
                type="button"
                onClick={() => setAddModalTab('gradient')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                  addModalTab === 'gradient'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400'
                }`}
              >
                <WebIcon name="palette" className="w-3.5 h-3.5" />
                <span>Tạo Nền Gradient</span>
              </button>

              <button
                type="button"
                onClick={() => setAddModalTab('json')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                  addModalTab === 'json'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400'
                }`}
              >
                <WebIcon name="file-code" className="w-3.5 h-3.5" />
                <span>Nhập & Xuất JSON</span>
              </button>

              <button
                type="button"
                onClick={() => setIsAddingOpen(false)}
                className="ml-auto p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 cursor-pointer"
                title="Đóng ô thêm hình nền"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M18 6 6 18M6 6l12 12" /></svg>
              </button>
            </div>
          </div>

          {/* TAB 1: DÁN LINK / TẢI TỆP */}
          {addModalTab === 'url' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start animate-fadeIn">
              {/* Cột 1 & 2: Ô Nhập & Tên tự động */}
              <div className="md:col-span-2 flex flex-col gap-2.5">
                <div className="flex items-center justify-between gap-2">
                  <label className="text-[11px] font-bold tracking-wider text-slate-600 dark:text-slate-300 block">
                    Dán URL hình ảnh, video, CodePen, mã CSS hoặc kéo thả tệp:
                  </label>
                  {inputValue.trim() && (
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border shadow-2xs ${detection.badgeColor}`}>
                      Auto nhận diện: {detection.label}
                    </span>
                  )}
                </div>

                <div className="relative">
                  <textarea
                    rows={3}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Ví dụ:&#10;• Link hình: https://images.unsplash.com/...&#10;• Link video: https://cdn.site.com/nature.mp4&#10;• Link CodePen: https://codepen.io/user/pen/...&#10;• Mã CSS: linear-gradient(135deg, #667eea 0%, #764ba2 100%)&#10;• Hoặc bấm nút 'Chọn tệp từ máy' bên dưới..."
                    className="w-full p-3 rounded-xl text-xs font-mono bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-fuchsia-500/50 shadow-inner resize-none"
                  />

                  {inputValue && (
                    <button
                      type="button"
                      onClick={() => setInputValue('')}
                      className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 text-xs px-1.5 py-0.5 rounded bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 cursor-pointer"
                    >
                      Xóa
                    </button>
                  )}
                </div>

                {/* Tên hình nền (TỰ ĐỘNG ĐẶT TÊN) & Nút duyệt tệp Local */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
                  <div className="flex-1 flex items-center gap-1.5">
                    <input
                      type="text"
                      value={customName}
                      onChange={(e) => setCustomName(e.target.value)}
                      placeholder="Hệ thống tự động đặt tên..."
                      className="flex-1 px-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-fuchsia-500/50 font-medium"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const autoName = generateAutoWallpaperName(detection.type, customList.length + 1);
                        setCustomName(autoName);
                        showToast(`Tên tự động: "${autoName}"`);
                      }}
                      title="Tự động đặt lại tên khác"
                      className="px-2.5 py-2 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-600 cursor-pointer flex items-center gap-1 shrink-0"
                    >
                      <WebIcon name="sparkles" className="w-3.5 h-3.5 text-amber-500" />
                      <span>Tên Auto</span>
                    </button>
                  </div>

                  {/* Nút chọn tệp từ máy */}
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="px-3.5 py-2 rounded-[999px] text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700 flex items-center justify-center gap-1.5 transition cursor-pointer whitespace-nowrap shadow-2xs"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                    </svg>
                    <span>Chọn tệp Local (Ảnh / Video)</span>
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*,video/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleFileChosen(file);
                    }}
                  />
                </div>
              </div>

              {/* Cột 3: Khung xem trước (Live Preview) & Nút Lưu */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold tracking-wider text-slate-600 dark:text-slate-300 block">
                  Xem trước (Preview):
                </label>

                <div className="w-full h-[115px] rounded-xl border-2 border-slate-300 dark:border-slate-700 overflow-hidden relative flex items-center justify-center bg-slate-100 dark:bg-slate-800 shadow-inner">
                  {detection.type === 'video' && detection.cleanedValue ? (
                    <video
                      src={detection.cleanedValue}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover"
                    />
                  ) : detection.type === 'codepen' && detection.cleanedValue ? (
                    <div className="relative w-full h-full overflow-hidden bg-slate-950">
                      <iframe
                        src={detection.cleanedValue}
                        title="CodePen Preview"
                        className="w-[200%] h-[200%] -top-[50%] -left-[50%] absolute border-0 pointer-events-none origin-center scale-50"
                        sandbox="allow-scripts allow-same-origin"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-transparent pointer-events-none" />
                      <div className="absolute bottom-1 left-1 px-1.5 py-0.5 rounded text-[8.5px] font-bold bg-black/70 text-cyan-300 backdrop-blur-xs pointer-events-none">
                        Live Preview
                      </div>
                    </div>
                  ) : detection.type === 'image' && detection.cleanedValue ? (
                    <img
                      src={detection.cleanedValue}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : detection.previewStyle ? (
                    <div className="w-full h-full" style={sanitizeWallpaperStyle(detection.previewStyle, detection.cleanedValue)} />
                  ) : (
                    <div className="text-center p-3 text-[11px] text-slate-400 dark:text-slate-500">
                      Chưa có nội dung xem trước
                    </div>
                  )}

                  {detection.type === 'video' && (
                    <span className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded text-[9px] font-bold bg-black/60 text-white backdrop-blur-xs flex items-center gap-1">
                      <WebIcon name="video" className="w-2.5 h-2.5" />
                      <span>Video</span>
                    </span>
                  )}
                  {detection.type === 'codepen' && (
                    <span className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded text-[9px] font-bold bg-emerald-600 text-white backdrop-blur-xs flex items-center gap-1">
                      <WebIcon name="code" className="w-2.5 h-2.5" />
                      <span>CodePen</span>
                    </span>
                  )}
                </div>

                {/* Nút lưu */}
                <button
                  type="button"
                  onClick={handleAddWallpaper}
                  className="w-full mt-1 py-2 px-4 rounded-[999px] text-xs font-bold text-white bg-gradient-to-r from-fuchsia-600 to-indigo-600 hover:from-fuchsia-700 hover:to-indigo-700 shadow-md shadow-fuchsia-500/20 active:scale-95 transition cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M20 6 9 17l-5-5" /></svg>
                  <span>Lưu & Áp Dụng Ngay</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: TẠO NỀN GRADIENT STUDIO */}
          {addModalTab === 'gradient' && (
            <div className="flex flex-col gap-4 animate-fadeIn">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200/80 dark:border-white/10 pb-3">
            <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
              <WebIcon name="brush" className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
              <h4 className="text-xs sm:text-sm font-black font-play text-indigo-600 dark:text-indigo-400 tracking-tight">
                {formatCardTitle("Bộ Tạo Màu Nền")}
              </h4>
            </div>

            {/* Bộ mẫu Preset nhanh */}
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[10.5px] font-bold text-slate-500 dark:text-slate-400 mr-1">
                Mẫu nhanh:
              </span>
              {STUDIO_PRESETS.map((preset) => (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => handleApplyStudioPreset(preset)}
                  className="px-2.5 py-1 rounded-full text-[10.5px] font-bold bg-slate-100 dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-950/70 text-slate-700 dark:text-slate-200 hover:text-indigo-600 border border-slate-200/90 dark:border-slate-700 transition cursor-pointer"
                >
                  {preset.name}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
            {/* Cột Trái (7 cột): Điều khiển chế độ, góc xoay và các điểm màu */}
            <div className="lg:col-span-7 flex flex-col gap-3.5">
              {/* Chọn kiểu Gradient & Góc xoay */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-bold text-slate-600 dark:text-slate-300">
                    Kiểu Phối Màu (Gradient Mode):
                  </label>
                  <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                    {[
                      { id: 'mesh', label: 'Mesh Đa Điểm' },
                      { id: 'linear', label: 'Linear (Tuyến tính)' },
                      { id: 'radial', label: 'Radial (Tỏa tròn)' },
                    ].map((m) => (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => setStudioMode(m.id as typeof studioMode)}
                        className={`flex-1 py-1.5 px-2 rounded-lg text-[11px] font-bold transition cursor-pointer ${
                          studioMode === m.id
                            ? 'bg-indigo-600 text-white shadow-2xs'
                            : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
                        }`}
                      >
                        {m.label}
                      </button>
                    ))}
                  </div>
                </div>

                {studioMode === 'linear' ? (
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-bold text-slate-600 dark:text-slate-300">
                        Góc Xoay (Angle):
                      </span>
                      <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">
                        {studioAngle}°
                      </span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={360}
                      step={5}
                      value={studioAngle}
                      onChange={(e) => setStudioAngle(Number(e.target.value))}
                      className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                    />
                    <div className="flex items-center gap-1 pt-0.5">
                      {[45, 90, 135, 180, 225, 315].map((deg) => (
                        <button
                          key={deg}
                          type="button"
                          onClick={() => setStudioAngle(deg)}
                          className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold border transition cursor-pointer ${
                            studioAngle === deg
                              ? 'bg-indigo-600 text-white border-indigo-600'
                              : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                          }`}
                        >
                          {deg}°
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-bold text-slate-600 dark:text-slate-300">
                      Màu Nền Đáy (Base Canvas Color):
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={studioBaseColor}
                        onChange={(e) => setStudioBaseColor(e.target.value)}
                        className="w-9 h-9 rounded-lg border border-slate-300 cursor-pointer bg-transparent p-0.5"
                      />
                      <input
                        type="text"
                        value={studioBaseColor}
                        onChange={(e) => setStudioBaseColor(e.target.value)}
                        className="w-28 px-2.5 py-1.5 rounded-lg text-xs font-mono bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-100"
                      />
                      <span className="text-[10.5px] text-slate-500 dark:text-slate-400">
                        Kéo các nút tròn trên khung Preview để đổi tâm màu
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Danh sách các Điểm Màu (Color Stops) */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-slate-700 dark:text-slate-200">
                    Điểm Màu Tương Tác ({studioStops.length}/6 điểm):
                  </span>
                  <button
                    type="button"
                    onClick={handleAddStudioStop}
                    className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-indigo-50 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-700 hover:bg-indigo-100 transition cursor-pointer flex items-center gap-1"
                  >
                    <span>+ Thêm điểm màu</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {studioStops.map((stop, idx) => (
                    <div
                      key={stop.id}
                      className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200/90 dark:border-slate-700 flex items-center gap-2.5"
                    >
                      <input
                        type="color"
                        value={stop.color}
                        onChange={(e) => {
                          const val = e.target.value;
                          setStudioStops((prev) =>
                            prev.map((s) => (s.id === stop.id ? { ...s, color: val } : s))
                          );
                        }}
                        className="w-8 h-8 rounded-lg border border-slate-300 cursor-pointer shrink-0 p-0.5 bg-white"
                      />

                      <div className="flex-1 min-w-0 flex flex-col gap-1">
                        <div className="flex items-center justify-between text-[10.5px]">
                          <span className="font-bold text-slate-700 dark:text-slate-200">
                            Điểm #{idx + 1} ({stop.color.toUpperCase()})
                          </span>
                          <span className="font-mono text-slate-500 dark:text-slate-400">
                            {studioMode === 'mesh' ? `X:${stop.x}% Y:${stop.y}%` : `${stop.position}%`}
                          </span>
                        </div>

                        {studioMode === 'mesh' ? (
                          <div className="flex items-center gap-1.5">
                            <input
                              type="range"
                              min={0}
                              max={100}
                              value={stop.x}
                              onChange={(e) => {
                                const val = Number(e.target.value);
                                setStudioStops((prev) =>
                                  prev.map((s) => (s.id === stop.id ? { ...s, x: val } : s))
                                );
                              }}
                              title="Tọa độ ngang X (%)"
                              className="w-1/2 h-1.5 bg-slate-200 dark:bg-slate-700 rounded appearance-none cursor-pointer accent-indigo-600"
                            />
                            <input
                              type="range"
                              min={0}
                              max={100}
                              value={stop.y}
                              onChange={(e) => {
                                const val = Number(e.target.value);
                                setStudioStops((prev) =>
                                  prev.map((s) => (s.id === stop.id ? { ...s, y: val } : s))
                                );
                              }}
                              title="Tọa độ dọc Y (%)"
                              className="w-1/2 h-1.5 bg-slate-200 dark:bg-slate-700 rounded appearance-none cursor-pointer accent-fuchsia-600"
                            />
                          </div>
                        ) : (
                          <input
                            type="range"
                            min={0}
                            max={100}
                            value={stop.position}
                            onChange={(e) => {
                              const val = Number(e.target.value);
                              setStudioStops((prev) =>
                                prev.map((s) => (s.id === stop.id ? { ...s, position: val } : s))
                              );
                            }}
                            className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded appearance-none cursor-pointer accent-indigo-600"
                          />
                        )}
                      </div>

                      {studioStops.length > 2 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveStudioStop(stop.id)}
                          title="Xóa điểm màu này"
                          className="w-6 h-6 rounded-full hover:bg-rose-100 text-slate-400 hover:text-rose-600 flex items-center justify-center transition cursor-pointer shrink-0"
                        >
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M18 6 6 18M6 6l12 12" /></svg>
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Ô hiển thị mã CSS tự động sinh ra */}
              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10.5px] font-bold text-slate-500 dark:text-slate-400">
                    Mã CSS Chuẩn Tự Động Tạo:
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyStudioCss}
                    className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <WebIcon name="copy" className="w-3 h-3" />
                    <span>Sao chép mã CSS</span>
                  </button>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-900 text-emerald-300 font-mono text-[11px] overflow-x-auto whitespace-nowrap border border-slate-700">
                  background: {generatedStudioCss};
                </div>
              </div>
            </div>

            {/* Cột Phải (5 cột): Khung Canvas Kéo Thả Trực Quan & Lưu Hình Nền */}
            <div className="lg:col-span-5 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-slate-700 dark:text-slate-200">
                  Canvas Tương Tác (Kéo thả trực tiếp các điểm màu):
                </span>
                <button
                  type="button"
                  onClick={() => {
                    const next = !settings.livingMeshEnabled;
                    updateSettings({ livingMeshEnabled: next });
                    showToast(
                      next
                        ? 'Đã bật chuyển động Living Mesh @keyframes trên Canvas!'
                        : 'Đã chuyển Canvas về chế độ tĩnh.'
                    );
                  }}
                  className={`px-2 py-0.5 rounded-full text-[10px] font-bold border transition cursor-pointer flex items-center gap-1 ${
                    settings.livingMeshEnabled
                      ? 'bg-rose-600 text-white border-rose-500'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-300 dark:border-slate-700'
                  }`}
                >
                  <WebIcon name="sparkles" className="w-2.5 h-2.5" />
                  <span>{settings.livingMeshEnabled ? 'Living Mesh: Động' : 'Living Mesh: Tĩnh'}</span>
                </button>
              </div>

              <div
                ref={studioCanvasRef}
                onPointerMove={handleCanvasPointerMove}
                onPointerUp={() => setDraggingStopId(null)}
                onPointerLeave={() => setDraggingStopId(null)}
                className={`w-full h-[185px] rounded-2xl border-2 border-slate-300 dark:border-slate-700 overflow-hidden relative shadow-inner select-none touch-none ${
                  settings.livingMeshEnabled ? 'living-mesh-normal' : ''
                }`}
                style={generatedStudioStyle}
              >
                {/* Draggable handles for color stops */}
                {studioStops.map((stop, idx) => (
                  <button
                    key={stop.id}
                    type="button"
                    onPointerDown={(e) => {
                      e.stopPropagation();
                      setDraggingStopId(stop.id);
                    }}
                    style={{
                      left: `${stop.x}%`,
                      top: `${stop.y}%`,
                      backgroundColor: stop.color,
                    }}
                    title={`Kéo điểm #${idx + 1} (${stop.color})`}
                    className={`w-6 h-6 -ml-3 -mt-3 rounded-full border-2 border-white shadow-[0_2px_10px_rgba(0,0,0,0.45)] absolute flex items-center justify-center text-[9px] font-black text-white cursor-grab active:cursor-grabbing transition-transform ${
                      draggingStopId === stop.id ? 'scale-125 ring-2 ring-white' : 'hover:scale-110'
                    }`}
                  >
                    {idx + 1}
                  </button>
                ))}

                <div className="absolute bottom-2 left-2.5 right-2.5 flex items-center justify-between pointer-events-none">
                  <span className="px-2 py-0.5 rounded-full text-[9.5px] font-bold bg-black/55 text-white backdrop-blur-xs">
                    Kéo các điểm số 1–{studioStops.length} để phối màu
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[9.5px] font-mono bg-black/55 text-cyan-300 backdrop-blur-xs">
                    {studioMode.toUpperCase()} • 4K READY
                  </span>
                </div>
              </div>

              {/* Đặt tên & Nút Lưu / Áp dụng / Xuất Ảnh 4K PNG / Chia sẻ QR Preset */}
              <input
                type="text"
                value={studioName}
                onChange={(e) => setStudioName(e.target.value)}
                placeholder="Đặt tên cho hình nền Gradient mới (tùy chọn)..."
                className="w-full px-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
              />

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <button
                  type="button"
                  onClick={handlePreviewStudioOnSite}
                  className="py-2 px-2.5 rounded-[999px] text-xs font-bold text-indigo-700 dark:text-indigo-200 bg-indigo-50 dark:bg-indigo-950/80 hover:bg-indigo-100 border border-indigo-200 dark:border-indigo-700 transition cursor-pointer flex items-center justify-center gap-1"
                >
                  <WebIcon name="eye" className="w-3.5 h-3.5" />
                  <span>Xem Thử</span>
                </button>

                <button
                  type="button"
                  disabled={isExportingPng}
                  onClick={() => handleExportStudio4kPng(3840, 2160)}
                  title="Kết xuất bảng phối màu hiện tại thành ảnh .PNG độ phân giải 4K UHD (3840×2160)"
                  className="py-2 px-2.5 rounded-[999px] text-xs font-bold text-emerald-700 dark:text-emerald-200 bg-emerald-50 dark:bg-emerald-950/80 hover:bg-emerald-100 border border-emerald-300 dark:border-emerald-700 transition cursor-pointer flex items-center justify-center gap-1"
                >
                  <WebIcon name="download" className="w-3.5 h-3.5" />
                  <span>{isExportingPng ? 'Đang xuất...' : 'Ảnh 4K .PNG'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setIsSharePresetOpen(!isSharePresetOpen)}
                  className={`py-2 px-2.5 rounded-[999px] text-xs font-bold border transition cursor-pointer flex items-center justify-center gap-1 ${
                    isSharePresetOpen
                      ? 'bg-fuchsia-600 text-white border-fuchsia-600'
                      : 'bg-fuchsia-50 dark:bg-fuchsia-950/60 text-fuchsia-700 dark:text-fuchsia-300 border-fuchsia-200 dark:border-fuchsia-700 hover:bg-fuchsia-100'
                  }`}
                >
                  <WebIcon name="qr-code" className="w-3.5 h-3.5" />
                  <span>QR / Chia Sẻ</span>
                </button>

                <button
                  type="button"
                  onClick={handleSaveStudioWallpaper}
                  className="py-2 px-3 rounded-[999px] text-xs font-bold text-white bg-gradient-to-r from-indigo-600 to-fuchsia-600 hover:from-indigo-700 hover:to-fuchsia-700 shadow-md shadow-indigo-500/20 active:scale-95 transition cursor-pointer flex items-center justify-center gap-1"
                >
                  <WebIcon name="sparkles" className="w-3.5 h-3.5" />
                  <span>Lưu & Áp Dụng</span>
                </button>
              </div>
            </div>
          </div>

          {/* KHỐI XUẤT / CHIA SẺ & NHẬP PRESET TỪ GRADIENT STUDIO (QR Code + Mã HTG1 + Chuỗi JSON) */}
          {isSharePresetOpen && (
            <div className="mt-1 p-3.5 sm:p-4 rounded-2xl bg-slate-50/95 dark:bg-slate-800/85 border border-fuchsia-200 dark:border-fuchsia-500/30 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
              {/* Cột QR Code trực quan */}
              <div className="md:col-span-4 flex flex-col items-center justify-center gap-2 p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-2xs">
                <div className="p-2 bg-white rounded-xl border border-slate-200 shadow-xs">
                  <svg
                    viewBox={`0 0 ${studioQrMatrix.length} ${studioQrMatrix.length}`}
                    className="w-28 h-28"
                    shapeRendering="crispEdges"
                  >
                    {studioQrMatrix.map((row, rIdx) =>
                      row.map((cell, cIdx) =>
                        cell ? (
                          <rect
                            key={`${rIdx}-${cIdx}`}
                            x={cIdx}
                            y={rIdx}
                            width={1}
                            height={1}
                            fill="#1e1b4b"
                          />
                        ) : null
                      )
                    )}
                  </svg>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleDownloadPresetQrSvg}
                    className="px-2.5 py-1 rounded-full text-[10.5px] font-bold bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 transition cursor-pointer flex items-center gap-1"
                  >
                    <WebIcon name="download" className="w-3 h-3" />
                    <span>Tải mã QR (.svg)</span>
                  </button>
                </div>
              </div>

              {/* Cột Sao chép & Nhập nhanh Preset giữa các thiết bị */}
              <div className="md:col-span-8 flex flex-col gap-3">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-slate-700 dark:text-slate-200">
                      Mã Preset Rút Gọn (Chia sẻ nhanh giữa các thiết bị):
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleCopyPresetCode('code')}
                        className="px-2.5 py-0.5 rounded-full text-[10.5px] font-bold bg-indigo-600 hover:bg-indigo-700 text-white transition cursor-pointer flex items-center gap-1"
                      >
                        <WebIcon name="copy" className="w-3 h-3" />
                        <span>Chép Mã Rút Gọn</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleCopyPresetCode('json')}
                        className="px-2.5 py-0.5 rounded-full text-[10.5px] font-bold bg-fuchsia-600 hover:bg-fuchsia-700 text-white transition cursor-pointer flex items-center gap-1"
                      >
                        <WebIcon name="copy" className="w-3 h-3" />
                        <span>Chép JSON</span>
                      </button>
                    </div>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-900 text-cyan-300 font-mono text-[10.5px] overflow-x-auto whitespace-nowrap border border-slate-700">
                    {studioPresetCode}
                  </div>
                </div>

                <div className="flex flex-col gap-1.5 pt-1 border-t border-slate-200/80 dark:border-slate-700">
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-200">
                    Nhập Preset Từ Thiết Bị Khác (Dán mã HTG1:... hoặc chuỗi JSON):
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={presetImportText}
                      onChange={(e) => setPresetImportText(e.target.value)}
                      placeholder="Dán mã HTG1:M:135:... hoặc chuỗi JSON vào đây..."
                      className="flex-1 px-3 py-1.5 rounded-xl text-xs font-mono bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-fuchsia-500/40"
                    />
                    <button
                      type="button"
                      onClick={handleImportStudioPreset}
                      className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white transition cursor-pointer shrink-0"
                    >
                      Nạp Preset
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

          {/* TAB 3: NHẬP & XUẤT DỮ LIỆU HÌNH NỀN JSON */}
          {addModalTab === 'json' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-stretch animate-fadeIn">
              {/* Cột Trái: Nhập Dữ Liệu JSON */}
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/75 border border-slate-200 dark:border-slate-700 flex flex-col justify-between gap-3">
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
                      <WebIcon name="upload" className="w-4 h-4 shrink-0" />
                      <h5 className="text-xs sm:text-sm font-black font-play">
                        {formatCardTitle('Nhập dữ liệu JSON')}
                      </h5>
                    </div>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-400/30">
                      Hỗ trợ Mảng & Object
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
                    Dán cấu trúc JSON hình nền vào khung bên dưới hoặc tải trực tiếp tệp <code className="font-mono font-bold text-emerald-600 dark:text-emerald-400">.json</code> từ máy tính của bạn để khôi phục kho hình nền.
                  </p>

                  <textarea
                    rows={6}
                    value={jsonTextInput}
                    onChange={(e) => setJsonTextInput(e.target.value)}
                    placeholder={`[\n  {\n    "name": "Hình nền Aurora",\n    "type": "image",\n    "value": "https://images.unsplash.com/..."\n  }\n]`}
                    className="w-full p-3 rounded-xl text-xs font-mono bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-emerald-300 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 resize-none"
                  />
                </div>

                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => jsonInputRef.current?.click()}
                    className="flex-1 py-2 px-3 rounded-xl text-xs font-bold bg-white dark:bg-slate-900 hover:bg-emerald-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-600 transition cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <WebIcon name="folder-open" className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                    <span>Chọn tệp .json từ máy</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleImportJsonFromText}
                    className="flex-1 py-2 px-3 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shadow-md shadow-emerald-500/20 transition cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <WebIcon name="check" className="w-3.5 h-3.5" />
                    <span>Nạp dữ liệu JSON</span>
                  </button>
                </div>
              </div>

              {/* Cột Phải: Xuất & Sao Lưu JSON */}
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/75 border border-slate-200 dark:border-slate-700 flex flex-col justify-between gap-3">
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <div className="flex items-center gap-1.5 text-indigo-600 dark:text-indigo-400">
                      <WebIcon name="download" className="w-4 h-4 shrink-0" />
                      <h5 className="text-xs sm:text-sm font-black font-play">
                        {formatCardTitle('Xuất dữ liệu JSON')}
                      </h5>
                    </div>

                    {/* Chọn phạm vi xuất */}
                    <div className="flex items-center gap-1 bg-slate-200/80 dark:bg-slate-900 p-0.5 rounded-lg border border-slate-300/70 dark:border-slate-700">
                      {[
                        { id: 'custom', label: `Tùy chỉnh (${customList.length})` },
                        { id: 'active', label: 'Đang dùng (1)' },
                        { id: 'all', label: `Tất cả (${customList.length + WALLPAPER_OPTIONS.length})` },
                      ].map((sc) => (
                        <button
                          key={sc.id}
                          type="button"
                          onClick={() => setJsonExportScope(sc.id as 'custom' | 'active' | 'all')}
                          className={`px-2 py-0.5 rounded-md text-[10px] font-bold transition cursor-pointer ${
                            jsonExportScope === sc.id
                              ? 'bg-indigo-600 text-white shadow-2xs'
                              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                          }`}
                        >
                          {sc.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
                    Xem trước cấu trúc dữ liệu JSON chuẩn hoặc tải xuống tệp sao lưu để chia sẻ và đồng bộ sang thiết bị khác.
                  </p>

                  <pre className="w-full h-[132px] p-3 rounded-xl text-[11px] font-mono bg-slate-900 text-cyan-300 border border-slate-700 overflow-auto leading-relaxed select-all">
                    {jsonExportPreview}
                  </pre>
                </div>

                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <button
                    type="button"
                    onClick={handleCopyJsonExport}
                    className="flex-1 py-2 px-3 rounded-xl text-xs font-bold bg-white dark:bg-slate-900 hover:bg-indigo-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-600 transition cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <WebIcon name="copy" className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                    <span>Sao chép mã JSON</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleDownloadScopedJson}
                    className="flex-1 py-2 px-3 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-indigo-600 to-fuchsia-600 hover:from-indigo-700 hover:to-fuchsia-700 shadow-md shadow-indigo-500/20 transition cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <WebIcon name="download" className="w-3.5 h-3.5" />
                    <span>Tải tệp .json về máy</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 5. Grid danh sách hình nền (Custom + Mặc định hệ thống) */}
      <div className="w-full flex items-center justify-between gap-2.5 pt-1 px-1">
        <span className="text-xs font-bold text-slate-700 dark:text-slate-200">
          Kho Hình Nền ({allWallpapers.length} mẫu):
        </span>

        <span className="text-[11px] text-indigo-600 dark:text-indigo-400 font-semibold italic flex items-center gap-1">
          <WebIcon name="bulb" className="w-3.5 h-3.5" />
          <span>Click 2 lần liên tiếp vào hình nền bất kỳ để làm mặc định</span>
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {allWallpapers.map((wp) => {
          const isDefault = defaultId === wp.id;
          const isActive = activeWallpaperId === wp.id;
          const isFavorite = favoriteIds.includes(wp.id);
          const isCssCopyable =
            wp.type === 'css' || wp.type === 'gradient' || wp.type === 'color' || wp.type === 'class';
          const isCopied = copiedId === wp.id;
          const wpTone = getWallpaperTone(wp);

          return (
            <div
              key={wp.id}
              onClick={() => handleSingleClick(wp)}
              onDoubleClick={() => handleDoubleClick(wp)}
              className={`p-2.5 rounded-2xl border transition-all duration-300 cursor-pointer group flex flex-col gap-2 select-none relative hover:-translate-y-1.5 hover:scale-[1.02] hover:shadow-xl hover:border-fuchsia-400 dark:hover:border-cyan-400/60 ${
                isDefault
                  ? 'bg-amber-50/80 dark:bg-amber-950/30 border-amber-400 ring-2 ring-amber-300 shadow-md'
                  : isActive
                  ? 'bg-white dark:bg-slate-900 border-fuchsia-500 ring-2 ring-fuchsia-200 shadow-md'
                  : 'bg-white/75 dark:bg-slate-900/70 border-slate-200/90 dark:border-white/10 shadow-2xs hover:bg-white dark:hover:bg-slate-900'
              }`}
              title="Nhấp 1 lần: Xem thử • Nhấp 2 lần (double-click): Đặt làm mặc định"
            >
              {/* Badges: Default, Active, Tone (Sáng / Tối) */}
              <div className="absolute top-3.5 left-3.5 z-10 flex flex-col gap-1 items-start pointer-events-none">
                {isDefault && (
                  <span className="px-2 py-0.5 rounded-full text-[9.5px] font-black bg-amber-500 text-white shadow-xs flex items-center gap-1 animate-pulse">
                    <WebIcon name="sparkles" className="w-3 h-3" />
                    <span>Mặc định</span>
                  </span>
                )}
                {isActive && !isDefault && (
                  <span className="px-2 py-0.5 rounded-full text-[9.5px] font-bold bg-fuchsia-600 text-white shadow-xs flex items-center gap-1">
                    <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M20 6 9 17l-5-5" /></svg>
                    <span>Đang chọn</span>
                  </span>
                )}
                <span className={`px-1.5 py-0.2 rounded-full text-[8.5px] font-extrabold backdrop-blur-sm border shadow-2xs flex items-center gap-0.5 ${
                  wpTone === 'light'
                    ? 'bg-amber-100/90 text-amber-900 border-amber-300/80'
                    : 'bg-slate-900/85 text-cyan-300 border-cyan-500/40'
                }`}>
                  <span>{wpTone === 'light' ? '☀️ Sáng' : '🌙 Tối'}</span>
                </span>
                {isBlurredWallpaper(wp) && (
                  <span className="px-1.5 py-0.2 rounded-full text-[8.5px] font-extrabold bg-indigo-600/90 text-white border border-indigo-300/50 backdrop-blur-sm shadow-2xs flex items-center gap-0.5">
                    <span>🌫️ Nền Mờ</span>
                  </span>
                )}
              </div>

              {/* Action buttons top-right: Set Default Star, Favorite Heart, Copy CSS & Delete */}
              <div className="absolute top-3.5 right-3.5 z-10 flex items-center gap-1">
                {/* Nút đặt mặc định dạng ngôi sao */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSetDefault(wp);
                  }}
                  title={
                    isDefault
                      ? `"${wp.name}" đang là hình nền mặc định của bạn`
                      : `Đặt "${wp.name}" làm hình nền mặc định vĩnh viễn`
                  }
                  className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer shadow-sm ${
                    isDefault
                      ? 'bg-amber-500 text-white opacity-100 scale-105 shadow-amber-500/50'
                      : 'bg-black/50 hover:bg-amber-500 text-white opacity-0 group-hover:opacity-100 hover:scale-105'
                  }`}
                >
                  <WebIcon name="star" className="w-3 h-3 fill-current" />
                </button>

                <button
                  type="button"
                  onClick={(e) => handleToggleFavorite(e, wp)}
                  title={
                    isFavorite
                      ? `Bỏ "${wp.name}" khỏi danh sách Yêu thích`
                      : `Thêm "${wp.name}" vào danh sách Yêu thích`
                  }
                  className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer shadow-sm ${
                    isFavorite
                      ? 'bg-rose-600 text-white opacity-100 scale-105'
                      : 'bg-black/50 hover:bg-rose-500 text-white opacity-0 group-hover:opacity-100'
                  }`}
                >
                  <WebIcon name="heart" className="w-3 h-3" />
                </button>

                {isCssCopyable && (
                  <button
                    type="button"
                    onClick={(e) => handleCopyCardCss(e, wp)}
                    title={`Sao chép mã CSS của "${wp.name}"`}
                    className={`h-6 px-2 rounded-full text-white flex items-center justify-center gap-1 text-[10px] font-bold transition-all duration-200 cursor-pointer shadow-sm ${
                      isCopied
                        ? 'bg-emerald-600 opacity-100'
                        : 'bg-black/55 hover:bg-indigo-600 opacity-0 group-hover:opacity-100'
                    }`}
                  >
                    <WebIcon name={isCopied ? 'check' : 'copy'} className="w-3 h-3" />
                    <span>{isCopied ? 'Đã chép' : 'CSS'}</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={(e) => handleDeleteWallpaper(e, wp.id, wp.name)}
                  title={`Xóa "${wp.name}"`}
                  className="w-6 h-6 rounded-full bg-black/50 hover:bg-rose-600 text-white flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-all duration-200 cursor-pointer shadow-sm"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M18 6 6 18M6 6l12 12" /></svg>
                </button>
              </div>

              {/* Thumbnail preview */}
              <div
                className={`w-full h-24 rounded-xl border border-black/10 overflow-hidden relative transition-transform duration-300 group-hover:scale-102 flex items-center justify-center bg-slate-100 dark:bg-slate-800 ${
                  wp.className || ''
                }`}
                style={
                  wp.type !== 'video' && wp.type !== 'codepen'
                    ? sanitizeWallpaperStyle(
                        wp.previewStyle,
                        wp.type === 'css' || wp.type === 'gradient' || wp.type === 'color' ? wp.value : undefined
                      )
                    : undefined
                }
              >
                {/* 1. Video Thumbnail: Preload metadata and video loop muted */}
                {wp.type === 'video' && (
                  <>
                    <video
                      src={wp.value}
                      autoPlay
                      loop
                      muted
                      playsInline
                      preload="metadata"
                      className="w-full h-full object-cover absolute inset-0 pointer-events-none"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                    <span className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded text-[9px] font-bold bg-black/60 text-white backdrop-blur-xs flex items-center gap-1 shadow-xs">
                      <WebIcon name="video" className="w-2.5 h-2.5 text-cyan-400" />
                      <span>Video</span>
                    </span>
                  </>
                )}

                {/* 2. CodePen Thumbnail & Live Animation Preview */}
                {wp.type === 'codepen' && (
                  <div className="absolute inset-0 bg-slate-950 overflow-hidden pointer-events-none">
                    {wp.previewStyle?.backgroundImage ? (
                      <div
                        className="w-full h-full bg-cover bg-center"
                        style={{ backgroundImage: wp.previewStyle.backgroundImage }}
                      />
                    ) : (
                      <iframe
                        src={normalizeCodepenUrl(wp.value)}
                        title={wp.name}
                        className="w-[200%] h-[200%] -top-[50%] -left-[50%] absolute border-0 pointer-events-none origin-center scale-50"
                        sandbox="allow-scripts allow-same-origin"
                        loading="lazy"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20 pointer-events-none" />
                    <span className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded text-[9px] font-bold bg-emerald-600/95 text-white backdrop-blur-xs shadow-xs flex items-center gap-1 border border-emerald-400/40">
                      <WebIcon name="code" className="w-2.5 h-2.5" />
                      <span>CodePen Live</span>
                    </span>
                  </div>
                )}

                {/* 3. Image Thumbnail */}
                {wp.type === 'image' && (
                  <>
                    {wp.value && (wp.value.startsWith('http') || wp.value.startsWith('data:')) && (
                      <img
                        src={wp.value}
                        alt={wp.name}
                        loading="lazy"
                        className="w-full h-full object-cover absolute inset-0 pointer-events-none"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent pointer-events-none" />
                    <span className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded text-[9px] font-bold bg-black/60 text-white backdrop-blur-xs shadow-xs">
                      Ảnh
                    </span>
                  </>
                )}

                {/* 4. CSS / Gradient Thumbnail */}
                {(wp.type === 'css' || wp.type === 'gradient' || wp.type === 'color') && (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent pointer-events-none" />
                    <span className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded text-[9px] font-bold bg-black/60 text-white backdrop-blur-xs flex items-center gap-1 shadow-xs">
                      <WebIcon name="palette" className="w-2.5 h-2.5 text-fuchsia-400" />
                      <span>{wp.type === 'gradient' ? 'Gradient' : 'CSS'}</span>
                    </span>
                  </>
                )}
              </div>

              {/* Tên hình nền & Icon đồng màu, kích thước bằng nhau, không đóng khung thẻ */}
              <div className="flex items-center justify-between gap-1 mt-0.5">
                <div className="flex items-center gap-1.5 truncate flex-1 min-w-0">
                  <span
                    className={`shrink-0 flex items-center ${
                      isDefault
                        ? 'text-amber-800 dark:text-amber-300'
                        : isActive
                        ? 'text-fuchsia-700 dark:text-fuchsia-300'
                        : 'text-slate-600 dark:text-slate-300 group-hover:text-fuchsia-600 dark:group-hover:text-fuchsia-400'
                    }`}
                  >
                    <WebIcon
                      name={wp.type === 'video' ? 'video' : wp.type === 'image' ? 'image' : wp.type === 'codepen' ? 'code' : 'palette'}
                      className="w-3.5 h-3.5"
                    />
                  </span>
                  <span
                    className={`text-xs font-bold truncate ${
                      isDefault
                        ? 'text-amber-800 dark:text-amber-300 font-black'
                        : isActive
                        ? 'text-fuchsia-700 dark:text-fuchsia-300'
                        : 'text-slate-700 dark:text-slate-200 group-hover:text-fuchsia-600 dark:group-hover:text-fuchsia-400'
                    }`}
                  >
                    {wp.name}
                  </span>
                </div>

                {isCssCopyable && (
                  <button
                    type="button"
                    onClick={(e) => handleCopyCardCss(e, wp)}
                    title="Sao chép đoạn mã CSS vào bộ nhớ tạm"
                    className={`text-[9.5px] font-mono px-1.5 py-0.5 rounded border transition cursor-pointer flex items-center gap-0.5 shrink-0 ${
                      isCopied
                        ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-300'
                    }`}
                  >
                    <WebIcon name={isCopied ? 'check' : 'copy'} className="w-2.5 h-2.5" />
                    <span>{isCopied ? 'Đã chép' : 'Copy CSS'}</span>
                  </button>
                )}

                {wp.isCustom && !isCssCopyable && (
                  <span className="text-[9px] uppercase font-mono px-1.5 py-0.2 rounded bg-indigo-100 text-indigo-700">
                    Tự tạo
                  </span>
                )}

                {/* Nút / Nhãn Đặt mặc định ở chân thẻ */}
                {isDefault ? (
                  <span className="text-[9.5px] font-bold px-1.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-900/60 text-amber-800 dark:text-amber-200 border border-amber-300 dark:border-amber-600 flex items-center gap-0.5 shrink-0">
                    <WebIcon name="star" className="w-2.5 h-2.5 fill-current text-amber-500" />
                    <span>Mặc định</span>
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSetDefault(wp);
                    }}
                    title={`Đặt "${wp.name}" làm hình nền mặc định khi truy cập website`}
                    className="text-[9.5px] font-semibold px-1.5 py-0.5 rounded-full border border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-400 hover:text-amber-600 dark:hover:text-amber-300 hover:border-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/40 transition cursor-pointer flex items-center gap-0.5 shrink-0 opacity-0 group-hover:opacity-100"
                  >
                    <WebIcon name="star" className="w-2.5 h-2.5" />
                    <span>Đặt mặc định</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
      </div>

      
    </div>
  );
};

