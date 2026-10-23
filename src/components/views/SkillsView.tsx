'use client';

import React, { useState } from 'react';
import { WebIcon } from '@/components/ui/WebIcon';
import { HeroBanner } from '@/components/ui/HeroBanner';

interface SkillItem {
  name: string;
  percent: number;
  icon: string;
}

interface SkillCardData {
  id: string;
  filterKey: string;
  code: string;
  title: string;
  desc: string;
  averagePercent: number;
  accentColor: string;
  percentColor: string;
  barGradient: string;
  iconBg: string;
  iconBorder: string;
  iconColor: string;
  iconSvg: React.ReactNode;
  ambientGlow: string;
  items: SkillItem[];
}

const SKILL_CARDS: SkillCardData[] = [
  {
    id: 'strength',
    filterKey: 'telecom',
    code: '7.1',
    title: 'Nền Tảng Vận Hành & Lãnh Đạo',
    desc: 'Những năng lực cốt lõi đã được chứng minh qua thực tiễn quản lý, vận hành và phát triển hệ thống Dịch vụ Khách hàng.',
    averagePercent: 96,
    accentColor: '#0284c7',
    percentColor: 'text-sky-600 dark:text-sky-400',
    barGradient: 'from-sky-500 via-blue-600 to-indigo-600',
    iconBg: 'bg-gradient-to-br from-sky-50 to-blue-100/90 dark:from-sky-950/70 dark:to-blue-900/60',
    iconBorder: 'border-sky-200/80 dark:border-sky-500/40',
    iconColor: 'text-sky-600 dark:text-sky-300',
    iconSvg: (
      <svg className="w-[22px] h-[22px] stroke-[2.2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    ambientGlow: 'rgba(2, 132, 199, 0.14)',
    items: [
      { name: 'Trải nghiệm khách hàng', percent: 98, icon: 'heart' },
      { name: 'CRM Contact Center', percent: 96, icon: 'headphones' },
      { name: 'Quản trị Hiệu suất', percent: 96, icon: 'chart' },
      { name: 'Lãnh đạo & Đội ngũ', percent: 95, icon: 'users' },
      { name: 'SOP & Chuẩn hóa', percent: 95, icon: 'shield' },
    ],
  },
  {
    id: 'improve',
    filterKey: 'ecommerce',
    code: '7.2',
    title: 'Nâng Cao Năng Lực Quản Trị',
    desc: 'Những năng lực cần tiếp tục hoàn thiện để nâng tầm vai trò quản lý từ vận hành hiệu quả sang quản trị chiến lược.',
    averagePercent: 87,
    accentColor: '#ea580c',
    percentColor: 'text-amber-600 dark:text-amber-400',
    barGradient: 'from-amber-500 via-orange-500 to-rose-500',
    iconBg: 'bg-gradient-to-br from-amber-50 to-orange-100/90 dark:from-amber-950/70 dark:to-orange-900/60',
    iconBorder: 'border-orange-200/80 dark:border-orange-500/40',
    iconColor: 'text-orange-600 dark:text-orange-300',
    iconSvg: (
      <svg className="w-[22px] h-[22px] stroke-[2.2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
    ambientGlow: 'rgba(234, 88, 12, 0.14)',
    items: [
      { name: 'Tư duy dịch vụ', percent: 92, icon: 'heart' },
      { name: 'Giao tiếp & Đàm phán', percent: 90, icon: 'message' },
      { name: 'Tư duy Chiến lược', percent: 88, icon: 'compass' },
      { name: 'Quản trị Dự án', percent: 88, icon: 'target' },
      { name: 'Công nghệ Đổi mới', percent: 86, icon: 'lightbulb' },
      { name: 'Thiết kế & Lập trình', percent: 78, icon: 'code' },
    ],
  },
  {
    id: 'opportunity',
    filterKey: 'fintech',
    code: '7.3',
    title: 'Công Nghệ & Chuyển Dịch Vụ',
    desc: 'Những năng lực tạo đòn bẩy để nâng cao hiệu quả vận hành, tối ưu nguồn lực và chuyển đổi mô hình CSKH.',
    averagePercent: 90,
    accentColor: '#7c3aed',
    percentColor: 'text-purple-600 dark:text-purple-400',
    barGradient: 'from-purple-500 via-violet-600 to-indigo-600',
    iconBg: 'bg-gradient-to-br from-purple-50 to-violet-100/90 dark:from-purple-950/70 dark:to-violet-900/60',
    iconBorder: 'border-purple-200/80 dark:border-purple-500/40',
    iconColor: 'text-purple-600 dark:text-purple-300',
    iconSvg: (
      <svg className="w-[22px] h-[22px] stroke-[2.2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
    ambientGlow: 'rgba(124, 58, 237, 0.14)',
    items: [
      { name: 'AI & Tự động hóa', percent: 94, icon: 'cpu' },
      { name: 'Kaizen & Cải tiến', percent: 94, icon: 'refresh' },
      { name: 'Cloud & Infrastructure', percent: 88, icon: 'layers' },
    ],
  },
  {
    id: 'threat',
    filterKey: 'esports',
    code: '7.4',
    title: 'Thích Ứng & Quản Trị Biến Động',
    desc: 'Những yếu tố tác động trực tiếp đến chất lượng dịch vụ, nhân sự và hiệu quả vận hành, đòi hỏi khả năng thích ứng chủ động.',
    averagePercent: 93,
    accentColor: '#059669',
    percentColor: 'text-emerald-600 dark:text-emerald-400',
    barGradient: 'from-emerald-500 via-teal-600 to-cyan-600',
    iconBg: 'bg-gradient-to-br from-emerald-50 to-teal-100/90 dark:from-emerald-950/70 dark:to-teal-900/60',
    iconBorder: 'border-emerald-200/80 dark:border-emerald-500/40',
    iconColor: 'text-emerald-600 dark:text-emerald-300',
    iconSvg: (
      <svg className="w-[22px] h-[22px] stroke-[2.2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    ),
    ambientGlow: 'rgba(5, 150, 105, 0.14)',
    items: [
      { name: 'Tối ưu Chi phí', percent: 94, icon: 'wallet' },
      { name: 'AI & Thay đổi CSKH', percent: 92, icon: 'zap' },
      { name: 'AI & Phân tích dữ liệu', percent: 92, icon: 'chart' },
      { name: 'Quản trị Rủi ro', percent: 90, icon: 'shield' },
    ],
  },
];

const FILTER_TABS = [
  { key: 'all', label: 'Tất cả (4)', icon: 'globe' },
  { key: 'telecom', label: 'Viễn thông', icon: 'headphones' },
  { key: 'ecommerce', label: 'E-Commerce', icon: 'card' },
  { key: 'fintech', label: 'FinTech & Bảo hiểm', icon: 'shield' },
  { key: 'esports', label: 'eSports', icon: 'rocket' },
];

export const SkillsView: React.FC = () => {
  const [filter, setFilter] = useState<string>('all');
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState<boolean>(false);

  const filteredCards = SKILL_CARDS.filter((card) => {
    if (filter === 'all') return true;
    return card.filterKey === filter;
  });

  return (
    <div className="w-full h-full flex-1 flex flex-col lg:flex-row gap-[15px] max-w-7xl mx-auto select-none relative text-slate-800 dark:text-slate-100 overflow-hidden">
      {/* 1. VERTICAL HERO BANNER BÊN TRÁI (300PX) */}
      <aside className="w-full lg:w-[300px] min-w-[300px] max-w-[300px] shrink-0 h-full flex flex-col overflow-hidden">
        <HeroBanner
          badgeText="Kỹ năng chuyên môn"
          title="Kỹ Năng Quản Trị"
          titleIcon="bolt"
          badgeColor="text-cyan-300"
          titleColor="text-cyan-300"
          quote="“Tích lũy kiến thức – Nâng cao năng lực – Kiến tạo giá trị bền vững trong thời đại số.”"
          quoteAuthor="— Nguyễn Hùng Thái"
          orientation="vertical"
          className="h-full rounded-[20px]"
        >
          <div className="relative z-10 flex flex-col gap-1.5 w-full pt-2 border-t border-white/20 shrink-0 pointer-events-auto">
            <div className="relative">
              {/* Single Filter Dropdown Button */}
              <button
                type="button"
                onClick={() => setIsFilterDropdownOpen(!isFilterDropdownOpen)}
                className="w-full text-left px-3 py-2 rounded-xl text-[11.5px] font-bold font-play tracking-wide transition-all border cursor-pointer flex items-center justify-between gap-2 bg-white/20 hover:bg-white/30 text-white border-white/30 shadow-md backdrop-blur-md"
              >
                <div className="flex items-center gap-2 truncate">
                  <WebIcon name="filter" className="w-4 h-4 text-cyan-300 shrink-0" />
                  <span className="truncate">
                    Danh mục: {
                      FILTER_TABS.find(c => c.key === filter)?.label || 'Tất cả (4)'
                    }
                  </span>
                </div>
                <svg className={`w-3.5 h-3.5 transition-transform ${isFilterDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Dropdown Menu List */}
              {isFilterDropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-1.5 p-1 rounded-2xl bg-slate-900/95 backdrop-blur-2xl border border-white/20 shadow-2xl z-50 flex flex-col gap-1">
                  {FILTER_TABS.map((item) => {
                    const isActive = filter === item.key;
                    return (
                      <button
                        key={item.key}
                        type="button"
                        onClick={() => {
                          setFilter(item.key);
                          setIsFilterDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 rounded-xl text-[11px] font-bold font-play tracking-wide transition-all border cursor-pointer whitespace-nowrap flex items-center justify-between gap-2 ${
                          isActive
                            ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white border-cyan-300 shadow-md'
                            : 'bg-white/5 hover:bg-white/15 text-white/90 border-white/10'
                        }`}
                      >
                        <div className="flex items-center gap-2 truncate">
                          <WebIcon name={item.icon} className="w-3.5 h-3.5 shrink-0" />
                          <span className="truncate">{item.label}</span>
                        </div>
                        {isActive && <span className="w-1.5 h-1.5 rounded-full bg-cyan-300 shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </HeroBanner>
      </aside>

      {/* 2. MAIN RIGHT AREA: BENTO GRID CARDS */}
      <div className="flex-1 min-w-0 h-full flex flex-col gap-2 overflow-hidden">
        <div className="w-full h-full flex-1 min-h-0 overflow-y-auto no-scrollbar pr-1 pb-2">
          <div
            className={`grid gap-[15px] pb-4 ${
              filteredCards.length === 1
                ? 'grid-cols-1 max-w-2xl mx-auto w-full'
                : 'grid-cols-1 md:grid-cols-2'
            }`}
          >
            {filteredCards.map((card) => {
              return (
                <div
                  key={card.id}
                  className="theme-pastel-card group/skillCard relative rounded-[20px] p-4 bg-white/85 dark:bg-slate-900/60 backdrop-blur-2xl border border-white/90 dark:border-white/20 shadow-[0_10px_30px_-5px_rgba(30,27,75,0.08),0_4px_12px_rgba(0,0,0,0.03)] dark:shadow-[0_12px_36px_-6px_rgba(0,0,0,0.5)] transition-all duration-300 text-left flex flex-col justify-between h-auto min-w-0 overflow-hidden"
                >
                  {/* Soft Ambient Background Glow */}
                  <div
                    className="absolute -top-10 -right-10 w-36 h-36 rounded-full blur-2xl pointer-events-none transition-all duration-500 opacity-60 group-hover/skillCard:opacity-90"
                    style={{ background: card.ambientGlow }}
                  />

                  {/* Hình Nền Icon Thẻ Kỹ Năng */}
                  <div
                    className="absolute -right-4 -bottom-4 w-28 h-28 opacity-15 dark:opacity-10 pointer-events-none select-none transition-all duration-500 group-hover/skillCard:scale-110 group-hover/skillCard:opacity-25"
                    style={{ color: card.accentColor }}
                  >
                    <WebIcon name={card.items[0]?.icon || 'sparkles'} className="w-full h-full" />
                  </div>

                  <div className="relative z-10 space-y-2.5 flex-1 flex flex-col justify-between min-w-0">
                    <div className="space-y-2">
                      {/* Header Row */}
                      <div className="flex items-center justify-between gap-2 min-w-0">
                        <div className="flex items-center gap-2.5 min-w-0 flex-1">
                          <div
                            className={`w-10 h-10 rounded-[12px] shrink-0 flex items-center justify-center shadow-xs border ${card.iconBorder} ${card.iconBg} ${card.iconColor}`}
                          >
                            {card.iconSvg}
                          </div>

                          <div className="min-w-0 flex-1">
                            <h3 className="text-sm sm:text-[15px] font-black font-play text-slate-900 dark:text-white leading-tight truncate">
                              {card.code}. {card.title}
                            </h3>
                            <p className="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                              {card.desc}
                            </p>
                          </div>
                        </div>

                        <div className="shrink-0 text-right">
                          <span className={`text-xs sm:text-sm font-black font-play px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800/90 border border-slate-200 dark:border-white/10 ${card.percentColor}`}>
                            {card.averagePercent}%
                          </span>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="w-full h-1.5 bg-slate-100 dark:bg-white/10 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full bg-gradient-to-r ${card.barGradient} transition-all duration-700 ease-out`}
                          style={{ width: `${card.averagePercent}%` }}
                        />
                      </div>
                    </div>

                    {/* Skill Items Grid (2 columns or list) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-1 flex-1">
                      {card.items.map((item) => (
                        <div
                          key={item.name}
                          className="p-2 rounded-xl bg-slate-50/90 dark:bg-slate-800/60 hover:bg-white dark:hover:bg-slate-800 border border-slate-200/70 dark:border-white/10 shadow-2xs flex items-center justify-between gap-2 min-w-0"
                        >
                          <div className="flex items-center gap-2 min-w-0 flex-1">
                            <span
                              className="w-5 h-5 rounded-md flex items-center justify-center shrink-0 shadow-2xs"
                              style={{
                                background: `${card.accentColor}18`,
                                color: card.accentColor,
                              }}
                            >
                              <WebIcon name={item.icon} className="w-3 h-3" />
                            </span>
                            <span className="text-xs font-bold text-slate-800 dark:text-slate-100 truncate">
                              {item.name}
                            </span>
                          </div>

                          <div className="flex items-center gap-1.5 shrink-0">
                            <span
                              className="text-[10.5px] font-mono font-black px-1.5 py-0.2 rounded shadow-2xs"
                              style={{
                                background: `${card.accentColor}14`,
                                color: card.accentColor,
                              }}
                            >
                              {item.percent}%
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Subtle Bottom Accent Line */}
                  <div
                    className="w-full h-0.5 rounded-full mt-2.5 opacity-60 shrink-0"
                    style={{ background: card.accentColor }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
