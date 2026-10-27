'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { DOMAINS_DATA } from '@/data/domains';
import { DomainData, SiteTheme } from '@/types';
import { formatCardTitle } from '@/lib/utils';
import { SoundEngine } from '@/components/ui/SoundEngine';
import {
  getSavedVoiceURI,
  findBestVoice,
  VOICE_CHANGE_EVENT,
} from '@/utils/speechVoice';
import { 
  User, 
  Users, 
  Settings, 
  Radio, 
  FileText, 
  Trophy, 
  Handshake, 
  TrendingUp, 
  ShieldCheck, 
  Clock, 
  ArrowLeft, 
  ChevronRight,
  Activity,
  Layers,
  RotateCw,
  Volume2,
  VolumeX,
  Sparkles,
  BarChart3,
  X,
  Check,
  CheckCircle2,
  ExternalLink,
  BookOpen,
  SlidersHorizontal,
  Target,
  AlertTriangle
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { ParallaxTiltIcon } from '@/components/domains/ParallaxTiltIcon';
import { BeforeAfterImpactSlider } from '@/components/domains/BeforeAfterImpactSlider';
import { TechStackExplorerModal } from '@/components/domains/TechStackExplorerModal';
import { DOMAIN_CASE_STUDIES, DOMAIN_BEFORE_AFTER_DATA } from '@/data/domainCaseStudies';

export interface DomainsViewProps {
  currentTheme?: SiteTheme;
}

// 15s Executive Audio Summaries cho từng lĩnh vực điều hành cốt lõi (Chuẩn 100% dữ liệu gốc)
const DOMAIN_AUDIO_SUMMARIES: Record<string, { title: string; text: string }> = {
  '01': {
    title: 'Dịch Vụ Viễn Thông',
    text: 'Hơn 9 năm quản lý vận hành dịch vụ viễn thông tại MobiFone và V247, dẫn dắt đội ngũ 130 nhân sự, tăng trưởng doanh thu 32% và duy trì chỉ số hài lòng khách hàng CSAT 99%.',
  },
  '02': {
    title: 'Thương Mại Điện Tử',
    text: 'Hơn 6 năm chỉ đạo CSKH sàn thương mại điện tử Shopee và Finviet, quản lý 300 nhân sự, xử lý tăng trưởng 120% đơn hàng Mega Sale và giữ tốc độ Live Chat dưới 30 giây.',
  },
  '03': {
    title: 'Dịch Vụ Bảo Hiểm',
    text: 'Hơn 6 năm tối ưu hóa vận hành CSKH Prudential và FWD, tỷ lệ giải quyết lần đầu FCR đạt 95%, CSAT 99% và rút ngắn 50% thời gian duyệt chi trả quyền lợi.',
  },
  '04': {
    title: 'Game & eSports',
    text: 'Chỉ đạo trung tâm dịch vụ khách hàng Garena Việt Nam phục vụ hơn 80.000 yêu cầu mỗi ngày, duy trì CSAT 96% và độ ổn định bảo mật hệ thống 99.9%.',
  },
  '05': {
    title: 'Thanh Toán Điện Tử',
    text: 'Hơn 4 năm vận hành CSKH ví điện tử MoMo và Finviet, tỷ lệ tra soát đúng hạn 99.5%, thời gian xử lý sự cố dưới 15 phút và mức độ an toàn giao dịch đạt 100%.',
  },
  '06': {
    title: 'Xây Dựng Hệ Thống',
    text: 'Thiết kế và triển khai hơn 10 hệ thống trung tâm trải nghiệm khách hàng chuẩn COPC và ISO, nâng cao 45% năng suất vận hành và cam kết SLA dịch vụ đạt trên 99%.',
  },
};

// Danh sách các thương hiệu đối tác tiêu biểu phục vụ bộ lọc tương tác
const PARTNER_BRANDS = [
  'MobiFone',
  'Shopee',
  'Prudential',
  'Garena',
  'MoMo',
  'Finviet',
  'V247',
  'FWD',
] as const;

export interface BrandMeta {
  name: string;
  shortName: string;
  color: string;
  glow: string;
  role: string;
  partnerType: string;
  verified: boolean;
  awardText?: string;
}

export const BRAND_METADATA: Record<string, BrandMeta> = {
  'Shopee': {
    name: 'Shopee Vietnam',
    shortName: 'Shopee',
    color: '#ee4d2d',
    glow: 'rgba(238, 77, 45, 0.45)',
    role: 'Quản lý CSKH & Chống gian lận 300+ nhân sự',
    partnerType: 'Sàn TMĐT Hàng đầu',
    verified: true,
    awardText: 'Mega Sale Champion 2019',
  },
  'ShopeePay': {
    name: 'ShopeePay',
    shortName: 'ShopeePay',
    color: '#f97316',
    glow: 'rgba(249, 115, 22, 0.45)',
    role: 'Vận hành tra soát giao dịch & Giải quyết sự cố ví điện tử',
    partnerType: 'Thanh toán Trực tuyến',
    verified: true,
  },
  'MoMo': {
    name: 'Ví MoMo',
    shortName: 'MoMo',
    color: '#d82d8b',
    glow: 'rgba(216, 45, 139, 0.45)',
    role: 'Tối ưu hóa vận hành ví điện tử & Xử lý khiếu nại giao dịch',
    partnerType: 'Ví Điện tử Kỳ Lân',
    verified: true,
    awardText: 'Zero Friction Payment Support',
  },
  'MobiFone': {
    name: 'MobiFone',
    shortName: 'MobiFone',
    color: '#005cab',
    glow: 'rgba(0, 92, 171, 0.45)',
    role: 'Giám sát chất lượng Call Center & Đào tạo điện thoại viên',
    partnerType: 'Nhà mạng Viễn thông Quốc gia',
    verified: true,
    awardText: 'Top Service Quality 2012',
  },
  'Garena': {
    name: 'Garena',
    shortName: 'Garena',
    color: '#ed1c24',
    glow: 'rgba(237, 28, 36, 0.45)',
    role: 'Chỉ đạo CSKH Game & eSports 80.000+ tickets/ngày',
    partnerType: 'Nhà phát hành eSports Quốc tế',
    verified: true,
    awardText: 'Top Gamer Satisfaction Award',
  },
  'VED': {
    name: 'Vietnam Esports (VED)',
    shortName: 'VED',
    color: '#e11d48',
    glow: 'rgba(225, 29, 72, 0.45)',
    role: 'Xây dựng bộ quy chuẩn SOP CSKH eSports & Quản trị tài khoản',
    partnerType: 'Hạ tầng Thể thao Điện tử',
    verified: true,
  },
  'Prudential': {
    name: 'Prudential Vietnam',
    shortName: 'Prudential',
    color: '#ed1b2e',
    glow: 'rgba(237, 27, 46, 0.45)',
    role: 'Tái cấu trúc CSKH Bảo hiểm & Rút ngắn 50% duyệt chi trả',
    partnerType: 'Tập đoàn Bảo hiểm Anh Quốc',
    verified: true,
    awardText: 'Excellence in Customer Retention',
  },
  'Finviet': {
    name: 'Finviet (Ví ECO)',
    shortName: 'Finviet',
    color: '#10b981',
    glow: 'rgba(16, 185, 129, 0.45)',
    role: 'Điều hành hệ sinh thái CSKH ECO & Điểm đại lý',
    partnerType: 'Nền tảng Bán buôn & FinTech',
    verified: true,
  },
  'V247': {
    name: 'V247 Telecom',
    shortName: 'V247',
    color: '#0284c7',
    glow: 'rgba(2, 132, 199, 0.45)',
    role: 'Vận hành Contact Center viễn thông quốc tế 24/7/365',
    partnerType: 'Viễn thông Toàn cầu',
    verified: true,
  },
  'LBC': {
    name: 'LBC Post',
    shortName: 'LBC',
    color: '#f59e0b',
    glow: 'rgba(245, 158, 11, 0.45)',
    role: 'Giám sát chất lượng dịch vụ bưu chính & logistics',
    partnerType: 'Bưu chính & Chuyển phát',
    verified: false,
  },
  'HTVC': {
    name: 'HTVC Truyền hình cáp',
    shortName: 'HTVC',
    color: '#dc2626',
    glow: 'rgba(220, 38, 38, 0.45)',
    role: 'Nâng cấp tổng đài CSKH truyền hình cáp đa kênh',
    partnerType: 'Truyền thông & Truyền hình',
    verified: false,
  },
  'GCafe': {
    name: 'GCafe Network',
    shortName: 'GCafe',
    color: '#d97706',
    glow: 'rgba(217, 119, 6, 0.45)',
    role: 'Tối ưu mạng lưới phòng máy & Hỗ trợ kỹ thuật 24/7',
    partnerType: 'Hạ tầng Phòng máy Toàn quốc',
    verified: true,
  },
  'AirPay': {
    name: 'AirPay',
    shortName: 'AirPay',
    color: '#0ea5e9',
    glow: 'rgba(14, 165, 233, 0.45)',
    role: 'Vận hành cổng thanh toán & Tra soát sự cố tài chính',
    partnerType: 'Cổng Thanh toán Trực tuyến',
    verified: true,
  },
  'FWD': {
    name: 'FWD Insurance',
    shortName: 'FWD',
    color: '#f59e0b',
    glow: 'rgba(245, 158, 11, 0.45)',
    role: 'Tối ưu hóa hành trình giải quyết quyền lợi bảo hiểm kỹ thuật số',
    partnerType: 'Tập đoàn Bảo hiểm Kỹ thuật số',
    verified: true,
  },
  'Power Service': {
    name: 'Power Service',
    shortName: 'Power Service',
    color: '#059669',
    glow: 'rgba(5, 150, 105, 0.45)',
    role: 'Tư vấn kiến trúc hệ thống Contact Center & Số hóa CX',
    partnerType: 'Tổ hợp Dịch vụ Khách hàng',
    verified: true,
    awardText: 'ISO & COPC Standards Compliant',
  },
};

export const getBrandMeta = (rawName: string): BrandMeta => {
  const normalized = (rawName || '').toLowerCase().trim();
  for (const [key, val] of Object.entries(BRAND_METADATA)) {
    if (normalized.includes(key.toLowerCase()) || key.toLowerCase().includes(normalized)) {
      return val;
    }
  }
  return {
    name: rawName,
    shortName: rawName,
    color: '#06b6d4',
    glow: 'rgba(6, 182, 212, 0.45)',
    role: 'Hợp tác chiến lược nâng cao trải nghiệm khách hàng',
    partnerType: 'Đối tác Doanh nghiệp',
    verified: false,
  };
};

export const DomainsView: React.FC<DomainsViewProps> = ({ currentTheme = 'light-glass' }) => {
  const [filter, setFilter] = useState<string>('all');
  const [selectedDomain, setSelectedDomain] = useState<DomainData | null>(null);
  const isDark = currentTheme === 'dark-neon';

  // 1. Quick KPI Flip Mini-Card state
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});

  // 2. Brand Interactive Filter state (Multi-Select)
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [hoveredLogoKey, setHoveredLogoKey] = useState<string | null>(null);

  // 3. 15s Executive Audio Summary state & Voice Sync with AI Assistant
  const [playingAudioId, setPlayingAudioId] = useState<string | null>(null);
  const [audioProgress, setAudioProgress] = useState<number>(0);
  const [audioTimeLeft, setAudioTimeLeft] = useState<number>(15);
  const [speechVoices, setSpeechVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoiceURI, setSelectedVoiceURI] = useState<string>('');

  // 4. Modal Detail Tabs: 'overview' (Trụ cột vận hành) | 'casestudy' (Case study thực chiến) | 'impact' (Đo lường trước sau)
  const [activeDetailTab, setActiveDetailTab] = useState<'overview' | 'casestudy' | 'impact'>('overview');

  // 5. Bộ lọc Lĩnh vực theo Quy mô Đội ngũ & Chỉ số KPI (KPI Threshold Filter)
  const [kpiFilter, setKpiFilter] = useState<'all' | 'team-100' | 'csat-98' | 'both'>('all');

  // 6. Bản đồ Hệ sinh thái Công nghệ Tương tác (Interactive Tech Stack Explorer Popup)
  const [techExplorerState, setTechExplorerState] = useState<{
    domainId: string;
    bullet: string;
    allBullets: string[];
    accentColor: string;
  } | null>(null);

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
    const availVoices = speechVoices.length > 0 ? speechVoices : (typeof window !== 'undefined' && 'speechSynthesis' in window ? window.speechSynthesis.getVoices() : []);
    const v = findBestVoice(availVoices, selectedVoiceURI || getSavedVoiceURI());
    if (!v) return 'Giọng Trợ Lý AI';
    if (/nam\s*minh/i.test(v.name)) return 'Nam Minh AI (Edge)';
    if (/tiếng việt 5|tieng viet 5/i.test(v.name)) return 'Tiếng Việt 5 AI (Chrome)';
    if (/hoai\s*my/i.test(v.name)) return 'Hoài My AI';
    if (/an\s*online/i.test(v.name)) return 'An AI';
    return v.name.split('-')[0].trim();
  })();

  // Hỗ trợ phím Escape đóng thẻ mở rộng quay lại lưới 6 thẻ ban đầu (A11y & Keyboard Navigation)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedDomain) {
        SoundEngine.playTap();
        setSelectedDomain(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedDomain]);

  // Lật thẻ 3D mặt trước / mặt sau
  const toggleCardFlip = (domainId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    SoundEngine.playPageFlip();
    setFlippedCards((prev) => ({ ...prev, [domainId]: !prev[domainId] }));
  };

  // Chọn / Bỏ chọn bộ lọc thương hiệu đối tác (Hỗ trợ Multi-Select & Brand Interactive Showcase toàn website)
  const handleToggleBrand = (brandName: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    SoundEngine.playTap();
    setSelectedBrands((prev) => {
      const exists = prev.includes(brandName);
      const next = exists ? prev.filter((b) => b !== brandName) : [...prev, brandName];
      const targetBrand = next.length > 0 ? next[next.length - 1] : null;
      setSelectedBrand(targetBrand);

      // Phát sự kiện toàn website để các component khác đồng bộ
      if (typeof window !== 'undefined') {
        if (targetBrand) {
          localStorage.setItem('hungthai_selected_brand', targetBrand);
          window.dispatchEvent(new CustomEvent('hungthai-brand-selected', { detail: { brand: targetBrand } }));
        } else {
          localStorage.removeItem('hungthai_selected_brand');
          window.dispatchEvent(new CustomEvent('hungthai-brand-selected', { detail: { brand: null } }));
        }
      }

      return next;
    });

    setTimeout(() => {
      const matchedEl = document.querySelector(`[data-domain-brand*="${brandName}"]`);
      if (matchedEl) {
        matchedEl.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }, 100);
  };

  const handleSelectBrand = (brandName: string, e?: React.MouseEvent) => {
    handleToggleBrand(brandName, e);
  };

  const handleClearBrands = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    SoundEngine.playTap();
    setSelectedBrands([]);
    setSelectedBrand(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('hungthai_selected_brand');
      window.dispatchEvent(new CustomEvent('hungthai-brand-selected', { detail: { brand: null } }));
    }
  };

  // Phát / Tạm dừng thuyết minh tóm tắt AI 15s (Dùng chung 100% giọng đọc của AI Trợ Lý)
  const handleToggleAudio = (domainId: string, summaryText: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    if (playingAudioId === domainId) {
      window.speechSynthesis.cancel();
      setPlayingAudioId(null);
      setAudioProgress(0);
      setAudioTimeLeft(15);
      SoundEngine.playTap();
      return;
    }

    window.speechSynthesis.cancel();
    SoundEngine.playTap();
    setPlayingAudioId(domainId);
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

    // Lấy giọng đọc chuẩn của AI Trợ Lý (Edge: Nam Minh, Chrome: Tiếng Việt 5, hoặc giọng người dùng đã lưu)
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

  // Unframed vector icon before each domain title (matching title size & color)
  const getDomainBadgeIcon = (id: string, sizeClass = 'w-[20px] h-[20px] sm:w-[22px] sm:h-[22px] lg:w-[24px] lg:h-[24px]') => {
    switch (id) {
      case '01': // Viễn thông - Radio Signal Tower (( A ))
        return (
          <svg className={cn(sizeClass, 'shrink-0')} viewBox="0 0 24 24" fill="none">
            <path d="M4.8 6.2a9 9 0 0 0 0 10.6M19.2 6.2a9 9 0 0 1 0 10.6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
            <path d="M7.6 8.5a5.2 5.2 0 0 0 0 6M16.4 8.5a5.2 5.2 0 0 1 0 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
            <circle cx="12" cy="10.5" r="1.9" fill="currentColor" />
            <path d="M12 12.2L8.8 20M12 12.2L15.2 20M10 17h4" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        );
      case '02': // E-Commerce - Bold Shopping Cart
        return (
          <svg className={cn(sizeClass, 'shrink-0')} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 4h2.2l2.2 9.5a1.5 1.5 0 0 0 1.5 1.2h8.2a1.5 1.5 0 0 0 1.4-1l1.8-6.7H6.2" />
            <circle cx="9.5" cy="18.5" r="1.8" fill="currentColor" stroke="none" />
            <circle cx="16.5" cy="18.5" r="1.8" fill="currentColor" stroke="none" />
          </svg>
        );
      case '03': // Bảo hiểm - Shield with Checkmark
        return (
          <svg className={cn(sizeClass, 'shrink-0')} viewBox="0 0 24 24" fill="none">
            <path
              d="M12 2.8L19 5.6v5.6c0 5-3 8.8-7 10.2-4-1.4-7-5.2-7-10.2V5.6L12 2.8z"
              stroke="currentColor"
              strokeWidth="2.3"
              strokeLinejoin="round"
            />
            <path
              d="M9.2 12.2l2 2 4-4.2"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        );
      case '04': // eSports - Gamepad
        return (
          <svg className={cn(sizeClass, 'shrink-0')} viewBox="0 0 24 24" fill="none">
            <path
              d="M6 7.5h12c2.2 0 3.8 2 3.4 4.2l-.7 4.2c-.3 1.8-2.1 2.7-3.6 1.7l-2.1-1.5H9l-2.1 1.5c-1.5 1-3.3.1-3.6-1.7l-.7-4.2C2.2 9.5 3.8 7.5 6 7.5z"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinejoin="round"
            />
            <path d="M8 10.5v3.5M6.25 12.25h3.5" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" />
            <circle cx="15.5" cy="11" r="1" fill="currentColor" />
            <circle cx="17.5" cy="13" r="1" fill="currentColor" />
          </svg>
        );
      case '05': // FinTech - Wallet
        return (
          <svg className={cn(sizeClass, 'shrink-0')} viewBox="0 0 24 24" fill="none">
            <path d="M6.5 7.5V6a1.5 1.5 0 0 1 1.5-1.5h8.5A1.5 1.5 0 0 1 18 6v1.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
            <rect x="3.5" y="7.5" width="17" height="12" rx="2.5" stroke="currentColor" strokeWidth="2.2" />
            <circle cx="16.5" cy="13.5" r="1.5" fill="currentColor" />
          </svg>
        );
      case '06': // Hệ thống CSKH - Globe
      default:
        return (
          <svg className={cn(sizeClass, 'shrink-0')} viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2.2" />
            <ellipse cx="12" cy="12" rx="4" ry="9" stroke="currentColor" strokeWidth="2" />
            <path d="M3.5 12h17M4.8 8.2h14.4M4.8 15.8h14.4" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
          </svg>
        );
    }
  };

  // Visual theme config & title per card ID matching user's requested names
  // Sampled directly from the surroundings and ambient atmosphere of each 3D descriptive illustration
  const getCardVisualConfig = (id: string) => {
    switch (id) {
      case '01': // Viễn thông (Sky/Blue)
        return {
          fourWordTitle: 'Dịch Vụ Viễn Thông',
          accentColor: isDark ? '#38bdf8' : '#0284c7',
          cardBg: isDark
            ? 'linear-gradient(135deg, rgba(12, 74, 110, 0.52) 0%, rgba(15, 23, 42, 0.84) 100%)'
            : 'linear-gradient(135deg, rgba(224, 242, 254, 0.72) 0%, rgba(186, 230, 253, 0.62) 100%)',
          cardBorder: isDark
            ? 'border-sky-400/45 hover:border-sky-300'
            : 'border-[#38bdf8]/60 hover:border-[#0284c7]',
          ambientGlow: 'radial-gradient(circle at 75% 50%, rgba(56, 189, 248, 0.35) 0%, rgba(14, 165, 233, 0.18) 55%, transparent 75%)',
          titleColor: isDark ? 'text-sky-300' : 'text-[#0284c7]',
          pillBg: isDark
            ? 'bg-sky-950/80 border-sky-500/40 text-sky-200'
            : 'bg-sky-100/90 border-sky-200/90 text-[#0369a1]',
          arrowBg: 'linear-gradient(135deg, #38bdf8 0%, #0284c7 100%)',
          arrowShadow: '0 4px 12px rgba(2, 132, 199, 0.4)',
        };
      case '02': // E-commerce (Orange)
        return {
          fourWordTitle: 'Thương Mại Điện Tử',
          accentColor: isDark ? '#fb923c' : '#ea580c',
          cardBg: isDark
            ? 'linear-gradient(135deg, rgba(124, 45, 18, 0.48) 0%, rgba(15, 23, 42, 0.84) 100%)'
            : 'linear-gradient(135deg, rgba(254, 243, 199, 0.72) 0%, rgba(253, 230, 138, 0.62) 100%)',
          cardBorder: isDark
            ? 'border-orange-400/45 hover:border-orange-300'
            : 'border-[#fb923c]/60 hover:border-[#ea580c]',
          ambientGlow: 'radial-gradient(circle at 75% 50%, rgba(251, 146, 60, 0.32) 0%, rgba(234, 88, 12, 0.16) 55%, transparent 75%)',
          titleColor: isDark ? 'text-orange-300' : 'text-[#ea580c]',
          pillBg: isDark
            ? 'bg-orange-950/80 border-orange-500/40 text-orange-200'
            : 'bg-orange-100/80 border-orange-200/90 text-[#c2410c]',
          arrowBg: 'linear-gradient(135deg, #fbbf24 0%, #ea580c 100%)',
          arrowShadow: '0 4px 12px rgba(234, 88, 12, 0.4)',
        };
      case '03': // Bảo hiểm (Rose/Red)
        return {
          fourWordTitle: 'Dịch Vụ Bảo Hiểm',
          accentColor: isDark ? '#fb7185' : '#e11d48',
          cardBg: isDark
            ? 'linear-gradient(135deg, rgba(136, 19, 55, 0.48) 0%, rgba(15, 23, 42, 0.84) 100%)'
            : 'linear-gradient(135deg, rgba(255, 228, 230, 0.72) 0%, rgba(254, 205, 211, 0.62) 100%)',
          cardBorder: isDark
            ? 'border-rose-400/45 hover:border-rose-300'
            : 'border-[#f43f5e]/60 hover:border-[#e11d48]',
          ambientGlow: 'radial-gradient(circle at 75% 50%, rgba(251, 113, 133, 0.32) 0%, rgba(225, 29, 72, 0.16) 55%, transparent 75%)',
          titleColor: isDark ? 'text-rose-300' : 'text-[#e11d48]',
          pillBg: isDark
            ? 'bg-rose-950/80 border-rose-500/40 text-rose-200'
            : 'bg-rose-100/80 border-rose-200/90 text-[#be123c]',
          arrowBg: 'linear-gradient(135deg, #fb7185 0%, #e11d48 100%)',
          arrowShadow: '0 4px 12px rgba(225, 29, 72, 0.4)',
        };
      case '04': // eSports (Purple)
        return {
          fourWordTitle: 'Trò Chơi Điện Tử',
          accentColor: isDark ? '#c084fc' : '#7c3aed',
          cardBg: isDark
            ? 'linear-gradient(135deg, rgba(88, 28, 135, 0.52) 0%, rgba(15, 23, 42, 0.84) 100%)'
            : 'linear-gradient(135deg, rgba(243, 232, 255, 0.72) 0%, rgba(233, 213, 255, 0.62) 100%)',
          cardBorder: isDark
            ? 'border-purple-400/45 hover:border-purple-300'
            : 'border-[#a855f7]/60 hover:border-[#7c3aed]',
          ambientGlow: 'radial-gradient(circle at 75% 50%, rgba(192, 132, 252, 0.35) 0%, rgba(124, 58, 237, 0.18) 55%, transparent 75%)',
          titleColor: isDark ? 'text-purple-300' : 'text-[#7c3aed]',
          pillBg: isDark
            ? 'bg-purple-950/80 border-purple-500/40 text-purple-200'
            : 'bg-purple-100/80 border-purple-200/90 text-[#5b21b6]',
          arrowBg: 'linear-gradient(135deg, #a78bfa 0%, #7c3aed 100%)',
          arrowShadow: '0 4px 12px rgba(124, 58, 237, 0.4)',
        };
      case '05': // FinTech (Pink)
        return {
          fourWordTitle: 'Thanh Toán Điện Tử',
          accentColor: isDark ? '#f472b6' : '#db2777',
          cardBg: isDark
            ? 'linear-gradient(135deg, rgba(131, 24, 67, 0.5) 0%, rgba(15, 23, 42, 0.84) 100%)'
            : 'linear-gradient(135deg, rgba(252, 231, 243, 0.72) 0%, rgba(251, 207, 232, 0.62) 100%)',
          cardBorder: isDark
            ? 'border-pink-400/45 hover:border-pink-300'
            : 'border-[#ec4899]/60 hover:border-[#db2777]',
          ambientGlow: 'radial-gradient(circle at 75% 50%, rgba(244, 114, 182, 0.32) 0%, rgba(219, 39, 119, 0.16) 55%, transparent 75%)',
          titleColor: isDark ? 'text-pink-300' : 'text-[#db2777]',
          pillBg: isDark
            ? 'bg-pink-950/80 border-pink-500/40 text-pink-200'
            : 'bg-pink-100/80 border-pink-200/90 text-[#be185d]',
          arrowBg: 'linear-gradient(135deg, #f472b6 0%, #db2777 100%)',
          arrowShadow: '0 4px 12px rgba(219, 39, 119, 0.4)',
        };
      case '06': // Xây Dựng Hệ Thống (Emerald)
      default:
        return {
          fourWordTitle: 'Xây Dựng Hệ Thống',
          accentColor: isDark ? '#34d399' : '#059669',
          cardBg: isDark
            ? 'linear-gradient(135deg, rgba(6, 78, 59, 0.52) 0%, rgba(15, 23, 42, 0.84) 100%)'
            : 'linear-gradient(135deg, rgba(209, 250, 229, 0.72) 0%, rgba(167, 243, 208, 0.62) 100%)',
          cardBorder: isDark
            ? 'border-emerald-400/45 hover:border-emerald-300'
            : 'border-[#10b981]/60 hover:border-[#059669]',
          ambientGlow: 'radial-gradient(circle at 75% 50%, rgba(52, 211, 153, 0.32) 0%, rgba(5, 150, 105, 0.16) 55%, transparent 75%)',
          titleColor: isDark ? 'text-emerald-300' : 'text-[#059669]',
          pillBg: isDark
            ? 'bg-emerald-950/80 border-emerald-500/40 text-emerald-200'
            : 'bg-emerald-100/80 border-emerald-200/90 text-[#047857]',
          arrowBg: 'linear-gradient(135deg, #34d399 0%, #059669 100%)',
          arrowShadow: '0 4px 12px rgba(5, 150, 105, 0.4)',
        };
    }
  };

  // State to track which card is currently hovered
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);

  // High-resolution transparent illustration images according to user request
  const renderCard3DIllustration = (id: string, isHovered: boolean = false) => {
    const imgMap: Record<string, { src: string; alt: string }> = {
      '01': {
        src: 'https://i.ibb.co/4RYYfBvx/D-ch-v-vi-n-th-ng-removebg-preview.png',
        alt: 'Dịch vụ viễn thông',
      },
      '02': {
        src: 'https://i.ibb.co/fY3Nqny0/Th-ng-m-i-i-n-t-removebg-preview.png',
        alt: 'Thương mại điện tử',
      },
      '03': {
        src: 'https://i.ibb.co/B8K1Gwr/D-ch-v-b-o-hi-m-removebg-preview.png',
        alt: 'Dịch vụ bảo hiểm',
      },
      '04': {
        src: 'https://i.ibb.co/pBKmWZHc/Game-e-Sports-removebg-preview.png',
        alt: 'Game e Sports',
      },
      '05': {
        src: 'https://i.ibb.co/hRJDnYw4/Thanh-to-n-i-n-t-removebg-preview.png',
        alt: 'Thanh toán điện tử',
      },
      '06': {
        src: 'https://i.ibb.co/Kj5P9tvf/X-y-d-ng-h-th-ng-removebg-preview.png',
        alt: 'Xây dựng hệ thống',
      },
    };
    const item = imgMap[id] || imgMap['01'];

    const isTelecom = id === '01';
    return (
      <img
        src={item.src}
        alt={item.alt}
        className={cn(
          "w-full h-full object-contain filter drop-shadow-[0_12px_20px_rgba(0,0,0,0.12)] select-none pointer-events-none transition-transform duration-300",
          isTelecom ? "scale-115 sm:scale-120" : "scale-100",
          isHovered ? "scale-125 brightness-105" : "opacity-95"
        )}
        loading="eager"
      />
    );
  };

  // Comprehensive Detail Data for Selected Domain (matches media_1792782001822_4f879494.png)
  const getDomainDetailInfo = (domain: DomainData) => {
    switch (domain.id) {
      case '01': // Viễn thông
        return {
          heroSubtitle: 'Kết nối người dùng, xây dựng hạ tầng số, đem lại giá trị bền vững cho cộng đồng.',
          heroTags: 'Hạ tầng số • Kết nối • Trải nghiệm vượt trội',
          heroImage: 'https://i.ibb.co/4RYYfBvx/D-ch-v-vi-n-th-ng-removebg-preview.png',
          roleBadge: '9+ NĂM KINH NGHIỆM',
          roleBullets: [
            'Quản lý vận hành dịch vụ viễn thông',
            'Điều phối & giám sát hoạt động khai thác',
            'Phối hợp phát triển kinh doanh, chăm sóc KH',
          ],
          teamBadge: '50 – 130+ NHÂN SỰ / CA',
          teamBullets: [
            'Đội ngũ kỹ thuật, vận hành, CSKH',
            'Đội ngũ chăm sóc & xử lý sự cố',
            'Phối hợp đa phòng ban, đối tác',
          ],
          techBadge: 'CÁC HỆ THỐNG LỚN',
          techBullets: [
            'MobiFone / V247 / LBC / HTVC',
            'Hệ thống CRM & Call Center',
            'Hạ tầng mạng, 4G/5G, VoIP, Data',
          ],
          description:
            'Phụ trách toàn bộ hoạt động vận hành dịch vụ viễn thông, bao gồm: quản lý hạ tầng mạng, điều phối khai thác dịch vụ, chăm sóc khách hàng, xử lý sự cố và tối ưu chất lượng dịch vụ. Đồng thời, phối hợp với các đối tác chiến lược để phát triển các sản phẩm, dịch vụ mới, mở rộng thị trường và nâng cao trải nghiệm khách hàng, đảm bảo hoạt động ổn định, hiệu quả và bền vững.',
          achievements: [
            {
              label: 'Tăng trưởng doanh thu',
              value: '+32%',
              sub: '(trung bình 3 năm)',
              cardBg: 'bg-sky-50/70 dark:bg-slate-800/80',
              borderColor: 'border-sky-100 dark:border-white/5',
              iconBg: 'bg-sky-100 dark:bg-sky-950/70 text-sky-600 dark:text-sky-400',
              metricColor: 'text-sky-600 dark:text-sky-400',
              iconType: 'trend',
            },
            {
              label: 'Tỷ lệ hài lòng KH',
              value: '99%',
              sub: '(duy trì ổn định)',
              cardBg: 'bg-emerald-50/70 dark:bg-slate-800/80',
              borderColor: 'border-emerald-100 dark:border-white/5',
              iconBg: 'bg-emerald-100 dark:bg-emerald-950/70 text-emerald-600 dark:text-emerald-400',
              metricColor: 'text-emerald-600 dark:text-emerald-400',
              iconType: 'shield',
            },
            {
              label: 'Giảm thời gian xử lý sự cố',
              value: '-40%',
              sub: '(so với trước)',
              cardBg: 'bg-amber-50/70 dark:bg-slate-800/80',
              borderColor: 'border-amber-100 dark:border-white/5',
              iconBg: 'bg-amber-100 dark:bg-amber-950/70 text-amber-600 dark:text-amber-400',
              metricColor: 'text-amber-600 dark:text-amber-400',
              iconType: 'clock',
            },
            {
              label: 'Phát triển đội ngũ',
              value: '+50%',
              sub: '(mở rộng quy mô)',
              cardBg: 'bg-purple-50/70 dark:bg-slate-800/80',
              borderColor: 'border-purple-100 dark:border-white/5',
              iconBg: 'bg-purple-100 dark:bg-purple-950/70 text-purple-600 dark:text-purple-400',
              metricColor: 'text-purple-600 dark:text-purple-400',
              iconType: 'team',
            },
          ],
          partners: [
            { name: 'MobiFone', logo: 'https://i.ibb.co/hxHm9TsZ/Mobifone.png', sub: 'Nhà mạng viễn thông' },
            { name: 'V247', logo: 'https://i.ibb.co/QvtbdnfP/V247.png', sub: 'Truyền hình & nội dung số' },
            { name: 'LBC', logo: 'https://i.ibb.co/R4YXWyzF/LBC.png', sub: 'Dịch vụ viễn thông' },
            { name: 'HTVC', logo: 'https://i.ibb.co/1fNw0hBq/HTVC.png', sub: 'Truyền hình cáp' },
          ],
        };

      case '02': // TMĐT
        return {
          heroSubtitle: 'Vận hành quy trình chăm sóc khách hàng đa kênh cho hàng triệu người tiêu dùng số.',
          heroTags: 'Thương mại điện tử • Tối ưu chuyển đổi • Tốc độ',
          heroImage: 'https://i.ibb.co/fY3Nqny0/Th-ng-m-i-i-n-t-removebg-preview.png',
          roleBadge: '6+ NĂM KINH NGHIỆM',
          roleBullets: [
            'Chỉ đạo vận hành CSKH sàn TMĐT quy mô lớn',
            'Điều phối chiến dịch Mega Sale toàn quốc',
            'Xử lý khiếu nại, đổi trả & kiểm soát rủi ro',
          ],
          teamBadge: '100 – 300+ NHÂN SỰ / CA',
          teamBullets: [
            'Đội ngũ Live Chat, Call Center & Email Support',
            'Bộ phận Dispute, Fraud & Escalation cấp cao',
            'Đội ngũ Kiểm soát Chất lượng QA & Trainer',
          ],
          techBadge: 'HỆ SINH THÁI OMNICHANNEL',
          techBullets: [
            'Shopee / ShopeePay / Finviet / ECO',
            'Zendesk, Chatbot AI & Tự động phân luồng',
            'Real-time WFM Dashboard & Power BI Analytics',
          ],
          description:
            'Chỉ đạo và điều hành toàn diện hoạt động dịch vụ khách hàng cho sàn thương mại điện tử hàng đầu, đáp ứng lưu lượng truy cập và giao dịch bùng nổ trong các đợt cao điểm khuyến mãi. Xây dựng quy trình xử lý đơn hàng, đổi trả, khiếu nại minh bạch và giải quyết rủi ro bảo mật tài khoản người dùng nhanh chóng.',
          achievements: [
            {
              label: 'Xử lý đơn Mega Sale',
              value: '+120%',
              sub: '(mùa cao điểm)',
              cardBg: 'bg-sky-50/70 dark:bg-slate-800/80',
              borderColor: 'border-sky-100 dark:border-white/5',
              iconBg: 'bg-sky-100 dark:bg-sky-950/70 text-sky-600 dark:text-sky-400',
              metricColor: 'text-sky-600 dark:text-sky-400',
              iconType: 'trend',
            },
            {
              label: 'Điểm hài lòng CSAT',
              value: '98%',
              sub: '(chuẩn 5 sao)',
              cardBg: 'bg-emerald-50/70 dark:bg-slate-800/80',
              borderColor: 'border-emerald-100 dark:border-white/5',
              iconBg: 'bg-emerald-100 dark:bg-emerald-950/70 text-emerald-600 dark:text-emerald-400',
              metricColor: 'text-emerald-600 dark:text-emerald-400',
              iconType: 'shield',
            },
            {
              label: 'Tốc độ phản hồi Chat',
              value: '< 30s',
              sub: '(FCR đạt 94%)',
              cardBg: 'bg-amber-50/70 dark:bg-slate-800/80',
              borderColor: 'border-amber-100 dark:border-white/5',
              iconBg: 'bg-amber-100 dark:bg-amber-950/70 text-amber-600 dark:text-amber-400',
              metricColor: 'text-amber-600 dark:text-amber-400',
              iconType: 'clock',
            },
            {
              label: 'Tối ưu chi phí vận hành',
              value: '-25%',
              sub: '(nhờ AI & Automation)',
              cardBg: 'bg-purple-50/70 dark:bg-slate-800/80',
              borderColor: 'border-purple-100 dark:border-white/5',
              iconBg: 'bg-purple-100 dark:bg-purple-950/70 text-purple-600 dark:text-purple-400',
              metricColor: 'text-purple-600 dark:text-purple-400',
              iconType: 'team',
            },
          ],
          partners: [
            { name: 'Shopee', logo: 'https://i.ibb.co/BSVS4xf/Shopee.png', sub: 'Sàn TMĐT hàng đầu' },
            { name: 'ShopeePay', logo: 'https://i.ibb.co/LdYv3TJy/Shopee-Paye.png', sub: 'Ví thanh toán trực tuyến' },
            { name: 'Finviet', logo: 'https://i.ibb.co/7NtSSz4d/Finviet.png', sub: 'Nền tảng bán buôn ECO' },
            { name: 'Garena', logo: 'https://i.ibb.co/h1Md65yV/Garena.png', sub: 'Hỗ trợ dịch vụ số' },
          ],
        };

      case '03': // Bảo hiểm
        return {
          heroSubtitle: 'Xây dựng tiêu chuẩn phục vụ tận tâm, bảo vệ quyền lợi tài chính cho khách hàng.',
          heroTags: 'Bảo hiểm nhân thọ • Chuẩn 5 sao • BCP',
          heroImage: 'https://i.ibb.co/B8K1Gwr/D-ch-v-b-o-hi-m-removebg-preview.png',
          roleBadge: '4+ NĂM KINH NGHIỆM',
          roleBullets: [
            'Quản trị dịch vụ khách hàng bảo hiểm chuẩn BCP',
            'Giám sát tiếp nhận và giải quyết quyền lợi (Claims)',
            'Tối ưu hóa quy trình tư vấn và chăm sóc VIP',
          ],
          teamBadge: '80 – 150+ CHUYÊN VIÊN',
          teamBullets: [
            'Đội ngũ Contact Center & Advisory Care',
            'Bộ phận thẩm định & hỗ trợ bồi thường',
            'Đội ngũ chăm sóc đại lý và kênh Bancassurance',
          ],
          techBadge: 'CORE SYSTEM CHUYÊN DỤNG',
          techBullets: [
            'Prudential Life / AS400 / VideoCall Advisory',
            'Hệ thống ghi âm giám sát tuân thủ 100%',
            'Nền tảng Claims Online & Cổng thông tin PruOnline',
          ],
          description:
            'Chịu trách nhiệm thiết lập và vận hành trung tâm dịch vụ khách hàng ngành bảo hiểm nhân thọ, áp dụng quy trình kiểm soát chất lượng khắt khe và kế hoạch duy trì kinh doanh liên tục (BCP). Nâng cao độ chính xác trong tư vấn, hỗ trợ bồi thường minh bạch và giữ vững chỉ số gắn kết khách hàng dài hạn.',
          achievements: [
            {
              label: 'Tỷ lệ giải quyết FCR',
              value: '95%',
              sub: '(ngay lần đầu)',
              cardBg: 'bg-sky-50/70 dark:bg-slate-800/80',
              borderColor: 'border-sky-100 dark:border-white/5',
              iconBg: 'bg-sky-100 dark:bg-sky-950/70 text-sky-600 dark:text-sky-400',
              metricColor: 'text-sky-600 dark:text-sky-400',
              iconType: 'trend',
            },
            {
              label: 'Điểm CSAT Bảo hiểm',
              value: '99%',
              sub: '(chuẩn quốc tế)',
              cardBg: 'bg-emerald-50/70 dark:bg-slate-800/80',
              borderColor: 'border-emerald-100 dark:border-white/5',
              iconBg: 'bg-emerald-100 dark:bg-emerald-950/70 text-emerald-600 dark:text-emerald-400',
              metricColor: 'text-emerald-600 dark:text-emerald-400',
              iconType: 'shield',
            },
            {
              label: 'Thời gian duyệt Claims',
              value: '-50%',
              sub: '(số hóa quy trình)',
              cardBg: 'bg-amber-50/70 dark:bg-slate-800/80',
              borderColor: 'border-amber-100 dark:border-white/5',
              iconBg: 'bg-amber-100 dark:bg-amber-950/70 text-amber-600 dark:text-amber-400',
              metricColor: 'text-amber-600 dark:text-amber-400',
              iconType: 'clock',
            },
            {
              label: 'Đào tạo chuẩn hóa',
              value: '100%',
              sub: '(đạt chứng chỉ)',
              cardBg: 'bg-purple-50/70 dark:bg-slate-800/80',
              borderColor: 'border-purple-100 dark:border-white/5',
              iconBg: 'bg-purple-100 dark:bg-purple-950/70 text-purple-600 dark:text-purple-400',
              metricColor: 'text-purple-600 dark:text-purple-400',
              iconType: 'team',
            },
          ],
          partners: [
            { name: 'Prudential', logo: 'https://i.ibb.co/XfpQphWF/Prudential.png', sub: 'Tập đoàn bảo hiểm Anh Quốc' },
            { name: 'VPBank', logo: 'https://i.ibb.co/hxHm9TsZ/Mobifone.png', sub: 'Đối tác Bancassurance' },
            { name: 'Standard Chartered', logo: 'https://i.ibb.co/BSVS4xf/Shopee.png', sub: 'Ngân hàng đối tác' },
            { name: 'Shinhan Bank', logo: 'https://i.ibb.co/7NtSSz4d/Finviet.png', sub: 'Kênh phân phối liên kết' },
          ],
        };

      case '04': // Game & eSports
        return {
          heroSubtitle: 'Đồng hành cùng cộng đồng game thủ, vận hành hệ thống hỗ trợ hàng triệu người chơi.',
          heroTags: 'Thể thao điện tử • eSports • Cộng đồng',
          heroImage: 'https://i.ibb.co/pBKmWZHc/Game-e-Sports-removebg-preview.png',
          roleBadge: '5+ NĂM KINH NGHIỆM',
          roleBullets: [
            'Tổ chức và điều hành hệ thống CSKH eSports',
            'Giám sát vận hành dịch vụ game online 24/7',
            'Bảo mật tài khoản, phòng chống hack & cheat',
          ],
          teamBadge: '200 – 500+ NHÂN SỰ / CA',
          teamBullets: [
            'Đội ngũ Hỗ trợ Ticket, Live Chat & Diễn đàn',
            'Ban Quản trị Sự kiện & Giải đấu eSports',
            'Đội ngũ Giám sát Kỹ thuật phòng máy Gcafe',
          ],
          techBadge: 'HỆ THỐNG CSKH TẬP TRUNG',
          techBullets: [
            'Garena / LMHT / FIFA Online / ShopeePay',
            'Ticket Desk xử lý 80.000 yêu cầu/ngày',
            'Công cụ kiểm duyệt & phát hiện gian lận real-time',
          ],
          description:
            'Xây dựng và phát triển đội ngũ chăm sóc khách hàng quy mô lớn phục vụ các tựa game eSports hàng đầu tại Việt Nam. Triển khai các kênh hỗ trợ chuyên sâu cho giải đấu lớn, bảo vệ an toàn tài khoản người dùng và nâng cao uy tín thương hiệu trong cộng đồng game thủ.',
          achievements: [
            {
              label: 'Năng lực xử lý Ticket',
              value: '80K/ngày',
              sub: '(đáp ứng 100% SLA)',
              cardBg: 'bg-sky-50/70 dark:bg-slate-800/80',
              borderColor: 'border-sky-100 dark:border-white/5',
              iconBg: 'bg-sky-100 dark:bg-sky-950/70 text-sky-600 dark:text-sky-400',
              metricColor: 'text-sky-600 dark:text-sky-400',
              iconType: 'trend',
            },
            {
              label: 'Điểm CSAT Game thủ',
              value: '96%',
              sub: '(duy trì chuẩn cao)',
              cardBg: 'bg-emerald-50/70 dark:bg-slate-800/80',
              borderColor: 'border-emerald-100 dark:border-white/5',
              iconBg: 'bg-emerald-100 dark:bg-emerald-950/70 text-emerald-600 dark:text-emerald-400',
              metricColor: 'text-emerald-600 dark:text-emerald-400',
              iconType: 'shield',
            },
            {
              label: 'Tốc độ phản hồi Chat',
              value: '< 30s',
              sub: '(giải quyết tức thì)',
              cardBg: 'bg-amber-50/70 dark:bg-slate-800/80',
              borderColor: 'border-amber-100 dark:border-white/5',
              iconBg: 'bg-amber-100 dark:bg-amber-950/70 text-amber-600 dark:text-amber-400',
              metricColor: 'text-amber-600 dark:text-amber-400',
              iconType: 'clock',
            },
            {
              label: 'Bảo mật tài khoản',
              value: '99.9%',
              sub: '(ngăn ngừa gian lận)',
              cardBg: 'bg-purple-50/70 dark:bg-slate-800/80',
              borderColor: 'border-purple-100 dark:border-white/5',
              iconBg: 'bg-purple-100 dark:bg-purple-950/70 text-purple-600 dark:text-purple-400',
              metricColor: 'text-purple-600 dark:text-purple-400',
              iconType: 'team',
            },
          ],
          partners: [
            { name: 'Garena', logo: 'https://i.ibb.co/h1Md65yV/Garena.png', sub: 'Nhà phát hành thể thao điện tử' },
            { name: 'VED', logo: 'https://i.ibb.co/fYPJLfbw/VED.png', sub: 'Vietnam Esports' },
            { name: 'GCafe', logo: 'https://i.ibb.co/FkWk3s4W/GCafe.png', sub: 'Hạ tầng phòng máy toàn quốc' },
            { name: 'AirPay', logo: 'https://i.ibb.co/LdYv3TJy/Shopee-Paye.png', sub: 'Thanh toán dịch vụ game' },
          ],
        };

      case '05': // Thanh toán điện tử
        return {
          heroSubtitle: 'Đảm bảo giao dịch thông suốt, an toàn tài chính và trải nghiệm thanh toán tiện lợi.',
          heroTags: 'Fintech • Ví điện tử • An toàn bảo mật',
          heroImage: 'https://i.ibb.co/hRJDnYw4/Thanh-to-n-i-n-t-removebg-preview.png',
          roleBadge: '5+ NĂM KINH NGHIỆM',
          roleBullets: [
            'Vận hành dịch vụ khách hàng ví điện tử & Fintech',
            'Xử lý tra soát giao dịch ngân hàng & hoàn tiền',
            'Bảo mật thanh toán, phòng chống rửa tiền (AML)',
          ],
          teamBadge: '60 – 120+ CHUYÊN VIÊN',
          teamBullets: [
            'Đội ngũ Hỗ trợ Giao dịch 24/7 Real-time',
            'Bộ phận Tra soát Đối soát Ngân hàng',
            'Đội ngũ Hỗ trợ Điểm chấp nhận thanh toán Merchant',
          ],
          techBadge: 'CORE FINTECH & GATEWAY',
          techBullets: [
            'MoMo / ShopeePay / Finviet / AirPay',
            'Cổng kết nối NAPAS & Hệ thống ngân hàng',
            'Fraud Detection & AI Risk Engine giám sát giao dịch',
          ],
          description:
            'Tổ chức và điều hành trung tâm chăm sóc khách hàng ngành ví điện tử và thanh toán số, giải quyết tức thời các thắc mắc giao dịch, xử lý tra soát và hoàn tiền chuẩn xác. Thiết lập cơ chế kiểm soát gian lận, bảo mật thông tin tài khoản và nâng cao mức độ tin cậy của dịch vụ tài chính số.',
          achievements: [
            {
              label: 'Tỷ lệ tra soát đúng hạn',
              value: '99.5%',
              sub: '(tuân thủ chuẩn NHNN)',
              cardBg: 'bg-sky-50/70 dark:bg-slate-800/80',
              borderColor: 'border-sky-100 dark:border-white/5',
              iconBg: 'bg-sky-100 dark:bg-sky-950/70 text-sky-600 dark:text-sky-400',
              metricColor: 'text-sky-600 dark:text-sky-400',
              iconType: 'trend',
            },
            {
              label: 'Điểm CSAT Thanh toán',
              value: '98%',
              sub: '(độ hài lòng cao)',
              cardBg: 'bg-emerald-50/70 dark:bg-slate-800/80',
              borderColor: 'border-emerald-100 dark:border-white/5',
              iconBg: 'bg-emerald-100 dark:bg-emerald-950/70 text-emerald-600 dark:text-emerald-400',
              metricColor: 'text-emerald-600 dark:text-emerald-400',
              iconType: 'shield',
            },
            {
              label: 'Thời gian giải quyết sự cố',
              value: '< 15m',
              sub: '(cho giao dịch lỗi)',
              cardBg: 'bg-amber-50/70 dark:bg-slate-800/80',
              borderColor: 'border-amber-100 dark:border-white/5',
              iconBg: 'bg-amber-100 dark:bg-amber-950/70 text-amber-600 dark:text-amber-400',
              metricColor: 'text-amber-600 dark:text-amber-400',
              iconType: 'clock',
            },
            {
              label: 'An toàn giao dịch',
              value: '100%',
              sub: '(bảo vệ tài sản KH)',
              cardBg: 'bg-purple-50/70 dark:bg-slate-800/80',
              borderColor: 'border-purple-100 dark:border-white/5',
              iconBg: 'bg-purple-100 dark:bg-purple-950/70 text-purple-600 dark:text-purple-400',
              metricColor: 'text-purple-600 dark:text-purple-400',
              iconType: 'team',
            },
          ],
          partners: [
            { name: 'MoMo', logo: 'https://i.ibb.co/k2QtrgTw/Momo.png', sub: 'Ví điện tử hàng đầu' },
            { name: 'ShopeePay', logo: 'https://i.ibb.co/LdYv3TJy/Shopee-Paye.png', sub: 'Ví thanh toán trực tuyến' },
            { name: 'Finviet', logo: 'https://i.ibb.co/7NtSSz4d/Finviet.png', sub: 'Ví ECO & Điểm đại lý' },
            { name: 'AirPay', logo: 'https://i.ibb.co/LdYv3TJy/Shopee-Paye.png', sub: 'Cổng thanh toán điện tử' },
          ],
        };

      case '06': // Xây dựng hệ thống
      default:
        return {
          heroSubtitle: 'Quy chuẩn hóa quy trình, chuyển đổi số toàn diện và tối ưu năng suất vận hành.',
          heroTags: 'Chuyển đổi số • Chuẩn hóa SOP • Tối ưu',
          heroImage: 'https://i.ibb.co/Kj5P9tvf/X-y-d-ng-h-th-ng-removebg-preview.png',
          roleBadge: '10+ NĂM KINH NGHIỆM',
          roleBullets: [
            'Thiết kế và triển khai mô hình Contact Center',
            'Chuẩn hóa bộ quy trình SOP, SLA và QA toàn diện',
            'Tư vấn số hóa và tích hợp AI vào vận hành',
          ],
          teamBadge: 'TƯ VẤN & SET-UP ĐA MÔ HÌNH',
          teamBullets: [
            'Chuyên gia Quản trị Vận hành & Kiến trúc sư CSKH',
            'Đội ngũ Chuyên viên Phân tích Nghiệp vụ BA & QA',
            'Đội ngũ Huấn luyện viên Đào tạo nội bộ',
          ],
          techBadge: 'NỀN TẢNG CÔNG NGHỆ CHUẨN',
          techBullets: [
            'Cisco / Genesys / Avaya / Zendesk / CRM Custom',
            'Data Warehouse & Báo cáo quản trị BI tự động',
            'Hệ thống AI Chatbot, Voicebot & Speech Analytics',
          ],
          description:
            'Tư vấn chiến lược, xây dựng và chuyển giao mô hình trung tâm dịch vụ khách hàng từ quy mô khởi tạo đến hàng trăm nhân sự. Thiết lập trọn bộ tiêu chuẩn vận hành SOP, hệ thống đo lường hiệu suất KPI/SLA và ứng dụng các giải pháp công nghệ tiên tiến để tối ưu hóa năng suất và chi phí.',
          achievements: [
            {
              label: 'Năng suất vận hành',
              value: '+45%',
              sub: '(sau chuẩn hóa SOP)',
              cardBg: 'bg-sky-50/70 dark:bg-slate-800/80',
              borderColor: 'border-sky-100 dark:border-white/5',
              iconBg: 'bg-sky-100 dark:bg-sky-950/70 text-sky-600 dark:text-sky-400',
              metricColor: 'text-sky-600 dark:text-sky-400',
              iconType: 'trend',
            },
            {
              label: 'Mức độ tuân thủ SLA',
              value: '99%',
              sub: '(chuẩn hóa kiểm toán)',
              cardBg: 'bg-emerald-50/70 dark:bg-slate-800/80',
              borderColor: 'border-emerald-100 dark:border-white/5',
              iconBg: 'bg-emerald-100 dark:bg-emerald-950/70 text-emerald-600 dark:text-emerald-400',
              metricColor: 'text-emerald-600 dark:text-emerald-400',
              iconType: 'shield',
            },
            {
              label: 'Thời gian Onboarding',
              value: '-35%',
              sub: '(nhờ E-learning LMS)',
              cardBg: 'bg-amber-50/70 dark:bg-slate-800/80',
              borderColor: 'border-amber-100 dark:border-white/5',
              iconBg: 'bg-amber-100 dark:bg-amber-950/70 text-amber-600 dark:text-amber-400',
              metricColor: 'text-amber-600 dark:text-amber-400',
              iconType: 'clock',
            },
            {
              label: 'Hệ thống set-up thành công',
              value: '10+',
              sub: '(doanh nghiệp lớn)',
              cardBg: 'bg-purple-50/70 dark:bg-slate-800/80',
              borderColor: 'border-purple-100 dark:border-white/5',
              iconBg: 'bg-purple-100 dark:bg-purple-950/70 text-purple-600 dark:text-purple-400',
              metricColor: 'text-purple-600 dark:text-purple-400',
              iconType: 'team',
            },
          ],
          partners: [
            { name: 'Cisco', logo: 'https://i.ibb.co/hxHm9TsZ/Mobifone.png', sub: 'Hạ tầng mạng viễn thông' },
            { name: 'Genesys', logo: 'https://i.ibb.co/BSVS4xf/Shopee.png', sub: 'Nền tảng Contact Center' },
            { name: 'Zendesk', logo: 'https://i.ibb.co/7NtSSz4d/Finviet.png', sub: 'CSKH đa kênh Omnichannel' },
            { name: 'Microsoft', logo: 'https://i.ibb.co/h1Md65yV/Garena.png', sub: 'Hạ tầng điện toán đám mây' },
          ],
        };
    }
  };

  // Kiểm tra lĩnh vực có thỏa mãn bộ lọc Quy mô 100+ nhân sự hoặc CSAT >= 98% không
  const checkDomainKpiMatch = (domainId: string) => {
    const isTeam100Plus = ['01', '02', '04', '05', '06'].includes(domainId);
    const isCsat98Plus = ['01', '02', '03', '05', '06'].includes(domainId);
    if (kpiFilter === 'team-100') return isTeam100Plus;
    if (kpiFilter === 'csat-98') return isCsat98Plus;
    if (kpiFilter === 'both') return isTeam100Plus && isCsat98Plus;
    return true;
  };

  const filteredDomains = DOMAINS_DATA.filter((d) => {
    const matchesFilter =
      filter === 'all' ||
      (filter === 'telecom' && d.id === '01') ||
      (filter === 'commerce' && (d.id === '02' || d.id === '05')) ||
      (filter === 'finance' && (d.id === '03' || d.id === '05')) ||
      (filter === 'gaming' && d.id === '04') ||
      (filter === 'systems' && d.id === '06');

    const matchesKpi = checkDomainKpiMatch(d.id);

    return matchesFilter && matchesKpi;
  });

  return (
    <div
      className="w-full h-full flex-1 min-h-0 flex flex-col justify-between gap-[15px] max-w-7xl mx-auto select-none relative text-slate-800 dark:text-slate-100 overflow-hidden"
    >
      {/* THANH ĐIỀU KHIỂN & BỘ LỌC LĨNH VỰC (ĐÃ XÓA BANNER VÀ TABS PHÂN LOẠI) */}
      {!selectedDomain && (
        <div className="w-full flex flex-wrap items-center justify-between gap-2.5 pb-2 border-b border-slate-200/70 dark:border-white/10 shrink-0">
          {/* 2. Brand Interactive Filter Bar */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
            <span className="text-[10.5px] font-bold tracking-wider text-slate-600 dark:text-slate-300 shrink-0 flex items-center gap-1 font-play">
              <Sparkles className="w-3 h-3 text-cyan-500 animate-spin" />
              Lọc đối tác:
            </span>
            <button
              type="button"
              onClick={handleClearBrands}
              className={cn(
                'px-2 py-0.5 rounded-full text-[10px] font-bold transition-all border cursor-pointer shrink-0',
                selectedBrands.length === 0
                  ? 'bg-cyan-500/25 text-cyan-700 dark:text-cyan-300 border-cyan-400/60 shadow-xs'
                  : 'bg-white/80 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 border-black/5 dark:border-white/10 hover:border-cyan-400/30'
              )}
            >
              Tất cả
            </button>
            {PARTNER_BRANDS.map((brand) => {
              const isBrandActive = selectedBrands.includes(brand);
              const meta = getBrandMeta(brand);
              return (
                <button
                  key={brand}
                  type="button"
                  onClick={(e) => handleToggleBrand(brand, e)}
                  style={{
                    backgroundColor: isBrandActive ? meta.color : undefined,
                    borderColor: isBrandActive ? `${meta.color}` : undefined,
                    boxShadow: isBrandActive ? `0 0 14px ${meta.glow}` : undefined,
                  }}
                  className={cn(
                    'px-2.5 py-0.5 rounded-full text-[10px] font-bold transition-all border cursor-pointer shrink-0 flex items-center gap-1.5 relative group/filter',
                    isBrandActive
                      ? 'text-white font-black scale-105 shadow-md'
                      : 'bg-white/85 dark:bg-slate-800/85 text-slate-700 dark:text-slate-300 border-black/5 dark:border-white/10 hover:border-cyan-400/50 '
                  )}
                  title={`Lọc thẻ liên quan đến đối tác ${brand} (${meta.partnerType})`}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full shrink-0"
                    style={{ backgroundColor: isBrandActive ? '#ffffff' : meta.color }}
                  />
                  <span>{brand}</span>
                  {isBrandActive && <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />}
                </button>
              );
            })}
            {selectedBrands.length > 0 && (
              <button
                type="button"
                onClick={handleClearBrands}
                className="px-2 py-0.5 rounded-full text-[9.5px] font-bold bg-rose-500/20 text-rose-600 dark:text-rose-400 border border-rose-400/40 hover:bg-rose-500 hover:text-white transition-all cursor-pointer shrink-0 flex items-center gap-1 ml-1"
                title="Bỏ lọc tất cả đối tác"
              >
                <X className="w-3 h-3" />
                <span>Xóa lọc ({selectedBrands.length})</span>
              </button>
            )}
          </div>

          {/* 5. Bộ lọc Lĩnh vực theo Quy mô Đội ngũ & Chỉ số KPI (KPI Threshold Filter) */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
            <span className="text-[10.5px] font-bold tracking-wider text-slate-600 dark:text-slate-300 shrink-0 flex items-center gap-1 font-play">
              <BarChart3 className="w-3 h-3 text-emerald-500" />
              <span>Ngưỡng KPI:</span>
            </span>
            {[
              { id: 'all', label: 'Tất cả (6)' },
              { id: 'team-100', label: 'Quy mô 100+ nhân sự' },
              { id: 'csat-98', label: 'CSAT ≥ 98%' },
              { id: 'both', label: '100+ NS & CSAT ≥ 98%' },
            ].map((item) => {
              const isActive = kpiFilter === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    SoundEngine.playTap();
                    setKpiFilter(item.id as 'all' | 'team-100' | 'csat-98' | 'both');
                  }}
                  className={cn(
                    'px-2.5 py-0.5 rounded-full text-[10px] font-bold transition-all border cursor-pointer shrink-0 flex items-center gap-1',
                    isActive
                      ? 'bg-emerald-600 text-white border-emerald-400 shadow-xs'
                      : 'bg-white/85 dark:bg-slate-800/85 text-slate-700 dark:text-slate-300 border-black/5 dark:border-white/10 hover:border-emerald-400/50'
                  )}
                >
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Brand Interactive Showcase Status Bar */}
          {selectedBrands.length > 0 && (
            <div className="w-full mt-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500/15 via-blue-500/10 to-indigo-500/15 border border-cyan-400/30 backdrop-blur-md flex items-center justify-between gap-2 text-xs font-play animate-fadeIn">
              <div className="flex items-center gap-2 min-w-0">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping shrink-0" />
                <span className="text-[11px] font-bold text-slate-800 dark:text-slate-100 truncate">
                  Showcase thương hiệu: <span className="text-cyan-600 dark:text-cyan-300 font-black">{selectedBrands.join(', ')}</span> — Làm nổi bật các dự án, KPI thành tựu và câu chuyện thành công hợp tác.
                </span>
              </div>
              <button
                type="button"
                onClick={handleClearBrands}
                className="text-[10.5px] font-bold text-cyan-700 dark:text-cyan-300 hover:underline shrink-0 cursor-pointer"
              >
                Xem tất cả lĩnh vực ➔
              </button>
            </div>
          )}
        </div>
      )}

      {/* 3. VÙNG HIỂN THỊ NỘI DUNG LĨNH VỰC (GRID CARD EXPANSION TRANSITION - THẺ MỞ RỘNG TOÀN BỘ LƯỚI) */}
      <div className="w-full flex-1 min-h-0 relative flex flex-col overflow-hidden">
        <AnimatePresence mode="wait">
          {!selectedDomain ? (
            /* Grid View 3x2 tự động co giãn chiều cao vừa khít thẻ chính với khoảng cách 15px */
            <motion.div
              key="domains-grid-luminous"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="w-full h-full flex-1 min-h-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2 gap-[15px] items-stretch overflow-y-auto lg:overflow-visible glass-scrollbar pr-0.5"
            >
              {filteredDomains.map((domain) => {
                const cfg = getCardVisualConfig(domain.id);
                const detail = getDomainDetailInfo(domain);
                const isFlipped = Boolean(flippedCards[domain.id]);
                const isPlayingAudio = playingAudioId === domain.id;

                // Kiểm tra đối tác có khớp với bộ lọc brand đang chọn không (Hỗ trợ Multi-Select)
                const isBrandMatched = selectedBrands.length > 0
                  ? domain.logos.some((l) =>
                      selectedBrands.some(
                        (b) =>
                          l.name.toLowerCase().includes(b.toLowerCase()) ||
                          b.toLowerCase().includes(l.name.toLowerCase())
                      )
                    )
                  : false;
                const isDimmed = selectedBrands.length > 0 ? !isBrandMatched : false;

                return (
                  <motion.div
                    layoutId={`domain-card-${domain.id}`}
                    transition={{
                      duration: 0.55,
                      ease: [0.25, 1, 0.5, 1],
                    }}
                    key={domain.id}
                    data-domain-id={domain.id}
                    data-domain-brand={domain.logos.map((l) => l.name).join(' ')}
                    onClick={() => {
                      if (!isFlipped) {
                        SoundEngine.playPageFlip();
                        setSelectedDomain(domain);
                      }
                    }}
                    onMouseEnter={() => setHoveredCardId(domain.id)}
                    onMouseLeave={() => setHoveredCardId(null)}
                    className={cn(
                      'theme-pastel-card rounded-[14px] cursor-pointer group/card relative transition-all duration-300 ease-out flex flex-col h-full min-h-0 text-left',
                      isBrandMatched &&
                        'ring-2 ring-cyan-400 dark:ring-cyan-300 shadow-[0_0_32px_rgba(56,189,248,0.55)] scale-[1.015] z-20',
                      isDimmed && 'opacity-35 grayscale-[50%] transition-opacity duration-300'
                    )}
                    style={{
                      perspective: '1200px',
                    }}
                    title={isFlipped ? 'Mặt sau: 4 Chỉ số KPI cốt lõi' : 'Bấm để mở rộng toàn bộ lưới (Grid Card Expansion Transition)'}
                  >
                  {/* Container xoay lật 3D */}
                  <div
                    className="w-full h-full relative transition-transform duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
                    style={{
                      transformStyle: 'preserve-3d',
                      transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                    }}
                  >
                    {/* ========================================================= */}
                    {/* MẶT TRƯỚC (FRONT): BỐ CỤC CODEPEN + AUDIO 15S + NÚT LẬT KPI */}
                    {/* ========================================================= */}
                    <div
                      className="w-full h-full rounded-[14px] p-3.5 sm:p-4 border border-white/60 dark:border-white/10 shadow-[0_12px_32px_-6px_rgba(28,7,8,0.12),0_4px_10px_rgba(28,7,8,0.06),inset_0_1px_2px_rgba(255,255,255,0.9)] dark:shadow-[0_16px_38px_-6px_rgba(0,0,0,0.75),0_0_20px_-2px_var(--card-accent-color,rgba(56,189,248,0.25))] hover:shadow-[0_24px_50px_-8px_rgba(28,7,8,0.22),inset_0_1px_2px_rgba(255,255,255,1)] dark:hover:shadow-[0_24px_50px_-8px_rgba(0,0,0,0.85),0_0_32px_var(--card-accent-color,rgba(56,189,248,0.45))] flex flex-col justify-between overflow-hidden relative transition-all duration-300 ease-out"
                      style={{
                        backfaceVisibility: 'hidden',
                        WebkitBackfaceVisibility: 'hidden',
                        background: isDark
                          ? 'linear-gradient(180deg, rgba(15, 23, 42, 0.88) 0%, rgba(10, 15, 30, 0.78) 100%)'
                          : 'linear-gradient(180deg, rgba(255, 255, 255, 0.75) 0%, rgba(255, 255, 255, 0.42) 100%)',
                        backdropFilter: 'blur(0.65em)',
                        WebkitBackdropFilter: 'blur(0.65em)',
                        ['--card-accent-color' as string]: cfg.accentColor,
                      }}
                    >
                      {/* Soft ambient background */}
                      <div
                        className="absolute -right-8 -bottom-8 w-48 h-48 rounded-full pointer-events-none transition-all duration-500 opacity-75 group-hover/card:opacity-100 group-hover/card:scale-120 blur-2xl"
                        style={{ background: cfg.ambientGlow }}
                      />
                      <div className="absolute -right-6 -top-6 w-36 h-36 rounded-full bg-white/60 dark:bg-white/5 blur-xl pointer-events-none group-hover/card:scale-125 transition-transform duration-500" />

                      {/* Top Row: Tiêu đề Thẻ Lĩnh Vực */}
                      <div className="relative z-10 flex items-center justify-between gap-2 shrink-0 w-full">
                        {/* Tiêu đề & Icon với Hiệu Ứng 3D Parallax Tilt */}
                        <div
                          className="flex items-center gap-2.5 transition-all duration-300 group-hover/card:translate-x-0.5 min-w-0 flex-1"
                          style={{ color: cfg.accentColor }}
                        >
                          <ParallaxTiltIcon maxTilt={18} glowColor={cfg.accentColor} className="shrink-0">
                            <motion.div
                              layoutId={`domain-icon-${domain.id}`}
                              className="w-[20px] h-[20px] sm:w-[22px] sm:h-[22px] shrink-0 flex items-center justify-center animate-icon-floating"
                            >
                              {getDomainBadgeIcon(domain.id, 'w-[20px] h-[20px] sm:w-[22px] sm:h-[22px]')}
                            </motion.div>
                          </ParallaxTiltIcon>
                          <motion.h2
                            layoutId={`domain-title-${domain.id}`}
                            className="domain-card-title text-[18px] sm:text-[19px] lg:text-[20px] font-black font-play leading-tight tracking-tight truncate flex items-center"
                            style={{
                              color: cfg.accentColor,
                              textShadow: isDark
                                ? '0 2px 8px rgba(0,0,0,0.6)'
                                : '-0.5px -0.5px 0.5px rgba(0,0,0,0.12), 1px 1px 2px rgba(255,255,255,0.8)',
                            }}
                            title={domain.titleVi}
                          >
                            {formatCardTitle(cfg.fourWordTitle || domain.titleVi)}
                          </motion.h2>
                        </div>
                      </div>

                      {/* Middle Section: Left Content (7 cols) + Right 3D Illustration (5 cols) */}
                      <div className="relative z-10 grid grid-cols-12 gap-2 items-center flex-1 min-h-0 my-1">
                        {/* Left 7 cols: Tag Lines + Font mô tả */}
                        <div className="col-span-7 flex flex-col justify-center gap-1.5 pr-0.5 min-w-0">
                          {/* CodePen Tag Lines (.tag-lines & span.tag) */}
                          <div className="tag-lines flex items-center gap-1.5 flex-wrap">
                            <span
                              className="tag inline-flex items-center gap-1 px-2 py-0.5 rounded-[5px] text-[10.5px] font-bold border transition-all duration-200"
                              style={{
                                backgroundColor: isDark ? 'rgba(30, 41, 59, 0.85)' : 'hsl(0deg 0% 96% / 90%)',
                                color: isDark ? '#e2e8f0' : '#4a4a4a',
                                borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.06)',
                                textShadow: isDark ? 'none' : '0.5px 0.5px 0.5px rgba(255,255,255,0.6)',
                              }}
                            >
                              <svg
                                className="w-2.5 h-2.5 shrink-0"
                                style={{ color: cfg.accentColor }}
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.4"
                                viewBox="0 0 24 24"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-7-7 7 7-7 7" />
                              </svg>
                              <span className="truncate">{domain.experienceVi}</span>
                            </span>

                            {detail.heroTags
                              .split('•')
                              .slice(0, 2)
                              .map((tag, idx) => (
                                <span
                                  key={idx}
                                  className="tag hidden sm:inline-flex items-center px-1.5 py-0.5 rounded-[5px] text-[10px] font-medium border"
                                  style={{
                                    backgroundColor: isDark ? 'rgba(30, 41, 59, 0.7)' : 'hsl(0deg 0% 96% / 80%)',
                                    color: isDark ? '#cbd5e1' : '#57534e',
                                    borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)',
                                  }}
                                >
                                  {tag.trim()}
                                </span>
                              ))}
                          </div>

                          {/* CodePen p.text-sm: Orientation Description */}
                          <p
                            className="text-[11px] sm:text-[11.5px] leading-relaxed break-words line-clamp-3"
                            style={{
                              color: isDark ? 'rgba(226, 232, 240, 0.88)' : 'rgba(28, 7, 8, 0.72)',
                              textShadow: isDark ? 'none' : '0.25px 0.25px 0.25px rgba(255,255,255,0.5)',
                            }}
                          >
                            <span className="font-bold text-slate-800 dark:text-slate-100 font-play">Mô tả : </span>
                            “{domain.orientationVi.replace(/^[“"']+|[”"']+$/g, '')}”
                          </p>
                        </div>

                        {/* Right 5 cols: 3D Illustration với Parallax 3D Tilt */}
                        <div className="col-span-5 min-h-[115px] sm:min-h-[125px] lg:min-h-[135px] h-auto flex items-center justify-center relative overflow-visible">
                          <ParallaxTiltIcon maxTilt={14} glowColor={cfg.accentColor} scaleOnHover={1.08} className="w-full h-full">
                            <motion.div
                              layoutId={`domain-illustration-${domain.id}`}
                              className="w-full h-full flex items-center justify-center p-1 transition-all duration-500 ease-out transform rotate-[4.5deg] group-hover/card:rotate-0"
                              style={{
                                filter: isDark
                                  ? 'drop-shadow(4.5px 6px 12px rgba(0,0,0,0.65)) saturate(1.25) contrast(0.95)'
                                  : 'drop-shadow(4.5px 6px 10px rgba(28,7,8,0.22)) saturate(1.25) contrast(0.95)',
                              }}
                            >
                              {renderCard3DIllustration(domain.id, hoveredCardId === domain.id)}
                            </motion.div>
                          </ParallaxTiltIcon>
                        </div>
                      </div>

                      {/* Thanh Thuyết Minh AI 15s Floating Mini Bar (khi isPlayingAudio) */}
                      {isPlayingAudio && (
                        <div className="absolute inset-x-2.5 bottom-12 z-30 p-2 rounded-[10px] bg-slate-950/95 text-white border border-cyan-400/50 shadow-2xl backdrop-blur-md flex flex-col gap-1 animate-fadeIn">
                          <div className="flex items-center justify-between gap-1.5">
                            <div className="flex items-center gap-1 min-w-0">
                              <Sparkles className="w-3 h-3 text-cyan-400 animate-spin shrink-0" />
                              <span className="text-[9.5px] font-bold uppercase tracking-wider text-cyan-300 font-play truncate">
                                AI 15s • {currentAiVoiceLabel}
                              </span>
                            </div>
                            <div className="flex items-center gap-1.5 shrink-0">
                              {/* 5 cột sóng âm waveform nhấp nhô */}
                              <div className="flex items-end gap-0.5 h-3">
                                {[35, 85, 55, 100, 45].map((h, i) => (
                                  <span
                                    key={i}
                                    className="w-0.5 bg-cyan-400 rounded-full animate-pulse"
                                    style={{
                                      height: `${h}%`,
                                      animationDelay: `${i * 0.12}s`,
                                      animationDuration: '0.5s',
                                    }}
                                  />
                                ))}
                              </div>
                              <span className="font-mono text-[9.5px] font-bold text-amber-300 bg-black/50 px-1 rounded">
                                {audioTimeLeft}s
                              </span>
                              <button
                                type="button"
                                onClick={(e) => handleToggleAudio(domain.id, '', e)}
                                className="text-slate-400 hover:text-white p-0.5 cursor-pointer"
                                title="Đóng thuyết minh"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                          {/* Progress bar */}
                          <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 transition-all duration-100 ease-linear"
                              style={{ width: `${audioProgress}%` }}
                            />
                          </div>
                          {/* Subtitle text */}
                          <p className="text-[9.5px] leading-tight text-slate-200 line-clamp-2 italic font-play">
                            &ldquo;{DOMAIN_AUDIO_SUMMARIES[domain.id]?.text}&rdquo;
                          </p>
                        </div>
                      )}

                      {/* Bottom Row: CTA Button + Partner Brand Circular Medallions */}
                      <div className="relative z-10 pt-2 mt-0.5 border-t border-black/5 dark:border-white/10 flex items-center justify-between gap-2 shrink-0">
                        {/* CodePen Pill CTA Button */}
                        <div className="panel-heading active flex items-center">
                          <span
                            className="py-1.5 px-3.5 inline-flex items-center gap-1.5 font-bold rounded-full text-[11px] text-white transition-all duration-300 group-hover/card:scale-105 shadow-sm"
                            style={{
                              background: cfg.arrowBg,
                              boxShadow: isDark
                                ? cfg.arrowShadow
                                : 'inset 0px 1px 0px 0px rgba(255, 255, 255, 0.45), 0 3px 10px rgba(0,0,0,0.15)',
                              border: '1px solid rgba(0, 0, 0, 0.15)',
                            }}
                          >
                            <span>Xem lĩnh vực</span>
                            <svg
                              className="w-3 h-3 group-hover/card:translate-x-1 transition-transform duration-300"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2.4"
                              viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-7-7 7 7-7 7" />
                            </svg>
                          </span>
                        </div>

                        {/* Partner logos: Hiệu ứng xếp chồng đan xen (Overlapping Stack), vầng hào quang thương hiệu, tooltip vai trò & huy hiệu bảo chứng */}
                        <div className="group/stack flex items-center -space-x-2.5 sm:-space-x-3 hover:space-x-1.5 transition-all duration-300 ease-out ml-auto py-1">
                          {domain.logos.map((logo, logoIdx) => {
                            const isSelectedLogo = selectedBrands.some(
                              (b) =>
                                logo.name.toLowerCase().includes(b.toLowerCase()) ||
                                b.toLowerCase().includes(logo.name.toLowerCase())
                            );
                            const brandMeta = getBrandMeta(logo.name);
                            const logoKey = `${domain.id}-${logo.name}`;
                            const isHoveredLogo = hoveredLogoKey === logoKey;
                            const logoSrc = logo.src.includes('Logo-VED.gif')
                              ? 'https://i.ibb.co/fYPJLfbw/VED.png'
                              : logo.src.replace(/\.gif$/i, '.png');

                            return (
                              <div
                                key={logo.name}
                                onClick={(e) => handleToggleBrand(logo.name, e)}
                                onMouseEnter={() => setHoveredLogoKey(logoKey)}
                                onMouseLeave={() => setHoveredLogoKey(null)}
                                style={{
                                  zIndex: isHoveredLogo ? 50 : 10 + logoIdx,
                                  borderColor: brandMeta.color,
                                  boxShadow: isHoveredLogo || isSelectedLogo
                                    ? `0 0 16px ${brandMeta.glow}, 0 0 0 2px ${brandMeta.color}`
                                    : `0 0 0 2px ${brandMeta.color}, 0 2px 6px rgba(0,0,0,0.1)`,
                                }}
                                className={cn(
                                  'logo-pill-light w-[44px] h-[44px] sm:w-[48px] sm:h-[48px] rounded-full bg-white p-0.5 flex items-center justify-center shrink-0 transition-all duration-200 cursor-pointer group/logo relative border-2 shadow-md overflow-hidden',
                                  isHoveredLogo ? 'scale-115 -translate-y-1' : 'hover:scale-110 hover:-translate-y-0.5',
                                  isSelectedLogo && 'scale-110'
                                )}
                                title={`Đối tác: ${logo.name} • Bấm để lọc kết hợp`}
                              >
                                {/* 1. Vầng Hào Quang Thương Hiệu (Brand Glow Aura) */}
                                <span
                                  className="absolute -inset-1 rounded-full opacity-0 group-hover/logo:opacity-100 transition-opacity duration-300 blur-[8px] pointer-events-none"
                                  style={{ backgroundColor: brandMeta.color }}
                                />

                                <img
                                  src={logoSrc}
                                  alt={logo.alt}
                                  className="w-full h-full object-cover block rounded-full shrink-0 pointer-events-none select-none transition-transform duration-200 relative z-1"
                                  loading="lazy"
                                />

                                {/* 2. Tooltip Thông Tin Vai Trò Dự Án Với Thương Hiệu (Brand Project Role Tooltip) */}
                                <AnimatePresence>
                                  {isHoveredLogo && (
                                    <motion.div
                                      initial={{ opacity: 0, y: 6, scale: 0.92 }}
                                      animate={{ opacity: 1, y: 0, scale: 1 }}
                                      exit={{ opacity: 0, y: 4, scale: 0.92 }}
                                      transition={{ duration: 0.16, ease: "easeOut" }}
                                      className="absolute bottom-full mb-2.5 left-1/2 -translate-x-1/2 z-50 w-56 sm:w-64 p-2.5 rounded-xl bg-slate-900/95 dark:bg-slate-950/95 text-white border shadow-2xl backdrop-blur-xl pointer-events-none text-left"
                                      style={{ borderColor: `${brandMeta.color}80` }}
                                    >
                                      {/* Header: Dot + Short name + Type Badge */}
                                      <div className="flex items-center justify-between pb-1.5 border-b border-white/10 gap-1.5">
                                        <div className="flex items-center gap-1.5 min-w-0">
                                          <span
                                            className="w-2 h-2 rounded-full shrink-0 shadow-xs animate-pulse"
                                            style={{ backgroundColor: brandMeta.color }}
                                          />
                                          <span className="text-[11px] font-black font-play text-white truncate">
                                            {brandMeta.shortName || logo.name}
                                          </span>
                                        </div>
                                        {brandMeta.verified && (
                                          <span className="text-[8.5px] font-mono font-bold px-1.5 py-0.2 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 flex items-center gap-0.5 shrink-0">
                                            <Check className="w-2.5 h-2.5 stroke-[3]" />
                                            <span>Đối tác</span>
                                          </span>
                                        )}
                                      </div>

                                      {/* Vai trò dự án thực chiến */}
                                      <div className="py-1.5 space-y-0.5">
                                        <span className="text-[9px] font-mono uppercase font-bold text-slate-400 block tracking-wider">
                                          Vai trò thực chiến:
                                        </span>
                                        <p className="text-[10.5px] text-slate-100 font-semibold leading-snug">
                                          {brandMeta.role}
                                        </p>
                                      </div>

                                      {/* Giải thưởng / Chứng nhận nếu có */}
                                      {brandMeta.awardText && (
                                        <div className="pt-1 border-t border-white/5 flex items-center gap-1 text-[9px] text-amber-300 font-bold">
                                          <Trophy className="w-2.5 h-2.5 text-amber-400 shrink-0" />
                                          <span className="truncate">{brandMeta.awardText}</span>
                                        </div>
                                      )}

                                      {/* Footer hint */}
                                      <div className="pt-1 text-[8.5px] text-cyan-300/90 font-mono font-medium flex items-center justify-between border-t border-white/5">
                                        <span>✦ Nhấp để lọc</span>
                                        <span style={{ color: brandMeta.color }}>● {brandMeta.partnerType}</span>
                                      </div>

                                      {/* Arrow mũi tên */}
                                      <div className="absolute top-full left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-900 border-r border-b border-white/20 rotate-45 -mt-1" />
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    {/* ========================================================= */}
                    {/* MẶT SAU (BACK): QUICK KPI FLIP MINI-CARD (4 CHỈ SỐ CỐT LÕI) */}
                    {/* ========================================================= */}
                    <div
                      className="absolute inset-0 w-full h-full rounded-[14px] p-3.5 sm:p-4 border border-white/60 dark:border-white/10 shadow-[0_16px_36px_-6px_rgba(28,7,8,0.18)] dark:shadow-[0_18px_40px_-6px_rgba(0,0,0,0.8),0_0_22px_-2px_var(--card-accent-color,rgba(56,189,248,0.25))] flex flex-col justify-between overflow-hidden z-20 transition-all duration-300"
                      style={{
                        backfaceVisibility: 'hidden',
                        WebkitBackfaceVisibility: 'hidden',
                        transform: 'rotateY(180deg)',
                        background: isDark
                          ? 'linear-gradient(180deg, rgba(15, 23, 42, 0.95) 0%, rgba(10, 15, 30, 0.92) 100%)'
                          : 'linear-gradient(180deg, rgba(255, 255, 255, 0.94) 0%, rgba(240, 249, 255, 0.9) 100%)',
                        backdropFilter: 'blur(0.8em)',
                        WebkitBackdropFilter: 'blur(0.8em)',
                        ['--card-accent-color' as string]: cfg.accentColor,
                      }}
                    >
                      {/* Ambient Glow mặt sau */}
                      <div
                        className="absolute -right-8 -top-8 w-44 h-44 rounded-full pointer-events-none opacity-60 blur-2xl"
                        style={{ background: cfg.ambientGlow }}
                      />

                      {/* Header Mặt sau: Icon + Tiêu đề + Huy hiệu 4 KPI + Nút Lật lại */}
                      <div className="relative z-10 flex items-center justify-between gap-2 shrink-0 border-b border-black/5 dark:border-white/10 pb-2">
                        <div className="flex items-center gap-2 min-w-0">
                          <div className="w-[18px] h-[18px] shrink-0" style={{ color: cfg.accentColor }}>
                            {getDomainBadgeIcon(domain.id, 'w-[18px] h-[18px]')}
                          </div>
                          <div className="min-w-0">
                            <h3
                              className="text-[14px] sm:text-[15px] font-black font-play truncate"
                              style={{ color: cfg.accentColor }}
                            >
                              {cfg.fourWordTitle || domain.titleVi}
                            </h3>
                            <span className="inline-flex items-center gap-1 text-[9.5px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider font-play">
                              <BarChart3 className="w-2.5 h-2.5 text-amber-500" />
                              4 Chỉ số thành tựu cốt lõi
                            </span>
                          </div>
                        </div>

                        {/* Nút lật lại về mặt trước */}
                        <button
                          type="button"
                          onClick={(e) => toggleCardFlip(domain.id, e)}
                          className="w-7 h-7 rounded-full bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 flex items-center justify-center transition-all cursor-pointer hover:rotate-180 duration-300 shrink-0"
                          title="Lật lại mặt trước"
                        >
                          <RotateCw className="w-3.5 h-3.5 text-slate-700 dark:text-slate-200" />
                        </button>
                      </div>

                      {/* Lưới 2x2: 4 Chỉ số thành tựu cốt lõi (KPI) */}
                      <div className="relative z-10 grid grid-cols-2 gap-2 flex-1 my-2 min-h-0">
                        {detail.achievements.map((kpi, idx) => (
                          <div
                            key={idx}
                            className="rounded-[10px] p-2 flex flex-col justify-between border border-black/5 dark:border-white/10 relative overflow-hidden transition-all duration-200 "
                            style={{
                              background: isDark
                                ? 'rgba(30, 41, 59, 0.75)'
                                : 'linear-gradient(135deg, rgba(255, 255, 255, 0.85) 0%, rgba(248, 250, 252, 0.75) 100%)',
                            }}
                          >
                            <span className="text-[10px] font-bold text-slate-600 dark:text-slate-300 line-clamp-1 font-play">
                              {kpi.label}
                            </span>
                            <div className="my-0.5">
                              <span
                                className="text-[20px] sm:text-[22px] font-black font-play leading-none tracking-tight block"
                                style={{ color: cfg.accentColor }}
                              >
                                {kpi.value}
                              </span>
                            </div>
                            <span className="text-[9px] text-slate-500 dark:text-slate-400 truncate font-medium">
                              {kpi.sub}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Footer Mặt sau: Nút 'Quay lại' + Nút 'Mở rộng chi tiết' */}
                      <div className="relative z-10 pt-2 border-t border-black/5 dark:border-white/10 flex items-center justify-between gap-2 shrink-0">
                        <button
                          type="button"
                          onClick={(e) => toggleCardFlip(domain.id, e)}
                          className="px-2.5 py-1 rounded-full text-[10.5px] font-bold bg-white/80 dark:bg-slate-800/80 hover:bg-white dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-black/10 dark:border-white/10 flex items-center gap-1 cursor-pointer transition-all shadow-xs"
                        >
                          <RotateCw className="w-3 h-3 text-amber-500" />
                          <span>Mặt trước</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setSelectedDomain(domain)}
                          className="px-3 py-1 rounded-full text-[10.5px] font-bold text-white flex items-center gap-1 cursor-pointer transition-all shadow-sm hover:scale-105"
                          style={{
                            background: cfg.arrowBg,
                            boxShadow: isDark ? cfg.arrowShadow : '0 3px 10px rgba(0,0,0,0.15)',
                          }}
                        >
                          <span>Mở chi tiết</span>
                          <ChevronRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        ) : (() => {
          const detail = getDomainDetailInfo(selectedDomain);
          const cfg = getCardVisualConfig(selectedDomain.id);

          return (
            /* Thẻ Chi Tiết Lĩnh Vực Hợp Nhất (Kích thước chiếm chính xác toàn bộ vùng lưới 6 thẻ, hiệu ứng Grid Card Expansion Transition) */
            <motion.div
              key={`domain-detail-${selectedDomain.id}`}
              layoutId={`domain-card-${selectedDomain.id}`}
              initial={{ opacity: 0.95 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.25 } }}
              transition={{
                duration: 0.55,
                ease: [0.25, 1, 0.5, 1],
              }}
              style={{
                background: cfg.cardBg,
                ['--card-accent-color' as string]: cfg.accentColor,
              }}
              className={`theme-pastel-card w-full h-full flex-1 min-h-0 rounded-[14px] border ${cfg.cardBorder} p-3.5 sm:p-4 lg:p-5 shadow-[0_16px_40px_-6px_rgba(15,23,42,0.18),0_6px_16px_-2px_rgba(15,23,42,0.08),inset_0_1px_2px_rgba(255,255,255,0.95)] dark:shadow-[0_24px_50px_-8px_rgba(0,0,0,0.85),0_0_32px_var(--card-accent-color,rgba(56,189,248,0.35)),inset_0_1px_1.5px_rgba(255,255,255,0.18)] relative overflow-hidden flex flex-col justify-between text-left font-play transition-all duration-300`}
            >
              {/* Soft ambient background glows */}
              <div
                className="absolute -right-16 -bottom-16 w-80 h-80 rounded-full pointer-events-none opacity-80 blur-3xl"
                style={{ background: cfg.ambientGlow }}
              />
              <div className="absolute -left-12 -top-12 w-64 h-64 rounded-full bg-white/40 dark:bg-white/5 blur-2xl pointer-events-none" />

              {/* 1. Header Bar: Tiêu đề không đóng khung, icon & tiêu đề cùng màu, pill & nút quay lại */}
              <div className="w-full flex items-center justify-between gap-3 shrink-0 pb-2.5 border-b border-black/5 dark:border-white/10 relative z-10 flex-wrap sm:flex-nowrap">
                {/* Left: Icon & 4-word Title & Pills */}
                <div className="flex items-center gap-2.5 min-w-0 flex-wrap sm:flex-nowrap">
                  <motion.div
                    layoutId={`domain-icon-${selectedDomain.id}`}
                    className="w-[20px] h-[20px] sm:w-[22px] sm:h-[22px] shrink-0 flex items-center justify-center animate-icon-floating"
                    style={{ color: cfg.accentColor }}
                  >
                    {getDomainBadgeIcon(selectedDomain.id, 'w-[20px] h-[20px] sm:w-[22px] sm:h-[22px]')}
                  </motion.div>
                  <motion.h3
                    layoutId={`domain-title-${selectedDomain.id}`}
                    className="text-[18px] sm:text-[20px] lg:text-[22px] font-black font-play leading-none tracking-tight truncate flex items-center"
                    style={{ color: cfg.accentColor }}
                    title={selectedDomain.titleVi}
                  >
                    {formatCardTitle(cfg.fourWordTitle || selectedDomain.titleVi)}
                  </motion.h3>

                  {/* Pill Badge */}
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10.5px] font-bold border shadow-2xs ${cfg.pillBg} shrink-0`}
                  >
                    <svg className="w-3 h-3 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-7-7 7 7-7 7" />
                    </svg>
                    <span>{detail.roleBadge || selectedDomain.experienceVi}</span>
                  </span>

                  {/* Tags */}
                  <span className="hidden md:inline-flex px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-white/80 dark:bg-slate-800/80 border border-slate-200/80 dark:border-white/10 text-slate-600 dark:text-slate-300 shadow-2xs">
                    {detail.heroTags}
                  </span>
                </div>

                {/* Right: Cụm Tab chuyển đổi & Cụm nút đóng / quay lại danh sách 6 lĩnh vực (Hỗ trợ phím Escape) */}
                <div className="flex items-center gap-2 shrink-0 flex-wrap sm:flex-nowrap">
                  {/* Cụm 3 Tabs Chuyển Đổi: Trụ cột vận hành | Case study thực chiến | Đo lường trước sau */}
                  <div className="flex items-center gap-1 bg-white/70 dark:bg-slate-800/80 p-0.5 rounded-full border border-black/5 dark:border-white/10 shadow-2xs">
                    <button
                      type="button"
                      onClick={() => {
                        SoundEngine.playTap();
                        setActiveDetailTab('overview');
                      }}
                      className={cn(
                        "px-2.5 py-1 rounded-full text-[10.5px] font-bold transition-all flex items-center gap-1 cursor-pointer",
                        activeDetailTab === 'overview'
                          ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-2xs"
                          : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                      )}
                    >
                      <Layers className="w-3 h-3" />
                      <span>Trụ cột vận hành</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        SoundEngine.playTap();
                        setActiveDetailTab('casestudy');
                      }}
                      className={cn(
                        "px-2.5 py-1 rounded-full text-[10.5px] font-bold transition-all flex items-center gap-1 cursor-pointer",
                        activeDetailTab === 'casestudy'
                          ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-2xs"
                          : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                      )}
                    >
                      <BookOpen className="w-3 h-3" />
                      <span>Case study thực chiến</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        SoundEngine.playTap();
                        setActiveDetailTab('impact');
                      }}
                      className={cn(
                        "px-2.5 py-1 rounded-full text-[10.5px] font-bold transition-all flex items-center gap-1 cursor-pointer",
                        activeDetailTab === 'impact'
                          ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-2xs"
                          : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                      )}
                    >
                      <SlidersHorizontal className="w-3 h-3" />
                      <span>Đo lường trước sau</span>
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      SoundEngine.playTap();
                      setSelectedDomain(null);
                    }}
                    className="px-3.5 py-1.5 rounded-full bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 text-xs font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-1.5 cursor-pointer active:scale-95 shrink-0"
                    title="Quay lại 6 lĩnh vực ban đầu (Phím Esc)"
                  >
                    <ArrowLeft className="w-3.5 h-3.5 stroke-[2.4]" />
                    <span>Quay lại 6 lĩnh vực</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      SoundEngine.playTap();
                      setSelectedDomain(null);
                    }}
                    className="w-7 h-7 rounded-full bg-black/10 dark:bg-white/10 hover:bg-rose-500 hover:text-white dark:hover:bg-rose-500 dark:hover:text-white text-slate-700 dark:text-slate-200 transition-all flex items-center justify-center cursor-pointer active:scale-95 shrink-0"
                    title="Đóng thẻ (Esc)"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* 2. Main Content Grid (Tối ưu hóa bố cục nằm gọn trong thẻ chi tiết) */}
              <div className="w-full flex-1 min-h-0 my-2 grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-3.5 items-stretch relative z-10 overflow-y-auto lg:overflow-hidden glass-scrollbar pr-0.5">
                {/* Left Area (4 cols on lg): Hình 3D, Tầm nhìn chiến lược & Đối tác */}
                <div className="col-span-12 lg:col-span-4 flex flex-col justify-between gap-2.5 h-full min-h-0">
                  {/* Khối hình 3D và Tầm nhìn định hướng */}
                  <div className="p-3.5 rounded-2xl bg-white/70 dark:bg-slate-900/70 border border-white/80 dark:border-white/10 backdrop-blur-md shadow-2xs flex flex-col justify-between flex-1 min-h-0 relative overflow-hidden">
                    {/* Visual Illustration & Quote */}
                    <div className="relative z-10 flex flex-col justify-between h-full">
                      <div>
                        <div className="flex items-center gap-2 mb-1.5">
                          <span
                            className="w-2 h-2 rounded-full animate-ping shrink-0"
                            style={{ backgroundColor: cfg.accentColor }}
                          />
                          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                            Định hướng chiến lược
                          </span>
                        </div>
                        <h4 className="text-xs sm:text-[13px] font-bold text-slate-900 dark:text-white leading-snug font-play">
                          “{detail.heroSubtitle}”
                        </h4>
                        <p className="text-[11px] font-medium text-slate-600 dark:text-slate-300 leading-relaxed mt-2 line-clamp-3 sm:line-clamp-4">
                          {detail.description}
                        </p>
                      </div>

                      {/* 3D illustration centered với Parallax 3D Tilt mượt mà */}
                      <div className="w-full h-28 sm:h-32 flex items-center justify-center my-auto overflow-visible">
                        <ParallaxTiltIcon maxTilt={16} glowColor={cfg.accentColor} scaleOnHover={1.06} className="w-full h-full">
                          <motion.div
                            layoutId={`domain-illustration-${selectedDomain.id}`}
                            className="w-full h-full flex items-center justify-center animate-float-slow"
                          >
                            {renderCard3DIllustration(selectedDomain.id, false)}
                          </motion.div>
                        </ParallaxTiltIcon>
                      </div>
                    </div>
                  </div>

                  {/* Khối logo đối tác tiêu biểu: Xếp chồng Avatar Stack, vầng hào quang, tooltip vai trò & huy hiệu bảo chứng */}
                  <div className="p-2.5 rounded-2xl bg-white/70 dark:bg-slate-900/70 border border-white/80 dark:border-white/10 shadow-2xs flex items-center justify-between gap-2 shrink-0">
                    <span className="text-[10.5px] font-bold text-slate-600 dark:text-slate-300 font-play shrink-0">
                      Đối tác tiêu biểu:
                    </span>
                    <div className="group/stack-detail flex items-center -space-x-2.5 sm:-space-x-3 hover:space-x-1.5 transition-all duration-300 ease-out overflow-x-auto no-scrollbar py-1">
                      {selectedDomain.logos.map((logo, lIdx) => {
                        const brandMeta = getBrandMeta(logo.name);
                        const detailLogoKey = `detail-${selectedDomain.id}-${logo.name}`;
                        const isHovered = hoveredLogoKey === detailLogoKey;
                        const isSelected = selectedBrands.some(
                          (b) =>
                            logo.name.toLowerCase().includes(b.toLowerCase()) ||
                            b.toLowerCase().includes(logo.name.toLowerCase())
                        );
                        const logoSrc = logo.src.includes('Logo-VED.gif')
                          ? 'https://i.ibb.co/fYPJLfbw/VED.png'
                          : logo.src.replace(/\.gif$/i, '.png');

                        return (
                          <div
                            key={logo.name}
                            onClick={(e) => handleToggleBrand(logo.name, e)}
                            onMouseEnter={() => setHoveredLogoKey(detailLogoKey)}
                            onMouseLeave={() => setHoveredLogoKey(null)}
                            style={{
                              zIndex: isHovered ? 50 : 10 + lIdx,
                              borderColor: brandMeta.color,
                              boxShadow: isHovered || isSelected
                                ? `0 0 16px ${brandMeta.glow}, 0 0 0 2px ${brandMeta.color}`
                                : `0 0 0 2px ${brandMeta.color}, 0 2px 6px rgba(0,0,0,0.1)`,
                            }}
                            className={cn(
                              'logo-pill-light w-[44px] h-[44px] sm:w-[48px] sm:h-[48px] rounded-full bg-white p-0.5 flex items-center justify-center shrink-0 transition-all duration-200 cursor-pointer group/logo relative border-2 shadow-md overflow-hidden',
                              isHovered ? 'scale-115 -translate-y-1' : 'hover:scale-110 hover:-translate-y-0.5',
                              isSelected && 'scale-110'
                            )}
                            title={`Đối tác: ${logo.name} • Bấm để lọc kết hợp`}
                          >
                            {/* 1. Vầng Hào Quang Thương Hiệu (Brand Glow Aura) */}
                            <span
                              className="absolute -inset-1 rounded-full opacity-0 group-hover/logo:opacity-100 transition-opacity duration-300 blur-[8px] pointer-events-none"
                              style={{ backgroundColor: brandMeta.color }}
                            />

                            <img
                              src={logoSrc}
                              alt={logo.alt}
                              className="w-full h-full object-cover block rounded-full shrink-0 pointer-events-none select-none transition-transform duration-200 relative z-1"
                              loading="lazy"
                            />

                            {/* 2. Tooltip Thông Tin Vai Trò Dự Án Với Thương Hiệu (Brand Project Role Tooltip) */}
                            <AnimatePresence>
                              {isHovered && (
                                <motion.div
                                  initial={{ opacity: 0, y: 6, scale: 0.92 }}
                                  animate={{ opacity: 1, y: 0, scale: 1 }}
                                  exit={{ opacity: 0, y: 4, scale: 0.92 }}
                                  transition={{ duration: 0.16, ease: "easeOut" }}
                                  className="absolute bottom-full mb-2.5 left-1/2 -translate-x-1/2 z-50 w-56 sm:w-64 p-2.5 rounded-xl bg-slate-900/95 dark:bg-slate-950/95 text-white border shadow-2xl backdrop-blur-xl pointer-events-none text-left"
                                  style={{ borderColor: `${brandMeta.color}80` }}
                                >
                                  {/* Header: Dot + Short name + Type Badge */}
                                  <div className="flex items-center justify-between pb-1.5 border-b border-white/10 gap-1.5">
                                    <div className="flex items-center gap-1.5 min-w-0">
                                      <span
                                        className="w-2 h-2 rounded-full shrink-0 shadow-xs animate-pulse"
                                        style={{ backgroundColor: brandMeta.color }}
                                      />
                                      <span className="text-[11px] font-black font-play text-white truncate">
                                        {brandMeta.shortName || logo.name}
                                      </span>
                                    </div>
                                    {brandMeta.verified && (
                                      <span className="text-[8.5px] font-mono font-bold px-1.5 py-0.2 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 flex items-center gap-0.5 shrink-0">
                                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                                        <span>Đối tác</span>
                                      </span>
                                    )}
                                  </div>

                                  {/* Vai trò dự án thực chiến */}
                                  <div className="py-1.5 space-y-0.5">
                                    <span className="text-[9px] font-mono uppercase font-bold text-slate-400 block tracking-wider">
                                      Vai trò thực chiến:
                                    </span>
                                    <p className="text-[10.5px] text-slate-100 font-semibold leading-snug">
                                      {brandMeta.role}
                                    </p>
                                  </div>

                                  {/* Giải thưởng / Chứng nhận nếu có */}
                                  {brandMeta.awardText && (
                                    <div className="pt-1 border-t border-white/5 flex items-center gap-1 text-[9px] text-amber-300 font-bold">
                                      <Trophy className="w-2.5 h-2.5 text-amber-400 shrink-0" />
                                      <span className="truncate">{brandMeta.awardText}</span>
                                    </div>
                                  )}

                                  {/* Footer hint */}
                                  <div className="pt-1 text-[8.5px] text-cyan-300/90 font-mono font-medium flex items-center justify-between border-t border-white/5">
                                    <span>✦ Nhấp để lọc</span>
                                    <span style={{ color: brandMeta.color }}>● {brandMeta.partnerType}</span>
                                  </div>

                                  {/* Arrow mũi tên */}
                                  <div className="absolute top-full left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-900 border-r border-b border-white/20 rotate-45 -mt-1" />
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Right Area (8 cols on lg): 3 Trụ cột vận hành | Case Study thực chiến | Before/After Slider */}
                <div className="col-span-12 lg:col-span-8 flex flex-col justify-between gap-2.5 h-full min-h-0">
                  {/* TAB 1: TRỤ CỘT VẬN HÀNH (OVERVIEW) */}
                  {activeDetailTab === 'overview' && (
                    <motion.div
                      key="tab-overview"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="flex flex-col justify-between gap-2.5 h-full min-h-0"
                    >
                      {/* Top: 3 Trụ Cột Vận Hành Cốt Lõi */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 flex-1 min-h-0 items-stretch">
                        {/* Trụ cột 1: Vai trò trách nhiệm thực thi */}
                        <div className="rounded-2xl bg-white/75 dark:bg-slate-900/75 border border-white/80 dark:border-white/10 p-3 shadow-2xs flex flex-col justify-between gap-1.5">
                          <div>
                            <div className="flex items-center gap-1.5 pb-1 border-b border-slate-100 dark:border-white/5">
                              <User className="w-3.5 h-3.5 text-blue-600 dark:text-sky-400 stroke-[2.2] shrink-0" />
                              <h4 className="text-xs font-black font-play text-blue-600 dark:text-sky-400 leading-tight">
                                {formatCardTitle("Vai trò trách nhiệm thực thi")}
                              </h4>
                            </div>
                            <div className="my-1.5">
                              <span className="px-2 py-0.5 rounded-full text-[9px] font-mono font-bold bg-blue-50 dark:bg-blue-950/70 text-blue-700 dark:text-sky-300 border border-blue-200/80 dark:border-blue-800">
                                {detail.roleBadge}
                              </span>
                            </div>
                            <ul className="space-y-1 text-[10.5px] sm:text-[11px] text-slate-700 dark:text-slate-200 font-medium">
                              {detail.roleBullets.map((b, i) => (
                                <li key={i} className="flex items-start gap-1 leading-snug">
                                  <span className="text-blue-500 dark:text-sky-400 shrink-0">•</span>
                                  <span>{b}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        {/* Trụ cột 2: Quy mô đội ngũ */}
                        <div className="rounded-2xl bg-white/75 dark:bg-slate-900/75 border border-white/80 dark:border-white/10 p-3 shadow-2xs flex flex-col justify-between gap-1.5">
                          <div>
                            <div className="flex items-center gap-1.5 pb-1 border-b border-slate-100 dark:border-white/5">
                              <Users className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 stroke-[2.2] shrink-0" />
                              <h4 className="text-xs font-black font-play text-emerald-600 dark:text-emerald-400 leading-tight">
                                {formatCardTitle("Quy mô đội ngũ")}
                              </h4>
                            </div>
                            <div className="my-1.5">
                              <span className="px-2 py-0.5 rounded-full text-[9px] font-mono font-bold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200/80 dark:border-emerald-800">
                                {detail.teamBadge}
                              </span>
                            </div>
                            <ul className="space-y-1 text-[10.5px] sm:text-[11px] text-slate-700 dark:text-slate-200 font-medium">
                              {detail.teamBullets.map((b, i) => (
                                <li key={i} className="flex items-start gap-1 leading-snug">
                                  <span className="text-emerald-500 dark:text-emerald-400 shrink-0">•</span>
                                  <span>{b}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        {/* Trụ cột 3: Công nghệ hệ thống vận hành (Bấm vào mục bất kỳ để mở Sơ đồ kiến trúc luồng xử lý) */}
                        <div className="rounded-2xl bg-white/75 dark:bg-slate-900/75 border border-white/80 dark:border-white/10 p-3 shadow-2xs flex flex-col justify-between gap-1.5">
                          <div>
                            <div className="flex items-center justify-between gap-1.5 pb-1 border-b border-slate-100 dark:border-white/5">
                              <div className="flex items-center gap-1.5 min-w-0">
                                <Settings className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400 stroke-[2.2] shrink-0" />
                                <h4 className="text-xs font-black font-play text-purple-600 dark:text-purple-400 leading-tight truncate">
                                  {formatCardTitle("Công nghệ hệ thống vận hành")}
                                </h4>
                              </div>
                              <button
                                type="button"
                                onClick={() => {
                                  SoundEngine.playTap();
                                  setTechExplorerState({
                                    domainId: selectedDomain.id,
                                    bullet: detail.techBullets[0],
                                    allBullets: detail.techBullets,
                                    accentColor: cfg.accentColor,
                                  });
                                }}
                                className="px-1.5 py-0.5 rounded-md text-[8.5px] font-mono font-bold bg-purple-500/15 hover:bg-purple-600 text-purple-700 dark:text-purple-300 hover:text-white border border-purple-400/30 transition cursor-pointer shrink-0 flex items-center gap-0.5"
                                title="Mở Bản đồ Hệ sinh thái Công nghệ & Sơ đồ luồng xử lý cuộc gọi/ticket"
                              >
                                <Activity className="w-2.5 h-2.5" />
                                <span>Sơ đồ luồng</span>
                              </button>
                            </div>
                            <div className="my-1.5 flex items-center justify-between gap-1">
                              <span className="px-2 py-0.5 rounded-full text-[9px] font-mono font-bold bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border border-purple-200/80 dark:border-purple-800">
                                {detail.techBadge}
                              </span>
                              <span className="text-[8.5px] font-mono text-purple-600 dark:text-purple-400 italic">
                                Nhấp mục để xem luồng
                              </span>
                            </div>
                            <ul className="space-y-1 text-[10.5px] sm:text-[11px] text-slate-700 dark:text-slate-200 font-medium">
                              {detail.techBullets.map((b, i) => (
                                <li
                                  key={i}
                                  onClick={() => {
                                    SoundEngine.playTap();
                                    setTechExplorerState({
                                      domainId: selectedDomain.id,
                                      bullet: b,
                                      allBullets: detail.techBullets,
                                      accentColor: cfg.accentColor,
                                    });
                                  }}
                                  title={`Nhấp để xem sơ đồ kiến trúc luồng xử lý của: ${b}`}
                                  className="group/tech flex items-start justify-between gap-1 leading-snug p-1 -mx-1 rounded-lg hover:bg-purple-500/15 dark:hover:bg-purple-500/20 border border-transparent hover:border-purple-400/40 transition-all cursor-pointer"
                                >
                                  <div className="flex items-start gap-1 min-w-0">
                                    <span className="text-purple-500 dark:text-purple-400 shrink-0 font-bold">•</span>
                                    <span className="group-hover/tech:text-purple-700 dark:group-hover/tech:text-purple-300 group-hover/tech:font-bold transition-colors">
                                      {b}
                                    </span>
                                  </div>
                                  <ExternalLink className="w-3 h-3 text-purple-500 opacity-60 group-hover/tech:opacity-100 shrink-0 mt-0.5" />
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>

                      {/* Bottom: 4 Chỉ số thành tựu nổi bật */}
                      <div className="p-2.5 sm:p-3 rounded-2xl bg-white/75 dark:bg-slate-900/75 border border-white/80 dark:border-white/10 shadow-2xs shrink-0 flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                          <Trophy className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
                          <h4 className="text-xs sm:text-sm font-black font-play text-amber-600 dark:text-amber-400">
                            Kết quả &amp; Thành tựu nổi bật
                          </h4>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                          {detail.achievements.map((item, idx) => {
                            let IconComp = TrendingUp;
                            if (item.iconType === 'shield') IconComp = ShieldCheck;
                            if (item.iconType === 'clock') IconComp = Clock;
                            if (item.iconType === 'team') IconComp = Users;

                            return (
                              <div
                                key={idx}
                                className={cn(
                                  "p-2 sm:p-2.5 rounded-xl border flex flex-col justify-between gap-1 shadow-2xs transition-all",
                                  item.cardBg,
                                  item.borderColor
                                )}
                              >
                                <div className="flex items-center justify-between">
                                  <span className="text-[10px] font-bold text-slate-700 dark:text-slate-300 truncate leading-tight">
                                    {item.label}
                                  </span>
                                  <div className={cn("w-5 h-5 rounded-full flex items-center justify-center shrink-0 shadow-2xs", item.iconBg)}>
                                    <IconComp className="w-3 h-3" />
                                  </div>
                                </div>
                                <div className="mt-0.5">
                                  <span className={cn("text-base sm:text-lg font-black font-mono leading-tight block", item.metricColor)}>
                                    {item.value}
                                  </span>
                                  <span className="text-[9px] text-slate-400 dark:text-slate-500 font-medium block truncate mt-0.5">
                                    {item.sub}
                                  </span>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* TAB 2: CASE STUDY THỰC CHIẾN (PROBLEM -> SOLUTION -> IMPACT) */}
                  {activeDetailTab === 'casestudy' && (() => {
                    const cs = DOMAIN_CASE_STUDIES[selectedDomain.id] || DOMAIN_CASE_STUDIES['01'];
                    return (
                      <motion.div
                        key="tab-casestudy"
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="flex flex-col justify-between gap-2.5 h-full min-h-0"
                      >
                        {/* Header Case Study */}
                        <div className="p-2.5 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-white/80 dark:border-white/10 shadow-2xs flex items-center justify-between gap-2 shrink-0">
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping shrink-0" />
                            <h4 className="text-xs sm:text-sm font-black font-play text-slate-900 dark:text-white truncate">
                              Case study thực chiến: {cs.title}
                            </h4>
                          </div>
                          <div className="flex items-center gap-1.5 shrink-0">
                            <span className="px-2 py-0.5 rounded-full text-[9px] font-mono font-bold bg-cyan-50 dark:bg-cyan-950/70 text-cyan-700 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-800">
                              {cs.client}
                            </span>
                            <span className="text-[9px] font-mono text-slate-400 dark:text-slate-500">
                              {cs.duration}
                            </span>
                          </div>
                        </div>

                        {/* Middle: 2 Khối Thách thức (Problem) & Giải pháp (Solution) */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 flex-1 min-h-0">
                          {/* Khối Thách thức ban đầu (Problem) */}
                          <div className="rounded-2xl bg-rose-50/70 dark:bg-rose-950/30 border border-rose-200/60 dark:border-rose-900/40 p-3 shadow-2xs flex flex-col justify-between gap-1.5">
                            <div>
                              <div className="flex items-center gap-1.5 pb-1 border-b border-rose-200/50 dark:border-rose-900/30">
                                <AlertTriangle className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400 stroke-[2.2] shrink-0" />
                                <h5 className="text-xs font-black font-play text-rose-700 dark:text-rose-300">
                                  Thách thức ban đầu
                                </h5>
                              </div>
                              <p className="text-[11px] font-medium text-slate-700 dark:text-slate-300 leading-snug mt-1.5 mb-2">
                                {cs.problem.description}
                              </p>
                              <ul className="space-y-1 text-[10.5px] text-slate-700 dark:text-slate-200 font-medium">
                                {cs.problem.painPoints.map((pt, i) => (
                                  <li key={i} className="flex items-start gap-1 leading-snug">
                                    <span className="text-rose-500 shrink-0">✕</span>
                                    <span>{pt}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>

                          {/* Khối Giải pháp bứt phá (Solution) */}
                          <div className="rounded-2xl bg-sky-50/70 dark:bg-sky-950/30 border border-sky-200/60 dark:border-sky-900/40 p-3 shadow-2xs flex flex-col justify-between gap-1.5">
                            <div>
                              <div className="flex items-center gap-1.5 pb-1 border-b border-sky-200/50 dark:border-sky-900/30">
                                <Target className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400 stroke-[2.2] shrink-0" />
                                <h5 className="text-xs font-black font-play text-sky-700 dark:text-sky-300">
                                  Giải pháp bứt phá
                                </h5>
                              </div>
                              <p className="text-[11px] font-medium text-slate-700 dark:text-slate-300 leading-snug mt-1.5 mb-2">
                                {cs.solution.description}
                              </p>
                              <ul className="space-y-1 text-[10.5px] text-slate-700 dark:text-slate-200 font-medium">
                                {cs.solution.keyActions.map((act, i) => (
                                  <li key={i} className="flex items-start gap-1 leading-snug">
                                    <span className="text-sky-500 shrink-0">✓</span>
                                    <span>{act}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>

                        {/* Bottom: Khối Kết quả vượt trội (Impact & ROI) */}
                        <div className="p-2.5 sm:p-3 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200/70 dark:border-emerald-900/50 shadow-2xs shrink-0 flex flex-col gap-2">
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-1.5">
                              <Trophy className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                              <h5 className="text-xs sm:text-sm font-black font-play text-emerald-700 dark:text-emerald-300">
                                Kết quả vượt trội
                              </h5>
                            </div>
                            <span className="text-[10px] text-slate-600 dark:text-slate-400 font-medium truncate max-w-sm">
                              {cs.impact.roiSummary}
                            </span>
                          </div>

                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                            {cs.impact.metrics.map((m, idx) => (
                              <div
                                key={idx}
                                className="p-2 rounded-xl bg-white/90 dark:bg-slate-900/90 border border-emerald-200/70 dark:border-emerald-800/60 flex flex-col justify-between shadow-2xs"
                              >
                                <span className="text-[9.5px] font-bold text-slate-600 dark:text-slate-400 truncate">
                                  {m.label}
                                </span>
                                <div className="mt-1 flex items-baseline justify-between gap-1">
                                  <span className="text-base sm:text-lg font-black font-mono text-emerald-600 dark:text-emerald-300">
                                    {m.value}
                                  </span>
                                  <span className="text-[9px] font-mono font-bold text-cyan-600 dark:text-cyan-400">
                                    {m.diff}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })()}

                  {/* TAB 3: ĐO LƯỜNG TRƯỚC VÀ SAU (BEFORE / AFTER IMPACT SLIDER) */}
                  {activeDetailTab === 'impact' && (() => {
                    const impactData = DOMAIN_BEFORE_AFTER_DATA[selectedDomain.id] || DOMAIN_BEFORE_AFTER_DATA['01'];
                    return (
                      <motion.div
                        key="tab-impact"
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="h-full flex flex-col justify-between flex-1 min-h-0"
                      >
                        <BeforeAfterImpactSlider data={impactData} accentColor={cfg.accentColor} />
                      </motion.div>
                    );
                  })()}
                </div>
              </div>
            </motion.div>
          );
        })()}
        </AnimatePresence>
      </div>

      {/* 4. POPUP BẢN ĐỒ HỆ SINH THÁI CÔNG NGHỆ TƯƠNG TÁC (INTERACTIVE TECH STACK EXPLORER MODAL) */}
      {techExplorerState && (
        <TechStackExplorerModal
          domainId={techExplorerState.domainId}
          selectedTechBullet={techExplorerState.bullet}
          allTechBullets={techExplorerState.allBullets}
          accentColor={techExplorerState.accentColor}
          isDark={isDark}
          onSelectTechBullet={(nextBullet) =>
            setTechExplorerState((prev) => (prev ? { ...prev, bullet: nextBullet } : null))
          }
          onClose={() => setTechExplorerState(null)}
        />
      )}
    </div>
  );
};
