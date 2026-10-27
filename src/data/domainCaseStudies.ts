export interface DomainCaseStudy {
  domainId: string;
  domainName: string;
  title: string; // 4-word title
  client: string;
  duration: string;
  problem: {
    title: string;
    description: string;
    painPoints: string[];
  };
  solution: {
    title: string;
    description: string;
    keyActions: string[];
  };
  impact: {
    title: string;
    roiSummary: string;
    metrics: { label: string; value: string; diff: string }[];
  };
}

export const DOMAIN_CASE_STUDIES: Record<string, DomainCaseStudy> = {
  '01': {
    domainId: '01',
    domainName: 'Dịch vụ viễn thông',
    title: 'Tối ưu hóa tổng đài',
    client: 'MobiFone & Đối tác viễn thông',
    duration: '2016 – 2021',
    problem: {
      title: 'Tắc nghẽn giờ cao điểm',
      description: 'Lưu lượng cuộc gọi tăng đột biến vào khung giờ cao điểm dẫn đến tỷ lệ rớt cuộc gọi 12%, thời gian chờ máy kéo dài và áp lực lớn lên điện thoại viên.',
      painPoints: [
        'AHT trung bình lên đến 380 giây gây ứ đọng',
        'Tỷ lệ giải quyết lần đầu FCR chỉ đạt 68%',
        'Hệ thống định tuyến chưa phân luồng kỹ năng',
      ],
    },
    solution: {
      title: 'Tái cấu trúc luồng gọi',
      description: 'Triển khai định tuyến cuộc gọi theo mức độ ưu tiên và chuyên môn nghiệp vụ (Skills-based Routing), đồng thời tích hợp màn hình hỗ trợ tra cứu thông tin khách hàng thời gian thực.',
      keyActions: [
        'Chuẩn hóa kịch bản xử lý SOP 12 bước rút gọn',
        'Thiết lập hệ thống giám sát KPI thời gian thực',
        'Tổ chức đào tạo nâng chuẩn kỹ năng cho 130 nhân sự',
      ],
    },
    impact: {
      title: 'Hiệu suất vượt chỉ tiêu',
      roiSummary: 'Rút ngắn 26% thời gian xử lý, đưa CSAT đạt ngưỡng 94% và giảm đáng kể khiếu nại khách hàng.',
      metrics: [
        { label: 'CSAT hài lòng', value: '94%', diff: '+13%' },
        { label: 'AHT xử lý', value: '280s', diff: '-100s' },
        { label: 'FCR lần đầu', value: '89%', diff: '+21%' },
        { label: 'Tỷ lệ rớt mạng', value: '< 2%', diff: '-10%' },
      ],
    },
  },
  '02': {
    domainId: '02',
    domainName: 'Thương mại điện tử',
    title: 'Xử lý đơn bão sale',
    client: 'Shopee & VED E-Commerce',
    duration: '2019 – 2022',
    problem: {
      title: 'Quá tải mùa cao điểm',
      description: 'Các sự kiện Siêu Sale 11.11, 12.12 bùng nổ lượng đơn khiến khối lượng khiếu nại hoàn đơn và giao trễ tăng gấp 5 lần so với ngày thường.',
      painPoints: [
        'Thời gian phản hồi khiếu nại kéo dài trên 48 giờ',
        'Tồn đọng hơn 15.000 vé hỗ trợ chưa phân loại',
        'Chi phí nhân sự trực ca tăng 40% nhưng hiệu quả thấp',
      ],
    },
    solution: {
      title: 'Phân luồng thông minh AI',
      description: 'Xây dựng mô hình phân loại tự động vé hỗ trợ theo cấp độ khẩn cấp kết hợp quy trình hoàn tiền nhanh cho đơn hàng hợp lệ.',
      keyActions: [
        'Ứng dụng kịch bản phản hồi tức thì đa kênh',
        'Thành lập biệt đội phản ứng nhanh cho khách hàng thân thiết',
        'Tối ưu quy trình phối hợp giữa kho vận và vận hành',
      ],
    },
    impact: {
      title: 'Xử lý thần tốc khiếu nại',
      roiSummary: 'Giải quyết 92% khiếu nại trong vòng 12 giờ, tiết kiệm 25% ngân sách nhân sự tăng ca.',
      metrics: [
        { label: 'Xử lý dưới 12h', value: '92%', diff: '+44%' },
        { label: 'CSAT bão sale', value: '96%', diff: '+18%' },
        { label: 'Tiết kiệm chi phí', value: '25%', diff: 'Tối ưu' },
        { label: 'Năng suất nhân viên', value: '+35%', diff: 'Vượt trội' },
      ],
    },
  },
  '03': {
    domainId: '03',
    domainName: 'Dịch vụ bảo hiểm',
    title: 'Số hóa bồi thường bảo hiểm',
    client: 'Generali & Đối tác bảo hiểm',
    duration: '2017 – 2020',
    problem: {
      title: 'Hồ sơ xét duyệt chậm',
      description: 'Quy trình tiếp nhận và thẩm định hồ sơ bồi thường sức khỏe phần lớn qua giấy tờ thủ công, thời gian hoàn tất từ 7 đến 10 ngày làm việc.',
      painPoints: [
        'Khách hàng bức xúc vì quy trình nộp chứng từ phức tạp',
        'Tỷ lệ sai sót thông tin và thiếu chứng từ lên đến 22%',
        'Khó kiểm soát rủi ro trục lợi bồi thường bảo hiểm',
      ],
    },
    solution: {
      title: 'Cổng tiếp nhận trực tuyến',
      description: 'Số hóa toàn bộ luồng tiếp nhận hồ sơ qua ứng dụng và cổng thông tin trực tuyến, chuẩn hóa bộ tiêu chí thẩm định nhanh không chạm.',
      keyActions: [
        'Tích hợp luồng kiểm tra chéo tự động thông tin hợp đồng',
        'Xây dựng quy chuẩn giao tiếp thấu cảm cho chuyên viên tư vấn',
        'Rút ngắn các bước phê duyệt nội bộ từ 5 cấp xuống 2 cấp',
      ],
    },
    impact: {
      title: 'Thẩm định hồ sơ siêu tốc',
      roiSummary: 'Rút ngắn thời gian chi trả bồi thường xuống dưới 48 giờ, nâng tỷ lệ giữ chân khách hàng lên 98%.',
      metrics: [
        { label: 'Thời gian chi trả', value: '< 48h', diff: '-70%' },
        { label: 'Độ chính xác dữ liệu', value: '99.5%', diff: '+8%' },
        { label: 'CSAT bảo hiểm', value: '95%', diff: '+15%' },
        { label: 'Tỷ lệ tái tục', value: '98%', diff: '+6%' },
      ],
    },
  },
  '04': {
    domainId: '04',
    domainName: 'Game eSports',
    title: 'Bảo vệ tài khoản game',
    client: 'Garena & VED eSports',
    duration: '2014 – 2018',
    problem: {
      title: 'Tranh chấp tài khoản tăng vọt',
      description: 'Trong các giải đấu thể thao điện tử quy mô lớn, lượng yêu cầu khôi phục tài khoản bị xâm phạm và tố cáo gian lận tăng đột biến.',
      painPoints: [
        'Thời gian xác minh quyền sở hữu tài khoản mất 72 giờ',
        'Ảnh hưởng đến trải nghiệm game thủ và tiến độ giải đấu',
        'Nhiều vụ khiếu nại tranh chấp vật phẩm ảo phức tạp',
      ],
    },
    solution: {
      title: 'Xác thực đa lớp chuyên biệt',
      description: 'Thiết lập quy trình định danh chủ sở hữu dựa trên dữ liệu lịch sử đăng nhập kết hợp cơ chế hỗ trợ ưu tiên trực tiếp cho tuyển thủ và streamer.',
      keyActions: [
        'Cung cấp cổng tự phục hồi tài khoản thông minh 24/7',
        'Xây dựng luồng giám sát gian lận và khóa tự động',
        'Đào tạo đội ngũ hỗ trợ nắm chắc luật thể thức thi đấu',
      ],
    },
    impact: {
      title: 'Khôi phục tài khoản tức thì',
      roiSummary: '90% tài khoản chính chủ được giải cứu trong vòng 2 giờ, nâng độ tín nhiệm của cộng đồng game thủ lên mức cao nhất.',
      metrics: [
        { label: 'Xử lý trong 2h', value: '90%', diff: '+60%' },
        { label: 'Độ chính xác minh', value: '99.8%', diff: 'Tuyệt đối' },
        { label: 'Hài lòng cộng đồng', value: '93%', diff: '+22%' },
        { label: 'Sự cố giải đấu', value: '0 vụ', diff: 'An toàn' },
      ],
    },
  },
  '05': {
    domainId: '05',
    domainName: 'Thanh toán điện tử',
    title: 'Đối soát hoàn tiền tức thì',
    client: 'MoMo & Finviet & TrueMoney',
    duration: '2020 – 2024',
    problem: {
      title: 'Lỗi giao dịch liên ngân hàng',
      description: 'Giao diện trung gian thanh toán giữa ví điện tử và cổng ngân hàng bị gián đoạn giờ cao điểm dẫn đến tình trạng trừ tiền nhưng chưa nhận hàng.',
      painPoints: [
        'Khách hàng lo lắng khi tài khoản bị trừ nhưng giao dịch treo',
        'Thời gian đối soát thủ công giữa các bên mất 3 đến 5 ngày',
        'Nguy cơ tổn thất uy tín thương hiệu dịch vụ tài chính',
      ],
    },
    solution: {
      title: 'Hệ thống đối soát tự động',
      description: 'Triển khai cơ chế tự động bù trừ và hoàn tiền trong vòng 15 phút cho các giao dịch được xác nhận lỗi cổng kết nối.',
      keyActions: [
        'Cảnh báo sớm biến động bất thường của cổng thanh toán',
        'Tự động gửi tin nhắn trấn an và cập nhật trạng thái tiền về',
        'Chuẩn hóa chính sách bảo đảm quyền lợi tài chính khách hàng',
      ],
    },
    impact: {
      title: 'Hoàn tiền tức thì minh bạch',
      roiSummary: '98% giao dịch lỗi được hoàn tiền tự động trong 15 phút, tỷ lệ khiếu nại qua cơ quan quản lý giảm về mức 0.',
      metrics: [
        { label: 'Hoàn tiền tự động', value: '98%', diff: '< 15 phút' },
        { label: 'Giảm khiếu nại', value: '-85%', diff: 'Đột phá' },
        { label: 'CSAT tài chính', value: '96%', diff: '+14%' },
        { label: 'Thời gian đối soát', value: 'Realtime', diff: '-95%' },
      ],
    },
  },
  '06': {
    domainId: '06',
    domainName: 'Xây dựng hệ thống',
    title: 'Hợp nhất dữ liệu doanh nghiệp',
    client: 'Hệ thống CRM ERP Doanh nghiệp',
    duration: '2018 – Hiện tại',
    problem: {
      title: 'Dữ liệu phân mảnh đa nguồn',
      description: 'Doanh nghiệp vận hành song song nhiều phần mềm rời rạc (bán hàng, kho, kế toán, CSKH), dữ liệu không đồng bộ dẫn đến báo cáo chậm 3 ngày.',
      painPoints: [
        'Lãnh đạo thiếu số liệu thời gian thực để ra quyết định',
        'Nhân viên tốn 30% thời gian mỗi ngày copy dữ liệu qua lại',
        'Chi phí duy trì nhiều phần mềm riêng biệt quá tốn kém',
      ],
    },
    solution: {
      title: 'Nền tảng vận hành tập trung',
      description: 'Thiết kế kiến trúc hệ thống dữ liệu tập trung (Unified Platform), kết nối API hai chiều giữa Call Center, CRM và hệ thống kế toán quản trị.',
      keyActions: [
        'Xây dựng bảng điều khiển quản trị (Executive Dashboard)',
        'Tự động hóa luồng đồng bộ khách hàng và đơn hàng',
        'Thiết lập chính sách an toàn bảo mật dữ liệu cấp doanh nghiệp',
      ],
    },
    impact: {
      title: 'Báo cáo thời gian thực',
      roiSummary: 'Tốc độ ra quyết định tăng gấp 3 lần, loại bỏ hoàn toàn sai số đồng bộ và tiết kiệm 30% chi phí bản quyền công nghệ.',
      metrics: [
        { label: 'Thời gian báo cáo', value: 'Realtime', diff: '-72h' },
        { label: 'Tiết kiệm phần mềm', value: '30%', diff: 'Hàng năm' },
        { label: 'Năng suất vận hành', value: '+40%', diff: 'Tối ưu' },
        { label: 'Sai số đối chiếu', value: '0.01%', diff: 'Chuẩn xác' },
      ],
    },
  },
};

export const DOMAIN_BEFORE_AFTER_DATA: Record<string, {
  domainId: string;
  domainName: string;
  tagline: string;
  summary: string;
  metrics: {
    title: string;
    unit: string;
    beforeVal: string;
    afterVal: string;
    diffText: string;
    isPositive: boolean;
    beforeSub: string;
    afterSub: string;
  }[];
}> = {
  '01': {
    domainId: '01',
    domainName: 'Dịch vụ viễn thông',
    tagline: 'Chỉ số đo lường thực tế',
    summary: 'So sánh hiệu quả vận hành trước và sau khi triển khai chuẩn hóa quy trình Contact Center viễn thông.',
    metrics: [
      {
        title: 'Chỉ số hài lòng khách hàng',
        unit: '% CSAT',
        beforeVal: '81',
        afterVal: '94',
        diffText: '+13% Hài lòng',
        isPositive: true,
        beforeSub: 'Nhiều khiếu nại nghẽn cước',
        afterSub: 'Trải nghiệm mượt mà đa kênh',
      },
      {
        title: 'Thời gian xử lý cuộc gọi',
        unit: 'giây / cuộc',
        beforeVal: '380',
        afterVal: '280',
        diffText: '-26% Thời gian',
        isPositive: true,
        beforeSub: 'Kịch bản dài, tra cứu chậm',
        afterSub: 'SOP rút gọn, CRM tích hợp',
      },
      {
        title: 'Tỷ lệ giải quyết lần đầu',
        unit: '% FCR',
        beforeVal: '68',
        afterVal: '89',
        diffText: '+21% Giải quyết',
        isPositive: true,
        beforeSub: 'Phải chuyển máy nhiều lần',
        afterSub: 'Định tuyến chuẩn chuyên môn',
      },
      {
        title: 'Tỷ lệ cuộc gọi rớt',
        unit: '% Rớt mạng',
        beforeVal: '12',
        afterVal: '1.8',
        diffText: '-85% Nghẽn mạng',
        isPositive: true,
        beforeSub: 'Quá tải vào giờ vàng',
        afterSub: 'Cân bằng tải luồng gọi tự động',
      },
    ],
  },
  '02': {
    domainId: '02',
    domainName: 'Thương mại điện tử',
    tagline: 'Chỉ số đo lường thực tế',
    summary: 'Hiệu quả tối ưu vận hành xử lý khiếu nại và đổi trả hàng trong các mùa Siêu Sale bão đơn.',
    metrics: [
      {
        title: 'Thời gian đóng khiếu nại',
        unit: 'giờ xử lý',
        beforeVal: '48',
        afterVal: '12',
        diffText: '-75% Rút ngắn',
        isPositive: true,
        beforeSub: 'Chờ đối soát thủ công',
        afterSub: 'Tự động duyệt đơn hoàn tiền',
      },
      {
        title: 'Điểm số hài lòng người dùng',
        unit: '% CSAT',
        beforeVal: '78',
        afterVal: '96',
        diffText: '+18% Hài lòng',
        isPositive: true,
        beforeSub: 'Khách hàng hủy đơn do chờ lâu',
        afterSub: 'Xử lý thần tốc khách VIP',
      },
      {
        title: 'Tồn đọng phiếu hỗ trợ',
        unit: 'vé tồn / ngày',
        beforeVal: '3.200',
        afterVal: '180',
        diffText: '-94% Tồn đọng',
        isPositive: true,
        beforeSub: 'Tắc nghẽn hộp thư hỗ trợ',
        afterSub: 'Phân loại tự động thông minh',
      },
      {
        title: 'Chi phí nhân sự tăng ca',
        unit: '% Ngân sách',
        beforeVal: '100',
        afterVal: '75',
        diffText: '-25% Chi phí',
        isPositive: true,
        beforeSub: 'Thêm ca đêm nhưng năng suất thấp',
        afterSub: 'Tối ưu phân ca theo biểu đồ tải',
      },
    ],
  },
  '03': {
    domainId: '03',
    domainName: 'Dịch vụ bảo hiểm',
    tagline: 'Chỉ số đo lường thực tế',
    summary: 'Bứt phá quy trình thẩm định hồ sơ chi trả quyền lợi bảo hiểm từ thủ công sang tự động.',
    metrics: [
      {
        title: 'Thời gian xét duyệt hồ sơ',
        unit: 'ngày làm việc',
        beforeVal: '8.5',
        afterVal: '1.8',
        diffText: '-78% Thời gian',
        isPositive: true,
        beforeSub: 'Nộp giấy tờ tận quầy',
        afterSub: 'Nộp trực tuyến, duyệt cấp tốc',
      },
      {
        title: 'Tỷ lệ hồ sơ thiếu sót',
        unit: '% Lỗi chứng từ',
        beforeVal: '22',
        afterVal: '2.5',
        diffText: '-88% Lỗi hồ sơ',
        isPositive: true,
        beforeSub: 'Bổ sung giấy tờ nhiều lượt',
        afterSub: 'Cảnh báo thiếu mục tức thì',
      },
      {
        title: 'Độ hài lòng người tham gia',
        unit: '% CSAT',
        beforeVal: '80',
        afterVal: '95',
        diffText: '+15% Hài lòng',
        isPositive: true,
        beforeSub: 'Nghi ngại thủ tục bảo hiểm',
        afterSub: 'Minh bạch từng bước tiến độ',
      },
      {
        title: 'Tỷ lệ duy trì hợp đồng',
        unit: '% Tái tục',
        beforeVal: '88',
        afterVal: '98',
        diffText: '+10% Gắn bó',
        isPositive: true,
        beforeSub: 'Khách hàng chuyển đơn vị khác',
        afterSub: 'Tin cậy dịch vụ bền vững',
      },
    ],
  },
  '04': {
    domainId: '04',
    domainName: 'Game eSports',
    tagline: 'Chỉ số đo lường thực tế',
    summary: 'Tối ưu hóa thời gian xử lý khiếu nại tài khoản và bảo mật giải đấu thể thao điện tử.',
    metrics: [
      {
        title: 'Thời gian cứu tài khoản',
        unit: 'giờ khôi phục',
        beforeVal: '72',
        afterVal: '2',
        diffText: '-97% Cấp tốc',
        isPositive: true,
        beforeSub: 'Xác minh qua email mất 3 ngày',
        afterSub: 'Định danh tự động dưới 2 giờ',
      },
      {
        title: 'Giải quyết ngay lần đầu',
        unit: '% FCR',
        beforeVal: '62',
        afterVal: '90',
        diffText: '+28% Dứt điểm',
        isPositive: true,
        beforeSub: 'Game thủ phải gửi lại nhiều lần',
        afterSub: 'Luồng chuyên biệt xử lý 1 chạm',
      },
      {
        title: 'Hài lòng cộng đồng game',
        unit: '% CSAT',
        beforeVal: '71',
        afterVal: '93',
        diffText: '+22% Hài lòng',
        isPositive: true,
        beforeSub: 'Bức xúc trên các diễn đàn',
        afterSub: 'Cộng đồng đánh giá 5 sao',
      },
      {
        title: 'Gián đoạn trận đấu giải',
        unit: 'sự cố / mùa',
        beforeVal: '14',
        afterVal: '0',
        diffText: '100% Hoàn hảo',
        isPositive: true,
        beforeSub: 'Lỗi tài khoản làm trễ thi đấu',
        afterSub: 'Đội ngũ trực chiến bảo đảm 0 lỗi',
      },
    ],
  },
  '05': {
    domainId: '05',
    domainName: 'Thanh toán điện tử',
    tagline: 'Chỉ số đo lường thực tế',
    summary: 'Hiệu quả tự động hóa luồng đối soát và hoàn tiền ví điện tử thời gian thực.',
    metrics: [
      {
        title: 'Thời gian đối soát hoàn tiền',
        unit: 'phút xử lý',
        beforeVal: '4.320',
        afterVal: '15',
        diffText: '-99% Tức thì',
        isPositive: true,
        beforeSub: 'Đối soát ngân hàng mất 3 ngày',
        afterSub: 'Bù trừ tự động trong 15 phút',
      },
      {
        title: 'Tỷ lệ hoàn tiền tự động',
        unit: '% Tự động',
        beforeVal: '15',
        afterVal: '98',
        diffText: '+83% Tự động',
        isPositive: true,
        beforeSub: 'Kế toán duyệt tay từng giao dịch',
        afterSub: 'Hệ thống đối soát API tự động',
      },
      {
        title: 'Khiếu nại về tiền bạc',
        unit: 'vụ / 10.000 GD',
        beforeVal: '48',
        afterVal: '2.1',
        diffText: '-95% Khiếu nại',
        isPositive: true,
        beforeSub: 'Khách bức xúc gọi tổng đài',
        afterSub: 'Thông báo trạng thái chủ động',
      },
      {
        title: 'Điểm số tín nhiệm tài chính',
        unit: '% CSAT',
        beforeVal: '82',
        afterVal: '96',
        diffText: '+14% Tín nhiệm',
        isPositive: true,
        beforeSub: 'E ngại thanh toán trực tuyến',
        afterSub: 'Tuyệt đối an tâm giao dịch',
      },
    ],
  },
  '06': {
    domainId: '06',
    domainName: 'Xây dựng hệ thống',
    tagline: 'Chỉ số đo lường thực tế',
    summary: 'Nâng tầm vận hành doanh nghiệp với hạ tầng dữ liệu tập trung và dashboard điều hành.',
    metrics: [
      {
        title: 'Thời gian xuất dữ liệu báo cáo',
        unit: 'giờ hoàn tất',
        beforeVal: '72',
        afterVal: '0.1',
        diffText: 'Thời gian thực',
        isPositive: true,
        beforeSub: 'Chờ kế toán tổng hợp số liệu',
        afterSub: 'Cập nhật tức thì trên Dashboard',
      },
      {
        title: 'Chi phí bản quyền phần mềm',
        unit: '% Ngân sách',
        beforeVal: '100',
        afterVal: '70',
        diffText: '-30% Tiết kiệm',
        isPositive: true,
        beforeSub: 'Mua lẻ nhiều phần mềm rời rạc',
        afterSub: 'Kiến trúc nền tảng hợp nhất',
      },
      {
        title: 'Năng suất vận hành phòng ban',
        unit: '% Tăng trưởng',
        beforeVal: '100',
        afterVal: '140',
        diffText: '+40% Năng suất',
        isPositive: true,
        beforeSub: 'Nhập liệu thủ công trùng lặp',
        afterSub: 'Đồng bộ tự động giữa các khâu',
      },
      {
        title: 'Sai lệch số liệu kiểm toán',
        unit: '% Lệch dữ liệu',
        beforeVal: '6.5',
        afterVal: '0.01',
        diffText: 'Chuẩn xác 100%',
        isPositive: true,
        beforeSub: 'Lệch kho, lệch số tiền cước',
        afterSub: 'Đối chiếu chéo tự động liên tục',
      },
    ],
  },
};
