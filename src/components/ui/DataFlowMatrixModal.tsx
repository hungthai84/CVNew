'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Play, Pause, Sparkles, Activity, Layers, ArrowRightLeft, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';
import { WebIcon } from '@/components/ui/WebIcon';
import { SoundEngine } from '@/components/ui/SoundEngine';
import { SiteTheme } from '@/types';

export interface DataFlowMatrixModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentTheme?: SiteTheme;
}

interface FlowConnection {
  id: string;
  fromId: string;
  toId: string;
  label: string;
  path: string;
  reversePath?: string;
  color: string;
  protocol: string;
  payload: string;
  frequency: string;
  dur: string;
}

interface FlowNode {
  id: string;
  abbr: string;
  title: string;
  role: string;
  iconName: string;
  color: string;
  x: number;
  y: number;
  badge: string;
}

export const DataFlowMatrixModal: React.FC<DataFlowMatrixModalProps> = ({
  isOpen,
  onClose,
  currentTheme = 'light-glass',
}) => {
  const isDark = currentTheme === 'dark-neon';

  const [selectedNodeId, setSelectedNodeId] = useState<string>('sdp');
  const [selectedConnectionId, setSelectedConnectionId] = useState<string | null>(null);
  const [isFlowPlaying, setIsFlowPlaying] = useState<boolean>(true);

  // Danh sách đầy đủ 12 Node Hệ Thống trong kiến trúc dòng chảy dữ liệu
  const NODES: FlowNode[] = useMemo(
    () => [
      {
        id: 'sdp',
        abbr: 'SDP',
        title: 'Cổng làm việc CSKH',
        role: 'Hub điều phối trung tâm & Bàn làm việc hợp nhất (Single Agent Workspace)',
        iconName: 'globe',
        color: '#0284C7',
        x: 500,
        y: 280,
        badge: 'Trục Trung Tâm',
      },
      {
        id: 'csc',
        abbr: 'CSC',
        title: 'Trung tâm chăm sóc',
        role: 'Tiếp nhận tương tác đa kênh (Voice, Chat, Ticket) và giám sát SLA trực tiếp',
        iconName: 'headphones',
        color: '#2563EB',
        x: 500,
        y: 90,
        badge: 'Đa Kênh Omni',
      },
      {
        id: 'crm',
        abbr: 'CRM',
        title: 'Quản lý khách hàng',
        role: 'Dữ liệu thông tin 360 độ, quản lý phễu bán hàng & lịch sử tương tác đa kênh',
        iconName: 'users',
        color: '#EA580C',
        x: 170,
        y: 200,
        badge: 'Khách Hàng 360°',
      },
      {
        id: 'clp',
        abbr: 'CLP',
        title: 'Khách hàng thân thiết',
        role: 'Chương trình hội viên, tích điểm, đổi voucher và ưu đãi khách hàng VIP',
        iconName: 'gift',
        color: '#3B82F6',
        x: 140,
        y: 280,
        badge: 'Loyalty & Points',
      },
      {
        id: 'bpm',
        abbr: 'BPM',
        title: 'Quản lý quy trình',
        role: 'Số hóa và tự động hóa quy trình nghiệp vụ, ủy quyền phê duyệt điện tử',
        iconName: 'file-text',
        color: '#F97316',
        x: 200,
        y: 390,
        badge: 'Quy Trình Số',
      },
      {
        id: 'okr',
        abbr: 'OKR',
        title: 'Quản lý mục tiêu',
        role: 'Theo dõi mục tiêu chiến lược và kết quả then chốt quý cho toàn bộ phòng ban',
        iconName: 'target',
        color: '#E11D48',
        x: 310,
        y: 120,
        badge: 'Mục Tiêu KPI',
      },
      {
        id: 'lms',
        abbr: 'LMS',
        title: 'Quản lý đào tạo',
        role: 'Khóa học trực tuyến, sát hạch tự động và quản lý năng lực chuyên viên CSKH',
        iconName: 'graduation-cap',
        color: '#16A34A',
        x: 690,
        y: 120,
        badge: 'Đào Tạo Số',
      },
      {
        id: 'pos',
        abbr: 'POS',
        title: 'Quản lý bán hàng',
        role: 'Xử lý đơn hàng, hóa đơn tại quầy, quản lý giao dịch offline và liên thông kho',
        iconName: 'shopping-cart',
        color: '#0284C7',
        x: 830,
        y: 200,
        badge: 'Điểm Bán Quầy',
      },
      {
        id: 'erp',
        abbr: 'ERP',
        title: 'Tài chính kế toán',
        role: 'Hoạch định nguồn lực, tài chính, hóa đơn điện tử, công nợ và quản lý kho vận',
        iconName: 'chart',
        color: '#0D9488',
        x: 860,
        y: 280,
        badge: 'Tài Chính & Kho',
      },
      {
        id: 'hrm',
        abbr: 'HRM',
        title: 'Quản lý nhân lực',
        role: 'Quản trị hồ sơ nhân sự, phân ca trực 24/7/365, chấm công và tính lương tự động',
        iconName: 'bolt',
        color: '#7C3AED',
        x: 800,
        y: 390,
        badge: 'Nhân Sự & Ca',
      },
      {
        id: 'bi',
        abbr: 'BI',
        title: 'Báo cáo phân tích',
        role: 'Trực quan hóa chỉ số CSAT, SLA, FCR, Wallboard vận hành thời gian thực C-Level',
        iconName: 'trending',
        color: '#4F46E5',
        x: 620,
        y: 460,
        badge: 'Wallboard C-Level',
      },
      {
        id: 'ai',
        abbr: 'AI',
        title: 'Trợ lý trí tuệ',
        role: 'Phân tích cảm xúc, tự động phân luồng, Copilot gợi ý câu trả lời & Chatbot 24/7',
        iconName: 'cpu',
        color: '#8B5CF6',
        x: 380,
        y: 460,
        badge: 'AI Copilot',
      },
    ],
    []
  );

  // Mạng lưới các luồng dữ liệu kết nối giữa toàn bộ 12 hệ thống
  const CONNECTIONS: FlowConnection[] = useMemo(
    () => [
      {
        id: 'sdp-csc',
        fromId: 'sdp',
        toId: 'csc',
        label: 'Định tuyến cuộc gọi, Chat realtime & Giám sát SLA cuộc gọi',
        path: 'M 500 280 L 500 90',
        reversePath: 'M 500 90 L 500 280',
        color: '#2563EB',
        protocol: 'WebRTC / SIP Trunking / WebSocket',
        payload: 'Call Session ID, Agent Status, Omni Queue, Recording URL',
        frequency: 'Thời gian thực (< 5ms)',
        dur: '1.8s',
      },
      {
        id: 'sdp-crm',
        fromId: 'sdp',
        toId: 'crm',
        label: 'Đồng bộ hồ sơ khách hàng & Tra cứu lịch sử Ticket 360 độ',
        path: 'M 500 280 L 170 200',
        reversePath: 'M 170 200 L 500 280',
        color: '#EA580C',
        protocol: 'gRPC / WebSocket Bidirectional',
        payload: 'Customer UUID, Omni Ticket ID, Chat Transcript, Profile 360',
        frequency: 'Thời gian thực (< 12ms)',
        dur: '2.0s',
      },
      {
        id: 'sdp-erp',
        fromId: 'sdp',
        toId: 'erp',
        label: 'Tra cứu trạng thái đơn hàng, công nợ & xuất hóa đơn điện tử',
        path: 'M 500 280 L 860 280',
        reversePath: 'M 860 280 L 500 280',
        color: '#0D9488',
        protocol: 'RESTful API / OAuth2 Mutual TLS',
        payload: 'Invoice Number, Order Status, Inventory SKU, Payment Token',
        frequency: 'Event-Driven (< 50ms)',
        dur: '2.3s',
      },
      {
        id: 'sdp-pos',
        fromId: 'sdp',
        toId: 'pos',
        label: 'Đồng bộ giao dịch bán hàng tại quầy & tra cứu đơn hàng offline',
        path: 'M 500 280 L 830 200',
        reversePath: 'M 830 200 L 500 280',
        color: '#0284C7',
        protocol: 'WebSocket / Local Sync Broker',
        payload: 'POS Terminal ID, Cashier Transaction, Shift Balance, Receipt QR',
        frequency: 'Thời gian thực (< 15ms)',
        dur: '2.2s',
      },
      {
        id: 'sdp-ai',
        fromId: 'sdp',
        toId: 'ai',
        label: 'Truyền luồng thoại/chat trực tiếp để AI phân tích cảm xúc & gợi ý câu trả lời',
        path: 'M 500 280 L 380 460',
        reversePath: 'M 380 460 L 500 280',
        color: '#8B5CF6',
        protocol: 'Streaming WebSocket / GenAI Pipeline',
        payload: 'Voice Stream PCM, Sentiment Score, Intent Classification, Prompt Context',
        frequency: 'Thời gian thực liên tục (< 5ms)',
        dur: '1.9s',
      },
      {
        id: 'sdp-bi',
        fromId: 'sdp',
        toId: 'bi',
        label: 'Bơm luồng dữ liệu sự kiện vận hành vào Data Warehouse & Wallboard',
        path: 'M 500 280 L 620 460',
        reversePath: 'M 620 460 L 500 280',
        color: '#4F46E5',
        protocol: 'Apache Kafka / PubSub Batch Stream',
        payload: 'Agent Handling Time (AHT), First Call Resolution (FCR), SLA Metric, Queue Log',
        frequency: 'Độ trễ cận thời gian thực (< 1s)',
        dur: '2.4s',
      },
      {
        id: 'sdp-bpm',
        fromId: 'sdp',
        toId: 'bpm',
        label: 'Kích hoạt quy trình xử lý khiếu nại phức tạp & ủy quyền duyệt cấp tốc',
        path: 'M 500 280 L 200 390',
        reversePath: 'M 200 390 L 500 280',
        color: '#F97316',
        protocol: 'BPMN 2.0 Engine / REST Webhook',
        payload: 'Process Instance ID, Approval Step, Escalation Matrix, SLA Deadline',
        frequency: 'Event Trigger (< 30ms)',
        dur: '2.6s',
      },
      {
        id: 'sdp-clp',
        fromId: 'sdp',
        toId: 'clp',
        label: 'Tra cứu hạng hội viên, số dư điểm thưởng và kích hoạt voucher đặc quyền',
        path: 'M 500 280 L 140 280',
        reversePath: 'M 140 280 L 500 280',
        color: '#3B82F6',
        protocol: 'GraphQL Subscriptions / Redis Cache',
        payload: 'Member Tier, Loyalty Points, Available Vouchers, Privilege Code',
        frequency: 'Cực nhanh (< 8ms)',
        dur: '2.1s',
      },
      {
        id: 'sdp-hrm',
        fromId: 'sdp',
        toId: 'hrm',
        label: 'Đồng bộ ca trực CSKH 24/7/365, điểm danh ca làm và năng suất nhân viên',
        path: 'M 500 280 L 800 390',
        reversePath: 'M 800 390 L 500 280',
        color: '#7C3AED',
        protocol: 'Enterprise API / Workforce Management',
        payload: 'Staff ID, Shift Schedule, Login/Logout Timestamp, Occupancy Rate',
        frequency: 'Theo ca & Sự kiện đăng nhập',
        dur: '2.8s',
      },
      {
        id: 'sdp-okr',
        fromId: 'sdp',
        toId: 'okr',
        label: 'Đẩy kết quả chỉ số vận hành vào hệ thống mục tiêu chiến lược phòng CSKH',
        path: 'M 500 280 L 310 120',
        reversePath: 'M 310 120 L 500 280',
        color: '#E11D48',
        protocol: 'RESTful API / Async Microservice',
        payload: 'Objective Key, Metric Target, Actual Value, Progress Percentage',
        frequency: 'Định kỳ hàng ngày / Batch',
        dur: '3.0s',
      },
      {
        id: 'sdp-lms',
        fromId: 'sdp',
        toId: 'lms',
        label: 'Chuyển ca xử lý xuất sắc/khiếu nại khó vào ngân hàng bài giảng đào tạo',
        path: 'M 500 280 L 690 120',
        reversePath: 'M 690 120 L 500 280',
        color: '#16A34A',
        protocol: 'SCORM / xAPI Integration API',
        payload: 'Case Study ID, Call Recording Best Practice, Quiz Template',
        frequency: 'Định kỳ hàng tuần',
        dur: '2.9s',
      },
      {
        id: 'crm-pos',
        fromId: 'crm',
        toId: 'pos',
        label: 'Đồng bộ thông tin khách hàng mua sắm tại điểm bán quầy',
        path: 'M 170 200 Q 500 150 830 200',
        color: '#F59E0B',
        protocol: 'Message Broker (RabbitMQ)',
        payload: 'Customer Phone, Purchase History, Reward Tier, Promotion List',
        frequency: 'Near Real-time (< 20ms)',
        dur: '3.2s',
      },
      {
        id: 'pos-erp',
        fromId: 'pos',
        toId: 'erp',
        label: 'Đẩy doanh thu bán lẻ tại quầy và trừ tồn kho tự động sang ERP',
        path: 'M 830 200 L 860 280',
        color: '#10B981',
        protocol: 'Batch Sync & Real-time Ledger API',
        payload: 'Daily Close POS, Stock Decrement, General Ledger Entry, Tax Invoice',
        frequency: 'Ngay khi chốt hóa đơn (< 40ms)',
        dur: '2.0s',
      },
      {
        id: 'crm-clp',
        fromId: 'crm',
        toId: 'clp',
        label: 'Cập nhật tích lũy chi tiêu và thăng hạng thành viên thân thiết',
        path: 'M 170 200 L 140 280',
        color: '#3B82F6',
        protocol: 'Internal Event Bus',
        payload: 'Total Spend Amount, Tier Upgrade Event, Birthday Gift Trigger',
        frequency: 'Event-driven',
        dur: '2.1s',
      },
      {
        id: 'hrm-lms',
        fromId: 'hrm',
        toId: 'lms',
        label: 'Liên thông kết quả sát hạch định kỳ vào hồ sơ bổ nhiệm nhân sự',
        path: 'M 800 390 Q 750 260 690 120',
        color: '#10B981',
        protocol: 'HRIS Connect / Secure REST',
        payload: 'Employee Skill Matrix, Course Completion Rate, Exam Score',
        frequency: 'Định kỳ tháng',
        dur: '3.4s',
      },
      {
        id: 'ai-bi',
        fromId: 'ai',
        toId: 'bi',
        label: 'Mô hình hóa dự báo CSAT & cảnh báo sớm rủi ro vận hành bằng Machine Learning',
        path: 'M 380 460 L 620 460',
        color: '#A855F7',
        protocol: 'BigQuery ML Pipeline',
        payload: 'Churn Prediction Model, Sentiment Aggregation, Anomaly Alert Cluster',
        frequency: 'Mỗi 5 phút / Micro-batch',
        dur: '2.7s',
      },
    ],
    []
  );

  const selectedNode = useMemo(
    () => NODES.find((n) => n.id === selectedNodeId) || NODES[0],
    [NODES, selectedNodeId]
  );

  const activeConnection = useMemo(() => {
    if (selectedConnectionId) {
      return CONNECTIONS.find((c) => c.id === selectedConnectionId) || null;
    }
    return CONNECTIONS.find((c) => c.fromId === selectedNodeId || c.toId === selectedNodeId) || CONNECTIONS[0];
  }, [CONNECTIONS, selectedConnectionId, selectedNodeId]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div
        className="absolute inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md select-none font-play rounded-[14px]"
        onClick={() => {
          SoundEngine.playTap();
          onClose();
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
          className={`relative w-full h-full overflow-hidden rounded-[14px] border shadow-2xl flex flex-col backdrop-blur-2xl transition-all duration-300 ${
            isDark
              ? 'bg-slate-950/95 border-cyan-500/40 shadow-[0_0_50px_rgba(34,211,238,0.25)] text-white'
              : 'bg-white/95 border-blue-200/90 shadow-[0_20px_60px_rgba(15,23,42,0.25)] text-slate-900'
          }`}
        >
        {/* Header Modal */}
        <div className="flex items-center justify-between p-3 sm:p-4 border-b border-slate-200/80 dark:border-white/10 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md">
              <Activity className="w-5 h-5 text-cyan-200 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs sm:text-sm font-black font-play tracking-wide uppercase text-blue-600 dark:text-cyan-400">
                  Ma trận luồng dữ liệu
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full font-bold bg-cyan-100 dark:bg-cyan-950/80 text-cyan-700 dark:text-cyan-300 border border-cyan-300 dark:border-cyan-700">
                  Real-time Mesh 12 Nodes
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                Sơ đồ mạng lưới dòng chảy dữ liệu liên thông giữa tất cả 12 hệ thống vận hành
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Nút Play/Pause chuyển động hạt phát sáng */}
            <button
              type="button"
              onClick={() => {
                SoundEngine.playTap();
                setIsFlowPlaying(!isFlowPlaying);
              }}
              className="px-2.5 py-1.5 rounded-xl text-xs font-bold font-play flex items-center gap-1.5 border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition cursor-pointer active:scale-95 text-slate-700 dark:text-slate-200"
              title={isFlowPlaying ? 'Tạm dừng chuyển động luồng hạt' : 'Tiếp tục phát dòng chảy hạt'}
            >
              {isFlowPlaying ? <Pause className="w-3.5 h-3.5 text-amber-500" /> : <Play className="w-3.5 h-3.5 text-emerald-500" />}
              <span className="hidden sm:inline">{isFlowPlaying ? 'Tạm dừng' : 'Phát luồng'}</span>
            </button>

            {/* Nút Đóng Modal */}
            <button
              type="button"
              onClick={() => {
                SoundEngine.playTap();
                onClose();
              }}
              className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-rose-100 dark:hover:bg-rose-900/60 text-slate-500 hover:text-rose-600 dark:text-slate-300 flex items-center justify-center transition cursor-pointer text-sm font-bold shadow-xs"
              title="Đóng sơ đồ dòng chảy"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Khu Vực Chính: Sơ Đồ Vector SVG Tương Tác Kèm Hạt Phát Sáng */}
        <div className="relative flex-1 min-h-0 p-2 sm:p-3 overflow-hidden flex items-center justify-center bg-radial from-slate-900/10 via-transparent to-transparent">
          <svg
            viewBox="0 0 1000 520"
            className="w-full h-full object-contain drop-shadow-md select-none"
          >
            <defs>
              {/* Filter phát sáng hào quang cho các hạt photon (Glow Filter) */}
              <filter id="dataFlowGlow" x="-60%" y="-60%" width="220%" height="220%">
                <feGaussianBlur stdDeviation="4.5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              {/* Gradient cho các đường dây dẫn */}
              <linearGradient id="grad-sdp-crm" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#EA580C" />
                <stop offset="100%" stopColor="#0284C7" />
              </linearGradient>
              <linearGradient id="grad-sdp-erp" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#0284C7" />
                <stop offset="100%" stopColor="#0D9488" />
              </linearGradient>
              <linearGradient id="grad-sdp-ai" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#0284C7" />
                <stop offset="100%" stopColor="#8B5CF6" />
              </linearGradient>
              <linearGradient id="grad-sdp-bi" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#0284C7" />
                <stop offset="100%" stopColor="#2563EB" />
              </linearGradient>
              <linearGradient id="grad-crm-erp" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#EA580C" />
                <stop offset="100%" stopColor="#0D9488" />
              </linearGradient>
              <linearGradient id="grad-ai-bi" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#8B5CF6" />
                <stop offset="100%" stopColor="#2563EB" />
              </linearGradient>
            </defs>

            {/* 1. Lưới Đường Dẫn Luồng Dữ Liệu (Flow Paths & Pulse Dash) */}
            {CONNECTIONS.map((conn) => {
              const isConnActive = selectedConnectionId === conn.id || selectedNodeId === conn.fromId || selectedNodeId === conn.toId;
              return (
                <g key={conn.id} className="cursor-pointer" onClick={() => setSelectedConnectionId(conn.id)}>
                  {/* Đường ống nền mờ */}
                  <path
                    d={conn.path}
                    fill="none"
                    stroke={conn.color}
                    strokeWidth={isConnActive ? 4 : 2}
                    strokeOpacity={isConnActive ? 0.8 : 0.25}
                    className="transition-all duration-300"
                  />

                  {/* Đường nét đứt chuyển động (Flow Pulse) */}
                  <path
                    d={conn.path}
                    fill="none"
                    stroke={conn.color}
                    strokeWidth={isConnActive ? 2.5 : 1.5}
                    strokeDasharray="6, 8"
                    strokeOpacity={isConnActive ? 0.95 : 0.4}
                    className={isFlowPlaying ? 'animate-[dash_1.5s_linear_infinite]' : ''}
                  />

                  {/* HẠT PHÁT SÁNG CHUYỂN ĐỘNG DỌC THEO ĐƯỜNG DẪN (Forward Particle Stream) */}
                  {isFlowPlaying && (
                    <>
                      <circle r={isConnActive ? 5 : 3.8} fill={conn.color} filter="url(#dataFlowGlow)">
                        <animateMotion path={conn.path} dur={conn.dur} repeatCount="indefinite" />
                      </circle>

                      {/* Hạt photon thứ 2 lệch nhịp */}
                      <circle r={isConnActive ? 4 : 3} fill="#FFFFFF" filter="url(#dataFlowGlow)">
                        <animateMotion
                          path={conn.path}
                          dur={conn.dur}
                          begin={`-${parseFloat(conn.dur) / 2}s`}
                          repeatCount="indefinite"
                        />
                      </circle>

                      {/* Hạt truyền ngược chiều (nếu có reversePath) */}
                      {conn.reversePath && (
                        <circle r={isConnActive ? 4.2 : 3.2} fill={conn.color} filter="url(#dataFlowGlow)">
                          <animateMotion path={conn.reversePath} dur={`${parseFloat(conn.dur) + 0.4}s`} repeatCount="indefinite" />
                        </circle>
                      )}
                    </>
                  )}
                </g>
              );
            })}

            {/* 2. Render Các Node Hệ Thống */}
            {NODES.map((node) => {
              const isSelected = selectedNodeId === node.id;
              const isCenter = node.id === 'sdp';

              return (
                <g
                  key={node.id}
                  transform={`translate(${node.x}, ${node.y})`}
                  className="cursor-pointer group"
                  onClick={() => {
                    SoundEngine.playTap();
                    setSelectedNodeId(node.id);
                    setSelectedConnectionId(null);
                  }}
                >
                  {/* Quầng sáng neon sau Node khi được chọn */}
                  <circle
                    r={isCenter ? (isSelected ? 52 : 46) : isSelected ? 40 : 34}
                    fill={node.color}
                    opacity={isSelected ? 0.35 : 0.15}
                    filter="url(#dataFlowGlow)"
                    className="transition-all duration-300 group-hover:scale-115"
                  />

                  {/* Vòng viền ngoài phát xung */}
                  <circle
                    r={isCenter ? 40 : 30}
                    fill="none"
                    stroke={node.color}
                    strokeWidth={isSelected ? 2.5 : 1.5}
                    strokeDasharray={isSelected ? '4, 4' : 'none'}
                    className={isSelected ? 'animate-[spin_8s_linear_infinite]' : ''}
                    opacity={0.8}
                  />

                  {/* Khung thân tròn chính của Node */}
                  <circle
                    r={isCenter ? 36 : 27}
                    fill={isDark ? '#020617' : '#ffffff'}
                    stroke={node.color}
                    strokeWidth={2.2}
                    className="transition-transform duration-300 group-hover:scale-105"
                  />

                  {/* Mã viết tắt ABBR */}
                  <text
                    textAnchor="middle"
                    y={isCenter ? -4 : -3}
                    className="font-black font-play select-none pointer-events-none"
                    fill={node.color}
                    fontSize={isCenter ? 15 : 12}
                  >
                    {node.abbr}
                  </text>

                  {/* Nhãn phụ dưới mã */}
                  <text
                    textAnchor="middle"
                    y={isCenter ? 12 : 9.5}
                    className="font-bold select-none pointer-events-none uppercase tracking-wider"
                    fill={isDark ? '#e2e8f0' : '#475569'}
                    fontSize={isCenter ? 8.5 : 7}
                  >
                    {node.badge}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Gợi ý tương tác góc trên */}
          <div className="absolute top-3 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/70 text-cyan-300 text-[10.5px] font-bold backdrop-blur-md border border-cyan-400/30">
            <Sparkles className="w-3 h-3 text-amber-400 animate-bounce" />
            <span>Nhấp vào bất kỳ Node hoặc đường dây để xem chi tiết luồng</span>
          </div>
        </div>

        {/* Thanh Thông Tin Luồng Dữ Liệu Chi Tiết (Data-Flow Inspector) */}
        <div className="p-3.5 sm:p-4 border-t border-slate-200/80 dark:border-white/10 bg-slate-50/80 dark:bg-slate-900/80 backdrop-blur-xl shrink-0 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 text-left">
          {/* Cụm thông tin kết nối đang kích hoạt */}
          <div className="space-y-1 flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span
                className="px-2.5 py-0.5 rounded-full text-[11px] font-black font-play text-white uppercase shadow-xs"
                style={{ backgroundColor: activeConnection?.color || selectedNode.color }}
              >
                {activeConnection ? activeConnection.id.toUpperCase() : selectedNode.abbr}
              </span>
              <h4 className="text-xs sm:text-sm font-extrabold font-play text-slate-800 dark:text-slate-100 truncate">
                {activeConnection?.label || selectedNode.role}
              </h4>
            </div>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-slate-600 dark:text-slate-300">
              <div className="flex items-center gap-1">
                <Zap className="w-3 h-3 text-amber-500 shrink-0" />
                <span className="font-semibold">Giao thức:</span>
                <span className="font-mono font-bold text-blue-600 dark:text-cyan-400">{activeConnection?.protocol}</span>
              </div>
              <div className="flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-500 shrink-0" />
                <span className="font-semibold">Tần suất:</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">{activeConnection?.frequency}</span>
              </div>
            </div>

            <p className="text-[10.5px] font-mono text-slate-500 dark:text-slate-400 truncate">
              <strong>Payload:</strong> {activeConnection?.payload}
            </p>
          </div>

          {/* Cụm chuyển đổi chọn Node nhanh */}
          <div className="flex items-center gap-1.5 shrink-0 overflow-x-auto pb-1 md:pb-0">
            {NODES.map((n) => (
              <button
                key={n.id}
                type="button"
                onClick={() => {
                  SoundEngine.playTap();
                  setSelectedNodeId(n.id);
                  setSelectedConnectionId(null);
                }}
                className={`px-2.5 py-1 rounded-xl text-xs font-bold font-play transition cursor-pointer active:scale-95 border ${
                  selectedNodeId === n.id
                    ? 'text-white shadow-xs'
                    : 'bg-white/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100'
                }`}
                style={{
                  backgroundColor: selectedNodeId === n.id ? n.color : undefined,
                  borderColor: selectedNodeId === n.id ? n.color : undefined,
                }}
              >
                {n.abbr}
              </button>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
    </AnimatePresence>
  );
};
