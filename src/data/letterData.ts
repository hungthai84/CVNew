export interface CareerMilestoneItem {
  id: string;
  company: string;
  milestoneTitleVi?: string;
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
  descViPart2?: string;
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
    milestoneTitleVi: "Năm 2002 – Khởi đầu tại MobiFone",
    roleVi: "Chuyên viên CSKH & Vận hành",
    roleEn: "CS & Operations Specialist",
    roleIconName: "Headset",
    color: "#0066FF",
    titleColor: "#0066FF",
    yearLabelVi: "Năm 2002",
    yearLabelEn: "2002 - 2007",
    yearBadgeGradient: "bg-blue-600",
    logo: "https://i.ibb.co/hxHm9TsZ/Mobifone.png",
    descVi:
      "Tôi bắt đầu sự nghiệp tại **MobiFone**, nơi tôi được đào tạo bài bản về dịch vụ khách hàng, quản lý tổng đài, xử lý sự cố và xây dựng quy trình phục vụ theo tiêu chuẩn ngành viễn thông. Đây là nền tảng giúp tôi hình thành **tư duy lấy khách hàng làm trung tâm** và hiểu rõ tầm quan trọng của quy trình trong vận hành dịch vụ.",
    descEn:
      "Started my career at MobiFone with formal training in customer service, call center management, incident handling, and telecom service processes.",
    highlightVi: "Hình thành tư duy lấy khách hàng làm trung tâm & chuẩn hóa quy trình viễn thông.",
    highlightEn: "Formed customer-centric mindset & standardized telecom processes.",
    highlightIconName: "Award",
    iconName: "Signal",
  },
  {
    id: "card-2007",
    company: "Viễn Liên V247",
    milestoneTitleVi: "Năm 2007 – Phát triển năng lực quản lý tại Viễn Liên V247",
    roleVi: "Giám sát Quản lý & Chất lượng Dịch vụ",
    roleEn: "Call Center Operations Supervisor",
    roleIconName: "Users",
    color: "#D97706",
    titleColor: "#D97706",
    yearLabelVi: "Năm 2007",
    yearLabelEn: "2007 - 2011",
    yearBadgeGradient: "bg-amber-500",
    logo: "https://i.ibb.co/QvtbdnfP/V247.png",
    descVi:
      "Gia nhập **Viễn Liên V247**, tôi tiếp tục phát triển năng lực quản lý đội ngũ, giám sát chất lượng dịch vụ và tối ưu hiệu quả vận hành của trung tâm chăm sóc khách hàng. Giai đoạn này giúp tôi tích lũy kinh nghiệm **quản lý hoạt động với quy mô lớn** và xây dựng các chỉ số đánh giá chất lượng dịch vụ.",
    descEn:
      "Joined V247 to develop team management capabilities, service quality supervision, and large-scale call center operational optimization.",
    highlightVi: "Tích lũy kinh nghiệm quản lý quy mô lớn & xây dựng chỉ số đánh giá chất lượng.",
    highlightEn: "Built large-scale operations experience & service quality metrics.",
    highlightIconName: "Rocket",
    iconName: "Headset",
  },
  {
    id: "card-2011",
    company: "LBC – Truyền hình Cáp HTV",
    milestoneTitleVi: "Năm 2011 – Bước ngoặt tại LBC – Truyền hình Cáp HTV",
    roleVi: "Trưởng phòng Chăm sóc Khách hàng",
    roleEn: "Head of Customer Service",
    roleIconName: "Network",
    color: "#0D9488",
    titleColor: "#0D9488",
    yearLabelVi: "Năm 2011",
    yearLabelEn: "2011 - 2013",
    yearBadgeGradient: "bg-teal-600",
    logo: "https://i.ibb.co/R4YXWyzF/LBC.png",
    descVi:
      "Đây là dấu mốc quan trọng khi tôi lần đầu đảm nhiệm vị trí **Trưởng phòng Chăm sóc Khách hàng**. Từ một nhà quản lý vận hành, tôi chuyển mình trở thành một **nhà quản trị toàn diện**. Tôi trực tiếp điều hành hoạt động của phòng ban, xây dựng và chuẩn hóa quy trình, phát triển đội ngũ, thiết lập hệ thống KPI, đồng thời phối hợp với nhiều đơn vị nhằm nâng cao chất lượng dịch vụ và hiệu quả vận hành. Chính giai đoạn này đã giúp tôi hình thành tư duy quản trị hệ thống và phát triển con người song song với mục tiêu kinh doanh.",
    descEn:
      "Pivotal milestone first serving as Head of Customer Service, transitioning from operational manager to comprehensive executive leader.",
    highlightVi: "Bước ngoặt chuyển mình thành nhà quản trị hệ thống & phát triển con người toàn diện.",
    highlightEn: "Transitioned into comprehensive system & people management leadership.",
    highlightIconName: "BarChart2",
    iconName: "Tv",
  },
  {
    id: "card-2013",
    company: "Garena & Hành Trình Chuyển Đổi Số",
    milestoneTitleVi: "Năm 2013 – Garena và hành trình chuyển đổi số",
    roleVi: "Quản lý Vận hành CSKH (129 Nhân sự)",
    roleEn: "CS Operations Manager (129 Staff)",
    roleIconName: "Gamepad2",
    color: "#E11D48",
    titleColor: "#E11D48",
    yearLabelVi: "Năm 2013",
    yearLabelEn: "2013 - 2016",
    yearBadgeGradient: "bg-rose-600",
    logo: "https://i.ibb.co/h1Md65yV/Garena.png",
    descVi:
      "Gia nhập **Garena**, tôi quản lý hoạt động chăm sóc khách hàng trong lĩnh vực game trực tuyến, nơi yêu cầu tốc độ xử lý nhanh, độ chính xác cao và khả năng đáp ứng lượng khách hàng rất lớn. Trong thời gian này, Garena phát triển mạnh với **Liên Minh Huyền Thoại**, đồng thời mở rộng thành **Vietnam eSport** và đầu tư vào nhiều lĩnh vực mới như **Shopee, AirPay, Gcafe và Liên Quân Mobile**. Tôi có cơ hội đồng hành cùng các dự án ngay từ giai đoạn đầu. Mỗi sản phẩm đều có mô hình vận hành, hành vi người dùng và kỳ vọng khách hàng khác nhau, buộc tôi phải liên tục học hỏi, thích nghi và cập nhật kiến thức để xây dựng các quy trình chăm sóc khách hàng phù hợp với từng lĩnh vực. Đặc biệt, việc tham gia vào giai đoạn phát triển ban đầu của **Shopee** giúp tôi tiếp cận tư duy quản trị thương mại điện tử hiện đại, từ hành trình khách hàng, trải nghiệm đa kênh, vận hành dịch vụ quy mô lớn đến ứng dụng dữ liệu trong quản trị chất lượng và tối ưu hiệu quả hoạt động.",
    descViPart2:
      "Tại Garena, tôi trực tiếp **quản lý 129 nhân sự**, xây dựng cơ cấu tổ chức, phát triển đội ngũ quản lý cấp trung, chuẩn hóa quy trình vận hành, thiết lập hệ thống đánh giá hiệu quả công việc và đào tạo nguồn nhân lực kế thừa. Làm việc trong môi trường tăng trưởng với tốc độ rất cao giúp tôi rèn luyện khả năng ra quyết định dưới áp lực, xử lý nhanh các tình huống phát sinh, điều phối nguồn lực hiệu quả và liên tục cải tiến quy trình để đáp ứng sự thay đổi của thị trường. Đây cũng là giai đoạn đặt nền móng cho triết lý quản trị của tôi: **xây dựng hệ thống trước khi mở rộng quy mô, phát triển con người song hành cùng công nghệ và luôn lấy khách hàng làm trung tâm trong mọi quyết định.**",
    descEn:
      "Led CS operations across Garena (League of Legends, Vietnam eSport, Shopee, AirPay, Gcafe, Arena of Valor), directly managing 129 staff and establishing scalable e-commerce & digital service frameworks.",
    highlightVi: "Trực tiếp quản lý 129 nhân sự · Đồng hành cùng Liên Minh Huyền Thoại, Shopee, AirPay, Gcafe, Liên Quân Mobile.",
    highlightEn: "Directly managed 129 staff across League of Legends, Shopee, AirPay, Gcafe & Arena of Valor.",
    highlightIconName: "Target",
    iconName: "Gamepad2",
  },
  {
    id: "card-2016",
    company: "Prudential Việt Nam",
    milestoneTitleVi: "Năm 2016 – Prudential Việt Nam",
    roleVi: "Quản trị Trải nghiệm & Chất lượng Dịch vụ",
    roleEn: "Customer Experience & Service Quality Lead",
    roleIconName: "ShieldCheck",
    color: "#DC2626",
    titleColor: "#DC2626",
    yearLabelVi: "Năm 2016",
    yearLabelEn: "2016 - 2018",
    yearBadgeGradient: "bg-red-600",
    logo: "https://i.ibb.co/XfpQphWF/Prudential.png",
    descVi:
      "Tại **Prudential**, tôi có cơ hội làm việc trong lĩnh vực bảo hiểm – một ngành dịch vụ đòi hỏi tính chính xác, minh bạch và mức độ tin cậy rất cao. Thời gian này giúp tôi hiểu sâu hơn về **quản trị trải nghiệm khách hàng**, quản lý chất lượng dịch vụ và xây dựng niềm tin bền vững thông qua quy trình chuyên nghiệp và sự đồng cảm trong từng điểm chạm với khách hàng.",
    descEn:
      "Worked in the insurance sector at Prudential, mastering high-trust customer experience management, service quality, and empathetic touchpoints.",
    highlightVi: "Xây dựng niềm tin bền vững qua quy trình chuyên nghiệp & sự đồng cảm trong từng điểm chạm.",
    highlightEn: "Built lasting trust through professional processes & empathy at every touchpoint.",
    highlightIconName: "ShieldCheck",
    iconName: "ShieldCheck",
  },
  {
    id: "card-2018",
    company: "MoMo",
    milestoneTitleVi: "Năm 2018 – MoMo",
    roleVi: "Quản lý Vận hành CSKH Tài chính số",
    roleEn: "FinTech CS Operations Manager",
    roleIconName: "CreditCard",
    color: "#A21CAF",
    titleColor: "#A21CAF",
    yearLabelVi: "Năm 2018",
    yearLabelEn: "2018 - 2023",
    yearBadgeGradient: "bg-purple-600",
    logo: "https://i.ibb.co/k2QtrgTw/Momo.png",
    descVi:
      "Gia nhập **MoMo**, tôi tiếp tục mở rộng kinh nghiệm trong lĩnh vực tài chính số. Tôi tập trung **tối ưu quy trình hỗ trợ khách hàng**, nâng cao hiệu quả vận hành, ứng dụng công nghệ vào quản trị dịch vụ và cải thiện trải nghiệm khách hàng trên nền tảng số.",
    descEn:
      "Expanded FinTech expertise at MoMo, optimizing customer support workflows, operational efficiency, and technology-driven service management.",
    highlightVi: "Ứng dụng công nghệ vào quản trị dịch vụ & tối ưu trải nghiệm khách hàng trên nền tảng số.",
    highlightEn: "Applied technology to service governance & optimized digital platform CX.",
    highlightIconName: "Award",
    iconName: "CreditCard",
  },
  {
    id: "card-2023",
    company: "Ví ECO",
    milestoneTitleVi: "Năm 2023 – Ví ECO",
    roleVi: "Trưởng phòng Chăm sóc Khách hàng",
    roleEn: "Head of Customer Service",
    roleIconName: "Lightbulb",
    color: "#2563EB",
    titleColor: "#2563EB",
    yearLabelVi: "Năm 2023",
    yearLabelEn: "2023 - Present",
    yearBadgeGradient: "bg-gradient-to-r from-blue-600 to-indigo-600",
    logo: "https://i.ibb.co/7NtSSz4d/Finviet.png",
    descVi:
      "Tại **Ví ECO**, tôi tiếp tục phát triển chuyên môn trong lĩnh vực tài chính, nơi mọi hoạt động đều đặt yêu cầu cao về tính chính xác, minh bạch và sự tin cậy. Giai đoạn này giúp tôi hoàn thiện hơn tư duy **xây dựng hệ thống dịch vụ khách hàng hiện đại**, kết hợp giữa quy trình, công nghệ và trải nghiệm người dùng.",
    descEn:
      "At ECO Wallet, perfected modern customer service system architecture combining rigorous processes, technology, and user experience in finance.",
    highlightVi: "Hoàn thiện hệ thống dịch vụ khách hàng hiện đại kết hợp quy trình, công nghệ & trải nghiệm.",
    highlightEn: "Perfected modern CS systems combining process, technology, and UX.",
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
    titleVi: "Quy trình tạo nền tảng.",
    titleEn: "Process Creates Foundation",
    descVi: "Chuẩn hóa quy trình vận hành bài bản, thiết lập hệ thống KPI và chỉ số đánh giá chất lượng dịch vụ minh bạch.",
    descEn: "Establish standardized workflows, KPIs, and transparent service quality metrics.",
    bgClass: "bg-blue-100 text-blue-700",
    borderClass: "border-blue-200/80",
  },
  {
    id: "p2",
    titleVi: "Con người tạo giá trị.",
    titleEn: "People Create Value",
    descVi: "Chú trọng đào tạo đội ngũ biết lắng nghe, thấu hiểu và mang đến những trải nghiệm vượt mong đợi cho khách hàng.",
    descEn: "Train empathetic teams who listen, understand, and deliver beyond customer expectations.",
    bgClass: "bg-purple-100 text-purple-700",
    borderClass: "border-purple-200/80",
  },
  {
    id: "p3",
    titleVi: "Công nghệ tạo đòn bẩy.",
    titleEn: "Technology Creates Leverage",
    descVi: "Xây dựng hệ thống CRM, Dashboard quản trị, AI Chatbot và các giải pháp tự động hóa hỗ trợ ra quyết định bằng dữ liệu.",
    descEn: "Build CRM, Management Dashboards, AI Chatbots, and automation for data-driven decisions.",
    bgClass: "bg-emerald-100 text-emerald-700",
    borderClass: "border-emerald-200/80",
  },
];
