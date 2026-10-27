'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useToast } from '@/components/ui/Toast';
import { SoundEngine } from '@/components/ui/SoundEngine';
import { WebIcon } from '@/components/ui/WebIcon';
import { PaperPlaneSendButton } from '@/components/ui/PaperPlaneSendButton';
import { SlideToCancelVoiceRecorder } from '@/components/ui/SlideToCancelVoiceRecorder';
import {
  getSavedVoiceURI,
  saveDefaultVoiceURI,
  findBestVoice,
  VOICE_CHANGE_EVENT,
  getMergedEnhancedVoices,
  detectBrowserEnvironment,
} from '@/utils/speechVoice';

export interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
  action?: {
    label: string;
    pageIndex: number;
  };
  isVoice?: boolean;
  voiceDuration?: string;
  voiceBars?: number[];
  transcription?: string;
  isSystem?: boolean;
}

export interface AiChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigatePage: (index: number) => void;
}

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'msg-init-1',
    sender: 'ai',
    text: 'Xin chào anh A! Tôi là Tí Chuột, trợ lý AI của anh Thái. Bạn có thể hỏi tôi về kinh nghiệm, các dự án, hoặc kỹ năng của anh ấy ?',
    timestamp: 'Vừa xong',
  },
];

const SUGGESTED_QUESTIONS = [
  { icon: 'sparkles', label: 'Giới thiệu nhanh về anh Hùng Thái', query: 'Hãy giới thiệu tổng quan về anh Nguyễn Hùng Thái' },
  { icon: 'briefcase', label: 'Kinh nghiệm quản trị thực chiến', query: 'Kinh nghiệm quản trị vận hành và CSKH nổi bật của anh Thái?' },
  { icon: 'rocket', label: 'Kho 21 dự án trọng điểm', query: 'Anh Thái đã thực hiện các dự án và sáng kiến trọng điểm nào?' },
  { icon: 'cog', label: '12 hệ thống CSKH C-Level', query: 'Các hệ thống công nghệ CSKH mà anh Thái đã xây dựng và quản trị?' },
  { icon: 'phone', label: 'Kênh kết nối & hợp tác', query: 'Cách thức liên hệ và kết nối hợp tác trực tiếp với anh Hùng Thái?' },
];

export interface QuestionCategory {
  id: string;
  title: string;
  shortDesc: string;
  icon: string;
  color: string;
  badgeBg: string;
  badgeText: string;
  questions: string[];
}

export const QUESTION_CATEGORIES: QuestionCategory[] = [
  {
    id: 'profile',
    title: 'Hồ Sơ & Chân Dung Chuyên Gia',
    shortDesc: 'Giới thiệu bản thân, triết lý lãnh đạo và phong cách quản trị',
    icon: 'user',
    color: '#7c3aed',
    badgeBg: 'bg-purple-100',
    badgeText: 'text-purple-700',
    questions: [
      'Hãy giới thiệu tổng quan về anh Nguyễn Hùng Thái',
      'Triết lý lãnh đạo và phương châm làm việc của anh Thái là gì?',
      'Nền tảng học vấn và 14 chứng chỉ chuyên ngành cấp cao?',
    ],
  },
  {
    id: 'experience',
    title: 'Kinh Nghiệm CSKH Thực Chiến',
    shortDesc: '20+ năm quản trị Viễn thông, Thương mại, Call Center',
    icon: 'briefcase',
    color: '#4f46e5',
    badgeBg: 'bg-indigo-100',
    badgeText: 'text-indigo-700',
    questions: [
      'Kinh nghiệm quản trị CSKH & Call Center nổi bật (2003 - 2026+)?',
      'Quy mô nhân sự và các mô hình vận hành anh Thái từng quản lý?',
      'Các cột mốc phát triển sự nghiệp từ Nhân viên CSKH đến Trưởng phòng CSKH?',
    ],
  },
  {
    id: 'projects',
    title: 'Kho 21 Dự Án Trọng Điểm (STAR)',
    shortDesc: 'Tái cấu trúc, chuẩn hóa CX, quy trình SOP và Kaizen',
    icon: 'rocket',
    color: '#9333ea',
    badgeBg: 'bg-fuchsia-100',
    badgeText: 'text-fuchsia-700',
    questions: [
      'Tổng quan về kho 21 dự án & sáng kiến vận hành trọng điểm?',
      'Mô hình chuẩn STAR được áp dụng trong các dự án như thế nào?',
      'Các dự án chuyển đổi số dịch vụ và tự động hóa AI tiêu biểu?',
    ],
  },
  {
    id: 'systems',
    title: 'Cổng Bento 12 Hệ Thống C-Level',
    shortDesc: 'SDP, CRM 360, ERP, HRM, OKR, AI Analytics',
    icon: 'cog',
    color: '#ea580c',
    badgeBg: 'bg-amber-100',
    badgeText: 'text-amber-700',
    questions: [
      'Cổng Bento 12 hệ thống CSKH C-Level gồm những giải pháp nào?',
      'Hệ thống SDP trung tâm và kiến trúc tích hợp Omnichannel hoạt động ra sao?',
      'Lợi ích và giá trị thực tế khi doanh nghiệp ứng dụng bộ hệ thống này?',
    ],
  },
  {
    id: 'interview',
    title: 'Phỏng Vấn & Xử Lý Tình Huống',
    shortDesc: 'Xử lý khủng hoảng < 15p, SLA 98%, Cost sang Value Center',
    icon: 'chat',
    color: '#ec4899',
    badgeBg: 'bg-pink-100',
    badgeText: 'text-pink-700',
    questions: [
      'Chiến lược xử lý tình huống khủng hoảng dịch vụ CSKH < 15 phút?',
      'Giải pháp chuyển đổi bộ phận CSKH từ Cost Center sang Value Center?',
      'Phương pháp quản trị và duy trì cam kết chất lượng dịch vụ SLA 98%?',
    ],
  },
  {
    id: 'contact',
    title: 'Kênh Liên Hệ & Kết Nối Hợp Tác',
    shortDesc: 'Hotline, Zalo, Email, Tư vấn và kết nối dự án',
    icon: 'phone',
    color: '#0d9488',
    badgeBg: 'bg-teal-100',
    badgeText: 'text-teal-700',
    questions: [
      'Cách thức liên hệ và làm việc trực tiếp với anh Hùng Thái?',
      'Số điện thoại Zalo và email chính thức để kết nối?',
      'Các vai trò và dự án mà anh Thái sẵn sàng hợp tác tư vấn?',
    ],
  },
];

export const AiChatModal: React.FC<AiChatModalProps> = ({
  isOpen,
  onClose,
  onNavigatePage,
}) => {
  const { showToast } = useToast();
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [inputVal, setInputVal] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [isMinimized, setIsMinimized] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [currentSpeakingId, setCurrentSpeakingId] = useState<string | null>(null);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoiceURI, setSelectedVoiceURI] = useState<string>('');
  const [voiceTab, setVoiceTab] = useState<'vi' | 'multilingual' | 'all'>('vi');
  const [voiceSearchQuery, setVoiceSearchQuery] = useState<string>('');

  const browserEnv = useMemo(() => detectBrowserEnvironment(), []);
  const enhancedVoices = useMemo(() => getMergedEnhancedVoices(voices), [voices]);

  const filteredVoices = useMemo(() => {
    return enhancedVoices.filter((v) => {
      if (voiceTab === 'vi' && v.category !== 'vi') return false;
      if (voiceTab === 'multilingual' && v.category !== 'multilingual') return false;
      if (voiceSearchQuery.trim()) {
        const q = voiceSearchQuery.toLowerCase();
        return (
          v.name.toLowerCase().includes(q) ||
          v.lang.toLowerCase().includes(q) ||
          (v.badgeLabel && v.badgeLabel.toLowerCase().includes(q))
        );
      }
      return true;
    });
  }, [enhancedVoices, voiceTab, voiceSearchQuery]);
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [speechRate, setSpeechRate] = useState<number>(1.0);
  const [speechPitch, setSpeechPitch] = useState<number>(1.05);
  const [isAutoSpeakEnabled, setIsAutoSpeakEnabled] = useState<boolean>(false);
  const settingsRef = useRef<HTMLDivElement>(null);
  const settingsBtnRef = useRef<HTMLButtonElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [activeCategory, setActiveCategory] = useState<QuestionCategory | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const modalContainerRef = useRef<HTMLDivElement>(null);
  const inputBoxRef = useRef<HTMLInputElement>(null);
  const inputContainerRef = useRef<HTMLDivElement>(null);
  const sendTriggerRef = useRef<(() => void) | null>(null);

  // Close question menu & settings when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsMenuOpen(false);
        setActiveCategory(null);
      }
      if (
        settingsRef.current &&
        !settingsRef.current.contains(e.target as Node) &&
        (!settingsBtnRef.current || !settingsBtnRef.current.contains(e.target as Node))
      ) {
        setShowSettings(false);
      }
    };
    if (isMenuOpen || showSettings) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen, showSettings]);

  // Load available speech voices & sync with persistent default
  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    const updateVoices = () => {
      const availVoices = window.speechSynthesis.getVoices();
      setVoices(availVoices);

      // Ưu tiên giọng mặc định đã lưu, hoặc tự động theo trình duyệt (Edge: Nam Minh, Chrome: Tiếng Việt 5)
      const savedURI = getSavedVoiceURI();
      const best = findBestVoice(availVoices, savedURI);
      if (best) {
        setSelectedVoiceURI(savedURI || best.voiceURI);
      } else if (availVoices.length > 0 && !selectedVoiceURI) {
        setSelectedVoiceURI(savedURI || availVoices[0].voiceURI);
      }
    };

    updateVoices();
    window.speechSynthesis.onvoiceschanged = updateVoices;

    const handleExternalVoiceChange = (e: Event) => {
      const customEvent = e as CustomEvent<{ voiceURI: string }>;
      if (customEvent.detail?.voiceURI) {
        setSelectedVoiceURI(customEvent.detail.voiceURI);
      }
    };
    window.addEventListener(VOICE_CHANGE_EVENT, handleExternalVoiceChange);

    return () => {
      window.removeEventListener(VOICE_CHANGE_EVENT, handleExternalVoiceChange);
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Nạp lại cấu hình tốc độ đọc, cao độ và tự động đọc đã lưu làm mặc định
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedRate = localStorage.getItem('hungthai_ai_speech_rate');
      if (savedRate) {
        const parsed = parseFloat(savedRate);
        if (!isNaN(parsed) && parsed > 0) setSpeechRate(parsed);
      }
      const savedPitch = localStorage.getItem('hungthai_ai_speech_pitch');
      if (savedPitch) {
        const parsed = parseFloat(savedPitch);
        if (!isNaN(parsed) && parsed > 0) setSpeechPitch(parsed);
      }
      const savedAuto = localStorage.getItem('hungthai_ai_auto_speak');
      if (savedAuto !== null) {
        setIsAutoSpeakEnabled(savedAuto === 'true');
      }
    }
  }, []);

  // Hàm lưu cài đặt giọng đọc và thông số làm mặc định toàn hệ thống
  const handleSaveAsDefault = () => {
    SoundEngine.playTap();
    if (selectedVoiceURI) {
      saveDefaultVoiceURI(selectedVoiceURI);
    }
    if (typeof window !== 'undefined') {
      localStorage.setItem('hungthai_ai_speech_rate', speechRate.toString());
      localStorage.setItem('hungthai_ai_speech_pitch', speechPitch.toString());
      localStorage.setItem('hungthai_ai_auto_speak', isAutoSpeakEnabled ? 'true' : 'false');
    }
    showToast('✓ Đã lưu giọng đọc và cấu hình làm mặc định toàn hệ thống!');
    setTimeout(() => {
      setShowSettings(false);
    }, 450);
  };

  // Speak text function
  const handleSpeak = (text: string, msgId?: string) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      showToast('Trình duyệt không hỗ trợ phát âm thanh lời nói');
      return;
    }

    // If already speaking this message, stop it
    if (isSpeaking && currentSpeakingId === msgId) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      setCurrentSpeakingId(null);
      return;
    }

    window.speechSynthesis.cancel();

    // Clean markdown bold and bullet points
    const cleanText = text
      .replace(/\*\*(.*?)\*\*/g, '$1')
      .replace(/[•#*>\-]/g, ' ')
      .replace(/\n+/g, '. ')
      .trim();

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = speechRate;
    utterance.pitch = speechPitch;

    const chosen = findBestVoice(voices, selectedVoiceURI);
    if (chosen) {
      utterance.voice = chosen;
      utterance.lang = chosen.lang || 'vi-VN';
    } else {
      utterance.lang = 'vi-VN';
    }

    utterance.onstart = () => {
      setIsSpeaking(true);
      if (msgId) setCurrentSpeakingId(msgId);
    };

    utterance.onend = () => {
      setIsSpeaking(false);
      setCurrentSpeakingId(null);
    };

    utterance.onerror = () => {
      setIsSpeaking(false);
      setCurrentSpeakingId(null);
    };

    window.speechSynthesis.speak(utterance);
    showToast('Đang phát âm thanh lời nói...');
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen && !isMinimized) {
      scrollToBottom();
    }
  }, [messages, isOpen, isMinimized]);

  // AI Knowledge responder
  const generateAiResponse = (userInput: string): { text: string; action?: { label: string; pageIndex: number } } => {
    const q = userInput.toLowerCase();

    // 1. Kinh nghiệm
    if (q.includes('kinh nghiệm') || q.includes('thực chiến') || q.includes('làm việc') || q.includes('cột mốc') || q.includes('viettel') || q.includes('vtc')) {
      return {
        text: 'Anh **Nguyễn Hùng Thái** có hơn **20 năm kinh nghiệm (2003 - 2026+)** thực chiến quản trị vận hành và dịch vụ khách hàng đa ngành:\n\n• **Viễn thông & Tổng đài**: Trưởng phòng CSKH, điều hành mạng lưới Call Center quy mô hàng trăm nhân sự.\n• **Fintech & Thương mại**: Xây dựng quy trình xử lý khiếu nại, bảo mật giao dịch và trải nghiệm người dùng.\n• **Công nghệ & Hệ thống**: Thiết kế kiến trúc giải pháp SDP, CRM, ERP và tự động hóa quy trình.\n\nBạn có thể xem chi tiết timeline và cột mốc từng giai đoạn tại trang **Kinh Nghiệm**.',
        action: { label: 'Xem trang Kinh Nghiệm (Trang 5)', pageIndex: 5 },
      };
    }

    // 2. Dự án
    if (q.includes('dự án') || q.includes('star') || q.includes('sáng kiến') || q.includes('case study') || q.includes('21 dự án')) {
      return {
        text: 'Kho lưu trữ của anh Hùng Thái bao gồm **21 dự án và sáng kiến trọng điểm** chia theo 5 nhóm chiến lược:\n\n1. **Chiến lược & Cấu trúc tổ chức** (Tái cấu trúc tổng đài, phân tầng dịch vụ).\n2. **Thiết kế Trải nghiệm CX** (Hành trình khách hàng, Voice of Customer).\n3. **Chuẩn hóa Quy trình SOP** (Bộ khung tiêu chuẩn vận hành CSKH 5 sao).\n4. **Công nghệ, Dữ liệu & AI** (Hệ thống AI Chatbot, phân tích dữ liệu tự động).\n5. **Đào tạo & Văn hóa** (Học viện CSKH nội bộ, ma trận đánh giá KPI).\n\nMỗi dự án đều được phân tích chuyên sâu theo khung chuẩn STAR (Situation - Task - Action - Result).',
        action: { label: 'Khám phá 21 Dự Án (Trang 7)', pageIndex: 7 },
      };
    }

    // 3. Hệ thống C-Level
    if (q.includes('hệ thống') || q.includes('sdp') || q.includes('erp') || q.includes('crm') || q.includes('hrm') || q.includes('okr') || q.includes('phần mềm') || q.includes('bento')) {
      return {
        text: 'Anh Hùng Thái trực tiếp làm chủ và điều hành **Cổng Bento 12 Hệ Thống CSKH C-Level**:\n\n• **SDP**: Cổng làm việc trung tâm hợp nhất dịch vụ CSKH.\n• **ERP**: Quản trị nguồn lực doanh nghiệp và tài chính kế toán.\n• **CRM**: Quản lý thông tin và hành trình khách hàng 360 độ.\n• **HRM, OKR, BPM, LMS, AI Assistant, Analytics...**\n\nTất cả hệ thống đều được kết nối Single Sign-On trên nền tảng domain `powerservice.one`.',
        action: { label: 'Mở Cổng 12 Hệ Thống (Trang 8)', pageIndex: 8 },
      };
    }

    // 4. Giới thiệu / Bản thân
    if (q.includes('giới thiệu') || q.includes('là ai') || q.includes('hùng thái') || q.includes('chân dung') || q.includes('hồ sơ')) {
      return {
        text: '**Nguyễn Hùng Thái** là Chuyên gia Quản trị Trải nghiệm Khách hàng (CX) & Giám đốc Vận hành Dịch vụ với phương châm cốt lõi:\n\n> *“Tận tâm đồng hành, kiến tạo hệ thống phụng sự mang lại giá trị vượt trội và bền vững cho doanh nghiệp.”*\n\nAnh là cầu nối chiến lược giữa **Công nghệ hiện đại** và **Nghệ thuật kết nối con người**.',
        action: { label: 'Xem Hồ Sơ Chi Tiết (Trang 2)', pageIndex: 2 },
      };
    }

    // 5. Học vấn
    if (q.includes('học vấn') || q.includes('bằng cấp') || q.includes('chứng chỉ') || q.includes('đào tạo') || q.includes('14 khóa')) {
      return {
        text: 'Anh Hùng Thái sở hữu nền tảng chuyên môn vững chắc với **Cử nhân Công nghệ Thông tin & Quản trị Kinh doanh** cùng nhiều chứng chỉ quản trị chuyên ngành cấp cao (Quản trị Dịch vụ Khách hàng Quốc tế, ITIL, Agile & Scrum).',
        action: { label: 'Xem Hồ Sơ Chuyên Gia (Trang 2)', pageIndex: 2 },
      };
    }

    // 6. Kỹ năng & SWOT
    if (q.includes('kỹ năng') || q.includes('swot') || q.includes('thế mạnh') || q.includes('điểm mạnh')) {
      return {
        text: 'Bộ kỹ năng của anh Hùng Thái được xây dựng trên **Ma trận SWOT Quản trị Toàn diện**:\n\n• **Kỹ năng lõi**: Điều phối vận hành quy mô lớn, đàm phán giải quyết xung đột, tư duy phân tích dữ liệu chuyên sâu.\n• **Kỹ năng công nghệ**: Lập trình hệ thống, tự động hóa bằng AI, tối ưu hóa cơ sở dữ liệu và dashboard điều hành.',
        action: { label: 'Xem Ma Trận Kỹ Năng (Trang 6)', pageIndex: 6 },
      };
    }

    // 7. Liên hệ
    if (q.includes('liên hệ') || q.includes('kết nối') || q.includes('số điện thoại') || q.includes('sđt') || q.includes('email') || q.includes('zalo') || q.includes('hợp tác')) {
      return {
        text: 'Quý đối tác và khách hàng có thể liên hệ trực tiếp với anh Nguyễn Hùng Thái qua các kênh chính thức:\n\n• **Hotline / Zalo**: 0903.011.699\n• **Email**: hungthai.powerservice@gmail.com\n• **Văn phòng**: TP. Hồ Chí Minh, Việt Nam.\n\nForm gửi tin nhắn trực tiếp đang sẵn sàng tại trang Liên Hệ!',
        action: { label: 'Chuyển Đến Trang Liên Hệ (Trang 12)', pageIndex: 12 },
      };
    }

    // 8. Tử vi & phong thủy
    if (q.includes('tử vi') || q.includes('phong thủy') || q.includes('bát trạch') || q.includes('hợp tuổi')) {
      return {
        text: 'Anh Hùng Thái kết hợp khoa học **Tử Vi & Bát Trạch Quản Trị** để tối ưu hóa vị trí làm việc, sắp đặt không gian năng lượng và xây dựng đội ngũ bổ trợ đắc lực trong công việc.',
        action: { label: 'Xem Bản Đồ Tử Vi (Trang 10)', pageIndex: 10 },
      };
    }

    // 9. Lĩnh vực hoạt động
    if (q.includes('lĩnh vực') || q.includes('ngành nghề') || q.includes('hoạt động')) {
      return {
        text: 'Anh Hùng Thái có kinh nghiệm thực chiến chuyên sâu trên **6 lĩnh vực hoạt động**:\n1. Viễn thông & Tổng đài Dịch vụ\n2. Thương mại Điện tử & Bán lẻ\n3. Tài chính, Ngân hàng & Fintech\n4. Trò chơi Trực tuyến (Gaming / Esports)\n5. Giải pháp Công nghệ Phần mềm CSKH\n6. Đào tạo & Huấn luyện Nhân sự.',
        action: { label: 'Xem 6 Lĩnh Vực Hoạt Động (Trang 4)', pageIndex: 4 },
      };
    }

    // 10. Phỏng vấn & Xử lý tình huống
    if (q.includes('phỏng vấn') || q.includes('tình huống') || q.includes('khủng hoảng') || q.includes('cost center') || q.includes('value center') || q.includes('sla')) {
      return {
        text: 'Trong năng lực **Phỏng Vấn & Xử Lý Tình Huống Quản Trị Thực Chiến**, anh Hùng Thái sở hữu các giải pháp toàn diện:\n\n• **Quy trình xử lý khủng hoảng < 15 phút**: Kích hoạt ma trận phản ứng nhanh, cách ly sự cố, điều phối phát ngôn đa kênh và dập tắt nguy cơ truyền thông.\n• **Chuyển đổi Cost Center sang Value Center**: Tối ưu hóa 20% chi phí vận hành, biến dữ liệu CSKH thành đòn bẩy giữ chân khách hàng và tạo doanh thu mới.\n• **Duy trì cam kết SLA 98%**: Chuẩn hóa quy trình SOP Matrix, giám sát chất lượng Real-time và cải tiến Kaizen định kỳ.\n\nBạn có thể trải nghiệm mô phỏng đối thoại chuyên sâu tại trang **Phỏng Vấn**.',
        action: { label: 'Xem Phỏng Vấn & Tình Huống (Trang 9)', pageIndex: 9 },
      };
    }

    // 11. Triết lý lãnh đạo
    if (q.includes('triết lý lãnh đạo') || q.includes('lãnh đạo') || q.includes('phương châm làm việc')) {
      return {
        text: 'Triết lý lãnh đạo phụng sự của anh Hùng Thái đúc kết qua **6 trụ cột thực chiến**:\n\n1. **Tư duy bằng chiến lược** (Chiến lược rõ ràng - Định hướng tương lai).\n2. **Dẫn dắt bằng dữ liệu** (Dữ liệu minh bạch - Quyết định sáng suốt).\n3. **Thấu cảm bằng trái tim** (Lắng nghe thấu hiểu - Kết nối bền lâu).\n4. **Lấy chân lý làm gốc** (Chân thực làm đầu - Vững bước tiến xa).\n5. **Lấy kết quả làm thước đo** (Hành động quyết liệt - Kết quả minh chứng).\n6. **Lấy hành động làm đường** (Hành động kiên định - Mở lối thành công).\n\nXem chi tiết tại mục Triết Lý Lãnh Đạo ở trang **Tử Vi & Phong Thủy**.',
        action: { label: 'Xem Triết Lý Lãnh Đạo (Trang 10)', pageIndex: 10 },
      };
    }

    // 12. Thư ngỏ / Tâm thư
    if (q.includes('thư ngỏ') || q.includes('tâm thư') || q.includes('triết lý')) {
      return {
        text: 'Trong **Thư Ngỏ**, anh Hùng Thái chia sẻ tâm huyết hơn 20 năm gắn bó với nghề dịch vụ khách hàng: tinh thần phụng sự, sự chân thành và cam kết không ngừng đổi mới để mang lại giá trị thiết thực nhất.',
        action: { label: 'Đọc Thư Ngỏ (Trang 1)', pageIndex: 1 },
      };
    }

    // Default response
    return {
      text: `Cảm ơn câu hỏi của bạn! Với tư cách là Trợ lý AI đại diện cho chuyên gia **Nguyễn Hùng Thái**, tôi có thể hỗ trợ bạn tìm hiểu về:\n\n• **Hồ sơ năng lực & kinh nghiệm thực chiến (2003 - 2026+)**\n• **Kho 21 Dự án & Sáng kiến chuyển đổi số CX**\n• **12 Hệ thống công nghệ quản trị C-Level**\n• **Kỹ năng xử lý tình huống & phỏng vấn tuyển dụng**\n• **Thông tin học vấn, kỹ năng SWOT và kênh kết nối hợp tác**\n\nBạn có thể nhấp vào nút **Menu** ngay khung chat để chọn 1 trong 6 nhóm câu hỏi gợi ý nhé!`,
    };
  };

  const handleSend = (textToSend?: string) => {
    const text = (textToSend || inputVal).trim();
    if (!text) return;

    SoundEngine.playPop();

    const userMsg: ChatMessage = {
      id: `msg-user-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputVal('');
    setIsTyping(true);

    // AI typing delay
    setTimeout(() => {
      const resp = generateAiResponse(text);
      const aiMsg: ChatMessage = {
        id: `msg-ai-${Date.now()}`,
        sender: 'ai',
        text: resp.text,
        timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
        action: resp.action,
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
      SoundEngine.playPop();
      if (isAutoSpeakEnabled) {
        handleSpeak(resp.text, aiMsg.id);
      }
    }, 700);
  };

  const handleVoiceSend = (durationStr: string, bars: number[], transcription?: string) => {
    SoundEngine.playPop();

    const transcriptText = transcription?.trim() || '';
    const userVoiceMsg: ChatMessage = {
      id: `msg-voice-${Date.now()}`,
      sender: 'user',
      text: transcriptText ? `[Ghi âm] ${transcriptText}` : `Tin nhắn thoại (${durationStr})`,
      timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
      isVoice: true,
      voiceDuration: durationStr,
      voiceBars: bars.slice(0, 18),
      transcription: transcriptText || undefined,
    };

    setMessages((prev) => [...prev, userVoiceMsg]);
    setIsTyping(true);

    const queryForAi = transcriptText || 'hồ sơ năng lực của anh thái';

    setTimeout(() => {
      const resp = generateAiResponse(queryForAi);
      const aiReplyText = transcriptText
        ? `Tôi đã nghe thấy câu hỏi thoại: "${transcriptText}".\n\n${resp.text}`
        : `Tôi đã nhận được tin nhắn thoại (${durationStr}) của bạn!\n\n${resp.text}`;

      const aiMsg: ChatMessage = {
        id: `msg-ai-${Date.now()}`,
        sender: 'ai',
        text: aiReplyText,
        timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
        action: resp.action,
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
      SoundEngine.playPop();
      if (isAutoSpeakEnabled) {
        handleSpeak(aiReplyText, aiMsg.id);
      }
    }, 700);
  };

  const handleVoiceCancel = () => {
    SoundEngine.playTap();
    const sysId = `msg-sys-${Date.now()}`;
    const sysMsg: ChatMessage = {
      id: sysId,
      sender: 'ai',
      text: 'Đã hủy ghi âm',
      timestamp: '',
      isSystem: true,
    };
    setMessages((prev) => [...prev, sysMsg]);
    setTimeout(() => {
      setMessages((prev) => prev.filter((m) => m.id !== sysId));
    }, 1800);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (sendTriggerRef.current) {
        sendTriggerRef.current();
      } else {
        handleSend();
      }
    }
  };

  const handleActionClick = (pageIndex: number, label: string) => {
    onNavigatePage(pageIndex);
    showToast(`Đã chuyển hướng: ${label}`);
    onClose();
  };

  const handleClearChat = () => {
    setMessages(INITIAL_MESSAGES);
    showToast('Đã làm mới cuộc hội thoại với Tí Chuột AI');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end select-none">
      {/* Cửa sổ Chat Glass UI */}
      <div
        ref={modalContainerRef}
        className={`w-[92vw] sm:w-[420px] rounded-[22px] border border-white/80 dark:border-slate-700/80 bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl transition-all duration-300 flex flex-col overflow-hidden relative shadow-[0_20px_50px_rgba(0,0,0,0.18),0_10px_25px_rgba(0,0,0,0.08)] dark:shadow-[0_25px_60px_rgba(0,0,0,0.6)] ${
          isMinimized ? 'h-[64px]' : 'h-[590px] max-h-[85vh]'
        }`}
      >
        {/* Header Thanh Tiêu Đề Glass UI Hiện Đại */}
        <div className="p-3.5 sm:p-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-600 text-white flex items-center justify-between relative shadow-sm">
          <div className="flex items-center gap-2.5 relative z-10">
            {/* Avatar Tí Chuột AI */}
            <div className="relative">
              <img
                src="https://i.ibb.co/Hfhyt1Dg/Avata-Ti-Chuot-GIF.gif"
                alt="Avatar Tí Chuột AI"
                className="w-10 h-10 rounded-full object-cover border-2 border-white/80 shadow-md bg-white/10"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    'https://placehold.co/100x100/3b82f6/ffffff?text=AI';
                }}
              />
              <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-400 border-2 border-white shadow-xs animate-pulse" />
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <h4 className="text-sm font-black font-play tracking-tight leading-none text-white drop-shadow-xs">
                  Tí Chuột AI
                </h4>
                <span className="text-[9.5px] font-bold px-2 py-0.5 rounded-full bg-white/20 text-white border border-white/30 backdrop-blur-xs">
                  Trợ Lý Trí Tuệ
                </span>
              </div>
              <span className="text-[11px] text-white/90 flex items-center gap-1.5 mt-0.5 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse" />
                Online • Sẵn sàng hỗ trợ 24/7
              </span>
            </div>
          </div>

          {/* Cụm nút điều khiển cửa sổ Glass UI */}
          <div className="flex items-center gap-1.5 relative z-10">
            {/* Nút Cài Đặt (Settings) */}
            <button
              ref={settingsBtnRef}
              type="button"
              onClick={() => {
                SoundEngine.playTap();
                setShowSettings((prev) => !prev);
                if (isMenuOpen) setIsMenuOpen(false);
              }}
              title="Cài đặt giọng nói & Trợ lý AI"
              className={`w-7 h-7 rounded-full flex items-center justify-center border transition-all cursor-pointer ${
                showSettings
                  ? 'bg-white text-indigo-700 border-white shadow-md rotate-45'
                  : 'bg-white/15 text-white border-white/25 hover:bg-white/30 hover:shadow-xs'
              }`}
            >
              <svg className="w-3.5 h-3.5 transition-transform" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </button>

            {/* Nút Làm Mới */}
            <button
              type="button"
              onClick={handleClearChat}
              title="Làm mới cuộc trò chuyện"
              className="w-7 h-7 rounded-full bg-white/15 text-white border border-white/25 hover:bg-white/30 flex items-center justify-center transition cursor-pointer text-xs"
            >
              <WebIcon name="sync" className="w-3.5 h-3.5" />
            </button>

            {/* Nút Thu nhỏ / Phóng to */}
            <button
              type="button"
              onClick={() => setIsMinimized(!isMinimized)}
              title={isMinimized ? 'Mở rộng cửa sổ' : 'Thu nhỏ cửa sổ'}
              className="w-7 h-7 rounded-full bg-white/15 text-white border border-white/25 hover:bg-white/30 flex items-center justify-center transition cursor-pointer text-xs font-bold"
            >
              {isMinimized ? '□' : '–'}
            </button>

            {/* Nút Đóng */}
            <button
              type="button"
              onClick={onClose}
              title="Đóng trợ lý AI"
              className="w-7 h-7 rounded-full bg-white/15 text-white border border-white/25 hover:bg-rose-500 hover:border-rose-400 hover:text-white flex items-center justify-center transition cursor-pointer text-xs font-bold"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Modal Cấu Hình Giọng Nói Nằm Giữa Popup Chat (Glass UI) */}
        {showSettings && (
          <div className="absolute inset-0 z-50 flex items-center justify-center p-3.5 bg-black/50 backdrop-blur-md animate-in fade-in duration-150">
            <div
              ref={settingsRef}
              className="w-full max-w-[340px] max-h-[92%] overflow-y-auto glass-scrollbar rounded-[18px] bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl border border-slate-200 dark:border-slate-700 shadow-2xl p-4 flex flex-col gap-3 text-left text-slate-800 dark:text-slate-100 animate-in zoom-in-95 duration-150 select-none"
            >
              {/* Header Cài đặt */}
              <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-700/80">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-cyan-400 border border-blue-200 dark:border-blue-800 flex items-center justify-center shadow-xs">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.4" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  </div>
                  <div>
                    <span className="text-xs font-black text-slate-800 dark:text-slate-100 font-play block leading-tight">
                      Cấu hình giọng nói AI
                    </span>
                    <span className="text-[9.5px] text-slate-500 dark:text-slate-400">Hệ thống giọng nói thông minh</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setShowSettings(false)}
                  className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-rose-50 dark:hover:bg-rose-900/40 text-slate-500 hover:text-rose-600 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-xs cursor-pointer transition-colors"
                >
                  ✕
                </button>
              </div>

              {/* Mục 1: Chọn giọng đọc */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-blue-600 dark:text-cyan-400 uppercase tracking-wider block font-sans">
                    1. Chọn Giọng Đọc
                  </span>
                  <span className="text-[9px] font-mono text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded-full border border-slate-200 dark:border-slate-700">
                    {browserEnv === 'edge' ? 'Trình duyệt: Edge' : browserEnv === 'chrome' ? 'Trình duyệt: Chrome' : 'Trình duyệt Web'}
                  </span>
                </div>

                {/* Phím tắt chọn nhanh Giọng Trình Duyệt */}
                <div className="grid grid-cols-2 gap-1.5">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedVoiceURI('microsoft-nam-minh-vi-vn');
                      saveDefaultVoiceURI('microsoft-nam-minh-vi-vn');
                      showToast('Đã chọn giọng Nam Minh (Microsoft Edge)');
                    }}
                    className={`p-1.5 rounded-xl border text-left transition cursor-pointer flex flex-col gap-0.5 ${
                      selectedVoiceURI === 'microsoft-nam-minh-vi-vn' || /nam\s*minh/i.test(selectedVoiceURI)
                        ? 'bg-blue-600 text-white border-blue-500 shadow-sm'
                        : 'bg-slate-50 dark:bg-slate-800/80 hover:bg-blue-50 dark:hover:bg-slate-700 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-[10px] font-black truncate font-play">Nam Minh</span>
                      <span className={`text-[7.5px] font-bold px-1 py-0.2 rounded-xs uppercase tracking-tighter ${
                        selectedVoiceURI === 'microsoft-nam-minh-vi-vn' || /nam\s*minh/i.test(selectedVoiceURI)
                          ? 'bg-white/20 text-white'
                          : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                      }`}>
                        Edge MS
                      </span>
                    </div>
                    <span className={`text-[8.5px] truncate ${
                      selectedVoiceURI === 'microsoft-nam-minh-vi-vn' || /nam\s*minh/i.test(selectedVoiceURI)
                        ? 'text-white/80'
                        : 'text-slate-500 dark:text-slate-400'
                    }`}>
                      Mặc định Microsoft Edge
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setSelectedVoiceURI('google-tieng-viet-5-vi-vn');
                      saveDefaultVoiceURI('google-tieng-viet-5-vi-vn');
                      showToast('Đã chọn giọng Tiếng Việt 5 (Chrome)');
                    }}
                    className={`p-1.5 rounded-xl border text-left transition cursor-pointer flex flex-col gap-0.5 ${
                      selectedVoiceURI === 'google-tieng-viet-5-vi-vn' || /tiếng việt 5|tieng viet 5/i.test(selectedVoiceURI)
                        ? 'bg-blue-600 text-white border-blue-500 shadow-sm'
                        : 'bg-slate-50 dark:bg-slate-800/80 hover:bg-blue-50 dark:hover:bg-slate-700 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-[10px] font-black truncate font-play">Tiếng Việt 5</span>
                      <span className={`text-[7.5px] font-bold px-1 py-0.2 rounded-xs uppercase tracking-tighter ${
                        selectedVoiceURI === 'google-tieng-viet-5-vi-vn' || /tiếng việt 5|tieng viet 5/i.test(selectedVoiceURI)
                          ? 'bg-white/20 text-white'
                          : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                      }`}>
                        Chrome
                      </span>
                    </div>
                    <span className={`text-[8.5px] truncate ${
                      selectedVoiceURI === 'google-tieng-viet-5-vi-vn' || /tiếng việt 5|tieng viet 5/i.test(selectedVoiceURI)
                        ? 'text-white/80'
                        : 'text-slate-500 dark:text-slate-400'
                    }`}>
                      Mặc định Google Chrome
                    </span>
                  </button>
                </div>

                {/* Bộ lọc phân loại */}
                <div className="flex items-center gap-1 p-0.5 rounded-lg bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                  <button
                    type="button"
                    onClick={() => setVoiceTab('vi')}
                    className={`flex-1 py-1 rounded-md text-[9px] font-black transition cursor-pointer ${
                      voiceTab === 'vi'
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    🇻🇳 Tiếng Việt
                  </button>
                  <button
                    type="button"
                    onClick={() => setVoiceTab('multilingual')}
                    className={`flex-1 py-1 rounded-md text-[9px] font-black transition cursor-pointer ${
                      voiceTab === 'multilingual'
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    🌐 Đa ngôn ngữ
                  </button>
                  <button
                    type="button"
                    onClick={() => setVoiceTab('all')}
                    className={`flex-1 py-1 rounded-md text-[9px] font-black transition cursor-pointer ${
                      voiceTab === 'all'
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    Tất cả
                  </button>
                </div>

                {/* Ô tìm kiếm giọng nói nhanh */}
                <div className="relative">
                  <input
                    type="text"
                    value={voiceSearchQuery}
                    onChange={(e) => setVoiceSearchQuery(e.target.value)}
                    placeholder="Tìm kiếm giọng (tên, ngôn ngữ)..."
                    className="w-full px-2.5 py-1 text-[10px] rounded-lg bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-hidden focus:border-blue-500"
                  />
                  {voiceSearchQuery && (
                    <button
                      type="button"
                      onClick={() => setVoiceSearchQuery('')}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] text-slate-400 hover:text-slate-600 cursor-pointer"
                    >
                      ✕
                    </button>
                  )}
                </div>

                {/* Danh sách cuộn các giọng nói đã lọc */}
                <div className="max-h-32 overflow-y-auto glass-scrollbar space-y-1 p-1 rounded-xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800">
                  {filteredVoices.length === 0 ? (
                    <span className="p-2 text-xs text-slate-400 italic block text-center">Không tìm thấy giọng nói phù hợp</span>
                  ) : (
                    filteredVoices.map((v) => {
                      const isChosen =
                        v.voiceURI === selectedVoiceURI ||
                        (v.nativeVoice && v.nativeVoice.voiceURI === selectedVoiceURI) ||
                        (v.voiceURI === 'microsoft-nam-minh-vi-vn' && /nam\s*minh/i.test(selectedVoiceURI)) ||
                        (v.voiceURI === 'google-tieng-viet-5-vi-vn' && /tiếng việt 5|tieng viet 5/i.test(selectedVoiceURI));

                      return (
                        <button
                          key={v.voiceURI}
                          type="button"
                          onClick={() => {
                            setSelectedVoiceURI(v.voiceURI);
                            saveDefaultVoiceURI(v.voiceURI);
                            showToast(`Đã chọn "${v.name}"`);
                          }}
                          className={`w-full text-left p-1.5 px-2 rounded-lg text-[10px] transition cursor-pointer flex items-center justify-between gap-1.5 ${
                            isChosen
                              ? 'bg-blue-600 text-white font-bold shadow-xs'
                              : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 font-medium'
                          }`}
                        >
                          <div className="min-w-0 flex-1 truncate">
                            <span className="block truncate leading-tight font-sans">{v.name}</span>
                            <div className="flex items-center gap-1.5 mt-0.5">
                              <span className={`text-[8.5px] font-mono ${isChosen ? 'text-blue-100' : 'text-slate-500'}`}>
                                {v.lang}
                              </span>
                              {v.badgeLabel && (
                                <span className={`text-[8px] px-1 py-0.2 rounded-xs font-semibold ${
                                  isChosen ? 'bg-white/20 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                                }`}>
                                  {v.badgeLabel}
                                </span>
                              )}
                            </div>
                          </div>
                          {v.category === 'vi' ? (
                            <span className={`px-1.5 py-0.5 rounded-xs text-[8.5px] font-black shrink-0 ${
                              isChosen ? 'bg-white/20 text-white' : 'bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-cyan-400'
                            }`}>
                              VN
                            </span>
                          ) : (
                            <span className={`px-1.5 py-0.5 rounded-xs text-[8.5px] font-bold shrink-0 uppercase ${
                              isChosen ? 'bg-white/20 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                            }`}>
                              {v.lang.split(/[-_]/)[0]}
                            </span>
                          )}
                        </button>
                      );
                    })
                  )}
                </div>
              </div>

              {/* Mục 2: Tốc độ đọc (Rate) */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-[10px]">
                  <span className="font-bold text-blue-600 dark:text-cyan-400 uppercase tracking-wider font-sans">
                    2. Tốc Độ Đọc:
                  </span>
                  <span className="font-bold text-slate-700 dark:text-slate-200 font-mono">{speechRate.toFixed(1)}x</span>
                </div>
                <div className="grid grid-cols-3 gap-1">
                  {[
                    { val: 0.85, label: 'Chậm (0.8x)' },
                    { val: 1.0, label: 'Chuẩn (1.0x)' },
                    { val: 1.25, label: 'Nhanh (1.2x)' },
                  ].map((item) => (
                    <button
                      key={item.val}
                      type="button"
                      onClick={() => setSpeechRate(item.val)}
                      className={`py-1 px-1.5 rounded-lg text-[10px] font-bold transition cursor-pointer border ${
                        speechRate === item.val
                          ? 'bg-blue-600 border-blue-500 text-white shadow-xs'
                          : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-750'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Mục 3: Cao độ âm vực (Pitch) */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-[10px]">
                  <span className="font-bold text-blue-600 dark:text-cyan-400 uppercase tracking-wider font-sans">
                    3. Âm Vực / Cao Độ:
                  </span>
                  <span className="font-bold text-slate-700 dark:text-slate-200 font-sans">
                    {speechPitch === 0.9 ? 'Trầm' : speechPitch === 1.2 ? 'Trong trẻo' : 'Tự nhiên'}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-1">
                  {[
                    { val: 0.9, label: 'Trầm' },
                    { val: 1.05, label: 'Tự nhiên' },
                    { val: 1.2, label: 'Trong trẻo' },
                  ].map((item) => (
                    <button
                      key={item.val}
                      type="button"
                      onClick={() => setSpeechPitch(item.val)}
                      className={`py-1 px-1.5 rounded-lg text-[10px] font-bold transition cursor-pointer border ${
                        speechPitch === item.val
                          ? 'bg-blue-600 border-blue-500 text-white shadow-xs'
                          : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-750'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Mục 4: Tự động phát âm thanh khi phản hồi */}
              <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <div className="text-left">
                  <span className="text-[10.5px] font-bold text-slate-800 dark:text-slate-200 block">
                    Tự động đọc tin nhắn AI
                  </span>
                  <span className="text-[9px] text-slate-500 dark:text-slate-400 block">
                    Phát giọng đọc ngay khi Tí Chuột trả lời
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsAutoSpeakEnabled(!isAutoSpeakEnabled)}
                  className={`w-9 h-5 rounded-full p-0.5 transition-colors cursor-pointer flex items-center ${
                    isAutoSpeakEnabled ? 'bg-blue-600 justify-end' : 'bg-slate-300 dark:bg-slate-700 justify-start'
                  }`}
                >
                  <div className="w-4 h-4 rounded-full bg-white shadow-xs" />
                </button>
              </div>

              {/* Cụm 2 nút hành động: Thử giọng & Lưu vào làm mặc định */}
              <div className="flex flex-col gap-2 pt-1">
                {/* Nút Thử Giọng */}
                <button
                  type="button"
                  onClick={() => {
                    handleSpeak(
                      'Xin chào! Tôi là Tí Chuột, trợ lý AI thông minh của chuyên gia Nguyễn Hùng Thái.',
                      'test-voice-preview'
                    );
                  }}
                  className="w-full py-1.5 rounded-xl text-[11px] font-bold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 shadow-xs transition flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <WebIcon name="volume-high" className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-400" />
                  <span>{isSpeaking && currentSpeakingId === 'test-voice-preview' ? 'Dừng đọc thử' : 'Nghe Thử Giọng Nói'}</span>
                </button>

                {/* Nút Lưu Vào Làm Mặc Định */}
                <button
                  type="button"
                  onClick={handleSaveAsDefault}
                  className="w-full py-2.5 rounded-xl text-xs font-black bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-600 text-white shadow-md hover:opacity-95 transition flex items-center justify-center gap-2 cursor-pointer font-play active:scale-[0.98]"
                >
                  <WebIcon name="check-circle" className="w-4 h-4 text-white" />
                  <span>Lưu vào làm mặc định</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Thân Chat & Lịch Sử Tin Nhắn */}
        {!isMinimized && (
          <>
            <div className="flex-1 p-3.5 sm:p-4 overflow-y-auto no-scrollbar flex flex-col gap-3.5 text-left text-xs bg-slate-50/90 dark:bg-slate-950/90 backdrop-blur-md">
              {/* Tin nhắn danh sách */}
              {messages.map((msg) => {
                const isThisSpeaking = isSpeaking && currentSpeakingId === msg.id;

                if (msg.isSystem) {
                  return (
                    <div key={msg.id} className="self-center my-0.5 animate-in fade-in zoom-in-95 duration-200">
                      <p className="px-3 py-1 rounded-full bg-slate-200/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border border-slate-300/60 dark:border-slate-700 text-[11px] font-medium shadow-xs">
                        {msg.text}
                      </p>
                    </div>
                  );
                }

                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col gap-1 max-w-[90%] ${
                      msg.sender === 'user' ? 'self-end items-end' : 'self-start items-start'
                    }`}
                  >
                    {msg.isVoice ? (
                      <div
                        onClick={() => {
                          if (msg.transcription) {
                            handleSpeak(msg.transcription, msg.id);
                          } else {
                            SoundEngine.playTap();
                          }
                        }}
                        className="flex items-center gap-2 p-2.5 px-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium shadow-md cursor-pointer active:scale-95 transition-transform border border-blue-400/40"
                        role="button"
                        aria-label={`Tin nhắn thoại ${msg.voiceDuration || ''}`}
                        title="Nhấp để phát lại nội dung thoại"
                      >
                        <i aria-hidden="true" className="block w-0 h-0 border-l-[9px] border-l-white border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent shrink-0" />
                        <span className="flex items-center gap-[2.5px] h-5 px-1">
                          {(msg.voiceBars && msg.voiceBars.length > 0 ? msg.voiceBars : [0.3, 0.6, 0.9, 0.4, 0.7, 0.5, 0.8, 0.3, 0.6, 0.9, 0.4, 0.8, 0.5, 0.7, 0.4, 0.6, 0.3, 0.5]).slice(0, 18).map((v, bIdx) => (
                            <b
                              key={bIdx}
                              className="w-[3px] rounded-full bg-white/90"
                              style={{ height: `${Math.max(4, v * 20).toFixed(0)}px` }}
                            />
                          ))}
                        </span>
                        <span className="font-mono text-xs font-bold text-white/95">{msg.voiceDuration || '0:03'}</span>
                      </div>
                    ) : (
                      <div
                        className={`p-3 rounded-2xl shadow-sm text-xs leading-relaxed whitespace-pre-wrap select-text relative group u005-bb ${
                          msg.sender === 'user'
                            ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md font-medium out pop'
                            : 'bg-white dark:bg-slate-800/95 border border-slate-200/90 dark:border-slate-700/80 text-slate-800 dark:text-slate-100 shadow-sm in'
                        }`}
                      >
                        {/* Render text with basic bold formatting */}
                        <div
                          dangerouslySetInnerHTML={{
                            __html: msg.text
                              .replace(/\*\*(.*?)\*\*/g, '<strong class="text-blue-600 dark:text-cyan-400 font-bold">$1</strong>')
                              .replace(/\n/g, '<br/>'),
                          }}
                        />

                        {/* Nút Speak để phát âm thanh lời nói */}
                        {msg.sender === 'ai' && (
                          <div className="mt-2 pt-1.5 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between gap-2">
                            <button
                              type="button"
                              onClick={() => handleSpeak(msg.text, msg.id)}
                              title={isThisSpeaking ? 'Dừng đọc' : 'Phát âm thanh lời nói (Speak)'}
                              className={`px-2.5 py-1 rounded-full text-[10.5px] font-bold flex items-center gap-1 transition-all cursor-pointer shadow-2xs ${
                                isThisSpeaking
                                  ? 'bg-rose-500 text-white animate-pulse shadow-md'
                                  : 'bg-slate-100 hover:bg-blue-50 dark:bg-slate-700/80 dark:hover:bg-slate-700 text-blue-600 dark:text-cyan-400 border border-slate-200 dark:border-slate-600'
                              }`}
                            >
                              <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                              </svg>
                              <span>{isThisSpeaking ? 'Dừng đọc' : 'Phát giọng đọc'}</span>
                            </button>

                            <span className="text-[9.5px] text-slate-400 dark:text-slate-500">
                              {msg.timestamp}
                            </span>
                          </div>
                        )}

                        {/* Nút điều hướng đính kèm nếu có */}
                        {msg.action && (
                          <button
                            type="button"
                            onClick={() => handleActionClick(msg.action!.pageIndex, msg.action!.label)}
                            className="mt-2 w-full py-1.5 px-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-black text-[11px] shadow-sm flex items-center justify-center gap-1.5 transition active:scale-95 cursor-pointer font-play"
                          >
                            <span>{msg.action.label}</span>
                            <span>→</span>
                          </button>
                        )}
                      </div>
                    )}
                    {msg.sender === 'user' && !msg.isVoice && (
                      <div className="flex items-center gap-1 text-[10px] text-slate-400 dark:text-slate-500 px-1">
                        <span>{msg.timestamp}</span>
                        <svg className="w-3.5 h-2.5 stroke-blue-500 dark:stroke-cyan-400" viewBox="0 0 16 10" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="M1 5.5 4 8.5 9.5 2M7 8.5 15 1" />
                        </svg>
                      </div>
                    )}
                    {msg.isVoice && msg.transcription && (
                      <div className="text-[10px] text-slate-500 dark:text-slate-400 italic px-1 max-w-[260px] truncate">
                        &ldquo;{msg.transcription}&rdquo;
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Typing indicator */}
              {isTyping && (
                <div className="self-start flex items-center gap-2 p-2.5 px-3.5 rounded-2xl bg-white/95 dark:bg-slate-800/95 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-xs shadow-xs">
                  <span className="w-2 h-2 rounded-full bg-blue-600 dark:bg-cyan-400 animate-ping" />
                  <span className="font-semibold italic font-play">Tí Chuột AI đang tính toán phản hồi...</span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Gợi ý câu hỏi nhanh (Quick Question Chips) */}
            <div className="px-3 py-2 bg-slate-100/90 dark:bg-slate-900/90 border-t border-slate-200 dark:border-slate-800 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              {SUGGESTED_QUESTIONS.map((item, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSend(item.query)}
                  className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-white dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-cyan-300 border border-slate-200/90 dark:border-slate-700/80 shadow-2xs whitespace-nowrap transition cursor-pointer shrink-0 flex items-center gap-1.5 font-play"
                >
                  <WebIcon name={item.icon} className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-400" />
                  <span>{item.label}</span>
                </button>
              ))}
            </div>

            {/* Input Bar Nhập Tin Nhắn Glass UI */}
            <div
              ref={inputContainerRef}
              className="p-3 bg-white/95 dark:bg-slate-900/95 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2 relative u005-cp"
            >
              {/* Nút Menu ngay khung chat */}
              <div ref={menuRef} className="relative shrink-0">
                <button
                  type="button"
                  onClick={() => {
                    setIsMenuOpen((prev) => !prev);
                    if (isMenuOpen) setActiveCategory(null);
                  }}
                  title="Danh mục 6 nhóm câu hỏi gợi ý"
                  className={`h-9 px-2.5 rounded-full flex items-center gap-1.5 transition-all cursor-pointer font-bold text-xs shadow-xs border ${
                    isMenuOpen
                      ? 'bg-blue-600 text-white border-blue-500 shadow-md'
                      : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700'
                  }`}
                >
                  <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                  </svg>
                  <span className="text-[11px] font-bold font-play">Menu</span>
                </button>

                {/* Popup Menu 6 Mục & Chi Tiết Câu Hỏi Glass UI */}
                {isMenuOpen && (
                  <div
                    className="absolute bottom-11 left-0 w-[300px] sm:w-[350px] max-h-[380px] bg-white/98 dark:bg-slate-900/98 backdrop-blur-2xl rounded-2xl border border-slate-200 dark:border-slate-700 shadow-2xl p-2.5 z-50 flex flex-col gap-2 select-none animate-in fade-in zoom-in-95 duration-150 overflow-hidden"
                  >
                    {/* Header của Popup */}
                    <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-700/80 px-1">
                      {activeCategory ? (
                        <button
                          type="button"
                          onClick={() => setActiveCategory(null)}
                          className="flex items-center gap-1 text-xs font-bold text-blue-600 dark:text-cyan-400 hover:underline transition cursor-pointer"
                        >
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                          </svg>
                          <span>Quay lại 6 danh mục</span>
                        </button>
                      ) : (
                        <div className="flex items-center gap-1.5 text-xs font-black text-slate-800 dark:text-slate-100 font-play">
                          <span className="w-5 h-5 rounded-md bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-cyan-400 border border-blue-200 dark:border-blue-800 flex items-center justify-center text-[11px]">
                            ✦
                          </span>
                          <span>Danh mục 6 nhóm câu hỏi</span>
                        </div>
                      )}

                      <button
                        type="button"
                        onClick={() => {
                          setIsMenuOpen(false);
                          setActiveCategory(null);
                        }}
                        className="w-5 h-5 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 flex items-center justify-center text-xs cursor-pointer"
                        title="Đóng menu"
                      >
                        ✕
                      </button>
                    </div>

                    {/* Danh Sách 6 Mục hoặc Danh Sách Câu Hỏi trong mục */}
                    <div className="overflow-y-auto no-scrollbar max-h-[300px] flex flex-col gap-1.5 p-0.5">
                      {!activeCategory ? (
                        // DANH SÁCH 6 MỤC
                        QUESTION_CATEGORIES.map((cat, idx) => (
                          <button
                            key={cat.id}
                            type="button"
                            onClick={() => {
                              SoundEngine.playPop();
                              setActiveCategory(cat);
                            }}
                            className="w-full p-2 px-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-blue-400 bg-slate-50/80 dark:bg-slate-800/80 hover:bg-blue-50/80 dark:hover:bg-slate-700/80 text-left transition flex items-center justify-between gap-2.5 group cursor-pointer"
                          >
                            <div className="flex items-center gap-2.5 min-w-0 flex-1">
                              <div
                                className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-blue-600 dark:text-cyan-400 shadow-2xs"
                              >
                                <WebIcon name={cat.icon} className="w-4 h-4" />
                              </div>
                              <div className="min-w-0 flex-1">
                                <div className="text-[11.5px] font-bold text-slate-800 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-cyan-300 truncate leading-tight font-play">
                                  {idx + 1}. {cat.title}
                                </div>
                                <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate leading-tight mt-0.5">
                                  {cat.shortDesc}
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-1 shrink-0">
                              <span className="text-[9.5px] font-bold px-1.5 py-0.5 rounded-md bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                                {cat.questions.length} câu
                              </span>
                              <svg className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 dark:group-hover:text-cyan-300 group-hover:translate-x-0.5 transition" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                              </svg>
                            </div>
                          </button>
                        ))
                      ) : (
                        // DANH SÁCH CÂU HỎI TRONG MỤC
                        <div className="flex flex-col gap-1.5 animate-in fade-in duration-150">
                          <div className="px-1 py-0.5 text-[10.5px] font-bold text-blue-600 dark:text-cyan-400 uppercase tracking-wide flex items-center justify-between font-sans">
                            <span>Chọn câu hỏi để gửi:</span>
                            <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400">Nhấp để hỏi ngay</span>
                          </div>
                          {activeCategory.questions.map((qItem, qIdx) => (
                            <button
                              key={qIdx}
                              type="button"
                              onClick={() => {
                                handleSend(qItem);
                                setIsMenuOpen(false);
                                setActiveCategory(null);
                              }}
                              className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-blue-500 bg-white dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-slate-700/80 text-left transition text-xs font-semibold text-slate-800 dark:text-slate-100 flex items-start gap-2 shadow-2xs group cursor-pointer"
                            >
                              <span className="w-4 h-4 rounded-full bg-blue-100 dark:bg-slate-700 text-blue-600 dark:text-cyan-400 flex items-center justify-center text-[10px] font-black shrink-0 mt-0.5 group-hover:bg-blue-600 group-hover:text-white transition">
                                ?
                              </span>
                              <span className="flex-1 leading-snug">{qItem}</span>
                              <svg className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 dark:group-hover:text-cyan-300 group-hover:translate-x-0.5 transition shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                              </svg>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Input Box Glass UI */}
              <input
                ref={inputBoxRef}
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Nhập câu hỏi hoặc nhấn giữ Mic..."
                className="flex-1 px-3.5 py-2 rounded-full text-xs bg-slate-100/90 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 shadow-inner"
              />

              {/* Nút gửi: Hiện máy bay giấy khi gõ chữ; Hiện nút Mic trượt để hủy khi chưa nhập chữ */}
              {inputVal.trim() ? (
                <PaperPlaneSendButton
                  onSend={() => handleSend()}
                  canSend={Boolean(inputVal.trim())}
                  containerRef={modalContainerRef}
                  inputRef={inputBoxRef}
                  inputContainerRef={inputContainerRef}
                  triggerRef={sendTriggerRef}
                />
              ) : (
                <SlideToCancelVoiceRecorder
                  onSendVoice={handleVoiceSend}
                  onCancel={handleVoiceCancel}
                  isInputEmpty={!inputVal.trim()}
                />
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
