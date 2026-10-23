'use client';

import React, { useState, useRef, useCallback } from "react";
import { 
  User, 
  Heart, 
  Target, 
  TrendingUp, 
  Building2,
  Bot, 
  MapPin, 
  ChevronRight, 
  ArrowRight,
  Send, 
  BarChart3, 
  MessagesSquare, 
  Sparkles, 
  Mail, 
  Phone, 
  Globe, 
  ExternalLink, 
  X, 
  Navigation,
  Calendar,
  Home,
  Users
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { HeroIntroButton } from "@/components/ui/HeroIntroButton";
import { PageCardHeader } from "@/components/ui/PageCardHeader";
import { DynamicVideoStoryOverlay } from "@/components/ui/DynamicVideoStoryOverlay";
import { cn } from "@/lib/utils";
import { 
  ABOUT_PROFILE_STATS, 
  PERSONAL_DEMOGRAPHICS, 
  SERVICE_PHILOSOPHY_VALUES
} from "@/data/aboutData";

const ABOUT_IDLE_VIDEO_URL = "https://cdn.scena.ai/project/8606/e48a67884f3a52e8a68cf06b97979f3b22835ec92bf466a058c0d78da97c83b0.mp4";
const ABOUT_INTRO_VIDEO_URL = "https://cdn.scena.ai/project/8606/5f84521bf5c51ff234fb0f4029fb9fba29e7e386f13912a56bc7ee25aebcbc10.mp4";

const getLucideIcon = (name: string) => {
  switch (name) {
    case "BarChart3": return BarChart3;
    case "Building2": return Building2;
    case "Bot": return Bot;
    case "TrendingUp": return TrendingUp;
    case "User": return User;
    case "Users": return Users;
    case "Heart": return Heart;
    case "Calendar": return Calendar;
    case "MapPin": return MapPin;
    case "Home": return Home;
    case "Mail": return Mail;
    case "Phone": return Phone;
    case "Globe": return Globe;
    default: return User;
  }
};

export function AboutView() {
  const lang = "vi";
  const theme = "mritech-digital-growth";
  const isVi = true;

  const getGlassCardClass = useCallback(() => {
    return "bg-white/85 dark:bg-slate-900/85 border-white/90 dark:border-white/15 backdrop-blur-[20px] shadow-[0_10px_30px_0_rgba(100,110,140,0.08)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]";
  }, []);

  const [selectedMapLocation, setSelectedMapLocation] = useState<{
    isOpen: boolean;
    type: "tam_tru" | "cu_tru";
    title: string;
    address: string;
    query: string;
  } | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlayingIntro, setIsPlayingIntro] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(true);
  const [videoCurrentTime, setVideoCurrentTime] = useState(0);
  const [isVideoPaused, setIsVideoPaused] = useState(false);

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setVideoCurrentTime(videoRef.current.currentTime);
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
    window.dispatchEvent(new CustomEvent("app-navigate", { detail: sectionId }));
  };

  return (
    <section 
      id="about" 
      className="relative w-full h-full flex-1 flex flex-col justify-between items-stretch p-[12px] sm:p-[15px] font-sans text-slate-800 dark:text-slate-100 transition-all duration-300 bg-transparent overflow-y-auto no-scrollbar"
    >
      <div className="w-full h-full flex-1 flex flex-col gap-3.5 max-w-7xl mx-auto justify-between pb-4">
        {/* Header Card */}
        <PageCardHeader pageId="about" className="w-full shadow-sm" />

        {/* BENTO GRID LAYOUT - RESPONSIVE & SPACE OPTIMIZED */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 items-stretch w-full">
          
          {/* BENTO BOX 1: Portrait Video & Stats (5 cols) */}
          <div 
            style={{ borderRadius: "20px" }}
            className={cn(
              "lg:col-span-5 relative overflow-hidden border p-3.5 flex flex-col justify-between shadow-md min-h-[380px] sm:min-h-[440px] group",
              getGlassCardClass()
            )}
          >
            <div className="flex items-center justify-between gap-2 pb-2 border-b border-slate-200/80 dark:border-white/10 z-20">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-xl bg-blue-500/10 text-blue-600 dark:text-cyan-400 flex items-center justify-center">
                  <User className="w-4 h-4 stroke-[2.2]" />
                </div>
                <h3 className="text-xs sm:text-sm font-bold font-play text-slate-900 dark:text-white">
                  Chân dung & Dấu ấn
                </h3>
              </div>
              <span className="text-[10px] font-mono font-bold text-cyan-600 dark:text-cyan-400 px-2 py-0.5 rounded-full bg-cyan-50 dark:bg-cyan-950/60">
                22+ Năm KN
              </span>
            </div>

            {/* Video Container */}
            <div className="relative flex-1 my-3 rounded-2xl overflow-hidden border border-white/50 bg-slate-950 shadow-inner min-h-[260px] flex items-center justify-center">
              <video
                ref={videoRef}
                src={isPlayingIntro ? ABOUT_INTRO_VIDEO_URL : ABOUT_IDLE_VIDEO_URL}
                className="w-full h-full object-cover object-center absolute inset-0"
                autoPlay
                loop={!isPlayingIntro}
                muted={isVideoMuted}
                playsInline
                onTimeUpdate={handleTimeUpdate}
                onEnded={handleVideoEnded}
              />

              {isPlayingIntro && (
                <DynamicVideoStoryOverlay
                  currentTime={videoCurrentTime}
                  duration={videoRef.current?.duration || 210}
                  isPlaying={!isVideoPaused}
                  isMuted={isVideoMuted}
                  onToggleMute={toggleVideoMute}
                  onTogglePlay={togglePlayPause}
                  onClose={handleCancelIntro}
                  onSeek={handleSeek}
                />
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 pointer-events-none" />

              {/* Floating Stat Badge */}
              <div className="absolute bottom-3 right-3 z-20 bg-slate-900/90 backdrop-blur-md border border-white/25 px-3 py-1.5 rounded-xl shadow-lg flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-[11px] font-bold text-white font-mono">SLA 98% • 21 Dự Án</span>
              </div>
            </div>

            {/* Video Controls Footer */}
            <div className="relative z-20 pt-1 flex items-center justify-between">
              <HeroIntroButton
                isPlayingIntro={isPlayingIntro}
                isAudioOn={!isVideoMuted}
                onToggleAudio={toggleVideoMute}
                onPlayIntro={handlePlayIntro}
                onCancelIntro={handleCancelIntro}
                lang={lang}
              />
            </div>
          </div>

          {/* BENTO BOX 2: Personal Demographics Bento Grid (7 cols) */}
          <div 
            style={{ borderRadius: "20px" }}
            className={cn(
              "lg:col-span-7 p-3.5 sm:p-4 flex flex-col justify-between border shadow-md text-left gap-3",
              getGlassCardClass()
            )}
          >
            <div className="flex items-center justify-between pb-2 border-b border-slate-200/80 dark:border-white/10">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                  <Calendar className="w-4 h-4 stroke-[2.2]" />
                </div>
                <h3 className="text-xs sm:text-sm font-bold font-play text-slate-900 dark:text-white">
                  Thông tin nhân khẩu & Liên hệ cá nhân
                </h3>
              </div>
              <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400">
                Hồ sơ chính thức
              </span>
            </div>

            {/* Demographics Sub-Bento Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 flex-1 content-center">
              {PERSONAL_DEMOGRAPHICS.map((item) => {
                const ItemIcon = getLucideIcon(item.iconName);

                if (item.type === "map") {
                  return (
                    <div 
                      key={item.id}
                      onClick={() => {
                        setSelectedMapLocation({
                          isOpen: true,
                          type: item.id === "perm_address" ? "cu_tru" : "tam_tru",
                          title: item.mapTitle || item.labelVi,
                          address: item.href || item.valueVi,
                          query: item.mapQuery || item.valueVi
                        });
                      }}
                      className={cn(
                        "p-2.5 rounded-xl border flex items-center justify-between transition-all cursor-pointer group hover:scale-[1.01] shadow-2xs",
                        item.colorTheme.bg,
                        item.colorTheme.border
                      )}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className={cn("w-7 h-7 rounded-lg flex items-center justify-center shrink-0", item.colorTheme.iconBg, item.colorTheme.iconColor)}>
                          <ItemIcon className="w-3.5 h-3.5" />
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className={cn("text-[9.5px] font-bold truncate", item.colorTheme.labelColor)}>
                            {item.labelVi} <span className="text-[8px] text-purple-600 dark:text-purple-300">📍 Map</span>
                          </span>
                          <span className={cn("text-[11.5px] font-black truncate", item.colorTheme.valueColor)}>
                            {item.valueVi}
                          </span>
                        </div>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform shrink-0" />
                    </div>
                  );
                }

                if (item.type === "email" || item.type === "phone" || item.type === "link") {
                  return (
                    <a 
                      key={item.id}
                      href={item.href}
                      target={item.type === "link" ? "_blank" : undefined}
                      rel={item.type === "link" ? "noopener noreferrer" : undefined}
                      className={cn(
                        "col-span-1 sm:col-span-2 p-2.5 rounded-xl border flex items-center justify-between transition-all group hover:scale-[1.01] shadow-2xs",
                        item.colorTheme.bg,
                        item.colorTheme.border
                      )}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className={cn("w-7 h-7 rounded-lg flex items-center justify-center shrink-0", item.colorTheme.iconBg, item.colorTheme.iconColor)}>
                          <ItemIcon className="w-3.5 h-3.5" />
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className={cn("text-[9.5px] font-bold truncate", item.colorTheme.labelColor)}>
                            {item.labelVi}
                          </span>
                          <span className={cn("text-[11.5px] font-black truncate", item.colorTheme.valueColor)}>
                            {item.valueVi}
                          </span>
                        </div>
                      </div>
                      <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform shrink-0" />
                    </a>
                  );
                }

                return (
                  <div 
                    key={item.id}
                    className={cn(
                      "p-2.5 rounded-xl border flex items-center justify-between shadow-2xs",
                      item.colorTheme.bg,
                      item.colorTheme.border
                    )}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className={cn("w-7 h-7 rounded-lg flex items-center justify-center shrink-0", item.colorTheme.iconBg, item.colorTheme.iconColor)}>
                        <ItemIcon className="w-3.5 h-3.5" />
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className={cn("text-[9.5px] font-bold truncate", item.colorTheme.labelColor)}>
                          {item.labelVi}
                        </span>
                        <span className={cn("text-[11.5px] font-black truncate", item.colorTheme.valueColor)}>
                          {item.valueVi}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* BENTO GRID ROW 2: THREE STRATEGIC OPERATIONAL PILLARS (3 Columns) */}
        <div 
          style={{ borderRadius: "20px" }}
          className={cn(
            "w-full p-3.5 sm:p-4 border shadow-md flex flex-col gap-3 text-left",
            getGlassCardClass()
          )}
        >
          <div className="flex items-center justify-between pb-2 border-b border-slate-200/80 dark:border-white/10">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                <Target className="w-4 h-4 stroke-[2.2]" />
              </div>
              <h3 className="text-xs sm:text-sm font-bold font-play text-slate-900 dark:text-white">
                Ba trụ cột vận hành chiến lược
              </h3>
            </div>
            <span className="text-[10px] font-mono text-indigo-600 dark:text-indigo-400 font-bold">
              Core Pillars
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Pillar 1 */}
            <div className="p-3.5 rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-sm flex flex-col justify-between min-h-[140px]">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-white/20">01</span>
                <BarChart3 className="w-4 h-4 text-blue-200" />
              </div>
              <div className="my-2">
                <h4 className="text-xs sm:text-sm font-black uppercase font-play tracking-wide">Hiệu Quả</h4>
                <p className="text-[11px] text-blue-100 font-medium mt-1 leading-snug">
                  Tối ưu hiệu suất, tạo kết quả đo lường rõ ràng và minh bạch.
                </p>
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="p-3.5 rounded-xl bg-gradient-to-br from-pink-600 to-purple-700 text-white shadow-sm flex flex-col justify-between min-h-[140px]">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-white/20">02</span>
                <Heart className="w-4 h-4 text-pink-200" />
              </div>
              <div className="my-2">
                <h4 className="text-xs sm:text-sm font-black uppercase font-play tracking-wide">Nhân Văn</h4>
                <p className="text-[11px] text-pink-100 font-medium mt-1 leading-snug">
                  Lắng nghe, thấu hiểu và đặt con người làm trung tâm phục vụ.
                </p>
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="p-3.5 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white shadow-sm flex flex-col justify-between min-h-[140px]">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-white/20">03</span>
                <TrendingUp className="w-4 h-4 text-emerald-200" />
              </div>
              <div className="my-2">
                <h4 className="text-xs sm:text-sm font-black uppercase font-play tracking-wide">Bền Vững</h4>
                <p className="text-[11px] text-emerald-100 font-medium mt-1 leading-snug">
                  Xây dựng niềm tin lâu dài và giá trị gia tăng bền vững cho doanh nghiệp.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* BENTO GRID ROW 3: CORE VALUES & PHILOSOPHY (2 Columns) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {/* Card 1: Core Values */}
          <div 
            style={{ borderRadius: "20px" }}
            className="p-3.5 sm:p-4 bg-[#FFF9F2] dark:bg-[#201712] border border-orange-200/60 dark:border-orange-950/40 shadow-md flex flex-col justify-between text-left min-h-[130px]"
          >
            <div className="flex items-center gap-2 pb-2 border-b border-orange-200/40 dark:border-orange-950/30">
              <Sparkles className="w-4 h-4 text-orange-500" />
              <h4 className="text-xs sm:text-sm font-bold text-orange-950 dark:text-orange-200 font-play">
                Giá trị cốt lõi
              </h4>
            </div>
            <p className="text-xs sm:text-[13px] text-slate-700 dark:text-slate-300 font-medium leading-relaxed my-2">
              Sự hài lòng không đến từ sự hoàn hảo tuyệt đối, mà đến từ <span className="font-extrabold text-orange-600 dark:text-orange-400">sự tận tâm kịp thời</span> và <span className="font-extrabold text-orange-600 dark:text-orange-400">đồng cảm chân thành</span>.
            </p>
            <span className="font-[Caveat,cursive] text-amber-700 dark:text-amber-400 text-base select-none self-end">
              Khách hàng là trọng tâm ♡
            </span>
          </div>

          {/* Card 2: Philosophy & Vision */}
          <div 
            style={{ borderRadius: "20px" }}
            className="p-3.5 sm:p-4 bg-[#F2F7FF] dark:bg-[#121B2D] border border-blue-200/60 dark:border-blue-950/40 shadow-md flex flex-col justify-between text-left min-h-[130px]"
          >
            <div className="flex items-center gap-2 pb-2 border-b border-blue-200/40 dark:border-blue-950/30">
              <Users className="w-4 h-4 text-blue-600 dark:text-cyan-400" />
              <h4 className="text-xs sm:text-sm font-bold text-blue-950 dark:text-cyan-200 font-play">
                Triết lý & Tầm nhìn
              </h4>
            </div>
            <div className="my-2 text-center py-1.5 px-2 rounded-xl bg-blue-100/30 dark:bg-blue-900/20 border border-blue-200/30">
              <p className="text-[11.5px] sm:text-xs font-black italic text-blue-700 dark:text-cyan-300">
                “Tận Tâm & Đồng Hành Cùng Trải Nghiệm Khách Hàng”
              </p>
            </div>
            <p className="text-[11px] sm:text-xs text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
              Mỗi khách hàng cảm nhận được một điều cốt lõi: Họ luôn được lắng nghe và phục vụ tận tâm.
            </p>
          </div>
        </div>

        {/* BENTO GRID ROW 4: BOTTOM CTA COLLABORATION BANNER */}
        <div 
          style={{ borderRadius: "20px" }}
          className={cn(
            "w-full p-4 border shadow-md flex flex-col sm:flex-row items-center justify-between gap-3.5 text-left relative overflow-hidden",
            getGlassCardClass()
          )}
        >
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 dark:bg-cyan-500/20 text-blue-600 dark:text-cyan-300 flex items-center justify-center shrink-0 shadow-inner">
              <Send className="w-5 h-5" />
            </div>
            <div className="flex flex-col min-w-0">
              <h4 className="text-xs sm:text-sm font-black text-slate-900 dark:text-white font-play truncate">
                Cùng tạo ra trải nghiệm khách hàng tốt hơn
              </h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-300 truncate">
                Sẵn sàng hợp tác xây dựng hệ thống Customer Experience hiệu quả và bền vững.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => handleNavigate("contact")}
            className="px-5 py-2.5 rounded-full bg-gradient-to-r from-orange-500 to-rose-500 hover:brightness-105 text-white font-bold text-xs flex items-center gap-2 shadow-md transition cursor-pointer active:scale-95 shrink-0"
          >
            <MessagesSquare className="w-4 h-4" />
            <span>Kết nối ngay</span>
            <ChevronRight className="w-3.5 h-3.5 stroke-[3]" />
          </button>
        </div>

      </div>

      {/* Google Maps Location Popup Modal */}
      <AnimatePresence>
        {selectedMapLocation && selectedMapLocation.isOpen && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-5">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedMapLocation(null)}
              className="absolute inset-0 bg-slate-950/75 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 15 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              style={{ borderRadius: "20px" }}
              className="relative w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/15 p-4 sm:p-6 shadow-2xl z-10 flex flex-col gap-3 text-slate-800 dark:text-slate-100 font-play overflow-hidden"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-200/80 dark:border-white/10">
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-white font-bold shadow-md ${
                    selectedMapLocation.type === "cu_tru" ? "bg-emerald-600" : "bg-purple-600"
                  }`}>
                    {selectedMapLocation.type === "cu_tru" ? <Home className="w-4.5 h-4.5" /> : <MapPin className="w-4.5 h-4.5" />}
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
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="relative w-full h-[280px] sm:h-[340px] rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-inner bg-slate-100 dark:bg-slate-950">
                <iframe
                  title={selectedMapLocation.title}
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(selectedMapLocation.query)}&t=&z=16&ie=UTF8&iwloc=&output=embed`}
                  className="w-full h-full border-0"
                  loading="lazy"
                  allowFullScreen
                />
              </div>

              <div className="flex items-center justify-between gap-3 pt-1">
                <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 truncate flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                  <span className="truncate">{selectedMapLocation.address}</span>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(selectedMapLocation.query)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-[11px] font-bold transition-all shadow-md flex items-center gap-1.5"
                  >
                    <Navigation className="w-3 h-3" />
                    <span>Mở Google Maps</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => setSelectedMapLocation(null)}
                    className="px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-[11px] font-bold transition-all cursor-pointer"
                  >
                    Đóng
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
