import { InterviewQuestion } from '@/types';

export const INTERVIEW_VIDEO_1_URL =
  'https://cdn.scena.ai/project/9741/f7053626ae15c847304143dc6cf41f1fd2cf1611b27c30ff75ac9da6e47d005b.mp4';
export const INTERVIEW_VIDEO_2_URL =
  'https://cdn.scena.ai/project/9741/021c21b2f677c4341e06c62c9432d06d251e22c83716e55b927633e254a67730.mp4';

export const INTERVIEW_TABS = [
  { key: 'all', labelVi: 'Tất cả (14)' },
  { key: 'intro', labelVi: 'Định vị' },
  { key: 'management', labelVi: 'Vận hành' },
  { key: 'tech', labelVi: 'Công nghệ' },
  { key: 'strategy', labelVi: 'Chiến lược' },
  { key: 'inquiry', labelVi: 'Chất vấn' },
  { key: 'closing', labelVi: 'Lời kết' },
];

export const INTERVIEW_QUESTIONS: InterviewQuestion[] = [
  {
    stt: 1,
    categoryKey: 'intro',
    categoryVi: 'Định vị',
    timestamp: '00:00 - 00:28',
    startSec: 0,
    endSec: 28,
    askerVi: 'Hội Đồng Phỏng Vấn',
    questionVi: 'Câu hỏi 01: Xin anh giới thiệu ngắn gọn về hành trình 22 năm trong ngành Dịch vụ Khách hàng?',
    answererVi: 'Nguyễn Hùng Thái',
    answerVi:
      'Tôi bắt đầu từ vị trí tổng đài viên viễn thông năm 2003 tại MobiFone, qua các tập đoàn lớn như V247, HTVC, Garena, Shopee, Prudential, MoMo và Finviet. Hành trình đó đã tôi luyện cho tôi khả năng quản trị đa kênh, xây dựng quy trình SOP và dẫn dắt đội ngũ hơn 150 nhân sự.',
    keyTakeawayVi:
      'Khởi đầu từ cơ sở vững chắc, tích lũy thực chiến đa ngành và nâng tầm quản trị toàn diện.',
  },
  {
    stt: 2,
    categoryKey: 'intro',
    categoryVi: 'Định vị',
    timestamp: '00:28 - 00:58',
    startSec: 28,
    endSec: 58,
    askerVi: 'Ban Giám Đốc',
    questionVi: 'Triết lý cốt lõi nào đã dẫn dắt anh vượt qua những áp lực lớn nhất của ngành CSKH?',
    answererVi: 'Nguyễn Hùng Thái',
    answerVi:
      "Triết lý của tôi là: 'Sự hài lòng của khách hàng không đến từ sự hoàn hảo, mà đến từ sự đồng cảm kịp thời'. Trong mọi sự cố, tốc độ phản hồi và thái độ thấu hiểu của con người là chìa khóa then chốt giúp hóa giải 90% bức xúc của khách hàng.",
    keyTakeawayVi:
      'Đặt cảm xúc và trải nghiệm con người làm trung tâm song hành cùng tiêu chuẩn quy trình.',
  },
  {
    stt: 3,
    categoryKey: 'management',
    categoryVi: 'Vận hành',
    timestamp: '00:58 - 01:32',
    startSec: 58,
    endSec: 92,
    askerVi: 'Trưởng Ban Tuyển Dụng',
    questionVi: 'Khi quản lý đội ngũ hơn 130 - 150 nhân sự, anh thiết lập cơ cấu phân tầng quản trị như thế nào?',
    answererVi: 'Nguyễn Hùng Thái',
    answerVi:
      'Tôi áp dụng mô hình phân cấp 3 tầng: Tầng điều hành chiến lược, Tầng giám sát chất lượng (QA/Supervisors), và Tầng chuyên viên tuyến đầu. Mỗi nhóm có KPIs và tiêu chuẩn SLA rõ ràng, kèm cơ chế báo cáo thời gian thực giúp phát hiện điểm nghẽn ngay trong ca trực.',
    keyTakeawayVi:
      'Cơ cấu phân quyền minh bạch, đo lường theo thời gian thực và phát triển đội ngũ kế thừa.',
  },
  {
    stt: 4,
    categoryKey: 'management',
    categoryVi: 'Vận hành',
    timestamp: '01:32 - 02:08',
    startSec: 92,
    endSec: 128,
    askerVi: 'Giám Đốc Vận Hành',
    questionVi: 'Phương pháp nào giúp anh duy trì chỉ số CSAT luôn trên 96% qua nhiều môi trường cạnh tranh?',
    answererVi: 'Nguyễn Hùng Thái',
    answerVi:
      'Đó là sự kết hợp giữa đào tạo kỹ năng thấu cảm Train-The-Trainer (TTT) và chuẩn hóa quy trình tiếp nhận FCR (First Contact Resolution). Chúng tôi phân tích nguyên nhân gốc rễ (Root Cause Analysis) của các ticket bị phàn nàn và cải tiến quy trình ngay trong 48 giờ.',
    keyTakeawayVi:
      'Cải tiến FCR liên tục dựa trên Root Cause Analysis và phản hồi trực tiếp từ người dùng.',
  },
  {
    stt: 5,
    categoryKey: 'management',
    categoryVi: 'Vận hành',
    timestamp: '02:08 - 02:44',
    startSec: 128,
    endSec: 164,
    askerVi: 'Hội Đồng Tuyển Dụng',
    questionVi: 'Làm thế nào để anh giảm thiểu tỷ lệ biến động nhân sự (Turnover Rate) vốn rất cao trong các Call Center?',
    answererVi: 'Nguyễn Hùng Thái',
    answerVi:
      'Bằng cách xây dựng lộ trình thăng tiến rõ ràng (Career Path) từ Nhân viên lên Team Leader, tạo môi trường làm việc nhân văn, công nhận thành tích kịp thời và trang bị các công cụ tự động hóa giúp giảm bớt các tác vụ lặp đi lặp lại gây mệt mỏi.',
    keyTakeawayVi:
      'Lộ trình thăng tiến minh bạch, đãi ngộ gắn liền với hiệu suất và môi trường làm việc gắn kết.',
  },
  {
    stt: 6,
    categoryKey: 'tech',
    categoryVi: 'Công nghệ',
    timestamp: '02:44 - 03:20',
    startSec: 164,
    endSec: 200,
    askerVi: 'Giám Đốc Công Nghệ (CTO)',
    questionVi: 'Anh đã ứng dụng AI và Tự động hóa CRM như thế nào để tối ưu năng suất dịch vụ?',
    answererVi: 'Nguyễn Hùng Thái',
    answerVi:
      'Tại Finviet và MoMo, tôi triển khai hệ thống AI Voicebot & Chatbot tự động giải quyết hơn 60% yêu cầu thường gặp (FAQ, tra cứu số dư, tra soát giao dịch). Nhân sự chuyên nghiệp chỉ tập trung xử lý các ca tư vấn phức tạp và khiếu nại cấp cao.',
    keyTakeawayVi:
      'Tự động hóa 60%+ yêu cầu lặp lại bằng AI, giải phóng nhân lực cho các tác vụ giá trị cao.',
  },
  {
    stt: 7,
    categoryKey: 'tech',
    categoryVi: 'Công nghệ',
    timestamp: '03:20 - 03:55',
    startSec: 200,
    endSec: 235,
    askerVi: 'Trưởng Phòng Kỹ Thuật',
    questionVi: 'Hệ thống Omnichannel được anh triển khai đồng bộ giữa các kênh như thế nào?',
    answererVi: 'Nguyễn Hùng Thái',
    answerVi:
      'Hợp nhất toàn bộ dữ liệu tương tác từ Hotline, In-app Chat, Email, Mạng xã hội vào một màn hình duy nhất (Single Customer View). Nhờ đó, nhân viên nắm trọn vẹn lịch sử giao dịch của khách hàng mà không bắt họ phải lặp lại vấn đề.',
    keyTakeawayVi:
      'Single Customer View hợp nhất dữ liệu đa kênh, tối ưu trải nghiệm liền mạch không đứt gãy.',
  },
  {
    stt: 8,
    categoryKey: 'tech',
    categoryVi: 'Công nghệ',
    timestamp: '03:55 - 04:30',
    startSec: 235,
    endSec: 270,
    askerVi: 'Ban Giám Đốc',
    questionVi: 'Làm thế nào để chuyển hóa dữ liệu khiếu nại thành tài sản cải tiến sản phẩm cho doanh nghiệp?',
    answererVi: 'Nguyễn Hùng Thái',
    answerVi:
      'Tôi xây dựng Realtime Dashboard phân loại ticket theo tính năng sản phẩm. Hàng tuần, dữ liệu phân tích phản hồi được chuyển trực tiếp cho khối Product và Engineering để fix bug và cập nhật phiên bản mới, biến CSKH thành tai mắt của sản phẩm.',
    keyTakeawayVi:
      'Chuyển hóa dữ liệu khiếu nại thành báo cáo Realtime hỗ trợ trực tiếp quyết định cải tiến sản phẩm.',
  },
  {
    stt: 9,
    categoryKey: 'strategy',
    categoryVi: 'Chiến lược',
    timestamp: '04:30 - 05:05',
    startSec: 270,
    endSec: 305,
    askerVi: 'Giám Đốc Tài Chính (CFO)',
    questionVi: 'Làm sao để cân đối giữa việc tối ưu chi phí vận hành (Cost) và nâng cao trải nghiệm khách hàng (CX)?',
    answererVi: 'Nguyễn Hùng Thái',
    answerVi:
      'Tối ưu chi phí bền vững nhất không phải là cắt giảm nhân sự, mà là triệt tiêu sự cố từ gốc (Defect Reduction). Khi sản phẩm ổn định và quy trình tự phục vụ (Self-service) tốt, số lượng cuộc gọi giảm tự nhiên, chi phí trên mỗi contact (Cost per Contact) sẽ hạ xuống thấp nhất.',
    keyTakeawayVi:
      'Triệt tiêu lỗi từ gốc và đẩy mạnh Self-service giúp hạ Cost per Contact mà vẫn gia tăng CSAT.',
  },
  {
    stt: 10,
    categoryKey: 'strategy',
    categoryVi: 'Chiến lược',
    timestamp: '05:05 - 05:40',
    startSec: 305,
    endSec: 340,
    askerVi: 'Hội Đồng Quản Trị',
    questionVi: 'Kế hoạch ứng phó BCP (Business Continuity Planning) của anh khi hệ thống gặp sự cố diện rộng là gì?',
    answererVi: 'Nguyễn Hùng Thái',
    answerVi:
      'Tôi đã xây dựng quy trình BCP tại Prudential và MoMo: Kích hoạt thông báo chủ động đa kênh (In-app banner, SMS broadcast), chuyển hướng lưu lượng cuộc gọi sang IVR tự động, và huy động đội ngũ trực chiến xử lý tra soát ngoài giờ theo kịch bản khủng hoảng.',
    keyTakeawayVi:
      'Chủ động minh bạch thông tin trước khi khách hàng phàn nàn và điều phối luồng ứng phó BCP 24/7.',
  },
  {
    stt: 11,
    categoryKey: 'inquiry',
    categoryVi: 'Chất vấn',
    timestamp: '05:40 - 06:15',
    startSec: 340,
    endSec: 375,
    askerVi: 'Ban Giám Đốc',
    questionVi: 'Khi xảy ra xung đột góc nhìn giữa CSKH và khối Kinh doanh (Sales), anh giải quyết ra sao?',
    answererVi: 'Nguyễn Hùng Thái',
    answerVi:
      'Chúng tôi dựa trên số liệu khách quan (Data-driven) và mục tiêu chung là giá trị vòng đời khách hàng (LTV). Tôi ngồi lại cùng Giám đốc Kinh doanh để làm rõ: Cam kết bán hàng cần đi đôi với năng lực phục vụ, bảo đảm uy tín thương hiệu lâu dài.',
    keyTakeawayVi:
      'Giải quyết bất đồng bằng số liệu thực tế và đặt lợi ích thương hiệu lâu dài làm đích đến.',
  },
  {
    stt: 12,
    categoryKey: 'inquiry',
    categoryVi: 'Chất vấn',
    timestamp: '06:15 - 06:50',
    startSec: 375,
    endSec: 410,
    askerVi: 'Chuyên Gia Đánh Giá',
    questionVi: 'Đâu là điểm anh tự nhận thấy bản thân cần hoàn thiện hơn trong vai trò lãnh đạo cấp cao?',
    answererVi: 'Nguyễn Hùng Thái',
    answerVi:
      'Đó là tiếp tục nâng cao tư duy chiến lược thị trường toàn cầu và nghiên cứu sâu các mô hình Agentic AI tự hành thế hệ mới, nhằm đưa dịch vụ khách hàng Việt Nam tiệm cận các chuẩn mực đẳng cấp quốc tế.',
    keyTakeawayVi:
      'Tinh thần học hỏi không ngừng, chủ động làm chủ làn sóng công nghệ mới để bứt phá.',
  },
  {
    stt: 13,
    categoryKey: 'closing',
    categoryVi: 'Lời kết',
    timestamp: '06:50 - 07:25',
    startSec: 410,
    endSec: 445,
    askerVi: 'Chủ Tịch Hội Đồng',
    questionVi: 'Tầm nhìn của anh đối với vị trí Head of CS / CX Director trong giai đoạn 2026+?',
    answererVi: 'Nguyễn Hùng Thái',
    answerVi:
      'Giai đoạn 2026+ sẽ là kỷ nguyên của Trải nghiệm Khách hàng Siêu Cá nhân hóa (Hyper-personalization). Bộ phận CSKH không còn là trung tâm chi phí (Cost Center) mà sẽ trở thành động lực tăng trưởng doanh thu (Revenue Driver) và giữ chân khách hàng cốt lõi.',
    keyTakeawayVi:
      'Chuyển dịch vai trò CSKH từ Cost Center thành Revenue & Retention Driver chiến lược.',
  },
  {
    stt: 14,
    categoryKey: 'closing',
    categoryVi: 'Lời kết',
    timestamp: '07:25 - 08:00',
    startSec: 445,
    endSec: 480,
    askerVi: 'Hội Đồng Phỏng Vấn',
    questionVi: 'Thông điệp cam kết đồng hành của anh gửi đến tổ chức nếu đảm nhận vị trí?',
    answererVi: 'Nguyễn Hùng Thái',
    answerVi:
      'Tôi cam kết mang toàn bộ 22 năm tâm huyết, kỷ luật và năng lực xây dựng hệ thống để cùng Ban Lãnh đạo kiến tạo nên một chuẩn mực dịch vụ khách hàng xuất sắc, tạo dựng niềm tin bền vững và tăng trưởng vượt bậc cho doanh nghiệp.',
    keyTakeawayVi:
      'Tận tâm phụng sự, kỷ luật vận hành và đồng hành kiến tạo giá trị đột phá lâu dài.',
  },
];
