'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { PAGES } from '@/data/pages';
import { WEATHER_PRESETS } from '@/data/weather';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { BackgroundLayer } from '@/components/layout/BackgroundLayer';
import { GlassPanel } from '@/components/ui/GlassPanel';
import { WebIcon } from '@/components/ui/WebIcon';
import { SoundEngine } from '@/components/ui/SoundEngine';
import { WallpaperOption, SiteTheme } from '@/types';
import { WALLPAPER_OPTIONS } from '@/data/wallpapers';
import {
  loadCustomWallpapers,
  getDefaultWallpaperId,
  setDefaultWallpaperId as persistDefaultWallpaperId,
  findWallpaperById,
  parseCssToReactStyle,
  loadWallpaperSettings,
  saveWallpaperSettings,
  loadDeletedWallpaperIds,
  loadFavoriteWallpaperIds,
  DEFAULT_WALLPAPER_SETTINGS,
  WallpaperAdvancedSettings,
  getWallpaperTone,
  isBlurredWallpaper,
  normalizeCodepenUrl,
} from '@/utils/wallpaperStorage';
import { AiChatModal } from '@/components/ui/AiChatModal';
import { ThemeSelectorModal } from '@/components/ui/ThemeSelectorModal';
import { Pages3DCarouselModal } from '@/components/ui/Pages3DCarouselModal';
import { XRayEditor } from '@/components/ui/XRayEditor';
import { NetworkDebugModal } from '@/components/ui/NetworkDebugModal';

// Views
import { HomeView } from '@/components/views/HomeView';
import { LetterView } from '@/components/views/LetterView';
import { AboutView } from '@/components/views/AboutView';
import { EducationView } from '@/components/views/EducationView';
import { DomainsView } from '@/components/views/DomainsView';
import { ExperienceView } from '@/components/views/ExperienceView';
import { SkillsView } from '@/components/views/SkillsView';
import { ProjectsView } from '@/components/views/ProjectsView';
import { SystemsView } from '@/components/views/SystemsView';
import { InterviewView } from '@/components/views/InterviewView';
import { HoroscopeView } from '@/components/views/HoroscopeView';
import { MemoriesView } from '@/components/views/MemoriesView';
import { ContactView } from '@/components/views/ContactView';
import { WallpaperView } from '@/components/views/WallpaperView';

export default function HomePage() {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [currentTheme, setCurrentTheme] = useState<SiteTheme>('light-glass');
  const [isThemeTransitioning, setIsThemeTransitioning] = useState<boolean>(false);
  const [isAiChatOpen, setIsAiChatOpen] = useState<boolean>(false);
  const [isThemeModalOpen, setIsThemeModalOpen] = useState<boolean>(false);
  const [isPagesCarouselOpen, setIsPagesCarouselOpen] = useState<boolean>(false);
  const [isNetworkDebugOpen, setIsNetworkDebugOpen] = useState<boolean>(false);
  const [wallpaperClass, setWallpaperClass] = useState<string>('prism-light-bg');
  const [wallpaperStyle, setWallpaperStyle] = useState<React.CSSProperties>({});
  const [wallpaperVideo, setWallpaperVideo] = useState<string>('');
  const [wallpaperCodepen, setWallpaperCodepen] = useState<string>('');
  const [wallpaperRawCss, setWallpaperRawCss] = useState<string>('');
  const [activeWallpaperId, setActiveWallpaperId] = useState<string>('prism');
  const [activeWallpaperOption, setActiveWallpaperOption] = useState<WallpaperOption | undefined>(
    WALLPAPER_OPTIONS[0]
  );
  const [defaultWallpaperId, setDefaultWallpaperId] = useState<string>('aurora');
  const [wallpaperSettings, setWallpaperSettings] = useState<WallpaperAdvancedSettings>(
    DEFAULT_WALLPAPER_SETTINGS
  );
  const [weatherIdx, setWeatherIdx] = useState<number>(0);
  const [showBackToTop, setShowBackToTop] = useState<boolean>(false);
  const [isZenMode, setIsZenMode] = useState<boolean>(false);
  const [zenCountdown, setZenCountdown] = useState<number | null>(null);

  // Wallpaper Slideshow Live State & Dynamic Island Pill Toast
  const [slideshowProgress, setSlideshowProgress] = useState<number>(0);
  const [slideshowSecondsLeft, setSlideshowSecondsLeft] = useState<number>(30);
  const [pillToast, setPillToast] = useState<{ name: string; tag: string; type: string } | null>(null);
  const pillToastTimerRef = useRef<NodeJS.Timeout | null>(null);
  const slideshowStartTimeRef = useRef<number>(Date.now());
  const contentDisplayRef = useRef<HTMLDivElement | null>(null);
  const activeScrollTargetRef = useRef<HTMLElement | null>(null);
  const activeWallpaperIdRef = useRef<string>(activeWallpaperId);
  const wallpaperSettingsRef = useRef<WallpaperAdvancedSettings>(wallpaperSettings);
  useEffect(() => {
    activeWallpaperIdRef.current = activeWallpaperId;
  }, [activeWallpaperId]);
  useEffect(() => {
    wallpaperSettingsRef.current = wallpaperSettings;
  }, [wallpaperSettings]);

  const currentWeather = WEATHER_PRESETS[weatherIdx] || WEATHER_PRESETS[0];

  // Trigger Zen Mode (Full-screen Wallpaper Preview by hiding Header, Footer & Center Card)
  const handleTriggerZenMode = useCallback((durationSeconds?: number) => {
    SoundEngine.playTap();
    setIsZenMode(true);
    if (typeof durationSeconds === 'number' && durationSeconds > 0) {
      setZenCountdown(durationSeconds);
    } else {
      setZenCountdown(null);
    }
  }, []);

  // Zen Mode countdown & Escape key listener
  useEffect(() => {
    if (!isZenMode) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsZenMode(false);
        setZenCountdown(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isZenMode]);

  useEffect(() => {
    if (!isZenMode || zenCountdown === null) return;
    if (zenCountdown <= 0) {
      setIsZenMode(false);
      setZenCountdown(null);
      return;
    }
    const timer = window.setTimeout(() => {
      setZenCountdown((prev) => (prev !== null ? prev - 1 : null));
    }, 1000);
    return () => window.clearTimeout(timer);
  }, [isZenMode, zenCountdown]);

  // Reset Back to Top visibility when changing pages
  useEffect(() => {
    setShowBackToTop(false);
    activeScrollTargetRef.current = null;
  }, [currentPage]);

  // Track scroll position (> 300px) in #content-display or any nested scrollable container
  const handleContentScrollCapture = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    if (!target || typeof target.scrollTop !== 'number') return;

    // Ignore horizontal-only scroll bars where vertical scroll isn't applicable
    if (target.scrollHeight <= target.clientHeight) return;

    activeScrollTargetRef.current = target;
    const containerScrollTop = contentDisplayRef.current?.scrollTop || 0;
    const effectiveScrollTop = Math.max(target.scrollTop, containerScrollTop);
    setShowBackToTop(effectiveScrollTop > 300);
  }, []);

  // Smoothly scroll the content area back to the top
  const handleScrollToTop = useCallback(() => {
    SoundEngine.playTap();
    if (activeScrollTargetRef.current) {
      activeScrollTargetRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
    if (contentDisplayRef.current) {
      contentDisplayRef.current.scrollTo({ top: 0, behavior: 'smooth' });
      const nestedScrollables = contentDisplayRef.current.querySelectorAll<HTMLElement>('.overflow-y-auto');
      nestedScrollables.forEach((el) => {
        if (el.scrollTop > 0) {
          el.scrollTo({ top: 0, behavior: 'smooth' });
        }
      });
    }
  }, []);

  const handlePrevPage = () => {
    SoundEngine.playTap();
    setCurrentPage((prev) => (prev > 0 ? prev - 1 : PAGES.length - 1));
  };

  const handleNextPage = () => {
    SoundEngine.playTap();
    setCurrentPage((prev) => (prev < PAGES.length - 1 ? prev + 1 : 0));
  };

  const handleCycleWeather = () => {
    SoundEngine.playTap();
    setWeatherIdx((prev) => (prev + 1) % WEATHER_PRESETS.length);
  };

  // Apply a WallpaperOption to the background layer & persist long-term in localStorage (no cookies)
  const applyWallpaperOption = useCallback((wp: WallpaperOption, persist: boolean = true) => {
    setActiveWallpaperId(wp.id);
    setActiveWallpaperOption(wp);

    if (persist && typeof window !== 'undefined') {
      try {
        localStorage.setItem('hungthai_active_wallpaper_id', wp.id);
      } catch (err) {
        console.warn('Could not persist wallpaper to localStorage:', err);
      }
    }

    // Reset countdown clock upon applying a wallpaper
    slideshowStartTimeRef.current = Date.now();

    // Subtle Dynamic Island Pill Toast trigger
    if (wallpaperSettingsRef.current.slideshowPillToastEnabled ?? true) {
      const isBlurred = isBlurredWallpaper(wp);
      setPillToast({
        name: wp.name,
        tag: isBlurred ? '🌫️ Nền Mờ' : getWallpaperTone(wp) === 'light' ? 'Nền Sáng' : 'Nền Tối',
        type: wp.type.toUpperCase(),
      });
      if (pillToastTimerRef.current) clearTimeout(pillToastTimerRef.current);
      pillToastTimerRef.current = setTimeout(() => {
        setPillToast(null);
      }, 2400);
    }

    if (wp.type === 'video') {
      setWallpaperVideo(wp.value);
      setWallpaperCodepen('');
      setWallpaperRawCss('');
      setWallpaperClass('');
      setWallpaperStyle({});
    } else if (wp.type === 'codepen' || wp.value.includes('codepen.io')) {
      setWallpaperVideo('');
      setWallpaperCodepen(normalizeCodepenUrl(wp.value));
      setWallpaperRawCss('');
      setWallpaperClass('');
      setWallpaperStyle({});
    } else if (wp.type === 'image') {
      setWallpaperVideo('');
      setWallpaperCodepen('');
      setWallpaperRawCss('');
      setWallpaperClass('');
      setWallpaperStyle({
        backgroundImage: `url('${wp.value}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      });
    } else if (wp.type === 'class') {
      setWallpaperVideo('');
      setWallpaperCodepen('');
      setWallpaperRawCss('');
      setWallpaperClass(wp.value);
      setWallpaperStyle({});
    } else if (wp.type === 'color') {
      setWallpaperVideo('');
      setWallpaperCodepen('');
      setWallpaperRawCss('');
      setWallpaperClass('');
      setWallpaperStyle(parseCssToReactStyle(wp.value, wp.previewStyle));
    } else if (wp.type === 'gradient' || wp.type === 'css') {
      setWallpaperVideo('');
      setWallpaperCodepen('');
      const hasKeyframesOrComplexCss = wp.value.includes('@keyframes') || wp.value.includes('&::before') || wp.value.includes('&::after');
      if (hasKeyframesOrComplexCss) {
        setWallpaperRawCss(wp.value);
      } else {
        setWallpaperRawCss('');
      }
      setWallpaperClass(wp.className || '');
      setWallpaperStyle(parseCssToReactStyle(wp.value, wp.previewStyle));
    }
  }, []);

  // Update and persist advanced wallpaper settings
  const handleUpdateWallpaperSettings = useCallback(
    async (partial: Partial<WallpaperAdvancedSettings>) => {
      setWallpaperSettings((prev) => {
        const updated: WallpaperAdvancedSettings = { ...prev, ...partial };
        saveWallpaperSettings(updated);
        return updated;
      });
    },
    []
  );

  // Advance to the next wallpaper in the pool (for Slideshow mode or manual Next button)
  const handleNextSlideshowWallpaper = useCallback(async () => {
    try {
      const customWallpapers = await loadCustomWallpapers();
      const deletedIds = await loadDeletedWallpaperIds();
      const favoriteIds = await loadFavoriteWallpaperIds();
      const raw = [...customWallpapers, ...WALLPAPER_OPTIONS];
      const seenIds = new Set<string>();
      const allPool: WallpaperOption[] = [];

      for (const wp of raw) {
        if (deletedIds.includes(wp.id) || seenIds.has(wp.id)) continue;
        seenIds.add(wp.id);
        allPool.push(wp);
      }

      if (allPool.length === 0) return;

      let pool = allPool;
      if (wallpaperSettingsRef.current.slideshowFavoritesOnly && favoriteIds.length > 0) {
        const favPool = allPool.filter((wp) => favoriteIds.includes(wp.id));
        if (favPool.length > 0) {
          pool = favPool;
        }
      }

      // Phân loại và lọc hình nền phù hợp cho giao diện Tối (Dark Neon) hoặc Sáng (Light Glass) khi trình chiếu
      const themeMode = wallpaperSettingsRef.current.slideshowThemeMode || 'auto';
      if (themeMode === 'auto') {
        const targetTone = currentTheme === 'dark-neon' ? 'dark' : 'light';
        const toneFiltered = pool.filter((wp) => getWallpaperTone(wp) === targetTone);
        if (toneFiltered.length > 0) {
          pool = toneFiltered;
        }
      } else if (themeMode === 'light-only') {
        const lightOnly = pool.filter((wp) => getWallpaperTone(wp) === 'light');
        if (lightOnly.length > 0) {
          pool = lightOnly;
        }
      } else if (themeMode === 'dark-only') {
        const darkOnly = pool.filter((wp) => getWallpaperTone(wp) === 'dark');
        if (darkOnly.length > 0) {
          pool = darkOnly;
        }
      } else if (themeMode === 'time-of-day') {
        // Trình Chiếu Theo Khung Giờ Thực: 6:00 - 18:00 tông sáng/pastel, 18:00 - 6:00 tông tối/neon
        const hour = new Date().getHours();
        const isDaytime = hour >= 6 && hour < 18;
        const targetTone = isDaytime ? 'light' : 'dark';
        const timeFiltered = pool.filter((wp) => getWallpaperTone(wp) === targetTone);
        if (timeFiltered.length > 0) {
          pool = timeFiltered;
        }
      }

      const currentIdx = pool.findIndex((w) => w.id === activeWallpaperIdRef.current);
      const nextIdx = (currentIdx + 1) % pool.length;
      slideshowStartTimeRef.current = Date.now();
      applyWallpaperOption(pool[nextIdx]);
    } catch (e) {
      console.warn('Slideshow step error:', e);
    }
  }, [applyWallpaperOption, currentTheme]);

  // Wallpaper Slideshow Mode timer with Live Countdown Progress Bar
  useEffect(() => {
    if (!wallpaperSettings.slideshowEnabled) {
      setSlideshowProgress(0);
      return;
    }
    const intervalMs = Math.max(15_000, wallpaperSettings.slideshowIntervalMinutes * 60_000);
    slideshowStartTimeRef.current = Date.now();

    const ticker = window.setInterval(() => {
      const elapsed = Date.now() - slideshowStartTimeRef.current;
      const remainingMs = Math.max(0, intervalMs - elapsed);
      const progress = Math.min(100, (elapsed / intervalMs) * 100);
      setSlideshowProgress(progress);
      setSlideshowSecondsLeft(Math.max(0, Math.ceil(remainingMs / 1000)));

      if (elapsed >= intervalMs) {
        slideshowStartTimeRef.current = Date.now();
        handleNextSlideshowWallpaper();
      }
    }, 100);

    return () => window.clearInterval(ticker);
  }, [
    wallpaperSettings.slideshowEnabled,
    wallpaperSettings.slideshowIntervalMinutes,
    handleNextSlideshowWallpaper,
  ]);

  // Phím Tắt Toàn Cục Điều Khiển Trình Chiếu (Global Keyboard Shortcuts)
  // Space hoặc P: Bật/Tạm dừng trình chiếu
  // Mũi tên ->: Chuyển ngay sang hình nền kế tiếp
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.tagName === 'SELECT' ||
          target.isContentEditable ||
          target.closest('[role="dialog"]') ||
          target.closest('#ai-chat-modal'))
      ) {
        return;
      }

      if (e.code === 'Space' || e.key.toLowerCase() === 'p') {
        e.preventDefault();
        setWallpaperSettings((prev) => {
          const nextEnabled = !prev.slideshowEnabled;
          const updated = { ...prev, slideshowEnabled: nextEnabled };
          saveWallpaperSettings(updated);
          setPillToast({
            name: nextEnabled ? 'Đã bật Trình Chiếu Nền' : 'Đã tạm dừng Trình Chiếu',
            tag: nextEnabled ? 'Phím tắt [P/Space]' : 'Tạm dừng',
            type: 'SLIDESHOW',
          });
          if (pillToastTimerRef.current) clearTimeout(pillToastTimerRef.current);
          pillToastTimerRef.current = setTimeout(() => setPillToast(null), 2400);
          return updated;
        });
      } else if (e.key === 'ArrowRight' && !e.altKey && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        slideshowStartTimeRef.current = Date.now();
        handleNextSlideshowWallpaper();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNextSlideshowWallpaper]);

  // On mount: Default to light-glass (Glass UI Light Multicolor), clear legacy theme cache
  useEffect(() => {
    (async () => {
      try {
        // 1. Load persistent theme from localStorage
        let storedTheme: SiteTheme = 'light-glass';
        try {
          const saved = localStorage.getItem('hungthai_site_theme') as SiteTheme | null;
          if (saved === 'dark-neon' || saved === 'light-glass' || saved === 'luminous-glass') {
            storedTheme = saved;
          }
        } catch {}

        setCurrentTheme(storedTheme);
        document.documentElement.setAttribute('data-theme', storedTheme);
        if (storedTheme === 'dark-neon') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }

        // 1.1 Khôi phục persistent Display settings làm mặc định
        try {
          const savedPercent = localStorage.getItem('hungthai_font_scale_percent');
          let scaleVal = 100;
          if (savedPercent) {
            const parsed = parseInt(savedPercent, 10);
            if (!isNaN(parsed) && parsed >= 70 && parsed <= 160) {
              scaleVal = parsed;
            }
          }
          const scaleRatio = scaleVal / 100;
          let scaleKey: 'sm' | 'md' | 'lg' | '2xl' = 'md';
          if (scaleVal <= 85) scaleKey = 'sm';
          else if (scaleVal >= 125) scaleKey = '2xl';
          else if (scaleVal >= 110) scaleKey = 'lg';

          document.documentElement.style.fontSize = `${(16 * scaleRatio).toFixed(1)}px`;
          document.documentElement.style.setProperty('--a11y-fs', scaleRatio.toFixed(2));
          document.documentElement.setAttribute('data-font-scale', scaleKey);

          // A11y accessibility flags
          if (localStorage.getItem('hungthai_a11y_high_contrast') === '1') {
            document.documentElement.classList.add('a11y-high-contrast');
          }
          if (localStorage.getItem('hungthai_a11y_highlight_links') === '1') {
            document.documentElement.classList.add('a11y-highlight-links');
          }
          if (localStorage.getItem('hungthai_a11y_wide_lines') === '1') {
            document.documentElement.classList.add('a11y-wide-line-height');
          }
        } catch {}

        // 2. Load advanced wallpaper settings
        const loadedSettings = await loadWallpaperSettings();
        setWallpaperSettings(loadedSettings);

        // 3. Load custom wallpapers & restore active wallpaper from localStorage (long-term, no cookies)
        const customWallpapers = await loadCustomWallpapers();

        let persistentWpId = '';
        if (typeof window !== 'undefined') {
          persistentWpId =
            localStorage.getItem('hungthai_default_wallpaper_id') ||
            localStorage.getItem('hungthai_active_wallpaper_id') ||
            '';
        }
        if (!persistentWpId) {
          persistentWpId = await getDefaultWallpaperId();
        }

        if (persistentWpId) {
          setDefaultWallpaperId(persistentWpId);
          const found = findWallpaperById(persistentWpId, customWallpapers);
          if (found) {
            applyWallpaperOption(found, false);
            return;
          }
        }

        // Default wallpaper for current theme
        if (storedTheme === 'dark-neon') {
          setWallpaperClass('dark-neon-bg');
        } else if (storedTheme === 'luminous-glass') {
          setWallpaperClass('luminous-mesh-bg');
        } else {
          setWallpaperClass('prism-light-bg');
        }
      } catch (e) {
        console.warn('Could not load persistent theme/wallpaper:', e);
      }
    })();
  }, [applyWallpaperOption]);

  // Handle changing system theme (persistent in localStorage)
  const handleChangeTheme = (newTheme?: SiteTheme) => {
    const validTheme: SiteTheme =
      newTheme === 'dark-neon'
        ? 'dark-neon'
        : newTheme === 'luminous-glass'
        ? 'luminous-glass'
        : 'light-glass';
    
    // Trigger vivid dynamic transition wave
    setIsThemeTransitioning(true);
    if (typeof document !== 'undefined') {
      document.documentElement.classList.add('theme-transitioning');
      setTimeout(() => {
        document.documentElement.classList.remove('theme-transitioning');
        setIsThemeTransitioning(false);
      }, 750);
    }

    setCurrentTheme(validTheme);
    try {
      localStorage.setItem('hungthai_site_theme', validTheme);
      document.documentElement.setAttribute('data-theme', validTheme);
      if (validTheme === 'dark-neon') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } catch {
      // ignore
    }

    if (!wallpaperVideo && Object.keys(wallpaperStyle).length === 0) {
      if (validTheme === 'dark-neon') {
        setWallpaperClass('dark-neon-bg');
      } else if (validTheme === 'luminous-glass') {
        setWallpaperClass('luminous-mesh-bg');
      } else {
        setWallpaperClass('prism-light-bg');
      }
      setWallpaperStyle({});
    }
  };

  // Keyboard shortcut: Alt+Q mở nhanh mã QR Debug Mạng Wi-Fi
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.altKey && (e.key === 'q' || e.key === 'Q')) {
        e.preventDefault();
        SoundEngine.playTap();
        setIsNetworkDebugOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  return (
    <>
      {/* Vivid Theme Transition Overlay */}
      <div
        className={`theme-vivid-overlay ${isThemeTransitioning ? 'is-animating' : ''}`}
        aria-hidden="true"
      >
        <div className="theme-vivid-wave" />
      </div>

      {/* Background Ambient Layer */}
      <BackgroundLayer
        wallpaperClass={wallpaperClass}
        wallpaperStyle={wallpaperStyle}
        wallpaperVideo={wallpaperVideo}
        wallpaperCodepen={wallpaperCodepen}
        wallpaperRawCss={wallpaperRawCss}
        theme={currentTheme}
        currentPage={currentPage}
        dimmerOpacity={wallpaperSettings.dimmerOpacity}
        blurAmount={wallpaperSettings.blurAmount}
        parallaxEnabled={false}
        weatherSyncEnabled={false}
        weatherCondition={currentWeather?.condition}
        cinematicLut="none"
        livingMeshEnabled={false}
        livingMeshSpeed="normal"
        transitionEffect={wallpaperSettings.slideshowTransitionEffect}
      />

      {/* Thông Báo Mini Khi Đổi Nền (Subtle Dynamic Island Pill Toast) */}
      {pillToast && (wallpaperSettings.slideshowPillToastEnabled ?? true) && (
        <div className="fixed top-3.5 sm:top-4 inset-x-0 z-50 flex justify-center pointer-events-none px-4 animate-fade-in transition-all duration-300">
          <div className="pointer-events-auto flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-slate-950/85 text-white border border-white/20 backdrop-blur-2xl shadow-[0_16px_40px_rgba(0,0,0,0.55)]">
            <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee] animate-pulse" />
            <div className="flex items-center gap-2 text-xs">
              <span className="font-bold tracking-wide text-white">{pillToast.name}</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-white/15 text-cyan-300">
                {pillToast.tag}
              </span>
              <span className="px-1.5 py-0.5 rounded text-[9px] font-mono uppercase bg-cyan-500/20 text-cyan-200 border border-cyan-400/30">
                {pillToast.type}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Thanh Tiến Trình Đếm Ngược Hình Nền (Live Countdown Progress Bar) */}
      {wallpaperSettings.slideshowEnabled && (wallpaperSettings.slideshowShowCountdown ?? true) && (
        <div
          className="fixed bottom-0 inset-x-0 z-40 pointer-events-none group"
          title={`Trình chiếu hình nền tự động: còn ${slideshowSecondsLeft}s`}
        >
          <div className="w-full h-[3px] bg-black/20 backdrop-blur-sm overflow-hidden relative">
            <div
              className="h-full bg-gradient-to-r from-cyan-400 via-indigo-500 to-fuchsia-500 transition-[width] duration-100 ease-linear shadow-[0_0_8px_rgba(34,211,238,0.7)]"
              style={{ width: `${slideshowProgress}%` }}
            />
          </div>
          <div className="absolute bottom-1.5 right-3 pointer-events-auto flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold backdrop-blur-xl bg-slate-900/70 text-slate-200 border border-white/15 shadow-md select-none transition-opacity duration-200 hover:opacity-100 opacity-75">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Nền kế tiếp: {slideshowSecondsLeft}s</span>
          </div>
        </div>
      )}

      {/* Floating Zen Mode HUD Bar (Appears when Header, Footer & Center Card are hidden) */}
      {isZenMode && (
        <div className="fixed bottom-6 inset-x-0 z-50 flex justify-center px-4 pointer-events-none animate-fade-in">
          <div className="pointer-events-auto flex flex-wrap items-center gap-2.5 px-4 py-2.5 rounded-full bg-slate-950/75 text-white border border-white/25 backdrop-blur-2xl shadow-[0_12px_40px_rgba(0,0,0,0.55)]">
            <span className="w-2.5 h-2.5 rounded-full shrink-0 bg-sky-400 shadow-[0_0_10px_#38bdf8]" />
            <span className="text-xs font-bold tracking-wide">
              Zen Mode: <span className="text-cyan-300">{activeWallpaperOption?.name || 'Hình nền hiện tại'}</span>
            </span>

            {zenCountdown !== null && (
              <span className="px-2 py-0.5 rounded-full text-[10.5px] font-mono font-bold bg-white/15 text-amber-300">
                Tự hiện UI sau {zenCountdown}s
              </span>
            )}

            {zenCountdown !== null && (
              <button
                type="button"
                onClick={() => setZenCountdown(null)}
                className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-white/15 hover:bg-white/25 text-white transition cursor-pointer"
                title="Giữ chế độ toàn màn hình không giới hạn thời gian"
              >
                Giữ Zen Mode
              </button>
            )}

            <button
              type="button"
              onClick={handleNextSlideshowWallpaper}
              className="px-3 py-1 rounded-full text-[11px] font-bold bg-indigo-600/90 hover:bg-indigo-500 text-white transition cursor-pointer flex items-center gap-1"
            >
              <span>Đổi nền kế tiếp</span>
              <WebIcon name="chevron-right" className="w-3 h-3" />
            </button>

            <button
              type="button"
              onClick={() => {
                SoundEngine.playTap();
                setIsZenMode(false);
                setZenCountdown(null);
              }}
              className="px-3.5 py-1 rounded-full text-[11px] font-bold bg-gradient-to-r from-fuchsia-600 to-rose-600 hover:from-fuchsia-500 hover:to-rose-500 text-white shadow-sm transition cursor-pointer flex items-center gap-1"
            >
              <WebIcon name="eye" className="w-3.5 h-3.5" />
              <span>Hiện lại Giao diện (ESC)</span>
            </button>
          </div>
        </div>
      )}

      {/* Main UI Root Layout (Header bám sát mép trên, Footer bám sát mép dưới) */}
      <div
        id="app-root-layout"
        className={`w-full h-full h-[100dvh] max-h-[100dvh] flex flex-col justify-between items-center relative z-10 overflow-hidden transition-all duration-500 py-0 pt-0 pb-0 ${
          isZenMode ? 'opacity-0 scale-[0.985] pointer-events-none select-none' : 'opacity-100 scale-100'
        }`}
      >
        {/* 
          HEADER:
          - Chiều dài: 1200px (căn giữa mx-auto, giới hạn max-w-[calc(100%-16px)] sm:max-w-[calc(100%-40px)])
          - Bám sát mép trên cùng, không bo góc trên, chỉ bo cong 2 góc dưới (rounded-b-[20px])
          - Chiều cao h-[64px]-h-[68px]
        */}
        <Header
          pages={PAGES}
          currentPage={currentPage}
          currentTheme={currentTheme}
          onSelectPage={setCurrentPage}
          onOpenAiChat={() => setIsAiChatOpen(true)}
        />

        {/* 
          CENTER CARD:
          - Chiều dài: 1200px đồng nhất với Header và Footer (mx-auto, max-w-[calc(100%-16px)] sm:max-w-[calc(100%-40px)])
          - Khoảng cách với header & footer: my-[4px] sm:my-[8px] md:my-[10px]
          - Bo cong cả 4 góc 14px (rounded-[14px])
          - Hiệu ứng nổi 3D, đổ bóng phân tầng cao cấp
        */}
        <main
          id="center-card"
          className={`w-[1200px] max-w-[calc(100%-16px)] sm:max-w-[calc(100%-40px)] mx-auto my-[4px] sm:my-[8px] md:my-[10px] flex-1 min-h-0 glass-panel overflow-hidden flex flex-col relative z-20 transition-all duration-500 elevated-float-card group/main ${
            currentTheme === 'dark-neon'
              ? 'rounded-[14px] border border-cyan-400/40 shadow-[0_20px_60px_rgba(0,0,0,0.85),0_0_24px_rgba(34,211,238,0.18)]'
              : 'rounded-[14px] border border-white/90 shadow-xl'
          }`}
        >
          {/* Dynamic Page Transition Beam Indicator */}
          <div
            key={`beam-${currentPage}-${currentTheme}`}
            className={`absolute top-0 h-[2px] w-52 rounded-full animate-page-beam pointer-events-none z-30 opacity-90 ${
              currentTheme === 'dark-neon'
                ? 'bg-gradient-to-r from-transparent via-cyan-400 to-fuchsia-500 shadow-[0_0_14px_rgba(34,211,238,0.9)]'
                : 'bg-gradient-to-r from-transparent via-cyan-400 to-indigo-500 shadow-[0_0_12px_rgba(56,189,248,0.8)]'
            }`}
          />

          {/* Top ambient highlight line */}
          <div className="absolute top-0 inset-x-8 h-[1px] bg-gradient-to-r from-transparent via-white/80 to-transparent pointer-events-none z-10" />

          <div
            ref={contentDisplayRef}
            onScrollCapture={handleContentScrollCapture}
            key={`content-${currentPage}`}
            id="content-display"
            className={`animate-page-enter ${
              currentPage === 0 || currentPage === 1
                ? 'flex-1 p-0 overflow-hidden relative flex flex-col h-full w-full min-w-0'
                : 'flex-1 p-4 sm:p-5 md:p-[24px] overflow-y-auto snap-y snap-proximity scroll-pt-[24px] scroll-smooth glass-scrollbar relative flex flex-col gap-4 sm:gap-5 md:gap-[24px] h-full w-full min-w-0'
            }`}
          >
            {currentPage === 0 && (
              <HomeView
                currentTheme={currentTheme}
                onNavigateContact={() => setCurrentPage(12)}
                onNavigatePage={setCurrentPage}
                onOpenPagesCarousel={() => setIsPagesCarouselOpen(true)}
              />
            )}
            {currentPage === 1 && <LetterView currentTheme={currentTheme} />}
            {currentPage === 2 && <AboutView currentTheme={currentTheme} onNavigatePage={setCurrentPage} />}
            {currentPage === 3 && <EducationView currentTheme={currentTheme} />}
            {currentPage === 4 && <DomainsView currentTheme={currentTheme} />}
            {currentPage === 5 && <SkillsView currentTheme={currentTheme} onNavigatePage={setCurrentPage} />}
            {currentPage === 6 && <ExperienceView currentTheme={currentTheme} />}
            {currentPage === 7 && <ProjectsView currentTheme={currentTheme} />}
            {currentPage === 8 && <SystemsView currentTheme={currentTheme} />}
            {currentPage === 9 && <InterviewView currentTheme={currentTheme} />}
            {currentPage === 10 && <HoroscopeView currentTheme={currentTheme} />}
            {currentPage === 11 && <MemoriesView currentTheme={currentTheme} />}
            {currentPage === 12 && <ContactView currentTheme={currentTheme} />}
            {currentPage === 13 && (
              <WallpaperView
                currentTheme={currentTheme}
                onSelectTheme={handleChangeTheme}
                onOpenThemeModal={() => setIsThemeModalOpen(true)}
                onNavigatePage={setCurrentPage}
                onSelectWallpaper={applyWallpaperOption}
                activeWallpaperId={activeWallpaperId}
                defaultWallpaperId={defaultWallpaperId}
                onSetDefaultWallpaper={async (wp) => {
                  setDefaultWallpaperId(wp.id);
                  await persistDefaultWallpaperId(wp.id);
                  if (typeof window !== 'undefined') {
                    localStorage.setItem('hungthai_default_wallpaper_id', wp.id);
                    localStorage.setItem('hungthai_active_wallpaper_id', wp.id);
                  }
                  applyWallpaperOption(wp);
                }}
                wallpaperSettings={wallpaperSettings}
                onUpdateWallpaperSettings={handleUpdateWallpaperSettings}
                onNextSlideshow={handleNextSlideshowWallpaper}
                onTriggerZenMode={handleTriggerZenMode}
                currentWeather={currentWeather}
                weatherIdx={weatherIdx}
                onSelectWeather={(idx) => {
                  SoundEngine.playTap();
                  setWeatherIdx(idx);
                }}
              />
            )}
          </div>

          {/* Floating Back to Top Button (Appears when scrolled > 300px in content area) */}
          <button
            type="button"
            onClick={handleScrollToTop}
            aria-label="Cuộn lên đầu trang"
            title="Lên đầu trang"
            className={`absolute bottom-4 right-4 z-40 w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-xl border transition-all duration-300 ease-out shadow-[0_8px_20px_-4px_rgba(37,99,235,0.28)] bg-white/80 border-white/90 text-blue-600 hover:bg-gradient-to-tr hover:from-blue-600 hover:to-cyan-500 hover:text-white hover:border-transparent ${
              showBackToTop
                ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto hover:-translate-y-1 active:scale-95'
                : 'opacity-0 translate-y-3 scale-90 pointer-events-none'
            }`}
          >
            <WebIcon name="arrow-up" className="w-4 h-4" />
          </button>
        </main>

        {/* 
          FOOTER:
          - Chiều dài: 1200px đồng nhất với Header và Center Card
          - Đồng bộ bo cong cả 4 góc 20px (rounded-[20px])
          - Chiều cao h-[72px]
        */}
        <Footer
          pages={PAGES}
          currentPage={currentPage}
          currentWeather={currentWeather}
          currentTheme={currentTheme}
          onCycleWeather={handleCycleWeather}
          onPrevPage={handlePrevPage}
          onNextPage={handleNextPage}
          onSelectPage={setCurrentPage}
          onSelectTheme={handleChangeTheme}
          onOpenThemeModal={() => setIsThemeModalOpen(true)}
          onOpenAiChat={() => setIsAiChatOpen(true)}
          onOpenPagesCarousel={() => setIsPagesCarouselOpen(true)}
          onOpenNetworkDebug={() => setIsNetworkDebugOpen(true)}
        />
      </div>

      {/* Theme Selector Modal */}
      <ThemeSelectorModal
        isOpen={isThemeModalOpen}
        onClose={() => setIsThemeModalOpen(false)}
        currentTheme={currentTheme}
        onSelectTheme={handleChangeTheme}
      />

      {/* AI Assistant Chat Glass Popup */}
      <AiChatModal
        isOpen={isAiChatOpen}
        onClose={() => setIsAiChatOpen(false)}
        onNavigatePage={setCurrentPage}
      />

      {/* 3D Page Cylindrical Carousel Showcase Modal (CodePen Team Carousel) */}
      <Pages3DCarouselModal
        isOpen={isPagesCarouselOpen}
        onClose={() => setIsPagesCarouselOpen(false)}
        onSelectPage={setCurrentPage}
        currentTheme={currentTheme}
      />

      {/* Network Debug QR Code Modal */}
      <NetworkDebugModal
        isOpen={isNetworkDebugOpen}
        onClose={() => setIsNetworkDebugOpen(false)}
      />

      {/* X-Ray Editor Component */}
      <XRayEditor
        currentPageId={currentPage}
        currentPageName={PAGES[currentPage]?.fullName || PAGES[currentPage]?.shortTitle || 'Trang Chủ'}
      />
    </>
  );
}
