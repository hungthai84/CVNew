'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { PAGES } from '@/data/pages';
import { WEATHER_PRESETS } from '@/data/weather';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { BackgroundLayer } from '@/components/layout/BackgroundLayer';
import { GlassPanel } from '@/components/ui/GlassPanel';
import { WallpaperOption, SiteTheme } from '@/types';
import {
  loadCustomWallpapers,
  getDefaultWallpaperId,
  findWallpaperById,
} from '@/utils/wallpaperStorage';
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
  const [defaultWallpaperId, setDefaultWallpaperId] = useState<string>('prism');
  const [weatherIdx, setWeatherIdx] = useState<number>(0);
  const [cardMousePos, setCardMousePos] = useState<{ x: number; y: number; active: boolean }>({
    x: 0,
    y: 0,
    active: false,
  });

  const currentWeather = WEATHER_PRESETS[weatherIdx] || WEATHER_PRESETS[0];

  const handlePrevPage = () => {
    setCurrentPage((prev) => (prev > 0 ? prev - 1 : PAGES.length - 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => (prev < PAGES.length - 1 ? prev + 1 : 0));
  };

  const handleCycleWeather = () => {
    setWeatherIdx((prev) => (prev + 1) % WEATHER_PRESETS.length);
  };

  // Apply a WallpaperOption to the background layer
  const applyWallpaperOption = useCallback((wp: WallpaperOption) => {
    setActiveWallpaperId(wp.id);

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
      setWallpaperStyle({ backgroundColor: wp.value });
    } else if (wp.type === 'gradient' || wp.type === 'css') {
      setWallpaperVideo('');
      setWallpaperClass('');
      setWallpaperStyle({ background: wp.value });
    }
  }, []);

  // On mount: Load theme & default wallpaper from persistent storage
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

        // 2. Load custom wallpapers & default wallpaper
        const customWallpapers = await loadCustomWallpapers();
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
        } else if (storedTheme === 'light-glass-multicolor') {
          setWallpaperClass('light-glass-multicolor-bg');
          setWallpaperStyle({});
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
        : newTheme === 'light-glass-multicolor'
        ? 'light-glass-multicolor'
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
      } else if (validTheme === 'light-glass-multicolor') {
        setWallpaperClass('light-glass-multicolor-bg');
        setWallpaperStyle({});
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
      />

      {/* Main UI Root Layout (Header, Center Card, Footer) */}
      <div id="app-root-layout" className="w-full h-full flex flex-col justify-between items-center relative z-10 overflow-hidden">
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
          className="w-[1200px] max-w-[calc(100%-40px)] mx-auto my-[15px] flex-1 min-h-0 glass-panel rounded-[20px] overflow-hidden flex flex-col relative z-20 transition-all duration-500 elevated-float-card group/main"
        >
          {/* Interactive Mouseover Radial Glow Spotlight */}
          <div
            className="glass-spotlight"
            style={{
              opacity: cardMousePos.active ? 1 : 0,
              background: `radial-gradient(600px circle at ${cardMousePos.x}px ${cardMousePos.y}px, rgba(99, 102, 241, 0.12), transparent 70%)`,
            }}
          />

          {/* Dynamic Page Transition Beam Indicator */}
          <div
            key={`beam-${currentPage}`}
            className="absolute top-0 h-[2px] w-52 bg-gradient-to-r from-transparent via-cyan-400 to-indigo-500 rounded-full animate-page-beam pointer-events-none z-30 opacity-90 shadow-[0_0_12px_rgba(56,189,248,0.8)]"
          />

          {/* Top ambient highlight line */}
          <div className="absolute top-0 inset-x-8 h-[1px] bg-gradient-to-r from-transparent via-white/80 dark:via-white/30 to-transparent pointer-events-none z-10" />

          <div
            key={`content-${currentPage}`}
            id="content-display"
            className={`animate-page-enter ${
              currentPage === 0
                ? 'flex-1 p-0 overflow-hidden relative flex flex-col h-full w-full'
                : (currentPage >= 1 && currentPage <= 7) || currentPage === 12
                ? 'flex-1 p-[15px] overflow-y-auto lg:overflow-hidden relative flex flex-col gap-[15px] h-full w-full'
                : 'flex-1 p-[15px] overflow-y-auto no-scrollbar flex flex-col gap-[15px]'
            }`}
          >
            {currentPage === 0 && (
              <HomeView
                onNavigateContact={() => setCurrentPage(12)}
                onNavigatePage={setCurrentPage}
              />
            )}
            {currentPage === 1 && <LetterView />}
            {currentPage === 2 && (
              <AboutView
                onNavigateContact={() => setCurrentPage(12)}
                onOpenAiChat={() => setIsAiChatOpen(true)}
              />
            )}
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
              />
            )}
          </div>
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
