'use client';

import React, { useState, useRef, useEffect, useMemo } from 'react';
import { 
  LayoutGrid, 
  Maximize2, 
  ChevronRight, 
  Volume2, 
  VolumeX, 
  FolderGit2, 
  CheckCircle2, 
  Sparkles,
  Award,
  ExternalLink
} from 'lucide-react';
import { PROJECTS_DATA } from '@/data/projects';
import { ProjectData, SiteTheme } from '@/types';
import { Modal } from '@/components/ui/Modal';
import { formatCardTitle } from '@/lib/utils';
import { SoundEngine } from '@/components/ui/SoundEngine';
import { ProjectDetailView } from './ProjectDetailView';

export interface ProjectCardGroup {
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

const formatTenWordTitle = (title: string): string => {
  const clean = title.replace(/^[\d.]+\s*·\s*/, '').trim();
  const words = clean.split(/\s+/);
  if (words.length <= 10) return clean;
  return words.slice(0, 10).join(' ');
};

export const PROJECT_CARD_GROUPS: ProjectCardGroup[] = [
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
    fourWordTitle: 'Công Nghệ Data AI',
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
    fourWordTitle: 'Đào Tạo Văn Hóa',
    pillText: '6 Dự án · 5.1 – 5.6',
    desc: 'Phát triển đào tạo trực tuyến CS Academy LMS (5.1), Khung năng lực & lộ trình phát triển ASK (5.2), Thành lập Trung tâm Hỗ trợ KH (5.3), Chiến lược Customer-Centric & Khung TQA chuẩn COPC (5.4), Quản trị sự thay đổi và khủng hoảng dịch vụ (5.5), Ứng dụng trí tuệ nhân tạo nâng cao hiệu suất CSKH (5.6).',
    visualId: '06',
    illustrationSrc: '/images/skills/ill-06.png',
    iconName: 'graduation',
    projects: getByIds(['p5_1', 'p5_2', 'p5_3', 'p5_4', 'p5_5', 'p5_6']),
  },
];

export const PROJECT_CATEGORIES = [
  { id: 'all', label: 'Tất cả (21 Dự án)' },
  { id: 'strategy', label: 'Chiến Lược (2)' },
  { id: 'sop', label: 'Chuẩn Hóa SOP (5)' },
  { id: 'cx', label: 'Trải Nghiệm CX (4)' },
  { id: 'tech', label: 'Công Nghệ AI (4)' },
  { id: 'learning', label: 'Đào Tạo (6)' },
];

export interface ProjectsViewProps {
  currentTheme?: SiteTheme;
}

export const ProjectsView: React.FC<ProjectsViewProps> = ({ currentTheme = 'light-glass' }) => {
  const isDark = currentTheme === 'dark-neon';
  const isLight = currentTheme !== 'dark-neon';

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedGroup, setSelectedGroup] = useState<ProjectCardGroup | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<ProjectData | null>(null);
  const [mindmapProject, setMindmapProject] = useState<ProjectData | null>(null);
  const [activeSection, setActiveSection] = useState<string>('sec-overview');
  const [isBannerMuted, setIsBannerMuted] = useState<boolean>(true);

  const bannerVideoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (selectedArticle) {
      setActiveSection(selectedArticle.detailedSpec ? 'sec-overview' : 'sec-star-situation');
    }
  }, [selectedArticle]);

  // Bộ màu trực quan theo phân hệ (tương thích DomainsView & SkillsView)
  const getCardVisualConfig = (visualId: string) => {
    switch (visualId) {
      case '01': // Chiến lược - Sky Blue
        return {
          accentColor: isLight ? '#0284c7' : '#38bdf8',
          cardBg: isLight
            ? 'linear-gradient(135deg, #f0f7fe 0%, #ddf0fd 30%, #c4e2fa 65%, #beddf9 100%)'
            : 'linear-gradient(135deg, rgba(12, 74, 110, 0.52) 0%, rgba(15, 23, 42, 0.86) 100%)',
          cardBorder: isLight
            ? 'border-[#93c5fd]/90 hover:border-[#38bdf8]'
            : 'border-sky-400/45 hover:border-sky-300',
          ambientGlow: 'radial-gradient(circle at 75% 50%, rgba(190, 221, 249, 0.95) 0%, rgba(196, 226, 250, 0.5) 55%, transparent 75%)',
          titleColor: isLight ? 'text-[#0284c7]' : 'text-sky-300',
          pillBg: isLight
            ? 'bg-sky-100/90 border-sky-200/90 text-[#0369a1]'
            : 'bg-sky-950/80 border-sky-500/40 text-sky-200',
          arrowBg: 'linear-gradient(135deg, #38bdf8 0%, #0284c7 100%)',
          arrowShadow: '0 4px 12px rgba(2, 132, 199, 0.4)',
        };
      case '02': // CX Design - Warm Orange / Amber
        return {
          accentColor: isLight ? '#ea580c' : '#fb923c',
          cardBg: isLight
            ? 'linear-gradient(135deg, #fffcf7 0%, #fef1e2 30%, #fccc9b 65%, #fbd2a6 100%)'
            : 'linear-gradient(135deg, rgba(124, 45, 18, 0.48) 0%, rgba(15, 23, 42, 0.86) 100%)',
          cardBorder: isLight
            ? 'border-[#fdba74]/90 hover:border-[#fb923c]'
            : 'border-orange-400/45 hover:border-orange-300',
          ambientGlow: 'radial-gradient(circle at 75% 50%, rgba(251, 210, 166, 0.95) 0%, rgba(252, 204, 155, 0.5) 55%, transparent 75%)',
          titleColor: isLight ? 'text-[#ea580c]' : 'text-orange-300',
          pillBg: isLight
            ? 'bg-orange-100/80 border-orange-200/90 text-[#c2410c]'
            : 'bg-orange-950/80 border-orange-500/40 text-orange-200',
          arrowBg: 'linear-gradient(135deg, #fbbf24 0%, #ea580c 100%)',
          arrowShadow: '0 4px 12px rgba(234, 88, 12, 0.4)',
        };
      case '03': // SOP & BPO - Rose / Ruby
        return {
          accentColor: isLight ? '#e11d48' : '#fb7185',
          cardBg: isLight
            ? 'linear-gradient(135deg, #fff7f6 0%, #feeae5 30%, #fdd8cf 65%, #f9b3b1 100%)'
            : 'linear-gradient(135deg, rgba(136, 19, 55, 0.48) 0%, rgba(15, 23, 42, 0.86) 100%)',
          cardBorder: isLight
            ? 'border-[#fca5a5]/90 hover:border-[#f43f5e]'
            : 'border-rose-400/45 hover:border-rose-300',
          ambientGlow: 'radial-gradient(circle at 75% 50%, rgba(253, 216, 207, 0.95) 0%, rgba(249, 179, 177, 0.5) 55%, transparent 75%)',
          titleColor: isLight ? 'text-[#e11d48]' : 'text-rose-300',
          pillBg: isLight
            ? 'bg-rose-100/80 border-rose-200/90 text-[#be123c]'
            : 'bg-rose-950/80 border-rose-500/40 text-rose-200',
          arrowBg: 'linear-gradient(135deg, #fb7185 0%, #e11d48 100%)',
          arrowShadow: '0 4px 12px rgba(225, 29, 72, 0.4)',
        };
      case '04': // Tech & AI - Purple / Violet
        return {
          accentColor: isLight ? '#7c3aed' : '#c084fc',
          cardBg: isLight
            ? 'linear-gradient(135deg, #faf8fe 0%, #ede8fe 30%, #d9d0fb 65%, #c5b5f9 100%)'
            : 'linear-gradient(135deg, rgba(88, 28, 135, 0.52) 0%, rgba(15, 23, 42, 0.86) 100%)',
          cardBorder: isLight
            ? 'border-[#c4b5fd]/90 hover:border-[#a855f7]'
            : 'border-purple-400/45 hover:border-purple-300',
          ambientGlow: 'radial-gradient(circle at 75% 50%, rgba(217, 208, 251, 0.95) 0%, rgba(157, 126, 243, 0.5) 55%, transparent 75%)',
          titleColor: isLight ? 'text-[#7c3aed]' : 'text-purple-300',
          pillBg: isLight
            ? 'bg-purple-100/80 border-purple-200/90 text-[#5b21b6]'
            : 'bg-purple-950/80 border-purple-500/40 text-purple-200',
          arrowBg: 'linear-gradient(135deg, #a78bfa 0%, #7c3aed 100%)',
          arrowShadow: '0 4px 12px rgba(124, 58, 237, 0.4)',
        };
      case '06': // Learning & Culture - Mint / Emerald
      default:
        return {
          accentColor: isLight ? '#059669' : '#34d399',
          cardBg: isLight
            ? 'linear-gradient(135deg, #f3fbfa 0%, #dff4f2 30%, #b1dfdd 65%, #abd9d6 100%)'
            : 'linear-gradient(135deg, rgba(6, 78, 59, 0.52) 0%, rgba(15, 23, 42, 0.86) 100%)',
          cardBorder: isLight
            ? 'border-[#6ee7b7]/90 hover:border-[#10b981]'
            : 'border-emerald-400/45 hover:border-emerald-300',
          ambientGlow: 'radial-gradient(circle at 75% 50%, rgba(171, 217, 214, 0.95) 0%, rgba(177, 223, 221, 0.5) 55%, transparent 75%)',
          titleColor: isLight ? 'text-[#059669]' : 'text-emerald-300',
          pillBg: isLight
            ? 'bg-emerald-100/80 border-emerald-200/90 text-[#047857]'
            : 'bg-emerald-950/80 border-emerald-500/40 text-emerald-200',
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

  // Lọc danh sách dự án theo danh mục
  const filteredProjects = useMemo(() => {
    if (activeCategory === 'all') return PROJECTS_DATA;
    return PROJECTS_DATA.filter((p) => p.groupKey === activeCategory);
  }, [activeCategory]);

  const handleOpenGroup = (group: ProjectCardGroup, initialProject?: ProjectData) => {
    SoundEngine.playTap();
    setSelectedGroup(group);
    setSelectedArticle(initialProject || group.projects[0] || null);
  };

  const handleCloseDetail = () => {
    SoundEngine.playTap();
    setSelectedArticle(null);
    setSelectedGroup(null);
  };

  const handleToggleBannerMute = () => {
    const video = bannerVideoRef.current;
    if (!video) return;
    const next = !isBannerMuted;
    setIsBannerMuted(next);
    video.muted = next;
  };

  return (
    <div className="w-full h-full flex flex-col gap-3.5 sm:gap-4 overflow-y-auto no-scrollbar pb-6 select-none text-left">
      {/* Khi chưa chọn xem chi tiết dự án: Hiển thị Hero Banner và Danh sách thẻ dự án */}
      {!selectedGroup && !selectedArticle ? (
        <>


            <div className="flex items-center gap-2 flex-wrap shrink-0">
              {/* Bộ lọc danh mục 5 nhóm dự án */}
              <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-0.5">
                {PROJECT_CATEGORIES.map((cat) => {
                  const isSelected = activeCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => {
                        SoundEngine.playTap();
                        setActiveCategory(cat.id);
                      }}
                      className={`px-2.5 py-1 rounded-full text-[10.5px] font-bold whitespace-nowrap transition cursor-pointer border ${
                        isSelected
                          ? 'bg-cyan-600 text-white font-bold border-cyan-500 shadow-xs'
                          : 'bg-white/80 dark:bg-slate-800/80 hover:bg-cyan-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border-slate-200/80 dark:border-white/10'
                      }`}
                    >
                      {cat.label}
                    </button>
                  );
                })}
              </div>
            </div>

          {/* NỘI DUNG CHÍNH: RESPONSIVE CARD GRID VIEW (LƯỚI 4 CỘT ĐỒNG BỘ 100% NHƯ THẺ HỌC VẤN) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3.5 sm:gap-4 items-stretch">
              {filteredProjects.map((proj) => {
                const parentGroup = getParentGroupForProject(proj);
                const cfg = getVisualConfigForProject(proj);
                const orderNumber = proj.number || (proj.title.match(/^[\d.]+/)?.[0]) || '';
                const cleanTitle = proj.title.replace(/^[\d.]+\s*·\s*/, '').trim();

                return (
                  <article
                    key={proj.id}
                    onClick={() => handleOpenGroup(parentGroup, proj)}
                    className={`group relative rounded-2xl overflow-hidden p-3 sm:p-3.5 flex flex-col justify-between border select-none transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer ${
                      isDark
                        ? 'bg-slate-900/80 border-slate-700/70 hover:border-cyan-400/60 shadow-[0_4px_20px_rgba(0,0,0,0.5)] text-slate-100'
                        : 'bg-white/90 border-slate-200/90 hover:border-cyan-500/60 shadow-md text-slate-800'
                    }`}
                    style={{
                      backdropFilter: 'blur(16px)',
                    }}
                  >
                    {/* Khối Ảnh Dự Án (Tỷ Lệ 16/10 Chuẩn Thẻ Học Vấn) */}
                    <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden bg-slate-950 shrink-0 border border-black/10 dark:border-white/10 shadow-xs mb-2.5 group/img">
                      <img
                        src={proj.image}
                        alt={proj.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://i.ibb.co/vzG7Z1z/hungthai-avatar.jpg';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent pointer-events-none" />

                      {/* Badge Mã Dự Án & Tiến độ */}
                      <div className="absolute top-2 left-2 flex items-center gap-1 z-10">
                        <span
                          style={{ color: cfg.accentColor }}
                          className="px-2 py-0.5 rounded-md text-[9.5px] font-mono font-bold bg-black/70 border border-white/20 backdrop-blur-md"
                        >
                          {proj.code}
                        </span>
                        <span className="px-1.5 py-0.5 rounded-md text-[9px] font-mono font-semibold bg-black/60 text-white/90 border border-white/15 backdrop-blur-md">
                          {proj.phase || '100% Hoàn thành'}
                        </span>
                      </div>

                      {/* Nút phóng to / xem sơ đồ tư duy Mindmap */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          SoundEngine.playTap();
                          setMindmapProject(proj);
                        }}
                        title="Phóng to sơ đồ tư duy Mindmap"
                        className="absolute top-2 right-2 w-7 h-7 rounded-lg bg-black/60 hover:bg-cyan-600 text-white flex items-center justify-center transition border border-white/20 backdrop-blur-md opacity-85 group-hover:opacity-100 cursor-pointer shadow-xs"
                      >
                        <Maximize2 className="w-3.5 h-3.5" />
                      </button>

                      {/* Nhãn #8.1 Chiến Lược Vận Hành & Trưởng Phòng Chăm Sóc Khách Hàng ở chân ảnh */}
                      <div className="absolute bottom-1.5 left-2 right-2 flex flex-col gap-0.5 drop-shadow-sm font-play">
                        <div className="flex items-center justify-between gap-1 text-[10px] font-black text-amber-300">
                          <span className="truncate">
                            #{orderNumber || proj.code || proj.number} {parentGroup.fourWordTitle}
                          </span>
                          <span className="text-[9px] text-cyan-300 font-mono shrink-0 ml-1">
                            {proj.number ? `Mã ${proj.number}` : 'STAR Case'}
                          </span>
                        </div>
                        <span className="text-[10px] font-bold text-white/95 truncate block">
                          {proj.role || 'Trưởng Dự Án'}
                        </span>
                      </div>
                    </div>

                    {/* Phần Thân Card: Tiêu đề dự án 2 dòng, Phân loại & Tóm tắt */}
                    <div className="flex-1 flex flex-col justify-between space-y-1.5">
                      <div>
                        <div className="flex items-center gap-1.5 mb-1">
                          <span
                            className="px-1.5 py-0.5 rounded text-[9.5px] font-mono font-black shrink-0"
                            style={{
                              backgroundColor: `${cfg.accentColor}18`,
                              color: cfg.accentColor,
                              border: `1px solid ${cfg.accentColor}40`,
                            }}
                          >
                            #{orderNumber || proj.code || proj.number} {parentGroup.fourWordTitle}
                          </span>
                          <span
                            className="text-[10px] font-bold font-play tracking-tight truncate"
                            style={{ color: cfg.accentColor }}
                            title={proj.role || 'Trưởng Dự Án'}
                          >
                            {proj.role || 'Trưởng Dự Án'}
                          </span>
                          <span className="ml-auto text-[9px] font-mono text-slate-400 shrink-0">
                            {proj.progressPercent ? `${proj.progressPercent}%` : '100%'}
                          </span>
                        </div>

                        {/* Tiêu đề dự án hiển thị đầy đủ có số thứ tự và chỉ 2 dòng */}
                        <h3
                          className="font-black font-play text-[14px] sm:text-[14.5px] leading-snug tracking-tight group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors break-words line-clamp-2 overflow-hidden"
                          style={{ color: isDark ? '#ffffff' : cfg.accentColor }}
                          title={proj.title}
                        >
                          {/^[\d.]+\s*·/.test(proj.title) ? proj.title : `${proj.code || proj.number ? `${proj.code || proj.number} · ` : ''}${proj.title}`}
                        </h3>

                        <p className={`text-[11px] leading-snug line-clamp-2 mt-1.5 font-medium ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                          {proj.description}
                        </p>
                      </div>

                      {/* Tags hashtag kỹ năng */}
                      <div className="pt-2 border-t border-black/5 dark:border-white/10">
                        <div className="flex items-center gap-1 flex-wrap mb-2">
                          {proj.hashtags.slice(0, 3).map((tag, tIdx) => (
                            <span
                              key={tIdx}
                              className="px-1.5 py-0.5 rounded text-[9.5px] font-mono font-medium bg-cyan-50 dark:bg-cyan-950/60 text-cyan-700 dark:text-cyan-300 border border-cyan-200/80 dark:border-cyan-800/60"
                            >
                              {tag.replace(/^#/, '')}
                            </span>
                          ))}
                        </div>

                        <button
                          type="button"
                          onClick={() => handleOpenGroup(parentGroup, proj)}
                          className="w-full py-1.5 px-2.5 rounded-xl text-xs font-bold font-play flex items-center justify-center gap-1 transition border bg-slate-100 hover:bg-cyan-50 text-slate-700 hover:text-cyan-700 dark:bg-slate-800 dark:hover:bg-cyan-950/60 dark:text-slate-200 dark:hover:text-cyan-300 border-slate-300/80 dark:border-white/15 cursor-pointer shadow-2xs group-hover:border-cyan-400/60"
                        >
                          <span>Xem chi tiết dự án</span>
                          <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
        </>
      ) : (
        /* 3. CHI TIẾT DỰ ÁN & HỒ SƠ STAR TOÀN DIỆN */
        selectedArticle && (
          <div className="w-full flex-1 min-h-0 relative flex flex-col overflow-hidden">
            <ProjectDetailView
              selectedArticle={selectedArticle}
              selectedGroup={selectedGroup}
              onSelectProject={(proj) => setSelectedArticle(proj)}
              onClose={handleCloseDetail}
              onOpenMindmap={(proj) => setMindmapProject(proj)}
              getCardVisualConfig={getCardVisualConfig}
              isLight={isLight}
              activeSection={activeSection}
              onSectionChange={setActiveSection}
            />
          </div>
        )
      )}

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
                className="px-3.5 py-1.5 rounded-full bg-cyan-600 text-white font-bold hover:bg-cyan-700 transition inline-flex items-center gap-1.5"
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
