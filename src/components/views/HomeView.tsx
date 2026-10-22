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
  const [slideDirection, setSlideDirection] = useState<'next' | 'prev'>('next');
  const TOTAL_SLIDES = 3;

  useEffect(() => {
    if (slideIndex !== undefined) {
      setCurrentSlide(slideIndex);
    }
  }, [slideIndex]);

  const handlePrevSlide = () => {
    setSlideDirection('prev');
    setCurrentSlide((prev) => (prev > 0 ? prev - 1 : TOTAL_SLIDES - 1));
  };

  const handleNextSlide = () => {
    setSlideDirection('next');
    setCurrentSlide((prev) => (prev < TOTAL_SLIDES - 1 ? prev + 1 : 0));
  };

  const handleSelectDot = (idx: number) => {
    setSlideDirection(idx > currentSlide ? 'next' : 'prev');
    setCurrentSlide(idx);
  };

  // Keyboard navigation for Home slides
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;
      if (e.key === 'ArrowLeft') {
        handlePrevSlide();
      } else if (e.key === 'ArrowRight') {
        handleNextSlide();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide]);

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
          /* Trình chiếu Slide Trang Chủ (3 Slide tương tác cao) */
          <div className="relative w-full max-w-3xl xl:max-w-4xl mx-auto pointer-events-auto">
            {/* Top Slide Tabs Navigation */}
            <div className="flex items-center justify-center gap-1.5 sm:gap-2 mb-2 sm:mb-2.5">
              {[
                { idx: 0, label: language === 'vi' ? '01 Giới Thiệu' : '01 Intro', icon: 'sparkles' },
                { idx: 1, label: language === 'vi' ? '02 Năng Lực CX' : '02 Core CX', icon: 'rocket' },
                { idx: 2, label: language === 'vi' ? '03 Thành Tựu' : '03 Milestones', icon: 'trophy' },
              ].map((tab) => (
                <button
                  key={tab.idx}
                  type="button"
                  onClick={() => handleSelectDot(tab.idx)}
                  className={`px-3 sm:px-3.5 py-1 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer backdrop-blur-xl shadow-xs active:scale-95 ${
                    currentSlide === tab.idx
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md scale-105'
                      : 'bg-white/80 dark:bg-slate-900/80 hover:bg-white dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 border border-white/60 dark:border-white/10'
                  }`}
                >
                  <WebIcon name={tab.icon} className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Slide Card Area with Floating Side Navigation Buttons */}
            <div className="relative group/slidecard">
              {/* Floating Prev Button */}
              <button
                type="button"
                onClick={handlePrevSlide}
                className="absolute -left-3 sm:-left-5 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/95 dark:bg-slate-800/95 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 shadow-xl flex items-center justify-center cursor-pointer transition-all hover:scale-110 active:scale-95 z-30 opacity-75 group-hover/slidecard:opacity-100"
                title="Slide trước (←)"
                aria-label="Slide trước"
              >
                <svg className="w-4 h-4 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {/* Floating Next Button */}
              <button
                type="button"
                onClick={handleNextSlide}
                className="absolute -right-3 sm:-right-5 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/95 dark:bg-slate-800/95 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 shadow-xl flex items-center justify-center cursor-pointer transition-all hover:scale-110 active:scale-95 z-30 opacity-75 group-hover/slidecard:opacity-100"
                title="Slide tiếp (→)"
                aria-label="Slide tiếp"
              >
                <svg className="w-4 h-4 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>

              {/* SLIDE 0: Giới thiệu & Định vị */}
              {currentSlide === 0 && (
                <div
                  key="home-slide-0"
                  className={`w-full min-h-[220px] p-4 sm:p-5 rounded-2xl overflow-hidden flex flex-col justify-between bg-white/90 dark:bg-slate-900/90 backdrop-blur-2xl border border-white/90 dark:border-white/20 shadow-2xl transition-all duration-300 text-left ${
                    slideDirection === 'next' ? 'animate-slide-next' : 'animate-slide-prev'
                  }`}
                >
                  <div className="space-y-2.5">
                    {/* Header */}
                    <div className="flex items-center justify-between gap-2 border-b border-slate-100 dark:border-white/10 pb-2">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-[11px] shadow-sm">
                        <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                          <path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8z" />
                        </svg>
                        <span>{t.home.card1Title}</span>
                      </div>

                      {/* Center Dots */}
                      <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-blue-50/80 dark:bg-blue-950/40 border border-blue-200/60 dark:border-blue-800/40">
                        {[0, 1, 2].map((idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => handleSelectDot(idx)}
                            className={`transition-all duration-300 rounded-full cursor-pointer ${
                              currentSlide === idx
                                ? 'w-5 h-2 bg-gradient-to-r from-blue-600 to-indigo-600 shadow-xs'
                                : 'w-2 h-2 bg-blue-200 dark:bg-blue-800 hover:bg-blue-300'
                            }`}
                            title={`Slide ${idx + 1}`}
                          />
                        ))}
                      </div>

                      {/* Compact Switcher */}
                      <div className="flex items-center p-0.5 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800">
                        <button
                          type="button"
                          onClick={handlePrevSlide}
                          className="w-5 h-5 rounded-full flex items-center justify-center hover:bg-blue-200 dark:hover:bg-blue-800 text-blue-700 dark:text-blue-200 cursor-pointer transition-all active:scale-95"
                          title="Slide trước (←)"
                        >
                          <svg className="w-3 h-3 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                          </svg>
                        </button>
                        <span className="px-1.5 text-[10px] font-mono font-black text-blue-800 dark:text-blue-200">
                          1 / 3
                        </span>
                        <button
                          type="button"
                          onClick={handleNextSlide}
                          className="w-5 h-5 rounded-full flex items-center justify-center hover:bg-blue-200 dark:hover:bg-blue-800 text-blue-700 dark:text-blue-200 cursor-pointer transition-all active:scale-95"
                          title="Slide tiếp (→)"
                        >
                          <svg className="w-3 h-3 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
                      <div className="md:col-span-6 space-y-1">
                        <span className="text-xs font-semibold text-blue-600 dark:text-cyan-400 block">{t.home.greeting}</span>
                        <h2 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 dark:text-white font-play leading-snug">
                          {t.home.name}
                        </h2>
                        <p className="text-xs sm:text-[13px] font-bold text-slate-700 dark:text-slate-200 leading-snug">
                          {t.home.role}
                        </p>
                      </div>

                      <div className="md:col-span-6">
                        <p className="text-xs sm:text-[12.5px] text-slate-600 dark:text-slate-300 leading-relaxed font-medium bg-blue-50/70 dark:bg-blue-950/40 p-2.5 sm:p-3 rounded-xl border border-blue-100/70 dark:border-blue-900/50">
                          {t.home.heroDesc}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Actions & Footer */}
                  <div className="pt-2.5 mt-2.5 border-t border-slate-200/80 dark:border-white/10 flex flex-col gap-2">
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <div className="flex items-center gap-2 flex-1 min-w-[240px]">
                        <button
                          type="button"
                          onClick={handlePlayIntro}
                          className="flex-1 min-h-[36px] px-3 py-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-blue-500/25 active:scale-95 transition cursor-pointer"
                        >
                          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                          <span>{t.home.watchIntro}</span>
                        </button>
                        <button
                          type="button"
                          onClick={onNavigateContact}
                          className="flex-1 min-h-[36px] px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 font-bold text-xs flex items-center justify-center gap-1 border border-slate-300 dark:border-white/15 shadow-sm active:scale-95 transition cursor-pointer"
                        >
                          <span>{t.common.contact}</span>
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={handleNextSlide}
                        className="px-3.5 py-1.5 rounded-xl text-xs font-bold text-blue-700 dark:text-blue-300 bg-blue-50 hover:bg-blue-100 dark:bg-blue-950/50 dark:hover:bg-blue-900/50 border border-blue-200 dark:border-blue-800 flex items-center gap-1.5 cursor-pointer transition active:scale-95 ml-auto"
                      >
                        <span>{language === 'vi' ? 'Tiếp: Năng Lực CX' : 'Next: Core CX'}</span>
                        <span>→</span>
                      </button>
                    </div>

                    {/* Progress Bar & Hint */}
                    <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1">
                      <div className="flex items-center gap-2">
                        <div className="w-24 sm:w-28 h-1.5 rounded-full bg-blue-100 dark:bg-blue-950 overflow-hidden">
                          <div className="h-full w-1/3 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600" />
                        </div>
                        <span className="font-mono text-blue-600 dark:text-blue-400 font-bold">Slide 1 / 3 (33%)</span>
                      </div>
                      <span className="hidden sm:inline font-medium">
                        ✦ Dùng phím <kbd className="px-1 py-0.2 rounded bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono text-[9px]">←</kbd> <kbd className="px-1 py-0.2 rounded bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono text-[9px]">→</kbd> để chuyển slide
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* SLIDE 1: Năng lực cốt lõi */}
              {currentSlide === 1 && (
                <div
                  key="home-slide-1"
                  className={`w-full min-h-[220px] p-4 sm:p-5 rounded-2xl overflow-hidden flex flex-col justify-between bg-white/90 dark:bg-slate-900/90 backdrop-blur-2xl border border-white/90 dark:border-white/20 shadow-2xl transition-all duration-300 text-left ${
                    slideDirection === 'next' ? 'animate-slide-next' : 'animate-slide-prev'
                  }`}
                >
                  <div className="space-y-2.5">
                    {/* Header */}
                    <div className="flex items-center justify-between gap-2 border-b border-slate-100 dark:border-white/10 pb-2">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-[11px] shadow-sm">
                        <WebIcon name="rocket" className="w-3.5 h-3.5" />
                        <span>{t.home.card2Title}</span>
                      </div>

                      {/* Center Dots */}
                      <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-purple-50/80 dark:bg-purple-950/40 border border-purple-200/60 dark:border-purple-800/40">
                        {[0, 1, 2].map((idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => handleSelectDot(idx)}
                            className={`transition-all duration-300 rounded-full cursor-pointer ${
                              currentSlide === idx
                                ? 'w-5 h-2 bg-gradient-to-r from-purple-600 to-indigo-600 shadow-xs'
                                : 'w-2 h-2 bg-purple-200 dark:bg-purple-800 hover:bg-purple-300'
                            }`}
                            title={`Slide ${idx + 1}`}
                          />
                        ))}
                      </div>

                      {/* Compact Switcher */}
                      <div className="flex items-center p-0.5 rounded-full bg-purple-50 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-800">
                        <button
                          type="button"
                          onClick={handlePrevSlide}
                          className="w-5 h-5 rounded-full flex items-center justify-center hover:bg-purple-200 dark:hover:bg-purple-800 text-purple-700 dark:text-purple-200 cursor-pointer transition-all active:scale-95"
                          title="Slide trước (←)"
                        >
                          <svg className="w-3 h-3 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                          </svg>
                        </button>
                        <span className="px-1.5 text-[10px] font-mono font-black text-purple-800 dark:text-purple-200">
                          2 / 3
                        </span>
                        <button
                          type="button"
                          onClick={handleNextSlide}
                          className="w-5 h-5 rounded-full flex items-center justify-center hover:bg-purple-200 dark:hover:bg-purple-800 text-purple-700 dark:text-purple-200 cursor-pointer transition-all active:scale-95"
                          title="Slide tiếp (→)"
                        >
                          <svg className="w-3 h-3 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      </div>
                    </div>

                    {/* Content */}
                    <div>
                      <span className="text-xs font-semibold text-purple-600 dark:text-purple-400 block">Customer Centricity &amp; Tech</span>
                      <h3 className="text-lg sm:text-xl font-black tracking-tight text-slate-900 dark:text-white font-play leading-snug">
                        {language === 'vi' ? 'Vận Hành & Trải Nghiệm CX' : 'CX & Operations Leadership'}
                      </h3>
                    </div>

                    {/* 3 Pillars in Responsive Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
                      <div className="flex items-center gap-2 p-2 sm:p-2.5 rounded-xl bg-purple-50/70 dark:bg-purple-950/40 border border-purple-100/70 dark:border-purple-900/50 shadow-2xs">
                        <span className="w-7 h-7 rounded-lg bg-purple-100 dark:bg-purple-900/60 text-purple-700 dark:text-purple-300 flex items-center justify-center shrink-0">
                          <WebIcon name="target" className="w-4 h-4" />
                        </span>
                        <div className="min-w-0">
                          <div className="font-bold text-slate-800 dark:text-slate-100 leading-tight">
                            {language === 'vi' ? 'Trải Nghiệm Chuẩn Hóa' : 'Standardized CX'}
                          </div>
                          <div className="text-[10.5px] text-slate-500 dark:text-slate-400 truncate">CSAT 98% · CJM Matrix</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 p-2 sm:p-2.5 rounded-xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-100/70 dark:border-indigo-900/50 shadow-2xs">
                        <span className="w-7 h-7 rounded-lg bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 flex items-center justify-center shrink-0">
                          <WebIcon name="phone" className="w-4 h-4" />
                        </span>
                        <div className="min-w-0">
                          <div className="font-bold text-slate-800 dark:text-slate-100 leading-tight">
                            {language === 'vi' ? 'Contact Center 24/7' : 'Contact Center 24/7'}
                          </div>
                          <div className="text-[10.5px] text-slate-500 dark:text-slate-400 truncate">SLA 98% · Realtime KPI</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 p-2 sm:p-2.5 rounded-xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-100/70 dark:border-blue-900/50 shadow-2xs">
                        <span className="w-7 h-7 rounded-lg bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300 flex items-center justify-center shrink-0">
                          <WebIcon name="bot" className="w-4 h-4" />
                        </span>
                        <div className="min-w-0">
                          <div className="font-bold text-slate-800 dark:text-slate-100 leading-tight">
                            {language === 'vi' ? 'AI Agent Workflows' : 'AI Workflows'}
                          </div>
                          <div className="text-[10.5px] text-slate-500 dark:text-slate-400 truncate">Tự động hóa RPA &amp; GenAI</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions & Footer */}
                  <div className="pt-2.5 mt-2.5 border-t border-slate-200/80 dark:border-white/10 flex flex-col gap-2">
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <div className="flex items-center gap-2 flex-1 min-w-[240px]">
                        <button
                          type="button"
                          onClick={() => (onNavigatePage ? onNavigatePage(6) : onNavigateContact())}
                          className="flex-1 min-h-[36px] px-3 py-1.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold text-xs flex items-center justify-center gap-1 shadow-md shadow-purple-500/25 active:scale-95 transition cursor-pointer"
                        >
                          <WebIcon name="sparkles" className="w-3.5 h-3.5" />
                          <span>{language === 'vi' ? 'Khám Phá Kỹ Năng' : 'Explore Skills'}</span>
                        </button>
                        <button
                          type="button"
                          onClick={onNavigateContact}
                          className="flex-1 min-h-[36px] px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 font-bold text-xs flex items-center justify-center gap-1 border border-slate-300 dark:border-white/15 shadow-sm active:scale-95 transition cursor-pointer"
                        >
                          <span>{t.common.contact}</span>
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={handleNextSlide}
                        className="px-3.5 py-1.5 rounded-xl text-xs font-bold text-purple-700 dark:text-purple-300 bg-purple-50 hover:bg-purple-100 dark:bg-purple-950/50 dark:hover:bg-purple-900/50 border border-purple-200 dark:border-purple-800 flex items-center gap-1.5 cursor-pointer transition active:scale-95 ml-auto"
                      >
                        <span>{language === 'vi' ? 'Tiếp: Dấu Ấn Thành Tựu' : 'Next: Milestones'}</span>
                        <span>→</span>
                      </button>
                    </div>

                    {/* Progress Bar & Hint */}
                    <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1">
                      <div className="flex items-center gap-2">
                        <div className="w-24 sm:w-28 h-1.5 rounded-full bg-purple-100 dark:bg-purple-950 overflow-hidden">
                          <div className="h-full w-2/3 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600" />
                        </div>
                        <span className="font-mono text-purple-600 dark:text-purple-400 font-bold">Slide 2 / 3 (66%)</span>
                      </div>
                      <span className="hidden sm:inline font-medium">
                        ✦ Dùng phím <kbd className="px-1 py-0.2 rounded bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono text-[9px]">←</kbd> <kbd className="px-1 py-0.2 rounded bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono text-[9px]">→</kbd> để chuyển slide
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* SLIDE 2: Dấu ấn thành tựu */}
              {currentSlide === 2 && (
                <div
                  key="home-slide-2"
                  className={`w-full min-h-[220px] p-4 sm:p-5 rounded-2xl overflow-hidden flex flex-col justify-between bg-white/90 dark:bg-slate-900/90 backdrop-blur-2xl border border-white/90 dark:border-white/20 shadow-2xl transition-all duration-300 text-left ${
                    slideDirection === 'next' ? 'animate-slide-next' : 'animate-slide-prev'
                  }`}
                >
                  <div className="space-y-2.5">
                    {/* Header */}
                    <div className="flex items-center justify-between gap-2 border-b border-slate-100 dark:border-white/10 pb-2">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold text-[11px] shadow-sm">
                        <WebIcon name="trophy" className="w-3.5 h-3.5" />
                        <span>{t.home.card3Title}</span>
                      </div>

                      {/* Center Dots */}
                      <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-amber-50/80 dark:bg-amber-950/40 border border-amber-200/60 dark:border-amber-800/40">
                        {[0, 1, 2].map((idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => handleSelectDot(idx)}
                            className={`transition-all duration-300 rounded-full cursor-pointer ${
                              currentSlide === idx
                                ? 'w-5 h-2 bg-gradient-to-r from-amber-500 to-orange-600 shadow-xs'
                                : 'w-2 h-2 bg-amber-200 dark:bg-amber-800 hover:bg-amber-300'
                            }`}
                            title={`Slide ${idx + 1}`}
                          />
                        ))}
                      </div>

                      {/* Compact Switcher */}
                      <div className="flex items-center p-0.5 rounded-full bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800">
                        <button
                          type="button"
                          onClick={handlePrevSlide}
                          className="w-5 h-5 rounded-full flex items-center justify-center hover:bg-amber-200 dark:hover:bg-amber-800 text-amber-700 dark:text-amber-200 cursor-pointer transition-all active:scale-95"
                          title="Slide trước (←)"
                        >
                          <svg className="w-3 h-3 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                          </svg>
                        </button>
                        <span className="px-1.5 text-[10px] font-mono font-black text-amber-800 dark:text-amber-200">
                          3 / 3
                        </span>
                        <button
                          type="button"
                          onClick={handleNextSlide}
                          className="w-5 h-5 rounded-full flex items-center justify-center hover:bg-amber-200 dark:hover:bg-amber-800 text-amber-700 dark:text-amber-200 cursor-pointer transition-all active:scale-95"
                          title="Slide tiếp (→)"
                        >
                          <svg className="w-3 h-3 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      </div>
                    </div>

                    {/* Content */}
                    <div>
                      <span className="text-xs font-semibold text-amber-600 dark:text-amber-400 block">
                        {language === 'vi' ? 'Hành trình 2002 - 2026+' : 'Journey 2002 - 2026+'}
                      </span>
                      <h3 className="text-lg sm:text-xl font-black tracking-tight text-slate-900 dark:text-white font-play leading-snug">
                        {language === 'vi' ? 'Dấu Ấn Vận Hành Bền Vững' : 'Sustainable Operational Milestones'}
                      </h3>
                    </div>

                    {/* 3 Milestones in Responsive Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
                      <div className="flex items-center gap-2 p-2 sm:p-2.5 rounded-xl bg-amber-50/70 dark:bg-amber-950/40 border border-amber-100/70 dark:border-amber-900/50 shadow-2xs">
                        <span className="w-7 h-7 rounded-lg bg-amber-100 dark:bg-amber-900/60 text-amber-700 dark:text-amber-300 flex items-center justify-center shrink-0">
                          <WebIcon name="users" className="w-4 h-4" />
                        </span>
                        <div className="min-w-0">
                          <div className="font-bold text-slate-800 dark:text-slate-100 leading-tight">
                            {language === 'vi' ? 'Lãnh Đạo Nhân Sự' : 'Team Leadership'}
                          </div>
                          <div className="text-[10.5px] text-slate-500 dark:text-slate-400 truncate">100+ nhân sự CSKH</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 p-2 sm:p-2.5 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-100/70 dark:border-emerald-900/50 shadow-2xs">
                        <span className="w-7 h-7 rounded-lg bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 flex items-center justify-center shrink-0">
                          <WebIcon name="chart" className="w-4 h-4" />
                        </span>
                        <div className="min-w-0">
                          <div className="font-bold text-slate-800 dark:text-slate-100 leading-tight">
                            {language === 'vi' ? 'Dashboard Power BI' : 'Power BI Reporting'}
                          </div>
                          <div className="text-[10.5px] text-slate-500 dark:text-slate-400 truncate">C-Level BI Analytics</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 p-2 sm:p-2.5 rounded-xl bg-cyan-50/70 dark:bg-cyan-950/40 border border-cyan-100/70 dark:border-cyan-900/50 shadow-2xs">
                        <span className="w-7 h-7 rounded-lg bg-cyan-100 dark:bg-cyan-900/60 text-cyan-700 dark:text-cyan-300 flex items-center justify-center shrink-0">
                          <WebIcon name="bolt" className="w-4 h-4" />
                        </span>
                        <div className="min-w-0">
                          <div className="font-bold text-slate-800 dark:text-slate-100 leading-tight">
                            {language === 'vi' ? 'Tối Ưu Chi Phí' : 'Cost Optimization'}
                          </div>
                          <div className="text-[10.5px] text-slate-500 dark:text-slate-400 truncate">Giảm 25% Cost-to-Serve</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions & Footer */}
                  <div className="pt-2.5 mt-2.5 border-t border-slate-200/80 dark:border-white/10 flex flex-col gap-2">
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <div className="flex items-center gap-2 flex-1 min-w-[240px]">
                        <button
                          type="button"
                          onClick={() => (onNavigatePage ? onNavigatePage(7) : onNavigateContact())}
                          className="flex-1 min-h-[36px] px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-bold text-xs flex items-center justify-center gap-1 shadow-md shadow-amber-500/25 active:scale-95 transition cursor-pointer"
                        >
                          <WebIcon name="briefcase" className="w-3.5 h-3.5" />
                          <span>{language === 'vi' ? 'Xem Dự Án' : 'View Projects'}</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => (onNavigatePage ? onNavigatePage(5) : onNavigateContact())}
                          className="flex-1 min-h-[36px] px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 font-bold text-xs flex items-center justify-center gap-1 border border-slate-300 dark:border-white/15 shadow-sm active:scale-95 transition cursor-pointer"
                        >
                          <span>{language === 'vi' ? 'Kinh Nghiệm' : 'Experience'}</span>
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={handleNextSlide}
                        className="px-3.5 py-1.5 rounded-xl text-xs font-bold text-amber-700 dark:text-amber-300 bg-amber-50 hover:bg-amber-100 dark:bg-amber-950/50 dark:hover:bg-amber-900/50 border border-amber-200 dark:border-amber-800 flex items-center gap-1.5 cursor-pointer transition active:scale-95 ml-auto"
                      >
                        <span>↺ {language === 'vi' ? 'Xem lại từ đầu' : 'Start Over'}</span>
                      </button>
                    </div>

                    {/* Progress Bar & Hint */}
                    <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1">
                      <div className="flex items-center gap-2">
                        <div className="w-24 sm:w-28 h-1.5 rounded-full bg-amber-100 dark:bg-amber-950 overflow-hidden">
                          <div className="h-full w-full rounded-full bg-gradient-to-r from-amber-500 to-orange-600" />
                        </div>
                        <span className="font-mono text-amber-600 dark:text-amber-400 font-bold">Slide 3 / 3 (100%)</span>
                      </div>
                      <span className="hidden sm:inline font-medium">
                        ✦ Dùng phím <kbd className="px-1 py-0.2 rounded bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono text-[9px]">←</kbd> <kbd className="px-1 py-0.2 rounded bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono text-[9px]">→</kbd> để chuyển slide
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
