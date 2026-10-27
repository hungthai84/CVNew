import { ProjectData, ProjectDetailedSpec, ProjectWorkItem } from '@/types';

/**
 * Palette màu sắc và biểu tượng cho các mục động trong chi tiết dự án
 */
export const SCOPE_PALETTES = [
  {
    theme: 'from-sky-50/90 to-sky-100/40 dark:from-sky-950/40 dark:to-slate-800/80 border-sky-200/90 dark:border-sky-500/30 text-sky-600 dark:text-sky-400',
    icon: 'search',
  },
  {
    theme: 'from-purple-50/90 to-purple-100/40 dark:from-purple-950/40 dark:to-slate-800/80 border-purple-200/90 dark:border-purple-500/30 text-purple-600 dark:text-purple-400',
    icon: 'users',
  },
  {
    theme: 'from-indigo-50/90 to-indigo-100/40 dark:from-indigo-950/40 dark:to-slate-800/80 border-indigo-200/90 dark:border-indigo-500/30 text-indigo-600 dark:text-indigo-400',
    icon: 'workflow',
  },
  {
    theme: 'from-emerald-50/90 to-emerald-100/40 dark:from-emerald-950/40 dark:to-slate-800/80 border-emerald-200/90 dark:border-emerald-500/30 text-emerald-600 dark:text-emerald-400',
    icon: 'file-text',
  },
  {
    theme: 'from-amber-50/90 to-amber-100/40 dark:from-amber-950/40 dark:to-slate-800/80 border-amber-200/90 dark:border-amber-500/30 text-amber-600 dark:text-amber-400',
    icon: 'trending-up',
  },
  {
    theme: 'from-cyan-50/90 to-cyan-100/40 dark:from-cyan-950/40 dark:to-slate-800/80 border-cyan-200/90 dark:border-cyan-500/30 text-cyan-600 dark:text-cyan-400',
    icon: 'cpu',
  },
  {
    theme: 'from-rose-50/90 to-rose-100/40 dark:from-rose-950/40 dark:to-slate-800/80 border-rose-200/90 dark:border-rose-500/30 text-rose-600 dark:text-rose-400',
    icon: 'award',
  },
];

export const CHALLENGE_PALETTES = [
  {
    theme: 'from-amber-50/90 to-amber-100/40 dark:from-amber-950/40 dark:to-slate-800/80 border-amber-200/90 dark:border-amber-500/30 text-amber-600 dark:text-amber-400',
    icon: 'users',
    fourWord: 'Phân định trách nhiệm',
  },
  {
    theme: 'from-rose-50/90 to-rose-100/40 dark:from-rose-950/40 dark:to-slate-800/80 border-rose-200/90 dark:border-rose-500/30 text-rose-600 dark:text-rose-400',
    icon: 'workflow',
    fourWord: 'Quy trình thống nhất',
  },
  {
    theme: 'from-sky-50/90 to-sky-100/40 dark:from-sky-950/40 dark:to-slate-800/80 border-sky-200/90 dark:border-sky-500/30 text-sky-600 dark:text-sky-400',
    icon: 'clock',
    fourWord: 'Phân bổ nguồn lực',
  },
  {
    theme: 'from-indigo-50/90 to-indigo-100/40 dark:from-indigo-950/40 dark:to-slate-800/80 border-indigo-200/90 dark:border-indigo-500/30 text-indigo-600 dark:text-indigo-400',
    icon: 'database',
    fourWord: 'Tập trung dữ liệu',
  },
  {
    theme: 'from-emerald-50/90 to-emerald-100/40 dark:from-emerald-950/40 dark:to-slate-800/80 border-emerald-200/90 dark:border-emerald-500/30 text-emerald-600 dark:text-emerald-400',
    icon: 'award',
    fourWord: 'Đồng bộ chất lượng',
  },
  {
    theme: 'from-purple-50/90 to-purple-100/40 dark:from-purple-950/40 dark:to-slate-800/80 border-purple-200/90 dark:border-purple-500/30 text-purple-600 dark:text-purple-400',
    icon: 'chart',
    fourWord: 'Hệ thống đo lường',
  },
  {
    theme: 'from-teal-50/90 to-teal-100/40 dark:from-teal-950/40 dark:to-slate-800/80 border-teal-200/90 dark:border-teal-500/30 text-teal-600 dark:text-teal-400',
    icon: 'network',
    fourWord: 'Phối hợp liên phòng',
  },
];

/**
 * Trình tạo và bổ sung đặc tả chi tiết chuyên sâu (ProjectDetailedSpec) cho toàn bộ 21 dự án,
 * chuẩn hóa cấu trúc 10 phần giống hệt bài mẫu chuẩn dự án 1.1:
 * - 0: Sơ đồ tư duy kiến trúc (sec-mindmap)
 * - 1: Tổng quan dự án (sec-overview)
 * - 2: Bối cảnh thách thức (sec-context)
 * - 3: Mục tiêu chiến lược (sec-objectives)
 * - 4: Hạng mục triển khai (sec-scope)
 * - 5: Lộ trình vận hành (sec-methodology)
 * - 6: Chỉ số hiệu quả (sec-metrics)
 * - 7: Vai trò trách nhiệm (sec-roles)
 * - 8: Kết quả đạt được (sec-outcomes)
 * - 9: Triết lý quản trị (sec-philosophy)
 */
export function getProjectDetailedSpec(project: ProjectData): ProjectDetailedSpec {
  // 1. Nếu dự án đã có sẵn detailedSpec cụ thể (như dự án 1.1), bảo lưu nguyên vẹn
  if (project.detailedSpec && project.detailedSpec.overview && project.detailedSpec.scopeItems) {
    return project.detailedSpec;
  }

  // 2. Tự động kiến tạo detailedSpec chuyên sâu theo dữ liệu thực chiến của từng dự án
  const star = project.star || {
    situation: project.description,
    approach: 'Ứng dụng phương pháp quản trị chuẩn hóa, đo lường bằng dữ liệu thực chiến và tối ưu hóa liên tục.',
    actions: [],
    results: [],
  };

  const projectTitleClean = project.title.replace(/^[\d.]+\s*·\s*/, '').trim();

  // English Subtitle
  const subtitleEn =
    project.subtitleEn ||
    `${projectTitleClean} Framework & Strategic Operations Management`;

  // Tagline
  const tagline =
    project.tagline ||
    project.quote ||
    'Chuẩn hóa quy trình – Tối ưu nguồn lực – Ứng dụng công nghệ – Nâng tầm trải nghiệm khách hàng.';

  // Section 1: Overview Paragraphs
  const overview = [
    `${project.title} là dự án quản trị chiến lược thuộc nhóm ${project.groupTitle}, nhằm kiến tạo năng lực phục vụ vượt trội, giải quyết triệt để các bài toán vận hành thực tiễn và gia tăng giá trị kinh doanh lâu dài cho doanh nghiệp.`,
    `${star.approach} Thông qua việc chuyển đổi từ vận hành phân mảnh sang hệ thống kết nối chặt chẽ, dự án thiết lập quy chuẩn kiểm soát rủi ro, rút ngắn chu kỳ xử lý và mang lại trải nghiệm nhất quán trên mọi điểm chạm.`,
    `Với vai trò ${project.role}, trọng tâm điều hành là gắn kết bốn trụ cột cốt lõi: Con người, Quy trình, Công nghệ và Dữ liệu thành một cỗ máy vận hành linh hoạt, có khả năng mở rộng bền vững và đo lường minh bạch theo chuẩn mực quốc tế.`,
  ];

  // Section 2: Context Challenges (7 thách thức chẩn đoán chi tiết)
  const defaultChallenges = [
    'Quy trình vận hành thiếu tính đồng bộ, phụ thuộc vào thói quen cá nhân và khó chuyển giao cho nhân sự kế thừa.',
    'Thông tin và dữ liệu khách hàng bị phân tán, gây khó khăn cho việc tra cứu lịch sử tương tác và phối hợp giải quyết.',
    'Áp lực lưu lượng tương tác tăng cao nhưng việc phân bổ ca trực và điều phối nguồn lực chưa được tối ưu hóa theo thời gian thực.',
    'Hệ thống đo lường hiệu suất (KPIs/SLA) chưa phản ánh chính xác chất lượng dịch vụ và chưa có cơ chế cảnh báo sớm.',
    'Cơ chế phối hợp liên phòng ban giữa CSKH với Vận hành, Sản phẩm và Công nghệ chưa có ma trận trách nhiệm (RACI) minh bạch.',
    'Thiếu công cụ tự động hóa hỗ trợ nhân viên giải phóng khỏi các thao tác thủ công lặp lại để tập trung vào các ca phức tạp.',
    'Trải nghiệm khách hàng chưa đồng đều giữa các kênh tiếp nhận, dẫn đến tỷ lệ khách hàng phải liên hệ nhiều lần tăng cao.',
  ];

  const challenges =
    star.situation.length > 50
      ? [
          star.situation,
          ...defaultChallenges.slice(1, 7),
        ]
      : defaultChallenges;

  // Section 3: Objectives (3 nhóm mục tiêu chuẩn)
  const objectives = [
    {
      title: 'Mục tiêu tổ chức & chiến lược',
      items: [
        `Định hình mô hình tổ chức cho ${projectTitleClean} theo cấu trúc chuyên nghiệp và chuẩn mực vận hành.`,
        'Xác định rõ vai trò, nhiệm vụ và ma trận trách nhiệm cho từng vị trí tham gia dự án.',
        'Thiết lập cơ chế kiểm soát chất lượng dịch vụ định kỳ và báo cáo điều hành trực tiếp lên Ban Lãnh đạo.',
        'Xây dựng lộ trình phát triển kỹ năng và chuẩn hóa năng lực chuyên môn cho toàn bộ đội ngũ.',
      ],
    },
    {
      title: 'Mục tiêu vận hành & chất lượng',
      items: [
        'Chuẩn hóa 100% quy trình thao tác nghiệp vụ, kịch bản hỗ trợ và biểu mẫu xử lý tình huống phát sinh.',
        'Rút ngắn thời gian xử lý trung bình (AHT) và gia tăng tỷ lệ xử lý dứt điểm ngay từ lần tiếp nhận đầu tiên (FCR).',
        'Thiết lập ngưỡng cam kết chất lượng dịch vụ (SLA) chặt chẽ và cơ chế leo thang sự cố minh bạch.',
        'Nâng cao mức độ hài lòng khách hàng (CSAT/NPS) và giảm thiểu khiếu nại dịch vụ kéo dài.',
      ],
    },
    {
      title: 'Mục tiêu công nghệ, dữ liệu & mở rộng',
      items: [
        'Tích hợp công cụ quản trị, tổng đài và CRM tập trung dữ liệu tương tác 360 độ theo thời gian thực.',
        'Ứng dụng tự động hóa thông minh giúp giảm tải tối thiểu 30% thao tác thủ công cho nhân sự.',
        'Xây dựng hệ thống Dashboard hiển thị chỉ số trực quan phục vụ công tác giám sát và ra quyết định tức thì.',
        'Đảm bảo kiến trúc hệ thống sẵn sàng mở rộng quy mô khi sản phẩm và lượng khách hàng tăng trưởng nhanh.',
      ],
    },
  ];

  // Section 4: Scope Items (Chuyển đổi từ star.actions hoặc tự động tạo 5-7 hạng mục)
  const scopeItems: ProjectWorkItem[] =
    star.actions && star.actions.length > 0
      ? star.actions.map((act, idx) => ({
          code: act.step || `Hạng mục ${idx + 1}`,
          title: act.title,
          intro: act.desc,
          tasks: [
            `Khảo sát, thiết kế và ban hành chuẩn ${act.title.toLowerCase()} cho toàn bộ hệ thống.`,
            `Tổ chức hội thảo đào tạo, chuyển giao tài liệu và hướng dẫn thực thi cho đội ngũ liên quan.`,
            `Thiết lập cơ chế kiểm thử UAT, theo dõi tuân thủ và điều chỉnh chỉ số phù hợp với thực tế.`,
          ],
          note: `Đảm bảo tính đồng bộ với định hướng quản trị chung của ${project.groupTitle}.`,
          deliverable: `Bộ tài liệu chuẩn hóa, quy trình hoàn chỉnh và báo cáo nghiệm thu ${act.title}.`,
        }))
      : [
          {
            code: 'Hạng mục 1',
            title: 'Khảo sát và đánh giá hiện trạng',
            intro: 'Rà soát toàn diện hiện trạng quy trình, công cụ và hiệu suất phục vụ trước khi triển khai cải tiến.',
            tasks: [
              'Thu thập dữ liệu lịch sử tương tác, tỷ lệ khiếu nại và phản hồi từ khách hàng.',
              'Phỏng vấn sâu các nhóm nhân sự tiếp xúc trực tiếp để xác định chính xác các điểm nghẽn.',
              'Lập bản đồ phân tích khoảng cách (Gap Analysis) giữa thực tế và mục tiêu kỳ vọng.',
            ],
            note: 'Dữ liệu khảo sát là căn cứ cốt lõi để xây dựng phương án khả thi và thuyết phục.',
            deliverable: 'Báo cáo chẩn đoán hiện trạng và đề xuất giải pháp kiến trúc tổng thể.',
          },
          {
            code: 'Hạng mục 2',
            title: 'Thiết kế mô hình & quy trình nghiệp vụ',
            intro: 'Xây dựng luồng xử lý chuẩn hóa, ma trận phân quyền và kịch bản vận hành tối ưu.',
            tasks: [
              'Chuẩn hóa các bước thao tác nghiệp vụ từ tiếp nhận đến nghiệm thu dứt điểm.',
              'Thiết lập ma trận trách nhiệm RACI và quy định thời hạn xử lý cho từng cấp bậc.',
              'Ban hành tài liệu hướng dẫn công việc (SOP/WI) trực quan và dễ tra cứu.',
            ],
            note: 'Tập trung tối giản thao tác, giảm thiểu các bước trung gian không tạo ra giá trị.',
            deliverable: 'Bộ tài liệu quy trình SOP, biểu mẫu nghiệp vụ và kịch bản xử lý chuẩn.',
          },
          {
            code: 'Hạng mục 3',
            title: 'Triển khai công nghệ & tự động hóa',
            intro: 'Thiết lập các công cụ số hóa, kết nối dữ liệu liên thông và kích hoạt quy tắc tự động.',
            tasks: [
              'Cấu hình hệ thống phần mềm, tích hợp dữ liệu khách hàng 360 độ.',
              'Thiết lập luồng tự động phân loại yêu cầu, định tuyến thông minh và gửi cảnh báo SLA.',
              'Kiểm thử tích hợp hệ thống (SIT) và kiểm thử chấp nhận người dùng (UAT) nghiêm ngặt.',
            ],
            note: 'Công nghệ đóng vai trò đòn bẩy nâng cao năng suất và độ chính xác của con người.',
            deliverable: 'Hệ thống công nghệ đã nghiệm thu, vận hành thông suốt và bảo mật.',
          },
          {
            code: 'Hạng mục 4',
            title: 'Đào tạo chuyển giao & văn hóa thực thi',
            intro: 'Nâng cao năng lực đội ngũ, trang bị tư duy phục vụ và bảo đảm tuân thủ 100%.',
            tasks: [
              'Tổ chức chuỗi workshop hướng dẫn quy trình mới và thực hành tình huống mô phỏng.',
              'Đánh giá sát hạch năng lực chuyên môn trước khi cấp chứng chỉ phân ca vận hành.',
              'Xây dựng cẩm nang tra cứu nhanh (Quick Reference Guide) tại từng bàn làm việc.',
            ],
            note: 'Con người là yếu tố quyết định chuyển hóa quy trình trên giấy thành kết quả thực tế.',
            deliverable: '100% nhân sự hoàn thành sát hạch và tự tin làm chủ quy trình mới.',
          },
          {
            code: 'Hạng mục 5',
            title: 'Giám sát, đo lường & cải tiến liên tục',
            intro: 'Thiết lập Dashboard điều hành thời gian thực, quản trị chất lượng TQA và tối ưu định kỳ.',
            tasks: [
              'Xây dựng báo cáo tự động theo dõi các chỉ số KPI, FCR, CSAT và tỷ lệ tuân thủ SLA.',
              'Tổ chức các buổi họp hiệu chuẩn định kỳ (Calibration) giữa QA và đội ngũ trưởng nhóm.',
              'Phân tích nguyên nhân gốc rễ (RCA) các ca khiếu nại để cải tiến quy trình liên tục.',
            ],
            note: 'Quản trị bằng dữ liệu giúp nhận diện sớm rủi ro và ra quyết định chính xác.',
            deliverable: 'Dashboard trực quan realtime và cơ chế cải tiến quy trình định kỳ.',
          },
        ];

  // Section 5: Methodology Phases
  const methodology = {
    intro: star.approach || 'Dự án áp dụng phương pháp luận quản trị theo vòng lặp kiểm soát chặt chẽ:',
    phases:
      star.actions && star.actions.length >= 4
        ? star.actions.slice(0, 5).map((act, idx) => ({
            stage: `Giai đoạn 0${idx + 1}`,
            title: act.title,
            desc: act.desc,
          }))
        : [
            {
              stage: 'Giai đoạn 01',
              title: 'Khảo sát & Lập kế hoạch',
              desc: 'Đánh giá hiện trạng, xác định phạm vi, thống nhất mục tiêu và thiết lập kế hoạch chi tiết.',
            },
            {
              stage: 'Giai đoạn 02',
              title: 'Thiết kế & Chuẩn hóa',
              desc: 'Xây dựng quy trình chuẩn, thiết kế tài liệu nghiệp vụ và cấu hình hệ thống công nghệ.',
            },
            {
              stage: 'Giai đoạn 03',
              title: 'Thử nghiệm & Hiệu chuẩn',
              desc: 'Vận hành thử nghiệm (Pilot) trên phạm vi giới hạn, đo lường phản hồi và tinh chỉnh quy trình.',
            },
            {
              stage: 'Giai đoạn 04',
              title: 'Triển khai diện rộng',
              desc: 'Đào tạo toàn diện đội ngũ, chuyển giao công nghệ và chính thức đưa vào vận hành ổn định.',
            },
            {
              stage: 'Giai đoạn 05',
              title: 'Giám sát & Tối ưu hóa',
              desc: 'Theo dõi chỉ số qua Dashboard thời gian thực, kiểm toán chất lượng và cải tiến liên tục.',
            },
          ],
    outro: 'Mô hình triển khai theo lộ trình cuốn chiếu giúp giảm thiểu tối đa rủi ro gián đoạn dịch vụ và bảo đảm thích ứng cao.',
  };

  // Section 6: Metrics Table (7 chiều đo lường cốt lõi)
  const metrics = {
    intro: 'Hệ thống chỉ số hiệu quả được xây dựng toàn diện, cân bằng giữa tốc độ, chất lượng và chi phí:',
    table: [
      {
        category: 'Khả năng đáp ứng & SLA',
        indicators: 'Tỷ lệ phản hồi đúng hạn đạt ≥95%, tỷ lệ cuộc gọi nhỡ/bỏ hàng <3%, thời gian chờ máy <20s.',
      },
      {
        category: 'Tốc độ giải quyết (FCR & AHT)',
        indicators: 'Tỷ lệ giải quyết dứt điểm lần đầu (FCR) ≥82%, tối ưu thời gian xử lý trung bình (AHT) giảm 20-30%.',
      },
      {
        category: 'Chất lượng phục vụ (CSAT & QA)',
        indicators: 'Điểm đánh giá hài lòng khách hàng (CSAT) ≥92%, điểm kiểm toán chất lượng cuộc gọi TQA ≥88/100.',
      },
      {
        category: 'Mức độ nỗ lực khách hàng (CES)',
        indicators: 'Chỉ số CES duy trì ở mức thấp, giảm 40% tình trạng khách hàng phải liên hệ lặp lại do cùng một vấn đề.',
      },
      {
        category: 'Kiểm soát rủi ro & khiếu nại',
        indicators: 'Tỷ lệ khiếu nại phát sinh giảm 35%, 100% sự cố nghiêm trọng được kích hoạt leo thang đúng quy chuẩn.',
      },
      {
        category: 'Năng suất & Chi phí vận hành',
        indicators: 'Năng suất xử lý ticket tăng 25%, giảm chi phí phục vụ trên mỗi tương tác nhờ tự động hóa.',
      },
      {
        category: 'Gắn kết & Phát triển nhân sự',
        indicators: 'Tỷ lệ tuân thủ quy trình đạt ≥96%, thời gian đào tạo tân binh rút ngắn 40%, tỷ lệ nghỉ việc giảm rõ rệt.',
      },
    ],
    outro: 'Mọi chỉ số đều được tự động hóa trích xuất từ dữ liệu thực tế và phân tích xu hướng phục vụ chiến lược kinh doanh.',
  };

  // Section 7: PM Roles (7 trách nhiệm lãnh đạo thực chiến)
  const pmRoles = {
    intro: `Với vai trò ${project.role}, trách nhiệm quản trị bao quát toàn bộ vòng đời dự án:`,
    items: [
      {
        role: 'Hoạch định chiến lược & Mục tiêu',
        desc: 'Chuyển hóa mục tiêu tăng trưởng của công ty thành các chỉ tiêu vận hành cụ thể cho từng nhóm nghiệp vụ.',
      },
      {
        role: 'Thiết kế kiến trúc vận hành',
        desc: 'Trực tiếp chỉ đạo xây dựng luồng quy trình, tiêu chuẩn dịch vụ và cơ cấu tổ chức bộ máy phục vụ.',
      },
      {
        role: 'Điều phối & Quản trị nguồn lực',
        desc: 'Hoạch định định biên nhân sự, phân bổ ngân sách dự án và lựa chọn đối tác công nghệ phù hợp nhất.',
      },
      {
        role: 'Kết nối liên phòng ban',
        desc: 'Chủ trì cơ chế phối hợp giữa CSKH với các phòng ban liên quan, tháo gỡ điểm nghẽn và thống nhất quyền lợi khách hàng.',
      },
      {
        role: 'Kiểm soát chất lượng & Rủi ro',
        desc: 'Thiết lập khung kiểm soát tuân thủ, giám sát rủi ro vận hành và chủ động ứng phó trước khủng hoảng dịch vụ.',
      },
      {
        role: 'Đào tạo & Phát triển nhân tài',
        desc: 'Xây dựng văn hóa phục vụ từ tâm, truyền cảm hứng và bồi dưỡng đội ngũ quản lý kế thừa năng động.',
      },
      {
        role: 'Đo lường & Cải tiến liên tục',
        desc: 'Điều hành dựa trên dữ liệu Dashboard, phân tích phản hồi VoC để thúc đẩy nâng cấp sản phẩm và dịch vụ.',
      },
    ],
  };

  // Section 8: Expected Outcomes (6 kết quả kinh doanh định lượng)
  const resultsList = star.results && star.results.length > 0 ? star.results : [];
  const expectedOutcomes = {
    intro: 'Những chuyển biến mang tính đột phá và giá trị lâu dài dự án mang lại cho tổ chức:',
    items: [
      {
        dimension: 'Tổ chức tinh gọn & Minh bạch',
        desc:
          resultsList[0] ||
          'Cơ cấu tổ chức rõ ràng, phân định minh bạch trách nhiệm, xóa bỏ hoàn toàn hiện tượng đùn đẩy công việc.',
      },
      {
        dimension: 'Vận hành chuẩn mực & Nhất quán',
        desc:
          resultsList[1] ||
          'Toàn bộ quy trình được văn bản hóa, chuẩn hóa trên mọi kênh giao tiếp, duy trì chất lượng dịch vụ ổn định.',
      },
      {
        dimension: 'Đội ngũ chuyên nghiệp & Tự chủ',
        desc:
          resultsList[2] ||
          'Nhân sự được trang bị đầy đủ công cụ và kiến thức, chủ động giải quyết sự vụ và nâng cao chỉ số gắn kết.',
      },
      {
        dimension: 'Công nghệ tập trung & Thông minh',
        desc:
          resultsList[3] ||
          'Hệ sinh thái công cụ hỗ trợ liên thông dữ liệu, xóa tan các ốc đảo thông tin và tự động hóa thao tác lặp lại.',
      },
      {
        dimension: 'Trải nghiệm khách hàng vượt trội',
        desc:
          'Gia tăng chỉ số CSAT và NPS, giảm tối đa nỗ lực khách hàng và củng cố niềm tin yêu thương hiệu sâu sắc.',
      },
      {
        dimension: 'Hiệu quả chi phí & Tăng trưởng',
        desc:
          'Tối ưu hóa chi phí vận hành trên mỗi tương tác, bảo vệ doanh thu từ việc giữ chân khách hàng trung thành dài lâu.',
      },
    ],
    outro: 'Dự án đã xác lập nền móng vững chãi để phòng CSKH trở thành trung tâm tạo dựng giá trị chiến lược cho doanh nghiệp.',
  };

  // Section 9: Philosophy
  const philosophy = {
    paragraphs: [
      `Một dự án quản trị CSKH xuất sắc không chỉ nằm ở việc triển khai các phần mềm hiện đại hay ban hành hàng chục trang quy trình, mà là xây dựng được một hệ thống vận hành có linh hồn — nơi mỗi nhân viên hiểu rõ giá trị công việc của mình và luôn đặt trải nghiệm khách hàng ở vị trí trung tâm.`,
      `Khi công nghệ phục vụ con người, quy trình giải phóng sự sáng tạo và dữ liệu soi đường cho từng quyết định, bộ phận Chăm Sóc Khách Hàng sẽ chuyển mình từ một trung tâm chi phí (Cost Center) thành một trung tâm tạo dựng niềm tin và gia tăng giá trị thương hiệu (Value Center).`,
    ],
    coreMessage:
      project.quote ||
      'Khách hàng là trung tâm của mọi hành động — Tận tâm, Thấu hiểu và Đồng hành bền vững.',
  };

  return {
    subtitleEn,
    tagline,
    overview,
    context: {
      intro: star.situation || defaultChallenges[0],
      challenges,
      conclusion: 'Dự án giải quyết toàn diện bài toán trên bằng cách tích hợp hài hòa cả bốn yếu tố: Cơ cấu đúng, Quy trình chuẩn, Công nghệ thông minh và Đo lường bằng dữ liệu thực.',
    },
    objectives,
    scopeItems,
    methodology,
    metrics,
    pmRoles,
    expectedOutcomes,
    philosophy,
  };
}
