'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useToast } from '@/components/ui/Toast';
import { WebIcon } from '@/components/ui/WebIcon';
import { useLanguage } from '@/context/LanguageContext';

export interface HomeViewProps {
  slideIndex?: number;
  onNavigateContact: () => void;
  onNavigatePage?: (pageIndex: number) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ slideIndex, onNavigateContact, onNavigatePage }) => {
  const { showToast } = useToast();
  const { t, language } = useLanguage();
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
  const TOTAL_SLIDES = 3;

  useEffect(() => {
    if (slideIndex !== undefined) {
      setCurrentSlide(slideIndex);
    }
  }, [slideIndex]);

  const handlePrevSlide = () => {
    if (slideIndex !== undefined && onNavigatePage) {
      const prevIdx = slideIndex > 0 ? slideIndex - 1 : 2;
      onNavigatePage(prevIdx);
      return;
    }
    setCurrentSlide((prev) => (prev > 0 ? prev - 1 : TOTAL_SLIDES - 1));
  };

  const handleNextSlide = () => {
    if (slideIndex !== undefined && onNavigatePage) {
      const nextIdx = slideIndex < 2 ? slideIndex + 1 : 0;
      onNavigatePage(nextIdx);
      return;
    }
    setCurrentSlide((prev) => (prev < TOTAL_SLIDES - 1 ? prev + 1 : 0));
  };

  const handleSelectDot = (idx: number) => {
    if (slideIndex !== undefined && onNavigatePage) {
      onNavigatePage(idx);
    } else {
      setCurrentSlide(idx);
    }
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
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-900/20 to-transparent pointer-events-none" />
      </div>

      {/* Top Floating Info Tag */}
      <div className="relative z-10 p-4 sm:p-5 flex items-center justify-between pointer-events-none">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/75 backdrop-blur-md border border-white/80 shadow-sm pointer-events-auto">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-bold text-slate-700">Digital Identity • Live Stream</span>
        </div>
        {isIntroMode && (
          <div className="px-2.5 py-1 rounded-full bg-rose-500/90 text-white text-[11px] font-bold shadow-md animate-pulse">
            Đang phát Intro
          </div>
        )}
      </div>

      {/* 2. Bottom 3 Cards Container (Thẻ chính + 2 bản sao nằm ngang cách nhau 15px) */}
      <div className="relative z-20 w-full p-3.5 sm:p-5 lg:p-6 pointer-events-none mt-auto">
        {isIntroMode ? (
          /* Video Intro Playing Controller Bar */
          <div className="w-full max-w-2xl mx-auto p-4 sm:p-5 rounded-2xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-2xl border border-white/90 dark:border-white/20 shadow-2xl pointer-events-auto">
            <div className="flex flex-col justify-between space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-white/10">
                <span className="text-xs font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                  {t.home.nowPlaying}
                </span>
                <button
                  type="button"
                  onClick={handleCancelIntro}
                  className="text-xs text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white font-bold px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition cursor-pointer"
                >
                  {t.common.close} ✕
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
                      <span>{t.home.pause}</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                      <span>{t.home.resume}</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleToggleMute}
                  className="px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold text-xs flex items-center gap-1.5 border border-slate-300 dark:border-white/10 shadow-sm transition cursor-pointer"
                >
                  <span>{isMuted ? t.home.unmute : t.home.mute}</span>
                </button>

                <button
                  type="button"
                  onClick={handleCancelIntro}
                  className="px-3.5 py-1.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-900/50 font-semibold text-xs transition cursor-pointer"
                >
                  {t.home.stopIntro}
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* 3 Cards Nằm Ngang Cách Nhau Đúng 15px */
          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-[15px] pointer-events-auto items-stretch">
            {/* THẺ 1 (Thẻ chính): Giới thiệu & Định vị */}
            <div className="w-full min-h-[220px] p-4 sm:p-5 rounded-2xl overflow-hidden flex flex-col justify-between bg-white/85 dark:bg-slate-900/85 backdrop-blur-2xl border border-white/90 dark:border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-0.5 text-left">
              <div className="space-y-2.5">
                <div className="flex items-center justify-between gap-2 border-b border-slate-100 dark:border-white/10 pb-2">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-[11px] shadow-sm">
                    <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8z" />
                    </svg>
                    <span>{t.home.card1Title}</span>
                  </div>
                  <span className="text-[10.5px] font-mono font-bold text-slate-500 dark:text-slate-400">01 / 03</span>
                </div>

                <div>
                  <span className="text-xs font-semibold text-blue-600 dark:text-cyan-400 block">{t.home.greeting}</span>
                  <h2 className="text-lg sm:text-xl font-black tracking-tight text-slate-900 dark:text-white font-play leading-snug">
                    {t.home.name}
                  </h2>
                  <p className="text-xs font-bold text-slate-700 dark:text-slate-200 leading-snug">
                    {t.home.role}
                  </p>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium bg-blue-50/50 dark:bg-blue-950/40 p-2 sm:p-2.5 rounded-xl border border-blue-100/70 dark:border-blue-900/50">
                  {t.home.heroDesc}
                </p>
              </div>

              <div className="flex items-center gap-2 pt-2.5 border-t border-slate-200/80 dark:border-white/10 mt-2.5">
                <button
                  type="button"
                  onClick={handlePlayIntro}
                  className="flex-1 min-h-[36px] px-2.5 py-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-blue-500/25 active:scale-95 transition cursor-pointer"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                  <span>{t.home.watchIntro}</span>
                </button>
                <button
                  type="button"
                  onClick={onNavigateContact}
                  className="flex-1 min-h-[36px] px-2.5 py-1.5 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 font-bold text-xs flex items-center justify-center gap-1 border border-slate-300 dark:border-white/15 shadow-sm active:scale-95 transition cursor-pointer"
                >
                  <span>{t.common.contact}</span>
                </button>
              </div>
            </div>

            {/* THẺ 2 (Bản sao 1): Năng lực cốt lõi */}
            <div className="w-full min-h-[220px] p-4 sm:p-5 rounded-2xl overflow-hidden flex flex-col justify-between bg-white/85 dark:bg-slate-900/85 backdrop-blur-2xl border border-white/90 dark:border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-0.5 text-left">
              <div className="space-y-2.5">
                <div className="flex items-center justify-between gap-2 border-b border-slate-100 dark:border-white/10 pb-2">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-[11px] shadow-sm">
                    <WebIcon name="rocket" className="w-3.5 h-3.5" />
                    <span>{t.home.card2Title}</span>
                  </div>
                  <span className="text-[10.5px] font-mono font-bold text-slate-500 dark:text-slate-400">02 / 03</span>
                </div>

                <div>
                  <span className="text-xs font-semibold text-purple-600 dark:text-purple-400 block">Customer Centricity & Tech</span>
                  <h3 className="text-base sm:text-lg font-black tracking-tight text-slate-900 dark:text-white font-play leading-snug">
                    {language === 'vi' ? 'Vận Hành & Trải Nghiệm CX' : 'CX & Operations Leadership'}
                  </h3>
                </div>

                <div className="space-y-1.5 text-xs">
                  <div className="flex items-center gap-2 p-1.5 rounded-lg bg-purple-50/60 dark:bg-purple-950/40 border border-purple-100/60 dark:border-purple-900/50">
                    <span className="w-5 h-5 rounded-md bg-purple-100 dark:bg-purple-900/60 text-purple-700 dark:text-purple-300 flex items-center justify-center shrink-0">
                      <WebIcon name="target" className="w-3.5 h-3.5" />
                    </span>
                    <span className="text-slate-700 dark:text-slate-200 font-medium truncate">
                      {language === 'vi' ? 'Trải nghiệm KH chuẩn hóa (CSAT 98%)' : 'Standardized CX Journey (CSAT 98%)'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 p-1.5 rounded-lg bg-indigo-50/60 dark:bg-indigo-950/40 border border-indigo-100/60 dark:border-indigo-900/50">
                    <span className="w-5 h-5 rounded-md bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 flex items-center justify-center shrink-0">
                      <WebIcon name="phone" className="w-3.5 h-3.5" />
                    </span>
                    <span className="text-slate-700 dark:text-slate-200 font-medium truncate">
                      {language === 'vi' ? 'Contact Center 24/7 SLA/KPI realtime' : '24/7 Contact Center SLA/KPI Matrix'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 p-1.5 rounded-lg bg-blue-50/60 dark:bg-blue-950/40 border border-blue-100/60 dark:border-blue-900/50">
                    <span className="w-5 h-5 rounded-md bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300 flex items-center justify-center shrink-0">
                      <WebIcon name="bot" className="w-3.5 h-3.5" />
                    </span>
                    <span className="text-slate-700 dark:text-slate-200 font-medium truncate">
                      {language === 'vi' ? 'AI Agent Workflows & Tự động hóa' : 'AI Agent Workflows & Automation'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2.5 border-t border-slate-200/80 dark:border-white/10 mt-2.5">
                <button
                  type="button"
                  onClick={() => onNavigatePage ? onNavigatePage(6) : onNavigateContact()}
                  className="flex-1 min-h-[36px] px-2.5 py-1.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold text-xs flex items-center justify-center gap-1 shadow-md shadow-purple-500/25 active:scale-95 transition cursor-pointer"
                >
                  <span>{language === 'vi' ? 'Khám Phá Kỹ Năng' : 'Explore Skills'}</span>
                </button>
                <button
                  type="button"
                  onClick={onNavigateContact}
                  className="flex-1 min-h-[36px] px-2.5 py-1.5 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 font-bold text-xs flex items-center justify-center gap-1 border border-slate-300 dark:border-white/15 shadow-sm active:scale-95 transition cursor-pointer"
                >
                  <span>{t.common.contact}</span>
                </button>
              </div>
            </div>

            {/* THẺ 3 (Bản sao 2): Dấu ấn thành tựu */}
            <div className="w-full min-h-[220px] p-4 sm:p-5 rounded-2xl overflow-hidden flex flex-col justify-between bg-white/85 dark:bg-slate-900/85 backdrop-blur-2xl border border-white/90 dark:border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-0.5 text-left">
              <div className="space-y-2.5">
                <div className="flex items-center justify-between gap-2 border-b border-slate-100 dark:border-white/10 pb-2">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold text-[11px] shadow-sm">
                    <WebIcon name="trophy" className="w-3.5 h-3.5" />
                    <span>{t.home.card3Title}</span>
                  </div>
                  <span className="text-[10.5px] font-mono font-bold text-slate-500 dark:text-slate-400">03 / 03</span>
                </div>

                <div>
                  <span className="text-xs font-semibold text-amber-600 dark:text-amber-400 block">
                    {language === 'vi' ? 'Hành trình 2002 - 2026+' : 'Journey 2002 - 2026+'}
                  </span>
                  <h3 className="text-base sm:text-lg font-black tracking-tight text-slate-900 dark:text-white font-play leading-snug">
                    {language === 'vi' ? 'Dấu Ấn Vận Hành Bền Vững' : 'Sustainable Operational Milestones'}
                  </h3>
                </div>

                <div className="space-y-1.5 text-xs">
                  <div className="flex items-center gap-2 p-1.5 rounded-lg bg-amber-50/60 dark:bg-amber-950/40 border border-amber-100/60 dark:border-amber-900/50">
                    <span className="w-5 h-5 rounded-md bg-amber-100 dark:bg-amber-900/60 text-amber-700 dark:text-amber-300 flex items-center justify-center shrink-0">
                      <WebIcon name="users" className="w-3.5 h-3.5" />
                    </span>
                    <span className="text-slate-700 dark:text-slate-200 font-medium truncate">
                      {language === 'vi' ? 'Lãnh đạo & phát triển 100+ nhân sự' : 'Leading & Developing 100+ CS Personnel'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 p-1.5 rounded-lg bg-emerald-50/60 dark:bg-emerald-950/40 border border-emerald-100/60 dark:border-emerald-900/50">
                    <span className="w-5 h-5 rounded-md bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 flex items-center justify-center shrink-0">
                      <WebIcon name="chart" className="w-3.5 h-3.5" />
                    </span>
                    <span className="text-slate-700 dark:text-slate-200 font-medium truncate">
                      {language === 'vi' ? 'Dashboard Power BI & Báo cáo C-Level' : 'Power BI Dashboards & C-Level Reporting'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 p-1.5 rounded-lg bg-cyan-50/60 dark:bg-cyan-950/40 border border-cyan-100/60 dark:border-cyan-900/50">
                    <span className="w-5 h-5 rounded-md bg-cyan-100 dark:bg-cyan-900/60 text-cyan-700 dark:text-cyan-300 flex items-center justify-center shrink-0">
                      <WebIcon name="bolt" className="w-3.5 h-3.5" />
                    </span>
                    <span className="text-slate-700 dark:text-slate-200 font-medium truncate">
                      {language === 'vi' ? 'Giảm Cost-to-Serve 25% tối ưu chi phí' : 'Reduced Cost-to-Serve by 25%'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2.5 border-t border-slate-200/80 dark:border-white/10 mt-2.5">
                <button
                  type="button"
                  onClick={() => onNavigatePage ? onNavigatePage(7) : onNavigateContact()}
                  className="flex-1 min-h-[36px] px-2.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-bold text-xs flex items-center justify-center gap-1 shadow-md shadow-amber-500/25 active:scale-95 transition cursor-pointer"
                >
                  <span>{language === 'vi' ? 'Xem Dự Án' : 'View Projects'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => onNavigatePage ? onNavigatePage(5) : onNavigateContact()}
                  className="flex-1 min-h-[36px] px-2.5 py-1.5 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 font-bold text-xs flex items-center justify-center gap-1 border border-slate-300 dark:border-white/15 shadow-sm active:scale-95 transition cursor-pointer"
                >
                  <span>{language === 'vi' ? 'Kinh Nghiệm' : 'Experience'}</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
