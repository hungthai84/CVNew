export interface AboutProfileStat {
  id: string;
  labelVi: string;
  labelEn: string;
  metric: string;
  unitVi: string;
  unitEn: string;
  iconName: string;
  color: string;
  positionClass: string;
  animationDelay: number;
}

export interface PersonalInfoItem {
  id: string;
  labelVi: string;
  labelEn: string;
  valueVi: string;
  valueEn: string;
  iconName: string;
  type?: 'text' | 'map' | 'email' | 'phone' | 'link';
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

export const ABOUT_PROFILE_STATS: AboutProfileStat[] = [
  {
    id: 'experience',
    labelVi: 'Kinh nghiệm CX & CS',
    labelEn: 'CX & CS Experience',
    metric: '22+',
    unitVi: 'NĂM',
    unitEn: 'YEARS',
    iconName: 'Calendar',
    color: '#2563EB',
    positionClass: 'top-3 left-3 sm:top-4 sm:left-4',
    animationDelay: 0,
  },
  {
    id: 'environments',
    labelVi: 'Quy mô lớn',
    labelEn: 'Large Scale',
    metric: '8+',
    unitVi: 'MÔI TRƯỜNG',
    unitEn: 'ENVIRONMENTS',
    iconName: 'Building2',
    color: '#8B5CF6',
    positionClass: 'top-3 right-3 sm:top-4 sm:right-4',
    animationDelay: 0.3,
  },
  {
    id: 'automation',
    labelVi: 'Tự động hoá',
    labelEn: 'Automation',
    metric: '24/7',
    unitVi: 'AI CRM',
    unitEn: 'AI CRM',
    iconName: 'Bot',
    color: '#0D9488',
    positionClass: 'bottom-16 right-3 sm:bottom-20 sm:right-4',
    animationDelay: 0.6,
  },
  {
    id: 'csat',
    labelVi: 'Tỷ lệ hài lòng KH',
    labelEn: 'Satisfaction CSAT',
    metric: '99',
    unitVi: '%',
    unitEn: '%',
    iconName: 'Heart',
    color: '#F43F5E',
    positionClass: 'bottom-3 right-3 sm:bottom-4 sm:right-4',
    animationDelay: 0.9,
  },
];

export const PERSONAL_DEMOGRAPHICS: PersonalInfoItem[] = [
  {
    id: 'gender',
    labelVi: 'Giới tính',
    labelEn: 'Gender',
    valueVi: 'Nam giới',
    valueEn: 'Male',
    iconName: 'User',
    type: 'text',
    colorTheme: {
      bg: 'bg-blue-50/60 dark:bg-blue-950/30',
      border: 'border-blue-200/70 dark:border-blue-900/40',
      iconBg: 'bg-blue-500/15',
      iconColor: 'text-blue-600 dark:text-cyan-400',
      labelColor: 'text-blue-600 dark:text-cyan-400',
      valueColor: 'text-slate-900 dark:text-white',
      arrowColor: 'text-blue-400',
    },
  },
  {
    id: 'ethnicity',
    labelVi: 'Dân tộc',
    labelEn: 'Ethnicity',
    valueVi: 'Kinh',
    valueEn: 'Kinh (Vietnamese)',
    iconName: 'Users',
    type: 'text',
    colorTheme: {
      bg: 'bg-purple-50/60 dark:bg-purple-950/30',
      border: 'border-purple-200/70 dark:border-purple-900/40',
      iconBg: 'bg-purple-500/15',
      iconColor: 'text-purple-600 dark:text-purple-400',
      labelColor: 'text-purple-600 dark:text-purple-400',
      valueColor: 'text-slate-900 dark:text-white',
      arrowColor: 'text-purple-400',
    },
  },
  {
    id: 'marital_status',
    labelVi: 'Tình trạng',
    labelEn: 'Marital Status',
    valueVi: 'Độc thân',
    valueEn: 'Single',
    iconName: 'Heart',
    type: 'text',
    colorTheme: {
      bg: 'bg-rose-50/60 dark:bg-rose-950/30',
      border: 'border-rose-200/70 dark:border-rose-900/40',
      iconBg: 'bg-rose-500/15',
      iconColor: 'text-rose-600 dark:text-rose-400',
      labelColor: 'text-rose-600 dark:text-rose-400',
      valueColor: 'text-rose-600 dark:text-rose-400',
      arrowColor: 'text-rose-400',
    },
  },
  {
    id: 'birthday',
    labelVi: 'Sinh nhật',
    labelEn: 'Birthday',
    valueVi: '22/06/1984',
    valueEn: 'June 22, 1984',
    iconName: 'Calendar',
    type: 'text',
    colorTheme: {
      bg: 'bg-amber-50/60 dark:bg-amber-950/30',
      border: 'border-amber-200/70 dark:border-amber-900/40',
      iconBg: 'bg-amber-500/15',
      iconColor: 'text-amber-600 dark:text-amber-400',
      labelColor: 'text-amber-600 dark:text-amber-400',
      valueColor: 'text-slate-900 dark:text-white',
      arrowColor: 'text-amber-400',
    },
  },
  {
    id: 'current_address',
    labelVi: 'Tạm trú',
    labelEn: 'Current Location',
    valueVi: 'Q7, Hồ Chí Minh',
    valueEn: 'District 7, HCMC',
    iconName: 'MapPin',
    type: 'map',
    mapTitle: 'Địa Chỉ Tạm Trú',
    href: 'Quận 7, TP. Hồ Chí Minh',
    mapQuery: 'Quận 7, Thành phố Hồ Chí Minh, Việt Nam',
    colorTheme: {
      bg: 'bg-violet-50/60 dark:bg-violet-950/30',
      border: 'border-violet-200/70 dark:border-violet-900/40',
      iconBg: 'bg-violet-500/15',
      iconColor: 'text-violet-600 dark:text-violet-400',
      labelColor: 'text-violet-600 dark:text-violet-400',
      valueColor: 'text-slate-900 dark:text-white',
      arrowColor: 'text-violet-400',
    },
  },
  {
    id: 'perm_address',
    labelVi: 'Cư trú',
    labelEn: 'Permanent Address',
    valueVi: 'Mỹ Tho, Tiền Giang',
    valueEn: 'My Tho, Tien Giang',
    iconName: 'Home',
    type: 'map',
    mapTitle: 'Địa Chỉ Cư Trú Thường Trú',
    href: 'TP. Mỹ Tho, Tiền Giang',
    mapQuery: 'Mỹ Tho, Tiền Giang, Việt Nam',
    colorTheme: {
      bg: 'bg-emerald-50/60 dark:bg-emerald-950/30',
      border: 'border-emerald-200/70 dark:border-emerald-900/40',
      iconBg: 'bg-emerald-500/15',
      iconColor: 'text-emerald-600 dark:text-emerald-400',
      labelColor: 'text-emerald-600 dark:text-emerald-400',
      valueColor: 'text-slate-900 dark:text-white',
      arrowColor: 'text-emerald-400',
    },
  },
  {
    id: 'email',
    labelVi: 'Email',
    labelEn: 'Official Email',
    valueVi: 'hungthai848@gmail.com',
    valueEn: 'hungthai848@gmail.com',
    iconName: 'Mail',
    type: 'email',
    href: 'mailto:hungthai848@gmail.com',
    colorTheme: {
      bg: 'bg-blue-50/60 dark:bg-blue-950/30',
      border: 'border-blue-200/70 dark:border-blue-900/40',
      iconBg: 'bg-blue-500/15',
      iconColor: 'text-blue-600 dark:text-blue-400',
      labelColor: 'text-blue-600 dark:text-blue-400',
      valueColor: 'text-blue-600 dark:text-cyan-300',
      arrowColor: 'text-blue-400',
    },
  },
];
