'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useToast } from '@/components/ui/Toast';
import { Modal } from '@/components/ui/Modal';
import { WebIcon } from '@/components/ui/WebIcon';
import { HeroBanner } from '@/components/ui/HeroBanner';

export interface AboutViewProps {
  onNavigateContact: () => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onNavigateContact }) => {
  const { showToast } = useToast();
  const videoRef = useRef<HTMLVideoElement>(null);

  // Slide state: 0 = Slide 1, 1 = Slide 2
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [slideDirection, setSlideDirection] = useState<'next' | 'prev'>('next');

  const handlePrevSlide = useCallback(() => {
    setSlideDirection('prev');
    setCurrentSlide((prev) => (prev > 0 ? prev - 1 : 1));
  }, []);

  const handleNextSlide = useCallback(() => {
    setSlideDirection('next');
    setCurrentSlide((prev) => (prev < 1 ? prev + 1 : 0));
  }, []);

  const IDLE_VIDEO_URL =
    'https://cdn.scena.ai/project/8606/e48a67884f3a52e8a68cf06b97979f3b22835ec92bf466a058c0d78da97c83b0.mp4';
  const INTRO_VIDEO_URL =
    'https://cdn.scena.ai/project/8606/5f84521bf5c51ff234fb0f4029fb9fba29e7e386f13912a56bc7ee25aebcbc10.mp4';

  const [isIntroPlaying, setIsIntroPlaying] = useState<boolean>(false);

  // Map Modal State
  const [mapModalOpen, setMapModalOpen] = useState<boolean>(false);
  const [mapTitle, setMapTitle] = useState<string>('Vị trí bản đồ');
  const [mapAddress, setMapAddress] = useState<string>('');
  const [mapQuery, setMapQuery] = useState<string>('');

  // Keyboard navigation for slides
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        handleNextSlide();
      } else if (e.key === 'ArrowLeft') {
        handlePrevSlide();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNextSlide, handlePrevSlide]);

  const toggleIntroVideo = () => {
    const video = videoRef.current;
    const nextIntro = !isIntroPlaying;
    setIsIntroPlaying(nextIntro);

    if (nextIntro) {
      if (video) {
        video.src = INTRO_VIDEO_URL;
        video.loop = false;
        video.muted = false;
        video.currentTime = 0;
        video.play().catch(() => {});
      }
      showToast('Đang phát video giới thiệu chân dung');
    } else {
      if (video) {
        video.src = IDLE_VIDEO_URL;
        video.loop = true;
        video.muted = true;
        video.currentTime = 0;
        video.play().catch(() => {});
      }
    }
  };

  const openMap = (title: string, address: string, query: string) => {
    setMapTitle(title);
    setMapAddress(address);
    setMapQuery(query);
    setMapModalOpen(true);
  };

  // Dynamic theme-aware Glass Card classes
  const getGlassCardClass = useCallback(() => {
    return 'bg-white/80 dark:bg-[#121218]/85 border border-white/80 dark:border-white/10 backdrop-blur-[18px] backdrop-saturate-[180%] shadow-[0_8px_32px_0_rgba(31,38,135,0.08)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] hover:shadow-[0_12px_40px_0_rgba(31,38,135,0.12)] transition-all duration-300';
  }, []);

  return (
    <div className="w-full max-w-7xl mx-auto flex-grow flex flex-col gap-[15px] justify-start text-slate-800 dark:text-slate-100 font-play pb-6">
      {/* ========================================================================= */}
      {/* CẶP NÚT TRÒN ĐIỀU HƯỚNG SLIDE BÊN TRÁI & PHẢI (CĂN CENTER CHIỀU DỌC)        */}
      {/* ========================================================================= */}
      {/* Nút tròn bên trái (Slide trước) */}
      <button
        type="button"
        onClick={handlePrevSlide}
        className="fixed lg:absolute left-1.5 sm:left-3 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/90 dark:bg-slate-900/90 hover:bg-white dark:hover:bg-slate-800 text-slate-700 dark:text-slate-100 border border-slate-200/90 dark:border-slate-700/80 shadow-[0_4px_20px_rgba(0,0,0,0.18)] backdrop-blur-xl flex items-center justify-center transition-all duration-300 hover:scale-115 active:scale-95 cursor-pointer z-40 group"
        title="Slide trước (Phím ←)"
        aria-label="Slide trước"
      >
        <svg className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.8] transition-transform duration-200 group-hover:-translate-x-0.5 text-blue-600 dark:text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Nút tròn bên phải (Slide kế tiếp) */}
      <button
        type="button"
        onClick={handleNextSlide}
        className="fixed lg:absolute right-1.5 sm:right-3 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/90 dark:bg-slate-900/90 hover:bg-white dark:hover:bg-slate-800 text-slate-700 dark:text-slate-100 border border-slate-200/90 dark:border-slate-700/80 shadow-[0_4px_20px_rgba(0,0,0,0.18)] backdrop-blur-xl flex items-center justify-center transition-all duration-300 hover:scale-115 active:scale-95 cursor-pointer z-40 group"
        title="Slide kế tiếp (Phím →)"
        aria-label="Slide kế tiếp"
      >
        <svg className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.8] transition-transform duration-200 group-hover:translate-x-0.5 text-blue-600 dark:text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* ========================================================================= */}
      {/* SLIDE 1: VIDEO GIỚI THIỆU & THÔNG TIN CÁ NHÂN                             */}
      {/* ========================================================================= */}
      {currentSlide === 0 && (
        <div key="slide-1" className={`w-full flex-1 min-h-0 flex flex-col lg:flex-row gap-[15px] items-stretch ${slideDirection === 'next' ? 'animate-slide-next' : 'animate-slide-prev'}`}>
          {/* 1. BANNER THEO CHIỀU DỌC BÊN TRÁI (VERTICAL HERO BANNER) */}
          <aside className="w-full lg:w-[320px] xl:w-[340px] shrink-0 flex flex-col">
            <div
              className="theme-hero-banner relative rounded-[20px] overflow-hidden border-none shadow-xl flex flex-col justify-between p-3.5 sm:p-4 text-white h-full group/banner"
              style={{
                background: 'linear-gradient(160deg, #0f172a 0%, #1e1b4b 45%, #0c4a6e 100%)',
              }}
            >
              {/* Background Video with Poster fallback */}
              <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover object-center select-none pointer-events-none opacity-45 group-hover/banner:scale-105 transition-transform duration-700"
              >
                <source src="https://cdn.scena.ai/project/10223/6b340b887934f5d4980a3b725313a505db9234fff156da9f65f430b385f32da3.mp4" type="video/mp4" />
              </video>

              {/* Dark Ambient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-slate-950/85 via-slate-900/60 to-slate-950/90 pointer-events-none" />

              {/* Ambient Watermark */}
              <div className="card-watermark opacity-15 pointer-events-none -right-4 -bottom-6">
                <WebIcon name="user" className="w-24 h-24 text-blue-400" />
              </div>

              {/* PHẦN 1: HEADER BANNER (Tiêu đề, Badge, Subtitle & Quote) */}
              <div className="relative z-10 flex flex-col gap-1.5 shrink-0 text-left">
                <div className="flex items-center justify-between gap-2 pb-1.5 border-b border-white/15">
                  <span className="font-handwriting font-bold text-xl sm:text-2xl text-cyan-400 leading-none drop-shadow-xs">
                    Chân dung
                  </span>
                  <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-500/25 border border-blue-400/40 text-[9.5px] font-extrabold text-blue-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                    <span>Giới thiệu · Lãnh đạo</span>
                  </div>
                </div>

                <h2 className="text-base sm:text-lg font-black font-play text-white tracking-tight leading-snug drop-shadow-xs">
                  Chân Dung & Tầm Nhìn Quản Trị
                </h2>
                <p className="text-[10.5px] font-medium text-slate-200 leading-tight">
                  Nguyễn Hùng Thái – Chuyên gia Quản trị Trải nghiệm Khách hàng & Vận hành CSKH
                </p>

                {/* Decorative Line */}
                <div className="w-12 h-1 rounded-full bg-gradient-to-r from-blue-400 via-indigo-500 to-cyan-400 shadow-xs" />

                {/* Quote Block Fleur De Leah */}
                <div className="pt-1 bg-transparent border-none shadow-none">
                  <p className="font-banner-quote text-xl sm:text-2xl text-amber-300 font-normal leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
                    “Lãnh đạo bằng sự thấu cảm, tối ưu hóa hiệu suất và gắn kết con người.”
                  </p>
                  <span className="text-[10px] font-bold text-amber-200/90 mt-0.5 block tracking-wider font-play drop-shadow-[0_1px_4px_rgba(0,0,0,0.85)]">
                    — Nguyễn Hùng Thái
                  </span>
                </div>
              </div>

              {/* PHẦN 2: PROFILE BADGE ROW & NEXT SLIDE BUTTON */}
              <div className="relative z-10 my-2 flex flex-col gap-2 shrink-0 text-left">
                <div className="flex items-center gap-2.5 p-2 rounded-xl bg-white/10 border border-white/10 backdrop-blur-sm">
                  <div className="relative w-10 h-10 rounded-xl overflow-hidden ring-1 ring-sky-300/50 shadow-md shrink-0 bg-slate-900">
                    <img
                      src="https://i.ibb.co/RT3jX4Mv/H-ng-Th-i-Avata-Gif.gif"
                      alt="Nguyễn Hùng Thái"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs font-black font-play text-white truncate tracking-wide">
                      Nguyễn Hùng Thái
                    </span>
                    <span className="text-[10px] font-bold text-sky-200 truncate">
                      Trưởng Phòng CSKH
                    </span>
                    <span className="text-[9px] text-slate-300 truncate">
                      22+ Năm Kinh Nghiệm Vận Hành
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* 2. MAIN CONTENT VÙNG BÊN PHẢI (HERO PORTRAIT VIDEO + THÔNG TIN CÁ NHÂN) */}
          <div className="flex-1 min-w-0 grid grid-cols-1 lg:grid-cols-12 gap-[15px] items-stretch">
            {/* Left Column: Hero Portrait Video Card (5 Cols in 9:16 portrait layout) */}
            <div className="lg:col-span-5 relative flex flex-col items-center justify-center">
              {/* Hero Image Container: Chuẩn 9:16 chiều dọc */}
              <div className="relative w-full max-w-[340px] rounded-3xl overflow-hidden border border-white/80 dark:border-white/10 shadow-lg bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 aspect-[9/16] flex items-center justify-center group">
                {/* Video 1: Idle Video (Autoplay loop muted) */}
                <video
                  src={IDLE_VIDEO_URL}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className={`w-full h-full object-cover object-center ${isIntroPlaying ? 'hidden' : 'block'}`}
                />

                {/* Video element for active intro playback */}
                <video
                  ref={videoRef}
                  src={INTRO_VIDEO_URL}
                  className={`w-full h-full object-cover object-center ${isIntroPlaying ? 'block' : 'hidden'}`}
                  playsInline
                  loop={false}
                  onEnded={() => setIsIntroPlaying(false)}
                />

                {/* Overlaid Clickable Elements aligned with mockup */}
                {/* Metric Top-Right: Quy mô lớn */}
                <div className="absolute top-3.5 right-3.5 z-20 bg-white/95 dark:bg-slate-900/90 backdrop-blur-md border border-white/90 dark:border-white/10 p-2 sm:p-2.5 rounded-2xl shadow-lg flex items-center gap-2 hover:scale-105 transition cursor-default">
                  <div className="w-8 h-8 rounded-xl bg-purple-100 dark:bg-purple-950 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                    <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <span className="text-[9.5px] font-bold text-slate-500 dark:text-slate-400 block leading-tight">Quy mô lớn</span>
                    <span className="text-sm sm:text-base font-black text-purple-700 dark:text-purple-400 tracking-tight leading-none">8+ Môi trường</span>
                  </div>
                </div>

                {/* 2. Metric Top-Right: Quy mô lớn */}
                <div className="absolute top-3.5 right-3.5 z-20 bg-white/95 dark:bg-slate-900/90 backdrop-blur-md border border-white/90 dark:border-white/10 p-2 sm:p-2.5 rounded-2xl shadow-lg flex items-center gap-2 hover:scale-105 transition cursor-default">
                  <div className="w-8 h-8 rounded-xl bg-purple-100 dark:bg-purple-950 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                    <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <span className="text-[9.5px] font-bold text-slate-500 dark:text-slate-400 block leading-tight">Quy mô lớn</span>
                    <span className="text-sm sm:text-base font-black text-purple-700 dark:text-purple-400 tracking-tight leading-none">8+ Môi trường</span>
                  </div>
                </div>

                {/* 3. Metric Mid-Right: Tự động hóa */}
                <div className="absolute top-1/2 -translate-y-1/2 right-3.5 z-20 bg-white/95 dark:bg-slate-900/90 backdrop-blur-md border border-white/90 dark:border-white/10 p-2 sm:p-2.5 rounded-2xl shadow-lg flex items-center gap-2 hover:scale-105 transition cursor-default">
                  <div className="w-8 h-8 rounded-xl bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-400 flex items-center justify-center">
                    <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <span className="text-[9.5px] font-bold text-slate-500 dark:text-slate-400 block leading-tight">Tự động hóa</span>
                    <span className="text-sm sm:text-base font-black text-rose-600 dark:text-rose-400 tracking-tight leading-none">24/7 AI CRM</span>
                  </div>
                </div>

                {/* 4. Metric Bottom-Right: Hài lòng KH */}
                <div className="absolute bottom-3.5 right-3.5 z-20 bg-white/95 dark:bg-slate-900/90 backdrop-blur-md border border-white/90 dark:border-white/10 p-2 sm:p-2.5 rounded-2xl shadow-lg flex items-center gap-2 hover:scale-105 transition cursor-default">
                  <div className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                    <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" strokeWidth="2.4" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <span className="text-[9.5px] font-bold text-slate-500 dark:text-slate-400 block leading-tight">Hài lòng KH</span>
                    <span className="text-sm sm:text-base font-black text-emerald-600 dark:text-emerald-400 tracking-tight leading-none">99% CSAT</span>
                  </div>
                </div>

                {/* 5. Bottom-Left CTA Button: Giới thiệu video */}
                <div className="absolute bottom-3.5 left-3.5 z-20">
                  <button
                    type="button"
                    onClick={toggleIntroVideo}
                    className="px-4 py-2 rounded-[999px] bg-gradient-to-r from-blue-600 via-indigo-600 to-fuchsia-600 hover:brightness-110 active:scale-95 text-white font-bold text-xs sm:text-sm flex items-center gap-2.5 shadow-xl shadow-indigo-600/35 transition cursor-pointer border border-white/30"
                  >
                    <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-rose-500 to-pink-500 flex items-center justify-center text-white shadow-xs">
                      {isIntroPlaying ? (
                        <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                          <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                        </svg>
                      ) : (
                        <svg className="w-3 h-3 fill-current ml-0.5" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      )}
                    </div>
                    <span>{isIntroPlaying ? 'Tạm Dừng Video' : 'Phát Video Giới Thiệu'}</span>
                    <span className="font-bold text-sm">→</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column: Personal Information Card (7 Cols) */}
            <div className={`lg:col-span-7 rounded-3xl p-5 flex flex-col justify-between text-left ${getGlassCardClass()}`}>
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
                    <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-blue-700 dark:text-blue-400">Thông tin cá nhân</h3>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono block">Personal Profile</span>
                  </div>
                </div>
                <span className="text-blue-500 font-bold text-base">›</span>
              </div>

              {/* Demographic Rows */}
              <div className="flex flex-col gap-2.5 my-3">
                {/* 1. Giới tính */}
                <div className="p-2.5 px-3.5 rounded-2xl bg-white/70 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60 hover:border-blue-200 dark:hover:border-blue-500 hover:bg-blue-50/30 transition flex items-center justify-between shadow-xs">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-950/70 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 tracking-wider block">Giới tính</span>
                      <span className="text-xs sm:text-sm font-black text-slate-800 dark:text-white">Nam giới</span>
                    </div>
                  </div>
                  <span className="text-slate-400 font-bold text-sm">›</span>
                </div>

                {/* 2. Dân tộc */}
                <div className="p-2.5 px-3.5 rounded-2xl bg-white/70 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60 hover:border-purple-200 dark:hover:border-purple-500 hover:bg-purple-50/30 transition flex items-center justify-between shadow-xs">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-purple-50 dark:bg-purple-950/70 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-purple-600 dark:text-purple-400 tracking-wider block">Dân tộc</span>
                      <span className="text-xs sm:text-sm font-black text-slate-800 dark:text-white">Kinh</span>
                    </div>
                  </div>
                  <span className="text-slate-400 font-bold text-sm">›</span>
                </div>

                {/* 3. Tình trạng */}
                <div className="p-2.5 px-3.5 rounded-2xl bg-white/70 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60 hover:border-rose-200 dark:hover:border-rose-500 hover:bg-rose-50/30 transition flex items-center justify-between shadow-xs">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-rose-50 dark:bg-rose-950/70 text-rose-500 dark:text-rose-400 flex items-center justify-center shrink-0">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-rose-600 dark:text-rose-400 tracking-wider block">Tình trạng</span>
                      <span className="text-xs sm:text-sm font-black text-rose-600 dark:text-rose-400">Độc thân</span>
                    </div>
                  </div>
                  <span className="text-rose-400 font-bold text-sm">›</span>
                </div>

                {/* 4. Sinh nhật */}
                <div className="p-2.5 px-3.5 rounded-2xl bg-white/70 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60 hover:border-amber-200 dark:hover:border-amber-500 hover:bg-amber-50/30 transition flex items-center justify-between shadow-xs">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-amber-50 dark:bg-amber-950/70 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400 tracking-wider block">Sinh nhật</span>
                      <span className="text-xs sm:text-sm font-black text-amber-700 dark:text-amber-300">22/06/1984</span>
                    </div>
                  </div>
                  <span className="text-amber-400 font-bold text-sm">›</span>
                </div>

                {/* 5. Tạm trú */}
                <div
                  onClick={() => openMap('Địa Chỉ Tạm Trú', 'Quận 7, TP. Hồ Chí Minh', 'Quận 7, Thành phố Hồ Chí Minh, Việt Nam')}
                  className="p-2.5 px-3.5 rounded-2xl bg-white/70 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60 hover:border-fuchsia-200 dark:hover:border-fuchsia-500 hover:bg-fuchsia-50/30 transition flex items-center justify-between shadow-xs cursor-pointer select-none"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-fuchsia-50 dark:bg-fuchsia-950/70 text-fuchsia-600 dark:text-fuchsia-400 flex items-center justify-center shrink-0">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-fuchsia-600 dark:text-fuchsia-400 tracking-wider block">Tạm trú</span>
                      <span className="text-xs sm:text-sm font-black text-slate-800 dark:text-white">Q7, Hồ Chí Minh</span>
                    </div>
                  </div>
                  <span className="text-fuchsia-400 font-bold text-sm">›</span>
                </div>

                {/* 6. Cư trú */}
                <div
                  onClick={() => openMap('Địa Chỉ Cư Trú Thường Trú', 'TP. Mỹ Tho, Tiền Giang', 'Mỹ Tho, Tiền Giang, Việt Nam')}
                  className="p-2.5 px-3.5 rounded-2xl bg-white/70 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60 hover:border-emerald-200 dark:hover:border-emerald-500 hover:bg-emerald-50/30 transition flex items-center justify-between shadow-xs cursor-pointer select-none"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950/70 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 tracking-wider block">Cư trú</span>
                      <span className="text-xs sm:text-sm font-black text-slate-800 dark:text-white">Mỹ Tho, Tiền Giang</span>
                    </div>
                  </div>
                  <span className="text-emerald-400 font-bold text-sm">›</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* SLIDE 2: GIỚI THIỆU BẢN THÂN, BA TRỤ CỘT, TRIẾT LÝ VÀ TẦM NHÌN, HỢP TÁC    */}
      {/* ========================================================================= */}
      {currentSlide === 1 && (
        <div key="slide-2" className={`w-full flex flex-col gap-[15px] ${slideDirection === 'next' ? 'animate-slide-next' : 'animate-slide-prev'}`}>
          {/* Top Hero Banner for Slide 2 */}
          <HeroBanner
            badgeText="Triết lý & Năng lực"
            title="Hồ Sơ Chuyên Gia"
            subtitle="Nền tảng 22+ năm trải nghiệm – Ba trụ cột cốt lõi – Sứ mệnh đồng hành cùng doanh nghiệp"
            quote="“Chăm Sóc Khách Hàng không chỉ là phục vụ, mà là sự đồng hành bền vững.”"
            quoteAuthor="— Nguyễn Hùng Thái"
            badgeColor="text-indigo-600 dark:text-indigo-400"
            videoSrc="https://cdn.scena.ai/project/10223/6b340b887934f5d4980a3b725313a505db9234fff156da9f65f430b385f32da3.mp4"
          />

          {/* 3 COLUMNS SECTION (BẢN THÂN - BA TRỤ CỘT - TRIẾT LÝ & TẦM NHÌN) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-[15px] items-stretch w-full text-left">
            {/* Column 1: Giới thiệu bản thân tôi (Tự co giãn card và sub-card tối ưu khoảng trắng) */}
            <div className={`rounded-3xl p-5 sm:p-6 flex flex-col justify-between h-auto min-h-full transition-all duration-300 ${getGlassCardClass()}`}>
              <div className="space-y-4 flex-1">
                {/* Header */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-500/25">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white tracking-tight leading-snug">
                        Giới thiệu bản thân tôi
                      </h3>
                      <span className="text-[10px] font-bold tracking-wider text-slate-400 block font-mono">
                        About Me
                      </span>
                    </div>
                  </div>
                  <div className="w-7 h-7 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold text-sm">
                    ›
                  </div>
                </div>

                {/* Narrative Body */}
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                  Một chuyên gia dịch vụ khách hàng với hơn{' '}
                  <span className="text-blue-600 dark:text-cyan-400 font-bold">22 năm kinh nghiệm</span> thực chiến. Với tôi,
                  Chăm Sóc Khách Hàng không chỉ là phục vụ, mà là sự đồng hành. Mỗi cuộc trò chuyện, mỗi khoảnh
                  khắc, dù là nhỏ nhất, đều là một cơ hội quý giá: để lắng nghe, để thấu hiểu, và để tạo ra những
                  trải nghiệm vượt trên cả sự mong đợi.
                </p>
              </div>

              {/* Bottom Highlight Box: Giá trị cốt lõi (Tự co giãn theo kích thước nội dung) */}
              <div className="mt-4 p-4 rounded-2xl bg-[#FFF9EE] dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-800/60 shadow-xs flex flex-col gap-2 shrink-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-amber-500 text-white flex items-center justify-center font-serif text-xs font-bold">
                      ❝
                    </div>
                    <h4 className="text-xs sm:text-sm font-extrabold text-amber-950 dark:text-amber-200">Giá trị cốt lõi</h4>
                  </div>
                  <span className="text-amber-400 font-bold tracking-widest text-xs">•••</span>
                </div>

                <p className="text-xs text-slate-700 dark:text-slate-300 font-medium leading-relaxed mt-0.5">
                  Tôi tin rằng sự hài lòng không đến từ sự hoàn hảo tuyệt đối, mà đến từ sự{' '}
                  <span className="text-rose-600 dark:text-rose-400 font-bold">tận tâm kịp thời</span> và{' '}
                  <span className="text-rose-600 dark:text-rose-400 font-bold">đồng cảm chân thành</span>.
                </p>
              </div>
            </div>

            {/* Column 2: Ba trụ cột vận hành */}
            <div className={`rounded-3xl p-5 sm:p-6 flex flex-col justify-between ${getGlassCardClass()}`}>
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-500/25">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10" />
                      <circle cx="12" cy="12" r="6" />
                      <circle cx="12" cy="12" r="2" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white tracking-tight leading-snug">
                      Ba trụ cột vận hành
                    </h3>
                    <span className="text-[10px] font-bold tracking-wider text-slate-400 block font-mono">
                      Operational Pillars
                    </span>
                  </div>
                </div>
                <div className="w-7 h-7 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold text-sm">
                  ›
                </div>
              </div>

              {/* 3 Colored Pillar Cards */}
              <div className="flex flex-col gap-3 flex-grow justify-between">
                {/* Pillar 1: Hiệu quả */}
                <div className="p-4 rounded-2xl bg-gradient-to-r from-[#00A3FF] to-[#0066FF] text-white shadow-sm flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition">
                  <div className="flex items-center justify-between relative z-10">
                    <span className="text-2xl font-black text-white/40 font-mono">01</span>
                    <div className="w-7 h-7 rounded-full bg-white/20 border border-white/30 flex items-center justify-center">
                      <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" strokeWidth="2.4" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10" />
                        <circle cx="12" cy="12" r="6" />
                        <circle cx="12" cy="12" r="2" />
                      </svg>
                    </div>
                    <div className="w-6 h-6 rounded-full bg-white/20 border border-white/30 flex items-center justify-center text-xs font-bold">
                      →
                    </div>
                  </div>
                  <div className="mt-2 text-center relative z-10">
                    <h4 className="text-sm font-black tracking-wider text-white">Hiệu quả</h4>
                    <p className="text-[11px] font-bold text-white/90">Tối ưu & Kết quả</p>
                    <p className="text-[11px] text-white/80 font-medium leading-relaxed mt-0.5">
                      Tối ưu hiệu suất, tạo kết quả đo lường được.
                    </p>
                  </div>
                  {/* Subtle background decoration */}
                  <div className="absolute right-2 bottom-1 opacity-20 pointer-events-none flex items-end gap-1">
                    <div className="w-1.5 h-4 bg-white rounded-t" />
                    <div className="w-1.5 h-7 bg-white rounded-t" />
                    <div className="w-1.5 h-10 bg-white rounded-t" />
                  </div>
                </div>

                {/* Pillar 2: Nhân văn */}
                <div className="p-4 rounded-2xl bg-gradient-to-r from-[#FF3377] to-[#A822D6] text-white shadow-sm flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition">
                  <div className="flex items-center justify-between relative z-10">
                    <span className="text-2xl font-black text-white/40 font-mono">02</span>
                    <div className="w-7 h-7 rounded-full bg-white/20 border border-white/30 flex items-center justify-center">
                      <svg className="w-3.5 h-3.5 text-white fill-current" viewBox="0 0 24 24">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                      </svg>
                    </div>
                    <div className="w-6 h-6 rounded-full bg-white/20 border border-white/30 flex items-center justify-center text-xs font-bold">
                      →
                    </div>
                  </div>
                  <div className="mt-2 text-center relative z-10">
                    <h4 className="text-sm font-black tracking-wider text-white">Nhân văn</h4>
                    <p className="text-[11px] font-bold text-white/90">Đồng cảm & Thấu hiểu</p>
                    <p className="text-[11px] text-white/80 font-medium leading-relaxed mt-0.5">
                      Lắng nghe, thấu hiểu và đặt con người làm trung tâm.
                    </p>
                  </div>
                  {/* Subtle background decoration */}
                  <div className="absolute right-2 bottom-1 opacity-20 pointer-events-none">
                    <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
                    </svg>
                  </div>
                </div>

                {/* Pillar 3: Bền vững */}
                <div className="p-4 rounded-2xl bg-gradient-to-r from-[#00C875] to-[#00965E] text-white shadow-sm flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition">
                  <div className="flex items-center justify-between relative z-10">
                    <span className="text-2xl font-black text-white/40 font-mono">03</span>
                    <div className="w-7 h-7 rounded-full bg-white/20 border border-white/30 flex items-center justify-center">
                      <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                    </div>
                    <div className="w-6 h-6 rounded-full bg-white/20 border border-white/30 flex items-center justify-center text-xs font-bold">
                      →
                    </div>
                  </div>
                  <div className="mt-2 text-center relative z-10">
                    <h4 className="text-sm font-black tracking-wider text-white">Bền vững</h4>
                    <p className="text-[11px] font-bold text-white/90">Giá trị & Tin cậy</p>
                    <p className="text-[11px] text-white/80 font-medium leading-relaxed mt-0.5">
                      Xây dựng niềm tin và giá trị bền vững.
                    </p>
                  </div>
                  {/* Subtle background decoration */}
                  <div className="absolute right-2 bottom-1 opacity-20 pointer-events-none">
                    <svg className="w-9 h-9" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66.95-2.3c.48.17.98.3 1.34.3C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75C7 8 17 8 17 8z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Column 3: Triết lý và tầm nhìn */}
            <div className={`rounded-3xl p-5 sm:p-6 flex flex-col justify-between ${getGlassCardClass()}`}>
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-500/25">
                      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white tracking-tight leading-snug">
                        Triết lý và tầm nhìn
                      </h3>
                      <span className="text-[10px] font-bold tracking-wider text-slate-400 block font-mono">
                        Philosophy & Vision
                      </span>
                    </div>
                  </div>
                  <div className="w-7 h-7 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold text-sm">
                    ›
                  </div>
                </div>

                {/* Quote Card */}
                <div className="p-4 rounded-2xl bg-blue-50/60 dark:bg-blue-950/40 border border-blue-200/70 dark:border-blue-800/60 text-center relative shadow-xs">
                  <span className="absolute top-2 left-3 text-blue-600 dark:text-cyan-400 font-serif text-2xl font-bold leading-none select-none">
                    “
                  </span>
                  <p className="text-xs sm:text-sm font-extrabold italic text-blue-700 dark:text-cyan-300 px-3 py-1">
                    “Tận Tâm & Đồng Hành Cùng Trải Nghiệm Khách Hàng”
                  </p>
                  <span className="absolute bottom-1 right-3 text-blue-600 dark:text-cyan-400 font-serif text-2xl font-bold leading-none select-none">
                    ”
                  </span>
                </div>

                {/* Description Paragraph */}
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                  Tôi luôn nỗ lực để mang lại sản phẩm, dịch vụ chất lượng cao với chi phí hợp lý. Và trên hết,
                  để mỗi khách hàng cảm nhận được một điều đơn giản mà cốt lõi:{' '}
                  <span className="text-blue-600 dark:text-cyan-400 font-bold">Họ luôn được lắng nghe</span>.
                </p>
              </div>

              {/* Bottom Vision Box */}
              <div className="mt-5 p-3.5 rounded-2xl bg-blue-50/80 dark:bg-blue-950/50 border border-blue-200/60 dark:border-blue-800/60 flex items-start gap-3 shadow-xs">
                <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                  <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <p className="text-xs text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
                  <strong className="text-blue-900 dark:text-cyan-300 font-bold">Tầm nhìn:</strong> Kiến tạo giá trị thực sự cho
                  doanh nghiệp thông qua việc tối ưu quy trình và phát triển năng lực của đội ngũ chăm sóc khách hàng
                  trực diện, hướng tới sự phát triển toàn diện.
                </p>
              </div>
            </div>
          </div>

          {/* 4. HỢP TÁC & ĐỒNG HÀNH (BOTTOM CTA BANNER) */}
          <div className="w-full relative overflow-hidden p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-[#DBEAFE]/90 via-[#EDE9FE]/90 to-[#FCE7F3]/90 dark:from-slate-900/90 dark:via-indigo-950/90 dark:to-slate-900/90 border border-white/80 dark:border-white/10 shadow-md backdrop-blur-xl flex flex-col md:flex-row items-center justify-between gap-[15px] text-left">
            {/* Left Info Cluster */}
            <div className="flex items-center gap-4 flex-1">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 shadow-sm border border-blue-200/60 dark:border-blue-800">
                <svg className="w-6 h-6 stroke-[2.2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </div>
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-[999px] bg-blue-100/80 dark:bg-blue-900/50 border border-blue-200/70 dark:border-blue-700 text-[11px] font-bold text-blue-700 dark:text-blue-300">
                  <WebIcon name="handshake" className="w-3.5 h-3.5" />
                  <span>Hợp tác & Đồng hành</span>
                </div>
                <h3 className="text-base sm:text-xl font-black text-slate-900 dark:text-white tracking-tight">
                  Cùng tạo ra trải nghiệm khách hàng tốt hơn
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-medium">
                  Tôi luôn sẵn sàng kết nối để cùng doanh nghiệp xây dựng hệ thống Customer Experience hiệu quả, nhân văn và bền vững.
                </p>
              </div>
            </div>

            {/* Right CTA Button */}
            <button
              type="button"
              onClick={onNavigateContact}
              className="w-full md:w-auto px-5 py-3 rounded-[999px] bg-gradient-to-r from-blue-600 via-indigo-600 to-amber-500 hover:brightness-105 active:scale-95 text-white shadow-lg shadow-blue-500/25 transition cursor-pointer flex items-center justify-between md:justify-start gap-4 shrink-0"
            >
              <div className="w-8 h-8 rounded-full bg-white/20 border border-white/30 flex items-center justify-center text-white shrink-0">
                <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <div className="text-left">
                <span className="text-xs sm:text-sm font-black text-white block leading-tight">Kết nối với tôi</span>
                <span className="text-[10.5px] text-white/90 font-medium block leading-tight">Trao đổi, chia sẻ cơ hội hợp tác</span>
              </div>
              <span className="text-white font-bold text-base ml-1">›</span>
            </button>

            {/* Decorative Dot Grid */}
            <div className="absolute right-3 bottom-2 opacity-25 pointer-events-none grid grid-cols-4 gap-1">
              {Array.from({ length: 16 }).map((_, i) => (
                <div key={i} className="w-1 h-1 rounded-full bg-blue-500" />
              ))}
            </div>
          </div>

          {/* Slide 2 Bottom Action */}
          <div className="flex items-center justify-end pt-2">
            <button
              type="button"
              onClick={onNavigateContact}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-xs sm:text-sm shadow-md shadow-blue-500/25 hover:brightness-110 active:scale-95 transition flex items-center gap-2 cursor-pointer"
            >
              <span>Liên Hệ Trực Tiếp</span>
              <svg className="w-4 h-4 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Google Maps Modal */}
      <Modal
        isOpen={mapModalOpen}
        onClose={() => setMapModalOpen(false)}
        title={mapTitle}
        subtitle={mapAddress}
        icon={<WebIcon name="location" className="w-5 h-5 text-indigo-600" />}
        maxWidth="2xl"
      >
        <div className="p-4 flex flex-col gap-3">
          <div className="relative w-full h-[320px] rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800">
            {mapModalOpen && (
              <iframe
                title="Google Maps Location"
                className="w-full h-full border-0"
                loading="lazy"
                src={`https://maps.google.com/maps?q=${encodeURIComponent(mapQuery)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
              />
            )}
          </div>
          <div className="flex items-center justify-between pt-1">
            <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 font-mono">
              <WebIcon name="location" className="w-3.5 h-3.5 text-rose-500" />
              <span>Google Maps Embed</span>
            </span>
            <div className="flex items-center gap-2">
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapQuery)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-1.5 rounded-[999px] bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition inline-flex items-center gap-1"
              >
                <span>Mở Tab Google Maps</span>
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M7 17 17 7M7 7h10v10" /></svg>
              </a>
              <button
                type="button"
                onClick={() => setMapModalOpen(false)}
                className="px-4 py-1.5 rounded-[999px] bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 text-xs font-bold transition cursor-pointer"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};
