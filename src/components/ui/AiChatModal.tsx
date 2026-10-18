'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useToast } from '@/components/ui/Toast';
import { SoundEngine } from '@/components/ui/SoundEngine';
import { WebIcon } from '@/components/ui/WebIcon';

export interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
  action?: {
    label: string;
    pageIndex: number;
  };
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
  const [showVoiceSelect, setShowVoiceSelect] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [activeCategory, setActiveCategory] = useState<QuestionCategory | null>(null);
  const [isAssembling, setIsAssembling] = useState<boolean>(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Kích hoạt hiệu ứng các ô vuông bung ra và từ từ tập hợp thành popup
  useEffect(() => {
    if (isOpen) {
      setIsAssembling(true);
      const timer = setTimeout(() => {
        setIsAssembling(false);
      }, 750);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Close question menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsMenuOpen(false);
        setActiveCategory(null);
      }
    };
    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  // Load available speech voices
  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    const updateVoices = () => {
      const availVoices = window.speechSynthesis.getVoices();
      setVoices(availVoices);

      // Prefer Vietnamese voice or Google/Microsoft natural voice
      const viVoice = availVoices.find((v) => v.lang.includes('vi') || v.lang.includes('VI'));
      if (viVoice) {
        setSelectedVoiceURI(viVoice.voiceURI);
      } else if (availVoices.length > 0 && !selectedVoiceURI) {
        setSelectedVoiceURI(availVoices[0].voiceURI);
      }
    };

    updateVoices();
    window.speechSynthesis.onvoiceschanged = updateVoices;
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

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
    utterance.lang = 'vi-VN';
    utterance.rate = 1.0;
    utterance.pitch = 1.05;

    if (selectedVoiceURI) {
      const chosen = voices.find((v) => v.voiceURI === selectedVoiceURI);
      if (chosen) utterance.voice = chosen;
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
        text: 'Anh Hùng Thái sở hữu nền tảng học vấn vững chắc với **14 chương trình đào tạo & chứng chỉ chuyên ngành cấp cao**:\n\n• Cử nhân Công nghệ Thông tin & Quản trị Kinh doanh.\n• Chứng chỉ Quản trị Dịch vụ Khách hàng Quốc tế.\n• Các chứng chỉ Quản trị Hệ thống Microsoft, ITIL, Agile & Scrum.',
        action: { label: 'Xem Học Vấn & Chứng Chỉ (Trang 3)', pageIndex: 3 },
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
    }, 700);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend();
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
      {/* Hiệu ứng các ô vuông ma trận bung ra và từ từ tập hợp thành popup */}
      {isAssembling && !isMinimized && (
        <div className="absolute inset-0 pointer-events-none z-50 overflow-visible">
          {Array.from({ length: 16 }).map((_, idx) => {
            const row = Math.floor(idx / 4);
            const col = idx % 4;
            const tx = (col - 1.5) * 85 + Math.sin(idx * 2) * 40;
            const ty = (row - 1.5) * 105 + Math.cos(idx * 2) * 40;
            const rot = (idx % 2 === 0 ? 1 : -1) * (18 + ((idx * 7) % 30));
            return (
              <div
                key={idx}
                className="ai-tile-matrix-particle"
                style={
                  {
                    top: `${row * 25}%`,
                    left: `${col * 25}%`,
                    width: '24%',
                    height: '24%',
                    animationDelay: `${idx * 22}ms`,
                    '--tx': `${tx}px`,
                    '--ty': `${ty}px`,
                    '--rot': `${rot}deg`,
                  } as React.CSSProperties
                }
              />
            );
          })}
        </div>
      )}

      {/* Cửa sổ Chat Glassmorphism */}
      <div
        className={`w-[92vw] sm:w-[410px] rounded-3xl glass-panel shadow-2xl border-2 border-white/90 backdrop-blur-2xl transition-all duration-300 flex flex-col overflow-hidden ai-modal-assemble ${
          isMinimized ? 'h-[62px]' : 'h-[580px] max-h-[85vh]'
        }`}
        style={{
          boxShadow: '0 25px 60px -15px rgba(99, 102, 241, 0.4), 0 0 30px rgba(139, 92, 246, 0.25)',
        }}
      >
        {/* Header Thanh Tiêu Đề - Nền trong suốt 100% (bg-transparent) */}
        <div className="p-3.5 sm:p-4 bg-transparent text-slate-800 flex items-center justify-between relative border-b border-white/40">
          <div className="flex items-center gap-2.5 relative z-10">
            {/* Avatar Tí Chuột AI */}
            <div className="relative">
              <img
                src="https://i.ibb.co/Hfhyt1Dg/Avata-Ti-Chuot-GIF.gif"
                alt="Avatar Tí Chuột AI"
                className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-md bg-white/20"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    'https://placehold.co/100x100/8b5cf6/ffffff?text=AI';
                }}
              />
              <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-400 border-2 border-white animate-pulse" />
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <h4 className="text-sm font-black font-play tracking-tight leading-none text-slate-900 drop-shadow-xs">
                  Tí Chuột AI
                </h4>
                <span className="text-[9.5px] font-bold px-1.5 py-0.2 rounded-full bg-pink-500/90 text-white border border-white/50 shadow-2xs">
                  Assistant
                </span>
              </div>
              <span className="text-[11px] text-slate-600 font-semibold flex items-center gap-1 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                Trực tuyến • Sẵn sàng hỗ trợ
              </span>
            </div>
          </div>

          {/* Cụm nút điều khiển cửa sổ + Nút Giọng Nói & Speak */}
          <div className="flex items-center gap-1.5 relative z-10">
            {/* Nút Chọn Giọng Nói AI */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowVoiceSelect(!showVoiceSelect)}
                title="Chọn giọng nói AI"
                className="px-2.5 py-1 rounded-full bg-white/70 hover:bg-white text-indigo-700 border border-indigo-200/80 shadow-2xs text-[10.5px] font-bold flex items-center gap-1 transition cursor-pointer"
              >
                <svg className="w-3.5 h-3.5 text-indigo-600" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 003-3V5a3 3 0 10-6 0v6a3 3 0 003 3z" />
                </svg>
                <span className="hidden sm:inline">Giọng nói</span>
              </button>

              {/* Menu Danh Sách Giọng Nói */}
              {showVoiceSelect && (
                <div className="absolute right-0 top-8 mt-1 w-64 max-h-56 overflow-y-auto no-scrollbar rounded-2xl bg-white/95 backdrop-blur-xl border border-slate-200 shadow-2xl p-2 z-50 flex flex-col gap-1 text-left">
                  <div className="px-2 py-1 text-[10px] font-black uppercase text-slate-400 tracking-wider border-b border-slate-100 flex items-center justify-between">
                    <span>Chọn giọng đọc AI</span>
                    <button
                      type="button"
                      onClick={() => setShowVoiceSelect(false)}
                      className="text-slate-400 hover:text-slate-700 text-xs cursor-pointer"
                    >
                      ✕
                    </button>
                  </div>
                  {voices.length === 0 ? (
                    <span className="p-2 text-xs text-slate-500 italic">Đang tải danh sách giọng nói...</span>
                  ) : (
                    voices.map((v) => {
                      const isChosen = v.voiceURI === selectedVoiceURI;
                      const isVi = v.lang.includes('vi') || v.lang.includes('VI');
                      return (
                        <button
                          key={v.voiceURI}
                          type="button"
                          onClick={() => {
                            setSelectedVoiceURI(v.voiceURI);
                            setShowVoiceSelect(false);
                            showToast(`Đã chọn giọng: ${v.name}`);
                          }}
                          className={`w-full text-left p-1.5 px-2 rounded-xl text-xs transition cursor-pointer flex items-center justify-between gap-1.5 ${
                            isChosen
                              ? 'bg-indigo-50 text-indigo-700 font-bold border border-indigo-200'
                              : 'hover:bg-slate-100 text-slate-700 font-medium'
                          }`}
                        >
                          <div className="min-w-0 flex-1 truncate">
                            <span className="block truncate leading-tight">{v.name}</span>
                            <span className="text-[9.5px] text-slate-400 block font-mono">{v.lang}</span>
                          </div>
                          {isVi && (
                            <span className="px-1.5 py-0.2 rounded-md bg-emerald-100 text-emerald-700 text-[9px] font-black shrink-0">
                              VN
                            </span>
                          )}
                        </button>
                      );
                    })
                  )}
                </div>
              )}
            </div>

            {/* Nút Làm Mới */}
            <button
              type="button"
              onClick={handleClearChat}
              title="Làm mới cuộc trò chuyện"
              className="w-7 h-7 rounded-full bg-white/70 hover:bg-white text-slate-700 hover:text-indigo-600 border border-slate-200/80 shadow-2xs flex items-center justify-center transition cursor-pointer text-xs"
            >
              <WebIcon name="sync" className="w-3.5 h-3.5" />
            </button>

            {/* Nút Thu nhỏ / Phóng to */}
            <button
              type="button"
              onClick={() => setIsMinimized(!isMinimized)}
              title={isMinimized ? 'Mở rộng cửa sổ' : 'Thu nhỏ cửa sổ'}
              className="w-7 h-7 rounded-full bg-white/70 hover:bg-white text-slate-700 hover:text-indigo-600 border border-slate-200/80 shadow-2xs flex items-center justify-center transition cursor-pointer text-xs font-bold"
            >
              {isMinimized ? '□' : '–'}
            </button>

            {/* Nút Đóng */}
            <button
              type="button"
              onClick={onClose}
              title="Đóng trợ lý AI"
              className="w-7 h-7 rounded-full bg-white/70 hover:bg-rose-500 hover:text-white text-slate-700 border border-slate-200/80 shadow-2xs flex items-center justify-center transition cursor-pointer text-xs font-bold"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Thân Chat & Lịch Sử Tin Nhắn */}
        {!isMinimized && (
          <>
            <div className="flex-1 p-3.5 sm:p-4 overflow-y-auto no-scrollbar flex flex-col gap-3.5 text-left text-xs bg-white/40 backdrop-blur-md">
              {/* Tin nhắn danh sách */}
              {messages.map((msg) => {
                const isThisSpeaking = isSpeaking && currentSpeakingId === msg.id;

                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col gap-1 max-w-[90%] ${
                      msg.sender === 'user' ? 'self-end items-end' : 'self-start items-start'
                    }`}
                  >
                    <div
                      className={`p-3 rounded-2xl shadow-sm text-xs leading-relaxed whitespace-pre-wrap select-text relative group ${
                        msg.sender === 'user'
                          ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white rounded-br-none shadow-indigo-500/20 font-medium'
                          : 'bg-white/90 border border-slate-200/90 text-slate-800 rounded-bl-none shadow-slate-300/40'
                      }`}
                    >
                      {/* Render text with basic bold formatting */}
                      <div
                        dangerouslySetInnerHTML={{
                          __html: msg.text
                            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                            .replace(/\n/g, '<br/>'),
                        }}
                      />

                      {/* Nút Speak để phát âm thanh lời nói */}
                      {msg.sender === 'ai' && (
                        <div className="mt-2 pt-1.5 border-t border-slate-100 flex items-center justify-between gap-2">
                          <button
                            type="button"
                            onClick={() => handleSpeak(msg.text, msg.id)}
                            title={isThisSpeaking ? 'Dừng đọc' : 'Phát âm thanh lời nói (Speak)'}
                            className={`px-2.5 py-1 rounded-full text-[10.5px] font-bold flex items-center gap-1 transition-all cursor-pointer shadow-2xs ${
                              isThisSpeaking
                                ? 'bg-rose-500 text-white animate-pulse'
                                : 'bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200'
                            }`}
                          >
                            <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                            </svg>
                            <span>{isThisSpeaking ? 'Dừng đọc' : 'Phát giọng đọc'}</span>
                          </button>

                          <span className="text-[9.5px] text-slate-400 font-mono">
                            {msg.timestamp}
                          </span>
                        </div>
                      )}

                      {/* Nút điều hướng đính kèm nếu có */}
                      {msg.action && (
                        <button
                          type="button"
                          onClick={() => handleActionClick(msg.action!.pageIndex, msg.action!.label)}
                          className="mt-2 w-full py-1.5 px-3 rounded-xl bg-gradient-to-r from-fuchsia-600 to-indigo-600 hover:from-fuchsia-700 hover:to-indigo-700 text-white font-bold text-[11px] shadow-sm flex items-center justify-center gap-1.5 transition active:scale-95 cursor-pointer"
                        >
                          <span>{msg.action.label}</span>
                          <span>→</span>
                        </button>
                      )}
                    </div>
                    {msg.sender === 'user' && (
                      <span className="text-[10px] text-slate-400 font-mono px-1">
                        {msg.timestamp}
                      </span>
                    )}
                  </div>
                );
              })}

              {/* Typing indicator */}
              {isTyping && (
                <div className="self-start flex items-center gap-2 p-2.5 px-3.5 rounded-2xl bg-white/80 border border-slate-200 text-slate-500 text-xs">
                  <span className="w-2 h-2 rounded-full bg-violet-500 animate-ping" />
                  <span className="font-semibold italic">Tí Chuột AI đang soạn câu trả lời...</span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Gợi ý câu hỏi nhanh (Quick Question Chips) */}
            <div className="px-3 py-2 bg-slate-50/80 border-t border-slate-200/80 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              {SUGGESTED_QUESTIONS.map((item, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSend(item.query)}
                  className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-white hover:bg-violet-50 text-slate-700 hover:text-violet-700 border border-slate-200 shadow-2xs whitespace-nowrap transition cursor-pointer shrink-0 flex items-center gap-1.5"
                >
                  <WebIcon name={item.icon} className="w-3.5 h-3.5 text-violet-600" />
                  <span>{item.label}</span>
                </button>
              ))}
            </div>

            {/* Input Bar Nhập Tin Nhắn */}
            <div className="p-3 bg-white/95 border-t border-slate-200/90 flex items-center gap-2 relative">
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
                      ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white border-violet-600 shadow-violet-500/30'
                      : 'bg-white hover:bg-violet-50 text-violet-700 border-violet-200 hover:border-violet-300'
                  }`}
                >
                  <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                  </svg>
                  <span className="text-[11px] font-bold">Menu</span>
                </button>

                {/* Popup Menu 6 Mục & Chi Tiết Câu Hỏi */}
                {isMenuOpen && (
                  <div
                    className="absolute bottom-11 left-0 w-[300px] sm:w-[350px] max-h-[380px] bg-white/98 backdrop-blur-2xl rounded-2xl border border-violet-200/90 shadow-2xl p-2.5 z-50 flex flex-col gap-2 select-none animate-in fade-in zoom-in-95 duration-150 overflow-hidden"
                    style={{
                      boxShadow: '0 20px 45px -10px rgba(99, 102, 241, 0.35), 0 0 0 1px rgba(139, 92, 246, 0.15)',
                    }}
                  >
                    {/* Header của Popup */}
                    <div className="flex items-center justify-between pb-2 border-b border-slate-100 px-1">
                      {activeCategory ? (
                        <button
                          type="button"
                          onClick={() => setActiveCategory(null)}
                          className="flex items-center gap-1 text-xs font-bold text-violet-700 hover:text-violet-900 transition cursor-pointer"
                        >
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                          </svg>
                          <span>Quay lại 6 danh mục</span>
                        </button>
                      ) : (
                        <div className="flex items-center gap-1.5 text-xs font-black text-slate-800">
                          <span className="w-5 h-5 rounded-md bg-violet-100 text-violet-700 flex items-center justify-center text-[11px]">
                            ✦
                          </span>
                          <span>Danh Mục 6 Nhóm Câu Hỏi</span>
                        </div>
                      )}

                      <button
                        type="button"
                        onClick={() => {
                          setIsMenuOpen(false);
                          setActiveCategory(null);
                        }}
                        className="w-5 h-5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center text-xs cursor-pointer"
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
                            className="w-full p-2 px-2.5 rounded-xl border border-slate-100 hover:border-violet-300 bg-slate-50/70 hover:bg-violet-50/70 text-left transition flex items-center justify-between gap-2.5 group cursor-pointer"
                          >
                            <div className="flex items-center gap-2.5 min-w-0 flex-1">
                              <div
                                className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 shadow-2xs"
                                style={{ background: `${cat.color}18`, color: cat.color }}
                              >
                                <WebIcon name={cat.icon} className="w-4 h-4" />
                              </div>
                              <div className="min-w-0 flex-1">
                                <div className="text-[11.5px] font-bold text-slate-800 group-hover:text-violet-700 truncate leading-tight">
                                  {idx + 1}. {cat.title}
                                </div>
                                <div className="text-[10px] text-slate-500 truncate leading-tight mt-0.5">
                                  {cat.shortDesc}
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-1 shrink-0">
                              <span className={`text-[9.5px] font-bold px-1.5 py-0.5 rounded-md ${cat.badgeBg} ${cat.badgeText}`}>
                                {cat.questions.length} câu
                              </span>
                              <svg className="w-3.5 h-3.5 text-slate-400 group-hover:text-violet-600 group-hover:translate-x-0.5 transition" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                              </svg>
                            </div>
                          </button>
                        ))
                      ) : (
                        // DANH SÁCH CÂU HỎI TRONG MỤC
                        <div className="flex flex-col gap-1.5 animate-in fade-in duration-150">
                          <div className="px-1 py-0.5 text-[10.5px] font-bold text-slate-500 uppercase tracking-wide flex items-center justify-between">
                            <span>Chọn câu hỏi để gửi:</span>
                            <span className="text-[10px] font-semibold text-violet-600">Nhấp để hỏi ngay</span>
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
                              className="w-full p-2.5 rounded-xl border border-violet-100 hover:border-violet-400 bg-white hover:bg-violet-50 text-left transition text-xs font-semibold text-slate-800 hover:text-violet-700 flex items-start gap-2 shadow-2xs group cursor-pointer"
                            >
                              <span className="w-4 h-4 rounded-full bg-violet-100 text-violet-600 flex items-center justify-center text-[10px] font-black shrink-0 mt-0.5 group-hover:bg-violet-600 group-hover:text-white transition">
                                ?
                              </span>
                              <span className="flex-1 leading-snug">{qItem}</span>
                              <svg className="w-3.5 h-3.5 text-slate-300 group-hover:text-violet-600 group-hover:translate-x-0.5 transition shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
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

              {/* Input Box */}
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Nhập câu hỏi hoặc chọn từ Menu..."
                className="flex-1 px-3.5 py-2 rounded-full text-xs bg-slate-100/90 border border-slate-300 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500/50 shadow-inner"
              />
              <button
                type="button"
                onClick={() => handleSend()}
                disabled={!inputVal.trim()}
                title="Gửi tin nhắn"
                className={`w-9 h-9 rounded-full flex items-center justify-center transition shadow-md shrink-0 ${
                  inputVal.trim()
                    ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white hover:scale-105 active:scale-95 cursor-pointer shadow-violet-500/30'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                <svg className="w-4 h-4 translate-x-0.5" fill="none" stroke="currentColor" strokeWidth="2.4" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                </svg>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
