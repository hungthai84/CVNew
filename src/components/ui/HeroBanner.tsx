'use client';

import React from 'react';
import { WebIcon } from './WebIcon';

export interface HeroBannerProps {
  badgeText?: string;
  title: string;
  titleIcon?: string;
  subtitle: string;
  quote?: string;
  quoteAuthor?: string;
  videoSrc?: string;
  posterSrc?: string;
  imageSrc?: string;
  hideTextOverlay?: boolean;
  badgeColor?: string;
  themeColor?: string;
  bottomControls?: React.ReactNode;
  className?: string;
}

/**
 * Định dạng tiêu đề chính trong Banner thành đúng 4 từ:
 * Viết hoa chữ đầu mỗi từ, còn lại viết thường (Title Case).
 */
export function formatBannerTitle(rawTitle: string): string {
  if (!rawTitle) return '';
  const clean = rawTitle.replace(/[-–—&•·/,:;()]/g, ' ').replace(/\s+/g, ' ').trim();
  const words = clean.split(' ').filter(Boolean);
  if (words.length === 0) return '';
  const selectedWords = words.slice(0, 4);
  return selectedWords
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
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

// Tự động phân giải màu icon và tiêu đề theo đúng màu menu icon ở trang (PAGES theme color)
function resolvePageThemeColor(title: string, badge?: string, overrideColor?: string): string {
  if (overrideColor) return overrideColor;
  const t = (title + ' ' + (badge || '')).toLowerCase();
  if (t.includes('học vấn') || t.includes('chứng chỉ') || t.includes('học tập')) return '#059669'; // Emerald (Học Vấn - Page 3)
  if (t.includes('kỹ năng') || t.includes('swot') || t.includes('năng lực')) return '#0891b2'; // Cyan (Kỹ Năng - Page 6)
  if (t.includes('kinh nghiệm') || t.includes('hành trình') || t.includes('sự nghiệp')) return '#4f46e5'; // Indigo (Kinh Nghiệm - Page 5)
  if (t.includes('dự án') || t.includes('thành tựu')) return '#9333ea'; // Purple (Dự Án - Page 7)
  if (t.includes('hệ thống') || t.includes('kiến trúc') || t.includes('phân hệ')) return '#ea580c'; // Orange (Hệ Thống - Page 8)
  if (t.includes('lĩnh vực') || t.includes('hoạt động') || t.includes('khám phá')) return '#f59e0b'; // Amber (Lĩnh Vực - Page 4)
  if (t.includes('phỏng vấn') || t.includes('đối thoại')) return '#ec4899'; // Pink (Phỏng Vấn - Page 9)
  if (t.includes('tử vi') || t.includes('phong thủy') || t.includes('cung mệnh')) return '#c026d3'; // Fuchsia (Tử Vi - Page 10)
  if (t.includes('hình nền') || t.includes('giao diện')) return '#6366f1'; // Indigo (Hình Nền - Page 13)
  if (t.includes('liên hệ') || t.includes('kết nối')) return '#2563eb'; // Blue (Liên Hệ - Page 12)
  if (t.includes('kỷ niệm') || t.includes('hồi ức')) return '#e11d48'; // Rose (Kỷ Niệm - Page 11)
  if (t.includes('thư ngỏ') || t.includes('tri ân') || t.includes('đối tác')) return '#e11d48'; // Rose (Thư Ngỏ - Page 1)
  if (t.includes('giới thiệu') || t.includes('hồ sơ')) return '#8b5cf6'; // Violet (Giới Thiệu - Page 2)
  return '#f59e0b';
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  badgeText = 'Khám phá',
  title,
  titleIcon,
  subtitle,
  quote,
  quoteAuthor,
  videoSrc = '/videos/domains-banner.mp4',
  posterSrc,
  imageSrc,
  hideTextOverlay = false,
  badgeColor = 'text-sky-600',
  themeColor,
  bottomControls,
  className = '',
}) => {
  // Ưu tiên video MP4: Khi có videoSrc thì phát trực tiếp, làm sáng rõ video nền
  const hasVideo = Boolean(videoSrc);
  const displayTitle = formatBannerTitle(title);
  const iconName = resolveTitleIcon(title, badgeText, titleIcon);
  const pageThemeColor = resolvePageThemeColor(title, badgeText, themeColor);

  return (
    <div
      className={`hero-banner theme-hero-banner relative border-none shadow-sm shrink-0 bg-slate-900/40 overflow-hidden ${className}`}
    >
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes banner-icon-bob {
          0%, 100% {
            transform: translateY(0px) scale(1);
          }
          50% {
            transform: translateY(-3.5px) scale(1.1);
          }
        }
        .animate-banner-icon {
          display: inline-flex;
          animation: banner-icon-bob 2.8s ease-in-out infinite;
          filter: drop-shadow(0 2px 4px rgba(0,0,0,0.4));
        }
      `,
        }}
      />

      {/* Hình nền Video MP4 trực tiếp làm sáng rõ nét (brightness 1.05, contrast 1.05) */}
      {hasVideo ? (
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover object-center select-none pointer-events-none brightness-[1.05] contrast-[1.04]"
        >
          <source src={videoSrc} type="video/mp4" />
          <source
            src="https://cdn.scena.ai/project/10169/e07c498cfd5e7e1a0a537b3f12eeaaf42cb878f5300f99d73c9b02a7aa05efce.mp4"
            type="video/mp4"
          />
        </video>
      ) : imageSrc ? (
        <img
          src={imageSrc}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover object-center select-none pointer-events-none brightness-[1.05] contrast-[1.04]"
        />
      ) : null}

      {/* Lớp phủ mỏng trong suốt để đảm bảo nhìn rõ nền video trong khi chữ vẫn dễ đọc */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/35 via-transparent to-black/25 pointer-events-none" />

      {/* Lớp nội dung chữ trên banner */}
      <div className="absolute inset-0 z-10 px-4 sm:px-6 py-3 sm:py-3.5 flex flex-col justify-between pointer-events-none">
        {/* Hàng chữ phía trên/giữa: Tiêu đề bên trái, Câu nói hay bên phải */}
        {!hideTextOverlay ? (
          <div className="flex items-start justify-between gap-3 w-full">
            {/* Khối chữ bên trái: Badge viết tay + Tiêu đề chính + Subtitle + Thanh cam */}
            <div className="flex flex-col items-start pointer-events-auto max-w-[62%] sm:max-w-[50%]">
              <span
                className={`font-handwriting font-bold text-xl sm:text-2xl lg:text-3xl leading-tight drop-shadow-xs select-none ${badgeColor}`}
              >
                {badgeText}
              </span>

              {/* Tiêu đề có icon chuyển động tại chỗ đứng trước, màu tiêu đề giống màu icon và màu menu icon ở trang */}
              <h2
                className="text-base sm:text-xl md:text-2xl lg:text-[26px] font-black font-play tracking-tight leading-tight mt-0.5 select-none flex items-center gap-2"
                style={{ color: pageThemeColor }}
              >
                <span className="animate-banner-icon shrink-0" style={{ color: pageThemeColor }}>
                  <WebIcon name={iconName} className="w-5 h-5 sm:w-6 sm:h-6" />
                </span>
                <span>{displayTitle}</span>
              </h2>

              <p className="text-[11px] sm:text-xs md:text-sm font-semibold text-slate-800 tracking-normal mt-0.5 drop-shadow-2xs select-none">
                {subtitle}
              </p>
              <div className="w-12 sm:w-16 h-1.5 rounded-full bg-gradient-to-r from-amber-500 via-orange-500 to-amber-400 shadow-xs mt-1.5" />
            </div>

            {/* Khối chữ bên phải: Câu trích dẫn với chữ màu vàng, chỉ để font chữ màu vàng (xóa viền line đen) */}
            {quote && (
              <div className="hidden sm:flex flex-col items-end text-right pointer-events-auto max-w-[48%] lg:max-w-[44%] pt-0.5">
                <div className="p-1 sm:p-1.5 bg-transparent border-none shadow-none flex flex-col items-end">
                  <p className="font-banner-quote text-2xl sm:text-3xl lg:text-[34px] text-amber-300 font-normal leading-tight select-none">
                    {quote}
                  </p>
                  {quoteAuthor && (
                    <span className="text-[10.5px] sm:text-[11.5px] font-bold text-amber-200/90 mt-0.5 block tracking-wider font-play">
                      {quoteAuthor}
                    </span>
                  )}
                  <div className="w-20 sm:w-28 h-[1.5px] bg-gradient-to-r from-transparent via-amber-400 to-transparent relative mt-1 flex items-center justify-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-xs" />
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="w-full flex-1" />
        )}

        {/* Hàng dưới cùng: Nhóm nút lọc / công cụ với nền trong suốt */}
        {bottomControls && (
          <div className="w-full flex items-center justify-between pointer-events-auto pt-1">
            {bottomControls}
          </div>
        )}
      </div>
    </div>
  );
};

