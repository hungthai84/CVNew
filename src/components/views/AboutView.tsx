'use client';

import React, { useState, useRef } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { WebIcon } from '@/components/ui/WebIcon';
import { 
  ABOUT_PROFILE_STATS, 
  PERSONAL_DEMOGRAPHICS, 
  AboutProfileStat, 
  PersonalInfoItem 
} from '@/data/aboutData';

const ABOUT_IDLE_VIDEO_URL =
  'https://cdn.scena.ai/project/8606/e48a67884f3a52e8a68cf06b97979f3b22835ec92bf466a058c0d78da97c83b0.mp4';
const ABOUT_INTRO_VIDEO_URL =
  'https://cdn.scena.ai/project/8606/5f84521bf5c51ff234fb0f4029fb9fba29e7e386f13912a56bc7ee25aebcbc10.mp4';

export interface AboutViewProps {
  onNavigateContact?: () => void;
  onOpenAiChat?: () => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onNavigateContact, onOpenAiChat }) => {
  const { lang, t } = useLanguage();
  const isVi = lang === 'vi';

  // Google Maps Location Modal State
  const [selectedMapLocation, setSelectedMapLocation] = useState<{
    isOpen: boolean;
    type: 'tam_tru' | 'cu_tru';
    title: string;
    address: string;
    query: string;
  } | null>(null);

  // Video State & Controls
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlayingIntro, setIsPlayingIntro] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(true);
  const [videoCurrentTime, setVideoCurrentTime] = useState(0);
  const [videoDuration, setVideoDuration] = useState(210);
  const [isVideoPaused, setIsVideoPaused] = useState(false);

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setVideoCurrentTime(videoRef.current.currentTime);
      if (videoRef.current.duration && !isNaN(videoRef.current.duration)) {
        setVideoDuration(videoRef.current.duration);
      }
    }
  };

  const handlePlayIntro = () => {
    setIsPlayingIntro(true);
    setIsVideoMuted(false);
    setIsVideoPaused(false);
    if (videoRef.current) {
      videoRef.current.src = ABOUT_INTRO_VIDEO_URL;
      videoRef.current.muted = false;
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  };

  const handleCancelIntro = () => {
    setIsPlayingIntro(false);
    setIsVideoMuted(true);
    setIsVideoPaused(false);
    setVideoCurrentTime(0);
    if (videoRef.current) {
      videoRef.current.src = ABOUT_IDLE_VIDEO_URL;
      videoRef.current.muted = true;
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  };

  const handleVideoEnded = () => {
    if (isPlayingIntro) {
      handleCancelIntro();
    }
  };

  const toggleVideoMute = () => {
    if (!videoRef.current) return;
    const nextMuted = !isVideoMuted;
    videoRef.current.muted = nextMuted;
    setIsVideoMuted(nextMuted);
  };

  const togglePlayPause = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play().catch(() => {});
      setIsVideoPaused(false);
    } else {
      videoRef.current.pause();
      setIsVideoPaused(true);
    }
  };

  const handleSeek = (time: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = time;
      setVideoCurrentTime(time);
    }
  };

  const handleNavigate = (sectionId: string) => {
    if (sectionId === 'contact' && onNavigateContact) {
      onNavigateContact();
    } else {
      window.dispatchEvent(new CustomEvent('app-navigate', { detail: sectionId }));
    }
  };

  const formatVideoTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <section 
      id="about" 
      className="relative w-full h-full flex flex-col justify-between p-2 sm:p-2.5 font-sans text-slate-800 dark:text-slate-100 transition-all duration-300 bg-transparent overflow-y-auto lg:overflow-hidden select-none"
    >
      <div className="w-full h-full flex flex-col justify-between gap-2 lg:gap-2.5 max-w-7xl mx-auto min-h-0">
        
        {/* ========================================================================= */}
        {/* 1. TOP BENTO BAR: TIÊU ĐỀ HỒ SƠ & SLOGAN LÃNH ĐẠO (SHRINK-0)               */}
        {/* ========================================================================= */}
        <div className="w-full flex items-center justify-between gap-2 px-2.5 py-1.5 rounded-xl bg-white/70 dark:bg-slate-900/70 border border-white/80 dark:border-white/10 shadow-2xs backdrop-blur-md shrink-0">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-6 h-6 rounded-lg bg-blue-500/10 text-blue-600 dark:text-cyan-400 flex items-center justify-center shrink-0">
              <WebIcon name="user" className="w-3.5 h-3.5" />
            </div>
            <h2 className="text-xs sm:text-sm font-black font-play tracking-tight truncate bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 dark:from-blue-400 dark:via-indigo-300 dark:to-cyan-300">
              {isVi ? 'Hồ Sơ Chuyên Gia & Bản Đồ Vận Hành CSKH' : 'Executive Profile & CS Operations Map'}
            </h2>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-[11px] font-medium italic text-slate-500 dark:text-slate-400">
            <WebIcon name="sparkles" className="w-3.5 h-3.5 text-amber-500" />
            <span>{isVi ? '“Giá trị cốt lõi tạo nên trải nghiệm khác biệt”' : '“Core values create differentiated experiences”'}</span>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2. MAIN BENTO GRID: BỐ CỤC 12 CỘT TỐI ƯU HÓA SINGLE-SCREEN                */}
        {/* ========================================================================= */}
        <div className="w-full flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-12 gap-2 sm:gap-2.5 items-stretch">
          
          {/* ======================================================================= */}
          {/* BENTO TILE 1: VIDEO CHÂN DUNG & CHỈ SỐ VẬN HÀNH (4.5 COLS)              */}
          {/* ======================================================================= */}
          <div className="lg:col-span-5 xl:col-span-4 h-full relative overflow-hidden rounded-2xl border border-white/80 dark:border-white/10 bg-slate-950 shadow-md flex flex-col justify-between group min-h-[280px] lg:min-h-0">
            {/* The Video Element */}
            <video
              ref={videoRef}
              src={isPlayingIntro ? ABOUT_INTRO_VIDEO_URL : ABOUT_IDLE_VIDEO_URL}
              className="w-full h-full object-cover object-center absolute inset-0 brightness-105"
              autoPlay
              loop={!isPlayingIntro}
              muted={isVideoMuted}
              playsInline
              onTimeUpdate={handleTimeUpdate}
              onEnded={handleVideoEnded}
            />

            {/* Subtle Gradient vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/35 pointer-events-none" />

            {/* Top Bar inside Video: Live Badge */}
            <div className="relative z-20 flex items-center justify-between p-2.5">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-black/50 border border-white/20 text-white text-[9.5px] font-bold tracking-wide backdrop-blur-md">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>{isPlayingIntro ? (isVi ? 'Đang phát Giới thiệu' : 'Playing Intro') : (isVi ? 'Video Chân Dung' : 'Portrait Feed')}</span>
              </div>

              {!isPlayingIntro && (
                <button
                  type="button"
                  onClick={handlePlayIntro}
                  className="px-2.5 py-1 rounded-full bg-blue-600/90 hover:bg-blue-600 text-white font-bold text-[10px] flex items-center gap-1 backdrop-blur-md transition shadow-xs hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <WebIcon name="play" className="w-3 h-3 fill-current ml-0.5" />
                  <span>{isVi ? 'Xem Giới Thiệu' : 'Watch Intro'}</span>
                </button>
              )}
            </div>

            {/* Video Story Overlay when playing intro */}
            {isPlayingIntro && (
              <div className="absolute inset-0 z-30 flex flex-col justify-between p-3 bg-black/50 backdrop-blur-xs text-white">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase text-cyan-300 font-bold">
                    {formatVideoTime(videoCurrentTime)} / {formatVideoTime(videoDuration)}
                  </span>
                  <button
                    type="button"
                    onClick={handleCancelIntro}
                    className="p-1 rounded-full bg-white/20 hover:bg-white/30 text-white cursor-pointer"
                  >
                    <WebIcon name="x" className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="space-y-1.5 bg-black/75 p-2 rounded-xl border border-white/20 backdrop-blur-md">
                  <input
                    type="range"
                    min="0"
                    max={videoDuration || 210}
                    step="0.1"
                    value={videoCurrentTime}
                    onChange={(e) => handleSeek(parseFloat(e.target.value))}
                    className="w-full h-1 bg-white/30 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                  />
                  <div className="flex items-center justify-between text-xs">
                    <button
                      type="button"
                      onClick={togglePlayPause}
                      className="px-2 py-0.5 rounded bg-cyan-500 text-white font-bold text-[10px] flex items-center gap-1 cursor-pointer"
                    >
                      <WebIcon name={isVideoPaused ? 'play' : 'pause'} className="w-3 h-3" />
                      <span>{isVideoPaused ? 'Tiếp' : 'Dừng'}</span>
                    </button>
                    <button
                      type="button"
                      onClick={toggleVideoMute}
                      className="px-2 py-0.5 rounded bg-white/20 text-white font-bold text-[10px] flex items-center gap-1 cursor-pointer"
                    >
                      <WebIcon name="headset" className="w-3 h-3" />
                      <span>{isVideoMuted ? 'Bật tiếng' : 'Tắt tiếng'}</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* 4 Floating Glass Stat Badges (Bento Micro Capsules) */}
            {!isPlayingIntro && (
              <div className="relative z-20 grid grid-cols-2 gap-1.5 p-2.5">
                {ABOUT_PROFILE_STATS.map((stat: AboutProfileStat) => (
                  <div
                    key={stat.id}
                    className="bg-slate-900/85 hover:bg-slate-900/95 border border-white/20 p-1.5 px-2 rounded-xl backdrop-blur-md flex items-center gap-1.5 shadow-sm transition-transform hover:scale-[1.03]"
                  >
                    <div 
                      className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0 shadow-inner"
                      style={{ backgroundColor: `${stat.color}25`, color: stat.color }}
                    >
                      <WebIcon name={stat.iconName.toLowerCase()} className="w-3.5 h-3.5" />
                    </div>
                    <div className="flex flex-col min-w-0 text-left">
                      <span className="text-[8px] font-bold text-slate-300 truncate leading-none uppercase">
                        {isVi ? stat.labelVi : stat.labelEn}
                      </span>
                      <div className="flex items-baseline gap-0.5 mt-0.5">
                        <span className="text-xs font-black tracking-tight leading-none" style={{ color: stat.color }}>
                          {stat.metric}
                        </span>
                        <span className="text-[8px] font-bold" style={{ color: stat.color }}>
                          {isVi ? stat.unitVi : stat.unitEn}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ======================================================================= */}
          {/* BENTO RIGHT AREA (7.5 COLS): NHÂN KHẨU HỌC, TRỤ CỘT & TRIẾT LÝ           */}
          {/* ======================================================================= */}
          <div className="lg:col-span-7 xl:col-span-8 flex flex-col justify-between gap-2 sm:gap-2.5 h-full min-h-0">
            
            {/* TILE 2.1: THÔNG TIN CÁ NHÂN (GRID 4x2 COMPACT CAPSULES) */}
            <div className="p-2.5 sm:p-3 rounded-2xl bg-white/80 dark:bg-[#121218]/85 border border-white/80 dark:border-white/10 backdrop-blur-xl shadow-xs flex flex-col justify-between gap-1.5 shrink-0">
              <div className="flex items-center justify-between pb-1 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-1.5">
                  <WebIcon name="user" className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-400" />
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-800 dark:text-white">
                    {isVi ? 'Thông tin cá nhân & Nhân khẩu học' : 'Personal Profile & Demographics'}
                  </span>
                </div>
                <span className="text-[9.5px] font-mono text-slate-400 dark:text-slate-500">22/06/1984 • 40 Tuổi</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                {/* 1. Giới tính */}
                <div className="p-1.5 px-2 rounded-lg bg-blue-50/70 dark:bg-slate-800/60 border border-blue-100 dark:border-slate-700/60 flex items-center gap-1.5">
                  <div className="w-5 h-5 rounded-md bg-blue-500/15 text-blue-600 dark:text-cyan-400 flex items-center justify-center shrink-0">
                    <WebIcon name="user" className="w-3 h-3" />
                  </div>
                  <div className="min-w-0 text-left">
                    <span className="text-[8px] font-bold text-slate-400 block leading-none">{isVi ? 'Giới tính' : 'Gender'}</span>
                    <span className="text-[10.5px] font-black text-slate-800 dark:text-white truncate block">{isVi ? 'Nam giới' : 'Male'}</span>
                  </div>
                </div>

                {/* 2. Dân tộc */}
                <div className="p-1.5 px-2 rounded-lg bg-purple-50/70 dark:bg-slate-800/60 border border-purple-100 dark:border-slate-700/60 flex items-center gap-1.5">
                  <div className="w-5 h-5 rounded-md bg-purple-500/15 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
                    <WebIcon name="users" className="w-3 h-3" />
                  </div>
                  <div className="min-w-0 text-left">
                    <span className="text-[8px] font-bold text-slate-400 block leading-none">{isVi ? 'Dân tộc' : 'Ethnicity'}</span>
                    <span className="text-[10.5px] font-black text-slate-800 dark:text-white truncate block">{isVi ? 'Kinh' : 'Vietnamese'}</span>
                  </div>
                </div>

                {/* 3. Tình trạng */}
                <div className="p-1.5 px-2 rounded-lg bg-rose-50/70 dark:bg-slate-800/60 border border-rose-100 dark:border-slate-700/60 flex items-center gap-1.5">
                  <div className="w-5 h-5 rounded-md bg-rose-500/15 text-rose-500 flex items-center justify-center shrink-0">
                    <WebIcon name="heart" className="w-3 h-3" />
                  </div>
                  <div className="min-w-0 text-left">
                    <span className="text-[8px] font-bold text-slate-400 block leading-none">{isVi ? 'Tình trạng' : 'Marital'}</span>
                    <span className="text-[10.5px] font-black text-rose-600 dark:text-rose-400 truncate block">{isVi ? 'Độc thân' : 'Single'}</span>
                  </div>
                </div>

                {/* 4. Sinh nhật */}
                <div className="p-1.5 px-2 rounded-lg bg-amber-50/70 dark:bg-slate-800/60 border border-amber-100 dark:border-slate-700/60 flex items-center gap-1.5">
                  <div className="w-5 h-5 rounded-md bg-amber-500/15 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                    <WebIcon name="calendar" className="w-3 h-3" />
                  </div>
                  <div className="min-w-0 text-left">
                    <span className="text-[8px] font-bold text-slate-400 block leading-none">{isVi ? 'Sinh nhật' : 'Birthday'}</span>
                    <span className="text-[10.5px] font-black text-slate-800 dark:text-white truncate block">22/06/1984</span>
                  </div>
                </div>

                {/* 5. Tạm trú (Map trigger) */}
                <div 
                  onClick={() => setSelectedMapLocation({
                    isOpen: true,
                    type: 'tam_tru',
                    title: isVi ? 'Địa Chỉ Tạm Trú' : 'Current Residence',
                    address: 'Quận 7, TP. Hồ Chí Minh',
                    query: 'Quận 7, Thành phố Hồ Chí Minh, Việt Nam'
                  })}
                  className="p-1.5 px-2 rounded-lg bg-violet-50/70 dark:bg-slate-800/60 border border-violet-200/70 dark:border-slate-700/60 hover:border-violet-400 transition flex items-center justify-between cursor-pointer group shadow-2xs"
                  title="Mở Google Maps"
                >
                  <div className="flex items-center gap-1.5 min-w-0">
                    <div className="w-5 h-5 rounded-md bg-violet-500/15 text-violet-600 dark:text-violet-400 flex items-center justify-center shrink-0">
                      <WebIcon name="location" className="w-3 h-3" />
                    </div>
                    <div className="min-w-0 text-left">
                      <span className="text-[8px] font-bold text-violet-600 dark:text-violet-400 block leading-none flex items-center gap-0.5">
                        <span>{isVi ? 'Tạm trú' : 'Current'}</span>
                        <span className="text-[7.5px] text-violet-500 font-mono">📍</span>
                      </span>
                      <span className="text-[10px] font-black text-slate-800 dark:text-white truncate block">Q7, TP.HCM</span>
                    </div>
                  </div>
                  <WebIcon name="chevronright" className="w-3 h-3 text-violet-400 group-hover:translate-x-0.5 transition-transform shrink-0" />
                </div>

                {/* 6. Cư trú (Map trigger) */}
                <div 
                  onClick={() => setSelectedMapLocation({
                    isOpen: true,
                    type: 'cu_tru',
                    title: isVi ? 'Địa Chỉ Cư Trú Thường Trú' : 'Permanent Residence',
                    address: 'TP. Mỹ Tho, Tiền Giang',
                    query: 'Mỹ Tho, Tiền Giang, Việt Nam'
                  })}
                  className="p-1.5 px-2 rounded-lg bg-emerald-50/70 dark:bg-slate-800/60 border border-emerald-200/70 dark:border-slate-700/60 hover:border-emerald-400 transition flex items-center justify-between cursor-pointer group shadow-2xs"
                  title="Mở Google Maps"
                >
                  <div className="flex items-center gap-1.5 min-w-0">
                    <div className="w-5 h-5 rounded-md bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                      <WebIcon name="home" className="w-3 h-3" />
                    </div>
                    <div className="min-w-0 text-left">
                      <span className="text-[8px] font-bold text-emerald-600 dark:text-emerald-400 block leading-none flex items-center gap-0.5">
                        <span>{isVi ? 'Cư trú' : 'Permanent'}</span>
                        <span className="text-[7.5px] text-emerald-500 font-mono">📍</span>
                      </span>
                      <span className="text-[10px] font-black text-slate-800 dark:text-white truncate block">Mỹ Tho, TG</span>
                    </div>
                  </div>
                  <WebIcon name="chevronright" className="w-3 h-3 text-emerald-400 group-hover:translate-x-0.5 transition-transform shrink-0" />
                </div>

                {/* 7. Email Direct Link (2 cols span) */}
                <a 
                  href="mailto:hungthai848@gmail.com"
                  className="col-span-2 p-1.5 px-2 rounded-lg bg-sky-50/70 dark:bg-slate-800/60 border border-sky-200/70 dark:border-slate-700/60 hover:border-sky-400 transition flex items-center justify-between group shadow-2xs"
                >
                  <div className="flex items-center gap-1.5 min-w-0">
                    <div className="w-5 h-5 rounded-md bg-sky-500/15 text-sky-600 dark:text-sky-400 flex items-center justify-center shrink-0">
                      <WebIcon name="mail" className="w-3 h-3" />
                    </div>
                    <div className="min-w-0 text-left">
                      <span className="text-[8px] font-bold text-sky-600 dark:text-sky-400 block leading-none">EMAIL DIRECT</span>
                      <span className="text-[10.5px] font-black text-sky-700 dark:text-cyan-300 truncate block">hungthai848@gmail.com</span>
                    </div>
                  </div>
                  <WebIcon name="arrowright" className="w-3 h-3 text-sky-400 group-hover:translate-x-0.5 transition-transform shrink-0" />
                </a>
              </div>
            </div>

            {/* TILE 2.2: BA TRỤ CỘT VẬN HÀNH CHIẾN LƯỢC (3 BENTO PILLARS) */}
            <div className="flex-1 min-h-0 flex flex-col justify-between gap-1">
              <div className="flex items-center gap-1.5 px-1 shrink-0">
                <WebIcon name="target" className="w-3 h-3 text-indigo-600 dark:text-indigo-400" />
                <h4 className="text-[10.5px] sm:text-[11px] font-black uppercase tracking-wider text-slate-800 dark:text-white">
                  {isVi ? 'Ba Trụ Cột Vận Hành Chiến Lược' : 'Three Strategic Operational Pillars'}
                </h4>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 flex-1 min-h-0">
                {/* Trụ Cột 1: Hiệu Quả */}
                <div className="rounded-xl p-2.5 bg-gradient-to-b from-[#1E82FF] to-[#125CE6] text-white shadow-xs flex flex-col justify-between text-left group hover:scale-[1.02] transition-transform">
                  <div className="flex items-center justify-between">
                    <div className="w-6 h-6 rounded-lg bg-white/15 backdrop-blur-md flex items-center justify-center shadow-2xs">
                      <WebIcon name="messagesquare" className="w-3.5 h-3.5 text-white" />
                    </div>
                    <span className="text-[8.5px] font-extrabold uppercase tracking-wide text-blue-100">01</span>
                  </div>
                  <div className="my-1">
                    <h5 className="text-[11px] sm:text-xs font-black uppercase tracking-wide font-play leading-tight">
                      {isVi ? 'HIỆU QUẢ' : 'EFFICIENCY'}
                    </h5>
                    <span className="text-[9px] font-bold text-blue-100 block">{isVi ? 'Tối ưu & Kết quả' : 'Optimal Results'}</span>
                    <p className="text-[9.5px] sm:text-[10px] text-white/90 leading-snug mt-1 font-medium line-clamp-2">
                      {isVi ? 'Tối ưu hiệu suất, tạo kết quả đo lường được.' : 'Optimizing performance, delivering measurable outcomes.'}
                    </p>
                  </div>
                  <div className="w-5 h-5 rounded-md bg-white/15 flex items-center justify-center self-end">
                    <WebIcon name="chart" className="w-3 h-3 text-white" />
                  </div>
                </div>

                {/* Trụ Cột 2: Nhân Văn */}
                <div className="rounded-xl p-2.5 bg-gradient-to-b from-[#FF568A] to-[#A838F5] text-white shadow-xs flex flex-col justify-between text-left group hover:scale-[1.02] transition-transform">
                  <div className="flex items-center justify-between">
                    <div className="w-6 h-6 rounded-lg bg-white/15 backdrop-blur-md flex items-center justify-center shadow-2xs">
                      <WebIcon name="heart" className="w-3.5 h-3.5 text-white" />
                    </div>
                    <span className="text-[8.5px] font-extrabold uppercase tracking-wide text-rose-100">02</span>
                  </div>
                  <div className="my-1">
                    <h5 className="text-[11px] sm:text-xs font-black uppercase tracking-wide font-play leading-tight">
                      {isVi ? 'NHÂN VĂN' : 'HUMANITY'}
                    </h5>
                    <span className="text-[9px] font-bold text-pink-100 block">{isVi ? 'Đồng cảm & Thấu hiểu' : 'Empathy & Care'}</span>
                    <p className="text-[9.5px] sm:text-[10px] text-white/90 leading-snug mt-1 font-medium line-clamp-2">
                      {isVi ? 'Lắng nghe, thấu hiểu và đặt con người làm trung tâm.' : 'Listening, empathizing and placing humans at center.'}
                    </p>
                  </div>
                  <div className="w-5 h-5 rounded-md bg-white/15 flex items-center justify-center self-end">
                    <WebIcon name="users" className="w-3 h-3 text-white" />
                  </div>
                </div>

                {/* Trụ Cột 3: Bền Vững */}
                <div className="rounded-xl p-2.5 bg-gradient-to-b from-[#0FC271] to-[#109B53] text-white shadow-xs flex flex-col justify-between text-left group hover:scale-[1.02] transition-transform">
                  <div className="flex items-center justify-between">
                    <div className="w-6 h-6 rounded-lg bg-white/15 backdrop-blur-md flex items-center justify-center shadow-2xs">
                      <WebIcon name="trend-up" className="w-3.5 h-3.5 text-white" />
                    </div>
                    <span className="text-[8.5px] font-extrabold uppercase tracking-wide text-emerald-100">03</span>
                  </div>
                  <div className="my-1">
                    <h5 className="text-[11px] sm:text-xs font-black uppercase tracking-wide font-play leading-tight">
                      {isVi ? 'BỀN VỮNG' : 'SUSTAINABLE'}
                    </h5>
                    <span className="text-[9px] font-bold text-emerald-100 block">{isVi ? 'Giá trị & Tin cậy' : 'Value & Trust'}</span>
                    <p className="text-[9.5px] sm:text-[10px] text-white/90 leading-snug mt-1 font-medium line-clamp-2">
                      {isVi ? 'Xây dựng niềm tin và giá trị bền vững.' : 'Building enduring trust and long-term lifetime value.'}
                    </p>
                  </div>
                  <div className="w-5 h-5 rounded-md bg-white/15 flex items-center justify-center self-end">
                    <WebIcon name="globe" className="w-3 h-3 text-white" />
                  </div>
                </div>
              </div>
            </div>

            {/* TILE 2.3: GIÁ TRỊ CỐT LÕI & TRIẾT LÝ VẬN HÀNH (2 CARDS 50/50) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 items-stretch shrink-0">
              {/* Card 1: Giá trị cốt lõi */}
              <div className="p-2 sm:p-2.5 rounded-xl bg-[#FFF9F2] dark:bg-[#201712] border border-orange-200/80 dark:border-orange-950/40 flex flex-col justify-between text-left shadow-2xs">
                <div>
                  <div className="flex items-center gap-1.5 mb-1">
                    <WebIcon name="sparkles" className="w-3.5 h-3.5 text-orange-500" />
                    <h5 className="text-[10.5px] font-black text-orange-950 dark:text-orange-200 uppercase font-play">
                      {isVi ? 'Giá trị cốt lõi' : 'Core Values'}
                    </h5>
                  </div>
                  <p className="text-[10px] text-slate-700 dark:text-slate-300 font-medium leading-snug">
                    {isVi ? (
                      <>
                        Sự hài lòng đến từ{' '}
                        <strong className="text-[#D95F1A] dark:text-orange-400 font-bold">
                          sự tận tâm kịp thời
                        </strong>{' '}
                        và{' '}
                        <strong className="text-[#D95F1A] dark:text-orange-400 font-bold">
                          đồng cảm chân thành
                        </strong>.
                      </>
                    ) : (
                      <>
                        Satisfaction comes from{' '}
                        <strong className="text-[#D95F1A] dark:text-orange-400 font-bold">
                          timely dedication
                        </strong>{' '}
                        and{' '}
                        <strong className="text-[#D95F1A] dark:text-orange-400 font-bold">
                          sincere empathy
                        </strong>.
                      </>
                    )}
                  </p>
                </div>
                <span className="font-handwriting text-amber-700 dark:text-amber-400 text-xs sm:text-[13px] font-bold self-end mt-0.5">
                  Khách hàng là trọng tâm ♡
                </span>
              </div>

              {/* Card 2: Triết lý và tầm nhìn */}
              <div className="p-2 sm:p-2.5 rounded-xl bg-[#F2F7FF] dark:bg-[#121B2D] border border-blue-200/80 dark:border-blue-950/40 flex flex-col justify-between text-left shadow-2xs">
                <div>
                  <div className="flex items-center gap-1.5 mb-1">
                    <WebIcon name="users" className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-400" />
                    <h5 className="text-[10.5px] font-black text-blue-950 dark:text-cyan-200 uppercase font-play">
                      {isVi ? 'Triết lý & Tầm nhìn' : 'Philosophy & Vision'}
                    </h5>
                  </div>
                  <h6 className="text-[10px] font-black italic text-blue-700 dark:text-cyan-300 leading-tight mb-0.5">
                    “Tận Tâm & Đồng Hành Cùng Trải Nghiệm Khách Hàng”
                  </h6>
                  <p className="text-[9.5px] text-slate-600 dark:text-slate-300 font-medium leading-snug line-clamp-2">
                    {isVi 
                      ? 'Dịch vụ chất lượng cao, chi phí hợp lý để mỗi khách hàng cảm nhận được họ luôn được lắng nghe.'
                      : 'Delivering exceptional services so every customer feels genuinely heard and valued.'}
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* ========================================================================= */}
        {/* 3. BOTTOM BENTO STRIP: BANNER HỢP TÁC & CTA ACTION (SHRINK-0)              */}
        {/* ========================================================================= */}
        <div className="w-full px-3 py-2 rounded-xl bg-gradient-to-r from-blue-50/90 via-indigo-50/90 to-purple-50/90 dark:from-slate-900/90 dark:via-slate-800/90 dark:to-slate-900/90 border border-blue-200/70 dark:border-white/10 shadow-xs flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-xs">
              <WebIcon name="send" className="w-3.5 h-3.5" />
            </div>
            <div className="min-w-0 text-left">
              <div className="flex items-center gap-1.5">
                <span className="text-[8.5px] font-extrabold uppercase tracking-wide text-blue-600 dark:text-cyan-400 bg-blue-100/70 dark:bg-blue-950/60 px-1.5 py-0.2 rounded font-mono">
                  {isVi ? 'Hợp tác' : 'Partnership'}
                </span>
                <h4 className="text-xs sm:text-[13px] font-black text-slate-900 dark:text-white truncate font-play">
                  {isVi ? 'Cùng tạo ra trải nghiệm khách hàng vượt trội & bền vững' : "Let's architect exceptional customer experiences"}
                </h4>
              </div>
              <p className="text-[9.5px] sm:text-[10px] text-slate-500 dark:text-slate-400 truncate hidden sm:block">
                {isVi ? 'Sẵn sàng đồng hành cùng doanh nghiệp tối ưu hóa hệ thống CX, Contact Center và AI.' : 'Ready to partner with enterprises to optimize CX, Contact Center & AI systems.'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => handleNavigate('contact')}
            className="px-3 py-1.5 rounded-full bg-gradient-to-r from-orange-500 via-rose-500 to-amber-500 hover:brightness-105 active:scale-95 text-white font-extrabold text-[11px] flex items-center gap-1.5 transition shadow-xs cursor-pointer shrink-0"
          >
            <span>{isVi ? 'Kết nối với tôi' : 'Connect with me'}</span>
            <WebIcon name="chevronright" className="w-3 h-3 stroke-[3]" />
          </button>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* GOOGLE MAPS LOCATION POPUP MODAL                                          */}
      {/* ========================================================================= */}
      {selectedMapLocation && selectedMapLocation.isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-5">
          {/* Backdrop */}
          <div 
            onClick={() => setSelectedMapLocation(null)}
            className="absolute inset-0 bg-slate-950/75 backdrop-blur-md"
          />

          {/* Modal Card */}
          <div 
            className="relative w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/15 p-4 sm:p-5 rounded-2xl shadow-2xl z-10 flex flex-col gap-3 text-slate-800 dark:text-slate-100 font-play overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-2 border-b border-slate-200/80 dark:border-white/10">
              <div className="flex items-center gap-2.5">
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-white font-bold shadow-md ${
                  selectedMapLocation.type === 'cu_tru' ? 'bg-emerald-600 shadow-emerald-500/30' : 'bg-purple-600 shadow-purple-500/30'
                }`}>
                  <WebIcon name={selectedMapLocation.type === 'cu_tru' ? 'home' : 'location'} className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-black text-slate-900 dark:text-white leading-tight font-play">
                    {selectedMapLocation.title}
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                    {selectedMapLocation.address}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedMapLocation(null)}
                className="w-7 h-7 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center justify-center text-slate-500 dark:text-slate-300 transition-colors cursor-pointer"
              >
                <WebIcon name="x" className="w-4 h-4" />
              </button>
            </div>

            {/* Interactive Google Maps Iframe Embed */}
            <div className="relative w-full h-[280px] sm:h-[340px] rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-inner bg-slate-100 dark:bg-slate-950">
              <iframe
                title={selectedMapLocation.title}
                src={`https://maps.google.com/maps?q=${encodeURIComponent(selectedMapLocation.query)}&t=&z=16&ie=UTF8&iwloc=&output=embed`}
                className="w-full h-full border-0"
                loading="lazy"
                allowFullScreen
              />
            </div>

            {/* Footer Actions */}
            <div className="flex items-center justify-between gap-3 pt-1">
              <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 truncate flex items-center gap-1.5">
                <WebIcon name="location" className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                <span className="truncate">{selectedMapLocation.address}</span>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(selectedMapLocation.query)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all shadow-md flex items-center gap-1"
                >
                  <WebIcon name="navigation" className="w-3.5 h-3.5" />
                  <span>{isVi ? 'Mở Google Maps' : 'Open in Google Maps'}</span>
                </a>
                <button
                  type="button"
                  onClick={() => setSelectedMapLocation(null)}
                  className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold transition-all cursor-pointer"
                >
                  {isVi ? 'Đóng' : 'Close'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default AboutView;
