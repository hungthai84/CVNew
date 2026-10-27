/* Lucian UX/UI Prompt #376 · MIT License (c) 2026 Seokwoooo · https://lucianlabs.dev/uxui-prompt/#376 */
'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  User, 
  Target, 
  Trophy, 
  ChevronLeft, 
  ChevronRight, 
  ArrowRight,
  Smile,
  Headphones,
  Cpu,
  Users,
  BarChart3,
  TrendingUp,
  Sparkles
} from 'lucide-react';

export interface HomeTapThroughStoriesProps {
  isDark?: boolean;
  onNavigateContact: () => void;
  onNavigatePage?: (pageId: number) => void;
}

interface SceneItem {
  tag: string;
  title: string;
  subtitle: string;
  metric?: string;
  metricLabel?: string;
  bgGradient: string;
  darkBgGradient: string;
  accentColor: string;
  iconType: 'user' | 'users' | 'cpu' | 'smile' | 'headphones' | 'sparkles' | 'trophy' | 'chart' | 'trending';
}

interface StorySection {
  id: string;
  label: string;
  timeAgo: string;
  avatarColors: [string, string];
  actionLabel: string;
  targetPage: number;
  scenes: SceneItem[];
}

const STORY_DATA: StorySection[] = [
  {
    id: 'intro',
    label: 'Giới Thiệu',
    timeAgo: '',
    avatarColors: ['#38BDF8', '#2563EB'],
    actionLabel: 'Xem chi tiết hồ sơ',
    targetPage: 2,
    scenes: [
      {
        tag: 'Customer Service & CX Leader',
        title: 'Nguyễn Hùng Thái',
        subtitle: 'Trưởng phòng Chăm sóc Khách hàng với hơn 22 năm quản lý Contact Center & CX đa kênh.',
        metric: '22+',
        metricLabel: 'Năm kinh nghiệm',
        bgGradient: 'linear-gradient(135deg, rgba(238,246,255,0.95), rgba(224,242,254,0.92))',
        darkBgGradient: 'linear-gradient(135deg, rgba(11,16,32,0.95), rgba(8,47,73,0.85))',
        accentColor: '#0284C7',
        iconType: 'user',
      },
      {
        tag: 'Quy Mô Quản Trị Thực Chiến',
        title: 'Lãnh Đạo 100+ Nhân Sự',
        subtitle: 'Xây dựng văn hóa phục vụ tận tâm, đào tạo quy chuẩn nghiệp vụ & gắn kết đội ngũ vững mạnh.',
        metric: '100+',
        metricLabel: 'Nhân sự quản lý',
        bgGradient: 'linear-gradient(135deg, rgba(238,242,255,0.95), rgba(224,231,255,0.92))',
        darkBgGradient: 'linear-gradient(135deg, rgba(11,16,32,0.95), rgba(30,27,75,0.85))',
        accentColor: '#6366F1',
        iconType: 'users',
      },
      {
        tag: 'Tư Duy Đột Phá AI & CX',
        title: 'Chuyên Gia Tự Động Hóa',
        subtitle: 'Ứng dụng AI Agent, Voicebot và CRM thông minh nâng cao CSAT 98% và giảm thời gian chờ.',
        metric: 'CX',
        metricLabel: 'Chuyên gia số hóa',
        bgGradient: 'linear-gradient(135deg, rgba(254,243,199,0.95), rgba(253,230,138,0.92))',
        darkBgGradient: 'linear-gradient(135deg, rgba(11,16,32,0.95), rgba(69,26,3,0.85))',
        accentColor: '#D97706',
        iconType: 'cpu',
      },
    ],
  },
  {
    id: 'skills',
    label: 'Năng Lực Cốt Lõi',
    timeAgo: 'KPI Realtime',
    avatarColors: ['#A855F7', '#EC4899'],
    actionLabel: 'Khám phá kỹ năng',
    targetPage: 5,
    scenes: [
      {
        tag: 'Chất Lượng Trải Nghiệm',
        title: 'CSAT 98% · Khách Hàng Hài Lòng',
        subtitle: 'Hệ thống khảo sát đa kênh tức thời, cá nhân hóa hành trình chạm và giải quyết triệt để khiếu nại.',
        metric: '98%',
        metricLabel: 'Hài lòng (CSAT)',
        bgGradient: 'linear-gradient(135deg, rgba(236,253,245,0.95), rgba(209,250,229,0.92))',
        darkBgGradient: 'linear-gradient(135deg, rgba(11,16,32,0.95), rgba(6,78,59,0.85))',
        accentColor: '#10B981',
        iconType: 'smile',
      },
      {
        tag: 'Vận Hành Đa Kênh 24/7',
        title: 'Contact Center 24/7 · SLA Realtime',
        subtitle: 'Giám sát chỉ số SLA, AHT, FCR và Abandonment Rate liên tục theo bảng điều khiển thời gian thực.',
        metric: '24/7',
        metricLabel: 'SLA Cam Kết',
        bgGradient: 'linear-gradient(135deg, rgba(250,245,255,0.95), rgba(243,232,255,0.92))',
        darkBgGradient: 'linear-gradient(135deg, rgba(11,16,32,0.95), rgba(88,28,135,0.85))',
        accentColor: '#A855F7',
        iconType: 'headphones',
      },
      {
        tag: 'Công Nghệ AI Tiên Phong',
        title: 'AI Agent & Workflow Tự Động',
        subtitle: 'Phân luồng ticket thông minh, tự động trả lời tự nhiên và tối ưu 25% chi phí vận hành dịch vụ.',
        metric: '-25%',
        metricLabel: 'Chi phí vận hành',
        bgGradient: 'linear-gradient(135deg, rgba(240,249,255,0.95), rgba(224,242,254,0.92))',
        darkBgGradient: 'linear-gradient(135deg, rgba(11,16,32,0.95), rgba(12,74,110,0.85))',
        accentColor: '#0EA5E9',
        iconType: 'sparkles',
      },
    ],
  },
  {
    id: 'achievements',
    label: 'Dấu Ấn Thành Tựu',
    timeAgo: 'C-Level Metric',
    avatarColors: ['#F59E0B', '#EF4444'],
    actionLabel: 'Đến trang Dự án',
    targetPage: 7,
    scenes: [
      {
        tag: 'Phát Triển Đội Ngũ',
        title: 'Lãnh Đạo & Huấn Luyện 100+ NS',
        subtitle: 'Quy hoạch lộ trình thăng tiến nhân sự, tỷ lệ gắn kết cao và tỷ lệ nghỉ việc thấp nhất ngành.',
        metric: '100+',
        metricLabel: 'Đội ngũ phụ trách',
        bgGradient: 'linear-gradient(135deg, rgba(255,251,235,0.95), rgba(254,243,199,0.92))',
        darkBgGradient: 'linear-gradient(135deg, rgba(11,16,32,0.95), rgba(120,53,15,0.85))',
        accentColor: '#F59E0B',
        iconType: 'trophy',
      },
      {
        tag: 'Phân Tích Dữ Liệu Lớn',
        title: 'Dashboard Power BI C-Level',
        subtitle: 'Trực quan hóa toàn diện bức tranh vận hành, báo cáo phân tích xu hướng phục vụ ra quyết định ban điều hành.',
        metric: 'Realtime',
        metricLabel: 'Dữ liệu C-Suite',
        bgGradient: 'linear-gradient(135deg, rgba(239,246,255,0.95), rgba(219,234,254,0.92))',
        darkBgGradient: 'linear-gradient(135deg, rgba(11,16,32,0.95), rgba(30,58,138,0.85))',
        accentColor: '#3B82F6',
        iconType: 'chart',
      },
      {
        tag: 'Hiệu Quả Tài Chính',
        title: 'Giảm 25% Cost-to-Serve',
        subtitle: 'Tối ưu định mức chi phí trên từng cuộc gọi/tin nhắn, nâng cao năng suất phục vụ khách hàng trên mỗi nhân sự.',
        metric: 'Top 1',
        metricLabel: 'Hiệu suất dẫn đầu',
        bgGradient: 'linear-gradient(135deg, rgba(253,242,248,0.95), rgba(252,231,243,0.92))',
        darkBgGradient: 'linear-gradient(135deg, rgba(11,16,32,0.95), rgba(131,24,67,0.85))',
        accentColor: '#EC4899',
        iconType: 'trending',
      },
    ],
  },
];

const renderSceneIcon = (type: SceneItem['iconType'], className?: string) => {
  switch (type) {
    case 'user':
      return <User className={className} />;
    case 'users':
      return <Users className={className} />;
    case 'cpu':
      return <Cpu className={className} />;
    case 'smile':
      return <Smile className={className} />;
    case 'headphones':
      return <Headphones className={className} />;
    case 'sparkles':
      return <Sparkles className={className} />;
    case 'trophy':
      return <Trophy className={className} />;
    case 'chart':
      return <BarChart3 className={className} />;
    case 'trending':
      return <TrendingUp className={className} />;
    default:
      return <Sparkles className={className} />;
  }
};

const DUR = 3400; // Duration per scene in ms

export const HomeTapThroughStories: React.FC<HomeTapThroughStoriesProps> = ({
  isDark = false,
  onNavigateContact,
  onNavigatePage,
}) => {
  const [userIndex, setUserIndex] = useState<number>(0);
  const [sceneIndex, setSceneIndex] = useState<number>(0);
  const [isHolding, setIsHolding] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const cubeRef = useRef<HTMLDivElement>(null);
  const holdTimerRef = useRef<NodeJS.Timeout | null>(null);
  const downAtRef = useRef<number>(0);
  const rafRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);
  const elapsedTimeRef = useRef<number>(0);

  // Check prefers-reduced-motion
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
      setPrefersReducedMotion(mq.matches);
      const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
      mq.addEventListener('change', handler);
      return () => mq.removeEventListener('change', handler);
    }
  }, []);

  const totalUsers = STORY_DATA.length;
  const currentSection = STORY_DATA[userIndex];
  const totalScenes = currentSection.scenes.length;
  const currentScene = currentSection.scenes[sceneIndex];

  // Rotate cube
  const updateCubeRotation = useCallback((u: number) => {
    if (cubeRef.current) {
      const ry = -90 * u;
      cubeRef.current.style.setProperty('--ry', `${ry}deg`);
    }
  }, []);

  // Jump to specific user/section and scene
  const goTo = useCallback(
    (nextU: number, nextS: number) => {
      const validU = Math.max(0, Math.min(totalUsers - 1, nextU));
      const section = STORY_DATA[validU];
      const validS = Math.max(0, Math.min(section.scenes.length - 1, nextS));

      setUserIndex(validU);
      setSceneIndex(validS);
      elapsedTimeRef.current = 0;
      setProgress(0);
      updateCubeRotation(validU);
    },
    [totalUsers, updateCubeRotation]
  );

  const next = useCallback(() => {
    if (sceneIndex < totalScenes - 1) {
      goTo(userIndex, sceneIndex + 1);
    } else if (userIndex < totalUsers - 1) {
      goTo(userIndex + 1, 0);
    } else {
      goTo(0, 0);
    }
  }, [sceneIndex, totalScenes, userIndex, totalUsers, goTo]);

  const prev = useCallback(() => {
    if (sceneIndex > 0) {
      goTo(userIndex, sceneIndex - 1);
    } else if (userIndex > 0) {
      const prevUser = userIndex - 1;
      goTo(prevUser, STORY_DATA[prevUser].scenes.length - 1);
    } else {
      goTo(0, 0);
    }
  }, [sceneIndex, userIndex, goTo]);

  // Main tick animation loop
  useEffect(() => {
    if (prefersReducedMotion) return;

    const tick = (now: number) => {
      if (!lastTimeRef.current) lastTimeRef.current = now;
      const dt = Math.max(0, Math.min(50, now - lastTimeRef.current));
      lastTimeRef.current = now;

      if (!isHolding) {
        elapsedTimeRef.current += dt;
        const currentP = Math.min(1, elapsedTimeRef.current / DUR);
        setProgress(currentP);

        if (elapsedTimeRef.current >= DUR) {
          next();
        }
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isHolding, next, prefersReducedMotion]);

  // Pointer hold & release
  const handlePointerDown = (e: React.PointerEvent) => {
    downAtRef.current = performance.now();
    holdTimerRef.current = setTimeout(() => {
      setIsHolding(true);
    }, 260);
  };

  const handlePointerUp = () => {
    if (holdTimerRef.current) clearTimeout(holdTimerRef.current);
    if (isHolding) {
      setTimeout(() => setIsHolding(false), 0);
    }
  };

  const handlePointerCancel = () => {
    if (holdTimerRef.current) clearTimeout(holdTimerRef.current);
    setIsHolding(false);
  };

  const handleRightClick = () => {
    const elapsed = performance.now() - downAtRef.current;
    if (elapsed < 260 || !downAtRef.current) {
      next();
    }
    downAtRef.current = 0;
  };

  const handleLeftClick = () => {
    prev();
  };

  const handleActionClick = (e: React.MouseEvent, pageId: number) => {
    e.stopPropagation();
    if (onNavigatePage) {
      onNavigatePage(pageId);
    } else {
      onNavigateContact();
    }
  };

  return (
    <div
      className={`relative z-10 self-end ml-auto w-full max-w-[365px] sm:max-w-[380px] mt-auto font-sans select-none ${
        isDark ? 'text-white' : 'text-slate-800'
      }`}
    >
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .u376-wrapper {
          position: relative;
          width: 100%;
          border-radius: 24px;
          perspective: 1000px;
          overflow: hidden;
        }
        .u376-cube {
          position: relative;
          width: 100%;
          min-height: 295px;
          transform-style: preserve-3d;
          transform: translateZ(-160px) rotateY(var(--ry, 0deg));
          transition: transform 0.7s cubic-bezier(0.5, 0, 0.25, 1);
        }
        .u376-face {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          border-radius: 24px;
          overflow: hidden;
        }
        .u376-face:nth-child(1) {
          transform: rotateY(0deg) translateZ(160px);
        }
        .u376-face:nth-child(2) {
          transform: rotateY(90deg) translateZ(160px);
        }
        .u376-face:nth-child(3) {
          transform: rotateY(180deg) translateZ(160px);
        }
        .u376-bars {
          display: flex;
          gap: 4px;
          transition: opacity 0.3s;
        }
        .u376-bars i {
          flex: 1;
          height: 3px;
          border-radius: 3px;
          background: rgba(255, 255, 255, 0.35);
          overflow: hidden;
        }
        .u376-bars i b {
          display: block;
          height: 100%;
          background: #ffffff;
          transform-origin: 0 50%;
          transform: scaleX(var(--p, 0));
        }
        .u376-hd {
          transition: opacity 0.3s;
        }
        .u376.is-hold .u376-bars,
        .u376.is-hold .u376-hd {
          opacity: 0.15;
        }
        .u376-hit {
          position: absolute;
          top: 50px;
          bottom: 48px;
          border: 0;
          padding: 0;
          background: transparent;
          z-index: 25;
          cursor: pointer;
        }
        .u376-hit:first-of-type {
          left: 0;
          width: 35%;
        }
        .u376-hit:last-of-type {
          right: 0;
          width: 65%;
        }
        .u376-hit:focus-visible {
          outline: 2px solid #38bdf8;
          outline-offset: -4px;
        }
      `,
        }}
      />

      {/* Main 3D Tap-Through Stories Container (Prompt #376) */}
      <div
        ref={containerRef}
        className={`u376 u376-wrapper border backdrop-blur-2xl shadow-xl ${
          isHolding ? 'is-hold' : ''
        } ${
          isDark
            ? 'bg-[#0B1020]/95 border-cyan-400/35 shadow-[0_0_24px_rgba(34,211,238,0.2)]'
            : 'bg-white/95 border-white/90 shadow-[0_12px_36px_-8px_rgba(30,27,75,0.14)]'
        }`}
      >
        {/* Invisible Tap Areas */}
        <button
          className="u376-hit"
          type="button"
          onClick={handleLeftClick}
          aria-label="Previous scene"
        />
        <button
          className="u376-hit"
          type="button"
          onClick={handleRightClick}
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerCancel}
          aria-label="Next scene, hold to pause"
        />

        {/* 3D Rotating Cube */}
        <div ref={cubeRef} className="u376-cube">
          {STORY_DATA.map((section, secIdx) => {
            const isCurrentSection = userIndex === secIdx;

            return (
              <div
                key={section.id}
                className="u376-face p-3.5 flex flex-col justify-between"
                style={{
                  background: isDark
                    ? isCurrentSection
                      ? currentScene.darkBgGradient
                      : section.scenes[0].darkBgGradient
                    : isCurrentSection
                    ? currentScene.bgGradient
                    : section.scenes[0].bgGradient,
                }}
              >
                {/* 1. Header with Progress Bars & User Avatar */}
                <div className="z-30 relative">
                  {/* Progress Bars at top */}
                  <div className="u376-bars mb-2">
                    {section.scenes.map((_, barIdx) => {
                      let p = 0;
                      if (isCurrentSection) {
                        if (barIdx < sceneIndex) p = 1;
                        else if (barIdx > sceneIndex) p = 0;
                        else p = progress;
                      } else {
                        p = secIdx < userIndex ? 1 : 0;
                      }

                      return (
                        <i key={barIdx} className="overflow-hidden">
                          <b
                            style={{
                              transform: `scaleX(${p})`,
                              backgroundColor: isDark ? '#22D3EE' : '#2563EB',
                            }}
                          />
                        </i>
                      );
                    })}
                  </div>

                  {/* Header Author Info */}
                  <div className="u376-hd flex items-center justify-between pb-2 border-b border-white/20 dark:border-white/10">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-sm"
                        style={{
                          background: `linear-gradient(135deg, ${section.avatarColors[0]}, ${section.avatarColors[1]})`,
                        }}
                      >
                        {secIdx === 0 && <User className="w-3.5 h-3.5" />}
                        {secIdx === 1 && <Target className="w-3.5 h-3.5" />}
                        {secIdx === 2 && <Trophy className="w-3.5 h-3.5" />}
                      </div>
                      <div>
                        <b
                          className={`text-xs block font-play leading-tight ${
                            isDark ? 'text-white' : 'text-slate-900'
                          }`}
                        >
                          {section.label}
                        </b>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => handleActionClick(e, section.targetPage)}
                      className={`w-6 h-6 rounded-full border flex items-center justify-center transition cursor-pointer z-30 ${
                        isDark
                          ? 'border-cyan-400/40 text-cyan-300 hover:bg-cyan-950/60'
                          : 'border-blue-200 text-blue-600 hover:bg-blue-50'
                      }`}
                      title="Xem chi tiết"
                    >
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                {/* 2. Scene Center Content */}
                <div className="py-2 z-20 flex-1 flex flex-col justify-center">
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider mb-1 block ${
                      isDark ? 'text-cyan-400' : 'text-indigo-600'
                    }`}
                  >
                    {isCurrentSection ? currentScene.tag : section.scenes[0].tag}
                  </span>

                  {/* Icon & Title: Cùng kích thước, cùng màu, không đóng khung */}
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className={`shrink-0 ${
                        isDark ? 'text-white' : 'text-[#1E1B4B]'
                      }`}
                    >
                      {renderSceneIcon(
                        isCurrentSection ? currentScene.iconType : section.scenes[0].iconType,
                        'w-4 h-4 sm:w-4.5 sm:h-4.5'
                      )}
                    </span>
                    <h3
                      className={`text-sm sm:text-base font-black font-play leading-tight ${
                        isDark ? 'text-white' : 'text-[#1E1B4B]'
                      }`}
                    >
                      {isCurrentSection ? currentScene.title : section.scenes[0].title}
                    </h3>
                  </div>

                  <p
                    className={`text-[11px] leading-relaxed line-clamp-2 ${
                      isDark ? 'text-slate-200' : 'text-slate-600'
                    }`}
                  >
                    {isCurrentSection ? currentScene.subtitle : section.scenes[0].subtitle}
                  </p>

                  {/* Highlight Metric Pill */}
                  <div
                    className={`flex items-center gap-2 mt-2 px-2.5 py-1.5 rounded-xl border w-fit backdrop-blur-md ${
                      isDark
                        ? 'bg-[#11182B]/90 border-cyan-400/30'
                        : 'bg-white/90 border-slate-200/90 shadow-2xs'
                    }`}
                  >
                    <span
                      className={`text-xs font-black font-mono leading-none ${
                        isDark ? 'text-cyan-300' : 'text-blue-600'
                      }`}
                    >
                      {isCurrentSection ? currentScene.metric : section.scenes[0].metric}
                    </span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-300 font-medium">
                      {isCurrentSection ? currentScene.metricLabel : section.scenes[0].metricLabel}
                    </span>
                  </div>
                </div>

                {/* 3. Footer Action Button */}
                <div className="pt-2 border-t border-white/20 dark:border-white/10 flex items-center justify-between z-30">
                  <button
                    type="button"
                    onClick={(e) => handleActionClick(e, section.targetPage)}
                    className={`px-3 py-1 rounded-full text-white font-bold text-[11px] flex items-center gap-1 shadow-xs transition active:scale-95 cursor-pointer ${
                      isDark
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:brightness-110 shadow-[0_0_10px_rgba(34,211,238,0.3)]'
                        : 'bg-gradient-to-r from-blue-600 to-sky-600 hover:from-blue-700 hover:to-sky-700'
                    }`}
                  >
                    <span>{section.actionLabel}</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>

                  <div className="flex items-center gap-1">
                    {section.scenes.map((_, dotIdx) => (
                      <span
                        key={dotIdx}
                        className={`h-1.5 rounded-full transition-all ${
                          isCurrentSection && sceneIndex === dotIdx
                            ? 'w-4 bg-blue-600 dark:bg-cyan-400'
                            : 'w-1.5 bg-slate-300 dark:bg-slate-700'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Accessibility Status for Screen Readers */}
        <span
          role="status"
          className="sr-only"
          style={{
            position: 'absolute',
            width: '1px',
            height: '1px',
            overflow: 'hidden',
            clipPath: 'inset(50%)',
          }}
        >
          {isHolding ? 'Paused' : `${currentSection.label} - ${currentScene.title}`}
        </span>
      </div>
    </div>
  );
};
