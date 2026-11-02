'use client';

import React, { useState, useCallback, useRef, useEffect } from "react";
import { useLanguage } from "@/i18n";
import { useTheme } from "@/context/ThemeContext";
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
  ChevronDown,
  Check,
  SlidersHorizontal,
  Compass,
  Crown,
  Heart,
  Settings,
  FolderKanban,
  Code,
  CircleDollarSign,
  MessageSquare,
  Headset,
  BarChart2
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
  SkillGroup,
  LanguageProficiencyItem
} from "@/data/skills";

// Helper map to resolve icon components from strings
const getSkillIcon = (name: string) => {
  switch (name) {
    case "Sparkles": return Sparkles;
    case "Database": return Database;
    case "BarChart3": return BarChart3;
    case "BarChart2": return BarChart2;
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
    case "Crown": return Crown;
    case "Heart": return Heart;
    case "Settings": return Settings;
    case "FolderKanban": return FolderKanban;
    case "Code": return Code;
    case "CircleDollarSign": return CircleDollarSign;
    case "MessageSquare": return MessageSquare;
    case "Headset": return Headset;
    default: return Gem;
  }
};

export interface SkillsViewProps {
  currentTheme?: any;
}

export function Skills({ currentTheme }: SkillsViewProps = {}) {
  const { lang } = useLanguage();
  const themeContext = useTheme();
  const theme = currentTheme || themeContext?.theme || "mritech-digital-growth";
  const isVi = lang === "vi";
  const [selectedSwot, setSelectedSwot] = useState<string | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
  const filterMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterMenuRef.current && !filterMenuRef.current.contains(event.target as Node)) {
        setIsFilterOpen(false);
      }
    };
    if (isFilterOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isFilterOpen]);

  const swotFilterOptions = [
    { id: null, label: "Tất cả năng lực", badge: "ALL", color: "text-cyan-300" },
    { id: "S", label: "Thế Mạnh (S)", badge: "S", color: "text-blue-400" },
    { id: "W", label: "Hoàn Thiện (W)", badge: "W", color: "text-amber-400" },
    { id: "O", label: "Phát Triển (O)", badge: "O", color: "text-cyan-400" },
    { id: "T", label: "Thách Thức (T)", badge: "T", color: "text-rose-400" },
  ];

  // Helper to get glass card class
  const getGlassCardClass = () => {
    switch (theme) {
      case "glass-dark-neon":
      case "dark-neon":
        return "bg-[#121218]/85 dark:bg-[#121218]/85 border-cyan-400/25 dark:border-white/15 backdrop-blur-2xl backdrop-saturate-[180%] shadow-[0_0_20px_rgba(0,240,255,0.12)]";
      case "mritech-digital-growth":
      default:
        return "bg-white/75 dark:bg-[#121218]/85 border-white/60 dark:border-white/20 backdrop-blur-2xl backdrop-saturate-[180%] shadow-[0_10px_35px_0_rgba(31,38,135,0.08)]";
    }
  };
  
  return (
    <section
      id="skills"
      className="relative w-full h-full flex flex-col justify-start items-stretch p-[15px] font-sans text-slate-900 dark:text-slate-100 transition-all duration-300 bg-transparent overflow-y-auto no-scrollbar"
    >
      <div className="w-full flex-grow flex flex-col gap-[15px] max-w-7xl mx-auto justify-start">
        {/* Banner trang kỹ năng - trong suốt 100%, không hiệu ứng nghiêng chữ */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="hero-banner w-full rounded-2xl overflow-visible relative bg-transparent border-0 shadow-none shrink-0 flex flex-col justify-between p-0 z-30"
          style={{ background: 'transparent' }}
        >
          {/* Vùng Tiêu Đề: Icon đứng trước tiêu đề, không đóng khung, cùng màu sắc với menu icon (#06b6d4), tiêu đề đúng 4 chữ viết hoa chữ đầu, xóa hiệu ứng nghiêng chữ */}
          <div className="relative z-10 flex flex-col justify-start text-left max-w-2xl">
            <div className="flex items-center gap-2.5" style={{ color: '#06b6d4' }}>
              <Brain
                className="w-8 h-8 sm:w-9 sm:h-9 shrink-0 bg-transparent border-0 p-0 shadow-none drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]"
                style={{ color: '#06b6d4', stroke: '#06b6d4' }}
              />
              <h1
                className="text-2xl sm:text-3xl md:text-4xl font-black font-play not-italic tracking-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]"
                style={{ color: '#06b6d4', textTransform: 'none', fontStyle: 'normal', transform: 'none' }}
              >
                Kỹ năng cốt lõi
              </h1>
            </div>

            {/* Sub tiêu đề duy nhất là câu nói hay chuyển sang font viết tay màu chữ vàng, xóa hiệu ứng nghiêng chữ */}
            <p
              className="font-handwriting not-italic text-yellow-300 text-lg sm:text-xl font-bold drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] mt-1.5 select-none"
              style={{ color: '#facc15', fontStyle: 'normal', transform: 'none' }}
            >
              "Kỹ năng là nền tảng nâng tầm dịch vụ ♡"
            </p>
          </div>

          {/* Nhóm các nút lại thành 1 filter icon ở bên dưới banner bên trái - dạng drop menu list, tiêu đề 4 từ */}
          <div className="relative z-30 flex items-center justify-start mt-2.5" ref={filterMenuRef}>
            <div className="relative inline-block text-left">
              <button
                type="button"
                onClick={() => setIsFilterOpen((prev) => !prev)}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-950/85 hover:bg-slate-900 text-cyan-300 border border-cyan-400/70 shadow-[0_4px_16px_rgba(0,0,0,0.55)] backdrop-blur-md transition-all cursor-pointer text-xs font-bold font-play active:scale-95 group"
                title="Bộ lọc năng lực"
                aria-expanded={isFilterOpen}
                aria-haspopup="listbox"
              >
                <SlidersHorizontal className="w-4 h-4 text-cyan-300 transition-transform group-hover:rotate-45 shrink-0" />
                <span>Bộ lọc năng lực</span>
                {selectedSwot && (
                  <span className="px-1.5 py-0.2 rounded-full bg-cyan-500/25 border border-cyan-400/50 text-[10px] font-mono text-cyan-200">
                    {selectedSwot}
                  </span>
                )}
                <ChevronDown
                  className={cn(
                    "w-3.5 h-3.5 text-cyan-300 transition-transform duration-200 shrink-0",
                    isFilterOpen && "rotate-180"
                  )}
                />
              </button>

              <AnimatePresence>
                {isFilterOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 6, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.96 }}
                    transition={{ duration: 0.16 }}
                    role="listbox"
                    className="absolute left-0 top-[calc(100%+8px)] w-56 rounded-xl bg-slate-950/95 border border-cyan-400/40 shadow-[0_12px_32px_rgba(0,0,0,0.75)] backdrop-blur-xl py-1.5 px-1.5 z-50 flex flex-col gap-1"
                  >
                    {swotFilterOptions.map((opt) => {
                      const isActive = selectedSwot === opt.id;
                      return (
                        <button
                          key={opt.id ?? "all"}
                          type="button"
                          role="option"
                          aria-selected={isActive}
                          onClick={() => {
                            setSelectedSwot(opt.id);
                            setIsFilterOpen(false);
                          }}
                          className={cn(
                            "w-full flex items-center justify-between px-3 py-1.5 rounded-full text-xs font-bold font-play transition-all cursor-pointer text-left",
                            isActive
                              ? "bg-cyan-500/25 text-white border border-cyan-400/60 shadow-[0_0_12px_rgba(34,211,238,0.25)]"
                              : "text-slate-200 hover:bg-white/10 border border-transparent"
                          )}
                        >
                          <span className="flex items-center gap-2 truncate">
                            <span
                              className={cn(
                                "w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-mono font-black bg-white/10 shrink-0",
                                opt.color
                              )}
                            >
                              {opt.badge}
                            </span>
                            <span className="truncate">{opt.label}</span>
                          </span>
                          {isActive && <Check className="w-3.5 h-3.5 text-cyan-300 shrink-0" />}
                        </button>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        {/* ========================================================================= */}
        {/* VIEW: SWOT 4-QUADRANT BENTO GRID                                        */}
        {/* ========================================================================= */}
        <div className="w-full flex flex-col gap-[15px]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[15px] items-stretch relative w-full justify-center">
            
            {/* 1. STRENGTHS (S) */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              style={{ borderRadius: "var(--radius-global, 12px)" }}
              onClick={() => setSelectedSwot('S')}
              className={cn(
                "p-[15px] border transition-all duration-300 flex flex-col justify-between overflow-hidden group/main cursor-pointer relative text-left min-h-[280px]",
                "rounded-[12px]",
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
                        className="text-h6 font-bold text-blue-600 dark:text-cyan-400 truncate font-play text-left"
                      >
                        {isVi ? "7.1. Thế mạnh vận hành" : "7.1. Operational Core Strengths"}
                      </motion.h6>
                    </div>
                  </div>
                  
                  <span className="px-2.5 py-0.5 text-[10px] font-mono font-bold text-blue-700 dark:text-cyan-300 bg-blue-500/10 dark:bg-cyan-500/10 rounded-full border border-blue-200/30 dark:border-cyan-500/20 uppercase tracking-wider">
                    {isVi ? "S" : "S"}
                  </span>
                </div>

                <p className="text-xs font-semibold text-slate-500 dark:text-slate-300 leading-relaxed mb-3.5">
                  {isVi 
                    ? "Những thế mạnh cốt lõi nổi bật nhất đã được chứng minh qua thực tiễn quản trị, vận hành và nâng cấp hệ thống CSKH."
                    : "Core outstanding strengths proven through hands-on management, operation, and CX system elevation."}
                </p>

                {/* Skills Progress List - Chuyển sub card thành dạng list dọc */}
                <ul className="flex flex-col divide-y divide-blue-100/80 dark:divide-slate-800/80 rounded-xl border border-blue-100/80 dark:border-cyan-500/20 bg-white/55 dark:bg-slate-900/40 overflow-hidden">
                  {STRENGTHS_DATA.map((item, index) => {
                    const ItemIcon = getSkillIcon(item.iconName);
                    return (
                      <li 
                        key={item.id} 
                        className="flex items-center justify-between gap-3 px-3 py-2 hover:bg-blue-50/50 dark:hover:bg-cyan-500/10 transition-colors duration-200 group/item"
                      >
                        <div className="flex items-center gap-2.5 min-w-0 flex-1">
                          <span className="text-[10px] font-mono font-bold text-blue-500/80 dark:text-cyan-400/80 w-4 shrink-0">
                            {String(index + 1).padStart(2, '0')}.
                          </span>
                          <ItemIcon className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-400 shrink-0" />
                          <span className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate font-play">
                            {isVi ? item.labelVi : item.labelEn}
                          </span>
                        </div>

                        <div className="flex items-center gap-2.5 shrink-0 w-28 sm:w-36 justify-end">
                          <div className="w-16 sm:w-20 h-1.5 bg-slate-200/80 dark:bg-slate-800 rounded-full overflow-hidden relative shrink-0">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: `${item.percent}%` }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.85, ease: "easeOut", delay: index * 0.05 }}
                              className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"
                            />
                          </div>
                          <span className="min-w-[38px] text-right text-xs font-mono font-black text-blue-700 dark:text-cyan-300">
                            {item.percent}%
                          </span>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </motion.div>

            {/* 2. WEAKNESSES / GROWTH (W) */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.05 }}
              style={{ borderRadius: "var(--radius-global, 12px)" }}
              onClick={() => setSelectedSwot('W')}
              className={cn(
                "p-[15px] border transition-all duration-300 flex flex-col justify-between overflow-hidden group/main cursor-pointer relative text-left min-h-[280px]",
                "rounded-[12px]",
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
                        className="text-h6 font-bold text-amber-600 dark:text-amber-400 truncate font-play text-left"
                      >
                        {isVi ? "7.2. Hoàn thiện quản trị" : "7.2. Strategic Management Refinements"}
                      </motion.h6>
                    </div>
                  </div>
                  
                  <span className="px-2.5 py-0.5 text-[10px] font-mono font-bold text-orange-700 dark:text-amber-300 bg-orange-500/10 dark:bg-amber-500/10 rounded-full border border-orange-200/30 dark:border-amber-500/20 uppercase tracking-wider">
                    {isVi ? "W" : "W"}
                  </span>
                </div>

                <p className="text-xs font-semibold text-slate-500 dark:text-slate-300 leading-relaxed mb-3.5">
                  {isVi 
                    ? "Những khía cạnh cần liên tục hoàn thiện nhằm nâng tầm kỹ năng quản lý thực thi sang quản trị định hướng chiến lược."
                    : "Capabilities to continuously refine to elevate management from execution to strategic governance."}
                </p>

                <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 gap-2.5 sm:gap-3">
                  {WEAKNESSES_DATA.map((item, index) => {
                    const ItemIcon = getSkillIcon(item.iconName);
                    return (
                      <div key={item.id} className="flex flex-col gap-1.5 p-2 rounded-xl border border-transparent hover:border-orange-100 dark:hover:border-amber-500/15 bg-transparent hover:bg-orange-50/30 dark:hover:bg-amber-500/5 transition-all duration-300 group/item">
                        <div className="flex items-center justify-between gap-2.5 w-full">
                          <div className="flex items-center gap-2 min-w-0">
                            <div className="w-5.5 h-5.5 rounded-md bg-transparent flex items-center justify-center shrink-0">
                              <ItemIcon className="w-3.5 h-3.5 text-orange-600 dark:text-amber-400 shrink-0" />
                            </div>
                            <span className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate font-play">
                              {isVi ? item.labelVi : item.labelEn}
                            </span>
                          </div>
                          <span className="px-2 py-0.5 rounded-[12px] bg-orange-500/10 text-orange-700 dark:text-amber-300 border border-orange-500/25 dark:border-amber-500/20 text-xs font-mono font-black tracking-wide">
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
              style={{ borderRadius: "var(--radius-global, 12px)" }}
              onClick={() => setSelectedSwot('O')}
              className={cn(
                "p-[15px] border transition-all duration-300 flex flex-col justify-between overflow-hidden group/main cursor-pointer relative text-left min-h-[280px]",
                "rounded-[12px]",
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
                        className="text-h6 font-bold text-emerald-600 dark:text-emerald-400 truncate font-play text-left"
                      >
                        {isVi ? "7.3. Cơ hội bứt phá" : "7.3. Innovative Digital Paths"}
                      </motion.h6>
                    </div>
                  </div>
                  
                  <span className="px-2.5 py-0.5 text-[10px] font-mono font-bold text-purple-700 dark:text-purple-300 bg-purple-500/10 dark:bg-purple-500/10 rounded-full border border-purple-200/30 dark:border-purple-500/20 uppercase tracking-wider">
                    {isVi ? "O" : "O"}
                  </span>
                </div>

                <p className="text-xs font-semibold text-slate-500 dark:text-slate-300 leading-relaxed mb-3.5">
                  {isVi 
                    ? "Những cơ hội đón đầu làn sóng số, chuyển đổi dịch vụ sang kênh thông minh và ứng dụng AI nâng cao hiệu năng."
                    : "Excellent avenues to capture digital waves, automating workflows, and leveraging AI models."}
                </p>

                <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 gap-2.5 sm:gap-3">
                  {OPPORTUNITIES_DATA.map((item, index) => {
                    const ItemIcon = getSkillIcon(item.iconName);
                    return (
                      <div key={item.id} className="flex flex-col gap-1.5 p-2 rounded-xl border border-transparent hover:border-purple-100 dark:hover:border-purple-500/15 bg-transparent hover:bg-purple-50/30 dark:hover:bg-purple-500/5 transition-all duration-300 group/item">
                        <div className="flex items-center justify-between gap-2.5 w-full">
                          <div className="flex items-center gap-2 min-w-0">
                            <div className="w-5.5 h-5.5 rounded-md bg-transparent flex items-center justify-center shrink-0">
                              <ItemIcon className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400 shrink-0" />
                            </div>
                            <span className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate font-play">
                              {isVi ? item.labelVi : item.labelEn}
                            </span>
                          </div>
                          <span className="px-2 py-0.5 rounded-[12px] bg-purple-500/10 text-purple-700 dark:text-purple-300 border border-purple-500/25 dark:border-purple-500/20 text-xs font-mono font-black tracking-wide">
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
              style={{ borderRadius: "var(--radius-global, 12px)" }}
              onClick={() => setSelectedSwot('T')}
              className={cn(
                "p-[15px] border transition-all duration-300 flex flex-col justify-between overflow-hidden group/main cursor-pointer relative text-left min-h-[280px]",
                "rounded-[12px]",
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
                        className="text-h6 font-bold text-violet-600 dark:text-fuchsia-400 truncate font-play text-left"
                      >
                        {isVi ? "7.4. Thách thức thích ứng" : "7.4. Agility Under Pressure"}
                      </motion.h6>
                    </div>
                  </div>
                  
                  <span className="px-2.5 py-0.5 text-[10px] font-mono font-bold text-red-700 dark:text-rose-300 bg-red-500/10 dark:bg-rose-500/10 rounded-full border border-red-200/30 dark:border-rose-500/20 uppercase tracking-wider">
                    {isVi ? "T" : "T"}
                  </span>
                </div>

                <p className="text-xs font-semibold text-slate-500 dark:text-slate-300 leading-relaxed mb-3.5">
                  {isVi 
                    ? "Những thách thức khách quan từ môi trường kinh tế và thay đổi công nghệ đột phá tác động trực tiếp đến dịch vụ."
                    : "Key external risks from volatile economy and rapid technical changes demanding persistent agility."}
                </p>

                <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 gap-2.5 sm:gap-3">
                  {THREATS_DATA.map((item, index) => {
                    const ItemIcon = getSkillIcon(item.iconName);
                    return (
                      <div key={item.id} className="flex flex-col gap-1.5 p-2 rounded-xl border border-transparent hover:border-red-100 dark:hover:border-rose-500/15 bg-transparent hover:bg-red-50/30 dark:hover:bg-rose-500/5 transition-all duration-300 group/item">
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
                            <span className="px-2 py-0.5 rounded-[12px] bg-red-500/10 text-red-700 dark:text-rose-300 border border-red-500/25 dark:border-rose-500/20 text-xs font-mono font-black tracking-wide">
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
          style={{ borderRadius: "var(--radius-global, 12px)" }}
          className={cn(
            "w-full p-5 sm:p-6 border select-none flex flex-col gap-4 text-left transition-all duration-300",
            "rounded-[12px]",
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
                <Globe className="w-4.5 h-4.5" />
              </motion.div>
              <h6 className="text-h6 font-bold text-slate-900 dark:text-white font-play">
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
                className="flex items-center gap-4 p-4 rounded-2xl bg-white/60 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800 shadow-2xs hover:scale-[1.02] transition-all relative overflow-hidden group/lang"
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
    </section>
  );
}

export const SkillsView = Skills;
export default Skills;
