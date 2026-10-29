'use client';

import React, { useMemo } from 'react';
import {
  Sparkles,
  SlidersHorizontal,
  X,
  CheckCircle2,
  Layers,
  Wand2,
} from 'lucide-react';
import {
  BannerConfig16x3,
  BANNER_TEXT_ANIMATIONS,
} from '@/data/bannerStudioData';
import { SiteTheme } from '@/types';
import { SoundEngine } from '@/components/ui/SoundEngine';

export interface GlobalPageBanner16x3Props {
  config: BannerConfig16x3;
  currentTheme?: SiteTheme;
  isStudioPreview?: boolean;
  showSafeZoneGuides?: boolean;
  onEditInStudio?: (pageId: number) => void;
  onRemoveFromPage?: (pageId: number) => void;
  onCycleAnimation?: () => void;
}

export const GlobalPageBanner16x3: React.FC<GlobalPageBanner16x3Props> = ({
  config,
  currentTheme = 'light-glass',
  isStudioPreview = false,
  showSafeZoneGuides = false,
  onEditInStudio,
  onRemoveFromPage,
  onCycleAnimation,
}) => {
  const isDark = currentTheme === 'dark-neon';

  // Tạo Data URL cho AI SVG nếu đang dùng chế độ nền AI SVG
  const aiSvgDataUrl = useMemo(() => {
    if (config.backgroundType === 'ai-svg' && config.aiSvgMarkup) {
      return `data:image/svg+xml;utf8,${encodeURIComponent(config.aiSvgMarkup)}`;
    }
    return '';
  }, [config.backgroundType, config.aiSvgMarkup]);

  const effectiveBgUrl =
    config.backgroundType === 'ai-svg' && aiSvgDataUrl
      ? aiSvgDataUrl
      : config.backgroundUrl;

  const animMeta =
    BANNER_TEXT_ANIMATIONS.find((a) => a.id === config.textAnimation) ||
    BANNER_TEXT_ANIMATIONS[0];

  // Tính toán độ phủ lớp kính (Ở giao diện Sáng Glass UI Đa Sắc, nếu overlayOpacity <= 45 thì hiển thị phong cách Light Frosted Pastel Glass trong trẻo)
  const isLightFrostedMode = !isDark && config.overlayOpacity <= 48;

  const scrimBackground = isLightFrostedMode
    ? `linear-gradient(95deg, rgba(255, 255, 255, 0.92) 0%, rgba(245, 247, 253, 0.84) 55%, rgba(255, 255, 255, 0.62) 100%)`
    : `linear-gradient(95deg, rgba(9, 13, 22, ${Math.min(
        0.95,
        (config.overlayOpacity || 62) / 100 + 0.16
      )}) 0%, rgba(15, 23, 42, ${
        (config.overlayOpacity || 62) / 100
      }) 58%, rgba(15, 23, 42, ${Math.max(
        0.28,
        (config.overlayOpacity || 62) / 100 - 0.18
      )}) 100%)`;

  const primaryTextColor = isLightFrostedMode ? '#1E1B4B' : '#FFFFFF';
  const secondaryTextColor = isLightFrostedMode
    ? '#334155'
    : 'rgba(226, 232, 240, 0.92)';

  return (
    <div
      className={`group/banner16x3 relative w-full aspect-[16/3] min-h-[156px] sm:min-h-[178px] md:min-h-[205px] rounded-[18px] overflow-hidden shrink-0 transition-all duration-300 select-none ${
        isDark
          ? 'border border-cyan-400/40 shadow-[0_14px_34px_-6px_rgba(0,0,0,0.7),0_0_20px_rgba(34,211,238,0.16)]'
          : 'border border-white/90 shadow-[0_12px_32px_0_rgba(100,110,140,0.12),inset_0_1px_2px_rgba(255,255,255,0.95)]'
      }`}
      style={{
        ['--banner-accent' as string]: config.accentColor || '#0284c7',
        ['--banner-secondary' as string]: config.secondaryColor || '#6366f1',
      }}
    >
      {/* Keyframes cho 6 hiệu ứng chữ chuyển động (Kinetic Typography) */}
      <style>{`
        @keyframes bannerShimmer16x3 {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        @keyframes bannerFloat16x3 {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-4px); }
        }
        @keyframes bannerPulse16x3 {
          0%, 100% { filter: drop-shadow(0 0 2px var(--banner-accent)); }
          50% { filter: drop-shadow(0 0 12px var(--banner-accent)); }
        }
        @keyframes bannerScanline16x3 {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(220%); }
        }
        @keyframes bannerSlideUp16x3 {
          0% { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .banner-anim-shimmer .kinetic-title-16x3 {
          background: linear-gradient(90deg, ${primaryTextColor} 0%, var(--banner-accent) 45%, var(--banner-secondary) 55%, ${primaryTextColor} 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: bannerShimmer16x3 5.5s linear infinite;
        }
        .banner-anim-float-glow .kinetic-title-16x3 {
          animation: bannerFloat16x3 4s ease-in-out infinite;
        }
        .banner-anim-neon-pulse .kinetic-title-16x3 {
          animation: bannerPulse16x3 3s ease-in-out infinite;
        }
        .banner-anim-slide-up .kinetic-title-16x3 {
          animation: bannerSlideUp16x3 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>

      {/* 1. Lớp nền Hình ảnh / AI SVG / Mesh Gradient tỷ lệ 16:3 */}
      <div
        className="absolute inset-0 w-full h-full transition-transform duration-700 ease-out group-hover/banner16x3:scale-[1.02]"
        style={{
          backgroundImage:
            config.backgroundType === 'mesh-gradient' && config.meshGradientCss
              ? config.meshGradientCss
              : effectiveBgUrl
              ? `url("${effectiveBgUrl}")`
              : undefined,
          backgroundSize:
            config.backgroundType === 'mesh-gradient'
              ? 'cover'
              : `${config.bgZoom || 105}%`,
          backgroundPosition: `center ${config.bgPositionY ?? 48}%`,
          backgroundRepeat: 'no-repeat',
          filter:
            config.blurAmount > 0 ? `blur(${config.blurAmount}px)` : undefined,
        }}
      />

      {/* 2. Lớp Hào Quang Pastel Đa Sắc (Iris, Peach, Mint, Sky, Rose, Violet) */}
      <div
        className="absolute -top-16 -left-10 w-64 h-64 rounded-full pointer-events-none blur-3xl opacity-55"
        style={{ background: config.accentColor }}
      />
      <div
        className="absolute -bottom-16 right-1/4 w-72 h-72 rounded-full pointer-events-none blur-3xl opacity-45"
        style={{ background: config.secondaryColor || '#8b5cf6' }}
      />

      {/* 3. Lớp phủ Contrast Scrim thích ứng Sáng / Tối */}
      <div
        className="absolute inset-0 pointer-events-none transition-all duration-300"
        style={{ background: scrimBackground }}
      />

      {/* 4. Lưới tọa độ kỹ thuật 16:3 & Khung HUD (nếu bật) */}
      {(config.showGridOverlay || config.templateId === 'cyber-hud') && (
        <div
          className="absolute inset-0 pointer-events-none opacity-25"
          style={{
            backgroundImage: `linear-gradient(to right, ${
              isLightFrostedMode ? 'rgba(99,102,241,0.14)' : 'rgba(255,255,255,0.08)'
            } 1px, transparent 1px), linear-gradient(to bottom, ${
              isLightFrostedMode ? 'rgba(99,102,241,0.14)' : 'rgba(255,255,255,0.08)'
            } 1px, transparent 1px)`,
            backgroundSize: '42px 42px',
          }}
        />
      )}

      {/* Hiệu ứng Tia quét Laser ngang cho chế độ scanline hoặc cyber-hud */}
      {(config.textAnimation === 'scanline' || config.templateId === 'cyber-hud') && (
        <div
          className="absolute inset-y-0 w-1/3 pointer-events-none opacity-35"
          style={{
            background: `linear-gradient(90deg, transparent, ${config.accentColor}66, transparent)`,
            animation: 'bannerScanline16x3 4.8s ease-in-out infinite',
          }}
        />
      )}

      {/* Đường viền ánh sáng phía trên chuẩn Glass UI */}
      <div
        className="absolute top-0 inset-x-0 h-[3px] pointer-events-none z-10"
        style={{
          background: `linear-gradient(90deg, transparent 0%, ${config.accentColor} 30%, ${
            config.secondaryColor || '#6366f1'
          } 70%, transparent 100%)`,
        }}
      />

      {/* Khung lưới căn chỉnh Safe-Zone 16:3 (chỉ bật khi thiết kế trong Studio) */}
      {showSafeZoneGuides && (
        <div className="absolute inset-3 border border-dashed border-cyan-400/70 rounded-xl pointer-events-none z-30 flex items-start justify-between p-1.5">
          <span className="px-2 py-0.5 rounded bg-slate-950/80 text-cyan-300 font-mono text-[10px] font-bold">
            SAFE ZONE 16:3 · 1920 × 360 PX
          </span>
          <span className="px-2 py-0.5 rounded bg-slate-950/80 text-amber-300 font-mono text-[10px] font-bold">
            ASPECT RATIO 5.33 : 1
          </span>
        </div>
      )}

      {/* 5. Nội dung chính của Banner 16:3 */}
      <div
        className={`relative z-20 w-full h-full px-4 sm:px-6 md:px-8 py-3 sm:py-4 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-3 sm:gap-5 ${animMeta.cssClass} ${
          config.textAlign === 'center' || config.templateId === 'editorial-clean'
            ? 'lg:flex-col lg:items-center lg:justify-center text-center'
            : 'text-left'
        }`}
      >
        {/* Phân khu Trái: Biểu tượng 3D (nếu chọn mẫu emblem-3d) + Kicker + Tiêu đề Play + Phụ đề */}
        <div
          className={`flex items-center gap-3.5 sm:gap-4 min-w-0 flex-1 ${
            config.textAlign === 'center' || config.templateId === 'editorial-clean'
              ? 'flex-col justify-center max-w-3xl mx-auto'
              : ''
          }`}
        >
          {config.showEmblem && config.emblemImage && (
            <div
              className={`hidden sm:flex w-14 h-14 md:w-16 md:h-16 rounded-2xl items-center justify-center shrink-0 p-2 border backdrop-blur-xl transition-transform duration-500 group-hover/banner16x3:scale-105 group-hover/banner16x3:-rotate-3 ${
                isLightFrostedMode
                  ? 'bg-white/80 border-white shadow-[0_8px_24px_rgba(100,110,140,0.14)]'
                  : 'bg-white/10 border-white/25 shadow-[0_8px_24px_rgba(0,0,0,0.35)]'
              }`}
              style={{
                boxShadow: `0 8px 24px -4px ${config.accentColor}40`,
              }}
            >
              <img
                src={config.emblemImage}
                alt={config.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain drop-shadow-md"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            </div>
          )}

          <div className="min-w-0 flex-1 space-y-1">
            {/* Dòng Kicker & Nhãn mẫu 16:3 */}
            <div
              className={`flex items-center gap-2 flex-wrap ${
                config.textAlign === 'center' || config.templateId === 'editorial-clean'
                  ? 'justify-center'
                  : 'justify-start'
              }`}
            >
              <span
                className="inline-flex items-center gap-1 text-[10.5px] sm:text-[11.5px] font-bold tracking-wider uppercase font-play"
                style={{ color: config.accentColor }}
              >
                <Sparkles className="w-3.5 h-3.5 shrink-0" />
                <span>{config.kickerBadge}</span>
              </span>
              <span
                aria-hidden="true"
                className={isLightFrostedMode ? 'text-slate-400' : 'text-slate-400/70'}
              >
                ·
              </span>
              <span
                className={`text-[10.5px] font-mono font-semibold tabular-nums ${
                  isLightFrostedMode ? 'text-slate-600' : 'text-slate-300'
                }`}
              >
                16:3 Panorama
              </span>
            </div>

            {/* Tiêu đề chính (Kinetic Typography) */}
            <h2
              className="kinetic-title-16x3 font-play font-bold tracking-tight leading-snug line-clamp-2 break-words"
              style={{
                color: primaryTextColor,
                fontSize: 'clamp(1.08rem, 1.55vw, 1.52rem)',
              }}
            >
              {config.title}
              {config.textAnimation === 'typewriter' && (
                <span
                  className="inline-block w-2 h-4 ml-1 align-middle animate-pulse"
                  style={{ backgroundColor: config.accentColor }}
                />
              )}
            </h2>

            {/* Phụ đề tóm tắt */}
            <p
              className="text-xs sm:text-[13px] leading-relaxed line-clamp-2 font-medium max-w-3xl"
              style={{ color: secondaryTextColor }}
            >
              {config.subtitle}
            </p>
          </div>
        </div>

        {/* Phân khu Phải: 3 Thẻ Chỉ Số KPI Glassmorphism */}
        {config.metrics &&
          config.metrics.length > 0 &&
          config.templateId !== 'editorial-clean' && (
            <div className="flex items-stretch gap-2 sm:gap-2.5 shrink-0 w-full lg:w-auto overflow-x-auto no-scrollbar pt-1 lg:pt-0">
              {config.metrics.slice(0, 3).map((metric, idx) => (
                <div
                  key={idx}
                  className={`min-w-[112px] sm:min-w-[126px] px-3 py-2 rounded-2xl border backdrop-blur-xl flex flex-col justify-center transition-all duration-300 hover:-translate-y-0.5 ${
                    isLightFrostedMode
                      ? 'bg-white/80 border-white/95 shadow-[0_8px_20px_rgba(100,110,140,0.08)] text-slate-800'
                      : 'bg-slate-900/70 border-white/15 shadow-[0_8px_20px_rgba(0,0,0,0.35)] text-white'
                  }`}
                  style={{
                    borderColor: isLightFrostedMode
                      ? `${config.accentColor}40`
                      : `${config.accentColor}55`,
                  }}
                >
                  <div
                    className="text-sm sm:text-base md:text-[17px] font-bold font-play tabular-nums leading-tight truncate"
                    style={{ color: config.accentColor }}
                  >
                    {metric.value}
                  </div>
                  <div
                    className={`text-[11px] font-bold leading-tight mt-0.5 truncate ${
                      isLightFrostedMode ? 'text-slate-800' : 'text-slate-100'
                    }`}
                  >
                    {metric.label}
                  </div>
                  {metric.sub && (
                    <div
                      className={`text-[9.5px] font-medium truncate mt-0.5 ${
                        isLightFrostedMode ? 'text-slate-500' : 'text-slate-400'
                      }`}
                    >
                      {metric.sub}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
      </div>

      {/* 6. Thanh công cụ nổi nhanh góc phải trên khi hiển thị trên các trang của Website */}
      {!isStudioPreview && (onEditInStudio || onRemoveFromPage || onCycleAnimation) && (
        <div className="absolute top-2.5 right-2.5 z-30 flex items-center gap-1.5 opacity-0 group-hover/banner16x3:opacity-100 transition-opacity duration-200">
          {onCycleAnimation && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                SoundEngine.playTap();
                onCycleAnimation();
              }}
              className="px-2.5 py-1 rounded-xl text-[11px] font-bold bg-white/90 hover:bg-white text-slate-800 border border-white shadow-md backdrop-blur-md flex items-center gap-1 cursor-pointer transition"
              title="Đổi hiệu ứng chữ chuyển động trên Banner 16:3"
            >
              <Wand2 className="w-3 h-3 text-indigo-600" />
              <span>Hiệu ứng chữ</span>
            </button>
          )}
          {onEditInStudio && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                SoundEngine.playTap();
                onEditInStudio(config.targetPageId);
              }}
              className="px-2.5 py-1 rounded-xl text-[11px] font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-md flex items-center gap-1 cursor-pointer transition"
              title="Mở Studio chỉnh sửa Banner 16:3 của trang này"
            >
              <SlidersHorizontal className="w-3 h-3" />
              <span>Sửa Banner 16:3</span>
            </button>
          )}
          {onRemoveFromPage && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                SoundEngine.playTap();
                onRemoveFromPage(config.targetPageId);
              }}
              className="w-7 h-7 rounded-xl bg-rose-500/90 hover:bg-rose-600 text-white shadow-md flex items-center justify-center cursor-pointer transition"
              title="Ẩn Banner 16:3 khỏi trang này"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      )}
    </div>
  );
};
