'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useToast } from '@/components/ui/Toast';
import { WebIcon } from '@/components/ui/WebIcon';

export interface HomeViewProps {
  slideIndex?: number;
  onNavigateContact: () => void;
  onNavigatePage?: (pageIndex: number) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ slideIndex, onNavigateContact, onNavigatePage }) => {
  const { showToast } = useToast();
  const videoRef = useRef<HTMLVideoElement>(null);

  const IDLE_URL = 'https://cdn.scena.ai/project/10169/eae59f7007421658e611c298c206755ca060c878d07087694c06935208b9d8f9.mp4';
  const INTRO_URL = 'https://cdn.scena.ai/project/10169/0f6e39f01533134c70012f61be38d29126100c0300c9c0ea607adb305b5f7102.mp4';

  const [isIntroMode, setIsIntroMode] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [currentTime, setCurrentTime] = useState<string>('0:00');
  const [duration, setDuration] = useState<string>('0:00');
  const [progressPct, setProgressPct] = useState<number>(0);

  // Slide index state: 0 (Giới thiệu), 1 (Năng lực cốt lõi), 2 (Dấu ấn thành tựu)
  const [currentSlide, setCurrentSlide] = useState<number>(slideIndex !== undefined ? slideIndex : 0);
  const [isAutoPlay, setIsAutoPlay] = useState<boolean>(false);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right'>('right');
  const TOTAL_SLIDES = 3;

  useEffect(() => {
    if (slideIndex !== undefined) {
      setCurrentSlide(slideIndex);
    }
  }, [slideIndex]);

  const handlePrevSlide = useCallback(() => {
    setSlideDirection('left');
    setCurrentSlide((prev) => {
      const nextIdx = prev > 0 ? prev - 1 : TOTAL_SLIDES - 1;
      if (onNavigatePage) {
        // Option to sync with parent if needed
      }
      return nextIdx;
    });
  }, [onNavigatePage]);

  const handleNextSlide = useCallback(() => {
    setSlideDirection('right');
    setCurrentSlide((prev) => {
      const nextIdx = prev < TOTAL_SLIDES - 1 ? prev + 1 : 0;
      if (onNavigatePage) {
        // Option to sync with parent if needed
      }
      return nextIdx;
    });
  }, [onNavigatePage]);

  const handleSelectDot = (idx: number) => {
    setSlideDirection(idx > currentSlide ? 'right' : 'left');
    setCurrentSlide(idx);
  };

  // Auto-play timer for slides
  useEffect(() => {
    if (!isAutoPlay || isIntroMode) return;
    const interval = setInterval(() => {
      handleNextSlide();
    }, 6000);
    return () => clearInterval(interval);
  }, [isAutoPlay, isIntroMode, handleNextSlide]);

  // Keyboard arrow keys navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isIntroMode) return;
      if (e.key === 'ArrowLeft') {
        handlePrevSlide();
      } else if (e.key === 'ArrowRight') {
        handleNextSlide();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isIntroMode, handlePrevSlide, handleNextSlide]);

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
    video.src = IDLE_URL;
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

  const slidesData = [
    {
      id: 0,
      badge: 'Giao diện Slide 01 / 03',
      badgeColor: 'text-blue-600 dark:text-cyan-400',
      icon: 'user',
      title: 'Giới thiệu',
      subtitle: 'Trưởng phòng Chăm sóc Khách hàng',
      name: 'Nguyễn Hùng Thái',
      description:
        '22+ năm kinh nghiệm quản trị và vận hành hệ thống Contact Center & CX đa kênh quy mô lớn (MobiFone, Shopee, Garena, Viễn Liên...). Tiên phong tích hợp AI và tự động hóa quy trình CSKH.',
      bullets: [
        { icon: 'target', label: 'Lãnh đạo & Kiến trúc vận hành Contact Center' },
        { icon: 'shield', label: 'Tối ưu hóa hành trình trải nghiệm khách hàng (CX)' },
        { icon: 'bot', label: 'Chuyển đổi số & Ứng dụng AI Agent CSKH' },
      ],
      primaryBtnText: 'Xem giới thiệu',
      primaryBtnAction: handlePlayIntro,
      primaryBtnIcon: 'play',
      secondaryBtnText: 'Liên hệ trực tiếp',
      secondaryBtnAction: onNavigateContact,
      cardThemeBg: 'from-blue-50/80 via-white/90 to-indigo-50/80 dark:from-slate-900/90 dark:via-slate-900/95 dark:to-blue-950/80',
      borderColor: 'border-blue-200/80 dark:border-blue-800/60',
      accentGlow: 'shadow-blue-500/20',
    },
    {
      id: 1,
      badge: 'Giao diện Slide 02 / 03',
      badgeColor: 'text-purple-600 dark:text-purple-400',
      icon: 'rocket',
      title: 'Năng lực cốt lõi',
      subtitle: 'Customer Centricity & Tech',
      name: 'Vận hành & Trải nghiệm CX',
      description:
        'Chuyên môn chuyên sâu trong quản trị lực lượng CSKH quy mô 100+ nhân sự, xây dựng tiêu chuẩn SLA/KPI realtime và tự động hóa quy trình xử lý phản hồi đa kênh.',
      bullets: [
        { icon: 'target', label: 'Trải nghiệm KH chuẩn hóa (CSAT 98%)' },
        { icon: 'phone', label: 'Contact Center 24/7 SLA/KPI realtime' },
        { icon: 'bot', label: 'AI Agent Workflows & Tự động hóa' },
      ],
      primaryBtnText: 'Khám phá kỹ năng',
      primaryBtnAction: () => (onNavigatePage ? onNavigatePage(6) : onNavigateContact()),
      primaryBtnIcon: 'bolt',
      secondaryBtnText: 'Liên hệ trực tiếp',
      secondaryBtnAction: onNavigateContact,
      cardThemeBg: 'from-purple-50/80 via-white/90 to-indigo-50/80 dark:from-slate-900/90 dark:via-slate-900/95 dark:to-purple-950/80',
      borderColor: 'border-purple-200/80 dark:border-purple-800/60',
      accentGlow: 'shadow-purple-500/20',
    },
    {
      id: 2,
      badge: 'Giao diện Slide 03 / 03',
      badgeColor: 'text-amber-500 dark:text-amber-400',
      icon: 'trophy',
      title: 'Dấu ấn thành tựu',
      subtitle: 'Hành trình 2003 - 2026+',
      name: 'Dấu ấn vận hành bền vững',
      description:
        'Xây dựng bộ chỉ số đo lường hiệu quả (KPIs/OKRs), triển khai hệ thống báo cáo C-Level Power BI, giúp cắt giảm 25% chi phí vận hành mà vẫn nâng cao trải nghiệm hài lòng của khách hàng.',
      bullets: [
        { icon: 'users', label: 'Lãnh đạo & phát triển 100+ nhân sự' },
        { icon: 'chart', label: 'Dashboard Power BI & Báo cáo C-Level' },
        { icon: 'bolt', label: 'Giảm Cost-to-Serve 25% tối ưu chi phí' },
      ],
      primaryBtnText: 'Xem dự án',
      primaryBtnAction: () => (onNavigatePage ? onNavigatePage(7) : onNavigateContact()),
      primaryBtnIcon: 'target',
      secondaryBtnText: 'Kinh nghiệm thực chiến',
      secondaryBtnAction: () => (onNavigatePage ? onNavigatePage(5) : onNavigateContact()),
      cardThemeBg: 'from-amber-50/80 via-white/90 to-orange-50/80 dark:from-slate-900/90 dark:via-slate-900/95 dark:to-amber-950/80',
      borderColor: 'border-amber-200/80 dark:border-amber-800/60',
      accentGlow: 'shadow-amber-500/20',
    },
  ];

  const activeSlideData = slidesData[currentSlide] || slidesData[0];

  return (
    <div className="relative w-full h-full flex-1 flex flex-col justify-between overflow-hidden select-none">
      {/* 1. Main Background Video Player */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden pointer-events-none">
        <video
          ref={videoRef}
          autoPlay
          muted={isMuted}
          playsInline
          loop={!isIntroMode}
          src={isIntroMode ? INTRO_URL : IDLE_URL}
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleEnded}
          className="w-full h-full min-w-full min-h-full object-cover object-center transition-all duration-700 brightness-105 contrast-102"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/25 to-transparent pointer-events-none" />
      </div>

      {/* Top Floating Tag & Slide Selector Pills */}
      <div className="relative z-10 p-3 sm:p-4 lg:p-5 flex items-center justify-between pointer-events-none flex-wrap gap-2">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-white/80 dark:border-white/20 shadow-sm pointer-events-auto">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
          <span className="text-xs font-bold text-slate-800 dark:text-slate-200">Digital Identity • Trang Chủ Slide</span>
        </div>

        {/* Dynamic Slide Selector Buttons */}
        <div className="hidden sm:flex items-center gap-1.5 p-1 rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-white/80 dark:border-white/20 shadow-sm pointer-events-auto">
          {slidesData.map((item) => {
            const isSelected = currentSlide === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleSelectDot(item.id)}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all duration-300 flex items-center gap-1.5 cursor-pointer ${
                  isSelected
                    ? 'bg-blue-600 text-white shadow-sm scale-105'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-800/50'
                }`}
              >
                <WebIcon name={item.icon} className="w-3.5 h-3.5" />
                <span>0{item.id + 1}. {item.title}</span>
              </button>
            );
          })}
        </div>

        {isIntroMode && (
          <div className="px-2.5 py-1 rounded-full bg-rose-500/90 text-white text-[11px] font-bold shadow-md animate-pulse pointer-events-auto">
            Đang phát Intro
          </div>
        )}
      </div>

      {/* 2. Slide Main Stage Container */}
      {/* 2. Interactive Overlay Cards (Compact size, positioned bottom right) */}
      <div className="relative z-20 w-full flex justify-end p-3 sm:p-4 lg:p-6 pointer-events-none mt-auto">
        {isIntroMode ? (
          /* Video Intro Playing Controller Bar */
          <div className="w-full max-w-lg p-4 sm:p-5 rounded-2xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-2xl border border-white/90 dark:border-white/20 shadow-2xl pointer-events-auto">
            <div className="flex flex-col justify-between space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-white/10">
                <span className="text-xs font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                  Đang phát: Lời Chào Giới Thiệu
                </span>
                <button
                  type="button"
                  onClick={handleCancelIntro}
                  className="text-xs text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white font-bold px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition cursor-pointer"
                >
                  Đóng ✕
                </button>
              </div>

              <div className="w-full space-y-1.5">
                <div
                  className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-1.5 overflow-hidden cursor-pointer"
                  onClick={handleSeek}
                >
                  <div
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 h-1.5 rounded-full transition-all duration-200"
                    style={{ width: `${progressPct}%` }}
                  />
                </div>
                <div className="flex justify-between text-[10px] text-slate-500 dark:text-slate-400 font-mono">
                  <span>{currentTime}</span>
                  <span>{duration}</span>
                </div>
              </div>

              <div className="flex items-center justify-between gap-2 pt-1 flex-wrap">
                <button
                  type="button"
                  onClick={handleTogglePlay}
                  className="px-3.5 py-1.5 rounded-xl bg-blue-600 text-white font-semibold text-xs flex items-center gap-1.5 shadow hover:bg-blue-700 transition cursor-pointer"
                >
                  {isPlaying ? (
                    <>
                      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                      </svg>
                      <span>Tạm dừng</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                      <span>Phát tiếp</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleToggleMute}
                  className="px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold text-xs flex items-center gap-1.5 border border-slate-300 dark:border-white/10 shadow-sm transition cursor-pointer"
                >
                  <span>{isMuted ? 'Bật tiếng' : 'Tắt tiếng'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleCancelIntro}
                  className="px-3.5 py-1.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-900/50 font-semibold text-xs transition cursor-pointer"
                >
                  Dừng lại
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Single Compact Interactive Slide Display Card (Positioned Bottom Right) */
          <div className="w-full max-w-xs sm:max-w-sm flex flex-col items-end pointer-events-auto">
            {/* Slide Navigation Header Bar */}
            <div className="w-full flex items-center justify-between mb-2 px-1">
              {/* Left Arrow Button */}
              <button
                type="button"
                onClick={handlePrevSlide}
                title="Slide trước (Mũi tên trái)"
                className="w-8 h-8 rounded-full bg-white/85 dark:bg-slate-900/85 hover:bg-white dark:hover:bg-slate-800 border border-white/90 dark:border-white/20 text-slate-800 dark:text-slate-100 flex items-center justify-center shadow-lg active:scale-95 transition cursor-pointer shrink-0"
              >
                <WebIcon name="arrow-left" className="w-3.5 h-3.5" />
              </button>

              {/* Slide Pagination Dots & Auto-slide Toggle */}
              <div className="flex items-center gap-2 bg-white/85 dark:bg-slate-900/85 backdrop-blur-xl border border-white/90 dark:border-white/20 px-3 py-1 rounded-full shadow-md">
                <div className="flex items-center gap-1.5">
                  {slidesData.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleSelectDot(item.id)}
                      className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                        currentSlide === item.id
                          ? 'w-6 bg-blue-600 dark:bg-cyan-400 shadow-xs'
                          : 'w-2 bg-slate-300 dark:bg-slate-700 hover:bg-slate-400 dark:hover:bg-slate-600'
                      }`}
                      title={`Đến Slide ${item.id + 1}: ${item.title}`}
                    />
                  ))}
                </div>

                <div className="h-3 w-[1px] bg-slate-300 dark:bg-slate-700 mx-0.5" />

                <button
                  type="button"
                  onClick={() => {
                    setIsAutoPlay((prev) => !prev);
                    showToast(!isAutoPlay ? 'Đã bật tự động chuyển slide' : 'Đã tắt tự động chuyển slide');
                  }}
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full transition cursor-pointer flex items-center gap-1 ${
                    isAutoPlay
                      ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800'
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${isAutoPlay ? 'bg-emerald-500 animate-ping' : 'bg-slate-400'}`} />
                  <span>{isAutoPlay ? 'Tự động' : 'Thủ công'}</span>
                </button>
              </div>

              {/* Right Arrow Button */}
              <button
                type="button"
                onClick={handleNextSlide}
                title="Slide tiếp theo (Mũi tên phải)"
                className="w-8 h-8 rounded-full bg-white/85 dark:bg-slate-900/85 hover:bg-white dark:hover:bg-slate-800 border border-white/90 dark:border-white/20 text-slate-800 dark:text-slate-100 flex items-center justify-center shadow-lg active:scale-95 transition cursor-pointer shrink-0"
              >
                <WebIcon name="arrow-right" className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Active Slide Card Container */}
            <div
              key={`slide-card-${currentSlide}`}
              className={`w-full min-h-[180px] p-3 sm:p-4 rounded-2xl overflow-hidden flex flex-col justify-between bg-gradient-to-br ${activeSlideData.cardThemeBg} backdrop-blur-2xl border ${activeSlideData.borderColor} shadow-xl ${activeSlideData.accentGlow} transition-all duration-500 animate-page-enter text-left relative group`}
            >
              <div className="space-y-3">
                {/* Slide Header: Icon trước tiêu đề không đóng khung icon, icon chuyển động tại chỗ, màu tiêu đề trùng màu icon */}
                <div className="flex items-center justify-between gap-2 border-b border-slate-200/80 dark:border-white/10 pb-2.5">
                  <h2 className={`text-base sm:text-lg font-bold ${activeSlideData.badgeColor} flex items-center gap-2 font-play`}>
                    <WebIcon name={activeSlideData.icon} className={`w-4.5 h-4.5 ${activeSlideData.badgeColor} animate-pulse shrink-0 inline-block`} />
                    <span>{activeSlideData.title}</span>
                  </h2>
                  <span className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400 px-2.5 py-1 rounded-full bg-white/60 dark:bg-slate-800/60 border border-slate-200/60 dark:border-white/10 shadow-2xs">
                    0{activeSlideData.id + 1} / 03
                  </span>
                </div>

                {/* Subtitle & Title */}
                <div>
                  <span className={`text-xs font-bold ${activeSlideData.badgeColor} block tracking-wide uppercase`}>
                    {activeSlideData.subtitle}
                  </span>
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-black tracking-tight text-slate-900 dark:text-white font-play leading-snug mt-0.5">
                    {activeSlideData.name}
                  </h3>
                </div>

                {/* Description Text */}
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed font-medium bg-white/60 dark:bg-slate-800/60 p-3 rounded-xl border border-white/80 dark:border-white/10 shadow-2xs">
                  {activeSlideData.description}
                </p>

                {/* Bullets Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
                  {activeSlideData.bullets.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 p-2 rounded-xl bg-white/70 dark:bg-slate-800/70 border border-slate-200/70 dark:border-white/10 shadow-2xs"
                    >
                      <span className="w-6 h-6 rounded-lg bg-blue-50 dark:bg-slate-700 text-blue-600 dark:text-cyan-400 flex items-center justify-center shrink-0">
                        <WebIcon name={item.icon} className="w-3.5 h-3.5" />
                      </span>
                      <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 line-clamp-1">
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Slide Action Buttons */}
              <div className="flex items-center gap-3 pt-3 border-t border-slate-200/80 dark:border-white/10 mt-3 flex-wrap sm:flex-nowrap">
                <button
                  type="button"
                  onClick={activeSlideData.primaryBtnAction}
                  className="flex-1 min-h-[40px] px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-blue-500/25 active:scale-95 transition cursor-pointer"
                >
                  <WebIcon name={activeSlideData.primaryBtnIcon} className="w-4 h-4" />
                  <span>{activeSlideData.primaryBtnText}</span>
                </button>
                <button
                  type="button"
                  onClick={activeSlideData.secondaryBtnAction}
                  className="flex-1 min-h-[40px] px-4 py-2 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 border border-slate-300 dark:border-white/15 shadow-sm active:scale-95 transition cursor-pointer"
                >
                  <span>{activeSlideData.secondaryBtnText}</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
