/* Self-contained Testimonial Fanned Stack Component
   Spec: Light shadcn section register
   - Ground: #FAFAFA
   - Card: #FFFFFF
   - Ink: #09090B
   - Muted: #71717A
   - Border: #E4E4E7 (1px hairline)
   - Accent: #4F46E5 (Indigo)
   - Shadow: 0 1px 2px rgba(9, 9, 11, 0.04)
   - Radii: 12px to 16px
   - Typography: Inter 400 (body), 600 (names & titles), 700 (heading)
   - Easing: cubic-bezier(0.16, 1, 0.3, 1)
   - Mechanics: Fanned stack of portrait cards with active one upright, wrapped loop distance,
     drawn portrait placeholder + initial-based coloured disc avatar (zero image dependency),
     progressive responsive reflow (no overflow at 390px), and plain readable list fallback
     under prefers-reduced-motion. */
'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight, List, Layers } from 'lucide-react';

export interface HomeFannedTestimonialsProps {
  isDark?: boolean;
  onNavigateContact: () => void;
  onNavigatePage?: (pageId: number) => void;
}

export interface FannedCardItem {
  id: string;
  name: string;
  role: string;
  quote: string;
  metric: string;
  metricLabel: string;
  initials: string;
  discColor: string;
  targetPage: number;
}

export const TESTIMONIAL_DATA: FannedCardItem[] = [
  {
    id: 'exp-lead',
    name: 'Nguyễn Hùng Thái',
    role: 'Customer Service & CX Leader',
    quote:
      'Với hơn 22 năm quản lý Contact Center & CX đa kênh, dẫn dắt đội ngũ 100+ nhân sự và chuẩn hóa chất lượng phục vụ qua 8 tập đoàn lớn.',
    metric: '22+',
    metricLabel: 'Năm kinh nghiệm',
    initials: 'HT',
    discColor: '#4F46E5',
    targetPage: 2,
  },
  {
    id: 'people-lead',
    name: 'Lãnh Đạo 100+ Nhân Sự',
    role: 'Quy Mô Quản Trị Thực Chiến',
    quote:
      'Xây dựng văn hóa phục vụ tận tâm, đào tạo quy chuẩn nghiệp vụ & gắn kết đội ngũ vững mạnh với tỷ lệ gắn kết cao nhất toàn ngành.',
    metric: '100+',
    metricLabel: 'Nhân sự quản lý',
    initials: 'LĐ',
    discColor: '#4338CA',
    targetPage: 2,
  },
  {
    id: 'ai-cx',
    name: 'Chuyên Gia Tự Động Hóa',
    role: 'Tư Duy Đột Phá AI & CX',
    quote:
      'Ứng dụng AI Agent, Voicebot và CRM thông minh nâng cao CSAT 98%, cá nhân hóa hành trình chạm và giảm thời gian chờ của khách hàng.',
    metric: 'CX',
    metricLabel: 'Chuyên gia số hóa',
    initials: 'AI',
    discColor: '#6366F1',
    targetPage: 5,
  },
  {
    id: 'csat-metric',
    name: 'Chất Lượng Trải Nghiệm',
    role: 'CSAT 98% · Khách Hàng Hài Lòng',
    quote:
      'Hệ thống khảo sát đa kênh tức thời, cá nhân hóa hành trình chạm và giải quyết triệt để khiếu nại ngay lần gọi đầu tiên (FCR).',
    metric: '98%',
    metricLabel: 'Hài lòng (CSAT)',
    initials: 'CS',
    discColor: '#3730A3',
    targetPage: 5,
  },
  {
    id: 'ops-247',
    name: 'Vận Hành Đa Kênh 24/7',
    role: 'Contact Center 24/7 · SLA Realtime',
    quote:
      'Giám sát chỉ số SLA, AHT, FCR và Abandonment Rate liên tục theo bảng điều khiển thời gian thực chuẩn quốc tế.',
    metric: '24/7',
    metricLabel: 'SLA Cam Kết',
    initials: 'OM',
    discColor: '#4F46E5',
    targetPage: 5,
  },
  {
    id: 'rpa-workflow',
    name: 'AI Agent & Workflow Tự Động',
    role: 'Công Nghệ AI Tiên Phong',
    quote:
      'Phân luồng ticket thông minh, tự động trả lời tự nhiên và tối ưu 25% chi phí vận hành dịch vụ khách hàng.',
    metric: '-25%',
    metricLabel: 'Chi phí vận hành',
    initials: 'WF',
    discColor: '#4338CA',
    targetPage: 7,
  },
  {
    id: 'talent-dev',
    name: 'Phát Triển Đội Ngũ',
    role: 'Lãnh Đạo & Huấn Luyện 100+ NS',
    quote:
      'Quy hoạch lộ trình thăng tiến nhân sự, tỷ lệ gắn kết cao và tỷ lệ nghỉ việc thấp nhất ngành qua các dự án quy mô lớn.',
    metric: '100+',
    metricLabel: 'Đội ngũ phụ trách',
    initials: 'HL',
    discColor: '#6366F1',
    targetPage: 2,
  },
  {
    id: 'bi-csuite',
    name: 'Phân Tích Dữ Liệu Lớn',
    role: 'Dashboard Power BI C-Level',
    quote:
      'Trực quan hóa toàn diện bức tranh vận hành, báo cáo phân tích xu hướng phục vụ ra quyết định ban điều hành thời gian thực.',
    metric: 'Realtime',
    metricLabel: 'Dữ liệu C-Suite',
    initials: 'BI',
    discColor: '#312E81',
    targetPage: 7,
  },
  {
    id: 'cost-roi',
    name: 'Hiệu Quả Tài Chính',
    role: 'Giảm 25% Cost-to-Serve',
    quote:
      'Tối ưu định mức chi phí trên từng cuộc gọi/tin nhắn, nâng cao năng suất phục vụ khách hàng trên mỗi nhân sự.',
    metric: 'Top 1',
    metricLabel: 'Hiệu suất dẫn đầu',
    initials: 'TC',
    discColor: '#4F46E5',
    targetPage: 7,
  },
];

/**
 * Special Component 1: Initial-based avatar on a coloured disc with zero image dependency.
 */
const InitialDiscAvatar: React.FC<{
  initials: string;
  discColor: string;
  size?: 'sm' | 'md';
}> = ({ initials, discColor, size = 'md' }) => {
  const dimensions = size === 'sm' ? 'w-8 h-8 text-[11px]' : 'w-9 h-9 text-xs';
  return (
    <div
      className={`${dimensions} shrink-0 rounded-full flex items-center justify-center font-semibold tracking-tight text-white select-none`}
      style={{
        backgroundColor: discColor,
        boxShadow: '0 1px 2px rgba(9, 9, 11, 0.04)',
      }}
      aria-hidden="true"
    >
      {initials}
    </div>
  );
};

/**
 * Special Component 2: Drawn Portrait Placeholder inside the Portrait Card.
 * Structured as a self-contained aspect-ratio frame so swapping in an <img />
 * leaves the card stacking, rotation, and z-order untouched.
 */
const DrawnPortraitIllustration: React.FC<{
  initials: string;
  discColor: string;
  metric: string;
  metricLabel: string;
  isDark?: boolean;
}> = ({ initials, discColor, metric, metricLabel, isDark = false }) => {
  return (
    <div
      className={`relative w-full h-full flex flex-col items-center justify-between p-2.5 rounded-[10px] border overflow-hidden select-none transition-colors duration-300 ${
        isDark
          ? 'bg-[#0F172A] border-slate-700/80'
          : 'bg-[#FAFAFA] border-[#E4E4E7]'
      }`}
    >
      {/* Top Row: Initials Disc Badge & Metric Tag */}
      <div className="w-full flex items-center justify-between gap-1 z-10">
        <span
          className="inline-flex items-center justify-center w-6 h-6 rounded-full text-[10px] font-semibold text-white shrink-0"
          style={{ backgroundColor: discColor }}
        >
          {initials}
        </span>
        <span
          className={`px-1.5 py-0.5 rounded-[6px] text-[10px] font-semibold border leading-none truncate ${
            isDark
              ? 'bg-[#1E293B] text-[#818CF8] border-slate-700'
              : 'bg-[#FFFFFF] text-[#4F46E5] border-[#E4E4E7]'
          }`}
        >
          {metric}
        </span>
      </div>

      {/* Center: Drawn Architectural / Portrait Line Art SVG (No Photography) */}
      <div className="relative my-auto flex items-center justify-center w-full py-1">
        <svg
          viewBox="0 0 96 96"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-16 h-16 sm:w-[72px] sm:h-[72px]"
          aria-hidden="true"
        >
          {/* Outer technical registration ring */}
          <circle
            cx="48"
            cy="48"
            r="42"
            stroke={isDark ? '#334155' : '#E4E4E7'}
            strokeWidth="1"
            strokeDasharray="3 3"
          />
          {/* Coloured disc ground */}
          <circle
            cx="48"
            cy="48"
            r="34"
            fill={discColor}
            fillOpacity={isDark ? '0.18' : '0.08'}
            stroke={discColor}
            strokeWidth="1.25"
          />
          {/* Drawn Bust / Portrait Silhouette */}
          <circle
            cx="48"
            cy="37"
            r="11.5"
            fill={isDark ? '#1E293B' : '#FFFFFF'}
            stroke={discColor}
            strokeWidth="1.75"
          />
          {/* Subtle facial line construction */}
          <path
            d="M44 36.5H52M48 33V40"
            stroke={discColor}
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeOpacity="0.45"
          />
          {/* Drawn Shoulders */}
          <path
            d="M27 72C27 60.9543 36.402 52 48 52C59.598 52 69 60.9543 69 72"
            fill={isDark ? '#1E293B' : '#FFFFFF'}
          />
          <path
            d="M27 72C27 60.9543 36.402 52 48 52C59.598 52 69 60.9543 69 72"
            stroke={discColor}
            strokeWidth="1.75"
            strokeLinecap="round"
          />
          {/* Collar accent detail */}
          <path
            d="M41 53.5L48 62L55 53.5"
            stroke={isDark ? '#818CF8' : '#4F46E5'}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Bottom Caption inside Portrait Frame */}
      <div
        className={`w-full pt-1.5 border-t flex items-center justify-between text-[10px] font-normal truncate ${
          isDark
            ? 'border-slate-700/80 text-slate-400'
            : 'border-[#E4E4E7] text-[#71717A]'
        }`}
      >
        <span className="truncate">{metricLabel}</span>
        <span
          className={`font-semibold shrink-0 ml-1 ${
            isDark ? 'text-slate-100' : 'text-[#09090B]'
          }`}
        >
          {initials}
        </span>
      </div>
    </div>
  );
};

export const HomeFannedTestimonials: React.FC<HomeFannedTestimonialsProps> = ({
  isDark = false,
  onNavigateContact,
  onNavigatePage,
}) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(false);
  const [manualListMode, setManualListMode] = useState<boolean>(false);
  const total = TESTIMONIAL_DATA.length;

  // Detect OS / Browser prefers-reduced-motion setting
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
      setPrefersReducedMotion(mq.matches);
      const listener = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
      mq.addEventListener('change', listener);
      return () => mq.removeEventListener('change', listener);
    }
  }, []);

  const isReducedMotionLayout = prefersReducedMotion || manualListMode;

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Keyboard left/right support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev]);

  /**
   * Distance to active is computed with a wrap, making the deck a continuous loop
   * rather than a bounded line. Range: [-floor(N/2), +floor(N/2)]
   */
  const getWrappedDistance = useCallback(
    (index: number) => {
      let diff = (index - activeIndex) % total;
      if (diff > total / 2) diff -= total;
      if (diff < -total / 2) diff += total;
      return diff;
    },
    [activeIndex, total]
  );

  const handleAction = (targetPage: number) => {
    if (onNavigatePage) {
      onNavigatePage(targetPage);
    } else {
      onNavigateContact();
    }
  };

  const activeItem = TESTIMONIAL_DATA[activeIndex];

  /* =========================================================================
     SPECIAL COMPONENT 3: REDUCED-MOTION FALLBACK
     Changes the layout to a plain readable list rather than freezing animation
     ========================================================================= */
  if (isReducedMotionLayout) {
    return (
      <section
        aria-label="Dấu Ấn Vận Hành & Năng Lực"
        style={{ fontFamily: "'Inter', var(--font-family-base), sans-serif" }}
        className={`relative z-10 self-end ml-auto w-full max-w-[540px] mt-auto select-none rounded-[14px] p-3.5 sm:p-4 border transition-colors duration-300 ${
          isDark
            ? 'bg-slate-900/90 backdrop-blur-xl text-slate-100 border-slate-700/80 shadow-[0_12px_32px_rgba(0,0,0,0.45)]'
            : 'bg-[#FAFAFA] text-[#09090B] border-[#E4E4E7] shadow-[0_1px_2px_rgba(9,9,11,0.04)]'
        }`}
      >
        {/* Top Header */}
        <div
          className={`flex items-center justify-between gap-2 pb-2.5 border-b ${
            isDark ? 'border-slate-700/80' : 'border-[#E4E4E7]'
          }`}
        >
          <div className="flex items-center gap-2 min-w-0">
            <span className={`w-2 h-2 rounded-full shrink-0 ${isDark ? 'bg-[#818CF8]' : 'bg-[#4F46E5]'}`} />
            <h2
              className={`font-bold text-xs sm:text-[13px] uppercase tracking-wider truncate ${
                isDark ? 'text-slate-100' : 'text-[#09090B]'
              }`}
            >
              Dấu Ấn Vận Hành & Năng Lực
            </h2>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className={`text-xs font-normal ${isDark ? 'text-slate-400' : 'text-[#71717A]'}`}>
              {activeIndex + 1} / {total}
            </span>
            {!prefersReducedMotion && (
              <button
                type="button"
                onClick={() => setManualListMode(false)}
                title="Chuyển sang chế độ xếp quạt (Fanned Stack)"
                className={`inline-flex items-center gap-1 px-2 py-1 rounded-[8px] text-[11px] font-semibold border cursor-pointer ${
                  isDark
                    ? 'bg-slate-800 text-slate-100 border-slate-700 hover:border-[#818CF8] hover:text-[#818CF8]'
                    : 'bg-[#FFFFFF] text-[#09090B] border-[#E4E4E7] hover:border-[#4F46E5] hover:text-[#4F46E5] shadow-[0_1px_2px_rgba(9,9,11,0.04)]'
                }`}
                style={{ transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)' }}
              >
                <Layers className="w-3 h-3" />
                <span>Xếp quạt</span>
              </button>
            )}
          </div>
        </div>

        {/* Readable Plain List Equivalent */}
        <div className="py-2.5 space-y-2 max-h-[230px] overflow-y-auto pr-1">
          {TESTIMONIAL_DATA.map((item, idx) => {
            const isCurrent = idx === activeIndex;
            return (
              <article
                key={item.id}
                onClick={() => setActiveIndex(idx)}
                className={`p-3 rounded-[12px] border cursor-pointer transition-colors ${
                  isDark
                    ? isCurrent
                      ? 'bg-slate-800/95 border-[#818CF8]'
                      : 'bg-slate-800/75 border-slate-700/80'
                    : isCurrent
                    ? 'bg-[#FFFFFF] border-[#4F46E5]'
                    : 'bg-[#FFFFFF] border-[#E4E4E7]'
                }`}
                style={{ boxShadow: '0 1px 2px rgba(9, 9, 11, 0.04)' }}
              >
                <div className="flex items-center justify-between gap-2.5">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <InitialDiscAvatar initials={item.initials} discColor={item.discColor} size="sm" />
                    <div className="min-w-0">
                      <h3
                        className={`font-semibold text-xs truncate ${
                          isDark ? 'text-slate-100' : 'text-[#09090B]'
                        }`}
                      >
                        {item.name}
                      </h3>
                      <p
                        className={`font-semibold text-[11px] truncate ${
                          isDark ? 'text-slate-400' : 'text-[#71717A]'
                        }`}
                      >
                        {item.role}
                      </p>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span
                      className={`inline-block px-2 py-0.5 rounded-[8px] text-[11px] font-semibold border ${
                        isDark
                          ? 'text-[#818CF8] bg-slate-900 border-slate-700'
                          : 'text-[#4F46E5] bg-[#FAFAFA] border-[#E4E4E7]'
                      }`}
                    >
                      {item.metric}
                    </span>
                  </div>
                </div>
                <p
                  className={`mt-2 font-normal text-xs leading-relaxed ${
                    isDark ? 'text-slate-200' : 'text-[#09090B]'
                  }`}
                >
                  {item.quote}
                </p>
              </article>
            );
          })}
        </div>

        {/* Footer Controls */}
        <div
          className={`pt-2.5 border-t flex items-center justify-between gap-2 ${
            isDark ? 'border-slate-700/80' : 'border-[#E4E4E7]'
          }`}
        >
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Thẻ trước"
              className={`w-7 h-7 rounded-[8px] flex items-center justify-center border cursor-pointer ${
                isDark
                  ? 'border-slate-700 bg-slate-800 text-slate-100 hover:border-[#818CF8] hover:text-[#818CF8]'
                  : 'border-[#E4E4E7] bg-[#FFFFFF] text-[#09090B] hover:border-[#4F46E5] hover:text-[#4F46E5]'
              }`}
              style={{ boxShadow: '0 1px 2px rgba(9, 9, 11, 0.04)' }}
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Thẻ tiếp theo"
              className={`w-7 h-7 rounded-[8px] flex items-center justify-center border cursor-pointer ${
                isDark
                  ? 'border-slate-700 bg-slate-800 text-slate-100 hover:border-[#818CF8] hover:text-[#818CF8]'
                  : 'border-[#E4E4E7] bg-[#FFFFFF] text-[#09090B] hover:border-[#4F46E5] hover:text-[#4F46E5]'
              }`}
              style={{ boxShadow: '0 1px 2px rgba(9, 9, 11, 0.04)' }}
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <button
            type="button"
            onClick={() => handleAction(activeItem.targetPage)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[10px] text-xs font-semibold bg-[#4F46E5] text-[#FFFFFF] hover:opacity-95 cursor-pointer"
            style={{ boxShadow: '0 1px 2px rgba(9, 9, 11, 0.04)' }}
          >
            <span>Khám phá</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>
    );
  }

  /* =========================================================================
     STANDARD FANNED STACK OF PORTRAIT CARDS (Light Shadcn & Dark Neon Register)
     - Light Mode: Ground #FAFAFA, Card #FFFFFF, Border 1px #E4E4E7, Accent #4F46E5
     - Dark Mode: Ground slate-900/90, Card #1E293B, Border slate-700/80, Accent #818CF8
     ========================================================================= */
  return (
    <section
      aria-label="Dấu Ấn Vận Hành & Năng Lực"
      style={{ fontFamily: "'Inter', var(--font-family-base), sans-serif" }}
      className="relative z-10 self-end ml-auto w-full max-w-[540px] mt-auto select-none"
    >
      {/* Ground Container */}
      <div
        className={`w-full rounded-[14px] p-3 sm:p-4 border overflow-hidden transition-colors duration-300 ${
          isDark
            ? 'bg-slate-900/90 backdrop-blur-xl text-slate-100 border-slate-700/80'
            : 'bg-[#FAFAFA] text-[#09090B] border-[#E4E4E7]'
        }`}
        style={{
          boxShadow: isDark
            ? '0 12px 32px rgba(0, 0, 0, 0.45), 0 0 0 1px rgba(129, 140, 248, 0.15)'
            : '0 1px 2px rgba(9, 9, 11, 0.04)',
        }}
      >
        {/* Section Heading Bar (Inter 700) */}
        <div
          className={`flex items-center justify-between gap-2 pb-2.5 mb-3 border-b ${
            isDark ? 'border-slate-700/80' : 'border-[#E4E4E7]'
          }`}
        >
          <div className="flex items-center gap-2 min-w-0">
            <span className={`w-2 h-2 rounded-full shrink-0 ${isDark ? 'bg-[#818CF8]' : 'bg-[#4F46E5]'}`} />
            <h2
              className={`font-bold text-xs sm:text-[13px] uppercase tracking-wider truncate ${
                isDark ? 'text-slate-100' : 'text-[#09090B]'
              }`}
            >
              Dấu Ấn Vận Hành & Năng Lực
            </h2>
          </div>

          {/* Counter + Prev/Next Controls */}
          <div className="flex items-center gap-1.5 shrink-0">
            <span className={`text-[11px] font-semibold mr-1 ${isDark ? 'text-slate-400' : 'text-[#71717A]'}`}>
              {activeIndex + 1} / {total}
            </span>
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Thẻ trước"
              className={`w-7 h-7 rounded-[8px] flex items-center justify-center border active:scale-95 cursor-pointer ${
                isDark
                  ? 'border-slate-700 bg-[#1E293B] text-slate-100 hover:border-[#818CF8] hover:text-[#818CF8]'
                  : 'border-[#E4E4E7] bg-[#FFFFFF] text-[#09090B] hover:border-[#4F46E5] hover:text-[#4F46E5]'
              }`}
              style={{
                boxShadow: '0 1px 2px rgba(9, 9, 11, 0.04)',
                transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              <ChevronLeft className="w-3.5 h-3.5 stroke-[2]" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Thẻ tiếp theo"
              className={`w-7 h-7 rounded-[8px] flex items-center justify-center border active:scale-95 cursor-pointer ${
                isDark
                  ? 'border-slate-700 bg-[#1E293B] text-slate-100 hover:border-[#818CF8] hover:text-[#818CF8]'
                  : 'border-[#E4E4E7] bg-[#FFFFFF] text-[#09090B] hover:border-[#4F46E5] hover:text-[#4F46E5]'
              }`}
              style={{
                boxShadow: '0 1px 2px rgba(9, 9, 11, 0.04)',
                transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              <ChevronRight className="w-3.5 h-3.5 stroke-[2]" />
            </button>
            <button
              type="button"
              onClick={() => setManualListMode(true)}
              title="Chế độ danh sách đơn giản (Reduced Motion)"
              aria-label="Chuyển sang chế độ danh sách"
              className={`w-7 h-7 rounded-[8px] flex items-center justify-center border active:scale-95 cursor-pointer ${
                isDark
                  ? 'border-slate-700 bg-[#1E293B] text-slate-400 hover:border-[#818CF8] hover:text-[#818CF8]'
                  : 'border-[#E4E4E7] bg-[#FFFFFF] text-[#71717A] hover:border-[#4F46E5] hover:text-[#4F46E5]'
              }`}
              style={{
                boxShadow: '0 1px 2px rgba(9, 9, 11, 0.04)',
                transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              <List className="w-3.5 h-3.5 stroke-[2]" />
            </button>
          </div>
        </div>

        {/* Responsive Grid: 2 columns on sm+, progressive reflow to 1 column at <= 390px */}
        <div className="grid grid-cols-1 sm:grid-cols-[172px_1fr] gap-3 sm:gap-4 items-center">
          {/* COLUMN 1: Fanned Stack of Portrait Cards (Active Upright, Wrapped Loop) */}
          <div className="relative w-full h-[176px] sm:h-[192px] flex items-center justify-center overflow-visible">
            {TESTIMONIAL_DATA.map((item, idx) => {
              const diff = getWrappedDistance(idx);
              const absDiff = Math.abs(diff);
              const isVisible = absDiff <= 2;
              const isActive = diff === 0;

              // Fanned stack geometry: active card upright (0deg), others fanned along an arc
              const rotateDeg = diff * 7.5;
              const translateX = diff * 16;
              const translateY = absDiff * 6;
              const scale = 1 - absDiff * 0.055;
              const zIndex = 20 - absDiff;
              const opacity = isVisible ? (isActive ? 1 : Math.max(0.35, 0.88 - absDiff * 0.24)) : 0;

              return (
                <div
                  key={item.id}
                  onClick={() => {
                    if (!isActive) setActiveIndex(idx);
                  }}
                  role="button"
                  tabIndex={isActive ? 0 : -1}
                  aria-label={`${item.name} - ${item.metric} ${item.metricLabel}`}
                  style={{
                    transform: `translate3d(${translateX}px, ${translateY}px, 0) rotate(${rotateDeg}deg) scale(${scale})`,
                    zIndex,
                    opacity,
                    pointerEvents: isVisible ? 'auto' : 'none',
                    boxShadow: '0 1px 2px rgba(9, 9, 11, 0.04)',
                    transition:
                      'transform 0.55s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.45s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                  className={`w-[122px] h-[162px] sm:w-[128px] sm:h-[174px] rounded-[14px] p-1.5 border cursor-pointer select-none flex flex-col ${
                    isDark
                      ? isActive
                        ? 'bg-[#1E293B] border-[#818CF8]'
                        : 'bg-[#1E293B] border-slate-700/80'
                      : isActive
                      ? 'bg-[#FFFFFF] border-[#4F46E5]'
                      : 'bg-[#FFFFFF] border-[#E4E4E7]'
                  }`}
                >
                  {/* Drawn Portrait Placeholder Frame (Swapping in an <img /> leaves stacking/rotation/z-order untouched) */}
                  <DrawnPortraitIllustration
                    initials={item.initials}
                    discColor={item.discColor}
                    metric={item.metric}
                    metricLabel={item.metricLabel}
                    isDark={isDark}
                  />
                </div>
              );
            })}
          </div>

          {/* COLUMN 2: Active Testimonial Content Card */}
          <div
            className={`w-full h-full rounded-[14px] p-3.5 border flex flex-col justify-between text-left min-w-0 ${
              isDark
                ? 'bg-[#1E293B] border-slate-700/80'
                : 'bg-[#FFFFFF] border-[#E4E4E7]'
            }`}
            style={{
              boxShadow: '0 1px 2px rgba(9, 9, 11, 0.04)',
              transition: 'all 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            {/* Author Row: Initial-based Coloured Disc + Name (600) + Role (600) + Metric */}
            <div className="flex items-start justify-between gap-2.5">
              <div className="flex items-center gap-2.5 min-w-0">
                <InitialDiscAvatar
                  initials={activeItem.initials}
                  discColor={activeItem.discColor}
                  size="md"
                />
                <div className="min-w-0">
                  <h3
                    className={`font-semibold text-[13px] sm:text-sm truncate leading-snug ${
                      isDark ? 'text-slate-100' : 'text-[#09090B]'
                    }`}
                  >
                    {activeItem.name}
                  </h3>
                  <p
                    className={`font-semibold text-[11px] truncate leading-snug mt-0.5 ${
                      isDark ? 'text-slate-400' : 'text-[#71717A]'
                    }`}
                  >
                    {activeItem.role}
                  </p>
                </div>
              </div>

              {/* Single Indigo Accent Metric Badge */}
              <div className="shrink-0 text-right">
                <span
                  className={`inline-block px-2 py-0.5 rounded-[8px] text-[11px] font-semibold border ${
                    isDark
                      ? 'text-[#818CF8] bg-[#0F172A] border-slate-700'
                      : 'text-[#4F46E5] bg-[#FAFAFA] border-[#E4E4E7]'
                  }`}
                >
                  {activeItem.metric}
                </span>
                <div
                  className={`text-[10px] font-normal mt-0.5 ${
                    isDark ? 'text-slate-400' : 'text-[#71717A]'
                  }`}
                >
                  {activeItem.metricLabel}
                </div>
              </div>
            </div>

            {/* Testimonial Quote Body (Inter 400) */}
            <blockquote
              className={`my-3 font-normal text-xs sm:text-[13px] leading-relaxed ${
                isDark ? 'text-slate-200' : 'text-[#09090B]'
              }`}
            >
              “{activeItem.quote}”
            </blockquote>

            {/* Card Bottom Rail: Loop Dots + Indigo Action Link */}
            <div
              className={`pt-2.5 border-t flex items-center justify-between gap-2 ${
                isDark ? 'border-slate-700/80' : 'border-[#E4E4E7]'
              }`}
            >
              {/* Loop Progress Rail */}
              <div className="flex items-center gap-1 overflow-hidden">
                {TESTIMONIAL_DATA.map((item, i) => {
                  const isCurrent = i === activeIndex;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setActiveIndex(i)}
                      aria-label={`Chuyển đến thẻ ${i + 1}: ${item.name}`}
                      style={{
                        transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                      }}
                      className={`h-1.5 rounded-full cursor-pointer ${
                        isCurrent
                          ? isDark
                            ? 'w-4 bg-[#818CF8]'
                            : 'w-4 bg-[#4F46E5]'
                          : isDark
                          ? 'w-1.5 bg-slate-700 hover:bg-slate-500'
                          : 'w-1.5 bg-[#E4E4E7] hover:bg-[#71717A]'
                      }`}
                    />
                  );
                })}
              </div>

              {/* Action CTA */}
              <button
                type="button"
                onClick={() => handleAction(activeItem.targetPage)}
                className={`inline-flex items-center gap-1 text-xs font-semibold hover:opacity-85 active:scale-95 cursor-pointer shrink-0 ${
                  isDark ? 'text-[#818CF8]' : 'text-[#4F46E5]'
                }`}
                style={{ transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)' }}
              >
                <span>Khám phá</span>
                <ArrowRight className="w-3.5 h-3.5 stroke-[2]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
