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
