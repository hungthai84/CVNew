'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  ChevronLeft,
  ChevronRight,
  Video,
} from 'lucide-react';
import { useToast } from '@/components/ui/Toast';
import { SiteTheme } from '@/types';
import { SoundEngine } from '@/components/ui/SoundEngine';
import { HomeCardStacksLeft } from '@/components/ui/HomeCardStacksLeft';

export interface HomeViewProps {
  slideIndex?: number;
  currentTheme?: SiteTheme;
  onNavigateContact: () => void;
  onNavigatePage?: (pageIndex: number) => void;
  onOpenPagesCarousel?: () => void;
}

export interface VideoScreenItem {
  id: number;
  label: string;
  badge: string;
  url: string;
  introUrl?: string;
  title: string;
  description: string;
}

export const HomeView: React.FC<HomeViewProps> = ({
  currentTheme = 'light-glass',
  onNavigateContact,
  onNavigatePage,
  onOpenPagesCarousel,
}) => {
  const { showToast } = useToast();
  const videoRef = useRef<HTMLVideoElement>(null);

  const isDark = currentTheme === 'dark-neon';

  // Video URLs cho 3 màn hình
  const IDLE_URL =
    'https://cdn.scena.ai/project/10169/eae59f7007421658e611c298c206755ca060c878d07087694c06935208b9d8f9.mp4';
  const INTRO_URL =
    'https://cdn.scena.ai/project/10169/0f6e39f01533134c70012f61be38d29126100c0300c9c0ea607adb305b5f7102.mp4';

  const VIDEO_SCREENS: VideoScreenItem[] = [
    {
      id: 1,
      label: 'Màn hình 1',
      badge: 'Video 1',
      url: 'https://cdn.scena.ai/project/8606/e48a67884f3a52e8a68cf06b97979f3b22835ec92bf466a058c0d78da97c83b0.mp4',
      title: 'Phong Thái Lãnh Đạo & Tầm Nhìn',
      description: 'Phong thái chuyên gia quản trị trải nghiệm khách hàng cao cấp',
    },
    {
      id: 2,
      label: 'Màn hình 2',
      badge: 'Video 2 (Gốc)',
      url: IDLE_URL,
      introUrl: INTRO_URL,
      title: 'Chân Dung Chuyên Gia & Lời Chào',
      description: 'Chân dung điều hành dịch vụ khách hàng 22+ năm kinh nghiệm',
    },
    {
      id: 3,
      label: 'Màn hình 3',
      badge: 'Video 3',
      url: 'https://cdn.scena.ai/project/8606/581097478f9de72616d982e302e1c8d0aab6d66cbee040430c610424c0c72a44.mp4',
      title: 'Không Gian Số Hóa & Hệ Sinh Thái',
      description: 'Hạ tầng công nghệ tự động hóa và kiến trúc giải pháp hiện đại',
    },
  ];

  // Màn hình video hiện tại mặc định là Màn hình Video 2
  const [activeVideoScreen, setActiveVideoScreen] = useState<number>(2);
  const [isIntroMode, setIsIntroMode] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [currentTime, setCurrentTime] = useState<string>('0:00');
  const [duration, setDuration] = useState<string>('0:00');
  const [progressPct, setProgressPct] = useState<number>(0);

  // Video URL đang active
  const currentScreen = VIDEO_SCREENS[activeVideoScreen - 1];
  const activeVideoUrl =
    activeVideoScreen === 2 && isIntroMode ? INTRO_URL : currentScreen.url;

  // Đồng bộ âm thanh và tự động phát khi đổi màn hình video
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = isMuted;
      video.currentTime = 0;
      video.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        // Trình duyệt có thể chặn autoplay nếu có tiếng
      });
    }
  }, [activeVideoScreen, activeVideoUrl, isMuted]);

  // Điều hướng màn hình video qua trái (Prev)
  const handlePrevVideoScreen = () => {
    SoundEngine.playGlassChime();
    setIsIntroMode(false);
    setActiveVideoScreen((prev) => {
      const next = prev === 1 ? 3 : prev - 1;
      const target = VIDEO_SCREENS[next - 1];
      showToast(`Đang phát ${target.label} · ${target.title}`);
      return next;
    });
  };

  // Điều hướng màn hình video qua phải (Next)
  const handleNextVideoScreen = () => {
    SoundEngine.playGlassChime();
    setIsIntroMode(false);
    setActiveVideoScreen((prev) => {
      const next = prev === 3 ? 1 : prev + 1;
      const target = VIDEO_SCREENS[next - 1];
      showToast(`Đang phát ${target.label} · ${target.title}`);
      return next;
    });
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s < 10 ? '0' + s : s}`;
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video || !isIntroMode) return;
    setCurrentTime(formatTime(video.currentTime));
    if (video.duration && !isNaN(video.duration)) {
      setDuration(formatTime(video.duration));
      setProgressPct((video.currentTime / video.duration) * 100);
    }
  };

  const handleEnded = () => {
    if (isIntroMode) {
      handleCancelIntro();
    }
  };

  const handlePlayIntro = () => {
    const video = videoRef.current;
    if (!video) return;
    // Chuyển sang màn hình 2 nếu đang ở màn hình khác
    if (activeVideoScreen !== 2) {
      setActiveVideoScreen(2);
    }
    setIsIntroMode(true);
    setIsMuted(false);
    setIsPlaying(true);
    video.src = INTRO_URL;
    video.loop = false;
    video.muted = false;
    video.currentTime = 0;
    video.play().catch(() => {});
    showToast('Đang phát video giới thiệu Hùng Thái');
  };

  const handleCancelIntro = () => {
    const video = videoRef.current;
    if (!video) return;
    setIsIntroMode(false);
    setIsMuted(true);
    setIsPlaying(true);
    video.src = currentScreen.url;
    video.loop = true;
    video.muted = true;
    video.currentTime = 0;
    video.play().catch(() => {});
  };

  const handleTogglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play().catch(() => {});
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const handleToggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    video.muted = nextMuted;
    showToast(nextMuted ? 'Đã tắt tiếng video' : 'Đã bật âm thanh video');
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const video = videoRef.current;
    if (!video || !video.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const pct = Math.max(0, Math.min(1, clickX / rect.width));
    video.currentTime = pct * video.duration;
  };

  return (
    <div className="relative w-full h-full flex flex-col justify-between overflow-hidden select-none p-4 sm:p-5 md:p-[24px] font-play">
      {/* 1. Main Background Video - Hiển Thị Toàn Bộ Thẻ Chính Theo Màn Hình 1, 2, 3 */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden pointer-events-none">
        <video
          ref={videoRef}
          key={activeVideoUrl}
          autoPlay
          muted={isMuted}
          playsInline
          loop={!isIntroMode}
          src={activeVideoUrl}
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleEnded}
          className="w-full h-full min-w-full min-h-full object-cover object-center transition-all duration-700 brightness-110 contrast-105"
        />
        {/* Lớp phủ chuyển sắc trong suốt nhẹ nhàng, làm nổi bật hình nền video rõ nét */}
        <div
          className={`absolute inset-0 pointer-events-none transition-colors duration-500 ${
            isDark
              ? 'bg-gradient-to-t from-[#070A14]/55 via-transparent to-[#11182B]/35'
              : 'bg-gradient-to-t from-black/35 via-transparent to-black/15'
          }`}
        />
      </div>

      {/* 2. THANH CHỈ BÁO MÀN HÌNH VIDEO (1 • 2 • 3) NẰM TRÊN CÙNG GIỮA */}
      <div className="absolute top-3 sm:top-4 left-1/2 -translate-x-1/2 z-30 pointer-events-auto flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/45 dark:bg-slate-900/75 border border-white/20 dark:border-white/15 backdrop-blur-md shadow-lg transition-all duration-300">
        <span className="flex items-center gap-1 text-[11px] font-bold text-white/80 pr-1 tracking-wide">
          <Video className="w-3.5 h-3.5 text-cyan-400" />
          <span>Màn hình</span>
        </span>
        {VIDEO_SCREENS.map((screen) => {
          const isActive = activeVideoScreen === screen.id;
          return (
            <button
              key={screen.id}
              type="button"
              onClick={() => {
                SoundEngine.playGlassChime();
                setIsIntroMode(false);
                setActiveVideoScreen(screen.id);
                showToast(`Đang phát ${screen.label} · ${screen.title}`);
              }}
              className={`px-2.5 py-0.5 rounded-full text-[11px] font-black transition-all cursor-pointer ${
                isActive
                  ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-[0_0_12px_rgba(99,102,241,0.85)] scale-105'
                  : 'text-white/70 hover:text-white hover:bg-white/15'
              }`}
              title={`${screen.label}: ${screen.title}`}
            >
              {screen.id}
            </button>
          );
        })}
      </div>

      {/* 3. HAI NÚT NẰM CHÍNH GIỮA BÊN TRÁI VÀ BÊN PHẢI ĐỂ QUA CÁC MÀN HÌNH VIDEO */}
      {/* Nút chính giữa bên trái (Prev Video Screen) */}
      <button
        type="button"
        onClick={handlePrevVideoScreen}
        className="absolute left-2.5 sm:left-4 md:left-5 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 rounded-full bg-white/85 dark:bg-slate-900/85 hover:bg-white dark:hover:bg-slate-800 text-slate-700 dark:text-slate-100 border border-white/70 dark:border-white/20 shadow-[0_8px_24px_rgba(0,0,0,0.3)] hover:shadow-[0_0_20px_rgba(78,86,246,0.7)] backdrop-blur-xl flex items-center justify-center transition-all duration-300 cursor-pointer z-30 pointer-events-auto active:scale-90 group"
        title={`Màn hình video trước (←) • Hiện tại: Màn hình ${activeVideoScreen}/3`}
        aria-label="Màn hình video trước"
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600 dark:text-cyan-400 group-hover:-translate-x-0.5 transition-transform" />
      </button>

      {/* Nút chính giữa bên phải (Next Video Screen) */}
      <button
        type="button"
        onClick={handleNextVideoScreen}
        className="absolute right-2.5 sm:right-4 md:right-5 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 rounded-full bg-white/85 dark:bg-slate-900/85 hover:bg-white dark:hover:bg-slate-800 text-slate-700 dark:text-slate-100 border border-white/70 dark:border-white/20 shadow-[0_8px_24px_rgba(0,0,0,0.3)] hover:shadow-[0_0_20px_rgba(78,86,246,0.7)] backdrop-blur-xl flex items-center justify-center transition-all duration-300 cursor-pointer z-30 pointer-events-auto active:scale-90 group"
        title={`Màn hình video tiếp theo (→) • Hiện tại: Màn hình ${activeVideoScreen}/3`}
        aria-label="Màn hình video tiếp theo"
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600 dark:text-cyan-400 group-hover:translate-x-0.5 transition-transform" />
      </button>

      {/* Video Intro Controller Modal (When intro is active) */}
      {isIntroMode && (
        <div className="relative z-30 w-full max-w-md mx-auto my-auto p-3.5 rounded-2xl backdrop-blur-2xl shadow-2xl animate-fadeIn text-left bg-white/95 dark:bg-slate-900/95 border border-blue-200/90 dark:border-white/20 pointer-events-auto">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200/80 dark:border-white/10">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500" />
              </span>
              <span className="text-xs font-black font-play text-[#1E1B4B] dark:text-white">
                Đang phát: Lời Chào Giới Thiệu Chuyên Gia
              </span>
            </div>
            <button
              type="button"
              onClick={handleCancelIntro}
              className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold transition cursor-pointer bg-slate-100 hover:bg-rose-50 hover:text-rose-600 dark:bg-slate-800 text-slate-500 dark:text-slate-300"
            >
              ✕
            </button>
          </div>

          <div className="w-full space-y-1 my-2">
            <div
              className="w-full rounded-full h-1.5 overflow-hidden cursor-pointer relative bg-slate-200 dark:bg-slate-700"
              onClick={handleSeek}
            >
              <div
                className="h-1.5 rounded-full transition-all duration-150 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600"
                style={{ width: `${progressPct}%` }}
              />
            </div>
            <div className="flex justify-between text-[10px] font-mono font-bold text-slate-500 dark:text-slate-400">
              <span>{currentTime}</span>
              <span>{duration}</span>
            </div>
          </div>

          <div className="flex items-center justify-between gap-1.5 pt-0.5">
            <button
              type="button"
              onClick={handleTogglePlay}
              className="px-2.5 py-1 rounded-lg font-bold text-[11px] flex items-center gap-1 shadow-xs transition cursor-pointer active:scale-95 bg-blue-600 hover:bg-blue-700 text-white"
            >
              {isPlaying ? <Pause className="w-3 h-3 fill-current" /> : <Play className="w-3 h-3 fill-current" />}
              <span>{isPlaying ? 'Tạm dừng' : 'Phát tiếp'}</span>
            </button>

            <button
              type="button"
              onClick={handleToggleMute}
              className="px-2.5 py-1 rounded-lg font-bold text-[11px] flex items-center gap-1 shadow-2xs transition cursor-pointer active:scale-95 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-200 border border-slate-200"
            >
              {isMuted ? <VolumeX className="w-3 h-3 text-rose-500" /> : <Volume2 className="w-3 h-3 text-emerald-500" />}
              <span>{isMuted ? 'Bật tiếng' : 'Tắt tiếng'}</span>
            </button>

            <button
              type="button"
              onClick={handleCancelIntro}
              className="px-2.5 py-1 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 font-bold text-[11px] transition cursor-pointer active:scale-95"
            >
              Thoát Intro
            </button>
          </div>
        </div>
      )}

      {/* 4. Main Body: Card bên dưới góc trái & Nút Giới Thiệu bên dưới góc phải */}
      <div className="relative z-20 w-full flex-1 min-h-0 flex items-end justify-between pointer-events-none px-2 sm:px-3 md:px-4 pb-2 sm:pb-3">
        {/* Góc dưới bên trái (Bottom Left): Xấp Thẻ 14 Trang (Tắt auto change) */}
        <div className="pointer-events-auto flex flex-col items-start">
          <HomeCardStacksLeft
            currentTheme={currentTheme}
            onNavigatePage={onNavigatePage}
            onOpenPagesCarousel={onOpenPagesCarousel}
          />
        </div>

        {/* Góc dưới bên phải (Bottom Right): Nút Giới Thiệu (Laser Beam Capsule Button) */}
        <div className="pointer-events-auto flex items-end justify-end mb-1">
          <div className="relative inline-flex items-center justify-between rounded-full p-[2px] select-none group/container transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] h-[34px] sm:h-[38px] overflow-hidden shadow-[0_0_20px_rgba(78,86,246,0.5)] ring-2 ring-indigo-400/50 pointer-events-auto shrink-0">
            <div className="absolute -inset-[220%] animate-[spin_4s_linear_infinite] pointer-events-none bg-[conic-gradient(from_0deg,transparent_0_200deg,#4E56F6_250deg,#F125D6_300deg,#ffffff_340deg,#4E56F6_360deg)] opacity-100" />

            <div className="relative z-10 inline-flex items-center justify-between w-auto h-full rounded-full bg-gradient-to-r from-[#4E56F6] via-[#8938F8] to-[#F125D6] px-2.5 py-0.5 gap-2 shadow-inner backdrop-blur-md">
              {/* Speaker Toggle Button */}
              <button
                type="button"
                onClick={handleToggleMute}
                className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center shrink-0 p-0 transition-all duration-300 cursor-pointer active:scale-95 shadow-md ${
                  !isMuted
                    ? 'bg-[#4E56F6] hover:bg-[#3b43e3] text-white shadow-[0_0_12px_rgba(78,86,246,0.9)]'
                    : 'bg-[#E60026] hover:bg-red-500 text-white shadow-[0_0_12px_rgba(230,0,38,0.9)]'
                }`}
                title={!isMuted ? 'Tắt tiếng video' : 'Bật âm thanh video'}
              >
                {!isMuted ? (
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                  </svg>
                ) : (
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                  </svg>
                )}
              </button>

              <div className="w-[1px] h-3.5 bg-white/40 shrink-0 mx-0.5 rounded-full" />

              {/* Play / Pause Toggle Button */}
              <button
                type="button"
                onClick={isIntroMode ? handleCancelIntro : handlePlayIntro}
                className="flex items-center justify-center gap-1.5 px-1 py-0.5 flex-1 min-w-0 text-white font-extrabold text-[11px] sm:text-xs tracking-wide transition-all duration-300 cursor-pointer hover:opacity-95 active:scale-98"
                title={isIntroMode ? 'Dừng phát video giới thiệu' : 'Phát video giới thiệu chuyên gia'}
              >
                <span className="drop-shadow-sm font-black text-[11px] sm:text-xs text-white truncate">
                  {isIntroMode ? 'Dừng phát' : 'Giới thiệu'}
                </span>
                <span>
                  {isIntroMode ? (
                    <svg className="w-3.5 h-3.5 shrink-0 fill-current text-white" viewBox="0 0 24 24">
                      <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                    </svg>
                  ) : (
                    <svg className="w-3.5 h-3.5 shrink-0 fill-current text-white" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  )}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
