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
    iconName: 'TrendingUp',
    labelVi: 'Kinh nghiệm',
    labelEn: 'Experience',
    metric: '20+',
    unitVi: 'Năm',
    unitEn: 'Years',
    positionClass: 'top-4 left-4 sm:top-6 sm:left-6',
    color: '#0ea5e9',
    animationDelay: 0,
  },
  {
    id: 'projects',
    iconName: 'Building2',
    labelVi: 'Dự án trọng điểm',
    labelEn: 'Key Projects',
    metric: '21',
    unitVi: 'Dự án',
    unitEn: 'Projects',
    positionClass: 'top-4 right-4 sm:top-6 sm:right-6',
    color: '#8b5cf6',
    animationDelay: 0.5,
  },
  {
    id: 'csat',
    iconName: 'Heart',
    labelVi: 'Độ hài lòng CSAT',
    labelEn: 'CSAT Score',
    metric: '98%',
    unitVi: 'Hài lòng',
    unitEn: 'Satisfaction',
    positionClass: 'bottom-16 left-4 sm:bottom-20 sm:left-6',
    color: '#10b981',
    animationDelay: 1.0,
  },
  {
    id: 'environments',
    iconName: 'Bot',
    labelVi: 'Hệ thống vận hành',
    labelEn: 'Systems Built',
    metric: '12+',
    unitVi: 'Hệ thống',
    unitEn: 'Systems',
    positionClass: 'bottom-16 right-4 sm:bottom-20 sm:right-6',
    color: '#f59e0b',
    animationDelay: 1.5,
  },
];

export const PERSONAL_DEMOGRAPHICS: DemographicItem[] = [
  {
    id: 'dob',
    iconName: 'Calendar',
    labelVi: 'Ngày sinh',
    labelEn: 'Date of Birth',
    valueVi: '28/10/1979',
    valueEn: 'October 28, 1979',
    type: 'text',
    colorTheme: {
      bg: 'bg-blue-50/80 dark:bg-blue-950/30',
      border: 'border-blue-200/80 dark:border-blue-900/40',
      iconBg: 'bg-blue-500/10',
      iconColor: 'text-blue-600 dark:text-cyan-400',
      labelColor: 'text-blue-900/70 dark:text-cyan-300/70',
      valueColor: 'text-blue-950 dark:text-cyan-100',
      arrowColor: 'text-blue-500',
    },
  },
  {
    id: 'hometown',
    iconName: 'MapPin',
    labelVi: 'Quê quán',
    labelEn: 'Hometown',
    valueVi: 'Thừa Thiên Huế',
    valueEn: 'Thua Thien Hue, Vietnam',
    type: 'text',
    colorTheme: {
      bg: 'bg-emerald-50/80 dark:bg-emerald-950/30',
      border: 'border-emerald-200/80 dark:border-emerald-900/40',
      iconBg: 'bg-emerald-500/10',
      iconColor: 'text-emerald-600 dark:text-emerald-400',
      labelColor: 'text-emerald-900/70 dark:text-emerald-300/70',
      valueColor: 'text-emerald-950 dark:text-emerald-100',
      arrowColor: 'text-emerald-500',
    },
  },
  {
    id: 'perm_address',
    iconName: 'Home',
    labelVi: 'Địa chỉ cư trú',
    labelEn: 'Permanent Address',
    valueVi: 'Quận 7, TP. Hồ Chí Minh',
    valueEn: 'District 7, Ho Chi Minh City',
    type: 'map',
    href: 'Quận 7, TP. Hồ Chí Minh',
    mapTitle: 'Địa chỉ cư trú (Quận 7, TP.HCM)',
    mapQuery: 'District 7, Ho Chi Minh City, Vietnam',
    colorTheme: {
      bg: 'bg-purple-50/80 dark:bg-purple-950/30',
      border: 'border-purple-200/80 dark:border-purple-900/40',
      iconBg: 'bg-purple-500/10',
      iconColor: 'text-purple-600 dark:text-purple-400',
      labelColor: 'text-purple-900/70 dark:text-purple-300/70',
      valueColor: 'text-purple-950 dark:text-purple-100',
      arrowColor: 'text-purple-500',
    },
  },
  {
    id: 'temp_address',
    iconName: 'MapPin',
    labelVi: 'Địa chỉ tạm trú',
    labelEn: 'Current Residence',
    valueVi: 'Thủ Đức, TP. Hồ Chí Minh',
    valueEn: 'Thu Duc, Ho Chi Minh City',
    type: 'map',
    href: 'Thủ Đức, TP. Hồ Chí Minh',
    mapTitle: 'Địa chỉ tạm trú (Thủ Đức, TP.HCM)',
    mapQuery: 'Thu Duc, Ho Chi Minh City, Vietnam',
    colorTheme: {
      bg: 'bg-amber-50/80 dark:bg-amber-950/30',
      border: 'border-amber-200/80 dark:border-amber-900/40',
      iconBg: 'bg-amber-500/10',
      iconColor: 'text-amber-600 dark:text-amber-400',
      labelColor: 'text-amber-900/70 dark:text-amber-300/70',
      valueColor: 'text-amber-950 dark:text-amber-100',
      arrowColor: 'text-amber-500',
    },
  },
  {
    id: 'email',
    iconName: 'Mail',
    labelVi: 'Email liên hệ',
    labelEn: 'Email Address',
    valueVi: 'hungthaisg79@gmail.com',
    valueEn: 'hungthaisg79@gmail.com',
    type: 'email',
    href: 'mailto:hungthaisg79@gmail.com',
    colorTheme: {
      bg: 'bg-rose-50/80 dark:bg-rose-950/30',
      border: 'border-rose-200/80 dark:border-rose-900/40',
      iconBg: 'bg-rose-500/10',
      iconColor: 'text-rose-600 dark:text-rose-400',
      labelColor: 'text-rose-900/70 dark:text-rose-300/70',
      valueColor: 'text-rose-950 dark:text-rose-100',
      arrowColor: 'text-rose-500',
    },
  },
  {
    id: 'phone',
    iconName: 'Phone',
    labelVi: 'Điện thoại',
    labelEn: 'Phone Number',
    valueVi: '+84 908 123 456',
    valueEn: '+84 908 123 456',
    type: 'phone',
    href: 'tel:+84908123456',
    colorTheme: {
      bg: 'bg-cyan-50/80 dark:bg-cyan-950/30',
      border: 'border-cyan-200/80 dark:border-cyan-900/40',
      iconBg: 'bg-cyan-500/10',
      iconColor: 'text-cyan-600 dark:text-cyan-400',
      labelColor: 'text-cyan-900/70 dark:text-cyan-300/70',
      valueColor: 'text-cyan-950 dark:text-cyan-100',
      arrowColor: 'text-cyan-500',
    },
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
