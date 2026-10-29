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
  Activity,
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

// TÍNH NĂNG 2: Dữ liệu 4 Trục Khung Năng Lực CX (Interactive CX Competency Radar)
export const CX_RADAR_DIMENSIONS = [
  {
    name: 'Quản trị vận hành',
    score: 96,
    sub: 'SOP, KPI, Contact Center 130+ nhân sự',
    icon: 'layers',
    color: '#0284c7',
    glow: 'rgba(2, 132, 199, 0.4)',
    desc: 'Hơn 22 năm thiết lập quy trình vận hành SOP, kiểm soát chất lượng QA/QC, tối ưu SLA 98.6% và giải quyết khiếu nại lần đầu FCR > 90%.',
  },
  {
    name: 'Thiết kế CX',
    score: 98,
    sub: 'Hành trình khách hàng, NPS & CSAT',
    icon: 'sparkles',
    color: '#ec4899',
    glow: 'rgba(236, 72, 153, 0.4)',
    desc: 'Kiến tạo hành trình trải nghiệm khách hàng đa kênh (Omnichannel), khảo sát VOC thời gian thực, duy trì tỷ lệ hài lòng CSAT > 98.2%.',
  },
  {
    name: 'AI Contact Center',
    score: 94,
    sub: 'GenAI Agent, CRM & Automation',
    icon: 'bot',
    color: '#8b5cf6',
    glow: 'rgba(139, 92, 246, 0.4)',
    desc: 'Tích hợp AI Agents tự động hóa hỗ trợ 24/7, chatbot định tuyến thông minh, tối ưu 40% thời gian xử lý cuộc gọi và tin nhắn.',
  },
  {
    name: 'Lãnh đạo đội ngũ',
    score: 97,
    sub: 'Đào tạo, văn hóa dịch vụ & kế thừa',
    icon: 'users',
    color: '#10b981',
    glow: 'rgba(16, 185, 129, 0.4)',
    desc: 'Trực tiếp tuyển dụng, huấn luyện và truyền cảm hứng cho hàng trăm nhân viên CSKH, xây dựng văn hóa phục vụ từ tâm và lộ trình thăng tiến rõ ràng.',
  },
];

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

  // 2. YÊU CẦU 2: Bộ Lọc Cấp Độ Năng Lực (Skill Level Filter)
  const [minProficiency, setMinProficiency] = useState<number>(0);

  // 4. YÊU CẦU 4: Liên Kết Nhanh Đến Dự Án Thực Chiến (Cross-link to Projects Modal)
  const [selectedSkillForProjects, setSelectedSkillForProjects] = useState<{
    skillName: string;
    score: string;
    groupTitle: string;
    themeColor: string;
    desc: string;
    categoryFilter?: string;
  } | null>(null);

  // Tính năng 2: Bộ Chỉ Số Trực Quan Radar Khung Năng Lực (Interactive CX Competency Radar)
  const [showRadarModal, setShowRadarModal] = useState<boolean>(false);
  const [activeRadarDimension, setActiveRadarDimension] = useState<number | null>(null);

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
        'relative w-full h-[650px] sm:h-[720px] rounded-3xl border overflow-hidden select-none transition-all duration-300 flex flex-col',
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

      {/* 2. FLOATING HUD TOOLBAR (Điều khiển Zoom / Reset / Lọc năng lực / Xuất ảnh) */}
      <div className="absolute top-3 sm:top-4 left-3 sm:left-4 right-3 sm:right-4 z-30 flex flex-wrap items-center justify-between gap-2.5 pointer-events-none">
        {/* Left: Nhãn chế độ Infographic */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border backdrop-blur-xl pointer-events-auto shadow-sm bg-white/85 dark:bg-slate-900/85 border-slate-200/80 dark:border-slate-800">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-semibold tracking-wide text-slate-700 dark:text-slate-200">
            Sơ đồ tư duy
          </span>
          <span className="text-[10px] px-1.5 py-0.5 rounded-md font-mono bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-400/20">
            {Math.round(zoomLevel * 100)}%
          </span>
        </div>

        {/* Center: YÊU CẦU 2 — Bộ Lọc Cấp Độ Năng Lực (Skill Level Filter Slider) */}
        <div className="flex items-center gap-2 px-3 py-1 rounded-full border backdrop-blur-xl pointer-events-auto shadow-sm bg-white/85 dark:bg-slate-900/85 border-slate-200/80 dark:border-slate-800">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-200 font-play">
            <Zap className="w-3.5 h-3.5 text-amber-500 animate-pulse shrink-0" />
            <span className="hidden md:inline">Tinh thông</span>
            <span className="font-mono text-sky-600 dark:text-sky-400">≥{minProficiency}%</span>
          </div>

          <input
            type="range"
            min={0}
            max={95}
            step={5}
            value={minProficiency}
            onChange={(e) => {
              setMinProficiency(Number(e.target.value));
              SoundEngine.playPop();
            }}
            className="w-16 sm:w-24 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-sky-500"
            title="Thanh trượt lọc kỹ năng theo tỷ lệ tinh thông"
          />

          {minProficiency > 0 && (
            <button
              type="button"
              onClick={() => {
                SoundEngine.playTap();
                setMinProficiency(0);
              }}
              className="text-[10px] px-1.5 py-0.5 rounded bg-slate-200/80 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-rose-500 transition-colors"
              title="Đặt lại bộ lọc (hiển thị tất cả)"
            >
              ✕
            </button>
          )}

          {/* Quick presets */}
          <div className="hidden lg:flex items-center gap-1 border-l border-slate-200 dark:border-slate-800 pl-1.5 ml-1">
            {[85, 90, 95].map((level) => (
              <button
                key={level}
                type="button"
                onClick={() => {
                  SoundEngine.playTap();
                  setMinProficiency(level);
                }}
                className={cn(
                  'px-1.5 py-0.5 text-[10px] font-mono font-bold rounded transition-colors',
                  minProficiency === level
                    ? 'bg-sky-500 text-white'
                    : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                )}
              >
                {level}%+
              </button>
            ))}
          </div>
        </div>

        {/* Right: Zoom Controls & YÊU CẦU 3 — Nút Xuất Ảnh Sơ Đồ */}
        <div className="flex items-center gap-2 pointer-events-auto">
          {/* Phím Zoom In / Out / Reset */}
          <div className="hidden sm:flex items-center gap-1 p-1 rounded-full border backdrop-blur-xl bg-white/85 dark:bg-slate-900/85 border-slate-200/80 dark:border-slate-800 shadow-sm">
            <button
              type="button"
              onClick={() => handleZoom(-0.1)}
              title="Thu nhỏ"
              className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={handleResetZoom}
              title="Khôi phục chuẩn 100%"
              className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => handleZoom(0.1)}
              title="Phóng to"
              className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* TÍNH NĂNG 2: Nút Mở Biểu Đồ Radar Khung Năng Lực CX */}
          <button
            type="button"
            onClick={() => {
              SoundEngine.playTap();
              setShowRadarModal(true);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border backdrop-blur-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 text-white shadow-md hover:brightness-110 active:scale-95 transition-all text-xs font-bold cursor-pointer"
            title="Mở biểu đồ Radar Khung Năng Lực CX (Interactive CX Competency Radar)"
          >
            <Activity className="w-3.5 h-3.5 animate-pulse" />
            <span className="hidden sm:inline">Radar Năng Lực</span>
          </button>
        </div>
      </div>

      {/* 3. VÙNG HIỂN THỊ MINDMAP (CANVAS VỚI ZOOM / PAN & SVG CONNECTOR PARTICLES) */}
      <div className="relative flex-1 w-full overflow-y-auto overflow-x-hidden p-4 sm:p-8 flex items-center justify-center custom-scrollbar">
        <motion.div
          animate={{ scale: zoomLevel }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="relative w-full max-w-6xl mx-auto my-auto flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-12 py-10"
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
                    {/* Đường ray tĩnh đứt khúc */}
                    <path
                      d={pathD}
                      fill="none"
                      stroke={card.themeColor}
                      strokeWidth={isHovered ? 3 : 2}
                      opacity={isHovered ? 1 : isDark ? 0.65 : 0.55}
                      strokeDasharray="6,4"
                      className="transition-all duration-300"
                    />

                    {/* Hào quang phát sáng khi hover */}
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

                    {/* Hạt photon ánh sáng chuyển động dọc theo đường dẫn */}
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

                    {/* Hạt photon thứ 2 lệch pha */}
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
                    {/* Đường ray tĩnh đứt khúc */}
                    <path
                      d={pathD}
                      fill="none"
                      stroke={card.themeColor}
                      strokeWidth={isHovered ? 3 : 2}
                      opacity={isHovered ? 1 : isDark ? 0.65 : 0.55}
                      strokeDasharray="6,4"
                      className="transition-all duration-300"
                    />

                    {/* Hào quang phát sáng khi hover */}
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

                    {/* Hạt photon ánh sáng chuyển động dọc theo đường dẫn */}
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

                    {/* Hạt photon thứ 2 lệch pha */}
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

              {/* Cổng xuất phát năng lượng ở Đỉnh TOP hình tròn */}
              <g className="transition-transform duration-300">
                <circle cx="500" cy="220" r="7" fill={isDark ? '#0284c7' : '#0284c7'} opacity="0.95" />
                <circle cx="500" cy="220" r="3" fill="#ffffff" />
                <circle cx="500" cy="220" r="11" fill="none" stroke={isDark ? '#38bdf8' : '#0284c7'} strokeWidth="1.5" opacity="0.7" strokeDasharray="3,3" />
              </g>

              {/* Cổng xuất phát năng lượng ở GIỮA BÊN TRÁI hình tròn */}
              <g className="transition-transform duration-300">
                <circle cx="420" cy="300" r="7" fill={isDark ? '#0284c7' : '#0284c7'} opacity="0.95" />
                <circle cx="420" cy="300" r="3" fill="#ffffff" />
                <circle cx="420" cy="300" r="11" fill="none" stroke={isDark ? '#38bdf8' : '#0284c7'} strokeWidth="1.5" opacity="0.7" strokeDasharray="3,3" />
              </g>

              {/* Cổng xuất phát năng lượng ở GIỮA BÊN PHẢI hình tròn */}
              <g className="transition-transform duration-300">
                <circle cx="580" cy="300" r="7" fill={isDark ? '#0284c7' : '#0284c7'} opacity="0.95" />
                <circle cx="580" cy="300" r="3" fill="#ffffff" />
                <circle cx="580" cy="300" r="11" fill="none" stroke={isDark ? '#38bdf8' : '#0284c7'} strokeWidth="1.5" opacity="0.7" strokeDasharray="3,3" />
              </g>

              {/* Cổng xuất phát năng lượng ở Đáy BOT hình tròn */}
              <g className="transition-transform duration-300">
                <circle cx="500" cy="380" r="7" fill={isDark ? '#0284c7' : '#0284c7'} opacity="0.95" />
                <circle cx="500" cy="380" r="3" fill="#ffffff" />
                <circle cx="500" cy="380" r="11" fill="none" stroke={isDark ? '#38bdf8' : '#0284c7'} strokeWidth="1.5" opacity="0.7" strokeDasharray="3,3" />
              </g>
            </svg>
          </div>

          {/* CÁNH TRÁI: 3 thẻ (Hàng 1, Hàng 2, Hàng 3) - Kích thước bằng nhau, viền đứt nét tiệp màu line */}
          <div className="flex-1 w-full flex flex-col gap-5 sm:gap-7 z-10">
            {leftBranches.map((card, idx) => {
              const isSelected = selectedBranchId === card.id;
              const hasAudio = Boolean(audioSummaries[card.id]);
              const isPlayingAudio = playingAudioId === card.id;
              const cardOrder = idx === 0 ? '01' : idx === 1 ? '02' : '03';

              // Kiểm tra số lượng kỹ năng đạt chuẩn lọc minProficiency
              const qualifyingPills = card.pills.filter((p) => {
                const scoreNum = parseInt(p.score.replace(/\D/g, '')) || 0;
                return scoreNum >= minProficiency;
              });
              const isCardDimmed = minProficiency > 0 && qualifyingPills.length === 0;

              return (
                <motion.div
                  key={card.id}
                  layout
                  onMouseEnter={() => setHoveredNodeId(card.id)}
                  onMouseLeave={() => setHoveredNodeId(null)}
                  onClick={() => setSelectedBranchId(isSelected ? null : card.id)}
                  className={cn(
                    'group relative p-3.5 sm:p-4 rounded-2xl border backdrop-blur-xl transition-all duration-300 cursor-pointer w-full h-[180px] min-h-[180px] max-h-[180px] flex flex-col justify-between overflow-hidden shadow-[0_10px_25px_-5px_rgba(0,0,0,0.06)] hover:-translate-y-1 hover:shadow-lg',
                    isSelected && 'ring-2 ring-offset-2 dark:ring-offset-slate-950',
                    isSelected && isDark && 'shadow-[0_0_20px_rgba(56,189,248,0.25)]',
                    isCardDimmed && 'opacity-40 grayscale-[40%]'
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
                  {/* Nhãn Khung Hợp Nhất kèm Số thứ tự, Icon & Tên kỹ năng */}
                  <div className="flex items-center justify-between gap-2 mb-1.5 shrink-0">
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
                          className="w-7 h-7 sm:w-8 sm:h-8 object-contain drop-shadow-md shrink-0 pointer-events-none select-none"
                          loading="lazy"
                        />
                      )}
                      <div
                        className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full border backdrop-blur-md"
                        style={{
                          backgroundColor: isDark ? `${card.themeColor}20` : `${card.themeColor}12`,
                          borderColor: isDark ? `${card.themeColor}50` : `${card.themeColor}35`,
                        }}
                      >
                        <span style={{ color: card.themeColor }}>{getBranchIcon(card.id, 'w-3.5 h-3.5')}</span>
                        <span
                          className="text-xs font-bold tracking-tight truncate"
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
                  <p className="text-[11.5px] text-slate-600 dark:text-slate-300 line-clamp-1 leading-relaxed mb-2 shrink-0">
                    {card.desc}
                  </p>

                  {/* Danh sách kỹ năng: Có số thứ tự, icon, tên kỹ năng và % điểm */}
                  <div className="flex flex-wrap items-center gap-1.5 overflow-hidden">
                    {card.pills.slice(0, 4).map((pill, pIdx) => {
                      const scoreNum = parseInt(pill.score.replace(/\D/g, '')) || 0;
                      const isHighlighted = minProficiency > 0 && scoreNum >= minProficiency;
                      const isFaded = minProficiency > 0 && scoreNum < minProficiency;

                      return (
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
                            'inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10.5px] font-medium border transition-all duration-200 cursor-pointer',
                            isDark
                              ? 'bg-slate-800/80 border-slate-700/80 text-slate-200 hover:border-slate-600'
                              : 'bg-slate-50 border-slate-200/90 text-slate-800 hover:border-slate-300',
                            isHighlighted && 'ring-1 ring-sky-400 font-bold shadow-xs',
                            isFaded && 'opacity-25'
                          )}
                          title={`Bấm để xem các dự án thực tế đã áp dụng: ${pill.name}`}
                        >
                          <span className="text-[9px] font-mono font-bold text-slate-400 dark:text-slate-500">
                            {pIdx + 1}.
                          </span>
                          <Zap className="w-2.5 h-2.5 shrink-0" style={{ color: card.themeColor }} />
                          <span className="truncate max-w-[120px]">{pill.name}</span>
                          <span
                            className="font-mono text-[9.5px] font-bold px-1 rounded shrink-0"
                            style={{
                              color: card.themeColor,
                              backgroundColor: isDark ? `${card.themeColor}25` : `${card.themeColor}15`,
                            }}
                          >
                            {pill.score}
                          </span>
                        </button>
                      );
                    })}
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

          {/* TRUNG TÂM: CENTRAL HUB CORE (HẠT NHÂN QUẢN TRỊ ĐIỀU HÀNH) */}
          <div className="relative shrink-0 flex flex-col items-center justify-center my-6 md:my-0 z-20">
            {/* Vòng hào quang xung năng lượng xoay nhẹ */}
            <div
              className="absolute w-44 h-44 sm:w-52 sm:h-52 rounded-full border border-dashed opacity-40 animate-spin"
              style={{
                borderColor: isDark ? 'rgba(56, 189, 248, 0.4)' : 'rgba(2, 132, 199, 0.35)',
                animationDuration: '40s',
              }}
            />
            <div
              className="absolute w-36 h-36 sm:w-44 sm:h-44 rounded-full border border-sky-400/20 opacity-30 animate-ping"
              style={{ animationDuration: '6s' }}
            />

            {/* Khối Cốt Lõi Trung Tâm */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className={cn(
                'relative w-36 h-36 sm:w-44 sm:h-44 rounded-full p-1 border shadow-xl flex flex-col items-center justify-center text-center backdrop-blur-2xl transition-all duration-300',
                isDark
                  ? 'bg-slate-900/90 border-sky-400/40 shadow-[0_0_35px_rgba(56,189,248,0.25)]'
                  : 'bg-white/95 border-sky-500/30 shadow-[0_12px_35px_rgba(14,165,233,0.18)]'
              )}
            >
              {/* Huy hiệu trung tâm */}
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center text-white shadow-md mb-1.5">
                <Sparkles className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>

              {/* Tên & Vị trí điều hành chuẩn */}
              <h4 className="text-xs sm:text-sm font-extrabold text-slate-800 dark:text-slate-100 tracking-tight leading-tight px-2">
                Kỹ Năng Cốt Lõi
              </h4>
              <p className="text-[10px] sm:text-[11px] text-sky-600 dark:text-sky-400 font-semibold tracking-wide mt-0.5">
                Nguyễn Hùng Thái
              </p>

              {/* Chỉ số kinh nghiệm */}
              <div className="mt-1.5 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                22+ Năm Vận Hành
              </div>
            </motion.div>
          </div>

          {/* CÁNH PHẢI: 3 thẻ (Hàng 1, Hàng 2, Hàng 3) - Kích thước bằng nhau, viền đứt nét tiệp màu line */}
          <div className="flex-1 w-full flex flex-col gap-5 sm:gap-7 z-10">
            {rightBranches.map((card, idx) => {
              const isSelected = selectedBranchId === card.id;
              const hasAudio = Boolean(audioSummaries[card.id]);
              const isPlayingAudio = playingAudioId === card.id;
              const cardOrder = idx === 0 ? '04' : idx === 1 ? '05' : '06';

              // Kiểm tra số lượng kỹ năng đạt chuẩn lọc minProficiency
              const qualifyingPills = card.pills.filter((p) => {
                const scoreNum = parseInt(p.score.replace(/\D/g, '')) || 0;
                return scoreNum >= minProficiency;
              });
              const isCardDimmed = minProficiency > 0 && qualifyingPills.length === 0;

              return (
                <motion.div
                  key={card.id}
                  layout
                  onMouseEnter={() => setHoveredNodeId(card.id)}
                  onMouseLeave={() => setHoveredNodeId(null)}
                  onClick={() => setSelectedBranchId(isSelected ? null : card.id)}
                  className={cn(
                    'group relative p-3.5 sm:p-4 rounded-2xl border-2 border-dashed backdrop-blur-xl transition-all duration-300 cursor-pointer shadow-sm w-full h-[180px] min-h-[180px] max-h-[180px] flex flex-col justify-between overflow-hidden',
                    isDark
                      ? 'bg-slate-900/85 hover:bg-slate-900'
                      : 'bg-white/90 hover:bg-white',
                    isSelected && 'ring-2 ring-offset-2 dark:ring-offset-slate-950',
                    isSelected && isDark && 'shadow-[0_0_20px_rgba(56,189,248,0.25)]',
                    isCardDimmed && 'opacity-40 grayscale-[40%]'
                  )}
                  style={{
                    borderColor: card.themeColor,
                    borderStyle: 'dashed',
                  }}
                >
                  {/* Nhãn Khung Hợp Nhất kèm Số thứ tự, Icon & Tên kỹ năng */}
                  <div className="flex items-center justify-between gap-2 mb-1.5 shrink-0">
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
                          className="w-7 h-7 sm:w-8 sm:h-8 object-contain drop-shadow-md shrink-0 pointer-events-none select-none"
                          loading="lazy"
                        />
                      )}
                      <div
                        className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full border backdrop-blur-md"
                        style={{
                          backgroundColor: isDark ? `${card.themeColor}20` : `${card.themeColor}12`,
                          borderColor: isDark ? `${card.themeColor}50` : `${card.themeColor}35`,
                        }}
                      >
                        <span style={{ color: card.themeColor }}>{getBranchIcon(card.id, 'w-3.5 h-3.5')}</span>
                        <span
                          className="text-xs font-bold tracking-tight truncate"
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
                  <p className="text-[11.5px] text-slate-600 dark:text-slate-300 line-clamp-1 leading-relaxed mb-2 shrink-0">
                    {card.desc}
                  </p>

                  {/* Danh sách kỹ năng: Có số thứ tự, icon, tên kỹ năng và % điểm */}
                  <div className="flex flex-wrap items-center gap-1.5 overflow-hidden">
                    {card.pills.slice(0, 4).map((pill, pIdx) => {
                      const scoreNum = parseInt(pill.score.replace(/\D/g, '')) || 0;
                      const isHighlighted = minProficiency > 0 && scoreNum >= minProficiency;
                      const isFaded = minProficiency > 0 && scoreNum < minProficiency;

                      return (
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
                            'inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10.5px] font-medium border transition-all duration-200 cursor-pointer',
                            isDark
                              ? 'bg-slate-800/80 border-slate-700/80 text-slate-200 hover:border-slate-600'
                              : 'bg-slate-50 border-slate-200/90 text-slate-800 hover:border-slate-300',
                            isHighlighted && 'ring-1 ring-sky-400 font-bold shadow-xs',
                            isFaded && 'opacity-25'
                          )}
                          title={`Bấm để xem các dự án thực tế đã áp dụng: ${pill.name}`}
                        >
                          <span className="text-[9px] font-mono font-bold text-slate-400 dark:text-slate-500">
                            {pIdx + 1}.
                          </span>
                          <Zap className="w-2.5 h-2.5 shrink-0" style={{ color: card.themeColor }} />
                          <span className="truncate max-w-[120px]">{pill.name}</span>
                          <span
                            className="font-mono text-[9.5px] font-bold px-1 rounded shrink-0"
                            style={{
                              color: card.themeColor,
                              backgroundColor: isDark ? `${card.themeColor}25` : `${card.themeColor}15`,
                            }}
                          >
                            {pill.score}
                          </span>
                        </button>
                      );
                    })}
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

      {/* 4. FOOTER STATUS BAR (Thông tin hướng dẫn tương tác & Gợi ý) */}
      <div className="relative px-5 py-2.5 border-t flex flex-wrap items-center justify-between text-xs backdrop-blur-md bg-white/70 dark:bg-slate-950/70 border-slate-200/80 dark:border-slate-800/80 text-slate-500 dark:text-slate-400">
        <div className="flex items-center gap-2">
          <Info className="w-3.5 h-3.5 text-sky-500 shrink-0" />
          <span className="truncate">
            Chạm vào từng kỹ năng để xem các dự án thực chiến đã áp dụng · Rê chuột để kích hoạt hạt năng lượng.
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-3 font-medium">
          <span className="inline-flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-sky-500" /> Điểm mạnh
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-blue-500" /> Hoàn thiện
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-500" /> Cơ hội
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-rose-500" /> Thách thức
          </span>
        </div>
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

        {/* TÍNH NĂNG 2: INTERACTIVE CX COMPETENCY RADAR SPIDER CHART MODAL */}
        {showRadarModal && (
          <div
            className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-5 bg-black/75 backdrop-blur-md animate-fadeIn"
            onClick={() => setShowRadarModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 16 }}
              transition={{ duration: 0.28, ease: 'easeOut' }}
              onClick={(e) => e.stopPropagation()}
              className={cn(
                'w-full max-w-4xl max-h-[90vh] rounded-3xl border shadow-2xl backdrop-blur-2xl p-5 sm:p-6 flex flex-col gap-4 overflow-hidden relative',
                isDark
                  ? 'bg-slate-900/95 border-slate-700 text-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(56,189,248,0.2)]'
                  : 'bg-white/95 border-slate-200 text-slate-800 shadow-[0_20px_50px_rgba(15,23,42,0.18)]'
              )}
            >
              {/* Header Modal */}
              <div className="flex items-center justify-between pb-3 border-b border-black/5 dark:border-white/10 shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-cyan-500 text-white flex items-center justify-center shadow-md">
                    <Activity className="w-5 h-5 animate-pulse" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-black font-play tracking-tight text-slate-900 dark:text-white">
                      Radar Khung Năng Lực
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                      Đo lường định lượng 4 trụ cột chuyên môn CX & Vận hành thực chiến
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    SoundEngine.playTap();
                    setShowRadarModal(false);
                  }}
                  className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-rose-500 hover:text-white text-slate-400 dark:text-slate-300 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Body: 2 Cột (Trái: SVG Spider Radar Chart, Phải: Thẻ Chi Tiết Năng Lực) */}
              <div className="flex-1 min-h-0 overflow-y-auto glass-scrollbar grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
                {/* Cột Trái: SVG Spider Radar Chart (5/12) */}
                <div className="md:col-span-5 flex flex-col items-center justify-center relative p-2">
                  <svg
                    viewBox="0 0 360 360"
                    className="w-full max-w-[320px] aspect-square drop-shadow-lg select-none"
                  >
                    <defs>
                      <radialGradient id="radarBgGrad" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.18" />
                        <stop offset="70%" stopColor="#818cf8" stopOpacity="0.08" />
                        <stop offset="100%" stopColor="transparent" stopOpacity="0" />
                      </radialGradient>
                      <linearGradient id="radarAreaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.65" />
                        <stop offset="50%" stopColor="#818cf8" stopOpacity="0.55" />
                        <stop offset="100%" stopColor="#ec4899" stopOpacity="0.65" />
                      </linearGradient>
                    </defs>

                    {/* Vùng nền quầng sáng */}
                    <circle cx="180" cy="180" r="130" fill="url(#radarBgGrad)" />

                    {/* 4 Vòng lưới đa giác đồng tâm (25%, 50%, 75%, 100%) */}
                    {[0.25, 0.5, 0.75, 1.0].map((level, lIdx) => {
                      const r = 125 * level;
                      const polyPoints = [
                        `${180},${180 - r}`,
                        `${180 + r},${180}`,
                        `${180},${180 + r}`,
                        `${180 - r},${180}`,
                      ].join(' ');
                      return (
                        <g key={lIdx}>
                          <polygon
                            points={polyPoints}
                            fill="none"
                            stroke={isDark ? 'rgba(255,255,255,0.14)' : 'rgba(15,23,42,0.1)'}
                            strokeWidth="1.2"
                            strokeDasharray={lIdx < 3 ? '3 3' : 'none'}
                          />
                          <text
                            x={183}
                            y={180 - r + 10}
                            fill={isDark ? 'rgba(255,255,255,0.35)' : 'rgba(15,23,42,0.4)'}
                            fontSize="8"
                            fontFamily="monospace"
                            fontWeight="bold"
                          >
                            {Math.round(level * 100)}%
                          </text>
                        </g>
                      );
                    })}

                    {/* 4 Trục tia phân kỳ (Cross Axes) */}
                    <line x1="180" y1="55" x2="180" y2="305" stroke={isDark ? 'rgba(255,255,255,0.2)' : 'rgba(15,23,42,0.15)'} strokeWidth="1.2" />
                    <line x1="55" y1="180" x2="305" y2="180" stroke={isDark ? 'rgba(255,255,255,0.2)' : 'rgba(15,23,42,0.15)'} strokeWidth="1.2" />

                    {/* Vùng Polygon Diện Tích Khung Năng Lực (Competency Covered Polygon) */}
                    {(() => {
                      const R = 125;
                      const s0 = CX_RADAR_DIMENSIONS[0].score / 100; // Quản trị vận hành (Top)
                      const s1 = CX_RADAR_DIMENSIONS[1].score / 100; // Thiết kế CX (Right)
                      const s2 = CX_RADAR_DIMENSIONS[2].score / 100; // AI Contact Center (Bottom)
                      const s3 = CX_RADAR_DIMENSIONS[3].score / 100; // Lãnh đạo đội ngũ (Left)

                      const p0 = `${180},${180 - R * s0}`;
                      const p1 = `${180 + R * s1},${180}`;
                      const p2 = `${180},${180 + R * s2}`;
                      const p3 = `${180 - R * s3},${180}`;
                      const allPoints = `${p0} ${p1} ${p2} ${p3}`;

                      return (
                        <>
                          <polygon
                            points={allPoints}
                            fill="url(#radarAreaGrad)"
                            stroke="#38bdf8"
                            strokeWidth="2.5"
                            className="transition-all duration-300"
                            style={{ filter: 'drop-shadow(0 0 10px rgba(56,189,248,0.5))' }}
                          />

                          {/* 4 Điểm chốt tương tác */}
                          {[
                            { x: 180, y: 180 - R * s0, dim: CX_RADAR_DIMENSIONS[0], idx: 0 },
                            { x: 180 + R * s1, y: 180, dim: CX_RADAR_DIMENSIONS[1], idx: 1 },
                            { x: 180, y: 180 + R * s2, dim: CX_RADAR_DIMENSIONS[2], idx: 2 },
                            { x: 180 - R * s3, y: 180, dim: CX_RADAR_DIMENSIONS[3], idx: 3 },
                          ].map((pt) => {
                            const isDimActive = activeRadarDimension === pt.idx;
                            return (
                              <g
                                key={pt.idx}
                                onMouseEnter={() => setActiveRadarDimension(pt.idx)}
                                onMouseLeave={() => setActiveRadarDimension(null)}
                                className="cursor-pointer group/dot"
                              >
                                <circle
                                  cx={pt.x}
                                  cy={pt.y}
                                  r={isDimActive ? 7.5 : 5}
                                  fill={pt.dim.color}
                                  stroke="#ffffff"
                                  strokeWidth="2"
                                  className="transition-all duration-200"
                                  style={{ filter: `drop-shadow(0 0 8px ${pt.dim.glow})` }}
                                />
                                {isDimActive && (
                                  <circle
                                    cx={pt.x}
                                    cy={pt.y}
                                    r={12}
                                    fill="none"
                                    stroke={pt.dim.color}
                                    strokeWidth="1.5"
                                    className="animate-ping"
                                    opacity="0.8"
                                  />
                                )}
                              </g>
                            );
                          })}
                        </>
                      );
                    })()}

                    {/* Nhãn 4 Trục */}
                    <text x="180" y="42" textAnchor="middle" fill="#0284c7" fontSize="10.5" fontWeight="900" fontFamily="sans-serif">
                      Quản trị vận hành ({CX_RADAR_DIMENSIONS[0].score}%)
                    </text>
                    <text x="312" y="184" textAnchor="start" fill="#ec4899" fontSize="10.5" fontWeight="900" fontFamily="sans-serif">
                      Thiết kế CX ({CX_RADAR_DIMENSIONS[1].score}%)
                    </text>
                    <text x="180" y="325" textAnchor="middle" fill="#8b5cf6" fontSize="10.5" fontWeight="900" fontFamily="sans-serif">
                      AI Contact Center ({CX_RADAR_DIMENSIONS[2].score}%)
                    </text>
                    <text x="48" y="184" textAnchor="end" fill="#10b981" fontSize="10.5" fontWeight="900" fontFamily="sans-serif">
                      Lãnh đạo ({CX_RADAR_DIMENSIONS[3].score}%)
                    </text>
                  </svg>
                </div>

                {/* Cột Phải: Bảng Chi Tiết 4 Nhóm Năng Lực Thực Chiến (7/12) */}
                <div className="md:col-span-7 flex flex-col gap-2.5">
                  <div className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1 flex items-center justify-between">
                    <span>Đánh giá chuẩn hóa 4 trụ cột:</span>
                    <span className="font-mono text-emerald-600 dark:text-emerald-400">Trung bình: 96.3%</span>
                  </div>

                  {CX_RADAR_DIMENSIONS.map((dim, dIdx) => {
                    const isHovered = activeRadarDimension === dIdx;
                    return (
                      <div
                        key={dIdx}
                        onMouseEnter={() => setActiveRadarDimension(dIdx)}
                        onMouseLeave={() => setActiveRadarDimension(null)}
                        style={{
                          borderColor: isHovered ? dim.color : undefined,
                          backgroundColor: isHovered
                            ? isDark
                              ? 'rgba(15, 23, 42, 0.9)'
                              : 'rgba(255, 255, 255, 0.95)'
                            : undefined,
                          boxShadow: isHovered ? `0 0 16px ${dim.glow}` : undefined,
                        }}
                        className={cn(
                          'p-3 sm:p-3.5 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col gap-1.5',
                          isDark
                            ? 'bg-slate-800/60 border-slate-700/80'
                            : 'bg-slate-50/80 border-slate-200/80'
                        )}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <span
                              className="w-2.5 h-2.5 rounded-full shrink-0"
                              style={{ backgroundColor: dim.color }}
                            />
                            <h4
                              className="text-xs sm:text-sm font-black font-play tracking-tight"
                              style={{ color: dim.color }}
                            >
                              {dim.name}
                            </h4>
                            <span className="text-[10px] text-slate-400 dark:text-slate-400 hidden sm:inline">
                              · {dim.sub}
                            </span>
                          </div>
                          <span
                            className="font-mono font-black text-sm px-2 py-0.5 rounded-md text-white shrink-0"
                            style={{ backgroundColor: dim.color }}
                          >
                            {dim.score}%
                          </span>
                        </div>

                        {/* Thanh đo tiến độ (Score Progress Bar) */}
                        <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-500"
                            style={{
                              width: `${dim.score}%`,
                              backgroundColor: dim.color,
                            }}
                          />
                        </div>

                        <p className="text-[11px] sm:text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                          {dim.desc}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Footer Modal */}
              <div className="flex items-center justify-between pt-3 border-t border-black/5 dark:border-white/10 text-xs shrink-0">
                <span className="text-slate-400 font-mono text-[11px]">
                  * Dữ liệu dựa trên 22+ năm lãnh đạo thực tế và 21 dự án trọng điểm
                </span>
                <button
                  type="button"
                  onClick={() => setShowRadarModal(false)}
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-xs hover:brightness-105 transition cursor-pointer shadow-sm"
                >
                  Đóng Biểu Đồ Radar
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
