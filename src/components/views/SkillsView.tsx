'use client';

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Target, 
  Rocket, 
  Gem, 
  TrendingDown, 
  Bot, 
  Sparkles, 
  Database, 
  Monitor, 
  Cpu, 
  Users, 
  Coins, 
  Globe, 
  BarChart3, 
  Brain, 
  Workflow, 
  HeartHandshake, 
  TrendingUp, 
  Lightbulb, 
  ShieldAlert,
  Headphones,
  Zap,
  Languages,
  Layers,
  PieChart,
  ShieldCheck,
  LayoutGrid,
  CheckCircle2,
  ChevronRight,
  SlidersHorizontal,
  Compass
} from "lucide-react";
import { cn } from "@/lib/utils";
import { PageCardHeader } from "./PageCardHeader";
import { 
  STRENGTHS_DATA, 
  WEAKNESSES_DATA, 
  OPPORTUNITIES_DATA, 
  THREATS_DATA, 
  LANGUAGES_DATA,
  SKILL_GROUPS,
  SwotSkillItem,
  SkillGroup
} from "@/data/skillsData";
import { SiteTheme } from "@/types";

export interface SkillsViewProps {
  currentTheme?: SiteTheme;
  onNavigatePage?: (pageIndex: number) => void;
}

// Helper map to resolve icon components from strings
const getSkillIcon = (name: string) => {
  switch (name) {
    case "Sparkles": return Sparkles;
    case "Database": return Database;
    case "BarChart3": return BarChart3;
    case "Users": return Users;
    case "Workflow": return Workflow;
    case "ShieldAlert": return ShieldAlert;
    case "HeartHandshake": return HeartHandshake;
    case "Lightbulb": return Lightbulb;
    case "Target": return Target;
    case "Rocket": return Rocket;
    case "Cpu": return Cpu;
    case "Monitor": return Monitor;
    case "Bot": return Bot;
    case "TrendingUp": return TrendingUp;
    case "Coins": return Coins;
    case "Headphones": return Headphones;
    case "Brain": return Brain;
    case "Zap": return Zap;
    case "Globe": return Globe;
    case "Languages": return Languages;
    case "Layers": return Layers;
    case "PieChart": return PieChart;
    case "ShieldCheck": return ShieldCheck;
    case "LayoutGrid": return LayoutGrid;
    case "Compass": return Compass;
    default: return Gem;
  }
};

export const SkillsView: React.FC<SkillsViewProps> = ({ currentTheme = 'light-glass' }) => {
  const isVi = true;
  const [selectedSwot, setSelectedSwot] = useState<string | null>(null);

  // Helper to get glass card class
  const getGlassCardClass = () => {
    switch (currentTheme) {
      case "dark-neon":
        return "bg-[#121218]/85 dark:bg-[#121218]/85 border-cyan-400/25 dark:border-white/15 backdrop-blur-2xl backdrop-saturate-[180%] shadow-[0_0_20px_rgba(0,240,255,0.12)]";
      case "light-glass":
      default:
        return "bg-white/80 dark:bg-[#121218]/85 border-white/60 dark:border-white/20 backdrop-blur-2xl backdrop-saturate-[180%] shadow-[0_10px_35px_0_rgba(31,38,135,0.08)]";
    }
  };

  return (
    <div
      id="skills"
      className="relative w-full h-full min-h-full flex flex-col justify-start items-stretch p-2 sm:p-3 md:p-4 font-sans text-slate-900 dark:text-slate-100 transition-all duration-300 bg-transparent overflow-y-auto no-scrollbar font-play flex-1"
    >
      <div className="w-full h-full min-h-full flex-1 flex flex-col gap-[15px] max-w-none mx-auto justify-start">
        {/* Header Card */}
        <PageCardHeader pageId="skills" className="w-full mb-1" />

        {/* ========================================================================= */}
        {/* VIEW: SWOT 4-QUADRANT BENTO GRID                                        */}
        {/* ========================================================================= */}
        <div className="w-full flex-1 flex flex-col gap-[15px]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[15px] items-stretch relative w-full flex-1 justify-center">
            
            {/* 1. STRENGTHS (S) */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              style={{ borderRadius: "var(--theme-radius-card, 14px)" }}
              onClick={() => setSelectedSwot('S')}
              className={cn(
                "p-[15px] sm:p-5 border transition-all duration-300 flex flex-col justify-between overflow-hidden group/main cursor-pointer relative text-left min-h-[280px] rounded-[14px]",
                getGlassCardClass(),
                selectedSwot === 'S' && "ring-2 ring-blue-500/30 border-blue-400 dark:border-cyan-400"
              )}
            >
              <div className="relative z-10 w-full">
                {/* Quadrant Header */}
                <div className="flex items-center justify-between border-b border-blue-100 dark:border-slate-800 pb-3 mb-3">
                  <div className="flex items-center gap-2 sm:gap-2.5 min-w-0 text-left">
                    <motion.div
                      animate={{ y: [0, -3, 0], scale: [1, 1.08, 1] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                      className="shrink-0"
                    >
                      <Gem className="w-5 h-5 text-blue-600 dark:text-cyan-400" />
                    </motion.div>
                    <div className="min-w-0 text-left">
                      <motion.h6 
                        animate={{ opacity: [0.9, 1, 0.9] }}
                        transition={{ duration: 4, repeat: Infinity }}
                        className="text-base sm:text-lg font-bold text-blue-600 dark:text-cyan-400 truncate font-play text-left"
                      >
                        {isVi ? "7.1. Thế mạnh vận hành" : "7.1. Operational Core Strengths"}
                      </motion.h6>
                    </div>
                  </div>
                  
                  <span className="px-2.5 py-0.5 text-[10px] font-mono font-bold text-blue-700 dark:text-cyan-300 bg-blue-500/10 dark:bg-cyan-500/10 rounded-full border border-blue-200/30 dark:border-cyan-500/20 uppercase tracking-wider">
                    {isVi ? "S" : "S"}
                  </span>
                </div>

                <p className="text-xs font-semibold text-slate-600 dark:text-slate-300 leading-relaxed mb-3.5">
                  {isVi 
                    ? "Những thế mạnh cốt lõi nổi bật nhất đã được chứng minh qua thực tiễn quản trị, vận hành và nâng cấp hệ thống CSKH."
                    : "Core outstanding strengths proven through hands-on management, operation, and CX system elevation."}
                </p>

                {/* Skills Progress List */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                  {STRENGTHS_DATA.map((item, index) => {
                    const ItemIcon = getSkillIcon(item.iconName);
                    return (
                      <div 
                        key={item.id} 
                        className="flex flex-col gap-1.5 p-2 sm:p-2.5 rounded-xl border border-slate-200/50 dark:border-white/5 hover:border-blue-200 dark:hover:border-cyan-500/20 bg-white/40 dark:bg-slate-900/40 hover:bg-blue-50/40 dark:hover:bg-cyan-500/10 transition-all duration-300 group/item"
                      >
                        <div className="flex items-center justify-between gap-2.5 w-full">
                          <div className="flex items-center gap-2 min-w-0">
                            <div className="w-5.5 h-5.5 rounded-md bg-transparent flex items-center justify-center shrink-0">
                              <ItemIcon className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-400 shrink-0" />
                            </div>
                            <span className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate font-play">
                              {isVi ? item.labelVi : item.labelEn}
                            </span>
                          </div>
                          
                          <span className="px-2 py-0.5 rounded-[6px] bg-blue-500/10 text-blue-700 dark:text-cyan-300 border border-blue-500/25 dark:border-cyan-500/20 text-xs font-mono font-black tracking-wide">
                            {item.percent}%
                          </span>
                        </div>

                        <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden relative">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${item.percent}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.85, ease: "easeOut", delay: index * 0.06 }}
                            className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>

            {/* 2. WEAKNESSES / GROWTH (W) */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.05 }}
              style={{ borderRadius: "var(--theme-radius-card, 14px)" }}
              onClick={() => setSelectedSwot('W')}
              className={cn(
                "p-[15px] sm:p-5 border transition-all duration-300 flex flex-col justify-between overflow-hidden group/main cursor-pointer relative text-left min-h-[280px] rounded-[14px]",
                getGlassCardClass(),
                selectedSwot === 'W' && "ring-2 ring-orange-500/30 border-orange-400 dark:border-amber-400"
              )}
            >
              <div className="relative z-10 w-full">
                <div className="flex items-center justify-between border-b border-orange-100 dark:border-slate-800 pb-3 mb-3">
                  <div className="flex items-center gap-2 sm:gap-2.5 min-w-0 text-left">
                    <motion.div
                      animate={{ rotate: [0, -6, 6, 0], scale: [1, 1.04, 1] }}
                      transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
                      className="shrink-0"
                    >
                      <TrendingDown className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                    </motion.div>
                    <div className="min-w-0 text-left">
                      <motion.h6 
                        animate={{ opacity: [0.9, 1, 0.9] }}
                        transition={{ duration: 4.2, repeat: Infinity }}
                        className="text-base sm:text-lg font-bold text-amber-600 dark:text-amber-400 truncate font-play text-left"
                      >
                        {isVi ? "7.2. Hoàn thiện quản trị" : "7.2. Strategic Management Refinements"}
                      </motion.h6>
                    </div>
                  </div>
                  
                  <span className="px-2.5 py-0.5 text-[10px] font-mono font-bold text-orange-700 dark:text-amber-300 bg-orange-500/10 dark:bg-amber-500/10 rounded-full border border-orange-200/30 dark:border-amber-500/20 uppercase tracking-wider">
                    {isVi ? "W" : "W"}
                  </span>
                </div>

                <p className="text-xs font-semibold text-slate-600 dark:text-slate-300 leading-relaxed mb-3.5">
                  {isVi 
                    ? "Những khía cạnh cần liên tục hoàn thiện nhằm nâng tầm kỹ năng quản lý thực thi sang quản trị định hướng chiến lược."
                    : "Capabilities to continuously refine to elevate management from execution to strategic governance."}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                  {WEAKNESSES_DATA.map((item, index) => {
                    const ItemIcon = getSkillIcon(item.iconName);
                    return (
                      <div key={item.id} className="flex flex-col gap-1.5 p-2 sm:p-2.5 rounded-xl border border-slate-200/50 dark:border-white/5 hover:border-orange-200 dark:hover:border-amber-500/20 bg-white/40 dark:bg-slate-900/40 hover:bg-orange-50/40 dark:hover:bg-amber-500/10 transition-all duration-300 group/item">
                        <div className="flex items-center justify-between gap-2.5 w-full">
                          <div className="flex items-center gap-2 min-w-0">
                            <div className="w-5.5 h-5.5 rounded-md bg-transparent flex items-center justify-center shrink-0">
                              <ItemIcon className="w-3.5 h-3.5 text-orange-600 dark:text-amber-400 shrink-0" />
                            </div>
                            <span className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate font-play">
                              {isVi ? item.labelVi : item.labelEn}
                            </span>
                          </div>
                          <span className="px-2 py-0.5 rounded-[6px] bg-orange-500/10 text-orange-700 dark:text-amber-300 border border-orange-500/25 dark:border-amber-500/20 text-xs font-mono font-black tracking-wide">
                            {item.percent}%
                          </span>
                        </div>

                        <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden relative">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${item.percent}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.85, ease: "easeOut", delay: index * 0.06 }}
                            className="h-full bg-gradient-to-r from-orange-500 to-amber-500 rounded-full"
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>

            {/* 3. OPPORTUNITIES (O) */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.1 }}
              style={{ borderRadius: "var(--theme-radius-card, 14px)" }}
              onClick={() => setSelectedSwot('O')}
              className={cn(
                "p-[15px] sm:p-5 border transition-all duration-300 flex flex-col justify-between overflow-hidden group/main cursor-pointer relative text-left min-h-[280px] rounded-[14px]",
                getGlassCardClass(),
                selectedSwot === 'O' && "ring-2 ring-purple-500/30 border-purple-400 dark:border-purple-400"
              )}
            >
              <div className="relative z-10 w-full">
                <div className="flex items-center justify-between border-b border-purple-100 dark:border-slate-800 pb-3 mb-3">
                  <div className="flex items-center gap-2 sm:gap-2.5 min-w-0 text-left">
                    <motion.div
                      animate={{ y: [0, -4, 0], x: [0, 2, 0] }}
                      transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
                      className="shrink-0"
                    >
                      <Rocket className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                    </motion.div>
                    <div className="min-w-0 text-left">
                      <motion.h6 
                        animate={{ opacity: [0.9, 1, 0.9] }}
                        transition={{ duration: 3.8, repeat: Infinity }}
                        className="text-base sm:text-lg font-bold text-emerald-600 dark:text-emerald-400 truncate font-play text-left"
                      >
                        {isVi ? "7.3. Cơ hội bứt phá" : "7.3. Innovative Digital Paths"}
                      </motion.h6>
                    </div>
                  </div>
                  
                  <span className="px-2.5 py-0.5 text-[10px] font-mono font-bold text-purple-700 dark:text-purple-300 bg-purple-500/10 dark:bg-purple-500/10 rounded-full border border-purple-200/30 dark:border-purple-500/20 uppercase tracking-wider">
                    {isVi ? "O" : "O"}
                  </span>
                </div>

                <p className="text-xs font-semibold text-slate-600 dark:text-slate-300 leading-relaxed mb-3.5">
                  {isVi 
                    ? "Những cơ hội đón đầu làn sóng số, chuyển đổi dịch vụ sang kênh thông minh và ứng dụng AI nâng cao hiệu năng."
                    : "Excellent avenues to capture digital waves, automating workflows, and leveraging AI models."}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                  {OPPORTUNITIES_DATA.map((item, index) => {
                    const ItemIcon = getSkillIcon(item.iconName);
                    return (
                      <div key={item.id} className="flex flex-col gap-1.5 p-2 sm:p-2.5 rounded-xl border border-slate-200/50 dark:border-white/5 hover:border-purple-200 dark:hover:border-purple-500/20 bg-white/40 dark:bg-slate-900/40 hover:bg-purple-50/40 dark:hover:bg-purple-500/10 transition-all duration-300 group/item">
                        <div className="flex items-center justify-between gap-2.5 w-full">
                          <div className="flex items-center gap-2 min-w-0">
                            <div className="w-5.5 h-5.5 rounded-md bg-transparent flex items-center justify-center shrink-0">
                              <ItemIcon className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400 shrink-0" />
                            </div>
                            <span className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate font-play">
                              {isVi ? item.labelVi : item.labelEn}
                            </span>
                          </div>
                          <span className="px-2 py-0.5 rounded-[6px] bg-purple-500/10 text-purple-700 dark:text-purple-300 border border-purple-500/25 dark:border-purple-500/20 text-xs font-mono font-black tracking-wide">
                            {item.percent}%
                          </span>
                        </div>

                        <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden relative">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${item.percent}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.85, ease: "easeOut", delay: index * 0.06 }}
                            className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>

            {/* 4. THREATS (T) */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.15 }}
              style={{ borderRadius: "var(--theme-radius-card, 14px)" }}
              onClick={() => setSelectedSwot('T')}
              className={cn(
                "p-[15px] sm:p-5 border transition-all duration-300 flex flex-col justify-between overflow-hidden group/main cursor-pointer relative text-left min-h-[280px] rounded-[14px]",
                getGlassCardClass(),
                selectedSwot === 'T' && "ring-2 ring-red-500/30 border-red-400 dark:border-rose-400"
              )}
            >
              <div className="relative z-10 w-full">
                <div className="flex items-center justify-between border-b border-red-100 dark:border-slate-800 pb-3 mb-3">
                  <div className="flex items-center gap-2 sm:gap-2.5 min-w-0 text-left">
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                      className="shrink-0"
                    >
                      <Target className="w-5 h-5 text-violet-600 dark:text-fuchsia-400" />
                    </motion.div>
                    <div className="min-w-0 text-left">
                      <motion.h6 
                        animate={{ opacity: [0.9, 1, 0.9] }}
                        transition={{ duration: 3.5, repeat: Infinity }}
                        className="text-base sm:text-lg font-bold text-violet-600 dark:text-fuchsia-400 truncate font-play text-left"
                      >
                        {isVi ? "7.4. Thách thức thích ứng" : "7.4. Agility Under Pressure"}
                      </motion.h6>
                    </div>
                  </div>
                  
                  <span className="px-2.5 py-0.5 text-[10px] font-mono font-bold text-red-700 dark:text-rose-300 bg-red-500/10 dark:bg-rose-500/10 rounded-full border border-red-200/30 dark:border-rose-500/20 uppercase tracking-wider">
                    {isVi ? "T" : "T"}
                  </span>
                </div>

                <p className="text-xs font-semibold text-slate-600 dark:text-slate-300 leading-relaxed mb-3.5">
                  {isVi 
                    ? "Những thách thức khách quan từ môi trường kinh tế và thay đổi công nghệ đột phá tác động trực tiếp đến dịch vụ."
                    : "Key external risks from volatile economy and rapid technical changes demanding persistent agility."}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                  {THREATS_DATA.map((item, index) => {
                    const ItemIcon = getSkillIcon(item.iconName);
                    return (
                      <div key={item.id} className="flex flex-col gap-1.5 p-2 sm:p-2.5 rounded-xl border border-slate-200/50 dark:border-white/5 hover:border-red-200 dark:hover:border-rose-500/20 bg-white/40 dark:bg-slate-900/40 hover:bg-red-50/40 dark:hover:bg-rose-500/10 transition-all duration-300 group/item">
                        <div className="flex items-center justify-between gap-2.5 w-full">
                          <div className="flex items-center gap-2 min-w-0">
                            <div className="w-5.5 h-5.5 rounded-md bg-transparent flex items-center justify-center shrink-0">
                              <ItemIcon className="w-3.5 h-3.5 text-red-600 dark:text-rose-400 shrink-0" />
                            </div>
                            <span className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate font-play">
                              {isVi ? item.labelVi : item.labelEn}
                            </span>
                          </div>
                          
                          {/* CRITICAL: Must use label 'Mức độ tác động' instead of 'Mức độ kỹ năng' */}
                          <div className="flex items-center gap-1.5 shrink-0">
                            <span className="hidden xs:inline-block text-[10px] text-red-600/80 dark:text-rose-400/80 font-mono font-medium">
                              {isVi ? "Mức độ tác động" : "Impact level"}
                            </span>
                            <span className="px-2 py-0.5 rounded-[6px] bg-red-500/10 text-red-700 dark:text-rose-300 border border-red-500/25 dark:border-rose-500/20 text-xs font-mono font-black tracking-wide">
                              {item.percent}%
                            </span>
                          </div>
                        </div>

                        <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden relative">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${item.percent}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.85, ease: "easeOut", delay: index * 0.06 }}
                            className="h-full bg-gradient-to-r from-red-500 to-rose-600 rounded-full"
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>

          </div>
        </div>

        {/* ========================================================================= */}
        {/* SECTION 7.5: NĂNG LỰC NGÔN NGỮ (LANGUAGES PROFICIENCY)                   */}
        {/* ========================================================================= */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          style={{ borderRadius: "var(--theme-radius-card, 14px)" }}
          className={cn(
            "w-full p-5 sm:p-6 border select-none flex flex-col gap-4 text-left transition-all duration-300 rounded-[14px]",
            getGlassCardClass()
          )}
        >
          {/* Section Header */}
          <div className="flex items-center justify-between border-b border-slate-200/80 dark:border-white/10 pb-3">
            <div className="flex items-center gap-2.5">
              <motion.div
                animate={{ y: [0, -3, 0], rotate: [0, 4, -4, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                className="w-8 h-8 rounded-xl bg-transparent flex items-center justify-center text-blue-600 dark:text-cyan-400 shrink-0"
              >
                <Globe className="w-5 h-5" />
              </motion.div>
              <h6 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white font-play">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 dark:from-blue-400 dark:via-indigo-300 dark:to-cyan-300">
                  {isVi ? "7.5. Năng lực ngôn ngữ & Giao tiếp quốc tế" : "7.5. Language Proficiency & Global Communication"}
                </span>
              </h6>
            </div>

            <span className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400">
              Native · Professional · AI
            </span>
          </div>

          {/* 3 Circular Language Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {LANGUAGES_DATA.map((langItem) => (
              <div 
                key={langItem.id}
                className="flex items-center gap-4 p-4 rounded-2xl bg-white/70 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800 shadow-2xs hover:scale-[1.02] transition-all relative overflow-hidden group/lang"
              >
                {/* SVG Progress Circle */}
                <div className="relative w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center shrink-0 z-10">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                    <path className="text-slate-200 dark:text-slate-800 stroke-current" strokeWidth="3.2" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                    <path 
                      className={cn("stroke-current", langItem.color)} 
                      strokeWidth="3.2" 
                      strokeDasharray={`${langItem.percent}, 100`} 
                      strokeLinecap="round" 
                      fill="none" 
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" 
                    />
                  </svg>
                  <span className="absolute text-xs font-mono font-black text-slate-900 dark:text-white">
                    {langItem.percent}%
                  </span>
                </div>

                <div className="flex flex-col min-w-0 text-left relative z-10">
                  <h6 className="font-bold text-sm text-slate-900 dark:text-white leading-tight font-play">
                    {isVi ? langItem.nameVi : langItem.nameEn}
                  </h6>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium leading-relaxed mt-0.5">
                    {isVi ? langItem.roleVi : langItem.roleEn}
                  </span>
                  <span className={cn("text-xs font-extrabold mt-1 leading-tight font-play", langItem.color)}>
                    {isVi ? langItem.levelVi : langItem.levelEn}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default SkillsView;
