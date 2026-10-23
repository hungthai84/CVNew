'use client';

import React, { useState, useMemo } from 'react';
import { EXPERIENCE_MILESTONES } from '@/data/experience';
import { SKILL_CATEGORIES } from '@/data/skills';
import { PROJECTS_DATA } from '@/data/projects';
import { SoundEngine } from '@/components/ui/SoundEngine';
import { WebIcon } from '@/components/ui/WebIcon';

export interface CareerMindmapProps {
  initialMilestoneKey?: string;
  onClose?: () => void;
  onOpenJobCard?: (milestoneKey: string) => void;
}

interface ConnectedSkillRef {
  categoryCode: string;
  quadrant: 'S' | 'W' | 'O' | 'T';
  name: string;
  percent: number;
  desc: string;
  icon: string;
}

interface ConnectedCaseStudyRef {
  id: string;
  code: string;
  title: string;
  role: string;
  progressPercent: number;
  highlightResult: string;
}

interface MilestoneMindmapConfig {
  key: string;
  shortName: string;
  yearRange: string;
  skillNames: string[];
  caseStudyIds: string[];
}

const MILESTONE_MINDMAP_CONFIGS: MilestoneMindmapConfig[] = [
  {
    key: '2003',
    shortName: 'MobiFone',
    yearRange: '2003 – 2007',
    skillNames: [
      'Trải nghiệm khách hàng',
      'CRM Contact Center',
      'SOP & Chuẩn hóa',
      'Tư duy dịch vụ',
      'Giao tiếp & Đàm phán',
    ],
    caseStudyIds: ['p1_1', 'p3_1'],
  },
  {
    key: '2007',
    shortName: 'Viễn Liên V247',
    yearRange: '2007 – 2011',
    skillNames: [
      'Quản trị Hiệu suất',
      'Lãnh đạo & Đội ngũ',
      'SOP & Chuẩn hóa',
      'CRM Contact Center',
      'Kaizen & Cải tiến',
    ],
    caseStudyIds: ['p1_2', 'p3_1'],
  },
  {
    key: '2011',
    shortName: 'LBC - HTVC',
    yearRange: '2011 – 2013',
    skillNames: [
      'Lãnh đạo & Đội ngũ',
      'Quản trị Hiệu suất',
      'Tư duy Chiến lược',
      'Tối ưu Chi phí',
      'Phối hợp Liên phòng',
    ],
    caseStudyIds: ['p1_1', 'p1_2'],
  },
  {
    key: '2013',
    shortName: 'VED (Garena · Shopee · AirPay)',
    yearRange: '2013 – 2016',
    skillNames: [
      'Lãnh đạo & Đội ngũ',
      'CRM Contact Center',
      'Xử lý Khủng hoảng',
      'Quản trị Dự án',
      'Thiết kế Hệ thống',
      'Cạnh tranh Nhân sự',
    ],
    caseStudyIds: ['p1_1', 'p1_2', 'p3_2'],
  },
  {
    key: '2016',
    shortName: 'Prudential Assurance',
    yearRange: '2016 – 2018',
    skillNames: [
      'Trải nghiệm khách hàng',
      'Quản trị Rủi ro',
      'Giao tiếp & Đàm phán',
      'Chuyển đổi Số',
      'Công nghệ Đổi mới',
    ],
    caseStudyIds: ['p3_1', 'p3_2'],
  },
  {
    key: '2018',
    shortName: 'Ví Điện Tử MoMo',
    yearRange: '2018 – 2021',
    skillNames: [
      'CRM Contact Center',
      'AI & Tự động hóa',
      'Quản trị Dữ liệu',
      'Tối ưu Chi phí',
      'Xử lý Khủng hoảng',
      'Quản trị Hiệu suất',
    ],
    caseStudyIds: ['p1_1', 'p3_1', 'p3_2'],
  },
  {
    key: '2023',
    shortName: 'Finviet (Ví ECO)',
    yearRange: '2023 – 2024',
    skillNames: [
      'AI & Tự động hóa',
      'Chuyển đổi Số',
      'Quản trị Dữ liệu',
      'AI & Thay đổi CSKH',
      'Thiết kế & Lập trình',
    ],
    caseStudyIds: ['p1_1', 'p1_2', 'p3_1'],
  },
  {
    key: '2026',
    shortName: 'CS Strategy 2026+',
    yearRange: '2026 – Hiện tại',
    skillNames: [
      'Tư duy Chiến lược',
      'AI & Tự động hóa',
      'Trải nghiệm khách hàng',
      'Lãnh đạo & Đội ngũ',
      'Thiết kế Hệ thống',
      'Kaizen & Cải tiến',
    ],
    caseStudyIds: ['p1_1', 'p1_2', 'p3_1', 'p3_2'],
  },
];

export const CareerMindmap: React.FC<CareerMindmapProps> = ({
  initialMilestoneKey = '2013',
  onClose,
  onOpenJobCard,
}) => {
  const [selectedKey, setSelectedKey] = useState<string>(initialMilestoneKey);
  const [selectedSubKey2013, setSelectedSubKey2013] = useState<string>('2013');
  const [highlightedSkillName, setHighlightedSkillName] = useState<string | null>(null);
  const [zoomScale, setZoomScale] = useState<number>(100);
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Tra cứu toàn bộ kỹ năng từ SKILL_CATEGORIES (data/skills.ts)
  const allSkillsMap = useMemo(() => {
    const map = new Map<string, ConnectedSkillRef>();
    SKILL_CATEGORIES.forEach((cat) => {
      cat.skills.forEach((sk) => {
        if (!map.has(sk.name)) {
          map.set(sk.name, {
            categoryCode: cat.code,
            quadrant: cat.quadrant,
            name: sk.name,
            percent: sk.percent,
            desc: sk.desc,
            icon: sk.icon,
          });
        }
      });
    });
    return map;
  }, []);

  // Tra cứu các dự án chiến lược từ PROJECTS_DATA (data/projects.ts)
  const caseStudyMap = useMemo(() => {
    const map = new Map<string, ConnectedCaseStudyRef>();
    PROJECTS_DATA.forEach((proj) => {
      map.set(proj.id, {
        id: proj.id,
        code: proj.code,
        title: proj.title,
        role: proj.role,
        progressPercent: proj.progressPercent,
        highlightResult: proj.star?.results?.[0] || proj.description,
      });
    });
    return map;
  }, []);

  const activeConfig = useMemo(() => {
    return (
      MILESTONE_MINDMAP_CONFIGS.find((c) => c.key === selectedKey) ||
      MILESTONE_MINDMAP_CONFIGS[3]
    );
  }, [selectedKey]);

  const effectiveMilestoneKey =
    selectedKey === '2013' ? selectedSubKey2013 : selectedKey;

  const activeMilestone = useMemo(() => {
    return (
      EXPERIENCE_MILESTONES[effectiveMilestoneKey] ||
      EXPERIENCE_MILESTONES[selectedKey] ||
      EXPERIENCE_MILESTONES['2013']
    );
  }, [effectiveMilestoneKey, selectedKey]);

  const connectedSkills = useMemo(() => {
    return activeConfig.skillNames
      .map((name) => allSkillsMap.get(name))
      .filter((item): item is ConnectedSkillRef => Boolean(item));
  }, [activeConfig, allSkillsMap]);

  const connectedCaseStudies = useMemo(() => {
    return activeConfig.caseStudyIds
      .map((id) => caseStudyMap.get(id))
      .filter((item): item is ConnectedCaseStudyRef => Boolean(item));
  }, [activeConfig, caseStudyMap]);

  // Các cột mốc có liên kết với kỹ năng đang được click chọn
  const milestonesMatchingSkill = useMemo(() => {
    if (!highlightedSkillName) return new Set<string>();
    const set = new Set<string>();
    MILESTONE_MINDMAP_CONFIGS.forEach((cfg) => {
      if (cfg.skillNames.includes(highlightedSkillName)) {
        set.add(cfg.key);
      }
    });
    return set;
  }, [highlightedSkillName]);

  // Lọc theo từ khóa tìm kiếm
  const filteredConfigs = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    if (!q) return MILESTONE_MINDMAP_CONFIGS;
    return MILESTONE_MINDMAP_CONFIGS.filter((cfg) => {
      const m = EXPERIENCE_MILESTONES[cfg.key];
      if (!m) return false;
      const inCompany = m.company.toLowerCase().includes(q) || cfg.shortName.toLowerCase().includes(q);
      const inRole = m.roleTitle.toLowerCase().includes(q);
      const inYear = cfg.yearRange.toLowerCase().includes(q);
      const inSkill = cfg.skillNames.some((s) => s.toLowerCase().includes(q));
      const inProjects = m.projects.some((p) => p.toLowerCase().includes(q));
      return inCompany || inRole || inYear || inSkill || inProjects;
    });
  }, [searchTerm]);

  const handleSelectNode = (key: string) => {
    SoundEngine.playTap();
    setSelectedKey(key);
    if (key !== '2013') {
      setSelectedSubKey2013('2013');
    }
  };

  const handleToggleSkillFilter = (skillName: string) => {
    SoundEngine.playTap();
    setHighlightedSkillName((prev) => (prev === skillName ? null : skillName));
  };

  return (
    <div className="w-full h-full flex flex-col gap-2.5 select-none text-slate-800 dark:text-slate-100 animate-fade-in overflow-hidden">
      {/* THANH ĐIỀU KHIỂN TRÊN CÙNG (MINDMAP HEADER BAR) */}
      <div className="w-full flex flex-wrap items-center justify-between gap-2 px-3.5 py-2 rounded-[18px] bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-indigo-200/80 dark:border-indigo-500/30 shadow-xs shrink-0">
        <div className="flex items-center gap-2.5 min-w-0">
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center text-white shadow-xs shrink-0"
            style={{
              background: `linear-gradient(135deg, ${activeMilestone.hexColor || '#2563eb'}, #4f46e5)`,
            }}
          >
            <WebIcon name="layers" className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-xs sm:text-sm font-black font-play tracking-tight text-slate-900 dark:text-white truncate">
                Bản Đồ Tư Duy Sự Nghiệp Toàn Diện (2003 – 2026+)
              </h3>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-50 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 border border-indigo-200/80 dark:border-indigo-500/40">
                8 Cột mốc × Kỹ năng × Dự án
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
              Nhấp vào từng cột mốc năm hoặc thẻ Kỹ năng để xem đường dẫn liên kết năng lực & dự án thực chiến
            </p>
          </div>
        </div>

        {/* Cụm công cụ: Tìm kiếm, Thu phóng & Đóng */}
        <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap shrink-0">
          {/* Ô tìm kiếm nhanh trong Mindmap */}
          <div className="relative flex items-center w-44 sm:w-52">
            <WebIcon
              name="search"
              className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 pointer-events-none"
            />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Lọc công ty, kỹ năng, dự án..."
              className="w-full pl-7 pr-6 py-1 rounded-full bg-slate-100/90 dark:bg-slate-800/90 border border-slate-200/90 dark:border-slate-700 text-[11px] font-semibold text-slate-700 dark:text-slate-200 placeholder:text-slate-400 focus:outline-none focus:border-indigo-400"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm('')}
                className="absolute right-2 text-[10px] text-slate-400 hover:text-slate-600 cursor-pointer"
                title="Xóa tìm kiếm"
              >
                ✕
              </button>
            )}
          </div>

          {/* Điều chỉnh thu phóng Sơ đồ */}
          <div className="hidden md:flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 text-[10.5px] font-bold">
            <button
              type="button"
              onClick={() => setZoomScale((z) => Math.max(85, z - 5))}
              className="px-1.5 py-0.5 rounded-full hover:bg-white dark:hover:bg-slate-700 cursor-pointer transition"
              title="Thu nhỏ sơ đồ"
            >
              −
            </button>
            <button
              type="button"
              onClick={() => setZoomScale(100)}
              className="px-1.5 py-0.5 font-mono text-[10px] text-indigo-600 dark:text-indigo-300 cursor-pointer"
              title="Đặt lại 100%"
            >
              {zoomScale}%
            </button>
            <button
              type="button"
              onClick={() => setZoomScale((z) => Math.min(115, z + 5))}
              className="px-1.5 py-0.5 rounded-full hover:bg-white dark:hover:bg-slate-700 cursor-pointer transition"
              title="Phóng to sơ đồ"
            >
              +
            </button>
          </div>

          {onClose && (
            <button
              type="button"
              onClick={() => {
                SoundEngine.playTap();
                onClose();
              }}
              className="px-3 py-1.5 rounded-full bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white text-[11px] font-bold shadow-xs flex items-center gap-1.5 cursor-pointer transition active:scale-95"
            >
              <WebIcon name="arrow-left" className="w-3.5 h-3.5" />
              <span>Quay lại Timeline</span>
            </button>
          )}
        </div>
      </div>

      {/* VÙNG SƠ ĐỒ TƯ DUY TƯƠNG TÁC CHÍNH (3 CỘT LIÊN KẾT MẠNG NÚT + SVG LINES) */}
      <div className="w-full flex-1 min-h-0 rounded-[20px] bg-white/85 dark:bg-slate-900/85 backdrop-blur-xl border border-white/95 dark:border-slate-800 shadow-xs p-2.5 sm:p-3.5 overflow-y-auto glass-scrollbar relative">
        <div
          style={{
            transform: zoomScale !== 100 ? `scale(${zoomScale / 100})` : undefined,
            transformOrigin: 'top center',
          }}
          className="w-full h-full flex flex-col gap-3 transition-transform duration-200"
        >
          {/* HÀNG 1: CHUỖI 8 NÚT CỘT MỐC KINH NGHIỆM (2003 -> 2026+) KẾT NỐI TRỰC TIẾP */}
          <div className="w-full">
            <div className="flex items-center justify-between gap-2 mb-1.5 px-1">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
                <span className="text-[11px] font-black uppercase tracking-wider text-slate-600 dark:text-slate-300">
                  Tuyến 1 · Cột Mốc Sự Nghiệp (2003 – 2026+)
                </span>
              </div>
              {highlightedSkillName && (
                <button
                  type="button"
                  onClick={() => setHighlightedSkillName(null)}
                  className="text-[10.5px] font-bold text-indigo-600 dark:text-cyan-300 bg-indigo-50 dark:bg-indigo-950/70 px-2.5 py-0.5 rounded-full border border-indigo-200 dark:border-indigo-600/50 cursor-pointer flex items-center gap-1"
                >
                  <span>Đang lọc theo kỹ năng: &ldquo;{highlightedSkillName}&rdquo;</span>
                  <span>✕</span>
                </button>
              )}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
              {filteredConfigs.map((cfg) => {
                const m = EXPERIENCE_MILESTONES[cfg.key];
                if (!m) return null;
                const isSelected = selectedKey === cfg.key;
                const isSkillMatched = highlightedSkillName
                  ? milestonesMatchingSkill.has(cfg.key)
                  : false;

                return (
                  <button
                    key={cfg.key}
                    type="button"
                    onClick={() => handleSelectNode(cfg.key)}
                    style={{
                      borderColor: isSelected
                        ? m.hexColor
                        : isSkillMatched
                        ? '#6366f1'
                        : undefined,
                      boxShadow: isSelected
                        ? `0 8px 20px -4px ${m.hexColor}40, 0 0 0 2px ${m.hexColor}`
                        : isSkillMatched
                        ? '0 0 0 2px rgba(99,102,241,0.55)'
                        : undefined,
                    }}
                    className={`group relative rounded-2xl p-2 border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between gap-1.5 ${
                      isSelected
                        ? 'bg-white dark:bg-slate-800 -translate-y-0.5'
                        : isSkillMatched
                        ? 'bg-indigo-50/70 dark:bg-indigo-950/40 border-indigo-300'
                        : 'bg-slate-50/85 dark:bg-slate-800/60 border-slate-200/80 dark:border-slate-700/70 hover:bg-white dark:hover:bg-slate-800 hover:-translate-y-0.5'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-1 w-full">
                      <span
                        className="px-2 py-0.5 rounded-full text-[9.5px] font-black text-white tracking-tight shrink-0"
                        style={{ backgroundColor: m.hexColor || '#2563eb' }}
                      >
                        {cfg.yearRange}
                      </span>
                      <span className="text-[9.5px] font-bold text-slate-400 dark:text-slate-400 truncate">
                        {m.tenure}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 min-w-0 my-0.5">
                      <div className="w-7 h-7 rounded-full overflow-hidden shrink-0 bg-white border border-slate-100 flex items-center justify-center">
                        <img
                          src={m.logo}
                          alt={cfg.shortName}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-[11px] font-black text-slate-800 dark:text-white leading-tight truncate">
                          {cfg.shortName}
                        </p>
                        <p className="text-[9.5px] font-semibold text-slate-500 dark:text-slate-400 truncate">
                          {m.tag}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[9.5px] font-bold text-slate-500 dark:text-slate-400 pt-1 border-t border-slate-200/60 dark:border-slate-700/60">
                      <span>{cfg.skillNames.length} kỹ năng</span>
                      <span>{m.projects.length} dự án</span>
                    </div>

                    {/* Điểm nối nút bên dưới */}
                    {isSelected && (
                      <span
                        className="w-2.5 h-2.5 rounded-full absolute -bottom-1.5 left-1/2 -translate-x-1/2 border-2 border-white dark:border-slate-900 shadow-xs"
                        style={{ backgroundColor: m.hexColor || '#2563eb' }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* ĐƯỜNG DẪN SVG LIÊN KẾT ĐỘNG (DYNAMIC MINDMAP CONNECTOR SVG) */}
          <div className="w-full h-7 sm:h-9 relative flex items-center justify-center shrink-0 overflow-hidden pointer-events-none -my-1">
            <svg className="w-full h-full" viewBox="0 0 1000 40" preserveAspectRatio="none">
              <defs>
                <linearGradient id="mindmapGradLeft" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#0284c7" stopOpacity="0.85" />
                  <stop offset="100%" stopColor={activeMilestone.hexColor || '#4f46e5'} stopOpacity="0.95" />
                </linearGradient>
                <linearGradient id="mindmapGradRight" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor={activeMilestone.hexColor || '#4f46e5'} stopOpacity="0.95" />
                  <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.85" />
                </linearGradient>
              </defs>
              {/* Đường cong tỏa sang 3 nhánh: Kỹ năng (Trái) - Trung tâm (Giữa) - Dự án (Phải) */}
              <path
                d="M 500 2 C 500 20, 180 12, 180 38"
                fill="none"
                stroke="url(#mindmapGradLeft)"
                strokeWidth="2.5"
                strokeDasharray="6 4"
              />
              <path
                d="M 500 2 L 500 38"
                fill="none"
                stroke={activeMilestone.hexColor || '#4f46e5'}
                strokeWidth="3"
              />
              <path
                d="M 500 2 C 500 20, 820 12, 820 38"
                fill="none"
                stroke="url(#mindmapGradRight)"
                strokeWidth="2.5"
                strokeDasharray="6 4"
              />
              <circle cx="180" cy="36" r="4" fill="#0284c7" />
              <circle cx="500" cy="20" r="5" fill={activeMilestone.hexColor || '#4f46e5'} />
              <circle cx="820" cy="36" r="4" fill="#7c3aed" />
            </svg>
          </div>

          {/* HÀNG 2: BA KHỐI NÚT TƯƠNG TÁC (KỸ NĂNG CỐT LÕI <-- HẠT NHÂN CÔNG TY --> DỰ ÁN & KPI THỰC CHIẾN) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-stretch flex-1 min-h-0">
            {/* NHÁNH TRÁI (4 CỘT): CÁC KỸ NĂNG QUẢN TRỊ ĐƯỢC HÌNH THÀNH & ỨNG DỤNG */}
            <div className="lg:col-span-4 rounded-2xl p-3 bg-gradient-to-br from-sky-50/90 via-white to-indigo-50/60 dark:from-slate-800/90 dark:via-slate-900 dark:to-indigo-950/40 border border-sky-200/80 dark:border-sky-500/30 flex flex-col gap-2 shadow-2xs">
              <div className="flex items-center justify-between gap-2 pb-1.5 border-b border-sky-200/60 dark:border-slate-700">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-sky-600 text-white flex items-center justify-center shadow-2xs">
                    <WebIcon name="bolt" className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-slate-900 dark:text-white">
                      Nhánh Kỹ Năng Cốt Lõi ({connectedSkills.length})
                    </h4>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400">
                      Nhấp vào kỹ năng để lọc các giai đoạn liên quan
                    </p>
                  </div>
                </div>
                <span className="text-[10px] font-mono font-bold text-sky-700 dark:text-sky-300 bg-sky-100/80 dark:bg-sky-950 px-2 py-0.5 rounded-full">
                  SWOT 7.1–7.4
                </span>
              </div>

              <div className="flex flex-col gap-2 overflow-y-auto glass-scrollbar pr-0.5">
                {connectedSkills.map((sk) => {
                  const isSkillActive = highlightedSkillName === sk.name;
                  const metricLabel =
                    sk.quadrant === 'T' ? 'Mức độ tác động' : 'Mức độ kỹ năng';

                  return (
                    <button
                      key={sk.name}
                      type="button"
                      onClick={() => handleToggleSkillFilter(sk.name)}
                      className={`w-full text-left p-2.5 rounded-xl border transition-all cursor-pointer flex flex-col gap-1.5 ${
                        isSkillActive
                          ? 'bg-indigo-600 text-white border-indigo-500 shadow-sm'
                          : 'bg-white/90 dark:bg-slate-800/80 hover:bg-white dark:hover:bg-slate-800 border-slate-200/80 dark:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-1.5 min-w-0">
                          <span
                            className={`px-1.5 py-0.5 rounded text-[9px] font-black shrink-0 ${
                              isSkillActive
                                ? 'bg-white/20 text-white'
                                : 'bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300'
                            }`}
                          >
                            {sk.categoryCode}
                          </span>
                          <span className="text-xs font-black truncate">{sk.name}</span>
                        </div>
                        <span
                          className={`text-xs font-mono font-black shrink-0 ${
                            isSkillActive ? 'text-cyan-200' : 'text-sky-600 dark:text-sky-400'
                          }`}
                        >
                          {sk.percent}%
                        </span>
                      </div>

                      <p
                        className={`text-[10.5px] leading-snug line-clamp-2 ${
                          isSkillActive ? 'text-indigo-100' : 'text-slate-600 dark:text-slate-300'
                        }`}
                      >
                        {sk.desc}
                      </p>

                      <div className="w-full flex items-center justify-between gap-2 pt-0.5">
                        <span
                          className={`text-[9.5px] font-semibold ${
                            isSkillActive ? 'text-indigo-200' : 'text-slate-400 dark:text-slate-400'
                          }`}
                        >
                          {metricLabel}
                        </span>
                        <div className="w-24 h-1.5 rounded-full bg-slate-200/80 dark:bg-slate-700 overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              isSkillActive
                                ? 'bg-cyan-300'
                                : 'bg-gradient-to-r from-sky-500 to-indigo-600'
                            }`}
                            style={{ width: `${sk.percent}%` }}
                          />
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* HẠT NHÂN TRUNG TÂM (4 CỘT): THÔNG TIN CỘT MỐC KINH NGHIỆM & LĨNH VỰC */}
            <div
              style={{
                borderColor: `${activeMilestone.hexColor || '#2563eb'}66`,
              }}
              className="lg:col-span-4 rounded-2xl p-3.5 bg-white dark:bg-slate-800/95 border-2 shadow-sm flex flex-col justify-between gap-2.5 relative overflow-hidden"
            >
              {/* Glow trang trí theo màu thương hiệu công ty */}
              <div
                className="w-40 h-40 rounded-full blur-3xl opacity-15 pointer-events-none absolute -top-10 -right-10"
                style={{ backgroundColor: activeMilestone.hexColor || '#2563eb' }}
              />

              <div className="flex flex-col gap-2 relative z-10">
                {/* Header công ty */}
                <div className="flex items-start justify-between gap-2.5">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div
                      className="w-12 h-12 rounded-2xl overflow-hidden shrink-0 bg-white border-2 shadow-xs flex items-center justify-center"
                      style={{ borderColor: activeMilestone.hexColor || '#2563eb' }}
                    >
                      <img
                        src={activeMilestone.logo}
                        alt={activeMilestone.company}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span
                          className="px-2 py-0.5 rounded-full text-[10px] font-black text-white"
                          style={{ backgroundColor: activeMilestone.hexColor || '#2563eb' }}
                        >
                          {activeMilestone.cardYearLabel}
                        </span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200">
                          {activeMilestone.tag}
                        </span>
                      </div>
                      <h3 className="text-sm font-black text-slate-900 dark:text-white leading-snug mt-1 break-words">
                        {activeMilestone.company}
                      </h3>
                    </div>
                  </div>
                </div>

                {/* Nếu là cụm 2013 (VED) cho phép chuyển nhanh giữa VED, Garena, Shopee, AirPay, Gcafe */}
                {selectedKey === '2013' && (
                  <div className="flex flex-wrap items-center gap-1 pt-1 pb-1 border-y border-slate-100 dark:border-slate-700/70">
                    {[
                      { k: '2013', label: 'VED Tổng thể' },
                      { k: '2013-garena', label: 'Garena eSports' },
                      { k: '2013-shopee', label: 'Shopee TMĐT' },
                      { k: '2014-airpay', label: 'Ví AirPay' },
                      { k: '2013-gcafe', label: 'Gcafe B2B' },
                    ].map((sub) => (
                      <button
                        key={sub.k}
                        type="button"
                        onClick={() => {
                          SoundEngine.playTap();
                          setSelectedSubKey2013(sub.k);
                        }}
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold transition cursor-pointer ${
                          selectedSubKey2013 === sub.k
                            ? 'bg-red-600 text-white shadow-2xs'
                            : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                        }`}
                      >
                        {sub.label}
                      </button>
                    ))}
                  </div>
                )}

                {/* Chức danh & Quy mô nhân sự */}
                <div className="grid grid-cols-3 gap-1.5 p-2 rounded-xl bg-slate-50 dark:bg-slate-900/70 border border-slate-200/70 dark:border-slate-700/70">
                  <div className="col-span-2 min-w-0">
                    <span className="text-[9.5px] font-bold uppercase text-slate-400 block">
                      Chức danh đảm nhiệm
                    </span>
                    <span className="text-[11.5px] font-black text-slate-800 dark:text-white truncate block">
                      {activeMilestone.roleTitle}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[9.5px] font-bold uppercase text-slate-400 block">
                      Quy mô
                    </span>
                    <span
                      className="text-xs font-mono font-black"
                      style={{ color: activeMilestone.hexColor || '#2563eb' }}
                    >
                      {activeMilestone.headcount} Nhân sự
                    </span>
                  </div>
                </div>

                {/* Tóm tắt trọng tâm */}
                <p className="text-[11.5px] leading-relaxed text-slate-600 dark:text-slate-300 bg-slate-50/60 dark:bg-slate-900/40 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800">
                  {activeMilestone.cardDescription}
                </p>

                {/* Các mảng nghiệp vụ (Domains) */}
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                    Mảng nghiệp vụ & Hệ sinh thái quản lý:
                  </span>
                  <div className="grid grid-cols-1 gap-1.5">
                    {activeMilestone.domains.slice(0, 3).map((dom, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between gap-2 px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-700/60"
                      >
                        <div className="min-w-0">
                          <span className="text-[11px] font-bold text-slate-800 dark:text-slate-100 block truncate">
                            {dom.title}
                          </span>
                          <span className="text-[10px] text-slate-500 dark:text-slate-400 block truncate">
                            {dom.desc}
                          </span>
                        </div>
                        <span className="px-2 py-0.5 rounded-full text-[9.5px] font-bold bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 shrink-0">
                          {dom.tag}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Nút mở thẻ Hồ Sơ Công Việc Chi Tiết (Job Card) */}
              {onOpenJobCard && (
                <button
                  type="button"
                  onClick={() => {
                    SoundEngine.playTap();
                    onOpenJobCard(effectiveMilestoneKey);
                  }}
                  style={{
                    background: `linear-gradient(135deg, ${activeMilestone.hexColor || '#2563eb'}, #4f46e5)`,
                  }}
                  className="w-full py-2 px-3 rounded-xl text-white font-bold text-xs shadow-sm hover:opacity-95 transition flex items-center justify-center gap-2 cursor-pointer mt-1 relative z-10"
                >
                  <span>Xem Hồ Sơ Công Việc Chi Tiết ({activeMilestone.year})</span>
                  <WebIcon name="arrow-right" className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* NHÁNH PHẢI (4 CỘT): DỰ ÁN TIÊU BIỂU, CASE STUDY & CHỈ SỐ KPI ĐẠT ĐƯỢC */}
            <div className="lg:col-span-4 rounded-2xl p-3 bg-gradient-to-br from-purple-50/90 via-white to-pink-50/60 dark:from-slate-800/90 dark:via-slate-900 dark:to-purple-950/40 border border-purple-200/80 dark:border-purple-500/30 flex flex-col gap-2.5 shadow-2xs">
              <div className="flex items-center justify-between gap-2 pb-1.5 border-b border-purple-200/60 dark:border-slate-700">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-purple-600 text-white flex items-center justify-center shadow-2xs">
                    <WebIcon name="rocket" className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-slate-900 dark:text-white">
                      Nhánh Dự Án & Thành Tựu KPI
                    </h4>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400">
                      Dự án thực tế triển khai & chỉ số đo lường
                    </p>
                  </div>
                </div>
                <span className="text-[10px] font-mono font-bold text-purple-700 dark:text-purple-300 bg-purple-100/80 dark:bg-purple-950 px-2 py-0.5 rounded-full">
                  {activeMilestone.projects.length} Dự án
                </span>
              </div>

              <div className="flex flex-col gap-2 overflow-y-auto glass-scrollbar pr-0.5">
                {/* Danh sách dự án trực tiếp tại công ty */}
                <div className="p-2.5 rounded-xl bg-white/90 dark:bg-slate-800/80 border border-purple-100 dark:border-slate-700 flex flex-col gap-1.5">
                  <span className="text-[10px] font-black uppercase tracking-wider text-purple-700 dark:text-purple-300">
                    Dự án trọng점 giai đoạn {activeMilestone.cardYearLabel}:
                  </span>
                  <ul className="flex flex-col gap-1">
                    {activeMilestone.projects.map((projName, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-1.5 text-[11px] font-bold text-slate-700 dark:text-slate-200"
                      >
                        <span
                          className="w-4 h-4 rounded-full text-[9px] font-black text-white flex items-center justify-center shrink-0 mt-0.5"
                          style={{ backgroundColor: activeMilestone.hexColor || '#7c3aed' }}
                        >
                          {idx + 1}
                        </span>
                        <span className="leading-snug">{projName}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Liên kết Case Study Chiến lược (STAR) */}
                <div className="flex flex-col gap-1.5">
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 px-0.5">
                    Chuyên đề Dự án Chiến lược (STAR) liên kết:
                  </span>
                  {connectedCaseStudies.map((cs) => (
                    <div
                      key={cs.id}
                      className="p-2 rounded-xl bg-white/90 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700 flex flex-col gap-1"
                    >
                      <div className="flex items-center justify-between gap-1.5">
                        <span className="text-[11px] font-black text-purple-700 dark:text-purple-300 truncate">
                          {cs.title}
                        </span>
                        <span className="text-[9.5px] font-mono font-bold px-1.5 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 shrink-0">
                          {cs.progressPercent}%
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-600 dark:text-slate-300 line-clamp-2">
                        ✓ {cs.highlightResult}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Bộ chỉ số KPI đạt được trong giai đoạn */}
                <div className="p-2.5 rounded-xl bg-white/90 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700 flex flex-col gap-1.5">
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Chỉ số KPI & SLA ghi nhận:
                  </span>
                  <div className="grid grid-cols-2 gap-1.5">
                    {activeMilestone.kpis.map((kpi, idx) => (
                      <div
                        key={idx}
                        className="p-1.5 rounded-lg bg-slate-50 dark:bg-slate-900/70 border border-slate-200/60 dark:border-slate-700/60 flex flex-col"
                      >
                        <div className="flex items-center justify-between gap-1">
                          <span className="text-[10px] font-semibold text-slate-600 dark:text-slate-300 truncate">
                            {kpi.label}
                          </span>
                          <span
                            className="text-[11px] font-mono font-black shrink-0"
                            style={{ color: activeMilestone.hexColor || '#7c3aed' }}
                          >
                            {kpi.percent}%
                          </span>
                        </div>
                        <div className="w-full h-1 rounded-full bg-slate-200 dark:bg-slate-700 mt-1 overflow-hidden">
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${kpi.percent}%`,
                              backgroundColor: activeMilestone.hexColor || '#7c3aed',
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
