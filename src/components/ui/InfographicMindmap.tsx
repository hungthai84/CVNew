'use client';

import React, { useState, useRef, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Sparkles,
  Volume2,
  VolumeX,
  ExternalLink,
  Gem,
  BarChart3,
  Rocket,
  Bot,
  ShieldCheck,
  MessageCircle,
  Info,
  Sliders,
  Zap,
  Check,
  X,
  Briefcase,
  Layers,
  ArrowRight,
  Filter,
} from 'lucide-react';
import { cn, formatCardTitle } from '@/lib/utils';
import { SoundEngine } from '@/components/ui/SoundEngine';
import { useToast } from '@/components/ui/Toast';
import { PROJECTS_DATA } from '@/data/projects';
import { ProjectData } from '@/types';

// Bộ sưu tập hình ảnh minh họa 3D phong cách lĩnh vực cho các nhánh kỹ năng
const SKILL_ILLUSTRATIONS: Record<string, string> = {
  'skill-01': 'https://i.ibb.co/Kj5P9tvf/X-y-d-ng-h-th-ng-removebg-preview.png',
  'skill-02': 'https://i.ibb.co/hRJDnYw4/Thanh-to-n-i-n-t-removebg-preview.png',
  'skill-03': 'https://i.ibb.co/fY3Nqny0/Th-ng-m-i-i-n-t-removebg-preview.png',
  'skill-04': 'https://i.ibb.co/pBKmWZHc/Game-e-Sports-removebg-preview.png',
  'skill-05': 'https://i.ibb.co/B8K1Gwr/D-ch-v-b-o-hi-m-removebg-preview.png',
  'skill-06': 'https://i.ibb.co/4RYYfBvx/D-ch-v-vi-n-th-ng-removebg-preview.png',
};

// Thuật toán vẽ đường line kết nối chuẩn xác theo yêu cầu:
// - Thẻ Hàng 1 (trên): Xuất phát từ TOP hình tròn (500, 220)
// - Thẻ Hàng 2 (chính giữa): Xuất phát từ GIỮA BÊN TRÁI (420, 300) và GIỮA BÊN PHẢI (580, 300)
// - Thẻ Hàng 3 (dưới): Xuất phát từ BOT hình tròn (500, 380)
const getMindmapConnectorPath = (
  rowIdx: number,
  isLeft: boolean
): string => {
  const radius = 16;
  const endX = isLeft ? 300 : 700;

  if (rowIdx === 0) {
    // HÀNG 1: Xuất phát từ TOP hình tròn (500, 220), đích đến targetY = 110
    const startX = 500;
    const startY = 220;
    const endY = 110;
    const cornerStartX = isLeft ? startX - radius : startX + radius;
    const cornerStartY = endY + radius;
    return `M ${startX} ${startY} L ${startX} ${cornerStartY} Q ${startX} ${endY} ${cornerStartX} ${endY} L ${endX} ${endY}`;
  } else if (rowIdx === 1) {
    // HÀNG 2 (CHÍNH GIỮA): Xuất phát từ GIỮA BÊN TRÁI (420, 300) hoặc GIỮA BÊN PHẢI (580, 300)
    const startX = isLeft ? 420 : 580;
    const startY = 300;
    const endY = 300;
    // Đường thẳng ngang trực diện từ mép hình tròn đến mép card
    return `M ${startX} ${startY} L ${endX} ${endY}`;
  } else {
    // HÀNG 3: Xuất phát từ BOT hình tròn (500, 380), đích đến targetY = 490
    const startX = 500;
    const startY = 380;
    const endY = 490;
    const cornerStartX = isLeft ? startX - radius : startX + radius;
    const cornerStartY = endY - radius;
    return `M ${startX} ${startY} L ${startX} ${cornerStartY} Q ${startX} ${endY} ${cornerStartX} ${endY} L ${endX} ${endY}`;
  }
};

export interface MindmapPill {
  name: string;
  score: string;
  desc: string;
}

export interface MindmapDetailItem {
  title: string;
  percent: number;
  desc: string;
}

export interface MindmapCardData {
  id: string;
  categoryFilter: 'S' | 'W' | 'O' | 'T' | 'LANG';
  themeColor: string;
  cardBg: string;
  cardDarkBg?: string;
  cardBorder: string;
  title: string;
  groupHeading: string;
  subTag: string;
  desc: string;
  pills: MindmapPill[];
  details: MindmapDetailItem[];
  metricLabel: string;
  [key: string]: any;
}

interface InfographicMindmapProps<T extends MindmapCardData = MindmapCardData> {
  cards: T[];
  isDark: boolean;
  onSelectCard: (card: T) => void;
  onPlayAudio?: (cardId: string, summaryText: string, e: React.MouseEvent) => void;
  playingAudioId?: string | null;
  audioSummaries?: Record<string, { title: string; text: string }>;
  onNavigatePage?: (pageIndex: number) => void;
}

/**
 * Thuật toán tìm kiếm danh sách các dự án thực tế liên quan mật thiết đến kỹ năng được chọn
 */
function findRelatedProjectsForSkill(skillName: string, categoryFilter?: string): ProjectData[] {
  const norm = skillName.toLowerCase();

  const matched = PROJECTS_DATA.filter((p) => {
    const text = (
      p.title +
      ' ' +
      p.tagline +
      ' ' +
      p.groupTitle +
      ' ' +
      p.hashtags.join(' ') +
      ' ' +
      (p.star?.approach || '') +
      ' ' +
      (p.star?.situation || '')
    ).toLowerCase();

    if (
      (norm.includes('chiến lược') || norm.includes('hoạch định')) &&
      (text.includes('chiến lược') || text.includes('strategy') || p.code.startsWith('1.'))
    )
      return true;
    if (
      (norm.includes('kpi') || norm.includes('sla')) &&
      (text.includes('kpi') || text.includes('sla') || p.code.startsWith('2.'))
    )
      return true;
    if (
      (norm.includes('quy trình') || norm.includes('sop') || norm.includes('chuẩn hóa')) &&
      (text.includes('quy trình') || text.includes('sop') || p.code.startsWith('2.') || p.code.startsWith('1.'))
    )
      return true;
    if (
      (norm.includes('khiếu nại') || norm.includes('sự cố') || norm.includes('khủng hoảng') || norm.includes('rủi ro')) &&
      (text.includes('khiếu nại') || text.includes('sự cố') || text.includes('rủi ro') || p.code.startsWith('4.'))
    )
      return true;
    if (
      (norm.includes('đào tạo') || norm.includes('coaching') || norm.includes('nhân sự') || norm.includes('kế thừa')) &&
      (text.includes('đào tạo') || text.includes('nhân sự') || p.code.startsWith('3.'))
    )
      return true;
    if (
      (norm.includes('chi phí') || norm.includes('kaizen') || norm.includes('tối ưu') || norm.includes('năng suất')) &&
      (text.includes('chi phí') || text.includes('tối ưu') || p.code.startsWith('6.') || p.code.startsWith('7.'))
    )
      return true;
    if (
      (norm.includes('ai') || norm.includes('công nghệ') || norm.includes('crm') || norm.includes('tự động') || norm.includes('dữ liệu')) &&
      (text.includes('ai') || text.includes('crm') || text.includes('tự động') || p.code.startsWith('5.'))
    )
      return true;
    if (
      (norm.includes('ngôn ngữ') || norm.includes('tiếng anh') || norm.includes('quốc tế') || norm.includes('giao tiếp')) &&
      (text.includes('quốc tế') || text.includes('omnichannel') || p.code.startsWith('5.') || p.code.startsWith('1.'))
    )
      return true;
    if (
      (norm.includes('văn hóa') || norm.includes('trải nghiệm') || norm.includes('cx') || norm.includes('khách hàng')) &&
      (text.includes('trải nghiệm') || text.includes('khách hàng') || text.includes('văn hóa'))
    )
      return true;

    return false;
  });

  // Fallback nếu không có kết quả khớp chính xác: lấy theo danh mục ma trận
  if (matched.length === 0) {
    if (categoryFilter === 'S') return PROJECTS_DATA.slice(0, 3);
    if (categoryFilter === 'W') return PROJECTS_DATA.slice(3, 6);
    if (categoryFilter === 'O') return PROJECTS_DATA.slice(12, 15);
    if (categoryFilter === 'T') return PROJECTS_DATA.slice(9, 12);
    return PROJECTS_DATA.slice(0, 3);
  }

  return matched.slice(0, 3);
}

export function InfographicMindmap<T extends MindmapCardData = MindmapCardData>({
  cards,
  isDark,
  onSelectCard,
  onPlayAudio,
  playingAudioId,
  audioSummaries = {},
  onNavigatePage,
}: InfographicMindmapProps<T>) {
  const { showToast } = useToast();
  const containerRef = useRef<HTMLDivElement>(null);

  // 1. Navigation & Zoom State
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [selectedBranchId, setSelectedBranchId] = useState<string | null>(null);
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<'all' | 'S' | 'W' | 'O' | 'T' | 'LANG'>('all');



  // 4. YÊU CẦU 4: Liên Kết Nhanh Đến Dự Án Thực Chiến (Cross-link to Projects Modal)
  const [selectedSkillForProjects, setSelectedSkillForProjects] = useState<{
    skillName: string;
    score: string;
    groupTitle: string;
    themeColor: string;
    desc: string;
    categoryFilter?: string;
  } | null>(null);


  // Helper icons cho từng nhánh
  const getBranchIcon = (cardId: string, className = 'w-4 h-4') => {
    switch (cardId) {
      case 'skill-01':
        return <Gem className={className} />;
      case 'skill-02':
        return <BarChart3 className={className} />;
      case 'skill-03':
        return <Rocket className={className} />;
      case 'skill-04':
        return <Bot className={className} />;
      case 'skill-05':
        return <ShieldCheck className={className} />;
      case 'skill-06':
      default:
        return <MessageCircle className={className} />;
    }
  };

  const handleZoom = (delta: number) => {
    SoundEngine.playTap();
    setZoomLevel((prev) => Math.min(1.4, Math.max(0.7, Number((prev + delta).toFixed(2)))));
  };

  const handleResetZoom = () => {
    SoundEngine.playTap();
    setZoomLevel(1);
    setSelectedBranchId(null);
  };

  // Lọc các card theo quadrant nếu có bộ lọc
  const visibleCards = useMemo(() => {
    if (activeFilter === 'all') return cards;
    return cards.filter(
      (c) =>
        c.categoryFilter === activeFilter ||
        (activeFilter === 'LANG' && (c.categoryFilter === 'LANG' || c.id === 'skill-06'))
    );
  }, [cards, activeFilter]);

  // Phân chia 6 nhánh chính theo 2 cánh (Trái 3 nhánh, Phải 3 nhánh)
  const leftBranches = visibleCards.filter((_, idx) => idx % 2 === 0);
  const rightBranches = visibleCards.filter((_, idx) => idx % 2 !== 0);

  return (
    <div
      ref={containerRef}
      className={cn(
        'relative w-full h-full flex-1 min-h-0 rounded-2xl border overflow-hidden select-none transition-all duration-300 flex flex-col justify-between',
        isDark
          ? 'bg-gradient-to-b from-slate-950/90 via-slate-900/80 to-slate-950/95 border-slate-800/80 shadow-[0_8px_32px_rgba(0,0,0,0.5)]'
          : 'bg-gradient-to-b from-white/95 via-sky-50/40 to-slate-50/90 border-slate-200/90 shadow-[0_12px_40px_rgba(100,116,139,0.12)]'
      )}
    >
      {/* 1. MẠNG LƯỚI INFOGRAPHIC GRID NỀN (Vector Dots & Radial Gradients) */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <svg width="100%" height="100%">
          <pattern id="mindmap-dots" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
            <circle
              cx="2"
              cy="2"
              r="1.2"
              fill={isDark ? 'rgba(56, 189, 248, 0.25)' : 'rgba(2, 132, 199, 0.18)'}
            />
          </pattern>
          <rect width="100%" height="100%" fill="url(#mindmap-dots)" />
        </svg>
      </div>

      {/* Hiệu ứng hào quang tâm điểm trung tâm */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] rounded-full pointer-events-none blur-3xl opacity-20"
        style={{
          background: isDark
            ? 'radial-gradient(circle, rgba(56, 189, 248, 0.4) 0%, rgba(139, 92, 246, 0.2) 50%, transparent 70%)'
            : 'radial-gradient(circle, rgba(2, 132, 199, 0.25) 0%, rgba(99, 102, 241, 0.15) 50%, transparent 70%)',
        }}
      />

      {/* 2. FLOATING HUD TOOLBAR (Điều khiển Zoom / Reset) */}
      <div className="absolute top-2.5 sm:top-3 left-2.5 sm:left-3.5 right-2.5 sm:right-3.5 z-30 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
        {/* Left: Nhãn chế độ Infographic */}
        <div className="flex items-center gap-2 px-3 py-1 rounded-full border backdrop-blur-xl pointer-events-auto shadow-sm bg-white/85 dark:bg-slate-900/85 border-slate-200/80 dark:border-slate-800">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-semibold tracking-wide text-slate-700 dark:text-slate-200">
            Sơ đồ tư duy
          </span>
          <span className="text-[10px] px-1.5 py-0.5 rounded-md font-mono bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-400/20">
            {Math.round(zoomLevel * 100)}%
          </span>
        </div>

        {/* Right: Zoom Controls */}
        <div className="flex items-center gap-2 pointer-events-auto">
          <div className="hidden sm:flex items-center gap-1 p-1 rounded-full border backdrop-blur-xl bg-white/85 dark:bg-slate-900/85 border-slate-200/80 dark:border-slate-800 shadow-sm">
            <button
              type="button"
              onClick={() => handleZoom(-0.1)}
              title="Thu nhỏ"
              className="w-6.5 h-6.5 flex items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={handleResetZoom}
              title="Khôi phục chuẩn 100%"
              className="w-6.5 h-6.5 flex items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => handleZoom(0.1)}
              title="Phóng to"
              className="w-6.5 h-6.5 flex items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* 3. VÙNG HIỂN THỊ MINDMAP FULL CHIỀU RỘNG & CHIỀU CAO */}
      <div className="relative flex-1 min-h-0 w-full h-full overflow-y-auto md:overflow-hidden overflow-x-hidden px-2.5 sm:px-3.5 pt-11 pb-2 flex items-stretch justify-between custom-scrollbar">
        <motion.div
          animate={{ scale: zoomLevel }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="relative w-full h-full flex-1 min-h-0 flex flex-col md:flex-row items-stretch justify-between gap-3 sm:gap-6 lg:gap-8"
        >
          {/* YÊU CẦU 1: SVG CONNECTOR OVERLAY & ANIMATED ENERGY PARTICLE STREAM */}
          <div className="hidden md:block absolute inset-0 pointer-events-none z-0">
            <svg
              className="w-full h-full overflow-visible"
              viewBox="0 0 1000 600"
              preserveAspectRatio="none"
            >
              <defs>
                <filter id="mindmap-energy-glow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="3.5" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Đường năng lượng kết nối sang cánh trái: Hàng 1 từ TOP, Hàng 2 từ TRÁI GIỮA, Hàng 3 từ BOT */}
              {leftBranches.map((card, idx) => {
                const pathD = getMindmapConnectorPath(idx, true);
                const isHovered = hoveredNodeId === card.id || selectedBranchId === card.id;

                return (
                  <g key={`left-stream-${card.id}`}>
                    <path
                      d={pathD}
                      fill="none"
                      stroke={card.themeColor}
                      strokeWidth={isHovered ? 3 : 2}
                      opacity={isHovered ? 1 : isDark ? 0.65 : 0.55}
                      strokeDasharray="6,4"
                      className="transition-all duration-300"
                    />

                    {isHovered && (
                      <path
                        d={pathD}
                        fill="none"
                        stroke={card.themeColor}
                        strokeWidth={5}
                        filter="url(#mindmap-energy-glow)"
                        opacity={0.85}
                      />
                    )}

                    <circle
                      r={isHovered ? 5 : 3.5}
                      fill={isHovered ? '#ffffff' : card.themeColor}
                      filter="url(#mindmap-energy-glow)"
                    >
                      <animateMotion
                        path={pathD}
                        dur={isHovered ? '1.5s' : '3.2s'}
                        repeatCount="indefinite"
                      />
                    </circle>

                    <circle
                      r={isHovered ? 3.5 : 2.5}
                      fill={card.themeColor}
                      opacity={0.85}
                      filter="url(#mindmap-energy-glow)"
                    >
                      <animateMotion
                        path={pathD}
                        dur={isHovered ? '1.5s' : '3.2s'}
                        begin="0.75s"
                        repeatCount="indefinite"
                      />
                    </circle>
                  </g>
                );
              })}

              {/* Đường năng lượng kết nối sang cánh phải: Hàng 1 từ TOP, Hàng 2 từ PHẢI GIỮA, Hàng 3 từ BOT */}
              {rightBranches.map((card, idx) => {
                const pathD = getMindmapConnectorPath(idx, false);
                const isHovered = hoveredNodeId === card.id || selectedBranchId === card.id;

                return (
                  <g key={`right-stream-${card.id}`}>
                    <path
                      d={pathD}
                      fill="none"
                      stroke={card.themeColor}
                      strokeWidth={isHovered ? 3 : 2}
                      opacity={isHovered ? 1 : isDark ? 0.65 : 0.55}
                      strokeDasharray="6,4"
                      className="transition-all duration-300"
                    />

                    {isHovered && (
                      <path
                        d={pathD}
                        fill="none"
                        stroke={card.themeColor}
                        strokeWidth={5}
                        filter="url(#mindmap-energy-glow)"
                        opacity={0.85}
                      />
                    )}

                    <circle
                      r={isHovered ? 5 : 3.5}
                      fill={isHovered ? '#ffffff' : card.themeColor}
                      filter="url(#mindmap-energy-glow)"
                    >
                      <animateMotion
                        path={pathD}
                        dur={isHovered ? '1.5s' : '3.2s'}
                        repeatCount="indefinite"
                      />
                    </circle>

                    <circle
                      r={isHovered ? 3.5 : 2.5}
                      fill={card.themeColor}
                      opacity={0.85}
                      filter="url(#mindmap-energy-glow)"
                    >
                      <animateMotion
                        path={pathD}
                        dur={isHovered ? '1.5s' : '3.2s'}
                        begin="0.75s"
                        repeatCount="indefinite"
                      />
                    </circle>
                  </g>
                );
              })}

              <g className="transition-transform duration-300">
                <circle cx="500" cy="220" r="7" fill="#0284c7" opacity="0.95" />
                <circle cx="500" cy="220" r="3" fill="#ffffff" />
                <circle cx="500" cy="220" r="11" fill="none" stroke={isDark ? '#38bdf8' : '#0284c7'} strokeWidth="1.5" opacity="0.7" strokeDasharray="3,3" />
              </g>

              <g className="transition-transform duration-300">
                <circle cx="420" cy="300" r="7" fill="#0284c7" opacity="0.95" />
                <circle cx="420" cy="300" r="3" fill="#ffffff" />
                <circle cx="420" cy="300" r="11" fill="none" stroke={isDark ? '#38bdf8' : '#0284c7'} strokeWidth="1.5" opacity="0.7" strokeDasharray="3,3" />
              </g>

              <g className="transition-transform duration-300">
                <circle cx="580" cy="300" r="7" fill="#0284c7" opacity="0.95" />
                <circle cx="580" cy="300" r="3" fill="#ffffff" />
                <circle cx="580" cy="300" r="11" fill="none" stroke={isDark ? '#38bdf8' : '#0284c7'} strokeWidth="1.5" opacity="0.7" strokeDasharray="3,3" />
              </g>

              <g className="transition-transform duration-300">
                <circle cx="500" cy="380" r="7" fill="#0284c7" opacity="0.95" />
                <circle cx="500" cy="380" r="3" fill="#ffffff" />
                <circle cx="500" cy="380" r="11" fill="none" stroke={isDark ? '#38bdf8' : '#0284c7'} strokeWidth="1.5" opacity="0.7" strokeDasharray="3,3" />
              </g>
            </svg>
          </div>

          {/* CÁNH TRÁI: 3 thẻ — Full chiều cao & chiều rộng, danh sách kỹ năng 2 cột 2 hàng */}
          <div className="flex-1 w-full h-full min-h-0 flex flex-col justify-between gap-2.5 sm:gap-3 z-10">
            {leftBranches.map((card, idx) => {
              const isSelected = selectedBranchId === card.id;
              const hasAudio = Boolean(audioSummaries[card.id]);
              const isPlayingAudio = playingAudioId === card.id;
              const cardOrder = idx === 0 ? '01' : idx === 1 ? '02' : '03';
              const displayPills = card.details.slice(0, 4).map((d) => ({
                name: d.title,
                score: `${d.percent}%`,
                desc: d.desc,
              }));

              return (
                <motion.div
                  key={card.id}
                  layout
                  onMouseEnter={() => setHoveredNodeId(card.id)}
                  onMouseLeave={() => setHoveredNodeId(null)}
                  onClick={() => setSelectedBranchId(isSelected ? null : card.id)}
                  className={cn(
                    'group relative p-2.5 sm:p-3 rounded-2xl border backdrop-blur-xl transition-all duration-300 cursor-pointer w-full h-full flex-1 min-h-0 flex flex-col justify-between overflow-hidden shadow-[0_10px_25px_-5px_rgba(0,0,0,0.06)] hover:-translate-y-0.5 hover:shadow-lg',
                    isSelected && 'ring-2 ring-offset-2 dark:ring-offset-slate-950',
                    isSelected && isDark && 'shadow-[0_0_20px_rgba(56,189,248,0.25)]'
                  )}
                  style={{
                    background: isDark
                      ? card.cardDarkBg || 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.85) 100%)'
                      : card.cardBg,
                    borderColor: isDark ? `${card.themeColor}55` : `${card.themeColor}40`,
                    boxShadow: isDark
                      ? `0 10px 25px -5px rgba(0, 0, 0, 0.5), inset 0 1px 1px rgba(255, 255, 255, 0.1)`
                      : `0 10px 25px -5px rgba(0, 0, 0, 0.06), inset 0 1px 1px rgba(255, 255, 255, 0.85)`,
                  }}
                >
                  {/* Header: Số thứ tự, Icon & Tên kỹ năng */}
                  <div className="flex items-center justify-between gap-2 pb-1 shrink-0">
                    <div className="flex items-center gap-2 min-w-0">
                      <span
                        className="w-5 h-5 rounded-full flex items-center justify-center text-white text-[10px] font-mono font-bold shrink-0 shadow-2xs"
                        style={{ backgroundColor: card.themeColor }}
                      >
                        {cardOrder}
                      </span>
                      {SKILL_ILLUSTRATIONS[card.id] && (
                        <img
                          src={SKILL_ILLUSTRATIONS[card.id]}
                          alt={card.title}
                          className="w-6 h-6 sm:w-7 sm:h-7 object-contain drop-shadow-md shrink-0 pointer-events-none select-none"
                          loading="lazy"
                        />
                      )}
                      <div
                        className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full border backdrop-blur-md min-w-0"
                        style={{
                          backgroundColor: isDark ? `${card.themeColor}20` : `${card.themeColor}12`,
                          borderColor: isDark ? `${card.themeColor}50` : `${card.themeColor}35`,
                        }}
                      >
                        <span style={{ color: card.themeColor }}>{getBranchIcon(card.id, 'w-3.5 h-3.5 shrink-0')}</span>
                        <span
                          className="text-[14px] sm:text-[15.5px] lg:text-[16.5px] font-black font-play leading-tight tracking-tight truncate"
                          style={{ color: card.themeColor }}
                        >
                          {formatCardTitle(card.title)}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      {hasAudio && onPlayAudio && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onPlayAudio(card.id, audioSummaries[card.id]?.text || card.desc, e);
                          }}
                          className={cn(
                            'w-6 h-6 rounded-full flex items-center justify-center transition-all duration-200',
                            isPlayingAudio
                              ? 'bg-emerald-500 text-white shadow-sm'
                              : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                          )}
                          title="Nghe tóm tắt điều hành 15s"
                        >
                          {isPlayingAudio ? (
                            <Volume2 className="w-3.5 h-3.5 animate-pulse" />
                          ) : (
                            <VolumeX className="w-3.5 h-3.5" />
                          )}
                        </button>
                      )}

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          SoundEngine.playTap();
                          onSelectCard(card);
                        }}
                        className="w-6 h-6 rounded-full flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-sky-500 transition-colors"
                        title="Xem chi tiết thẻ"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Mô tả súc tích của nhánh */}
                  <p className="text-[11px] text-slate-600 dark:text-slate-300 line-clamp-1 leading-snug mb-1.5 shrink-0">
                    {card.desc}
                  </p>

                  {/* Danh sách kỹ năng: Hiển thị 2 cột 2 hàng full chiều rộng & chiều cao */}
                  <div className="grid grid-cols-2 grid-rows-2 gap-1.5 w-full flex-1 min-h-0 items-stretch overflow-hidden">
                    {displayPills.map((pill, pIdx) => (
                      <button
                        key={pIdx}
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          SoundEngine.playTap();
                          setSelectedSkillForProjects({
                            skillName: pill.name,
                            score: pill.score,
                            groupTitle: card.title,
                            themeColor: card.themeColor,
                            desc: pill.desc,
                            categoryFilter: card.categoryFilter,
                          });
                        }}
                        className={cn(
                          'w-full h-full flex items-center justify-between gap-1 px-2 py-1 rounded-lg text-[10.5px] font-semibold border transition-all duration-200 cursor-pointer min-w-0',
                          isDark
                            ? 'bg-slate-800/85 border-slate-700/80 text-slate-200 hover:border-slate-500'
                            : 'bg-white/85 border-slate-200/90 text-slate-800 hover:border-slate-300 shadow-2xs'
                        )}
                        title={`Bấm để xem các dự án thực tế đã áp dụng: ${pill.name}`}
                      >
                        <div className="flex items-center gap-1 min-w-0 flex-1">
                          <span className="text-[9px] font-mono font-bold text-slate-400 dark:text-slate-500 shrink-0">
                            {pIdx + 1}.
                          </span>
                          <Zap className="w-2.5 h-2.5 shrink-0" style={{ color: card.themeColor }} />
                          <span className="truncate text-left">{pill.name}</span>
                        </div>
                        <span
                          className="font-mono text-[9.5px] font-bold px-1.5 py-0.2 rounded shrink-0"
                          style={{
                            color: card.themeColor,
                            backgroundColor: isDark ? `${card.themeColor}25` : `${card.themeColor}15`,
                          }}
                        >
                          {pill.score}
                        </span>
                      </button>
                    ))}
                  </div>

                  {/* Thanh tiến trình hào quang phát sáng ở cạnh dưới card */}
                  <div
                    className="absolute bottom-0 left-4 right-4 h-[2px] rounded-full opacity-60 group-hover:opacity-100 transition-opacity"
                    style={{
                      background: `linear-gradient(90deg, transparent, ${card.themeColor}, transparent)`,
                    }}
                  />
                </motion.div>
              );
            })}
          </div>

          {/* TRUNG TÂM: CENTRAL HUB CORE (HẠT NHÂN QUẢN TRỊ ĐIỀNH HÀNH) */}
          <div className="relative shrink-0 flex flex-col items-center justify-center my-4 md:my-0 z-20 self-center">
            <div
              className="absolute w-40 h-40 sm:w-48 sm:h-48 rounded-full border border-dashed opacity-40 animate-spin"
              style={{
                borderColor: isDark ? 'rgba(56, 189, 248, 0.4)' : 'rgba(2, 132, 199, 0.35)',
                animationDuration: '40s',
              }}
            />
            <div
              className="absolute w-32 h-32 sm:w-40 sm:h-40 rounded-full border border-sky-400/20 opacity-30 animate-ping"
              style={{ animationDuration: '6s' }}
            />

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className={cn(
                'relative w-32 h-32 sm:w-40 sm:h-40 rounded-full p-1 border shadow-xl flex flex-col items-center justify-center text-center backdrop-blur-2xl transition-all duration-300',
                isDark
                  ? 'bg-slate-900/90 border-sky-400/40 shadow-[0_0_35px_rgba(56,189,248,0.25)]'
                  : 'bg-white/95 border-sky-500/30 shadow-[0_12px_35px_rgba(14,165,233,0.18)]'
              )}
            >
              <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center text-white shadow-md mb-1">
                <Sparkles className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
              </div>

              <h4 className="text-xs sm:text-sm font-extrabold text-slate-800 dark:text-slate-100 tracking-tight leading-tight px-2">
                Kỹ Năng Cốt Lõi
              </h4>
              <p className="text-[10px] sm:text-[11px] text-sky-600 dark:text-sky-400 font-semibold tracking-wide mt-0.5">
                Nguyễn Hùng Thái
              </p>

              <div className="mt-1 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                22+ Năm Vận Hành
              </div>
            </motion.div>
          </div>

          {/* CÁNH PHẢI: 3 thẻ — Full chiều cao & chiều rộng, danh sách kỹ năng 2 cột 2 hàng */}
          <div className="flex-1 w-full h-full min-h-0 flex flex-col justify-between gap-2.5 sm:gap-3 z-10">
            {rightBranches.map((card, idx) => {
              const isSelected = selectedBranchId === card.id;
              const hasAudio = Boolean(audioSummaries[card.id]);
              const isPlayingAudio = playingAudioId === card.id;
              const cardOrder = idx === 0 ? '04' : idx === 1 ? '05' : '06';
              const displayPills = card.details.slice(0, 4).map((d) => ({
                name: d.title,
                score: `${d.percent}%`,
                desc: d.desc,
              }));

              return (
                <motion.div
                  key={card.id}
                  layout
                  onMouseEnter={() => setHoveredNodeId(card.id)}
                  onMouseLeave={() => setHoveredNodeId(null)}
                  onClick={() => setSelectedBranchId(isSelected ? null : card.id)}
                  className={cn(
                    'group relative p-2.5 sm:p-3 rounded-2xl border backdrop-blur-xl transition-all duration-300 cursor-pointer w-full h-full flex-1 min-h-0 flex flex-col justify-between overflow-hidden shadow-[0_10px_25px_-5px_rgba(0,0,0,0.06)] hover:-translate-y-0.5 hover:shadow-lg',
                    isSelected && 'ring-2 ring-offset-2 dark:ring-offset-slate-950',
                    isSelected && isDark && 'shadow-[0_0_20px_rgba(56,189,248,0.25)]'
                  )}
                  style={{
                    background: isDark
                      ? card.cardDarkBg || 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.85) 100%)'
                      : card.cardBg,
                    borderColor: isDark ? `${card.themeColor}55` : `${card.themeColor}40`,
                    boxShadow: isDark
                      ? `0 10px 25px -5px rgba(0, 0, 0, 0.5), inset 0 1px 1px rgba(255, 255, 255, 0.1)`
                      : `0 10px 25px -5px rgba(0, 0, 0, 0.06), inset 0 1px 1px rgba(255, 255, 255, 0.85)`,
                  }}
                >
                  {/* Header: Số thứ tự, Icon & Tên kỹ năng */}
                  <div className="flex items-center justify-between gap-2 pb-1 shrink-0">
                    <div className="flex items-center gap-2 min-w-0">
                      <span
                        className="w-5 h-5 rounded-full flex items-center justify-center text-white text-[10px] font-mono font-bold shrink-0 shadow-2xs"
                        style={{ backgroundColor: card.themeColor }}
                      >
                        {cardOrder}
                      </span>
                      {SKILL_ILLUSTRATIONS[card.id] && (
                        <img
                          src={SKILL_ILLUSTRATIONS[card.id]}
                          alt={card.title}
                          className="w-6 h-6 sm:w-7 sm:h-7 object-contain drop-shadow-md shrink-0 pointer-events-none select-none"
                          loading="lazy"
                        />
                      )}
                      <div
                        className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full border backdrop-blur-md min-w-0"
                        style={{
                          backgroundColor: isDark ? `${card.themeColor}20` : `${card.themeColor}12`,
                          borderColor: isDark ? `${card.themeColor}50` : `${card.themeColor}35`,
                        }}
                      >
                        <span style={{ color: card.themeColor }}>{getBranchIcon(card.id, 'w-3.5 h-3.5 shrink-0')}</span>
                        <span
                          className="text-[14px] sm:text-[15.5px] lg:text-[16.5px] font-black font-play leading-tight tracking-tight truncate"
                          style={{ color: card.themeColor }}
                        >
                          {formatCardTitle(card.title)}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      {hasAudio && onPlayAudio && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onPlayAudio(card.id, audioSummaries[card.id]?.text || card.desc, e);
                          }}
                          className={cn(
                            'w-6 h-6 rounded-full flex items-center justify-center transition-all duration-200',
                            isPlayingAudio
                              ? 'bg-emerald-500 text-white shadow-sm'
                              : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                          )}
                          title="Nghe tóm tắt điều hành 15s"
                        >
                          {isPlayingAudio ? (
                            <Volume2 className="w-3.5 h-3.5 animate-pulse" />
                          ) : (
                            <VolumeX className="w-3.5 h-3.5" />
                          )}
                        </button>
                      )}

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          SoundEngine.playTap();
                          onSelectCard(card);
                        }}
                        className="w-6 h-6 rounded-full flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-sky-500 transition-colors"
                        title="Xem chi tiết thẻ"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Mô tả súc tích của nhánh */}
                  <p className="text-[11px] text-slate-600 dark:text-slate-300 line-clamp-1 leading-snug mb-1.5 shrink-0">
                    {card.desc}
                  </p>

                  {/* Danh sách kỹ năng: Hiển thị 2 cột 2 hàng full chiều rộng & chiều cao */}
                  <div className="grid grid-cols-2 grid-rows-2 gap-1.5 w-full flex-1 min-h-0 items-stretch overflow-hidden">
                    {displayPills.map((pill, pIdx) => (
                      <button
                        key={pIdx}
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          SoundEngine.playTap();
                          setSelectedSkillForProjects({
                            skillName: pill.name,
                            score: pill.score,
                            groupTitle: card.title,
                            themeColor: card.themeColor,
                            desc: pill.desc,
                            categoryFilter: card.categoryFilter,
                          });
                        }}
                        className={cn(
                          'w-full h-full flex items-center justify-between gap-1 px-2 py-1 rounded-lg text-[10.5px] font-semibold border transition-all duration-200 cursor-pointer min-w-0',
                          isDark
                            ? 'bg-slate-800/85 border-slate-700/80 text-slate-200 hover:border-slate-500'
                            : 'bg-white/85 border-slate-200/90 text-slate-800 hover:border-slate-300 shadow-2xs'
                        )}
                        title={`Bấm để xem các dự án thực tế đã áp dụng: ${pill.name}`}
                      >
                        <div className="flex items-center gap-1 min-w-0 flex-1">
                          <span className="text-[9px] font-mono font-bold text-slate-400 dark:text-slate-500 shrink-0">
                            {pIdx + 1}.
                          </span>
                          <Zap className="w-2.5 h-2.5 shrink-0" style={{ color: card.themeColor }} />
                          <span className="truncate text-left">{pill.name}</span>
                        </div>
                        <span
                          className="font-mono text-[9.5px] font-bold px-1.5 py-0.2 rounded shrink-0"
                          style={{
                            color: card.themeColor,
                            backgroundColor: isDark ? `${card.themeColor}25` : `${card.themeColor}15`,
                          }}
                        >
                          {pill.score}
                        </span>
                      </button>
                    ))}
                  </div>

                  {/* Thanh tiến trình hào quang phát sáng ở cạnh dưới card */}
                  <div
                    className="absolute bottom-0 left-4 right-4 h-[2px] rounded-full opacity-60 group-hover:opacity-100 transition-opacity"
                    style={{
                      background: `linear-gradient(90deg, transparent, ${card.themeColor}, transparent)`,
                    }}
                  />
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>



      {/* ========================================================================= */}
      {/* YÊU CẦU 4: POPUP MODAL LIÊN KẾT NHANH ĐẾN DỰ ÁN THỰC CHIẾN (CROSS-LINK TO PROJECTS) */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {selectedSkillForProjects && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className={cn(
                'relative w-full max-w-2xl rounded-3xl border shadow-2xl p-5 sm:p-6 overflow-hidden flex flex-col gap-4 font-play',
                isDark
                  ? 'bg-slate-900/95 border-slate-700 text-slate-100 shadow-[0_20px_60px_rgba(0,0,0,0.8)]'
                  : 'bg-white/95 border-slate-200 text-slate-800 shadow-[0_20px_60px_rgba(0,0,0,0.15)]'
              )}
            >
              {/* Header Modal */}
              <div className="flex items-start justify-between gap-3 border-b border-black/5 dark:border-white/10 pb-3">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-2xl flex items-center justify-center text-white shadow-md shrink-0"
                    style={{ backgroundColor: selectedSkillForProjects.themeColor }}
                  >
                    <Briefcase className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-base sm:text-lg font-bold">
                        {selectedSkillForProjects.skillName}
                      </h3>
                      <span
                        className="px-2 py-0.5 rounded-full text-xs font-mono font-bold"
                        style={{
                          backgroundColor: `${selectedSkillForProjects.themeColor}20`,
                          color: selectedSkillForProjects.themeColor,
                        }}
                      >
                        {selectedSkillForProjects.score}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Thuộc nhóm: {selectedSkillForProjects.groupTitle}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    SoundEngine.playTap();
                    setSelectedSkillForProjects(null);
                  }}
                  className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Danh sách các dự án thực tế đã áp dụng */}
              <div className="space-y-3 max-h-[380px] overflow-y-auto glass-scrollbar pr-1">
                <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-sky-500" />
                  <span>Dự án thực chiến áp dụng kỹ năng này:</span>
                </div>

                {findRelatedProjectsForSkill(
                  selectedSkillForProjects.skillName,
                  selectedSkillForProjects.categoryFilter
                ).map((project) => (
                  <div
                    key={project.id}
                    className={cn(
                      'p-3.5 rounded-2xl border transition-all duration-200 flex flex-col gap-2 group',
                      isDark
                        ? 'bg-slate-800/60 border-slate-700/80 hover:border-sky-500/50 hover:bg-slate-800/90'
                        : 'bg-slate-50/80 border-slate-200/80 hover:border-sky-400/60 hover:bg-white'
                    )}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded-md text-[11px] font-mono font-bold bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20">
                          {project.code}
                        </span>
                        <h4 className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-100 group-hover:text-sky-500 transition-colors">
                          {project.title}
                        </h4>
                      </div>
                      <span className="text-[10px] px-2 py-0.5 rounded-full font-medium bg-slate-200/60 dark:bg-slate-700/60 text-slate-600 dark:text-slate-300 shrink-0">
                        {project.groupTitle}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                      {project.tagline || project.description}
                    </p>

                    <div className="flex items-center justify-between text-[11px] pt-1 border-t border-black/5 dark:border-white/5">
                      <span className="text-slate-500 dark:text-slate-400 italic">
                        Vai trò: <strong className="text-slate-700 dark:text-slate-200">{project.role}</strong>
                      </span>

                      {onNavigatePage && (
                        <button
                          type="button"
                          onClick={() => {
                            SoundEngine.playTap();
                            setSelectedSkillForProjects(null);
                            onNavigatePage(7); // Chuyển đến trang Kho 21 Dự Án
                          }}
                          className="inline-flex items-center gap-1 text-sky-600 dark:text-sky-400 font-bold hover:underline"
                        >
                          <span>Mở dự án này</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer Modal */}
              <div className="flex items-center justify-between pt-2 border-t border-black/5 dark:border-white/10 text-xs">
                <span className="text-slate-400">
                  Kho 21 Dự Án & Sáng Kiến Vận Hành Trọng Điểm
                </span>
                <button
                  type="button"
                  onClick={() => {
                    SoundEngine.playTap();
                    setSelectedSkillForProjects(null);
                  }}
                  className="px-4 py-1.5 rounded-full bg-slate-200/80 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors"
                >
                  Đóng
                </button>
              </div>
            </motion.div>
          </div>
        )}

      </AnimatePresence>
    </div>
  );
}
