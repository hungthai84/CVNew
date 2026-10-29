'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { motion } from 'motion/react';
import { formatCardTitle } from '@/lib/utils';
import { SoundEngine } from '@/components/ui/SoundEngine';
import {
  getSavedVoiceURI,
  findBestVoice,
  VOICE_CHANGE_EVENT,
} from '@/utils/speechVoice';
import {
  Gem,
  BarChart3,
  ShieldCheck,
  Rocket,
  Bot,
  ChevronRight,
  ArrowLeft,
  Zap,
  MessageCircle,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  RotateCw,
  Volume2,
  VolumeX,
  X,
  ExternalLink,
  LayoutGrid,
} from 'lucide-react';
import { InfographicMindmap } from '@/components/ui/InfographicMindmap';
import {
  STRENGTHS_DATA,
  WEAKNESSES_DATA,
  OPPORTUNITIES_DATA,
  THREATS_DATA,
  LANGUAGES_DATA,
} from '@/data/skills';
import { SiteTheme } from '@/types';
import { cn } from '@/lib/utils';

export interface SkillsViewProps {
  currentTheme?: SiteTheme;
  onNavigatePage?: (pageIndex: number) => void;
}

interface SkillPill {
  name: string;
  score: string;
  desc: string;
}

interface SkillDetailItem {
  title: string;
  percent: number;
  desc: string;
}

interface SkillCardData {
  id: string;
  categoryFilter: 'S' | 'W' | 'O' | 'T' | 'LANG';
  themeColor: string;
  iconBg: string;
  cardBg: string;
  cardDarkBg?: string;
  cardBorder: string;
  arrowBg: string;
  arrowShadow: string;
  ambientGlow: string;
  title: string;
  groupHeading: string;
  subTag: string;
  desc: string;
  illustrationSrc: string;
  pills: SkillPill[];
  details: SkillDetailItem[];
  metricLabel: string;
}

// 15s Executive Audio Summaries cho từng nhóm kỹ năng cốt lõi (Chuẩn 100% dữ liệu gốc)
const SKILL_AUDIO_SUMMARIES: Record<string, { title: string; text: string }> = {
  'skill-01': {
    title: 'Nền Tảng Vận Hành',
    text: 'Hơn 22 năm quản lý dịch vụ khách hàng với thế mạnh hoạch định chiến lược 95%, thiết lập KPI SLA 95% và giải quyết khiếu nại xuất sắc 92%.',
  },
  'skill-02': {
    title: 'Nâng Cao Quản Trị',
    text: 'Năng lực quản trị chiến lược và điều hành đa kênh, hướng tới hoàn thiện quản trị chi phí 80%, quản trị rủi ro 80% và xây dựng văn hóa khách hàng 85%.',
  },
  'skill-03': {
    title: 'Chuyển Đổi Dịch Vụ',
    text: 'Cơ hội nâng tầm dịch vụ qua cải tiến liên tục Kaizen 88%, tối ưu hóa chi phí vận hành 85% và chuyển đổi số toàn diện trung tâm chăm sóc khách hàng 85%.',
  },
  'skill-04': {
    title: 'Công Nghệ & AI',
    text: 'Ứng dụng công nghệ trí tuệ nhân tạo và tự động hóa 85%, khai thác dữ liệu vận hành 85% và thiết kế hệ thống Contact Center chuẩn quốc tế 82%.',
  },
  'skill-05': {
    title: 'Quản Trị Biến Động',
    text: 'Khả năng thích ứng trước biến động: biến động nhân sự CSKH tác động 85%, thay đổi hành vi người dùng số 85% và bảo mật an toàn dữ liệu 88%.',
  },
  'skill-06': {
    title: 'Giao Tiếp & Làm Việc',
    text: 'Khả năng sử dụng ngôn ngữ linh hoạt kết hợp công cụ AI hỗ trợ: Tiếng Việt bản ngữ 100%, Tiếng Anh giao tiếp công việc 75% và sử dụng AI song ngữ 85%.',
  },
};

export const SkillsView: React.FC<SkillsViewProps> = ({
  currentTheme = 'light-glass',
  onNavigatePage,
}) => {
  // Chỉ để lại dạng view Sơ Đồ Tư Duy (Mindmap View)
  const viewMode = 'mindmap' as const;
  const [activeFilter, setActiveFilter] = useState<'all' | 'S' | 'W' | 'O' | 'T' | 'LANG'>('all');
  const [searchQuery] = useState<string>('');
  const [selectedCard, setSelectedCard] = useState<SkillCardData | null>(null);
  const [isDark, setIsDark] = useState<boolean>(false);

  // 1. Quick KPI Flip Mini-Card state (Đồng bộ format với DomainsView)
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});

  // 2. 15s Executive Audio Summary state & Voice Sync with AI Assistant
  const [playingAudioId, setPlayingAudioId] = useState<string | null>(null);
  const [audioProgress, setAudioProgress] = useState<number>(0);
  const [audioTimeLeft, setAudioTimeLeft] = useState<number>(15);
  const [speechVoices, setSpeechVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoiceURI, setSelectedVoiceURI] = useState<string>('');
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);

  useEffect(() => {
    const checkDark = () => {
      setIsDark(
        currentTheme === 'dark-neon' ||
          document.documentElement.classList.contains('dark') ||
          document.documentElement.getAttribute('data-theme') === 'dark-neon'
      );
    };
    checkDark();
    const observer = new MutationObserver(checkDark);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class', 'data-theme'],
    });
    return () => observer.disconnect();
  }, [currentTheme]);

  // Đồng bộ giọng đọc với AI Trợ lý đang dùng
  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    const updateVoices = () => {
      const availVoices = window.speechSynthesis.getVoices();
      setSpeechVoices(availVoices);
      const savedURI = getSavedVoiceURI();
      const best = findBestVoice(availVoices, savedURI);
      if (best) {
        setSelectedVoiceURI(savedURI || best.voiceURI);
      }
    };

    updateVoices();
    window.speechSynthesis.onvoiceschanged = updateVoices;

    // Lắng nghe sự kiện người dùng thay đổi giọng đọc trong cài đặt Trợ Lý AI
    const handleVoiceChange = (e: Event) => {
      const customEvent = e as CustomEvent<{ voiceURI: string }>;
      if (customEvent.detail?.voiceURI) {
        setSelectedVoiceURI(customEvent.detail.voiceURI);
      }
    };

    window.addEventListener(VOICE_CHANGE_EVENT, handleVoiceChange);

    return () => {
      window.removeEventListener(VOICE_CHANGE_EVENT, handleVoiceChange);
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Lấy nhãn hiển thị giọng đọc AI đang sử dụng
  const currentAiVoiceLabel = (() => {
    const availVoices =
      speechVoices.length > 0
        ? speechVoices
        : typeof window !== 'undefined' && 'speechSynthesis' in window
        ? window.speechSynthesis.getVoices()
        : [];
    const v = findBestVoice(availVoices, selectedVoiceURI || getSavedVoiceURI());
    if (!v) return 'Giọng Trợ Lý AI';
    if (/nam\s*minh/i.test(v.name)) return 'Nam Minh AI (Edge)';
    if (/tiếng việt 5|tieng viet 5/i.test(v.name)) return 'Tiếng Việt 5 AI (Chrome)';
    if (/hoai\s*my/i.test(v.name)) return 'Hoài My AI';
    if (/an\s*online/i.test(v.name)) return 'An AI';
    return v.name.split('-')[0].trim();
  })();

  // Lật thẻ 3D mặt trước / mặt sau
  const toggleCardFlip = (cardId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    SoundEngine.playPageFlip();
    setFlippedCards((prev) => ({ ...prev, [cardId]: !prev[cardId] }));
  };

  // Phát / Tạm dừng thuyết minh tóm tắt AI 15s (Dùng chung 100% giọng đọc của AI Trợ Lý)
  const handleToggleAudio = (cardId: string, summaryText: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    if (playingAudioId === cardId) {
      window.speechSynthesis.cancel();
      setPlayingAudioId(null);
      setAudioProgress(0);
      setAudioTimeLeft(15);
      SoundEngine.playTap();
      return;
    }

    window.speechSynthesis.cancel();
    SoundEngine.playTap();
    setPlayingAudioId(cardId);
    setAudioProgress(0);
    setAudioTimeLeft(15);

    // Làm sạch ký tự markdown
    const cleanText = summaryText
      .replace(/\*\*(.*?)\*\*/g, '$1')
      .replace(/[•#*>\-]/g, ' ')
      .replace(/\n+/g, '. ')
      .trim();

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 1.0;
    utterance.pitch = 1.05;

    const availVoices = speechVoices.length > 0 ? speechVoices : window.speechSynthesis.getVoices();
    const currentVoiceURI = selectedVoiceURI || getSavedVoiceURI();
    const chosenVoice = findBestVoice(availVoices, currentVoiceURI);

    if (chosenVoice) {
      utterance.voice = chosenVoice;
      utterance.lang = chosenVoice.lang || 'vi-VN';
    } else {
      utterance.lang = 'vi-VN';
    }

    utterance.onend = () => {
      setPlayingAudioId(null);
      setAudioProgress(100);
      setTimeout(() => setAudioProgress(0), 400);
    };

    utterance.onerror = () => {
      setPlayingAudioId(null);
    };

    window.speechSynthesis.speak(utterance);
  };

  // Timer 15 giây đếm ngược và cập nhật tiến trình thanh phát
  useEffect(() => {
    if (!playingAudioId) return;
    const startTime = Date.now();
    const totalDuration = 15000; // 15 seconds

    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, Math.ceil((totalDuration - elapsed) / 1000));
      const progress = Math.min(100, (elapsed / totalDuration) * 100);

      setAudioTimeLeft(remaining);
      setAudioProgress(progress);

      if (elapsed >= totalDuration) {
        clearInterval(timer);
        if (typeof window !== 'undefined') window.speechSynthesis.cancel();
        setPlayingAudioId(null);
        setAudioProgress(0);
        setAudioTimeLeft(15);
      }
    }, 100);

    return () => {
      clearInterval(timer);
      if (typeof window !== 'undefined') window.speechSynthesis.cancel();
    };
  }, [playingAudioId]);

  // Phân bổ hợp lý 5 nhóm dữ liệu chuẩn (27 mục kỹ năng) vào 6 thẻ mà giữ nguyên 100% data gốc
  const skillCards: SkillCardData[] = useMemo(() => {
    const oppServiceItems = OPPORTUNITIES_DATA.filter((item) =>
      ['Kaizen & Cải tiến', 'Tối ưu Chi phí', 'Chuyển đổi Số'].includes(item.labelVi)
    );
    const oppTechItems = OPPORTUNITIES_DATA.filter((item) =>
      ['AI & Tự động hóa', 'Quản trị Dữ liệu', 'Thiết kế Hệ thống'].includes(item.labelVi)
    );

    return [
      /* THẺ 1: ĐIỂM MẠNH — NỀN TẢNG VẬN HÀNH (Sky/Blue) */
      {
        id: 'skill-01',
        categoryFilter: 'S',
        themeColor: isDark ? '#38bdf8' : '#0284c7',
        iconBg: 'linear-gradient(135deg, #38bdf8 0%, #0284c7 100%)',
        cardBg: 'linear-gradient(135deg, rgba(224, 242, 254, 0.72) 0%, rgba(186, 230, 253, 0.62) 100%)',
        cardDarkBg: 'linear-gradient(135deg, rgba(12, 74, 110, 0.52) 0%, rgba(15, 23, 42, 0.84) 100%)',
        cardBorder: isDark ? 'border-sky-400/45 hover:border-sky-300' : 'border-[#38bdf8]/60 hover:border-[#0284c7]',
        arrowBg: 'linear-gradient(135deg, #38bdf8 0%, #0284c7 100%)',
        arrowShadow: '0 4px 12px rgba(2, 132, 199, 0.4)',
        ambientGlow:
          'radial-gradient(circle at 75% 50%, rgba(56, 189, 248, 0.35) 0%, rgba(14, 165, 233, 0.18) 55%, transparent 75%)',
        title: 'Nền Tảng Vận Hành',
        groupHeading: 'Điểm mạnh : Nền tảng vận hành & lãnh đạo',
        subTag: 'Điểm mạnh : Nền tảng vận hành & lãnh đạo',
        desc: 'Những năng lực cốt lõi đã được chứng minh qua thực tiễn quản lý, vận hành và phát triển hệ thống Dịch vụ Khách hàng.',
        illustrationSrc: 'https://i.ibb.co/BH1N9dkx/N-n-T-ng-V-n-H-nh.png',
        metricLabel: 'Chỉ số năng lực cốt lõi',
        pills: STRENGTHS_DATA.map((s) => ({
          name: s.labelVi,
          score: `${s.percent}%`,
          desc: s.descVi || '',
        })),
        details: STRENGTHS_DATA.map((s) => ({
          title: s.labelVi,
          percent: s.percent,
          desc: s.descVi || '',
        })),
      },

      /* THẺ 2: HOÀN THIỆN — NÂNG CAO QUẢN TRỊ (Orange) */
      {
        id: 'skill-02',
        categoryFilter: 'W',
        themeColor: isDark ? '#fb923c' : '#ea580c',
        iconBg: 'linear-gradient(135deg, #fbbf24 0%, #ea580c 100%)',
        cardBg: 'linear-gradient(135deg, rgba(254, 243, 199, 0.72) 0%, rgba(253, 230, 138, 0.62) 100%)',
        cardDarkBg: 'linear-gradient(135deg, rgba(124, 45, 18, 0.48) 0%, rgba(15, 23, 42, 0.84) 100%)',
        cardBorder: isDark ? 'border-orange-400/45 hover:border-orange-300' : 'border-[#fb923c]/60 hover:border-[#ea580c]',
        arrowBg: 'linear-gradient(135deg, #fbbf24 0%, #ea580c 100%)',
        arrowShadow: '0 4px 12px rgba(234, 88, 12, 0.4)',
        ambientGlow:
          'radial-gradient(circle at 75% 50%, rgba(251, 146, 60, 0.32) 0%, rgba(234, 88, 12, 0.16) 55%, transparent 75%)',
        title: 'Nâng Cao Quản Trị',
        groupHeading: 'Hoàn thiện : Nâng cao năng lực quản trị',
        subTag: 'Hoàn thiện : Nâng cao năng lực quản trị',
        desc: 'Những năng lực cần tiếp tục hoàn thiện để nâng tầm vai trò quản lý từ vận hành hiệu quả sang quản trị chiến lược và phát triển bền vững.',
        illustrationSrc: 'https://i.ibb.co/Q7JzbKjW/N-ng-T-m-Qu-n-Tr.png',
        metricLabel: 'Chỉ số năng lực hoàn thiện',
        pills: WEAKNESSES_DATA.map((s) => ({
          name: s.labelVi,
          score: `${s.percent}%`,
          desc: s.descVi || '',
        })),
        details: WEAKNESSES_DATA.map((s) => ({
          title: s.labelVi,
          percent: s.percent,
          desc: s.descVi || '',
        })),
      },

      /* THẺ 3: CƠ HỘI — CHUYỂN ĐỔI DỊCH VỤ (Purple) */
      {
        id: 'skill-03',
        categoryFilter: 'O',
        themeColor: isDark ? '#c084fc' : '#7c3aed',
        iconBg: 'linear-gradient(135deg, #a78bfa 0%, #7c3aed 100%)',
        cardBg: 'linear-gradient(135deg, rgba(243, 232, 255, 0.72) 0%, rgba(233, 213, 255, 0.62) 100%)',
        cardDarkBg: 'linear-gradient(135deg, rgba(88, 28, 135, 0.52) 0%, rgba(15, 23, 42, 0.84) 100%)',
        cardBorder: isDark ? 'border-purple-400/45 hover:border-purple-300' : 'border-[#a855f7]/60 hover:border-[#7c3aed]',
        arrowBg: 'linear-gradient(135deg, #a78bfa 0%, #7c3aed 100%)',
        arrowShadow: '0 4px 12px rgba(124, 58, 237, 0.4)',
        ambientGlow:
          'radial-gradient(circle at 75% 50%, rgba(192, 132, 252, 0.35) 0%, rgba(124, 58, 237, 0.18) 55%, transparent 75%)',
        title: 'Chuyển Đổi Dịch Vụ',
        groupHeading: 'Cơ hội : Công nghệ & chuyển đổi dịch vụ',
        subTag: 'Cơ hội : Công nghệ & chuyển đổi dịch vụ',
        desc: 'Những năng lực tạo đòn bẩy để nâng cao hiệu quả vận hành, tối ưu nguồn lực và chuyển đổi mô hình Dịch vụ Khách hàng trong thời đại số.',
        illustrationSrc: 'https://i.ibb.co/wrJm7r1z/Chuy-n-i-D-ch-V.png',
        metricLabel: 'Chỉ số đòn bẩy phát triển',
        pills: oppServiceItems.map((s) => ({
          name: s.labelVi,
          score: `${s.percent}%`,
          desc: s.descVi || '',
        })),
        details: [...oppServiceItems, ...oppTechItems].map((s) => ({
          title: s.labelVi,
          percent: s.percent,
          desc: s.descVi || '',
        })),
      },

      /* THẺ 4: CƠ HỘI — CÔNG NGHỆ & AI (Pink) */
      {
        id: 'skill-04',
        categoryFilter: 'O',
        themeColor: isDark ? '#f472b6' : '#db2777',
        iconBg: 'linear-gradient(135deg, #f472b6 0%, #db2777 100%)',
        cardBg: 'linear-gradient(135deg, rgba(252, 231, 243, 0.72) 0%, rgba(251, 207, 232, 0.62) 100%)',
        cardDarkBg: 'linear-gradient(135deg, rgba(131, 24, 67, 0.5) 0%, rgba(15, 23, 42, 0.84) 100%)',
        cardBorder: isDark ? 'border-pink-400/45 hover:border-pink-300' : 'border-[#ec4899]/60 hover:border-[#db2777]',
        arrowBg: 'linear-gradient(135deg, #f472b6 0%, #db2777 100%)',
        arrowShadow: '0 4px 12px rgba(219, 39, 119, 0.4)',
        ambientGlow:
          'radial-gradient(circle at 75% 50%, rgba(244, 114, 182, 0.32) 0%, rgba(219, 39, 119, 0.16) 55%, transparent 75%)',
        title: 'Công Nghệ & AI',
        groupHeading: 'Cơ hội : Công nghệ & chuyển đổi dịch vụ',
        subTag: 'Cơ hội : Công nghệ & chuyển đổi dịch vụ',
        desc: 'Những năng lực tạo đòn bẩy để nâng cao hiệu quả vận hành, tối ưu nguồn lực và chuyển đổi mô hình Dịch vụ Khách hàng trong thời đại số.',
        illustrationSrc: 'https://i.ibb.co/gMw15CKB/Tr-Tu-Nh-n-T-o.png',
        metricLabel: 'Chỉ số công nghệ & dữ liệu',
        pills: oppTechItems.map((s) => ({
          name: s.labelVi,
          score: `${s.percent}%`,
          desc: s.descVi || '',
        })),
        details: [...oppTechItems, ...oppServiceItems].map((s) => ({
          title: s.labelVi,
          percent: s.percent,
          desc: s.descVi || '',
        })),
      },

      /* THẺ 5: THÁCH THỨC — QUẢN TRỊ BIẾN ĐỘNG (Rose/Red — Sử dụng nhãn "Mức độ tác động" theo Quy tắc #17) */
      {
        id: 'skill-05',
        categoryFilter: 'T',
        themeColor: isDark ? '#fb7185' : '#e11d48',
        iconBg: 'linear-gradient(135deg, #fb7185 0%, #e11d48 100%)',
        cardBg: 'linear-gradient(135deg, rgba(255, 228, 230, 0.72) 0%, rgba(254, 205, 211, 0.62) 100%)',
        cardDarkBg: 'linear-gradient(135deg, rgba(136, 19, 55, 0.48) 0%, rgba(15, 23, 42, 0.84) 100%)',
        cardBorder: isDark ? 'border-rose-400/45 hover:border-rose-300' : 'border-[#f43f5e]/60 hover:border-[#e11d48]',
        arrowBg: 'linear-gradient(135deg, #fb7185 0%, #e11d48 100%)',
        arrowShadow: '0 4px 12px rgba(225, 29, 72, 0.4)',
        ambientGlow:
          'radial-gradient(circle at 75% 50%, rgba(251, 113, 133, 0.32) 0%, rgba(225, 29, 72, 0.16) 55%, transparent 75%)',
        title: 'Quản Trị Biến Động',
        groupHeading: 'Thách thức : Thích ứng & quản trị biến động',
        subTag: 'Thách thức : Thích ứng & quản trị biến động',
        desc: 'Những yếu tố bên ngoài tác động trực tiếp đến chất lượng dịch vụ, nhân sự và hiệu quả vận hành, đòi hỏi khả năng thích ứng và quản trị chủ động.',
        illustrationSrc: 'https://i.ibb.co/0pshM6HN/Qu-n-Tr-Bi-n-ng.png',
        metricLabel: 'Mức độ tác động',
        pills: THREATS_DATA.map((s) => ({
          name: s.labelVi,
          score: `${s.percent}%`,
          desc: s.descVi || '',
        })),
        details: THREATS_DATA.map((s) => ({
          title: s.labelVi,
          percent: s.percent,
          desc: s.descVi || '',
        })),
      },

      /* THẺ 6: NGÔN NGỮ — GIAO TIẾP & LÀM VIỆC (Emerald) */
      {
        id: 'skill-06',
        categoryFilter: 'LANG',
        themeColor: isDark ? '#34d399' : '#059669',
        iconBg: 'linear-gradient(135deg, #34d399 0%, #059669 100%)',
        cardBg: 'linear-gradient(135deg, rgba(209, 250, 229, 0.72) 0%, rgba(167, 243, 208, 0.62) 100%)',
        cardDarkBg: 'linear-gradient(135deg, rgba(6, 78, 59, 0.52) 0%, rgba(15, 23, 42, 0.84) 100%)',
        cardBorder: isDark ? 'border-emerald-400/45 hover:border-emerald-300' : 'border-[#10b981]/60 hover:border-[#059669]',
        arrowBg: 'linear-gradient(135deg, #34d399 0%, #059669 100%)',
        arrowShadow: '0 4px 12px rgba(5, 150, 105, 0.4)',
        ambientGlow:
          'radial-gradient(circle at 75% 50%, rgba(52, 211, 153, 0.32) 0%, rgba(5, 150, 105, 0.16) 55%, transparent 75%)',
        title: 'Giao Tiếp & Làm Việc',
        groupHeading: 'Ngôn ngữ : Giao tiếp & làm việc',
        subTag: 'Ngôn ngữ : Giao tiếp & làm việc',
        desc: 'Khả năng sử dụng ngôn ngữ linh hoạt kết hợp công cụ AI hỗ trợ giao tiếp và làm việc hiệu quả trong môi trường quốc tế.',
        illustrationSrc: 'https://i.ibb.co/RV23vvj/Giao-Ti-p-C-ng-ng.png',
        metricLabel: 'Mức độ thành thạo',
        pills: LANGUAGES_DATA.map((l) => ({
          name: l.nameVi,
          score: `${l.percent}%`,
          desc: l.roleVi,
        })),
        details: LANGUAGES_DATA.map((l) => ({
          title: l.nameVi,
          percent: l.percent,
          desc: l.roleVi,
        })),
      },
    ];
  }, [isDark]);

  // Filter cards based on tab selection & search query
  const filteredCards = useMemo(() => {
    return skillCards.filter((card) => {
      const matchesFilter =
        activeFilter === 'all' ||
        card.categoryFilter === activeFilter ||
        (activeFilter === 'LANG' && (card.categoryFilter === 'LANG' || card.id === 'skill-06'));

      if (!matchesFilter) return false;

      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase().trim();
      const matchTitle = card.title.toLowerCase().includes(q) || card.groupHeading.toLowerCase().includes(q);
      const matchDesc = card.desc.toLowerCase().includes(q);
      const matchTag = card.subTag.toLowerCase().includes(q);
      const matchPill = card.pills.some(
        (p) => p.name.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q)
      );

      return matchTitle || matchDesc || matchTag || matchPill;
    });
  }, [skillCards, activeFilter, searchQuery]);

  // Icon hiển thị trước tiêu đề (đồng màu & kích cỡ chuẩn với tiêu đề như DomainsView)
  const renderCardIcon = (cardId: string, className = 'w-[20px] h-[20px] sm:w-[22px] sm:h-[22px]') => {
    switch (cardId) {
      case 'skill-01':
        return <Gem className={cn(className, 'stroke-[2] shrink-0')} />;
      case 'skill-02':
        return <BarChart3 className={cn(className, 'stroke-[2] shrink-0')} />;
      case 'skill-03':
        return <Rocket className={cn(className, 'stroke-[2] shrink-0')} />;
      case 'skill-04':
        return <Bot className={cn(className, 'stroke-[2] shrink-0')} />;
      case 'skill-05':
        return <ShieldCheck className={cn(className, 'stroke-[2] shrink-0')} />;
      case 'skill-06':
      default:
        return <MessageCircle className={cn(className, 'stroke-[2] shrink-0')} />;
    }
  };

  return (
    <div className="w-full h-full flex-1 min-h-0 flex flex-col justify-between select-none relative text-slate-800 dark:text-slate-100 overflow-hidden">
      {/* VÙNG HIỂN THỊ NỘI DUNG KỸ NĂNG: DUY NHẤT DẠNG SƠ ĐỒ TƯ DUY FULL CHIỀU RỘNG & CHIỀU CAO */}
      <div className="w-full h-full flex-1 min-h-0 relative flex flex-col overflow-hidden">
        {!selectedCard ? (
          <InfographicMindmap
            cards={skillCards}
            isDark={isDark}
            onSelectCard={setSelectedCard}
            onPlayAudio={handleToggleAudio}
            playingAudioId={playingAudioId}
            audioSummaries={SKILL_AUDIO_SUMMARIES}
            onNavigatePage={onNavigatePage}
          />
        ) : (
          /* THẺ CHI TIẾT KỸ NĂNG: HIỂN THỊ ĐẦY ĐỦ 100% TÊN KỸ NĂNG, TỶ LỆ % VÀ MÔ TẢ CHI TIẾT CỦA TỪNG MỤC */
          <motion.div
            layoutId={`skill-card-${selectedCard.id}`}
            transition={{
              duration: 0.52,
              ease: [0.22, 1, 0.36, 1],
            }}
            style={{
              background: isDark
                ? selectedCard.cardDarkBg ||
                  'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.85) 100%)'
                : selectedCard.cardBg,
              ['--card-accent-color' as string]: selectedCard.themeColor,
            }}
            className={`theme-pastel-card w-full h-full flex-1 min-h-0 rounded-[14px] border ${selectedCard.cardBorder} p-3.5 sm:p-4 lg:p-5 shadow-[0_16px_40px_-6px_rgba(15,23,42,0.18),0_6px_16px_-2px_rgba(15,23,42,0.08),inset_0_1px_2px_rgba(255,255,255,0.95)] relative overflow-hidden flex flex-col justify-between text-left font-play transition-all duration-300`}
          >
            {/* Soft ambient background glows */}
            <div
              className="absolute -right-16 -bottom-16 w-80 h-80 rounded-full pointer-events-none opacity-80 blur-3xl"
              style={{ background: selectedCard.ambientGlow }}
            />
            <div className="absolute -left-12 -top-12 w-64 h-64 rounded-full bg-white/40 dark:bg-white/5 blur-2xl pointer-events-none" />

            {/* 1. Header Bar: Tiêu đề nhóm gốc, bộ chuyển nhanh 6 thẻ & nút quay lại */}
            <div className="w-full flex items-center justify-between gap-3 shrink-0 pb-2.5 border-b border-black/5 dark:border-white/10 relative z-10 flex-wrap sm:flex-nowrap">
              {/* Left: Icon & Group Heading */}
              <div className="flex items-center gap-2.5 min-w-0 flex-wrap sm:flex-nowrap">
                <div
                  className="w-[20px] h-[20px] sm:w-[22px] sm:h-[22px] shrink-0 flex items-center justify-center animate-icon-floating"
                  style={{ color: selectedCard.themeColor }}
                >
                  {renderCardIcon(selectedCard.id, 'w-[20px] h-[20px] sm:w-[22px] sm:h-[22px]')}
                </div>
                <h3
                  className="text-[17px] sm:text-[19px] lg:text-[21px] font-black font-play leading-none tracking-tight truncate flex items-center"
                  style={{ color: selectedCard.themeColor }}
                  title={selectedCard.groupHeading}
                >
                  {selectedCard.groupHeading}
                </h3>

                {/* Badge loại chỉ số (Mức độ kỹ năng / Mức độ tác động) */}
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10.5px] font-bold border shadow-2xs bg-white/85 dark:bg-slate-800/85 text-slate-700 dark:text-slate-200 border-slate-200/80 dark:border-white/10 shrink-0">
                  {selectedCard.categoryFilter === 'T' ? (
                    <AlertTriangle className="w-3 h-3 text-rose-500 shrink-0" />
                  ) : (
                    <Zap className="w-3 h-3 shrink-0" style={{ color: selectedCard.themeColor }} />
                  )}
                  <span>
                    {selectedCard.metricLabel} • {selectedCard.details.length} mục
                  </span>
                </span>
              </div>

              {/* Right: Thanh chuyển nhanh giữa 6 thẻ & Nút quay lại */}
              <div className="flex items-center gap-2 shrink-0">
                <div className="hidden xl:flex items-center gap-1">
                  {skillCards.map((c, idx) => {
                    const isCur = c.id === selectedCard.id;
                    return (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => setSelectedCard(c)}
                        className={`px-2.5 py-1 rounded-full text-[10.5px] font-bold font-play transition-all cursor-pointer ${
                          isCur
                            ? 'text-white shadow-xs scale-105'
                            : 'bg-white/75 dark:bg-slate-800/75 text-slate-600 dark:text-slate-300 hover:bg-white border border-slate-200/70 dark:border-white/10'
                        }`}
                        style={isCur ? { backgroundColor: c.themeColor } : undefined}
                        title={c.groupHeading}
                      >
                        {idx + 1}. {c.title}
                      </button>
                    );
                  })}
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedCard(null)}
                  className="px-3.5 py-1.5 rounded-full bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 text-xs font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-1.5 cursor-pointer active:scale-95 shrink-0"
                >
                  <ArrowLeft className="w-3.5 h-3.5 stroke-[2.4]" />
                  <span>Quay lại 6 thẻ</span>
                </button>
              </div>
            </div>

            {/* 2. Main Content Grid: Cột trái (Mô tả & Hình 3D) + Cột phải (Danh sách đầy đủ các mục kỹ năng & mô tả gốc) */}
            <div className="w-full flex-1 min-h-0 my-2 grid grid-cols-1 lg:grid-cols-12 gap-3.5 items-stretch relative z-10 overflow-y-auto lg:overflow-hidden glass-scrollbar pr-0.5">
              {/* Left Area (4 cols on lg): Mô tả nhóm gốc & Hình minh họa 3D */}
              <div className="col-span-12 lg:col-span-4 flex flex-col justify-between gap-2.5 h-full min-h-0">
                <div className="p-4 rounded-2xl bg-white/75 dark:bg-slate-900/75 border border-white/85 dark:border-white/10 backdrop-blur-md shadow-2xs flex flex-col justify-between flex-1 min-h-0 relative overflow-hidden">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span
                        className="w-2 h-2 rounded-full animate-ping shrink-0"
                        style={{ backgroundColor: selectedCard.themeColor }}
                      />
                      <span className="text-[10.5px] font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                        Mô tả nhóm năng lực
                      </span>
                    </div>
                    <h4
                      className="text-sm sm:text-base font-black font-play leading-snug"
                      style={{ color: selectedCard.themeColor }}
                    >
                      {selectedCard.groupHeading}
                    </h4>
                    <p className="text-xs sm:text-[13px] font-medium text-slate-700 dark:text-slate-200 leading-relaxed mt-2">
                      {selectedCard.desc}
                    </p>
                  </div>

                  {/* 3D illustration centered */}
                  <div className="w-full h-32 sm:h-40 flex items-center justify-center my-auto pointer-events-none animate-float-slow">
                    <img
                      src={selectedCard.illustrationSrc}
                      alt={selectedCard.title}
                      className="h-full max-h-32 sm:max-h-40 w-auto object-contain drop-shadow-[0_10px_24px_rgba(0,0,0,0.18)]"
                    />
                  </div>

                  {/* Summary footer inside left box */}
                  <div className="pt-2.5 border-t border-slate-200/70 dark:border-white/10 flex items-center justify-between text-[11px] font-bold text-slate-600 dark:text-slate-300">
                    <span>Chỉ số đánh giá:</span>
                    <span style={{ color: selectedCard.themeColor }}>{selectedCard.metricLabel}</span>
                  </div>
                </div>
              </div>

              {/* Right Area (8 cols on lg): Danh sách chi tiết từng kỹ năng (Tên + % + Thanh tiến độ + Mô tả đầy đủ 100%) */}
              <div className="col-span-12 lg:col-span-8 flex flex-col justify-between gap-2.5 h-full min-h-0">
                <div className="grid grid-cols-1 sm:grid-cols-2 auto-rows-fr gap-2.5 flex-1 min-h-0 items-stretch overflow-y-auto pr-0.5">
                  {selectedCard.details.map((item, idx) => {
                    const isThreat = selectedCard.categoryFilter === 'T';
                    return (
                      <div
                        key={idx}
                        className="rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-white/90 dark:border-white/10 p-3.5 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between gap-2 h-full"
                      >
                        <div className="space-y-1.5">
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex items-center gap-2 min-w-0">
                              <div
                                className="w-6 h-6 rounded-full flex items-center justify-center text-white text-[11px] font-mono font-black shrink-0 shadow-2xs"
                                style={{ background: selectedCard.iconBg }}
                              >
                                {idx + 1}
                              </div>
                              <h5 className="text-xs sm:text-sm font-black font-play text-slate-900 dark:text-white leading-snug break-words">
                                {item.title}
                              </h5>
                            </div>

                            <span
                              className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-black border shrink-0 shadow-2xs bg-white dark:bg-slate-800"
                              style={{
                                color: selectedCard.themeColor,
                                borderColor: `${selectedCard.themeColor}40`,
                              }}
                            >
                              {isThreat ? `Mức độ tác động: ${item.percent}%` : `${item.percent}%`}
                            </span>
                          </div>

                          {/* Progress bar */}
                          <div className="w-full h-2 rounded-full bg-slate-200/80 dark:bg-slate-800 overflow-hidden">
                            <div
                              className="h-full rounded-full transition-all duration-700"
                              style={{
                                width: `${item.percent}%`,
                                background: selectedCard.iconBg,
                              }}
                            />
                          </div>
                        </div>

                        {/* Mô tả nguyên bản của từng kỹ năng */}
                        <div className="flex items-start gap-2 pt-1 border-t border-slate-100 dark:border-white/5">
                          {isThreat ? (
                            <AlertTriangle className="w-3.5 h-3.5 text-rose-500 shrink-0 mt-0.5" />
                          ) : (
                            <CheckCircle2
                              className="w-3.5 h-3.5 shrink-0 mt-0.5"
                              style={{ color: selectedCard.themeColor }}
                            />
                          )}
                          <p className="text-[11.5px] sm:text-xs font-medium text-slate-700 dark:text-slate-200 leading-relaxed">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};
