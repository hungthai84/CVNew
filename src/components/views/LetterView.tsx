'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { WebIcon } from '@/components/ui/WebIcon';
import { HeroBanner } from '@/components/ui/HeroBanner';
import {
  CAREER_MILESTONES_DATA,
  CORE_VALUES_DATA,
  OPERATIONAL_PRINCIPLES_DATA,
  CareerMilestoneItem,
} from '@/data/letterData';

// Authentic Signature vector for Nguyễn Hùng Thái
const SignatureSvg = () => (
  <svg
    className="w-36 h-12 text-blue-600 dark:text-cyan-400 opacity-95 relative select-none pointer-events-none my-0.5"
    viewBox="0 0 220 80"
    fill="none"
    stroke="currentColor"
    strokeWidth="3.4"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M 30 60 C 45 45, 60 10, 72 32 C 80 52, 85 15, 98 32 C 108 45, 115 58, 128 22 C 135 12, 142 45, 185 28" />
    <path d="M 38 42 L 185 34" strokeWidth="2" />
    <path d="M 82 10 L 82 65" strokeWidth="2.8" />
  </svg>
);

// Map icon string name to WebIcon name
const getMilestoneIconName = (name: string): string => {
  switch (name) {
    case 'Signal':
      return 'signal';
    case 'Headset':
      return 'headphones';
    case 'Tv':
      return 'tv';
    case 'Gamepad2':
      return 'gamepad';
    case 'ShoppingBag':
    case 'ShoppingCart':
      return 'shopping-bag';
    case 'ShieldCheck':
      return 'shield';
    case 'CreditCard':
      return 'card';
    case 'Heart':
      return 'heart';
    case 'Lightbulb':
      return 'lightbulb';
    case 'BarChart2':
      return 'chart';
    case 'Users':
      return 'users';
    case 'Target':
      return 'target';
    case 'Sparkles':
      return 'sparkles';
    case 'Award':
      return 'trophy';
    case 'Rocket':
      return 'rocket';
    default:
      return 'briefcase';
  }
};

// Animated Card Title Subcomponent
const AnimatedCardTitle: React.FC<{
  iconName: string;
  title: string;
  subtitle?: string;
  colorPreset?: 'emerald' | 'cyan' | 'purple' | 'rose' | 'orange' | 'blue';
  actionRight?: React.ReactNode;
}> = ({ iconName, title, subtitle, colorPreset = 'blue', actionRight }) => {
  const colorMap = {
    emerald: {
      bg: 'bg-emerald-100 dark:bg-emerald-950/70',
      text: 'text-emerald-700 dark:text-emerald-300',
      sub: 'text-emerald-700 dark:text-emerald-400',
    },
    cyan: {
      bg: 'bg-cyan-100 dark:bg-cyan-950/70',
      text: 'text-cyan-700 dark:text-cyan-300',
      sub: 'text-cyan-700 dark:text-cyan-400',
    },
    purple: {
      bg: 'bg-purple-100 dark:bg-purple-950/70',
      text: 'text-purple-700 dark:text-purple-300',
      sub: 'text-purple-700 dark:text-purple-400',
    },
    rose: {
      bg: 'bg-rose-100 dark:bg-rose-950/70',
      text: 'text-rose-700 dark:text-rose-300',
      sub: 'text-rose-700 dark:text-rose-400',
    },
    orange: {
      bg: 'bg-orange-100 dark:bg-orange-950/70',
      text: 'text-orange-700 dark:text-orange-300',
      sub: 'text-orange-700 dark:text-orange-400',
    },
    blue: {
      bg: 'bg-blue-100 dark:bg-blue-950/70',
      text: 'text-blue-700 dark:text-blue-300',
      sub: 'text-blue-700 dark:text-blue-400',
    },
  };

  const scheme = colorMap[colorPreset] || colorMap.blue;

  return (
    <div className="w-full flex items-center justify-between gap-3 mb-2.5">
      <div className="flex items-center gap-2.5 text-left">
        <div
          className={`w-8 h-8 rounded-xl ${scheme.bg} ${scheme.text} flex items-center justify-center font-bold shadow-xs shrink-0 animate-icon-inplace`}
        >
          <WebIcon name={iconName} className="w-4 h-4" />
        </div>
        <div>
          <h3 className={`text-base sm:text-lg font-black tracking-tight font-play ${scheme.text}`}>
            {title}
          </h3>
          {subtitle && (
            <p className={`text-xs font-semibold ${scheme.sub}`}>{subtitle}</p>
          )}
        </div>
      </div>
      {actionRight && <div className="shrink-0">{actionRight}</div>}
    </div>
  );
};

export const LetterView: React.FC = () => {
  // Current Slide: 0 -> Slide 1, 1 -> Slide 2, 2 -> Slide 3, 3 -> Slide 4
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [slideDirection, setSlideDirection] = useState<'next' | 'prev'>('next');

  const handlePrevSlide = useCallback(() => {
    setSlideDirection('prev');
    setCurrentSlide((prev) => (prev > 0 ? prev - 1 : 3));
  }, []);

  const handleNextSlide = useCallback(() => {
    setSlideDirection('next');
    setCurrentSlide((prev) => (prev < 3 ? prev + 1 : 0));
  }, []);

  // Collapse/Expand state for career milestones
  const [expandedCard, setExpandedCard] = useState<Record<string, boolean>>({});

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

  // Dynamic theme-aware Glass Card classes
  const getGlassCardClass = useCallback(() => {
    return 'bg-white/80 dark:bg-[#121218]/85 border border-white/80 dark:border-white/10 backdrop-blur-[18px] backdrop-saturate-[180%] shadow-[0_8px_32px_0_rgba(31,38,135,0.08)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] hover:shadow-[0_12px_40px_0_rgba(31,38,135,0.12)] transition-all duration-300';
  }, []);

  // Helper to format bold text split by **
  const renderFormattedText = (text: string) => {
    if (!text) return '';
    const tokens = text.split('**');
    return tokens.map((part, i) => {
      if (i % 2 === 1) {
        return (
          <strong key={i} className="font-bold text-slate-900 dark:text-white">
            {part}
          </strong>
        );
      }
      return part;
    });
  };

  // Subcomponent to render each career milestone card
  const renderCareerCard = (item: CareerMilestoneItem) => {
    const roleIcon = getMilestoneIconName(item.roleIconName);
    const highlightIcon = getMilestoneIconName(item.highlightIconName || 'Sparkles');
    const mainIcon = getMilestoneIconName(item.iconName);

    return (
      <div
        key={item.id}
        id={item.id}
        className={`flex flex-col justify-between p-4 sm:p-5 relative transition-all duration-300 overflow-hidden group/mcard border w-full hover:-translate-y-1 text-left rounded-2xl ${getGlassCardClass()}`}
      >
        {/* Subtle Brand Color Radial Tint */}
        <div
          className="absolute inset-0 opacity-[0.08] dark:opacity-[0.06] pointer-events-none mix-blend-multiply dark:mix-blend-color-dodge"
          style={{
            background: `radial-gradient(circle at bottom right, ${item.color}, transparent 70%)`,
          }}
        />

        {/* Watermark Background Icon */}
        <div
          className="absolute -right-6 -bottom-6 w-24 h-24 sm:w-28 sm:h-28 rotate-12 pointer-events-none transition-all duration-500 ease-in-out z-0 select-none opacity-10 dark:opacity-8 group-hover/mcard:rotate-6 group-hover/mcard:scale-110 group-hover/mcard:opacity-20"
          style={{ color: item.color }}
        >
          <WebIcon name={mainIcon} className="w-full h-full" />
        </div>

        {/* Header: Company Logo & Name & Role on Left, Year Badge Pill on Right */}
        <div className="w-full flex items-center justify-between gap-2 pb-2.5 mb-2 border-b border-slate-200/60 dark:border-slate-800/80 shrink-0 relative z-10">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 flex-1 text-left">
            <div
              className={`flex items-center justify-center shrink-0 transition-transform duration-300 group-hover/mcard:scale-105 ${
                item.id === 'card-2018'
                  ? 'w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-purple-500/15 dark:bg-purple-500/20 border-2 border-purple-500/35 shadow-[0_0_15px_rgba(168,85,247,0.25)] p-2'
                  : 'w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white/90 dark:bg-slate-950/90 border border-slate-200/80 dark:border-slate-800 p-2 shadow-xs'
              }`}
            >
              <img
                src={item.logo}
                alt={item.company}
                className={`w-full h-full object-contain ${
                  item.id === 'card-2018' ? 'rounded-full' : ''
                }`}
                referrerPolicy="no-referrer"
                loading="lazy"
              />
            </div>
            <div className="min-w-0 flex-1">
              <h4
                className="text-[15px] sm:text-[17px] font-black tracking-tight leading-snug truncate text-slate-900 dark:text-white font-play"
                style={{ color: item.titleColor }}
              >
                {item.company}
              </h4>
              <div
                className="flex items-center gap-1.5 text-xs sm:text-[12.5px] font-bold mt-0.5 truncate"
                style={{ color: item.color }}
              >
                <WebIcon name={roleIcon} className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">{`Vị trí: ${item.roleVi}`}</span>
              </div>
            </div>
          </div>

          {/* Year Badge Pill with Gradient */}
          <span
            className={`px-2.5 py-0.5 rounded-full text-white text-[10.5px] sm:text-xs font-black font-mono shadow-sm tracking-wider uppercase shrink-0 whitespace-nowrap ml-auto ${item.yearBadgeGradient}`}
          >
            {item.yearLabelVi}
          </span>
        </div>

        {/* Body: Text with full width readability */}
        <div className="w-full flex-1 my-1 text-left relative z-10">
          <p className="text-[13px] sm:text-[14px] leading-relaxed text-slate-800 dark:text-slate-200 text-left font-medium">
            {renderFormattedText(item.descVi)}
          </p>

          {item.showMoreLink && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setExpandedCard((prev) => ({ ...prev, [item.id]: !prev[item.id] }));
              }}
              className="text-xs font-bold text-rose-600 dark:text-rose-400 hover:underline mt-1.5 inline-flex items-center gap-1 cursor-pointer"
            >
              {expandedCard[item.id] ? (
                <>
                  <WebIcon name="chevron-up" className="w-3.5 h-3.5" />
                  <span>Thu gọn</span>
                </>
              ) : (
                <>
                  <span>Xem thêm →</span>
                </>
              )}
            </button>
          )}
        </div>

        {/* Bottom Highlight Box */}
        <div
          className="w-full mt-2.5 p-2.5 rounded-xl flex items-center gap-2 text-xs sm:text-[12.5px] text-slate-800 dark:text-slate-200 font-semibold relative z-10 border"
          style={{
            backgroundColor: `${item.color}12`,
            borderColor: `${item.color}30`,
          }}
        >
          <span style={{ color: item.color }} className="shrink-0">
            <WebIcon name={highlightIcon} className="w-4 h-4" />
          </span>
          <span className="flex-1 leading-snug text-left truncate">{item.highlightVi}</span>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full h-full flex-1 min-h-0 overflow-y-auto custom-scrollbar flex flex-col gap-[15px] justify-start relative z-10 text-slate-800 dark:text-slate-100 select-none pr-1 sm:pr-2 pb-8">
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
      {/* SLIDE 1: THÔNG ĐIỆP HỢP TÁC CHIẾN LƯỢC & BANNER                           */}
      {/* ========================================================================= */}
      {currentSlide === 0 && (
        <div key="slide-1" className={`w-full flex flex-col gap-[15px] ${slideDirection === 'next' ? 'animate-slide-next' : 'animate-slide-prev'}`}>
          {/* Top Hero Banner */}
          <HeroBanner
            title="Thư Ngỏ Đối Tác"
            subtitle="Thông điệp hợp tác – Định hướng phát triển bền vững cùng doanh nghiệp"
            quote="“Trải nghiệm hôm nay kiến tạo giá trị bền vững ngày mai.”"
            quoteAuthor="— Nguyễn Hùng Thái"
            videoSrc="https://cdn.scena.ai/project/10223/613f6772f425f2e4b9526e40970b5a3295a59dba54cbbdddc912ba437fb02ca4.mp4"
          />

          {/* Main Letter Content: Thông điệp hợp tác chiến lược */}
          <div
            id="card-main-letter-content"
            className={`w-full relative overflow-hidden p-5 sm:p-7 md:p-8 rounded-2xl flex flex-col justify-center gap-4 group z-10 border ${getGlassCardClass()}`}
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              {/* Left Column: Text Content */}
              <div className="lg:col-span-8 w-full flex flex-col justify-center relative z-10 text-left">
                <AnimatedCardTitle
                  iconName="book"
                  title="Thông điệp hợp tác"
                  subtitle="Tầm nhìn & Định hướng phát triển bền vững"
                  colorPreset="emerald"
                />

                {/* Salutation Line in Vibrant Orange */}
                <p className="text-[#f95700] dark:text-[#f97316] font-extrabold text-[16px] sm:text-[18px] md:text-[20px] leading-snug mb-3 font-play">
                  Kính gửi Quý đối tác, Quý khách hàng và toàn thể cộng sự.
                </p>

                {/* Body Content */}
                <div className="text-slate-800 dark:text-slate-200 text-[14.5px] sm:text-[15.5px] leading-relaxed font-semibold text-left space-y-3">
                  <p>
                    Tôi là <strong className="font-black text-[#0f172a] dark:text-white">Nguyễn Hùng Thái</strong>, Trưởng phòng Chăm sóc khách hàng với hơn{' '}
                    <strong className="font-black text-blue-600 dark:text-cyan-400">22 năm kinh nghiệm (2002 - 2026+)</strong> thực chiến trong lĩnh vực xây dựng, vận hành và chuyển đổi số hệ thống dịch vụ khách hàng chuyên nghiệp.
                  </p>
                  <p className="text-slate-700 dark:text-slate-300">
                    Trong bối cảnh thị trường không ngừng biến động, trải nghiệm khách hàng (Customer Experience - CX) và năng lực tự động hóa bằng công nghệ chính là lợi thế cạnh tranh cốt lõi. Tôi luôn hướng đến mục tiêu đồng hành cùng các tổ chức kiến tạo mô hình vận hành tinh gọn, đạt chuẩn quốc tế và tạo ra giá trị đo lường được bằng doanh thu và lòng trung thành của người dùng.
                  </p>
                </div>

                {/* 3 Trụ cột hợp tác */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mt-4 pt-3 border-t border-slate-200/60 dark:border-slate-800">
                  <div className="p-2.5 rounded-xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200/60 dark:border-blue-800/50 flex flex-col gap-0.5">
                    <span className="text-[11px] font-black font-mono text-blue-700 dark:text-blue-300 uppercase">01. Vận hành quốc tế</span>
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200">Chuẩn COPC & ISO</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-purple-50/70 dark:bg-purple-950/40 border border-purple-200/60 dark:border-purple-800/50 flex flex-col gap-0.5">
                    <span className="text-[11px] font-black font-mono text-purple-700 dark:text-purple-300 uppercase">02. Công nghệ & AI</span>
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200">Tối ưu 60%+ tác vụ</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200/60 dark:border-emerald-800/50 flex flex-col gap-0.5">
                    <span className="text-[11px] font-black font-mono text-emerald-700 dark:text-emerald-300 uppercase">03. Giá trị bền vững</span>
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200">CSAT 96% & Giảm rời bỏ</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Video Showcase / AI Robot Companion */}
              <div className="lg:col-span-4 w-full h-56 sm:h-64 relative rounded-2xl overflow-hidden border border-slate-200/80 dark:border-slate-800 shadow-inner bg-slate-900 group">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  src="https://cdn.scena.ai/project/10169/0f6e39f01533134c70012f61be38d29126100c0300c9c0ea607adb305b5f7102.mp4"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent flex flex-col justify-end p-3.5">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-[11px] font-bold text-white border border-white/30 self-start mb-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    <span>AI Robot Companion</span>
                  </div>
                  <span className="text-xs text-slate-200 font-medium">Trợ lý ảo & Hạ tầng tự động hóa dịch vụ</span>
                </div>
              </div>
            </div>
          </div>

          {/* Hero Quote Banner Bottom */}
          <div className="w-full relative group/banner overflow-hidden z-10">
            <div className="relative z-10 w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 dark:from-slate-900 dark:via-indigo-950 dark:to-slate-900 text-white p-4 sm:p-5 rounded-2xl shadow-md flex flex-col md:flex-row items-center justify-between gap-4 border border-white/20 dark:border-slate-800 backdrop-blur-[16px]">
              <div className="w-10 h-10 rounded-xl bg-white/15 border border-white/20 flex items-center justify-center shrink-0 shadow-xs backdrop-blur-md">
                <span className="text-xl font-serif font-black">“</span>
              </div>
              <div className="flex-1 min-w-0 text-center md:text-left">
                <p className="text-white text-sm sm:text-base font-bold leading-relaxed tracking-wide font-play select-none">
                  "Thành công không chỉ đến từ năng lực, mà từ sự chân thành và tinh thần phụng sự."
                </p>
                <span className="text-xs text-sky-200 font-semibold mt-0.5 block">— Nguyễn Hùng Thái</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SLIDE 2: HÀNH TRÌNH SỰ NGHIỆP ĐỘT PHÁ (4 THẺ: 2002 - 2013)                 */}
      {/* ========================================================================= */}
      {currentSlide === 1 && (
        <div key="slide-2" className={`w-full flex flex-col gap-[15px] ${slideDirection === 'next' ? 'animate-slide-next' : 'animate-slide-prev'}`}>
          {/* Header Card */}
          <div className={`w-full p-4 sm:p-5 rounded-2xl border ${getGlassCardClass()}`}>
            <AnimatedCardTitle
              iconName="rocket"
              title="Hành trình sự nghiệp đột phá (Phần 1: 2002 - 2013)"
              subtitle="4 cột mốc đầu tiên đặt nền móng viễn thông, call center quốc tế, truyền hình và thể thao điện tử"
              colorPreset="cyan"
              actionRight={
                <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-xl bg-sky-100/80 dark:bg-sky-950/50 border border-sky-200/80 text-blue-800 dark:text-blue-300 font-bold italic text-xs">
                  <span>Trải nghiệm hôm nay · Tạo giá trị ngày mai</span>
                </div>
              }
            />
          </div>

          {/* 4 Cards Grid (2 Cột x 2 Hàng) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[15px] items-stretch">
            {CAREER_MILESTONES_DATA.slice(0, 4).map((item) => renderCareerCard(item))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SLIDE 3: HÀNH TRÌNH SỰ NGHIỆP ĐỘT PHÁ (4 THẺ: 2013 - 2026+)                */}
      {/* ========================================================================= */}
      {currentSlide === 2 && (
        <div key="slide-3" className={`w-full flex flex-col gap-[15px] ${slideDirection === 'next' ? 'animate-slide-next' : 'animate-slide-prev'}`}>
          {/* Header Card */}
          <div className={`w-full p-4 sm:p-5 rounded-2xl border ${getGlassCardClass()}`}>
            <AnimatedCardTitle
              iconName="briefcase"
              title="Hành trình sự nghiệp đột phá (Phần 2: 2013 - 2026+)"
              subtitle="4 cột mốc bứt phá trong kỷ nguyên TMĐT, Bảo hiểm nhân thọ, Fintech & Chuyển đổi số AI"
              colorPreset="purple"
              actionRight={
                <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-xl bg-purple-100/80 dark:bg-purple-950/50 border border-purple-200/80 text-purple-800 dark:text-purple-300 font-bold italic text-xs">
                  <span>Đổi mới không ngừng · Tối ưu vận hành toàn diện</span>
                </div>
              }
            />
          </div>

          {/* 4 Cards Grid (2 Cột x 2 Hàng) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[15px] items-stretch">
            {CAREER_MILESTONES_DATA.slice(4, 8).map((item) => renderCareerCard(item))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SLIDE 4: TRIẾT LÝ QUẢN TRỊ, TÂM THƯ TRI ÂN & GIÁ TRỊ CỐT LÕI               */}
      {/* ========================================================================= */}
      {currentSlide === 3 && (
        <div key="slide-4" className={`w-full flex flex-col gap-[15px] ${slideDirection === 'next' ? 'animate-slide-next' : 'animate-slide-prev'}`}>
          {/* Upper Section: Triết lý quản trị vận hành (Left) & Tâm thư tri ân phụng sự (Right) */}
          <div
            id="card-philosophy-gratitude"
            className={`w-full relative overflow-hidden p-5 sm:p-7 rounded-2xl group text-left border flex flex-col gap-[15px] ${getGlassCardClass()}`}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-[20px] items-stretch relative z-10">
              {/* Left Column: TRIẾT LÝ QUẢN TRỊ VẬN HÀNH */}
              <div className="flex flex-col justify-between gap-4 border-b lg:border-b-0 lg:border-r border-slate-200/60 dark:border-slate-800/80 pb-5 lg:pb-0 lg:pr-6">
                <div className="flex flex-col items-start text-left w-full">
                  <AnimatedCardTitle
                    iconName="sparkles"
                    title="Triết lý quản trị vận hành"
                    subtitle="Nguyên tắc cốt lõi kiến tạo dịch vụ xuất sắc"
                    colorPreset="purple"
                  />

                  <p className="text-[13.5px] sm:text-[14.5px] text-slate-800 dark:text-slate-200 leading-relaxed font-semibold mt-1">
                    Qua hơn hai thập kỷ làm việc trong nhiều lĩnh vực khác nhau, tôi nhận ra rằng chăm sóc khách hàng không chỉ là giải quyết vấn đề mà là xây dựng một hệ thống giúp doanh nghiệp phát triển bền vững.
                  </p>
                </div>

                {/* Three Core Principles */}
                <div className="flex flex-col gap-2.5 flex-1 w-full">
                  <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider font-mono">
                    Tôi luôn làm việc dựa trên ba nguyên tắc cốt lõi:
                  </p>

                  <div className="flex flex-col gap-2.5">
                    {OPERATIONAL_PRINCIPLES_DATA.map((principle, idx) => {
                      const iconName = idx === 0 ? 'layers' : idx === 1 ? 'users' : 'network';
                      return (
                        <div
                          key={principle.id}
                          className={`p-3 rounded-xl bg-white/60 dark:bg-slate-900/40 border shadow-xs text-left flex items-center gap-3 transition-all hover:scale-[1.01] duration-300 ${principle.borderClass}`}
                        >
                          <div
                            className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 shadow-3xs ${principle.bgClass}`}
                          >
                            <WebIcon name={iconName} className="w-4 h-4" />
                          </div>
                          <div>
                            <h4 className="font-extrabold text-[13.5px] sm:text-[14px] text-slate-900 dark:text-white font-play leading-snug">
                              {principle.titleVi}
                            </h4>
                            <p className="text-[11.5px] text-slate-500 dark:text-slate-400 mt-0.5 font-medium leading-tight">
                              {principle.descVi}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Right Column: TÂM THƯ TRI ÂN PHỤNG SỰ */}
              <div className="flex flex-col justify-between gap-4">
                <div className="flex flex-col gap-2.5">
                  <AnimatedCardTitle
                    iconName="heart"
                    title="Tâm thư tri ân phụng sự"
                    subtitle="Tận tâm lắng nghe & Đồng hành cùng khách hàng"
                    colorPreset="rose"
                  />

                  <div className="text-[13px] sm:text-[14px] text-slate-800 dark:text-slate-200 leading-relaxed space-y-2.5 font-semibold">
                    <p>
                      Từ đó, tôi tập trung xây dựng các hệ thống{' '}
                      <strong className="font-black text-blue-600 dark:text-cyan-400">CRM</strong>,{' '}
                      <strong className="font-black text-blue-600 dark:text-cyan-400">Dashboard quản trị</strong>,{' '}
                      <strong className="font-black text-blue-600 dark:text-cyan-400">AI Chatbot</strong> và các giải pháp{' '}
                      <strong className="font-black text-blue-600 dark:text-cyan-400">tự động hóa</strong>, nhằm nâng cao hiệu quả vận hành, tối ưu trải nghiệm khách hàng và hỗ trợ nhà quản lý ra quyết định bằng dữ liệu.
                    </p>
                    <p>
                      Bên cạnh công nghệ, tôi luôn xem{' '}
                      <strong className="font-black text-blue-600 dark:text-cyan-400">con người</strong> là yếu tố quyết định thành công. Vì vậy, tôi chú trọng đào tạo đội ngũ biết lắng nghe, thấu hiểu và mang đến những trải nghiệm vượt mong đợi cho khách hàng.
                    </p>
                  </div>
                </div>

                {/* Quote box synthesis */}
                <div className="w-full bg-[#fcfcff]/80 dark:bg-slate-900/40 p-3.5 rounded-xl border border-indigo-100 dark:border-indigo-900/40 relative flex flex-col justify-center shadow-xs">
                  <div className="relative z-10 text-left pl-2">
                    <p className="text-xs sm:text-sm font-extrabold text-indigo-700 dark:text-cyan-400 italic">
                      “Sự hài lòng của khách hàng không đến từ sự hoàn hảo, mà đến từ sự đồng cảm kịp thời.”
                    </p>
                  </div>
                </div>

                {/* Bottom - Signature Block */}
                <div className="w-full flex items-center justify-between gap-3 relative z-10 text-left pt-2.5 border-t border-slate-200/55 dark:border-slate-800/60 mt-auto">
                  <div className="flex flex-col items-start text-left">
                    <div className="mb-0.5 -ml-1">
                      <SignatureSvg />
                    </div>
                    <h4 className="text-[15px] sm:text-[16px] font-black text-slate-900 dark:text-white font-play leading-tight">
                      Nguyễn Hùng Thái
                    </h4>
                    <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide font-mono">
                      Trưởng phòng Chăm sóc Khách hàng
                    </span>
                  </div>

                  <div className="flex flex-col items-end gap-1 text-[9.5px] font-black tracking-widest text-emerald-600 dark:text-emerald-400 uppercase font-mono shrink-0">
                    <span className="px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800">
                      TRẢI NGHIỆM
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800">
                      KẾT NỐI
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-purple-50 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-800">
                      PHÁT TRIỂN
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Lower Section: GIÁ TRỊ CỐT LÕI PHÁT TRIỂN (4 Bento Cards) */}
          <div
            id="card-core-values-pursued"
            className={`w-full p-5 sm:p-6 shadow-md transition-all duration-300 flex flex-col items-start group/values z-10 border text-left rounded-2xl ${getGlassCardClass()}`}
          >
            {/* Tiêu đề Khối */}
            <AnimatedCardTitle
              iconName="trophy"
              title="Giá trị cốt lõi phát triển"
              subtitle="4 nguyên lý định hình phong cách làm việc & kiến tạo thành công bền vững"
              colorPreset="orange"
            />

            {/* 4 Cột Giá Trị Cốt Lõi Bento Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[15px] w-full mt-2">
              {CORE_VALUES_DATA.map((val) => {
                const valIconName =
                  val.number === '01'
                    ? 'heart'
                    : val.number === '02'
                    ? 'target'
                    : val.number === '03'
                    ? 'lightbulb'
                    : 'handshake';

                return (
                  <div
                    key={val.number}
                    className={`relative overflow-hidden flex flex-col justify-between p-4 sm:p-5 bg-gradient-to-br border shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer min-h-[170px] text-left group rounded-2xl ${val.colorTheme.bgGradient} ${val.colorTheme.border}`}
                  >
                    <div
                      className="absolute inset-0 opacity-[0.04] dark:opacity-[0.06] pointer-events-none mix-blend-multiply dark:mix-blend-color-dodge"
                      style={{
                        background: `radial-gradient(circle at bottom right, ${val.colorTheme.primary}, transparent 70%)`,
                      }}
                    />
                    <div className="absolute -right-6 -bottom-6 w-20 h-20 opacity-10 rotate-12 pointer-events-none">
                      <WebIcon name={valIconName} className="w-full h-full" />
                    </div>

                    <div className="flex items-center justify-between relative z-10">
                      <div
                        className={`w-9 h-9 rounded-full border flex items-center justify-center relative transition-transform duration-300 group-hover:scale-110 ${val.colorTheme.iconBg}`}
                      >
                        <WebIcon name={valIconName} className="w-4.5 h-4.5" />
                      </div>
                      <span
                        className={`font-mono font-black text-2xl sm:text-3xl select-none ${val.colorTheme.numberText}`}
                      >
                        {val.number}
                      </span>
                    </div>

                    <div className="mt-3 mb-2 relative z-10 text-left">
                      <h4
                        className={`text-base font-black tracking-normal mb-1 font-play ${val.colorTheme.titleText}`}
                      >
                        {val.titleVi}
                      </h4>
                      <p className="text-[12.5px] sm:text-[13px] text-slate-700 dark:text-slate-300 leading-relaxed font-semibold">
                        {val.descVi}
                      </p>
                    </div>

                    <span
                      className={`text-[9.5px] tracking-widest font-mono font-bold uppercase mt-auto relative z-10 ${val.colorTheme.tagText}`}
                    >
                      {val.idName}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LetterView;
