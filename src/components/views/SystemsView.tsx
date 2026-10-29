'use client';

import React, { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import {
  RotateCw,
  Volume2,
  VolumeX,
  Play,
  Square,
  Pause,
  Maximize2,
  Minimize2,
  X,
  Sparkles,
  Activity,
  Network,
  Table2,
  LayoutGrid,
  ShieldCheck,
  Database,
  Webhook,
  Users,
  ExternalLink,
  ArrowLeftRight,
} from 'lucide-react';
import { SYSTEMS_DATA } from '@/data/systems';
import { SystemData, SiteTheme } from '@/types';
import { useToast } from '@/components/ui/Toast';
import { WebIcon } from '@/components/ui/WebIcon';
import { SoundEngine } from '@/components/ui/SoundEngine';
import { formatCardTitle } from '@/lib/utils';
import { getSavedMutedPref, saveMutedPref, AUDIO_PREF_EVENT } from '@/utils/audioPreference';
import { DataFlowMatrixModal } from '@/components/ui/DataFlowMatrixModal';

export interface SystemsViewProps {
  currentTheme?: SiteTheme;
}

// 1. Sub-component điều khiển video thẻ hệ thống khi rê chuột + Quick Sound Toggle (Biểu tượng loa nhỏ mờ ở góc):
// Tự động phát mượt mà không tiếng, khi người dùng nhấp biểu tượng loa nhỏ ở góc sẽ bật âm thanh thuyết minh giới thiệu hệ thống
interface SystemCardVideoPlayerProps {
  videoUrl: string;
  isHovered: boolean;
  systemAbbr?: string;
  onSoundToggleToast?: (isMuted: boolean, abbr?: string) => void;
}

const SystemCardVideoPlayer: React.FC<SystemCardVideoPlayerProps> = ({
  videoUrl,
  isHovered,
  systemAbbr,
  onSoundToggleToast,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLocalMuted, setIsLocalMuted] = useState<boolean>(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isHovered) {
      video.currentTime = 0;
      video.muted = isLocalMuted;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          video.muted = true;
          setIsLocalMuted(true);
          video.play().catch(() => {});
        });
      }
    } else {
      video.pause();
      video.currentTime = 0;
      video.muted = true;
      setIsLocalMuted(true);
    }
  }, [isHovered]);

  const handleQuickSoundToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;
    const nextMuted = !isLocalMuted;
    setIsLocalMuted(nextMuted);
    video.muted = nextMuted;
    if (!nextMuted && video.paused) {
      video.play().catch(() => {});
    }
    SoundEngine.playTap();
    onSoundToggleToast?.(nextMuted, systemAbbr);
  };

  return (
    <div
      className={`absolute inset-0 z-10 w-full h-full rounded-xl overflow-hidden bg-black transition-opacity duration-200 ${
        isHovered ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
    >
      <video
        ref={videoRef}
        src={videoUrl}
        loop
        muted={isLocalMuted}
        playsInline
        preload="auto"
        className="w-full h-full object-cover rounded-xl"
      />
      {/* Quick Sound Toggle: Biểu tượng loa nhỏ mờ ở góc để nhấp bật âm thanh thuyết minh giới thiệu hệ thống */}
      <button
        type="button"
        onClick={handleQuickSoundToggle}
        title={
          isLocalMuted
            ? `Nhấp bật âm thanh thuyết minh hệ thống ${systemAbbr || ''}`
            : `Nhấp tắt âm thanh thuyết minh ${systemAbbr || ''}`
        }
        aria-label="Bật tắt âm thanh thuyết minh video"
        className={`absolute bottom-1.5 right-1.5 z-20 w-6 h-6 rounded-full flex items-center justify-center backdrop-blur-md border transition-all duration-200 cursor-pointer ${
          isLocalMuted
            ? 'bg-black/45 hover:bg-black/80 text-white/75 hover:text-white border-white/25 opacity-65 hover:opacity-100 hover:scale-110'
            : 'bg-emerald-500/90 hover:bg-emerald-600 text-white border-emerald-300 shadow-[0_0_12px_rgba(16,185,129,0.85)] opacity-100 scale-105'
        }`}
      >
        {isLocalMuted ? (
          <VolumeX className="w-3 h-3 stroke-[2.2]" />
        ) : (
          <Volume2 className="w-3 h-3 stroke-[2.5] animate-pulse" />
        )}
      </button>
    </div>
  );
};

// Full-card video player: Khi rê chuột vào thẻ hệ thống sẽ hiển thị video toàn thẻ hệ thống, video hiển thị rõ ràng không hiển thị gì khác ngoài video
interface FullCardVideoPlayerProps {
  videoUrl: string;
  isHovered: boolean;
}

const FullCardVideoPlayer: React.FC<FullCardVideoPlayerProps> = ({ videoUrl, isHovered }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (isHovered) {
      video.currentTime = 0;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {});
      }
    } else {
      video.pause();
      video.currentTime = 0;
    }
  }, [isHovered]);

  return (
    <div
      className={`absolute inset-0 z-30 w-full h-full rounded-[14px] overflow-hidden bg-black transition-opacity duration-200 pointer-events-none ${
        isHovered ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <video
        ref={videoRef}
        src={videoUrl}
        loop
        muted
        playsInline
        preload="auto"
        className="w-full h-full object-cover rounded-[14px]"
      />
    </div>
  );
};

// Thông số kỹ thuật chi tiết cho Chế Độ Xem Bảng Ma Trận Tính Năng (Compact Comparison Matrix View) & Live Health Pulse
interface SystemTechSpecItem {
  database: string;
  apiProtocol: string;
  slaCommitment: string;
  isoSecurity: string;
  uptimePct: string;
  baseOnlineUsers: number;
  onlineRoleLabel: string;
  ecosystemGroup: 'cskh' | 'enterprise' | 'ai_analytics';
  ecosystemLabel: string;
}

const SYSTEM_TECH_SPECS_MAP: Record<string, SystemTechSpecItem> = {
  sdp: {
    database: 'PostgreSQL 16 + Redis Cluster',
    apiProtocol: 'RESTful / GraphQL / SSO OAuth2',
    slaCommitment: '99.98% (< 12ms Latency)',
    isoSecurity: 'ISO/IEC 27001:2022 • Zero-Trust SSO',
    uptimePct: '99.98%',
    baseOnlineUsers: 340,
    onlineRoleLabel: 'Agents Online',
    ecosystemGroup: 'cskh',
    ecosystemLabel: 'Vận hành CSKH',
  },
  csc: {
    database: 'PostgreSQL + Elasticsearch 8',
    apiProtocol: 'WebRTC / SIP Trunk / Webhook',
    slaCommitment: '99.98% (Real-time Queue)',
    isoSecurity: 'ISO/IEC 27001:2022 • TLS 1.3 / SRTP',
    uptimePct: '99.98%',
    baseOnlineUsers: 295,
    onlineRoleLabel: 'Agents Online',
    ecosystemGroup: 'cskh',
    ecosystemLabel: 'Vận hành CSKH',
  },
  crm: {
    database: 'PostgreSQL + MongoDB Atlas',
    apiProtocol: 'RESTful API / Event Webhook',
    slaCommitment: '99.98% (Đồng bộ 360° < 15ms)',
    isoSecurity: 'ISO/IEC 27001:2022 • AES-256 PII Masking',
    uptimePct: '99.98%',
    baseOnlineUsers: 210,
    onlineRoleLabel: 'Agents Online',
    ecosystemGroup: 'cskh',
    ecosystemLabel: 'Vận hành CSKH',
  },
  clp: {
    database: 'PostgreSQL + Redis Pub/Sub',
    apiProtocol: 'RESTful / Kafka Event Stream',
    slaCommitment: '99.97% (Tích điểm tức thì)',
    isoSecurity: 'ISO/IEC 27001:2022 • Tokenization',
    uptimePct: '99.98%',
    baseOnlineUsers: 65,
    onlineRoleLabel: 'Agents Online',
    ecosystemGroup: 'cskh',
    ecosystemLabel: 'Vận hành CSKH',
  },
  pos: {
    database: 'PostgreSQL + SQLite Offline Sync',
    apiProtocol: 'gRPC / REST API / Payment Gateway',
    slaCommitment: '99.99% (Offline-First Sync)',
    isoSecurity: 'ISO/IEC 27001:2022 & PCI-DSS Level 1',
    uptimePct: '99.99%',
    baseOnlineUsers: 85,
    onlineRoleLabel: 'Cashiers Online',
    ecosystemGroup: 'cskh',
    ecosystemLabel: 'Vận hành CSKH',
  },
  erp: {
    database: 'Oracle DB / PostgreSQL HA',
    apiProtocol: 'REST / SOAP / EDI / Banking API',
    slaCommitment: '99.99% (ACID Financial Ledger)',
    isoSecurity: 'ISO/IEC 27001:2022 • SOC2 Type II',
    uptimePct: '99.99%',
    baseOnlineUsers: 55,
    onlineRoleLabel: 'Users Online',
    ecosystemGroup: 'enterprise',
    ecosystemLabel: 'Quản trị doanh nghiệp',
  },
  hrm: {
    database: 'PostgreSQL + TimescaleDB',
    apiProtocol: 'RESTful API / Biometric IoT Sync',
    slaCommitment: '99.95% (Auto Payroll Engine)',
    isoSecurity: 'ISO/IEC 27001:2022 • E2E Payroll Encrypt',
    uptimePct: '99.97%',
    baseOnlineUsers: 48,
    onlineRoleLabel: 'HR/Managers',
    ecosystemGroup: 'enterprise',
    ecosystemLabel: 'Quản trị doanh nghiệp',
  },
  bpm: {
    database: 'PostgreSQL + Camunda Workflow DB',
    apiProtocol: 'BPMN 2.0 REST / Webhook / gRPC',
    slaCommitment: '99.98% (Zero Bottleneck)',
    isoSecurity: 'ISO/IEC 27001:2022 • Digital Signature',
    uptimePct: '99.98%',
    baseOnlineUsers: 42,
    onlineRoleLabel: 'Approvers Online',
    ecosystemGroup: 'enterprise',
    ecosystemLabel: 'Quản trị doanh nghiệp',
  },
  okr: {
    database: 'PostgreSQL + Graph Analytics',
    apiProtocol: 'RESTful / GraphQL KPI Sync',
    slaCommitment: '99.96% (Real-time Alignment)',
    isoSecurity: 'ISO/IEC 27001:2022 • RBAC Hierarchy',
    uptimePct: '99.98%',
    baseOnlineUsers: 35,
    onlineRoleLabel: 'Leaders Online',
    ecosystemGroup: 'enterprise',
    ecosystemLabel: 'Quản trị doanh nghiệp',
  },
  lms: {
    database: 'PostgreSQL + S3 Media CDN',
    apiProtocol: 'xAPI / SCORM / HLS Streaming',
    slaCommitment: '99.95% (Full HD Adaptive)',
    isoSecurity: 'ISO/IEC 27001:2022 • DRM Content Guard',
    uptimePct: '99.96%',
    baseOnlineUsers: 30,
    onlineRoleLabel: 'Trainees Online',
    ecosystemGroup: 'enterprise',
    ecosystemLabel: 'Quản trị doanh nghiệp',
  },
  bi: {
    database: 'ClickHouse OLAP + BigQuery',
    apiProtocol: 'WebSocket Stream / GraphQL / SQL',
    slaCommitment: '99.98% (Sub-second Query)',
    isoSecurity: 'ISO/IEC 27001:2022 • Row-Level Security',
    uptimePct: '99.98%',
    baseOnlineUsers: 20,
    onlineRoleLabel: 'Analysts Online',
    ecosystemGroup: 'ai_analytics',
    ecosystemLabel: 'Phân tích & AI',
  },
  ai: {
    database: 'Vector DB (Pinecone/PGVector) + Redis',
    apiProtocol: 'LLM Streaming API / RAG Webhook',
    slaCommitment: '99.98% (24/7 < 400ms First Token)',
    isoSecurity: 'ISO/IEC 27001:2022 • Guardrails & DLP',
    uptimePct: '99.98%',
    baseOnlineUsers: 25,
    onlineRoleLabel: 'AI Bots Active',
    ecosystemGroup: 'ai_analytics',
    ecosystemLabel: 'Phân tích & AI',
  },
};

// Mô tả cơ chế đồng bộ thời gian thực giữa 2 hệ thống bất kỳ trên Interactive Data Flow Canvas
function getRealtimeFlowDescription(sysA: SystemData, sysB: SystemData): {
  protocol: string;
  latency: string;
  payloadSummary: string;
} {
  const pairKey = [sysA.id, sysB.id].sort().join('-');
  const presetMap: Record<string, { protocol: string; latency: string; payloadSummary: string }> = {
    'crm-sdp': {
      protocol: 'RESTful API + Event Webhook 2 chiều',
      latency: '11ms',
      payloadSummary:
        'Đồng bộ tức thì Hồ sơ Khách hàng 360°, Lịch sử tương tác đa kênh, Hạng thẻ thành viên và Ticket đang xử lý ngay trên màn hình Single Agent Workspace.',
    },
    'csc-sdp': {
      protocol: 'WebRTC + SIP Trunk + WebSocket',
      latency: '9ms',
      payloadSummary:
        'Tích hợp trực tiếp trạng thái cuộc gọi VoIP, định tuyến ACD thông minh, ghi âm cuộc gọi và cảnh báo SLA thời gian thực về bàn làm việc SDP.',
    },
    'crm-csc': {
      protocol: 'Webhook Event Stream + CTI Pop-up',
      latency: '14ms',
      payloadSummary:
        'Tự động bật Pop-up thông tin định danh khách hàng (Screen-Pop) ngay khi đổ chuông và tự động lưu nhật ký cuộc gọi/phiếu ghi vào CRM.',
    },
    'erp-pos': {
      protocol: 'gRPC + Message Queue (Kafka)',
      latency: '18ms',
      payloadSummary:
        'Khấu trừ tồn kho thời gian thực ngay khi xuất hóa đơn tại quầy POS, tự động hạch toán bút toán doanh thu và công nợ vào sổ cái ERP.',
    },
    'ai-sdp': {
      protocol: 'SSE Streaming + RAG Vector API',
      latency: '16ms',
      payloadSummary:
        'Trợ lý AI lắng nghe ngữ cảnh hội thoại trên SDP để gợi ý câu trả lời chuẩn SOP (Agent Assist), tóm tắt phiếu ghi tự động và tra cứu tri thức 24/7.',
    },
    'crm-clp': {
      protocol: 'REST API + Redis Pub/Sub',
      latency: '12ms',
      payloadSummary:
        'Cập nhật điểm thưởng Loyalty, hạng thành viên VIP và danh sách Voucher khả dụng của khách hàng theo thời gian thực.',
    },
    'hrm-okr': {
      protocol: 'GraphQL Sync + OAuth2',
      latency: '19ms',
      payloadSummary:
        'Liên kết kết quả hoàn thành mục tiêu OKR/KPI cá nhân và phòng ban trực tiếp với hệ thống đánh giá năng lực và tính thưởng hiệu suất HRM.',
    },
    'bi-sdp': {
      protocol: 'ClickHouse Stream + WebSocket',
      latency: '15ms',
      payloadSummary:
        'Thu thập toàn bộ luồng sự kiện vận hành từ SDP để kết xuất lên biểu đồ Real-time Wallboard (AHT, CSAT, FCR, SLA).',
    },
  };

  if (presetMap[pairKey]) {
    return presetMap[pairKey];
  }

  return {
    protocol: 'Enterprise Service Bus (REST / Webhook / Kafka)',
    latency: '14ms',
    payloadSummary: `Đồng bộ dữ liệu hai chiều thời gian thực giữa ${sysA.abbr} (${sysA.nameVi}) và ${sysB.abbr} (${sysB.nameVi}) thông qua cổng API Gateway chuẩn mã hóa TLS 1.3.`,
  };
}

export const SystemsView: React.FC<SystemsViewProps> = ({ currentTheme }) => {
  const { showToast } = useToast();

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedSystem, setSelectedSystem] = useState<SystemData | null>(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState<boolean>(false);
  const [isAuthorModalOpen, setIsAuthorModalOpen] = useState<boolean>(false);
  const [isPinned, setIsPinned] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<Date>(() => new Date());
  const [isFloatingVideo2Open, setIsFloatingVideo2Open] = useState<boolean>(false);
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState<boolean>(false);
  const filterDropdownRef = useRef<HTMLDivElement>(null);
  const [flippedCardIds, setFlippedCardIds] = useState<Record<string, boolean>>({});
  const [benchmarkScale, setBenchmarkScale] = useState<Record<string, number>>({});
  const [isDataFlowModalOpen, setIsDataFlowModalOpen] = useState<boolean>(false);
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);
  const [hoveredImgId, setHoveredImgId] = useState<string | null>(null);

  // Bảng ánh xạ 12 thẻ hệ thống chuẩn hóa theo bảng màu Bento đa sắc trang Giới Thiệu (Bento Palette)
  const SYSTEM_DESIGN_MAP: Record<
    string,
    {
      displayTitle: string;
      subtitle: string;
      gradient: string;
      lightBg: string;
      lightBorder: string;
      lightAccent: string;
      darkAccent: string;
      iconName: string;
      illustrationSrc: string;
      cardTheme: string;
    }
  > = {
    sdp: {
      displayTitle: 'Cổng làm việc CSKH',
      subtitle: 'Trang làm việc chính của Phòng CSKH',
      gradient: 'linear-gradient(135deg, #7c3aed 0%, #6366f1 50%, #38bdf8 100%)',
      lightBg: 'linear-gradient(135deg, rgba(245, 243, 255, 0.95) 0%, rgba(238, 242, 255, 0.88) 50%, rgba(224, 242, 254, 0.82) 100%)',
      lightBorder: 'rgba(168, 85, 247, 0.55)',
      lightAccent: '#6d28d9',
      darkAccent: '#c084fc',
      iconName: 'globe',
      illustrationSrc: 'https://i.ibb.co/1fb35MSh/SDP-C-ng-l-m-vi-c-CSKH.png',
      cardTheme: '#7c3aed',
    },
    erp: {
      displayTitle: 'Tài chính kế toán',
      subtitle: 'Quản lý tài chính, kế toán và tài sản',
      gradient: 'linear-gradient(135deg, #059669 0%, #0d9488 50%, #10b981 100%)',
      lightBg: 'linear-gradient(135deg, rgba(240, 253, 250, 0.95) 0%, rgba(204, 251, 241, 0.88) 50%, rgba(167, 243, 208, 0.82) 100%)',
      lightBorder: 'rgba(45, 212, 191, 0.55)',
      lightAccent: '#0f766e',
      darkAccent: '#2dd4bf',
      iconName: 'chart',
      illustrationSrc: 'https://i.ibb.co/HTWGjNzS/ERP-T-i-ch-nh-k-to-n.png',
      cardTheme: '#0d9488',
    },
    crm: {
      displayTitle: 'Quản lý khách hàng',
      subtitle: 'Dữ liệu khách hàng 360 độ và bán hàng',
      gradient: 'linear-gradient(135deg, #f59e0b 0%, #f97316 45%, #ea580c 100%)',
      lightBg: 'linear-gradient(135deg, rgba(255, 251, 235, 0.95) 0%, rgba(254, 243, 199, 0.88) 50%, rgba(254, 215, 170, 0.82) 100%)',
      lightBorder: 'rgba(251, 146, 60, 0.55)',
      lightAccent: '#c2410c',
      darkAccent: '#fb923c',
      iconName: 'users',
      illustrationSrc: 'https://i.ibb.co/ZpzdS7g2/CRM-Qu-n-l-Quan-h-Kh-ch-h-ng.png',
      cardTheme: '#ea580c',
    },
    hrm: {
      displayTitle: 'Quản lý nhân lực',
      subtitle: 'Tuyển dụng, chấm công và tính lương',
      gradient: 'linear-gradient(135deg, #a21caf 0%, #c026d3 50%, #7c3aed 100%)',
      lightBg: 'linear-gradient(135deg, rgba(253, 244, 255, 0.95) 0%, rgba(250, 232, 255, 0.88) 50%, rgba(243, 232, 255, 0.82) 100%)',
      lightBorder: 'rgba(232, 121, 249, 0.55)',
      lightAccent: '#86198f',
      darkAccent: '#e879f9',
      iconName: 'bolt',
      illustrationSrc: 'https://i.ibb.co/TjXJQZk/HRM-Qu-n-l-Ngu-n-nh-n-l-c.png',
      cardTheme: '#c026d3',
    },
    bpm: {
      displayTitle: 'Quản lý quy trình',
      subtitle: 'Số hóa và tự động hóa quy trình nghiệp vụ',
      gradient: 'linear-gradient(135deg, #c2410c 0%, #ea580c 50%, #f97316 100%)',
      lightBg: 'linear-gradient(135deg, rgba(255, 247, 237, 0.95) 0%, rgba(255, 237, 213, 0.88) 50%, rgba(254, 215, 170, 0.82) 100%)',
      lightBorder: 'rgba(249, 115, 22, 0.55)',
      lightAccent: '#c2410c',
      darkAccent: '#fb923c',
      iconName: 'file-text',
      illustrationSrc: 'https://i.ibb.co/PsbZP2Rt/BPM-Qu-n-l-Quy-tr-nh-Nghi-p-v.png',
      cardTheme: '#ea580c',
    },
    okr: {
      displayTitle: 'Quản lý mục tiêu',
      subtitle: 'Mục tiêu chiến lược và kết quả then chốt',
      gradient: 'linear-gradient(135deg, #be123c 0%, #e11d48 50%, #f43f5e 100%)',
      lightBg: 'linear-gradient(135deg, rgba(255, 241, 242, 0.95) 0%, rgba(255, 228, 230, 0.88) 50%, rgba(254, 205, 211, 0.82) 100%)',
      lightBorder: 'rgba(251, 113, 133, 0.55)',
      lightAccent: '#be123c',
      darkAccent: '#fb7185',
      iconName: 'target',
      illustrationSrc: 'https://i.ibb.co/SwNpks2H/OKR-Qu-n-l-M-c-ti-u-K-t-qu.png',
      cardTheme: '#e11d48',
    },
    clp: {
      displayTitle: 'Khách hàng thân thiết',
      subtitle: 'Chương trình thành viên, điểm và ưu đãi',
      gradient: 'linear-gradient(135deg, #1e40af 0%, #2563eb 50%, #4f46e5 100%)',
      lightBg: 'linear-gradient(135deg, rgba(238, 242, 255, 0.95) 0%, rgba(224, 231, 255, 0.88) 50%, rgba(199, 210, 254, 0.82) 100%)',
      lightBorder: 'rgba(99, 102, 241, 0.55)',
      lightAccent: '#1e40af',
      darkAccent: '#818cf8',
      iconName: 'gift',
      illustrationSrc: 'https://i.ibb.co/0jLTkKZG/CLP-Kh-ch-h-ng-Th-n-thi-t.png',
      cardTheme: '#2563eb',
    },
    lms: {
      displayTitle: 'Quản lý đào tạo',
      subtitle: 'Khóa học trực tuyến và sát hạch tự động',
      gradient: 'linear-gradient(135deg, #15803d 0%, #16a34a 50%, #22c55e 100%)',
      lightBg: 'linear-gradient(135deg, rgba(240, 253, 244, 0.95) 0%, rgba(220, 252, 231, 0.88) 50%, rgba(187, 247, 208, 0.82) 100%)',
      lightBorder: 'rgba(74, 222, 128, 0.55)',
      lightAccent: '#15803d',
      darkAccent: '#4ade80',
      iconName: 'graduation',
      illustrationSrc: 'https://i.ibb.co/6JtKW8bR/LMS-Qu-n-l-o-t-o.png',
      cardTheme: '#16a34a',
    },
    csc: {
      displayTitle: 'Trung tâm chăm sóc',
      subtitle: 'Tương tác đa kênh, Ticket và giám sát SLA',
      gradient: 'linear-gradient(135deg, #0284c7 0%, #0ea5e9 50%, #06b6d4 100%)',
      lightBg: 'linear-gradient(135deg, rgba(240, 249, 255, 0.95) 0%, rgba(224, 242, 254, 0.88) 50%, rgba(207, 250, 254, 0.82) 100%)',
      lightBorder: 'rgba(56, 189, 248, 0.55)',
      lightAccent: '#0369a1',
      darkAccent: '#38bdf8',
      iconName: 'headphones',
      illustrationSrc: 'https://i.ibb.co/p6CQLKDg/CSC-Trung-t-m-Ch-m-s-c-Kh-ch-h-ng.png',
      cardTheme: '#0284c7',
    },
    bi: {
      displayTitle: 'Báo cáo phân tích',
      subtitle: 'Trực quan hóa dữ liệu real-time wallboard',
      gradient: 'linear-gradient(135deg, #4338ca 0%, #6366f1 50%, #8b5cf6 100%)',
      lightBg: 'linear-gradient(135deg, rgba(238, 242, 255, 0.95) 0%, rgba(224, 231, 255, 0.88) 50%, rgba(221, 214, 254, 0.82) 100%)',
      lightBorder: 'rgba(129, 140, 248, 0.55)',
      lightAccent: '#4338ca',
      darkAccent: '#818cf8',
      iconName: 'trending',
      illustrationSrc: 'https://i.ibb.co/YTbDCpBF/BI-Dashboard-B-o-c-o-Ph-n-t-ch.png',
      cardTheme: '#4f46e5',
    },
    ai: {
      displayTitle: 'Trợ lý trí tuệ',
      subtitle: 'Tìm kiếm tri thức và tác vụ tự động 24/7',
      gradient: 'linear-gradient(135deg, #0d9488 0%, #8b5cf6 50%, #06b6d4 100%)',
      lightBg: 'linear-gradient(135deg, rgba(240, 253, 250, 0.95) 0%, rgba(243, 232, 255, 0.88) 50%, rgba(207, 250, 254, 0.82) 100%)',
      lightBorder: 'rgba(139, 92, 246, 0.55)',
      lightAccent: '#0f766e',
      darkAccent: '#a78bfa',
      iconName: 'robot',
      illustrationSrc: 'https://i.ibb.co/pSBJ5s3/AI-Assistant-Tr-l-Tr-tu-Nh-n-t-o.png',
      cardTheme: '#8b5cf6',
    },
    pos: {
      displayTitle: 'Quản lý bán hàng',
      subtitle: 'Đơn hàng, hóa đơn tại quầy và đồng bộ',
      gradient: 'linear-gradient(135deg, #0369a1 0%, #0284c7 50%, #0ea5e9 100%)',
      lightBg: 'linear-gradient(135deg, rgba(240, 249, 255, 0.95) 0%, rgba(224, 242, 254, 0.88) 50%, rgba(186, 230, 253, 0.82) 100%)',
      lightBorder: 'rgba(56, 189, 248, 0.55)',
      lightAccent: '#0369a1',
      darkAccent: '#38bdf8',
      iconName: 'shopping-cart',
      illustrationSrc: 'https://i.ibb.co/1tqgwmgq/POS-Qu-n-l-B-n-h-ng-t-i-Qu-y.png',
      cardTheme: '#0284c7',
    },
    office: {
      displayTitle: 'Công cụ văn phòng',
      subtitle: 'Bộ ứng dụng văn phòng và cộng tác tài liệu',
      gradient: 'linear-gradient(135deg, #0ea5e9 0%, #2563eb 50%, #4f46e5 100%)',
      lightBg: 'linear-gradient(135deg, rgba(240, 249, 255, 0.95) 0%, rgba(224, 242, 254, 0.88) 50%, rgba(186, 230, 253, 0.82) 100%)',
      lightBorder: 'rgba(56, 189, 248, 0.55)',
      lightAccent: '#0369a1',
      darkAccent: '#38bdf8',
      iconName: 'briefcase',
      illustrationSrc: 'https://i.ibb.co/HcXVvHR/Office-C-ng-c-v-n-ph-ng.png',
      cardTheme: '#2563eb',
    },
  };

  const REFERENCE_GRID_ORDER = [
    'crm', 'csc', 'sdp',
    'okr', 'bpm', 'clp',
    'ai', 'hrm', 'pos',
    'erp', 'lms', 'bi',
  ];

  // Trạng thái mở rộng chi tiết thẻ hệ thống có kích thước bằng 12 thẻ cộng lại (Full Grid Expansion)
  const [expandedSystemId, setExpandedSystemId] = useState<string | null>(null);
  const [isExpandedVideoMuted, setIsExpandedVideoMuted] = useState<boolean>(true);
  const [isExpandedVideoPlaying, setIsExpandedVideoPlaying] = useState<boolean>(true);
  const expandedVideoRef = useRef<HTMLVideoElement | null>(null);

  const handleToggleExpandCard = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    SoundEngine.playTap();
    if (expandedSystemId === id) {
      setExpandedSystemId(null);
    } else {
      setExpandedSystemId(id);
      setIsExpandedVideoPlaying(true);
    }
  };

  const handleExpandSystem = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    SoundEngine.playTap();
    setExpandedSystemId(id);
    setIsExpandedVideoPlaying(true);
  };

  const handleCollapseSystem = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    SoundEngine.playTap();
    setExpandedSystemId(null);
  };

  const handleToggleExpandedVideoPlay = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    const video = expandedVideoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play().catch(() => {});
      setIsExpandedVideoPlaying(true);
    } else {
      video.pause();
      setIsExpandedVideoPlaying(false);
    }
  };

  const handleToggleExpandedVideoMute = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    const video = expandedVideoRef.current;
    if (!video) return;
    const nextMuted = !isExpandedVideoMuted;
    setIsExpandedVideoMuted(nextMuted);
    video.muted = nextMuted;
    showToast(nextMuted ? 'Đã tắt âm thanh video chi tiết' : 'Đã bật âm thanh video chi tiết 🔊');
  };

  // Đóng menu Drop Top khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        filterDropdownRef.current &&
        !filterDropdownRef.current.contains(event.target as Node)
      ) {
        setIsFilterDropdownOpen(false);
      }
    };
    if (isFilterDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isFilterDropdownOpen]);
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (currentTheme) {
      return currentTheme === 'dark-neon';
    }
    if (typeof document !== 'undefined') {
      const attrTheme = document.documentElement.getAttribute('data-theme');
      return (
        document.documentElement.classList.contains('dark') ||
        attrTheme === 'dark-neon' ||
        attrTheme === 'midnight-dark' ||
        attrTheme === 'vivid-glass'
      );
    }
    return false;
  });

  useEffect(() => {
    const updateTheme = () => {
      if (typeof document !== 'undefined') {
        const attrTheme = document.documentElement.getAttribute('data-theme');
        setIsDark(
          document.documentElement.classList.contains('dark') ||
            attrTheme === 'dark-neon' ||
            attrTheme === 'midnight-dark' ||
            attrTheme === 'vivid-glass'
        );
      }
    };
    updateTheme();
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class', 'data-theme'],
    });
    return () => observer.disconnect();
  }, [currentTheme]);

  const handleFlipToggle = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    try {
      SoundEngine.playCardFlip();
    } catch {
      SoundEngine.playTap();
    }
    setFlippedCardIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const VIDEO_1_URL =
    'https://cdn.scena.ai/project/8606/581097478f9de72616d982e302e1c8d0aab6d66cbee040430c610424c0c72a44.mp4';
  const VIDEO_2_URL =
    'https://cdn.scena.ai/project/8606/ac120a105730c378447fd67f5e8b6aeb9557b5e4e8854ac2e21148d5316f780b.mp4';

  const [activeBannerVideo, setActiveBannerVideo] = useState<string>(VIDEO_1_URL);

  // 2. Ghi nhớ trạng thái âm thanh người dùng (Audio Preference Storage)
  const [isBannerMuted, setIsBannerMuted] = useState<boolean>(() => getSavedMutedPref(true));

  // 1. Bộ đếm thời lượng nghe trực quan (Audio Duration Pill)
  const [videoElapsed, setVideoElapsed] = useState<number>(0);
  const VIDEO_2_TOTAL_SECONDS = 105; // 01:45
  const videoTimeLeft = Math.max(0, VIDEO_2_TOTAL_SECONDS - videoElapsed);

  // 3. Chế độ xem thu nhỏ góc màn hình (Picture-in-Picture Mini Player)
  const [isPipActive, setIsPipActive] = useState<boolean>(false);
  const [isPipDismissed, setIsPipDismissed] = useState<boolean>(false);
  const systemsGridRef = useRef<HTMLDivElement>(null);
  const pipVideoRef = useRef<HTMLVideoElement>(null);

  // Helper format mm:ss
  const formatCountdown = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `0${m}:${s < 10 ? '0' : ''}${s}`;
  };

  // Đồng bộ lưu & khôi phục trạng thái âm thanh qua CustomEvent và storage
  useEffect(() => {
    const handleAudioPref = (e: Event) => {
      const customEvent = e as CustomEvent<{ muted: boolean }>;
      if (customEvent.detail && typeof customEvent.detail.muted === 'boolean') {
        setIsBannerMuted(customEvent.detail.muted);
      }
    };
    window.addEventListener(AUDIO_PREF_EVENT, handleAudioPref);
    return () => window.removeEventListener(AUDIO_PREF_EVENT, handleAudioPref);
  }, []);

  // Timer đếm ngược khi đang phát Video 2 (Giới thiệu bản thân)
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (activeBannerVideo === VIDEO_2_URL) {
      interval = setInterval(() => {
        setVideoElapsed((prev) => {
          if (prev >= VIDEO_2_TOTAL_SECONDS) {
            // Khi video kết thúc, tự động quay về Video 1
            setActiveBannerVideo(VIDEO_1_URL);
            setIsPipActive(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      setVideoElapsed(0);
      setIsPipActive(false);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [activeBannerVideo]);

  // Xử lý bật / tắt âm thanh có lưu preference
  const toggleBannerMute = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    const nextMuted = !isBannerMuted;
    setIsBannerMuted(nextMuted);
    saveMutedPref(nextMuted);
    showToast(nextMuted ? 'Đã tắt âm thanh video' : 'Đã mở âm thanh video 🔊');
  };

  // Bắt sự kiện cuộn container hệ thống để tự động kích hoạt PiP Mini Player & cập nhật đường truyền luồng dữ liệu
  const handleGridScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    if (activeBannerVideo === VIDEO_2_URL && !isPipDismissed) {
      if (target.scrollTop > 130) {
        setIsPipActive(true);
      } else if (target.scrollTop < 40) {
        setIsPipActive(false);
      }
    }
    if (isFlowCanvasActive) {
      recalculateFlowCoords();
    }
  };

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // 4. Chế độ xem: 'grid' (Dạng thẻ 3D) | 'matrix' (Bảng Ma Trận Tính Năng 12 phần mềm)
  const [viewMode, setViewMode] = useState<'grid' | 'matrix'>('grid');

  // 5. Live Health Pulse Badge: Giả lập biến thiên nhẹ số lượng Agents Online quanh mốc 1,250 Agents Online
  const [liveAgentDelta, setLiveAgentDelta] = useState<number>(0);
  useEffect(() => {
    const pulseTimer = setInterval(() => {
      const randomShift = Math.floor(Math.random() * 15) - 7; // -7 đến +7
      setLiveAgentDelta(randomShift);
    }, 3200);
    return () => clearInterval(pulseTimer);
  }, []);
  const totalAgentsOnline = 1250 + liveAgentDelta;

  // 2. Bộ Lọc Phân Hệ Tác Nghiệp Bằng Icon (Ecosystem Filter Segment) với icon chủ đề phát sáng
  const ecosystemSegments = [
    {
      id: 'all',
      label: 'Tất cả hệ thống',
      codesLabel: '12 Phân hệ',
      count: 12,
      icon: 'layers',
      glowStyle: 'drop-shadow(0 0 8px rgba(56, 189, 248, 0.85))',
      activeGradient: 'linear-gradient(135deg, #0284c7 0%, #4f46e5 100%)',
      iconTextClass: 'text-sky-500 dark:text-cyan-400',
    },
    {
      id: 'cskh',
      label: 'Vận hành CSKH',
      codesLabel: 'SDP, CSC, CRM, CLP, POS',
      count: 5,
      icon: 'headphones',
      glowStyle: 'drop-shadow(0 0 8px rgba(139, 92, 246, 0.9))',
      activeGradient: 'linear-gradient(135deg, #7c3aed 0%, #2563eb 100%)',
      iconTextClass: 'text-violet-600 dark:text-violet-400',
    },
    {
      id: 'enterprise',
      label: 'Quản trị doanh nghiệp',
      codesLabel: 'ERP, HRM, BPM, OKR, LMS',
      count: 5,
      icon: 'briefcase',
      glowStyle: 'drop-shadow(0 0 8px rgba(16, 185, 129, 0.9))',
      activeGradient: 'linear-gradient(135deg, #059669 0%, #0d9488 100%)',
      iconTextClass: 'text-emerald-600 dark:text-emerald-400',
    },
    {
      id: 'ai_analytics',
      label: 'Phân tích & AI',
      codesLabel: 'BI, AI Assistant',
      count: 2,
      icon: 'robot',
      glowStyle: 'drop-shadow(0 0 8px rgba(217, 70, 239, 0.9))',
      activeGradient: 'linear-gradient(135deg, #9333ea 0%, #db2777 100%)',
      iconTextClass: 'text-fuchsia-600 dark:text-fuchsia-400',
    },
  ];

  // Helper mapping cho Ecosystem Filter Segment
  const getSystemCategory = (id: string): string => {
    if (['sdp', 'csc', 'crm', 'clp', 'pos'].includes(id)) return 'cskh';
    if (['erp', 'hrm', 'bpm', 'okr', 'lms'].includes(id)) return 'enterprise';
    if (['bi', 'ai'].includes(id)) return 'ai_analytics';
    return 'cskh';
  };

  // 3. Mô Phỏng Luồng Dữ Liệu Tương Tác Giữa Các Hệ Thống (Interactive Data Flow Canvas trên lưới thẻ)
  const [isFlowCanvasActive, setIsFlowCanvasActive] = useState<boolean>(false);
  const [flowPairIds, setFlowPairIds] = useState<string[]>(['crm', 'sdp']);
  const cardElementRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [flowSvgCoords, setFlowSvgCoords] = useState<{
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    cx1: number;
    cy1: number;
    cx2: number;
    cy2: number;
    midX: number;
    midY: number;
    width: number;
    height: number;
  } | null>(null);

  const handleSelectSystemForFlow = useCallback(
    (sysId: string, e?: React.MouseEvent) => {
      e?.stopPropagation();
      SoundEngine.playTap();
      if (!isFlowCanvasActive) {
        setIsFlowCanvasActive(true);
      }
      setFlowPairIds((prev) => {
        if (prev.includes(sysId)) {
          // Nếu đang chọn thì bỏ chọn (giữ lại thẻ còn lại)
          return prev.filter((id) => id !== sysId);
        }
        if (prev.length < 2) {
          const next = [...prev, sysId];
          if (next.length === 2) {
            const sA = SYSTEMS_DATA.find((s) => s.id === next[0]);
            const sB = SYSTEMS_DATA.find((s) => s.id === next[1]);
            if (sA && sB) {
              showToast(`⚡ Đã thiết lập đường truyền dữ liệu thời gian thực: ${sA.abbr} ⇄ ${sB.abbr}`);
            }
          }
          return next;
        }
        // Nếu đã có 2 hệ thống, lấy hệ thống thứ 2 ghép với hệ thống vừa click
        const next = [prev[1], sysId];
        const sA = SYSTEMS_DATA.find((s) => s.id === next[0]);
        const sB = SYSTEMS_DATA.find((s) => s.id === next[1]);
        if (sA && sB) {
          showToast(`⚡ Đã chuyển đường truyền đồng bộ sang: ${sA.abbr} ⇄ ${sB.abbr}`);
        }
        return next;
      });
    },
    [isFlowCanvasActive, showToast]
  );

  // Tính toán tọa độ đường truyền SVG nối giữa 2 thẻ hệ thống được chọn trên lưới
  const recalculateFlowCoords = useCallback(() => {
    if (!isFlowCanvasActive || viewMode !== 'grid' || flowPairIds.length !== 2) {
      setFlowSvgCoords(null);
      return;
    }
    const container = systemsGridRef.current;
    const elA = cardElementRefs.current[flowPairIds[0]];
    const elB = cardElementRefs.current[flowPairIds[1]];
    if (!container || !elA || !elB) {
      setFlowSvgCoords(null);
      return;
    }

    const containerRect = container.getBoundingClientRect();
    const rectA = elA.getBoundingClientRect();
    const rectB = elB.getBoundingClientRect();

    const scrollLeft = container.scrollLeft;
    const scrollTop = container.scrollTop;

    const x1 = rectA.left - containerRect.left + scrollLeft + rectA.width / 2;
    const y1 = rectA.top - containerRect.top + scrollTop + rectA.height / 2;
    const x2 = rectB.left - containerRect.left + scrollLeft + rectB.width / 2;
    const y2 = rectB.top - containerRect.top + scrollTop + rectB.height / 2;

    const dx = x2 - x1;
    const dy = y2 - y1;
    // Tạo độ cong Bézier mềm mại giữa 2 thẻ
    const curveOffset = Math.min(90, Math.max(36, Math.hypot(dx, dy) * 0.22));
    const cx1 = x1 + dx * 0.35;
    const cy1 = y1 - curveOffset;
    const cx2 = x1 + dx * 0.65;
    const cy2 = y2 - curveOffset;

    const midX = (x1 + x2) / 2;
    const midY = (y1 + y2) / 2 - curveOffset * 0.65;

    setFlowSvgCoords({
      x1,
      y1,
      x2,
      y2,
      cx1,
      cy1,
      cx2,
      cy2,
      midX,
      midY,
      width: Math.max(container.scrollWidth, container.clientWidth),
      height: Math.max(container.scrollHeight, container.clientHeight),
    });
  }, [isFlowCanvasActive, viewMode, flowPairIds]);

  const filteredSystems = useMemo(() => {
    let list = [...SYSTEMS_DATA];
    if (activeCategory === 'all' && !searchQuery.trim()) {
      list.sort((a, b) => {
        const idxA = REFERENCE_GRID_ORDER.indexOf(a.id);
        const idxB = REFERENCE_GRID_ORDER.indexOf(b.id);
        if (idxA !== -1 && idxB !== -1) return idxA - idxB;
        return 0;
      });
      return list;
    }
    if (activeCategory !== 'all') {
      list = list.filter((item) => getSystemCategory(item.id) === activeCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter((item) => {
        const matchVi = item.nameVi.toLowerCase().includes(q) || item.descVi.toLowerCase().includes(q);
        const matchEn = item.nameEn.toLowerCase().includes(q) || item.descEn.toLowerCase().includes(q);
        const matchCode = item.abbr.toLowerCase().includes(q) || item.fullName.toLowerCase().includes(q);
        return matchVi || matchEn || matchCode;
      });
    }
    return list;
  }, [activeCategory, searchQuery]);

  useEffect(() => {
    const timer = setTimeout(() => {
      recalculateFlowCoords();
    }, 60);
    window.addEventListener('resize', recalculateFlowCoords);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', recalculateFlowCoords);
    };
  }, [recalculateFlowCoords, filteredSystems, expandedSystemId]);

  const connectedFlowSystems = useMemo(() => {
    if (flowPairIds.length !== 2) return null;
    const sysA = SYSTEMS_DATA.find((s) => s.id === flowPairIds[0]);
    const sysB = SYSTEMS_DATA.find((s) => s.id === flowPairIds[1]);
    if (!sysA || !sysB) return null;
    return {
      sysA,
      sysB,
      flowMeta: getRealtimeFlowDescription(sysA, sysB),
    };
  }, [flowPairIds]);

  const expandedSystem = useMemo(
    () => filteredSystems.find((s) => s.id === expandedSystemId) || null,
    [filteredSystems, expandedSystemId]
  );

  const expandedConfig = useMemo(() => {
    if (!expandedSystem) return null;
    return (
      SYSTEM_DESIGN_MAP[expandedSystem.id] || {
        displayTitle: formatCardTitle(expandedSystem.nameVi),
        subtitle: expandedSystem.descVi,
        gradient: expandedSystem.gradient,
        lightBg: 'linear-gradient(135deg, rgba(239, 246, 255, 0.92) 0%, rgba(219, 234, 254, 0.82) 100%)',
        lightBorder: 'rgba(96, 165, 250, 0.55)',
        lightAccent: '#1d4ed8',
        darkAccent: '#60a5fa',
        iconName: systemIconMap[expandedSystem.id] || 'cog',
        illustrationSrc: expandedSystem.imageUrl || '',
        cardTheme: expandedSystem.themeColor || '#3B72E2',
      }
    );
  }, [expandedSystem]);

  const handleCardClick = (item: SystemData) => {
    if (item.id === 'bi' || !item.url) {
      showToast('Hệ thống BI Dashboard đang được hoàn thiện tích hợp kết nối API thời gian thực!');
      setSelectedSystem(item);
      return;
    }
    setSelectedSystem(item);
  };

  const handleOpenUrl = (e: React.MouseEvent, url: string) => {
    e.stopPropagation();
    if (url && url !== '#') {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  const handleShare = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Đã sao chép liên kết Cổng Hệ Thống vào clipboard!');
    } else {
      showToast('Chia sẻ liên kết thành công!');
    }
  };

  // Format date string for live clock
  const formattedTime = currentTime.toTimeString().split(' ')[0];
  const dayNames = ['CHỦ NHẬT', 'THỨ 2', 'THỨ 3', 'THỨ 4', 'THỨ 5', 'THỨ 6', 'THỨ 7'];
  const formattedDate = `${dayNames[currentTime.getDay()]}, ${currentTime.getDate()} THG ${
    currentTime.getMonth() + 1
  }`;

  // Icon mapping for each system
  const systemIconMap: Record<string, string> = {
    sdp: 'globe',
    erp: 'chart',
    crm: 'users',
    hrm: 'bolt',
    bpm: 'file-text',
    okr: 'target',
    clp: 'gift',
    lms: 'graduation',
    csc: 'headphones',
    bi: 'trending',
    ai: 'robot',
    pos: 'shopping-cart',
  };

  const systemStatusBadge: Record<string, { text: string; dotColor: string }> = {
    sdp: { text: 'Trực tuyến', dotColor: 'bg-emerald-400' },
    erp: { text: 'Hoạt động', dotColor: 'bg-emerald-400' },
    crm: { text: 'Hoạt động', dotColor: 'bg-emerald-400' },
    hrm: { text: 'Hoạt động', dotColor: 'bg-emerald-400' },
    bpm: { text: 'Hoạt động', dotColor: 'bg-emerald-400' },
    okr: { text: 'Hoạt động', dotColor: 'bg-emerald-400' },
    clp: { text: 'Hoạt động', dotColor: 'bg-emerald-400' },
    lms: { text: 'Hoạt động', dotColor: 'bg-emerald-400' },
    csc: { text: 'Hoạt động', dotColor: 'bg-emerald-400' },
    bi: { text: 'Đang tích hợp API', dotColor: 'bg-amber-400' },
    ai: { text: 'AI Trực Tuyến', dotColor: 'bg-fuchsia-400' },
    pos: { text: 'Hoạt động', dotColor: 'bg-emerald-400' },
  };

  return (
    <section
      id="systems"
      className="relative w-full h-full max-h-full flex flex-col justify-start items-stretch font-sans text-slate-800 dark:text-slate-100 transition-colors duration-500 select-none bg-transparent overflow-hidden text-left"
    >
      {/* 100% Matching Animation CSS Rules */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes icon-floating {
          0%, 100% {
            transform: translateY(0px) rotate(0deg) scale(1);
          }
          50% {
            transform: translateY(-5px) rotate(2deg) scale(1.07);
          }
        }

        .animated-service-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          animation: icon-floating 3.2s ease-in-out infinite;
          filter: drop-shadow(0 6px 12px rgba(0, 0, 0, 0.28));
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .system-item:hover .animated-service-icon {
          transform: scale(1.15) translateY(-3px);
          filter: drop-shadow(0 10px 18px rgba(0, 0, 0, 0.4));
        }

        .system-flip-wrap {
          perspective: 1000px;
          min-height: 138px;
          height: 100%;
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          will-change: transform;
        }

        .system-flip-wrap:hover {
          transform: translateY(-4px);
        }

        .system-flip-inner {
          position: relative;
          width: 100%;
          height: 100%;
          min-height: 138px;
          transition: transform 0.65s cubic-bezier(0.34, 1.35, 0.64, 1);
          transform-style: preserve-3d;
          border-radius: 14px;
        }

        .system-flip-inner.is-flipped {
          transform: rotateY(180deg);
        }

        .system-flip-front,
        .system-flip-back {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
          border-radius: 14px;
          overflow: hidden;
          transition: box-shadow 0.3s ease, border-color 0.3s ease, background 0.3s ease;
        }

        .system-flip-front {
          z-index: 2;
          transform: rotateY(0deg) !important;
        }

        .system-flip-back {
          transform: rotateY(180deg) !important;
          z-index: 1;
        }

        .system-item {
          border-radius: 14px;
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          transition: box-shadow 0.3s ease, border-color 0.3s ease, background 0.3s ease;
        }

        .system-item:hover {
          /* Không áp dụng transform translateY lên system-item vì nó là mặt thẻ lật 3D - Nâng thẻ đã được xử lý an toàn tại .system-flip-wrap:hover */
        }

        @keyframes ring-pulse {
          0% {
            box-shadow: 0 0 0 0 rgba(99, 102, 241, 0.5);
          }
          70% {
            box-shadow: 0 0 0 12px rgba(99, 102, 241, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(99, 102, 241, 0);
          }
        }

        .video-circle-halo {
          animation: ring-pulse 2.2s infinite;
        }

        @keyframes clp-ripple-wave {
          0% {
            transform: scale(0);
            opacity: 1;
          }
          30% {
            opacity: 0.9;
          }
          65% {
            opacity: 0.35;
          }
          100% {
            transform: scale(38);
            opacity: 0;
          }
        }

        @keyframes clp-ring-pulse {
          0% {
            transform: scale(0);
            opacity: 1;
          }
          45% {
            opacity: 0.8;
          }
          100% {
            transform: scale(32);
            opacity: 0;
          }
        }

        .clp-ripple-active .clp-wave-1 {
          animation: clp-ripple-wave 0.85s cubic-bezier(0.12, 0.8, 0.25, 1) forwards;
        }

        .clp-ripple-active .clp-wave-2 {
          animation: clp-ring-pulse 1.05s cubic-bezier(0.12, 0.8, 0.25, 1) 0.1s forwards;
        }

        .clp-ripple-active .clp-wave-3 {
          animation: clp-ring-pulse 1.25s cubic-bezier(0.12, 0.8, 0.25, 1) 0.2s forwards;
        }
      `,
        }}
      />

      <div className="w-full h-full flex-1 flex flex-col lg:flex-row gap-[15px] items-stretch justify-start relative z-10 overflow-hidden">
        {/* VÙNG CHÍNH: LƯỚI 12 HỆ THỐNG C-LEVEL HOẶC BẢNG MA TRẬN SO SÁNH 12 PHẦN MỀM */}
        <div className="flex-1 min-h-0 flex flex-col h-full overflow-hidden">
          {/* HÀNG 1: HEADER TIÊU ĐỀ THẺ HỆ THỐNG + CHUYỂN ĐỔI DẠNG THẺ + SƠ ĐỒ TỔNG */}
          <div className="flex flex-wrap items-center justify-between gap-2 pb-1.5 shrink-0 border-b border-slate-200/70 dark:border-white/10">
            <div className="flex items-center gap-2 min-w-0 flex-wrap">
              <WebIcon name="layers" className="w-5 h-5 text-sky-600 dark:text-cyan-400 stroke-[2.2] shrink-0" />
              <h2 className="text-sm sm:text-base font-black font-play text-sky-600 dark:text-cyan-400 tracking-tight leading-none">
                {formatCardTitle('Hệ Thống Vận Hành')}
              </h2>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-indigo-50 dark:bg-cyan-500/20 text-indigo-700 dark:text-cyan-300 border border-indigo-200 dark:border-cyan-400/30 shrink-0">
                {filteredSystems.length}/12
              </span>
            </div>

            {/* Cụm nút chức năng góc phải: Chuyển đổi Chế độ Thẻ + Sơ Đồ Tổng */}
            <div className="flex items-center gap-1.5 flex-wrap shrink-0">
              <div className="inline-flex items-center p-0.5 rounded-full bg-slate-200/75 dark:bg-slate-800/80 border border-slate-300/70 dark:border-white/15">
                <button
                  type="button"
                  onClick={() => {
                    SoundEngine.playTap();
                    setViewMode('grid');
                  }}
                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold font-play transition cursor-pointer ${
                    viewMode === 'grid'
                      ? 'bg-sky-600 text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                  }`}
                  title="Chế độ xem lưới 12 thẻ hệ thống 3D"
                >
                  <LayoutGrid className="w-3 h-3" />
                  <span>Dạng thẻ</span>
                </button>
              </div>

              {/* Nút mở Modal Sơ Đồ Ma Trận Dòng Chảy Toàn Cục */}
              <button
                type="button"
                onClick={() => setIsDataFlowModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold font-play transition-all duration-300 shadow-xs cursor-pointer border bg-gradient-to-r from-sky-500/15 via-indigo-500/15 to-purple-500/15 hover:from-sky-500/25 hover:via-indigo-500/25 hover:to-purple-500/25 text-sky-700 dark:text-cyan-300 border-sky-400/40 dark:border-cyan-400/50 hover:shadow-[0_0_15px_rgba(56,189,248,0.35)] active:scale-95"
                title="Mở sơ đồ ma trận dòng chảy dữ liệu tương tác giữa các hệ thống"
              >
                <Activity className="w-3.5 h-3.5 text-sky-500 dark:text-cyan-400 animate-pulse" />
                <span>Sơ đồ tổng</span>
              </button>
            </div>
          </div>

          {/* NỘI DUNG CHÍNH: CHẾ ĐỘ BẢNG MA TRẬN TÍNH NĂNG (MATRIX) HOẶC LƯỚI 12 THẺ HỆ THỐNG (GRID) */}
          {filteredSystems.length === 0 ? (
            <div className="text-center py-16 px-4 bg-white/75 dark:bg-slate-900/70 rounded-3xl border border-slate-200/90 dark:border-white/15 backdrop-blur-md flex flex-col items-center justify-center flex-1 shadow-xs">
              <div className="w-12 h-12 rounded-2xl bg-indigo-100 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-2">
                <WebIcon name="search" className="w-6 h-6" />
              </div>
              <p className="text-base font-bold text-slate-800 dark:text-white font-play">
                Không tìm thấy hệ thống phù hợp
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Hãy thử nhập từ khóa khác như &quot;CRM&quot;, &quot;ERP&quot;, &quot;LMS&quot; hoặc &quot;CSKH&quot;...
              </p>
              <button
                type="button"
                onClick={() => {
                  setActiveCategory('all');
                  setSearchQuery('');
                }}
                className="mt-4 px-5 py-2 rounded-full text-xs font-semibold bg-indigo-600 text-white hover:bg-indigo-700 transition cursor-pointer shadow-sm"
              >
                Xem lại tất cả 12 hệ thống
              </button>
            </div>
          ) : viewMode === 'matrix' ? (
            /* 4. CHẾ ĐỘ XEM THẺ DẠNG BẢNG MA TRẬN TÍNH NĂNG (COMPACT COMPARISON MATRIX VIEW) */
            <div className="flex-1 min-h-0 overflow-auto glass-scrollbar rounded-2xl border border-slate-200/85 dark:border-white/15 bg-white/80 dark:bg-slate-900/75 backdrop-blur-xl shadow-lg">
              <table className="w-full text-left border-collapse min-w-[780px]">
                <thead className="sticky top-0 z-20 bg-slate-100/95 dark:bg-slate-950/95 backdrop-blur-md border-b border-slate-200/90 dark:border-white/15 text-[10.5px] font-mono uppercase tracking-wider text-slate-600 dark:text-cyan-300">
                  <tr>
                    <th className="py-2.5 px-3 font-black">Phân hệ (12)</th>
                    <th className="py-2.5 px-2.5 font-black">Nhóm tác nghiệp</th>
                    <th className="py-2.5 px-2.5 font-black">
                      <span className="inline-flex items-center gap-1">
                        <Database className="w-3 h-3 text-sky-500" />
                        <span>Cơ sở dữ liệu (DB)</span>
                      </span>
                    </th>
                    <th className="py-2.5 px-2.5 font-black">
                      <span className="inline-flex items-center gap-1">
                        <Webhook className="w-3 h-3 text-indigo-500" />
                        <span>API kết nối</span>
                      </span>
                    </th>
                    <th className="py-2.5 px-2.5 font-black">Cam kết SLA</th>
                    <th className="py-2.5 px-2.5 font-black">
                      <span className="inline-flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                        <span>Chuẩn ISO 27001</span>
                      </span>
                    </th>
                    <th className="py-2.5 px-3 font-black text-right">Tác vụ</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200/60 dark:divide-white/10 text-xs">
                  {filteredSystems.map((item) => {
                    const config = SYSTEM_DESIGN_MAP[item.id] || {
                      displayTitle: formatCardTitle(item.nameVi),
                      iconName: systemIconMap[item.id] || 'cog',
                      cardTheme: item.themeColor || '#3B72E2',
                      lightAccent: '#1d4ed8',
                      gradient: item.gradient,
                    };
                    const tech = SYSTEM_TECH_SPECS_MAP[item.id] || SYSTEM_TECH_SPECS_MAP.sdp;

                    return (
                      <tr
                        key={item.id}
                        onClick={() => handleCardClick(item)}
                        className="hover:bg-sky-50/70 dark:hover:bg-white/5 transition-colors cursor-pointer"
                      >
                        {/* Cột 1: Mã & Tên 4 chữ */}
                        <td className="py-2 px-3">
                          <div className="flex items-center gap-2">
                            <span
                              className="w-7 h-7 rounded-lg flex items-center justify-center text-white shrink-0 shadow-xs"
                              style={{ background: config.gradient }}
                            >
                              <WebIcon name={config.iconName} className="w-3.5 h-3.5" />
                            </span>
                            <div className="min-w-0">
                              <div className="flex items-center gap-1.5">
                                <span className="px-1.5 py-0.2 rounded text-[9.5px] font-mono font-black bg-slate-200/80 dark:bg-slate-800 text-slate-800 dark:text-cyan-300">
                                  {item.abbr}
                                </span>
                                <span className="font-bold font-play text-slate-800 dark:text-white truncate">
                                  {config.displayTitle}
                                </span>
                              </div>
                              <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate max-w-[190px]">
                                {item.fullName}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Cột 2: Nhóm phân hệ */}
                        <td className="py-2 px-2.5">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-50 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300 border border-indigo-200/70 dark:border-indigo-500/30">
                            {tech.ecosystemLabel}
                          </span>
                        </td>

                        {/* Cột 3: Cơ sở dữ liệu */}
                        <td className="py-2 px-2.5 font-mono text-[11px] font-semibold text-slate-700 dark:text-slate-200">
                          {tech.database}
                        </td>

                        {/* Cột 4: API kết nối */}
                        <td className="py-2 px-2.5 font-mono text-[11px] text-sky-700 dark:text-cyan-300 font-semibold">
                          {tech.apiProtocol}
                        </td>

                        {/* Cột 5: Cam kết SLA */}
                        <td className="py-2 px-2.5">
                          <span className="px-2 py-0.5 rounded-md text-[10.5px] font-mono font-bold bg-emerald-500/12 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30">
                            {tech.slaCommitment}
                          </span>
                        </td>

                        {/* Cột 6: Tiêu chuẩn an toàn thông tin ISO 27001 */}
                        <td className="py-2 px-2.5">
                          <span className="inline-flex items-center gap-1 text-[10.5px] font-semibold text-slate-700 dark:text-slate-200">
                            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                            <span>{tech.isoSecurity}</span>
                          </span>
                        </td>

                        {/* Cột 7: Nút mở cổng */}
                        <td className="py-2 px-3 text-right">
                          <div className="inline-flex items-center gap-1 justify-end">
                            {item.url && (
                              <button
                                type="button"
                                onClick={(e) => handleOpenUrl(e, item.url)}
                                className="px-2.5 py-1 rounded-lg text-[10px] font-bold text-white shadow-2xs inline-flex items-center gap-1 cursor-pointer hover:brightness-110"
                                style={{ background: config.gradient }}
                              >
                                <span>Mở</span>
                                <ExternalLink className="w-2.5 h-2.5" />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div
              ref={systemsGridRef}
              onScroll={handleGridScroll}
              className="flex-1 min-h-0 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-3 items-stretch overflow-y-auto no-scrollbar py-0.5 relative grid-flow-row-dense"
            >
              {filteredSystems.map((item) => {
                const isFlipped = !!flippedCardIds[item.id];
                const isExpanded = expandedSystemId === item.id;
                const config = SYSTEM_DESIGN_MAP[item.id] || {
                  displayTitle: formatCardTitle(item.nameVi),
                  subtitle: item.descVi,
                  gradient: item.gradient,
                  lightBg: 'linear-gradient(135deg, rgba(239, 246, 255, 0.92) 0%, rgba(219, 234, 254, 0.82) 100%)',
                  lightBorder: 'rgba(96, 165, 250, 0.55)',
                  lightAccent: '#1d4ed8',
                  darkAccent: '#60a5fa',
                  iconName: systemIconMap[item.id] || 'cog',
                  illustrationSrc: '',
                  cardTheme: item.themeColor || '#3B72E2',
                };

                const isVividDarkFace = true;
                const isImgHovered = hoveredImgId === item.id;

                return (
                  <div
                    key={item.id}
                    ref={(el) => {
                      cardElementRefs.current[item.id] = el;
                    }}
                    className={`system-flip-wrap ${
                      isExpanded
                        ? 'col-span-1 row-span-4 min-h-[600px] sm:min-h-[640px] z-20'
                        : 'col-span-1 row-span-1 min-h-[138px] sm:min-h-[148px] z-1'
                    } transition-all duration-500 ease-out`}
                  >
                    {isExpanded ? (
                      /* THẺ MỞ RỘNG THEO CHIỀU DỌC: Kích thước bằng 4 thẻ theo chiều dọc (row-span-4) */
                      <article
                        onClick={(e) => e.stopPropagation()}
                        className="relative w-full h-full rounded-[14px] overflow-hidden p-3 sm:p-4 flex flex-col justify-between select-none border transition-all duration-500 shadow-2xl backdrop-blur-xl"
                        style={{
                          background: isDark
                            ? `radial-gradient(circle at top right, ${config.cardTheme}40, transparent 70%), linear-gradient(155deg, #090e17 0%, #0f172a 100%)`
                            : `linear-gradient(145deg, #ffffff 0%, ${config.cardTheme}18 60%, #f8fafc 100%)`,
                          borderColor: isDark ? `${config.cardTheme}70` : config.lightBorder,
                          boxShadow: isDark
                            ? `0 16px 36px -6px rgba(0, 0, 0, 0.75), 0 0 25px ${config.cardTheme}45, inset 0 1px 2px rgba(255, 255, 255, 0.2)`
                            : `0 16px 32px -6px ${config.cardTheme}25, 0 6px 14px -3px rgba(15, 23, 42, 0.08), inset 0 1.5px 2px rgba(255, 255, 255, 0.96)`,
                        }}
                      >
                        {/* Header Thẻ Mở Rộng: Mã hệ thống, Tiêu đề 4 từ, Nút thu nhỏ */}
                        <div className="flex items-center justify-between gap-2 pb-2 border-b border-black/10 dark:border-white/15 shrink-0">
                          <div className="flex items-center gap-2 min-w-0">
                            <span
                              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-black tracking-wider uppercase border shadow-2xs"
                              style={{
                                backgroundColor: isDark ? 'rgba(0, 0, 0, 0.45)' : 'rgba(255, 255, 255, 0.95)',
                                borderColor: isDark ? 'rgba(255, 255, 255, 0.3)' : `${config.cardTheme}40`,
                                color: isDark ? '#ffffff' : config.lightAccent,
                              }}
                            >
                              <span>{item.abbr}</span>
                            </span>
                            <h3
                              className="font-black font-play text-sm sm:text-base leading-tight tracking-wide truncate flex items-center gap-1.5"
                              style={{ color: isDark ? '#ffffff' : config.lightAccent }}
                            >
                              <WebIcon name={config.iconName} className="w-4 h-4 shrink-0 opacity-95" />
                              <span className="truncate">{config.displayTitle}</span>
                            </h3>
                          </div>

                          <button
                            type="button"
                            onClick={(e) => handleToggleExpandCard(item.id, e)}
                            title="Thu nhỏ thẻ"
                            className="px-2 py-1 rounded-lg text-[10px] font-bold font-play flex items-center gap-1 border border-slate-300 dark:border-white/20 bg-white/70 dark:bg-slate-800/80 hover:bg-rose-50 dark:hover:bg-rose-950/60 text-slate-700 hover:text-rose-600 dark:text-slate-200 dark:hover:text-rose-300 transition cursor-pointer shadow-2xs active:scale-95 shrink-0"
                          >
                            <Minimize2 className="w-3 h-3" />
                            <span>Thu nhỏ</span>
                          </button>
                        </div>

                        {/* Video Player lớn tự động chạy rõ ràng + Quick Sound Toggle góc dưới phải */}
                        <div className="my-2 relative aspect-video w-full rounded-xl overflow-hidden bg-black shadow-md border border-black/10 dark:border-white/10 shrink-0">
                          {item.videoUrl ? (
                            <>
                              <video
                                ref={expandedVideoRef}
                                src={item.videoUrl}
                                autoPlay
                                loop
                                muted={isExpandedVideoMuted}
                                playsInline
                                className="w-full h-full object-cover"
                              />
                              <button
                                type="button"
                                onClick={(e) => handleToggleExpandedVideoMute(e)}
                                title={
                                  isExpandedVideoMuted
                                    ? 'Nhấp bật âm thanh thuyết minh giới thiệu hệ thống'
                                    : 'Tắt âm thanh thuyết minh'
                                }
                                className={`absolute bottom-2 right-2 z-20 w-7 h-7 rounded-full flex items-center justify-center backdrop-blur-md border transition cursor-pointer ${
                                  isExpandedVideoMuted
                                    ? 'bg-black/50 hover:bg-black/80 text-white/80 border-white/25 opacity-70 hover:opacity-100'
                                    : 'bg-emerald-500/90 text-white border-emerald-300 shadow-[0_0_12px_rgba(16,185,129,0.85)]'
                                }`}
                              >
                                {isExpandedVideoMuted ? (
                                  <VolumeX className="w-3.5 h-3.5" />
                                ) : (
                                  <Volume2 className="w-3.5 h-3.5 animate-pulse" />
                                )}
                              </button>
                            </>
                          ) : (
                            <div className="w-full h-full flex items-center justify-center p-3 bg-transparent">
                              <img
                                src={config.illustrationSrc || item.imageUrl}
                                alt={config.displayTitle}
                                className="w-24 h-24 object-contain bg-transparent select-none pointer-events-none"
                              />
                            </div>
                          )}
                        </div>

                        {/* Nội dung chi tiết: Mô tả hệ thống đầy đủ & Tính năng trọng tâm */}
                        <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar space-y-2 text-left pr-0.5">
                          <div className="p-2 sm:p-2.5 rounded-xl border border-black/5 dark:border-white/10 bg-white/50 dark:bg-black/30">
                            <span
                              className="text-[10px] font-black uppercase tracking-wider block mb-1 opacity-80"
                              style={{ color: isDark ? config.darkAccent : config.lightAccent }}
                            >
                              Mô tả hệ thống
                            </span>
                            <p className={`text-[11.5px] sm:text-xs leading-relaxed font-medium ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
                              {item.descVi}
                            </p>
                          </div>

                          {item.featuresVi && item.featuresVi.length > 0 && (
                            <div className="p-2 sm:p-2.5 rounded-xl border border-black/5 dark:border-white/10 bg-white/40 dark:bg-black/20">
                              <span
                                className="text-[10px] font-black uppercase tracking-wider block mb-1.5 opacity-80"
                                style={{ color: isDark ? config.darkAccent : config.lightAccent }}
                              >
                                Tính năng trọng tâm
                              </span>
                              <ul className="space-y-1">
                                {item.featuresVi.slice(0, 3).map((feat, fIdx) => (
                                  <li
                                    key={fIdx}
                                    className={`text-[11px] leading-snug flex items-start gap-1.5 font-medium ${
                                      isDark ? 'text-slate-300' : 'text-slate-600'
                                    }`}
                                  >
                                    <span className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: config.cardTheme }} />
                                    <span>{feat}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>

                        {/* Footer Thao Tác: Mở cổng & Thu nhỏ */}
                        <div className="flex items-center justify-end gap-2 pt-2 border-t border-black/10 dark:border-white/15 shrink-0 mt-2">
                          <div className="flex items-center gap-1.5">
                            {item.url && (
                              <button
                                type="button"
                                onClick={(e) => handleOpenUrl(e, item.url)}
                                className="px-3 py-1.5 rounded-lg text-[11px] font-bold text-white shadow-sm transition flex items-center gap-1 cursor-pointer hover:brightness-110 active:scale-95"
                                style={{ background: config.gradient }}
                              >
                                <span>Mở cổng</span>
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M7 7H7M17 7V17" />
                                </svg>
                              </button>
                            )}
                            <button
                              type="button"
                              onClick={(e) => handleToggleExpandCard(item.id, e)}
                              className="px-2.5 py-1.5 rounded-lg text-[11px] font-bold border border-slate-300 dark:border-white/20 bg-white/70 dark:bg-slate-800 text-slate-700 dark:text-slate-200 transition cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700"
                            >
                              Đóng
                            </button>
                          </div>
                        </div>
                      </article>
                    ) : (
                      /* THẺ BÌNH THƯỜNG: HÌNH GẤP ĐÔI, MÔ TẢ ĐẦY ĐỦ, HOVER VÀO HÌNH PHÁT VIDEO RÕ RÀNG KÈM NÚT LOA NHỎ MỜ */
                      <div className={`system-flip-inner ${isFlipped ? 'is-flipped' : ''}`}>
                        {/* MẶT TRƯỚC (FRONT): Click vào thẻ để mở rộng */}
                        <article
                          onClick={(e) => {
                            handleToggleExpandCard(item.id, e);
                          }}
                          onMouseEnter={() => setHoveredCardId(item.id)}
                          onMouseLeave={() => setHoveredCardId(null)}
                          title={`Nhấp để mở rộng chi tiết thẻ: ${config.displayTitle} (${item.abbr})`}
                          className="system-flip-front system-item cursor-pointer relative overflow-hidden p-2.5 sm:p-3 flex flex-col justify-between select-none transition-all duration-300 border rounded-[14px] hover:border-sky-400/60 dark:hover:border-cyan-400/60 hover:shadow-xl group"
                          style={{
                            background: config.gradient,
                            borderColor: 'rgba(255, 255, 255, 0.28)',
                            boxShadow: `0 10px 26px -4px rgba(0, 0, 0, 0.55), 0 0 18px ${config.cardTheme}35, inset 0 1px 1.5px rgba(255, 255, 255, 0.4)`,
                            color: '#ffffff',
                          }}
                        >
                          {/* KHI RÊ CHUỘT VÀO THẺ HỆ THỐNG: HIỂN THỊ VIDEO TOÀN THẺ HỆ THỐNG, VIDEO HIỂN THỊ RÕ RÀNG KHÔNG HIỂN THỊ GÌ KHÁC NGOÀI VIDEO */}
                          {item.videoUrl && (
                            <FullCardVideoPlayer
                              videoUrl={item.videoUrl}
                              isHovered={hoveredCardId === item.id}
                            />
                          )}

                          {/* Ambient Glow Orb */}
                          <div
                            className="absolute -right-8 -bottom-8 w-32 h-32 rounded-full pointer-events-none blur-2xl"
                            style={{
                              background: isDark
                                ? 'radial-gradient(circle, rgba(255,255,255,0.22) 0%, transparent 70%)'
                                : `radial-gradient(circle, ${config.cardTheme}28 0%, transparent 70%)`,
                            }}
                          />

                          {/* Nội dung Mặt Trước: Tên viết tắt, Tiêu đề 4 từ, Mô tả & Khung hình gấp đôi */}
                          <div className="relative z-10 flex flex-col justify-between h-full text-left">
                            {/* Hàng Đỉnh: Tên viết tắt (Trái) & Tên đầy đủ + Nút Lật (Phải) */}
                            <div className="flex items-center justify-between gap-1.5 pb-1.5 border-b border-black/10 dark:border-white/15">
                              {/* Phía trên bên trái: Tên viết tắt */}
                              <div className="flex items-center gap-1 shrink-0">
                                <span
                                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9.5px] sm:text-[10px] font-mono font-black tracking-wider uppercase border shadow-2xs"
                                  style={
                                    isVividDarkFace
                                      ? {
                                          backgroundColor: 'rgba(0, 0, 0, 0.35)',
                                          borderColor: 'rgba(255, 255, 255, 0.28)',
                                          color: '#ffffff',
                                        }
                                      : {
                                          backgroundColor: 'rgba(255, 255, 255, 0.95)',
                                          borderColor: `${config.cardTheme}40`,
                                          color: config.lightAccent,
                                        }
                                  }
                                >
                                  <span>{item.abbr}</span>
                                </span>
                              </div>

                              {/* Phía trên bên phải: Tên đầy đủ */}
                              <div className="flex items-center gap-1.5 max-w-[75%] justify-end shrink-0">
                                <span
                                  className="text-[9px] sm:text-[9.5px] font-bold font-mono tracking-tight truncate text-right text-white/85"
                                  title={item.fullName}
                                >
                                  {item.fullName}
                                </span>
                              </div>
                            </div>

                            {/* Thân Thẻ: Tiêu đề 4 từ, Mô tả hiển thị rõ ràng & Khung hình ảnh GẤP ĐÔI KÍCH THƯỚC */}
                            <div className="flex items-center justify-between gap-2.5 pt-1.5 flex-1 min-h-0">
                              {/* Cột thông tin: Tiêu đề & Mô tả hệ thống hiển thị rõ ràng */}
                              <div
                                className="flex flex-col min-w-0 flex-1 pr-1"
                                style={{ color: isVividDarkFace ? '#ffffff' : config.lightAccent }}
                              >
                                <h3
                                  className={`font-black font-play text-[13.5px] sm:text-[14.5px] leading-tight tracking-wide flex items-center gap-1.5 ${
                                    isVividDarkFace
                                      ? 'text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.4)]'
                                      : ''
                                  }`}
                                  style={{ color: isVividDarkFace ? '#ffffff' : config.lightAccent }}
                                >
                                  <WebIcon name={config.iconName} className="w-4 h-4 shrink-0 opacity-95" />
                                  <span className="truncate">{config.displayTitle}</span>
                                </h3>

                                {/* Thẻ hệ thống hiển thị mô tả rõ ràng */}
                                <p
                                  className={`text-[10.5px] sm:text-[11px] font-medium leading-snug line-clamp-3 mt-1 ${
                                    isVividDarkFace
                                      ? 'text-white/95 drop-shadow-[0_1px_2px_rgba(0,0,0,0.35)]'
                                      : 'text-slate-700 dark:text-slate-200'
                                  }`}
                                  title={item.descVi}
                                >
                                  {item.descVi}
                                </p>
                              </div>

                              {/* KHUNG HÌNH THẺ HỆ THỐNG: FORMAT TRONG SUỐT VÀ KHÔNG CÓ HIỆU ỨNG CỦA HÌNH
                                  KHI RÊ CHUỘT VÀO HÌNH: PLAY VIDEO RÕ RÀNG KÈM BIỂU TƯỢNG LOA NHỎ MỜ Ở GÓC (QUICK SOUND TOGGLE) */}
                              <div
                                onMouseEnter={(e) => {
                                  e.stopPropagation();
                                  setHoveredImgId(item.id);
                                }}
                                onMouseLeave={(e) => {
                                  e.stopPropagation();
                                  setHoveredImgId(null);
                                }}
                                title="Rê chuột xem video mô phỏng hệ thống (Nhấp biểu tượng loa góc dưới phải để bật thuyết minh)"
                                className="relative w-20 h-20 sm:w-24 sm:h-24 shrink-0 rounded-xl overflow-hidden flex items-center justify-center bg-transparent group/img cursor-pointer"
                                style={{ color: isVividDarkFace ? '#ffffff' : config.lightAccent }}
                              >
                                {/* Ảnh 3D thẻ hệ thống format trong suốt và không có hiệu ứng của hình */}
                                {(config.illustrationSrc || item.imageUrl) ? (
                                  <img
                                    src={config.illustrationSrc || item.imageUrl}
                                    alt={config.displayTitle}
                                    className={`w-full h-full object-contain bg-transparent select-none pointer-events-none transition-opacity duration-200 ${
                                      isImgHovered && item.videoUrl ? 'opacity-0' : 'opacity-100'
                                    }`}
                                    loading="lazy"
                                    onError={(e) => {
                                      (e.currentTarget as HTMLElement).style.display = 'none';
                                    }}
                                  />
                                ) : (
                                  <WebIcon
                                    name={config.iconName}
                                    className={`w-12 h-12 stroke-[1.8] ${
                                      isVividDarkFace
                                        ? 'text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.45)]'
                                        : 'drop-shadow-[0_2px_6px_rgba(15,23,42,0.08)]'
                                    }`}
                                  />
                                )}

                                {/* 1. Khi rê chuột vào hình: Hiển thị video rõ ràng kèm Quick Sound Toggle ở góc */}
                                {item.videoUrl && (
                                  <SystemCardVideoPlayer
                                    videoUrl={item.videoUrl}
                                    isHovered={isImgHovered}
                                    systemAbbr={item.abbr}
                                    onSoundToggleToast={(muted, abbr) =>
                                      showToast(
                                        muted
                                          ? `Đã tắt âm thanh thuyết minh ${abbr || ''}`
                                          : `🔊 Đang phát âm thanh thuyết minh hệ thống ${abbr || ''}`
                                      )
                                    }
                                  />
                                )}
                              </div>
                            </div>
                          </div>
                        </article>

                        {/* MẶT SAU (BACK) - Mô phỏng ROI & Hiệu suất */}
                        <article
                          onClick={(e) => handleFlipToggle(item.id, e)}
                          className="system-flip-back cursor-pointer relative overflow-hidden p-2 sm:p-2.5 flex flex-col justify-between select-none shadow-xl border"
                          style={{
                            background: isDark
                              ? `radial-gradient(circle at top right, ${config.cardTheme}38, transparent 68%), linear-gradient(145deg, #090e17 0%, #0f172a 100%)`
                              : `linear-gradient(135deg, #ffffff 0%, ${config.cardTheme}14 60%, #f8fafc 100%)`,
                            borderColor: isDark ? `${config.cardTheme}65` : config.lightBorder,
                            boxShadow: isDark
                              ? `0 10px 26px -4px rgba(0, 0, 0, 0.55), 0 0 18px ${config.cardTheme}35, inset 0 1px 1.5px rgba(255, 255, 255, 0.4)`
                              : `0 10px 24px -4px ${config.cardTheme}1f, 0 4px 10px -2px rgba(15, 23, 42, 0.05), inset 0 1.5px 2px rgba(255, 255, 255, 0.96)`,
                          }}
                        >
                          <div className="flex items-center justify-between gap-1 pb-1 border-b border-black/10 dark:border-white/15">
                            <span
                              className="text-[9.5px] font-bold font-mono tracking-tight"
                              style={{ color: isDark ? '#ffffff' : config.lightAccent }}
                            >
                              Hiệu Quả ROI & SLA
                            </span>
                            <button
                              type="button"
                              onClick={(e) => handleFlipToggle(item.id, e)}
                              className={`flex items-center gap-1 text-[9px] font-semibold px-2 py-0.5 rounded-full shrink-0 transition border cursor-pointer ${
                                isDark
                                  ? 'bg-white/10 hover:bg-white/25 text-cyan-300 border-cyan-400/35'
                                  : 'bg-white/90 hover:bg-slate-100 text-slate-700 border-slate-200/90 shadow-2xs'
                              }`}
                            >
                              <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                              </svg>
                              <span>Quay lại</span>
                            </button>
                          </div>

                          <p
                            className={`text-[10px] leading-snug line-clamp-1 font-medium font-sans ${
                              isDark ? 'text-slate-200' : 'text-slate-700'
                            }`}
                          >
                            {item.descVi}
                          </p>

                          {/* Mini Benchmark Simulator */}
                          <div
                            className="p-1.5 rounded-lg border text-left space-y-1 my-0.5 shadow-2xs"
                            style={{
                              backgroundColor: isDark ? 'rgba(0, 0, 0, 0.45)' : 'rgba(255, 255, 255, 0.9)',
                              borderColor: isDark ? 'rgba(255, 255, 255, 0.15)' : `${config.cardTheme}35`,
                            }}
                            onClick={(e) => e.stopPropagation()}
                          >
                            <div className="flex items-center justify-between text-[8.5px] font-bold">
                              <span className={isDark ? 'text-slate-300' : 'text-slate-600'}>Mô phỏng quy mô:</span>
                              <span className="font-mono text-blue-600 dark:text-cyan-300 font-extrabold">
                                {benchmarkScale[item.id] || 40} Nhân sự
                              </span>
                            </div>
                            <input
                              type="range"
                              min="10"
                              max="100"
                              step="5"
                              value={benchmarkScale[item.id] || 40}
                              onChange={(e) => {
                                const val = parseInt(e.target.value);
                                setBenchmarkScale((prev) => ({ ...prev, [item.id]: val }));
                              }}
                              className="w-full h-1 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600 dark:accent-cyan-400"
                            />
                            <div className="flex items-center justify-between text-[8px] font-bold text-emerald-600 dark:text-emerald-400">
                              <span>Tiết kiệm: ~{30 + Math.round((benchmarkScale[item.id] || 40) * 0.35)}%</span>
                              <span>SLA: -{40 + Math.round((benchmarkScale[item.id] || 40) * 0.38)}%</span>
                            </div>
                          </div>

                          {/* Back Action Buttons */}
                          <div className="flex items-center justify-end gap-1.5 pt-1">
                            <div className="flex items-center gap-1.5 shrink-0">
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleToggleExpandCard(item.id, e);
                                }}
                                className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition flex items-center gap-1 cursor-pointer border ${
                                  isDark
                                    ? 'bg-white/15 hover:bg-white/25 text-white border-white/20'
                                    : 'bg-white hover:bg-slate-100 text-slate-800 border-slate-200/90 shadow-2xs'
                                }`}
                              >
                                <span>Chi tiết</span>
                                <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                              </button>
                              {item.url && (
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleOpenUrl(e, item.url);
                                  }}
                                  className="px-2.5 py-1 rounded-lg text-[10px] font-bold text-white shadow-sm transition flex items-center gap-1 cursor-pointer hover:brightness-110"
                                  style={{
                                    background: config.gradient,
                                    boxShadow: isDark ? `0 0 12px ${config.cardTheme}80` : `0 2px 8px ${config.cardTheme}40`,
                                  }}
                                >
                                  <span>Mở cổng</span>
                                  <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M7 7H7M17 7V17" />
                                  </svg>
                                </button>
                              )}
                            </div>
                          </div>
                        </article>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* VIDEO PLAYER LIGHTBOX MODAL (PHÁT LINK MP4 - ĐỒNG BỘ SÁNG & TỐI) */}
      {isVideoModalOpen && (
        <div
          onClick={() => setIsVideoModalOpen(false)}
          className="fixed inset-0 bg-slate-950/75 dark:bg-slate-950/85 backdrop-blur-md z-50 flex items-center justify-center p-3 sm:p-5"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white/95 dark:bg-slate-900/95 border border-slate-200/90 dark:border-white/15 rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl flex flex-col text-left backdrop-blur-xl"
          >
            {/* Video Header */}
            <div className="p-3.5 sm:p-4 bg-slate-50/90 dark:bg-slate-800/80 border-b border-slate-200/80 dark:border-slate-700 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-600/30 border border-indigo-200 dark:border-indigo-400/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400 text-xs">
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><polygon points="6 3 20 12 6 21 6 3" /></svg>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-800 dark:text-white tracking-wide font-play">
                    Video Giới Thiệu Hệ Thống Vận Hành
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">PowerService Enterprise Digital Architecture</p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsVideoModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-200/80 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-300 dark:hover:bg-slate-600 flex items-center justify-center text-sm transition cursor-pointer"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M18 6 6 18M6 6l12 12" /></svg>
              </button>
            </div>

            {/* HTML5 MP4 Video Player Frame */}
            <div className="relative w-full aspect-video bg-black flex items-center justify-center">
              <video
                key={activeBannerVideo}
                controls
                autoPlay
                playsInline
                className="w-full h-full object-contain"
                poster="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80"
              >
                <source src={activeBannerVideo} type="video/mp4" />
                Trình duyệt của bạn không hỗ trợ thẻ phát video HTML5.
              </video>
            </div>

            {/* Video Footer */}
            <div className="p-3 bg-slate-50/90 dark:bg-slate-900/90 border-t border-slate-200/80 dark:border-slate-800 flex items-center justify-between text-xs text-slate-600 dark:text-slate-400">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setActiveBannerVideo(VIDEO_1_URL)}
                  className={`px-3 py-1 rounded-full text-xs font-bold transition cursor-pointer ${
                    activeBannerVideo === VIDEO_1_URL
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'bg-slate-200/80 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700'
                  }`}
                >
                  Video 1 (Hệ thống)
                </button>
                <button
                  type="button"
                  onClick={() => setActiveBannerVideo(VIDEO_2_URL)}
                  className={`px-3 py-1 rounded-full text-xs font-bold transition cursor-pointer ${
                    activeBannerVideo === VIDEO_2_URL
                      ? 'bg-rose-600 text-white shadow-xs'
                      : 'bg-slate-200/80 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700'
                  }`}
                >
                  Video 2 (Giới thiệu bản thân)
                </button>
              </div>
              <button
                type="button"
                onClick={() => setIsVideoModalOpen(false)}
                className="px-4 py-1.5 rounded-full bg-slate-200/80 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-white text-xs font-semibold transition cursor-pointer"
              >
                Đóng Video
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SYSTEM DETAIL MODAL (ĐỒNG BỘ SÁNG & TỐI) */}
      {selectedSystem && (
        <div
          onClick={() => setSelectedSystem(null)}
          className="fixed inset-0 bg-slate-950/70 dark:bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-3 sm:p-5"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white/95 dark:bg-slate-900/95 border border-slate-200/90 dark:border-white/15 rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl flex flex-col relative z-50 text-left backdrop-blur-xl"
          >
            {/* Modal Header Banner */}
            <div
              className="p-5 text-white flex items-center justify-between relative overflow-hidden"
              style={{
                background:
                  SYSTEM_DESIGN_MAP[selectedSystem.id]?.gradient || selectedSystem.gradient,
              }}
            >
              <div className="relative z-10 flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white text-2xl shadow-inner p-1">
                  <WebIcon
                    name={
                      SYSTEM_DESIGN_MAP[selectedSystem.id]?.iconName ||
                      systemIconMap[selectedSystem.id] ||
                      'cog'
                    }
                    className="w-6 h-6 text-white"
                  />
                </div>
                <div>
                  <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-md bg-black/25 text-white uppercase tracking-wider font-mono">
                    {selectedSystem.abbr}
                  </span>
                  <h3
                    className="text-lg font-bold font-play leading-tight mt-0.5 text-white"
                    style={{ color: '#ffffff' }}
                  >
                    {SYSTEM_DESIGN_MAP[selectedSystem.id]?.displayTitle ||
                      formatCardTitle(selectedSystem.nameVi)}
                  </h3>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedSystem(null)}
                className="relative z-10 w-8 h-8 rounded-full bg-black/20 hover:bg-black/40 text-white flex items-center justify-center transition cursor-pointer"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M18 6 6 18M6 6l12 12" /></svg>
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 space-y-4 max-h-[70vh] overflow-y-auto glass-scrollbar font-play">
              {/* VIDEO MÔ TẢ HỆ THỐNG CLOUDINARY CHẤT LƯỢNG CAO */}
              {selectedSystem.videoUrl && (
                <div className="rounded-2xl overflow-hidden border border-slate-200/90 dark:border-white/15 bg-black/95 shadow-lg">
                  <div className="px-3.5 py-2 bg-slate-900/90 border-b border-white/10 flex items-center justify-between text-white text-[11px] font-bold">
                    <span className="flex items-center gap-2 text-cyan-300">
                      <WebIcon name="play" className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Video Mô Tả Hệ Thống: {selectedSystem.abbr}</span>
                    </span>
                    <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-500/15 px-2 py-0.5 rounded-full border border-emerald-500/30">
                      Full HD 1080p
                    </span>
                  </div>
                  <div className="relative w-full aspect-video bg-black flex items-center justify-center">
                    <video
                      key={selectedSystem.videoUrl}
                      controls
                      playsInline
                      className="w-full h-full object-contain"
                    >
                      <source src={selectedSystem.videoUrl} type="video/mp4" />
                      Trình duyệt của bạn không hỗ trợ thẻ phát video HTML5.
                    </video>
                  </div>
                </div>
              )}

              <div className="p-3 rounded-2xl bg-slate-50/90 dark:bg-slate-800/60 border border-slate-200/80 dark:border-white/10">
                <h4 className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-0.5 font-mono">
                  Tên đầy đủ quốc tế
                </h4>
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-100 italic">
                  {selectedSystem.fullName}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1 font-mono">
                  Mô tả tổng quan
                </h4>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
                  {selectedSystem.descVi}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2 font-mono">
                  Các tính năng & Ưu điểm cốt lõi
                </h4>
                <ul className="space-y-2">
                  {selectedSystem.featuresVi.map((feat, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-200 p-2.5 rounded-xl bg-slate-50/80 dark:bg-slate-800/50 border border-slate-200/70 dark:border-white/10"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-50/90 dark:bg-slate-950/80 border-t border-slate-200/80 dark:border-white/10 flex items-center justify-between gap-3">
              <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                <span
                  className={`w-2 h-2 rounded-full ${
                    selectedSystem.id === 'bi' ? 'bg-amber-400' : 'bg-emerald-400'
                  }`}
                />
                <span>
                  {selectedSystem.id === 'bi'
                    ? 'Đang hoàn thiện kết nối API'
                    : 'Cổng hoạt động chính thức'}
                </span>
              </span>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedSystem(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-200/70 dark:bg-slate-800 hover:bg-slate-300/80 dark:hover:bg-slate-700 transition cursor-pointer"
                >
                  Đóng
                </button>

                {selectedSystem.url && selectedSystem.url !== '#' && (
                  <button
                    type="button"
                    onClick={(e) => handleOpenUrl(e, selectedSystem.url)}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-white flex items-center gap-1.5 shadow-md transition cursor-pointer hover:brightness-110"
                    style={{
                      background:
                        SYSTEM_DESIGN_MAP[selectedSystem.id]?.gradient || selectedSystem.gradient,
                    }}
                  >
                    <span>Mở Cổng Vận Hành</span>
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M7 17 17 7M7 7h10v10" /></svg>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* AUTHOR ARCHITECT INFO MODAL */}
      {isAuthorModalOpen && (
        <div
          onClick={() => setIsAuthorModalOpen(false)}
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-3xl max-w-md w-full p-6 text-center shadow-2xl relative"
          >
            <div className="w-20 h-20 mx-auto rounded-full overflow-hidden ring-4 ring-indigo-500/30 mb-3 shadow-md">
              <img
                src="https://i.ibb.co/RT3jX4Mv/H-ng-Th-i-Avata-Gif.gif"
                alt="Kiến Trúc Sư"
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-lg font-bold text-slate-800 dark:text-white font-play">
              Kiến Trúc Sư Hệ Thống CX/CSKH
            </h3>
            <p className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold mb-3">
              PowerService Enterprise Suite
            </p>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
              Hệ sinh thái gồm 12 phân hệ tích hợp toàn diện, chuẩn hóa dữ liệu tập trung theo mô hình Omnichannel, tự động hóa quy trình nghiệp vụ và tích hợp Trợ lý Trí tuệ Nhân tạo 24/7.
            </p>
            <button
              type="button"
              onClick={() => setIsAuthorModalOpen(false)}
              className="px-5 py-2 rounded-full text-xs font-semibold text-white bg-slate-900 dark:bg-indigo-600 hover:bg-slate-800 dark:hover:bg-indigo-700 transition cursor-pointer"
            >
              Đóng
            </button>
          </div>
        </div>
      )}

      {/* 3. Chế độ xem thu nhỏ góc màn hình (Picture-in-Picture Mini Player) */}
      {isPipActive && !isPipDismissed && activeBannerVideo === VIDEO_2_URL && (
        <aside
          role="complementary"
          aria-label="Cửa sổ thu nhỏ thuyết minh video"
          className="fixed bottom-5 right-5 z-50 w-72 sm:w-80 rounded-2xl overflow-hidden shadow-2xl border border-indigo-400/40 bg-slate-900/95 backdrop-blur-xl text-white transition-all duration-300 transform animate-in fade-in slide-in-from-bottom-5"
        >
          {/* Header thanh PiP */}
          <div className="flex items-center justify-between px-3.5 py-2 bg-gradient-to-r from-indigo-950/90 via-purple-950/90 to-slate-950/90 border-b border-white/10">
            <div className="flex items-center gap-2 min-w-0">
              <span className="flex items-center gap-0.5 h-3">
                <span className="w-0.5 h-2 bg-emerald-400 rounded-full animate-[pulse_0.5s_infinite]" />
                <span className="w-0.5 h-3 bg-emerald-300 rounded-full animate-[pulse_0.35s_infinite]" />
                <span className="w-0.5 h-2 bg-emerald-400 rounded-full animate-[pulse_0.6s_infinite]" />
              </span>
              <span className="text-[11.5px] font-bold font-play text-indigo-200 truncate">
                Đang phát thuyết minh
              </span>
            </div>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => {
                  if (systemsGridRef.current) {
                    systemsGridRef.current.scrollTo({ top: 0, behavior: 'smooth' });
                  }
                  setIsPipActive(false);
                }}
                className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-white/10 transition cursor-pointer"
                title="Cuộn về video chính"
              >
                <Maximize2 className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setIsPipDismissed(true)}
                className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-white/10 transition cursor-pointer"
                title="Tạm ẩn cửa sổ mini"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Video preview nhỏ */}
          <div className="relative aspect-video bg-black overflow-hidden group">
            <video
              ref={pipVideoRef}
              src={VIDEO_2_URL}
              autoPlay
              playsInline
              loop
              muted={isBannerMuted}
              className="w-full h-full object-cover pointer-events-none"
            />
            {/* Overlay badge thời gian */}
            <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded-full bg-black/70 backdrop-blur-xs text-[10px] font-mono font-bold text-rose-300 border border-white/20 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping" />
              <span>{formatCountdown(videoTimeLeft)}</span>
            </div>
          </div>

          {/* Footer nút điều khiển PiP */}
          <div className="p-2.5 flex items-center justify-between gap-2 bg-slate-900/90 border-t border-white/10">
            {/* Nút Loa */}
            <button
              type="button"
              onClick={(e) => toggleBannerMute(e)}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition active:scale-95 flex items-center justify-center shrink-0 cursor-pointer"
              title={isBannerMuted ? 'Mở âm thanh' : 'Tắt âm thanh'}
            >
              {isBannerMuted ? (
                <VolumeX className="w-4 h-4 text-slate-300" />
              ) : (
                <Volume2 className="w-4 h-4 text-emerald-400 animate-pulse" />
              )}
            </button>

            {/* Nút Dừng nghe */}
            <button
              type="button"
              onClick={() => {
                setActiveBannerVideo(VIDEO_1_URL);
                setIsBannerMuted(true);
                saveMutedPref(true);
                setIsPipActive(false);
                showToast('Đã dừng nghe — Quay về Video Hệ thống');
              }}
              className="flex-1 px-3 py-1.5 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white text-xs font-bold font-play flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition cursor-pointer"
            >
              <Square className="w-3.5 h-3.5 fill-current" />
              <span>Dừng nghe</span>
            </button>
          </div>
        </aside>
      )}

      {/* Modal Ma Trận Dòng Chảy Dữ Liệu Tương Tác Hệ Thống */}
      <DataFlowMatrixModal
        isOpen={isDataFlowModalOpen}
        onClose={() => setIsDataFlowModalOpen(false)}
        currentTheme={currentTheme}
      />

    </section>
  );
};
