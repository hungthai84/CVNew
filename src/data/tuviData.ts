export interface TuViProfile {
  fullName: string;
  birthDateSolar: string;
  birthDateLunar: string;
  birthHourLunar: string;
  elementNapAm: string;
  menhQuai: string;
  cucVan: string;
}

export interface WorkPersonalityTrait {
  id: string;
  title: string;
  tag: string;
  subtitle: string;
  description: string;
  highlights: string[];
}

export interface CorePalaceStar {
  name: string;
  main: boolean;
}

export interface CorePalace {
  id: string;
  name: string;
  tag: string;
  description: string;
  stars: CorePalaceStar[];
  checkpoints: string[];
}

export interface FiveElementsGovernance {
  element: string;
  subtitle: string;
  desc: string;
  bgColor: string;
  borderColor: string;
  titleColor: string;
  iconBg: string;
}

export interface ZodiacSynergyItem {
  id: string;
  nameVi: string;
  animalVi: string;
  icon: string;
  tier: 'best' | 'support' | 'luc_hop' | 'caution';
  tierLabelVi: string;
  years: string;
  relationshipVi: string;
  score: string;
  workplaceFitVi: string;
  deskDirectionVi: string;
  workplaceAdviceVi: string;
}

export interface ActionPhilosophyCard {
  id: string;
  iconType: 'target' | 'trending' | 'heart' | 'compass' | 'award' | 'bookmark' | 'zap';
  title: string;
  description: string;
}

// 1. Hồ sơ thông tin nhân thân
export const TU_VI_PROFILE: TuViProfile = {
  fullName: 'Nguyễn Hùng Thái',
  birthDateSolar: '16/06/1984',
  birthDateLunar: '17 tháng 05 năm Giáp Tý',
  birthHourLunar: 'Giờ Dậu (17h - 19h)',
  elementNapAm: 'Hải Trung Kim',
  menhQuai: 'Đoài Kim',
  cucVan: 'Kim Tứ Cục (Số 4)',
};

// 2. Bốn trụ cột phong cách quản trị
export const WORK_PERSONALITY_TRAITS: WorkPersonalityTrait[] = [
  {
    id: 'trait-1',
    title: 'Quyết Đoán Kỷ Luật',
    tag: 'Bản lĩnh Kim',
    subtitle: 'Chuẩn hóa hệ thống SOP & Giám sát SLA 99% nghiêm ngặt',
    description:
      'Sở hữu bản lĩnh Kim tinh kiên định, đưa ra quyết sách dứt khoát dựa trên dữ liệu thực chứng. Không né tránh điểm nghẽn quy trình, thiết lập chuẩn mực dịch vụ cao cấp và kiên trì theo đuổi mục tiêu chiến lược đến cùng.',
    highlights: ['SOP Chuẩn hóa', 'SLA 99%', 'Quản trị rủi ro'],
  },
  {
    id: 'trait-2',
    title: 'Thấu Cảm Con Người',
    tag: 'Nhân hòa',
    subtitle: 'Lắng nghe đa chiều & Xây dựng văn hóa phụng sự chân thành',
    description:
      'Lãnh đạo bằng sự đồng cảm sâu sắc. Tôn trọng từng mắt xích nhân sự trong tổ chức CSKH, xem sự thỏa mãn của khách hàng và mức độ gắn kết đội ngũ là thước đo thành công dài hạn nhất của doanh nghiệp.',
    highlights: ['CSAT 96%', 'Văn hóa phụng sự', 'Gắn kết 150+ nhân sự'],
  },
  {
    id: 'trait-3',
    title: 'Tư Duy Chiến Lược',
    tag: 'Data-Driven',
    subtitle: 'Đo lường bằng Dashboard dữ liệu lớn & Quản trị mục tiêu OKRs',
    description:
      'Thiết lập các mốc đo lường định lượng minh bạch: FCR, AHT, NPS, CSAT. Chuyển hóa toàn bộ dữ liệu phản hồi từ khách hàng thành báo cáo Realtime trực quan, hỗ trợ Ban điều hành ra quyết định chuẩn xác.',
    highlights: ['FCR & AHT Tối ưu', 'Realtime BI', 'OKRs Thực chiến'],
  },
  {
    id: 'trait-4',
    title: 'Đổi Mới Công Nghệ',
    tag: 'Tiên phong số',
    subtitle: 'Đón đầu làn sóng AI Agent Workflows & Omnichannel AICC',
    description:
      'Chủ động nghiên cứu và đưa các giải pháp AI, Chatbot, Smart IVR vào tối ưu hóa chi phí vận hành. Chuyển đổi mô hình Contact Center truyền thống thành trung tâm trải nghiệm số đa kênh hiện đại.',
    highlights: ['GenAI CSKH', 'AICC Cloud', 'Tự động hóa 24/7'],
  },
];

// 3. Lục cung trọng yếu (Tam hợp Thân – Tý – Thìn)
export const SIX_CORE_PALACES: CorePalace[] = [
  {
    id: 'palace-menh',
    name: 'Cung Mệnh Chủ Quản',
    tag: 'Chủ Mệnh',
    description:
      'Tập trung bản lĩnh nội tại, tư duy độc lập và ý chí kiên định. Giáp Tý Hải Trung Kim trầm tĩnh, sâu sắc, lấy chữ Tín làm gốc.',
    stars: [
      { name: 'Hải Trung Kim', main: true },
      { name: 'Hóa Khoa', main: true },
      { name: 'Thiên Khôi', main: false },
      { name: 'Long Trì', main: false },
    ],
    checkpoints: [
      'Tư duy hệ thống sắc sảo',
      'Kiên định mục tiêu chiến lược',
      'Bản lĩnh điều hành vững vàng',
    ],
  },
  {
    id: 'palace-quan',
    name: 'Cung Quan Lộc Thân',
    tag: 'Thân Cư Quan',
    description:
      'Thân cư Quan Lộc khẳng định sự nghiệp và phụng sự là trọng tâm cuộc đời. Năng lực xây dựng bộ máy, chuẩn hóa SOP và quản lý 150+ nhân sự.',
    stars: [
      { name: 'Thái Dương', main: true },
      { name: 'Thiên Lương', main: true },
      { name: 'Hóa Quyền', main: true },
      { name: 'Tướng Quân', main: false },
    ],
    checkpoints: [
      'Quản trị đội ngũ 150+ nhân sự',
      'Tối ưu hóa SLA & KPI CSKH',
      'Chuyển đổi số & AI Workflows',
    ],
  },
  {
    id: 'palace-tai',
    name: 'Cung Tài Bạch Vận',
    tag: 'Hiệu Quả',
    description:
      'Quản trị dòng tài chính vận hành minh bạch. Chuyển hóa Cost Center thành Value Center, tạo ra ROI vượt trội từ chất lượng trải nghiệm.',
    stars: [
      { name: 'Thiên Đồng', main: true },
      { name: 'Cự Môn', main: true },
      { name: 'Hóa Lộc', main: true },
      { name: 'Lộc Tồn', main: false },
    ],
    checkpoints: [
      'Tối ưu 20-30% chi phí vận hành',
      'Định lượng giá trị trải nghiệm',
      'Kiểm soát ngân sách chính xác',
    ],
  },
  {
    id: 'palace-phuc',
    name: 'Cung Phúc Đức Gốc',
    tag: 'Nền Tảng',
    description:
      'Gốc rễ của thịnh vượng đến từ tâm đức phụng sự. Lấy văn hóa tử tế, thấu cảm và sự gắn kết chân thành làm kim chỉ nam dài lâu.',
    stars: [
      { name: 'Thiên Đức', main: true },
      { name: 'Phúc Đức', main: true },
      { name: 'Nguyệt Đức', main: false },
    ],
    checkpoints: [
      'Triết lý phụng sự khách hàng',
      'Gắn kết giá trị nội bộ sâu sắc',
      'Xây dựng uy tín thương hiệu bền vững',
    ],
  },
  {
    id: 'palace-di',
    name: 'Cung Thiên Di Hợp',
    tag: 'Đối Ngoại',
    description:
      'Thích ứng linh hoạt trong môi trường đa văn hóa, làm việc cùng đối tác quốc tế, mở rộng hệ sinh thái công nghệ dịch vụ khách hàng.',
    stars: [
      { name: 'Thiên Mã', main: true },
      { name: 'Hóa Khoa', main: true },
      { name: 'Bát Tọa', main: false },
    ],
    checkpoints: [
      'Kết nối đa kênh đối tác',
      'Thích ứng nhanh với biến động',
      'Dẫn dắt các dự án quy mô lớn',
    ],
  },
  {
    id: 'palace-no',
    name: 'Cung Nô Bộc Đội',
    tag: 'Đồng Đội',
    description:
      'Hòa hợp nhân duyên, thu phục nhân tâm. Đào tạo và phát triển thế hệ kế cận, tạo môi trường phát huy tối đa năng lực từng cá nhân.',
    stars: [
      { name: 'Tả Phù', main: true },
      { name: 'Hữu Bật', main: true },
      { name: 'Ân Quang', main: false },
    ],
    checkpoints: [
      'Văn hóa Empower trao quyền',
      'Tỷ lệ gắn kết nhân sự >95%',
      'Đào tạo lộ trình thăng tiến rõ ràng',
    ],
  },
];

// 4. Ma trận 5 hành tố trong vận hành quản trị
export const FIVE_ELEMENTS_GOVERNANCE: FiveElementsGovernance[] = [
  {
    element: 'Hành Kim Kỷ Luật',
    subtitle: 'Kỷ Luật & SOP Chuẩn Hóa',
    desc: 'Nguyên tắc thép, chuẩn hóa quy trình vận hành, giám sát SLA 99% nghiêm ngặt và kiểm soát rủi ro hệ thống.',
    bgColor: 'bg-slate-50 dark:bg-slate-800/60',
    borderColor: 'border-slate-300 dark:border-slate-600',
    titleColor: 'text-slate-800 dark:text-slate-200',
    iconBg: 'bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-100',
  },
  {
    element: 'Hành Mộc Phát Triển',
    subtitle: 'Phát Triển Đội Ngũ & Nhân Tâm',
    desc: 'Ươm mầm nhân tài, đào tạo kỹ năng thấu cảm và bồi dưỡng văn hóa gắn kết 150+ nhân sự phụng sự bền vững.',
    bgColor: 'bg-emerald-50 dark:bg-emerald-950/40',
    borderColor: 'border-emerald-300 dark:border-emerald-800',
    titleColor: 'text-emerald-800 dark:text-emerald-300',
    iconBg: 'bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200',
  },
  {
    element: 'Hành Thủy Linh Hoạt',
    subtitle: 'Linh Hoạt & Chăm Sóc Đa Kênh',
    desc: 'Hòa nhập dòng chảy Omnichannel, giao tiếp mềm mỏng, giải quyết khiếu nại êm thấm và xoa dịu khách hàng.',
    bgColor: 'bg-cyan-50 dark:bg-cyan-950/40',
    borderColor: 'border-cyan-300 dark:border-cyan-800',
    titleColor: 'text-cyan-800 dark:text-cyan-300',
    iconBg: 'bg-cyan-100 dark:bg-cyan-900 text-cyan-800 dark:text-cyan-200',
  },
  {
    element: 'Hành Hỏa Nhiệt Huyết',
    subtitle: 'Nhiệt Huyết & Tiên Phong AI',
    desc: 'Thắp lửa đam mê, tiên phong ứng dụng AI Agent Workflows và lan tỏa tinh thần đổi mới sáng tạo mỗi ngày.',
    bgColor: 'bg-rose-50 dark:bg-rose-950/40',
    borderColor: 'border-rose-300 dark:border-rose-800',
    titleColor: 'text-rose-800 dark:text-rose-300',
    iconBg: 'bg-rose-100 dark:bg-rose-900 text-rose-800 dark:text-rose-200',
  },
  {
    element: 'Hành Thổ Bền Vững',
    subtitle: 'Bền Vững & Dữ Liệu Thực Chứng',
    desc: 'Nền móng vững chắc từ hệ thống báo cáo BI Realtime, giữ trọn chữ Tín và bảo vệ uy tín thương hiệu doanh nghiệp.',
    bgColor: 'bg-amber-50 dark:bg-amber-950/40',
    borderColor: 'border-amber-300 dark:border-amber-800',
    titleColor: 'text-amber-800 dark:text-amber-300',
    iconBg: 'bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200',
  },
];

// 5. Ma trận 12 Con giáp tương hợp làm việc
// 5. Ma trận 12 Con giáp tương hợp làm việc (Sắp xếp theo đúng thứ tự 12 Con Giáp: Tý -> Sửu -> Dần -> Mão -> Thìn -> Tỵ -> Ngọ -> Mùi -> Thân -> Dậu -> Tuất -> Hợi)
export const ZODIAC_SYNERGY_LIST: ZodiacSynergyItem[] = [
  {
    id: 'ty',
    nameVi: 'Tý',
    animalVi: 'Chuột',
    icon: '🐀',
    tier: 'support',
    tierLabelVi: 'Đồng Hành Bản Mệnh',
    years: '1984 (Giáp Tý), 1996 (Bính Tý), 2008 (Mậu Tý)',
    relationshipVi: 'Đồng Khí Tri Kỷ',
    score: '85% Đồng Điệu',
    workplaceFitVi: 'Cộng sự chuyên môn, Ban thư ký & Cố vấn nội bộ',
    deskDirectionVi: 'Chính Bắc (Phục Vị)',
    workplaceAdviceVi:
      'Cùng bước sóng tư duy, dễ thấu hiểu và chia sẻ khối lượng công việc. Cần phân công nhiệm vụ cụ thể để tránh giẫm chân lên nhau.',
  },
  {
    id: 'suu',
    nameVi: 'Sửu',
    animalVi: 'Trâu',
    icon: '🐂',
    tier: 'luc_hop',
    tierLabelVi: 'Lục Hợp (Tý - Sửu)',
    years: '1985 (Ất Sửu), 1997 (Đinh Sửu), 2009 (Kỷ Sửu)',
    relationshipVi: 'Lục Hợp Thổ Sinh Kim',
    score: '96% Hòa Hợp',
    workplaceFitVi: 'Giám sát Vận hành (Supervisors), Quản lý QA & Hậu cần dự án',
    deskDirectionVi: 'Đông Bắc (Phục Vị / Sinh Khí)',
    workplaceAdviceVi:
      'Sự trung thành, kiên định và tỉ mỉ của tuổi Sửu tạo thành điểm tựa vững chắc cho khâu thực thi quy trình SOP. Hai bên bổ trợ nhau chặt chẽ, ít khi xảy ra xung đột quyền lợi.',
  },
  {
    id: 'dan',
    nameVi: 'Dần',
    animalVi: 'Hổ',
    icon: '🐅',
    tier: 'support',
    tierLabelVi: 'Tương Trợ Đồng Hành',
    years: '1986 (Bính Dần), 1998 (Mậu Dần), 2010 (Canh Dần)',
    relationshipVi: 'Thủy Sinh Mộc Tiên Phong',
    score: '80% Tích Cực',
    workplaceFitVi: 'Phát triển Kinh doanh (BD), Marketing & Mở rộng thị trường',
    deskDirectionVi: 'Đông Bắc (Sinh Khí)',
    workplaceAdviceVi:
      'Tuổi Dần dũng cảm, quyết liệt mở đường cho các dự án mới. Người tuổi Tý hỗ trợ hậu phương bằng quy trình và hệ thống kiểm soát chất lượng, tạo đà bứt phá vững vàng.',
  },
  {
    id: 'mao',
    nameVi: 'Mão',
    animalVi: 'Mèo',
    icon: '🐈',
    tier: 'caution',
    tierLabelVi: 'Tương Hình (Tý - Mão)',
    years: '1975 (Ất Mão), 1987 (Đinh Mão), 1999 (Kỷ Mão)',
    relationshipVi: 'Vô Lễ Chi Hình',
    score: '60% Khắc Khẩu',
    workplaceFitVi: 'Bộ phận độc lập, Hạn chế làm việc nhóm trực tiếp',
    deskDirectionVi: 'Chính Đông (Họa Hại)',
    workplaceAdviceVi:
      'Cần tôn trọng phong cách làm việc của nhau, lấy quy chuẩn công ty và hiệu quả công việc làm thước đo chung.',
  },
  {
    id: 'thin',
    nameVi: 'Thìn',
    animalVi: 'Rồng',
    icon: '🐉',
    tier: 'best',
    tierLabelVi: 'Tam Hợp (Thân - Tý - Thìn)',
    years: '1976 (Bính Thìn), 1988 (Mậu Thìn), 2000 (Canh Thìn)',
    relationshipVi: 'Tam Hợp Quyền Lực',
    score: '98% Rất Hợp',
    workplaceFitVi: 'Hội đồng Quản trị, Tổng Giám đốc & Lãnh đạo định hướng',
    deskDirectionVi: 'Đông Nam (Thiên Y / Phúc Đức)',
    workplaceAdviceVi:
      'Tuổi Thìn mang tầm vóc bao quát và uy lực lãnh đạo lớn, kết hợp với sự bền bỉ, chi tiết của tuổi Tý sẽ hiện thực hóa các chiến lược vận hành quy mô hàng trăm nhân sự đạt hiệu quả tối ưu.',
  },
  {
    id: 'ty_snake',
    nameVi: 'Tỵ',
    animalVi: 'Rắn',
    icon: '🐍',
    tier: 'support',
    tierLabelVi: 'Tương Trợ Đồng Hành',
    years: '1977 (Đinh Tỵ), 1989 (Kỷ Tỵ), 2001 (Tân Tỵ)',
    relationshipVi: 'Hỏa Khắc Kim Tương Kiềm',
    score: '78% Cân Nhắc',
    workplaceFitVi: 'Nghiên cứu Sản phẩm (R&D), Chiến lược cạnh tranh',
    deskDirectionVi: 'Đông Nam (Thiên Y)',
    workplaceAdviceVi:
      'Cần có sự trao đổi cởi mở, minh bạch mục tiêu để tránh hiểu lầm trong quá trình phối hợp công việc chuyên sâu.',
  },
  {
    id: 'ngo',
    nameVi: 'Ngọ',
    animalVi: 'Ngựa',
    icon: '🐎',
    tier: 'caution',
    tierLabelVi: 'Tứ Hành Xung (Tý - Ngọ)',
    years: '1978 (Mậu Ngọ), 1990 (Canh Ngọ), 2002 (Nhâm Ngọ)',
    relationshipVi: 'Chính Xung Thủy Hỏa',
    score: '50% Đối Xung',
    workplaceFitVi: 'Phân tách mảng công việc riêng biệt, Báo cáo độc lập',
    deskDirectionVi: 'Chính Nam (Tuyệt Mệnh)',
    workplaceAdviceVi:
      'Phong cách trái ngược hoàn toàn: Tý thận trọng, chu toàn trong khi Ngọ tự do, bộc phát. Nếu biết lắng nghe, sự đối nghịch này có thể tạo ra góc nhìn phản biện giá trị.',
  },
  {
    id: 'mui',
    nameVi: 'Mùi',
    animalVi: 'Dê',
    icon: '🐐',
    tier: 'caution',
    tierLabelVi: 'Tương Hại (Tý - Mùi)',
    years: '1979 (Kỷ Mùi), 1991 (Tân Mùi), 2003 (Quý Mùi)',
    relationshipVi: 'Lục Hại Nhẹ',
    score: '65% Thận Trọng',
    workplaceFitVi: 'Công việc chuyên môn độc lập, Thiết kế sáng tạo',
    deskDirectionVi: 'Tây Nam (Diên Niên)',
    workplaceAdviceVi:
      'Cần phân định ranh giới trách nhiệm rõ ràng bằng văn bản và quy trình để tránh cảm giác bị xâm lấn quyền hạn.',
  },
  {
    id: 'than',
    nameVi: 'Thân',
    animalVi: 'Khỉ',
    icon: '🐒',
    tier: 'best',
    tierLabelVi: 'Tam Hợp (Thân - Tý - Thìn)',
    years: '1980 (Canh Thân), 1992 (Nhâm Thân), 2004 (Giáp Thân)',
    relationshipVi: 'Tam Hợp Tương Sinh',
    score: '100% Cực Kỳ Hợp',
    workplaceFitVi: 'Cộng sự chiến lược, C-Level, Đồng sáng lập & Cố vấn cấp cao',
    deskDirectionVi: 'Tây Nam (Sinh Khí / Diên Niên)',
    workplaceAdviceVi:
      'Người tuổi Thân sở hữu tư duy biến hóa nhanh nhạy, hỗ trợ xuất sắc cho bản tính kỷ luật của người tuổi Tý. Trong các dự án chuyển đổi số và giải quyết khủng hoảng dịch vụ, sự kết hợp này tạo nên bộ đôi chỉ huy toàn diện.',
  },
  {
    id: 'dau',
    nameVi: 'Dậu',
    animalVi: 'Gà',
    icon: '🐓',
    tier: 'support',
    tierLabelVi: 'Tương Trợ Đồng Hành',
    years: '1981 (Tân Dậu), 1993 (Quý Dậu), 2005 (Ất Dậu)',
    relationshipVi: 'Kim Đồng Khí Sắc Sảo',
    score: '82% Hiệu Quả',
    workplaceFitVi: 'Chuyên viên Phân tích Dữ liệu, Tài chính & Kế toán',
    deskDirectionVi: 'Chính Tây (Phục Vị)',
    workplaceAdviceVi:
      'Tuổi Dậu có óc quan sát sắc sảo và kỷ luật cao trong công việc kiểm toán số liệu. Cần lưu ý giao tiếp khéo léo để tránh tranh luận gay gắt về tiểu tiết.',
  },
  {
    id: 'tuat',
    nameVi: 'Tuất',
    animalVi: 'Chó',
    icon: '🐕',
    tier: 'support',
    tierLabelVi: 'Tương Trợ Đồng Hành',
    years: '1982 (Nhâm Tuất), 1994 (Giáp Tuất), 2006 (Bính Tuất)',
    relationshipVi: 'Thổ Sinh Kim Tương Trợ',
    score: '85% Đáng Tin Cậy',
    workplaceFitVi: 'Pháp lý, Kiểm soát Tuân thủ & Quản trị Rủi ro',
    deskDirectionVi: 'Tây Bắc (Sinh Khí)',
    workplaceAdviceVi:
      'Người tuổi Tuất thẳng thắn, chính trực và có tinh thần trách nhiệm cao. Khi phối hợp cùng tuổi Tý, họ là lá chắn an toàn bảo vệ hệ thống khỏi các rủi ro pháp lý và sai phạm quy trình.',
  },
  {
    id: 'hoi',
    nameVi: 'Hợi',
    animalVi: 'Heo',
    icon: '🐖',
    tier: 'support',
    tierLabelVi: 'Tương Trợ Đồng Hành',
    years: '1983 (Quý Hợi), 1995 (Ất Hợi), 2007 (Đinh Hợi)',
    relationshipVi: 'Thủy Trợ Thủy Hòa Khí',
    score: '88% Thuận Lợi',
    workplaceFitVi: 'Chăm sóc Khách hàng tuyến đầu, Đào tạo & Văn hóa nội bộ',
    deskDirectionVi: 'Tây Bắc (Diên Niên)',
    workplaceAdviceVi:
      'Tính cách ôn hòa, dễ gần của tuổi Hợi giúp xoa dịu áp lực trong môi trường Contact Center. Rất thích hợp làm việc trong các bộ phận đào tạo kỹ năng thấu cảm và gắn kết nhân sự.',
  },
];

// 6. Sáu giá trị cốt lõi & Triết lý hành động lãnh đạo
export const ACTION_PHILOSOPHY_CARDS: ActionPhilosophyCard[] = [
  {
    id: 'card-1',
    iconType: 'target',
    title: 'Tư Duy Chiến Lược',
    description:
      'Xây dựng tầm nhìn dài hạn, định hình mô hình vận hành bền vững và dự báo chuẩn xác các xu thế chuyển dịch thị trường.',
  },
  {
    id: 'card-2',
    iconType: 'trending',
    title: 'Dẫn Dắt Dữ Liệu',
    description:
      'Mọi quyết định, cải tiến và tối ưu hóa quy trình đều dựa trên số liệu thực chứng minh bạch, khách quan và khoa học.',
  },
  {
    id: 'card-3',
    iconType: 'heart',
    title: 'Thấu Cảm Trái Tim',
    description:
      'Đặt trải nghiệm khách hàng và giá trị con người làm trọng tâm, lắng nghe đa chiều và thấu hiểu sâu sắc từng điểm chạm.',
  },
  {
    id: 'card-4',
    iconType: 'compass',
    title: 'Chân Lý Làm Gốc',
    description:
      'Mọi quyết sách đều dựa trên sự thật khách quan, dữ liệu minh bạch và giá trị đạo đức bền vững.',
  },
  {
    id: 'card-5',
    iconType: 'bookmark',
    title: 'Kết Quả Thước Đo',
    description:
      'Đo lường thành công bằng sự hài lòng của khách hàng (CSAT), hiệu quả chi phí (Cost-to-Serve) và sự trưởng thành của đội ngũ.',
  },
  {
    id: 'card-6',
    iconType: 'zap',
    title: 'Hành Động Làm Đường',
    description:
      'Không dừng lại ở lý thuyết suông; kiên trì thực thi, tối ưu từng quy trình và từng điểm chạm mỗi ngày.',
  },
];
