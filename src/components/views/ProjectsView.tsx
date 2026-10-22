'use client';

import React, { useState, useRef } from 'react';
import { PROJECTS_DATA } from '@/data/projects';
import { ProjectData } from '@/types';
import { Modal } from '@/components/ui/Modal';
import { WebIcon } from '@/components/ui/WebIcon';
import { HeroBanner } from '@/components/ui/HeroBanner';
import { ProjectArticleRenderer } from '@/components/ui/ProjectArticleRenderer';

interface ProjectCardGroup {
  id: string;
  code: string;
  filterKey: string;
  badgeText: string;
  fourWordTitle: string;
  pillText: string;
  desc: string;
  visualId: string;
  illustrationSrc: string;
  iconName: string;
  projects: ProjectData[];
}

const getByIds = (ids: string[]): ProjectData[] =>
  ids
    .map((id) => PROJECTS_DATA.find((p) => p.id === id))
    .filter((p): p is ProjectData => Boolean(p));

const PROJECT_CARD_GROUPS: ProjectCardGroup[] = [
  {
    id: 'group-strategy',
    code: 'Nhóm 1',
    filterKey: 'strategy',
    badgeText: 'Nhóm Chiến lược & Cấu trúc Vận hành CSKH',
    fourWordTitle: 'Chiến Lược Vận Hành',
    pillText: '2 Dự án · 1.1 & 1.2',
    desc: 'Xây dựng và vận hành Phòng Dịch vụ Khách hàng (1.1) và Thiết lập mục tiêu phòng ban theo OKR/KPI liên kết mục tiêu kinh doanh (1.2).',
    visualId: '01',
    illustrationSrc: '/images/skills/ill-01.png',
    iconName: 'compass',
    projects: getByIds(['p1_1', 'p1_2']),
  },
  {
    id: 'group-sop',
    code: 'Nhóm 2',
    filterKey: 'sop',
    badgeText: 'Nhóm Chuẩn hóa Quy trình & Vận hành Xuất sắc (SOP & Operational Excellence)',
    fourWordTitle: 'Chuẩn Hóa Quy Trình',
    pillText: '5 Dự án · 2.1 – 2.5',
    desc: 'Chuẩn hóa quy trình CSKH Visual SOP (2.1), Tối ưu hóa kênh hỗ trợ Omnichannel (2.2), Triển khai tự động hóa RPA (2.3), Quản lý chiến dịch Outbound (2.4) và Quản lý đối tác thuê ngoài BPO 150+ vị trí (2.5).',
    visualId: '03',
    illustrationSrc: '/images/skills/ill-03.png',
    iconName: 'shield',
    projects: getByIds(['p2_1', 'p2_2', 'p2_3', 'p2_4', 'p2_5']),
  },
  {
    id: 'group-cx',
    code: 'Nhóm 3',
    filterKey: 'cx',
    badgeText: 'Nhóm Thiết kế Trải nghiệm Khách hàng (CX Design)',
    fourWordTitle: 'Trải Nghiệm Khách Hàng',
    pillText: '4 Dự án · 3.1 – 3.4',
    desc: 'Nâng cao chất lượng trải nghiệm khách hàng CJM (3.1), Quản lý dự án CSKH Agile (3.2), Thúc đẩy cải tiến sản phẩm VoC (3.3), Quản lý khủng hoảng và giảm khách hàng rời bỏ (3.4).',
    visualId: '02',
    illustrationSrc: '/images/skills/ill-02.png',
    iconName: 'sparkles',
    projects: getByIds(['p3_1', 'p3_2', 'p3_3', 'p3_4']),
  },
  {
    id: 'group-tech',
    code: 'Nhóm 4',
    filterKey: 'tech',
    badgeText: 'Nhóm Công nghệ, Dữ liệu & AI CSKH (CS Tech, Data & AI)',
    fourWordTitle: 'Công Nghệ, Data & AI',
    pillText: '4 Dự án · 4.1 – 4.4',
    desc: 'Xây dựng hệ thống CRM 360 độ (4.1), Phân tích & Báo cáo BI Dashboard (4.2), Khảo sát & Đánh giá khách hàng CSAT/NPS 1-click (4.3), Xây dựng AI Bot Generative & RAG 24/7 (4.4).',
    visualId: '04',
    illustrationSrc: '/images/skills/ill-04.png',
    iconName: 'database',
    projects: getByIds(['p4_1', 'p4_2', 'p4_3', 'p4_4']),
  },
  {
    id: 'group-learning',
    code: 'Nhóm 5',
    filterKey: 'learning',
    badgeText: 'Nhóm Đào tạo, Phát triển & Văn hóa Dịch vụ (CS Learning & Culture)',
    fourWordTitle: 'Đào Tạo & Văn Hóa',
    pillText: '6 Dự án · 5.1 – 5.6',
    desc: 'Phát triển đào tạo trực tuyến CS Academy LMS (5.1), Khung năng lực & lộ trình phát triển ASK (5.2), Thành lập Trung tâm Hỗ trợ KH (5.3), Chiến lược Customer-Centric & Khung TQA chuẩn COPC (5.4), Quản trị sự thay đổi và khủng hoảng dịch vụ (5.5), Ứng dụng trí tuệ nhân tạo nâng cao hiệu suất CSKH (5.6).',
    visualId: '06',
    illustrationSrc: '/images/skills/ill-06.png',
    iconName: 'graduation',
    projects: getByIds(['p5_1', 'p5_2', 'p5_3', 'p5_4', 'p5_5', 'p5_6']),
  },
];

const PROJECT_CATEGORIES = [
  { key: 'all', label: 'Tất cả (21)', icon: 'folder' },
  { key: 'strategy', label: 'Chiến lược ()', icon: 'compass' },
  { key: 'sop', label: 'Chuẩn hóa SOP', icon: 'shield' },
  { key: 'cx', label: 'Trải nghiệm CX', icon: 'heart' },
  { key: 'tech', label: 'Công nghệ & AI', icon: 'database' },
  { key: 'learning', label: 'Đào tạo', icon: 'graduation' },
];

export const ProjectsView: React.FC = () => {
  const [filter, setFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest'>('newest');
  const [selectedGroup, setSelectedGroup] = useState<ProjectCardGroup | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<ProjectData | null>(null);
  const [mindmapProject, setMindmapProject] = useState<ProjectData | null>(null);
  const [detailTab, setDetailTab] = useState<'article' | 'star'>('article');

  // Visual theme config per card matching DomainsView & SkillsView
  const getCardVisualConfig = (visualId: string) => {
    switch (visualId) {
      case '01': // Chiến lược - Sky Blue
        return {
          accentColor: '#0284c7',
          cardBg: 'linear-gradient(135deg, #f0f7fe 0%, #ddf0fd 30%, #c4e2fa 65%, #beddf9 100%)',
          cardBorder: 'border-[#93c5fd]/90 hover:border-[#38bdf8]',
          ambientGlow: 'radial-gradient(circle at 75% 50%, rgba(190, 221, 249, 0.95) 0%, rgba(196, 226, 250, 0.5) 55%, transparent 75%)',
          titleColor: 'text-[#0284c7]',
          pillBg: 'bg-sky-100/90 border-sky-200/90 text-[#0369a1]',
          arrowBg: 'linear-gradient(135deg, #38bdf8 0%, #0284c7 100%)',
          arrowShadow: '0 4px 12px rgba(2, 132, 199, 0.4)',
        };
      case '02': // CX Design - Warm Orange / Amber
        return {
          accentColor: '#ea580c',
          cardBg: 'linear-gradient(135deg, #fffcf7 0%, #fef1e2 30%, #fccc9b 65%, #fbd2a6 100%)',
          cardBorder: 'border-[#fdba74]/90 hover:border-[#fb923c]',
          ambientGlow: 'radial-gradient(circle at 75% 50%, rgba(251, 210, 166, 0.95) 0%, rgba(252, 204, 155, 0.5) 55%, transparent 75%)',
          titleColor: 'text-[#ea580c]',
          pillBg: 'bg-orange-100/80 border-orange-200/90 text-[#c2410c]',
          arrowBg: 'linear-gradient(135deg, #fbbf24 0%, #ea580c 100%)',
          arrowShadow: '0 4px 12px rgba(234, 88, 12, 0.4)',
        };
      case '03': // SOP & BPO - Rose / Ruby
        return {
          accentColor: '#e11d48',
          cardBg: 'linear-gradient(135deg, #fff7f6 0%, #feeae5 30%, #fdd8cf 65%, #f9b3b1 100%)',
          cardBorder: 'border-[#fca5a5]/90 hover:border-[#f43f5e]',
          ambientGlow: 'radial-gradient(circle at 75% 50%, rgba(253, 216, 207, 0.95) 0%, rgba(249, 179, 177, 0.5) 55%, transparent 75%)',
          titleColor: 'text-[#e11d48]',
          pillBg: 'bg-rose-100/80 border-rose-200/90 text-[#be123c]',
          arrowBg: 'linear-gradient(135deg, #fb7185 0%, #e11d48 100%)',
          arrowShadow: '0 4px 12px rgba(225, 29, 72, 0.4)',
        };
      case '04': // Tech & AI - Purple / Violet
        return {
          accentColor: '#7c3aed',
          cardBg: 'linear-gradient(135deg, #faf8fe 0%, #ede8fe 30%, #d9d0fb 65%, #c5b5f9 100%)',
          cardBorder: 'border-[#c4b5fd]/90 hover:border-[#a855f7]',
          ambientGlow: 'radial-gradient(circle at 75% 50%, rgba(217, 208, 251, 0.95) 0%, rgba(157, 126, 243, 0.5) 55%, transparent 75%)',
          titleColor: 'text-[#7c3aed]',
          pillBg: 'bg-purple-100/80 border-purple-200/90 text-[#5b21b6]',
          arrowBg: 'linear-gradient(135deg, #a78bfa 0%, #7c3aed 100%)',
          arrowShadow: '0 4px 12px rgba(124, 58, 237, 0.4)',
        };
      case '06': // Learning & Culture - Mint / Emerald
      default:
        return {
          accentColor: '#059669',
          cardBg: 'linear-gradient(135deg, #f3fbfa 0%, #dff4f2 30%, #b1dfdd 65%, #abd9d6 100%)',
          cardBorder: 'border-[#6ee7b7]/90 hover:border-[#10b981]',
          ambientGlow: 'radial-gradient(circle at 75% 50%, rgba(171, 217, 214, 0.95) 0%, rgba(177, 223, 221, 0.5) 55%, transparent 75%)',
          titleColor: 'text-[#059669]',
          pillBg: 'bg-emerald-100/80 border-emerald-200/90 text-[#047857]',
          arrowBg: 'linear-gradient(135deg, #34d399 0%, #059669 100%)',
          arrowShadow: '0 4px 12px rgba(5, 150, 105, 0.4)',
        };
    }
  };

  const getVisualConfigForProject = (proj: ProjectData) => {
    if (proj.groupKey === 'strategy') return getCardVisualConfig('01');
    if (proj.groupKey === 'sop') return getCardVisualConfig('03');
    if (proj.groupKey === 'cx') return getCardVisualConfig('02');
    if (proj.groupKey === 'tech') return getCardVisualConfig('04');
    if (proj.groupKey === 'learning') return getCardVisualConfig('06');
    return getCardVisualConfig('01');
  };

  const getParentGroupForProject = (proj: ProjectData): ProjectCardGroup => {
    return (
      PROJECT_CARD_GROUPS.find((g) => g.projects.some((p) => p.id === proj.id)) ||
      PROJECT_CARD_GROUPS[0]
    );
  };

  const getCategoryCount = (key: string) => {
    if (key === 'all') return PROJECTS_DATA.length;
    return PROJECTS_DATA.filter((p) => p.groupKey === key).length;
  };

  const getCategoryMeta = (groupKey: string) => {
    switch (groupKey) {
      case 'strategy':
        return { name: 'Chiến lược', dotColor: '#3b82f6' };
      case 'sop':
        return { name: 'Chuẩn hóa SOP', dotColor: '#a855f7' };
      case 'cx':
        return { name: 'Trải nghiệm CX', dotColor: '#ec4899' };
      case 'tech':
        return { name: 'Công nghệ & AI', dotColor: '#06b6d4' };
      case 'learning':
        return { name: 'Đào tạo', dotColor: '#10b981' };
      default:
        return { name: 'Dự án', dotColor: '#3b82f6' };
    }
  };

  const getProgressBadge = (proj: ProjectData) => {
    const isCompleted = proj.progressPercent >= 100 || proj.progressText?.includes('100%');
    if (isCompleted) {
      return {
        bg: 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300',
        dot: 'bg-emerald-500',
        text: proj.progressText || 'Giai đoạn 1 - Đã hoàn thành (100%)',
      };
    }
    return {
      bg: 'bg-amber-50 dark:bg-amber-950/60 border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-300',
      dot: 'bg-amber-500',
      text: proj.progressText || 'Giai đoạn 3 - Đang triển khai (80%)',
    };
  };

  const filteredProjects = PROJECTS_DATA.filter((p) => {
    const matchesFilter = filter === 'all' || p.groupKey === filter;
    if (!matchesFilter) return false;
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase().trim();
    return (
      p.title.toLowerCase().includes(q) ||
      p.code.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.role.toLowerCase().includes(q) ||
      p.hashtags.some((tag) => tag.toLowerCase().includes(q))
    );
  }).sort((a, b) => {
    if (sortBy === 'oldest') {
      return a.code.localeCompare(b.code, undefined, { numeric: true });
    }
    return 0;
  });

  const handleOpenGroup = (group: ProjectCardGroup, initialProject?: ProjectData) => {
    const proj = initialProject || group.projects[0] || null;
    setSelectedGroup(group);
    setSelectedArticle(proj);
    setDetailTab(proj?.fullContent ? 'article' : 'star');
  };

  const handleCloseDetail = () => {
    setSelectedArticle(null);
    setSelectedGroup(null);
  };

  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    carouselRef.current?.scrollBy({ left: -390, behavior: 'smooth' });
  };

  const scrollRight = () => {
    carouselRef.current?.scrollBy({ left: 390, behavior: 'smooth' });
  };

  return (
    <div
      className="w-full h-full flex-1 flex flex-col lg:flex-row gap-[15px] max-w-7xl mx-auto select-none relative text-slate-800 overflow-hidden"
    >
      {/* 1. BANNER DỰ ÁN TRỌNG ĐIỂM & THÀNH TỰU (BÊN PHẢI THEO HÌNH VÀ YÊU CẦU CỦA USER) */}
      <div
        id="projects-vertical-banner"
        className="w-full lg:w-[300px] xl:w-[300px] shrink-0 h-full rounded-[22px] overflow-hidden relative flex flex-col justify-between p-4 sm:p-4.5 bg-gradient-to-b from-[#eaf4ff]/95 via-[#f0f7ff]/90 to-[#e6f0fa]/95 dark:from-slate-900/95 dark:via-slate-850/90 dark:to-slate-900/95 backdrop-blur-xl border border-white/90 dark:border-white/10 shadow-[0_10px_30px_rgba(30,58,138,0.08)] text-slate-800 dark:text-white transition-all duration-300 lg:order-2 select-none"
      >
        {/* Top Content: Badge & Title */}
        <div className="relative z-10 flex flex-col text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-600 text-white font-bold text-[11px] shadow-xs max-w-fit mb-2">
            <span className="text-amber-300 text-xs">★</span>
            <span>Dự án</span>
          </div>

          <h2 className="text-xl sm:text-[22px] font-black text-slate-900 dark:text-white leading-tight tracking-tight font-play">
            Dự Án Trọng Điểm &amp;<br />Thành Tựu
          </h2>

          <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium leading-relaxed mt-1.5">
            21 dự án thực chiến gắn với tầm nhìn<br />– Đo lường KPI &amp; ROI vượt trội.
          </p>
        </div>

        {/* Middle Content: Quote & Stat Badges & Categories */}
        <div className="relative z-10 flex flex-col gap-2.5 my-auto text-left">
          {/* Quote Card */}
          <div className="p-3 rounded-2xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border border-white/90 dark:border-white/10 shadow-2xs relative">
            <span className="text-2xl text-blue-500 font-serif leading-none absolute top-2 left-2.5 opacity-60">“</span>
            <p className="font-play text-[11px] text-slate-700 dark:text-slate-200 italic leading-snug pl-4 select-none">
              “Thành công của dự án nằm ở sự kết hợp giữa chiến lược đúng đắn, triển khai hiệu quả và đội ngũ tuyệt vời.”
            </p>
            <p className="text-[10px] font-bold text-blue-600 dark:text-cyan-400 mt-1 text-right font-play">
              — Nguyễn Hùng Thái
            </p>
          </div>

          {/* Metric Badges (2 columns) */}
          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center gap-2 p-2 rounded-xl bg-white/80 dark:bg-slate-800/80 border border-white/90 dark:border-white/10 shadow-2xs">
              <div className="w-7 h-7 rounded-lg bg-indigo-500 text-white flex items-center justify-center shrink-0 shadow-xs">
                <WebIcon name="sparkles" className="w-3.5 h-3.5" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-sm font-black text-slate-900 dark:text-white font-play">21+</span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium mt-0.5">Dự án tiêu biểu</span>
              </div>
            </div>

            <div className="flex items-center gap-2 p-2 rounded-xl bg-white/80 dark:bg-slate-800/80 border border-white/90 dark:border-white/10 shadow-2xs">
              <div className="w-7 h-7 rounded-lg bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-xs">
                <WebIcon name="chart" className="w-3.5 h-3.5" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-sm font-black text-emerald-600 dark:text-emerald-400 font-play">98%</span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium mt-0.5">SLA Hoàn thành</span>
              </div>
            </div>
          </div>

          {/* Category Menu: Danh mục dự án */}
          <div className="flex flex-col gap-1 mt-1">
            <div className="flex items-center gap-1.5 text-xs font-black text-slate-800 dark:text-slate-100 font-play uppercase tracking-wider mb-0.5">
              <WebIcon name="folder" className="w-4 h-4 text-blue-600" />
              <span>Danh mục dự án</span>
            </div>

            <div className="flex flex-col gap-1">
              {PROJECT_CATEGORIES.map((cat) => {
                const isActive = filter === cat.key;
                const count = getCategoryCount(cat.key);
                return (
                  <button
                    key={cat.key}
                    type="button"
                    onClick={() => setFilter(cat.key)}
                    className={`w-full px-3 py-1.5 rounded-xl text-xs font-bold font-play transition-all flex items-center justify-between cursor-pointer ${
                      isActive
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'bg-transparent hover:bg-white/70 dark:hover:bg-slate-800/70 text-slate-700 dark:text-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <WebIcon name={cat.icon} className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                      <span className="truncate">{cat.label}</span>
                    </div>
                    {isActive ? (
                      <span className="text-white text-xs font-black">›</span>
                    ) : (
                      <span className="text-slate-400 text-[11px] font-mono">({count})</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Mountain Graphic with sunrise and red flag on summit */}
        <div className="relative z-0 mt-auto pt-2 w-full flex items-end justify-center pointer-events-none -mx-4 -mb-4 overflow-hidden rounded-b-[22px]">
          <svg viewBox="0 0 300 80" className="w-full h-auto" preserveAspectRatio="none">
            <defs>
              <linearGradient id="mtnGrad1" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f472b6" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#c084fc" stopOpacity="0.75" />
              </linearGradient>
              <linearGradient id="mtnGrad2" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#e0e7ff" stopOpacity="0.95" />
                <stop offset="100%" stopColor="#93c5fd" stopOpacity="0.8" />
              </linearGradient>
              <linearGradient id="skyGlow" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ffedd5" stopOpacity="0.7" />
                <stop offset="100%" stopColor="#f472b6" stopOpacity="0.15" />
              </linearGradient>
            </defs>
            <rect x="0" y="0" width="300" height="80" fill="url(#skyGlow)" />
            <path d="M0 80 L40 40 L90 60 L150 20 L210 55 L270 30 L300 50 L300 80 Z" fill="url(#mtnGrad1)" />
            <path d="M0 80 L50 52 L110 65 L160 32 L220 60 L280 42 L300 55 L300 80 Z" fill="url(#mtnGrad2)" opacity="0.9" />
            <line x1="150" y1="20" x2="150" y2="7" stroke="#dc2626" strokeWidth="1.8" strokeLinecap="round" />
            <polygon points="150,8 162,12 150,16" fill="#ef4444" />
          </svg>
        </div>
      </div>

      {/* 2. MAIN AREA: DANH SÁCH DỰ ÁN (BÊN TRÁI THEO HÌNH VÀ YÊU CẦU CỦA USER) */}
      <div className="flex-1 min-w-0 h-full flex flex-col gap-2.5 overflow-hidden lg:order-1">
        {/* Top Control Bar: Danh sách dự án (count) + Sắp xếp + Tìm kiếm */}
        <div className="flex items-center justify-between gap-3 px-1 py-0.5 shrink-0 flex-wrap sm:flex-nowrap">
          <div className="flex items-center gap-2">
            <span className="text-base">📁</span>
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 flex items-center gap-1.5">
              <span>Danh sách dự án</span>
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                ({filteredProjects.length})
              </span>
            </h3>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            {/* Sort selector */}
            <div className="relative inline-flex items-center">
              <select
                aria-label="Sắp xếp dự án"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'newest' | 'oldest')}
                className="appearance-none pl-3 pr-7 py-1.5 rounded-xl text-xs font-medium bg-white/90 dark:bg-slate-800/90 border border-slate-200/90 dark:border-white/10 text-slate-700 dark:text-slate-200 hover:border-blue-400 focus:outline-hidden cursor-pointer shadow-2xs transition"
              >
                <option value="newest">Sắp xếp: Mới nhất</option>
                <option value="oldest">Sắp xếp: Cũ nhất</option>
              </select>
              <div className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 text-[10px]">
                ▼
              </div>
            </div>

            {/* Search Input */}
            <div className="relative">
              <input
                type="text"
                placeholder="Tìm kiếm dự án..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 pr-3 py-1.5 rounded-xl text-xs bg-white/90 dark:bg-slate-800/90 border border-slate-200/90 dark:border-white/10 text-slate-700 dark:text-slate-200 placeholder-slate-400 focus:outline-hidden focus:border-blue-500 w-36 sm:w-44 shadow-2xs transition"
              />
              <svg
                className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </div>
          </div>
        </div>

        {/* Responsive Grid Card View Container */}
        <div className="w-full flex-1 min-h-0 relative flex flex-col overflow-hidden">
        {!selectedGroup && !selectedArticle ? (
          <div className="relative w-full h-full flex-1 min-h-0 overflow-y-auto custom-scrollbar pr-1 py-0.5">
            {/* 21 THẺ DỰ ÁN 3 CỘT THEO BỐ CỤC CHUẨN TRONG HÌNH */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2.5 sm:gap-3 pb-4">
              {filteredProjects.map((proj) => {
                const parentGroup = getParentGroupForProject(proj);
                const catMeta = getCategoryMeta(proj.groupKey);
                const prog = getProgressBadge(proj);
                const displayTitle = proj.title.includes('·')
                  ? proj.title.split('·')[1].trim()
                  : proj.title;

                return (
                  <div
                    key={proj.id}
                    onClick={() => handleOpenGroup(parentGroup, proj)}
                    className="group/card relative rounded-[18px] bg-white/95 dark:bg-slate-900/90 border border-slate-200/80 dark:border-white/10 p-3 sm:p-3.5 shadow-2xs hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 cursor-pointer flex flex-col justify-between text-left h-full"
                    title={`Bấm để xem Case Study STAR: ${proj.title}`}
                  >
                    {/* Phần trên: Thumbnail (trái) + Thông tin & Tiêu đề (phải) */}
                    <div className="flex gap-3 items-start">
                      {/* Thumbnail hình ảnh kèm Badge mã số dự án ở góc trên bên trái */}
                      <div className="w-[88px] h-[72px] sm:w-[94px] sm:h-[76px] rounded-xl overflow-hidden relative shrink-0 border border-slate-200/60 dark:border-white/10 bg-slate-100 dark:bg-slate-800 shadow-2xs">
                        <img
                          src={proj.image}
                          alt={proj.title}
                          className="w-full h-full object-cover group-hover/card:scale-106 transition-transform duration-500 select-none"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = parentGroup.illustrationSrc;
                          }}
                        />
                        <span className="absolute top-1 left-1 px-1.5 py-0.5 rounded-md bg-blue-600 text-white font-mono text-[10px] font-black shadow-xs border border-white/20">
                          {proj.code}
                        </span>
                      </div>

                      {/* Thông tin bên phải: Status Pill + Nhóm danh mục + Tên dự án */}
                      <div className="flex-1 min-w-0 flex flex-col gap-1">
                        {/* Status pill */}
                        <div className="flex items-center">
                          <span
                            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] sm:text-[10.5px] font-semibold border ${prog.bg} max-w-full`}
                          >
                            <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${prog.dot}`} />
                            <span className="truncate">{prog.text}</span>
                          </span>
                        </div>

                        {/* Category pill with colored dot */}
                        <div className="flex items-center gap-1.5 text-[10.5px] font-semibold text-slate-500 dark:text-slate-400">
                          <span
                            className="w-1.5 h-1.5 rounded-full shrink-0"
                            style={{ backgroundColor: catMeta.dotColor }}
                          />
                          <span className="truncate">{catMeta.name}</span>
                        </div>

                        {/* Tên dự án (in đậm, rõ nét) */}
                        <h4
                          className="text-[12px] sm:text-[12.5px] font-bold font-play leading-snug text-slate-800 dark:text-slate-100 group-hover/card:text-blue-600 dark:group-hover/card:text-blue-400 transition-colors line-clamp-2"
                          title={proj.title}
                        >
                          {displayTitle}
                        </h4>
                      </div>
                    </div>

                    {/* Phần dưới: Mô tả dự án tóm tắt & Nút tròn mũi tên chuyển trang */}
                    <div className="flex items-end justify-between gap-2 pt-2.5 mt-2 border-t border-slate-100 dark:border-white/5">
                      <p className="text-[10.5px] sm:text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2 flex-1 min-w-0 pr-1">
                        {proj.description}
                      </p>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenGroup(parentGroup, proj);
                        }}
                        aria-label="Xem chi tiết dự án"
                        className="w-6 h-6 sm:w-6.5 sm:h-6.5 rounded-full bg-slate-100 hover:bg-blue-600 dark:bg-slate-800 dark:hover:bg-blue-600 text-slate-600 hover:text-white dark:text-slate-300 dark:hover:text-white transition-all flex items-center justify-center shrink-0 shadow-2xs group-hover/card:translate-x-0.5 cursor-pointer"
                      >
                        <svg className="w-3 h-3 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          /* Detail View cho nhóm dự án & Case Study STAR đang chọn (Bố cục thẻ xếp chồng Sticky Stacking Cards) */
          selectedArticle && (
            <div className="relative w-full h-full flex-1 min-h-0 overflow-y-auto custom-scrollbar pr-1.5 sm:pr-2.5 py-0.5 text-left">
              <div className="w-full relative flex flex-col gap-4 pb-20">
                {/* Thẻ 1 (Sticky Card 1): Header & Tổng Quan Dự Án */}
              <div className="sticky top-0 z-10 w-full p-4 sm:p-5 rounded-[22px] bg-white/95 dark:bg-slate-900/95 border border-purple-200/90 dark:border-purple-500/30 shadow-[0_10px_30px_rgba(0,0,0,0.12)] space-y-3.5 transition-all duration-300 backdrop-blur-2xl">
                {/* Top Back Bar & Sub-Project Selector Tabs */}
                <div className="flex flex-col gap-3 pb-3 border-b border-slate-200 dark:border-white/10">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                    <div className="flex items-center gap-2.5 min-w-0">
                      {selectedGroup && (
                        <div
                          style={{ color: getCardVisualConfig(selectedGroup.visualId).accentColor }}
                          className="w-9 h-9 rounded-xl bg-purple-50 dark:bg-purple-950/50 border border-purple-200/80 dark:border-purple-500/30 flex items-center justify-center shrink-0 shadow-2xs"
                        >
                          <WebIcon name={selectedGroup.iconName} className="w-5 h-5" />
                        </div>
                      )}
                      <div className="min-w-0">
                        <span className="text-[10.5px] font-mono font-black uppercase tracking-wider text-purple-600 dark:text-purple-400 block truncate">
                          {selectedGroup ? `${selectedGroup.code} · ${selectedGroup.badgeText}` : selectedArticle.groupTitle}
                        </span>
                        <h4 className="text-sm sm:text-base font-black tracking-tight font-play text-slate-900 dark:text-white truncate">
                          {selectedGroup ? selectedGroup.fourWordTitle : selectedArticle.title}
                        </h4>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={() => setMindmapProject(selectedArticle)}
                        className="px-3.5 py-1.5 rounded-full bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border border-purple-200/90 dark:border-purple-500/40 font-bold text-xs flex items-center gap-1.5 hover:bg-purple-100 dark:hover:bg-purple-900/50 transition cursor-pointer active:scale-95 shadow-2xs"
                      >
                        <WebIcon name="brain" className="w-3.5 h-3.5" />
                        <span>Sơ Đồ Tư Duy</span>
                      </button>

                      <button
                        type="button"
                        onClick={handleCloseDetail}
                        title="Đóng chi tiết dự án"
                        aria-label="Đóng chi tiết dự án"
                        className="w-9 h-9 rounded-full bg-slate-100 hover:bg-rose-500 dark:bg-slate-800 dark:hover:bg-rose-600 text-slate-600 hover:text-white dark:text-slate-300 dark:hover:text-white border border-slate-300 dark:border-slate-700 hover:border-rose-500 text-xs font-bold shadow-2xs hover:shadow-md transition-all duration-200 flex items-center justify-center cursor-pointer shrink-0 active:scale-90"
                      >
                        <svg className="w-4 h-4 stroke-[2.4]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* Tabs chọn nhanh các dự án trong nhóm */}
                  {selectedGroup && selectedGroup.projects.length > 1 && (
                    <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-0.5">
                      {selectedGroup.projects.map((proj) => {
                        const isCurrent = proj.id === selectedArticle.id;
                        return (
                          <button
                            key={proj.id}
                            type="button"
                            onClick={() => {
                              setSelectedArticle(proj);
                              setDetailTab(proj.fullContent ? 'article' : 'star');
                            }}
                            className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all border cursor-pointer whitespace-nowrap flex items-center gap-1.5 active:scale-95 ${
                              isCurrent
                                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white border-purple-500 shadow-xs'
                                : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-white/10 hover:bg-white dark:hover:bg-slate-750'
                            }`}
                          >
                            <span className="font-mono font-black">{proj.code}</span>
                            <span className="truncate max-w-[200px]">
                              {proj.title.includes('·') ? proj.title.split('·')[1].trim() : proj.title}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Main Info Box */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
                  <div className="lg:col-span-8 flex flex-col justify-between gap-3 p-4 rounded-xl bg-slate-50/90 dark:bg-slate-950/60 border border-slate-200/90 dark:border-white/10">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-mono font-black px-3 py-1 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-xs">
                          Mã dự án: {selectedArticle.code}
                        </span>
                        <span className="text-xs font-bold px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800/50">
                          {selectedArticle.groupTitle}
                        </span>
                        <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/50">
                          {selectedArticle.progressText}
                        </span>
                      </div>

                      <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white leading-tight font-play">
                        {selectedArticle.title}
                      </h2>

                      <p className="text-xs sm:text-[13px] text-slate-700 dark:text-slate-200 leading-relaxed font-medium">
                        {selectedArticle.description}
                      </p>
                    </div>

                    <div className="pt-2.5 border-t border-slate-200/90 dark:border-white/10 space-y-2 text-xs">
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-slate-900 dark:text-slate-200 w-20 shrink-0 inline-flex items-center gap-1.5">
                          <WebIcon name="target" className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                          <span>Vai trò:</span>
                        </span>
                        <span className="font-bold text-purple-700 dark:text-purple-300">{selectedArticle.role}</span>
                      </div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-extrabold text-slate-900 dark:text-slate-200 w-20 shrink-0 inline-flex items-center gap-1.5">
                          <WebIcon name="tag" className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                          <span>Hashtags:</span>
                        </span>
                        <div className="flex items-center gap-1.5 flex-wrap">
                          {selectedArticle.hashtags.map((t) => (
                            <span
                              key={t}
                              className="px-2.5 py-0.5 rounded-full bg-white dark:bg-slate-800 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-500/30 font-mono text-[11px] font-semibold shadow-2xs"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-4 flex flex-col gap-2">
                    <div
                      className="w-full h-44 sm:h-48 rounded-xl overflow-hidden bg-slate-950 border border-slate-200 dark:border-white/15 relative group cursor-pointer shadow-md"
                      onClick={() => setMindmapProject(selectedArticle)}
                    >
                      <img
                        src={selectedArticle.mindmap}
                        alt={`Sơ đồ tư duy ${selectedArticle.code}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = selectedArticle.image;
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-black/30 flex flex-col justify-end p-3">
                        <span className="text-[11.5px] font-bold text-white flex items-center gap-1.5 drop-shadow">
                          <WebIcon name="search" className="w-3.5 h-3.5 text-purple-300" />
                          <span>Nhấp phóng to Sơ Đồ Tư Duy</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Switcher Tab giữa Bài Viết Toàn Văn 9 Phần và Khung STAR */}
                {selectedArticle.fullContent && (
                  <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-950/70 border border-purple-200/80 dark:border-purple-500/30">
                    <button
                      type="button"
                      onClick={() => setDetailTab('article')}
                      className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                        detailTab === 'article'
                          ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md'
                          : 'text-slate-600 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400'
                      }`}
                    >
                      <WebIcon name="file-text" className="w-4 h-4" />
                      <span>Bài Viết Toàn Văn (9 Phần Chuẩn Quản Trị)</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setDetailTab('star')}
                      className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                        detailTab === 'star'
                          ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md'
                          : 'text-slate-600 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400'
                      }`}
                    >
                      <WebIcon name="star" className="w-4 h-4" />
                      <span>Tóm Tắt Khung STAR (Bối Cảnh & Kết Quả)</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Nội dung chi tiết: Hiển thị Bài Viết 9 Phần hoặc 4 Thẻ Sticky STAR */}
              {selectedArticle.fullContent && detailTab === 'article' ? (
                <div className="w-full p-4 sm:p-7 rounded-[22px] bg-white/95 dark:bg-slate-900/95 border border-purple-200/90 dark:border-purple-500/30 shadow-[0_12px_36px_rgba(0,0,0,0.1)] backdrop-blur-2xl">
                  <ProjectArticleRenderer
                    content={selectedArticle.fullContent}
                    englishTitle={selectedArticle.englishTitle}
                  />
                </div>
              ) : (
                <>
              {/* Thẻ 2 (Sticky Card 2): 1. Bối cảnh & Thách thức (Situation & Task) */}
              <div className="sticky top-6 sm:top-8 z-20 w-full p-4 sm:p-5 rounded-[22px] bg-gradient-to-br from-amber-50/98 via-orange-50/95 to-amber-100/90 dark:from-slate-900/98 dark:via-amber-950/40 dark:to-slate-900/95 border-2 border-amber-300/90 dark:border-amber-500/40 shadow-[0_12px_32px_rgba(217,119,6,0.18)] space-y-3 transition-all duration-300 backdrop-blur-2xl">
                <div className="flex items-center justify-between pb-2 border-b border-amber-200/80 dark:border-amber-500/30">
                  <div className="flex items-center gap-2.5">
                    <span className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 text-white font-mono font-black text-sm flex items-center justify-center shadow-md">
                      S
                    </span>
                    <h3 className="font-black text-sm sm:text-base text-amber-950 dark:text-amber-300 font-play">
                      1. Bối cảnh & Thách thức (Situation & Task)
                    </h3>
                  </div>
                  <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-amber-200/80 dark:bg-amber-900/60 text-amber-800 dark:text-amber-200">
                    Giai đoạn 01
                  </span>
                </div>
                <p className="text-xs sm:text-[13px] text-slate-800 dark:text-slate-100 leading-relaxed font-medium">
                  {selectedArticle.star.situation}
                </p>
              </div>

              {/* Thẻ 3 (Sticky Card 3): 2. Phương pháp tiếp cận chiến lược (Approach) */}
              <div className="sticky top-12 sm:top-16 z-30 w-full p-4 sm:p-5 rounded-[22px] bg-gradient-to-br from-blue-50/98 via-sky-50/95 to-indigo-100/90 dark:from-slate-900/98 dark:via-blue-950/40 dark:to-slate-900/95 border-2 border-blue-300/90 dark:border-blue-500/40 shadow-[0_14px_36px_rgba(2,132,199,0.18)] space-y-3 transition-all duration-300 backdrop-blur-2xl">
                <div className="flex items-center justify-between pb-2 border-b border-blue-200/80 dark:border-blue-500/30">
                  <div className="flex items-center gap-2.5">
                    <span className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-600 text-white font-mono font-black text-sm flex items-center justify-center shadow-md">
                      A
                    </span>
                    <h3 className="font-black text-sm sm:text-base text-blue-950 dark:text-sky-300 font-play">
                      2. Phương pháp tiếp cận chiến lược (Approach)
                    </h3>
                  </div>
                  <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-blue-200/80 dark:bg-blue-900/60 text-blue-800 dark:text-blue-200">
                    Giai đoạn 02
                  </span>
                </div>
                <p className="text-xs sm:text-[13px] text-slate-800 dark:text-slate-100 leading-relaxed font-medium">
                  {selectedArticle.star.approach}
                </p>
              </div>

              {/* Thẻ 4 (Sticky Card 4): 3. Hành động triển khai thực tế (Action Steps) */}
              <div className="sticky top-18 sm:top-24 z-40 w-full p-4 sm:p-5 rounded-[22px] bg-gradient-to-br from-purple-50/98 via-fuchsia-50/95 to-violet-100/90 dark:from-slate-900/98 dark:via-purple-950/40 dark:to-slate-900/95 border-2 border-purple-300/90 dark:border-purple-500/40 shadow-[0_16px_40px_rgba(124,58,237,0.2)] space-y-3.5 transition-all duration-300 backdrop-blur-2xl">
                <div className="flex items-center justify-between pb-2 border-b border-purple-200/80 dark:border-purple-500/30">
                  <div className="flex items-center gap-2.5">
                    <span className="w-8 h-8 rounded-xl bg-gradient-to-br from-purple-600 to-fuchsia-600 text-white font-mono font-black text-sm flex items-center justify-center shadow-md">
                      A
                    </span>
                    <h3 className="font-black text-sm sm:text-base text-purple-950 dark:text-purple-300 font-play">
                      3. Hành động triển khai thực tế (Action Steps)
                    </h3>
                  </div>
                  <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-purple-200/80 dark:bg-purple-900/60 text-purple-800 dark:text-purple-200">
                    Giai đoạn 03
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {selectedArticle.star.actions.map((act) => (
                    <div
                      key={act.step}
                      className="p-3.5 rounded-xl bg-white/95 dark:bg-slate-800/90 border border-purple-200/80 dark:border-purple-500/30 shadow-xs space-y-1.5 hover:border-purple-400 dark:hover:border-purple-300 transition"
                    >
                      <div className="flex items-center gap-1.5">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-black bg-purple-600 text-white shrink-0">
                          {act.step}
                        </span>
                        <h5 className="font-bold text-xs text-slate-900 dark:text-white leading-snug truncate">
                          {act.title}
                        </h5>
                      </div>
                      <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed font-medium">{act.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Thẻ 5 (Sticky Card 5): 4. Kết quả định lượng & ROI (Quantifiable Results) */}
              <div className="sticky top-24 sm:top-32 z-50 w-full p-4 sm:p-5 rounded-[22px] bg-gradient-to-br from-emerald-50/98 via-teal-50/95 to-green-100/90 dark:from-slate-900/98 dark:via-emerald-950/40 dark:to-slate-900/95 border-2 border-emerald-300/90 dark:border-emerald-500/40 shadow-[0_20px_48px_rgba(5,150,105,0.22)] space-y-3.5 transition-all duration-300 backdrop-blur-2xl">
                <div className="flex items-center justify-between pb-2 border-b border-emerald-200/80 dark:border-emerald-500/30">
                  <div className="flex items-center gap-2.5">
                    <span className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-600 text-white font-mono font-black text-sm flex items-center justify-center shadow-md">
                      R
                    </span>
                    <h3 className="font-black text-sm sm:text-base text-emerald-950 dark:text-emerald-300 font-play">
                      4. Kết quả định lượng & ROI (Quantifiable Results)
                    </h3>
                  </div>
                  <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-emerald-200/80 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-200">
                    Giai đoạn 04
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {selectedArticle.star.results.map((res, rIdx) => (
                    <div
                      key={rIdx}
                      className="p-3.5 rounded-xl bg-white/95 dark:bg-slate-800/90 border border-emerald-200/80 dark:border-emerald-500/30 shadow-xs space-y-1.5 flex flex-col justify-between hover:border-emerald-400 dark:hover:border-emerald-300 transition"
                    >
                      <span className="text-[10px] font-mono font-black text-emerald-600 dark:text-emerald-400 tracking-wider">
                        Chỉ số đo lường 0{rIdx + 1}
                      </span>
                      <p className="text-xs font-bold text-slate-900 dark:text-white leading-relaxed">{res}</p>
                    </div>
                  ))}
                </div>
              </div>
              </>
              )}
            </div>
            </div>
          )
        )}
      </div>
      </div>

      {/* Mindmap Lightbox Modal */}
      {mindmapProject && (
        <Modal
          isOpen={!!mindmapProject}
          onClose={() => setMindmapProject(null)}
          title={`Sơ đồ tư duy: ${mindmapProject.title} (${mindmapProject.code})`}
          maxWidth="5xl"
        >
          <div className="p-4 sm:p-5 flex flex-col gap-3">
            <div className="p-3 sm:p-5 flex items-center justify-center bg-slate-950 rounded-2xl overflow-auto max-h-[75vh]">
              <img
                src={mindmapProject.mindmap || mindmapProject.image}
                alt="Sơ đồ tư duy"
                className="max-w-full max-h-[70vh] object-contain rounded-xl shadow-lg"
              />
            </div>
            <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
              <span>{mindmapProject.groupTitle}</span>
              <a
                href={mindmapProject.mindmap || mindmapProject.image}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-1.5 rounded-full bg-purple-600 text-white font-bold hover:bg-purple-700 transition inline-flex items-center gap-1.5"
              >
                <span>Mở ảnh gốc trong tab mới</span>
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7 17 17 7M7 7h10v10" />
                </svg>
              </a>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
