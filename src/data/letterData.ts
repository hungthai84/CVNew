export interface CareerMilestoneItem {
  id: string;
  company: string;
  roleVi: string;
  roleEn: string;
  roleIconName: string;
  color: string;
  titleColor: string;
  yearLabelVi: string;
  yearLabelEn: string;
  yearBadgeGradient: string;
  logo: string;
  descVi: string;
  descEn: string;
  showMoreLink?: boolean;
  highlightVi: string;
  highlightEn: string;
  highlightIconName?: string;
  iconName: string;
}

export interface CoreValueItem {
  number: string;
  titleVi: string;
  titleEn: string;
  descVi: string;
  descEn: string;
  idName: string;
  colorTheme: {
    primary: string;
    bgGradient: string;
    border: string;
    iconBg: string;
    numberText: string;
    titleText: string;
    tagText: string;
  };
}

export interface OperationalPrincipleItem {
  id: string;
  titleVi: string;
  titleEn: string;
  descVi: string;
  descEn: string;
  bgClass: string;
  borderClass: string;
}

export const CAREER_MILESTONES_DATA: CareerMilestoneItem[] = [
  {
    id: "card-2002",
    company: "MobiFone",
    roleVi: "Chuyên viên CSKH & Vận hành",
    roleEn: "CS & Operations Specialist",
    roleIconName: "Headset",
    color: "#0066FF",
    titleColor: "#0066FF",
    yearLabelVi: "2002 - 2007",
    yearLabelEn: "2002 - 2007",
    yearBadgeGradient: "bg-blue-600",
    logo: "https://i.ibb.co/hxHm9TsZ/Mobifone.png",
    descVi: "Đặt nền móng tiếp nhận **khiếu nại cước & dịch vụ mạng di động** thời kỳ đầu, trực tiếp xử lý các ca hỗ trợ viễn thông phức tạp.",
    descEn: "Laid the foundation for handling billing and network service complaints in the early telecom era.",
    highlightVi: "Nhân viên Chăm sóc Khách hàng Xuất sắc nhất năm 2005.",
    highlightEn: "Best Customer Care Employee of the Year 2005.",
    highlightIconName: "Award",
    iconName: "Signal",
  },
  {
    id: "card-2007",
    company: "V247 Call Center",
    roleVi: "Giám sát Vận hành Call Center",
    roleEn: "Call Center Operations Supervisor",
    roleIconName: "Users",
    color: "#D97706",
    titleColor: "#D97706",
    yearLabelVi: "2007 - 2011",
    yearLabelEn: "2007 - 2011",
    yearBadgeGradient: "bg-amber-500",
    logo: "https://i.ibb.co/QvtbdnfP/V247.png",
    descVi: "Quản lý đội ngũ điện thoại viên phục vụ dịch vụ **viễn thông quốc tế Hoa Kỳ - Việt Nam 24/7** với tỷ lệ cam kết SLA đạt chuẩn trên **98%**.",
    descEn: "Managed a 24/7 inbound/outbound team for US-Vietnam international telecommunications with SLA above 98%.",
    highlightVi: "Nâng tỷ lệ giải quyết cuộc gọi đầu tiên (FCR) từ 74% lên 89%.",
    highlightEn: "Boosted First Contact Resolution (FCR) from 74% to 89%.",
    highlightIconName: "Rocket",
    iconName: "Headset",
  },
  {
    id: "card-2011",
    company: "LBC Corporation",
    roleVi: "Quản lý CSKH Đa Kênh",
    roleEn: "Omnichannel CS Manager",
    roleIconName: "Network",
    color: "#0D9488",
    titleColor: "#0D9488",
    yearLabelVi: "2011 - 2013",
    yearLabelEn: "2011 - 2013",
    yearBadgeGradient: "bg-teal-600",
    logo: "https://i.ibb.co/R4YXWyzF/LBC.png",
    descVi: "Xây dựng hệ thống tiếp nhận khách hàng **đa kênh (Omnichannel)** và ban hành bộ quy chuẩn xử lý sự cố khẩn cấp.",
    descEn: "Engineered omnichannel customer interaction hubs and instituted critical escalation playbooks.",
    highlightVi: "Chuẩn hóa CRM nội bộ, rút ngắn 30% thời gian xử lý khiếu nại.",
    highlightEn: "Standardized internal CRM, reducing complaint resolution time by 30%.",
    highlightIconName: "BarChart2",
    iconName: "Tv",
  },
  {
    id: "card-2013",
    company: "Garena Esports",
    roleVi: "Trưởng nhóm Hỗ trợ Game & Nạp thẻ",
    roleEn: "Gaming & Payment Team Lead",
    roleIconName: "Gamepad2",
    color: "#E11D48",
    titleColor: "#E11D48",
    yearLabelVi: "2013 - 2015",
    yearLabelEn: "2013 - 2015",
    yearBadgeGradient: "bg-rose-600",
    logo: "https://i.ibb.co/h1Md65yV/Garena.png",
    descVi: "Điều phối hỗ trợ cộng đồng **hàng triệu game thủ Esports**, giải quyết khiếu nại bảo mật tài khoản và hệ thống giao dịch thanh toán.",
    descEn: "Orchestrated gamer community services for millions of Esports players across Vietnam.",
    showMoreLink: true,
    highlightVi: "Xử lý hơn 100,000 tickets/tháng với chỉ số CSAT ấn tượng 92%.",
    highlightEn: "Handled over 100,000 tickets/month with an impressive CSAT of 92%.",
    highlightIconName: "Target",
    iconName: "Gamepad2",
  },
  {
    id: "card-2015",
    company: "Shopee Việt Nam",
    roleVi: "Quản lý Vận hành CSKH TMĐT",
    roleEn: "E-Commerce CS Operations Lead",
    roleIconName: "ShoppingBag",
    color: "#EA580C",
    titleColor: "#EA580C",
    yearLabelVi: "2015 - 2016",
    yearLabelEn: "2015 - 2016",
    yearBadgeGradient: "bg-orange-600",
    logo: "https://i.ibb.co/BSVS4xf/Shopee.png",
    descVi: "Đặt nền móng quy trình chăm sóc **người mua và người bán** trong giai đoạn bùng nổ TMĐT của sàn Shopee tại thị trường Việt Nam.",
    descEn: "Established buyer and seller customer support procedures during Shopee's rapid e-commerce expansion.",
    highlightVi: "Triển khai quy trình đối soát hoàn tiền / trả hàng siêu tốc trong 24 giờ.",
    highlightEn: "Rolled out 24-hour rapid refund and return dispute reconciliation workflows.",
    highlightIconName: "Sparkles",
    iconName: "ShoppingBag",
  },
  {
    id: "card-2016",
    company: "Prudential Assurance",
    roleVi: "Trưởng nhóm Dịch vụ Khách hàng",
    roleEn: "Customer Service Team Lead",
    roleIconName: "ShieldCheck",
    color: "#DC2626",
    titleColor: "#DC2626",
    yearLabelVi: "2016 - 2018",
    yearLabelEn: "2016 - 2018",
    yearBadgeGradient: "bg-red-600",
    logo: "https://i.ibb.co/XfpQphWF/Prudential.png",
    descVi: "Quản lý chất lượng giải quyết **quyền lợi bảo hiểm nhân thọ**, thẩm định hồ sơ chi trả và xử lý khiếu nại cấp cao.",
    descEn: "Supervised life insurance claim operations, policy verifications, and executive disputes.",
    highlightVi: "Tối ưu hóa quy trình giải quyết quyền lợi, giảm 40% khiếu nại phát sinh.",
    highlightEn: "Optimized claims adjudication workflow, dropping disputed escalations by 40%.",
    highlightIconName: "ShieldCheck",
    iconName: "ShieldCheck",
  },
  {
    id: "card-2018",
    company: "Ví Điện Tử MoMo",
    roleVi: "Quản lý Vận hành CSKH FinTech",
    roleEn: "FinTech CS Operations Manager",
    roleIconName: "CreditCard",
    color: "#A21CAF",
    titleColor: "#A21CAF",
    yearLabelVi: "2018 - 2023",
    yearLabelEn: "2018 - 2023",
    yearBadgeGradient: "bg-purple-600",
    logo: "https://i.ibb.co/k2QtrgTw/Momo.png",
    descVi: "Xây dựng và điều hành hệ thống chăm sóc khách hàng ví điện tử phục vụ **hơn 30 triệu người dùng**, tích hợp chatbot và dashboard AI.",
    descEn: "Architected and managed omnichannel FinTech customer operations for 30M+ wallet users.",
    highlightVi: "Dẫn dắt đội ngũ hơn 150 nhân sự đạt giải thưởng CSKH FinTech tiêu biểu.",
    highlightEn: "Led 150+ operational staff to win top FinTech Customer Service awards.",
    highlightIconName: "Award",
    iconName: "CreditCard",
  },
  {
    id: "card-2023",
    company: "Finviet Technology",
    roleVi: "Trưởng phòng Chăm sóc Khách hàng",
    roleEn: "Head of Customer Service",
    roleIconName: "Lightbulb",
    color: "#2563EB",
    titleColor: "#2563EB",
    yearLabelVi: "2023 - Nay",
    yearLabelEn: "2023 - Present",
    yearBadgeGradient: "bg-gradient-to-r from-blue-600 to-indigo-600",
    logo: "https://i.ibb.co/7NtSSz4d/Finviet.png",
    descVi: "Toàn diện hóa trải nghiệm người dùng, ứng dụng **trí tuệ nhân tạo AI Agent, Voicebot và Big Data** vào hệ thống quản trị dịch vụ số.",
    descEn: "Pioneered digital transformation with AI Agent Workflows, Voicebots, and Big Data.",
    highlightVi: "Tự động hóa 60% yêu cầu thường gặp, nâng chỉ số NPS lên 85+.",
    highlightEn: "Automated 60% of tier-1 inquiries, elevating corporate NPS to 85+.",
    highlightIconName: "Sparkles",
    iconName: "Lightbulb",
  },
];

export const CORE_VALUES_DATA: CoreValueItem[] = [
  {
    number: "01",
    titleVi: "Tận Tâm Phụng Sự",
    titleEn: "Devoted Service",
    descVi: "Luôn đặt quyền lợi và cảm xúc của khách hàng làm kim chỉ nam trong mọi quyết định.",
    descEn: "Always place customer interests and emotions at the core of all operational decisions.",
    idName: "DEDICATION",
    colorTheme: {
      primary: "#f43f5e",
      bgGradient: "from-rose-50/80 via-white to-rose-50/40",
      border: "border-rose-200/80",
      iconBg: "bg-rose-100 text-rose-600 border-rose-200",
      numberText: "text-rose-500",
      titleText: "text-slate-900",
      tagText: "text-rose-600",
    },
  },
  {
    number: "02",
    titleVi: "Định Lượng Rõ Ràng",
    titleEn: "Clear Metrics",
    descVi: "Đo lường hiệu quả vận hành bằng các chỉ số chuẩn xác (CSAT, NPS, FCR, SLA).",
    descEn: "Measure operational efficiency using precise indicators (CSAT, NPS, FCR, SLA).",
    idName: "GOAL ORIENTED",
    colorTheme: {
      primary: "#2563eb",
      bgGradient: "from-blue-50/80 via-white to-blue-50/40",
      border: "border-blue-200/80",
      iconBg: "bg-blue-100 text-blue-600 border-blue-200",
      numberText: "text-blue-500",
      titleText: "text-slate-900",
      tagText: "text-blue-600",
    },
  },
  {
    number: "03",
    titleVi: "Tiên Phong Đổi Mới",
    titleEn: "Leading Innovation",
    descVi: "Chủ động ứng dụng AI, công nghệ số và tự động hóa quy trình liên tục.",
    descEn: "Actively deploy AI, digital technology, and continuous workflow automation.",
    idName: "INNOVATION",
    colorTheme: {
      primary: "#d97706",
      bgGradient: "from-amber-50/80 via-white to-amber-50/40",
      border: "border-amber-200/80",
      iconBg: "bg-amber-100 text-amber-600 border-amber-200",
      numberText: "text-amber-500",
      titleText: "text-slate-900",
      tagText: "text-amber-600",
    },
  },
  {
    number: "04",
    titleVi: "Đồng Hành Bền Vững",
    titleEn: "Sustainable Partnership",
    descVi: "Xây dựng quan hệ hợp tác tin cậy lâu dài giữa khách hàng, đối tác và đội ngũ.",
    descEn: "Build lasting, trust-based partnerships among customers, partners, and teams.",
    idName: "PARTNERSHIP",
    colorTheme: {
      primary: "#059669",
      bgGradient: "from-emerald-50/80 via-white to-emerald-50/40",
      border: "border-emerald-200/80",
      iconBg: "bg-emerald-100 text-emerald-600 border-emerald-200",
      numberText: "text-emerald-500",
      titleText: "text-slate-900",
      tagText: "text-emerald-600",
    },
  },
];

export const OPERATIONAL_PRINCIPLES_DATA: OperationalPrincipleItem[] = [
  {
    id: "p1",
    titleVi: "Chuẩn hóa quy trình vận hành",
    titleEn: "Standardize Operations",
    descVi: "Thiết lập luồng xử lý minh bạch, đo lường bằng SLA rõ ràng.",
    descEn: "Establish transparent workflows measured by definitive SLA standards.",
    bgClass: "bg-blue-100 text-blue-700",
    borderClass: "border-blue-200/80",
  },
  {
    id: "p2",
    titleVi: "Tối ưu trải nghiệm khách hàng",
    titleEn: "Customer Centricity",
    descVi: "Lắng nghe thấu cảm và chuyển hóa phản hồi thành cải tiến dịch vụ.",
    descEn: "Empathetic listening that transforms real feedback into service excellence.",
    bgClass: "bg-emerald-100 text-emerald-700",
    borderClass: "border-emerald-200/80",
  },
  {
    id: "p3",
    titleVi: "Tự động hóa với Trí tuệ AI",
    titleEn: "AI & Automation",
    descVi: "Ứng dụng CRM, Chatbot và phân tích dữ liệu dự đoán hành vi.",
    descEn: "Deploy CRM, Intelligent Chatbots, and predictive behavioral analytics.",
    bgClass: "bg-purple-100 text-purple-700",
    borderClass: "border-purple-200/80",
  },
];
