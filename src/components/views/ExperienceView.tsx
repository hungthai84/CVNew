'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { findBestVoice } from '@/utils/speechVoice';
import {
  RadioTower,
  Users,
  TrendingUp,
  Monitor,
  Factory,
  Smartphone,
  Megaphone,
  ClipboardCheck,
  ChevronsRight,
  ArrowRight,
  ArrowLeft,
  Camera,
  Briefcase,
  ShieldCheck,
  Headphones,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Sparkles,
  SkipForward,
  SkipBack,
  X,
  Calendar,
  User,
  Award,
  FileText,
  Headset,
  PhoneCall,
  BarChart2,
  Settings,
  Target,
  Shield,
  MessageCircle,
  Scale,
  GraduationCap,
  Rocket,
  BookOpen,
  Zap,
  Check,
  CheckCircle2,
  Globe,
  RefreshCw,
  Leaf,
  Star,
  FolderOpen,
  Gamepad2,
  ShoppingCart,
  Wallet,
  HeartHandshake,
  UserCheck,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { EXPERIENCE_MILESTONES } from '@/data/experience';
import { useToast } from '@/components/ui/Toast';
import { WebIcon } from '@/components/ui/WebIcon';
import { LivingBentoJobGrid } from '@/components/ui/LivingBentoJobGrid';
import { formatCardTitle } from '@/lib/utils';
import { getCategoryTheme } from '@/utils/categoryTheme';
import { GlassmorphicIconFrame } from '@/components/ui/GlassmorphicIconFrame';

const STORY_KEYS = ['2003', '2007', '2011', '2013', '2016', '2018', '2023', '2026'];

const STORY_NARRATIONS: Record<
  string,
  {
    title: string;
    stage: string;
    summary: string;
    voiceScript: string;
    highlightKpis: string[];
  }
> = {
  '2003': {
    title: 'MobiFone',
    stage: 'Nền Tảng Đầu Tiên: Chăm Sóc Khách Hàng Viễn Thông Di Động',
    summary: 'Khởi đầu sự nghiệp tại MobiFone, rèn luyện sự thấu hiểu tâm lý khách hàng, giao tiếp chuẩn mực và kỷ luật nghiệp vụ viễn thông.',
    voiceScript: 'Năm 2003, khởi đầu sự nghiệp tại MobiFone, phục vụ khách hàng mạng di động với chuẩn mực tận tâm.',
    highlightKpis: ['CSAT 98.2%', '12 Nhân sự', 'Xử lý đa nghiệp vụ'],
  },
  '2007': {
    title: 'Viễn Liên V247',
    stage: 'Bước Đệm Giám Sát: Lãnh Đạo Đội Ngũ Dịch Vụ Quốc Tế',
    summary: 'Thăng tiến lên Trưởng nhóm CSKH / Supervisor, phụ trách phân luồng cuộc gọi viễn thông quốc tế và đào tạo nhân viên mới.',
    voiceScript: 'Năm 2007, thăng tiến lên Trưởng nhóm CSKH tại Viễn Liên V247, tối ưu chất lượng phục vụ cước viễn thông quốc tế.',
    highlightKpis: ['SLA 98.6%', '12 Nhân sự', 'Giám sát vận hành'],
  },
  '2011': {
    title: 'LBC - HTVC',
    stage: 'Mở Rộng Quy Mô Đa Kênh: Truyền Hình & Internet Băng Thông Rộng',
    summary: 'Trưởng Phòng CSKH điều hành dịch vụ truyền hình cáp HTVC và viễn thông LBC, nâng cao tỷ lệ giải quyết khiếu nại tại chỗ.',
    voiceScript: 'Năm 2011, đảm nhiệm Trưởng Phòng CSKH tại LBC - HTVC, quản trị dịch vụ truyền hình và internet đa kênh.',
    highlightKpis: ['Giải quyết 95% khiếu nại', '12 Nhân sự', 'Hạ tầng đa dịch vụ'],
  },
  '2013': {
    title: 'VED (Garena / Shopee / AirPay)',
    stage: 'Bứt Phá Đỉnh Cao: Xây Dựng & Vận Hành Khối CSKH 130 Nhân Sự',
    summary: 'Kiến tạo và chỉ huy toàn diện trung tâm Contact Center quy mô 130 nhân sự, phục vụ triệu game thủ và người dùng TMĐT/Ví điện tử, xác lập kỷ lục CSAT 98.2%.',
    voiceScript: 'Năm 2013, bứt phá tại VED và Garena, lãnh đạo trung tâm CSKH 130 nhân sự, đạt CSAT 98.2%.',
    highlightKpis: ['CSAT 98.2%', 'SLA 98.6%', '130 Nhân sự VED'],
  },
  '2016': {
    title: 'Prudential Việt Nam',
    stage: 'Chuẩn Hóa Tài Chính - Bảo Hiểm: Kỷ Luật Tuân Thủ & Vận Hành Call Center',
    summary: 'Trưởng Phòng CallCenter Prudential, thiết lập quy trình kiểm soát chất lượng QA/QC nghiêm ngặt theo tiêu chuẩn tập đoàn tài chính đa quốc gia.',
    voiceScript: 'Năm 2016, Trưởng Phòng CallCenter Prudential, thiết lập quy chuẩn vận hành tài chính và bảo hiểm nghiêm ngặt.',
    highlightKpis: ['SLA 98.6%', 'QA/QC 96%', '12 Nhân sự'],
  },
  '2018': {
    title: 'Ví MoMo',
    stage: 'Kỷ Nguyên FinTech: Đồng Hành Cùng Siêu Ứng Dụng Hàng Chục Triệu Khách Hàng',
    summary: 'Trưởng Phòng CSKH MoMo, dẫn dắt đội ngũ hỗ trợ giao dịch số thời kỳ tăng trưởng nóng, ứng dụng tự động hóa giảm thời gian chờ.',
    voiceScript: 'Năm 2018, Trưởng Phòng CSKH Ví MoMo, đồng hành cùng sự tăng trưởng thần tốc của siêu ứng dụng thanh toán.',
    highlightKpis: ['FCR 91%', 'Triệu GD/ngày', 'FinTech SuperApp'],
  },
  '2023': {
    title: 'Finviet (ECO SCC)',
    stage: 'Số Hóa B2B: Vận Hành Hệ Sinh Thái Chợ Số & Chuỗi Bán Lẻ Toàn Quốc',
    summary: 'Trưởng Phòng Vận hành CSKH Finviet, số hóa hỗ trợ hơn 100.000 điểm tạp hóa và đại lý bán lẻ trên nền tảng chuỗi cung ứng ECO.',
    voiceScript: 'Năm 2023, Trưởng Phòng Vận hành CSKH Finviet, số hóa hệ thống chăm sóc mạng lưới đối tác tạp hóa và điểm bán lẻ.',
    highlightKpis: ['100.000+ Điểm bán', 'CSAT 95%', 'Hệ sinh thái B2B'],
  },
  '2026': {
    title: 'Chiến Lược CX 2026+',
    stage: 'Tầm Nhìn Giám Đốc Trải Nghiệm Khách Hàng (CX Director)',
    summary: 'Định hình chiến lược CX toàn diện: Lấy khách hàng làm trọng tâm, tích hợp AI Agents, CRM chuyên sâu và phát triển văn hóa dịch vụ phụng sự xuất sắc.',
    voiceScript: 'Năm 2026 trở đi, sẵn sàng cho cương vị Giám đốc Trải nghiệm Khách hàng, kiến tạo hệ thống dịch vụ lấy khách hàng làm trọng tâm.',
    highlightKpis: ['CX Director Vision', 'AI & CRM tích hợp', '100+ Nhân sự'],
  },
};

interface MilestoneCustomContent {
  bannerTitle: string;
  bannerDesc: string;
  gradient: string;
  pillars: Array<{ title: string; desc: string; icon: React.ComponentType<{ className?: string }>; color: string; bg: string }>;
  commitments: Array<{ title: string; desc: string }>;
}

const MILESTONE_CUSTOM_CONTENT: Record<string, MilestoneCustomContent> = {
  '2003': {
    bannerTitle: 'Tiên phong viễn thông di động<br />Chuẩn mực dịch vụ khách hàng',
    bannerDesc: 'Khởi đầu sự nghiệp với nền tảng quy trình viễn thông nghiêm ngặt, rèn luyện kỹ năng lắng nghe, thấu cảm và giải quyết khiếu nại cước đa kênh.',
    gradient: 'from-blue-700 via-blue-600 to-sky-700',
    pillars: [
      { title: 'Nền tảng CSKH Viễn Thông', desc: 'Đào tạo bài bản nghiệp vụ tổng đài di động', icon: UserCheck, color: 'text-rose-600 dark:text-rose-300', bg: 'bg-rose-100 dark:bg-rose-900/60' },
      { title: 'Quản lý Hotline 24/7', desc: 'Tiếp nhận và tư vấn cước viễn thông liên tục', icon: Headset, color: 'text-blue-600 dark:text-blue-300', bg: 'bg-blue-100 dark:bg-blue-900/60' },
      { title: 'Xử lý khiếu nại FCR', desc: 'Giải quyết triệt để ngay cuộc gọi đầu tiên', icon: ShieldCheck, color: 'text-emerald-600 dark:text-emerald-300', bg: 'bg-emerald-100 dark:bg-emerald-900/60' },
      { title: 'Đào tạo & Kèm cặp', desc: 'Huấn luyện thế hệ nhân sự mới chuẩn SOP', icon: HeartHandshake, color: 'text-purple-600 dark:text-purple-300', bg: 'bg-purple-100 dark:bg-purple-900/60' },
    ],
    commitments: [
      { title: 'Cam kết chất lượng', desc: 'Giải quyết khiếu nại cước di động lần đầu (FCR) đạt > 89%.' },
      { title: 'Quy chuẩn nghiệp vụ', desc: 'Tuân thủ nghiêm ngặt quy trình CSKH viễn thông di động quốc gia.' },
    ],
  },
  '2007': {
    bannerTitle: 'Kết nối kiều bào toàn cầu<br />Vận hành tổng đài quốc tế 24/7',
    bannerDesc: 'Quản lý ca trực Call Center quốc tế đa múi giờ Hoa Kỳ - Việt Nam, nâng tỷ lệ FCR từ 74% lên 89% và giảm 30% thời gian chờ đợi của khách hàng.',
    gradient: 'from-purple-800 via-purple-700 to-indigo-800',
    pillars: [
      { title: 'Giám sát Call Center', desc: 'Quản lý vận hành ca trực đa múi giờ Hoa Kỳ', icon: UserCheck, color: 'text-rose-600 dark:text-rose-300', bg: 'bg-rose-100 dark:bg-rose-900/60' },
      { title: 'Chuẩn hóa tài liệu SOP', desc: 'Biên soạn bộ quy trình chăm sóc đa kênh', icon: Headset, color: 'text-blue-600 dark:text-blue-300', bg: 'bg-blue-100 dark:bg-blue-900/60' },
      { title: 'Cam kết SLA > 98%', desc: 'Kiểm soát chất lượng ghi âm và phản hồi nhanh', icon: ShieldCheck, color: 'text-emerald-600 dark:text-emerald-300', bg: 'bg-emerald-100 dark:bg-emerald-900/60' },
      { title: 'Coaching & Đào tạo', desc: 'Huấn luyện chuẩn mực giao tiếp quốc tế chuyên nghiệp', icon: HeartHandshake, color: 'text-purple-600 dark:text-purple-300', bg: 'bg-purple-100 dark:bg-purple-900/60' },
    ],
    commitments: [
      { title: 'Cam kết chất lượng', desc: 'Đảm bảo hoạt động tổng đài viễn thông quốc tế 24/7 không gián đoạn.' },
      { title: 'Chất lượng thoại kiều bào', desc: 'Tối ưu chất lượng kết nối và kiểm soát cước quốc tế minh bạch.' },
    ],
  },
  '2011': {
    bannerTitle: 'Truyền hình & Băng rộng số<br />Nâng tầm trải nghiệm giải trí gia đình',
    bannerDesc: 'Chuẩn hóa quy trình chăm sóc khách hàng truyền hình cáp HTVC và internet băng rộng, phối hợp xử lý sự cố kỹ thuật hiện trường 24/7.',
    gradient: 'from-emerald-800 via-emerald-700 to-teal-800',
    pillars: [
      { title: 'Lãnh đạo phòng ban CSKH', desc: 'Quản trị toàn diện hoạt động phòng dịch vụ khách hàng', icon: UserCheck, color: 'text-rose-600 dark:text-rose-300', bg: 'bg-rose-100 dark:bg-rose-900/60' },
      { title: 'Phối hợp kỹ thuật hiện trường', desc: 'Điều phối xử lý sự cố tín hiệu truyền hình cáp', icon: Headset, color: 'text-blue-600 dark:text-blue-300', bg: 'bg-blue-100 dark:bg-blue-900/60' },
      { title: 'Quản trị thuê bao CRM', desc: 'Kiểm soát dữ liệu và tối ưu thời gian phản hồi', icon: ShieldCheck, color: 'text-emerald-600 dark:text-emerald-300', bg: 'bg-emerald-100 dark:bg-emerald-900/60' },
      { title: 'Gắn kết khách hàng', desc: 'Duy trì tỷ lệ gia hạn thuê bao và hài lòng dịch vụ', icon: HeartHandshake, color: 'text-purple-600 dark:text-purple-300', bg: 'bg-purple-100 dark:bg-purple-900/60' },
    ],
    commitments: [
      { title: 'Cam kết chất lượng', desc: 'Tối ưu quy trình tiếp nhận và phân bổ xử lý sự cố kỹ thuật truyền hình.' },
      { title: 'Trải nghiệm thuê bao', desc: 'Đảm bảo tín hiệu truyền hình cáp và internet ổn định cho các hộ gia đình.' },
    ],
  },
  '2013': {
    bannerTitle: 'Kết nối cộng đồng<br />Kiến tạo giá trị bền vững',
    bannerDesc: 'Với thế mạnh trong lĩnh vực eSports, Thương mại điện tử và Dịch vụ số, VED mang đến những trải nghiệm vượt trội cho hàng triệu người dùng Việt Nam.',
    gradient: 'from-blue-700 via-blue-600 to-indigo-800',
    pillars: [
      { title: 'Xây dựng đội ngũ CSKH', desc: 'với tinh thần phục vụ khách hàng', icon: UserCheck, color: 'text-rose-600 dark:text-rose-300', bg: 'bg-rose-100 dark:bg-rose-900/60' },
      { title: 'Vận hành Contact Center', desc: 'chuẩn quy mô 200 – 500+ nhân sự', icon: Headset, color: 'text-blue-600 dark:text-blue-300', bg: 'bg-blue-100 dark:bg-blue-900/60' },
      { title: 'Phát triển hệ sinh thái', desc: 'eSports – TMĐT – Ví điện tử', icon: ShieldCheck, color: 'text-emerald-600 dark:text-emerald-300', bg: 'bg-emerald-100 dark:bg-emerald-900/60' },
      { title: 'Đóng góp cộng đồng', desc: 'Game thủ & người dùng Việt Nam', icon: HeartHandshake, color: 'text-purple-600 dark:text-purple-300', bg: 'bg-purple-100 dark:bg-purple-900/60' },
    ],
    commitments: [
      { title: 'Cam kết chất lượng', desc: 'Đảm bảo các chỉ số phản hồi Ticket/Chat đạt chuẩn > 90%, 80.000 ticket/ngày.' },
      { title: 'Bảo mật tài khoản người dùng', desc: 'Xử lý sự cố, bảo vệ tài khoản, hạn chế rủi ro gian lận.' },
    ],
  },
  '2016': {
    bannerTitle: 'Tận tâm bảo vệ tương lai<br />Chuẩn mực dịch vụ bảo hiểm quốc tế',
    bannerDesc: 'Chỉ huy trung tâm CallCenter giải quyết quyền lợi bảo hiểm PruLife, nâng cao chỉ số NPS và đảm bảo tính nhân văn trong từng tương tác khách hàng.',
    gradient: 'from-rose-800 via-red-700 to-rose-900',
    pillars: [
      { title: 'Quản lý CallCenter Bảo Hiểm', desc: 'Dẫn dắt đội ngũ tư vấn viên chuẩn mực quốc tế', icon: UserCheck, color: 'text-rose-600 dark:text-rose-300', bg: 'bg-rose-100 dark:bg-rose-900/60' },
      { title: 'Giải quyết quyền lợi', desc: 'Xử lý bồi thường và thủ tục hợp đồng minh bạch', icon: Headset, color: 'text-blue-600 dark:text-blue-300', bg: 'bg-blue-100 dark:bg-blue-900/60' },
      { title: 'Đo lường NPS & CSAT', desc: 'Duy trì chỉ số hài lòng khắt khe từ tập đoàn Prudential', icon: ShieldCheck, color: 'text-emerald-600 dark:text-emerald-300', bg: 'bg-emerald-100 dark:bg-emerald-900/60' },
      { title: 'Văn hóa thấu cảm', desc: 'Đặt sự an tâm của khách hàng lên vị trí ưu tiên hàng đầu', icon: HeartHandshake, color: 'text-purple-600 dark:text-purple-300', bg: 'bg-purple-100 dark:bg-purple-900/60' },
    ],
    commitments: [
      { title: 'Cam kết chất lượng', desc: 'Tỷ lệ tiếp nhận cuộc gọi CallCenter đạt 95%, đo lường NPS chặt chẽ.' },
      { title: 'Bảo mật thông tin hợp đồng', desc: 'Tuân thủ quy định bảo mật thông tin bảo hiểm nhân thọ quốc tế.' },
    ],
  },
  '2018': {
    bannerTitle: 'Kiến tạo trải nghiệm tài chính số<br />Phục vụ 31 Triệu+ người dùng',
    bannerDesc: 'Dẫn dắt trung tâm CSKH 60+ nhân sự, tối ưu hóa tỷ lệ SLA 98.6% và CSAT 98.2%, phục vụ thanh toán không tiền mặt cho hàng triệu người tiêu dùng.',
    gradient: 'from-pink-700 via-rose-600 to-purple-800',
    pillars: [
      { title: 'Chăm sóc 31M+ Người dùng', desc: 'Quản lý trung tâm CSKH Ví MoMo 60 nhân sự', icon: UserCheck, color: 'text-rose-600 dark:text-rose-300', bg: 'bg-rose-100 dark:bg-rose-900/60' },
      { title: 'SLA 98.6% & CSAT 98.2%', desc: 'Chỉ số đo lường dịch vụ hàng đầu ngành FinTech', icon: Headset, color: 'text-blue-600 dark:text-blue-300', bg: 'bg-blue-100 dark:bg-blue-900/60' },
      { title: 'Bảo mật giao dịch số', desc: 'Kiểm soát rủi ro gian lận và tra soát tiền tệ 24/7', icon: ShieldCheck, color: 'text-emerald-600 dark:text-emerald-300', bg: 'bg-emerald-100 dark:bg-emerald-900/60' },
      { title: 'Chuyển đổi số thanh toán', desc: 'Thúc đẩy lối sống không tiền mặt tiện lợi tại VN', icon: HeartHandshake, color: 'text-purple-600 dark:text-purple-300', bg: 'bg-purple-100 dark:bg-purple-900/60' },
    ],
    commitments: [
      { title: 'Cam kết chất lượng', desc: 'Duy trì SLA phản hồi đa kênh > 98.6%, CSAT đạt 98.2% trên 31M ví.' },
      { title: 'Bảo mật giao dịch tài chính', desc: 'Phòng chống gian lận, bảo vệ số dư và giải quyết tra soát giao dịch 24/7.' },
    ],
  },
  '2023': {
    bannerTitle: 'Chuyển đổi số thương mại truyền thống<br />Hệ sinh thái B2B FinTech & Chợ Số',
    bannerDesc: 'Xây dựng hệ thống CSKH số cho ECO SCC và Chợ Số Finviet, số hóa hàng chục ngàn đại lý tạp hóa truyền thống với quy trình chuẩn hóa cao.',
    gradient: 'from-amber-600 via-orange-600 to-yellow-700',
    pillars: [
      { title: 'Vận hành ECO SCC & Chợ Số', desc: 'Kết nối mạng lưới 30.000+ điểm bán lẻ tạp hóa', icon: UserCheck, color: 'text-rose-600 dark:text-rose-300', bg: 'bg-rose-100 dark:bg-rose-900/60' },
      { title: 'Xây dựng SOP FinTech B2B', desc: 'Quy chuẩn hóa quy trình phân phối và hoàn tiền', icon: Headset, color: 'text-blue-600 dark:text-blue-300', bg: 'bg-blue-100 dark:bg-blue-900/60' },
      { title: 'Tích hợp đa kênh Omnichannel', desc: 'Tổng đài, Zalo OA, Ticket đồng bộ thời gian thực', icon: ShieldCheck, color: 'text-emerald-600 dark:text-emerald-300', bg: 'bg-emerald-100 dark:bg-emerald-900/60' },
      { title: 'Đồng hành cùng tiểu thương', desc: 'Số hóa và tối ưu nguồn thu cho các đại lý bán lẻ', icon: HeartHandshake, color: 'text-purple-600 dark:text-purple-300', bg: 'bg-purple-100 dark:bg-purple-900/60' },
    ],
    commitments: [
      { title: 'Cam kết chất lượng', desc: 'Phục vụ mạng lưới 30.000+ điểm bán lẻ ECO SCC với thời gian giải quyết < 15 phút.' },
      { title: 'An toàn dữ liệu B2B', desc: 'Kiểm soát rủi ro luồng tiền ví điện tử và dòng hàng hóa trên Chợ Số.' },
    ],
  },
  '2026': {
    bannerTitle: 'Chiến lược CX toàn diện 2026+<br />Tích hợp AI Agents & Tự động hóa CRM',
    bannerDesc: 'Định hình kiến trúc trải nghiệm khách hàng tương lai, tích hợp AI Agents, CRM tự động hóa và phát triển văn hóa phụng sự lấy khách hàng làm trọng tâm.',
    gradient: 'from-blue-700 via-indigo-600 to-cyan-800',
    pillars: [
      { title: 'Chiến lược CX Toàn Diện', desc: 'Định vị trải nghiệm là lợi thế cạnh tranh cốt lõi', icon: UserCheck, color: 'text-rose-600 dark:text-rose-300', bg: 'bg-rose-100 dark:bg-rose-900/60' },
      { title: 'Tích hợp AI Agents & VoiceBot', desc: 'Tự động hóa 60% tác vụ và hỗ trợ tức thì 24/7', icon: Headset, color: 'text-blue-600 dark:text-blue-300', bg: 'bg-blue-100 dark:bg-blue-900/60' },
      { title: 'Kiến trúc tự động hóa CRM', desc: 'Đồng bộ hóa 12 phân hệ vận hành doanh nghiệp', icon: ShieldCheck, color: 'text-emerald-600 dark:text-emerald-300', bg: 'bg-emerald-100 dark:bg-emerald-900/60' },
      { title: 'Tối đa hóa giá trị CLV', desc: 'Gắn kết khách hàng dài hạn và tăng trưởng bền vững', icon: HeartHandshake, color: 'text-purple-600 dark:text-purple-300', bg: 'bg-purple-100 dark:bg-purple-900/60' },
    ],
    commitments: [
      { title: 'Cam kết chất lượng', desc: 'Ứng dụng AI CRM tự động hóa giúp giảm 40% thời gian xử lý yêu cầu khách hàng.' },
      { title: 'Chiến lược CX dẫn đầu', desc: 'Tối đa hóa giá trị vòng đời khách hàng (CLV) và gắn kết thương hiệu.' },
    ],
  },
};

export interface ExperienceViewProps {
  currentTheme?: string;
}

export const ExperienceView: React.FC<ExperienceViewProps> = ({ currentTheme = 'light-glass' }) => {
  const { showToast } = useToast();
  const [activeKey, setActiveKey] = useState<string>('2013');
  const [activeTab, setActiveTab] = useState<'history' | 'development'>('history');
  const [showJobCard, setShowJobCard] = useState<boolean>(false);
  const [hoveredMilestoneKey, setHoveredMilestoneKey] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [carouselSlideIdx, setCarouselSlideIdx] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [isPhotoLightboxOpen, setIsPhotoLightboxOpen] = useState<boolean>(false);
  const [featuredProdPage, setFeaturedProdPage] = useState<number>(0);

  // Tính năng 1: Panoramic History Slider
  const [sliderYearIndex, setSliderYearIndex] = useState<number>(3); // 2013 là mốc mặc định

  // Tính năng 5: Dual-Milestone Benchmark (So sánh 2 cột mốc sự nghiệp)
  const [benchmarkKeys, setBenchmarkKeys] = useState<string[]>([]);
  const [isBenchmarkModalOpen, setIsBenchmarkModalOpen] = useState<boolean>(false);

  const handleToggleBenchmark = (key: string) => {
    setBenchmarkKeys((prev) => {
      if (prev.includes(key)) {
        return prev.filter((k) => k !== key);
      }
      if (prev.length >= 2) {
        showToast('Đang đổi cột mốc so sánh thứ 2.');
        return [prev[0], key];
      }
      const next = [...prev, key];
      if (next.length === 2) {
        showToast('Đã chọn đủ 2 cột mốc! Bạn có thể mở Bảng So Sánh Đối Đầu.');
      } else {
        const found = roadmapCards.find((c: { key: string }) => c.key === key);
        showToast(`Đã chọn ${found?.shortName || key}. Chọn thêm 1 cột mốc nữa.`);
      }
      return next;
    });
  };

  const handleSliderChange = (newIdx: number) => {
    setSliderYearIndex(newIdx);
    const targetCard = filteredRoadmapCards[newIdx];
    if (targetCard) {
      handleSelectMilestone(targetCard.key);
      const cardEl = document.getElementById(`milestone-card-${targetCard.key}`);
      if (cardEl) {
        cardEl.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  };

  // 4 items per view pagination states & horizontal scroll effect
  const CARDS_PER_PAGE = 4;
  const [timelinePage, setTimelinePage] = useState<number>(0);
  const [isTimelineAutoScroll, setIsTimelineAutoScroll] = useState<boolean>(false);
  const horizontalTrackRef = useRef<HTMLDivElement>(null);

  const scrollHorizontal = (offset: number) => {
    if (horizontalTrackRef.current) {
      horizontalTrackRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  // Quản lý Giao diện Sáng (Light Glass) & Giao diện Tối (Dark Neon) đồng bộ 100%
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (currentTheme) {
      return currentTheme === 'dark-neon' || currentTheme === 'midnight-dark';
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

  // Auto-Play Career Story Mode states
  const [isStoryActive, setIsStoryActive] = useState<boolean>(false);
  const [storyIndex, setStoryIndex] = useState<number>(0);
  const [isStoryPaused, setIsStoryPaused] = useState<boolean>(false);
  const [storyProgress, setStoryProgress] = useState<number>(0);
  const [isVoiceEnabled, setIsVoiceEnabled] = useState<boolean>(true);
  const storyTimerRef = useRef<NodeJS.Timeout | null>(null);

  const activeMilestone = EXPERIENCE_MILESTONES[activeKey] || EXPERIENCE_MILESTONES['2013'];

  // Speech synthesis helpers
  const speakStoryScript = useCallback((script: string) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(script);
      utterance.lang = 'vi-VN';
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      const voices = window.speechSynthesis.getVoices();
      const chosenVoice = findBestVoice(voices);
      if (chosenVoice) utterance.voice = chosenVoice;
      window.speechSynthesis.speak(utterance);
    } catch {
      // Ignore speech synthesis errors
    }
  }, []);

  const stopStoryVoice = useCallback(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
      } catch {}
    }
  }, []);

  // Handle story step change
  const goToStoryStep = useCallback((newIdx: number, autoSpeak: boolean = true) => {
    const clampedIdx = (newIdx + STORY_KEYS.length) % STORY_KEYS.length;
    setStoryIndex(clampedIdx);
    setStoryProgress(0);
    const key = STORY_KEYS[clampedIdx];
    setActiveKey(key);
    if (autoSpeak && isVoiceEnabled) {
      const nar = STORY_NARRATIONS[key];
      if (nar) {
        speakStoryScript(nar.voiceScript);
      }
    }
  }, [isVoiceEnabled, speakStoryScript]);

  // Story Mode auto-progress timer (4.5s per milestone)
  useEffect(() => {
    if (!isStoryActive || isStoryPaused) {
      if (storyTimerRef.current) clearInterval(storyTimerRef.current);
      return;
    }

    const intervalMs = 60;
    const totalDuration = 4500;
    const increment = (intervalMs / totalDuration) * 100;

    storyTimerRef.current = setInterval(() => {
      setStoryProgress((prev) => {
        if (prev >= 100) {
          setStoryIndex((curIdx) => {
            const nextIdx = (curIdx + 1) % STORY_KEYS.length;
            const nextKey = STORY_KEYS[nextIdx];
            setActiveKey(nextKey);
            if (isVoiceEnabled) {
              const nar = STORY_NARRATIONS[nextKey];
              if (nar) speakStoryScript(nar.voiceScript);
            }
            return nextIdx;
          });
          return 0;
        }
        return prev + increment;
      });
    }, intervalMs);

    return () => {
      if (storyTimerRef.current) clearInterval(storyTimerRef.current);
    };
  }, [isStoryActive, isStoryPaused, isVoiceEnabled, speakStoryScript]);

  // Toggle Story Mode
  const handleToggleStoryMode = () => {
    if (isStoryActive) {
      setIsStoryActive(false);
      setIsStoryPaused(false);
      setStoryProgress(0);
      stopStoryVoice();
      showToast('Đã dừng chế độ Trình chiếu Hành trình Sự nghiệp');
    } else {
      setIsStoryActive(true);
      setIsStoryPaused(false);
      setStoryIndex(0);
      setStoryProgress(0);
      setActiveKey(STORY_KEYS[0]);
      if (isVoiceEnabled) {
        speakStoryScript(STORY_NARRATIONS[STORY_KEYS[0]].voiceScript);
      }
      showToast('Bắt đầu Trình chiếu Hành trình Sự nghiệp (2003 → 2026+)');
    }
  };

  const handleSelectMilestone = (key: string) => {
    setActiveKey(key);
    showToast(`Đã chọn mốc: ${EXPERIENCE_MILESTONES[key]?.company || key}`);
    const cardIdx = filteredRoadmapCards.findIndex((c) => c.key === key);
    if (cardIdx !== -1) {
      setSliderYearIndex(cardIdx);
      const cardEl = document.getElementById(`milestone-card-${key}`);
      if (cardEl) {
        cardEl.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  };

  const handleOpenJobCard = (key: string) => {
    setActiveKey(key);
    setShowJobCard(true);
    showToast(`Chi tiết công tác: ${EXPERIENCE_MILESTONES[key]?.company || key}`);
  };

  // 8 Timeline Columns matching 100% the uploaded reference infographic while preserving 100% data
  const roadmapCards = [
    {
      key: '2003',
      yearBadge: 'Năm 2003',
      shortName: 'MOBIFONE',
      roleSummary: 'Nhân viên CSKH',
      headcountLabel: '12 Nhân sự',
      logo: 'https://i.ibb.co/hxHm9TsZ/Mobifone.png',
      productSummary: 'MobiFone Di Động',
      products: [
        { name: 'MobiFone', logo: 'https://i.ibb.co/hxHm9TsZ/Mobifone.png' },
      ],
      primaryColor: '#0c85f3',
      badgeBg: 'linear-gradient(135deg, #1b93ff 0%, #0976e6 100%)',
      badgeColor: '#0c85f3',
      glowColor: 'rgba(12, 133, 243, 0.24)',
      outerRingBg: '#e4f2ff',
      cardBg: 'linear-gradient(180deg, rgba(239, 246, 255, 0.95) 0%, rgba(219, 234, 254, 0.75) 100%)',
      iconCircleBg: 'rgba(12, 133, 243, 0.14)',
      iconName: 'tower' as const,
      borderColor: 'border-blue-200/90',
      activeRing: 'ring-blue-400',
      titleColor: 'text-blue-900',
      pillBg: 'bg-white/90 backdrop-blur-sm text-blue-700 border-blue-200/90',
      arrowBg: '#0c85f3',
      arrowBorder: '#bfdbfe',
      bullets: [
        { text: 'Chăm sóc khách hàng', icon: 'shield' },
        { text: 'Tư vấn dịch vụ', icon: 'message' },
        { text: 'Giải quyết khiếu nại', icon: 'scale' },
      ],
    },
    {
      key: '2007',
      yearBadge: 'Năm 2007',
      shortName: 'VIỄN LIÊN V247',
      roleSummary: 'Trưởng nhóm CSKH',
      headcountLabel: '12 Nhân sự',
      logo: 'https://i.ibb.co/QvtbdnfP/V247.png',
      productSummary: 'Call 247 Quốc Tế',
      products: [
        { name: 'Call 247', logo: 'https://i.ibb.co/QvtbdnfP/V247.png' },
      ],
      primaryColor: '#8042f6',
      badgeBg: 'linear-gradient(135deg, #8e52ff 0%, #7334eb 100%)',
      badgeColor: '#8042f6',
      glowColor: 'rgba(128, 66, 246, 0.24)',
      outerRingBg: '#efe5ff',
      cardBg: 'linear-gradient(180deg, rgba(245, 243, 255, 0.95) 0%, rgba(237, 233, 254, 0.75) 100%)',
      iconCircleBg: 'rgba(128, 66, 246, 0.14)',
      iconName: 'users' as const,
      borderColor: 'border-purple-200/90',
      activeRing: 'ring-purple-400',
      titleColor: 'text-purple-900',
      pillBg: 'bg-white/90 backdrop-blur-sm text-purple-700 border-purple-200/90',
      arrowBg: '#8042f6',
      arrowBorder: '#bbf7d0',
      bullets: [
        { text: 'Quản lý nhóm', icon: 'users' },
        { text: 'Đào tạo nhân sự', icon: 'graduation' },
        { text: 'Nâng cao chất lượng CSKH', icon: 'trend' },
      ],
    },
    {
      key: '2011',
      yearBadge: 'Năm 2011',
      shortName: 'LBC - HTVC',
      roleSummary: 'Trưởng Phòng CSKH',
      headcountLabel: '12 Nhân sự',
      logo: 'https://i.ibb.co/R4YXWyzF/LBC.png',
      productSummary: 'Truyền hình Cáp HTVC',
      products: [
        { name: 'HTVC', logo: 'https://i.ibb.co/1fNw0hBq/HTVC.png' },
      ],
      primaryColor: '#069c47',
      badgeBg: 'linear-gradient(135deg, #0eb256 0%, #058c3f 100%)',
      badgeColor: '#069c47',
      glowColor: 'rgba(6, 156, 71, 0.24)',
      outerRingBg: '#def7e9',
      cardBg: 'linear-gradient(180deg, rgba(236, 253, 245, 0.95) 0%, rgba(209, 250, 229, 0.75) 100%)',
      iconCircleBg: 'rgba(6, 156, 71, 0.14)',
      iconName: 'chart' as const,
      borderColor: 'border-emerald-200/90',
      activeRing: 'ring-emerald-400',
      titleColor: 'text-emerald-900',
      pillBg: 'bg-white/90 backdrop-blur-sm text-emerald-700 border-emerald-200/90',
      arrowBg: '#069c47',
      arrowBorder: '#a5f3fc',
      bullets: [
        { text: 'Xây dựng quy trình', icon: 'file' },
        { text: 'Quản lý vận hành', icon: 'gear' },
        { text: 'Phát triển đội ngũ', icon: 'rocket' },
      ],
    },

    {
      key: '2016',
      yearBadge: 'Năm 2016',
      shortName: 'PRUDENTIAL',
      roleSummary: 'Trưởng Phòng CallCenter',
      headcountLabel: '12 Nhân sự',
      logo: 'https://i.ibb.co/XfpQphWF/Prudential.png',
      productSummary: 'Bảo hiểm PruLife',
      products: [
        { name: 'Prudential', logo: 'https://i.ibb.co/XfpQphWF/Prudential.png' },
      ],
      primaryColor: '#f64d25',
      badgeBg: 'linear-gradient(135deg, #ff5d36 0%, #e83e17 100%)',
      badgeColor: '#f64d25',
      glowColor: 'rgba(246, 77, 37, 0.24)',
      outerRingBg: '#ffe8e0',
      cardBg: 'linear-gradient(180deg, rgba(255, 241, 242, 0.95) 0%, rgba(255, 228, 230, 0.75) 100%)',
      iconCircleBg: 'rgba(246, 77, 37, 0.14)',
      iconName: 'factory' as const,
      borderColor: 'border-rose-200/90',
      activeRing: 'ring-rose-400',
      titleColor: 'text-rose-950',
      pillBg: 'bg-white/90 backdrop-blur-sm text-rose-800 border-rose-200/90',
      arrowBg: '#f64d25',
      arrowBorder: '#fbcfe8',
      bullets: [
        { text: 'Quản lý tổng đài', icon: 'phone' },
        { text: 'Đào tạo & phát triển', icon: 'book' },
        { text: 'Tối ưu hiệu suất', icon: 'zap' },
      ],
    },
    {
      key: '2018',
      yearBadge: 'Năm 2018',
      shortName: 'VÍ MOMO',
      roleSummary: 'Trưởng Phòng CSKH',
      headcountLabel: '60 Nhân sự',
      logo: 'https://i.ibb.co/k2QtrgTw/Momo.png',
      productSummary: 'Siêu ứng dụng Ví MoMo',
      products: [
        { name: 'Ví MoMo', logo: 'https://i.ibb.co/k2QtrgTw/Momo.png' },
      ],
      primaryColor: '#f74f9e',
      badgeBg: 'linear-gradient(135deg, #ff5eab 0%, #e83d8e 100%)',
      badgeColor: '#f74f9e',
      glowColor: 'rgba(247, 79, 158, 0.24)',
      outerRingBg: '#fee5f2',
      cardBg: 'linear-gradient(180deg, rgba(253, 242, 248, 0.95) 0%, rgba(252, 231, 243, 0.75) 100%)',
      iconCircleBg: 'rgba(247, 79, 158, 0.14)',
      iconName: 'smartphone' as const,
      borderColor: 'border-pink-200/90',
      activeRing: 'ring-pink-400',
      titleColor: 'text-pink-950',
      pillBg: 'bg-white/90 backdrop-blur-sm text-pink-700 border-pink-200/90',
      arrowBg: '#f74f9e',
      arrowBorder: '#fde68a',
      bullets: [
        { text: 'Chăm sóc khách hàng', icon: 'message' },
        { text: 'Phân tích dữ liệu', icon: 'chart' },
        { text: 'Phát triển dịch vụ', icon: 'star' },
      ],
    },
    {
      key: '2023',
      yearBadge: 'Năm 2023',
      shortName: 'FINVIET ECO',
      roleSummary: 'Trưởng Phòng CSKH',
      headcountLabel: '17 Nhân sự',
      logo: 'https://i.ibb.co/7NtSSz4d/Finviet.png',
      productSummary: 'ECO SCC • Chợ Số Finviet',
      products: [
        { name: 'ECO SCC', logo: 'https://i.ibb.co/cSXPhWcp/Finviet.png' },
        { name: 'Finviet', logo: 'https://i.ibb.co/7NtSSz4d/Finviet.png' },
      ],
      primaryColor: '#f9a800',
      badgeBg: 'linear-gradient(135deg, #ffb703 0%, #ef9b00 100%)',
      badgeColor: '#f9a800',
      glowColor: 'rgba(249, 168, 0, 0.24)',
      outerRingBg: '#fef3d6',
      cardBg: 'linear-gradient(180deg, rgba(254, 252, 232, 0.95) 0%, rgba(254, 243, 199, 0.75) 100%)',
      iconCircleBg: 'rgba(249, 168, 0, 0.16)',
      iconName: 'megaphone' as const,
      borderColor: 'border-amber-200/90',
      activeRing: 'ring-amber-400',
      titleColor: 'text-amber-950',
      pillBg: 'bg-white/90 backdrop-blur-sm text-amber-800 border-amber-200/90',
      arrowBg: '#f9a800',
      arrowBorder: '#bfdbfe',
      bullets: [
        { text: 'Quản lý nhóm', icon: 'users' },
        { text: 'Xây dựng quy trình', icon: 'file' },
        { text: 'Tăng trưởng khách hàng', icon: 'trend' },
      ],
    },
    {
      key: '2026',
      yearBadge: 'Năm 2026+',
      shortName: 'POWER SERVICE',
      roleSummary: 'Head of CS / CS Director',
      headcountLabel: '100 Nhân sự',
      logo: 'https://i.ibb.co/G4QnNzWb/Power-Service.png',
      productSummary: 'Power Service • CS Strategy',
      products: [
        { name: 'Power Service', logo: 'https://i.ibb.co/G4QnNzWb/Power-Service.png' },
      ],
      primaryColor: '#157efb',
      badgeBg: 'linear-gradient(135deg, #268bff 0%, #0d6efd 100%)',
      badgeColor: '#157efb',
      glowColor: 'rgba(21, 126, 251, 0.24)',
      outerRingBg: '#e0efff',
      cardBg: 'linear-gradient(180deg, rgba(239, 246, 255, 0.95) 0%, rgba(224, 231, 255, 0.75) 100%)',
      iconCircleBg: 'rgba(21, 126, 251, 0.14)',
      iconName: 'clipboard' as const,
      borderColor: 'border-indigo-200/90',
      activeRing: 'ring-indigo-400',
      titleColor: 'text-indigo-950',
      pillBg: 'bg-white/90 backdrop-blur-sm text-indigo-700 border-indigo-200/90',
      arrowBg: '#157efb',
      arrowBorder: '#bfdbfe',
      bullets: [
        { text: 'Chiến lược CSKH', icon: 'globe' },
        { text: 'Chuyển đổi số', icon: 'refresh' },
        { text: 'Phát triển bền vững', icon: 'leaf' },
      ],
    },
  ];

  const renderCardMilestoneIcon = (iconName: string, color: string) => {
    const props = { className: 'w-4 h-4 sm:w-[18px] sm:h-[18px] stroke-[2]', style: { color } };
    switch (iconName) {
      case 'tower':
        return <RadioTower {...props} />;
      case 'users':
        return <Users {...props} />;
      case 'chart':
        return <TrendingUp {...props} />;
      case 'monitor':
        return <Monitor {...props} />;
      case 'factory':
        return <Factory {...props} />;
      case 'smartphone':
        return <Smartphone {...props} />;
      case 'megaphone':
        return <Megaphone {...props} />;
      case 'clipboard':
        return <ClipboardCheck {...props} />;
      default:
        return <RadioTower {...props} />;
    }
  };

  const renderBulletIcon = (icon: string, color: string) => {
    const props = { className: 'w-2.5 h-2.5 sm:w-3 sm:h-3 shrink-0 stroke-[2.2]', style: { color } };
    switch (icon) {
      case 'shield':
        return <Shield {...props} />;
      case 'message':
        return <MessageCircle {...props} />;
      case 'scale':
        return <Scale {...props} />;
      case 'users':
        return <Users {...props} />;
      case 'graduation':
        return <GraduationCap {...props} />;
      case 'trend':
        return <TrendingUp {...props} />;
      case 'file':
        return <FileText {...props} />;
      case 'gear':
        return <Settings {...props} />;
      case 'rocket':
        return <Rocket {...props} />;
      case 'headset':
        return <Headset {...props} />;
      case 'monitor':
        return <Monitor {...props} />;
      case 'target':
        return <Target {...props} />;
      case 'phone':
        return <PhoneCall {...props} />;
      case 'book':
        return <BookOpen {...props} />;
      case 'zap':
        return <Zap {...props} />;
      case 'chart':
        return <BarChart2 {...props} />;
      case 'star':
        return <Star {...props} />;
      case 'globe':
        return <Globe {...props} />;
      case 'refresh':
        return <RefreshCw {...props} />;
      case 'leaf':
        return <Leaf {...props} />;
      default:
        return <CheckCircle2 {...props} />;
    }
  };

  // VED 5 Brands Ecosystem
  const subEntities2013 = [
    { key: '2013', name: 'VED', role: 'Game Online', src: 'https://i.ibb.co/fYPJLfbw/VED.png' },
    { key: '2013-garena', name: 'Garena', role: 'Game Publisher', src: 'https://i.ibb.co/h1Md65yV/Garena.png' },
    { key: '2013-gcafe', name: 'Gcafe', role: 'Phần mềm B2B', src: 'https://i.ibb.co/FkWk3s4W/GCafe.png' },
    { key: '2013-shopee', name: 'Shopee', role: 'Sàn TMĐT', src: 'https://i.ibb.co/BSVS4xf/Shopee.png' },
    { key: '2014-airpay', name: 'AirPay', role: 'Ví Điện Tử', src: 'https://i.ibb.co/LdYv3TJy/Shopee-Paye.png' },
  ];

  // Featured Products Carousel (Right Widget in the image)
  const featuredProductPages = [
    {
      label: '2 sản phẩm',
      items: [
        { name: 'Finviet', sub: 'FinTech Ecosystem', logo: 'https://i.ibb.co/7NtSSz4d/Finviet.png', targetKey: '2023' },
        { name: 'ECO SCC', sub: 'Ví Điện Tử & Chợ Số', logo: 'https://i.ibb.co/cSXPhWcp/Finviet.png', isEcoBadge: true, targetKey: '2023' },
      ],
    },
    {
      label: '2 sản phẩm (FinTech & Bảo hiểm)',
      items: [
        { name: 'Ví MoMo', sub: 'Siêu ứng dụng Thanh toán', logo: 'https://i.ibb.co/k2QtrgTw/Momo.png', targetKey: '2018' },
        { name: 'Prudential', sub: 'Bảo hiểm Nhân thọ', logo: 'https://i.ibb.co/XfpQphWF/Prudential.png', targetKey: '2016' },
      ],
    },
    {
      label: '3 sản phẩm (Viễn thông & Truyền hình)',
      items: [
        { name: 'MobiFone', sub: 'Viễn thông Di động', logo: 'https://i.ibb.co/hxHm9TsZ/Mobifone.png', targetKey: '2003' },
        { name: 'Call 247 / LBC', sub: 'Viễn thông Quốc tế', logo: 'https://i.ibb.co/QvtbdnfP/V247.png', targetKey: '2007' },
        { name: 'LBC - HTVC', sub: 'Truyền hình Cáp & Internet', logo: 'https://i.ibb.co/1fNw0hBq/HTVC.png', targetKey: '2011' },
      ],
    },
  ];

  const is2013GroupActive =
    activeKey === '2013' || activeKey.startsWith('2013') || activeKey === '2014-airpay';

  // Filter roadmap cards if user types in search box
  const filteredRoadmapCards = roadmapCards.filter((c) => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return true;
    const ms = EXPERIENCE_MILESTONES[c.key];
    return (
      c.shortName.toLowerCase().includes(q) ||
      c.yearBadge.toLowerCase().includes(q) ||
      c.roleSummary.toLowerCase().includes(q) ||
      (ms && ms.company.toLowerCase().includes(q)) ||
      (ms && ms.industry?.toLowerCase().includes(q))
    );
  });

  const allMilestoneKeys = ['2003', '2007', '2011', '2013', '2016', '2018', '2023', '2026'];
  const normalizedActiveKey = activeKey.startsWith('2013') || activeKey === '2014-airpay' ? '2013' : activeKey;
  const currentKeyIndex = allMilestoneKeys.indexOf(normalizedActiveKey);
  const prevKey = currentKeyIndex > 0 ? allMilestoneKeys[currentKeyIndex - 1] : null;
  const nextKey = currentKeyIndex < allMilestoneKeys.length - 1 ? allMilestoneKeys[currentKeyIndex + 1] : null;

  const currentProdSlide = featuredProductPages[featuredProdPage] || featuredProductPages[0];

  // 4 items per view pagination calculations & horizontal scroll handlers
  const totalTimelinePages = Math.max(1, Math.ceil(filteredRoadmapCards.length / CARDS_PER_PAGE));
  const timelinePagesData = Array.from({ length: totalTimelinePages }, (_, pageIdx) =>
    filteredRoadmapCards.slice(pageIdx * CARDS_PER_PAGE, (pageIdx + 1) * CARDS_PER_PAGE)
  );

  const handlePrevTimelinePage = () => {
    setTimelinePage((prev) => (prev > 0 ? prev - 1 : totalTimelinePages - 1));
  };

  const handleNextTimelinePage = () => {
    setTimelinePage((prev) => (prev < totalTimelinePages - 1 ? prev + 1 : 0));
  };

  // Vị trí logo hiện tại đang được chọn (từ 0 đến 7)
  const currentLogoIdx = filteredRoadmapCards.findIndex(
    (c) => c.key === activeKey || (c.key === '2013' && is2013GroupActive)
  );

  // Tính năng nút scroll lướt qua từng logo kế tiếp
  const handleScrollNextLogo = () => {
    if (filteredRoadmapCards.length === 0) return;
    const nextIdx = currentLogoIdx < filteredRoadmapCards.length - 1 ? currentLogoIdx + 1 : 0;
    const nextCard = filteredRoadmapCards[nextIdx];
    if (nextCard) {
      handleSelectMilestone(nextCard.key);
      const targetPage = Math.floor(nextIdx / CARDS_PER_PAGE);
      if (targetPage !== timelinePage && targetPage < totalTimelinePages) {
        setTimelinePage(targetPage);
      }
    }
  };

  // Tính năng nút scroll lướt về logo trước đó
  const handleScrollPrevLogo = () => {
    if (filteredRoadmapCards.length === 0) return;
    const prevIdx = currentLogoIdx > 0 ? currentLogoIdx - 1 : filteredRoadmapCards.length - 1;
    const prevCard = filteredRoadmapCards[prevIdx];
    if (prevCard) {
      handleSelectMilestone(prevCard.key);
      const targetPage = Math.floor(prevIdx / CARDS_PER_PAGE);
      if (targetPage !== timelinePage && targetPage < totalTimelinePages) {
        setTimelinePage(targetPage);
      }
    }
  };

  // Tự động đồng bộ timelinePage khi activeKey thay đổi hoặc Story Mode chạy
  useEffect(() => {
    const cardIdx = filteredRoadmapCards.findIndex(
      (c) => c.key === activeKey || (c.key === '2013' && is2013GroupActive)
    );
    if (cardIdx !== -1) {
      const targetPage = Math.floor(cardIdx / CARDS_PER_PAGE);
      if (targetPage !== timelinePage && targetPage < totalTimelinePages) {
        setTimelinePage(targetPage);
      }
    }
  }, [activeKey, filteredRoadmapCards, is2013GroupActive, totalTimelinePages, timelinePage]);

  // Đảm bảo timelinePage không vượt quá totalTimelinePages khi tìm kiếm
  useEffect(() => {
    if (timelinePage >= totalTimelinePages) {
      setTimelinePage(Math.max(0, totalTimelinePages - 1));
    }
  }, [totalTimelinePages, timelinePage]);

  // Tự động trượt ngang (Auto-Scroll Carousel Mode) mỗi 8 giây nếu được bật
  useEffect(() => {
    if (!isTimelineAutoScroll || isStoryActive) return;
    const interval = setInterval(() => {
      setTimelinePage((prev) => (prev + 1) % totalTimelinePages);
    }, 8000);
    return () => clearInterval(interval);
  }, [isTimelineAutoScroll, isStoryActive, totalTimelinePages]);

  return (
    <div
      className="w-full h-full flex-1 flex flex-col justify-between gap-0 max-w-7xl mx-auto select-none relative text-slate-800 dark:text-slate-100 overflow-y-auto no-scrollbar pb-4"
    >
      {!showJobCard && (
        <>
          {activeTab === 'history' ? (
            <>
              {/* =====================================================================
                  2. 8-COLUMN 3-TIER INFOGRAPHIC TIMELINE WITH ANIMATED PULSE FLOW & QUICK KPI POPOVER (FULL CHIỀU CAO)
                  ===================================================================== */}
              <div className="w-full h-full flex-1 min-h-0 px-3 py-2.5 sm:px-4 sm:py-3.5 rounded-[14px] bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-white/95 dark:border-white/10 shadow-[0_12px_32px_-8px_rgba(30,27,75,0.06)] dark:shadow-[0_12px_32px_-8px_rgba(0,0,0,0.5)] overflow-x-auto no-scrollbar relative flex flex-col justify-between">
            {/* Story Narration Bar (Khi ở chế độ Trình Chiếu Hành Trình) */}
            {isStoryActive && (
              <div className="w-full mb-2.5 p-3 sm:p-3.5 rounded-2xl bg-gradient-to-r from-[#1E1B4B]/95 via-indigo-950/95 to-slate-950/95 text-white shadow-[0_16px_36px_-8px_rgba(30,27,75,0.3)] border border-white/20 backdrop-blur-2xl relative overflow-hidden animate-fadeIn shrink-0">
                {/* 4.5s Progress Bar across bottom of narration banner */}
                <div className="absolute bottom-0 inset-x-0 h-1 bg-white/20">
                  <div
                    className="h-full bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400 transition-all duration-75 ease-linear"
                    style={{ width: `${storyProgress}%` }}
                  />
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  {/* Cột trái: Cột mốc & Nội dung thuyết minh */}
                  <div className="flex items-start sm:items-center gap-3 min-w-0 flex-1">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center shrink-0 shadow-inner">
                      <Sparkles className="w-5 h-5 text-amber-300 animate-spin" style={{ animationDuration: '6s' }} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 text-[10px] font-black font-mono uppercase tracking-wider shadow-2xs">
                          Cột mốc {storyIndex + 1}/8 • {STORY_KEYS[storyIndex]}
                        </span>
                        <h4 className="text-xs sm:text-sm font-black font-play text-white break-words">
                          {STORY_NARRATIONS[STORY_KEYS[storyIndex]]?.stage}
                        </h4>
                      </div>
                      <p className="text-[11px] sm:text-xs text-slate-200 mt-1 break-words leading-relaxed">
                        {STORY_NARRATIONS[STORY_KEYS[storyIndex]]?.summary}
                      </p>
                    </div>
                  </div>

                  {/* Cột phải: Điều khiển trình chiếu */}
                  <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-center">
                    {/* Bật/Tắt giọng đọc */}
                    <button
                      type="button"
                      onClick={() => {
                        const next = !isVoiceEnabled;
                        setIsVoiceEnabled(next);
                        if (!next) stopStoryVoice();
                        else speakStoryScript(STORY_NARRATIONS[STORY_KEYS[storyIndex]].voiceScript);
                        showToast(next ? 'Đã bật giọng đọc thuyết minh' : 'Đã tắt giọng đọc thuyết minh');
                      }}
                      className={`p-1.5 px-2.5 rounded-full text-[11px] font-bold flex items-center gap-1 border transition-all cursor-pointer ${
                        isVoiceEnabled
                          ? 'bg-emerald-500/80 border-emerald-300 text-white shadow-xs'
                          : 'bg-white/10 border-white/20 text-slate-300 hover:text-white'
                      }`}
                      title={isVoiceEnabled ? 'Giọng đọc tiếng Việt: BẬT' : 'Giọng đọc: TẮT'}
                    >
                      {isVoiceEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
                      <span className="hidden sm:inline">{isVoiceEnabled ? 'Giọng đọc' : 'Tắt giọng'}</span>
                    </button>

                    {/* Lùi mốc */}
                    <button
                      type="button"
                      onClick={() => goToStoryStep(storyIndex - 1)}
                      className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-all cursor-pointer active:scale-95"
                      title="Mốc trước đó"
                    >
                      <SkipBack className="w-3.5 h-3.5" />
                    </button>

                    {/* Tạm dừng / Tiếp tục */}
                    <button
                      type="button"
                      onClick={() => {
                        const next = !isStoryPaused;
                        setIsStoryPaused(next);
                        if (next) stopStoryVoice();
                        showToast(next ? 'Đã tạm dừng trình chiếu' : 'Tiếp tục trình chiếu');
                      }}
                      className="p-1.5 px-2.5 rounded-full bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs transition-all cursor-pointer shadow-xs active:scale-95 flex items-center gap-1"
                      title={isStoryPaused ? 'Tiếp tục' : 'Tạm dừng'}
                    >
                      {isStoryPaused ? <Play className="w-3.5 h-3.5 fill-current" /> : <Pause className="w-3.5 h-3.5 fill-current" />}
                      <span>{isStoryPaused ? 'Phát' : 'Dừng'}</span>
                    </button>

                    {/* Tới mốc kế tiếp */}
                    <button
                      type="button"
                      onClick={() => goToStoryStep(storyIndex + 1)}
                      className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-all cursor-pointer active:scale-95"
                      title="Mốc tiếp theo"
                    >
                      <SkipForward className="w-3.5 h-3.5" />
                    </button>

                    {/* Nút đóng story mode */}
                    <button
                      type="button"
                      onClick={handleToggleStoryMode}
                      className="p-1.5 rounded-full bg-rose-500/80 hover:bg-rose-500 border border-rose-400 text-white transition-all cursor-pointer active:scale-95 ml-1"
                      title="Thoát chế độ trình chiếu"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* KHUNG HORIZONTAL TIMELINE - HIỂN THỊ THEO CHIỀU NGANG TRỌN VẸN 8 CỘT MỐC */}
            <div className="relative w-full flex-1 min-h-0 h-full flex flex-col justify-between py-1 group/track">
              {/* Nút Điều Hướng Cuộn Ngang Trái/Phải Nổi */}
              <button
                type="button"
                onClick={() => scrollHorizontal(-340)}
                className="absolute -left-2 top-[40%] -translate-y-1/2 z-40 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/95 dark:bg-slate-800/95 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-white/10 shadow-xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all opacity-85 hover:opacity-100 cursor-pointer backdrop-blur-md"
                title="Cuộn mốc trước"
              >
                <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
              </button>

              <button
                type="button"
                onClick={() => scrollHorizontal(340)}
                className="absolute -right-2 top-[40%] -translate-y-1/2 z-40 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/95 dark:bg-slate-800/95 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-white/10 shadow-xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all opacity-85 hover:opacity-100 cursor-pointer backdrop-blur-md"
                title="Cuộn mốc kế tiếp"
              >
                <ChevronRight className="w-5 h-5 stroke-[2.5]" />
              </button>

              {/* Dải Cuộn Ngang Chứa 8 Cột Mốc Thời Gian Trải Dài */}
              <div
                ref={horizontalTrackRef}
                onWheel={(e) => {
                  if (Math.abs(e.deltaY) > Math.abs(e.deltaX) && horizontalTrackRef.current) {
                    horizontalTrackRef.current.scrollLeft += e.deltaY;
                  }
                }}
                className="w-full h-full flex-1 min-h-0 overflow-x-auto overflow-y-hidden custom-scrollbar pb-2 pt-1 px-3 flex items-stretch gap-4 scroll-smooth"
              >
                {filteredRoadmapCards.map((item) => {
                  const isSelected =
                    activeKey === item.key || (item.key === '2013' && is2013GroupActive);
                  const isLbcCard = item.key === '2011';
                  const isHighlightedInStory = isStoryActive && STORY_KEYS[storyIndex] === item.key;
                  const isBenchmarkSelected = benchmarkKeys.includes(item.key);

                  const SCENIC_BANNERS: Record<string, string> = {
                    '2003': 'https://res.cloudinary.com/q5tpzaxk/image/upload/v1793042029/Mobifone-1.webp',
                    '2007': 'https://res.cloudinary.com/q5tpzaxk/image/upload/v1793042038/V247-1.jpg',
                    '2011': 'https://res.cloudinary.com/q5tpzaxk/image/upload/v1793042015/HTVC-1.webp',
                    '2013': 'https://res.cloudinary.com/q5tpzaxk/image/upload/v1793042039/VED-1.webp',
                    '2016': 'https://res.cloudinary.com/q5tpzaxk/image/upload/v1793042034/Prudential-1.webp',
                    '2018': 'https://res.cloudinary.com/q5tpzaxk/image/upload/v1793042030/Momo-1.webp',
                    '2023': 'https://res.cloudinary.com/q5tpzaxk/image/upload/v1793042014/Finviet-1.webp',
                    '2026': 'https://res.cloudinary.com/q5tpzaxk/image/upload/v1793042018/Kinh_nghi%E1%BB%87m.png',
                  };
                  const bannerImg = SCENIC_BANNERS[item.key] || SCENIC_BANNERS['2003'];

                  return (
                    <div
                      key={item.key}
                      id={`milestone-card-${item.key}`}
                      className={`relative flex flex-col items-center h-full w-[275px] sm:w-[290px] lg:w-[300px] shrink-0 select-none transition-all duration-300 justify-between ${
                        isHighlightedInStory ? 'scale-[1.02] z-30' : ''
                      } ${isBenchmarkSelected ? 'ring-2 ring-amber-400 rounded-2xl p-1 bg-amber-500/10' : ''}`}
                    >
                      {/* Nút Chọn So Sánh (Dual-Milestone Benchmark Button) */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleToggleBenchmark(item.key);
                        }}
                        className={`absolute top-0.5 right-1 z-30 w-7 h-7 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-xs border ${
                          isBenchmarkSelected
                            ? 'bg-amber-500 text-slate-950 border-amber-300 ring-2 ring-amber-400 scale-110 font-bold'
                            : 'bg-white/95 dark:bg-slate-800/95 text-slate-500 dark:text-slate-300 border-slate-200/90 dark:border-white/15 hover:text-amber-500 hover:scale-105'
                        }`}
                        title={isBenchmarkSelected ? 'Bỏ chọn so sánh' : 'Thêm vào so sánh 2 cột mốc'}
                      >
                        <Scale className="w-3.5 h-3.5 stroke-[2.2]" />
                      </button>

                      {/* TIER 1: Top Year Pill Badge + Downward Pointer + Vertical Stem + Node Dot */}
                      <div className="flex flex-col items-center shrink-0 z-20 w-full">
                        <button
                          type="button"
                          onClick={() => handleSelectMilestone(item.key)}
                          className={`w-[78%] max-w-[145px] py-1.5 px-3.5 rounded-full text-white font-black font-play text-xs sm:text-[13px] tracking-tight shadow-sm flex items-center justify-center transition-all duration-300 whitespace-nowrap cursor-pointer ${
                            isSelected ? 'scale-105 ring-2 ring-white shadow-md' : 'hover:scale-105'
                          } ${isHighlightedInStory ? 'ring-2 ring-amber-300 shadow-lg' : ''}`}
                          style={{ background: item.badgeBg }}
                        >
                          <span>{item.yearBadge}</span>
                        </button>
                        {/* Downward pointer triangle */}
                        <div
                          className="w-0 h-0 border-x-[5px] border-x-transparent border-t-[5px] -mt-[0.5px]"
                          style={{ borderTopColor: item.primaryColor }}
                        />
                        {/* Vertical stem to Scenic Banner */}
                        <div
                          className="w-0 h-2 border-l-[2px] border-dashed"
                          style={{ borderColor: item.primaryColor }}
                        />
                        {/* Node dot touching top of Banner */}
                        <div
                          className="w-2 h-2 rounded-full -mb-1 z-20 shadow-2xs"
                          style={{ backgroundColor: item.primaryColor }}
                        />
                      </div>

                      {/* TIER 2: Scenic Company Banner + Circular Logo Medallion */}
                      <div className="relative w-full flex items-center justify-center shrink-0 my-0.5">
                        {/* Đường trục thời gian ngang nối kết xuyên suốt các mốc */}
                        <div className="absolute -left-4 -right-4 top-1/2 -translate-y-1/2 h-[2.5px] bg-gradient-to-r from-blue-400/50 via-indigo-400/60 to-purple-400/50 dark:from-cyan-400/40 dark:via-indigo-500/40 dark:to-purple-500/40 z-0 pointer-events-none" />

                        {/* Scenic Banner Frame with centered Circular Medallion matching Reference Image 1 */}
                        <div
                          onMouseEnter={() => setHoveredMilestoneKey(item.key)}
                          onMouseLeave={() => setHoveredMilestoneKey((cur) => (cur === item.key ? null : cur))}
                          onClick={() => handleOpenJobCard(item.key)}
                          title={`Click để mở chi tiết công tác ${item.shortName}`}
                          className="relative z-10 w-full h-[76px] sm:h-[82px] rounded-xl overflow-hidden border border-white/90 dark:border-white/15 shadow-sm flex items-center justify-center cursor-pointer group/logo"
                        >
                          {/* Scenic Background Photo */}
                          <img
                            src={bannerImg}
                            alt={`${item.shortName} banner`}
                            className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-500 group-hover/logo:scale-105 pointer-events-none select-none opacity-85"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-white/35 via-transparent to-white/15 dark:from-slate-950/55 dark:to-transparent pointer-events-none" />

                          {/* Circular Logo Medallion */}
                          <div
                            className={`relative z-10 w-[58px] h-[58px] sm:w-[64px] sm:h-[64px] rounded-full overflow-hidden bg-white p-0 shadow-md transition-all duration-300 flex items-center justify-center shrink-0 ${
                              isSelected ? 'scale-105' : 'group-hover/logo:scale-105'
                            }`}
                          >
                            <img
                              src={item.logo}
                              alt={item.shortName}
                              className="w-full h-full object-cover rounded-full pointer-events-none select-none"
                            />
                          </div>

                          {/* LBC Secondary HTVC Floating Mini-Medallion */}
                          {isLbcCard && (
                            <div
                              onClick={(e) => {
                                e.stopPropagation();
                                handleOpenJobCard(item.key);
                              }}
                              title="Sản phẩm HTVC - Click để mở chi tiết công tác LBC"
                              className="absolute bottom-1 right-2 z-30 w-6 h-6 rounded-full bg-white shadow-md overflow-hidden p-0.5 border border-emerald-400 flex items-center justify-center hover:scale-110 transition-transform cursor-pointer"
                            >
                              <img
                                src="https://i.ibb.co/1fNw0hBq/HTVC.png"
                                alt="Sản phẩm HTVC"
                                className="w-full h-full object-cover rounded-full"
                              />
                            </div>
                          )}
                        </div>

                        {/* QUICK KPI POPOVER */}
                        {hoveredMilestoneKey === item.key && !isStoryActive && (
                          <div
                            onMouseEnter={() => setHoveredMilestoneKey(item.key)}
                            onMouseLeave={() => setHoveredMilestoneKey(null)}
                            className="absolute z-50 w-68 p-3.5 rounded-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl border border-white/95 dark:border-white/20 shadow-[0_18px_45px_rgba(15,23,42,0.25)] flex flex-col gap-2.5 transition-all duration-200 pointer-events-auto animate-fadeIn left-1/2 -translate-x-1/2 top-full mt-2"
                          >
                            <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white dark:bg-slate-900 border-t border-l border-white/90 dark:border-white/20 rotate-45" />
                            <div className="flex items-center justify-between gap-2 border-b border-slate-100 dark:border-white/10 pb-2">
                              <div className="flex items-center gap-2 min-w-0">
                                <img
                                  src={item.logo}
                                  alt={item.shortName}
                                  className="w-7 h-7 object-cover rounded-full bg-white shrink-0 shadow-xs"
                                />
                                <div className="min-w-0">
                                  <h4 className="text-xs font-black text-slate-900 dark:text-white font-play truncate">
                                    {formatCardTitle(EXPERIENCE_MILESTONES[item.key]?.company || item.shortName)}
                                  </h4>
                                  <p className="text-[10.5px] text-slate-500 dark:text-slate-400 truncate">
                                    {formatCardTitle(item.roleSummary)}
                                  </p>
                                </div>
                              </div>
                              <span
                                className="text-[9.5px] font-mono font-black px-2 py-0.5 rounded-full text-white shrink-0 shadow-2xs"
                                style={{ background: item.badgeBg }}
                              >
                                {item.yearBadge}
                              </span>
                            </div>

                            <div className="flex flex-col gap-1.5">
                              <span className="text-[9.5px] font-mono font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                                {formatCardTitle('Chỉ số KPI nổi bật')}
                              </span>
                              {(EXPERIENCE_MILESTONES[item.key]?.kpis || [])
                                .slice(0, 3)
                                .map((kpi, kIdx) => {
                                  const kpiVal =
                                    typeof kpi.percent === 'number'
                                      ? `${kpi.percent}%`
                                      : (kpi as unknown as { value?: string }).value || `${item.headcountLabel}`;
                                  return (
                                    <div
                                      key={kIdx}
                                      className="p-1.5 px-2 rounded-lg bg-slate-50 dark:bg-slate-800/80 border border-slate-100 dark:border-white/10 flex items-center justify-between gap-2"
                                    >
                                      <span className="text-[11px] font-medium text-slate-600 dark:text-slate-300 truncate">
                                        {kpi.label}
                                      </span>
                                      <span
                                        className="text-[11.5px] font-black font-mono px-1.5 py-0.2 rounded-md shrink-0"
                                        style={{ color: item.primaryColor }}
                                      >
                                        {kpiVal}
                                      </span>
                                    </div>
                                  );
                                })}
                            </div>

                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setHoveredMilestoneKey(null);
                                handleOpenJobCard(item.key);
                              }}
                              className="w-full py-1.5 px-2 rounded-xl text-white text-[11px] font-bold font-play flex items-center justify-center gap-1.5 transition-all shadow-xs hover:shadow-md hover:brightness-105 cursor-pointer"
                              style={{ background: item.badgeBg }}
                            >
                              <span>Xem Chi Tiết Công Tác</span>
                              <span className="text-xs">→</span>
                            </button>
                          </div>
                        )}
                      </div>

                      {/* Vertical Connector Stem from Banner to Bottom Card */}
                      <div className="flex flex-col items-center shrink-0 z-20">
                        <div
                          className="w-2 h-2 rounded-full -mt-1 shadow-2xs"
                          style={{ backgroundColor: item.primaryColor }}
                        />
                        <div
                          className="w-[2px] h-2"
                          style={{ backgroundColor: item.primaryColor }}
                        />
                        <div
                          className="w-2 h-2 rounded-full -mb-1 z-20 shadow-2xs"
                          style={{ backgroundColor: item.primaryColor }}
                        />
                      </div>

                      {/* TIER 3: Soft Pastel Info Card matching Reference Image 1 */}
                      <div
                        onClick={() => handleSelectMilestone(item.key)}
                        style={{
                          background: isDark
                            ? `radial-gradient(circle at top right, ${item.primaryColor}22 0%, transparent 70%), linear-gradient(160deg, rgba(15, 23, 42, 0.94) 0%, rgba(2, 6, 23, 0.98) 100%)`
                            : item.cardBg,
                          borderColor: isDark
                            ? isSelected
                              ? item.primaryColor
                              : 'rgba(255, 255, 255, 0.16)'
                            : undefined,
                          ['--card-accent-color' as string]: item.primaryColor,
                        }}
                        className={`theme-pastel-card w-full flex-1 min-h-[230px] rounded-[16px] p-3 sm:p-3.5 border backdrop-blur-md transition-all duration-300 cursor-pointer flex flex-col items-center text-center justify-between gap-2 relative group ${
                          !isDark ? item.borderColor : ''
                        } ${
                          isSelected
                            ? `ring-2 ${item.activeRing} shadow-[0_14px_34px_-4px_rgba(30,27,75,0.18)] dark:shadow-[0_16px_36px_-4px_rgba(0,0,0,0.7),0_0_20px_${item.glowColor}] -translate-y-0.5`
                            : 'shadow-[0_8px_24px_-4px_rgba(30,27,75,0.08),0_2px_8px_rgba(15,23,42,0.04)] dark:shadow-[0_12px_28px_-6px_rgba(0,0,0,0.65)] hover:shadow-[0_16px_36px_-4px_rgba(30,27,75,0.16)]'
                        } ${isHighlightedInStory ? 'ring-2 ring-amber-400 shadow-md' : ''}`}
                      >
                        {/* KHỐI 1: CÔNG TY LÀM */}
                        <div className="w-full flex flex-col items-center gap-1 shrink-0 pb-1.5 border-b border-black/5 dark:border-white/10">
                          <div
                            className="flex items-center justify-center gap-1.5 w-full max-w-[98%]"
                            style={{ color: item.primaryColor }}
                          >
                            <div className="shrink-0" style={{ color: item.primaryColor }}>
                              {renderCardMilestoneIcon(item.iconName, item.primaryColor)}
                            </div>
                            <h4
                              className="text-sm sm:text-[14.5px] font-black font-play tracking-tight truncate leading-tight"
                              style={{ color: isDark ? (isSelected ? '#38bdf8' : '#f8fafc') : item.primaryColor }}
                              title={item.shortName}
                            >
                              {formatCardTitle(item.shortName)}
                            </h4>
                          </div>

                          {/* Vị trí đảm nhiệm */}
                          <div className="flex items-center justify-center gap-1 text-[11px] font-bold text-slate-700 dark:text-slate-200 leading-tight truncate max-w-[98%]">
                            <Briefcase className="w-3 h-3 text-slate-500 dark:text-slate-400 shrink-0" />
                            <span className="truncate">{item.roleSummary}</span>
                          </div>

                          {/* Số lượng nhân viên quản lý */}
                          <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/90 dark:bg-slate-800/90 border border-slate-200/90 dark:border-white/15 text-slate-700 dark:text-slate-200 text-[9.5px] font-bold font-mono shadow-2xs">
                            <Users className="w-2.5 h-2.5 shrink-0" style={{ color: item.primaryColor }} />
                            <span>Quản lý: {item.headcountLabel}</span>
                          </div>
                        </div>

                        {/* KHỐI 2: SẢN PHẨM CỦA CÔNG TY */}
                        {item.products && item.products.length > 0 && (
                          <div className="w-full py-1 px-1 flex items-center justify-center gap-2 flex-wrap shrink-0">
                            {item.products.map((p, pIdx) => (
                              <div
                                key={pIdx}
                                className="w-11 h-11 sm:w-12 sm:h-12 rounded-full overflow-hidden bg-white p-0.5 border-2 border-white shadow-[0_4px_12px_rgba(0,0,0,0.12)] shrink-0 flex items-center justify-center transition-all duration-300 hover:scale-110 cursor-pointer"
                                style={{ borderColor: `${item.primaryColor}45` }}
                                title={p.name}
                              >
                                <img
                                  src={p.logo}
                                  alt={p.name}
                                  className="w-full h-full object-contain rounded-full select-none pointer-events-none"
                                />
                              </div>
                            ))}
                          </div>
                        )}

                        {/* KHỐI 3: 3 NHIỆM VỤ CỐT LÕI VỚI NÚT TRÒN ĐẶC MÀU CHUẨN HÌNH THAM KHẢO */}
                        {item.bullets && item.bullets.length > 0 && (
                          <div className="w-full flex-1 flex flex-col justify-center gap-1.5 my-0.5 px-1 text-left">
                            {item.bullets.map((b, bIdx) => (
                              <div
                                key={bIdx}
                                className="flex items-center gap-2 text-[10.5px] sm:text-[11px] font-bold text-slate-700 dark:text-slate-200 leading-tight"
                              >
                                <div
                                  className="w-4 h-4 rounded-full flex items-center justify-center shrink-0 text-white shadow-2xs"
                                  style={{ backgroundColor: item.primaryColor }}
                                >
                                  <Check className="w-2.5 h-2.5 stroke-[3]" />
                                </div>
                                <span className="truncate flex-1">{b.text}</span>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* KHỐI 4: 2 NÚT HÀNH ĐỘNG (QUY MÔ ĐỘI NGŨ > & XEM CHI TIẾT →) CHUẨN HÌNH THAM KHẢO */}
                        <div className="w-full shrink-0 mt-auto flex flex-col gap-1.5 pt-1">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleOpenJobCard(item.key);
                            }}
                            style={{
                              borderColor: `${item.primaryColor}55`,
                              color: isDark ? '#f8fafc' : item.primaryColor,
                            }}
                            className="w-full py-1 px-3 rounded-full bg-white/90 dark:bg-slate-800/90 border text-[10.5px] font-extrabold flex items-center justify-between shadow-2xs hover:brightness-95 transition cursor-pointer"
                          >
                            <span className="flex items-center gap-1.5 truncate">
                              <Users className="w-3 h-3 shrink-0" style={{ color: item.primaryColor }} />
                              <span className="truncate">{item.headcountLabel}</span>
                            </span>
                            <ChevronRight className="w-3 h-3 shrink-0 opacity-75" />
                          </button>

                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleOpenJobCard(item.key);
                            }}
                            style={{
                              backgroundColor: isDark ? `${item.primaryColor}30` : `${item.primaryColor}20`,
                              color: isDark ? '#ffffff' : item.primaryColor,
                              borderColor: `${item.primaryColor}40`,
                            }}
                            className="w-full py-1.5 px-3 rounded-full border text-[10.5px] font-black font-play transition-all flex items-center justify-center gap-1.5 cursor-pointer hover:brightness-95 shadow-2xs"
                          >
                            <span>Xem Chi Tiết</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Bottom Accent Capsule Bar */}
                        <div
                          className="w-12 h-[4px] rounded-full mt-0.5 shrink-0 transition-all duration-300 group-hover:w-16"
                          style={{ backgroundColor: item.primaryColor }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>


          </div>

          {/* TÍNH NĂNG 5: DUAL-MILESTONE BENCHMARK MODAL (SO SÁNH 2 CỘT MỐC SỰ NGHIỆP ĐỐI ĐẦU) */}
          {isBenchmarkModalOpen && (() => {
            const m1 = EXPERIENCE_MILESTONES[benchmarkKeys[0]] || null;
            const m2 = EXPERIENCE_MILESTONES[benchmarkKeys[1]] || null;
            const r1 = roadmapCards.find((c: { key: string }) => c.key === benchmarkKeys[0]) || null;
            const r2 = roadmapCards.find((c: { key: string }) => c.key === benchmarkKeys[1]) || null;

            return (
              <div
                className="fixed inset-0 z-[9999] bg-black/75 backdrop-blur-md flex items-center justify-center p-3 sm:p-5"
                onClick={() => setIsBenchmarkModalOpen(false)}
              >
                <div
                  className="w-full max-w-4xl max-h-[90vh] rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/15 shadow-2xl overflow-hidden flex flex-col animate-fadeIn"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Modal Header */}
                  <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-white/10 flex items-center justify-between gap-3 bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-transparent">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center shadow-xs">
                        <Scale className="w-5 h-5 stroke-[2.4]" />
                      </div>
                      <div>
                        <h3 className="text-base sm:text-lg font-black font-play text-slate-900 dark:text-white">
                          So Sánh Cột Mốc
                        </h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          Đối chiếu quy mô vận hành, chỉ số SLA/CSAT và chuyển đổi mô hình
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setIsBenchmarkModalOpen(false)}
                      className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-rose-500 hover:text-white transition flex items-center justify-center text-slate-500 dark:text-slate-300 cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Benchmark Grid 2 Columns */}
                  <div className="flex-1 min-h-0 overflow-y-auto glass-scrollbar p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    {/* Cột 1 */}
                    <div className="p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50/70 dark:bg-slate-800/50 flex flex-col gap-4">
                      {m1 && r1 ? (
                        <>
                          <div className="flex items-center gap-3 pb-3 border-b border-slate-200 dark:border-white/10">
                            <img
                              src={r1.logo}
                              alt={r1.shortName}
                              className="w-12 h-12 rounded-full object-cover bg-white shadow-xs p-1"
                            />
                            <div>
                              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-cyan-300">
                                {r1.yearBadge}
                              </span>
                              <h4 className="text-sm sm:text-base font-black font-play text-slate-900 dark:text-white mt-0.5">
                                {m1.company}
                              </h4>
                              <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">
                                {m1.roleTitle}
                              </p>
                            </div>
                          </div>

                          <div className="space-y-2.5 text-xs text-slate-700 dark:text-slate-200">
                            <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-black/5 dark:border-white/5 flex items-center justify-between">
                              <span className="font-semibold text-slate-500">Quy mô nhân sự:</span>
                              <strong className="font-mono text-sm text-blue-600 dark:text-cyan-400">{r1.headcountLabel}</strong>
                            </div>

                            <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-black/5 dark:border-white/5 flex items-center justify-between">
                              <span className="font-semibold text-slate-500">Chỉ số nổi bật:</span>
                              <div className="flex items-center gap-1.5 font-mono font-bold text-emerald-600 dark:text-emerald-400">
                                <span>{m1.kpis?.[0]?.label}: {m1.kpis?.[0]?.percent}%</span>
                              </div>
                            </div>

                            <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-black/5 dark:border-white/5">
                              <span className="font-semibold text-slate-500 block mb-1">Nhiệm vụ & Chiến lược:</span>
                              <p className="line-clamp-3 leading-relaxed text-slate-600 dark:text-slate-300">
                                {m1.cardDescription || r1.roleSummary}
                              </p>
                            </div>
                          </div>
                        </>
                      ) : (
                        <div className="text-center py-10 text-slate-400">Chưa chọn cột mốc 1</div>
                      )}
                    </div>

                    {/* Cột 2 */}
                    <div className="p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50/70 dark:bg-slate-800/50 flex flex-col gap-4">
                      {m2 && r2 ? (
                        <>
                          <div className="flex items-center gap-3 pb-3 border-b border-slate-200 dark:border-white/10">
                            <img
                              src={r2.logo}
                              alt={r2.shortName}
                              className="w-12 h-12 rounded-full object-cover bg-white shadow-xs p-1"
                            />
                            <div>
                              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300">
                                {r2.yearBadge}
                              </span>
                              <h4 className="text-sm sm:text-base font-black font-play text-slate-900 dark:text-white mt-0.5">
                                {m2.company}
                              </h4>
                              <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">
                                {m2.roleTitle}
                              </p>
                            </div>
                          </div>

                          <div className="space-y-2.5 text-xs text-slate-700 dark:text-slate-200">
                            <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-black/5 dark:border-white/5 flex items-center justify-between">
                              <span className="font-semibold text-slate-500">Quy mô nhân sự:</span>
                              <strong className="font-mono text-sm text-purple-600 dark:text-purple-400">{r2.headcountLabel}</strong>
                            </div>

                            <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-black/5 dark:border-white/5 flex items-center justify-between">
                              <span className="font-semibold text-slate-500">Chỉ số nổi bật:</span>
                              <div className="flex items-center gap-1.5 font-mono font-bold text-emerald-600 dark:text-emerald-400">
                                <span>{m2.kpis?.[0]?.label}: {m2.kpis?.[0]?.percent}%</span>
                              </div>
                            </div>

                            <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-black/5 dark:border-white/5">
                              <span className="font-semibold text-slate-500 block mb-1">Nhiệm vụ & Chiến lược:</span>
                              <p className="line-clamp-3 leading-relaxed text-slate-600 dark:text-slate-300">
                                {m2.cardDescription || r2.roleSummary}
                              </p>
                            </div>
                          </div>
                        </>
                      ) : (
                        <div className="text-center py-10 text-slate-400">
                          <p className="font-bold">Chưa chọn cột mốc thứ 2</p>
                          <p className="text-xs mt-1">Bấm vào biểu tượng cân đong trên thẻ để chọn</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Modal Footer */}
                  <div className="p-4 border-t border-slate-200 dark:border-white/10 flex items-center justify-between gap-3 bg-slate-50 dark:bg-slate-950">
                    <button
                      type="button"
                      onClick={() => setBenchmarkKeys([])}
                      className="px-3.5 py-1.5 rounded-xl text-xs font-bold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition cursor-pointer"
                    >
                      Xóa so sánh
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsBenchmarkModalOpen(false)}
                      className="px-5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-xs hover:brightness-105 transition cursor-pointer shadow-sm"
                    >
                      Đóng bảng so sánh
                    </button>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* 3 bottom modules (Thành tựu nổi bật, Từ trải nghiệm đến giá trị, Kỹ năng & Chuyên môn) đã được xóa theo yêu cầu */}
        </>
      ) : (
        /* CAREER DEVELOPMENT VIEW - FULL CHIỀU CAO */
        <div className="w-full flex-1 min-h-0 flex flex-col justify-between gap-4 animate-fadeIn">
          {/* Header Box */}
          <div className="p-4 sm:p-5 rounded-[14px] bg-white/85 dark:bg-slate-900/85 backdrop-blur-xl border border-white/95 dark:border-white/10 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/70 border border-blue-200/80 dark:border-blue-800 flex items-center justify-center text-blue-600 dark:text-cyan-400 shadow-2xs">
                <TrendingUp className="w-5 h-5 stroke-[2.2]" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-black font-play text-slate-900 dark:text-white">
                  {formatCardTitle("Lộ trình phát triển")}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                  Hành trình chuyển hóa từ Chuyên viên nghiệp vụ đến Giám đốc Trải nghiệm Khách hàng (CX Director)
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setActiveTab('history')}
              className="px-3.5 py-1.5 rounded-xl bg-blue-50 dark:bg-blue-950 hover:bg-blue-100 dark:hover:bg-blue-900 text-blue-700 dark:text-cyan-300 font-bold text-xs border border-blue-200 dark:border-blue-800 transition-all flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Xem Lịch sử công tác</span>
            </button>
          </div>

          {/* 4 Progression Stage Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3.5 flex-1 min-h-0 items-stretch">
            {[
              {
                stage: 'Giai đoạn 1',
                period: '2003 – 2007',
                role: 'Chuyên viên CSKH Viễn Thông',
                company: 'MobiFone',
                badgeBg: 'bg-blue-50 text-blue-700 border-blue-200/90',
                color: '#0c85f3',
                points: [
                  'Tiếp nhận & tư vấn dịch vụ di động',
                  'Rèn luyện kỷ luật quy trình & thấu cảm',
                  'Xử lý khiếu nại cước & dịch vụ VAS',
                ],
              },
              {
                stage: 'Giai đoạn 2',
                period: '2007 – 2013',
                role: 'Giám sát & Quản lý CSKH',
                company: 'Viễn Liên V247 & LBC HTVC',
                badgeBg: 'bg-purple-50 text-purple-700 border-purple-200/90',
                color: '#8042f6',
                points: [
                  'Lãnh đạo nhóm tư vấn & giám sát ca',
                  'Xây dựng SOP truyền hình & internet đa kênh',
                  'Đào tạo & huấn luyện nhân sự mới',
                ],
              },
              {
                stage: 'Giai đoạn 3',
                period: '2013 – 2023',
                role: 'Chỉ Huy Contact Center & FinTech',
                company: 'VED (Shopee/AirPay), MoMo, Finviet',
                badgeBg: 'bg-amber-50 text-amber-800 border-amber-200/90',
                color: '#f9a800',
                points: [
                  'Thiết lập trung tâm CSKH 130 nhân sự',
                  'Chuyển đổi số đa kênh, SLA 98.6%, CSAT 98.2%',
                  'Phục vụ hàng chục triệu người dùng số',
                ],
              },
              {
                stage: 'Giai đoạn 4',
                period: '2026+',
                role: 'Head of CS / CX Director',
                company: 'Chiến Lược CX 2026+',
                badgeBg: 'bg-emerald-50 text-emerald-800 border-emerald-200/90',
                color: '#059669',
                points: [
                  'Định hình chiến lược trải nghiệm toàn diện',
                  'Tích hợp AI Agents, CRM chuyên sâu',
                  'Phát triển văn hóa lấy khách hàng làm trọng tâm',
                ],
              },
            ].map((stg, sIdx) => (
              <div
                key={sIdx}
                className="p-4 rounded-[14px] bg-white/85 dark:bg-slate-900/85 backdrop-blur-xl border border-white/95 dark:border-white/10 shadow-[0_8px_24px_-4px_rgba(30,27,75,0.05)] dark:shadow-[0_8px_24px_-4px_rgba(0,0,0,0.5)] flex flex-col justify-between gap-3 hover:shadow-md  transition-all"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className={`text-[10px] font-mono font-black px-2.5 py-0.5 rounded-full border shadow-2xs ${stg.badgeBg}`}>
                      {stg.stage}
                    </span>
                    <span className="text-[11px] font-mono font-bold text-slate-500 dark:text-slate-400">
                      {stg.period}
                    </span>
                  </div>
                  <h4 className="text-xs sm:text-sm font-black font-play text-[#1E1B4B] dark:text-white leading-snug">
                    {stg.role}
                  </h4>
                  <p className="text-[11px] font-bold text-slate-600 dark:text-slate-300 mt-0.5">
                    {stg.company}
                  </p>
                </div>

                <div className="flex flex-col gap-1.5 pt-2.5 border-t border-slate-100 dark:border-white/10">
                  {stg.points.map((pt, pIdx) => (
                    <div key={pIdx} className="flex items-start gap-1.5 text-[11px] text-slate-600 dark:text-slate-300 leading-tight">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* 4 Pillars of CX Excellence */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3.5">
            {[
              {
                title: formatCardTitle('Con người văn hóa'),
                desc: 'Xây dựng đội ngũ gắn kết, coaching liên tục, đào tạo tư duy phụng sự và chuẩn mực phục vụ tận tâm.',
                icon: Users,
                color: 'text-blue-600 dark:text-cyan-400',
                hex: '#0284c7',
                glow: 'rgba(2,132,199,0.4)',
              },
              {
                title: formatCardTitle('Quy trình tiêu chuẩn'),
                desc: 'Chuẩn hóa SOP, ma trận Escalation, kiểm soát chất lượng QA/QC, cam kết SLA/KPI minh bạch.',
                icon: FileText,
                color: 'text-purple-600 dark:text-purple-300',
                hex: '#9333ea',
                glow: 'rgba(147,51,234,0.4)',
              },
              {
                title: formatCardTitle('Công nghệ AI CRM'),
                desc: 'Ứng dụng Omnichannel Contact Center, Voice AI, Chatbot tự động và hệ thống CRM thông minh.',
                icon: Settings,
                color: 'text-emerald-600 dark:text-emerald-400',
                hex: '#059669',
                glow: 'rgba(5,150,105,0.4)',
              },
              {
                title: formatCardTitle('Dữ liệu giá trị'),
                desc: 'Lắng nghe Tiếng nói Khách hàng (VOC), phân tích CSAT/NPS/FCR để cải tiến liên tục sản phẩm và dịch vụ.',
                icon: Target,
                color: 'text-amber-600 dark:text-amber-300',
                hex: '#d97706',
                glow: 'rgba(217,119,6,0.4)',
              },
            ].map((pillar, pIdx) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pIdx}
                  className="p-3.5 rounded-[14px] bg-white/85 dark:bg-slate-900/85 backdrop-blur-xl border border-white/95 dark:border-white/10 shadow-[0_6px_20px_-3px_rgba(30,27,75,0.04)] dark:shadow-[0_6px_20px_-3px_rgba(0,0,0,0.5)] flex flex-col gap-2 hover:shadow-md transition-all group/pillar"
                >
                  <div className="flex items-center gap-2">
                    <GlassmorphicIconFrame
                      size="sm"
                      color={pillar.hex}
                      glowColor={pillar.glow}
                      springBounce
                    >
                      <Icon className="w-3.5 h-3.5" />
                    </GlassmorphicIconFrame>
                    <h4 className="text-xs font-black font-play text-[#1E1B4B] dark:text-white leading-tight">
                      {pillar.title}
                    </h4>
                  </div>
                  <p className="text-[11px] text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  )}

      {/* =====================================================================
          5. THẺ CHI TIẾT CỘT MỐC ĐANG CHỌN (TỐI ƯU HÓA TOÀN DIỆN CHO TẤT CẢ CỘT MỐC)
          ===================================================================== */}
      {showJobCard && (() => {
        const isVedMilestone = activeKey === '2013' || activeKey.startsWith('2013');
        const contentKey = (activeKey === '2014' || activeKey === '2015' || activeKey.startsWith('2013') || activeKey === '2014-airpay') ? '2013' : activeKey;
        const customContent = MILESTONE_CUSTOM_CONTENT[contentKey] || MILESTONE_CUSTOM_CONTENT['2013'];

        // Lĩnh vực hoạt động lấy trực tiếp từ activeMilestone.industry (hoặc domains dự phòng)
        const domainsList = activeMilestone.industry
          ? activeMilestone.industry
              .split('/')
              .map((s) => s.trim())
              .filter(Boolean)
              .map((label) => {
                const lower = label.toLowerCase();
                const icon = lower.includes('game') || lower.includes('esport')
                  ? '🎮'
                  : lower.includes('tmđt') || lower.includes('e-commerce') || lower.includes('shopee')
                  ? '🛒'
                  : lower.includes('fintech') || lower.includes('ví') || lower.includes('tài chính') || lower.includes('thanh toán')
                  ? '💳'
                  : lower.includes('bảo hiểm')
                  ? '🛡️'
                  : lower.includes('viễn thông') || lower.includes('internet') || lower.includes('truyền hình') || lower.includes('truyền thông')
                  ? '📡'
                  : lower.includes('bưu chính')
                  ? '📦'
                  : lower.includes('công nghệ') || lower.includes('crm') || lower.includes('chuyển đổi số')
                  ? '🤖'
                  : '🎧';
                return { icon, label };
              })
          : activeMilestone.domains && activeMilestone.domains.length > 0
          ? activeMilestone.domains.slice(0, 6).map((d) => ({
              icon: d.tag === 'TeleCom' ? '📡' : d.tag === 'Inbound' ? '🎧' : d.tag === 'Escalation' ? '⚡' : d.tag === 'FinTech' ? '💳' : d.tag === 'Coaching' ? '👥' : '🎯',
              label: d.title,
            }))
          : [
              { icon: '🎯', label: 'Chăm sóc khách hàng' },
              { icon: '⚙️', label: 'Vận hành hệ thống' },
              { icon: '📊', label: 'Kiểm soát chất lượng' },
              { icon: '👥', label: 'Đào tạo đội ngũ' },
            ];

        interface BrandBadgeItem {
          name: string;
          logo?: string;
          isCustomLogo?: boolean;
          textBadge?: boolean;
          textColor?: string;
        }

        // Các thương hiệu tiêu biểu & sản phẩm trực thuộc cột mốc
        const matchedRoadmap = roadmapCards.find((r) => r.key === activeKey);
        const milestoneProducts = (activeMilestone.products && activeMilestone.products.length > 0)
          ? activeMilestone.products.map((p: any) => ({
              name: p.name || p.alt || activeMilestone.company,
              logo: p.logo || p.src || activeMilestone.logo,
            }))
          : (matchedRoadmap?.products || []);

        const brandsList: BrandBadgeItem[] = isVedMilestone
          ? [
              { name: 'VED', logo: 'https://i.ibb.co/fYPJLfbw/VED.png', isCustomLogo: true },
              { name: 'Garena', logo: 'https://i.ibb.co/h1Md65yV/Garena.png', isCustomLogo: true },
              { name: 'Shopee', logo: 'https://i.ibb.co/BSVS4xf/Shopee.png', isCustomLogo: true },
              { name: 'ShopeePay', logo: 'https://i.ibb.co/LdYv3TJy/Shopee-Paye.png', isCustomLogo: true },
              { name: 'GCafe', logo: 'https://i.ibb.co/FkWk3s4W/GCafe.png', isCustomLogo: true },
              { name: 'LMHT & LQMB', textBadge: true, textColor: 'text-amber-700 dark:text-amber-400' },
            ]
          : milestoneProducts.length > 0
          ? milestoneProducts.map((p: any) => ({
              name: p.name || activeMilestone.company,
              logo: p.logo || activeMilestone.logo,
              isCustomLogo: true,
            }))
          : [
              { name: activeMilestone.company, logo: activeMilestone.logo, isCustomLogo: true },
            ];

        // Danh sách hình ảnh kỷ niệm: ưu tiên memoryImg ở vị trí đầu tiên (Main Photo)
        const basePhotos = activeMilestone.photos || [];
        const primaryMemoryPhoto = activeMilestone.memoryImg
          ? [
              {
                src: activeMilestone.memoryImg,
                title: activeMilestone.company,
                desc: `${activeMilestone.roleTitle} (${activeMilestone.period})`,
              },
            ]
          : [];
        const photosList = [
          ...primaryMemoryPhoto,
          ...basePhotos.filter((p) => p.src !== activeMilestone.memoryImg),
        ];
        if (photosList.length === 0) {
          photosList.push({
            src: activeMilestone.logo,
            title: activeMilestone.company,
            desc: 'Đồng hành cùng khách hàng, kiến tạo giá trị',
          });
        }

        // Danh sách Mô tả công việc lấy trực tiếp từ activeMilestone.tasks
        const tasksList =
          activeMilestone.tasks && activeMilestone.tasks.length > 0
            ? activeMilestone.tasks
            : [
                'Quản lý và điều hành toàn diện hoạt động phòng CSKH',
                'Thiết lập chỉ số KPI/SLA và cơ chế giám sát chất lượng',
                'Tối ưu hóa quy trình tiếp nhận và xử lý khiếu nại',
              ];

        // Danh sách Dự án trọng điểm lấy trực tiếp từ activeMilestone.projects
        const projectsList =
          activeMilestone.projects && activeMilestone.projects.length > 0
            ? activeMilestone.projects.map((p, idx) => {
                const hasPrefix = /^\d+(\.\d+)?\s*[·.-]/.test(p.trim());
                return {
                  title: hasPrefix ? p : `${idx + 1}. ${p}`,
                  subtitle: 'Dự án trọng điểm triển khai trong giai đoạn công tác',
                };
              })
            : [
                { title: '1. Chuẩn hóa quy trình vận hành CSKH', subtitle: 'Tối ưu năng suất và trải nghiệm khách hàng' },
                { title: '2. Ứng dụng giải pháp số hóa dịch vụ', subtitle: 'Giảm thời gian xử lý và kiểm soát rủi ro' },
              ];

        // Danh sách Cam kết chất lượng lấy trực tiếp từ activeMilestone.commitments
        const commitmentsList =
          activeMilestone.commitments && activeMilestone.commitments.length > 0
            ? activeMilestone.commitments
            : customContent.commitments.map((c) => `${c.title}: ${c.desc}`);

        // Danh sách Kết quả KPI lấy trực tiếp từ activeMilestone.kpis
        const kpisList =
          activeMilestone.kpis && activeMilestone.kpis.length > 0
            ? activeMilestone.kpis.map((k, idx) => ({
                label: k.label,
                percent: k.percent,
                displayValue: k.displayValue || `${k.percent}%`,
                barColor: idx === 2 ? 'bg-indigo-600' : 'bg-emerald-500',
              }))
            : [
                { label: 'Tiêu chuẩn chất lượng SOP', percent: 100, displayValue: '100%', barColor: 'bg-emerald-500' },
                { label: 'Tỷ lệ giải quyết FCR', percent: 92, displayValue: '92%', barColor: 'bg-emerald-500' },
                { label: 'Mức độ hài lòng CSAT', percent: 98, displayValue: '98%', barColor: 'bg-indigo-600' },
              ];

        // Danh sách Giới thiệu (3 trụ cột + Triết Lý Quản Trị)
        const introPillars =
          activeMilestone.intro && activeMilestone.intro.length > 0
            ? activeMilestone.intro
            : customContent.pillars.slice(0, 3).map((p) => ({ title: p.title, desc: p.desc }));

        const philosophyText =
          activeMilestone.philosophy ||
          'Khách hàng là trung tâm — Kiến tạo giá trị dịch vụ bền vững và chuẩn hóa vận hành xuất sắc.';

        return (
          <div className="w-full flex flex-col gap-3.5 sm:gap-4 text-left transition-all duration-300 animate-fadeIn mt-0.5 font-play">
            {/* 1. TOP HEADER ROW: THẺ JOB CARD BO CONG 4 GÓC (NÚT QUAY LẠI & BỘ LỌC CỘT MỐC NHANH) */}
            <div className="w-full p-3 sm:p-3.5 px-4 sm:px-5 rounded-[14px] bg-white/85 dark:bg-slate-900/85 backdrop-blur-xl border border-white/95 dark:border-white/10 shadow-[0_10px_30px_-5px_rgba(30,27,75,0.05)] dark:shadow-[0_10px_30px_-5px_rgba(0,0,0,0.5)] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setShowJobCard(false)}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs font-bold text-slate-700 dark:text-slate-200 bg-slate-100/90 dark:bg-slate-800/90 hover:bg-slate-200/90 dark:hover:bg-slate-700 border border-slate-200/80 dark:border-white/10 shadow-2xs transition-all cursor-pointer active:scale-95 group self-start sm:self-auto shrink-0"
              >
                <ArrowLeft className="w-3.5 h-3.5 stroke-[2.4] text-blue-600 dark:text-blue-400 group-hover:-translate-x-0.5 transition-transform" />
                <span>Quay lại danh sách Kinh Nghiệm</span>
              </button>

              {/* Thông tin mốc đang xem */}
              <div className="hidden md:flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
                <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
                {activeMilestone.code && (
                  <span className="px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-mono text-[10.5px] font-black">
                    Mục {activeMilestone.code}
                  </span>
                )}
                <span className="font-play font-bold text-slate-800 dark:text-slate-100">
                  {activeMilestone.company}
                </span>
                <span className="font-mono text-[11px] text-blue-600 dark:text-blue-400 font-bold">
                  ({activeMilestone.period})
                </span>
              </div>

              {/* Thanh chuyển mốc nhanh tiện lợi */}
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 max-w-full">
                {allMilestoneKeys.map((k) => {
                  const isCur = k === normalizedActiveKey;
                  const m = EXPERIENCE_MILESTONES[k];
                  return (
                    <button
                      key={k}
                      type="button"
                      onClick={() => setActiveKey(k)}
                      className={`px-2.5 sm:px-3 py-1 rounded-full text-[10.5px] sm:text-[11px] font-black font-mono transition-all shrink-0 cursor-pointer ${
                        isCur
                          ? 'bg-blue-600 text-white shadow-xs scale-105 ring-2 ring-blue-300 dark:ring-blue-800'
                          : 'bg-white/80 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 border border-slate-200/70 dark:border-white/10'
                      }`}
                      title={`${m?.code ? `${m.code}. ` : ''}${m?.company || k}`}
                    >
                      {m?.code ? `${m.code} · ${m.year === '2026' ? '2026+' : m.year}` : m?.year || k}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. SECTION 1: TOP PROFILE CARD (MASTER COMPANY & ROLES CARD) */}
            <div className="w-full p-4 sm:p-5 rounded-[14px] bg-white/85 dark:bg-slate-900/85 backdrop-blur-xl border border-white/95 dark:border-white/10 shadow-[0_10px_30px_-5px_rgba(30,27,75,0.05)] dark:shadow-[0_10px_30px_-5px_rgba(0,0,0,0.5)] grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
              {/* Col 1-5: Logo & Company Name & Roles & Scale */}
              <div className="lg:col-span-5 flex items-start sm:items-center gap-3.5 min-w-0">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-white/10 shadow-xs p-2 flex items-center justify-center shrink-0">
                  <img
                    src={activeMilestone.logo}
                    alt={activeMilestone.company}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {activeMilestone.code && (
                      <span className="px-2 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 border border-indigo-200/80 dark:border-indigo-800 text-[10px] font-mono font-black shrink-0">
                        {activeMilestone.code}
                      </span>
                    )}
                    <h3 className="text-sm sm:text-base font-black font-play text-[#1E1B4B] dark:text-white leading-snug break-words">
                      {activeMilestone.company}
                    </h3>
                  </div>
                  <p className="text-[11.5px] font-bold text-sky-600 dark:text-sky-400 mt-1 leading-snug break-words flex items-center gap-1.5">
                    <Briefcase className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400 shrink-0" />
                    <span>Vị trí: {activeMilestone.roleTitle}</span>
                  </p>
                  <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-sky-50/80 dark:bg-sky-950/60 text-sky-800 dark:text-sky-300 border border-sky-200/80 dark:border-sky-800/80 text-[10px] font-bold font-mono shadow-2xs">
                      <Calendar className="w-3 h-3 text-sky-600 dark:text-sky-400 shrink-0" />
                      <span>{activeMilestone.period}</span>
                    </span>
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-blue-50/80 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300 border border-blue-200/80 dark:border-blue-800/80 text-[10px] font-bold font-mono shadow-2xs">
                      <Users className="w-3 h-3 text-blue-600 dark:text-blue-400 shrink-0" />
                      <span className="break-words">Quản lý: {activeMilestone.headcount ? `${activeMilestone.headcount} nhân sự` : activeMilestone.scaleDesc}</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Col 6-9: Lĩnh vực hoạt động */}
              <div className="lg:col-span-4 border-t lg:border-t-0 lg:border-l border-slate-200/70 dark:border-white/10 pt-3 lg:pt-0 lg:pl-4">
                <div className="flex items-center gap-1.5 mb-2">
                  <div className="w-1 h-3.5 bg-blue-600 rounded-full" />
                  <h4 className="text-xs font-black font-play text-[#1E1B4B] dark:text-white">
                    {formatCardTitle("Lĩnh vực hoạt động")}
                  </h4>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {domainsList.map((d, dIdx) => (
                    <div
                      key={dIdx}
                      className="p-1 px-2 rounded-lg bg-sky-50/70 dark:bg-sky-950/40 border border-sky-100 dark:border-sky-900/60 flex items-center gap-1.5 text-[10px] font-bold text-sky-800 dark:text-sky-300 shadow-2xs"
                    >
                      <span className="shrink-0">{d.icon}</span>
                      <span>{d.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Col 10-12: Các thương hiệu tiêu biểu */}
              <div className="lg:col-span-3 border-t lg:border-t-0 lg:border-l border-slate-200/70 dark:border-white/10 pt-3 lg:pt-0 lg:pl-4">
                <h4 className="text-xs font-black font-play text-[#1E1B4B] dark:text-white mb-2">
                  {formatCardTitle("Thương hiệu tiêu biểu")}
                </h4>
                <div className="grid grid-cols-3 gap-2 items-center">
                  {brandsList.map((b, bIdx) => (
                    <div
                      key={bIdx}
                      className="p-1.5 rounded-xl bg-white/90 dark:bg-slate-800/90 border border-slate-200/80 dark:border-white/10 flex items-center justify-center h-12 sm:h-13 hover:bg-white dark:hover:bg-slate-700 hover:scale-105 shadow-xs transition-all"
                      title={b.name}
                    >
                      {b.logo ? (
                        <img src={b.logo} alt={b.name} className="max-h-9 sm:max-h-10 max-w-[90%] object-contain drop-shadow-xs" />
                      ) : (
                        <span className={`text-[10px] font-black uppercase text-center leading-tight truncate px-1 ${b.textColor || 'text-slate-800 dark:text-slate-200'}`}>
                          {b.name}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 3. SECTION 2: 2 CARDS (Hình ảnh kỷ niệm & Hero Banner) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 items-stretch">
              {/* Left Card (Cols 1-5): Hình ảnh kỷ niệm */}
              <div className="lg:col-span-5 rounded-[14px] bg-white/85 dark:bg-slate-900/85 backdrop-blur-xl border border-white/95 dark:border-white/10 p-4 shadow-xs flex flex-col justify-between gap-2.5">
                <div className="flex items-center justify-between pb-1.5 border-b border-slate-100 dark:border-white/10">
                  <div className="flex items-center gap-2">
                    <Camera className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    <h4 className="text-xs sm:text-sm font-black font-play text-[#1E1B4B] dark:text-white">
                      {formatCardTitle("Hình ảnh kỷ niệm")}
                    </h4>
                    <span className="text-[10px] font-mono font-bold text-slate-500 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full border border-slate-200/80 dark:border-white/10">
                      📸 {photosList.length} ảnh
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setCarouselSlideIdx(0);
                      setIsPhotoLightboxOpen(true);
                    }}
                    className="text-[11px] font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 cursor-pointer"
                  >
                    Phóng to ảnh
                  </button>
                </div>

                <div className="grid grid-cols-12 gap-2 h-44 sm:h-48">
                  {/* Main Big Photo on Left (8 cols) */}
                  <div
                    onClick={() => {
                      setCarouselSlideIdx(0);
                      setIsPhotoLightboxOpen(true);
                    }}
                    className={`${photosList.length > 1 ? 'col-span-8' : 'col-span-12'} rounded-xl overflow-hidden relative cursor-pointer group shadow-inner bg-slate-950`}
                  >
                    <img
                      src={photosList[0]?.src || activeMilestone.memoryImg || activeMilestone.logo}
                      alt={activeMilestone.company}
                      className="w-full h-full object-cover  transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent flex flex-col justify-end p-2.5">
                      <span className="text-[10.5px] font-black text-white font-play truncate">
                        {photosList[0]?.title || activeMilestone.company}
                      </span>
                      <span className="text-[9px] text-slate-200 truncate">
                        {photosList[0]?.desc || 'Đồng hành cùng khách hàng, kiến tạo giá trị'}
                      </span>
                    </div>
                  </div>

                  {/* 2 Stacked Thumbnails on Right (4 cols) */}
                  {photosList.length > 1 && (
                    <div className="col-span-4 flex flex-col gap-2 h-full">
                      <div
                        onClick={() => {
                          setCarouselSlideIdx(1);
                          setIsPhotoLightboxOpen(true);
                        }}
                        className="flex-1 rounded-xl overflow-hidden relative cursor-pointer group bg-slate-950 shadow-inner"
                      >
                        <img
                          src={photosList[1]?.src || photosList[0]?.src}
                          alt="Thumbnail"
                          className="w-full h-full object-cover  transition-transform duration-500"
                        />
                      </div>
                      <div
                        onClick={() => {
                          setCarouselSlideIdx(photosList.length > 2 ? 2 : 0);
                          setIsPhotoLightboxOpen(true);
                        }}
                        className="flex-1 rounded-xl overflow-hidden relative cursor-pointer group bg-slate-950 shadow-inner"
                      >
                        <img
                          src={photosList[2]?.src || photosList[0]?.src}
                          alt="Thumbnail"
                          className="w-full h-full object-cover  transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-black/50 hover:bg-black/40 flex items-center justify-center text-white font-bold text-xs">
                          +{photosList.length > 3 ? photosList.length - 2 : 1}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Card (Cols 6-12): Hero Banner with Dynamic Gradient & Banner Image */}
              <div className={`lg:col-span-7 rounded-[14px] bg-gradient-to-r ${customContent.gradient} text-white p-4 sm:p-5 shadow-md flex flex-col justify-between relative overflow-hidden min-h-[220px] group/banner`}>
                {/* Right side banner image with automatic fallback to memoryImg if short link */}
                <div className="absolute right-0 top-0 bottom-0 w-1/2 sm:w-[48%] opacity-90 sm:opacity-95 pointer-events-none flex items-center justify-end overflow-hidden">
                  <img
                    src={activeMilestone.bannerUrl || activeMilestone.memoryImg || 'https://i.ibb.co/jknPRhj3/VED.png'}
                    alt={activeMilestone.company}
                    onError={(e) => {
                      const target = e.currentTarget;
                      const fallback = activeMilestone.memoryImg || 'https://i.ibb.co/jknPRhj3/VED.png';
                      if (target.src !== fallback) {
                        target.src = fallback;
                      }
                    }}
                    className="h-full w-full object-cover object-right group-hover/banner:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/25 to-transparent" />
                </div>

                <div className="relative z-10 max-w-[62%] sm:max-w-[56%] space-y-2">
                  <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/30 shadow-xs">
                    <img
                      src={activeMilestone.logo}
                      alt="Logo"
                      className="h-7 sm:h-8 max-w-[90px] object-contain bg-white rounded px-1.5 py-0.5 shadow-2xs"
                    />
                    <span className="text-[11px] font-mono font-black text-white/95">
                      {activeMilestone.period}
                    </span>
                  </div>
                  <h3 className="text-base sm:text-xl font-black font-play leading-tight text-white drop-shadow-sm">
                    {activeMilestone.company}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-white/95 font-semibold leading-relaxed drop-shadow-xs">
                    {activeMilestone.roleTitle} • {activeMilestone.scaleDesc}
                  </p>
                  <p className="text-[10.5px] text-white/90 font-medium leading-relaxed line-clamp-2">
                    Lĩnh vực: {activeMilestone.industry}
                  </p>
                </div>

                {/* Brand strip at bottom of banner (Chỉ để logo không để tên) */}
                <div className="relative z-10 pt-3 flex items-center gap-2 flex-wrap">
                  {brandsList.map((b, bIdx) => (
                    <div
                      key={bIdx}
                      className="logo-pill-light p-1.5 px-3 rounded-full bg-white/95 dark:bg-slate-800/95 text-slate-800 dark:text-slate-100 border border-slate-200/80 dark:border-white/20 text-[10px] font-bold shadow-xs flex items-center justify-center hover:scale-105 transition-transform"
                      title={b.name}
                    >
                      {b.logo ? (
                        <img src={b.logo} alt={b.name} className="h-6 sm:h-7 max-w-[100px] object-contain drop-shadow-xs" />
                      ) : (
                        <span>{b.name}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 4. SECTION 3: GIỚI THIỆU (3 TRỤ CỘT TRỌNG TÂM) & TRIẾT LÝ QUẢN TRỊ */}
            <div className="w-full rounded-[14px] bg-white/85 dark:bg-slate-900/85 backdrop-blur-xl border border-white/95 dark:border-white/10 p-4 sm:p-5 shadow-xs flex flex-col justify-between gap-3.5">
              {/* Header */}
              <div className="flex items-center justify-between gap-3 border-b border-slate-100 dark:border-white/10 pb-2.5">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-950/70 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0 shadow-2xs">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-black font-play text-[#1E1B4B] dark:text-white leading-tight">
                      {formatCardTitle("Triết lý quản trị")}
                    </h4>
                    <p className="text-[10.5px] text-slate-500 dark:text-slate-400 font-medium">
                      Định hướng trọng tâm và triết lý điều hành tại {activeMilestone.company}
                    </p>
                  </div>
                </div>
              </div>

              {/* 3 Trụ cột Giới thiệu + Khối Triết Lý Quản Trị */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 items-stretch">
                {introPillars.map((item, pIdx) => {
                  const styleConfigs = [
                    {
                      icon: UserCheck,
                      color: 'text-rose-600 dark:text-rose-300',
                      cardBg: 'bg-rose-50/40 dark:bg-rose-950/20 border-rose-100 dark:border-rose-900/40',
                      hex: '#e11d48',
                      glow: 'rgba(225,29,72,0.45)',
                    },
                    {
                      icon: Headset,
                      color: 'text-blue-600 dark:text-blue-300',
                      cardBg: 'bg-blue-50/40 dark:bg-blue-950/20 border-blue-100 dark:border-blue-900/40',
                      hex: '#2563eb',
                      glow: 'rgba(37,99,235,0.45)',
                    },
                    {
                      icon: ShieldCheck,
                      color: 'text-emerald-600 dark:text-emerald-300',
                      cardBg: 'bg-emerald-50/40 dark:bg-emerald-950/20 border-emerald-100 dark:border-emerald-900/40',
                      hex: '#059669',
                      glow: 'rgba(5,150,105,0.45)',
                    },
                  ];
                  const cfg = styleConfigs[pIdx % styleConfigs.length];
                  const IconComponent = cfg.icon;
                  return (
                    <div
                      key={pIdx}
                      className={`flex flex-col gap-1.5 p-3 rounded-2xl border ${cfg.cardBg} transition-all duration-300 hover:shadow-md group/intro-card`}
                    >
                      <div className="flex items-center gap-2">
                        <GlassmorphicIconFrame
                          size="sm"
                          color={cfg.hex}
                          glowColor={cfg.glow}
                          springBounce
                        >
                          <IconComponent className="w-3.5 h-3.5" />
                        </GlassmorphicIconFrame>
                        <span className={`text-xs font-black font-play leading-snug ${cfg.color}`}>
                          {pIdx + 1}. {item.title}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  );
                })}

                {/* Card 4: Triết Lý Quản Trị - Đổi màu năng động theo phân hệ công ty */}
                {(() => {
                  const activeCompanyName = activeMilestone?.company || 'MobiFone';
                  const activeCategoryTheme = getCategoryTheme(activeCompanyName);
                  return (
                    <div className="flex flex-col gap-1.5 p-3 rounded-2xl bg-gradient-to-br from-purple-50/80 via-indigo-50/60 to-blue-50/80 dark:from-purple-950/40 dark:via-indigo-950/30 dark:to-slate-900 border border-purple-200/80 dark:border-purple-800/60 transition-all duration-300 hover:shadow-md group/philosophy-card">
                      <div className="flex items-center gap-2">
                        <GlassmorphicIconFrame
                          size="sm"
                          color={activeCategoryTheme.color}
                          glowColor={activeCategoryTheme.glow}
                          springBounce
                        >
                          <HeartHandshake className="w-3.5 h-3.5" />
                        </GlassmorphicIconFrame>
                        <span
                          className="text-xs font-black font-play leading-snug transition-colors"
                          style={{ color: activeCategoryTheme.color }}
                        >
                          {formatCardTitle("Triết lý quản trị")}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-700 dark:text-slate-200 font-semibold leading-relaxed">
                        {philosophyText}
                      </p>
                    </div>
                  );
                })()}
              </div>
            </div>

            {/* 5. SECTION 4: 3-COLUMN DETAILED WORK BREAKDOWN */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-3.5 items-stretch">
              {/* Column 1: Mô tả công việc */}
              <div className="rounded-[14px] bg-white/85 dark:bg-slate-900/85 backdrop-blur-xl border border-white/95 dark:border-white/10 p-4 sm:p-5 shadow-xs flex flex-col justify-between gap-3">
                <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-white/10">
                  <div className="w-7 h-7 rounded-full bg-blue-100 dark:bg-blue-900/60 text-blue-600 dark:text-blue-300 flex items-center justify-center shrink-0">
                    <Briefcase className="w-3.5 h-3.5" />
                  </div>
                  <h4 className="text-xs sm:text-sm font-black font-play text-[#1E1B4B] dark:text-white">
                    {formatCardTitle("Mô tả công việc")}
                  </h4>
                </div>

                <div className="space-y-2.5 flex-1">
                  {tasksList.map((task, idx) => (
                    <div key={idx} className="flex items-start gap-2.5">
                      <div className="w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-900/70 text-blue-700 dark:text-blue-300 font-mono font-black text-[10.5px] flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </div>
                      <p className="text-[11px] font-medium text-slate-700 dark:text-slate-200 leading-snug">
                        {task}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Column 2: Dự án trọng điểm */}
              <div className="rounded-[14px] bg-white/85 dark:bg-slate-900/85 backdrop-blur-xl border border-white/95 dark:border-white/10 p-4 sm:p-5 shadow-xs flex flex-col justify-between gap-3">
                <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-white/10">
                  <div className="w-7 h-7 rounded-full bg-amber-100 dark:bg-amber-900/60 text-amber-600 dark:text-amber-300 flex items-center justify-center shrink-0">
                    <FolderOpen className="w-3.5 h-3.5" />
                  </div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-xs sm:text-sm font-black font-play text-[#1E1B4B] dark:text-white">
                      {formatCardTitle("Dự án trọng điểm")}
                    </h4>
                    <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 font-bold">
                      ({projectsList.length})
                    </span>
                  </div>
                </div>

                <div className="space-y-2 flex-1 max-h-[340px] overflow-y-auto pr-1 no-scrollbar">
                  {projectsList.map((proj, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 p-1.5 rounded-xl bg-amber-50/40 dark:bg-amber-950/20 border border-amber-100/80 dark:border-amber-900/40">
                      <div className="w-6 h-6 rounded-lg bg-amber-100 dark:bg-amber-950/80 border border-amber-200/80 dark:border-amber-800/80 text-amber-700 dark:text-amber-300 flex items-center justify-center shrink-0 mt-0.5">
                        <FolderOpen className="w-3 h-3" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h5 className="text-[11px] font-black font-play text-slate-800 dark:text-slate-100 leading-snug">
                          {proj.title}
                        </h5>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Column 3: Cam kết chất lượng & Kết quả KPI */}
              <div className="rounded-[14px] bg-white/85 dark:bg-slate-900/85 backdrop-blur-xl border border-white/95 dark:border-white/10 p-4 sm:p-5 shadow-xs flex flex-col justify-between gap-3">
                <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-white/10">
                  <div className="w-7 h-7 rounded-full bg-emerald-100 dark:bg-emerald-900/60 text-emerald-600 dark:text-emerald-300 flex items-center justify-center shrink-0">
                    <TrendingUp className="w-3.5 h-3.5" />
                  </div>
                  <h4 className="text-xs sm:text-sm font-black font-play text-[#1E1B4B] dark:text-white">
                    {formatCardTitle("Cam kết chất lượng")}
                  </h4>
                </div>

                {/* Cam kết chất lượng */}
                <div className="space-y-2">
                  <span className="text-[10px] font-mono font-black uppercase tracking-wider text-emerald-700 dark:text-emerald-400 block">
                    {formatCardTitle("Cam kết chất lượng")}:
                  </span>
                  {commitmentsList.map((cmtText, cIdx) => (
                    <div
                      key={cIdx}
                      className="p-2 sm:p-2.5 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900/60 flex items-start gap-2"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                      <div className="min-w-0 flex-1">
                        <span className="text-[10.5px] font-semibold text-slate-700 dark:text-slate-200 leading-snug block">
                          {cmtText}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Kết quả KPI Progress Bars */}
                <div className="space-y-2 mt-1">
                  <span className="text-[10px] font-mono font-black uppercase tracking-wider text-indigo-700 dark:text-indigo-400 block">
                    {formatCardTitle("Chỉ số KPI đạt")}:
                  </span>
                  {kpisList.map((kpi, kIdx) => (
                    <div key={kIdx} className="space-y-1">
                      <div className="flex items-center justify-between text-[10.5px] font-semibold gap-2">
                        <span className="text-slate-700 dark:text-slate-200 leading-tight">{kpi.label}</span>
                        <span className="font-mono font-black text-slate-800 dark:text-white shrink-0">
                          {kpi.displayValue}
                        </span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-700 ${
                            kIdx === 0
                              ? 'bg-gradient-to-r from-emerald-500 to-teal-400'
                              : kIdx === 1
                              ? 'bg-gradient-to-r from-teal-400 to-cyan-500'
                              : kIdx === 2
                              ? 'bg-gradient-to-r from-purple-500 to-indigo-500'
                              : 'bg-gradient-to-r from-blue-500 to-cyan-400'
                          }`}
                          style={{ width: `${Math.min(100, Math.max(15, kpi.percent))}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 6. SECTION 5: BOTTOM NAVIGATION / PAGINATION BAR */}
            {(() => {
              const prevMilestone = prevKey ? EXPERIENCE_MILESTONES[prevKey] : null;
              const nextMilestone = nextKey ? EXPERIENCE_MILESTONES[nextKey] : null;
              return (
                <div className="w-full flex items-center justify-between gap-3 pt-2 pb-1 flex-wrap sm:flex-nowrap">
                  {/* Prev Button */}
                  <button
                    type="button"
                    disabled={!prevKey}
                    onClick={() => prevKey && setActiveKey(prevKey)}
                    className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-all shadow-2xs ${
                      prevKey
                        ? 'bg-white/90 dark:bg-slate-800/90 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200/80 dark:border-white/10 cursor-pointer active:scale-95'
                        : 'opacity-40 cursor-not-allowed bg-slate-100 dark:bg-slate-800 text-slate-400'
                    }`}
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span className="truncate max-w-[280px]">Trước: {prevMilestone?.company || 'Bắt đầu'}</span>
                  </button>

                  {/* Pagination Counter */}
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 dark:bg-slate-800/90 border border-slate-200/80 dark:border-white/10 shadow-2xs text-xs font-bold font-mono text-slate-700 dark:text-slate-200">
                    <button
                      type="button"
                      disabled={!prevKey}
                      onClick={() => prevKey && setActiveKey(prevKey)}
                      className="hover:text-blue-600 disabled:opacity-30 cursor-pointer p-0.5"
                      aria-label="Cột mốc trước"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <span className="px-1 text-blue-600 dark:text-blue-400">
                      {currentKeyIndex + 1}/{allMilestoneKeys.length}
                    </span>
                    <button
                      type="button"
                      disabled={!nextKey}
                      onClick={() => nextKey && setActiveKey(nextKey)}
                      className="hover:text-blue-600 disabled:opacity-30 cursor-pointer p-0.5"
                      aria-label="Cột mốc sau"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Next Button */}
                  <button
                    type="button"
                    disabled={!nextKey}
                    onClick={() => nextKey && setActiveKey(nextKey)}
                    className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-all shadow-md hover:shadow-lg ${
                      nextKey
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white cursor-pointer active:scale-95'
                        : 'opacity-40 cursor-not-allowed bg-slate-100 dark:bg-slate-800 text-slate-400'
                    }`}
                  >
                    <span className="truncate max-w-[280px]">Tiếp theo: {nextMilestone?.company || 'Kết thúc'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              );
            })()}
          </div>
        );
      })()}

      {/* Lightbox Modal for Photo */}
      {isPhotoLightboxOpen && (() => {
        const basePhotos = activeMilestone.photos || [];
        const primaryMemoryPhoto = activeMilestone.memoryImg
          ? [
              {
                src: activeMilestone.memoryImg,
                title: activeMilestone.company,
                desc: `${activeMilestone.roleTitle} (${activeMilestone.period})`,
              },
            ]
          : [];
        const lightboxPhotos = [
          ...primaryMemoryPhoto,
          ...basePhotos.filter((p) => p.src !== activeMilestone.memoryImg),
        ];
        const curPhoto = lightboxPhotos[carouselSlideIdx] || lightboxPhotos[0];
        return (
          <div
            onClick={() => setIsPhotoLightboxOpen(false)}
            className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 cursor-pointer"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="max-w-4xl w-full rounded-2xl overflow-hidden bg-slate-900 border border-white/20 shadow-2xl relative"
            >
              <div className="relative aspect-[16/10] w-full bg-black flex items-center justify-center">
                <img
                  src={curPhoto?.src || activeMilestone.memoryImg || activeMilestone.logo}
                  alt={curPhoto?.title || activeMilestone.company}
                  className="w-full h-full object-contain"
                />
                <button
                  type="button"
                  onClick={() => setIsPhotoLightboxOpen(false)}
                  className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 hover:bg-rose-600 text-white flex items-center justify-center font-bold text-sm cursor-pointer"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M18 6 6 18M6 6l12 12" /></svg>
                </button>
              </div>
              <div className="p-4 bg-slate-900 text-white flex items-center justify-between gap-3">
                <div>
                  <h4 className="text-sm font-bold">
                    {curPhoto?.title || activeMilestone.company}
                  </h4>
                  <p className="text-xs text-slate-400 mt-1">
                    {curPhoto?.desc || activeMilestone.roleTitle}
                  </p>
                </div>
                {lightboxPhotos.length > 1 && (
                  <div className="flex items-center gap-1.5">
                    {lightboxPhotos.map((_, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setCarouselSlideIdx(idx)}
                        className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
                          idx === carouselSlideIdx ? 'bg-blue-500 scale-125' : 'bg-white/30 hover:bg-white/60'
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
};
