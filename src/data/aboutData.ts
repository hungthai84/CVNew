export interface ProfileStatItem {
  id: string;
  iconName: string;
  labelVi: string;
  labelEn: string;
  metric: string;
  unitVi: string;
  unitEn: string;
  positionClass: string;
  color: string;
  animationDelay: number;
}

export interface DemographicItem {
  id: string;
  iconName: string;
  labelVi: string;
  labelEn: string;
  valueVi: string;
  valueEn: string;
  subtitleVi?: string;
  type?: 'map' | 'email' | 'phone' | 'link' | 'text';
  href?: string;
  mapTitle?: string;
  mapQuery?: string;
  colorTheme: {
    bg: string;
    border: string;
    iconBg: string;
    iconColor: string;
    labelColor: string;
    valueColor: string;
    arrowColor: string;
  };
}

export interface PersonalInfoItem {
  id: string;
  [key: string]: any;
}

export const ABOUT_PROFILE_STATS: ProfileStatItem[] = [
  {
    id: 'experience',
    iconName: 'Calendar',
    labelVi: 'Kinh nghiệm CX & CS',
    labelEn: 'CX & CS Experience',
    metric: '22+',
    unitVi: 'NĂM',
    unitEn: 'YEARS',
    positionClass: 'top-4 left-4 sm:top-6 sm:left-6',
    color: '#0284c7',
    animationDelay: 0,
  },
  {
    id: 'scale',
    iconName: 'Building2',
    labelVi: 'Quy mô lớn',
    labelEn: 'Large Scale',
    metric: '8+',
    unitVi: 'MÔI TRƯỜNG',
    unitEn: 'ENVIRONMENTS',
    positionClass: 'top-4 right-4 sm:top-6 sm:right-6',
    color: '#9333ea',
    animationDelay: 0.5,
  },
  {
    id: 'automation',
    iconName: 'Bot',
    labelVi: 'Tự động hoá',
    labelEn: 'Automation',
    metric: '24/7',
    unitVi: 'AI CRM',
    unitEn: 'AI CRM',
    positionClass: 'bottom-16 left-4 sm:bottom-20 sm:left-6',
    color: '#059669',
    animationDelay: 1.0,
  },
  {
    id: 'csat',
    iconName: 'Heart',
    labelVi: 'Tỷ lệ hài lòng KH',
    labelEn: 'Customer Satisfaction',
    metric: '99%',
    unitVi: '',
    unitEn: '',
    positionClass: 'bottom-16 right-4 sm:bottom-20 sm:right-6',
    color: '#e11d48',
    animationDelay: 1.5,
  },
];

export const PERSONAL_DEMOGRAPHICS: DemographicItem[] = [
  {
    id: 'gender',
    iconName: 'User',
    labelVi: 'Giới tính',
    labelEn: 'Gender',
    valueVi: 'Nam giới',
    valueEn: 'Male',
    type: 'text',
    colorTheme: {
      bg: 'bg-sky-50/80 dark:bg-sky-950/40',
      border: 'border-sky-200/80 dark:border-sky-800/50',
      iconBg: 'bg-blue-500/15',
      iconColor: 'text-blue-600 dark:text-sky-400',
      labelColor: 'text-slate-500 dark:text-slate-400',
      valueColor: 'text-slate-900 dark:text-white',
      arrowColor: 'text-blue-500',
    },
  },
  {
    id: 'ethnicity',
    iconName: 'Users',
    labelVi: 'Dân tộc',
    labelEn: 'Ethnicity',
    valueVi: 'Kinh',
    valueEn: 'Kinh',
    type: 'text',
    colorTheme: {
      bg: 'bg-indigo-50/80 dark:bg-indigo-950/40',
      border: 'border-indigo-200/80 dark:border-indigo-800/50',
      iconBg: 'bg-indigo-500/15',
      iconColor: 'text-indigo-600 dark:text-indigo-400',
      labelColor: 'text-slate-500 dark:text-slate-400',
      valueColor: 'text-slate-900 dark:text-white',
      arrowColor: 'text-indigo-500',
    },
  },
  {
    id: 'status',
    iconName: 'Heart',
    labelVi: 'Tình trạng hôn nhân',
    labelEn: 'Marital Status',
    valueVi: 'Độc thân',
    valueEn: 'Single',
    type: 'text',
    colorTheme: {
      bg: 'bg-rose-50/80 dark:bg-rose-950/40',
      border: 'border-rose-200/80 dark:border-rose-800/50',
      iconBg: 'bg-rose-500/15',
      iconColor: 'text-rose-600 dark:text-rose-400',
      labelColor: 'text-slate-500 dark:text-slate-400',
      valueColor: 'text-slate-900 dark:text-white',
      arrowColor: 'text-rose-500',
    },
  },
  {
    id: 'birthday',
    iconName: 'Calendar',
    labelVi: 'Sinh nhật',
    labelEn: 'Birthday',
    valueVi: '22/06/1984',
    valueEn: '22/06/1984',
    type: 'text',
    colorTheme: {
      bg: 'bg-amber-50/80 dark:bg-amber-950/40',
      border: 'border-amber-200/80 dark:border-amber-800/50',
      iconBg: 'bg-amber-500/15',
      iconColor: 'text-amber-600 dark:text-amber-400',
      labelColor: 'text-slate-500 dark:text-slate-400',
      valueColor: 'text-slate-900 dark:text-white',
      arrowColor: 'text-amber-500',
    },
  },
  {
    id: 'horoscope',
    iconName: 'Sparkles',
    labelVi: 'Tử vi',
    labelEn: 'Horoscope',
    valueVi: 'Giáp Tý · Hải Trung Kim',
    valueEn: 'Wood Rat · Sea Gold',
    subtitleVi: 'Mệnh Hải Trung Kim · Cung Đoài Kim',
    type: 'text',
    colorTheme: {
      bg: 'bg-purple-50/80 dark:bg-purple-950/40',
      border: 'border-purple-200/80 dark:border-purple-800/50',
      iconBg: 'bg-purple-500/15',
      iconColor: 'text-purple-600 dark:text-purple-400',
      labelColor: 'text-slate-500 dark:text-slate-400',
      valueColor: 'text-slate-900 dark:text-white',
      arrowColor: 'text-purple-500',
    },
  },
  {
    id: 'temp_residence',
    iconName: 'MapPin',
    labelVi: 'Tạm trú',
    labelEn: 'Current Address',
    valueVi: 'Quận 7, TP. Hồ Chí Minh',
    valueEn: 'District 7, HCMC',
    type: 'map',
    href: 'Quận 7, TP. Hồ Chí Minh',
    mapTitle: 'Tạm trú (Quận 7, TP.HCM)',
    mapQuery: 'District 7, Ho Chi Minh City, Vietnam',
    colorTheme: {
      bg: 'bg-indigo-50/80 dark:bg-indigo-950/40',
      border: 'border-indigo-200/80 dark:border-indigo-800/50',
      iconBg: 'bg-indigo-500/15',
      iconColor: 'text-indigo-600 dark:text-indigo-400',
      labelColor: 'text-slate-500 dark:text-slate-400',
      valueColor: 'text-slate-900 dark:text-white',
      arrowColor: 'text-indigo-500',
    },
  },
  {
    id: 'permanent_residence',
    iconName: 'Home',
    labelVi: 'Cư trú gốc',
    labelEn: 'Permanent Residence',
    valueVi: 'TP. Mỹ Tho, Tỉnh Tiền Giang',
    valueEn: 'My Tho, Tien Giang',
    type: 'map',
    href: 'TP. Mỹ Tho, Tỉnh Tiền Giang',
    mapTitle: 'Cư trú gốc (TP. Mỹ Tho, Tiền Giang)',
    mapQuery: 'My Tho, Tien Giang, Vietnam',
    colorTheme: {
      bg: 'bg-emerald-50/80 dark:bg-emerald-950/40',
      border: 'border-emerald-200/80 dark:border-emerald-800/50',
      iconBg: 'bg-emerald-500/15',
      iconColor: 'text-emerald-600 dark:text-emerald-400',
      labelColor: 'text-slate-500 dark:text-slate-400',
      valueColor: 'text-slate-900 dark:text-white',
      arrowColor: 'text-emerald-500',
    },
  },
  {
    id: 'email',
    iconName: 'Mail',
    labelVi: 'Email chính thức',
    labelEn: 'Official Email',
    valueVi: 'hungthai84@gmail.com',
    valueEn: 'hungthai84@gmail.com',
    type: 'email',
    href: 'mailto:hungthai84@gmail.com',
    colorTheme: {
      bg: 'bg-cyan-50/80 dark:bg-cyan-950/40',
      border: 'border-cyan-200/80 dark:border-cyan-800/50',
      iconBg: 'bg-cyan-500/15',
      iconColor: 'text-cyan-600 dark:text-cyan-400',
      labelColor: 'text-slate-500 dark:text-slate-400',
      valueColor: 'text-slate-900 dark:text-white',
      arrowColor: 'text-cyan-500',
    },
  },
  {
    id: 'phone_zalo',
    iconName: 'Phone',
    labelVi: 'Điện thoại & Zalo',
    labelEn: 'Phone & Zalo',
    valueVi: '+84 0909097882',
    valueEn: '+84 0909097882',
    type: 'link',
    href: 'https://zalo.me/0909097882',
    colorTheme: {
      bg: 'bg-blue-50/80 dark:bg-blue-950/40',
      border: 'border-blue-200/80 dark:border-blue-800/50',
      iconBg: 'bg-blue-500/15',
      iconColor: 'text-blue-600 dark:text-blue-400',
      labelColor: 'text-slate-500 dark:text-slate-400',
      valueColor: 'text-slate-900 dark:text-white',
      arrowColor: 'text-blue-500',
    },
  },
  {
    id: 'website_netlify',
    iconName: 'Globe',
    labelVi: 'Website Netlify',
    labelEn: 'Netlify Portfolio',
    valueVi: 'nguyenhungthaiportfolio.netlify.app',
    valueEn: 'nguyenhungthaiportfolio.netlify.app',
    type: 'link',
    href: 'https://nguyenhungthaiportfolio.netlify.app/',
    colorTheme: {
      bg: 'bg-teal-50/80 dark:bg-teal-950/40',
      border: 'border-teal-200/80 dark:border-teal-800/50',
      iconBg: 'bg-teal-500/15',
      iconColor: 'text-teal-600 dark:text-teal-400',
      labelColor: 'text-slate-500 dark:text-slate-400',
      valueColor: 'text-slate-900 dark:text-white',
      arrowColor: 'text-teal-500',
    },
  },
  {
    id: 'website_official',
    iconName: 'ExternalLink',
    labelVi: 'Website chính thức',
    labelEn: 'Official Website',
    valueVi: 'nguyenhungthai.powerservice.one',
    valueEn: 'nguyenhungthai.powerservice.one',
    type: 'link',
    href: 'https://nguyenhungthai.powerservice.one/',
    colorTheme: {
      bg: 'bg-purple-50/80 dark:bg-purple-950/40',
      border: 'border-purple-200/80 dark:border-purple-800/50',
      iconBg: 'bg-purple-500/15',
      iconColor: 'text-purple-600 dark:text-purple-400',
      labelColor: 'text-slate-500 dark:text-slate-400',
      valueColor: 'text-slate-900 dark:text-white',
      arrowColor: 'text-purple-500',
    },
  },
  {
    id: 'linkedin',
    iconName: 'Linkedin',
    labelVi: 'LinkedIn Profile',
    labelEn: 'LinkedIn',
    valueVi: 'linkedin.com/in/hungthai84',
    valueEn: 'linkedin.com/in/hungthai84',
    type: 'link',
    href: 'https://www.linkedin.com/in/hungthai84/',
    colorTheme: {
      bg: 'bg-sky-50/80 dark:bg-sky-950/40',
      border: 'border-sky-200/80 dark:border-sky-800/50',
      iconBg: 'bg-sky-600/15',
      iconColor: 'text-sky-700 dark:text-sky-300',
      labelColor: 'text-slate-500 dark:text-slate-400',
      valueColor: 'text-slate-900 dark:text-white',
      arrowColor: 'text-sky-600',
    },
  },
];

export interface EcosystemBannerItem {
  id: string;
  title: string;
  pageIndex: number;
  videoSrc: string;
  badge: string;
  desc: string;
  color: string;
}

export const ECOSYSTEM_BANNERS: EcosystemBannerItem[] = [
  {
    id: 'about',
    title: 'Giới Thiệu',
    pageIndex: 2,
    videoSrc: 'https://cdn.scena.ai/project/10223/f5d9a4cf1ce874ff8473d34cff75c13836b03aabf9a707004fcd2d9547b0725c.mp4',
    badge: 'Chân Dung & Sứ Mệnh',
    desc: '22+ Năm thực chiến quản trị trải nghiệm khách hàng.',
    color: '#3b82f6',
  },
  {
    id: 'education',
    title: 'Học Vấn',
    pageIndex: 3,
    videoSrc: 'https://cdn.scena.ai/project/10223/cc5a8e558d2380dc8bfb96fd26cd877e444d63b6a7036a8530abd823d6d6da63.mp4',
    badge: '14 Bằng Cấp & Chứng Chỉ',
    desc: 'Cử nhân CNTT & Quản trị Kinh doanh, COPC, ITIL.',
    color: '#06b6d4',
  },
  {
    id: 'experience',
    title: 'Kinh Nghiệm',
    pageIndex: 6,
    videoSrc: 'https://cdn.scena.ai/project/10223/50cd00ea3adfb39fb5860c632402df091d620960b69aae65fd2bb08f4bea4fc6.mp4',
    badge: '2003 - 2026+ C-Level',
    desc: 'Hành trình dẫn dắt mạng lưới Call Center & Omni-channel.',
    color: '#8b5cf6',
  },
  {
    id: 'projects',
    title: 'Dự Án',
    pageIndex: 7,
    videoSrc: 'https://cdn.scena.ai/project/10223/cc106cb37b8d219cca59af9a71a4d7a8cd019515a3e9a8282d16909bb21d88b9.mp4',
    badge: 'Kho 21 Dự Án Trọng Điểm',
    desc: 'Thiết kế SOP, tái cấu trúc tổ chức và tự động hóa AI.',
    color: '#10b981',
  },
  {
    id: 'systems',
    title: 'Hệ Thống',
    pageIndex: 8,
    videoSrc: 'https://cdn.scena.ai/project/10223/7bd12b39b9758378cc8f15b6169d42368b4778ad2f2f322b1ef8403c90268f24.mp4',
    badge: 'Cổng Bento 12 Hệ Thống',
    desc: 'SDP, ERP, CRM, HRM, OKR, BPM trên powerservice.one.',
    color: '#f59e0b',
  },
  {
    id: 'horoscope',
    title: 'Tử Vi',
    pageIndex: 10,
    videoSrc: 'https://cdn.scena.ai/project/10223/ddb11f6544a9a76e2b6c5946ee6805f53a61b1f57a3049bfba7856d2f52ee367.mp4',
    badge: 'Bát Trạch Quản Trị',
    desc: 'Ứng dụng thuật số và phong thủy điều hành nhân sự.',
    color: '#ec4899',
  },
  {
    id: 'contact',
    title: 'Liên Hệ',
    pageIndex: 12,
    videoSrc: 'https://cdn.scena.ai/project/10223/50b7b30031d4b9124af4948a069cdf530ca8f0942767f6e6b713c350cb8bd6b2.mp4',
    badge: 'Kết Nối Trực Tiếp',
    desc: 'Hotline, Zalo, Email và đặt lịch phỏng vấn C-Level.',
    color: '#ef4444',
  },
];

export const SERVICE_PHILOSOPHY_VALUES = [
  {
    id: 'efficiency',
    titleVi: '01. HIỆU QUẢ',
    titleEn: '01. EFFICIENCY',
    subtitleVi: 'Tối ưu & Kết quả',
    subtitleEn: 'Optimization & Results',
    descVi: 'Tối ưu hiệu suất, tạo kết quả đo lường được.',
    descEn: 'Optimize performance and deliver measurable results.',
  },
  {
    id: 'humanity',
    titleVi: '02. NHÂN VĂN',
    titleEn: '02. HUMANITY',
    subtitleVi: 'Đồng cảm & Thấu hiểu',
    subtitleEn: 'Empathy & Understanding',
    descVi: 'Lắng nghe, thấu hiểu và đặt con người làm trung tâm.',
    descEn: 'Listen, understand, and put people at the center.',
  },
  {
    id: 'sustainability',
    titleVi: '03. BỀN VỮNG',
    titleEn: '03. SUSTAINABILITY',
    subtitleVi: 'Giá trị & Tin cậy',
    subtitleEn: 'Value & Trust',
    descVi: 'Xây dựng niềm tin và giá trị bền vững.',
    descEn: 'Build lasting trust and sustainable value.',
  },
];
