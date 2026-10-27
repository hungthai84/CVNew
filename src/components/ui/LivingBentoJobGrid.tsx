// Lucian UX/UI Prompt #214 · MIT License (c) 2026 Seokwoooo · https://lucianlabs.dev/uxui-prompt/#214
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { WebIcon } from '@/components/ui/WebIcon';

export interface LivingBentoJobGridProps {
  company: string;
  roleTitle: string;
  period: string;
  scaleDesc: string;
  logo: string;
  tagline?: string;
  quote?: string;
  domainsList: { icon: string; label: string }[];
  brandsList: { name: string; logo?: string; isCustomLogo?: boolean; textBadge?: boolean; textColor?: string }[];
  tasksList: string[];
  projectsList: { title: string; subtitle: string }[];
  kpisList: { label: string; percent: number; barColor: string }[];
  className?: string;
}

const STATS_BAR_HEIGHTS = [0.45, 0.7, 0.55, 0.9, 0.75, 1];
const TASK_WIDTHS = [0.92, 0.7, 0.82, 0.55];

export const LivingBentoJobGrid: React.FC<LivingBentoJobGridProps> = ({
  company,
  roleTitle,
  period,
  scaleDesc,
  logo,
  tagline = 'Khách hàng là trung tâm • Kiến tạo giá trị bền vững',
  quote = '“Xây dựng quy trình chuẩn hóa, tối ưu hiệu suất và nâng tầm trải nghiệm khách hàng.”',
  domainsList,
  brandsList,
  tasksList,
  projectsList,
  kpisList,
  className = '',
}) => {
  const [activeTile, setActiveTile] = useState<string | null>(null);
  const [typedA, setTypedA] = useState<string>(tagline.slice(0, 22));
  const [typedB, setTypedB] = useState<string>('SOP & Ticket SLA');
  const timersRef = useRef<{ a?: NodeJS.Timeout; b?: NodeJS.Timeout }>({});

  const typeWriter = (fullText: string, key: 'a' | 'b') => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      if (key === 'a') setTypedA(fullText);
      if (key === 'b') setTypedB(fullText);
      return;
    }

    if (timersRef.current[key]) clearTimeout(timersRef.current[key]);
    const chars = Array.from(fullText);
    let index = 0;

    const tick = () => {
      index++;
      const current = chars.slice(0, index).join('');
      if (key === 'a') setTypedA(current);
      if (key === 'b') setTypedB(current);

      if (index < chars.length) {
        timersRef.current[key] = setTimeout(tick, 40);
      }
    };
    tick();
  };

  const handleTileEnter = (id: string) => {
    setActiveTile(id);
    if (id === 'a') {
      typeWriter(tagline, 'a');
    }
    if (id === 'b') {
      typeWriter('Kiểm tra: 80.000 Ticket/ngày · CSAT 98%', 'b');
    }
  };

  const handleTileLeave = () => {
    setActiveTile(null);
  };

  // Double brands array for infinite seamless marquee loop
  const displayBrands = brandsList.length > 0
    ? [...brandsList, ...brandsList, ...brandsList]
    : [
        { name: 'CSKH 24/7', logo: '' },
        { name: 'Omnichannel', logo: '' },
        { name: 'CRM 360', logo: '' },
        { name: 'SOP Kaizen', logo: '' },
        { name: 'CSKH 24/7', logo: '' },
        { name: 'Omnichannel', logo: '' },
        { name: 'CRM 360', logo: '' },
        { name: 'SOP Kaizen', logo: '' },
      ];

  return (
    <div className={`u214 font-play ${className}`}>
      <style dangerouslySetInnerHTML={{
        __html: `
        .u214 {
          position: relative;
          width: 100%;
          border-radius: 28px;
          overflow: hidden;
          background: var(--ux-surface, rgba(255, 255, 255, 0.95));
          box-shadow: 0 0 0 1px var(--ux-line, rgba(22, 21, 27, 0.08)), 0 24px 48px -24px var(--ux-shadow-strong, rgba(40, 30, 80, 0.16));
          color: var(--ux-ink, #1E1B4B);
          padding: 18px sm:22px;
          backdrop-filter: blur(20px);
        }
        [data-theme="dark-neon"] .u214,
        .dark .u214 {
          --ux-surface: rgba(15, 23, 42, 0.88);
          --ux-surface-2: rgba(30, 41, 59, 0.75);
          --ux-surface-3: rgba(51, 65, 85, 0.55);
          --ux-ink: #F1F5F9;
          --ux-ink-2: #CBD5E1;
          --ux-ink-3: #94A3B8;
          --ux-line: rgba(255, 255, 255, 0.1);
          --ux-shadow-strong: rgba(0, 0, 0, 0.65);
          --ux-accent: #22D3EE;
          box-shadow: 0 0 0 1px rgba(34, 211, 238, 0.25), 0 20px 45px -10px rgba(0, 0, 0, 0.7);
        }
        .u214-hd {
          margin-bottom: 14px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 8px;
        }
        .u214-hd small {
          font-size: 10.5px;
          font-weight: 850;
          letter-spacing: .08em;
          text-transform: uppercase;
          color: var(--ux-accent, #6366F1);
          font-mono: true;
        }
        .u214-hd h3 {
          margin: 2px 0 0;
          font-size: 16px sm:18px;
          font-weight: 900;
          letter-spacing: -.02em;
          color: var(--ux-ink, #1E1B4B);
        }
        .u214-gd {
          display: grid;
          grid-template-columns: 1.15fr 1fr .9fr;
          grid-template-rows: auto auto auto;
          grid-template-areas:
            "a a b"
            "c d b"
            "e e e";
          gap: 10px;
        }
        @media (max-width: 900px) {
          .u214-gd {
            grid-template-columns: 1fr;
            grid-template-areas:
              "a"
              "b"
              "c"
              "d"
              "e";
          }
        }
        .u214-t {
          position: relative;
          overflow: hidden;
          border-radius: 18px;
          background: var(--ux-surface-2, #F8FAFC);
          box-shadow: inset 0 0 0 1px var(--ux-line, rgba(22, 21, 27, 0.08));
          padding: 14px 16px;
          transition: transform .35s cubic-bezier(.3,1.4,.5,1), box-shadow .3s, border-color .3s;
        }
        .u214-t:hover, .u214-t.is-on, .u214-t:focus-visible {
          transform: translateY(-3px);
          box-shadow: inset 0 0 0 1.5px color-mix(in srgb, var(--ux-accent, #6366F1) 60%, transparent), 0 14px 28px -14px rgba(99, 102, 241, 0.45);
          outline: none;
        }
        .u214-t b {
          position: relative;
          z-index: 1;
          display: block;
          font-size: 12.5px sm:13.5px;
          font-weight: 850;
          color: var(--ux-ink, #1E1B4B);
        }
        .u214-t small {
          position: relative;
          z-index: 1;
          display: block;
          font-size: 10px sm:11px;
          font-weight: 650;
          color: var(--ux-ink-3, #64748B);
          margin-top: 2px;
        }
        .u214-a { grid-area: a; }
        .u214-b { grid-area: b; }
        .u214-c { grid-area: c; }
        .u214-d { grid-area: d; }
        .u214-e { grid-area: e; }

        .u214-av {
          position: absolute;
          right: 14px;
          top: 14px;
          display: flex;
        }
        .u214-av i {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          border: 2px solid var(--ux-surface-2, #fff);
          margin-left: -7px;
          transition: transform .45s cubic-bezier(.3, 1.5, .5, 1);
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .u214-av i:nth-child(1) { background: #F472B6; transform: translateX(16px); }
        .u214-av i:nth-child(2) { background: #60A5FA; transform: translateX(8px); }
        .u214-av i:nth-child(3) { background: #34D399; }
        .u214-a.is-on .u214-av i {
          transform: none;
        }
        .u214-ty {
          position: relative;
          margin-top: 12px;
          height: 26px;
          padding: 0 10px;
          border-radius: 9px;
          background: var(--ux-surface, #fff);
          box-shadow: inset 0 0 0 1px var(--ux-line, rgba(0,0,0,0.06));
          font-size: 11px;
          font-weight: 650;
          line-height: 26px;
          color: var(--ux-ink-2, #334155);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .u214-ty::after {
          content: "";
          display: inline-block;
          width: 1.5px;
          height: 12px;
          margin-left: 2px;
          vertical-align: -2px;
          background: #F472B6;
          animation: u214-blink 0.8s infinite;
        }
        @keyframes u214-blink {
          50% { opacity: 0; }
        }

        .u214-sb {
          margin-top: 10px;
          height: 26px;
          padding: 0 8px;
          border-radius: 8px;
          background: var(--ux-surface, #fff);
          box-shadow: inset 0 0 0 1px var(--ux-line, rgba(0,0,0,0.06));
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 10.5px;
          font-weight: 700;
          color: var(--ux-ink-2, #334155);
          white-space: nowrap;
          overflow: hidden;
        }
        .u214-sb svg {
          flex: none;
          width: 12px;
          height: 12px;
          color: var(--ux-ink-3, #94A3B8);
        }
        .u214-rs {
          margin-top: 10px;
          display: flex;
          flex-direction: column;
          gap: 5px;
        }
        .u214-rs i {
          height: 6px;
          border-radius: 3px;
          background: var(--ux-line, rgba(0, 0, 0, 0.08));
          transform-origin: 0 50%;
          transform: scaleX(0.35);
          opacity: 0.45;
          transition: transform .45s cubic-bezier(.3, 1.3, .5, 1), opacity .3s;
        }
        .u214-rs i:nth-child(2) { transition-delay: .06s; }
        .u214-rs i:nth-child(3) { transition-delay: .12s; }
        .u214-rs i:nth-child(4) { transition-delay: .18s; }
        .u214-b.is-on .u214-rs i {
          transform: scaleX(var(--w, 1));
          opacity: 1;
        }
        .u214-rs i:first-child {
          background: color-mix(in srgb, var(--ux-accent, #6366F1) 60%, transparent);
        }

        .u214-br {
          position: relative;
          margin-top: 12px;
          height: 44px;
          display: flex;
          align-items: flex-end;
          gap: 5px;
        }
        .u214-br i {
          flex: 1;
          height: 100%;
          border-radius: 3px 3px 0 0;
          background: color-mix(in srgb, #10B981 65%, transparent);
          transform-origin: 50% 100%;
          transform: scaleY(0.25);
          transition: transform .5s cubic-bezier(.3, 1.5, .5, 1);
          transition-delay: calc(var(--i, 0) * 45ms);
        }
        .u214-c.is-on .u214-br i {
          transform: scaleY(var(--h, 1));
        }

        .u214-sh {
          position: absolute;
          right: 14px;
          bottom: 12px;
          width: 32px;
          height: 36px;
          color: #6366F1;
        }
        .u214-sh::before, .u214-sh::after {
          content: "";
          position: absolute;
          left: 50%;
          top: 50%;
          width: 32px;
          height: 32px;
          margin: -16px 0 0 -16px;
          border-radius: 50%;
          border: 1.5px solid currentColor;
          opacity: 0;
          pointer-events: none;
        }
        .u214-d.is-on .u214-sh::before {
          animation: u214-p 1.4s ease-out infinite;
        }
        .u214-d.is-on .u214-sh::after {
          animation: u214-p 1.4s ease-out .7s infinite;
        }
        @keyframes u214-p {
          0% { transform: scale(0.6); opacity: 0.75; }
          100% { transform: scale(1.85); opacity: 0; }
        }
        .u214-sh svg {
          position: relative;
          width: 100%;
          height: 100%;
        }

        .u214-lg {
          position: relative;
          margin-top: 10px;
          width: 100%;
          height: 42px;
          display: flex;
          align-items: center;
          -webkit-mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);
          mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);
          overflow: hidden;
        }
        .u214-lt {
          display: flex;
          gap: 10px;
          animation: u214-m 14s linear infinite;
          animation-play-state: running;
          will-change: transform;
        }
        .u214-e.is-on .u214-lt {
          animation-duration: 4.8s;
        }
        @keyframes u214-m {
          to { transform: translateX(-50%); }
        }
        .u214-it {
          flex: none;
          height: 32px;
          padding: 0 10px;
          border-radius: 10px;
          background: var(--ux-surface, #fff);
          box-shadow: 0 0 0 1px var(--ux-line, rgba(0,0,0,0.08)), 0 2px 5px -1px rgba(0,0,0,0.05);
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 10.5px;
          font-weight: 800;
          white-space: nowrap;
        }

        @media (prefers-reduced-motion: reduce) {
          .u214-t, .u214-av i, .u214-rs i, .u214-br i {
            transition: none !important;
          }
          .u214-lt {
            animation: none !important;
          }
          .u214-d.is-on .u214-sh::before, .u214-d.is-on .u214-sh::after {
            animation: none !important;
          }
        }
      `}} />

      {/* Header Bento */}
      <div className="u214-hd">
        <div>
          <small>Living Bento · Career Blueprint</small>
          <h3>Hồ Sơ Năng Lực &amp; Dấu Ấn Công Tác</h3>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200/80 text-[10px] font-mono font-bold">
            {period}
          </span>
          <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/80 text-[10px] font-mono font-bold">
            {scaleDesc}
          </span>
        </div>
      </div>

      {/* 5 Interlocking Living Bento Grid Tiles */}
      <div className="u214-gd">
        {/* TILE A: Sứ Mệnh & Lãnh Đạo Đội Ngũ (Collaboration / Teamwork) */}
        <div
          className={`u214-t u214-a ${activeTile === 'a' ? 'is-on' : ''}`}
          tabIndex={0}
          onPointerEnter={() => handleTileEnter('a')}
          onPointerLeave={handleTileLeave}
          onFocus={() => handleTileEnter('a')}
          onBlur={handleTileLeave}
        >
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded-md bg-purple-100 text-purple-700 flex items-center justify-center text-xs">
              👑
            </span>
            <b>{roleTitle} · {company}</b>
          </div>
          <small>Lãnh đạo &amp; Kiến tạo văn hóa phục vụ khách hàng</small>

          {/* 3 Avatars clustering animation */}
          <span className="u214-av" aria-hidden="true">
            <i title="CSKH Team" />
            <i title="Technical Support" />
            <i title="Operations Desk" />
          </span>

          {/* Typing typewriter banner */}
          <div className="u214-ty" aria-hidden="true" title={tagline}>
            {typedA}
          </div>

          <div className="mt-2.5 pt-2 border-t border-slate-100 dark:border-white/10 flex items-center justify-between text-[10px] text-slate-500 font-medium">
            <span>Triết lý: {quote}</span>
          </div>
        </div>

        {/* TILE B: Nhiệm Vụ Vận Hành & Dự Án Trọng Điểm (Search & Tasks execution) */}
        <div
          className={`u214-t u214-b ${activeTile === 'b' ? 'is-on' : ''}`}
          tabIndex={0}
          onPointerEnter={() => handleTileEnter('b')}
          onPointerLeave={handleTileLeave}
          onFocus={() => handleTileEnter('b')}
          onBlur={handleTileLeave}
        >
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded-md bg-sky-100 text-sky-700 flex items-center justify-center text-xs">
              🔍
            </span>
            <b>Nhiệm Vụ Vận Hành</b>
          </div>
          <small>{tasksList.length} Đầu việc &amp; {projectsList.length} Dự án trọng điểm</small>

          {/* Search bar typing */}
          <div className="u214-sb" aria-hidden="true">
            <svg viewBox="0 0 12 12" fill="none" stroke="currentColor">
              <circle cx="5" cy="5" r="3.4" strokeWidth="1.5" />
              <path d="M7.6 7.6 10.5 10.5" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <span>{typedB}</span>
          </div>

          {/* Expanding result bars on hover */}
          <div className="u214-rs" aria-hidden="true">
            {TASK_WIDTHS.map((w, idx) => (
              <i key={idx} style={{ '--w': w } as React.CSSProperties} />
            ))}
          </div>

          {/* Tasks snippet preview */}
          <div className="mt-3 space-y-1.5 border-t border-slate-100 dark:border-white/10 pt-2 text-[10.5px] text-slate-600 leading-snug">
            {tasksList.slice(0, 3).map((task, tIdx) => (
              <div key={tIdx} className="flex items-start gap-1.5">
                <span className="w-3.5 h-3.5 rounded-full bg-sky-100 text-sky-700 text-[9px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {tIdx + 1}
                </span>
                <span className="line-clamp-1">{task}</span>
              </div>
            ))}
          </div>
        </div>

        {/* TILE C: Chỉ Số Đánh Giá KPI & SLA (Growing Bar Stats) */}
        <div
          className={`u214-t u214-c ${activeTile === 'c' ? 'is-on' : ''}`}
          tabIndex={0}
          onPointerEnter={() => handleTileEnter('c')}
          onPointerLeave={handleTileLeave}
          onFocus={() => handleTileEnter('c')}
          onBlur={handleTileLeave}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-md bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs">
                📊
              </span>
              <b>Chỉ Số KPI &amp; SLA</b>
            </div>
            <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
              Realtime
            </span>
          </div>
          <small>Đo lường năng suất &amp; chất lượng</small>

          {/* Growing vertical bar chart */}
          <div className="u214-br" aria-hidden="true">
            {STATS_BAR_HEIGHTS.map((h, i) => (
              <i
                key={i}
                style={{
                  '--h': h,
                  '--i': i,
                } as React.CSSProperties}
              />
            ))}
          </div>

          <div className="mt-2.5 flex items-center justify-between text-[10px] font-bold text-slate-700 border-t border-slate-100 pt-1.5">
            <span>CSAT: 96% – 98%</span>
            <span className="text-emerald-600">SOP: 100%</span>
          </div>
        </div>

        {/* TILE D: Tiêu Chuẩn SOP & Kiểm Soát (Radar Pulsing Shield) */}
        <div
          className={`u214-t u214-d ${activeTile === 'd' ? 'is-on' : ''}`}
          tabIndex={0}
          onPointerEnter={() => handleTileEnter('d')}
          onPointerLeave={handleTileLeave}
          onFocus={() => handleTileEnter('d')}
          onBlur={handleTileLeave}
        >
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded-md bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs">
              🛡️
            </span>
            <b>Tiêu Chuẩn SOP &amp; Bảo Mật</b>
          </div>
          <small>Quy trình kiểm soát rủi ro 24/7</small>

          {/* Shield with pulsing radar ripples */}
          <span className="u214-sh" aria-hidden="true">
            <svg viewBox="0 0 30 34">
              <path d="M15 2l11 4.5v8.5c0 8-5 13.5-11 16.5C9 28.5 4 23 4 15V6.5z" fill="currentColor" opacity=".18" />
              <path d="M15 2l11 4.5v8.5c0 8-5 13.5-11 16.5C9 28.5 4 23 4 15V6.5z" fill="none" stroke="currentColor" strokeWidth="2" />
              <path d="M10.5 16.5l3 3 6-6.5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>

          <div className="mt-4 text-[10px] text-indigo-700 font-bold max-w-[70%] leading-snug">
            SLA &gt; 90% · Xử lý sự cố ngay lập tức
          </div>
        </div>

        {/* TILE E: Hệ Sinh Thái Thương Hiệu & Lĩnh Vực (Infinite Marquee) */}
        <div
          className={`u214-t u214-e ${activeTile === 'e' ? 'is-on' : ''}`}
          tabIndex={0}
          onPointerEnter={() => handleTileEnter('e')}
          onPointerLeave={handleTileLeave}
          onFocus={() => handleTileEnter('e')}
          onBlur={handleTileLeave}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-md bg-amber-100 text-amber-700 flex items-center justify-center text-xs">
                🌐
              </span>
              <b>Hệ Sinh Thái Thương Hiệu &amp; Dịch Vụ</b>
            </div>
            <small className="text-slate-400 font-mono">Rê chuột để tăng tốc lướt →</small>
          </div>
          <small>
            {domainsList.map(d => d.label).slice(0, 4).join(' · ')}...
          </small>

          {/* Infinite scrolling marquee of brand badges */}
          <div className="u214-lg" aria-hidden="true">
            <div className="u214-lt">
              {displayBrands.map((b, bIdx) => (
                <div key={bIdx} className="u214-it">
                  {b.logo ? (
                    <img src={b.logo} alt={b.name} className="h-4 w-4 object-contain" />
                  ) : (
                    <span className="text-[10px] text-indigo-600 font-black">★</span>
                  )}
                  <span>{b.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
