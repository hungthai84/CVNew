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
  findWallpaperById,
  parseCssToReactStyle,
  loadWallpaperSettings,
  saveWallpaperSettings,
  loadDeletedWallpaperIds,
  loadFavoriteWallpaperIds,
  extractWallpaperAccentColor,
  DEFAULT_WALLPAPER_SETTINGS,
  WallpaperAdvancedSettings,
} from '@/utils/wallpaperStorage';
import {
  AmbientSoundEngine,
  resolveAutoAmbientTrack,
  AmbientTrackId,
} from '@/utils/ambientSoundEngine';
import { AiChatModal } from '@/components/ui/AiChatModal';
import { ThemeSelectorModal } from '@/components/ui/ThemeSelectorModal';
import { XRayEditor } from '@/components/ui/XRayEditor';

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
  const [wallpaperClass, setWallpaperClass] = useState<string>('prism-light-bg');
  const [wallpaperStyle, setWallpaperStyle] = useState<React.CSSProperties>({});
  const [wallpaperVideo, setWallpaperVideo] = useState<string>('');
  const [activeWallpaperId, setActiveWallpaperId] = useState<string>('prism');
  const [activeWallpaperOption, setActiveWallpaperOption] = useState<WallpaperOption | undefined>(
    WALLPAPER_OPTIONS[0]
  );
  const [defaultWallpaperId, setDefaultWallpaperId] = useState<string>('prism');
  const [wallpaperSettings, setWallpaperSettings] = useState<WallpaperAdvancedSettings>(
    DEFAULT_WALLPAPER_SETTINGS
  );
  const [weatherIdx, setWeatherIdx] = useState<number>(0);
  const [showBackToTop, setShowBackToTop] = useState<boolean>(false);
  const [isZenMode, setIsZenMode] = useState<boolean>(false);
  const [zenCountdown, setZenCountdown] = useState<number | null>(null);
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

  const [cardMousePos, setCardMousePos] = useState<{ x: number; y: number; active: boolean }>({
    x: 0,
    y: 0,
    active: false,
  });

  const currentWeather = WEATHER_PRESETS[weatherIdx] || WEATHER_PRESETS[0];
  const activeAccent = extractWallpaperAccentColor(activeWallpaperOption);

  // Resolved Ambient Soundscape Track (auto-detects from weather & wallpaper or uses manual selection)
  const resolvedAmbientTrack: AmbientTrackId =
    wallpaperSettings.ambientSoundMode === 'auto'
      ? resolveAutoAmbientTrack(
          activeWallpaperOption,
          currentWeather?.condition,
          wallpaperSettings.weatherSyncEnabled
        )
      : wallpaperSettings.ambientSoundMode;

  useEffect(() => {
    if (wallpaperSettings.ambientSoundEnabled) {
      AmbientSoundEngine.startTrack(resolvedAmbientTrack, wallpaperSettings.ambientSoundVolume);
    } else {
      AmbientSoundEngine.stop();
    }
  }, [
    wallpaperSettings.ambientSoundEnabled,
    wallpaperSettings.ambientSoundVolume,
    resolvedAmbientTrack,
  ]);

  // Pomodoro Focus / Break Wallpaper Sync Timer state
  const [pomodoroRunning, setPomodoroRunning] = useState<boolean>(false);
  const [pomodoroPhase, setPomodoroPhase] = useState<'focus' | 'break'>('focus');
  const [pomodoroSecondsLeft, setPomodoroSecondsLeft] = useState<number>(25 * 60);

  // Keep Pomodoro seconds synced with configured duration when timer is paused at full duration
  useEffect(() => {
    if (!pomodoroRunning) {
      const targetMins =
        pomodoroPhase === 'focus'
          ? wallpaperSettings.pomodoroFocusMinutes || 25
          : wallpaperSettings.pomodoroBreakMinutes || 5;
      setPomodoroSecondsLeft(targetMins * 60);
    }
  }, [
    pomodoroRunning,
    pomodoroPhase,
    wallpaperSettings.pomodoroFocusMinutes,
    wallpaperSettings.pomodoroBreakMinutes,
  ]);

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

  // Apply a WallpaperOption to the background layer
  const applyWallpaperOption = useCallback((wp: WallpaperOption) => {
    setActiveWallpaperId(wp.id);
    setActiveWallpaperOption(wp);

    if (wp.type === 'video') {
      setWallpaperVideo(wp.value);
      setWallpaperClass('');
      setWallpaperStyle({});
    } else if (wp.type === 'image') {
      setWallpaperVideo('');
      setWallpaperClass('');
      setWallpaperStyle({
        backgroundImage: `url('${wp.value}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      });
    } else if (wp.type === 'class') {
      setWallpaperVideo('');
      setWallpaperClass(wp.value);
      setWallpaperStyle({});
    } else if (wp.type === 'color') {
      setWallpaperVideo('');
      setWallpaperClass('');
      setWallpaperStyle(parseCssToReactStyle(wp.value, wp.previewStyle));
    } else if (wp.type === 'gradient' || wp.type === 'css') {
      setWallpaperVideo('');
      setWallpaperClass('');
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

      const currentIdx = pool.findIndex((w) => w.id === activeWallpaperIdRef.current);
      const nextIdx = (currentIdx + 1) % pool.length;
      applyWallpaperOption(pool[nextIdx]);
    } catch (e) {
      console.warn('Slideshow step error:', e);
    }
  }, [applyWallpaperOption]);

  // Day/Night Dynamic Wallpaper auto-switcher (06:00-17:59 = Day, 18:00-05:59 = Night)
  useEffect(() => {
    if (!wallpaperSettings.dayNightEnabled) return;

    const applyByCurrentHour = async () => {
      const hour = new Date().getHours();
      const isDaytime = hour >= 6 && hour < 18;
      const targetId = isDaytime
        ? wallpaperSettings.dayWallpaperId || 'aurora'
        : wallpaperSettings.nightWallpaperId || 'css-aurora-borealis';

      const customWallpapers = await loadCustomWallpapers();
      const targetWp = findWallpaperById(targetId, customWallpapers);
      if (targetWp && activeWallpaperIdRef.current !== targetWp.id) {
        applyWallpaperOption(targetWp);
      }
    };

    applyByCurrentHour();
    const timer = window.setInterval(applyByCurrentHour, 60_000);
    return () => window.clearInterval(timer);
  }, [
    wallpaperSettings.dayNightEnabled,
    wallpaperSettings.dayWallpaperId,
    wallpaperSettings.nightWallpaperId,
    applyWallpaperOption,
  ]);

  // Helper to apply wallpaper by ID from custom + built-in list
  const applyWallpaperById = useCallback(
    async (targetId: string) => {
      try {
        const customWallpapers = await loadCustomWallpapers();
        const found = findWallpaperById(targetId, customWallpapers);
        if (found) {
          applyWallpaperOption(found);
        }
      } catch {
        // ignore
      }
    },
    [applyWallpaperOption]
  );

  // Toggle or switch Pomodoro Focus / Break mode and sync wallpaper immediately
  const handleTogglePomodoro = useCallback(
    (nextRunning?: boolean, forcePhase?: 'focus' | 'break') => {
      SoundEngine.playTap();
      const targetPhase = forcePhase || pomodoroPhase;
      const shouldRun = typeof nextRunning === 'boolean' ? nextRunning : !pomodoroRunning;

      if (forcePhase && forcePhase !== pomodoroPhase) {
        setPomodoroPhase(forcePhase);
        const mins =
          forcePhase === 'focus'
            ? wallpaperSettingsRef.current.pomodoroFocusMinutes || 25
            : wallpaperSettingsRef.current.pomodoroBreakMinutes || 5;
        setPomodoroSecondsLeft(mins * 60);
      }

      setPomodoroRunning(shouldRun);

      if (shouldRun) {
        const targetWpId =
          targetPhase === 'focus'
            ? wallpaperSettingsRef.current.pomodoroFocusWallpaperId || 'css-deep-space'
            : wallpaperSettingsRef.current.pomodoroBreakWallpaperId || 'aurora';
        applyWallpaperById(targetWpId);
      }
    },
    [pomodoroPhase, pomodoroRunning, applyWallpaperById]
  );

  const handleResetPomodoro = useCallback(() => {
    SoundEngine.playTap();
    setPomodoroRunning(false);
    const mins =
      pomodoroPhase === 'focus'
        ? wallpaperSettingsRef.current.pomodoroFocusMinutes || 25
        : wallpaperSettingsRef.current.pomodoroBreakMinutes || 5;
    setPomodoroSecondsLeft(mins * 60);
  }, [pomodoroPhase]);

  // Pomodoro 1-second countdown & automatic phase transition (Focus <-> Break) with Wallpaper Sync
  useEffect(() => {
    if (!pomodoroRunning) return;

    const timer = window.setInterval(() => {
      setPomodoroSecondsLeft((prev) => {
        if (prev > 1) return prev - 1;

        // Phase finished -> switch between Focus and Break and apply corresponding wallpaper
        const nextPhase: 'focus' | 'break' = pomodoroPhase === 'focus' ? 'break' : 'focus';
        setPomodoroPhase(nextPhase);
        SoundEngine.playPop();

        const nextMins =
          nextPhase === 'focus'
            ? wallpaperSettingsRef.current.pomodoroFocusMinutes || 25
            : wallpaperSettingsRef.current.pomodoroBreakMinutes || 5;
        const targetWpId =
          nextPhase === 'focus'
            ? wallpaperSettingsRef.current.pomodoroFocusWallpaperId || 'css-deep-space'
            : wallpaperSettingsRef.current.pomodoroBreakWallpaperId || 'aurora';

        applyWallpaperById(targetWpId);
        return nextMins * 60;
      });
    }, 1000);

    return () => window.clearInterval(timer);
  }, [pomodoroRunning, pomodoroPhase, applyWallpaperById]);

  // Wallpaper Slideshow Mode timer
  useEffect(() => {
    if (!wallpaperSettings.slideshowEnabled) return;
    const intervalMs = Math.max(15_000, wallpaperSettings.slideshowIntervalMinutes * 60_000);
    const timer = window.setInterval(() => {
      handleNextSlideshowWallpaper();
    }, intervalMs);

    return () => window.clearInterval(timer);
  }, [
    wallpaperSettings.slideshowEnabled,
    wallpaperSettings.slideshowIntervalMinutes,
    handleNextSlideshowWallpaper,
  ]);

  // On mount: Load theme, advanced wallpaper settings & default wallpaper from persistent storage
  useEffect(() => {
    (async () => {
      try {
        // 1. Load persistent theme (prioritize portfolio-theme per Master Prompt, fallback to hungthai_site_theme)
        const rawTheme = localStorage.getItem('portfolio-theme') || localStorage.getItem('hungthai_site_theme');
        const storedTheme: SiteTheme =
          rawTheme === 'dark-neon'
            ? 'dark-neon'
            : rawTheme === 'flat-rainbow'
            ? 'flat-rainbow'
            : 'light-glass';
        setCurrentTheme(storedTheme);
        document.documentElement.setAttribute('data-theme', storedTheme);
        document.documentElement.classList.toggle('dark', storedTheme === 'dark-neon');

        // 2. Load advanced wallpaper settings
        const loadedSettings = await loadWallpaperSettings();
        setWallpaperSettings(loadedSettings);

        // 3. Load custom wallpapers & default wallpaper
        const customWallpapers = await loadCustomWallpapers();

        // If Day/Night Dynamic Mode is active, apply the time-appropriate wallpaper
        if (loadedSettings.dayNightEnabled) {
          const hour = new Date().getHours();
          const isDaytime = hour >= 6 && hour < 18;
          const targetId = isDaytime
            ? loadedSettings.dayWallpaperId || 'aurora'
            : loadedSettings.nightWallpaperId || 'css-aurora-borealis';
          const targetWp = findWallpaperById(targetId, customWallpapers);
          if (targetWp) {
            applyWallpaperOption(targetWp);
            return;
          }
        }

        const defId = await getDefaultWallpaperId();
        if (defId) {
          setDefaultWallpaperId(defId);
          const found = findWallpaperById(defId, customWallpapers);
          if (found) {
            applyWallpaperOption(found);
            return;
          }
        }

        // Default wallpaper based on theme if not custom set
        if (storedTheme === 'dark-neon') {
          setWallpaperClass('dark-neon-bg');
        } else if (storedTheme === 'flat-rainbow') {
          setWallpaperClass('');
          setWallpaperStyle({ backgroundColor: '#f8fafc' });
        } else {
          setWallpaperClass('prism-light-bg');
        }
      } catch (e) {
        console.warn('Could not load persistent theme/wallpaper:', e);
      }
    })();
  }, [applyWallpaperOption]);

  // Handle changing system theme (instant switch, sync storage, DOM data-theme attribute, vivid animation)
  const handleChangeTheme = (newTheme: SiteTheme) => {
    const validTheme: SiteTheme =
      newTheme === 'dark-neon'
        ? 'dark-neon'
        : newTheme === 'flat-rainbow'
        ? 'flat-rainbow'
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
      localStorage.setItem('portfolio-theme', validTheme);
      localStorage.setItem('hungthai_site_theme', validTheme);
      document.documentElement.setAttribute('data-theme', validTheme);
      document.documentElement.classList.toggle('dark', validTheme === 'dark-neon');
    } catch {
      // ignore
    }

    // If no active custom image/video wallpaper, adapt background to theme
    if (!wallpaperVideo && Object.keys(wallpaperStyle).length === 0) {
      if (validTheme === 'dark-neon') {
        setWallpaperClass('dark-neon-bg');
        setWallpaperStyle({});
      } else if (validTheme === 'flat-rainbow') {
        setWallpaperClass('');
        setWallpaperStyle({ backgroundColor: '#f8fafc' });
      } else {
        setWallpaperClass('prism-light-bg');
        setWallpaperStyle({});
      }
    }
  };

  const handleToggleTheme = () => {
    handleChangeTheme(currentTheme === 'dark-neon' ? 'light-glass' : 'dark-neon');
  };

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
        theme={currentTheme}
        currentPage={currentPage}
        dimmerOpacity={wallpaperSettings.dimmerOpacity}
        blurAmount={wallpaperSettings.blurAmount}
        parallaxEnabled={wallpaperSettings.parallaxEnabled}
        weatherSyncEnabled={wallpaperSettings.weatherSyncEnabled}
        weatherCondition={currentWeather?.condition}
        cinematicLut={wallpaperSettings.cinematicLut}
        livingMeshEnabled={wallpaperSettings.livingMeshEnabled}
        livingMeshSpeed={wallpaperSettings.livingMeshSpeed}
      />

      {/* Floating Zen Mode HUD Bar (Appears when Header, Footer & Center Card are hidden) */}
      {isZenMode && (
        <div className="fixed bottom-6 inset-x-0 z-50 flex justify-center px-4 pointer-events-none animate-fade-in">
          <div className="pointer-events-auto flex flex-wrap items-center gap-2.5 px-4 py-2.5 rounded-full bg-slate-950/75 text-white border border-white/25 backdrop-blur-2xl shadow-[0_12px_40px_rgba(0,0,0,0.55)]">
            <span
              className="w-2.5 h-2.5 rounded-full shrink-0 shadow-[0_0_10px_currentColor]"
              style={{ backgroundColor: activeAccent.hex, color: activeAccent.hex }}
            />
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

      {/* Main UI Root Layout (Header, Center Card, Footer) */}
      <div
        id="app-root-layout"
        className={`w-full h-full flex flex-col justify-between items-center relative z-10 overflow-hidden transition-all duration-500 ${
          isZenMode ? 'opacity-0 scale-[0.985] pointer-events-none select-none' : 'opacity-100 scale-100'
        }`}
      >
        {/* 
          HEADER:
          - Chiều dài: 1200px (căn giữa mx-auto, giới hạn max-w-[calc(100%-50px)])
          - Bám sát mép trên website (top: 0)
          - Không bo góc trên, chỉ bo cong góc dưới trái và phải (rounded-b-[24px])
          - Chiều cao h-[72px] bằng Footer
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
          - Chiều dài: 1200px đồng nhất với Header và Footer (mx-auto, max-w-[calc(100%-40px)])
          - Khoảng cách với header & footer: 15px (my-[15px])
          - Hiệu ứng nổi 3D, đổ bóng phân tầng, tương tác chuột (Mouseover Spotlight)
        */}
        <main
          id="center-card"
          onMouseMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            setCardMousePos({
              x: e.clientX - rect.left,
              y: e.clientY - rect.top,
              active: true,
            });
          }}
          onMouseLeave={() => setCardMousePos((prev) => ({ ...prev, active: false }))}
          style={
            wallpaperSettings.autoAccentGlow
              ? {
                  boxShadow: `0 20px 50px -12px rgba(${activeAccent.rgb}, 0.22), 0 0 0 1px rgba(${activeAccent.rgb}, 0.28)`,
                }
              : undefined
          }
          className="w-[1200px] max-w-[calc(100%-40px)] mx-auto my-[15px] flex-1 min-h-0 glass-panel rounded-[20px] overflow-hidden flex flex-col relative z-20 transition-all duration-500 elevated-float-card group/main"
        >
          {/* Interactive Mouseover Radial Glow Spotlight (Synchronized with Wallpaper Dominant Color when autoAccentGlow is active) */}
          <div
            className="glass-spotlight"
            style={{
              opacity: cardMousePos.active ? 1 : 0,
              background: `radial-gradient(620px circle at ${cardMousePos.x}px ${cardMousePos.y}px, rgba(${
                wallpaperSettings.autoAccentGlow ? activeAccent.rgb : '99, 102, 241'
              }, 0.18), transparent 70%)`,
            }}
          />

          {/* Dynamic Page Transition Beam Indicator */}
          <div
            key={`beam-${currentPage}`}
            style={
              wallpaperSettings.autoAccentGlow
                ? {
                    background: `linear-gradient(90deg, transparent, ${activeAccent.hex}, transparent)`,
                    boxShadow: `0 0 14px rgba(${activeAccent.rgb}, 0.85)`,
                  }
                : undefined
            }
            className="absolute top-0 h-[2px] w-52 bg-gradient-to-r from-transparent via-cyan-400 to-indigo-500 rounded-full animate-page-beam pointer-events-none z-30 opacity-90 shadow-[0_0_12px_rgba(56,189,248,0.8)]"
          />

          {/* Top ambient highlight line */}
          <div className="absolute top-0 inset-x-8 h-[1px] bg-gradient-to-r from-transparent via-white/80 dark:via-white/30 to-transparent pointer-events-none z-10" />

          <div
            ref={contentDisplayRef}
            onScrollCapture={handleContentScrollCapture}
            key={`content-${currentPage}`}
            id="content-display"
            className={`animate-page-enter ${
              currentPage === 0
                ? 'flex-1 p-0 overflow-hidden relative flex flex-col h-full w-full'
                : (currentPage >= 1 && currentPage <= 7) || currentPage === 12
                ? currentPage === 7
                ? 'flex-1 p-[15px] overflow-y-auto snap-y snap-proximity scroll-pt-[15px] scroll-smooth glass-scrollbar relative flex flex-col gap-[15px] h-full w-full'
                : 'flex-1 p-[15px] overflow-y-auto lg:overflow-hidden snap-y snap-proximity scroll-pt-[15px] scroll-smooth glass-scrollbar relative flex flex-col gap-[15px] h-full w-full'
                : 'flex-1 p-[15px] overflow-y-auto snap-y snap-proximity scroll-pt-[15px] scroll-smooth glass-scrollbar flex flex-col gap-[15px]'
            }`}
          >
            {currentPage === 0 && (
              <HomeView
                onNavigateContact={() => setCurrentPage(12)}
                onNavigatePage={setCurrentPage}
              />
            )}
            {currentPage === 1 && <LetterView />}
            {currentPage === 2 && <AboutView />}
            {currentPage === 3 && <EducationView />}
            {currentPage === 4 && <DomainsView />}
            {currentPage === 5 && <ExperienceView />}
            {currentPage === 6 && <SkillsView />}
            {currentPage === 7 && <ProjectsView />}
            {currentPage === 8 && <SystemsView />}
            {currentPage === 9 && <InterviewView />}
            {currentPage === 10 && <HoroscopeView />}
            {currentPage === 11 && <MemoriesView />}
            {currentPage === 12 && <ContactView />}
            {currentPage === 13 && (
              <WallpaperView
                onSelectWallpaper={applyWallpaperOption}
                activeWallpaperId={activeWallpaperId}
                defaultWallpaperId={defaultWallpaperId}
                onSetDefaultWallpaper={(wp) => {
                  setDefaultWallpaperId(wp.id);
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
                activeAccent={activeAccent}
                resolvedAmbientTrack={resolvedAmbientTrack}
                pomodoroRunning={pomodoroRunning}
                pomodoroPhase={pomodoroPhase}
                pomodoroSecondsLeft={pomodoroSecondsLeft}
                onTogglePomodoro={handleTogglePomodoro}
                onResetPomodoro={handleResetPomodoro}
              />
            )}
          </div>

          {/* Floating Back to Top Button (Appears when scrolled > 300px in content area) */}
          <button
            type="button"
            onClick={handleScrollToTop}
            aria-label="Cuộn lên đầu trang"
            title="Lên đầu trang"
            className={`absolute bottom-4 right-4 z-40 w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-xl border transition-all duration-300 ease-out shadow-[0_8px_20px_-4px_rgba(37,99,235,0.28)] ${
              currentTheme === 'dark-neon'
                ? 'bg-slate-900/80 border-cyan-400/50 text-cyan-300 hover:bg-cyan-500/25 hover:border-cyan-300 hover:text-white hover:shadow-[0_0_18px_rgba(34,211,238,0.45)]'
                : currentTheme === 'flat-rainbow'
                ? 'bg-white/95 border-indigo-200 text-indigo-600 hover:bg-indigo-600 hover:border-indigo-600 hover:text-white'
                : 'bg-white/80 border-white/90 text-blue-600 hover:bg-gradient-to-tr hover:from-blue-600 hover:to-cyan-500 hover:text-white hover:border-transparent'
            } ${
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
          - Bám sát phía dưới website (bottom: 0)
          - Không bo cong góc dưới, chỉ bo cong góc trên (rounded-t-[24px])
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

      {/* X-Ray Editor Component */}
      <XRayEditor
        currentPageId={currentPage}
        currentPageName={PAGES[currentPage]?.fullName || PAGES[currentPage]?.shortTitle || 'Trang Chủ'}
      />
    </>
  );
}
