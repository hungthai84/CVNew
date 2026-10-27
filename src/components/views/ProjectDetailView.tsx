'use client';

// Lucian UX/UI Prompt #223 · MIT License (c) 2026 Seokwoooo · https://lucianlabs.dev/uxui-prompt/#223
import React, { useState, useEffect, useRef } from 'react';
import { ProjectData } from '@/types';
import { WebIcon } from '@/components/ui/WebIcon';
import { useToast } from '@/components/ui/Toast';
import { Printer, Copy, FileText, Check, X } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  getProjectDetailedSpec,
  SCOPE_PALETTES,
  CHALLENGE_PALETTES,
} from '@/utils/projectSpecGenerator';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

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

export interface ProjectDetailViewProps {
  selectedArticle: ProjectData;
  selectedGroup: ProjectCardGroup | null;
  onSelectProject: (proj: ProjectData) => void;
  onClose: () => void;
  onOpenMindmap: (proj: ProjectData) => void;
  getCardVisualConfig: (visualId: string) => {
    accentColor: string;
    cardBg: string;
    cardBorder: string;
    ambientGlow: string;
    titleColor: string;
    pillBg: string;
    arrowBg: string;
    arrowShadow: string;
  };
  isLight?: boolean;
  activeSection?: string;
  onSectionChange?: (secId: string) => void;
}

const STACK_CARD_GRADIENTS = [
  'linear-gradient(150deg, #6366F1 0%, #8B5CF6 100%)', // 0: Indigo-Violet (Mindmap)
  'linear-gradient(150deg, #1E40AF 0%, #0284C7 100%)', // 1: Blue-Sky (Overview)
  'linear-gradient(150deg, #C2410C 0%, #EA580C 100%)', // 2: Deep Orange-Amber (Context & Challenges)
  'linear-gradient(150deg, #0F766E 0%, #0D9488 100%)', // 3: Teal-Emerald (Objectives)
  'linear-gradient(150deg, #7C3AED 0%, #9333EA 100%)', // 4: Purple-Fuchsia (Scope 7 Items)
  'linear-gradient(150deg, #0369A1 0%, #0284C7 100%)', // 5: Sky-Cyan (Methodology & 5 Steps)
  'linear-gradient(150deg, #047857 0%, #059669 100%)', // 6: Emerald-Green (KPI & SLA)
  'linear-gradient(150deg, #BE185D 0%, #DB2777 100%)', // 7: Rose-Pink (Roles & Value Outcomes)
  'linear-gradient(150deg, #581C87 0%, #6D28D9 100%)', // 8: Deep Violet-Indigo (Philosophy)
];

const STACK_CARD_GRADIENTS_LIGHT = [
  'linear-gradient(150deg, #F5F3FF 0%, #EDE9FE 40%, #DDD6FE 100%)', // 0: Indigo-Violet Pastel (Mindmap)
  'linear-gradient(150deg, #EFF6FF 0%, #DBEAFE 40%, #BFDBFE 100%)', // 1: Blue-Sky Pastel (Overview)
  'linear-gradient(150deg, #FFF7ED 0%, #FFEDD5 40%, #FED7AA 100%)', // 2: Deep Orange-Amber Pastel (Context)
  'linear-gradient(150deg, #F0FDFA 0%, #CCFBF1 40%, #99F6E4 100%)', // 3: Teal-Emerald Pastel (Objectives)
  'linear-gradient(150deg, #FAF5FF 0%, #F3E8FF 40%, #E9D5FF 100%)', // 4: Purple-Fuchsia Pastel (Scope 7 Items)
  'linear-gradient(150deg, #F0F9FF 0%, #E0F2FE 40%, #BAE6FD 100%)', // 5: Sky-Cyan Pastel (Methodology)
  'linear-gradient(150deg, #ECFDF5 0%, #D1FAE5 40%, #A7F3D0 100%)', // 6: Emerald-Green Pastel (KPI & SLA)
  'linear-gradient(150deg, #FDF2F8 0%, #FCE7F3 40%, #FBCFE8 100%)', // 7: Rose-Pink Pastel (Roles & Value)
  'linear-gradient(150deg, #FAF5FF 0%, #EDE9FE 40%, #DDD6FE 100%)', // 8: Deep Violet-Indigo Pastel (Philosophy)
];

const STAR_CARD_GRADIENTS = [
  'linear-gradient(150deg, #C2410C 0%, #EA580C 100%)', // S: Situation
  'linear-gradient(150deg, #1E40AF 0%, #0284C7 100%)', // T/A: Approach
  'linear-gradient(150deg, #7C3AED 0%, #9333EA 100%)', // A: Actions
  'linear-gradient(150deg, #047857 0%, #059669 100%)', // R: Results
];

const STAR_CARD_GRADIENTS_LIGHT = [
  'linear-gradient(150deg, #FFF7ED 0%, #FFEDD5 40%, #FED7AA 100%)', // S: Situation
  'linear-gradient(150deg, #EFF6FF 0%, #DBEAFE 40%, #BFDBFE 100%)', // T/A: Approach
  'linear-gradient(150deg, #FAF5FF 0%, #F3E8FF 40%, #E9D5FF 100%)', // A: Actions
  'linear-gradient(150deg, #ECFDF5 0%, #D1FAE5 40%, #A7F3D0 100%)', // R: Results
];

interface GroupThemeVisual {
  accent: string;
  bannerBgLight: string;
  bannerBorderLight: string;
  bannerShadowLight: string;
  badgeGrad: string;
  groupBadgeLight: string;
  groupBadgeDark: string;
  subTitleLight: string;
  subTitleDark: string;
  taglineBorderLight: string;
  taglineBorderDark: string;
  roleLabelLight: string;
  roleIconLight: string;
  hashtagLight: string;
  hashtagDark: string;
  hubBorderLight: string;
  hubBorderDark: string;
  hubGrad: string;
  dividerLight: string;
  dividerDark: string;
  dotColor: string;
  activeBtnGrad: string;
}

const getProjectGroupTheme = (groupKey: string): GroupThemeVisual => {
  switch (groupKey) {
    case 'strategy':
      return {
        accent: '#0284c7',
        bannerBgLight: 'bg-gradient-to-br from-white via-sky-50/85 to-indigo-50/75',
        bannerBorderLight: 'border-sky-200/90',
        bannerShadowLight: 'shadow-[0_14px_40px_-10px_rgba(2,132,199,0.12)]',
        badgeGrad: 'from-sky-600 to-indigo-600',
        groupBadgeLight: 'bg-sky-100 text-sky-800 border-sky-300',
        groupBadgeDark: 'bg-sky-950/80 text-sky-200 border-sky-600/50',
        subTitleLight: 'text-sky-700',
        subTitleDark: 'text-sky-300',
        taglineBorderLight: 'border-l-sky-500',
        taglineBorderDark: 'border-l-cyan-400',
        roleLabelLight: 'text-sky-700',
        roleIconLight: 'text-sky-600',
        hashtagLight: 'bg-sky-50 text-sky-800 border-sky-200/90',
        hashtagDark: 'bg-white/10 text-cyan-200 border-cyan-400/20',
        hubBorderLight: 'border-sky-300/90',
        hubBorderDark: 'border-sky-500/40',
        hubGrad: 'from-sky-600 via-indigo-600 to-blue-600',
        dividerLight: 'via-sky-300',
        dividerDark: 'via-sky-600/50',
        dotColor: 'bg-sky-500',
        activeBtnGrad: 'from-sky-600 to-indigo-600',
      };
    case 'sop':
      return {
        accent: '#059669',
        bannerBgLight: 'bg-gradient-to-br from-white via-emerald-50/85 to-teal-50/75',
        bannerBorderLight: 'border-emerald-200/90',
        bannerShadowLight: 'shadow-[0_14px_40px_-10px_rgba(5,150,105,0.12)]',
        badgeGrad: 'from-emerald-600 to-teal-600',
        groupBadgeLight: 'bg-emerald-100 text-emerald-800 border-emerald-300',
        groupBadgeDark: 'bg-emerald-950/80 text-emerald-200 border-emerald-600/50',
        subTitleLight: 'text-emerald-700',
        subTitleDark: 'text-emerald-300',
        taglineBorderLight: 'border-l-emerald-500',
        taglineBorderDark: 'border-l-emerald-400',
        roleLabelLight: 'text-emerald-700',
        roleIconLight: 'text-emerald-600',
        hashtagLight: 'bg-emerald-50 text-emerald-800 border-emerald-200/90',
        hashtagDark: 'bg-white/10 text-emerald-200 border-emerald-400/20',
        hubBorderLight: 'border-emerald-300/90',
        hubBorderDark: 'border-emerald-500/40',
        hubGrad: 'from-emerald-600 via-teal-600 to-cyan-600',
        dividerLight: 'via-emerald-300',
        dividerDark: 'via-emerald-600/50',
        dotColor: 'bg-emerald-500',
        activeBtnGrad: 'from-emerald-600 to-teal-600',
      };
    case 'cx':
      return {
        accent: '#ea580c',
        bannerBgLight: 'bg-gradient-to-br from-white via-amber-50/85 to-orange-50/75',
        bannerBorderLight: 'border-amber-200/90',
        bannerShadowLight: 'shadow-[0_14px_40px_-10px_rgba(234,88,12,0.12)]',
        badgeGrad: 'from-amber-600 to-orange-600',
        groupBadgeLight: 'bg-amber-100 text-amber-800 border-amber-300',
        groupBadgeDark: 'bg-amber-950/80 text-amber-200 border-amber-600/50',
        subTitleLight: 'text-amber-700',
        subTitleDark: 'text-amber-300',
        taglineBorderLight: 'border-l-amber-500',
        taglineBorderDark: 'border-l-amber-400',
        roleLabelLight: 'text-amber-700',
        roleIconLight: 'text-amber-600',
        hashtagLight: 'bg-amber-50 text-amber-800 border-amber-200/90',
        hashtagDark: 'bg-white/10 text-amber-200 border-amber-400/20',
        hubBorderLight: 'border-amber-300/90',
        hubBorderDark: 'border-amber-500/40',
        hubGrad: 'from-amber-600 via-orange-600 to-rose-600',
        dividerLight: 'via-amber-300',
        dividerDark: 'via-amber-600/50',
        dotColor: 'bg-amber-500',
        activeBtnGrad: 'from-amber-600 to-orange-600',
      };
    case 'tech':
      return {
        accent: '#7c3aed',
        bannerBgLight: 'bg-gradient-to-br from-white via-purple-50/85 to-indigo-50/75',
        bannerBorderLight: 'border-purple-200/90',
        bannerShadowLight: 'shadow-[0_14px_40px_-10px_rgba(124,58,237,0.12)]',
        badgeGrad: 'from-purple-600 to-indigo-600',
        groupBadgeLight: 'bg-purple-100 text-purple-800 border-purple-300',
        groupBadgeDark: 'bg-purple-950/80 text-purple-200 border-purple-600/50',
        subTitleLight: 'text-purple-700',
        subTitleDark: 'text-purple-300',
        taglineBorderLight: 'border-l-purple-500',
        taglineBorderDark: 'border-l-purple-400',
        roleLabelLight: 'text-purple-700',
        roleIconLight: 'text-purple-600',
        hashtagLight: 'bg-purple-50 text-purple-800 border-purple-200/90',
        hashtagDark: 'bg-white/10 text-purple-200 border-purple-400/20',
        hubBorderLight: 'border-purple-300/90',
        hubBorderDark: 'border-purple-500/40',
        hubGrad: 'from-purple-600 via-indigo-600 to-fuchsia-600',
        dividerLight: 'via-purple-300',
        dividerDark: 'via-purple-600/50',
        dotColor: 'bg-purple-500',
        activeBtnGrad: 'from-purple-600 to-indigo-600',
      };
    case 'learning':
    default:
      return {
        accent: '#0d9488',
        bannerBgLight: 'bg-gradient-to-br from-white via-teal-50/85 to-emerald-50/75',
        bannerBorderLight: 'border-teal-200/90',
        bannerShadowLight: 'shadow-[0_14px_40px_-10px_rgba(13,148,136,0.12)]',
        badgeGrad: 'from-teal-600 to-emerald-600',
        groupBadgeLight: 'bg-teal-100 text-teal-800 border-teal-300',
        groupBadgeDark: 'bg-teal-950/80 text-teal-200 border-teal-600/50',
        subTitleLight: 'text-teal-700',
        subTitleDark: 'text-teal-300',
        taglineBorderLight: 'border-l-teal-500',
        taglineBorderDark: 'border-l-teal-400',
        roleLabelLight: 'text-teal-700',
        roleIconLight: 'text-teal-600',
        hashtagLight: 'bg-teal-50 text-teal-800 border-teal-200/90',
        hashtagDark: 'bg-white/10 text-teal-200 border-teal-400/20',
        hubBorderLight: 'border-teal-300/90',
        hubBorderDark: 'border-teal-500/40',
        hubGrad: 'from-teal-600 via-emerald-600 to-cyan-600',
        dividerLight: 'via-teal-300',
        dividerDark: 'via-teal-600/50',
        dotColor: 'bg-teal-500',
        activeBtnGrad: 'from-teal-600 to-emerald-600',
      };
  }
};

const SECTION_COLORS: Record<string, { light: string; dark: string; grad: string }> = {
  fuchsia: { light: '#c026d3', dark: '#f0abfc', grad: 'from-fuchsia-600 to-purple-600' },
  blue: { light: '#2563eb', dark: '#93c5fd', grad: 'from-blue-600 to-indigo-600' },
  amber: { light: '#d97706', dark: '#fcd34d', grad: 'from-amber-600 to-orange-600' },
  indigo: { light: '#4f46e5', dark: '#a5b4fc', grad: 'from-indigo-600 to-purple-600' },
  purple: { light: '#9333ea', dark: '#d8b4fe', grad: 'from-purple-600 to-pink-600' },
  cyan: { light: '#0891b2', dark: '#67e8f9', grad: 'from-cyan-600 to-blue-600' },
  emerald: { light: '#059669', dark: '#6ee7b7', grad: 'from-emerald-600 to-teal-600' },
  rose: { light: '#e11d48', dark: '#fda4af', grad: 'from-rose-600 to-pink-600' },
  teal: { light: '#0d9488', dark: '#5eead4', grad: 'from-teal-600 to-emerald-600' },
  violet: { light: '#7c3aed', dark: '#c4b5fd', grad: 'from-violet-600 to-purple-600' },
};

export const ProjectDetailView: React.FC<ProjectDetailViewProps> = ({
  selectedArticle,
  selectedGroup,
  onSelectProject,
  onClose,
  onOpenMindmap,
  getCardVisualConfig,
  isLight = true,
  activeSection = 'sec-overview',
  onSectionChange,
}) => {
  const { showToast } = useToast();
  const [isLightMode, setIsLightMode] = useState<boolean>(isLight ?? true);
  const [activeTab, setActiveTab] = useState<string>('all');
  const [mindmapMode, setMindmapMode] = useState<'interactive' | 'image'>('interactive');
  const [isStickyCardsActive, setIsStickyCardsActive] = useState<boolean>(true);
  const [isExportModalOpen, setIsExportModalOpen] = useState<boolean>(false);
  const spec = getProjectDetailedSpec(selectedArticle);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handlePrintOnePager = () => {
    window.print();
  };

  const handleCopyStar = () => {
    const starResults = selectedArticle.star?.results ? selectedArticle.star.results.join(' • ') : (spec?.metrics.intro || '');
    const starObjectives = spec?.objectives ? spec.objectives.map(o => `• ${o.title}: ${o.items.join(', ')}`).join('\n') : '';
    const starText = `DỰ ÁN ${selectedArticle.code}: ${selectedArticle.title}\nVai trò: ${selectedArticle.role || 'Trưởng Dự Án'}\n\n[S - SITUATION]\n${selectedArticle.star?.situation || spec?.context.intro || selectedArticle.description || ''}\n\n[T - TASK / OBJECTIVES]\n${starObjectives}\n\n[A - ACTIONS]\n${selectedArticle.star?.approach || spec?.methodology.intro || ''}\n\n[R - RESULTS]\n${starResults}\n\nChỉ số: ${spec?.metrics.table.map(m => `${m.category}: ${m.indicators}`).join(' | ') || ''}`;
    navigator.clipboard.writeText(starText);
    showToast('Đã sao chép tóm tắt STAR vào bộ nhớ tạm!');
  };

  // Bảng màu nhận diện chuyên sâu theo nhóm dự án (Áp dụng cho toàn bộ 21 dự án)
  const gt = getProjectGroupTheme(selectedArticle.groupKey);
  const isStrategy = selectedArticle.groupKey === 'strategy';

  useEffect(() => {
    const checkTheme = () => {
      const isDarkClass = typeof document !== 'undefined' && document.documentElement.classList.contains('dark');
      const themeAttr = typeof document !== 'undefined' ? document.documentElement.getAttribute('data-theme') : null;
      if (typeof isLight === 'boolean') {
        setIsLightMode(isLight && !isDarkClass && themeAttr !== 'dark-neon');
      } else {
        setIsLightMode(!isDarkClass && themeAttr !== 'dark-neon');
      }
    };

    checkTheme();

    if (typeof MutationObserver !== 'undefined' && typeof document !== 'undefined') {
      const observer = new MutationObserver(checkTheme);
      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['class', 'data-theme'],
      });
      return () => observer.disconnect();
    }
  }, [isLight]);

  const getStackGradient = (idx: number) =>
    isLightMode ? STACK_CARD_GRADIENTS_LIGHT[idx] : STACK_CARD_GRADIENTS[idx];

  const getStarGradient = (idx: number) =>
    isLightMode ? STAR_CARD_GRADIENTS_LIGHT[idx] : STAR_CARD_GRADIENTS[idx];

  useEffect(() => {
    const sc = scrollContainerRef.current;
    if (!sc) return;

    const onScroll = () => {
      const cards = Array.from(sc.querySelectorAll<HTMLElement>('[data-section-card="true"]'));
      if (!cards.length) return;
      const top = sc.getBoundingClientRect().top;

      // Cập nhật mục lục đang xem (active section) theo vị trí cuộn tự nhiên (không chuyển động/co giãn thẻ)
      if (onSectionChange) {
        for (let i = cards.length - 1; i >= 0; i--) {
          const cardTop = cards[i].getBoundingClientRect().top;
          if (cardTop <= top + 180 && cards[i].id) {
            onSectionChange(cards[i].id);
            break;
          }
        }
      }
    };

    sc.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => {
      sc.removeEventListener('scroll', onScroll);
    };
  }, [selectedArticle, spec, onSectionChange]);

  // HIỆU ỨNG GSAP STICKY CARDS: FADE & SCALE OVERLAP SCROLL ANIMATION
  // Phân tích và chuyển giao 100% từ CodePen ScrollTrigger timeline
  useEffect(() => {
    const scroller = scrollContainerRef.current;
    if (!scroller || typeof window === 'undefined') return;

    if (!isStickyCardsActive) {
      // Khi tắt hiệu ứng: hoàn trả trạng thái ban đầu của các thẻ
      const cards = scroller.querySelectorAll<HTMLElement>('[data-section-card="true"]');
      cards.forEach((card) => {
        card.classList.remove('sticky-card-active');
        card.style.position = '';
        card.style.top = '';
        card.style.zIndex = '';
        card.style.transform = '';
        card.style.opacity = '';
        card.style.filter = '';
      });
      return;
    }

    const cards = Array.from(scroller.querySelectorAll<HTMLElement>('[data-section-card="true"]'));
    if (cards.length === 0) return;

    // Thiết lập baseline Sticky và z-index tăng dần cho từng thẻ theo đúng cơ chế Overlap
    cards.forEach((card, idx) => {
      card.classList.add('sticky-card-active');
      card.style.position = 'sticky';
      card.style.top = '16px';
      card.style.zIndex = `${10 + idx}`;
      card.style.transformOrigin = 'center top';
    });

    const ctx = gsap.context(() => {
      cards.forEach((card, index) => {
        // Thẻ cuối cùng (Index = length - 1): cho phép cuộn bình thường, không ghim scale/fade
        // Exactly as CodePen: "For the last card, allow normal scroll without pinning. gsap.set(card, { opacity: 1, scale: 1 });"
        if (index === cards.length - 1) {
          gsap.set(card, { opacity: 1, scale: 1, filter: 'blur(0px)' });
          return;
        }

        const nextCard = cards[index + 1];
        if (!nextCard) return;

        // GSAP ScrollTrigger timeline: Khi thẻ tiếp theo (nextCard) cuộn lên chạm vào đỉnh và đè lên thẻ hiện tại
        // Thẻ hiện tại (card) sẽ Fade dần (opacity 1 -> 0.18) và Scale nhỏ lại (scale 1 -> 0.88)
        gsap.timeline({
          scrollTrigger: {
            scroller: scroller,
            trigger: nextCard,
            start: 'top 85%',
            end: 'top 70px',
            scrub: 0.4,
          },
        })
        .to(card, {
          scale: 0.88,
          opacity: 0.18,
          filter: 'blur(2px)',
          ease: 'none',
        });
      });

      ScrollTrigger.refresh();
    }, scroller);

    return () => {
      ctx.revert();
    };
  }, [selectedArticle, spec, isStickyCardsActive]);

  const scrollToSection = (id: string) => {
    onSectionChange?.(id);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const currentProjectIdx = selectedGroup?.projects.findIndex((p) => p.id === selectedArticle.id) ?? -1;
  const nextProject =
    selectedGroup && currentProjectIdx >= 0 && currentProjectIdx < selectedGroup.projects.length - 1
      ? selectedGroup.projects[currentProjectIdx + 1]
      : null;
  const prevProject =
    selectedGroup && currentProjectIdx > 0 ? selectedGroup.projects[currentProjectIdx - 1] : null;

  return (
    <div className="w-full h-full flex-1 min-h-0 flex flex-col lg:flex-row gap-3.5 sm:gap-4 items-stretch relative overflow-hidden text-left font-play">
      {/* 1. KHỐI NỘI DUNG CHI TIẾT BÀI VIẾT DỰ ÁN (BÊN TRÁI) */}
      <div
        ref={scrollContainerRef}
        className="flex-1 min-w-0 h-full overflow-y-auto glass-scrollbar pr-1.5 pb-28 flex flex-col gap-4 text-left"
      >
        {spec && (
        <>
          {/* SECTION 00: SƠ ĐỒ TƯ DUY KIẾN TRÚC DỰ ÁN (VẼ LẠI NẰM TRONG CARD SƠ ĐỒ TƯ DUY) */}
          <section
            id="sec-mindmap"
            data-section-card="true"
            style={{ background: getStackGradient(0) }}
            className={`u223-c relative overflow-hidden w-full h-[620px] sm:h-[660px] lg:h-[calc(100vh-210px)] min-h-[560px] max-h-[760px] p-5 sm:p-6 rounded-[14px] flex flex-col justify-between shrink-0 backdrop-blur-2xl transition-all duration-300 ${
              isLightMode
                ? 'border border-slate-300/80 shadow-[0_14px_36px_rgba(30,27,75,0.08)]'
                : 'border border-white/20 dark:border-white/10 shadow-[0_14px_36px_rgba(99,102,241,0.25)]'
            }`}
          >
            <span className="u223-art pointer-events-none select-none" aria-hidden="true" />
            {/* Header Card Sơ Đồ Tư Duy */}
            <div
              className={`relative z-10 shrink-0 flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b ${
                isLightMode ? 'border-slate-300/70' : 'border-white/20'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span className={`font-mono font-black text-base sm:text-lg ${
                  isStrategy
                    ? 'text-sky-600 dark:text-sky-400'
                    : 'text-fuchsia-600 dark:text-fuchsia-400'
                }`}>
                  1
                </span>
                <WebIcon name="brain" className={`w-5 h-5 ${
                  isStrategy
                    ? 'text-sky-600 dark:text-sky-400'
                    : 'text-fuchsia-600 dark:text-fuchsia-400'
                } shrink-0`} />
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className={`font-black text-sm sm:text-base font-play tracking-wide ${
                      isStrategy
                        ? 'text-sky-600 dark:text-sky-400'
                        : 'text-fuchsia-600 dark:text-fuchsia-400'
                    }`}>
                      Sơ đồ tư duy
                    </h3>
                    <span
                      className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full backdrop-blur-md ${
                        isLightMode
                          ? isStrategy
                            ? 'bg-white/95 text-sky-800 border border-sky-200 shadow-2xs'
                            : 'bg-white/90 text-slate-700 border border-slate-200 shadow-xs'
                          : 'bg-white/20 text-white border border-white/30'
                      }`}
                    >
                      {selectedArticle.code}
                    </span>
                  </div>
                  <p className={`text-[11px] ${isLightMode ? 'text-slate-600 font-medium' : 'text-white/90'}`}>
                    Trực quan hóa cấu trúc dự án: Bối cảnh · Mục tiêu · 4 Trụ cột vận hành SOP · Kết quả đo lường
                  </p>
                </div>
              </div>

              {/* View Switcher & Fullscreen Action */}
              <div className="flex items-center gap-2 shrink-0 flex-wrap">
                <div className={`flex items-center p-1 rounded-xl bg-white/80 dark:bg-slate-800/80 border ${
                  isStrategy
                    ? 'border-sky-200/90 dark:border-white/10'
                    : 'border-fuchsia-200/80 dark:border-white/10'
                } shadow-2xs`}>
                  <button
                    type="button"
                    onClick={() => setMindmapMode('interactive')}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition flex items-center gap-1.5 cursor-pointer ${
                      mindmapMode === 'interactive'
                        ? isStrategy
                          ? 'bg-gradient-to-r from-sky-600 to-indigo-600 text-white shadow-xs'
                          : 'bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white shadow-xs'
                        : isStrategy
                        ? 'text-slate-600 dark:text-slate-300 hover:text-sky-600 dark:hover:text-sky-400'
                        : 'text-slate-600 dark:text-slate-300 hover:text-fuchsia-600 dark:hover:text-fuchsia-400'
                    }`}
                  >
                    <WebIcon name="network" className="w-3.5 h-3.5" />
                    <span>Sơ đồ nút tương tác</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setMindmapMode('image')}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition flex items-center gap-1.5 cursor-pointer ${
                      mindmapMode === 'image'
                        ? isStrategy
                          ? 'bg-gradient-to-r from-sky-600 to-indigo-600 text-white shadow-xs'
                          : 'bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white shadow-xs'
                        : isStrategy
                        ? 'text-slate-600 dark:text-slate-300 hover:text-sky-600 dark:hover:text-sky-400'
                        : 'text-slate-600 dark:text-slate-300 hover:text-fuchsia-600 dark:hover:text-fuchsia-400'
                    }`}
                  >
                    <WebIcon name="image" className="w-3.5 h-3.5" />
                    <span>Bản vẽ đồ họa gốc</span>
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => onOpenMindmap(selectedArticle)}
                  className={`px-2.5 py-1.5 rounded-xl text-white text-[11px] font-bold shadow-xs flex items-center gap-1.5 cursor-pointer transition active:scale-95 ${
                    isStrategy
                      ? 'bg-sky-600 hover:bg-sky-500'
                      : 'bg-fuchsia-600 hover:bg-fuchsia-500'
                  }`}
                >
                  <WebIcon name="maximize" className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Phóng to</span>
                </button>
              </div>
            </div>

            {/* Mind Map Canvas Body (Cuộn mượt mà bên trong, giữ nguyên chiều cao chuẩn) */}
            <div className="relative z-10 flex-1 min-h-0 overflow-y-auto glass-scrollbar pr-1.5 py-2.5 space-y-4">
            {mindmapMode === 'interactive' ? (
              <div className="space-y-4">
                {/* Central Hub Node (Project Core) */}
                <div className={`relative p-4 rounded-2xl bg-white/95 dark:bg-slate-800/95 border-2 ${
                  isStrategy
                    ? 'border-sky-300/90 dark:border-sky-500/40 shadow-[0_4px_20px_-2px_rgba(2,132,199,0.12)]'
                    : 'border-fuchsia-300/80 dark:border-fuchsia-500/40 shadow-md'
                } flex flex-col md:flex-row items-start md:items-center justify-between gap-3 overflow-hidden`}>
                  <div className={`absolute -top-12 -right-12 w-32 h-32 rounded-full ${
                    isStrategy
                      ? 'bg-gradient-to-br from-sky-400/20 via-indigo-400/20 to-transparent'
                      : 'bg-gradient-to-br from-fuchsia-400/20 via-purple-400/20 to-transparent'
                  } blur-xl pointer-events-none`} />

                  <div className="flex items-start sm:items-center gap-3 min-w-0">
                    <div className={`w-12 h-12 rounded-2xl ${
                      isStrategy
                        ? 'bg-gradient-to-br from-sky-600 via-indigo-600 to-blue-600'
                        : 'bg-gradient-to-br from-fuchsia-600 via-purple-600 to-indigo-600'
                    } text-white flex items-center justify-center shrink-0 shadow-md`}>
                      <WebIcon name="brain" className="w-6 h-6 text-white animate-pulse" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`px-2 py-0.5 rounded-md font-mono text-[11px] font-black border ${
                          isStrategy
                            ? 'bg-sky-100 dark:bg-sky-950/80 text-sky-800 dark:text-sky-200 border-sky-300 dark:border-sky-600/50'
                            : 'bg-fuchsia-100 dark:bg-fuchsia-950/80 text-fuchsia-800 dark:text-fuchsia-200 border-fuchsia-300 dark:border-fuchsia-600/50'
                        }`}>
                          {selectedArticle.code}
                        </span>
                        <span className={`px-2 py-0.5 rounded-md text-[11px] font-bold border ${
                          isStrategy
                            ? 'bg-sky-100 dark:bg-sky-950/80 text-sky-800 dark:text-sky-200 border-sky-300 dark:border-sky-600/50'
                            : 'bg-purple-100 dark:bg-purple-950/80 text-purple-800 dark:text-purple-200 border-purple-300 dark:border-purple-600/50'
                        }`}>
                          {selectedArticle.groupTitle}
                        </span>
                        <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400">
                          Vai trò: <strong className={isStrategy ? 'text-sky-700 dark:text-sky-300' : 'text-purple-700 dark:text-purple-300'}>{selectedArticle.role}</strong>
                        </span>
                      </div>
                      <h4 className="font-black text-base sm:text-lg text-slate-900 dark:text-white mt-1 leading-snug">
                        {selectedArticle.title}
                      </h4>
                      <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5 italic">
                        &ldquo;{selectedArticle.quote || spec.tagline}&rdquo;
                      </p>
                    </div>
                  </div>

                  {/* Tech stack / keywords chips */}
                  <div className="flex items-center gap-1.5 flex-wrap shrink-0">
                    {selectedArticle.hashtags.slice(0, 4).map((tag) => (
                      <span
                        key={tag}
                        className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold border ${
                          isLightMode
                            ? isStrategy
                              ? 'bg-sky-50 text-sky-800 border-sky-200'
                              : 'bg-slate-100 text-slate-700 border-slate-200'
                            : 'bg-slate-700/80 text-slate-200 border-slate-600'
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Connecting Visual Divider */}
                <div className="hidden lg:flex items-center justify-center gap-4 text-[11px] font-mono font-bold text-slate-400 dark:text-slate-500">
                  <div className={`h-px flex-1 bg-gradient-to-r from-transparent ${
                    isStrategy ? 'via-sky-300 dark:via-sky-600/50' : 'via-fuchsia-300 dark:via-fuchsia-600/50'
                  } to-transparent`} />
                  <span className={`flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 dark:bg-slate-800/80 border ${
                    isStrategy ? 'border-sky-200 dark:border-sky-700' : 'border-fuchsia-200 dark:border-fuchsia-700'
                  } shadow-2xs`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${
                      isStrategy ? 'bg-sky-500' : 'bg-fuchsia-500'
                    } animate-ping`} />
                    4 Nhánh Triển Khai Chiến Lược & Vận Hành Cốt Lõi
                  </span>
                  <div className={`h-px flex-1 bg-gradient-to-r from-transparent ${
                    isStrategy ? 'via-sky-300 dark:via-sky-600/50' : 'via-fuchsia-300 dark:via-fuchsia-600/50'
                  } to-transparent`} />
                </div>

                {/* 4 Radiating Branches (2x2 Grid, Equal Height) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 items-stretch">
                  {/* Branch 1: Bối cảnh & Thách thức (Rose/Pink Tint) */}
                  <div className="h-full p-4 rounded-xl bg-gradient-to-br from-rose-50/95 via-rose-50/60 to-white/95 dark:from-rose-950/40 dark:via-slate-800/90 dark:to-slate-800/90 border-2 border-rose-200 dark:border-rose-500/40 shadow-xs space-y-2.5 flex flex-col justify-between hover:border-rose-400 dark:hover:border-rose-400 transition-all duration-300">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between gap-2 pb-2 border-b border-rose-200/80 dark:border-rose-900/40">
                        <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400">
                          <WebIcon name="alert" className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0" />
                          <h5 className="font-black text-xs sm:text-sm text-rose-600 dark:text-rose-400 tracking-wide font-play">
                            Bối Cảnh Vận Hành
                          </h5>
                        </div>
                      </div>

                      <p className="text-[11.5px] text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                        {spec.context.intro}
                      </p>

                      <div className="space-y-1.5 pt-1 border-l-2 border-dashed border-rose-300 dark:border-rose-600/60 pl-2.5">
                        {spec.context.challenges.slice(0, 3).map((ch, idx) => (
                          <div key={idx} className="flex items-start gap-1.5 text-[11px] text-slate-600 dark:text-slate-300">
                            <WebIcon name="alert" className="w-3.5 h-3.5 text-rose-500 shrink-0 mt-0.5" />
                            <span className="leading-snug">{ch}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => scrollToSection('sec-context')}
                      className="mt-3 pt-2 border-t border-rose-200/70 dark:border-rose-900/40 text-[11px] font-bold text-rose-700 dark:text-rose-300 hover:text-rose-900 dark:hover:text-rose-100 flex items-center justify-between cursor-pointer transition"
                    >
                      <span>Xem bối cảnh & các điểm nghẽn chi tiết</span>
                      <span>↓</span>
                    </button>
                  </div>

                  {/* Branch 2: Mục tiêu & Chiến lược (Amber/Orange Tint) */}
                  <div className="h-full p-4 rounded-xl bg-gradient-to-br from-amber-50/95 via-amber-50/60 to-white/95 dark:from-amber-950/40 dark:via-slate-800/90 dark:to-slate-800/90 border-2 border-amber-200 dark:border-amber-500/40 shadow-xs space-y-2.5 flex flex-col justify-between hover:border-amber-400 dark:hover:border-amber-400 transition-all duration-300">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between gap-2 pb-2 border-b border-amber-200/80 dark:border-amber-900/40">
                        <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400">
                          <WebIcon name="target" className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
                          <h5 className="font-black text-xs sm:text-sm text-amber-600 dark:text-amber-400 tracking-wide font-play">
                            Mục Tiêu Kỳ Vọng
                          </h5>
                        </div>
                      </div>

                      <div className="space-y-1.5 border-l-2 border-dashed border-amber-300 dark:border-amber-600/60 pl-2.5">
                        {spec.objectives.slice(0, 3).map((obj, idx) => (
                          <div key={idx} className="space-y-0.5">
                            <div className="flex items-center gap-1.5 text-[11px] font-bold text-amber-900 dark:text-amber-200">
                              <WebIcon name="target" className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                              <span>{obj.title}</span>
                            </div>
                            {obj.items[0] && (
                              <p className="text-[10.5px] text-slate-600 dark:text-slate-300 pl-5 leading-snug">
                                • {obj.items[0]}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => scrollToSection('sec-objectives')}
                      className="mt-3 pt-2 border-t border-amber-200/70 dark:border-amber-900/40 text-[11px] font-bold text-amber-700 dark:text-amber-300 hover:text-amber-900 dark:hover:text-amber-100 flex items-center justify-between cursor-pointer transition"
                    >
                      <span>Xem chi tiết 3 mục tiêu chiến lược</span>
                      <span>↓</span>
                    </button>
                  </div>

                  {/* Branch 3: Phương pháp & 4 Trụ cột SOP (Sky/Blue Tint) */}
                  <div className="h-full p-4 rounded-xl bg-gradient-to-br from-sky-50/95 via-sky-50/60 to-white/95 dark:from-sky-950/40 dark:via-slate-800/90 dark:to-slate-800/90 border-2 border-sky-200 dark:border-sky-500/40 shadow-xs space-y-2.5 flex flex-col justify-between hover:border-sky-400 dark:hover:border-sky-400 transition-all duration-300">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between gap-2 pb-2 border-b border-sky-200/80 dark:border-sky-900/40">
                        <div className="flex items-center gap-2 text-sky-600 dark:text-sky-400">
                          <WebIcon name="workflow" className="w-4 h-4 text-sky-600 dark:text-sky-400 shrink-0" />
                          <h5 className="font-black text-xs sm:text-sm text-sky-600 dark:text-sky-400 tracking-wide font-play">
                            Trụ Cột Vận Hành
                          </h5>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-1.5">
                        <div className="p-2 rounded-lg bg-sky-100/70 dark:bg-sky-950/60 border border-sky-200/80 dark:border-sky-700/50">
                          <span className="text-[10px] font-bold text-sky-800 dark:text-sky-300 flex items-center gap-1">
                            <WebIcon name="users" className="w-3 h-3 text-sky-500" />
                            <span>Con người</span>
                          </span>
                          <p className="text-[9.5px] text-slate-600 dark:text-slate-300 mt-0.5">Đào tạo, KPI, kỹ năng</p>
                        </div>
                        <div className="p-2 rounded-lg bg-sky-100/70 dark:bg-sky-950/60 border border-sky-200/80 dark:border-sky-700/50">
                          <span className="text-[10px] font-bold text-sky-800 dark:text-sky-300 flex items-center gap-1">
                            <WebIcon name="cog" className="w-3 h-3 text-sky-500" />
                            <span>Quy trình SOP</span>
                          </span>
                          <p className="text-[9.5px] text-slate-600 dark:text-slate-300 mt-0.5">SOP & Escalation</p>
                        </div>
                        <div className="p-2 rounded-lg bg-sky-100/70 dark:bg-sky-950/60 border border-sky-200/80 dark:border-sky-700/50">
                          <span className="text-[10px] font-bold text-sky-800 dark:text-sky-300 flex items-center gap-1">
                            <WebIcon name="database" className="w-3 h-3 text-sky-500" />
                            <span>Công nghệ CRM</span>
                          </span>
                          <p className="text-[9.5px] text-slate-600 dark:text-slate-300 mt-0.5">Omnichannel & AI</p>
                        </div>
                        <div className="p-2 rounded-lg bg-sky-100/70 dark:bg-sky-950/60 border border-sky-200/80 dark:border-sky-700/50">
                          <span className="text-[10px] font-bold text-sky-800 dark:text-sky-300 flex items-center gap-1">
                            <WebIcon name="chart" className="w-3 h-3 text-sky-500" />
                            <span>Dữ liệu Realtime</span>
                          </span>
                          <p className="text-[9.5px] text-slate-600 dark:text-slate-300 mt-0.5">360° Dashboard</p>
                        </div>
                      </div>

                      <div className="text-[10.5px] text-slate-600 dark:text-slate-300 pt-0.5">
                        <strong className="text-sky-700 dark:text-sky-300">Lộ trình:</strong>{' '}
                        {spec.methodology.phases.map((p) => p.title).slice(0, 3).join(' → ')}...
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => scrollToSection('sec-methodology')}
                      className="mt-3 pt-2 border-t border-sky-200/70 dark:border-sky-900/40 text-[11px] font-bold text-sky-700 dark:text-sky-300 hover:text-sky-900 dark:hover:text-sky-100 flex items-center justify-between cursor-pointer transition"
                    >
                      <span>Xem lộ trình vận hành & các hạng mục</span>
                      <span>↓</span>
                    </button>
                  </div>

                  {/* Branch 4: Kết quả & Giá trị kinh doanh (Emerald/Green Tint) */}
                  <div className="h-full p-4 rounded-xl bg-gradient-to-br from-emerald-50/95 via-emerald-50/60 to-white/95 dark:from-emerald-950/40 dark:via-slate-800/90 dark:to-slate-800/90 border-2 border-emerald-200 dark:border-emerald-500/40 shadow-xs space-y-2.5 flex flex-col justify-between hover:border-emerald-400 dark:hover:border-emerald-400 transition-all duration-300">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between gap-2 pb-2 border-b border-emerald-200/80 dark:border-emerald-900/40">
                        <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                          <WebIcon name="award" className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                          <h5 className="font-black text-xs sm:text-sm text-emerald-600 dark:text-emerald-400 tracking-wide font-play">
                            Kết Quả Định Lượng
                          </h5>
                        </div>
                      </div>

                      <div className="space-y-1.5 border-l-2 border-dashed border-emerald-300 dark:border-emerald-600/60 pl-2.5">
                        {selectedArticle.star.results.map((res, rIdx) => (
                          <div key={rIdx} className="flex items-start gap-1.5 text-[11px] text-slate-700 dark:text-slate-200 font-medium">
                            <WebIcon name="check" className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                            <span className="leading-snug">{res}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => scrollToSection('sec-metrics')}
                      className="mt-3 pt-2 border-t border-emerald-200/70 dark:border-emerald-900/40 text-[11px] font-bold text-emerald-700 dark:text-emerald-300 hover:text-emerald-900 dark:hover:text-emerald-100 flex items-center justify-between cursor-pointer transition"
                    >
                      <span>Xem bảng chỉ số KPI, SLA & Giá trị</span>
                      <span>↓</span>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              /* Image mode view */
              <div className="space-y-2">
                <div
                  className="w-full h-80 sm:h-96 md:h-[480px] rounded-xl overflow-hidden bg-slate-950 border border-fuchsia-300/60 dark:border-fuchsia-500/30 relative group cursor-pointer shadow-md"
                  onClick={() => onOpenMindmap(selectedArticle)}
                >
                  <img
                    src={selectedArticle.mindmap}
                    alt={`Sơ đồ tư duy ${selectedArticle.code}`}
                    className="w-full h-full object-contain bg-slate-900"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = selectedArticle.image;
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-4">
                    <span className="text-xs font-bold text-white flex items-center gap-1.5">
                      <WebIcon name="maximize" className="w-4 h-4 text-fuchsia-300" />
                      <span>Nhấp để phóng to toàn màn hình</span>
                    </span>
                    <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-[11px] font-mono">
                      {selectedArticle.code}
                    </span>
                  </div>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 text-center italic">
                  Bản vẽ kiến trúc hệ thống gốc của dự án {selectedArticle.code}. Bấm vào hình ảnh hoặc nút Phóng to để tương tác kích thước đầy đủ.
                </p>
              </div>
            )}
            </div>

            {/* Footer Card Sơ Đồ Tư Duy */}
            <div className={`relative z-10 shrink-0 pt-2.5 border-t flex items-center justify-between text-xs mt-auto ${
              isLightMode ? 'border-slate-300/70 text-slate-600' : 'border-white/20 text-white/80'
            }`}>
              <span className="flex items-center gap-1.5 font-semibold">
                <WebIcon name="sparkles" className="w-3.5 h-3.5 text-sky-500" />
                <span>Trực quan hóa cấu trúc kiến trúc toàn diện</span>
              </span>
              <button
                type="button"
                onClick={() => scrollToSection('sec-overview')}
                className="font-bold hover:underline flex items-center gap-1 text-sky-600 dark:text-sky-400 cursor-pointer"
              >
                <span>Xem tiếp: Tổng quan dự án</span>
                <span>↓</span>
              </button>
            </div>
          </section>

          {/* SECTION 01: TỔNG QUAN DỰ ÁN */}
          <section
            id="sec-overview"
            data-section-card="true"
            style={{ background: getStackGradient(1) }}
            className={`u223-c relative overflow-hidden w-full h-[620px] sm:h-[660px] lg:h-[calc(100vh-210px)] min-h-[560px] max-h-[760px] p-5 sm:p-6 rounded-[14px] flex flex-col justify-between shrink-0 backdrop-blur-2xl transition-all duration-300 ${
              isLightMode
                ? 'border border-slate-300/80 shadow-[0_14px_36px_rgba(30,27,75,0.08)]'
                : 'border border-white/20 dark:border-white/10 shadow-[0_14px_36px_rgba(2,132,199,0.25)]'
            }`}
          >
            <span className="u223-art pointer-events-none select-none" aria-hidden="true" />
            
            {/* Header Card */}
            <div
              className={`relative z-10 shrink-0 flex items-center justify-between pb-2.5 border-b ${
                isLightMode ? 'border-slate-300/70' : 'border-white/20'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span className="font-mono font-black text-base sm:text-lg text-blue-600 dark:text-cyan-400">
                  2
                </span>
                <WebIcon name="layers" className="w-5 h-5 text-blue-600 dark:text-cyan-400 shrink-0" />
                <h3 className="font-black text-sm sm:text-base font-play tracking-wide text-blue-600 dark:text-cyan-400">
                  Tổng quan dự án
                </h3>
              </div>
              <span
                className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full backdrop-blur-md ${
                  isLightMode
                    ? 'bg-white/90 text-slate-700 border border-slate-200 shadow-xs'
                    : 'bg-white/20 text-white border border-white/30'
                }`}
              >
                Project Overview
              </span>
            </div>

            {/* Body Card Cuộn Mượt Mà */}
            <div className="relative z-10 flex-1 min-h-0 overflow-y-auto glass-scrollbar pr-1.5 py-2.5 space-y-3.5 text-left">
              {/* Overview Content with High-Fidelity Contextual Visual Banner */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
                <div className="lg:col-span-8 p-4 rounded-xl bg-white/95 dark:bg-slate-900/95 border border-white/20 dark:border-white/10 space-y-3 shadow-xs flex flex-col justify-between">
                  <div className="space-y-2.5">
                    {spec.overview.map((para, idx) => (
                      <p key={idx} className="text-xs sm:text-[13px] text-slate-800 dark:text-slate-100 leading-relaxed font-medium">
                        {para}
                      </p>
                    ))}
                  </div>

                  <div className="pt-3 border-t border-slate-100 dark:border-white/10 flex items-center gap-2 flex-wrap text-[11px] font-semibold text-slate-600 dark:text-slate-300">
                    <span className="text-blue-600 dark:text-cyan-400 font-bold flex items-center gap-1">
                      <WebIcon name="target" className="w-3.5 h-3.5" />
                      <span>Trọng tâm cốt lõi:</span>
                    </span>
                    <span>Kết nối chặt chẽ 4 nguồn lực: Con người · Quy trình · Công nghệ · Dữ liệu</span>
                  </div>
                </div>

                <div className="lg:col-span-4 rounded-xl overflow-hidden border border-blue-200/80 dark:border-blue-500/30 bg-slate-950 relative group shadow-xs flex flex-col justify-between min-h-[160px]">
                  <img
                    src={selectedArticle.image}
                    alt={selectedArticle.title}
                    className="w-full h-full object-cover opacity-90  transition-transform duration-500"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=800&auto=format&fit=crop';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/40 to-transparent flex flex-col justify-end p-3.5">
                    <span className="text-[10px] font-mono font-bold text-cyan-300 uppercase tracking-wider">
                      Mô hình vận hành CSKH chuẩn
                    </span>
                    <h5 className="text-xs font-bold text-white leading-tight mt-0.5">
                      Phòng Dịch Vụ Khách Hàng Hiện Đại
                    </h5>
                  </div>
                </div>
              </div>

              {/* 4 Trụ Cột Vận Hành Cốt Lõi (4 Core Operational Pillars) */}
              <div className="p-4 rounded-xl bg-white/95 dark:bg-slate-900/95 border border-white/20 dark:border-white/10 shadow-xs space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-black text-xs sm:text-sm text-blue-600 dark:text-cyan-400">04</span>
                    <WebIcon name="layers" className="w-4 h-4 text-blue-600 dark:text-cyan-400 shrink-0" />
                    <h4 className="text-xs sm:text-sm font-black uppercase tracking-wider text-slate-900 dark:text-white">
                      TRỤ CỘT VẬN HÀNH
                    </h4>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-slate-500 dark:text-slate-400">
                    4 Core Pillars
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 items-stretch">
                  {/* Trụ Cột 1: Sky Tint */}
                  <div className="h-full p-3.5 rounded-xl bg-gradient-to-br from-sky-50/90 to-sky-100/40 dark:from-sky-950/40 dark:to-slate-800/80 border border-sky-200/90 dark:border-sky-500/30 flex flex-col justify-between shadow-2xs hover:border-sky-400 transition">
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2 pb-1.5 border-b border-sky-200/70 dark:border-sky-900/40">
                        <span className="font-mono font-black text-xs text-sky-600 dark:text-sky-400">2.1</span>
                        <WebIcon name="users" className="w-4 h-4 text-sky-600 dark:text-sky-400 shrink-0" />
                        <h5 className="font-black text-xs text-sky-600 dark:text-sky-400 tracking-wide">
                          Con người vận hành
                        </h5>
                      </div>
                      <p className="text-[11.5px] text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                        Cơ cấu tổ chức rõ ràng, phân định trách nhiệm, đào tạo và phát triển đội ngũ chuyên nghiệp.
                      </p>
                    </div>
                    <span className="text-[10px] font-mono font-bold text-sky-700 dark:text-sky-300 pt-2 border-t border-sky-200/50 dark:border-sky-800/40 mt-2 block">
                      People & Competency
                    </span>
                  </div>

                  {/* Trụ Cột 2: Emerald Tint */}
                  <div className="h-full p-3.5 rounded-xl bg-gradient-to-br from-emerald-50/90 to-emerald-100/40 dark:from-emerald-950/40 dark:to-slate-800/80 border border-emerald-200/90 dark:border-emerald-500/30 flex flex-col justify-between shadow-2xs hover:border-emerald-400 transition">
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2 pb-1.5 border-b border-emerald-200/70 dark:border-emerald-900/40">
                        <span className="font-mono font-black text-xs text-emerald-600 dark:text-emerald-400">2.2</span>
                        <WebIcon name="workflow" className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                        <h5 className="font-black text-xs text-emerald-600 dark:text-emerald-400 tracking-wide">
                          Quy trình chuẩn hóa
                        </h5>
                      </div>
                      <p className="text-[11.5px] text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                        SOP chuẩn hóa, luồng tiếp nhận, phân loại, giải quyết khiếu nại và ma trận escalation chặt chẽ.
                      </p>
                    </div>
                    <span className="text-[10px] font-mono font-bold text-emerald-700 dark:text-emerald-300 pt-2 border-t border-emerald-200/50 dark:border-emerald-800/40 mt-2 block">
                      Process & Standards
                    </span>
                  </div>

                  {/* Trụ Cột 3: Purple Tint */}
                  <div className="h-full p-3.5 rounded-xl bg-gradient-to-br from-purple-50/90 to-purple-100/40 dark:from-purple-950/40 dark:to-slate-800/80 border border-purple-200/90 dark:border-purple-500/30 flex flex-col justify-between shadow-2xs hover:border-purple-400 transition">
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2 pb-1.5 border-b border-purple-200/70 dark:border-purple-900/40">
                        <span className="font-mono font-black text-xs text-purple-600 dark:text-purple-400">2.3</span>
                        <WebIcon name="headphones" className="w-4 h-4 text-purple-600 dark:text-purple-400 shrink-0" />
                        <h5 className="font-black text-xs text-purple-600 dark:text-purple-400 tracking-wide">
                          Công nghệ tổng đài
                        </h5>
                      </div>
                      <p className="text-[11.5px] text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                        Tổng đài thông minh, CRM 360 độ đa kênh và các công cụ giám sát vận hành thời gian thực.
                      </p>
                    </div>
                    <span className="text-[10px] font-mono font-bold text-purple-700 dark:text-purple-300 pt-2 border-t border-purple-200/50 dark:border-purple-800/40 mt-2 block">
                      Tech & Omnichannel
                    </span>
                  </div>

                  {/* Trụ Cột 4: Amber Tint */}
                  <div className="h-full p-3.5 rounded-xl bg-gradient-to-br from-amber-50/90 to-amber-100/40 dark:from-amber-950/40 dark:to-slate-800/80 border border-amber-200/90 dark:border-amber-500/30 flex flex-col justify-between shadow-2xs hover:border-amber-400 transition">
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2 pb-1.5 border-b border-amber-200/70 dark:border-amber-900/40">
                        <span className="font-mono font-black text-xs text-amber-600 dark:text-amber-400">2.4</span>
                        <WebIcon name="chart" className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
                        <h5 className="font-black text-xs text-amber-600 dark:text-amber-400 tracking-wide">
                          Dữ liệu đo lường
                        </h5>
                      </div>
                      <p className="text-[11.5px] text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                        Hệ thống đo lường KPI/SLA minh bạch, báo cáo phân tích nguyên nhân gốc rễ và tối ưu chi phí.
                      </p>
                    </div>
                    <span className="text-[10px] font-mono font-bold text-amber-700 dark:text-amber-300 pt-2 border-t border-amber-200/50 dark:border-amber-800/40 mt-2 block">
                      Data & Governance
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Card Tổng Quan Dự Án */}
            <div className={`relative z-10 shrink-0 pt-2.5 border-t flex items-center justify-between text-xs mt-auto ${
              isLightMode ? 'border-slate-300/70 text-slate-600' : 'border-white/20 text-white/80'
            }`}>
              <span className="flex items-center gap-1.5 font-semibold">
                <WebIcon name="target" className="w-3.5 h-3.5 text-blue-500" />
                <span>Nền tảng vận hành 4 trụ cột cốt lõi</span>
              </span>
              <button
                type="button"
                onClick={() => scrollToSection('sec-context')}
                className="font-bold hover:underline flex items-center gap-1 text-blue-600 dark:text-cyan-400 cursor-pointer"
              >
                <span>Xem tiếp: Bối cảnh thách thức</span>
                <span>↓</span>
              </button>
            </div>
          </section>

          {/* SECTION 02: BỐI CẢNH THÁCH THỨC */}
          <section
            id="sec-context"
            data-section-card="true"
            style={{ background: getStackGradient(2) }}
            className={`u223-c relative overflow-hidden w-full h-[620px] sm:h-[660px] lg:h-[calc(100vh-210px)] min-h-[560px] max-h-[760px] p-5 sm:p-6 rounded-[14px] flex flex-col justify-between shrink-0 backdrop-blur-2xl transition-all duration-300 ${
              isLightMode
                ? 'border border-slate-300/80 shadow-[0_14px_36px_rgba(30,27,75,0.08)]'
                : 'border border-white/20 dark:border-white/10 shadow-[0_14px_36px_rgba(217,119,6,0.25)]'
            }`}
          >
            <span className="u223-art pointer-events-none select-none" aria-hidden="true" />
            
            {/* Header Card */}
            <div
              className={`relative z-10 shrink-0 flex items-center justify-between pb-2.5 border-b ${
                isLightMode ? 'border-slate-300/70' : 'border-white/20'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span className="font-mono font-black text-base sm:text-lg text-amber-600 dark:text-amber-400">
                  3
                </span>
                <WebIcon name="alert" className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0" />
                <h3 className="font-black text-sm sm:text-base font-play tracking-wide text-amber-600 dark:text-amber-400">
                  Bối cảnh thách thức
                </h3>
              </div>
              <span
                className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full backdrop-blur-md ${
                  isLightMode
                    ? 'bg-white/90 text-slate-700 border border-slate-200 shadow-xs'
                    : 'bg-white/20 text-white border border-white/30'
                }`}
              >
                Context & 7 Bottlenecks
              </span>
            </div>

            {/* Body Card Cuộn Mượt Mà */}
            <div className="relative z-10 flex-1 min-h-0 overflow-y-auto glass-scrollbar pr-1.5 py-2.5 space-y-3.5 text-left">
              <div className="p-4 rounded-xl bg-white/95 dark:bg-slate-900/95 border border-white/20 dark:border-white/10 text-xs sm:text-[13px] text-slate-800 dark:text-slate-100 leading-relaxed font-semibold shadow-xs">
                {spec.context.intro}
              </div>

              {/* Diagnostic Challenge Cards (Distinct Colors & Equal Height) */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 items-stretch">
                {spec.context.challenges.map((chDesc, idx) => {
                  const palette = CHALLENGE_PALETTES[idx % CHALLENGE_PALETTES.length];
                  return (
                    <div
                      key={idx}
                      className={`h-full p-3.5 rounded-xl bg-gradient-to-br ${palette.theme} border shadow-2xs flex flex-col justify-between  transition duration-200`}
                    >
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 pb-1.5 border-b border-black/5 dark:border-white/10">
                          <span className="font-mono font-black text-xs sm:text-sm">3.{idx + 1}</span>
                          <WebIcon name={palette.icon} className="w-4 h-4 shrink-0" />
                          <h5 className="font-black text-xs tracking-wide" style={{ color: 'inherit' }}>
                            {palette.fourWord}
                          </h5>
                        </div>
                        <p className="text-[11.5px] text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                          {chDesc}
                        </p>
                      </div>
                      <span className="text-[9.5px] font-mono font-bold text-slate-500 dark:text-slate-400 pt-2 border-t border-black/5 dark:border-white/5 mt-2 block">
                        Thách thức vận hành 3.{idx + 1}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Strategic Conclusion Callout */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-amber-500/15 via-orange-500/15 to-amber-500/10 border-2 border-amber-400/50 text-xs sm:text-[13px] font-bold text-amber-950 dark:text-amber-200 leading-relaxed flex items-center gap-3 shadow-xs">
                <span className="font-mono font-black text-sm text-amber-600 dark:text-amber-400">03</span>
                <WebIcon name="target" className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0" />
                <span className="flex-1 font-semibold">
                  <strong className="text-amber-900 dark:text-amber-100 uppercase tracking-wide mr-1.5 font-black">
                    GIẢI PHÁP TRỌNG TÂM:
                  </strong>
                  {spec.context.conclusion}
                </span>
              </div>
            </div>

            {/* Footer Card Bối Cảnh Thách Thức */}
            <div className={`relative z-10 shrink-0 pt-2.5 border-t flex items-center justify-between text-xs mt-auto ${
              isLightMode ? 'border-slate-300/70 text-slate-600' : 'border-white/20 text-white/80'
            }`}>
              <span className="flex items-center gap-1.5 font-semibold">
                <WebIcon name="alert" className="w-3.5 h-3.5 text-amber-500" />
                <span>Nhận diện 7 điểm nghẽn & giải pháp trọng tâm</span>
              </span>
              <button
                type="button"
                onClick={() => scrollToSection('sec-objectives')}
                className="font-bold hover:underline flex items-center gap-1 text-amber-600 dark:text-amber-400 cursor-pointer"
              >
                <span>Xem tiếp: Mục tiêu chiến lược</span>
                <span>↓</span>
              </button>
            </div>
          </section>

          {/* SECTION 03: MỤC TIÊU CHIẾN LƯỢC */}
          <section
            id="sec-objectives"
            data-section-card="true"
            style={{ background: getStackGradient(3) }}
            className={`u223-c relative overflow-hidden w-full h-[620px] sm:h-[660px] lg:h-[calc(100vh-210px)] min-h-[560px] max-h-[760px] p-5 sm:p-6 rounded-[14px] flex flex-col justify-between shrink-0 backdrop-blur-2xl transition-all duration-300 ${
              isLightMode
                ? 'border border-slate-300/80 shadow-[0_14px_36px_rgba(30,27,75,0.08)]'
                : 'border border-white/20 dark:border-white/10 shadow-[0_14px_36px_rgba(13,148,136,0.25)]'
            }`}
          >
            <span className="u223-art pointer-events-none select-none" aria-hidden="true" />
            
            {/* Header Card */}
            <div
              className={`relative z-10 shrink-0 flex items-center justify-between pb-2.5 border-b ${
                isLightMode ? 'border-slate-300/70' : 'border-white/20'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span className="font-mono font-black text-base sm:text-lg text-teal-600 dark:text-teal-400">
                  4
                </span>
                <WebIcon name="target" className="w-5 h-5 text-teal-600 dark:text-teal-400 shrink-0" />
                <h3 className="font-black text-sm sm:text-base font-play tracking-wide text-teal-600 dark:text-teal-400">
                  Mục tiêu chiến lược
                </h3>
              </div>
              <span
                className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full backdrop-blur-md ${
                  isLightMode
                    ? 'bg-white/90 text-slate-700 border border-slate-200 shadow-xs'
                    : 'bg-white/20 text-white border border-white/30'
                }`}
              >
                3 Khía Cạnh Trọng Tâm
              </span>
            </div>

            {/* Body Card Cuộn Mượt Mà */}
            <div className="relative z-10 flex-1 min-h-0 overflow-y-auto glass-scrollbar pr-1.5 py-2.5 space-y-3.5 text-left">
              {/* Objectives Cards (Equal Height, Distinct Colors, Unframed Icons, 4-word Titles) */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-3.5 items-stretch">
                {spec.objectives.map((obj, idx) => {
                  const objThemes = [
                    {
                      theme: 'from-blue-50/90 to-blue-100/40 dark:from-blue-950/40 dark:to-slate-800/80 border-blue-200/90 dark:border-blue-500/30 text-blue-600 dark:text-blue-400',
                      icon: 'building',
                      badge: 'Organizational Goal',
                    },
                    {
                      theme: 'from-emerald-50/90 to-emerald-100/40 dark:from-emerald-950/40 dark:to-slate-800/80 border-emerald-200/90 dark:border-emerald-500/30 text-emerald-600 dark:text-emerald-400',
                      icon: 'workflow',
                      badge: 'Operational Excellence',
                    },
                    {
                      theme: 'from-purple-50/90 to-purple-100/40 dark:from-purple-950/40 dark:to-slate-800/80 border-purple-200/90 dark:border-purple-500/30 text-purple-600 dark:text-purple-400',
                      icon: 'rocket',
                      badge: 'Growth & Scalability',
                    },
                  ];
                  const t = objThemes[idx % objThemes.length];
                  return (
                    <div
                      key={idx}
                      className={`h-full p-4 rounded-xl bg-gradient-to-br ${t.theme} border shadow-2xs space-y-3 flex flex-col justify-between  transition duration-200`}
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between pb-2 border-b border-black/5 dark:border-white/10">
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-black text-sm">4.{idx + 1}</span>
                            <WebIcon name={t.icon} className="w-4 h-4 shrink-0" />
                            <h4 className="font-black text-xs sm:text-sm tracking-wide" style={{ color: 'inherit' }}>
                              {obj.title}
                            </h4>
                          </div>
                          <span className="text-[9.5px] font-mono font-bold opacity-80">
                            {t.badge}
                          </span>
                        </div>

                        <ul className="space-y-2">
                          {obj.items.map((sub, sIdx) => (
                            <li
                              key={sIdx}
                              className="text-xs text-slate-700 dark:text-slate-200 leading-relaxed font-medium flex items-start gap-2"
                            >
                              <WebIcon name="check" className="w-3.5 h-3.5 shrink-0 mt-0.5 opacity-80" />
                              <span>{sub}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="pt-2 border-t border-black/5 dark:border-white/10 text-[10px] font-mono font-bold text-slate-500 dark:text-slate-400 text-right">
                        Mục tiêu 0{idx + 1} / {spec.objectives.length}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Footer Card Mục Tiêu Chiến Lược */}
            <div className={`relative z-10 shrink-0 pt-2.5 border-t flex items-center justify-between text-xs mt-auto ${
              isLightMode ? 'border-slate-300/70 text-slate-600' : 'border-white/20 text-white/80'
            }`}>
              <span className="flex items-center gap-1.5 font-semibold">
                <WebIcon name="target" className="w-3.5 h-3.5 text-teal-500" />
                <span>3 Nhóm mục tiêu phát triển bền vững</span>
              </span>
              <button
                type="button"
                onClick={() => scrollToSection('sec-scope')}
                className="font-bold hover:underline flex items-center gap-1 text-teal-600 dark:text-teal-400 cursor-pointer"
              >
                <span>Xem tiếp: Hạng mục triển khai</span>
                <span>↓</span>
              </button>
            </div>
          </section>

          {/* SECTION 04: HẠNG MỤC TRIỂN KHAI */}
          <section
            id="sec-scope"
            data-section-card="true"
            style={{ background: getStackGradient(4) }}
            className={`u223-c relative overflow-hidden w-full h-[620px] sm:h-[660px] lg:h-[calc(100vh-210px)] min-h-[560px] max-h-[760px] p-5 sm:p-6 rounded-[14px] flex flex-col justify-between shrink-0 backdrop-blur-2xl transition-all duration-300 ${
              isLightMode
                ? 'border border-slate-300/80 shadow-[0_14px_36px_rgba(30,27,75,0.08)]'
                : 'border border-white/20 dark:border-white/10 shadow-[0_16px_40px_rgba(124,58,237,0.25)]'
            }`}
          >
            <span className="u223-art pointer-events-none select-none" aria-hidden="true" />
            
            {/* Header Card */}
            <div
              className={`relative z-10 shrink-0 flex items-center justify-between pb-2.5 border-b ${
                isLightMode ? 'border-slate-300/70' : 'border-white/20'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span className="font-mono font-black text-base sm:text-lg text-purple-600 dark:text-purple-400">
                  5
                </span>
                <WebIcon name="clipboard" className="w-5 h-5 text-purple-600 dark:text-purple-400 shrink-0" />
                <h3 className="font-black text-sm sm:text-base font-play tracking-wide text-purple-600 dark:text-purple-400">
                  Hạng mục triển khai
                </h3>
              </div>
              <span
                className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full backdrop-blur-md ${
                  isLightMode
                    ? 'bg-white/90 text-slate-700 border border-slate-200 shadow-xs'
                    : 'bg-white/20 text-white border border-white/30'
                }`}
              >
                7 Hạng Mục Trọng Tâm
              </span>
            </div>

            {/* Body Card Cuộn Mượt Mà */}
            <div className="relative z-10 flex-1 min-h-0 overflow-y-auto glass-scrollbar pr-1.5 py-2.5 space-y-3.5 text-left">
              {/* Work Items (Distinct Pastel/Dark Backgrounds, Equal Height, Unframed Icons, 4-word Titles) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 items-stretch">
                {spec.scopeItems.map((scopeItem, idx) => {
                  const palette = SCOPE_PALETTES[idx % SCOPE_PALETTES.length];
                  return (
                    <div
                      key={idx}
                      className={`h-full p-4 rounded-xl bg-gradient-to-br ${palette.theme} border shadow-2xs space-y-3 flex flex-col justify-between  transition duration-200 ${
                        idx === spec.scopeItems.length - 1 && spec.scopeItems.length % 2 !== 0 ? 'md:col-span-2' : ''
                      }`}
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between pb-2 border-b border-black/5 dark:border-white/10 flex-wrap gap-2">
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-black text-sm">5.{idx + 1}</span>
                            <WebIcon name={palette.icon} className="w-4 h-4 shrink-0" />
                            <h4 className="font-black text-xs sm:text-sm tracking-wide" style={{ color: 'inherit' }}>
                              {scopeItem.title || scopeItem.code}
                            </h4>
                          </div>
                          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-white/60 dark:bg-slate-900/60 border border-black/10 dark:border-white/10">
                            {scopeItem.code}
                          </span>
                        </div>

                        <p className="text-xs text-slate-700 dark:text-slate-200 font-semibold leading-relaxed">
                          {scopeItem.intro}
                        </p>

                        <div className="space-y-1.5 bg-white/70 dark:bg-slate-900/60 p-3 rounded-xl border border-black/5 dark:border-white/10">
                          <p className="text-[10.5px] font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                            <WebIcon name="list" className="w-3 h-3 opacity-80" />
                            <span>Nhiệm vụ triển khai trọng tâm:</span>
                          </p>
                          <ul className="grid grid-cols-1 gap-1.5 pt-1">
                            {scopeItem.tasks.map((task, tIdx) => (
                              <li
                                key={tIdx}
                                className="text-xs text-slate-700 dark:text-slate-200 leading-relaxed font-medium flex items-start gap-2"
                              >
                                <WebIcon name="check" className="w-3.5 h-3.5 shrink-0 mt-0.5 opacity-80" />
                                <span>{task}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {scopeItem.note && (
                          <p className="text-xs italic text-slate-600 dark:text-slate-300 bg-white/50 dark:bg-slate-900/40 p-2.5 rounded-lg border border-black/5 dark:border-white/5">
                            💡 {scopeItem.note}
                          </p>
                        )}
                      </div>

                      {/* Highlighted Deliverable Pill */}
                      <div className="p-2.5 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-black/10 dark:border-white/10 flex items-start gap-2 text-xs mt-auto">
                        <WebIcon name="award" className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                        <div>
                          <strong className="font-bold text-emerald-800 dark:text-emerald-300 mr-1.5">
                            Kết quả đầu ra:
                          </strong>
                          <span className="font-medium text-slate-800 dark:text-slate-100">{scopeItem.deliverable}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Footer Card Hạng Mục Triển Khai */}
            <div className={`relative z-10 shrink-0 pt-2.5 border-t flex items-center justify-between text-xs mt-auto ${
              isLightMode ? 'border-slate-300/70 text-slate-600' : 'border-white/20 text-white/80'
            }`}>
              <span className="flex items-center gap-1.5 font-semibold">
                <WebIcon name="clipboard" className="w-3.5 h-3.5 text-purple-500" />
                <span>7 Hạng mục công việc khép kín chuẩn SOP</span>
              </span>
              <button
                type="button"
                onClick={() => scrollToSection('sec-methodology')}
                className="font-bold hover:underline flex items-center gap-1 text-purple-600 dark:text-purple-400 cursor-pointer"
              >
                <span>Xem tiếp: Lộ trình vận hành</span>
                <span>↓</span>
              </button>
            </div>
          </section>

          {/* SECTION 05: LỘ TRÌNH VẬN HÀNH */}
          <section
            id="sec-methodology"
            data-section-card="true"
            style={{ background: getStackGradient(5) }}
            className={`u223-c relative overflow-hidden w-full h-[620px] sm:h-[660px] lg:h-[calc(100vh-210px)] min-h-[560px] max-h-[760px] p-5 sm:p-6 rounded-[14px] flex flex-col justify-between shrink-0 backdrop-blur-2xl transition-all duration-300 ${
              isLightMode
                ? 'border border-slate-300/80 shadow-[0_14px_36px_rgba(30,27,75,0.08)]'
                : 'border border-white/20 dark:border-white/10 shadow-[0_14px_36px_rgba(6,182,212,0.25)]'
            }`}
          >
            <span className="u223-art pointer-events-none select-none" aria-hidden="true" />
            
            {/* Header Card */}
            <div
              className={`relative z-10 shrink-0 flex items-center justify-between pb-2.5 border-b ${
                isLightMode ? 'border-slate-300/70' : 'border-white/20'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span className="font-mono font-black text-base sm:text-lg text-cyan-600 dark:text-cyan-400">
                  6
                </span>
                <WebIcon name="workflow" className="w-5 h-5 text-cyan-600 dark:text-cyan-400 shrink-0" />
                <h3 className="font-black text-sm sm:text-base font-play tracking-wide text-cyan-600 dark:text-cyan-400">
                  Lộ trình vận hành
                </h3>
              </div>
              <span
                className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full backdrop-blur-md ${
                  isLightMode
                    ? 'bg-white/90 text-slate-700 border border-slate-200 shadow-xs'
                    : 'bg-white/20 text-white border border-white/30'
                }`}
              >
                5 Giai Đoạn Lộ Trình
              </span>
            </div>

            {/* Body Card Cuộn Mượt Mà */}
            <div className="relative z-10 flex-1 min-h-0 overflow-y-auto glass-scrollbar pr-1.5 py-2.5 space-y-3.5 text-left">
              <div className="p-4 rounded-xl bg-white/95 dark:bg-slate-900/95 border border-white/20 dark:border-white/10 text-xs sm:text-[13px] text-slate-800 dark:text-slate-100 font-semibold leading-relaxed shadow-xs">
                {spec.methodology.intro}
              </div>

              {/* Process Timeline (Distinct Colorful Backgrounds & Equal Height) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 items-stretch">
                {spec.methodology.phases.map((ph, idx) => {
                  const phasePalettes = [
                    { theme: 'from-blue-50/90 to-blue-100/40 dark:from-blue-950/40 dark:to-slate-800/80 border-blue-200/90 dark:border-blue-500/30 text-blue-600 dark:text-blue-400', icon: 'search' },
                    { theme: 'from-indigo-50/90 to-indigo-100/40 dark:from-indigo-950/40 dark:to-slate-800/80 border-indigo-200/90 dark:border-indigo-500/30 text-indigo-600 dark:text-indigo-400', icon: 'workflow' },
                    { theme: 'from-cyan-50/90 to-cyan-100/40 dark:from-cyan-950/40 dark:to-slate-800/80 border-cyan-200/90 dark:border-cyan-500/30 text-cyan-600 dark:text-cyan-400', icon: 'shield-check' },
                    { theme: 'from-emerald-50/90 to-emerald-100/40 dark:from-emerald-950/40 dark:to-slate-800/80 border-emerald-200/90 dark:border-emerald-500/30 text-emerald-600 dark:text-emerald-400', icon: 'chart' },
                    { theme: 'from-purple-50/90 to-purple-100/40 dark:from-purple-950/40 dark:to-slate-800/80 border-purple-200/90 dark:border-purple-500/30 text-purple-600 dark:text-purple-400', icon: 'trending-up' },
                  ];
                  const p = phasePalettes[idx % phasePalettes.length];
                  return (
                    <div
                      key={idx}
                      className={`h-full p-3.5 rounded-xl bg-gradient-to-br ${p.theme} border shadow-2xs space-y-2 flex flex-col justify-between  transition duration-200`}
                    >
                      <div className="space-y-2">
                        <div className="flex items-center gap-1.5 pb-1.5 border-b border-black/5 dark:border-white/10">
                          <span className="font-mono font-black text-xs sm:text-sm">6.{idx + 1}</span>
                          <WebIcon name={p.icon} className="w-4 h-4 shrink-0" />
                          <h5 className="font-black text-xs tracking-wide leading-tight" style={{ color: 'inherit' }}>
                            {ph.title}
                          </h5>
                        </div>
                        <p className="text-[11.5px] text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                          {ph.desc}
                        </p>
                      </div>

                      <div className="pt-2 border-t border-black/5 dark:border-white/5 flex items-center justify-between text-[10px] font-mono font-bold opacity-80 mt-auto">
                        <span>{ph.stage}</span>
                        <span>Phase {idx + 1}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {spec.methodology.outro && (
                <div className="p-3.5 rounded-xl bg-white/90 dark:bg-slate-900/90 border border-white/20 dark:border-white/10 flex items-center gap-2">
                  <WebIcon name="target" className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0" />
                  <p className="text-xs italic text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                    {spec.methodology.outro}
                  </p>
                </div>
              )}
            </div>

            {/* Footer Card Lộ Trình Vận Hành */}
            <div className={`relative z-10 shrink-0 pt-2.5 border-t flex items-center justify-between text-xs mt-auto ${
              isLightMode ? 'border-slate-300/70 text-slate-600' : 'border-white/20 text-white/80'
            }`}>
              <span className="flex items-center gap-1.5 font-semibold">
                <WebIcon name="workflow" className="w-3.5 h-3.5 text-cyan-500" />
                <span>5 Giai đoạn kiểm soát chất lượng & bàn giao</span>
              </span>
              <button
                type="button"
                onClick={() => scrollToSection('sec-metrics')}
                className="font-bold hover:underline flex items-center gap-1 text-cyan-600 dark:text-cyan-400 cursor-pointer"
              >
                <span>Xem tiếp: Chỉ số hiệu quả</span>
                <span>↓</span>
              </button>
            </div>
          </section>

          {/* SECTION 06: CHỈ SỐ HIỆU QUẢ */}
          <section
            id="sec-metrics"
            data-section-card="true"
            style={{ background: getStackGradient(6) }}
            className={`u223-c relative overflow-hidden w-full h-[620px] sm:h-[660px] lg:h-[calc(100vh-210px)] min-h-[560px] max-h-[760px] p-5 sm:p-6 rounded-[14px] flex flex-col justify-between shrink-0 backdrop-blur-2xl transition-all duration-300 ${
              isLightMode
                ? 'border border-slate-300/80 shadow-[0_14px_36px_rgba(30,27,75,0.08)]'
                : 'border border-white/20 dark:border-white/10 shadow-[0_16px_40px_rgba(5,150,105,0.25)]'
            }`}
          >
            <span className="u223-art pointer-events-none select-none" aria-hidden="true" />
            
            {/* Header Card */}
            <div
              className={`relative z-10 shrink-0 flex items-center justify-between pb-2.5 border-b ${
                isLightMode ? 'border-slate-300/70' : 'border-white/20'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span className="font-mono font-black text-base sm:text-lg text-emerald-600 dark:text-emerald-400">
                  7
                </span>
                <WebIcon name="chart" className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <h3 className="font-black text-sm sm:text-base font-play tracking-wide text-emerald-600 dark:text-emerald-400">
                  Chỉ số hiệu quả
                </h3>
              </div>
              <span
                className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full backdrop-blur-md ${
                  isLightMode
                    ? 'bg-white/90 text-slate-700 border border-slate-200 shadow-xs'
                    : 'bg-white/20 text-white border border-white/30'
                }`}
              >
                KPI và SLA Framework
              </span>
            </div>

            {/* Body Card Cuộn Mượt Mà */}
            <div className="relative z-10 flex-1 min-h-0 overflow-y-auto glass-scrollbar pr-1.5 py-2.5 space-y-3.5 text-left">
              <div className="p-4 rounded-xl bg-white/95 dark:bg-slate-900/95 border border-white/20 dark:border-white/10 text-xs sm:text-[13px] text-slate-800 dark:text-slate-100 font-semibold leading-relaxed shadow-xs">
                {spec.metrics.intro}
              </div>

              {/* KPI Categories Grid Cards (Equal Height, Distinct Colorful Gradients, Unframed Icons) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 items-stretch">
                {spec.metrics.table.map((m, idx) => {
                  const metricPalettes = [
                    { theme: 'from-sky-50/90 to-sky-100/40 dark:from-sky-950/40 dark:to-slate-800/80 border-sky-200/90 dark:border-sky-500/30 text-sky-600 dark:text-sky-400', icon: 'phone' },
                    { theme: 'from-emerald-50/90 to-emerald-100/40 dark:from-emerald-950/40 dark:to-slate-800/80 border-emerald-200/90 dark:border-emerald-500/30 text-emerald-600 dark:text-emerald-400', icon: 'clock' },
                    { theme: 'from-purple-50/90 to-purple-100/40 dark:from-purple-950/40 dark:to-slate-800/80 border-purple-200/90 dark:border-purple-500/30 text-purple-600 dark:text-purple-400', icon: 'award' },
                    { theme: 'from-amber-50/90 to-amber-100/40 dark:from-amber-950/40 dark:to-slate-800/80 border-amber-200/90 dark:border-amber-500/30 text-amber-600 dark:text-amber-400', icon: 'target' },
                    { theme: 'from-rose-50/90 to-rose-100/40 dark:from-rose-950/40 dark:to-slate-800/80 border-rose-200/90 dark:border-rose-500/30 text-rose-600 dark:text-rose-400', icon: 'alert' },
                    { theme: 'from-cyan-50/90 to-cyan-100/40 dark:from-cyan-950/40 dark:to-slate-800/80 border-cyan-200/90 dark:border-cyan-500/30 text-cyan-600 dark:text-cyan-400', icon: 'users' },
                    { theme: 'from-indigo-50/90 to-indigo-100/40 dark:from-indigo-950/40 dark:to-slate-800/80 border-indigo-200/90 dark:border-indigo-500/30 text-indigo-600 dark:text-indigo-400', icon: 'shield-check' },
                  ];
                  const p = metricPalettes[idx % metricPalettes.length];
                  return (
                    <div
                      key={idx}
                      className={`h-full p-3.5 rounded-xl bg-gradient-to-br ${p.theme} border shadow-2xs space-y-2.5 flex flex-col justify-between  transition duration-200 ${
                        idx === spec.metrics.table.length - 1 && spec.metrics.table.length % 2 !== 0 ? 'sm:col-span-2 lg:col-span-2 xl:col-span-1' : ''
                      }`}
                    >
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 pb-1.5 border-b border-black/5 dark:border-white/10">
                          <span className="font-mono font-black text-xs sm:text-sm">7.{idx + 1}</span>
                          <WebIcon name={p.icon} className="w-4 h-4 shrink-0" />
                          <h5 className="font-black text-xs tracking-wide leading-tight" style={{ color: 'inherit' }}>
                            {m.category}
                          </h5>
                        </div>

                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {m.indicators.split(/[,;·]/).filter(Boolean).map((ind, iIdx) => (
                            <span
                              key={iIdx}
                              className="px-2 py-0.5 rounded-md bg-white/70 dark:bg-slate-900/60 border border-black/10 dark:border-white/10 text-slate-800 dark:text-slate-200 font-bold text-[11px]"
                            >
                              {ind.trim()}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="pt-2 border-t border-black/5 dark:border-white/5 text-[9.5px] font-mono font-bold opacity-80 flex items-center justify-between mt-auto">
                        <span>{m.category}</span>
                        <span>Nhóm 7.{idx + 1}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {spec.metrics.outro && (
                <div className="p-3.5 rounded-xl bg-white/90 dark:bg-slate-900/90 border border-white/20 dark:border-white/10 flex items-center gap-2">
                  <WebIcon name="chart" className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <p className="text-xs italic text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                    {spec.metrics.outro}
                  </p>
                </div>
              )}
            </div>

            {/* Footer Card Chỉ Số Hiệu Quả */}
            <div className={`relative z-10 shrink-0 pt-2.5 border-t flex items-center justify-between text-xs mt-auto ${
              isLightMode ? 'border-slate-300/70 text-slate-600' : 'border-white/20 text-white/80'
            }`}>
              <span className="flex items-center gap-1.5 font-semibold">
                <WebIcon name="chart" className="w-3.5 h-3.5 text-emerald-500" />
                <span>Hệ thống chỉ số KPI và SLA đa chiều</span>
              </span>
              <button
                type="button"
                onClick={() => scrollToSection('sec-roles')}
                className="font-bold hover:underline flex items-center gap-1 text-emerald-600 dark:text-emerald-400 cursor-pointer"
              >
                <span>Xem tiếp: Vai trò trách nhiệm</span>
                <span>↓</span>
              </button>
            </div>
          </section>

          {/* SECTION 07: VAI TRÒ TRÁCH NHIỆM */}
          <section
            id="sec-roles"
            data-section-card="true"
            style={{ background: getStackGradient(7) }}
            className={`u223-c relative overflow-hidden w-full h-[620px] sm:h-[660px] lg:h-[calc(100vh-210px)] min-h-[560px] max-h-[760px] p-5 sm:p-6 rounded-[14px] flex flex-col justify-between shrink-0 backdrop-blur-2xl transition-all duration-300 ${
              isLightMode
                ? 'border border-slate-300/80 shadow-[0_16px_40px_rgba(30,27,75,0.08)]'
                : 'border border-white/20 dark:border-white/10 shadow-[0_16px_40px_rgba(225,29,72,0.25)]'
            }`}
          >
            <span className="u223-art pointer-events-none select-none" aria-hidden="true" />
            
            {/* Header Card */}
            <div
              className={`relative z-10 shrink-0 flex items-center justify-between pb-2.5 border-b ${
                isLightMode ? 'border-slate-300/70' : 'border-white/20'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span className="font-mono font-black text-base sm:text-lg text-rose-600 dark:text-rose-400">
                  8
                </span>
                <WebIcon name="users" className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0" />
                <h3 className="font-black text-sm sm:text-base font-play tracking-wide text-rose-600 dark:text-rose-400">
                  Vai trò trách nhiệm
                </h3>
              </div>
              <span
                className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full backdrop-blur-md ${
                  isLightMode
                    ? 'bg-white/90 text-slate-700 border border-slate-200 shadow-xs'
                    : 'bg-white/20 text-white border border-white/30'
                }`}
              >
                PM Leadership & Governance
              </span>
            </div>

            {/* Body Card Cuộn Mượt Mà */}
            <div className="relative z-10 flex-1 min-h-0 overflow-y-auto glass-scrollbar pr-1.5 py-2.5 space-y-3.5 text-left">
              <div className="p-4 rounded-xl bg-white/95 dark:bg-slate-900/95 border border-white/20 dark:border-white/10 text-xs sm:text-[13px] text-slate-800 dark:text-slate-100 font-semibold leading-relaxed shadow-xs">
                {spec.pmRoles.intro}
              </div>

              {/* Leadership Roles (Equal Height, Distinct Colorful Gradients, Unframed Icons) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 items-stretch">
                {spec.pmRoles.items.map((r, idx) => {
                  const rolePalettes = [
                    { theme: 'from-sky-50/90 to-sky-100/40 dark:from-sky-950/40 dark:to-slate-800/80 border-sky-200/90 dark:border-sky-500/30 text-sky-600 dark:text-sky-400', icon: 'compass' },
                    { theme: 'from-indigo-50/90 to-indigo-100/40 dark:from-indigo-950/40 dark:to-slate-800/80 border-indigo-200/90 dark:border-indigo-500/30 text-indigo-600 dark:text-indigo-400', icon: 'users' },
                    { theme: 'from-purple-50/90 to-purple-100/40 dark:from-purple-950/40 dark:to-slate-800/80 border-purple-200/90 dark:border-purple-500/30 text-purple-600 dark:text-purple-400', icon: 'sliders' },
                    { theme: 'from-cyan-50/90 to-cyan-100/40 dark:from-cyan-950/40 dark:to-slate-800/80 border-cyan-200/90 dark:border-cyan-500/30 text-cyan-600 dark:text-cyan-400', icon: 'network' },
                    { theme: 'from-amber-50/90 to-amber-100/40 dark:from-amber-950/40 dark:to-slate-800/80 border-amber-200/90 dark:border-amber-500/30 text-amber-600 dark:text-amber-400', icon: 'trending-up' },
                    { theme: 'from-emerald-50/90 to-emerald-100/40 dark:from-emerald-950/40 dark:to-slate-800/80 border-emerald-200/90 dark:border-emerald-500/30 text-emerald-600 dark:text-emerald-400', icon: 'workflow' },
                    { theme: 'from-rose-50/90 to-rose-100/40 dark:from-rose-950/40 dark:to-slate-800/80 border-rose-200/90 dark:border-rose-500/30 text-rose-600 dark:text-rose-400', icon: 'shield-check' },
                  ];
                  const p = rolePalettes[idx % rolePalettes.length];
                  return (
                    <div
                      key={idx}
                      className={`h-full p-3.5 rounded-xl bg-gradient-to-br ${p.theme} border shadow-2xs space-y-2 flex flex-col justify-between  transition duration-200 ${
                        idx === spec.pmRoles.items.length - 1 && spec.pmRoles.items.length % 2 !== 0 ? 'sm:col-span-2 lg:col-span-1' : ''
                      }`}
                    >
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2 pb-1.5 border-b border-black/5 dark:border-white/10">
                          <span className="font-mono font-black text-xs sm:text-sm">8.{idx + 1}</span>
                          <WebIcon name={p.icon} className="w-4 h-4 shrink-0" />
                          <h5 className="font-black text-xs tracking-wide leading-tight" style={{ color: 'inherit' }}>
                            {r.role}
                          </h5>
                        </div>
                        <p className="text-[11.5px] text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                          {r.desc}
                        </p>
                      </div>

                      <div className="pt-2 border-t border-black/5 dark:border-white/5 flex items-center justify-between text-[10px] font-mono font-bold opacity-80 mt-auto">
                        <span>{r.role}</span>
                        <span>Vai trò 8.{idx + 1}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Footer Card Vai Trò Trách Nhiệm */}
            <div className={`relative z-10 shrink-0 pt-2.5 border-t flex items-center justify-between text-xs mt-auto ${
              isLightMode ? 'border-slate-300/70 text-slate-600' : 'border-white/20 text-white/80'
            }`}>
              <span className="flex items-center gap-1.5 font-semibold">
                <WebIcon name="users" className="w-3.5 h-3.5 text-rose-500" />
                <span>Phân nhiệm vai trò RACI và quản trị đồng bộ</span>
              </span>
              <button
                type="button"
                onClick={() => scrollToSection('sec-outcomes')}
                className="font-bold hover:underline flex items-center gap-1 text-rose-600 dark:text-rose-400 cursor-pointer"
              >
                <span>Xem tiếp: Kết quả đạt được</span>
                <span>↓</span>
              </button>
            </div>
          </section>

          {/* SECTION 08: KẾT QUẢ ĐẠT ĐƯỢC */}
          <section
            id="sec-outcomes"
            data-section-card="true"
            style={{ background: getStackGradient(7) }}
            className={`u223-c relative overflow-hidden w-full h-[620px] sm:h-[660px] lg:h-[calc(100vh-210px)] min-h-[560px] max-h-[760px] p-5 sm:p-6 rounded-[14px] flex flex-col justify-between shrink-0 backdrop-blur-2xl transition-all duration-300 ${
              isLightMode
                ? 'border border-slate-300/80 shadow-[0_16px_40px_rgba(30,27,75,0.08)]'
                : 'border border-white/20 dark:border-white/10 shadow-[0_16px_40px_rgba(13,148,136,0.25)]'
            }`}
          >
            <span className="u223-art pointer-events-none select-none" aria-hidden="true" />
            
            {/* Header Card */}
            <div
              className={`relative z-10 shrink-0 flex items-center justify-between pb-2.5 border-b ${
                isLightMode ? 'border-slate-300/70' : 'border-white/20'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span className="font-mono font-black text-base sm:text-lg text-teal-600 dark:text-teal-400">
                  9
                </span>
                <WebIcon name="award" className="w-5 h-5 text-teal-600 dark:text-teal-400 shrink-0" />
                <h3 className="font-black text-sm sm:text-base font-play tracking-wide text-teal-600 dark:text-teal-400">
                  Kết quả đạt được
                </h3>
              </div>
              <span
                className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full backdrop-blur-md ${
                  isLightMode
                    ? 'bg-white/90 text-slate-700 border border-slate-200 shadow-xs'
                    : 'bg-white/20 text-white border border-white/30'
                }`}
              >
                6 Khía Cạnh Giá Trị
              </span>
            </div>

            {/* Body Card Cuộn Mượt Mà */}
            <div className="relative z-10 flex-1 min-h-0 overflow-y-auto glass-scrollbar pr-1.5 py-2.5 space-y-3.5 text-left">
              <div className="p-4 rounded-xl bg-white/95 dark:bg-slate-900/95 border border-white/20 dark:border-white/10 text-xs sm:text-[13px] text-slate-800 dark:text-slate-100 font-semibold leading-relaxed shadow-xs">
                {spec.expectedOutcomes.intro}
              </div>

              {/* Value Outcomes (Equal Height, Distinct Colorful Gradients, Unframed Icons) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 items-stretch">
                {spec.expectedOutcomes.items.map((item, idx) => {
                  const outcomePalettes = [
                    { theme: 'from-indigo-50/90 to-indigo-100/40 dark:from-indigo-950/40 dark:to-slate-800/80 border-indigo-200/90 dark:border-indigo-500/30 text-indigo-600 dark:text-indigo-400', icon: 'building' },
                    { theme: 'from-emerald-50/90 to-emerald-100/40 dark:from-emerald-950/40 dark:to-slate-800/80 border-emerald-200/90 dark:border-emerald-500/30 text-emerald-600 dark:text-emerald-400', icon: 'workflow' },
                    { theme: 'from-purple-50/90 to-purple-100/40 dark:from-purple-950/40 dark:to-slate-800/80 border-purple-200/90 dark:border-purple-500/30 text-purple-600 dark:text-purple-400', icon: 'award' },
                    { theme: 'from-sky-50/90 to-sky-100/40 dark:from-sky-950/40 dark:to-slate-800/80 border-sky-200/90 dark:border-sky-500/30 text-sky-600 dark:text-sky-400', icon: 'database' },
                    { theme: 'from-rose-50/90 to-rose-100/40 dark:from-rose-950/40 dark:to-slate-800/80 border-rose-200/90 dark:border-rose-500/30 text-rose-600 dark:text-rose-400', icon: 'heart' },
                    { theme: 'from-amber-50/90 to-amber-100/40 dark:from-amber-950/40 dark:to-slate-800/80 border-amber-200/90 dark:border-amber-500/30 text-amber-600 dark:text-amber-400', icon: 'trending-up' },
                  ];
                  const p = outcomePalettes[idx % outcomePalettes.length];
                  return (
                    <div
                      key={idx}
                      className={`h-full p-4 rounded-xl bg-gradient-to-br ${p.theme} border shadow-2xs space-y-2 flex flex-col justify-between  transition duration-200`}
                    >
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2 pb-1.5 border-b border-black/5 dark:border-white/10">
                          <span className="font-mono font-black text-xs sm:text-sm">9.{idx + 1}</span>
                          <WebIcon name={p.icon} className="w-4 h-4 shrink-0" />
                          <h5 className="font-black text-xs tracking-wide leading-tight" style={{ color: 'inherit' }}>
                            {item.dimension}
                          </h5>
                        </div>
                        <p className="text-[11.5px] text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                          {item.desc}
                        </p>
                      </div>
                      <div className="pt-2 border-t border-black/5 dark:border-white/5 flex items-center justify-between text-[9.5px] font-mono font-bold opacity-80 mt-auto">
                        <span>Giá trị 0{idx + 1}</span>
                        <span>Đã nghiệm thu ✓</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {spec.expectedOutcomes.outro && (
                <div className="p-3.5 rounded-xl bg-white/90 dark:bg-slate-900/90 border border-white/20 dark:border-white/10 flex items-center gap-2">
                  <WebIcon name="award" className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0" />
                  <p className="text-xs italic text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                    {spec.expectedOutcomes.outro}
                  </p>
                </div>
              )}
            </div>

            {/* Footer Card Kết Quả Đạt Được */}
            <div className={`relative z-10 shrink-0 pt-2.5 border-t flex items-center justify-between text-xs mt-auto ${
              isLightMode ? 'border-slate-300/70 text-slate-600' : 'border-white/20 text-white/80'
            }`}>
              <span className="flex items-center gap-1.5 font-semibold">
                <WebIcon name="award" className="w-3.5 h-3.5 text-teal-500" />
                <span>6 Khía cạnh giá trị thực chiến đã nghiệm thu</span>
              </span>
              <button
                type="button"
                onClick={() => scrollToSection('sec-philosophy')}
                className="font-bold hover:underline flex items-center gap-1 text-teal-600 dark:text-teal-400 cursor-pointer"
              >
                <span>Xem tiếp: Triết lý quản trị</span>
                <span>↓</span>
              </button>
            </div>
          </section>

          {/* SECTION 09: TRIẾT LÝ QUẢN TRỊ */}
          <section
            id="sec-philosophy"
            data-section-card="true"
            style={{ background: getStackGradient(8) }}
            className={`u223-c relative overflow-hidden w-full h-[620px] sm:h-[660px] lg:h-[calc(100vh-210px)] min-h-[560px] max-h-[760px] p-5 sm:p-6 rounded-[14px] flex flex-col justify-between shrink-0 backdrop-blur-2xl transition-all duration-300 ${
              isLightMode
                ? 'border border-slate-300/80 shadow-[0_20px_48px_rgba(30,27,75,0.08)]'
                : 'border border-white/20 dark:border-white/10 shadow-[0_20px_48px_rgba(109,40,217,0.25)]'
            }`}
          >
            <span className="u223-art pointer-events-none select-none" aria-hidden="true" />
            
            {/* Header Card */}
            <div
              className={`relative z-10 shrink-0 flex items-center justify-between pb-2.5 border-b ${
                isLightMode ? 'border-slate-300/70' : 'border-white/20'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span className="font-mono font-black text-base sm:text-lg text-violet-600 dark:text-violet-400">
                  10
                </span>
                <WebIcon name="sparkles" className="w-5 h-5 text-violet-600 dark:text-violet-400 shrink-0" />
                <h3 className="font-black text-sm sm:text-base font-play tracking-wide text-violet-600 dark:text-violet-400">
                  Triết lý quản trị
                </h3>
              </div>
              <span
                className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full backdrop-blur-md ${
                  isLightMode
                    ? 'bg-white/90 text-slate-700 border border-slate-200 shadow-xs'
                    : 'bg-white/20 text-white border border-white/30'
                }`}
              >
                Core Leadership Mindset
              </span>
            </div>

            {/* Body Card Cuộn Mượt Mà */}
            <div className="relative z-10 flex-1 min-h-0 overflow-y-auto glass-scrollbar pr-1.5 py-2.5 space-y-3.5 text-left">
              <div className="p-4 rounded-xl bg-white/95 dark:bg-slate-900/95 border border-white/20 dark:border-white/10 space-y-2.5 shadow-xs">
                {spec.philosophy.paragraphs.map((p, idx) => (
                  <p key={idx} className="text-xs sm:text-[13px] text-slate-800 dark:text-slate-100 leading-relaxed font-medium">
                    {p}
                  </p>
                ))}
              </div>

              {/* 3 Philosophy Pillars (Equal Height, Distinct Colorful Gradients, Unframed Icons, 4-word Titles) */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 items-stretch">
                {[
                  {
                    num: '10.1',
                    icon: 'cpu',
                    fourWord: 'Công nghệ tốc độ',
                    desc: 'Công nghệ và hệ thống tự động giúp tăng tốc độ phục vụ, tối ưu nguồn lực và kết nối thông suốt đa kênh.',
                    theme: 'from-sky-50/90 to-sky-100/40 dark:from-sky-950/40 dark:to-slate-800/80 border-sky-200/90 dark:border-sky-500/30 text-sky-600 dark:text-sky-400',
                  },
                  {
                    num: '10.2',
                    icon: 'workflow',
                    fourWord: 'Quy trình nhất quán',
                    desc: 'Chuẩn hóa quy trình SOP và tiêu chuẩn dịch vụ tạo ra chất lượng đồng nhất, hạn chế tối đa rủi ro và sai sót.',
                    theme: 'from-emerald-50/90 to-emerald-100/40 dark:from-emerald-950/40 dark:to-slate-800/80 border-emerald-200/90 dark:border-emerald-500/30 text-emerald-600 dark:text-emerald-400',
                  },
                  {
                    num: '10.3',
                    icon: 'heart',
                    fourWord: 'Con người trọng tâm',
                    desc: 'Chính con người, văn hóa đồng cảm và sự tận tâm mới quyết định sự gắn kết trung thành dài lâu của khách hàng.',
                    theme: 'from-rose-50/90 to-rose-100/40 dark:from-rose-950/40 dark:to-slate-800/80 border-rose-200/90 dark:border-rose-500/30 text-rose-600 dark:text-rose-400',
                  },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className={`h-full p-4 rounded-xl bg-gradient-to-br ${item.theme} border shadow-2xs space-y-2 flex flex-col justify-between  transition duration-200`}
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2 pb-1.5 border-b border-black/5 dark:border-white/10">
                        <span className="font-mono font-black text-xs sm:text-sm">{item.num}</span>
                        <WebIcon name={item.icon} className="w-4 h-4 shrink-0" />
                        <h5 className="font-black text-xs tracking-wide leading-tight" style={{ color: 'inherit' }}>
                          {item.fourWord}
                        </h5>
                      </div>
                      <p className="text-[11.5px] text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                        {item.desc}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-black/5 dark:border-white/5 text-[9.5px] font-mono font-bold opacity-80 text-right mt-auto">
                      Trụ cột 0{idx + 1}
                    </div>
                  </div>
                ))}
              </div>

              {/* Golden Core Message Box */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-violet-500/10 via-purple-500/15 to-indigo-500/10 border-2 border-purple-400/60 space-y-2 shadow-xs">
                <span className="text-[11px] font-mono font-black uppercase tracking-wider text-purple-800 dark:text-purple-300 flex items-center gap-1.5">
                  <WebIcon name="sparkles" className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                  <span>Thông điệp cốt lõi từ lãnh đạo dự án:</span>
                </span>
                <p className="text-xs sm:text-base font-black text-slate-900 dark:text-white italic leading-relaxed">
                  “{spec.philosophy.coreMessage}”
                </p>
                <div className="text-right text-xs font-bold text-purple-700 dark:text-purple-300">
                  — {selectedArticle.role}
                </div>
              </div>
            </div>

            {/* Footer Card Triết Lý Quản Trị */}
            <div className={`relative z-10 shrink-0 pt-2.5 border-t flex items-center justify-between text-xs mt-auto ${
              isLightMode ? 'border-slate-300/70 text-slate-600' : 'border-white/20 text-white/80'
            }`}>
              <span className="flex items-center gap-1.5 font-semibold">
                <WebIcon name="sparkles" className="w-3.5 h-3.5 text-violet-500" />
                <span>3 Trụ cột cốt lõi: Công nghệ · Quy trình · Con người</span>
              </span>
              <button
                type="button"
                onClick={() => scrollToSection('sec-overview')}
                className="font-bold hover:underline flex items-center gap-1 text-violet-600 dark:text-violet-400 cursor-pointer"
              >
                <span>Về đầu bài viết</span>
                <span>↑</span>
              </button>
            </div>
          </section>
        </>
      )}

      {/* FOOTER ACTIONS: NAVIGATION & BACK TO TOP */}
      <div className="w-full pt-4 border-t border-slate-200/80 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          {prevProject ? (
            <button
              type="button"
              onClick={() => onSelectProject(prevProject)}
              className="px-3.5 py-2 rounded-xl bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-white/10 font-bold hover:bg-slate-50 dark:hover:bg-slate-750 transition flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <span>← Dự án trước: {prevProject.code}</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-2 rounded-xl bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-white/10 font-bold hover:bg-slate-50 dark:hover:bg-slate-750 transition flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <span>← Quay lại danh sách</span>
            </button>
          )}

          {nextProject && (
            <button
              type="button"
              onClick={() => onSelectProject(nextProject)}
              className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold hover:from-purple-700 hover:to-indigo-700 transition flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <span>Dự án tiếp theo: {nextProject.code} →</span>
            </button>
          )}
        </div>

        <button
          type="button"
          onClick={() => scrollToSection('sec-overview')}
          className="px-3 py-1.5 rounded-lg text-purple-700 dark:text-purple-300 hover:bg-purple-50 dark:hover:bg-purple-950/60 font-bold flex items-center gap-1 cursor-pointer transition"
        >
          <span>Lên đầu trang ↑</span>
        </button>
      </div>
      </div>

      {/* 2. KHỐI BANNER MỤC LỤC BÊN PHẢI (BANNER DỌC CĂN GIỮA HÌNH ẢNH, NỀN TRONG SUỐT RÕ NÉT, TIÊU ĐỀ KHÔNG ĐÓNG KHUNG) */}
      {spec && (
        <aside
          data-banner-aspect="sidebar"
          className="w-full lg:w-[230px] xl:w-[255px] shrink-0 h-auto lg:h-full flex flex-col pointer-events-auto"
        >
          <div className={`w-full h-full rounded-[14px] ${
            isLightMode
              ? 'bg-white/40 text-slate-800 border-white/60 shadow-[0_8px_32px_0_rgba(31,38,135,0.12)]'
              : 'bg-slate-950/60 text-white border-white/15 shadow-[0_8px_32px_0_rgba(0,0,0,0.5)]'
          } border backdrop-blur-md p-3 sm:p-3.5 flex flex-col justify-between overflow-hidden relative group`}>
            {/* HÌNH BANNER DỰ ÁN CĂN CHÍNH GIỮA (CENTER BANNER DỌC) VÀ NHÌN RÕ HÌNH NỀN BÊN DƯỚI */}
            {selectedArticle.image && (
              <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[inherit]">
                <img
                  src={selectedArticle.image}
                  alt={selectedArticle.title}
                  className="w-full h-full object-cover object-center pointer-events-none opacity-90 dark:opacity-85 group-hover:opacity-100 transition-all duration-700 scale-100 "
                />
              </div>
            )}

            {/* Lớp phủ chuyển sắc siêu trong suốt giúp nhìn rõ 100% hình ảnh nền banner bên dưới */}
            <div className={`absolute inset-0 ${
              isLightMode
                ? 'bg-gradient-to-b from-white/30 via-white/10 to-white/35'
                : 'bg-gradient-to-b from-slate-950/35 via-slate-950/15 to-slate-950/45'
            } backdrop-blur-[0.5px] pointer-events-none`} />

            {/* Ambient Specular Highlight */}
            <div className={`absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent ${
              isLightMode ? 'via-indigo-500/50' : 'via-cyan-400/80'
            } to-transparent pointer-events-none`} />

            {/* Header: TIÊU ĐỀ KHÔNG ĐÓNG KHUNG THẺ, ICON & TIÊU ĐỀ KÍCH THƯỚC BẰNG NHAU, ĐỒNG MÀU */}
            <div className={`relative z-10 flex items-center justify-between pb-2 border-b ${
              isLightMode ? 'border-slate-300/60' : 'border-white/20'
            } shrink-0`}>
              <div className="flex items-center gap-2 max-w-full">
                <span className="shrink-0 flex items-center justify-center" style={{ color: isLightMode ? '#4338ca' : '#38bdf8' }}>
                  <WebIcon name="layers" className="w-4 h-4 shrink-0" />
                </span>
                <h3
                  className="text-xs sm:text-sm font-black font-play tracking-wide truncate"
                  style={{ color: isLightMode ? '#4338ca' : '#38bdf8' }}
                >
                  Mục Lục Dự Án
                </h3>
              </div>
              <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border shrink-0 ${
                isLightMode
                  ? 'bg-indigo-600 text-white border-indigo-700 shadow-xs'
                  : 'bg-cyan-500 text-slate-950 border-cyan-300 font-black shadow-xs'
              }`}>
                {selectedArticle.code}
              </span>
            </div>

            {/* Danh sách 10 mục lục điều hướng - Thứ tự chuẩn: Số thứ tự & Icon & Tiêu đề */}
            <div className="relative z-10 flex-1 min-h-0 overflow-y-auto glass-scrollbar py-2 space-y-1.5 pr-0.5">
              {[
                { id: 'sec-mindmap', num: '1.', title: 'Sơ đồ tư duy', icon: 'brain', color: 'fuchsia' },
                { id: 'sec-overview', num: '2.', title: 'Tổng quan dự án', icon: 'layers', color: 'blue' },
                { id: 'sec-context', num: '3.', title: 'Bối cảnh thách thức', icon: 'alert', color: 'amber' },
                { id: 'sec-objectives', num: '4.', title: 'Mục tiêu chiến lược', icon: 'target', color: 'indigo' },
                { id: 'sec-scope', num: '5.', title: 'Hạng mục triển khai', icon: 'clipboard', color: 'purple' },
                { id: 'sec-methodology', num: '6.', title: 'Lộ trình vận hành', icon: 'workflow', color: 'cyan' },
                { id: 'sec-metrics', num: '7.', title: 'Chỉ số hiệu quả', icon: 'chart', color: 'emerald' },
                { id: 'sec-roles', num: '8.', title: 'Vai trò trách nhiệm', icon: 'users', color: 'rose' },
                { id: 'sec-outcomes', num: '9.', title: 'Kết quả đạt được', icon: 'award', color: 'teal' },
                { id: 'sec-philosophy', num: '10.', title: 'Triết lý quản trị', icon: 'sparkles', color: 'violet' },
              ].map((item) => {
                const isActive = activeSection === item.id;
                const itemTheme = SECTION_COLORS[item.color] || SECTION_COLORS.blue;
                const itemColor = isLightMode ? itemTheme.light : itemTheme.dark;

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => scrollToSection(item.id)}
                    style={
                      isActive
                        ? undefined
                        : {
                            color: itemColor,
                            borderColor: isLightMode ? `${itemTheme.light}45` : `${itemTheme.dark}35`,
                            backgroundColor: isLightMode ? 'rgba(255, 255, 255, 0.82)' : 'rgba(15, 23, 42, 0.75)',
                          }
                    }
                    className={`w-full text-left px-2.5 py-1.5 rounded-xl text-[11px] font-bold font-play tracking-wide transition-all border cursor-pointer flex items-center justify-between gap-1.5 ${
                      isActive
                        ? `bg-gradient-to-r ${itemTheme.grad} text-white border-white/40 shadow-md ring-1 ring-white/30`
                        : 'hover:brightness-105 backdrop-blur-md shadow-2xs'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 truncate">
                      {/* 1. Số thứ tự */}
                      <span className="font-mono font-black text-[11px] shrink-0" style={{ color: isActive ? '#ffffff' : itemColor }}>
                        {item.num}
                      </span>
                      {/* 2. Icon */}
                      <span className="shrink-0 flex items-center" style={{ color: isActive ? '#ffffff' : itemColor }}>
                        <WebIcon name={item.icon} className="w-3.5 h-3.5" />
                      </span>
                      {/* 3. Tiêu đề */}
                      <span className="truncate font-play font-bold" style={{ color: isActive ? '#ffffff' : itemColor }}>
                        {item.title}
                      </span>
                    </div>
                    {isActive && <span className="w-1.5 h-1.5 rounded-full bg-white shrink-0 animate-pulse" />}
                  </button>
                );
              })}
            </div>

            {/* Bottom Actions trong Banner: Khung Hợp Nhất & Màu Chữ Giống Màu Icon */}
            <div className={`relative z-10 pt-2 border-t ${
              isLightMode ? 'border-slate-200/80' : 'border-white/15'
            } flex flex-col gap-1.5 shrink-0`}>
              {/* TÍNH NĂNG 3: Nút Xuất Thẻ Tóm Tắt PDF Một Chạm (Instant Executive One-Pager Export) */}
              <button
                type="button"
                onClick={() => setIsExportModalOpen(true)}
                style={{
                  color: isLightMode ? '#059669' : '#34d399',
                  borderColor: isLightMode ? 'rgba(5, 150, 105, 0.35)' : 'rgba(52, 211, 153, 0.4)',
                  backgroundColor: isLightMode ? 'rgba(5, 150, 105, 0.12)' : 'rgba(52, 211, 153, 0.18)',
                }}
                className="w-full py-1.5 px-2.5 rounded-xl text-[11px] font-bold transition flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 shadow-xs border backdrop-blur-md"
                title="Xuất tóm tắt dự án dạng Executive One-Pager (STAR Format)"
              >
                <span className="shrink-0 flex items-center" style={{ color: isLightMode ? '#059669' : '#34d399' }}>
                  <FileText className="w-3.5 h-3.5" />
                </span>
                <span className="font-play" style={{ color: isLightMode ? '#059669' : '#34d399' }}>
                  Tóm Tắt Executive PDF
                </span>
              </button>

              <button
                type="button"
                onClick={() => onOpenMindmap(selectedArticle)}
                style={{
                  color: isLightMode ? '#4f46e5' : '#38bdf8',
                  borderColor: isLightMode ? 'rgba(79, 70, 229, 0.35)' : 'rgba(56, 189, 248, 0.4)',
                  backgroundColor: isLightMode ? 'rgba(79, 70, 229, 0.12)' : 'rgba(56, 189, 248, 0.18)',
                }}
                className="w-full py-1.5 px-2.5 rounded-xl text-[11px] font-bold transition flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 shadow-xs border backdrop-blur-md"
                title="Phóng to sơ đồ tư duy"
              >
                <span className="shrink-0 flex items-center" style={{ color: isLightMode ? '#4f46e5' : '#38bdf8' }}>
                  <WebIcon name="brain" className="w-3.5 h-3.5" />
                </span>
                <span className="font-play" style={{ color: isLightMode ? '#4f46e5' : '#38bdf8' }}>
                  Sơ Đồ Tư Duy
                </span>
              </button>

              <button
                type="button"
                onClick={onClose}
                style={{
                  color: isLightMode ? '#e11d48' : '#fb7185',
                  borderColor: isLightMode ? 'rgba(225, 29, 72, 0.35)' : 'rgba(251, 113, 133, 0.4)',
                  backgroundColor: isLightMode ? 'rgba(225, 29, 72, 0.12)' : 'rgba(251, 113, 133, 0.18)',
                }}
                className="w-full py-1.5 px-2.5 rounded-xl text-[11px] font-bold transition flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 shadow-xs border backdrop-blur-md"
                title="Đóng chi tiết bài viết"
              >
                <span className="shrink-0 flex items-center" style={{ color: isLightMode ? '#e11d48' : '#fb7185' }}>
                  <WebIcon name="close" className="w-3.5 h-3.5" />
                </span>
                <span className="font-play" style={{ color: isLightMode ? '#e11d48' : '#fb7185' }}>
                  Đóng Bài Viết
                </span>
              </button>
            </div>
          </div>
        </aside>
      )}

      {/* TÍNH NĂNG 3: MODAL EXECUTIVE SUMMARY STAR ONE-PAGER EXPORT */}
      {isExportModalOpen && (
        <div
          className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-5"
          onClick={() => setIsExportModalOpen(false)}
        >
          <div
            className="w-full max-w-3xl max-h-[92vh] rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/15 shadow-2xl overflow-hidden flex flex-col animate-fadeIn text-slate-800 dark:text-slate-100"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Actions Header */}
            <div className="p-4 border-b border-slate-200 dark:border-white/10 flex items-center justify-between gap-3 bg-slate-50 dark:bg-slate-950">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                <h4 className="font-black text-sm sm:text-base font-play">
                  Executive STAR One-Pager ({selectedArticle.code})
                </h4>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCopyStar}
                  className="px-3 py-1.5 rounded-xl text-xs font-bold bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/15 hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center gap-1.5 transition cursor-pointer shadow-2xs"
                  title="Sao chép toàn bộ nội dung STAR"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Sao chép STAR</span>
                </button>
                <button
                  type="button"
                  onClick={handlePrintOnePager}
                  className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-1.5 transition cursor-pointer shadow-sm active:scale-95"
                  title="In hoặc Lưu thành tệp PDF"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>In / Lưu PDF</span>
                </button>
                <button
                  type="button"
                  onClick={() => setIsExportModalOpen(false)}
                  className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-rose-500 hover:text-white transition flex items-center justify-center text-slate-400 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Document Body Printable Area */}
            <div
              id="executive-one-pager-print"
              className="flex-1 min-h-0 overflow-y-auto glass-scrollbar p-6 sm:p-8 space-y-5 bg-white text-slate-900"
            >
              {/* Document Banner */}
              <div className="border-b-2 border-slate-900 pb-4 flex items-start justify-between gap-4">
                <div>
                  <span className="px-2.5 py-1 rounded bg-slate-900 text-white font-mono font-black text-xs">
                    PROJECT {selectedArticle.code}
                  </span>
                  <h1 className="text-xl sm:text-2xl font-black font-play tracking-tight mt-2 text-slate-950">
                    {selectedArticle.title}
                  </h1>
                  <p className="text-xs text-slate-600 font-semibold mt-1">
                    Vai trò: <strong>{selectedArticle.role || 'Trưởng Dự Án / Project Lead'}</strong> · Nhóm: {selectedGroup?.fourWordTitle || 'Vận Hành'}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-[11px] font-mono font-bold text-slate-500">EXECUTIVE SUMMARY</span>
                  <div className="text-xs font-black text-emerald-600 mt-1">100% HOÀN THÀNH</div>
                </div>
              </div>

              {/* 4 STAR Blocks Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* S - Situation */}
                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 space-y-1.5">
                  <div className="flex items-center gap-1.5 text-xs font-black text-amber-700">
                    <span className="w-5 h-5 rounded-full bg-amber-100 flex items-center justify-center">S</span>
                    <span>SITUATION (BỐI CẢNH)</span>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed font-medium">
                    {selectedArticle.star?.situation || spec?.context.intro || selectedArticle.description}
                  </p>
                </div>

                {/* T - Task */}
                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 space-y-1.5">
                  <div className="flex items-center gap-1.5 text-xs font-black text-blue-700">
                    <span className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center">T</span>
                    <span>TASK (MỤC TIÊU CỐT LÕI)</span>
                  </div>
                  <ul className="text-xs text-slate-700 leading-relaxed space-y-1 font-medium list-disc list-inside">
                    {(spec?.objectives || []).slice(0, 3).map((o, idx: number) => (
                      <li key={idx} className="line-clamp-2">
                        <strong>{o.title}:</strong> {o.items.slice(0, 2).join(', ')}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* A - Actions */}
                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 space-y-1.5">
                  <div className="flex items-center gap-1.5 text-xs font-black text-purple-700">
                    <span className="w-5 h-5 rounded-full bg-purple-100 flex items-center justify-center">A</span>
                    <span>ACTIONS (GIẢI PHÁP THỰC THI)</span>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed font-medium">
                    {selectedArticle.star?.approach || spec?.methodology.intro}
                  </p>
                </div>

                {/* R - Results */}
                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 space-y-1.5">
                  <div className="flex items-center gap-1.5 text-xs font-black text-emerald-700">
                    <span className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center">R</span>
                    <span>RESULTS (KẾT QUẢ ĐẠT ĐƯỢC)</span>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed font-medium">
                    {selectedArticle.star?.results ? selectedArticle.star.results.join(' • ') : (spec?.metrics.intro || '')}
                  </p>
                </div>
              </div>

              {/* KPI Metrics Table */}
              {spec && spec.metrics.table.length > 0 && (
                <div className="border border-slate-200 rounded-xl p-3.5 bg-slate-50/40">
                  <h5 className="text-xs font-black text-slate-900 mb-2 font-mono uppercase tracking-wider">
                    CHỈ SỐ ĐO LƯỜNG VẬN HÀNH TIÊU BIỂU (KPI & SLA):
                  </h5>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {spec.metrics.table.slice(0, 4).map((m, mIdx) => (
                      <div key={mIdx} className="p-2 rounded bg-white border border-slate-200 text-left">
                        <span className="text-[10px] text-slate-500 font-bold block truncate">{m.category}</span>
                        <span className="text-xs font-black text-slate-900 line-clamp-2">{m.indicators}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Footer Note */}
              <div className="pt-3 border-t border-slate-200 text-[10.5px] text-slate-500 flex items-center justify-between">
                <span>Nguyễn Hùng Thái · Executive CX & Operations Leader</span>
                <span className="font-mono">Chuyên nghiệp · Minh bạch · Thực chiến</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
