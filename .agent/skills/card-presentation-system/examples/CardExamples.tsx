import React from 'react';
import WebIcon from '@/components/ui/WebIcon';

/**
 * Utility: Standardizes card title to 4 words with capitalized initial letters.
 */
export function formatCardTitle(str: string): string {
  if (!str) return '';
  const clean = str.replace(/[•\-_:]/g, ' ').replace(/\s+/g, ' ').trim();
  const words = clean.split(' ').map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase());
  return words.slice(0, 4).join(' ');
}

// ============================================================================
// TYPE 1: 3D FLIP SYSTEM CARD (Front & Back Faces, Dual Light Glass & Dark Neon)
// ============================================================================
export interface SystemCardProps {
  id: string;
  title: string;
  abbr: string;
  category: string;
  desc: string;
  color: string;
  icon: string;
  isFlipped: boolean;
  isDark: boolean;
  onFlip: (id: string) => void;
  onSelect: (id: string) => void;
  metrics?: { label: string; value: string }[];
}

export const FlipSystemCard: React.FC<SystemCardProps> = ({
  id,
  title,
  abbr,
  category,
  desc,
  color,
  icon,
  isFlipped,
  isDark,
  onFlip,
  onSelect,
  metrics = [
    { label: 'ROI', value: '+35%' },
    { label: 'Efficiency', value: '99.4%' },
  ],
}) => {
  const cardTheme = color || '#38bdf8';

  return (
    <div
      className="group relative h-[380px] w-full cursor-pointer select-none [perspective:1200px]"
      onClick={() => onFlip(id)}
    >
      <div
        className="relative h-full w-full rounded-2xl transition-transform duration-700 [transform-style:preserve-3d]"
        style={{ transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
      >
        {/* FRONT FACE */}
        <div
          className="absolute inset-0 flex flex-col justify-between rounded-2xl p-6 backdrop-blur-xl [backface-visibility:hidden] transition-all duration-300"
          style={{
            background: isDark
              ? `radial-gradient(circle at top right, ${cardTheme}35, transparent 70%), linear-gradient(145deg, #090e17 0%, #0d1527 100%)`
              : `linear-gradient(135deg, #ffffff 0%, ${cardTheme}12 55%, ${cardTheme}22 100%)`,
            border: `1.5px solid ${isDark ? `${cardTheme}55` : `${cardTheme}40`}`,
            boxShadow: isDark
              ? `0 0 16px ${cardTheme}25, 0 8px 32px rgba(0,0,0,0.4)`
              : `0 4px 20px -2px rgba(0,0,0,0.06), 0 0 12px ${cardTheme}15`,
          }}
        >
          {/* Header with Unified Pill Frame (NO isolated circle) */}
          <div className="flex items-center justify-between">
            <div
              className="inline-flex items-center gap-2 rounded-full border px-3 py-1.5 backdrop-blur-md"
              style={{
                backgroundColor: isDark ? `${cardTheme}18` : `${cardTheme}10`,
                borderColor: isDark ? `${cardTheme}45` : `${cardTheme}30`,
              }}
            >
              <WebIcon
                name={icon}
                className="h-4 w-4 shrink-0"
                style={{
                  color: cardTheme,
                  filter: isDark ? `drop-shadow(0 0 6px ${cardTheme})` : 'none',
                }}
              />
              <span
                className="text-xs font-bold uppercase tracking-wider"
                style={{ color: cardTheme }}
              >
                {formatCardTitle(title)}
              </span>
            </div>

            <span
              className="font-mono text-sm font-black tracking-widest"
              style={{
                color: cardTheme,
                textShadow: isDark ? `0 0 8px ${cardTheme}88` : 'none',
              }}
            >
              {abbr}
            </span>
          </div>

          {/* Description */}
          <div className="my-auto py-2">
            <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              {desc}
            </p>
          </div>

          {/* Metrics & Flip Badge */}
          <div className="flex items-center justify-between pt-3 border-t border-slate-500/20">
            <div className="flex gap-2">
              {metrics.map((m, idx) => (
                <span
                  key={idx}
                  className={`rounded-md px-2 py-0.5 text-[11px] font-semibold ${
                    isDark ? 'bg-slate-800/80 text-slate-200' : 'bg-white/80 text-slate-800'
                  }`}
                >
                  {m.label}: <strong style={{ color: cardTheme }}>{m.value}</strong>
                </span>
              ))}
            </div>

            <span
              className="text-[11px] font-medium transition-transform group-hover:translate-x-1"
              style={{ color: cardTheme }}
            >
              Lật xem →
            </span>
          </div>
        </div>

        {/* BACK FACE */}
        <div
          className="absolute inset-0 flex flex-col justify-between rounded-2xl p-6 backdrop-blur-xl [backface-visibility:hidden] [transform:rotateY(180deg)] transition-all duration-300"
          style={{
            background: isDark
              ? `linear-gradient(145deg, #090e17 0%, #0d1527 100%)`
              : `linear-gradient(135deg, #ffffff 0%, ${cardTheme}15 100%)`,
            border: `1.5px solid ${isDark ? `${cardTheme}55` : `${cardTheme}40`}`,
          }}
        >
          <div>
            <span className="text-xs font-bold uppercase" style={{ color: cardTheme }}>
              {category}
            </span>
            <h4 className={`mt-1 text-base font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Kiến Trúc & Tác Động
            </h4>
            <p className={`mt-3 text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              Hệ thống được thiết kế theo chuẩn C-Level, tích hợp sẵn pipeline tự động hóa và bảng điều khiển KPI thời gian thực.
            </p>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelect(id);
            }}
            className="w-full rounded-xl py-2.5 text-xs font-bold text-white shadow-lg transition-transform active:scale-95"
            style={{ backgroundColor: cardTheme }}
          >
            Mở Bảng Điều Khiển
          </button>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// TYPE 2: BENTO RESPONSIVE VIEW CARD (Asymmetric 12-Column Spans)
// ============================================================================
export interface BentoCardProps {
  title: string;
  role: string;
  company: string;
  period: string;
  desc: string;
  metrics: string;
  color: string;
  icon: string;
  isDark?: boolean;
}

export const BentoResponsiveCard: React.FC<BentoCardProps> = ({
  title,
  role,
  company,
  period,
  desc,
  metrics,
  color,
  icon,
  isDark = true,
}) => {
  const cardColor = color || '#38bdf8';

  return (
    <div
      className="group relative flex flex-col justify-between overflow-hidden rounded-[22px] p-6 backdrop-blur-xl transition-all duration-300 hover:shadow-2xl"
      style={{
        background: isDark
          ? `radial-gradient(circle at top right, ${cardColor}25, transparent 60%), rgba(13, 21, 39, 0.75)`
          : `linear-gradient(135deg, #ffffff 0%, ${cardColor}10 60%, ${cardColor}18 100%)`,
        border: `1.5px solid ${isDark ? `${cardColor}40` : `${cardColor}30`}`,
      }}
    >
      <div>
        {/* Header row with unified role frame */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div
            className="inline-flex items-center gap-2 rounded-full border px-3 py-1 backdrop-blur-md"
            style={{
              backgroundColor: isDark ? `${cardColor}18` : `${cardColor}10`,
              borderColor: isDark ? `${cardColor}40` : `${cardColor}30`,
            }}
          >
            <WebIcon name={icon} className="h-4 w-4 shrink-0" style={{ color: cardColor }} />
            <span className="text-xs font-bold tracking-wide" style={{ color: cardColor }}>
              {formatCardTitle(role)}
            </span>
          </div>

          <span className="font-mono text-xs font-semibold text-slate-400">{period}</span>
        </div>

        {/* Company & Title */}
        <h3 className={`mt-4 text-lg font-black tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
          {company}
        </h3>

        <p className={`mt-2 text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
          {desc}
        </p>
      </div>

      {/* Bottom Highlight Bar */}
      <div
        className="mt-6 flex items-center justify-between rounded-xl px-4 py-2.5 backdrop-blur-md border"
        style={{
          backgroundColor: isDark ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.7)',
          borderColor: isDark ? `${cardColor}30` : `${cardColor}20`,
        }}
      >
        <span className="text-xs font-medium text-slate-400">Chỉ số nổi bật:</span>
        <span className="text-xs font-black" style={{ color: cardColor }}>
          {metrics}
        </span>
      </div>
    </div>
  );
};

// ============================================================================
// TYPE 3: PASTEL GLASS GRID CARD (Equal Height Multi-Column Grid)
// ============================================================================
export interface PastelGridCardProps {
  title: string;
  category: string;
  desc: string;
  items: string[];
  color: string;
  icon: string;
  isDark?: boolean;
}

export const PastelGridCard: React.FC<PastelGridCardProps> = ({
  title,
  category,
  desc,
  items,
  color,
  icon,
  isDark = true,
}) => {
  const cardColor = color || '#a855f7';

  return (
    <div
      className="relative flex min-h-[260px] flex-col justify-between overflow-hidden rounded-2xl p-6 backdrop-blur-xl border-t-2 transition-all duration-300 hover:-translate-y-1"
      style={{
        borderTopColor: cardColor,
        background: isDark ? 'rgba(15, 23, 42, 0.7)' : 'rgba(255, 255, 255, 0.85)',
        borderLeft: `1px solid ${isDark ? `${cardColor}25` : `${cardColor}20`}`,
        borderRight: `1px solid ${isDark ? `${cardColor}25` : `${cardColor}20`}`,
        borderBottom: `1px solid ${isDark ? `${cardColor}25` : `${cardColor}20`}`,
      }}
    >
      <div>
        {/* Unified Frame */}
        <div
          className="inline-flex items-center gap-2 rounded-full border px-3 py-1"
          style={{
            backgroundColor: `${cardColor}15`,
            borderColor: `${cardColor}35`,
          }}
        >
          <WebIcon name={icon} className="h-4 w-4 shrink-0" style={{ color: cardColor }} />
          <span className="text-xs font-bold uppercase" style={{ color: cardColor }}>
            {formatCardTitle(title)}
          </span>
        </div>

        <p className={`mt-3 text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
          {desc}
        </p>
      </div>

      {/* Tag capsules */}
      <div className="mt-4 flex flex-wrap gap-1.5">
        {items.map((it, idx) => (
          <span
            key={idx}
            className={`rounded-md px-2 py-1 text-[11px] font-medium ${
              isDark ? 'bg-slate-800/70 text-slate-300' : 'bg-slate-100 text-slate-800'
            }`}
          >
            {it}
          </span>
        ))}
      </div>
    </div>
  );
};

// ============================================================================
// TYPE 4: TIMELINE MILESTONE PILL CARD (Experience & Journey Roadmap)
// ============================================================================
export interface TimelineMilestoneProps {
  year: string;
  role: string;
  company: string;
  bullets: string[];
  color: string;
  icon: string;
  isDark?: boolean;
}

export const TimelineMilestoneCard: React.FC<TimelineMilestoneProps> = ({
  year,
  role,
  company,
  bullets,
  color,
  icon,
  isDark = true,
}) => {
  const nodeColor = color || '#22c55e';

  return (
    <div className="relative pl-8 pb-10 border-l-2" style={{ borderLeftColor: `${nodeColor}40` }}>
      {/* Node Anchor */}
      <div
        className="absolute -left-[9px] top-0 h-4 w-4 rounded-full border-2 bg-white"
        style={{ borderColor: nodeColor, boxShadow: `0 0 10px ${nodeColor}` }}
      />

      {/* Unified Milestone Frame */}
      <div
        className="inline-flex flex-wrap items-center gap-2.5 rounded-full border px-3.5 py-1.5 backdrop-blur-md"
        style={{
          backgroundColor: isDark ? `${nodeColor}15` : `${nodeColor}10`,
          borderColor: isDark ? `${nodeColor}45` : `${nodeColor}35`,
        }}
      >
        <span className="font-mono text-xs font-black" style={{ color: nodeColor }}>
          {year}
        </span>
        <span className="text-slate-400">·</span>
        <WebIcon name={icon} className="h-4 w-4 shrink-0" style={{ color: nodeColor }} />
        <span className="text-xs font-bold" style={{ color: nodeColor }}>
          {formatCardTitle(role)}
        </span>
        <span className="text-slate-400">@</span>
        <span className="text-xs font-semibold text-slate-300">{company}</span>
      </div>

      {/* Bullet Points */}
      <ul className="mt-3 space-y-1.5 text-xs text-slate-300">
        {bullets.map((b, idx) => (
          <li key={idx} className="flex items-start gap-2">
            <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: nodeColor }} />
            <span>{b}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

// ============================================================================
// TYPE 5: HERO VIDEO BANNER CARD (+50px Extra Height & Crystal Clear Scrim)
// ============================================================================
export interface HeroBannerProps {
  badge: string;
  title: string;
  subtitle: string;
  videoSrc?: string;
  accentColor: string;
  icon: string;
  onCtaClick?: () => void;
}

export const HeroVideoBannerCard: React.FC<HeroBannerProps> = ({
  badge,
  title,
  subtitle,
  videoSrc,
  accentColor,
  icon,
  onCtaClick,
}) => {
  return (
    <div className="relative min-h-[290px] md:min-h-[350px] w-full overflow-hidden rounded-[26px] border border-white/20 p-8 shadow-2xl">
      {/* Video Background */}
      {videoSrc && (
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
          src={videoSrc}
        />
      )}

      {/* Crystal Clear Scrim: High Clarity for Video Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/40 via-slate-900/30 to-slate-950/40 backdrop-blur-[2px]" />

      {/* Content Layer */}
      <div className="relative z-10 flex h-full flex-col justify-between">
        <div>
          {/* Unified Frame */}
          <div
            className="inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 backdrop-blur-md"
            style={{
              backgroundColor: `${accentColor}20`,
              borderColor: `${accentColor}50`,
            }}
          >
            <WebIcon name={icon} className="h-4 w-4 shrink-0" style={{ color: accentColor }} />
            <span className="text-xs font-bold uppercase tracking-wider" style={{ color: accentColor }}>
              {formatCardTitle(badge)}
            </span>
          </div>

          <h1 className="mt-4 text-2xl md:text-4xl font-black text-white tracking-tight drop-shadow-md">
            {title}
          </h1>

          <p className="mt-2 max-w-2xl text-sm md:text-base text-slate-200 drop-shadow">
            {subtitle}
          </p>
        </div>

        {onCtaClick && (
          <div className="mt-6">
            <button
              onClick={onCtaClick}
              className="rounded-xl px-5 py-2.5 text-xs font-bold text-white shadow-lg transition-transform active:scale-95"
              style={{ backgroundColor: accentColor }}
            >
              Khám Phá Chi Tiết →
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
