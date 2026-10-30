'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Target,
  Rocket,
  Gem,
  Bot,
  Database,
  Monitor,
  Cpu,
  Users,
  Globe,
  BarChart3,
  HeartHandshake,
  ShieldAlert,
  Headset,
  Zap,
  Briefcase,
  Trophy,
  Crown,
  Heart,
  Settings,
  BarChart2,
  MessageSquare,
  FolderKanban,
  Code,
  CircleDollarSign,
  Lightbulb,
  TrendingUp,
  Sparkles,
  Maximize2,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  STRENGTHS_DATA,
  WEAKNESSES_DATA,
  OPPORTUNITIES_DATA,
  THREATS_DATA,
  LANGUAGES_DATA,
} from '@/data/skillsData';
import { SiteTheme } from '@/types';
import { SoundEngine } from '@/components/ui/SoundEngine';

export interface SkillsViewProps {
  currentTheme?: SiteTheme;
  onNavigatePage?: (pageIndex: number) => void;
}

const getSkillIcon = (name: string) => {
  switch (name) {
    case 'Database':
      return Database;
    case 'BarChart3':
      return BarChart3;
    case 'Users':
      return Users;
    case 'ShieldAlert':
      return ShieldAlert;
    case 'HeartHandshake':
      return HeartHandshake;
    case 'Target':
      return Target;
    case 'Rocket':
      return Rocket;
    case 'Cpu':
      return Cpu;
    case 'Monitor':
      return Monitor;
    case 'Bot':
      return Bot;
    case 'Zap':
      return Zap;
    case 'Globe':
      return Globe;
    case 'Crown':
      return Crown;
    case 'Heart':
      return Heart;
    case 'Settings':
      return Settings;
    case 'BarChart2':
      return BarChart2;
    case 'MessageSquare':
      return MessageSquare;
    case 'Headset':
      return Headset;
    case 'FolderKanban':
      return FolderKanban;
    case 'Code':
      return Code;
    case 'CircleDollarSign':
      return CircleDollarSign;
    case 'Lightbulb':
      return Lightbulb;
    default:
      return Gem;
  }
};

export const SkillsView: React.FC<SkillsViewProps> = ({ currentTheme = 'light-glass' }) => {
  const isVi = true;
  const [activeQuadrant, setActiveQuadrant] = useState<'S' | 'O' | 'W' | 'T' | null>(null);
  const [isInfographicOpen, setIsInfographicOpen] = useState<boolean>(false);

  const handleToggleQuadrant = (q: 'S' | 'O' | 'W' | 'T') => {
    SoundEngine.playTap();
    setActiveQuadrant((prev) => (prev === q ? null : q));
  };

  return (
    <div className="w-full h-full min-h-full flex-1 flex flex-col gap-3.5 max-w-none mx-auto justify-start select-none">
      {/* ===================================================================== */}
      {/* 1. HERO BANNER: PERSONAL SWOT - NĂNG LỰC & ĐỊNH HƯỚNG NGHỀ NGHIỆP      */}
      {/* ===================================================================== */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="relative overflow-hidden rounded-[18px] border border-sky-200/90 dark:border-sky-500/30 bg-gradient-to-r from-sky-100/95 via-blue-50/95 to-indigo-100/90 dark:from-slate-900/95 dark:via-blue-950/80 dark:to-indigo-950/80 p-4 sm:p-5 shadow-[0_10px_30px_rgba(14,165,233,0.12)] backdrop-blur-2xl"
      >
        {/* Decorative ambient glow */}
        <div className="absolute -top-16 -left-16 w-56 h-56 rounded-full bg-sky-300/30 dark:bg-sky-500/15 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 right-10 w-64 h-64 rounded-full bg-purple-300/25 dark:bg-purple-500/15 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          {/* Left: Title + Subtitle + 3 Highlight Badges */}
          <div className="flex-1 flex flex-col justify-between text-left">
            <div>
              <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
                <h1 className="text-2xl sm:text-3xl lg:text-[34px] font-black font-play tracking-tight text-[#082f68] dark:text-white leading-none">
                  PERSONAL
                </h1>
                <span className="text-2xl sm:text-3xl lg:text-[34px] font-black font-play tracking-tight bg-gradient-to-r from-sky-500 via-purple-600 to-pink-500 bg-clip-text text-transparent leading-none">
                  SWOT
                </span>
              </div>
              <p className="text-xs sm:text-sm font-extrabold font-play tracking-wider uppercase text-[#1e40af] dark:text-sky-300 mt-1.5">
                NĂNG LỰC &amp; ĐỊNH HƯỚNG NGHỀ NGHIỆP
              </p>
            </div>

            {/* 3 Highlight Feature Cards matching the header of the SWOT image */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mt-3.5">
              <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-white/85 dark:bg-slate-800/80 border border-sky-200/80 dark:border-sky-500/25 shadow-2xs">
                <div className="w-8 h-8 rounded-lg bg-sky-100 dark:bg-sky-900/50 flex items-center justify-center shrink-0 text-blue-600 dark:text-sky-400">
                  <Target className="w-4.5 h-4.5" />
                </div>
                <span className="text-[11px] sm:text-xs font-bold text-slate-800 dark:text-slate-100 leading-tight">
                  Đánh giá năng lực hiện tại
                </span>
              </div>

              <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-white/85 dark:bg-slate-800/80 border border-sky-200/80 dark:border-sky-500/25 shadow-2xs">
                <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center shrink-0 text-blue-600 dark:text-sky-400">
                  <BarChart3 className="w-4.5 h-4.5" />
                </div>
                <span className="text-[11px] sm:text-xs font-bold text-slate-800 dark:text-slate-100 leading-tight">
                  Xác định cơ hội phát triển
                </span>
              </div>

              <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-white/85 dark:bg-slate-800/80 border border-sky-200/80 dark:border-sky-500/25 shadow-2xs">
                <div className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center shrink-0 text-indigo-600 dark:text-indigo-400">
                  <Rocket className="w-4.5 h-4.5" />
                </div>
                <span className="text-[11px] sm:text-xs font-bold text-slate-800 dark:text-slate-100 leading-tight">
                  Chủ động thích ứng &amp; bứt phá
                </span>
              </div>
            </div>
          </div>

          {/* Right: Visual Analytics Showcase + View Original Infographic Button */}
          <div className="flex items-center justify-between lg:justify-end gap-3 shrink-0">
            <div
              onClick={() => {
                SoundEngine.playTap();
                setIsInfographicOpen(true);
              }}
              title="Nhấp để phóng to Infographic SWOT gốc"
              className="group relative flex items-center gap-3 p-2.5 pr-3.5 rounded-2xl bg-white/90 dark:bg-slate-800/90 border border-sky-200/90 dark:border-sky-500/30 shadow-sm hover:shadow-md transition-all cursor-pointer"
            >
              <div className="relative w-16 h-16 sm:w-18 sm:h-18 rounded-xl overflow-hidden border border-sky-200 dark:border-slate-700 bg-sky-50 shrink-0">
                <img
                  src="/assets/aistudio/B_ng_SWOT_c__nh_n__N_ng_l_c___C__h_i_5a3b9a3a.png"
                  alt="Personal SWOT Infographic"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="flex flex-col text-left">
                <div className="flex items-center gap-1.5">
                  <span className="w-6 h-6 rounded-lg bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                    <Lightbulb className="w-3.5 h-3.5" />
                  </span>
                  <span className="w-6 h-6 rounded-lg bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-sky-400 flex items-center justify-center">
                    <TrendingUp className="w-3.5 h-3.5" />
                  </span>
                </div>
                <span className="text-xs font-black font-play text-slate-900 dark:text-white mt-1 group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors">
                  Bảng SWOT Cá Nhân
                </span>
                <span className="text-[10px] font-bold text-blue-600 dark:text-sky-400 flex items-center gap-1 mt-0.5">
                  <Maximize2 className="w-3 h-3" />
                  <span>Xem Infographic gốc</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ===================================================================== */}
      {/* 2. SWOT 4-QUADRANT BENTO GRID + CENTRAL S-O-W-T MEDALLION             */}
      {/* ===================================================================== */}
      <div className="relative w-full">
        {/* CENTRAL S-O-W-T MEDALLION HUB (Matches the 4-color center circle in the image) */}
        <div className="hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-auto">
          <div className="w-24 h-24 lg:w-28 lg:h-28 rounded-full p-2 bg-white/90 dark:bg-slate-900/95 backdrop-blur-2xl border-2 border-white dark:border-slate-700 shadow-[0_10px_35px_rgba(30,58,138,0.22)] grid grid-cols-2 grid-rows-2 gap-1.5">
            <button
              type="button"
              onClick={() => handleToggleQuadrant('S')}
              title="Strengths - Năng lực cốt lõi"
              className={cn(
                'rounded-tl-full rounded-br-lg bg-gradient-to-br from-sky-400 to-blue-600 text-white font-black font-play text-base lg:text-lg flex items-center justify-center shadow-inner transition-transform cursor-pointer hover:scale-105',
                activeQuadrant === 'S' && 'ring-2 ring-blue-300 scale-105'
              )}
            >
              S
            </button>
            <button
              type="button"
              onClick={() => handleToggleQuadrant('O')}
              title="Opportunities - Cơ hội phát triển"
              className={cn(
                'rounded-tr-full rounded-bl-lg bg-gradient-to-bl from-purple-500 to-indigo-600 text-white font-black font-play text-base lg:text-lg flex items-center justify-center shadow-inner transition-transform cursor-pointer hover:scale-105',
                activeQuadrant === 'O' && 'ring-2 ring-purple-300 scale-105'
              )}
            >
              O
            </button>
            <button
              type="button"
              onClick={() => handleToggleQuadrant('W')}
              title="Weaknesses - Điểm cần phát triển"
              className={cn(
                'rounded-bl-full rounded-tr-lg bg-gradient-to-tr from-amber-500 to-orange-400 text-white font-black font-play text-base lg:text-lg flex items-center justify-center shadow-inner transition-transform cursor-pointer hover:scale-105',
                activeQuadrant === 'W' && 'ring-2 ring-amber-300 scale-105'
              )}
            >
              W
            </button>
            <button
              type="button"
              onClick={() => handleToggleQuadrant('T')}
              title="Threats - Thách thức & Rủi ro"
              className={cn(
                'rounded-br-full rounded-tl-lg bg-gradient-to-tl from-rose-600 to-red-500 text-white font-black font-play text-base lg:text-lg flex items-center justify-center shadow-inner transition-transform cursor-pointer hover:scale-105',
                activeQuadrant === 'T' && 'ring-2 ring-rose-300 scale-105'
              )}
            >
              T
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch relative w-full">
          {/* ================================================================= */}
          {/* QUADRANT 1: STRENGTHS (S) - NĂNG LỰC CỐT LÕI (ICY BLUE PALETTE)    */}
          {/* ================================================================= */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className={cn(
              'rounded-[18px] p-4 sm:p-5 border transition-all duration-300 flex flex-col justify-between relative overflow-hidden text-left bg-gradient-to-br from-sky-50/95 via-white/95 to-cyan-50/90 dark:from-slate-900/95 dark:via-sky-950/35 dark:to-slate-900/90 border-sky-200/90 dark:border-sky-500/30 shadow-[0_8px_28px_rgba(2,132,199,0.08)]',
              activeQuadrant === 'S' && 'ring-2 ring-blue-500 shadow-[0_12px_32px_rgba(2,132,199,0.2)]'
            )}
          >
            <div className="relative z-10 w-full">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-sky-200/80 dark:border-sky-800/50 pb-3 mb-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-11 h-11 rounded-full bg-gradient-to-br from-sky-400 to-blue-600 text-white flex items-center justify-center shrink-0 shadow-[0_4px_14px_rgba(2,132,199,0.35)] border-2 border-white dark:border-slate-800">
                    <Gem className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-base sm:text-lg font-black text-[#082f68] dark:text-sky-300 truncate font-play uppercase tracking-tight leading-tight">
                      STRENGTHS
                    </h3>
                    <p className="text-xs sm:text-[13px] font-extrabold text-blue-600 dark:text-cyan-400 uppercase tracking-wide">
                      {isVi ? 'NĂNG LỰC CỐT LÕI' : 'CORE STRENGTHS'}
                    </p>
                  </div>
                </div>

                {/* Top-right Diamond Emblem */}
                <div className="w-10 h-10 rounded-2xl bg-sky-100/90 dark:bg-sky-900/40 border border-sky-200/80 dark:border-sky-700/50 flex items-center justify-center text-sky-600 dark:text-sky-300 shrink-0 shadow-2xs">
                  <Gem className="w-5 h-5" />
                </div>
              </div>

              <p className="text-xs sm:text-[12.5px] font-medium text-slate-600 dark:text-slate-300 leading-relaxed mb-3.5">
                Những năng lực cốt lõi đã được rèn luyện và chứng minh qua thực tiễn quản lý &amp; vận hành.
              </p>

              {/* 7 Strengths Progress Bars */}
              <div className="flex flex-col gap-2.5">
                {STRENGTHS_DATA.map((item, index) => {
                  const ItemIcon = getSkillIcon(item.iconName);
                  return (
                    <div key={item.id} className="flex items-center gap-2.5 group/item">
                      <div className="w-7 h-7 rounded-lg bg-sky-100/90 dark:bg-sky-900/40 flex items-center justify-center shrink-0 text-blue-600 dark:text-sky-400">
                        <ItemIcon className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0 flex flex-col gap-1">
                        <span className="text-xs sm:text-[12.5px] font-bold text-slate-800 dark:text-slate-100 truncate font-play">
                          {isVi ? item.labelVi : item.labelEn}
                        </span>
                        <div className="w-full h-2 bg-sky-100 dark:bg-slate-800 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${item.percent}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.9, ease: 'easeOut', delay: index * 0.06 }}
                            className="h-full bg-gradient-to-r from-blue-600 via-sky-500 to-cyan-400 rounded-full"
                          />
                        </div>
                      </div>
                      <span className="px-2 py-0.5 rounded-md bg-sky-100/90 dark:bg-sky-900/50 text-[11px] font-mono tabular-nums font-black text-blue-700 dark:text-sky-300 shrink-0">
                        {item.percent}%
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Footer Hashtags */}
            <div className="flex flex-wrap items-center gap-1.5 pt-4 mt-3 border-t border-sky-200/60 dark:border-sky-800/40">
              {['#CRM', '#CustomerData', '#CX', '#Leadership'].map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-0.5 rounded-full bg-white/90 dark:bg-slate-800/90 text-[10px] font-bold text-blue-600 dark:text-sky-300 border border-sky-200/80 dark:border-sky-700/50 shadow-2xs"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          {/* ================================================================= */}
          {/* QUADRANT 2: OPPORTUNITIES (O) - CƠ HỘI PHÁT TRIỂN (LAVENDER)       */}
          {/* ================================================================= */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.08 }}
            className={cn(
              'rounded-[18px] p-4 sm:p-5 border transition-all duration-300 flex flex-col justify-between relative overflow-hidden text-left bg-gradient-to-br from-purple-50/95 via-white/95 to-fuchsia-50/90 dark:from-slate-900/95 dark:via-purple-950/35 dark:to-slate-900/90 border-purple-200/90 dark:border-purple-500/30 shadow-[0_8px_28px_rgba(147,51,234,0.08)]',
              activeQuadrant === 'O' && 'ring-2 ring-purple-500 shadow-[0_12px_32px_rgba(147,51,234,0.2)]'
            )}
          >
            <div className="relative z-10 w-full">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-purple-200/80 dark:border-purple-800/50 pb-3 mb-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-11 h-11 rounded-full bg-gradient-to-br from-fuchsia-500 to-purple-600 text-white flex items-center justify-center shrink-0 shadow-[0_4px_14px_rgba(168,85,247,0.35)] border-2 border-white dark:border-slate-800">
                    <Rocket className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-base sm:text-lg font-black text-[#2e1065] dark:text-purple-300 truncate font-play uppercase tracking-tight leading-tight">
                      OPPORTUNITIES
                    </h3>
                    <p className="text-xs sm:text-[13px] font-extrabold text-purple-600 dark:text-fuchsia-400 uppercase tracking-wide">
                      {isVi ? 'CƠ HỘI PHÁT TRIỂN' : 'GROWTH OPPORTUNITIES'}
                    </p>
                  </div>
                </div>

                {/* Top-right Rocket Emblem */}
                <div className="w-10 h-10 rounded-2xl bg-purple-100/90 dark:bg-purple-900/40 border border-purple-200/80 dark:border-purple-700/50 flex items-center justify-center text-purple-600 dark:text-purple-300 shrink-0 shadow-2xs">
                  <TrendingUp className="w-5 h-5" />
                </div>
              </div>

              <p className="text-xs sm:text-[12.5px] font-medium text-slate-600 dark:text-slate-300 leading-relaxed mb-3.5">
                Xu hướng công nghệ &amp; nhu cầu thị trường mở ra nhiều cơ hội để tạo bứt phá và nâng tầm sự nghiệp.
              </p>

              {/* 2x2 Sub-Cards Grid matching the Opportunities section in the image */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {OPPORTUNITIES_DATA.map((item) => {
                  const ItemIcon = getSkillIcon(item.iconName);
                  return (
                    <div
                      key={item.id}
                      className="rounded-2xl p-3.5 bg-white/90 dark:bg-slate-800/80 border border-purple-100/90 dark:border-purple-500/20 shadow-2xs hover:shadow-md transition-all flex flex-col gap-2"
                    >
                      <div className="flex items-start gap-2.5">
                        <div className="w-9 h-9 rounded-xl bg-purple-100/90 dark:bg-purple-900/50 flex items-center justify-center shrink-0 text-purple-600 dark:text-purple-300 border border-purple-200/60 dark:border-purple-700/40">
                          <ItemIcon className="w-4.5 h-4.5" />
                        </div>
                        <h4 className="text-xs sm:text-[13px] font-black text-purple-900 dark:text-purple-200 font-play leading-snug">
                          {isVi ? item.labelVi : item.labelEn}
                        </h4>
                      </div>
                      <p className="text-[11px] sm:text-[11.5px] text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                        {item.descVi}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Footer Hashtags */}
            <div className="flex flex-wrap items-center gap-1.5 pt-4 mt-3 border-t border-purple-200/60 dark:border-purple-800/40 md:pl-8">
              {['#AI', '#CXStrategy', '#DataDriven', '#DigitalTransformation', '#Growth'].map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-0.5 rounded-full bg-white/90 dark:bg-slate-800/90 text-[10px] font-bold text-purple-600 dark:text-purple-300 border border-purple-200/80 dark:border-purple-700/50 shadow-2xs"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          {/* ================================================================= */}
          {/* QUADRANT 3: WEAKNESSES (W) - ĐIỂM CẦN PHÁT TRIỂN (WARM AMBER)     */}
          {/* ================================================================= */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.16 }}
            className={cn(
              'rounded-[18px] p-4 sm:p-5 border transition-all duration-300 flex flex-col justify-between relative overflow-hidden text-left bg-gradient-to-br from-amber-50/95 via-white/95 to-orange-50/90 dark:from-slate-900/95 dark:via-amber-950/35 dark:to-slate-900/90 border-amber-200/90 dark:border-amber-500/30 shadow-[0_8px_28px_rgba(245,158,11,0.08)]',
              activeQuadrant === 'W' && 'ring-2 ring-amber-500 shadow-[0_12px_32px_rgba(245,158,11,0.2)]'
            )}
          >
            <div className="relative z-10 w-full">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-amber-200/80 dark:border-amber-800/50 pb-3 mb-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-11 h-11 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 text-white flex items-center justify-center shrink-0 shadow-[0_4px_14px_rgba(245,158,11,0.35)] border-2 border-white dark:border-slate-800">
                    <BarChart3 className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-base sm:text-lg font-black text-[#451a03] dark:text-amber-300 truncate font-play uppercase tracking-tight leading-tight">
                      WEAKNESSES
                    </h3>
                    <p className="text-xs sm:text-[13px] font-extrabold text-orange-600 dark:text-amber-400 uppercase tracking-wide">
                      {isVi ? 'ĐIỂM CẦN PHÁT TRIỂN' : 'GROWTH AREAS'}
                    </p>
                  </div>
                </div>

                {/* Top-right Rising Chart Emblem */}
                <div className="w-10 h-10 rounded-2xl bg-amber-100/90 dark:bg-amber-900/40 border border-amber-200/80 dark:border-amber-700/50 flex items-center justify-center text-orange-600 dark:text-amber-300 shrink-0 shadow-2xs">
                  <TrendingUp className="w-5 h-5" />
                </div>
              </div>

              <p className="text-xs sm:text-[12.5px] font-medium text-slate-600 dark:text-slate-300 leading-relaxed mb-3.5">
                Những năng lực cần tiếp tục nâng cao để đạt đến cấp độ chuyên gia và đáp ứng yêu cầu tương lai.
              </p>

              {/* 10 Weaknesses Inline Rows matching the image layout */}
              <div className="flex flex-col gap-2">
                {WEAKNESSES_DATA.map((item, index) => {
                  const ItemIcon = getSkillIcon(item.iconName);
                  return (
                    <div
                      key={item.id}
                      className="flex items-center justify-between gap-2 py-0.5 border-b border-amber-100/70 dark:border-slate-800/60 last:border-b-0"
                    >
                      <div className="flex items-center gap-2 min-w-0 flex-1">
                        <div className="w-6 h-6 rounded-md bg-amber-100/90 dark:bg-amber-900/40 flex items-center justify-center shrink-0 text-orange-600 dark:text-amber-400">
                          <ItemIcon className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-xs sm:text-[12.5px] font-bold text-slate-800 dark:text-slate-100 truncate font-play">
                          {isVi ? item.labelVi : item.labelEn}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <div className="w-16 sm:w-24 h-2 bg-amber-100 dark:bg-slate-800 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${item.percent}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.9, ease: 'easeOut', delay: index * 0.05 }}
                            className="h-full bg-gradient-to-r from-orange-500 to-amber-400 rounded-full"
                          />
                        </div>
                        <span className="px-2 py-0.5 rounded-md bg-amber-100/90 dark:bg-amber-900/50 text-[11px] font-mono tabular-nums font-black text-orange-700 dark:text-amber-300">
                          {item.percent}%
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Footer Hashtags */}
            <div className="flex flex-wrap items-center gap-1.5 pt-4 mt-3 border-t border-amber-200/60 dark:border-amber-800/40">
              {['#AI', '#Automation', '#Tech', '#ProjectManagement', '#GrowthMindset'].map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-0.5 rounded-full bg-white/90 dark:bg-slate-800/90 text-[10px] font-bold text-orange-600 dark:text-amber-300 border border-amber-200/80 dark:border-amber-700/50 shadow-2xs"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          {/* ================================================================= */}
          {/* QUADRANT 4: THREATS (T) - THÁCH THỨC & RỦI RO (ROSE/RED PALETTE)  */}
          {/* ================================================================= */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.24 }}
            className={cn(
              'rounded-[18px] p-4 sm:p-5 border transition-all duration-300 flex flex-col justify-between relative overflow-hidden text-left bg-gradient-to-br from-rose-50/95 via-white/95 to-red-50/90 dark:from-slate-900/95 dark:via-rose-950/35 dark:to-slate-900/90 border-rose-200/90 dark:border-rose-500/30 shadow-[0_8px_28px_rgba(225,29,72,0.08)]',
              activeQuadrant === 'T' && 'ring-2 ring-rose-500 shadow-[0_12px_32px_rgba(225,29,72,0.2)]'
            )}
          >
            <div className="relative z-10 w-full">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-rose-200/80 dark:border-rose-800/50 pb-3 mb-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-11 h-11 rounded-full bg-gradient-to-br from-rose-500 to-red-600 text-white flex items-center justify-center shrink-0 shadow-[0_4px_14px_rgba(225,29,72,0.35)] border-2 border-white dark:border-slate-800">
                    <ShieldAlert className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-base sm:text-lg font-black text-[#4c0519] dark:text-rose-300 truncate font-play uppercase tracking-tight leading-tight">
                      THREATS
                    </h3>
                    <p className="text-xs sm:text-[13px] font-extrabold text-red-600 dark:text-rose-400 uppercase tracking-wide">
                      {isVi ? 'THÁCH THỨC & RỦI RO' : 'KEY THREATS'}
                    </p>
                  </div>
                </div>

                {/* Top-right Shield Emblem */}
                <div className="w-10 h-10 rounded-2xl bg-rose-100/90 dark:bg-rose-900/40 border border-rose-200/80 dark:border-rose-700/50 flex items-center justify-center text-red-600 dark:text-rose-300 shrink-0 shadow-2xs">
                  <ShieldAlert className="w-5 h-5" />
                </div>
              </div>

              <p className="text-xs sm:text-[12.5px] font-medium text-slate-600 dark:text-slate-300 leading-relaxed mb-3.5">
                Những yếu tố bên ngoài có thể ảnh hưởng đến hiệu quả công việc và lộ trình phát triển.
              </p>

              {/* 2x2 Sub-Cards Grid matching the Threats section in the image */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {THREATS_DATA.map((item) => {
                  const ItemIcon = getSkillIcon(item.iconName);
                  return (
                    <div
                      key={item.id}
                      className="rounded-2xl p-3.5 bg-white/90 dark:bg-slate-800/80 border border-rose-100/90 dark:border-rose-500/20 shadow-2xs hover:shadow-md transition-all flex flex-col gap-2"
                    >
                      <div className="flex items-start gap-2.5">
                        <div className="w-9 h-9 rounded-xl bg-rose-100/90 dark:bg-rose-900/50 flex items-center justify-center shrink-0 text-red-600 dark:text-rose-300 border border-rose-200/60 dark:border-rose-700/40">
                          <ItemIcon className="w-4.5 h-4.5" />
                        </div>
                        <h4 className="text-xs sm:text-[13px] font-black text-red-900 dark:text-rose-200 font-play leading-snug">
                          {isVi ? item.labelVi : item.labelEn}
                        </h4>
                      </div>
                      <p className="text-[11px] sm:text-[11.5px] text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                        {item.descVi}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Footer Hashtags */}
            <div className="flex flex-wrap items-center gap-1.5 pt-4 mt-3 border-t border-rose-200/60 dark:border-rose-800/40 md:pl-8">
              {['#AIImpact', '#TechnologyChange', '#Competition', '#CostOptimization'].map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-0.5 rounded-full bg-white/90 dark:bg-slate-800/90 text-[10px] font-bold text-red-600 dark:text-rose-300 border border-rose-200/80 dark:border-rose-700/50 shadow-2xs"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* 3. OVERVIEW STATS STRIP (88%, 20+, 100+, CX XUẤT SẮC)                 */}
      {/* ===================================================================== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {/* Card 1: 88% Tổng quan năng lực */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-4 rounded-[16px] border border-sky-200/80 dark:border-sky-500/25 bg-white/90 dark:bg-slate-900/90 shadow-xs flex items-center gap-3.5"
        >
          <div className="relative w-14 h-14 shrink-0 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
              <circle
                cx="18"
                cy="18"
                r="15"
                fill="none"
                stroke="currentColor"
                strokeWidth="3.8"
                className="text-sky-100 dark:text-slate-800"
              />
              <circle
                cx="18"
                cy="18"
                r="15"
                fill="none"
                stroke="url(#statBlueGrad)"
                strokeWidth="3.8"
                strokeDasharray="88, 100"
                strokeLinecap="round"
              />
              <defs>
                <linearGradient id="statBlueGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#0284c7" />
                  <stop offset="100%" stopColor="#38bdf8" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div className="flex flex-col text-left min-w-0">
            <span className="text-[10.5px] font-extrabold text-slate-600 dark:text-slate-300 uppercase tracking-wide">
              TỔNG QUAN NĂNG LỰC
            </span>
            <span className="text-2xl font-black font-play tabular-nums text-blue-600 dark:text-sky-400 leading-tight">
              88%
            </span>
            <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 truncate">
              Mức độ thành thạo trung bình
            </span>
          </div>
        </motion.div>

        {/* Card 2: 20+ Năm kinh nghiệm */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.06 }}
          className="p-4 rounded-[16px] border border-sky-200/80 dark:border-sky-500/25 bg-white/90 dark:bg-slate-900/90 shadow-xs flex items-center gap-3.5"
        >
          <div className="w-13 h-13 rounded-2xl bg-sky-100/90 dark:bg-sky-900/40 flex items-center justify-center shrink-0 border border-sky-200/80 dark:border-sky-700/40 text-blue-600 dark:text-sky-400">
            <Briefcase className="w-6 h-6" />
          </div>
          <div className="flex flex-col text-left min-w-0">
            <span className="text-2xl font-black font-play tabular-nums text-blue-600 dark:text-sky-400 leading-tight">
              20+
            </span>
            <span className="text-xs font-bold text-slate-800 dark:text-slate-100 leading-tight">
              Năm kinh nghiệm
            </span>
            <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 truncate">
              Quản lý &amp; vận hành CSKH
            </span>
          </div>
        </motion.div>

        {/* Card 3: 100+ Đội ngũ quản lý */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.12 }}
          className="p-4 rounded-[16px] border border-purple-200/80 dark:border-purple-500/25 bg-white/90 dark:bg-slate-900/90 shadow-xs flex items-center gap-3.5"
        >
          <div className="w-13 h-13 rounded-2xl bg-purple-100/90 dark:bg-purple-900/40 flex items-center justify-center shrink-0 border border-purple-200/80 dark:border-purple-700/40 text-purple-600 dark:text-purple-400">
            <Users className="w-6 h-6" />
          </div>
          <div className="flex flex-col text-left min-w-0">
            <span className="text-2xl font-black font-play tabular-nums text-purple-600 dark:text-purple-400 leading-tight">
              100+
            </span>
            <span className="text-xs font-bold text-slate-800 dark:text-slate-100 leading-tight">
              Đội ngũ quản lý
            </span>
            <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 truncate">
              Nhân sự trực tiếp
            </span>
          </div>
        </motion.div>

        {/* Card 4: CX xuất sắc */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.18 }}
          className="p-4 rounded-[16px] border border-emerald-200/80 dark:border-emerald-500/25 bg-white/90 dark:bg-slate-900/90 shadow-xs flex items-center gap-3.5"
        >
          <div className="w-13 h-13 rounded-full bg-emerald-100/90 dark:bg-emerald-900/40 flex items-center justify-center shrink-0 border border-emerald-200/80 dark:border-emerald-700/40 text-emerald-600 dark:text-emerald-400">
            <Trophy className="w-6 h-6" />
          </div>
          <div className="flex flex-col text-left min-w-0">
            <span className="text-lg font-black font-play text-emerald-600 dark:text-emerald-400 leading-tight">
              CX xuất sắc
            </span>
            <span className="text-xs font-bold text-slate-800 dark:text-slate-100 leading-tight">
              Cam kết giá trị
            </span>
            <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 truncate">
              Kết quả bền vững
            </span>
          </div>
        </motion.div>
      </div>

      {/* ===================================================================== */}
      {/* 4. NGÔN NGỮ (LANGUAGES SECTION WITH 3 DONUT CHARTS + AI BOT BADGE)    */}
      {/* ===================================================================== */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="w-full p-4 sm:p-5 rounded-[18px] border border-sky-200/90 dark:border-sky-500/30 bg-gradient-to-r from-white/95 via-sky-50/80 to-indigo-50/85 dark:from-slate-900/95 dark:via-slate-900/90 dark:to-indigo-950/60 shadow-xs flex flex-col gap-4"
      >
        <div className="flex items-center justify-between border-b border-sky-200/70 dark:border-slate-800 pb-2.5">
          <div className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-blue-600 dark:text-sky-400" />
            <h3 className="text-sm sm:text-base font-black text-[#082f68] dark:text-white font-play uppercase tracking-wide">
              NGÔN NGỮ
            </h3>
          </div>
          <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
            Đa ngôn ngữ &amp; Giao tiếp quốc tế hỗ trợ bởi AI
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          <div className="md:col-span-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {LANGUAGES_DATA.map((langItem) => {
              const strokeColor =
                langItem.id === 'vi'
                  ? '#0284c7'
                  : langItem.id === 'en'
                  ? '#9333ea'
                  : '#10b981';
              const badgeClass =
                langItem.id === 'vi'
                  ? 'bg-sky-100/90 text-blue-700 dark:bg-sky-900/50 dark:text-sky-300 border-sky-200 dark:border-sky-700'
                  : langItem.id === 'en'
                  ? 'bg-purple-100/90 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300 border-purple-200 dark:border-purple-700'
                  : 'bg-emerald-100/90 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300 border-emerald-200 dark:border-emerald-700';

              return (
                <div
                  key={langItem.id}
                  className="flex items-center gap-3.5 p-3 rounded-2xl bg-white/85 dark:bg-slate-800/70 border border-slate-200/70 dark:border-slate-700/60 shadow-2xs"
                >
                  <div className="relative w-16 h-16 shrink-0 flex items-center justify-center">
                    <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                      <circle
                        cx="18"
                        cy="18"
                        r="15"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3.5"
                        className="text-slate-100 dark:text-slate-700"
                      />
                      <circle
                        cx="18"
                        cy="18"
                        r="15"
                        fill="none"
                        stroke={strokeColor}
                        strokeWidth="3.5"
                        strokeDasharray={`${langItem.percent}, 100`}
                        strokeLinecap="round"
                      />
                    </svg>
                    <span
                      className="absolute text-xs font-black font-mono tabular-nums"
                      style={{ color: strokeColor }}
                    >
                      {langItem.percent}%
                    </span>
                  </div>

                  <div className="flex flex-col text-left min-w-0 flex-1">
                    <h4 className="text-xs sm:text-[13px] font-black text-slate-900 dark:text-white font-play leading-snug">
                      {isVi ? langItem.nameVi : langItem.nameEn}
                    </h4>
                    <p className="text-[11px] text-slate-600 dark:text-slate-300 font-medium leading-tight mt-0.5">
                      {langItem.id === 'ai' ? langItem.roleVi : `(${langItem.roleVi})`}
                    </p>
                    <span
                      className={cn(
                        'inline-block w-fit px-2 py-0.5 rounded-lg text-[10px] font-bold border mt-1.5 leading-tight',
                        badgeClass
                      )}
                    >
                      {isVi ? langItem.levelVi : langItem.levelEn}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right AI Assistant Emblem matching bottom-right of the SWOT infographic */}
          <div className="md:col-span-2 flex items-center justify-center">
            <div className="flex flex-col items-center justify-center p-3 rounded-2xl bg-gradient-to-b from-sky-100/90 to-blue-100/80 dark:from-sky-900/40 dark:to-indigo-900/40 border border-sky-200/80 dark:border-sky-700/50 shadow-xs w-full">
              <div className="relative w-11 h-11 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-400 text-white flex items-center justify-center shadow-md">
                <Bot className="w-6 h-6" />
                <Sparkles className="w-3.5 h-3.5 text-amber-300 absolute -top-1 -right-1" />
              </div>
              <span className="text-[11px] font-black font-play text-blue-800 dark:text-sky-300 mt-1.5">
                AI Communication
              </span>
              <span className="text-[9.5px] font-bold text-slate-500 dark:text-slate-400">
                Hỗ trợ đa ngôn ngữ
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ===================================================================== */}
      {/* 5. LIGHTBOX MODAL FOR ORIGINAL SWOT INFOGRAPHIC IMAGE                 */}
      {/* ===================================================================== */}
      <AnimatePresence>
        {isInfographicOpen && (
          <div
            onClick={() => setIsInfographicOpen(false)}
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full max-h-[90vh] bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-white/15 shadow-2xl overflow-hidden flex flex-col"
            >
              <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200 dark:border-white/10">
                <div className="flex items-center gap-2">
                  <Gem className="w-4.5 h-4.5 text-blue-600 dark:text-sky-400" />
                  <h3 className="text-sm font-black font-play text-slate-900 dark:text-white">
                    Bảng SWOT Cá Nhân: Năng Lực &amp; Định Hướng Nghề Nghiệp
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setIsInfographicOpen(false)}
                  className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-rose-100 dark:hover:bg-rose-900/50 text-slate-600 hover:text-rose-600 dark:text-slate-300 flex items-center justify-center transition cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-3 sm:p-4 bg-slate-50 dark:bg-slate-950 flex items-center justify-center">
                <img
                  src="/assets/aistudio/B_ng_SWOT_c__nh_n__N_ng_l_c___C__h_i_5a3b9a3a.png"
                  alt="Bảng SWOT cá nhân: Năng lực & Cơ hội"
                  referrerPolicy="no-referrer"
                  className="max-w-full h-auto rounded-xl shadow-md"
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SkillsView;
