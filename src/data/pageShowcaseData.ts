// Dữ liệu giới thiệu chi tiết 14 trang & các điểm nổi bật (Page Showcase Data)
// Phục vụ hiệu ứng 3D Vertical Cylindrical Carousel dựa trên CodePen Team Carousel

export interface PageShowcaseItem {
  pageId: number;
  pageNumber: string;
  shortTitle: string;
  fullName: string;
  category: string;
  badge: string;
  description: string;
  highlights: string[];
  theme: string;
  accentBg: string;
  iconName: string;
  image: string;
}

export const PAGE_SHOWCASE_ITEMS: PageShowcaseItem[] = [
  {
    pageId: 0,
    pageNumber: '01',
    shortTitle: 'Trang Chủ',
    fullName: 'Trang Chủ Hùng Thái - Giới Thiệu, Năng Lực & Thành Tựu',
    category: 'Tổng Quan & Điều Hành',
    badge: 'Executive Hub',
    description:
      'Cổng thông tin tổng quan, chào đón quý khách với video AI đối thoại trực tiếp, hệ thống đo lường năng lực điều hành cốt lõi và định hướng chiến lược trải nghiệm khách hàng.',
    highlights: [
      'Video AI tương tác 23s giới thiệu phong thái lãnh đạo và lời chào mở đầu',
      'Thước đo 22+ năm kinh nghiệm, quản lý 100+ nhân sự qua 8 tập đoàn lớn',
      'Hệ thống đổi giao diện đa sắc & chế độ trình chiếu hình nền 4K tự động',
      'Trợ lý ảo AI đàm thoại tiếng Việt giải đáp chuyên sâu 24/7 toàn bộ hồ sơ',
    ],
    theme: '#0284c7',
    accentBg: 'linear-gradient(135deg, rgba(2, 132, 199, 0.85) 0%, rgba(99, 102, 241, 0.85) 100%)',
    iconName: 'home',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80',
  },
  {
    pageId: 1,
    pageNumber: '02',
    shortTitle: 'Thư Ngỏ',
    fullName: 'Thư Ngỏ Gửi Quý Đối Tác & Khách Quý',
    category: 'Lời Mở Đầu & Tôn Chỉ',
    badge: 'Letter of Intent',
    description:
      'Tâm thư chân thành từ chuyên gia Nguyễn Hùng Thái gửi đến Quý lãnh đạo, Đối tác và Nhà tuyển dụng với triết lý phụng sự khách hàng từ trái tim và tinh thần đồng hành dài lâu.',
    highlights: [
      'Tâm thư phụng sự từ tâm, lấy khách hàng làm trung tâm mọi chiến lược',
      'Thông điệp gắn kết bền vững, xây dựng niềm tin thông qua chất lượng dịch vụ',
      'Dấu ấn chữ ký điều hành & lời cam kết trách nhiệm cao nhất với đối tác',
      'Giao diện thư ngỏ sang trọng mô phỏng phong thư cổ điển cao cấp',
    ],
    theme: '#e11d48',
    accentBg: 'linear-gradient(135deg, rgba(225, 29, 72, 0.85) 0%, rgba(244, 63, 94, 0.85) 100%)',
    iconName: 'mail',
    image: 'https://images.unsplash.com/photo-1579275542618-a1dfed5f54ba?auto=format&fit=crop&w=800&q=80',
  },
  {
    pageId: 2,
    pageNumber: '03',
    shortTitle: 'Giới Thiệu',
    fullName: 'Hồ Sơ Chuyên Gia & Thông Tin Cá Nhân',
    category: 'Chân Dung & Trụ Cột',
    badge: 'Biography & Vision',
    description:
      'Hồ sơ chi tiết về chuyên gia gồm 3 slide Bento hợp nhất: Chân dung, Thông tin cá nhân & Bản đồ số, 3 Trụ Cột Vận Hành Chiến Lược cùng Triết lý tầm nhìn CX 2026+.',
    highlights: [
      '3 Slide Bento tinh gọn tích hợp video trợ lý ảo và thông tin nhân khẩu học',
      'Bản đồ số tương tác Google Maps định vị trụ sở Q7 TP.HCM & Mỹ Tho',
      '3 Trụ Cột Chiến Lược: 01. Hiệu Quả - 02. Nhân Văn - 03. Bền Vững',
      'Mascot Ti Chuột sinh động & bút tích chữ ký viết tay "Luôn bên bạn ♡"',
    ],
    theme: '#8b5cf6',
    accentBg: 'linear-gradient(135deg, rgba(139, 92, 246, 0.85) 0%, rgba(168, 85, 247, 0.85) 100%)',
    iconName: 'user',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80',
  },
  {
    pageId: 3,
    pageNumber: '04',
    shortTitle: 'Học Vấn',
    fullName: 'Học Vấn & Chứng Chỉ Chuyên Ngành',
    category: 'Tri Thức & Chuẩn Hóa',
    badge: 'Education & Certs',
    description:
      'Hồ sơ học vấn chính quy và hệ thống 14 chứng chỉ chuyên sâu: Cử nhân CNTT, Quản trị dự án PMP, UI/UX, Quản trị rủi ro, Đào tạo nội bộ TTT và Quản trị mạng Cisco CCNA / Microsoft MCSA.',
    highlights: [
      'Bằng Cử nhân CNTT chính quy Đại học Cần Thơ & Bằng Quản trị Kinh doanh',
      '14 Chứng chỉ chuyên ngành quốc tế: UI/UX, Data BI, Risk, PMP, TTT, CCNA, MCSA',
      '2 Chế độ hiển thị: Lưới thẻ Responsive Grid & Băng chuyền 3D Stack Deck',
      'Modal hồ sơ năng lực chi tiết & Lightbox phóng to hình ảnh bằng cấp sắc nét',
    ],
    theme: '#059669',
    accentBg: 'linear-gradient(135deg, rgba(5, 150, 105, 0.85) 0%, rgba(16, 185, 129, 0.85) 100%)',
    iconName: 'graduation-cap',
    image: '/images/education/hero-banner.png',
  },
  {
    pageId: 4,
    pageNumber: '05',
    shortTitle: 'Lĩnh Vực',
    fullName: 'Lĩnh Vực Hoạt Động Chuyên Môn (6 Lĩnh Vực)',
    category: 'Chuyên Môn Cốt Lõi',
    badge: 'Domain Expertise',
    description:
      'Khám phá 6 lĩnh vực vận hành chiến lược mà chuyên gia có thâm niên sâu rộng: Viễn thông, Tài chính số - Ví điện tử, Bảo hiểm, Bán lẻ, Game - Esports và Outsourcing BPO.',
    highlights: [
      '6 Ngành kinh tế mũi nhọn: Fintech, Telco, Insurtech, BPO, E-commerce, Esports',
      'Thẻ lĩnh vực dạng Accordion mở rộng chi tiết giải pháp và quy trình',
      'Minh chứng nghiệp vụ thực chiến và quy mô hàng triệu khách hàng phục vụ',
      'Khả năng thích ứng linh hoạt và chuyển hóa quy chuẩn giữa các ngành nghề',
    ],
    theme: '#f59e0b',
    accentBg: 'linear-gradient(135deg, rgba(245, 158, 11, 0.85) 0%, rgba(217, 119, 6, 0.85) 100%)',
    iconName: 'briefcase',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
  },
  {
    pageId: 5,
    pageNumber: '06',
    shortTitle: 'Kỹ Năng',
    fullName: 'Kỹ Năng Chuyên Môn & Ma Trận Quản Trị SWOT',
    category: 'Năng Lực & Phân Tích',
    badge: 'Competency & SWOT',
    description:
      'Bản đồ kỹ năng toàn diện gồm Kỹ năng Chuyên môn, Kỹ năng Lãnh đạo, Bộ công cụ Công nghệ và Ma trận phân tích chiến lược SWOT (Điểm mạnh, Hoàn thiện, Phát triển, Thách thức).',
    highlights: [
      'Ma trận SWOT phân tích 4 chiều với nhãn "Mức độ tác động" chuẩn xác',
      'Bảng đo lường kỹ năng theo tỷ lệ phần trăm và số năm tích lũy thực tế',
      'Bộ công cụ công nghệ quản trị CSKH: Omnichannel, AI Chatbot, CRM, BI Analytics',
      'Kỹ năng lãnh đạo đội ngũ lớn, truyền cảm hứng và xử lý khủng hoảng',
    ],
    theme: '#0891b2',
    accentBg: 'linear-gradient(135deg, rgba(8, 145, 178, 0.85) 0%, rgba(6, 182, 212, 0.85) 100%)',
    iconName: 'cpu',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
  },
  {
    pageId: 6,
    pageNumber: '07',
    shortTitle: 'Kinh Nghiệm',
    fullName: 'Kinh Nghiệm Thực Chiến & Cột Mốc Quản Trị (2003 - 2026+)',
    category: 'Lịch Sử Công Tác',
    badge: 'Career Milestones',
    description:
      'Hành trình 22+ năm trải qua 8 tập đoàn hàng đầu Việt Nam: MobiFone, Viễn Liên V247, HTVC, Vietnam Esports, Prudential, MoMo, Finviet và Power Service CX 2026+.',
    highlights: [
      'Bố cục Horizontal Timeline cuộn trượt ngang mượt mà kèm Panoramic Slider',
      'Dữ liệu chi tiết về quy mô nhân sự, sản phẩm tiêu biểu và 3 nhiệm vụ cốt lõi',
      'Hệ thống đo lường hiệu suất SLA, CSAT, FCR và chuẩn mực quốc tế COPC',
      'Tích hợp thuyết minh giọng đọc AI chuyên nghiệp từng cột mốc sự nghiệp',
    ],
    theme: '#4f46e5',
    accentBg: 'linear-gradient(135deg, rgba(79, 70, 229, 0.85) 0%, rgba(99, 102, 241, 0.85) 100%)',
    iconName: 'calendar',
    image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=800&q=80',
  },
  {
    pageId: 7,
    pageNumber: '08',
    shortTitle: 'Dự Án',
    fullName: 'Kho 21 Dự Án & Sáng Kiến Vận Hành Trọng Điểm',
    category: 'Hồ Sơ Thực Thi',
    badge: 'Portfolio 21 Projects',
    description:
      'Tuyển tập 21 dự án chiến lược chia theo 5 nhóm kèm phương pháp luận STAR, số liệu kết quả định lượng và sơ đồ tư duy thực chiến.',
    highlights: [
      '21 Dự án thực tế hoàn chỉnh đầy đủ thông số định lượng và kết quả',
      'Phương pháp luận STAR (Situation, Task, Action, Result) chuẩn quốc tế',
      'Bố cục dạng Grid responsive và bộ lọc nhóm dự án linh hoạt',
      'Khẳng định năng lực dẫn dắt chuyển đổi số quy mô lớn',
    ],
    theme: '#9333ea',
    accentBg: 'linear-gradient(135deg, rgba(147, 51, 234, 0.85) 0%, rgba(168, 85, 247, 0.85) 100%)',
    iconName: 'folder-git-2',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
  },
  {
    pageId: 8,
    pageNumber: '09',
    shortTitle: 'Hệ Thống',
    fullName: 'Cổng Bento Hệ Thống CSKH (12 Hệ Thống C-Level)',
    category: 'Kiến Trúc Nền Tảng',
    badge: 'Enterprise CS Architecture',
    description:
      'Mạng lưới 12 giải pháp hệ thống và công nghệ CSKH hiện đại bậc nhất: Cổng SDP, ERP, CRM, HRM, BPM, OKR, CLP, LMS, CSC, BI Dashboard, AI Assistant và POS.',
    highlights: [
      '12 Hệ thống công nghệ quản trị CSKH chuẩn C-Level hoàn thiện',
      'Kích thước hình ảnh 3D thẻ hệ thống tăng gấp đôi, hover phát video tự động',
      'Click vào thẻ tăng kích thước cộng 2 thẻ theo chiều dọc hiển thị trọn vẹn chi tiết',
      'Mô hình luồng tích hợp dữ liệu khách hàng 360 độ và cam kết SLA 99.9%',
    ],
    theme: '#ea580c',
    accentBg: 'linear-gradient(135deg, rgba(234, 88, 12, 0.85) 0%, rgba(249, 115, 22, 0.85) 100%)',
    iconName: 'server',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
  },
  {
    pageId: 9,
    pageNumber: '10',
    shortTitle: 'Phỏng Vấn',
    fullName: 'Đối Thoại Mô Phỏng AI & Q&A Tuyển Dụng',
    category: 'Góc Nhìn Lãnh Đạo',
    badge: 'Executive Q&A',
    description:
      'Bộ câu hỏi phỏng vấn tình huống thực tế dành cho vị trí Head of Customer Service / CX Director với các giải pháp quản trị xung đột, khủng hoảng và tối ưu chi phí.',
    highlights: [
      'Các câu hỏi tình huống hóc búa nhất và cách xử lý thực chiến của C-Level',
      'Phương pháp giải quyết khủng hoảng truyền thông & khiếu nại dịch vụ diện rộng',
      'Chiến lược giữ chân nhân tài và tối ưu hóa chi phí vận hành Cost-per-Contact',
      'Giao diện mô phỏng đối thoại tương tác trực tiếp sinh động',
    ],
    theme: '#ec4899',
    accentBg: 'linear-gradient(135deg, rgba(236, 72, 153, 0.85) 0%, rgba(244, 114, 182, 0.85) 100%)',
    iconName: 'message-square',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
  },
  {
    pageId: 10,
    pageNumber: '11',
    shortTitle: 'Tử Vi',
    fullName: 'Bản Đồ Tử Vi, Bát Trạch & Phong Thủy Quản Trị',
    category: 'Phong Thủy & Nhân Tướng',
    badge: 'Eastern Wisdom',
    description:
      'Bản mệnh Giáp Tý 1984 - Hải Trung Kim, quẻ Càn Kim Tây Tứ Mệnh kết hợp nghệ thuật dụng nhân, bố trí không gian làm việc và triết lý phong thủy hài hòa.',
    highlights: [
      'Bát quái la bàn phong thủy phương vị tương hợp (Tây Bắc, Đông Bắc, Tây, Tây Nam)',
      'Nghệ thuật thấu hiểu tâm lý nhân sự và đối tác theo ngũ hành âm dương',
      'Màu sắc may mắn và trường năng lượng tích cực trong quản trị doanh nghiệp',
      'Giao diện la bàn động học xoay tròn và thẻ sao tử vi huyền bí',
    ],
    theme: '#c026d3',
    accentBg: 'linear-gradient(135deg, rgba(192, 38, 211, 0.85) 0%, rgba(217, 70, 239, 0.85) 100%)',
    iconName: 'compass',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
  },
  {
    pageId: 11,
    pageNumber: '12',
    shortTitle: 'Kỷ Niệm',
    fullName: 'Khoảnh Khắc Hành Trình & Kỷ Niệm Đáng Nhớ',
    category: 'Hình Ảnh & Gắn Kết',
    badge: 'Memory Vault',
    description:
      'Bộ sưu tập hình ảnh và video tư liệu ghi lại những cột mốc đáng nhớ cùng đội ngũ, các sự kiện tôn vinh nhân viên xuất sắc, hoạt động gắn kết văn hóa và team building.',
    highlights: [
      'Kho tư liệu ảnh thực tế các buổi vinh danh, kỷ niệm và gắn kết nội bộ',
      'Các thước phim chân thực về tinh thần đồng đội và nụ cười phục vụ',
      'Giao diện album ảnh tương tác mượt mà với hiệu ứng phóng to chi tiết',
      'Tôn vinh giá trị con người và tình cảm đồng nghiệp bền chặt qua năm tháng',
    ],
    theme: '#16a34a',
    accentBg: 'linear-gradient(135deg, rgba(22, 163, 74, 0.85) 0%, rgba(34, 197, 94, 0.85) 100%)',
    iconName: 'image',
    image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=800&q=80',
  },
  {
    pageId: 12,
    pageNumber: '13',
    shortTitle: 'Liên Hệ',
    fullName: 'Kênh Kết Nối & Hợp Tác Với Hùng Thái',
    category: 'Kênh Kết Nối Trực Tiếp',
    badge: 'Direct Connect',
    description:
      'Kênh liên hệ trực tiếp qua Điện thoại, Email, Zalo, LinkedIn, cùng form gửi thông điệp hợp tác nhanh chóng, bảo mật và kết nối đa nền tảng tức thì.',
    highlights: [
      'Thông tin liên lạc minh bạch: Số điện thoại, Email, Zalo, LinkedIn chính chủ',
      'Biểu mẫu gửi tin nhắn liên hệ trực tiếp phản hồi tức thì với hệ thống',
      'Mã QR kết nối nhanh và định vị vị trí làm việc tại TP.HCM & Tiền Giang',
      'Sẵn sàng đón nhận các cơ hội hợp tác chiến lược, tư vấn CX và quản trị',
    ],
    theme: '#0d9488',
    accentBg: 'linear-gradient(135deg, rgba(13, 148, 136, 0.85) 0%, rgba(20, 184, 166, 0.85) 100%)',
    iconName: 'phone',
    image: 'https://images.unsplash.com/photo-1423666639041-f56000c27a9a?auto=format&fit=crop&w=800&q=80',
  },
  {
    pageId: 13,
    pageNumber: '14',
    shortTitle: 'Hình Nền',
    fullName: 'Tùy Chỉnh Hình Nền & Giao Diện Cá Nhân Hóa',
    category: 'Tùy Biến Nghệ Thuật',
    badge: 'Theme & Wallpapers',
    description:
      'Bộ sưu tập hàng chục hình nền nghệ thuật 4K động & tĩnh, chế độ Trình Chiếu tự động (Slideshow), Chế độ Zen Mode toàn màn hình và tùy chỉnh thời tiết sống động.',
    highlights: [
      'Kho hình nền 4K đa dạng: Kính mờ, Cực quang, Vũ trụ, Bình minh, Cyberpunk',
      'Chế độ Trình Chiếu Nền tự động kèm thanh đếm ngược tiến trình trực quan',
      'Chế độ Zen Mode tĩnh tâm ngắm trọn hình nền với phím tắt ESC thuận tiện',
      'Trình giả lập thời tiết 4 mùa và âm thanh tương tác vòm chân thực',
    ],
    theme: '#d946ef',
    accentBg: 'linear-gradient(135deg, rgba(217, 70, 239, 0.85) 0%, rgba(236, 72, 153, 0.85) 100%)',
    iconName: 'sparkles',
    image: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=800&q=80',
  },
];
