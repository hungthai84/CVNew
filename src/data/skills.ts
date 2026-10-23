export interface SkillItem {
  icon: string;
  name: string;
  percent: number;
  desc: string;
}

export interface SkillCategory {
  id: string;
  code: string;
  quadrant: 'S' | 'W' | 'O' | 'T';
  title: string;
  desc: string;
  headerIcon: string;
  theme: {
    accent: string;
    border: string;
    badgeBg: string;
    badgeText: string;
    barGradient: string;
    subBg: string;
    subBorder: string;
    iconBg: string;
  };
  skills: SkillItem[];
}

export interface LanguageSkill {
  id: string;
  icon: string;
  name: string;
  percent: number;
  level: string;
  desc: string;
  strokeColor: string;
}

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: 'strengths',
    code: '7.1',
    quadrant: 'S',
    title: 'Điểm mạnh: Nền tảng vận hành & lãnh đạo',
    desc: 'Những năng lực cốt lõi đã được chứng minh qua thực tiễn quản lý, vận hành và phát triển hệ thống Dịch vụ Khách hàng.',
    headerIcon: 'gem',
    theme: {
      accent: 'text-blue-600',
      border: 'border-blue-200/80',
      badgeBg: 'bg-blue-500/10',
      badgeText: 'text-blue-700 border-blue-200',
      barGradient: 'from-blue-500 to-cyan-500',
      subBg: 'bg-blue-50/40 hover:bg-white',
      subBorder: 'border-blue-100/70',
      iconBg: 'bg-blue-100 text-blue-700',
    },
    skills: [
      {
        icon: 'target',
        name: 'Trải nghiệm khách hàng',
        percent: 98,
        desc: 'Xây dựng và tối ưu hóa trải nghiệm khách hàng toàn diện',
      },
      {
        icon: 'phone',
        name: 'CRM Contact Center',
        percent: 96,
        desc: 'Quản trị và vận hành hệ thống CRM & Contact Center đa kênh',
      },
      {
        icon: 'chart',
        name: 'Quản trị Hiệu suất',
        percent: 96,
        desc: 'Thiết lập và theo dõi bộ chỉ số KPI/SLA vận hành',
      },
      {
        icon: 'users',
        name: 'Lãnh đạo & Đội ngũ',
        percent: 95,
        desc: 'Lãnh đạo, đào tạo và phát triển đội ngũ quy mô lớn',
      },
      {
        icon: 'clipboard',
        name: 'SOP & Chuẩn hóa',
        percent: 95,
        desc: 'Xây dựng quy trình vận hành tiêu chuẩn chuẩn hóa 100%',
      },
      {
        icon: 'shield',
        name: 'Xử lý Khủng hoảng',
        percent: 94,
        desc: 'Quản trị sự cố và xử lý khủng hoảng dịch vụ khẩn cấp',
      },
    ],
  },
  {
    id: 'weaknesses',
    code: '7.2',
    quadrant: 'W',
    title: 'Hoàn thiện: Nâng cao năng lực quản trị',
    desc: 'Những năng lực cần tiếp tục hoàn thiện để nâng tầm vai trò quản lý từ vận hành hiệu quả sang quản trị chiến lược và phát triển bền vững.',
    headerIcon: 'trend-up',
    theme: {
      accent: 'text-amber-600',
      border: 'border-amber-200/80',
      badgeBg: 'bg-amber-500/10',
      badgeText: 'text-amber-700 border-amber-200',
      barGradient: 'from-amber-500 to-orange-500',
      subBg: 'bg-amber-50/40 hover:bg-white',
      subBorder: 'border-amber-100/70',
      iconBg: 'bg-amber-100 text-amber-700',
    },
    skills: [
      {
        icon: 'bulb',
        name: 'Tư duy dịch vụ',
        percent: 92,
        desc: 'Định hướng triết lý phụng sự và văn hóa thấu cảm trong tổ chức',
      },
      {
        icon: 'handshake',
        name: 'Giao tiếp & Đàm phán',
        percent: 90,
        desc: 'Kỹ năng truyền thông, thuyết phục và đàm phán cấp cao',
      },
      {
        icon: 'compass',
        name: 'Tư duy Chiến lược',
        percent: 88,
        desc: 'Hoạch định tầm nhìn dài hạn và chuyển đổi chiến lược CX',
      },
      {
        icon: 'chart',
        name: 'Quản trị Dự án',
        percent: 88,
        desc: 'Điều hành các dự án cải tiến theo phương pháp Agile/Kanban',
      },
      {
        icon: 'sparkles',
        name: 'Công nghệ Đổi mới',
        percent: 86,
        desc: 'Nghiên cứu và thử nghiệm công nghệ nâng cao hiệu suất',
      },
      {
        icon: 'desktop',
        name: 'Thiết kế & Lập trình',
        percent: 78,
        desc: 'Tự phát triển kỹ năng kỹ thuật để làm chủ hệ thống số',
      },
    ],
  },
  {
    id: 'opportunities',
    code: '7.3',
    quadrant: 'O',
    title: 'Cơ hội: Công nghệ & chuyển đổi dịch vụ',
    desc: 'Những năng lực tạo đòn bẩy để nâng cao hiệu quả vận hành, tối ưu nguồn lực và chuyển đổi mô hình Dịch vụ Khách hàng trong thời đại số.',
    headerIcon: 'rocket',
    theme: {
      accent: 'text-purple-600',
      border: 'border-purple-200/80',
      badgeBg: 'bg-purple-500/10',
      badgeText: 'text-purple-700 border-purple-200',
      barGradient: 'from-purple-500 to-pink-500',
      subBg: 'bg-purple-50/40 hover:bg-white',
      subBorder: 'border-purple-100/70',
      iconBg: 'bg-purple-100 text-purple-700',
    },
    skills: [
      {
        icon: 'bot',
        name: 'AI & Tự động hóa',
        percent: 94,
        desc: 'Ứng dụng Generative AI và RPA tự động hóa thao tác',
      },
      {
        icon: 'sync',
        name: 'Kaizen & Cải tiến',
        percent: 94,
        desc: 'Tư duy cải tiến liên tục quy trình và loại bỏ lãng phí',
      },
      {
        icon: 'coin',
        name: 'Tối ưu Chi phí',
        percent: 93,
        desc: 'Tối ưu hóa Cost-to-Serve nhưng vẫn giữ vững chất lượng CSAT',
      },
      {
        icon: 'bolt',
        name: 'Chuyển đổi Số',
        percent: 92,
        desc: 'Số hóa toàn diện kênh tương tác và luồng công việc CSKH',
      },
      {
        icon: 'chart',
        name: 'Quản trị Dữ liệu',
        percent: 91,
        desc: 'Khai thác dữ liệu hành vi và phân tích cảm xúc khách hàng VoC',
      },
      {
        icon: 'building',
        name: 'Thiết kế Hệ thống',
        percent: 87,
        desc: 'Kiến trúc hạ tầng Contact Center linh hoạt và mở rộng dễ dàng',
      },
    ],
  },
  {
    id: 'threats',
    code: '7.4',
    quadrant: 'T',
    title: 'Thách thức: Thích ứng & quản trị biến động',
    desc: 'Những yếu tố bên ngoài tác động trực tiếp đến chất lượng dịch vụ, nhân sự và hiệu quả vận hành, đòi hỏi khả năng thích ứng và quản trị chủ động.',
    headerIcon: 'target',
    theme: {
      accent: 'text-rose-600',
      border: 'border-rose-200/80',
      badgeBg: 'bg-rose-500/10',
      badgeText: 'text-rose-700 border-rose-200',
      barGradient: 'from-red-500 to-rose-600',
      subBg: 'bg-rose-50/40 hover:bg-white',
      subBorder: 'border-rose-100/70',
      iconBg: 'bg-rose-100 text-rose-700',
    },
    skills: [
      {
        icon: 'trend-down',
        name: 'Tối ưu Chi phí',
        percent: 94,
        desc: 'Áp lực giảm chi phí vận hành nhưng phải duy trì hiệu năng cao',
      },
      {
        icon: 'bolt',
        name: 'AI & Thay đổi CSKH',
        percent: 92,
        desc: 'Tốc độ chuyển đổi AI nhanh đòi hỏi tái đào tạo nhân sự kịp thời',
      },
      {
        icon: 'mobile',
        name: 'Công nghệ Đổi mới',
        percent: 90,
        desc: 'Sự xuất hiện liên tục của các công cụ số mới trên thị trường',
      },
      {
        icon: 'shield',
        name: 'Quản trị Rủi ro',
        percent: 90,
        desc: 'Rủi ro biến động nhân sự, an toàn thông tin và khủng hoảng CSKH',
      },
      {
        icon: 'users',
        name: 'Cạnh tranh Nhân sự',
        percent: 88,
        desc: 'Tỷ lệ xoay dòng nhân sự ngành CSKH cao, đòi hỏi chính sách giữ chân tốt',
      },
      {
        icon: 'sync',
        name: 'Phối hợp Liên phòng',
        percent: 86,
        desc: 'Xung đột điểm nghẽn quy trình giữa CSKH, Sản phẩm và Kinh doanh',
      },
    ],
  },
];

export const LANGUAGE_SKILLS: LanguageSkill[] = [
  {
    id: 'vi',
    icon: 'globe',
    name: 'Tiếng Việt',
    percent: 90,
    level: 'Xuất sắc',
    desc: 'Ngôn ngữ bản xứ, thành thạo chuyên sâu trong giao tiếp và điều hành',
    strokeColor: '#10b981',
  },
  {
    id: 'en',
    icon: 'globe',
    name: 'Tiếng Anh',
    percent: 60,
    level: 'Chuyên nghiệp',
    desc: 'Giao tiếp chuyên nghiệp, đáp ứng công việc trong môi trường quốc tế',
    strokeColor: '#3b82f6',
  },
  {
    id: 'ai',
    icon: 'bot',
    name: 'Ứng dụng AI',
    percent: 85,
    level: 'Thành thạo',
    desc: 'Dịch thuật & Trợ lý AI thời gian thực hỗ trợ trao đổi đa quốc gia',
    strokeColor: '#8b5cf6',
  },
];

export interface SwotSkillItem {
  id: string;
  iconName: string;
  labelVi: string;
  labelEn: string;
  percent: number;
  descVi?: string;
}

export interface LanguageProficiencyItem {
  id: string;
  nameVi: string;
  nameEn: string;
  roleVi: string;
  roleEn: string;
  levelVi: string;
  levelEn: string;
  percent: number;
  color: string;
}

export const STRENGTHS_DATA: SwotSkillItem[] = [
  {
    id: 's-1',
    iconName: 'Target',
    labelVi: 'Trải nghiệm khách hàng',
    labelEn: 'Customer Experience (CX)',
    percent: 98,
    descVi: 'Xây dựng và tối ưu hóa trải nghiệm khách hàng toàn diện',
  },
  {
    id: 's-2',
    iconName: 'Headphones',
    labelVi: 'CRM Contact Center',
    labelEn: 'CRM & Contact Center',
    percent: 96,
    descVi: 'Quản trị và vận hành hệ thống CRM & Contact Center đa kênh',
  },
  {
    id: 's-3',
    iconName: 'BarChart3',
    labelVi: 'Quản trị Hiệu suất',
    labelEn: 'Performance Governance',
    percent: 96,
    descVi: 'Thiết lập và theo dõi bộ chỉ số KPI/SLA vận hành',
  },
  {
    id: 's-4',
    iconName: 'Users',
    labelVi: 'Lãnh đạo & Đội ngũ',
    labelEn: 'Team Leadership',
    percent: 95,
    descVi: 'Lãnh đạo, đào tạo và phát triển đội ngũ quy mô lớn',
  },
  {
    id: 's-5',
    iconName: 'Workflow',
    labelVi: 'SOP & Chuẩn hóa',
    labelEn: 'SOP Standardization',
    percent: 95,
    descVi: 'Xây dựng quy trình vận hành tiêu chuẩn chuẩn hóa 100%',
  },
  {
    id: 's-6',
    iconName: 'ShieldAlert',
    labelVi: 'Xử lý Khủng hoảng',
    labelEn: 'Crisis Management',
    percent: 94,
    descVi: 'Quản trị sự cố và xử lý khủng hoảng dịch vụ khẩn cấp',
  },
];

export const WEAKNESSES_DATA: SwotSkillItem[] = [
  {
    id: 'w-1',
    iconName: 'Lightbulb',
    labelVi: 'Tư duy dịch vụ',
    labelEn: 'Service Mindset',
    percent: 92,
    descVi: 'Định hướng triết lý phụng sự và văn hóa thấu cảm trong tổ chức',
  },
  {
    id: 'w-2',
    iconName: 'HeartHandshake',
    labelVi: 'Giao tiếp & Đàm phán',
    labelEn: 'Communication & Negotiation',
    percent: 90,
    descVi: 'Kỹ năng truyền thông, thuyết phục và đàm phán cấp cao',
  },
  {
    id: 'w-3',
    iconName: 'Compass',
    labelVi: 'Tư duy Chiến lược',
    labelEn: 'Strategic Thinking',
    percent: 88,
    descVi: 'Hoạch định tầm nhìn dài hạn và chuyển đổi chiến lược CX',
  },
  {
    id: 'w-4',
    iconName: 'PieChart',
    labelVi: 'Quản trị Dự án',
    labelEn: 'Project Governance',
    percent: 88,
    descVi: 'Điều hành các dự án cải tiến theo phương pháp Agile/Kanban',
  },
  {
    id: 'w-5',
    iconName: 'Sparkles',
    labelVi: 'Công nghệ Đổi mới',
    labelEn: 'Tech Innovation',
    percent: 86,
    descVi: 'Nghiên cứu và thử nghiệm công nghệ nâng cao hiệu suất',
  },
  {
    id: 'w-6',
    iconName: 'Monitor',
    labelVi: 'Thiết kế & Lập trình',
    labelEn: 'UI/UX & Web Dev',
    percent: 78,
    descVi: 'Tự phát triển kỹ năng kỹ thuật để làm chủ hệ thống số',
  },
];

export const OPPORTUNITIES_DATA: SwotSkillItem[] = [
  {
    id: 'o-1',
    iconName: 'Bot',
    labelVi: 'AI & Tự động hóa',
    labelEn: 'AI & Automation',
    percent: 94,
    descVi: 'Ứng dụng Generative AI và RPA tự động hóa thao tác',
  },
  {
    id: 'o-2',
    iconName: 'TrendingUp',
    labelVi: 'Kaizen & Cải tiến',
    labelEn: 'Kaizen & Continuous Improvement',
    percent: 94,
    descVi: 'Tư duy cải tiến liên tục quy trình và loại bỏ lãng phí',
  },
  {
    id: 'o-3',
    iconName: 'Coins',
    labelVi: 'Tối ưu Chi phí',
    labelEn: 'Cost Optimization',
    percent: 93,
    descVi: 'Tối ưu hóa Cost-to-Serve nhưng vẫn giữ vững chất lượng CSAT',
  },
  {
    id: 'o-4',
    iconName: 'Zap',
    labelVi: 'Chuyển đổi Số',
    labelEn: 'Digital Transformation',
    percent: 92,
    descVi: 'Số hóa toàn diện kênh tương tác và luồng công việc CSKH',
  },
  {
    id: 'o-5',
    iconName: 'Database',
    labelVi: 'Quản trị Dữ liệu',
    labelEn: 'Data Governance',
    percent: 91,
    descVi: 'Khai thác dữ liệu hành vi và phân tích cảm xúc khách hàng VoC',
  },
  {
    id: 'o-6',
    iconName: 'Layers',
    labelVi: 'Thiết kế Hệ thống',
    labelEn: 'System Architecture',
    percent: 87,
    descVi: 'Kiến trúc hạ tầng Contact Center linh hoạt và mở rộng dễ dàng',
  },
];

export const THREATS_DATA: SwotSkillItem[] = [
  {
    id: 't-1',
    iconName: 'Coins',
    labelVi: 'Tối ưu Chi phí',
    labelEn: 'Cost Pressure',
    percent: 94,
    descVi: 'Áp lực giảm chi phí vận hành nhưng phải duy trì hiệu năng cao',
  },
  {
    id: 't-2',
    iconName: 'Zap',
    labelVi: 'AI & Thay đổi CSKH',
    labelEn: 'Rapid AI Shift in CX',
    percent: 92,
    descVi: 'Tốc độ chuyển đổi AI nhanh đòi hỏi tái đào tạo nhân sự kịp thời',
  },
  {
    id: 't-3',
    iconName: 'Cpu',
    labelVi: 'Công nghệ Đổi mới',
    labelEn: 'Disruptive Tech Wave',
    percent: 90,
    descVi: 'Sự xuất hiện liên tục của các công cụ số mới trên thị trường',
  },
  {
    id: 't-4',
    iconName: 'ShieldCheck',
    labelVi: 'Quản trị Rủi ro',
    labelEn: 'Operational Risk',
    percent: 90,
    descVi: 'Rủi ro biến động nhân sự, an toàn thông tin và khủng hoảng CSKH',
  },
  {
    id: 't-5',
    iconName: 'Users',
    labelVi: 'Cạnh tranh Nhân sự',
    labelEn: 'Talent Retention',
    percent: 88,
    descVi: 'Tỷ lệ xoay dòng nhân sự ngành CSKH cao, đòi hỏi chính sách giữ chân tốt',
  },
  {
    id: 't-6',
    iconName: 'Workflow',
    labelVi: 'Phối hợp Liên phòng',
    labelEn: 'Cross-Department Alignment',
    percent: 86,
    descVi: 'Xung đột điểm nghẽn quy trình giữa CSKH, Sản phẩm và Kinh doanh',
  },
];

export const LANGUAGES_DATA: LanguageProficiencyItem[] = [
  {
    id: 'vi',
    nameVi: 'Tiếng Việt',
    nameEn: 'Vietnamese',
    roleVi: 'Ngôn ngữ bản xứ, thành thạo chuyên sâu trong giao tiếp và điều hành',
    roleEn: 'Native language, executive communication & leadership',
    levelVi: 'Xuất sắc · Bản ngữ',
    levelEn: 'Native · Executive',
    percent: 90,
    color: 'text-emerald-600 dark:text-emerald-400',
  },
  {
    id: 'en',
    nameVi: 'Tiếng Anh',
    nameEn: 'English',
    roleVi: 'Giao tiếp chuyên nghiệp, đáp ứng công việc trong môi trường quốc tế',
    roleEn: 'Professional working proficiency in international environments',
    levelVi: 'Chuyên nghiệp · Quốc tế',
    levelEn: 'Professional Working',
    percent: 60,
    color: 'text-blue-600 dark:text-cyan-400',
  },
  {
    id: 'ai',
    nameVi: 'Ứng dụng AI Đa Ngôn Ngữ',
    nameEn: 'Multilingual AI Workflows',
    roleVi: 'Dịch thuật & Trợ lý AI thời gian thực hỗ trợ trao đổi đa quốc gia',
    roleEn: 'Real-time AI translation & global cross-border collaboration',
    levelVi: 'Thành thạo · AI-Assisted',
    levelEn: 'Advanced AI-Assisted',
    percent: 85,
    color: 'text-purple-600 dark:text-purple-400',
  },
];

