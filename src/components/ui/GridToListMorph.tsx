// Lucian UX/UI Prompt #308 · MIT License (c) 2026 Seokwoooo · https://lucianlabs.dev/uxui-prompt/#308
'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ProjectData, SiteTheme } from '@/types';
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

export interface GridToListMorphProps {
  projects: ProjectData[];
  onOpenProject: (group: ProjectCardGroup, proj: ProjectData) => void;
  getParentGroup: (proj: ProjectData) => ProjectCardGroup;
  getVisualConfig: (proj: ProjectData) => {
    accentColor: string;
    cardBg: string;
    cardBorder: string;
    ambientGlow: string;
    titleColor: string;
    pillBg: string;
    arrowBg: string;
    arrowShadow: string;
  };
  currentTheme?: SiteTheme;
  isLight?: boolean;
}

export const GridToListMorph: React.FC<GridToListMorphProps> = ({
  projects,
  onOpenProject,
  getParentGroup,
  getVisualConfig,
  currentTheme = 'light-glass',
  isLight = true,
}) => {
  const [isList, setIsList] = useState<boolean>(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const isDark = currentTheme === 'dark-neon';

  // Refs for tracking DOM elements of each item for FLIP animation
  const itemRefs = useRef<Array<{ it: HTMLElement | null; ph: HTMLElement | null; tx: HTMLElement | null }>>([]);

  // Ensure itemRefs length matches projects length
  useEffect(() => {
    itemRefs.current = itemRefs.current.slice(0, projects.length);
  }, [projects.length]);

  const rel = (el: HTMLElement) => {
    if (!rootRef.current) return { x: 0, y: 0, w: 0, h: 0 };
    const r = el.getBoundingClientRect();
    const rr = rootRef.current.getBoundingClientRect();
    const k = rootRef.current.offsetWidth / (rr.width || 1);
    return {
      x: (r.left - rr.left) * k,
      y: (r.top - rr.top) * k,
      w: r.width * k,
      h: r.height * k,
    };
  };

  const handleSetView = (nextIsList: boolean) => {
    if (nextIsList === isList) return;
    const items = itemRefs.current;
    const rm = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // 1. Record 'before' positions of all photo tiles
    const before = items.map((o) => (o?.ph ? rel(o.ph) : null));

    // 2. Toggle view state
    setIsList(nextIsList);

    if (rm) return;

    // 3. Play FLIP animation after layout updates
    requestAnimationFrame(() => {
      items.forEach((o, i) => {
        if (!o?.ph || !before[i]) return;
        const a = before[i]!;
        const b = rel(o.ph);
        if (b.w === 0 || b.h === 0) return;
        const sx = a.w / b.w;
        const sy = a.h / b.h;

        o.ph.animate(
          [
            {
              transform: `translate(${a.x - b.x}px, ${a.y - b.y}px) scale(${sx}, ${sy})`,
              borderRadius: nextIsList ? `${14 / sx}px` : `${10 / sx}px`,
            },
            { transform: 'none' },
          ],
          {
            duration: 560,
            delay: i * 25,
            easing: 'cubic-bezier(.3,1.15,.4,1)',
            fill: 'backwards',
          }
        );

        if (nextIsList && o.tx) {
          o.tx.animate(
            [
              { opacity: 0, transform: 'translateX(-10px)' },
              { opacity: 1, transform: 'none' },
            ],
            {
              duration: 320,
              delay: 300 + i * 30,
              fill: 'backwards',
            }
          );
        }
      });
    });
  };

  return (
    <div
      ref={rootRef}
      className={`ux u308 w-full h-full flex flex-col overflow-hidden select-none ${
        isList ? 'is-list' : ''
      }`}
    >
      <style>{`
        .u308 {
          position: relative;
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          padding: 0;
          border-radius: 20px;
          background: transparent;
          box-shadow: none;
          backdrop-filter: none;
          -webkit-backdrop-filter: none;
        }
        .u308-hd {
          display: none;
        }
        .u308-hd b {
          font-size: 15px;
          font-weight: 850;
          color: var(--ux-ink, #16151B);
          letter-spacing: -0.01em;
        }
        .u308-vs {
          display: flex;
          gap: 3px;
          padding: 3px;
          border-radius: 11px;
          background: var(--ux-surface-2, rgba(245, 243, 239, 0.85));
          border: 1px solid var(--ux-line, rgba(22, 21, 27, 0.08));
        }
        .u308-v {
          width: 34px;
          height: 28px;
          border: 0;
          border-radius: 8px;
          display: grid;
          place-items: center;
          background: none;
          color: var(--ux-ink-3, #8E8A97);
          transition: all 0.2s cubic-bezier(0.2, 0.8, 0.2, 1);
          cursor: pointer;
        }
        .u308-v:hover {
          color: var(--ux-ink, #16151B);
        }
        .u308-v[aria-pressed="true"] {
          background: var(--ux-surface, #FFFFFF);
          color: var(--ux-accent, #6A57F2);
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08), 0 0 0 1px var(--ux-line, rgba(22, 21, 27, 0.1));
        }
        .u308-v svg {
          width: 16px;
          height: 16px;
          fill: none;
          stroke: currentColor;
          stroke-width: 2;
          stroke-linecap: round;
        }
        .u308-scroll {
          flex: 1;
          min-height: 0;
          overflow-y: auto;
          overflow-x: hidden;
          padding: 0;
        }
        .u308-g {
          display: grid;
          grid-template-columns: repeat(1, minmax(0, 1fr));
          gap: 1.25rem;
          padding-bottom: 24px;
        }

        @media (min-width: 640px) {
          .u308-g {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 1.25rem;
          }
        }

        @media (min-width: 1024px) {
          .u308-g {
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 1.35rem;
          }
        }

        /* =========================================================================
           RESPONSIVE GRID PROJECT CARD SYSTEM (.cp-card) — GRID MODE (NO TILT)
           Clean straight cards, 14px border radius, smooth elevation on hover
           ========================================================================= */
        .u308:not(.is-list) .u308-it.cp-card {
          background: #fff;
          border-radius: 16px;
          padding: 12px;
          border: 1px solid oklch(92% 0.01 260);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          height: 100%;
          min-width: 0;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          box-shadow: 0 10px 28px -4px rgba(15, 23, 42, 0.08), 0 4px 10px -2px rgba(15, 23, 42, 0.04), inset 0 1px 1.5px rgba(255, 255, 255, 0.95);
          transition:
            transform 0.28s cubic-bezier(0.2, 0.8, 0.2, 1),
            box-shadow 0.28s cubic-bezier(0.2, 0.8, 0.2, 1),
            border-color 0.25s ease;
        }

        .u308:not(.is-list) .u308-it.cp-card:hover,
        .u308:not(.is-list) .u308-it.cp-card:focus-visible,
        .u308:not(.is-list) .u308-it.cp-card:has(.cp-button:focus-visible) {
          transform: translateY(-6px);
          z-index: 10;
          box-shadow:
            0 20px 42px -6px rgba(15, 23, 42, 0.16),
            0 6px 16px -2px rgba(15, 23, 42, 0.08),
            inset 0 1.5px 2px rgba(255, 255, 255, 1);
          border-color: oklch(80% 0.08 260);
        }

        .u308:not(.is-list) .u308-it.cp-card:hover .cp-card-media img,
        .u308:not(.is-list) .u308-it.cp-card:focus-visible .cp-card-media img,
        .u308:not(.is-list) .u308-it.cp-card:has(.cp-button:focus-visible) .cp-card-media img {
          scale: 1.04;
        }

        .u308:not(.is-list) .u308-it.cp-card:hover .cp-arrow,
        .u308:not(.is-list) .u308-it.cp-card:focus-visible .cp-arrow,
        .u308:not(.is-list) .u308-it.cp-card:has(.cp-button:focus-visible) .cp-arrow {
          translate: 4px 0;
        }

        .u308:not(.is-list) .u308-it.cp-card:hover .cp-button,
        .u308:not(.is-list) .u308-it.cp-card:focus-visible .cp-button,
        .u308:not(.is-list) .u308-it.cp-card:has(.cp-button:focus-visible) .cp-button {
          background: oklch(20% 0.02 260);
          color: #fff;
        }

        .u308:not(.is-list) .u308-it.cp-card:focus-visible,
        .u308:not(.is-list) .u308-it.cp-card:has(.cp-button:focus-visible) {
          outline: 2px solid oklch(50% 0.22 350);
          outline-offset: 4px;
        }

        @media (prefers-reduced-motion: reduce) {
          .u308:not(.is-list) .u308-it.cp-card {
            transform: none;
            transition: box-shadow 0.2s ease;
          }
          .u308:not(.is-list) .u308-it.cp-card:hover,
          .u308:not(.is-list) .u308-it.cp-card:focus-visible,
          .u308:not(.is-list) .u308-it.cp-card:has(.cp-button:focus-visible) {
            transform: none;
          }
          .u308:not(.is-list) .u308-it.cp-card:hover .cp-card-media img,
          .u308:not(.is-list) .u308-it.cp-card:focus-visible .cp-card-media img,
          .u308:not(.is-list) .u308-it.cp-card:has(.cp-button:focus-visible) .cp-card-media img {
            scale: 1;
          }
          .u308:not(.is-list) .u308-it.cp-card:hover .cp-arrow,
          .u308:not(.is-list) .u308-it.cp-card:focus-visible .cp-arrow,
          .u308:not(.is-list) .u308-it.cp-card:has(.cp-button:focus-visible) .cp-arrow {
            translate: none;
          }
        }

        .u308:not(.is-list) .u308-ph.cp-card-media {
          width: 100%;
          height: auto;
          aspect-ratio: 16 / 10.5;
          border-radius: 10px;
          overflow: hidden;
          background: oklch(94% 0.01 260);
          position: relative;
          margin: 0;
          box-shadow: none;
        }

        .u308:not(.is-list) .u308-ph.cp-card-media img {
          width: 100%;
          height: 100%;
          display: block;
          object-fit: cover;
          transition: scale 0.5s cubic-bezier(0.2, 0.8, 0.2, 1);
        }

        .cp-banner-bottom-bar {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: 2;
          padding: 8px 12px;
          background: linear-gradient(180deg, transparent 0%, rgba(15, 23, 42, 0.45) 25%, rgba(15, 23, 42, 0.90) 100%);
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
          border-top: 1px solid rgba(255, 255, 255, 0.15);
          display: flex;
          align-items: center;
        }

        .cp-banner-bottom-bar .cp-card-category {
          margin: 0;
          font-size: 0.68rem;
          font-weight: 600;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          color: #ffffff;
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 0.35rem;
          text-shadow: 0 1px 3px rgba(0, 0, 0, 0.85);
        }

        .cp-banner-bottom-bar .cp-code-badge {
          background: rgba(255, 255, 255, 0.22);
          border: 1px solid rgba(255, 255, 255, 0.35);
          color: #facc15;
          font-family: monospace;
          font-weight: 800;
          font-size: 10px;
          padding: 1px 5.5px;
          border-radius: 4px;
          backdrop-filter: blur(4px);
        }

        .cp-banner-bottom-bar .cp-pill-text {
          color: #f8fafc;
          font-weight: 600;
        }

        .cp-banner-bottom-bar .cp-progress-text {
          color: #6ee7b7;
          font-weight: 700;
        }

        .cp-banner-bottom-bar .cp-dot {
          color: rgba(255, 255, 255, 0.65);
        }

        .cp-card-body {
          padding: 16px 20px 20px 20px;
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .cp-card-category {
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: oklch(52% 0.02 260);
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 0.35rem;
          margin-block-end: 0.5rem;
        }

        .cp-card-title {
          font-size: 1.15rem;
          font-weight: 700;
          letter-spacing: -0.02em;
          line-height: 1.28;
          color: inherit;
          margin-block-end: 0.65rem;
          display: flex;
          align-items: flex-start;
          gap: 0.45rem;
        }

        .cp-card-desc {
          font-size: 0.875rem;
          color: oklch(45% 0.02 260);
          line-height: 1.55;
          margin-block-end: 1.35rem;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .cp-card-action {
          margin-block-start: auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.5rem;
        }

        .cp-button {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.55rem 1.05rem;
          border-radius: 999px;
          background: oklch(95% 0.01 260);
          color: oklch(20% 0.02 260);
          font-size: 0.82rem;
          font-weight: 600;
          text-decoration: none;
          transition:
            background-color 0.2s ease,
            color 0.2s ease;
        }

        .cp-button:focus-visible {
          outline: none;
        }

        .cp-arrow {
          display: inline-block;
          transition: translate 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
        }

        /* Dark Mode Adaptation for Responsive Grid Project Card (.cp-card) */
        [data-theme="dark-neon"] .u308:not(.is-list) .u308-it.cp-card,
        .dark .u308:not(.is-list) .u308-it.cp-card {
          background: oklch(21% 0.025 260);
          border-color: oklch(32% 0.03 260);
          box-shadow: 0 14px 38px -6px rgba(0, 0, 0, 0.75), 0 4px 14px -2px rgba(0, 0, 0, 0.5), 0 0 18px -2px rgba(34, 211, 238, 0.18), inset 0 1px 1.5px rgba(255, 255, 255, 0.15);
        }

        [data-theme="dark-neon"] .u308:not(.is-list) .u308-it.cp-card:hover,
        [data-theme="dark-neon"] .u308:not(.is-list) .u308-it.cp-card:focus-visible,
        [data-theme="dark-neon"] .u308:not(.is-list) .u308-it.cp-card:has(.cp-button:focus-visible),
        .dark .u308:not(.is-list) .u308-it.cp-card:hover,
        .dark .u308:not(.is-list) .u308-it.cp-card:focus-visible,
        .dark .u308:not(.is-list) .u308-it.cp-card:has(.cp-button:focus-visible) {
          border-color: oklch(72% 0.14 215 / 0.55);
          box-shadow:
            0 24px 50px -8px rgba(0, 0, 0, 0.88),
            0 0 28px rgba(34, 211, 238, 0.35),
            inset 0 1px 2px rgba(255, 255, 255, 0.25);
        }

        [data-theme="dark-neon"] .u308:not(.is-list) .u308-ph.cp-card-media,
        .dark .u308:not(.is-list) .u308-ph.cp-card-media {
          background: oklch(16% 0.02 260);
        }

        [data-theme="dark-neon"] .cp-card-category,
        .dark .cp-card-category {
          color: oklch(70% 0.03 260);
        }

        [data-theme="dark-neon"] .cp-card-title,
        .dark .cp-card-title {
          color: inherit;
        }

        [data-theme="dark-neon"] .cp-card-desc,
        .dark .cp-card-desc {
          color: oklch(75% 0.02 260);
        }

        [data-theme="dark-neon"] .cp-button,
        .dark .cp-button {
          background: oklch(28% 0.03 260);
          color: oklch(95% 0.01 260);
        }

        [data-theme="dark-neon"] .u308:not(.is-list) .u308-it.cp-card:hover .cp-button,
        [data-theme="dark-neon"] .u308:not(.is-list) .u308-it.cp-card:focus-visible .cp-button,
        [data-theme="dark-neon"] .u308:not(.is-list) .u308-it.cp-card:has(.cp-button:focus-visible) .cp-button,
        .dark .u308:not(.is-list) .u308-it.cp-card:hover .cp-button,
        .dark .u308:not(.is-list) .u308-it.cp-card:focus-visible .cp-button,
        .dark .u308:not(.is-list) .u308-it.cp-card:has(.cp-button:focus-visible) .cp-button {
          background: oklch(82% 0.14 210);
          color: oklch(16% 0.02 260);
        }

        .u308-ph {
          width: 100%;
          aspect-ratio: 16 / 11;
          border-radius: 4px;
          overflow: hidden;
          position: relative;
          background: oklch(94% 0.01 260);
          transform-origin: 0 0;
        }
        .u308-ph img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: scale 0.5s cubic-bezier(0.2, 0.8, 0.2, 1);
        }
        .u308-ph-scrim {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.85) 100%);
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 12px 14px;
          color: #ffffff;
        }
        .u308-tx {
          display: none;
          min-width: 0;
        }
        .u308-tx b {
          display: block;
          font-size: 14px;
          font-weight: 780;
          color: var(--ux-ink, #16151B);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .u308-tx span {
          font-size: 12px;
          font-weight: 550;
          color: var(--ux-ink-2, #57535F);
          line-height: 1.45;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* --- LIST VIEW STYLES (.u308.is-list) --- */
        .u308.is-list .u308-g {
          grid-template-columns: 1fr;
          gap: 8px;
        }
        .u308.is-list .u308-it {
          display: flex;
          flex-direction: row;
          align-items: center;
          gap: 14px;
          padding: 8px 12px;
          border-radius: 14px;
          cursor: pointer;
          background: var(--ux-surface, rgba(255, 255, 255, 0.88));
          border: 1px solid var(--ux-line, oklch(92% 0.01 260));
          transition: transform 0.25s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.25s ease, border-color 0.25s ease;
        }
        .u308.is-list .u308-it:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 24px -8px oklch(20% 0.02 260 / 0.12);
          border-color: var(--ux-accent, #6A57F2);
        }
        .u308.is-list .u308-ph {
          width: 100px;
          height: 64px;
          min-width: 100px;
          aspect-ratio: auto;
          border-radius: 10px;
          flex: none;
        }
        .u308.is-list .u308-ph-scrim {
          display: none;
        }
        .u308.is-list .u308-tx {
          display: flex;
          flex-direction: column;
          gap: 3px;
          flex: 1;
        }

        /* Dark mode overrides for Lucian #308 */
        [data-theme="dark-neon"] .u308,
        .dark .u308 {
          background: rgba(15, 23, 42, 0.85);
          box-shadow: 0 0 0 1px rgba(34, 211, 238, 0.25), 0 20px 45px -10px rgba(0, 0, 0, 0.7);
        }
        [data-theme="dark-neon"] .u308-hd b,
        .dark .u308-hd b {
          color: #F8FAFC;
        }
        [data-theme="dark-neon"] .u308-vs,
        .dark .u308-vs {
          background: rgba(15, 23, 42, 0.95);
          border-color: rgba(255, 255, 255, 0.12);
        }
        [data-theme="dark-neon"] .u308-v,
        .dark .u308-v {
          color: rgba(248, 250, 252, 0.5);
        }
        [data-theme="dark-neon"] .u308-v[aria-pressed="true"],
        .dark .u308-v[aria-pressed="true"] {
          background: rgba(34, 211, 238, 0.2);
          color: #22D3EE;
          box-shadow: 0 0 10px rgba(34, 211, 238, 0.35);
        }
        [data-theme="dark-neon"] .u308-it,
        .dark .u308-it {
          background: rgba(20, 28, 48, 0.75);
          border-color: rgba(255, 255, 255, 0.08);
        }
        [data-theme="dark-neon"] .u308-it:hover,
        .dark .u308-it:hover {
          border-color: #22D3EE;
          box-shadow: 0 0 16px rgba(34, 211, 238, 0.35);
        }
        [data-theme="dark-neon"] .u308-tx b,
        .dark .u308-tx b {
          color: #F1F5F9;
        }
        [data-theme="dark-neon"] .u308-tx span,
        .dark .u308-tx span {
          color: #94A3B8;
        }
      `}</style>

      {/* Scrollable Project Cards Container with FLIP Morph */}
      <div className="u308-scroll glass-scrollbar">
        <div className="u308-g">
          {projects.map((proj, idx) => {
            const parentGroup = getParentGroup(proj);
            const cfg = getVisualConfig(proj);

            // Đổi màu icon năng động theo từng cụm chủ đề / phân hệ doanh nghiệp
            const projectCategoryTheme = getCategoryTheme(
              `${proj.title} ${(proj as any).company || ''} ${proj.description} ${parentGroup.fourWordTitle}`
            );
            const dynamicIconColor =
              projectCategoryTheme.key !== 'default' && projectCategoryTheme.key !== 'general'
                ? projectCategoryTheme.color
                : cfg.accentColor;

            const cleanFullName = proj.title.includes('·')
              ? proj.title.split('·').slice(1).join('·').trim()
              : proj.title.trim();
            const projectNumber = proj.code || String(idx + 1).padStart(2, '0');
            const fullDisplayTitle = `${projectNumber} · ${cleanFullName}`;

            return (
              <article
                key={proj.id}
                ref={(el) => {
                  if (!itemRefs.current[idx]) {
                    itemRefs.current[idx] = { it: null, ph: null, tx: null };
                  }
                  itemRefs.current[idx].it = el;
                }}
                className={`u308-it ${!isList ? 'cp-card' : ''}`}
                onClick={() => onOpenProject(parentGroup, proj)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onOpenProject(parentGroup, proj);
                  }
                }}
                aria-label={`Dự án ${proj.code}: ${proj.title}. Nhấn để xem chi tiết STAR`}
              >
                {/* Photo Tile Container (CodePen figure.card-media + FLIP morph ref) */}
                <figure
                  ref={(el) => {
                    if (itemRefs.current[idx]) {
                      itemRefs.current[idx].ph = el;
                    }
                  }}
                  className={`u308-ph ${!isList ? 'cp-card-media' : ''}`}
                >
                  <img
                    src={proj.image}
                    alt={proj.title}
                    loading="lazy"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://i.ibb.co/vzG7Z1z/hungthai-avatar.jpg';
                    }}
                  />
                  {/* Chuyển khối thông tin vào trong hình banner, nằm bên dưới hình banner */}
                  {!isList && (
                    <div className="cp-banner-bottom-bar pointer-events-none">
                      <span className="cp-card-category">
                        <span className="cp-code-badge">{proj.code}</span>
                        <span aria-hidden="true" className="cp-dot">•</span>
                        <span className="cp-pill-text">{parentGroup.pillText || parentGroup.fourWordTitle}</span>
                        <span aria-hidden="true" className="cp-dot">•</span>
                        <span className="cp-progress-text">{proj.progressText || '100% Hoàn thành'}</span>
                      </span>
                    </div>
                  )}
                </figure>

                {/* Card Body for Grid Mode (CodePen .card-body structure with 100% preserved project data) */}
                {!isList && (
                  <div className="cp-card-body">
                    <h2
                      className="cp-card-title"
                      title={fullDisplayTitle}
                      style={{ color: cfg.accentColor }}
                    >
                      <GlassmorphicIconFrame
                        size="xs"
                        color={dynamicIconColor}
                        glowColor={projectCategoryTheme.glow}
                        springBounce
                        className="shrink-0 mr-1.5 shadow-2xs"
                      >
                        <WebIcon
                          name={parentGroup.iconName}
                          className="w-3.5 h-3.5"
                          sparkle={parentGroup.iconName === 'sparkles'}
                          style={{ color: dynamicIconColor }}
                        />
                      </GlassmorphicIconFrame>
                      <span className="line-clamp-2" style={{ color: cfg.accentColor }}>
                        {fullDisplayTitle}
                      </span>
                    </h2>

                    <p className="cp-card-desc">
                      {proj.description}
                    </p>

                    <div className="cp-card-action">
                      <span
                        className="cp-button"
                        tabIndex={-1}
                      >
                        <span>Xem dự án</span>
                        <span className="cp-arrow" aria-hidden="true">→</span>
                      </span>

                      <span className="text-[11px] font-medium text-slate-400 dark:text-slate-400 truncate max-w-[45%]">
                        {proj.role || 'Trưởng Dự Án'}
                      </span>
                    </div>
                  </div>
                )}

                {/* Description Text Container (Fades in beside photo in List mode) */}
                <div
                  ref={(el) => {
                    if (itemRefs.current[idx]) {
                      itemRefs.current[idx].tx = el;
                    }
                  }}
                  className="u308-tx"
                >
                  <div className="flex items-center gap-2">
                    <span
                      style={{ background: cfg.accentColor }}
                      className="px-2 py-0.5 rounded text-white text-[9.5px] font-mono font-black shrink-0"
                    >
                      {proj.code}
                    </span>
                    <GlassmorphicIconFrame
                      size="xs"
                      color={dynamicIconColor}
                      glowColor={projectCategoryTheme.glow}
                      springBounce
                      className="shrink-0 shadow-2xs"
                    >
                      <WebIcon
                        name={parentGroup.iconName}
                        className="w-3.5 h-3.5"
                        sparkle={parentGroup.iconName === 'sparkles'}
                        style={{ color: dynamicIconColor }}
                      />
                    </GlassmorphicIconFrame>
                    <b
                      title={fullDisplayTitle}
                      className="font-play truncate text-[13px]"
                      style={{ color: cfg.accentColor }}
                    >
                      {fullDisplayTitle}
                    </b>
                    <span
                      className={`ml-auto shrink-0 px-2 py-0.5 rounded text-[10px] font-bold font-mono ${
                        isDark ? 'bg-emerald-500/15 text-emerald-300' : 'bg-emerald-50 text-emerald-700'
                      }`}
                    >
                      {proj.progressText || '100% Hoàn thành'}
                    </span>
                  </div>

                  <span>{proj.description}</span>

                  <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400 font-medium truncate">
                      <span className="truncate">{parentGroup.fourWordTitle}</span>
                      <span>·</span>
                      <span className="truncate">{proj.role || 'Trưởng Dự Án'}</span>
                    </div>

                    <div className="flex items-center gap-1 text-[11px] font-bold text-indigo-600 dark:text-cyan-400 shrink-0">
                      <span>Xem STAR</span>
                      <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M3 8h10M9 4l4 4-4 4" />
                      </svg>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
};
