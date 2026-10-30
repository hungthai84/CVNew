import { EDUCATION_DATA } from './educationData';

export type CourseCategory = 'degree' | 'management' | 'tech' | 'skills';

export interface EducationCourse {
  id: string;
  title: string;
  category: CourseCategory;
  year: string;
  code: string;
  issuer: string;
  image: string;
  desc: string;
  modules: string[];
  skills: string[];
  application: string;
  accentColor: string;
}

export interface CredentialVerificationInfo {
  credentialId: string;
  twoWordTitle: string;
  organization: string;
  registryName: string;
  status: string;
  verifyUrl: string;
}

export interface AcademicRadarAxis {
  id: string;
  label: string;
  shortLabel: string;
  pillarLabel: string;
  score: number;
  color: string;
  certs: string;
  courseIds: string[];
}

export const CREDENTIAL_VERIFICATION_MAP: Record<string, CredentialVerificationInfo> = {
  '1': {
    twoWordTitle: 'Thiết kế',
    credentialId: 'WEB-DEV-2026-AI',
    organization: 'W3C & GitHub Developer Community',
    registryName: 'GitHub Verified Credential Archive',
    status: 'Chứng nhận năng lực xuất sắc',
    verifyUrl: 'https://github.com',
  },
  '2': {
    twoWordTitle: 'Dữ liệu',
    credentialId: 'PRU-DA-2019-892',
    organization: 'Prudential Vietnam Assurance',
    registryName: 'Prudential Enterprise Talent Registry',
    status: 'Chứng chỉ hoàn thành chính quy',
    verifyUrl: 'https://www.prudential.com.vn',
  },
  '3': {
    twoWordTitle: 'Rủi ro',
    credentialId: 'PRU-RM-2017-104',
    organization: 'Prudential Vietnam Assurance',
    registryName: 'Prudential Risk & Operations Registry',
    status: 'Chứng chỉ hoàn thành chính quy',
    verifyUrl: 'https://www.prudential.com.vn',
  },
  '4': {
    twoWordTitle: 'Dự án',
    credentialId: 'PRU-PM-2016-042',
    organization: 'Prudential Vietnam Assurance',
    registryName: 'Prudential Project Management Registry',
    status: 'Chứng chỉ hoàn thành chính quy',
    verifyUrl: 'https://www.prudential.com.vn',
  },
  '5': {
    twoWordTitle: 'Cấp cao',
    credentialId: 'DC-VED-2015-EX01',
    organization: 'Dale Carnegie Training & VED',
    registryName: 'Dale Carnegie Leadership Global Database',
    status: 'Chứng nhận lãnh đạo điều hành',
    verifyUrl: 'https://www.dalecarnegie.com',
  },
  '6': {
    twoWordTitle: 'Cấp trung',
    credentialId: 'DC-VED-2014-MGT08',
    organization: 'Dale Carnegie Training & VED',
    registryName: 'Dale Carnegie Management Registry',
    status: 'Chứng nhận quản lý thực chiến',
    verifyUrl: 'https://www.dalecarnegie.com',
  },
  '7': {
    twoWordTitle: 'Đào tạo',
    credentialId: 'VNW-TTT-2013-09',
    organization: 'VietnamWorks Learning Academy',
    registryName: 'VietnamWorks Professional Certification System',
    status: 'Chứng chỉ Train The Trainer (TTT)',
    verifyUrl: 'https://www.vietnamworks.com',
  },
  '8': {
    twoWordTitle: 'Thuyết trình',
    credentialId: 'VNW-PRS-2013-112',
    organization: 'VietnamWorks Learning Academy',
    registryName: 'VietnamWorks Executive Presentation',
    status: 'Chứng chỉ kỹ năng thuyết trình xuất sắc',
    verifyUrl: 'https://www.vietnamworks.com',
  },
  '9': {
    twoWordTitle: 'Phỏng vấn',
    credentialId: 'VNW-INT-2013-045',
    organization: 'VietnamWorks Learning Academy',
    registryName: 'VietnamWorks HR Competency Hub',
    status: 'Chứng chỉ phỏng vấn hành vi (BEI)',
    verifyUrl: 'https://www.vietnamworks.com',
  },
  '10': {
    twoWordTitle: 'Tuyển dụng',
    credentialId: 'VNW-REC-2013-078',
    organization: 'VietnamWorks Learning Academy',
    registryName: 'VietnamWorks Talent Acquisition Database',
    status: 'Chứng chỉ tuyển dụng chiến lược',
    verifyUrl: 'https://www.vietnamworks.com',
  },
  '11': {
    twoWordTitle: 'Cử nhân',
    credentialId: 'STU-IT-2007-B0892',
    organization: 'Trường ĐH Công nghệ Sài Gòn (STU)',
    registryName: 'Cơ sở dữ liệu văn bằng ĐH Công nghệ Sài Gòn',
    status: 'Văn bằng Cử nhân Đại học Chính quy',
    verifyUrl: 'https://stu.edu.vn',
  },
  '12': {
    twoWordTitle: 'Tổng đài',
    credentialId: 'MBF-CC-2007-VNO1',
    organization: 'Tổng công ty Viễn thông MobiFone',
    registryName: 'MobiFone Contact Center Center of Excellence',
    status: 'Chứng nhận Tổng đài viên xuất sắc',
    verifyUrl: 'https://www.mobifone.vn',
  },
  '13': {
    twoWordTitle: 'Quản trị',
    credentialId: 'NN-CCNA-2006-C99',
    organization: 'Học viện Nghề Nhất Nghệ & Cisco Academy',
    registryName: 'Cisco Network Specialist Registry',
    status: 'Chứng chỉ CCNA Quản trị mạng Cisco',
    verifyUrl: 'https://nhatnghe.com',
  },
  '14': {
    twoWordTitle: 'Máy chủ',
    credentialId: 'NN-MCSA-2005-M21',
    organization: 'Học viện Nghề Nhất Nghệ & Microsoft Academy',
    registryName: 'Microsoft Certified Systems Administrator',
    status: 'Chứng chỉ MCSA Windows Server',
    verifyUrl: 'https://nhatnghe.com',
  },
};

export const ACADEMIC_COMPETENCY_RADAR: AcademicRadarAxis[] = [
  {
    id: 'tech_core',
    label: 'Công nghệ & Lập trình Web',
    shortLabel: 'Công nghệ',
    pillarLabel: 'Nền tảng',
    score: 94,
    color: '#06b6d4',
    certs: 'Cử nhân CNTT, Thiết kế Web',
    courseIds: ['1', '11'],
  },
  {
    id: 'systems_infra',
    label: 'Hạ tầng & Quản trị Mạng',
    shortLabel: 'Hạ tầng',
    pillarLabel: 'Kỹ thuật',
    score: 90,
    color: '#3b82f6',
    certs: 'CCNA Cisco, MCSA Windows Server',
    courseIds: ['13', '14'],
  },
  {
    id: 'operations_mgmt',
    label: 'Quản trị & Dự án Vận hành',
    shortLabel: 'Dự án',
    pillarLabel: 'Vận hành',
    score: 96,
    color: '#10b981',
    certs: 'PMP Prudential, Dale Carnegie Cấp cao/Cấp trung',
    courseIds: ['4', '5', '6'],
  },
  {
    id: 'risk_control',
    label: 'Quản trị Rủi ro & Vận hành',
    shortLabel: 'Rủi ro',
    pillarLabel: 'Kiểm soát',
    score: 92,
    color: '#f59e0b',
    certs: 'Risk Management Prudential',
    courseIds: ['3'],
  },
  {
    id: 'data_analytics',
    label: 'Phân tích Dữ liệu & BI',
    shortLabel: 'Dữ liệu',
    pillarLabel: 'Phân tích',
    score: 95,
    color: '#8b5cf6',
    certs: 'Data Analytics Prudential, Power BI',
    courseIds: ['2'],
  },
  {
    id: 'talent_training',
    label: 'Đào tạo & Phát triển Đội ngũ',
    shortLabel: 'Đào tạo',
    pillarLabel: 'Con người',
    score: 93,
    color: '#ec4899',
    certs: 'TTT VietnamWorks, Phỏng vấn, Tuyển dụng, MobiFone',
    courseIds: ['7', '8', '9', '10', '12'],
  },
];

export const EDUCATION_COURSES: EducationCourse[] = [
  {
    id: '1',
    title: 'Thiết kế Web',
    category: 'tech',
    year: '2026',
    code: 'WEB-2026',
    issuer: 'GitHub, tài liệu kỹ thuật và dự án thực tế',
    image: '/images/education/card-banner-01.png',
    desc: 'Kỹ thuật lập trình web, Thiết kế giao diện UI/UX chuẩn Responsive, Ứng dụng AI Agent Workflows trong tự động hóa vận hành.',
    modules: [
      'HTML5, CSS3, JavaScript, PHP, C++',
      'Responsive Web Design và nguyên lý UI/UX',
      'Grid Layout, Bento Grid, Component-based UI',
      'Ứng dụng AI Agent Workflows trong thiết kế và phát triển',
      'Xây dựng hệ thống Portfolio/CV và Dashboard điều hành',
    ],
    skills: ['UI/UX Responsive', 'Component UI', 'AI Workflows', 'Web Performance'],
    application: 'Chăm sóc Khách hàng, Quản trị vận hành, Knowledge Base, Đào tạo nội bộ, Tự động hóa quy trình.',
    accentColor: '#06b6d4',
  },
  {
    id: '2',
    title: 'Phân tích dữ liệu',
    category: 'management',
    year: '2019',
    code: 'PRU-DATA',
    issuer: 'Prudential Vietnam',
    image: '/images/education/card-banner-02.png',
    desc: 'Khai thác, xử lý và mô hình hóa dữ liệu lớn, Phân tích dữ liệu và Trực quan hóa dữ liệu, Thiết lập hệ thống báo cáo KPI tự động và Xây dựng Dashboard điều hành.',
    modules: [
      'Phân tích dữ liệu lớn và trực quan hóa',
      'Thiết lập hệ thống báo cáo KPI tự động',
      'Xây dựng Dashboard Realtime Power BI',
      'Mô hình hóa dữ liệu hành vi và phân tích cảm xúc khách hàng (VoC)',
    ],
    skills: ['Data Analytics', 'Power BI', 'Business Intelligence', 'KPI Automation'],
    application: 'Quản trị hiệu suất CSKH, thiết lập báo cáo C-Level tự động và dự báo các chỉ số rủi ro rời bỏ (Churn Rate).',
    accentColor: '#8b5cf6',
  },
  {
    id: '3',
    title: 'Quản trị Rủi ro',
    category: 'management',
    year: '2017',
    code: 'PRU-RM',
    issuer: 'Prudential Vietnam',
    image: '/images/education/card-banner-03.png',
    desc: 'Nhận diện, đánh giá và kiểm soát rủi ro trong vận hành và CSKH, Kiểm soát điểm nghẽn hệ thống và xử lý khủng hoảng truyền thông.',
    modules: [
      'Quy trình đánh giá rủi ro vận hành',
      'Kiểm soát điểm nghẽn hệ thống',
      'Xử lý khủng hoảng dịch vụ và truyền thông',
      'Thiết lập quy trình giải quyết khiếu nại cấp cao',
    ],
    skills: ['Risk Management', 'Crisis Control', 'Operations Continuity', 'SOP Control'],
    application: 'Đảm bảo tính liên tục của dịch vụ, kiểm soát sự cố vận hành CSKH và xử lý khiếu nại phức tạp.',
    accentColor: '#f59e0b',
  },
  {
    id: '4',
    title: 'Quản lý Dự án',
    category: 'management',
    year: '2016',
    code: 'PRU-PM',
    issuer: 'Prudential Vietnam',
    image: '/images/education/card-banner-04.png',
    desc: 'Quản trị dự án theo phương pháp luận chuẩn quốc tế, kiểm soát toàn diện vòng đời dự án, tối ưu hóa ngân sách và tài nguyên.',
    modules: [
      'Lập kế hoạch và cấu trúc WBS',
      'Phân bổ nguồn lực và kiểm soát tiến độ',
      'Quản lý chi phí và ngân sách dự án',
      'Đảm bảo chất lượng (QA) và đánh giá sau triển khai',
    ],
    skills: ['Project Planning', 'Resource Allocation', 'Budget Control', 'PMP Standards'],
    application: 'Điều hành chuỗi dự án chuyển đổi số, chuẩn hóa SOP và xây dựng hạ tầng Contact Center.',
    accentColor: '#10b981',
  },
  {
    id: '5',
    title: 'Quản lý Cấp cao',
    category: 'management',
    year: '2015',
    code: 'DC-VED-SR',
    issuer: 'Dale Carnegie & VED',
    image: '/images/education/card-banner-05.png',
    desc: 'Phát triển năng lực điều hành và tư duy lãnh đạo chiến lược dành cho quản lý cấp cao, định hình tầm nhìn và tái cấu trúc bộ máy.',
    modules: [
      'Tư duy lãnh đạo chiến lược',
      'Quản trị sự thay đổi quy mô lớn',
      'Thiết kế sơ đồ tổ chức bộ máy CSKH (>100-150 nhân sự)',
      'Truyền cảm hứng và xây dựng văn hóa dịch vụ',
    ],
    skills: ['Strategic Leadership', 'Change Management', 'Org Structuring', 'Visionary'],
    application: 'Định hình tầm nhìn chiến lược phòng CSKH, dẫn dắt quá trình tái cấu trúc tổ chức và xây dựng đội ngũ lãnh đạo kế thừa.',
    accentColor: '#e11d48',
  },
  {
    id: '6',
    title: 'Quản lý Cấp trung',
    category: 'management',
    year: '2014',
    code: 'DC-VED-MID',
    issuer: 'Dale Carnegie & VED',
    image: '/images/education/card-banner-06.png',
    desc: 'Đào tạo kỹ năng quản lý thực chiến và điều hành đội ngũ phòng ban hiệu quả, phân công công việc và quản trị hiệu suất ca kíp.',
    modules: [
      'Kỹ năng quản trị nhân sự thực chiến',
      'Giao việc, ủy quyền và giám sát ca',
      'Huấn luyện nâng cao năng lực đội ngũ (Coaching)',
      'Hợp tác liên phòng ban tháo gỡ điểm nghẽn vận hành',
    ],
    skills: ['Middle Management', 'Delegation', 'Performance Coaching', 'Cross-Functional'],
    application: 'Thực thi điều hành phòng ban CSKH hàng ngày, phân công công việc hiệu quả và phát triển đội ngũ trưởng nhóm/giám sát.',
    accentColor: '#3b82f6',
  },
  {
    id: '7',
    title: 'Kỹ năng Đào tạo',
    category: 'skills',
    year: '2013',
    code: 'VNW-TTT',
    issuer: 'VietnamWorks',
    image: '/images/education/card-banner-07.png',
    desc: 'Phương pháp sư phạm doanh nghiệp (Train The Trainer), thiết kế bài giảng và nghệ thuật làm chủ sân khấu truyền cảm hứng.',
    modules: [
      'Xây dựng giáo trình đào tạo Onboarding',
      'Phương pháp truyền đạt sư phạm tương tác',
      'Kỹ năng đứng lớp và làm chủ sân khấu',
      'Đánh giá hiệu quả đào tạo theo mô hình Kirkpatrick',
    ],
    skills: ['Train The Trainer', 'Instructional Design', 'Facilitation', 'Onboarding'],
    application: 'Thành lập và vận hành các trung tâm đào tạo CS Academy nội bộ, rút ngắn thời gian Onboarding và đảm bảo chất lượng đồng nhất.',
    accentColor: '#ec4899',
  },
  {
    id: '8',
    title: 'Kỹ năng Thuyết trình',
    category: 'skills',
    year: '2013',
    code: 'VNW-PRS',
    issuer: 'VietnamWorks',
    image: '/images/education/card-banner-08.png',
    desc: 'Phương pháp xây dựng bài thuyết trình chuyên nghiệp, truyền đạt ý tưởng mạch lạc và thuyết phục hội đồng C-Level.',
    modules: [
      'Cấu trúc bài thuyết trình kinh doanh logic',
      'Kỹ thuật diễn đạt và ngôn ngữ cơ thể',
      'Nghệ thuật tương tác khán giả và xử lý câu hỏi phản biện',
      'Trình bày đề án chiến lược và báo cáo ngân sách',
    ],
    skills: ['Presentation', 'Public Speaking', 'Executive Storytelling', 'C-Level Pitch'],
    application: 'Truyền cảm hứng cho đội ngũ nhân sự quy mô lớn, bảo vệ đề án chiến lược trước Ban Giám đốc và đại diện doanh nghiệp.',
    accentColor: '#6366f1',
  },
  {
    id: '9',
    title: 'Kỹ năng Phỏng vấn',
    category: 'skills',
    year: '2013',
    code: 'VNW-INT',
    issuer: 'VietnamWorks',
    image: '/images/education/card-banner-09.png',
    desc: 'Chương trình đào tạo kỹ thuật phỏng vấn và đánh giá tiềm năng nhân sự chuyên nghiệp theo phương pháp hành vi (BEI).',
    modules: [
      'Kỹ thuật phỏng vấn hành vi (BEI / STAR)',
      'Đánh giá ứng viên theo khung năng lực ASK',
      'Kỹ năng lắng nghe sâu và quan sát ngôn ngữ cơ thể',
      'Xây dựng bộ câu hỏi chuẩn hóa cho nhân sự CSKH',
    ],
    skills: ['Behavioral Interview', 'STAR Method', 'ASK Framework', 'Talent Assessment'],
    application: 'Xây dựng đội ngũ CSKH chất lượng cao, chọn lọc ứng viên có tư duy dịch vụ thấu cảm chuẩn xác và giảm tỷ lệ thất thoát nhân sự.',
    accentColor: '#14b8a6',
  },
  {
    id: '10',
    title: 'Kỹ năng Tuyển dụng',
    category: 'skills',
    year: '2013',
    code: 'VNW-REC',
    issuer: 'VietnamWorks',
    image: '/images/education/card-banner-10.png',
    desc: 'Chiến lược tuyển dụng và xây dựng thương hiệu tuyển dụng chuyên nghiệp, hoạch định nguồn nhân lực ca kíp quy mô lớn.',
    modules: [
      'Xây dựng tiêu chí và chân dung ứng viên lý tưởng',
      'Chiến lược thu hút nhân tài đa kênh',
      'Lập kế hoạch tuyển dụng quy mô lớn theo mùa vụ',
      'Tối ưu hóa chi phí tuyển dụng (Cost-per-Hire)',
    ],
    skills: ['Talent Acquisition', 'Recruitment Strategy', 'Headcount Planning', 'Cost Optimization'],
    application: 'Chủ động hoạch định nhân sự ca kíp, mở rộng bộ máy CSKH nhanh chóng đáp ứng các giai đoạn tăng trưởng nóng của doanh nghiệp.',
    accentColor: '#f97316',
  },
  {
    id: '11',
    title: 'Cử nhân CNTT',
    category: 'degree',
    year: '2007',
    code: 'STU-IT',
    issuer: 'Trường ĐH Công nghệ Sài Gòn (STU)',
    image: '/images/education/card-banner-11.png',
    desc: 'Chương trình đào tạo đại học chính quy về khoa học máy tính, kỹ thuật phần mềm, cơ sở dữ liệu và hệ thống thông tin.',
    modules: [
      'Lập trình máy tính và cấu trúc dữ liệu',
      'Hệ quản trị cơ sở dữ liệu quan hệ',
      'Mạng máy tính và viễn thông doanh nghiệp',
      'Phân tích và thiết kế kiến trúc hệ thống phần mềm',
    ],
    skills: ['Computer Science', 'Software Architecture', 'Relational Databases', 'System Design'],
    application: 'Tạo lợi thế giao thoa khác biệt giữa IT và CX, trực tiếp làm việc với bộ phận Kỹ thuật/Sản phẩm để kiến trúc hệ thống CRM, AI Bot và chuyển đổi số.',
    accentColor: '#10b981',
  },
  {
    id: '12',
    title: 'Nghiệp vụ Tổng đài',
    category: 'skills',
    year: '2007',
    code: 'MBF-CC',
    issuer: 'MobiFone',
    image: '/images/education/card-banner-12.png',
    desc: 'Chương trình đào tạo chuẩn hóa nghiệp vụ vận hành Contact Center và chăm sóc khách hàng viễn thông quy mô hàng triệu người dùng.',
    modules: [
      'Nghiệp vụ tổng đài viễn thông chuyên nghiệp',
      'Quy trình tiếp nhận và xử lý yêu cầu chuẩn SLA',
      'Kỹ năng lắng nghe thấu cảm và làm dịu cảm xúc bất mãn',
      'Giải quyết tình huống khiếu nại phức tạp qua điện thoại',
    ],
    skills: ['Call Center Operations', 'Telephony Care', 'Complaint Resolution', 'Active Listening'],
    application: 'Thấu hiểu tường tận công việc thực địa của tư vấn viên tuyến đầu, từ đó xây dựng kịch bản SOP sát thực tế và đồng cảm sâu sắc với đội ngũ.',
    accentColor: '#0284c7',
  },
  {
    id: '13',
    title: 'Quản trị Mạng',
    category: 'tech',
    year: '2006',
    code: 'CISCO-CCNA',
    issuer: 'Trường Nghề Nhất Nghệ',
    image: '/images/education/card-banner-13.png',
    desc: 'Chương trình đào tạo quản trị hạ tầng mạng Cisco CCNA tiêu chuẩn quốc tế, thiết kế và tối ưu băng thông cho hệ thống thoại VoIP.',
    modules: [
      'Mô hình mạng TCP/IP và phân lớp OSI',
      'Kỹ thuật định tuyến Routing và chuyển mạch Switching Cisco',
      'Cấu hình phân đoạn mạng VLAN và bảo mật Port Security',
      'Thiết kế hạ tầng mạng thoại IP cho Contact Center',
    ],
    skills: ['Cisco CCNA', 'Routing & Switching', 'VLAN Config', 'Network Troubleshooting'],
    application: 'Làm chủ hạ tầng viễn thông VoIP/Telephony cho Call Center, giám sát độ ổn định mạng và tối ưu băng thông kết nối đa kênh.',
    accentColor: '#2563eb',
  },
  {
    id: '14',
    title: 'Quản trị Máy chủ',
    category: 'tech',
    year: '2005',
    code: 'MS-MCSA',
    issuer: 'Trường Nghề Nhất Nghệ',
    image: '/images/education/card-banner-14.png',
    desc: 'Khóa đào tạo chuyên sâu về quản trị hạ tầng hệ thống máy chủ doanh nghiệp Microsoft Windows Server (MCSA).',
    modules: [
      'Cài đặt và quản trị Windows Server',
      'Cấu hình dịch vụ thư mục Active Directory (AD)',
      'Triển khai các dịch vụ cốt lõi DNS, DHCP, File Server',
      'Phân quyền bảo mật tài nguyên và chính sách Group Policy (GPO)',
    ],
    skills: ['Windows Server', 'Active Directory', 'DNS / DHCP', 'Group Policy (GPO)'],
    application: 'Quản trị tài khoản, phân quyền bảo mật dữ liệu khách hàng và hỗ trợ hạ tầng máy chủ cho các phần mềm nghiệp vụ CSKH.',
    accentColor: '#7c3aed',
  },
];

export default EDUCATION_COURSES;
