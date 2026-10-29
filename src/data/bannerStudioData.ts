// Dữ liệu cấu hình chuẩn cho Trang Dịch Vụ Tạo Banner Chuẩn 16:3 (Executive Banner Studio)
// Tách biệt hoàn toàn DATA và UI theo nguyên tắc Data-First, giữ nguyên 100% dữ liệu thực tế của Nguyễn Hùng Thái

export type BannerTemplateId =
  | 'executive-split'
  | 'glass-bento'
  | 'cyber-hud'
  | 'editorial-clean'
  | 'kpi-ribbon'
  | 'emblem-3d';

export type BannerTextAnimationId =
  | 'shimmer'
  | 'slide-up'
  | 'neon-pulse'
  | 'typewriter'
  | 'float-glow'
  | 'scanline';

export type BannerBackgroundType = 'preset-image' | 'ai-svg' | 'mesh-gradient' | 'custom-upload';

export interface BannerKpiMetric {
  label: string;
  value: string;
  sub?: string;
}

export interface BannerConfig16x3 {
  id: string;
  name: string;
  targetPageId: number;
  templateId: BannerTemplateId;
  backgroundType: BannerBackgroundType;
  backgroundUrl: string;
  aiSvgMarkup?: string;
  meshGradientCss?: string;
  bgPositionY: number; // 0 - 100 (%)
  bgZoom: number; // 100 - 150 (%)
  overlayOpacity: number; // 15 - 90 (%)
  blurAmount: number; // 0 - 20 (px)
  kickerBadge: string;
  title: string;
  subtitle: string;
  metrics: BannerKpiMetric[];
  textAnimation: BannerTextAnimationId;
  textAlign: 'left' | 'center' | 'split';
  accentColor: string;
  secondaryColor: string;
  showGridOverlay: boolean;
  showEmblem: boolean;
  emblemImage?: string;
  createdAt: string;
}

export interface BannerTemplateMeta {
  id: BannerTemplateId;
  name: string;
  shortDesc: string;
  badge: string;
  recommendedFor: string;
}

export interface BannerAnimationMeta {
  id: BannerTextAnimationId;
  name: string;
  shortDesc: string;
  cssClass: string;
}

export interface BannerBackgroundPreset {
  id: string;
  name: string;
  category: 'domain' | 'executive' | 'cyber' | 'mesh';
  type: BannerBackgroundType;
  url: string;
  meshCss?: string;
  accentColor: string;
  defaultPosY: number;
}

export interface PageBannerPreset {
  pageId: number;
  pageTitle: string;
  kickerBadge: string;
  defaultTitle: string;
  defaultSubtitle: string;
  accentColor: string;
  secondaryColor: string;
  defaultTemplateId: BannerTemplateId;
  defaultBgUrl: string;
  defaultEmblemUrl: string;
  metrics: BannerKpiMetric[];
}

export const BANNER_16X3_TEMPLATES: BannerTemplateMeta[] = [
  {
    id: 'executive-split',
    name: 'Executive Split 16:3',
    shortDesc: 'Chia 2 phân khu: Cột trái Tiêu đề & Tuyên ngôn, Cột phải 3 Thẻ KPI Kính mờ & Biểu tượng 3D',
    badge: 'Chuẩn Lãnh Đạo',
    recommendedFor: 'Trang Chủ, Giới Thiệu, Kinh Nghiệm, Lĩnh Vực',
  },
  {
    id: 'glass-bento',
    name: 'Glass Bento Panorama',
    shortDesc: 'Các khối thẻ Glassmorphism đa lớp xếp ngang chuẩn tỷ lệ 16:3, nổi bật chiều sâu thị giác',
    badge: 'Glass Soft UI',
    recommendedFor: 'Học Vấn, Kỹ Năng, Dự Án, Kỷ Niệm',
  },
  {
    id: 'cyber-hud',
    name: 'Cyber HUD Command',
    shortDesc: 'Giao diện trung tâm chỉ huy công nghệ với khung ngắm tọa độ, tia quét và thông số SLA phát sáng',
    badge: 'Tech & AI',
    recommendedFor: 'Hệ Thống, Phỏng Vấn, Kỹ Năng Công Nghệ',
  },
  {
    id: 'editorial-clean',
    name: 'Editorial Minimalist',
    shortDesc: 'Bố cục tạp chí doanh nhân sang trọng, căn giữa cân đối với đường viền ánh kim tinh tế',
    badge: 'Tối Giản Cao Cấp',
    recommendedFor: 'Thư Ngỏ, Tử Vi, Liên Hệ',
  },
  {
    id: 'kpi-ribbon',
    name: 'Dynamic KPI Ribbon',
    shortDesc: 'Dải băng thông số định lượng trải ngang toàn khung 16:3, tối ưu hóa sức nặng con số thực chiến',
    badge: 'Tập Trung Số Liệu',
    recommendedFor: 'Kinh Nghiệm, Dự Án, Lĩnh Vực',
  },
  {
    id: 'emblem-3d',
    name: '3D Emblem Showcase',
    shortDesc: 'Tôn vinh biểu tượng chuyên ngành 3D phát sáng kết hợp tiêu đề Play cỡ lớn giàu cảm xúc',
    badge: '3D Visual',
    recommendedFor: 'Lĩnh Vực, Học Vấn, Hình Nền, Tạo Banner',
  },
];

export const BANNER_TEXT_ANIMATIONS: BannerAnimationMeta[] = [
  {
    id: 'shimmer',
    name: 'Ánh Kim Chuyển Động',
    shortDesc: 'Dải sáng kim loại quét mượt qua chữ tiêu đề',
    cssClass: 'banner-anim-shimmer',
  },
  {
    id: 'slide-up',
    name: 'Trượt Nổi Đa Tầng',
    shortDesc: 'Tiêu đề và thẻ KPI trượt mở phân tầng mềm mại',
    cssClass: 'banner-anim-slide-up',
  },
  {
    id: 'neon-pulse',
    name: 'Xung Nhịp Hào Quang',
    shortDesc: 'Viền sáng chữ tỏa hào quang nhịp nhàng theo màu chủ đạo',
    cssClass: 'banner-anim-neon-pulse',
  },
  {
    id: 'typewriter',
    name: 'Nhịp Gõ Điều Hành',
    shortDesc: 'Hiệu ứng con trỏ phát sáng dẫn dắt tiêu đề chiến lược',
    cssClass: 'banner-anim-typewriter',
  },
  {
    id: 'float-glow',
    name: 'Lơ Lửng Không Trọng Lực',
    shortDesc: 'Cụm chữ và huy hiệu KPI chuyển động nổi nhẹ nhàng 3D',
    cssClass: 'banner-anim-float-glow',
  },
  {
    id: 'scanline',
    name: 'Tia Quét Laser HUD',
    shortDesc: 'Tia sáng ngang quét qua toàn bộ khung Banner 16:3',
    cssClass: 'banner-anim-scanline',
  },
];

export const BANNER_BG_GALLERY: BannerBackgroundPreset[] = [
  {
    id: 'bg-domains-extended',
    name: 'Panorama Lĩnh Vực Chiến Lược',
    category: 'domain',
    type: 'preset-image',
    url: '/images/domains/hero-banner-extended.png',
    accentColor: '#f59e0b',
    defaultPosY: 48,
  },
  {
    id: 'bg-domains-direct',
    name: 'Trung Tâm Điều Hành Đa Ngành',
    category: 'domain',
    type: 'preset-image',
    url: '/images/domains/hero-banner-direct.png',
    accentColor: '#0284c7',
    defaultPosY: 45,
  },
  {
    id: 'bg-education-hero',
    name: 'Học Vấn & Tri Thức Quốc Tế',
    category: 'executive',
    type: 'preset-image',
    url: '/images/education/hero-banner.png',
    accentColor: '#059669',
    defaultPosY: 50,
  },
  {
    id: 'bg-skills-hero',
    name: 'Ma Trận Kỹ Năng & Công Nghệ AI',
    category: 'cyber',
    type: 'preset-image',
    url: '/images/skills/hero-banner.png',
    accentColor: '#0891b2',
    defaultPosY: 50,
  },
  {
    id: 'bg-interview-overview',
    name: 'Không Gian Đối Thoại C-Level',
    category: 'executive',
    type: 'preset-image',
    url: '/images/interview/interview-overview.png',
    accentColor: '#ec4899',
    defaultPosY: 42,
  },
  {
    id: 'bg-about-hero',
    name: 'Chân Dung & Tầm Nhìn Chuyên Gia',
    category: 'executive',
    type: 'preset-image',
    url: '/images/about-hero.jpg',
    accentColor: '#8b5cf6',
    defaultPosY: 38,
  },
  {
    id: 'bg-mesh-royal',
    name: 'Cực Quang Hoàng Gia (Mesh 16:3)',
    category: 'mesh',
    type: 'mesh-gradient',
    url: '/images/domains/hero-banner.png',
    meshCss:
      'radial-gradient(at 12% 25%, rgba(56, 189, 248, 0.55) 0px, transparent 55%), radial-gradient(at 85% 20%, rgba(139, 92, 246, 0.55) 0px, transparent 55%), radial-gradient(at 50% 85%, rgba(236, 72, 153, 0.45) 0px, transparent 60%), linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #090d16 100%)',
    accentColor: '#38bdf8',
    defaultPosY: 50,
  },
  {
    id: 'bg-mesh-emerald',
    name: 'Ngọc Lục Bảo Số Hóa (Mesh 16:3)',
    category: 'mesh',
    type: 'mesh-gradient',
    url: '/images/education/hero-banner.png',
    meshCss:
      'radial-gradient(at 18% 30%, rgba(16, 185, 129, 0.52) 0px, transparent 55%), radial-gradient(at 82% 70%, rgba(6, 182, 212, 0.52) 0px, transparent 55%), linear-gradient(125deg, #022c22 0%, #0f172a 55%, #082f49 100%)',
    accentColor: '#10b981',
    defaultPosY: 50,
  },
];

// Dữ liệu gốc 100% cho toàn bộ các trang trên hệ thống Hồ sơ Chuyên gia Nguyễn Hùng Thái
export const PAGE_BANNER_PRESETS: PageBannerPreset[] = [
  {
    pageId: 0,
    pageTitle: 'Trang Chủ',
    kickerBadge: 'PORTFOLIO ĐIỀU HÀNH · NGUYỄN HÙNG THÁI',
    defaultTitle: 'Trưởng Phòng Dịch Vụ Khách Hàng & Quản Trị Vận Hành CX',
    defaultSubtitle:
      'Hơn 22 năm kinh nghiệm dẫn dắt chuyển đổi số dịch vụ khách hàng, xây dựng hệ thống Contact Center chuẩn COPC & ISO tại 8 tập đoàn lớn.',
    accentColor: '#0284c7',
    secondaryColor: '#38bdf8',
    defaultTemplateId: 'executive-split',
    defaultBgUrl: '/images/domains/hero-banner-extended.png',
    defaultEmblemUrl: '/images/domains/icon-01.png',
    metrics: [
      { label: 'Kinh nghiệm thực chiến', value: '22+ Năm', sub: '2003 – 2026+' },
      { label: 'Quy mô nhân sự', value: '100 – 300+', sub: 'Nhân sự / dự án' },
      { label: 'Chỉ số hài lòng CSAT', value: '98 – 99%', sub: 'Cam kết SLA' },
    ],
  },
  {
    pageId: 1,
    pageTitle: 'Thư Ngỏ',
    kickerBadge: 'THƯ NGỎ GỬI QUÝ ĐỐI TÁC & NHÀ TUYỂN DỤNG',
    defaultTitle: 'Phụng Sự Từ Tâm — Kiến Tạo Trải Nghiệm Khách Hàng Xuất Sắc',
    defaultSubtitle:
      'Lời chào trân trọng và cam kết đồng hành xây dựng hệ sinh thái chăm sóc khách hàng hiệu quả, nhân văn và bền vững.',
    accentColor: '#e11d48',
    secondaryColor: '#fb7185',
    defaultTemplateId: 'editorial-clean',
    defaultBgUrl: '/images/about-hero.jpg',
    defaultEmblemUrl: '/images/domains/icon-03.png',
    metrics: [
      { label: 'Triết lý cốt lõi', value: '3 Trụ Cột', sub: 'Hiệu quả · Nhân văn · Bền vững' },
      { label: 'Tập đoàn đồng hành', value: '8 Đơn Vị', sub: 'Đa ngành mũi nhọn' },
      { label: 'Tinh thần lãnh đạo', value: '100% Tận Tâm', sub: 'Luôn bên bạn' },
    ],
  },
  {
    pageId: 2,
    pageTitle: 'Giới Thiệu',
    kickerBadge: 'HỒ SƠ CHUYÊN GIA & THÔNG TIN CÁ NHÂN',
    defaultTitle: 'Nguyễn Hùng Thái — Chân Dung Nhà Quản Trị Trải Nghiệm Khách Hàng',
    defaultSubtitle:
      'Kết hợp tư duy hệ thống Công nghệ thông tin và nghệ thuật lãnh đạo con người, tối ưu hóa toàn diện điểm chạm khách hàng 2026+.',
    accentColor: '#8b5cf6',
    secondaryColor: '#c084fc',
    defaultTemplateId: 'executive-split',
    defaultBgUrl: '/images/about-hero.jpg',
    defaultEmblemUrl: '/images/domains/icon-06.png',
    metrics: [
      { label: 'Trụ cột chiến lược', value: '03 Trụ Cột', sub: 'Vận hành & CX' },
      { label: 'Khu vực làm việc', value: 'TP.HCM', sub: 'Quận 7 & Mỹ Tho' },
      { label: 'Định hướng 2026+', value: 'AI + CX', sub: 'Chuyển đổi số' },
    ],
  },
  {
    pageId: 3,
    pageTitle: 'Học Vấn',
    kickerBadge: 'HỌC VẤN CHÍNH QUY & 14 CHỨNG CHỈ QUỐC TẾ',
    defaultTitle: 'Nền Tảng Tri Thức CNTT & Hệ Thống Chứng Chỉ Quản Trị Chuyên Sâu',
    defaultSubtitle:
      'Cử nhân Công nghệ Thông tin kết hợp 14 chứng chỉ chuyên ngành: Quản trị dự án PMP, UI/UX, Quản trị rủi ro, Data BI, TTT, CCNA & MCSA.',
    accentColor: '#059669',
    secondaryColor: '#34d399',
    defaultTemplateId: 'glass-bento',
    defaultBgUrl: '/images/education/hero-banner.png',
    defaultEmblemUrl: '/images/domains/icon-06.png',
    metrics: [
      { label: 'Chứng chỉ chuyên ngành', value: '14 Bằng Cấp', sub: 'Xác thực số 100%' },
      { label: 'Giai đoạn đào tạo', value: '2003 – 2024', sub: 'Học tập liên tục' },
      { label: 'Nhóm năng lực', value: '04 Chuyên Khoa', sub: 'CNTT · Quản trị · Kỹ năng' },
    ],
  },
  {
    pageId: 4,
    pageTitle: 'Lĩnh Vực',
    kickerBadge: '06 LĨNH VỰC HOẠT ĐỘNG CHUYÊN MÔN MŨI NHỌN',
    defaultTitle: 'Thâm Niên Điều Hành Đa Ngành: Viễn Thông, TMĐT, Bảo Hiểm, Game & Fintech',
    defaultSubtitle:
      'Chuyển hóa linh hoạt tiêu chuẩn dịch vụ khách hàng quốc tế qua MobiFone, Shopee, Prudential, Garena, MoMo, Finviet, V247 và HTVC.',
    accentColor: '#f59e0b',
    secondaryColor: '#fbbf24',
    defaultTemplateId: 'emblem-3d',
    defaultBgUrl: '/images/domains/hero-banner-extended.png',
    defaultEmblemUrl: '/images/domains/ill-01.png',
    metrics: [
      { label: 'Lĩnh vực cốt lõi', value: '06 Ngành', sub: 'Telco · E-com · Fintech' },
      { label: 'Thương hiệu lớn', value: '08 Tập Đoàn', sub: 'Hàng đầu Việt Nam' },
      { label: 'Tỷ lệ hài lòng', value: '96% – 99%', sub: 'Duy trì ổn định' },
    ],
  },
  {
    pageId: 5,
    pageTitle: 'Kỹ Năng',
    kickerBadge: 'KỸ NĂNG CHUYÊN MÔN & MA TRẬN CHIẾN LƯỢC SWOT',
    defaultTitle: 'Bản Đồ Năng Lực Quản Trị Vận Hành, Công Nghệ AI & Phân Tích SWOT',
    defaultSubtitle:
      'Làm chủ hoạch định chiến lược 95%, thiết lập KPI/SLA 95%, cải tiến Kaizen 88% và ứng dụng AI tự động hóa trung tâm CSKH 85%.',
    accentColor: '#0891b2',
    secondaryColor: '#22d3ee',
    defaultTemplateId: 'cyber-hud',
    defaultBgUrl: '/images/skills/hero-banner.png',
    defaultEmblemUrl: '/images/skills/ill-04.png',
    metrics: [
      { label: 'Hoạch định & KPI/SLA', value: '95%', sub: 'Nền tảng vận hành' },
      { label: 'Cải tiến Kaizen & CX', value: '88%', sub: 'Chuyển đổi dịch vụ' },
      { label: 'Công nghệ AI & Data', value: '85%', sub: 'Tự động hóa CSKH' },
    ],
  },
  {
    pageId: 6,
    pageTitle: 'Kinh Nghiệm',
    kickerBadge: 'HÀNH TRÌNH SỰ NGHIỆP & CỘT MỐC QUẢN TRỊ (2003 – 2026+)',
    defaultTitle: 'Hơn 22 Năm Thực Chiến Xây Dựng & Dẫn Dắt Trung Tâm Dịch Vụ Khách Hàng',
    defaultSubtitle:
      'Dấu ấn trưởng thành qua từng giai đoạn phát triển tại MobiFone, V247, HTVC, Garena, Prudential, MoMo, Finviet và định hướng CX 2026+.',
    accentColor: '#4f46e5',
    secondaryColor: '#818cf8',
    defaultTemplateId: 'kpi-ribbon',
    defaultBgUrl: '/images/domains/hero-banner-direct.png',
    defaultEmblemUrl: '/images/domains/ill-02.png',
    metrics: [
      { label: 'Chặng đường công tác', value: '2003 – 2026+', sub: '22+ năm liên tục' },
      { label: 'Tổ chức & Tập đoàn', value: '08 Đơn Vị', sub: 'Quy mô toàn quốc' },
      { label: 'Hiệu suất xử lý SLA', value: '99.5%', sub: 'Chuẩn quốc tế' },
    ],
  },
  {
    pageId: 7,
    pageTitle: 'Dự Án',
    kickerBadge: 'KHO 21 DỰ ÁN & SÁNG KIẾN VẬN HÀNH TRỌNG ĐIỂM',
    defaultTitle: 'Tuyển Tập 21 Dự Án Chuyển Đổi Số, Chuẩn Hóa SOP & Tối Ưu Trải Nghiệm CX',
    defaultSubtitle:
      'Triển khai theo phương pháp luận STAR quốc tế, phân bổ trong 5 nhóm chiến lược từ xây dựng phòng CSKH, Omnichannel, RPA đến AI Bot 24/7.',
    accentColor: '#9333ea',
    secondaryColor: '#c084fc',
    defaultTemplateId: 'glass-bento',
    defaultBgUrl: '/images/skills/hero-banner.png',
    defaultEmblemUrl: '/images/skills/ill-01.png',
    metrics: [
      { label: 'Dự án thực chiến', value: '21 Dự Án', sub: 'Mô hình STAR' },
      { label: 'Nhóm sáng kiến', value: '05 Nhóm', sub: 'Chiến lược · SOP · AI' },
      { label: 'Tối ưu chi phí', value: '-25% đến -40%', sub: 'Tăng năng suất' },
    ],
  },
  {
    pageId: 8,
    pageTitle: 'Hệ Thống',
    kickerBadge: 'CỔNG BENTO 12 HỆ THỐNG CSKH C-LEVEL',
    defaultTitle: 'Kiến Trúc 12 Nền Tảng Công Nghệ Quản Trị Dịch Vụ Khách Hàng Hợp Nhất',
    defaultSubtitle:
      'Tích hợp đồng bộ SDP, ERP, CRM 360, HRM, BPM, OKR, CLP, E-Learning LMS, Omnichannel CSC, BI Dashboard, AI Assistant và POS.',
    accentColor: '#ea580c',
    secondaryColor: '#fb923c',
    defaultTemplateId: 'cyber-hud',
    defaultBgUrl: '/images/domains/hero-banner-extended.png',
    defaultEmblemUrl: '/images/domains/ill-06.png',
    metrics: [
      { label: 'Hệ sinh thái C-Level', value: '12 Hệ Thống', sub: 'Đồng bộ 360 độ' },
      { label: 'Độ ổn định Uptime', value: '99.9%', sub: 'Vận hành 24/7' },
      { label: 'Tăng năng suất', value: '+45%', sub: 'Tự động hóa luồng' },
    ],
  },
  {
    pageId: 9,
    pageTitle: 'Phỏng Vấn',
    kickerBadge: 'ĐỐI THOẠI MÔ PHỎNG AI & Q&A TUYỂN DỤNG C-LEVEL',
    defaultTitle: 'Góc Nhìn Lãnh Đạo & Giải Pháp Thực Chiến Cho Vị Trí Head of Customer Service',
    defaultSubtitle:
      'Trực tiếp giải đáp các bài toán quản trị khủng hoảng, tối ưu Cost-per-Contact, giữ chân nhân sự và nâng tầm chỉ số NPS/CSAT.',
    accentColor: '#ec4899',
    secondaryColor: '#f472b6',
    defaultTemplateId: 'executive-split',
    defaultBgUrl: '/images/interview/interview-overview.png',
    defaultEmblemUrl: '/images/domains/ill-03.png',
    metrics: [
      { label: 'Tình huống thực tế', value: 'Q&A C-Level', sub: 'Chiến lược & Xử lý' },
      { label: 'Giải quyết lần đầu', value: 'FCR 95%', sub: 'Quy chuẩn chất lượng' },
      { label: 'Tương tác trực tiếp', value: 'AI Voice', sub: 'Thuyết minh tiếng Việt' },
    ],
  },
  {
    pageId: 10,
    pageTitle: 'Tử Vi',
    kickerBadge: 'BẢN ĐỒ TỬ VI, BÁT TRẠCH & PHONG THỦY QUẢN TRỊ',
    defaultTitle: 'Giáp Tý 1984 (Hải Trung Kim) — Nghệ Thuật Dụng Nhân & Phong Thủy Điều Hành',
    defaultSubtitle:
      'Kết hợp minh triết phương Đông, quẻ Càn Kim Tây Tứ Mệnh và tư duy quản trị hiện đại nhằm kiến tạo tập thể gắn kết, thịnh vượng.',
    accentColor: '#c026d3',
    secondaryColor: '#e879f9',
    defaultTemplateId: 'editorial-clean',
    defaultBgUrl: '/images/domains/hero-banner.png',
    defaultEmblemUrl: '/images/domains/icon-04.png',
    metrics: [
      { label: 'Bản mệnh năm sinh', value: 'Giáp Tý 1984', sub: 'Hải Trung Kim' },
      { label: 'Cung mệnh Bát Trạch', value: 'Càn Kim', sub: 'Tây Tứ Mệnh' },
      { label: 'Phương vị cát lợi', value: '04 Hướng Tốt', sub: 'Tây Bắc · Đông Bắc' },
    ],
  },
  {
    pageId: 11,
    pageTitle: 'Kỷ Niệm',
    kickerBadge: 'KHOẢNH KHẮC HÀNH TRÌNH & KỶ NIỆM ĐÁNG NHỚ',
    defaultTitle: 'Dấu Ấn Đồng Đội, Văn Hóa Tôn Vinh & Những Nụ Cười Phụng Sự Khách Hàng',
    defaultSubtitle:
      'Lưu giữ những khoảnh khắc gắn kết nội bộ, lễ vinh danh nhân sự xuất sắc và hành trình sát cánh cùng hàng trăm đồng nghiệp.',
    accentColor: '#16a34a',
    secondaryColor: '#4ade80',
    defaultTemplateId: 'glass-bento',
    defaultBgUrl: '/images/about-hero.jpg',
    defaultEmblemUrl: '/images/domains/icon-02.png',
    metrics: [
      { label: 'Văn hóa đội ngũ', value: 'Gắn Kết', sub: 'Tôn vinh & Sẻ chia' },
      { label: 'Hành trình lưu giữ', value: '22+ Năm', sub: 'Khoảnh khắc đẹp' },
      { label: 'Tinh thần tập thể', value: 'One Team', sub: 'Phụng sự tận tâm' },
    ],
  },
  {
    pageId: 12,
    pageTitle: 'Liên Hệ',
    kickerBadge: 'KÊNH KẾT NỐI TRỰC TIẾP & HỢP TÁC CHIẾN LƯỢC',
    defaultTitle: 'Kết Nối Ngay Với Nguyễn Hùng Thái — Sẵn Sàng Đồng Hành Cùng Doanh Nghiệp',
    defaultSubtitle:
      'Liên hệ trực tiếp qua Hotline/Zalo 0903.011.699, Email hungthai84@gmail.com hoặc LinkedIn để trao đổi cơ hội hợp tác quản trị CX.',
    accentColor: '#0d9488',
    secondaryColor: '#2dd4bf',
    defaultTemplateId: 'executive-split',
    defaultBgUrl: '/images/domains/hero-banner-direct.png',
    defaultEmblemUrl: '/images/domains/icon-05.png',
    metrics: [
      { label: 'Hotline & Zalo', value: '0903.011.699', sub: 'Phản hồi nhanh 24/7' },
      { label: 'Email chính thức', value: 'hungthai84@', sub: 'gmail.com' },
      { label: 'Khu vực hoạt động', value: 'TP.HCM', sub: 'Sẵn sàng nhận việc' },
    ],
  },
  {
    pageId: 13,
    pageTitle: 'Hình Nền',
    kickerBadge: 'TÙY CHỈNH HÌNH NỀN 4K & GIAO DIỆN ĐA SẮC',
    defaultTitle: 'Không Gian Trải Nghiệm Thị Giác Cá Nhân Hóa & Chế Độ Trình Chiếu Zen Mode',
    defaultSubtitle:
      'Tùy biến hình nền động, bộ lọc màu điện ảnh LUT, âm thanh thiên nhiên vòm và đồng bộ giao diện Sáng/Tối thông minh.',
    accentColor: '#d946ef',
    secondaryColor: '#f0abfc',
    defaultTemplateId: 'emblem-3d',
    defaultBgUrl: '/images/domains/hero-banner-extended.png',
    defaultEmblemUrl: '/images/skills/ill-03.png',
    metrics: [
      { label: 'Chế độ giao diện', value: 'Light / Dark', sub: 'Đồng bộ 100% token' },
      { label: 'Bộ lọc màu LUT', value: '06 Presets', sub: 'Chuẩn điện ảnh' },
      { label: 'Trình chiếu tự động', value: 'Zen Mode', sub: 'Toàn màn hình' },
    ],
  },
  {
    pageId: 14,
    pageTitle: 'Tạo Banner',
    kickerBadge: 'EXECUTIVE BANNER STUDIO · CHUẨN TỶ LỆ 16:3',
    defaultTitle: 'Dịch Vụ Thiết Kế & Tạo Banner AI Siêu Rộng 16:3 Cho Cổng Thông Tin Chuyên Gia',
    defaultSubtitle:
      'Kết hợp AI tạo nền panorama, 6 mẫu thiết kế kính mờ, hiệu ứng chữ chuyển động, xuất ảnh PNG/WebP 1920×360px và mã nhúng HTML/CSS.',
    accentColor: '#06b6d4',
    secondaryColor: '#6366f1',
    defaultTemplateId: 'cyber-hud',
    defaultBgUrl: '/images/domains/hero-banner-extended.png',
    defaultEmblemUrl: '/images/domains/ill-06.png',
    metrics: [
      { label: 'Tỷ lệ khung chuẩn', value: '16 : 3', sub: '1920 × 360 px' },
      { label: 'Mẫu bố cục & Motion', value: '06 Templates', sub: 'Chữ chuyển động' },
      { label: 'Đầu ra xuất bản', value: 'PNG · WebP · Code', sub: 'Áp dụng trực tiếp' },
    ],
  },
];

export interface AiBannerPromptSuggestion {
  id: string;
  label: string;
  prompt: string;
  targetPageId: number;
  accentColor: string;
}

export const AI_BANNER_PROMPT_SUGGESTIONS: AiBannerPromptSuggestion[] = [
  {
    id: 'prompt-telecom',
    label: 'Viễn Thông 5G & Trung Tâm Điều Hành',
    prompt:
      'Toàn cảnh trung tâm điều hành mạng viễn thông 5G hiện đại tỷ lệ siêu rộng 16:3, dải sóng ánh sáng xanh dương cyan và bạc, kiến trúc kính mờ sang trọng, chiều sâu điện ảnh',
    targetPageId: 4,
    accentColor: '#0284c7',
  },
  {
    id: 'prompt-ecommerce',
    label: 'Thương Mại Điện Tử & Logistics Số',
    prompt:
      'Không gian điều phối thương mại điện tử Mega Sale tỷ lệ 16:3, luồng dữ liệu cam vàng rực rỡ và xanh индиго, biểu đồ tăng trưởng phát sáng tinh tế trên nền tối cao cấp',
    targetPageId: 4,
    accentColor: '#f59e0b',
  },
  {
    id: 'prompt-systems',
    label: 'Kiến Trúc 12 Hệ Thống CSKH C-Level',
    prompt:
      'Mạng lưới 12 khối cầu công nghệ đám mây liên kết 360 độ chuẩn C-Level tỷ lệ 16:3, ánh sáng cam hổ phách và xanh ngọc, phong cách futuristic glassmorphism',
    targetPageId: 8,
    accentColor: '#ea580c',
  },
  {
    id: 'prompt-education',
    label: 'Học Vấn & 14 Chứng Chỉ Quốc Tế',
    prompt:
      'Không gian học thuật công nghệ số và chứng chỉ quốc tế tỷ lệ 16:3, sắc xanh ngọc lục bảo emerald kết hợp ánh sáng tri thức vàng kim sang trọng',
    targetPageId: 3,
    accentColor: '#059669',
  },
  {
    id: 'prompt-skills',
    label: 'Ma Trận Kỹ Năng & Trí Tuệ Nhân Tạo AI',
    prompt:
      'Sơ đồ nơ-ron trí tuệ nhân tạo và ma trận quản trị chiến lược SWOT tỷ lệ 16:3, tông màu xanh cyan và tím violet phát sáng trên nền kính tối',
    targetPageId: 5,
    accentColor: '#0891b2',
  },
  {
    id: 'prompt-projects',
    label: '21 Dự Án Chuyển Đổi Số Trọng Điểm',
    prompt:
      'Dải ngân hà các dự án chuyển đổi số và tự động hóa RPA tỷ lệ 16:3, sắc tím thạch anh royal purple và hồng neon tinh tế, bố cục hiện đại',
    targetPageId: 7,
    accentColor: '#9333ea',
  },
  {
    id: 'prompt-experience',
    label: 'Hành Trình 22+ Năm Lãnh Đạo CSKH',
    prompt:
      'Đường chân trời biểu tượng 22 năm hành trình lãnh đạo qua các tập đoàn lớn tỷ lệ 16:3, tông màu xanh chàm indigo và vàng kim quyền lực',
    targetPageId: 6,
    accentColor: '#4f46e5',
  },
  {
    id: 'prompt-horoscope',
    label: 'Phong Thủy Quản Trị Hải Trung Kim 1984',
    prompt:
      'La bàn phong thủy bát trạch kết hợp sóng vàng kim dưới đại dương sâu Hải Trung Kim tỷ lệ 16:3, ánh sáng huyền bí sang trọng',
    targetPageId: 10,
    accentColor: '#c026d3',
  },
];

export function createDefaultBannerForPage(pageId: number): BannerConfig16x3 {
  const preset =
    PAGE_BANNER_PRESETS.find((p) => p.pageId === pageId) || PAGE_BANNER_PRESETS[0];

  return {
    id: `banner-page-${preset.pageId}-default`,
    name: `Banner 16:3 - ${preset.pageTitle}`,
    targetPageId: preset.pageId,
    templateId: preset.defaultTemplateId,
    backgroundType: 'preset-image',
    backgroundUrl: preset.defaultBgUrl,
    bgPositionY: 48,
    bgZoom: 105,
    overlayOpacity: 62,
    blurAmount: 2,
    kickerBadge: preset.kickerBadge,
    title: preset.defaultTitle,
    subtitle: preset.defaultSubtitle,
    metrics: preset.metrics.map((m) => ({ ...m })),
    textAnimation: 'shimmer',
    textAlign: 'split',
    accentColor: preset.accentColor,
    secondaryColor: preset.secondaryColor,
    showGridOverlay: true,
    showEmblem: true,
    emblemImage: preset.defaultEmblemUrl,
    createdAt: new Date().toISOString(),
  };
}
