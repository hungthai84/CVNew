'use client';

import React, { useState } from 'react';
import { WebIcon } from '@/components/ui/WebIcon';
import { HeroBanner } from '@/components/ui/HeroBanner';

interface SkillItem {
  name: string;
  percent: number;
  icon: string;
  desc?: string;
}

interface SkillCardData {
  id: string;
  filterKey: string;
  code: string;
  category: string;
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
    filterKey: 'strength',
    code: '7.1',
    category: 'Điểm mạnh (Strengths)',
    title: 'Nền Tảng Vận Hành',
    desc: 'Những năng lực cốt lõi đã được chứng minh qua thực tiễn quản lý, vận hành và phát triển hệ thống Dịch vụ Khách hàng.',
    averagePercent: 96,
    accentColor: '#0284c7',
    percentColor: 'text-sky-600 dark:text-sky-400',
    barGradient: 'from-sky-500 via-blue-600 to-indigo-600',
    iconBg: 'bg-gradient-to-br from-sky-50 to-blue-100/90 dark:from-sky-950/70 dark:to-blue-900/60',
    iconBorder: 'border-sky-200/80 dark:border-sky-500/40',
    iconColor: 'text-sky-600 dark:text-sky-300',
    iconSvg: (
      <svg className="w-6 h-6 stroke-[2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    ambientGlow: 'rgba(2, 132, 199, 0.12)',
    items: [
      { name: 'Trải nghiệm KH', percent: 98, icon: 'heart' },
      { name: 'CRM Center', percent: 96, icon: 'headphones' },
      { name: 'Hiệu suất SLA', percent: 96, icon: 'chart' },
      { name: 'Lãnh đạo Team', percent: 95, icon: 'users' },
      { name: 'SOP Chuẩn hóa', percent: 95, icon: 'shield' },
      { name: 'Xử lý Sự cố', percent: 94, icon: 'sparkles' },
    ],
  },
  {
    id: 'improve',
    filterKey: 'improve',
    code: '7.2',
    category: 'Hoàn thiện (Growth)',
    title: 'Năng Lực Quản Trị',
    desc: 'Những năng lực cần tiếp tục hoàn thiện để nâng tầm vai trò quản lý từ vận hành hiệu quả sang quản trị chiến lược và phát triển bền vững.',
    averagePercent: 87,
    accentColor: '#ea580c',
    percentColor: 'text-amber-600 dark:text-amber-400',
    barGradient: 'from-amber-500 via-orange-500 to-rose-500',
    iconBg: 'bg-gradient-to-br from-amber-50 to-orange-100/90 dark:from-amber-950/70 dark:to-orange-900/60',
    iconBorder: 'border-orange-200/80 dark:border-orange-500/40',
    iconColor: 'text-orange-600 dark:text-orange-300',
    iconSvg: (
      <svg className="w-6 h-6 stroke-[2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
    ambientGlow: 'rgba(234, 88, 12, 0.12)',
    items: [
      { name: 'Tư duy Dịch vụ', percent: 92, icon: 'heart' },
      { name: 'Đàm phán Giao tiếp', percent: 90, icon: 'message' },
      { name: 'Tư duy Chiến lược', percent: 88, icon: 'compass' },
      { name: 'Quản trị Dự án', percent: 88, icon: 'target' },
      { name: 'Đổi mới Sáng tạo', percent: 86, icon: 'lightbulb' },
      { name: 'Kỹ thuật Lập trình', percent: 78, icon: 'code' },
    ],
  },
  {
    id: 'opportunity',
    filterKey: 'opportunity',
    code: '7.3',
    category: 'Cơ hội (Opportunities)',
    title: 'Công Nghệ Chuyển Đổi',
    desc: 'Những năng lực tạo đòn bẩy để nâng cao hiệu quả vận hành, tối ưu nguồn lực và chuyển đổi mô hình Dịch vụ Khách hàng trong thời đại số.',
    averagePercent: 92,
    accentColor: '#7c3aed',
    percentColor: 'text-purple-600 dark:text-purple-400',
    barGradient: 'from-purple-500 via-violet-600 to-indigo-600',
    iconBg: 'bg-gradient-to-br from-purple-50 to-violet-100/90 dark:from-purple-950/70 dark:to-violet-900/60',
    iconBorder: 'border-purple-200/80 dark:border-purple-500/40',
    iconColor: 'text-purple-600 dark:text-purple-300',
    iconSvg: (
      <svg className="w-6 h-6 stroke-[2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
    ambientGlow: 'rgba(124, 58, 237, 0.12)',
    items: [
      { name: 'AI Tự động hóa', percent: 94, icon: 'cpu' },
      { name: 'Kaizen Cải tiến', percent: 94, icon: 'refresh' },
      { name: 'Tối ưu Chi phí', percent: 93, icon: 'card' },
      { name: 'Chuyển đổi Số', percent: 92, icon: 'globe' },
      { name: 'Quản trị Dữ liệu', percent: 91, icon: 'database' },
      { name: 'Hạ tầng Hệ thống', percent: 87, icon: 'layers' },
    ],
  },
  {
    id: 'threat',
    filterKey: 'threat',
    code: '7.4',
    category: 'Thách thức (Threats)',
    title: 'Thích Ứng Biến Động',
    desc: 'Những yếu tố tác động trực tiếp đến chất lượng dịch vụ, nhân sự và hiệu quả vận hành, đòi hỏi khả năng thích ứng và quản trị chủ động.',
    averagePercent: 90,
    accentColor: '#e11d48',
    percentColor: 'text-rose-600 dark:text-rose-400',
    barGradient: 'from-rose-500 via-pink-600 to-red-500',
    iconBg: 'bg-gradient-to-br from-rose-50 to-pink-100/90 dark:from-rose-950/70 dark:to-pink-900/60',
    iconBorder: 'border-rose-200/80 dark:border-rose-500/40',
    iconColor: 'text-rose-600 dark:text-rose-300',
    iconSvg: (
      <svg className="w-6 h-6 stroke-[2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    ),
    ambientGlow: 'rgba(225, 29, 72, 0.12)',
    items: [
      { name: 'Tối ưu Chi phí', percent: 94, icon: 'wallet' },
      { name: 'Thay đổi CSKH', percent: 92, icon: 'zap' },
      { name: 'Công nghệ Mới', percent: 90, icon: 'rocket' },
      { name: 'Quản trị Rủi ro', percent: 90, icon: 'shield' },
      { name: 'Giữ chân Nhân sự', percent: 88, icon: 'users' },
      { name: 'Kết nối Liên phòng', percent: 86, icon: 'network' },
    ],
  },
  {
    id: 'language',
    filterKey: 'language',
    code: '7.5',
    category: 'Ngôn ngữ (Languages)',
    title: 'Ngôn Ngữ Giao Tiếp',
    desc: 'Khả năng sử dụng ngôn ngữ linh hoạt kết hợp công cụ AI hỗ trợ giao tiếp và làm việc hiệu quả trong môi trường quốc tế.',
    averagePercent: 84,
    accentColor: '#059669',
    percentColor: 'text-emerald-600 dark:text-emerald-400',
    barGradient: 'from-emerald-500 via-teal-600 to-cyan-600',
    iconBg: 'bg-gradient-to-br from-emerald-50 to-teal-100/90 dark:from-emerald-950/70 dark:to-teal-900/60',
    iconBorder: 'border-emerald-200/80 dark:border-emerald-500/40',
    iconColor: 'text-emerald-600 dark:text-emerald-300',
    iconSvg: (
      <svg className="w-6 h-6 stroke-[2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
      </svg>
    ),
    ambientGlow: 'rgba(5, 150, 105, 0.12)',
    items: [
      { name: 'Tiếng Việt Bản Xứ', percent: 90, icon: 'flag' },
      { name: 'Tiếng Anh Quốc Tế', percent: 60, icon: 'globe' },
      { name: 'Ứng dụng AI Dịch', percent: 85, icon: 'sparkles' },
      { name: 'Đa dạng Văn hóa', percent: 88, icon: 'users' },
      { name: 'Đàm phán Song ngữ', percent: 86, icon: 'briefcase' },
      { name: 'AI Real-time Speech', percent: 92, icon: 'headphones' },
    ],
  },
  {
    id: 'ai',
    filterKey: 'ai',
    code: '7.6',
    category: 'Hệ thống AI (Artificial Intelligence)',
    title: 'Trí Tuệ Nhân Tạo',
    desc: 'Năng lực ứng dụng và làm chủ các công nghệ AI tiên tiến, chuyển đổi số hóa và tự động hóa quy trình vận hành dịch vụ thông minh.',
    averagePercent: 93,
    accentColor: '#4f46e5',
    percentColor: 'text-indigo-600 dark:text-indigo-400',
    barGradient: 'from-indigo-500 via-purple-600 to-pink-500',
    iconBg: 'bg-gradient-to-br from-indigo-50 to-purple-100/90 dark:from-indigo-950/70 dark:to-purple-900/60',
    iconBorder: 'border-indigo-200/80 dark:border-indigo-500/40',
    iconColor: 'text-indigo-600 dark:text-indigo-300',
    iconSvg: (
      <svg className="w-6 h-6 stroke-[2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    ambientGlow: 'rgba(79, 70, 229, 0.12)',
    items: [
      { name: 'GenAI & LLM Bots', percent: 94, icon: 'sparkles' },
      { name: 'BI Data Analytics', percent: 92, icon: 'chart' },
      { name: 'Omnichannel Smart AI', percent: 95, icon: 'network' },
      { name: 'Prompt Engineering', percent: 90, icon: 'terminal' },
      { name: 'AI Agent Workflows', percent: 92, icon: 'bot' },
      { name: 'Chatbot Voicebot 24/7', percent: 95, icon: 'headphones' },
    ],
  },
];

const FILTER_TABS = [
  { key: 'all', label: 'Tất cả (6)' },
  { key: 'strength', label: '7.1 Điểm mạnh (S)' },
  { key: 'improve', label: '7.2 Hoàn thiện (W)' },
  { key: 'opportunity', label: '7.3 Cơ hội (O)' },
  { key: 'threat', label: '7.4 Thách thức (T)' },
  { key: 'language', label: '7.5 Ngôn ngữ' },
  { key: 'ai', label: '7.6 Hệ thống AI' },
];

export const SkillsView: React.FC = () => {
  const [filter, setFilter] = useState<string>('all');

  const filteredCards = SKILL_CARDS.filter((card) => {
    if (filter === 'all') return true;
    return card.filterKey === filter;
  });

  return (
    <div className="w-full h-full flex-1 flex flex-col justify-between gap-3 sm:gap-4 max-w-7xl mx-auto select-none relative text-slate-800 dark:text-slate-100 overflow-hidden">
      {/* 1. TOP HERO BANNER */}
      <HeroBanner
        badgeText="Kỹ năng chuyên môn"
        title="Kỹ Năng Quản Trị"
        subtitle="Làm chủ công nghệ – Nâng tầm năng lực quản trị dịch vụ khách hàng"
        quote="“Làm chủ công nghệ và rèn giũa kỹ năng quản trị.”"
        quoteAuthor="— Nguyễn Hùng Thái"
        badgeColor="text-indigo-600 dark:text-indigo-400"
        videoSrc="https://cdn.scena.ai/project/10223/b5ecf50da08531a13ef8f06600ed5f2c414d15cf98e7fc1a1cfc09cba209ab3d.mp4"
        bottomControls={
          <div className="w-full flex items-center justify-end pointer-events-auto">
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
              {FILTER_TABS.map((tab) => {
                const isActive = filter === tab.key;
                return (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => setFilter(tab.key)}
                    className={`px-3 py-1.5 rounded-full text-[11px] font-bold font-play tracking-wide transition-all border cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                      isActive
                        ? 'bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white border-indigo-500 shadow-md shadow-indigo-500/25 scale-[1.02]'
                        : 'bg-white/90 dark:bg-slate-800/80 text-slate-700 dark:text-slate-200 border-slate-200/90 dark:border-white/20 hover:bg-white dark:hover:bg-slate-800 shadow-2xs'
                    }`}
                  >
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        }
      />

      {/* 2. MAIN RESPONSIVE BENTO GRID (CHIA ĐỀU 6 THẺ SWOT + NGÔN NGỮ + HỆ THỐNG AI - SMART ADAPTIVE) */}
      <div className="w-full flex-1 min-h-0 relative flex flex-col overflow-y-auto no-scrollbar py-1">
        <div
          className={`grid gap-3.5 sm:gap-4 pb-5 ${
            filteredCards.length === 1
              ? 'grid-cols-1 max-w-2xl mx-auto w-full'
              : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
          }`}
        >
          {filteredCards.map((card) => {
            return (
              <div
                key={card.id}
                className="theme-pastel-card group/skillCard relative rounded-[22px] sm:rounded-[24px] p-4 bg-white/85 dark:bg-slate-900/60 backdrop-blur-2xl border border-white/90 dark:border-white/20 shadow-[0_10px_30px_-5px_rgba(30,27,75,0.08),0_4px_12px_rgba(0,0,0,0.03)] dark:shadow-[0_12px_36px_-6px_rgba(0,0,0,0.5)] hover:shadow-[0_20px_45px_-8px_rgba(99,102,241,0.2)] transition-all duration-300 hover:-translate-y-1 text-left flex flex-col justify-between h-auto min-w-0"
              >
                {/* Soft Ambient Background Glow */}
                <div
                  className="absolute -top-10 -right-10 w-36 h-36 rounded-full blur-2xl pointer-events-none transition-all duration-500 opacity-60 group-hover/skillCard:opacity-90"
                  style={{ background: card.ambientGlow }}
                />

                <div className="relative z-10 space-y-2.5 flex-1 flex flex-col justify-between min-w-0">
                  <div className="space-y-2.5">
                    {/* Header Row: Squircle Icon + Title (4 Từ) + Code Pill + Average Score */}
                    <div className="flex items-center justify-between gap-2 min-w-0">
                      <div className="flex items-center gap-2.5 min-w-0 flex-1">
                        {/* Squircle 3D Icon Box */}
                        <div
                          className={`w-10 h-10 sm:w-11 sm:h-11 rounded-[14px] shrink-0 flex items-center justify-center shadow-xs border ${card.iconBorder} ${card.iconBg} ${card.iconColor} transition-transform duration-300 group-hover/skillCard:scale-105`}
                        >
                          {card.iconSvg}
                        </div>

                        {/* 4-Word Card Title (Không cắt chữ, tự động xuống dòng mượt mà) */}
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <h3 className="text-sm sm:text-[15px] font-black font-play text-slate-900 dark:text-white leading-tight break-words [overflow-wrap:anywhere]">
                              {card.title}
                            </h3>
                            <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded-md bg-slate-100 dark:bg-slate-800/80 border border-slate-200/80 dark:border-white/10 text-slate-500 dark:text-slate-400 shrink-0">
                              {card.code}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Overall Score Badge */}
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

                  {/* Skill Items: Chuyển thành dạng danh sách 1 cột có icon trước mỗi kỹ năng, thêm % */}
                  <div className="flex flex-col gap-1.5 pt-1.5 flex-1 justify-between">
                    {card.items.map((item) => (
                      <div
                        key={item.name}
                        className="p-1.5 sm:p-2 rounded-xl bg-slate-50/90 dark:bg-slate-800/60 hover:bg-white dark:hover:bg-slate-800 border border-slate-200/70 dark:border-white/10 shadow-2xs hover:shadow-xs transition-all duration-200 flex flex-col justify-between gap-1 group/item min-w-0"
                      >
                        <div className="flex items-center justify-between gap-2 min-w-0">
                          <div className="flex items-center gap-2 min-w-0 flex-1">
                            <span
                              className="w-5 h-5 rounded-md flex items-center justify-center shrink-0 shadow-2xs"
                              style={{
                                background: `${card.accentColor}18`,
                                color: card.accentColor,
                              }}
                            >
                              <WebIcon name={item.icon} className="w-3.5 h-3.5" />
                            </span>
                            <span className="text-[11px] sm:text-[11.5px] font-bold text-slate-800 dark:text-slate-100 truncate">
                              {item.name}
                            </span>
                          </div>
                          <span
                            className="text-[10px] sm:text-[11px] font-mono font-black shrink-0 px-2 py-0.5 rounded shadow-2xs"
                            style={{
                              background: `${card.accentColor}18`,
                              color: card.accentColor,
                            }}
                          >
                            {item.percent}%
                          </span>
                        </div>

                        {/* Mini bar */}
                        <div className="w-full h-1 bg-slate-200/70 dark:bg-white/10 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full bg-gradient-to-r ${card.barGradient}`}
                            style={{ width: `${item.percent}%` }}
                          />
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
  );
};
