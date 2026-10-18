'use client';

import React, { useState, useRef } from 'react';
import { PROJECTS_DATA } from '@/data/projects';
import { ProjectData } from '@/types';
import { Modal } from '@/components/ui/Modal';
import { WebIcon } from '@/components/ui/WebIcon';
import { HeroBanner } from '@/components/ui/HeroBanner';

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
  { key: 'all', label: 'Tất cả (21)', icon: 'globe' },
  { key: 'strategy', label: '1. Chiến lược (2)', icon: 'compass' },
  { key: 'sop', label: '2. Chuẩn hóa SOP (5)', icon: 'shield' },
  { key: 'cx', label: '3. Trải nghiệm CX (4)', icon: 'sparkles' },
  { key: 'tech', label: '4. Công nghệ & AI (4)', icon: 'database' },
  { key: 'learning', label: '5. Đào tạo (6)', icon: 'graduation' },
];

export const ProjectsView: React.FC = () => {
  const [filter, setFilter] = useState<string>('all');
  const [selectedGroup, setSelectedGroup] = useState<ProjectCardGroup | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<ProjectData | null>(null);
  const [mindmapProject, setMindmapProject] = useState<ProjectData | null>(null);
  // Trạng thái thu gọn danh mục dự án trong banner (Mặc định thu gọn lại, khi bấm vào sẽ hiện ra)
  const [isCategoryOpen, setIsCategoryOpen] = useState<boolean>(false);
  // Trạng thái thu gọn toàn bộ banner dự án
  const [isBannerCollapsed, setIsBannerCollapsed] = useState<boolean>(false);

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

  const filteredProjects = PROJECTS_DATA.filter((p) => {
    if (filter === 'all') return true;
    return p.groupKey === filter;
  });

  const handleOpenGroup = (group: ProjectCardGroup, initialProject?: ProjectData) => {
    setSelectedGroup(group);
    setSelectedArticle(initialProject || group.projects[0] || null);
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
      className={`w-full h-full flex-1 flex flex-col lg:flex-row gap-[15px] max-w-7xl mx-auto select-none relative text-slate-800 ${
        selectedGroup || selectedArticle ? 'overflow-y-auto no-scrollbar pb-2' : 'overflow-hidden'
      }`}
    >
      {/* 1. VERTICAL HERO BANNER BÊN PHẢI: THU GỌN / MỞ RỘNG */}
      {isBannerCollapsed ? (
        <div
          onClick={() => setIsBannerCollapsed(false)}
          className="w-full lg:w-[46px] xl:w-[48px] shrink-0 h-[48px] lg:h-full rounded-[20px] overflow-hidden relative flex flex-row lg:flex-col justify-between items-center p-2.5 sm:p-3 border border-purple-300/70 shadow-md bg-purple-950/90 text-white cursor-pointer hover:border-cyan-400 group/collapsedBanner transition-all duration-300 select-none z-10 lg:order-2"
          title="Bấm để mở rộng Banner Danh mục dự án"
        >
          <div className="flex items-center gap-2 lg:flex-col lg:gap-3">
            <div className="w-7 h-7 rounded-lg bg-white/20 text-cyan-300 flex items-center justify-center shrink-0 group-hover/collapsedBanner:scale-110 transition-transform">
              <WebIcon name="sparkles" className="w-4 h-4 animate-banner-icon" />
            </div>
            <span className="text-[11px] font-black text-cyan-200 tracking-wider font-play [writing-mode:horizontal-tb] lg:[writing-mode:vertical-rl] lg:rotate-180 uppercase">
              Banner Dự Án
            </span>
          </div>

          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white/15 border border-white/25 text-[10px] font-extrabold text-cyan-300 group-hover/collapsedBanner:bg-cyan-500 group-hover/collapsedBanner:text-white transition-colors">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            <span>Mở</span>
          </div>
        </div>
      ) : (
        <div
          id="projects-vertical-banner"
          className="w-full lg:w-[280px] xl:w-[300px] shrink-0 h-[220px] lg:h-full rounded-[20px] overflow-hidden relative flex flex-col justify-between p-4 sm:p-5 border border-purple-200/90 shadow-md bg-purple-950/80 text-white group/vertBanner transition-all duration-300 lg:order-2"
        >
          {/* Background Video (Hình banner sáng rõ, sống động) */}
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none brightness-[1.08] contrast-[1.05] transition-transform duration-700 group-hover/vertBanner:scale-105"
            src="https://cdn.scena.ai/project/10223/cc106cb37b8d219cca59af9a71a4d7a8cd019515a3e9a8282d16909bb21d88b9.mp4"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/25 to-slate-950/35 pointer-events-none" />

          {/* Top Content: Badge & Title + Nút Thu Gọn Banner */}
          <div className="relative z-10 flex flex-col gap-2">
            <div className="flex items-center justify-between gap-2">
              <div className="self-start px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-cyan-300 font-bold text-xs shadow-xs flex items-center gap-1.5">
                <WebIcon name="sparkles" className="w-3.5 h-3.5" />
                <span>Dự án</span>
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsBannerCollapsed(true);
                }}
                className="px-2 py-0.5 rounded-full bg-white/15 hover:bg-white/25 border border-white/25 text-white/90 hover:text-white text-[10px] font-bold transition flex items-center gap-1 cursor-pointer"
                title="Bấm để thu gọn banner"
              >
                <span>Thu gọn</span>
                <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            <h2 className="text-base sm:text-lg lg:text-xl font-black text-white tracking-tight leading-tight drop-shadow-md">
              Dự Án Trọng Điểm &amp; Thành Tựu
            </h2>

            <p className="text-[11px] sm:text-xs text-white/90 font-medium leading-relaxed drop-shadow-sm line-clamp-2 lg:line-clamp-none">
              21 Dự án thực chiến quy mô lớn – Đo lường KPI &amp; ROI vượt trội
            </p>
          </div>

          {/* Middle Content: Quote & Highlights */}
          <div className="relative z-10 my-auto py-1.5 hidden lg:flex flex-col gap-2.5">
            <div className="p-2.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 shadow-inner">
              <p className="text-xs italic text-white/95 leading-relaxed font-serif">
                “Thành công của dự án nằm ở sự tỉ mỉ trong từng quy trình.”
              </p>
              <p className="text-[11px] font-bold text-cyan-300 mt-1 text-right font-play">
                — Nguyễn Hùng Thái
              </p>
            </div>

            {/* Metric Badges */}
            <div className="grid grid-cols-2 gap-2">
              <div className="p-1.5 rounded-lg bg-black/40 backdrop-blur-sm border border-white/10 text-center">
                <div className="text-sm font-black text-amber-400">21+</div>
                <div className="text-[9.5px] text-white/80 font-medium">Dự Án Thực Chiến</div>
              </div>
              <div className="p-1.5 rounded-lg bg-black/40 backdrop-blur-sm border border-white/10 text-center">
                <div className="text-base font-black text-emerald-400">98%</div>
                <div className="text-[9.5px] text-white/80 font-medium">SLA Hoàn Thành</div>
              </div>
            </div>
          </div>

          {/* NHÓM NÚT LỌC CHUYỂN VÀO BANNER: THU GỌN LẠI, KHI BẤM VÀO SẼ HIỆN RA */}
          <div className="relative z-10 flex flex-col gap-1 w-full pt-2 border-t border-white/20 shrink-0">
            <button
              type="button"
              onClick={() => setIsCategoryOpen((prev) => !prev)}
              className="w-full flex items-center justify-between p-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md transition-all cursor-pointer text-left group/catBtn"
              title={isCategoryOpen ? "Thu gọn danh mục dự án" : "Bấm để mở danh mục dự án"}
            >
              <div className="flex items-center gap-2 min-w-0">
                <div className="w-6 h-6 rounded-lg bg-cyan-400/20 text-cyan-300 flex items-center justify-center shrink-0 animate-icon-inplace">
                  <WebIcon name="layers" className="w-3.5 h-3.5" />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-200/90 font-black truncate">
                    Danh mục dự án
                  </span>
                  <span className="text-[10.5px] text-white font-bold truncate">
                    {PROJECT_CATEGORIES.find((c) => c.key === filter)?.label || 'Tất cả (21)'}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-cyan-500/25 text-cyan-200 border border-cyan-400/30 font-mono">
                  {isCategoryOpen ? 'Thu gọn' : 'Hiện ra'}
                </span>
                <svg
                  className={`w-3.5 h-3.5 text-cyan-300 transition-transform duration-300 ${
                    isCategoryOpen ? 'rotate-180' : 'rotate-0'
                  }`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </button>

            {/* Danh sách các danh mục: thu gọn lại, khi bấm vào sẽ hiện ra */}
            <div
              className={`transition-all duration-300 ease-in-out overflow-hidden ${
                isCategoryOpen
                  ? 'max-h-[300px] opacity-100 mt-1'
                  : 'max-h-0 opacity-0 pointer-events-none'
              }`}
            >
              <div className="flex flex-row lg:flex-col gap-1 overflow-x-auto lg:overflow-y-auto no-scrollbar max-h-[200px] pb-0.5">
                {PROJECT_CATEGORIES.map((item) => {
                  const isActive = filter === item.key;
                  return (
                    <button
                      key={item.key}
                      type="button"
                      onClick={() => {
                        setFilter(item.key);
                      }}
                      className={`w-full text-left px-2.5 py-1.5 rounded-xl text-[11px] font-bold font-play tracking-wide transition-all border cursor-pointer whitespace-nowrap flex items-center justify-between gap-1.5 active:scale-95 ${
                        isActive
                          ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white border-cyan-300 shadow-md shadow-cyan-500/30 scale-[1.02]'
                          : 'bg-white/10 hover:bg-white/20 text-white/90 border-white/15'
                      }`}
                    >
                      <div className="flex items-center gap-1.5 truncate">
                        <WebIcon name={item.icon} className="w-3.5 h-3.5 shrink-0" />
                        <span className="truncate">{item.label}</span>
                      </div>
                      {isActive && <span className="w-1.5 h-1.5 rounded-full bg-cyan-300 shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. MAIN AREA: 21 THẺ DỰ ÁN VỚI HÌNH BANNER LẮP ĐẦY THẺ (BÊN TRÁI) */}
      <div className="flex-1 min-w-0 h-full flex flex-col gap-2 overflow-hidden lg:order-1">
        {/* Responsive Grid Card View Container */}
        <div className="w-full flex-1 min-h-0 relative flex flex-col overflow-hidden">
        {!selectedGroup && !selectedArticle ? (
          <div className="relative w-full h-full flex-1 min-h-0 overflow-y-auto no-scrollbar py-0.5">
            {/* 21 THẺ DỰ ÁN ĐỘC LẬP - HÌNH BANNER LẮP ĐẦY THẺ DỰ ÁN 100% */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-3.5 auto-rows-[200px] sm:auto-rows-[215px] pb-4">
              {filteredProjects.map((proj) => {
                const cfg = getVisualConfigForProject(proj);
                const parentGroup = getParentGroupForProject(proj);
                const displayTitle = proj.title.includes('·')
                  ? proj.title.split('·')[1].trim()
                  : proj.title;

                return (
                  <div
                    key={proj.id}
                    onClick={() => handleOpenGroup(parentGroup, proj)}
                    className="group/card relative rounded-[18px] overflow-hidden border border-white/80 dark:border-white/20 shadow-sm hover:shadow-2xl cursor-pointer transition-all duration-300 hover:-translate-y-1 h-full min-h-0 text-left bg-slate-900"
                    title={`Bấm để xem Case Study STAR: ${proj.title}`}
                  >
                    {/* HÌNH BANNER LẮP ĐẦY TOÀN BỘ THẺ DỰ ÁN (Rõ ràng, sắc nét) */}
                    <img
                      src={proj.image}
                      alt={proj.title}
                      className="absolute inset-0 w-full h-full object-cover object-center brightness-[1.06] contrast-[1.06] group-hover/card:scale-108 transition-transform duration-700 select-none pointer-events-none"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = parentGroup.illustrationSrc;
                      }}
                    />

                    {/* Gradient Scrim nhẹ mỏng làm nổi bật hình ảnh và chữ */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent pointer-events-none" />

                    {/* Default Top Badges */}
                    <div className="absolute top-2.5 inset-x-2.5 flex items-center justify-between z-10">
                      <span
                        style={{ background: cfg.accentColor }}
                        className="px-2 py-0.5 rounded-md text-white font-mono text-[10px] font-black shadow-md border border-white/30"
                      >
                        {proj.code}
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-emerald-300 font-mono text-[9px] font-bold shadow-xs border border-white/20 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span>{proj.progressText || '100% Hoàn thành'}</span>
                      </span>
                    </div>

                    {/* KHỐI DƯỚI NẰM TRỰC TIẾP TRÊN HÌNH BANNER: TÊN DỰ ÁN & MŨI TÊN */}
                    <div className="absolute bottom-0 inset-x-0 p-3 z-10 flex items-end justify-between gap-2 bg-gradient-to-t from-slate-950/90 via-slate-950/60 to-transparent pt-6">
                      <div className="min-w-0 flex-1">
                        <span className="text-[9.5px] font-bold uppercase tracking-wider text-cyan-300/90 font-mono block truncate">
                          {parentGroup.fourWordTitle}
                        </span>
                        <h4
                          className="text-[12.5px] font-black font-play leading-snug text-white drop-shadow-md truncate mt-0.5"
                          title={proj.title}
                        >
                          {displayTitle}
                        </h4>
                      </div>

                      {/* Right: Nút mũi tên xem chi tiết */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenGroup(parentGroup, proj);
                        }}
                        style={{ background: cfg.arrowBg, boxShadow: cfg.arrowShadow }}
                        className="w-6 h-6 rounded-full text-white flex items-center justify-center shrink-0 transition-transform duration-300 group-hover/card:translate-x-0.5 hover:scale-115 cursor-pointer shadow-md"
                        title="Xem STAR Case Study"
                      >
                        <svg className="w-3 h-3 stroke-[2.8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>

                    {/* LỚP PHỦ CHI TIẾT KHI HOVER CHUỘT (Translucent Glass Overlay) */}
                    <div className="absolute inset-0 bg-slate-950/78 backdrop-blur-[5px] opacity-0 group-hover/card:opacity-100 transition-all duration-300 p-3.5 flex flex-col justify-between text-white z-20 pointer-events-none">
                      {/* Top: Nhóm & Giai đoạn */}
                      <div className="flex items-center justify-between gap-1.5 flex-wrap">
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-sm text-[10px] font-bold text-white border border-white/30 truncate max-w-[190px]">
                          <WebIcon name={parentGroup.iconName} className="w-3.5 h-3.5 shrink-0 text-cyan-300" />
                          <span className="truncate">{parentGroup.code}: {parentGroup.fourWordTitle}</span>
                        </span>

                        <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-mono text-[9px] font-black shadow-xs">
                          {proj.progressText || '100% Hoàn thành'}
                        </span>
                      </div>

                      {/* Middle: Mô tả chi tiết dự án */}
                      <div className="my-auto py-1">
                        <span className="text-[9px] uppercase tracking-wider font-mono text-cyan-300 font-bold block mb-1">
                          Mô tả dự án:
                        </span>
                        <p className="text-[11px] text-slate-100 leading-snug line-clamp-3 font-medium">
                          {proj.description}
                        </p>
                      </div>

                      {/* Bottom: Hashtags & Gợi ý click */}
                      <div className="flex items-center justify-between pt-1 border-t border-white/20 gap-1 text-[10px]">
                        <div className="flex items-center gap-1 flex-wrap overflow-hidden">
                          {proj.hashtags?.slice(0, 2).map((t) => (
                            <span key={t} className="px-1.5 py-0.2 rounded bg-white/15 text-slate-200 font-mono text-[9px] font-medium truncate">
                              {t}
                            </span>
                          ))}
                        </div>
                        <span className="text-[9.5px] text-amber-300 font-bold flex items-center gap-0.5 shrink-0">
                          <span>Xem STAR Case Study</span>
                          <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          /* Detail View cho nhóm dự án & Case Study STAR đang chọn (Bố cục thẻ xếp chồng Sticky Stacking Cards) */
          selectedArticle && (
            <div className="w-full relative flex flex-col gap-4 pb-24 text-left">
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
                            onClick={() => setSelectedArticle(proj)}
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
              </div>

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
