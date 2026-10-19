'use client';

import React, { useState, useRef, useCallback } from 'react';
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
      className="relative w-full h-full flex flex-col justify-start items-stretch p-2.5 sm:p-[15px] font-sans text-slate-800 dark:text-slate-100 transition-all duration-300 bg-transparent overflow-y-auto no-scrollbar"
    >
      <div className="w-full flex-grow flex flex-col gap-3.5 sm:gap-[15px] max-w-7xl mx-auto justify-start">
        
        {/* ========================================================================= */}
        {/* 1. HERO PROFILE VIDEO & PERSONAL INFORMATION ROW CARD BOX                  */}
        {/* ========================================================================= */}
        <div 
          className="w-full p-3 sm:p-[15px] flex flex-col gap-3 rounded-2xl md:rounded-[20px] bg-white/80 dark:bg-[#121218]/85 border border-white/80 dark:border-white/10 backdrop-blur-[20px] shadow-[0_8px_32px_0_rgba(31,38,135,0.08)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.5)]"
        >
          {/* Card Header matching style */}
          <div className="flex items-center justify-between gap-3 pb-2.5 border-b border-slate-200/80 dark:border-white/10 shrink-0">
            <div className="flex items-center gap-2.5 sm:gap-3">
              <div className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-xl bg-blue-500/10 text-blue-600 dark:text-cyan-400 shrink-0">
                <WebIcon name="user" className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
              </div>
              <h2 className="text-base sm:text-lg lg:text-xl font-bold font-play bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 dark:from-blue-400 dark:via-indigo-300 dark:to-cyan-300">
                {isVi ? 'Hồ sơ chuyên gia & Thông tin cá nhân' : 'Executive Profile & Personal Info'}
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-[15px] items-stretch w-full flex-grow">
            
            {/* Left Column: Video Card (7 columns out of 12) */}
            <div 
              className="lg:col-span-7 relative overflow-hidden rounded-xl md:rounded-2xl border border-white/60 dark:border-white/15 bg-slate-950/90 backdrop-blur-2xl shadow-[0_16px_40px_rgba(0,0,0,0.15)] min-h-[340px] sm:min-h-[440px] lg:min-h-[480px] flex items-center justify-center group"
            >
              {/* Portrait Video */}
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
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />

              {/* Dynamic Video Story Overlay when intro video is active */}
              {isPlayingIntro && (
                <div className="absolute inset-0 z-30 flex flex-col justify-between p-3.5 sm:p-5 bg-black/40 backdrop-blur-xs text-white">
                  {/* Top Header Row of Video Story */}
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse" />
                      <span className="text-xs font-black uppercase tracking-wider text-rose-300 font-mono">
                        {isVi ? 'Đang phát Giới Thiệu Chân Dung' : 'Playing Executive Introduction'}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={handleCancelIntro}
                      className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md flex items-center justify-center text-white transition active:scale-95 cursor-pointer"
                      title={isVi ? 'Đóng video' : 'Close intro video'}
                    >
                      <WebIcon name="x" className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Bottom Controls of Video Story */}
                  <div className="space-y-2 bg-slate-950/70 p-3 rounded-2xl border border-white/15 backdrop-blur-md">
                    {/* Progress Bar & Seek */}
                    <div className="flex items-center gap-2 text-xs font-mono">
                      <span>{formatVideoTime(videoCurrentTime)}</span>
                      <input
                        type="range"
                        min="0"
                        max={videoDuration || 210}
                        step="0.1"
                        value={videoCurrentTime}
                        onChange={(e) => handleSeek(parseFloat(e.target.value))}
                        className="flex-1 h-1.5 bg-white/30 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                      />
                      <span>{formatVideoTime(videoDuration)}</span>
                    </div>

                    {/* Button Row */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={togglePlayPause}
                          className="px-3 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-600 text-white font-bold text-xs flex items-center gap-1.5 transition active:scale-95 cursor-pointer"
                        >
                          <WebIcon name={isVideoPaused ? 'play' : 'pause'} className="w-3.5 h-3.5" />
                          <span>{isVideoPaused ? (isVi ? 'Phát tiếp' : 'Resume') : (isVi ? 'Tạm dừng' : 'Pause')}</span>
                        </button>

                        <button
                          type="button"
                          onClick={toggleVideoMute}
                          className="px-3 py-1.5 rounded-xl bg-white/15 hover:bg-white/25 text-white font-bold text-xs flex items-center gap-1.5 transition active:scale-95 cursor-pointer"
                        >
                          <WebIcon name="headset" className="w-3.5 h-3.5" />
                          <span>{isVideoMuted ? (isVi ? 'Bật tiếng' : 'Unmute') : (isVi ? 'Tắt tiếng' : 'Mute')}</span>
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={handleCancelIntro}
                        className="px-3 py-1.5 rounded-xl bg-rose-500/80 hover:bg-rose-600 text-white font-bold text-xs flex items-center gap-1 transition active:scale-95 cursor-pointer"
                      >
                        <WebIcon name="x" className="w-3.5 h-3.5" />
                        <span>{isVi ? 'Dừng & Thu nhỏ' : 'Stop Intro'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Floating Stat Badges around video */}
              {!isPlayingIntro && (
                <>
                  {ABOUT_PROFILE_STATS.map((stat: AboutProfileStat) => (
                    <div
                      key={stat.id}
                      className={`absolute z-20 pointer-events-auto bg-white/95 dark:bg-slate-900/90 backdrop-blur-md border border-white/80 dark:border-white/20 p-2 sm:p-2.5 rounded-2xl shadow-lg hover:scale-105 transition-all duration-300 flex items-center gap-2 sm:gap-2.5 max-w-[145px] sm:max-w-[190px] ${stat.positionClass}`}
                    >
                      <div 
                        className="w-7 h-7 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center shrink-0 shadow-inner"
                        style={{ backgroundColor: `${stat.color}18`, color: stat.color }}
                      >
                        <WebIcon name={stat.iconName.toLowerCase()} className="w-4 h-4 sm:w-5 sm:h-5" />
                      </div>
                      <div className="flex flex-col min-w-0 text-left">
                        <span className="text-[8.5px] sm:text-[9.5px] font-extrabold text-slate-500 dark:text-slate-400 truncate leading-none uppercase">
                          {isVi ? stat.labelVi : stat.labelEn}
                        </span>
                        <div className="flex items-baseline gap-1 mt-0.5 sm:mt-1">
                          <span className="text-sm sm:text-base font-black tracking-tight leading-none" style={{ color: stat.color }}>
                            {stat.metric}
                          </span>
                          <span className="text-[8.5px] sm:text-[9.5px] font-bold tracking-wider" style={{ color: stat.color }}>
                            {isVi ? stat.unitVi : stat.unitEn}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Bottom Left Video Intro Trigger Button */}
                  <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 z-20 pointer-events-auto">
                    <button
                      type="button"
                      onClick={handlePlayIntro}
                      className="inline-flex items-center gap-2 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-black text-xs sm:text-sm shadow-[0_8px_30px_rgba(78,86,246,0.5)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
                    >
                      <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                        <WebIcon name="play" className="w-3.5 h-3.5 fill-current ml-0.5" />
                      </span>
                      <span>{isVi ? 'Xem Giới Thiệu Chân Dung' : 'Watch Portrait Video'}</span>
                    </button>
                  </div>
                </>
              )}
            </div>

            {/* Right Column: Contact & Demographics Card (5 columns out of 12) */}
            <div 
              className="lg:col-span-5 h-full p-3.5 sm:p-4 rounded-xl md:rounded-2xl transition-all duration-300 flex flex-col justify-start gap-3 min-w-0 border border-slate-100 dark:border-white/10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl text-left"
            >
              {/* Header with Title & Floating User Icon */}
              <div className="w-full flex items-center justify-between gap-3 pb-2 border-b border-slate-200/80 dark:border-white/10 shrink-0">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-xl bg-blue-500/10 text-blue-600 dark:text-cyan-400 flex items-center justify-center">
                    <WebIcon name="user" className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white tracking-tight font-play">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 dark:from-blue-400 dark:via-indigo-300 dark:to-cyan-300">
                      {isVi ? 'Thông tin cá nhân' : 'Personal Profile'}
                    </span>
                  </h3>
                </div>
              </div>

              {/* Sub card 2-column grid for demographic info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5 flex-1 min-h-0">
                {PERSONAL_DEMOGRAPHICS.map((item: PersonalInfoItem) => {
                  if (item.type === 'map') {
                    return (
                      <div 
                        key={item.id}
                        onClick={() => {
                          setSelectedMapLocation({
                            isOpen: true,
                            type: item.id === 'perm_address' ? 'cu_tru' : 'tam_tru',
                            title: item.mapTitle || (isVi ? item.labelVi : item.labelEn),
                            address: item.href || (isVi ? item.valueVi : item.valueEn),
                            query: item.mapQuery || (isVi ? item.valueVi : item.valueEn)
                          });
                        }}
                        className={`p-2 sm:p-2.5 rounded-xl border flex items-center justify-between transition-all min-w-0 group cursor-pointer shadow-2xs hover:scale-[1.02] ${item.colorTheme.bg} ${item.colorTheme.border}`}
                        title={isVi ? `Xem Google Maps: ${item.href}` : 'View in Google Maps'}
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg border flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform ${item.colorTheme.iconBg} ${item.colorTheme.iconColor}`}>
                            <WebIcon name={item.iconName.toLowerCase()} className="w-4 h-4" />
                          </div>
                          <div className="flex flex-col min-w-0">
                            <span className={`text-[9.5px] font-bold tracking-wider flex items-center gap-1 truncate ${item.colorTheme.labelColor}`}>
                              <span>{isVi ? item.labelVi : item.labelEn}</span>
                              <span className="text-[8px] px-1 py-0.2 rounded bg-purple-500/20 text-purple-700 dark:text-purple-300 font-mono">Map 📍</span>
                            </span>
                            <span className={`text-[11px] sm:text-xs font-black truncate ${item.colorTheme.valueColor}`}>
                              {isVi ? item.valueVi : item.valueEn}
                            </span>
                          </div>
                        </div>
                        <WebIcon name="chevronright" className={`w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform shrink-0 ml-1 ${item.colorTheme.arrowColor}`} />
                      </div>
                    );
                  }

                  if (item.type === 'email' || item.type === 'phone') {
                    return (
                      <a 
                        key={item.id}
                        href={item.href}
                        className={`col-span-1 sm:col-span-2 p-2 sm:p-2.5 rounded-xl border flex items-center justify-between transition-all min-w-0 group hover:shadow-xs hover:scale-[1.01] ${item.colorTheme.bg} ${item.colorTheme.border}`}
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg border flex items-center justify-center shrink-0 shadow-2xs ${item.colorTheme.iconBg} ${item.colorTheme.iconColor}`}>
                            <WebIcon name={item.iconName.toLowerCase()} className="w-4 h-4" />
                          </div>
                          <div className="flex flex-col min-w-0">
                            <span className={`text-[9.5px] font-bold tracking-wider truncate ${item.colorTheme.labelColor}`}>
                              {isVi ? item.labelVi : item.labelEn}
                            </span>
                            <span className={`text-[11px] sm:text-xs font-black truncate ${item.colorTheme.valueColor}`}>
                              {isVi ? item.valueVi : item.valueEn}
                            </span>
                          </div>
                        </div>
                        <WebIcon name="arrowright" className={`w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform shrink-0 ml-1 ${item.colorTheme.arrowColor}`} />
                      </a>
                    );
                  }

                  // Default text items
                  return (
                    <div 
                      key={item.id}
                      className={`p-2 sm:p-2.5 rounded-xl border flex items-center justify-between transition-all min-w-0 group ${item.colorTheme.bg} ${item.colorTheme.border}`}
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg border flex items-center justify-center shrink-0 shadow-2xs ${item.colorTheme.iconBg} ${item.colorTheme.iconColor}`}>
                          <WebIcon name={item.iconName.toLowerCase()} className="w-4 h-4" />
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className={`text-[9.5px] font-bold tracking-wider truncate ${item.colorTheme.labelColor}`}>
                            {isVi ? item.labelVi : item.labelEn}
                          </span>
                          <span className={`text-[11px] sm:text-xs font-black truncate ${item.colorTheme.valueColor}`}>
                            {isVi ? item.valueVi : item.valueEn}
                          </span>
                        </div>
                      </div>
                      <WebIcon name="chevronright" className={`w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform shrink-0 ml-1 ${item.colorTheme.arrowColor}`} />
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2. BA TRỤ CỘT VẬN HÀNH CHIẾN LƯỢC + GIÁ TRỊ CỐT LÕI & TRIẾT LÝ            */}
        {/* ========================================================================= */}
        <div className="w-full flex flex-col gap-3.5 sm:gap-[15px]">
          
          {/* Hàng Trên: Ba trụ cột vận hành Card Box */}
          <div 
            className="w-full p-3.5 sm:p-[15px] flex flex-col gap-3 rounded-2xl md:rounded-[20px] bg-white/80 dark:bg-[#121218]/85 border border-white/80 dark:border-white/10 backdrop-blur-[20px] shadow-[0_8px_32px_0_rgba(31,38,135,0.08)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] text-left"
          >
            {/* Header */}
            <div 
              onClick={() => handleNavigate('contact')}
              className="flex items-center justify-between gap-3 pb-2.5 border-b border-slate-200/80 dark:border-white/10 cursor-pointer hover:opacity-85 select-none transition-all active:scale-[0.99]"
              title={isVi ? 'Nhấp để chuyển sang trang Liên hệ' : 'Click to go to Contact page'}
            >
              <div className="flex items-center gap-2.5 sm:gap-3">
                <div className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                  <WebIcon name="target" className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
                </div>
                <h2 className="text-base sm:text-lg lg:text-xl font-bold font-play bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-500 dark:from-indigo-400 dark:via-violet-300 dark:to-indigo-200">
                  {isVi ? 'Ba trụ cột vận hành chiến lược' : 'Three strategic operational pillars'}
                </h2>
              </div>
              <WebIcon name="chevronright" className="w-4 h-4 text-indigo-500" />
            </div>

            {/* Grid 3 Pillars (Blue, Pink/Purple, Green) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
              
              {/* Trụ cột 1: Hiệu quả (Xanh biển) */}
              <div 
                className="bg-gradient-to-b from-[#1E82FF] to-[#125CE6] border border-blue-400/20 text-white p-4 sm:p-5 rounded-2xl flex flex-col items-center text-center justify-between min-h-[220px] shadow-sm relative overflow-hidden group hover:-translate-y-1 transition-all duration-300"
              >
                {/* Top Double Ring Icon */}
                <div className="w-11 h-11 rounded-full border border-white/20 bg-white/10 flex items-center justify-center relative shadow-xs">
                  <div className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center">
                    <WebIcon name="messagesquare" className="w-4 h-4 text-white" />
                  </div>
                </div>

                {/* Text Content */}
                <div className="my-2.5 space-y-1 flex-1 flex flex-col justify-center">
                  <h5 className="text-xs sm:text-sm font-black tracking-wider uppercase font-play">
                    01. HIỆU QUẢ
                  </h5>
                  <p className="text-[10px] text-blue-100 font-extrabold uppercase tracking-wide">
                    {isVi ? 'Tối ưu & Kết quả' : 'Optimization & Results'}
                  </p>
                  <p className="text-[11px] sm:text-xs text-white/95 leading-relaxed font-semibold pt-1">
                    {isVi ? 'Tối ưu hiệu suất, tạo kết quả đo lường được.' : 'Optimizing performance, delivering measurable results.'}
                  </p>
                </div>

                {/* Bottom Double Ring Icon */}
                <div className="w-9 h-9 rounded-full border border-white/20 bg-white/10 flex items-center justify-center relative shadow-xs shrink-0">
                  <div className="w-7 h-7 rounded-full border border-white/15 flex items-center justify-center">
                    <WebIcon name="chart" className="w-3.5 h-3.5 text-white" />
                  </div>
                </div>
              </div>

              {/* Trụ cột 2: Nhân văn (Hồng tím) */}
              <div 
                className="bg-gradient-to-b from-[#FF568A] to-[#A838F5] border border-pink-400/20 text-white p-4 sm:p-5 rounded-2xl flex flex-col items-center text-center justify-between min-h-[220px] shadow-sm relative overflow-hidden group hover:-translate-y-1 transition-all duration-300"
              >
                {/* Top Double Ring Icon */}
                <div className="w-11 h-11 rounded-full border border-white/20 bg-white/10 flex items-center justify-center relative shadow-xs">
                  <div className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center">
                    <WebIcon name="heart" className="w-4 h-4 text-white" />
                  </div>
                </div>

                {/* Text Content */}
                <div className="my-2.5 space-y-1 flex-1 flex flex-col justify-center">
                  <h5 className="text-xs sm:text-sm font-black tracking-wider uppercase font-play">
                    02. NHÂN VĂN
                  </h5>
                  <p className="text-[10px] text-pink-100 font-extrabold uppercase tracking-wide">
                    {isVi ? 'Đồng cảm & Thấu hiểu' : 'Empathy & Understanding'}
                  </p>
                  <p className="text-[11px] sm:text-xs text-white/95 leading-relaxed font-semibold pt-1">
                    {isVi ? 'Lắng nghe, thấu hiểu và đặt con người làm trung tâm.' : 'Listening, empathizing, and placing humans at the center.'}
                  </p>
                </div>

                {/* Bottom Double Ring Icon */}
                <div className="w-9 h-9 rounded-full border border-white/20 bg-white/10 flex items-center justify-center relative shadow-xs shrink-0">
                  <div className="w-7 h-7 rounded-full border border-white/15 flex items-center justify-center">
                    <WebIcon name="users" className="w-3.5 h-3.5 text-white" />
                  </div>
                </div>
              </div>

              {/* Trụ cột 3: Bền vững (Xanh lá) */}
              <div 
                className="bg-gradient-to-b from-[#0FC271] to-[#109B53] border border-emerald-400/20 text-white p-4 sm:p-5 rounded-2xl flex flex-col items-center text-center justify-between min-h-[220px] shadow-sm relative overflow-hidden group hover:-translate-y-1 transition-all duration-300"
              >
                {/* Top Double Ring Icon */}
                <div className="w-11 h-11 rounded-full border border-white/20 bg-white/10 flex items-center justify-center relative shadow-xs">
                  <div className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center">
                    <WebIcon name="trend-up" className="w-4 h-4 text-white" />
                  </div>
                </div>

                {/* Text Content */}
                <div className="my-2.5 space-y-1 flex-1 flex flex-col justify-center">
                  <h5 className="text-xs sm:text-sm font-black tracking-wider uppercase font-play">
                    03. BỀN VỮNG
                  </h5>
                  <p className="text-[10px] text-emerald-100 font-extrabold uppercase tracking-wide">
                    {isVi ? 'Giá trị & Tin cậy' : 'Value & Trust'}
                  </p>
                  <p className="text-[11px] sm:text-xs text-white/95 leading-relaxed font-semibold pt-1">
                    {isVi ? 'Xây dựng niềm tin và giá trị bền vững.' : 'Building enduring trust and sustainable lifetime value.'}
                  </p>
                </div>

                {/* Bottom Double Ring Icon */}
                <div className="w-9 h-9 rounded-full border border-white/20 bg-white/10 flex items-center justify-center relative shadow-xs shrink-0">
                  <div className="w-7 h-7 rounded-full border border-white/15 flex items-center justify-center">
                    <WebIcon name="globe" className="w-3.5 h-3.5 text-white" />
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Hàng Dưới: Giá trị cốt lõi & Triết lý và tầm nhìn */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4">
            
            {/* Card Trái: Giá trị cốt lõi */}
            <div 
              className="p-4 sm:p-5 rounded-2xl flex flex-col justify-between relative overflow-hidden border text-left bg-[#FFF9F2] dark:bg-[#201712] border-orange-200/60 dark:border-orange-950/40 min-h-[180px]"
            >
              <div className="space-y-2.5 flex-grow mb-4">
                {/* Title Row */}
                <div className="flex items-center gap-2 pb-2 border-b border-orange-200/30 dark:border-orange-950/20">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center bg-orange-500/10 text-orange-500 shrink-0">
                    <WebIcon name="sparkles" className="w-3.5 h-3.5" />
                  </div>
                  <h5 className="text-xs sm:text-sm font-extrabold text-orange-950 dark:text-orange-200 font-play">
                    {isVi ? 'Giá trị cốt lõi' : 'Core values'}
                  </h5>
                </div>
                
                {/* Content Paragraph */}
                <p className="text-xs sm:text-[13px] text-slate-800 dark:text-slate-300 font-medium leading-relaxed">
                  {isVi ? (
                    <>
                      Tôi tin rằng sự hài lòng không đến từ sự hoàn hảo tuyệt đối, mà đến từ{' '}
                      <span className="font-extrabold text-[#D95F1A] dark:text-orange-400 underline decoration-orange-500/35 decoration-2 underline-offset-2">
                        sự tận tâm kịp thời
                      </span>{' '}
                      và{' '}
                      <span className="font-extrabold text-[#D95F1A] dark:text-orange-400 underline decoration-orange-500/35 decoration-2 underline-offset-2">
                        đồng cảm chân thành
                      </span>
                      .
                    </>
                  ) : (
                    <>
                      I believe satisfaction comes not from absolute perfection, but from{' '}
                      <span className="font-extrabold text-[#D95F1A] dark:text-orange-400 underline decoration-orange-500/35 decoration-2 underline-offset-2">
                        timely dedication
                      </span>{' '}
                      and{' '}
                      <span className="font-extrabold text-[#D95F1A] dark:text-orange-400 underline decoration-orange-500/35 decoration-2 underline-offset-2">
                        sincere empathy
                      </span>
                      .
                    </>
                  )}
                </p>
              </div>

              {/* Hand-written cursive signature at bottom right */}
              <div className="self-end mr-1">
                <span className="font-handwriting text-amber-700 dark:text-amber-400 text-base sm:text-lg select-none transform -rotate-1 block leading-none font-bold">
                  Khách hàng là trọng tâm ♡
                </span>
              </div>
            </div>

            {/* Card Phải: Triết lý và tầm nhìn */}
            <div 
              className="p-4 sm:p-5 rounded-2xl flex flex-col justify-between relative overflow-hidden border text-left bg-[#F2F7FF] dark:bg-[#121B2D] border-blue-200/60 dark:border-blue-950/40 min-h-[180px]"
            >
              <div className="space-y-2.5">
                {/* Title Row */}
                <div className="flex items-center gap-2 pb-2 border-b border-blue-200/30 dark:border-blue-950/20">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center bg-blue-600/10 text-blue-600 dark:bg-cyan-500/10 dark:text-cyan-400 shrink-0">
                    <WebIcon name="users" className="w-3.5 h-3.5" />
                  </div>
                  <h5 className="text-xs sm:text-sm font-extrabold text-blue-950 dark:text-cyan-200 font-play">
                    {isVi ? 'Triết lý và tầm nhìn' : 'Philosophy & vision'}
                  </h5>
                </div>
                
                {/* Centered Quotation Phrase */}
                <div className="relative text-center py-2 px-2 rounded-xl bg-blue-100/30 dark:bg-blue-900/20 border border-blue-200/30">
                  <h4 className="text-xs sm:text-[13px] font-black italic text-blue-700 dark:text-cyan-300 leading-snug tracking-wide">
                    “Tận Tâm & Đồng Hành Cùng Trải Nghiệm Khách Hàng”
                  </h4>
                </div>

                {/* Core Vision Description */}
                <p className="text-[11px] sm:text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                  {isVi 
                    ? 'Tôi luôn nỗ lực để mang lại sản phẩm, dịch vụ chất lượng cao với chi phí hợp lý. Và trên hết, để mỗi khách hàng cảm nhận được một điều đơn giản mà cốt lõi: Họ luôn được lắng nghe.'
                    : 'I always strive to deliver high-quality products and services at reasonable costs. And above all, so that every customer feels one simple yet core truth: They are always listened to.'}
                </p>
              </div>
            </div>

          </div>

        </div>

        {/* ========================================================================= */}
        {/* 3. BOTTOM CTA COLLABORATION BANNER                                         */}
        {/* ========================================================================= */}
        <div 
          className="w-full relative overflow-hidden p-3.5 sm:p-4 rounded-2xl md:rounded-[20px] flex flex-col lg:flex-row items-center justify-between gap-4 border border-white/80 dark:border-white/10 bg-white/80 dark:bg-[#121218]/85 backdrop-blur-[20px] shadow-[0_8px_32px_0_rgba(31,38,135,0.08)] text-left group"
        >
          {/* Ambient glow decoration */}
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-rose-500 rounded-3xl blur-xl opacity-10 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none" />
          
          {/* Left Portion: Icon + Badge + Title + Subtitle */}
          <div className="relative z-10 flex items-center gap-3.5 sm:gap-4 flex-1 min-w-0">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-blue-500/30 dark:border-cyan-400/30 bg-blue-500/10 dark:bg-cyan-500/20 backdrop-blur-md flex items-center justify-center text-blue-600 dark:text-cyan-300 shrink-0 shadow-[0_0_15px_rgba(37,99,235,0.15)] group-hover:scale-110 transition-transform duration-300">
              <WebIcon name="send" className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 dark:text-cyan-300" />
            </div>

            <div className="flex flex-col min-w-0 text-left">
              {/* Top Pill */}
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-500/10 dark:bg-cyan-500/20 border border-blue-500/20 dark:border-cyan-400/30 text-blue-700 dark:text-cyan-200 text-[9.5px] font-bold tracking-wider mb-1.5 self-start uppercase font-mono">
                <WebIcon name="sparkles" className="w-3 h-3 text-blue-600 dark:text-cyan-300" />
                <span>{isVi ? 'Hợp tác & Đồng hành' : 'Collaboration & Partnership'}</span>
              </div>

              {/* Title and subtitle */}
              <h3 className="text-sm sm:text-base md:text-lg font-black tracking-tight text-blue-950 dark:text-white leading-tight font-play">
                {isVi ? 'Cùng tạo ra trải nghiệm khách hàng tốt hơn' : "Let's shape better customer experiences"}
              </h3>
              <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-300 mt-1 max-w-2xl font-medium">
                {isVi 
                  ? 'Tôi luôn sẵn sàng kết nối để cùng doanh nghiệp xây dựng hệ thống Customer Experience hiệu quả, nhân văn và bền vững.'
                  : 'Always ready to partner with forward-thinking enterprises to architect sustainable, human-centric CX ecosystems.'}
              </p>
            </div>
          </div>

          {/* Right Portion: Connect button */}
          <div className="relative z-10 flex items-center shrink-0 lg:ml-auto">
            <button
              type="button"
              onClick={() => handleNavigate('contact')}
              className="px-5 py-2.5 sm:px-6 sm:py-3 rounded-full bg-gradient-to-r from-orange-500 via-rose-500 to-amber-500 hover:brightness-105 hover:shadow-[0_8px_30px_rgba(244,63,94,0.3)] transition-all flex items-center gap-3 active:scale-95 cursor-pointer text-left border border-white/20 shadow-md group/btn shrink-0"
            >
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0 shadow-inner">
                <WebIcon name="messagesquare" className="w-4 h-4 text-white" />
              </div>

              <div className="flex flex-col pr-1 min-w-0">
                <span className="text-xs sm:text-sm font-black text-white leading-none tracking-wide whitespace-nowrap uppercase font-play">
                  {isVi ? 'Kết nối với tôi' : 'Connect with me'}
                </span>
                <span className="text-[9px] sm:text-[10px] text-white/80 font-bold leading-none whitespace-nowrap mt-1">
                  {isVi ? 'Trao đổi, chia sẻ cơ hội hợp tác' : 'Explore partnership options'}
                </span>
              </div>

              <div className="w-6 h-6 rounded-full bg-white text-orange-600 flex items-center justify-center shrink-0 shadow-md group-hover/btn:translate-x-1 transition-transform">
                <WebIcon name="chevronright" className="w-3.5 h-3.5" />
              </div>
            </button>
          </div>
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
            className="relative w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/15 p-4 sm:p-6 rounded-2xl shadow-2xl z-10 flex flex-col gap-3.5 text-slate-800 dark:text-slate-100 font-play overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-200/80 dark:border-white/10">
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center text-white font-bold shadow-md ${
                  selectedMapLocation.type === 'cu_tru' ? 'bg-emerald-600 shadow-emerald-500/30' : 'bg-purple-600 shadow-purple-500/30'
                }`}>
                  <WebIcon name={selectedMapLocation.type === 'cu_tru' ? 'home' : 'location'} className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-black text-slate-900 dark:text-white leading-tight font-play">
                    {selectedMapLocation.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                    {selectedMapLocation.address}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedMapLocation(null)}
                className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center justify-center text-slate-500 dark:text-slate-300 transition-colors cursor-pointer"
              >
                <WebIcon name="x" className="w-4 h-4" />
              </button>
            </div>

            {/* Interactive Google Maps Iframe Embed */}
            <div className="relative w-full h-[280px] sm:h-[350px] rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-inner bg-slate-100 dark:bg-slate-950">
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
              <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 truncate flex items-center gap-1.5">
                <WebIcon name="location" className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                <span className="truncate">{selectedMapLocation.address}</span>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(selectedMapLocation.query)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all shadow-md flex items-center gap-1.5"
                >
                  <WebIcon name="navigation" className="w-3.5 h-3.5" />
                  <span>{isVi ? 'Mở Google Maps' : 'Open in Google Maps'}</span>
                </a>
                <button
                  type="button"
                  onClick={() => setSelectedMapLocation(null)}
                  className="px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold transition-all cursor-pointer"
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
