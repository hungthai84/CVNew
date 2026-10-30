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
  { id: 's-1', iconName: 'Database', labelVi: 'Kiến thức sâu về CRM', labelEn: 'CRM Expertise', percent: 95 },
  { id: 's-2', iconName: 'BarChart3', labelVi: 'Phân tích dữ liệu khách hàng', labelEn: 'Customer Data Analytics', percent: 90 },
  { id: 's-3', iconName: 'Settings', labelVi: 'Xây dựng quy trình dịch vụ', labelEn: 'Service Process Design', percent: 90 },
  { id: 's-4', iconName: 'Users', labelVi: 'Tư duy lấy khách hàng làm trung tâm', labelEn: 'Customer-Centric Mindset', percent: 90 },
  { id: 's-5', iconName: 'Crown', labelVi: 'Lãnh đạo & Phát triển đội ngũ', labelEn: 'Leadership & Team Dev', percent: 90 },
  { id: 's-6', iconName: 'Lightbulb', labelVi: 'Giải quyết vấn đề', labelEn: 'Problem Solving', percent: 90 },
  { id: 's-7', iconName: 'Heart', labelVi: 'Trải nghiệm khách hàng (CX)', labelEn: 'Customer Experience (CX)', percent: 90 },
];

export const WEAKNESSES_DATA: SwotSkillItem[] = [
  { id: 'w-1', iconName: 'Target', labelVi: 'Tư duy chiến lược & Tầm nhìn dài hạn', labelEn: 'Strategic Thinking', percent: 80 },
  { id: 'w-2', iconName: 'FolderKanban', labelVi: 'Quản lý dự án', labelEn: 'Project Management', percent: 80 },
  { id: 'w-3', iconName: 'Code', labelVi: 'Thiết kế & Lập trình Web (Responsive)', labelEn: 'Web Design & Dev', percent: 85 },
  { id: 'w-4', iconName: 'Settings', labelVi: 'Tự động hóa', labelEn: 'Automation', percent: 85 },
  { id: 'w-5', iconName: 'BarChart2', labelVi: 'Quản lý hiệu suất (KPIs, OKRs)', labelEn: 'Performance Management', percent: 85 },
  { id: 'w-6', iconName: 'MessageSquare', labelVi: 'Giao tiếp', labelEn: 'Communication', percent: 85 },
  { id: 'w-7', iconName: 'Headset', labelVi: 'Giải quyết khiếu nại', labelEn: 'Complaint Handling', percent: 85 },
  { id: 'w-8', iconName: 'Users', labelVi: 'Xây dựng văn hóa dịch vụ nội bộ', labelEn: 'Internal Service Culture', percent: 85 },
  { id: 'w-9', iconName: 'ShieldAlert', labelVi: 'Quản lý rủi ro dịch vụ', labelEn: 'Service Risk Mgmt', percent: 85 },
  { id: 'w-10', iconName: 'Zap', labelVi: 'Thích ứng với công nghệ', labelEn: 'Tech Agility', percent: 85 },
];

export const OPPORTUNITIES_DATA: SwotSkillItem[] = [
  { id: 'o-1', iconName: 'Bot', labelVi: 'AI & Automation', labelEn: 'AI & Automation', percent: 94, descVi: 'Ứng dụng AI, Chatbot, RPA và Automation để tối ưu vận hành & trải nghiệm.' },
  { id: 'o-2', iconName: 'HeartHandshake', labelVi: 'CX Strategy & Transformation', labelEn: 'CX Strategy & Transformation', percent: 94, descVi: 'Dẫn dắt chiến lược CX, nâng cao trải nghiệm khách hàng toàn diện.' },
  { id: 'o-3', iconName: 'BarChart3', labelVi: 'Data-driven CX Management', labelEn: 'Data-driven CX Management', percent: 93, descVi: 'Khai thác dữ liệu, đo lường & cá nhân hóa trải nghiệm khách hàng.' },
  { id: 'o-4', iconName: 'Monitor', labelVi: 'Digital Transformation', labelEn: 'Digital Transformation', percent: 92, descVi: 'Thúc đẩy chuyển đổi số, CRM, Self-service và hệ sinh thái số.' },
];

export const THREATS_DATA: SwotSkillItem[] = [
  { id: 't-1', iconName: 'Bot', labelVi: 'AI thay đổi ngành CSKH', labelEn: 'AI Impact on CX', percent: 94, descVi: 'AI & Automation thay thế nhiều nghiệp vụ, yêu cầu nâng cấp năng lực liên tục.' },
  { id: 't-2', iconName: 'Cpu', labelVi: 'Công nghệ thay đổi nhanh', labelEn: 'Rapid Tech Change', percent: 92, descVi: 'CRM, AI, Data, Automation liên tục đổi mới, đòi hỏi học hỏi & thích ứng nhanh.' },
  { id: 't-3', iconName: 'Users', labelVi: 'Cạnh tranh nhân sự', labelEn: 'Talent Competition', percent: 90, descVi: 'Yêu cầu hội tụ đa năng: Business + CX + Tech + Leadership ngày càng cao.' },
  { id: 't-4', iconName: 'CircleDollarSign', labelVi: 'Áp lực tối ưu chi phí', labelEn: 'Cost Optimization Pressure', percent: 90, descVi: 'Doanh nghiệp yêu cầu hiệu quả cao hơn với chi phí thấp hơn.' },
];

export const LANGUAGES_DATA: LanguageProficiencyItem[] = [
  {
    id: 'vi',
    nameVi: 'TIẾNG VIỆT',
    nameEn: 'VIETNAMESE',
    roleVi: 'Ngôn ngữ mẹ đẻ',
    roleEn: 'Native language',
    levelVi: 'Thành thạo tuyệt đối',
    levelEn: 'Native Proficiency',
    percent: 100,
    color: 'text-blue-600 dark:text-sky-400',
  },
  {
    id: 'en',
    nameVi: 'TIẾNG ANH',
    nameEn: 'ENGLISH',
    roleVi: 'English',
    roleEn: 'English',
    levelVi: 'Giao tiếp & Làm việc chuyên nghiệp',
    levelEn: 'Professional Working',
    percent: 90,
    color: 'text-purple-600 dark:text-purple-400',
  },
  {
    id: 'ai',
    nameVi: 'DÙNG AI TRAO ĐỔI ĐA NGÔN NGỮ & HỌP',
    nameEn: 'AI MULTILINGUAL COMMUNICATION',
    roleVi: 'Sử dụng AI hỗ trợ trao đổi đa ngôn ngữ & họp quốc tế',
    roleEn: 'AI-assisted multilingual & global meetings',
    levelVi: '(AI-powered Communication)',
    levelEn: '(AI-powered Communication)',
    percent: 85,
    color: 'text-emerald-600 dark:text-emerald-400',
  },
];

export interface SkillGroup {
  id: string;
  titleVi: string;
  titleEn: string;
  code: string;
  items: SwotSkillItem[];
}

export const SKILL_GROUPS: SkillGroup[] = [
  { id: 'strengths', titleVi: 'Thế mạnh vận hành', titleEn: 'Core Strengths', code: 'S', items: STRENGTHS_DATA },
  { id: 'weaknesses', titleVi: 'Hoàn thiện quản trị', titleEn: 'Growth Areas', code: 'W', items: WEAKNESSES_DATA },
  { id: 'opportunities', titleVi: 'Cơ hội bứt phá', titleEn: 'Opportunities', code: 'O', items: OPPORTUNITIES_DATA },
  { id: 'threats', titleVi: 'Thách thức thích ứng', titleEn: 'Threats', code: 'T', items: THREATS_DATA },
];
