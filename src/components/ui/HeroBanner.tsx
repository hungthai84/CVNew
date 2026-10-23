'use client';

import React from 'react';
import { WebIcon } from './WebIcon';

export interface HeroBannerProps {
  badgeText?: string;
  title: string;
  titleIcon?: string;
  subtitle?: string; // Kept for prop type compatibility, unused in render per user requirement
  quote?: string;
  quoteAuthor?: string;
  videoSrc?: string;
  posterSrc?: string;
  imageSrc?: string;
  hideTextOverlay?: boolean;
  badgeColor?: string;
  titleColor?: string;
  orientation?: 'horizontal' | 'vertical';
  bottomControls?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
}

export const EDUCATION_BANNER_VIDEO =
  'https://cdn.scena.ai/project/10223/04736de7d6f897113c708e6f5ef4a3fdb18e7ca16a35113744667f1adcd6142b.mp4';
export const PROJECTS_BANNER_VIDEO =
  'https://cdn.scena.ai/project/10223/7aed89cdf840dad2b1adad177bdd91b7df0cb825e5ab35a9640a65bd04d4ca9a.mp4';

/**
 * Định dạng tiêu đề chính trong Banner:
 * Chỉ viết hoa chữ đầu, còn lại chữ viết thường (Sentence Case).
 */
export function formatBannerTitle(rawTitle: string): string {
  if (!rawTitle) return '';
  const trimmed = rawTitle.trim();
  if (!trimmed) return '';
  const words = trimmed.split(/\s+/);
  const max4Words = words.slice(0, 4).join(' ');
  return max4Words.charAt(0).toUpperCase() + max4Words.slice(1).toLowerCase();
}

// Tự động phân giải icon nếu không truyền vào trực tiếp
function resolveTitleIcon(title: string, badge?: string, propIcon?: string): string {
  if (propIcon) return propIcon;
  const t = (title + ' ' + (badge || '')).toLowerCase();
  if (t.includes('học vấn') || t.includes('chứng chỉ') || t.includes('học tập')) return 'graduation';
  if (t.includes('kỹ năng') || t.includes('swot') || t.includes('năng lực')) return 'bolt';
  if (t.includes('kinh nghiệm') || t.includes('hành trình') || t.includes('sự nghiệp')) return 'briefcase';
  if (t.includes('dự án') || t.includes('thành tựu')) return 'target';
  if (t.includes('hệ thống') || t.includes('kiến trúc') || t.includes('phân hệ')) return 'layers';
  if (t.includes('lĩnh vực') || t.includes('hoạt động') || t.includes('khám phá')) return 'globe';
  if (t.includes('phỏng vấn') || t.includes('đối thoại')) return 'chat';
  if (t.includes('tử vi') || t.includes('phong thủy')) return 'sparkles';
  if (t.includes('hình nền') || t.includes('giao diện')) return 'grid';
  if (t.includes('liên hệ') || t.includes('kết nối')) return 'phone';
  if (t.includes('kỷ niệm') || t.includes('hồi ức')) return 'heart';
  if (t.includes('thư ngỏ') || t.includes('tri ân')) return 'mail';
  return 'sparkles';
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  badgeText = 'Khám phá',
  title,
  titleIcon,
  quote,
  quoteAuthor,
  videoSrc,
  imageSrc,
  hideTextOverlay = false,
  badgeColor = 'text-amber-400',
  titleColor = 'text-amber-400',
  orientation = 'horizontal',
  bottomControls,
  className = '',
  children,
}) => {
  // Banner ngang tạm dùng link video banner học vấn, banner dọc dùng link banner dự án
  const activeVideoSrc =
    orientation === 'vertical' ? PROJECTS_BANNER_VIDEO : EDUCATION_BANNER_VIDEO;

  // Chỉ viết hoa chữ đầu, còn lại chữ viết thường
  const displayTitle = formatBannerTitle(title);
  const iconName = resolveTitleIcon(title, badgeText, titleIcon);

  return (
    <div
      className={`hero-banner theme-hero-banner relative border-0 border-none outline-none shadow-none shrink-0 bg-slate-900/20 ${
        orientation === 'vertical' ? 'overflow-visible' : 'overflow-hidden'
      } select-none transition-all duration-300 ${
        orientation === 'vertical'
          ? 'w-full lg:w-[300px] min-w-[300px] max-w-[300px] h-full min-h-full flex flex-col justify-between'
          : 'w-full rounded-[22px] sm:rounded-[24px]'
      } ${className}`}
    >
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes banner-icon-bob {
          0%, 100% {
            transform: translateY(0px) scale(1);
          }
          50% {
            transform: translateY(-3px) scale(1.12);
          }
        }
        .animate-banner-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          animation: banner-icon-bob 2.2s ease-in-out infinite;
        }
      `,
        }}
      />

      {/* Hình nền Video MP4 / Hình ảnh rõ nét (opacity 95%, brightness 1.15, contrast 1.05) */}
      {activeVideoSrc ? (
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover object-center select-none pointer-events-none opacity-95 brightness-[1.15] contrast-[1.05]"
        >
          <source src={activeVideoSrc} type="video/mp4" />
        </video>
      ) : imageSrc ? (
        <img
          src={imageSrc}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover object-center select-none pointer-events-none opacity-95 brightness-[1.15] contrast-[1.05]"
        />
      ) : null}

      {/* Lớp phủ rất nhẹ bảo đảm giữ rõ nền video */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/25 via-transparent to-slate-950/15 pointer-events-none" />

      {/* Nội dung co giãn linh hoạt bên trong banner theo kích thước màn hình */}
      <div className="relative z-10 p-3.5 sm:p-4 lg:p-5 flex flex-col justify-between pointer-events-none overflow-hidden w-full h-full min-h-0 flex-1">
        {!hideTextOverlay ? (
          <div
            className={`w-full flex-1 min-h-0 flex ${
              orientation === 'vertical'
                ? 'flex-col items-start justify-between gap-3'
                : 'flex-row items-start justify-between gap-3'
            }`}
          >
            {/* Khối bên trái: Badge + Tiêu đề chính (Có Icon chuyển động tại chỗ KHÔNG đóng khung, Màu tiêu đề GIỐNG HỆT màu icon, Chỉ viết hoa chữ đầu, XÓA sub tiêu đề) */}
            <div className="flex flex-col items-start pointer-events-auto min-w-0 flex-1">
              {badgeText && (
                <span
                  className={`font-handwriting font-bold text-lg sm:text-2xl lg:text-3xl leading-tight drop-shadow-md select-none truncate ${badgeColor}`}
                >
                  {badgeText}
                </span>
              )}

              <h2
                className={`text-base sm:text-xl md:text-2xl lg:text-[26px] font-black font-play tracking-tight leading-tight mt-0.5 select-none flex items-center gap-2 ${titleColor}`}
                style={{
                  textShadow: '0 2px 6px rgba(0,0,0,0.85), 0 0 2px rgba(0,0,0,0.9)',
                }}
              >
                {/* Icon chuyển động tại chỗ KHÔNG ĐÓNG KHUNG */}
                <span className={`animate-banner-icon shrink-0 ${titleColor}`}>
                  <WebIcon name={iconName} className="w-5 h-5 sm:w-6 sm:h-6" />
                </span>
                {/* Tiêu đề có màu trùng khớp màu icon, chỉ viết hoa chữ đầu */}
                <span className="truncate">{displayTitle}</span>
              </h2>

              <div className="w-12 sm:w-16 h-1.5 rounded-full bg-gradient-to-r from-amber-400 via-orange-400 to-amber-300 shadow-md mt-2 shrink-0" />
            </div>

            {/* Khối bên phải: Câu nói hay FORMAT CHỮ MÀU VÀNG */}
            {quote && (
              <div
                className={`pointer-events-auto flex flex-col pt-0.5 min-w-0 ${
                  orientation === 'vertical'
                    ? 'items-start text-left w-full mt-2'
                    : 'items-end text-right hidden sm:flex max-w-[48%]'
                }`}
              >
                <p
                  className="font-banner-quote text-xl sm:text-2xl md:text-3xl lg:text-[32px] text-white/95 font-bold leading-tight select-none"
                  style={{
                    textShadow: '0 2px 8px rgba(0,0,0,0.8)',
                  }}
                >
                  {quote}
                </p>
                {quoteAuthor && (
                  <span
                    className="text-[10.5px] sm:text-[11.5px] font-extrabold text-slate-200 mt-0.5 block tracking-wider font-play"
                    style={{
                      textShadow: '0 1px 4px rgba(0,0,0,0.8)',
                    }}
                  >
                    {quoteAuthor}
                  </span>
                )}
                <div className="w-20 sm:w-28 h-[1.5px] bg-gradient-to-r from-transparent via-amber-400 to-transparent relative mt-1 flex items-center justify-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-xs" />
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="w-full flex-1" />
        )}

        {children}

        {/* Controls dưới cùng nếu có */}
        {bottomControls && (
          <div className="w-full flex items-center justify-between pointer-events-auto pt-1 shrink-0">
            {bottomControls}
          </div>
        )}
      </div>
    </div>
  );
};
