'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Minimize2,
  Maximize2,
  PanelLeft,
  PanelRight,
  Play,
  Pause,
  Film,
  Sparkles,
  Check,
  RotateCcw,
  Layers,
} from 'lucide-react';
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
  onOrientationChange?: (orientation: 'horizontal' | 'vertical') => void;
  bottomControls?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
}

export const EDUCATION_BANNER_VIDEO =
  'https://cdn.scena.ai/project/10223/04736de7d6f897113c708e6f5ef4a3fdb18e7ca16a35113744667f1adcd6142b.mp4';
export const PROJECTS_BANNER_VIDEO =
  'https://cdn.scena.ai/project/10223/7aed89cdf840dad2b1adad177bdd91b7df0cb825e5ab35a9640a65bd04d4ca9a.mp4';

export type BannerMediaPreset = 'auto' | 'education' | 'projects' | 'minimal';
export type BannerPinSide = 'left' | 'right';

const GLOBAL_ORIENT_KEY = 'hb_global_orient_v1';
const GLOBAL_COMPACT_KEY = 'hb_global_compact_v1';
const GLOBAL_PIN_KEY = 'hb_global_pin_v1';
const GLOBAL_MEDIA_PRESET_KEY = 'hb_media_preset_v1';
const GLOBAL_VIDEO_PAUSED_KEY = 'hb_video_paused_v1';

interface GlobalBannerSyncDetail {
  orientation?: 'horizontal' | 'vertical' | null;
  compact?: boolean | null;
  pinSide?: BannerPinSide | null;
  mediaPreset?: BannerMediaPreset;
  videoPaused?: boolean;
  resetAll?: boolean;
}

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
  imageSrc,
  hideTextOverlay = false,
  titleColor = 'text-amber-400',
  orientation = 'horizontal',
  onOrientationChange,
  bottomControls,
  className = '',
  children,
}) => {
  const displayTitle = formatBannerTitle(title);
  const slug = displayTitle.toLowerCase().replace(/\s+/g, '_');
  const storageKey = `hb_orient_v1_${slug}`;
  const compactKey = `hb_compact_v1_${slug}`;
  const pinKey = `hb_pin_v1_${slug}`;

  // Mặc định các trang có prop orientation="vertical" (Kỹ năng, Dự án, Hệ thống) nằm bên Phải,
  // các trang mặc định Ngang khi chuyển sang Dọc nằm bên Trái
  const defaultPinSide: BannerPinSide = orientation === 'vertical' ? 'right' : 'left';

  const [currentOrientation, setCurrentOrientation] = useState<'horizontal' | 'vertical'>(
    orientation
  );
  const [isCompact, setIsCompact] = useState<boolean>(false);
  const [pinSide, setPinSide] = useState<BannerPinSide>(defaultPinSide);
  const [mediaPreset, setMediaPreset] = useState<BannerMediaPreset>('auto');
  const [isVideoPaused, setIsVideoPaused] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const menuContainerRef = useRef<HTMLDivElement | null>(null);
  const toastTimerRef = useRef<number | null>(null);

  const showBannerToast = (msg: string) => {
    setToastMessage(msg);
    if (toastTimerRef.current) {
      window.clearTimeout(toastTimerRef.current);
    }
    toastTimerRef.current = window.setTimeout(() => {
      setToastMessage(null);
    }, 2600);
  };

  // Khởi tạo và đồng bộ trạng thái đã lưu của người dùng (ưu tiên cài đặt riêng từng trang, sau đó tới toàn cục)
  useEffect(() => {
    try {
      const savedPageOrient = localStorage.getItem(storageKey);
      const savedGlobalOrient = localStorage.getItem(GLOBAL_ORIENT_KEY);
      if (savedPageOrient === 'horizontal' || savedPageOrient === 'vertical') {
        setCurrentOrientation(savedPageOrient);
      } else if (savedGlobalOrient === 'horizontal' || savedGlobalOrient === 'vertical') {
        setCurrentOrientation(savedGlobalOrient);
      } else {
        setCurrentOrientation(orientation);
      }

      const savedPageCompact = localStorage.getItem(compactKey);
      const savedGlobalCompact = localStorage.getItem(GLOBAL_COMPACT_KEY);
      if (savedPageCompact === 'true' || savedPageCompact === 'false') {
        setIsCompact(savedPageCompact === 'true');
      } else if (savedGlobalCompact === 'true' || savedGlobalCompact === 'false') {
        setIsCompact(savedGlobalCompact === 'true');
      } else {
        setIsCompact(false);
      }

      const savedPagePin = localStorage.getItem(pinKey);
      const savedGlobalPin = localStorage.getItem(GLOBAL_PIN_KEY);
      if (savedPagePin === 'left' || savedPagePin === 'right') {
        setPinSide(savedPagePin);
      } else if (savedGlobalPin === 'left' || savedGlobalPin === 'right') {
        setPinSide(savedGlobalPin);
      } else {
        setPinSide(defaultPinSide);
      }

      const savedPreset = localStorage.getItem(GLOBAL_MEDIA_PRESET_KEY) as BannerMediaPreset | null;
      if (
        savedPreset === 'auto' ||
        savedPreset === 'education' ||
        savedPreset === 'projects' ||
        savedPreset === 'minimal'
      ) {
        setMediaPreset(savedPreset);
      }

      const savedPaused = localStorage.getItem(GLOBAL_VIDEO_PAUSED_KEY);
      if (savedPaused === 'true') {
        setIsVideoPaused(true);
      }
    } catch {
      setCurrentOrientation(orientation);
    }
  }, [storageKey, compactKey, pinKey, orientation, defaultPinSide]);

  // Lắng nghe sự kiện đồng bộ toàn cục (Global Banner Layout Sync) giữa mọi trang
  useEffect(() => {
    const handleGlobalSync = (event: Event) => {
      const customEvent = event as CustomEvent<GlobalBannerSyncDetail>;
      const detail = customEvent.detail;
      if (!detail) return;

      if (detail.resetAll) {
        setCurrentOrientation(orientation);
        setIsCompact(false);
        setPinSide(defaultPinSide);
        if (onOrientationChange) onOrientationChange(orientation);
        return;
      }

      if (detail.orientation === 'horizontal' || detail.orientation === 'vertical') {
        setCurrentOrientation(detail.orientation);
        setIsCompact(false);
        if (onOrientationChange) onOrientationChange(detail.orientation);
      }
      if (typeof detail.compact === 'boolean') {
        setIsCompact(detail.compact);
      }
      if (detail.pinSide === 'left' || detail.pinSide === 'right') {
        setPinSide(detail.pinSide);
      }
      if (detail.mediaPreset) {
        setMediaPreset(detail.mediaPreset);
      }
      if (typeof detail.videoPaused === 'boolean') {
        setIsVideoPaused(detail.videoPaused);
      }
    };

    window.addEventListener('hb-global-sync', handleGlobalSync);
    return () => window.removeEventListener('hb-global-sync', handleGlobalSync);
  }, [orientation, defaultPinSide, onOrientationChange]);

  // Đóng menu khi click ra ngoài
  useEffect(() => {
    if (!isMenuOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (menuContainerRef.current && !menuContainerRef.current.contains(e.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen]);

  // Điều khiển phát / tạm dừng video thực tế để tiết kiệm pin
  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;
    if (isVideoPaused) {
      vid.pause();
    } else {
      vid.play().catch(() => {
        // Autoplay có thể bị chặn bởi trình duyệt
      });
    }
  }, [isVideoPaused, currentOrientation, mediaPreset]);

  // Xóa hết các khóa lưu riêng lẻ từng trang khi người dùng chọn đồng bộ toàn cục
  const clearPerPageStorageKeys = (prefix: string) => {
    try {
      const keysToRemove: string[] = [];
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (k && k.startsWith(prefix)) {
          keysToRemove.push(k);
        }
      }
      keysToRemove.forEach((k) => localStorage.removeItem(k));
    } catch {
      // Ignore storage error
    }
  };

  // Áp dụng kiểu Banner (Ngang / Dọc) cho TẤT CẢ các trang trên toàn Website
  const applyGlobalOrientation = (targetOrientation: 'horizontal' | 'vertical') => {
    setCurrentOrientation(targetOrientation);
    setIsCompact(false);
    try {
      clearPerPageStorageKeys('hb_orient_v1_');
      clearPerPageStorageKeys('hb_compact_v1_');
      localStorage.setItem(GLOBAL_ORIENT_KEY, targetOrientation);
      localStorage.setItem(GLOBAL_COMPACT_KEY, 'false');
    } catch {
      // Ignore storage error
    }
    if (onOrientationChange) {
      onOrientationChange(targetOrientation);
    }
    window.dispatchEvent(
      new CustomEvent<GlobalBannerSyncDetail>('hb-global-sync', {
        detail: { orientation: targetOrientation, compact: false },
      })
    );
    showBannerToast(
      targetOrientation === 'vertical'
        ? 'Đã đồng bộ Banner Dọc 300px cho tất cả các trang!'
        : 'Đã đồng bộ Banner Ngang cho tất cả các trang!'
    );
    setIsMenuOpen(false);
  };

  // Chuyển đổi Ngang / Dọc (Hỗ trợ Shift + Click để đồng bộ toàn bộ Website)
  const handleToggleOrientation = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    const next: 'horizontal' | 'vertical' = isCompact
      ? currentOrientation
      : currentOrientation === 'vertical'
      ? 'horizontal'
      : 'vertical';

    if (e.shiftKey) {
      applyGlobalOrientation(next);
      return;
    }

    setCurrentOrientation(next);
    setIsCompact(false);
    try {
      localStorage.setItem(storageKey, next);
      localStorage.setItem(compactKey, 'false');
    } catch {
      // Ignore storage error
    }
    if (onOrientationChange) {
      onOrientationChange(next);
    }
  };

  // Chuột phải vào nút chuyển đổi Banner để mở nhanh menu Đồng bộ Toàn Cục & Media
  const handleContextMenuOrientation = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsMenuOpen((prev) => !prev);
  };

  // Thu gọn tiêu đề Banner siêu gọn 64px (Compact / Mini Header Mode)
  const handleToggleCompact = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    const nextCompact = !isCompact;

    if (e.shiftKey) {
      setIsCompact(nextCompact);
      try {
        clearPerPageStorageKeys('hb_compact_v1_');
        localStorage.setItem(GLOBAL_COMPACT_KEY, String(nextCompact));
      } catch {
        // Ignore
      }
      window.dispatchEvent(
        new CustomEvent<GlobalBannerSyncDetail>('hb-global-sync', {
          detail: { compact: nextCompact },
        })
      );
      showBannerToast(
        nextCompact
          ? 'Đã thu gọn Banner 64px trên tất cả các trang!'
          : 'Đã mở rộng lại Banner trên tất cả các trang!'
      );
      return;
    }

    setIsCompact(nextCompact);
    try {
      localStorage.setItem(compactKey, String(nextCompact));
    } catch {
      // Ignore
    }
  };

  // Đảo chiều vị trí cột Banner Dọc 300px Trái / Phải (Left / Right Sidebar Pinning)
  const handleTogglePinSide = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    const nextSide: BannerPinSide = pinSide === 'left' ? 'right' : 'left';

    if (e.shiftKey) {
      setPinSide(nextSide);
      try {
        clearPerPageStorageKeys('hb_pin_v1_');
        localStorage.setItem(GLOBAL_PIN_KEY, nextSide);
      } catch {
        // Ignore
      }
      window.dispatchEvent(
        new CustomEvent<GlobalBannerSyncDetail>('hb-global-sync', {
          detail: { pinSide: nextSide },
        })
      );
      showBannerToast(
        nextSide === 'left'
          ? 'Đã ghim cột Banner Dọc sang bên Trái toàn trang!'
          : 'Đã ghim cột Banner Dọc sang bên Phải toàn trang!'
      );
      return;
    }

    setPinSide(nextSide);
    try {
      localStorage.setItem(pinKey, nextSide);
    } catch {
      // Ignore
    }
    showBannerToast(
      nextSide === 'left' ? 'Đã ghim Banner Dọc sang bên Trái' : 'Đã ghim Banner Dọc sang bên Phải'
    );
  };

  // Tạm dừng / Phát tiếp chuyển động video nền để tiết kiệm pin
  const handleToggleVideoPause = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    const nextPaused = !isVideoPaused;
    setIsVideoPaused(nextPaused);
    try {
      localStorage.setItem(GLOBAL_VIDEO_PAUSED_KEY, String(nextPaused));
    } catch {
      // Ignore
    }
    window.dispatchEvent(
      new CustomEvent<GlobalBannerSyncDetail>('hb-global-sync', {
        detail: { videoPaused: nextPaused },
      })
    );
    showBannerToast(
      nextPaused
        ? 'Đã tạm dừng chuyển động Video nền (Tiết kiệm pin)'
        : 'Đã tiếp tục phát Video nền Banner'
    );
  };

  // Chọn chủ đề Video nền (Banner Media Switcher)
  const handleSelectMediaPreset = (preset: BannerMediaPreset) => {
    setMediaPreset(preset);
    try {
      localStorage.setItem(GLOBAL_MEDIA_PRESET_KEY, preset);
    } catch {
      // Ignore
    }
    window.dispatchEvent(
      new CustomEvent<GlobalBannerSyncDetail>('hb-global-sync', {
        detail: { mediaPreset: preset },
      })
    );
    const presetLabels: Record<BannerMediaPreset, string> = {
      auto: 'Tự động theo bố cục Ngang / Dọc',
      education: 'Chủ đề Video: Vũ Trụ Tri Thức',
      projects: 'Chủ đề Video: Không Gian Số',
      minimal: 'Chủ đề Tĩnh: Kính Mờ Tiết Kiệm Pin',
    };
    showBannerToast(`Đã chọn ${presetLabels[preset]}`);
  };

  // Khôi phục cài đặt mặc định ban đầu của từng trang
  const handleResetAllDefaults = () => {
    try {
      clearPerPageStorageKeys('hb_orient_v1_');
      clearPerPageStorageKeys('hb_compact_v1_');
      clearPerPageStorageKeys('hb_pin_v1_');
      localStorage.removeItem(GLOBAL_ORIENT_KEY);
      localStorage.removeItem(GLOBAL_COMPACT_KEY);
      localStorage.removeItem(GLOBAL_PIN_KEY);
      localStorage.setItem(GLOBAL_MEDIA_PRESET_KEY, 'auto');
      localStorage.setItem(GLOBAL_VIDEO_PAUSED_KEY, 'false');
    } catch {
      // Ignore
    }
    setCurrentOrientation(orientation);
    setIsCompact(false);
    setPinSide(defaultPinSide);
    setMediaPreset('auto');
    setIsVideoPaused(false);
    if (onOrientationChange) onOrientationChange(orientation);

    window.dispatchEvent(
      new CustomEvent<GlobalBannerSyncDetail>('hb-global-sync', {
        detail: { resetAll: true, mediaPreset: 'auto', videoPaused: false },
      })
    );
    showBannerToast('Đã khôi phục bố cục Banner mặc định cho từng trang!');
    setIsMenuOpen(false);
  };

  // Khi bật chế độ Thu gọn 64px, Banner tự động hiển thị dạng thanh ngang mỏng 64px trên đỉnh
  const isVertical = currentOrientation === 'vertical' && !isCompact;

  // Giải quyết nguồn video nền theo chủ đề người dùng chọn
  const activeVideoSrc =
    mediaPreset === 'minimal'
      ? ''
      : mediaPreset === 'education'
      ? EDUCATION_BANNER_VIDEO
      : mediaPreset === 'projects'
      ? PROJECTS_BANNER_VIDEO
      : isVertical
      ? PROJECTS_BANNER_VIDEO
      : EDUCATION_BANNER_VIDEO;

  const iconName = resolveTitleIcon(title, badgeText, titleIcon);

  // Cụm thanh công cụ điều khiển góc phải Banner
  const renderBannerControls = () => (
    <div
      ref={menuContainerRef}
      className="relative flex items-center gap-1 sm:gap-1.5 pointer-events-auto shrink-0 z-30"
    >
      {/* 1. NÚT CHUYỂN ĐỔI BANNER NGANG / DỌC (Hỗ trợ Shift+Click & Chuột phải để đồng bộ toàn cục) */}
      <button
        type="button"
        onClick={handleToggleOrientation}
        onContextMenu={handleContextMenuOrientation}
        title={
          isVertical
            ? 'Đang ở Banner Dọc 300px — Bấm chuyển sang Banner Ngang (Giữ Shift + Click hoặc Chuột phải để đồng bộ toàn bộ Website)'
            : 'Đang ở Banner Ngang — Bấm chuyển sang Banner Dọc 300px (Giữ Shift + Click hoặc Chuột phải để đồng bộ toàn bộ Website)'
        }
        aria-label="Chuyển đổi bố cục Banner Ngang hoặc Dọc 300px"
        className="px-2 sm:px-2.5 py-1 rounded-full bg-slate-950/70 hover:bg-slate-900/95 text-white border border-white/35 hover:border-amber-300/85 backdrop-blur-md shadow-[0_4px_14px_rgba(0,0,0,0.35)] text-[10px] sm:text-[11px] font-bold font-play flex items-center gap-1.5 transition-all duration-200 cursor-pointer active:scale-95 shrink-0 group/orient"
      >
        {isVertical ? (
          <>
            <svg
              className="w-3.5 h-3.5 text-amber-300 group-hover/orient:scale-110 transition-transform shrink-0"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              viewBox="0 0 24 24"
            >
              <rect
                x="3"
                y="4"
                width="18"
                height="6"
                rx="1.5"
                fill="currentColor"
                fillOpacity="0.35"
              />
              <rect x="3" y="13" width="18" height="7" rx="1.5" />
            </svg>
            <span className="tracking-tight whitespace-nowrap">Banner Ngang</span>
          </>
        ) : (
          <>
            <svg
              className="w-3.5 h-3.5 text-cyan-300 group-hover/orient:scale-110 transition-transform shrink-0"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              viewBox="0 0 24 24"
            >
              <rect
                x="3"
                y="4"
                width="6"
                height="16"
                rx="1.5"
                fill="currentColor"
                fillOpacity="0.35"
              />
              <rect x="12" y="4" width="9" height="16" rx="1.5" />
            </svg>
            <span className="tracking-tight whitespace-nowrap">Banner Dọc</span>
          </>
        )}
      </button>

      {/* 2. NÚT GHIM TRÁI / PHẢI KHI Ở CHẾ ĐỘ BANNER DỌC 300PX (LEFT / RIGHT SIDEBAR PINNING) */}
      {isVertical && (
        <button
          type="button"
          onClick={handleTogglePinSide}
          title={
            pinSide === 'left'
              ? 'Đang ghim cột Banner bên Trái — Bấm để đảo sang bên Phải màn hình (Shift + Click để áp dụng toàn trang)'
              : 'Đang ghim cột Banner bên Phải — Bấm để đảo sang bên Trái màn hình (Shift + Click để áp dụng toàn trang)'
          }
          aria-label="Đảo chiều vị trí cột Banner Dọc Trái hoặc Phải"
          className="px-2 py-1 rounded-full bg-slate-950/70 hover:bg-slate-900/95 text-white border border-white/35 hover:border-cyan-300/85 backdrop-blur-md shadow-[0_4px_14px_rgba(0,0,0,0.35)] text-[10px] sm:text-[11px] font-bold font-play hidden lg:flex items-center gap-1 transition-all duration-200 cursor-pointer active:scale-95 shrink-0"
        >
          {pinSide === 'left' ? (
            <>
              <PanelRight className="w-3.5 h-3.5 text-cyan-300 shrink-0" />
              <span className="whitespace-nowrap">Ghim Phải</span>
            </>
          ) : (
            <>
              <PanelLeft className="w-3.5 h-3.5 text-amber-300 shrink-0" />
              <span className="whitespace-nowrap">Ghim Trái</span>
            </>
          )}
        </button>
      )}

      {/* 3. NÚT THU GỌN TIÊU ĐỀ BANNER SIÊU GỌN 64PX (COMPACT / MINI HEADER MODE) */}
      <button
        type="button"
        onClick={handleToggleCompact}
        title={
          isCompact
            ? 'Đang ở chế độ Tiêu đề siêu gọn 64px — Bấm để mở rộng Banner (Shift + Click để áp dụng toàn trang)'
            : 'Thu gọn nhanh chiều cao Banner xuống thanh tiêu đề mỏng 64px để tối đa hóa diện tích đọc (Shift + Click để áp dụng toàn trang)'
        }
        aria-label="Thu gọn hoặc mở rộng tiêu đề Banner 64px"
        className={`px-2 py-1 rounded-full border backdrop-blur-md shadow-[0_4px_14px_rgba(0,0,0,0.35)] text-[10px] sm:text-[11px] font-bold font-play flex items-center gap-1 transition-all duration-200 cursor-pointer active:scale-95 shrink-0 ${
          isCompact
            ? 'bg-amber-500/90 hover:bg-amber-500 text-slate-950 border-amber-200'
            : 'bg-slate-950/70 hover:bg-slate-900/95 text-white border-white/35 hover:border-emerald-300/85'
        }`}
      >
        {isCompact ? (
          <>
            <Maximize2 className="w-3.5 h-3.5 shrink-0" />
            <span className="hidden sm:inline whitespace-nowrap">Mở rộng</span>
          </>
        ) : (
          <>
            <Minimize2 className="w-3.5 h-3.5 text-emerald-300 shrink-0" />
            <span className="hidden sm:inline whitespace-nowrap">64px</span>
          </>
        )}
      </button>

      {/* 4. NÚT TẠM DỪNG / PHÁT VIDEO TIẾT KIỆM PIN */}
      {mediaPreset !== 'minimal' && (
        <button
          type="button"
          onClick={handleToggleVideoPause}
          title={
            isVideoPaused
              ? 'Video nền đang tạm dừng (Tiết kiệm pin) — Bấm để phát tiếp chuyển động'
              : 'Tạm dừng chuyển động Video nền để tiết kiệm pin trên thiết bị di động'
          }
          aria-label={isVideoPaused ? 'Phát video nền' : 'Tạm dừng video nền'}
          className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full border backdrop-blur-md shadow-[0_4px_14px_rgba(0,0,0,0.35)] flex items-center justify-center transition-all duration-200 cursor-pointer active:scale-95 shrink-0 ${
            isVideoPaused
              ? 'bg-rose-500/85 hover:bg-rose-500 text-white border-rose-200'
              : 'bg-slate-950/70 hover:bg-slate-900/95 text-white border-white/35 hover:border-amber-300/85'
          }`}
        >
          {isVideoPaused ? (
            <Play className="w-3 h-3 fill-current ml-0.5" />
          ) : (
            <Pause className="w-3 h-3" />
          )}
        </button>
      )}

      {/* 5. NÚT CHẾ ĐỘ VIDEO & ĐỒNG BỘ BANNER TOÀN CỤC (MEDIA SWITCHER & GLOBAL SYNC MENU) */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setIsMenuOpen((prev) => !prev);
        }}
        title="Tùy chỉnh chủ đề Video nền & Đồng bộ kiểu Banner cho tất cả các trang"
        aria-label="Mở menu tùy chỉnh Video và đồng bộ Banner toàn cục"
        className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full border backdrop-blur-md shadow-[0_4px_14px_rgba(0,0,0,0.35)] flex items-center justify-center transition-all duration-200 cursor-pointer active:scale-95 shrink-0 ${
          isMenuOpen
            ? 'bg-cyan-500 text-slate-950 border-white'
            : 'bg-slate-950/70 hover:bg-slate-900/95 text-white border-white/35 hover:border-cyan-300/85'
        }`}
      >
        <Film className="w-3.5 h-3.5" />
      </button>

      {/* POPOVER MENU: ĐỒNG BỘ TOÀN CỤC & CHỌN CHỦ ĐỀ VIDEO */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.95 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            onClick={(e) => e.stopPropagation()}
            className="absolute right-0 top-full mt-2 w-72 sm:w-80 p-3 rounded-2xl bg-slate-950/95 backdrop-blur-2xl border border-white/25 shadow-[0_20px_50px_rgba(0,0,0,0.75)] text-white z-[120] flex flex-col gap-2.5 font-play select-none"
          >
            {/* Phần 1: Đồng bộ Chế độ Banner Toàn Cục */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between px-1">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5" />
                  Đồng bộ bố cục toàn Website
                </span>
                <span className="text-[9.5px] text-slate-400">Shift + Click</span>
              </div>

              <button
                type="button"
                onClick={() => applyGlobalOrientation(currentOrientation)}
                className="w-full text-left px-2.5 py-2 rounded-xl bg-gradient-to-r from-amber-500/25 via-cyan-500/20 to-blue-600/25 hover:from-amber-500/40 hover:to-blue-600/40 border border-amber-300/40 text-[11.5px] font-bold text-white flex items-center justify-between gap-2 transition-all cursor-pointer"
              >
                <span className="truncate">
                  Áp dụng kiểu Banner này ({isVertical ? 'Dọc 300px' : 'Ngang'}) cho tất cả các trang
                </span>
                <Sparkles className="w-3.5 h-3.5 text-amber-300 shrink-0" />
              </button>

              <div className="grid grid-cols-2 gap-1.5">
                <button
                  type="button"
                  onClick={() => applyGlobalOrientation('horizontal')}
                  className={`px-2.5 py-1.5 rounded-xl border text-[11px] font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    !isVertical && !isCompact
                      ? 'bg-amber-500/25 border-amber-300/60 text-amber-200'
                      : 'bg-white/5 hover:bg-white/15 border-white/15 text-slate-200'
                  }`}
                >
                  <span>Tất cả Ngang</span>
                </button>
                <button
                  type="button"
                  onClick={() => applyGlobalOrientation('vertical')}
                  className={`px-2.5 py-1.5 rounded-xl border text-[11px] font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    isVertical
                      ? 'bg-cyan-500/25 border-cyan-300/60 text-cyan-200'
                      : 'bg-white/5 hover:bg-white/15 border-white/15 text-slate-200'
                  }`}
                >
                  <span>Tất cả Dọc 300px</span>
                </button>
              </div>
            </div>

            <div className="h-[1px] bg-white/15 w-full" />

            {/* Phần 2: Chế Độ Xem Trước Video Banner Tùy Chỉnh (Banner Media Switcher) */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between px-1">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-cyan-300 flex items-center gap-1.5">
                  <Film className="w-3.5 h-3.5" />
                  Chủ đề Video nền & Tiết kiệm Pin
                </span>
              </div>

              {(
                [
                  {
                    id: 'auto' as BannerMediaPreset,
                    label: 'Tự động theo bố cục Ngang / Dọc',
                    desc: 'Ngang: Vũ Trụ Tri Thức · Dọc: Không Gian Số',
                  },
                  {
                    id: 'education' as BannerMediaPreset,
                    label: 'Video 1: Vũ Trụ Tri Thức (Ánh Vàng)',
                    desc: 'Chuyển động hạt ánh sáng ấm áp',
                  },
                  {
                    id: 'projects' as BannerMediaPreset,
                    label: 'Video 2: Không Gian Số (Xanh Cyan)',
                    desc: 'Chuyển động mạng lưới công nghệ cao',
                  },
                  {
                    id: 'minimal' as BannerMediaPreset,
                    label: 'Nền Kính Tĩnh (Siêu Tiết Kiệm Pin)',
                    desc: 'Tắt hoàn toàn video cho thiết bị di động',
                  },
                ] as const
              ).map((item) => {
                const active = mediaPreset === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleSelectMediaPreset(item.id)}
                    className={`w-full text-left px-2.5 py-1.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-2 ${
                      active
                        ? 'bg-cyan-500/25 border-cyan-300/70 text-white'
                        : 'bg-white/5 hover:bg-white/15 border-white/10 text-slate-200'
                    }`}
                  >
                    <div className="flex flex-col min-w-0">
                      <span className="text-[11px] font-bold truncate">{item.label}</span>
                      <span className="text-[9.5px] text-slate-400 truncate">{item.desc}</span>
                    </div>
                    {active && <Check className="w-3.5 h-3.5 text-cyan-300 shrink-0" />}
                  </button>
                );
              })}
            </div>

            <div className="h-[1px] bg-white/15 w-full" />

            {/* Khôi phục mặc định */}
            <button
              type="button"
              onClick={handleResetAllDefaults}
              className="w-full px-2.5 py-1.5 rounded-xl bg-white/5 hover:bg-rose-500/25 border border-white/15 hover:border-rose-300/50 text-[11px] font-bold text-slate-300 hover:text-rose-200 flex items-center justify-center gap-1.5 transition-all cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Khôi phục bố cục mặc định từng trang</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  return (
    <motion.div
      layout
      transition={{
        layout: { type: 'spring', stiffness: 320, damping: 30, mass: 0.85 },
      }}
      data-banner-orientation={isVertical ? 'vertical' : 'horizontal'}
      data-banner-pin={pinSide}
      data-banner-compact={isCompact ? 'true' : 'false'}
      className={`hero-banner ${
        isVertical
          ? `hero-banner-vertical ${
              pinSide === 'right' ? 'hero-banner-pin-right' : 'hero-banner-pin-left'
            }`
          : 'hero-banner-horizontal'
      } ${
        isCompact ? 'hero-banner-compact' : ''
      } theme-hero-banner relative border-0 border-none outline-none shadow-none shrink-0 bg-slate-900/35 overflow-visible select-none ${
        isCompact
          ? 'w-full h-[64px] min-h-[64px] max-h-[64px] rounded-[16px]'
          : isVertical
          ? 'w-full lg:w-[300px] lg:min-w-[300px] lg:max-w-[300px] h-full min-h-full flex flex-col justify-between rounded-[20px]'
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

      {/* Lớp nền Video MP4 / Hình ảnh được bo góc theo thẻ cha, cho phép dropdown bên trong hiển thị không bị cắt */}
      <div className="absolute inset-0 overflow-hidden rounded-[inherit] pointer-events-none">
        {activeVideoSrc ? (
          <video
            ref={videoRef}
            key={activeVideoSrc}
            autoPlay={!isVideoPaused}
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
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-indigo-950/90 to-slate-900 pointer-events-none" />
        )}

        {/* Lớp phủ rất nhẹ bảo đảm giữ rõ nền video */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/35 via-slate-950/15 to-slate-950/30 pointer-events-none" />
      </div>

      {/* Thông báo Toast phản hồi nhanh khi đồng bộ toàn cục hoặc đổi chế độ */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="
              absolute left-1/2 -translate-x-1/2 bottom-2 z-[130]
              px-3 py-1 rounded-full bg-slate-950/90 text-amber-300
              border border-amber-400/50 backdrop-blur-xl shadow-lg
              text-[10.5px] font-bold font-play whitespace-nowrap pointer-events-none
              flex items-center gap-1.5
            "
          >
            <Sparkles className="w-3 h-3 text-amber-300 shrink-0" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CHẾ ĐỘ THU GỌN SIÊU GỌN 64PX (COMPACT / MINI HEADER MODE) */}
      {isCompact ? (
        <div className="relative z-10 px-3.5 sm:px-4 h-[64px] w-full flex items-center justify-between gap-2.5 pointer-events-none overflow-visible">
          {/* Bên trái: Icon + Tiêu đề + Trích dẫn thu gọn */}
          <div className="flex items-center gap-2.5 min-w-0 pointer-events-auto shrink-0">
            <h2
              className={`text-base sm:text-lg md:text-xl font-black font-play tracking-tight leading-none select-none flex items-center gap-2 max-w-full ${titleColor}`}
              style={{
                textShadow: '0 2px 6px rgba(0,0,0,0.85), 0 0 2px rgba(0,0,0,0.9)',
              }}
            >
              <span className={`animate-banner-icon shrink-0 ${titleColor}`}>
                <WebIcon name={iconName} className="w-5 h-5" />
              </span>
              <span className="truncate">{displayTitle}</span>
            </h2>

            {quote && !bottomControls && !children && (
              <span
                className="hidden xl:inline-block text-xs text-white/85 font-banner-quote truncate max-w-[320px] pl-2 border-l border-white/25"
                style={{ textShadow: '0 1px 4px rgba(0,0,0,0.8)' }}
              >
                {quote}
              </span>
            )}
          </div>

          {/* Ở giữa: Các công cụ lọc/tìm kiếm (nếu có) được thu gọn nằm ngang trên thanh 64px */}
          {(children || bottomControls) && (
            <div className="hero-banner-compact-controls hidden md:flex items-center justify-end flex-1 min-w-0 max-w-[55%] pointer-events-auto overflow-visible">
              {children && (
                <div className="hero-banner-custom-children flex items-center gap-2 max-w-full">
                  {children}
                </div>
              )}
              {bottomControls && (
                <div className="hero-banner-bottom-controls flex items-center gap-2 w-full justify-end">
                  {bottomControls}
                </div>
              )}
            </div>
          )}

          {/* Bên phải: Cụm nút điều khiển Banner */}
          {renderBannerControls()}
        </div>
      ) : (
        /* CHẾ ĐỘ ĐẦY ĐỦ: BANNER NGANG TRUYỀN THỐNG HOẶC BANNER DỌC 300PX */
        <div className="relative z-10 p-3.5 sm:p-4 lg:p-5 flex flex-col justify-between pointer-events-none overflow-visible w-full h-full min-h-0 flex-1 gap-2">
          {!hideTextOverlay ? (
            <div
              className={`w-full flex-1 min-h-0 flex ${
                isVertical
                  ? 'flex-col items-start justify-between gap-2.5'
                  : 'flex-col gap-1.5 justify-between'
              }`}
            >
              {/* DÒNG TRÊN CÙNG: Tiêu đề bên trái + Cụm công cụ điều khiển Banner ở góc phải */}
              <div className="w-full flex items-start justify-between gap-2 pointer-events-auto flex-wrap sm:flex-nowrap">
                {/* Khối bên trái: Tiêu đề chính (Icon chuyển động tại chỗ + Màu tiêu đề đồng bộ) */}
                <div className="flex flex-col items-start min-w-0 flex-1">
                  <h2
                    className={`text-base sm:text-xl md:text-2xl ${
                      isVertical ? 'lg:text-[22px]' : 'lg:text-[26px]'
                    } font-black font-play tracking-tight leading-tight select-none flex items-center gap-2 max-w-full ${titleColor}`}
                    style={{
                      textShadow: '0 2px 6px rgba(0,0,0,0.85), 0 0 2px rgba(0,0,0,0.9)',
                    }}
                  >
                    <span className={`animate-banner-icon shrink-0 ${titleColor}`}>
                      <WebIcon name={iconName} className="w-5 h-5 sm:w-6 sm:h-6" />
                    </span>
                    <span className="truncate">{displayTitle}</span>
                  </h2>
                </div>

                {/* CỤM ĐIỀU KHIỂN BANNER GÓC PHẢI */}
                {renderBannerControls()}
              </div>

              {/* Khối Câu nói hay (Quote) */}
              {quote && (
                <div
                  className={`pointer-events-auto flex flex-col min-w-0 ${
                    isVertical
                      ? 'items-start text-left w-full mt-1'
                      : 'items-end text-right hidden sm:flex self-end max-w-[75%] md:max-w-[65%] -mt-1'
                  }`}
                >
                  <p
                    className={`font-banner-quote ${
                      isVertical
                        ? 'text-xl sm:text-2xl lg:text-[26px]'
                        : 'text-xl sm:text-2xl md:text-3xl lg:text-[30px]'
                    } text-white/95 font-bold leading-tight select-none`}
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
            <div className="w-full flex-1 flex items-start justify-end pointer-events-auto">
              {renderBannerControls()}
            </div>
          )}

          {children && (
            <div
              className={`hero-banner-custom-children w-full pointer-events-auto ${
                isVertical
                  ? 'flex flex-col gap-2 my-auto'
                  : 'flex flex-wrap items-center justify-between gap-2 pt-1'
              }`}
            >
              {children}
            </div>
          )}

          {/* Controls dưới cùng nếu có */}
          {bottomControls && (
            <div className="hero-banner-bottom-controls w-full flex items-center justify-between pointer-events-auto pt-1 shrink-0">
              {bottomControls}
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
};


