// Lucian UX/UI Prompt #049 · MIT License (c) 2026 Seokwoooo · https://lucianlabs.dev/uxui-prompt/#049
'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ProjectData } from '@/types';
import { WebIcon } from '@/components/ui/WebIcon';
import { getCategoryTheme } from '@/utils/categoryTheme';
import { GlassmorphicIconFrame } from '@/components/ui/GlassmorphicIconFrame';

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

interface LayeredEditorialCardProps {
  proj: ProjectData;
  parentGroup: ProjectCardGroup;
  onOpenProject: (group: ProjectCardGroup, proj: ProjectData) => void;
  accentColor?: string;
  isLight?: boolean;
}

export const LayeredEditorialCard: React.FC<LayeredEditorialCardProps> = ({
  proj,
  parentGroup,
  onOpenProject,
  accentColor = '#6A57F2',
  isLight = true,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [ctaText, setCtaText] = useState('Xem STAR');

  const rawDisplayTitle = proj.title.includes('·')
    ? proj.title.split('·')[1].trim()
    : proj.title;
  // Bỏ phần trong ngoặc đơn ( ) theo yêu cầu
  const displayTitle = rawDisplayTitle.replace(/\s*\([^)]*\)/g, '').trim();

  // Đổi màu icon năng động theo từng cụm chủ đề / phân hệ doanh nghiệp
  const categoryTheme = getCategoryTheme(
    `${proj.title} ${(proj as any).company || ''} ${proj.description} ${parentGroup.fourWordTitle}`
  );

  // Read initial bookmark state from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('cv_bookmarked_projects');
      if (saved) {
        const list: string[] = JSON.parse(saved);
        if (list.includes(proj.id)) {
          setIsBookmarked(true);
        }
      }
    } catch {
      // Ignore storage errors
    }
  }, [proj.id]);

  const toggleBookmark = (e: React.MouseEvent) => {
    e.stopPropagation();
    const next = !isBookmarked;
    setIsBookmarked(next);
    try {
      const saved = localStorage.getItem('cv_bookmarked_projects');
      let list: string[] = saved ? JSON.parse(saved) : [];
      if (next) {
        if (!list.includes(proj.id)) list.push(proj.id);
      } else {
        list = list.filter((id) => id !== proj.id);
      }
      localStorage.setItem('cv_bookmarked_projects', JSON.stringify(list));
    } catch {
      // Ignore storage errors
    }
  };

  const handlePointerEnter = (e: React.PointerEvent) => {
    if (e.pointerType === 'mouse') {
      setIsOpen(true);
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (e.pointerType !== 'mouse' || !cardRef.current) return;
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }
    const rect = cardRef.current.getBoundingClientRect();
    const px = (((e.clientX - rect.left) / rect.width) * 2 - 1).toFixed(3);
    const py = (((e.clientY - rect.top) / rect.height) * 2 - 1).toFixed(3);
    cardRef.current.style.setProperty('--px', px);
    cardRef.current.style.setProperty('--py', py);
  };

  const handlePointerLeave = (e: React.PointerEvent) => {
    if (e.pointerType !== 'mouse' || !cardRef.current) return;
    cardRef.current.style.setProperty('--px', '0');
    cardRef.current.style.setProperty('--py', '0');
    if (!cardRef.current.contains(document.activeElement)) {
      setIsOpen(false);
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('button')) return;
    // On touch devices or first click, toggle open. If already open, trigger open project
    if (!isOpen) {
      setIsOpen(true);
    } else {
      onOpenProject(parentGroup, proj);
    }
  };

  const handleFocus = () => {
    setIsOpen(true);
  };

  const handleBlur = (e: React.FocusEvent) => {
    if (cardRef.current && !cardRef.current.contains(e.relatedTarget as Node) && !cardRef.current.matches(':hover')) {
      setIsOpen(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.target === cardRef.current && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      ctaRef.current?.focus();
      onOpenProject(parentGroup, proj);
    }
    if (e.key === 'Escape') {
      setIsOpen(false);
      cardRef.current?.focus();
    }
  };

  const handleCtaClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCtaText('Đang mở...');
    onOpenProject(parentGroup, proj);
    setTimeout(() => {
      setCtaText('Xem STAR');
    }, 1200);
  };

  return (
    <>
      <style>{`
        .u049 {
          --px: 0;
          --py: 0;
          --lift: 110px;
          position: relative;
          width: 100%;
          height: 100%;
          min-height: 330px;
          border-radius: 20px;
          overflow: hidden;
          isolation: isolate;
          color: #fff;
          background: #181236;
          box-shadow: 0 14px 34px -14px var(--ux-shadow-strong, rgba(0,0,0,0.3));
          transition: transform .6s var(--ux-ease, cubic-bezier(.2,.8,.2,1)), box-shadow .6s var(--ux-ease, cubic-bezier(.2,.8,.2,1)), border-color .3s;
          cursor: pointer;
          outline: none;
          text-align: left;
          user-select: none;
        }
        .u049.is-open {
          transform: translateY(-4px);
          box-shadow: 0 28px 56px -18px var(--ux-shadow-strong, rgba(0,0,0,0.48));
        }
        .u049-art {
          position: absolute;
          inset: 0;
          z-index: 0;
          pointer-events: none;
          overflow: hidden;
        }
        .u049-art .u049-banner-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          transform: translate(calc(var(--px) * -6px), calc(var(--py) * -4px)) scale(1.03);
          transition: transform .7s var(--ux-ease, cubic-bezier(.2,.8,.2,1)), filter .5s;
        }
        .u049:hover .u049-banner-img,
        .u049.is-open .u049-banner-img {
          transform: translate(calc(var(--px) * -6px), calc(var(--py) * -4px - 4px)) scale(1.08);
        }
        .u049-shade {
          position: absolute;
          inset: 0;
          z-index: 1;
          background: linear-gradient(
            180deg,
            rgba(15, 23, 42, 0.28) 0%,
            rgba(15, 23, 42, 0.12) 32%,
            rgba(15, 23, 42, 0.65) 60%,
            rgba(15, 23, 42, 0.92) 85%,
            rgba(15, 23, 42, 0.98) 100%
          );
          transition: opacity .6s;
          pointer-events: none;
        }
        .u049-top {
          position: absolute;
          left: 16px;
          right: 14px;
          top: 14px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          z-index: 10;
          pointer-events: auto;
        }
        .u049-tag {
          height: 27px;
          padding: 0 11px;
          border-radius: 999px;
          display: inline-flex;
          align-items: center;
          gap: 5.5px;
          background: rgba(255, 255, 255, 0.22);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.35);
          font-size: 11px;
          font-weight: 750;
          letter-spacing: .04em;
          color: #fff;
          text-shadow: 0 1px 2px rgba(0,0,0,0.5);
          max-width: calc(100% - 50px);
        }
        .u049-bm {
          width: 36px;
          height: 36px;
          border: 1px solid rgba(255, 255, 255, 0.32);
          padding: 0;
          border-radius: 50%;
          display: grid;
          place-items: center;
          background: rgba(255, 255, 255, 0.22);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          color: #fff;
          transition: transform .4s var(--ux-spring, cubic-bezier(.34,1.45,.64,1)), background-color .3s;
          cursor: pointer;
        }
        .u049-bm:hover {
          background: rgba(255, 255, 255, 0.38);
          transform: scale(1.08);
        }
        .u049-bm:active {
          transform: scale(.86);
        }
        .u049-bm:focus-visible {
          outline: 2px solid #fff;
          outline-offset: 2px;
        }
        .u049-bm svg {
          width: 17px;
          height: 17px;
          fill: none;
          stroke: currentColor;
          stroke-width: 2;
          stroke-linejoin: round;
          transition: fill .3s, transform .3s;
        }
        .u049-bm[aria-pressed="true"] svg {
          fill: currentColor;
          animation: u049-pop .5s var(--ux-spring, cubic-bezier(.34,1.45,.64,1));
        }
        @keyframes u049-pop {
          40% { transform: scale(1.35); }
        }
        .u049-body {
          position: absolute;
          left: 18px;
          right: 18px;
          bottom: 18px;
          transform: translateY(var(--lift, 110px));
          transition: transform .7s var(--ux-spring, cubic-bezier(.34,1.45,.64,1));
          z-index: 10;
          pointer-events: auto;
        }
        .u049.is-open .u049-body {
          --lift: 0px;
        }
        .u049-k {
          font-size: 11px;
          font-weight: 750;
          letter-spacing: .08em;
          opacity: .9;
          text-transform: uppercase;
          font-family: monospace;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .u049-t {
          margin: 6px 0 0;
          font-size: 17px;
          line-height: 1.25;
          font-weight: 800;
          letter-spacing: -.02em;
          color: #fff;
          text-shadow: 0 1px 3px rgba(0,0,0,0.6);
        }
        .u049-sum {
          margin: 9px 0 0;
          font-size: 11.5px;
          line-height: 1.55;
          color: rgba(255, 255, 255, 0.92);
          opacity: 0;
          transform: translateY(10px);
          transition: opacity .3s, transform .5s var(--ux-ease, cubic-bezier(.2,.8,.2,1));
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .u049-foot {
          display: flex;
          align-items: center;
          gap: 9px;
          margin-top: 13px;
          opacity: 0;
          transform: translateY(14px);
          transition: opacity .3s, transform .5s var(--ux-ease, cubic-bezier(.2,.8,.2,1));
        }
        .u049.is-open .u049-sum {
          opacity: 1;
          transform: none;
          transition: opacity .45s .12s, transform .6s var(--ux-spring, cubic-bezier(.34,1.45,.64,1)) .12s;
        }
        .u049.is-open .u049-foot {
          opacity: 1;
          transform: none;
          transition: opacity .45s .2s, transform .6s var(--ux-spring, cubic-bezier(.34,1.45,.64,1)) .2s;
        }
        .u049-av {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.65);
          overflow: hidden;
          flex-shrink: 0;
          background: radial-gradient(circle at 35% 30%, #FFD3A8, #FF7A93 60%, #8B6CFF);
        }
        .u049-by {
          font-size: 11.5px;
          font-weight: 700;
          line-height: 1.3;
          color: #fff;
          min-width: 0;
          overflow: hidden;
        }
        .u049-by small {
          display: block;
          font-size: 9.5px;
          opacity: .8;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .u049-cta {
          margin-left: auto;
          height: 34px;
          padding: 0 13px;
          border: 0;
          border-radius: 999px;
          display: inline-flex;
          align-items: center;
          gap: 5px;
          background: #fff;
          color: #1B1440;
          font-size: 11.5px;
          font-weight: 800;
          transition: transform .35s var(--ux-spring, cubic-bezier(.34,1.45,.64,1)), background-color .2s;
          cursor: pointer;
          flex-shrink: 0;
          box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        }
        .u049-cta:hover {
          transform: translateX(2px) scale(1.02);
          background: #F8FAFC;
        }
        .u049-cta:active {
          transform: scale(.94);
        }
        .u049-cta:focus-visible {
          outline: 2px solid #fff;
          outline-offset: 3px;
        }
        .u049-cta svg {
          width: 12px;
          height: 12px;
          fill: none;
          stroke: currentColor;
          stroke-width: 2.4;
          stroke-linecap: round;
          stroke-linejoin: round;
        }
        .u049:focus-visible {
          outline: 2px solid var(--ux-accent, #6A57F2);
          outline-offset: 3px;
        }

        /* Giao Diện Sáng (Light Interface) */
        .u049.is-light {
          color: #1e1b4b;
          background: #ffffff;
          box-shadow: 0 12px 30px -10px rgba(30, 27, 75, 0.12), 0 0 0 1px rgba(226, 232, 240, 0.9);
        }
        .u049.is-light.is-open {
          box-shadow: 0 24px 48px -12px rgba(30, 27, 75, 0.18), 0 0 0 1px rgba(203, 213, 225, 0.9);
        }
        .u049.is-light .u049-shade {
          background: linear-gradient(180deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.1) 32%, rgba(255,255,255,0.78) 60%, rgba(255,255,255,0.95) 85%, #ffffff 100%);
        }
        .u049.is-light .u049-tag {
          background: rgba(255, 255, 255, 0.88);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.95);
          color: #1e1b4b;
          text-shadow: none;
          box-shadow: 0 4px 14px rgba(30, 27, 75, 0.08);
        }
        .u049.is-light .u049-bm {
          background: rgba(255, 255, 255, 0.88);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.95);
          color: #475569;
          box-shadow: 0 4px 14px rgba(30, 27, 75, 0.08);
        }
        .u049.is-light .u049-bm:hover {
          background: #ffffff;
          color: #1e1b4b;
        }
        .u049.is-light .u049-bm[aria-pressed="true"] {
          background: #fff1f2;
          border-color: #fecdd3;
          color: #e11d48;
        }
        .u049.is-light .u049-k {
          color: #64748b;
        }
        .u049.is-light .u049-t {
          color: #1e1b4b;
          text-shadow: none;
        }
        .u049.is-light .u049-sum {
          color: #475569;
        }
        .u049.is-light .u049-by {
          color: #1e1b4b;
        }
        .u049.is-light .u049-by small {
          color: #64748b;
        }
        .u049.is-light .u049-cta {
          background: linear-gradient(135deg, #4f46e5 0%, #3b82f6 100%);
          color: #ffffff;
          box-shadow: 0 4px 14px rgba(79, 70, 229, 0.35);
        }
        .u049.is-light .u049-cta:hover {
          background: linear-gradient(135deg, #4338ca 0%, #2563eb 100%);
          box-shadow: 0 6px 18px rgba(79, 70, 229, 0.45);
        }

        @media (prefers-reduced-motion: reduce) {
          .u049, .u049 *, .u049 *::before, .u049 *::after {
            animation-duration: .001ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: .001ms !important;
          }
        }
      `}</style>

      <article
        ref={cardRef}
        className={`ux u049 ${isOpen ? 'is-open' : ''} ${
          isLight
            ? 'is-light border border-slate-200/90 shadow-[0_12px_32px_rgba(30,27,75,0.12)]'
            : 'border border-white/20 shadow-[0_16px_40px_rgba(0,0,0,0.7)]'
        }`}
        tabIndex={0}
        aria-label={`${proj.title} — ${proj.description}`}
        onPointerEnter={handlePointerEnter}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        onClick={handleClick}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
      >
        {/* Project Banner Image Filling The Entire Card (Lắp đầy thẻ) */}
        <div className="u049-art" aria-hidden="true">
          <img
            src={proj.image}
            alt={proj.title}
            className={`u049-banner-img ${
              isLight ? 'brightness-[1.02] contrast-[1.03]' : 'brightness-[1.06] contrast-[1.04]'
            }`}
            onError={(e) => {
              (e.target as HTMLImageElement).src = parentGroup.illustrationSrc;
            }}
          />
        </div>

        {/* Ambient Dark/Light Shade Vignette */}
        <div className="u049-shade" aria-hidden="true" />

        {/* Top Header: Tag & Interactive Bookmark Button */}
        <div className="u049-top">
          <span className="u049-tag truncate flex items-center gap-1.5">
            <GlassmorphicIconFrame
              size="xs"
              color={categoryTheme.color}
              glowColor={categoryTheme.glow}
              springBounce
              className="shrink-0 shadow-2xs"
            >
              <WebIcon
                name={parentGroup.iconName}
                className="w-3.5 h-3.5"
                sparkle={parentGroup.iconName === 'sparkles'}
                style={{ color: categoryTheme.color }}
              />
            </GlassmorphicIconFrame>
            <span className="truncate">{parentGroup.code} · {parentGroup.fourWordTitle}</span>
          </span>

          <button
            className="u049-bm shrink-0"
            type="button"
            aria-pressed={isBookmarked}
            aria-label={isBookmarked ? 'Bỏ lưu dự án' : 'Lưu dự án vào mục yêu thích'}
            title={isBookmarked ? 'Đã lưu dự án (Bấm để bỏ)' : 'Lưu dự án này'}
            onClick={toggleBookmark}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M6.5 4h11a.5.5 0 0 1 .5.5V20l-6-4-6 4V4.5a.5.5 0 0 1 .5-.5z" />
            </svg>
          </button>
        </div>

        {/* Body Content with Spring Lift Reveal */}
        <div className="u049-body">
          <div className="u049-k">
            <span
              style={{ background: accentColor }}
              className="px-2 py-0.5 rounded text-white text-[9.5px] font-mono font-black"
            >
              {proj.code}
            </span>
            <span className="opacity-80">·</span>
            <span
              className={`text-[10px] font-mono font-bold ${
                isLight ? 'text-emerald-700 font-extrabold' : 'text-emerald-300'
              }`}
            >
              {proj.progressText || '100% Hoàn thành'}
            </span>
          </div>

          <h3 className="u049-t font-play" title={proj.title}>
            {displayTitle}
          </h3>

          <p className="u049-sum">
            {proj.description}
          </p>

          <div className="u049-foot">
            <div className="u049-av" aria-hidden="true">
              <img
                src="https://i.ibb.co/vzG7Z1z/hungthai-avatar.jpg"
                alt="Avatar"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </div>
            <div className="u049-by min-w-0">
              <span className="truncate block">Nguyễn Hùng Thái</span>
              <small className="truncate block">{proj.role || 'Trưởng Dự Án & Kiến Trúc Sư CX'}</small>
            </div>
            <button
              ref={ctaRef}
              className="u049-cta"
              type="button"
              onClick={handleCtaClick}
              title={`Xem Case Study STAR: ${proj.title}`}
            >
              <span>{ctaText}</span>
              <svg viewBox="0 0 16 16" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" />
              </svg>
            </button>
          </div>
        </div>
      </article>
    </>
  );
};
