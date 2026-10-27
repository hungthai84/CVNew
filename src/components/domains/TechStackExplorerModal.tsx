'use client';

import React, { useState } from 'react';
import {
  X,
  Radio,
  Cpu,
  Database,
  ShieldCheck,
  BarChart3,
  ArrowRight,
  CheckCircle2,
  Activity,
  Layers,
  Zap,
  Server,
} from 'lucide-react';
import { formatCardTitle } from '@/lib/utils';
import { SoundEngine } from '@/components/ui/SoundEngine';

export interface TechFlowStage {
  id: string;
  step: string;
  title: string;
  subtitle: string;
  latency: string;
  sla: string;
  protocols: string[];
  operations: string[];
  executiveImpact: string;
}

export interface DomainTechArchitecture {
  domainId: string;
  domainTitle: string;
  architectureName: string;
  throughputBadge: string;
  uptimeBadge: string;
  summary: string;
  stages: TechFlowStage[];
}

export const DOMAIN_TECH_ARCHITECTURES: Record<string, DomainTechArchitecture> = {
  '01': {
    domainId: '01',
    domainTitle: 'Dịch vụ viễn thông',
    architectureName: 'Kiến Trúc Luồng Cuộc Gọi VoIP 4G/5G & CRM Viễn Thông 24/7',
    throughputBadge: '> 100.000 Cuộc gọi & GD/tháng',
    uptimeBadge: 'SLA 99.9% • CSAT 99%',
    summary:
      'Sơ đồ luồng xử lý cuộc gọi viễn thông kết nối trực tiếp hạ tầng trạm phát 4G/5G, tổng đài IP-PBX Avaya/AICC, hệ thống định tuyến IVR thông minh và CRM tra cứu cước thời gian thực tại MobiFone, V247, LBC, HTVC.',
    stages: [
      {
        id: 'stage-1',
        step: 'Tầng 01',
        title: 'Hạ tầng mạng 4G/5G & VoIP SIP',
        subtitle: 'Cổng tiếp nhận cuộc gọi 1800/9090 & Data quốc tế',
        latency: '< 45ms',
        sla: 'Uptime 99.99%',
        protocols: ['SIP Trunking', 'VoIP RTP/SRTP', '4G/5G Core Network', 'Leased-Line Redundancy'],
        operations: [
          'Tiếp nhận đồng thời hàng nghìn cuộc gọi thoại trên đầu số 1800/9090 và kênh quốc tế V247',
          'Tự động cân bằng tải qua 2 đường truyền Leased-line độc lập chống rớt cuộc gọi',
          'Mã hóa tín hiệu thoại chuẩn viễn thông đảm bảo chất lượng âm thanh HD Voice',
        ],
        executiveImpact: 'Đảm bảo kết nối thông suốt 24/7/365 cho hơn 100.000+ cuộc gọi/tháng.',
      },
      {
        id: 'stage-2',
        step: 'Tầng 02',
        title: 'Tổng đài Smart IVR & ACD Router',
        subtitle: 'Phân luồng tự động theo kỹ năng & hạng thuê bao',
        latency: '< 1.2 giây',
        sla: 'Answer SLA > 98%',
        protocols: ['Avaya CallCenter', 'AICC Routing', 'Skill-Based ACD', 'VIP Priority Queue'],
        operations: [
          'Nhận diện thuê bao VIP / Doanh nghiệp và định tuyến thẳng đến bàn chuyên viên cấp cao',
          'Giải quyết tự động 35% yêu cầu tra cứu cước, gói cước 4G/5G ngay trên nhánh Smart IVR',
          'Phân bổ cuộc gọi thông minh cho 50 – 130+ nhân sự/ca theo trạng thái rảnh thực tế',
        ],
        executiveImpact: 'Rút ngắn thời gian chờ nhấc máy xuống dưới 10 giây ngay cả giờ cao điểm.',
      },
      {
        id: 'stage-3',
        step: 'Tầng 03',
        title: 'Hệ thống CRM & Call Center Core',
        subtitle: 'Màn hình hợp nhất 360° lịch sử thuê bao & cước',
        latency: 'Real-time Sync',
        sla: 'FCR đạt 95%+',
        protocols: ['Telecom CRM', 'Billing API', 'CTI Screen-Pop', 'Ticketing Matrix'],
        operations: [
          'Tự động bật thông tin thuê bao (CTI Screen-Pop) ngay khi đổ chuông bàn điện thoại viên',
          'Tích hợp tra cứu lịch sử nạp thẻ, cước quốc tế, trạng thái SIM và cấu hình mạng',
          'Khởi tạo phiếu xử lý sự cố kỹ thuật (Trouble Ticket) chuyển thẳng bộ phận kỹ thuật đài trạm',
        ],
        executiveImpact: 'Giảm 40% thời gian xử lý sự cố và tiết kiệm 20% chi phí giải quyết khiếu nại cước.',
      },
      {
        id: 'stage-4',
        step: 'Tầng 04',
        title: 'Giám sát Chất lượng QA & BCP',
        subtitle: 'Ghi âm 100% cuộc gọi & Kiểm soát rủi ro vận hành',
        latency: '100% Coverage',
        sla: 'Tuân thủ SOP 99%',
        protocols: ['Voice Logger', 'QA Scoring Matrix', 'BCP Failover', 'ISO/COPC Standard'],
        operations: [
          'Ghi âm và lưu trữ 100% cuộc gọi phục vụ chấm điểm chất lượng QA và đối soát khiếu nại',
          'Cảnh báo sớm trên Wallboard khi lưu lượng cuộc gọi vùng miền tăng đột biến do sự cố cáp/trạm',
          'Kích hoạt kịch bản dự phòng BCP chuyển hướng cuộc gọi giữa các trung tâm trong 30 giây',
        ],
        executiveImpact: 'Duy trì điểm hài lòng khách hàng CSAT đạt 99% ổn định nhiều năm liền.',
      },
      {
        id: 'stage-5',
        step: 'Tầng 05',
        title: 'Phân tích Dữ liệu & Báo cáo BI',
        subtitle: 'Dự báo lưu lượng WFM & Tối ưu năng suất ca trực',
        latency: 'Cập nhật mỗi 5p',
        sla: 'Forecast Acc 96%',
        protocols: ['Real-time Wallboard', 'WFM Scheduler', 'KPI Analytics', 'CSAT Auto-Survey'],
        operations: [
          'Gửi khảo sát CSAT tự động qua SMS/USSD ngay sau khi kết thúc cuộc gọi hỗ trợ',
          'Phân tích biểu đồ nhiệt cuộc gọi theo khung giờ để xếp ca tối ưu cho 130+ nhân sự',
          'Tổng hợp báo cáo quản trị AHT, FCR, SLA, CSAT phục vụ Ban Giám đốc ra quyết định',
        ],
        executiveImpact: 'Tăng trưởng doanh thu dịch vụ +32% và giữ tỷ lệ gắn bó nhân sự > 97%.',
      },
    ],
  },
  '02': {
    domainId: '02',
    domainTitle: 'Thương mại điện tử',
    architectureName: 'Kiến Trúc Omnichannel CSKH, Chatbot AI & Chống Gian Lận Mega-Sale',
    throughputBadge: '+120% Đơn hàng Mega-Sale',
    uptimeBadge: 'Chat < 30s • CSAT 98%',
    summary:
      'Hệ sinh thái xử lý đa kênh hợp nhất (Live Chat, Call, Email, In-App Ticket) kết hợp Chatbot AI tự động phân luồng và hệ thống kiểm soát gian lận đơn hàng cho Shopee Vietnam, ShopeePay và Finviet.',
    stages: [
      {
        id: 'stage-1',
        step: 'Tầng 01',
        title: 'Cổng Đa kênh Omnichannel Ingress',
        subtitle: 'Hợp nhất In-App Chat, Hotline, Email & Mạng xã hội',
        latency: '< 150ms',
        sla: 'Chịu tải triệu User',
        protocols: ['Shopee In-App Chat', 'Zendesk Omnichannel', 'Webhook API', 'Social Connectors'],
        operations: [
          'Thu thập toàn bộ yêu cầu từ Người mua, Người bán và Đối tác vận chuyển về một luồng duy nhất',
          'Tự động đồng bộ mã đơn hàng (Order ID), trạng thái vận đơn (Logistics Tracking) vào phiên chat',
          'Chịu tải lưu lượng tăng vọt +120% trong các ngày đôi Mega-Sale (9.9, 11.11, 12.12)',
        ],
        executiveImpact: 'Đáp ứng mượt mà hàng triệu người dùng hoạt động cùng lúc không nghẽn mạch.',
      },
      {
        id: 'stage-2',
        step: 'Tầng 02',
        title: 'Chatbot AI & Auto-Router Phân Luồng',
        subtitle: 'Xử lý tức thì câu hỏi lặp lại & Định tuyến thông minh',
        latency: '< 2 giây',
        sla: 'Chat Wait < 30s',
        protocols: ['AI NLP Chatbot', 'Smart Queue Router', 'Concurrent Chat (4-6x)', 'SLA Prioritizer'],
        operations: [
          'Chatbot AI tự động giải đáp 45%+ yêu cầu tra cứu hành trình đơn hàng và chính sách đổi trả',
          'Tự động phân loại Intent (Hủy đơn, Hoàn tiền, Gian lận, Khiếu nại Shipper) chuyển đúng chuyên viên',
          'Cân bằng phiên chat đồng thời (4–6 phiên/nhân sự) cho đội ngũ 100 – 300+ nhân viên ca trực',
        ],
        executiveImpact: 'Kéo giảm thời gian chờ phản hồi Live Chat xuống dưới 30 giây.',
      },
      {
        id: 'stage-3',
        step: 'Tầng 03',
        title: 'Shopee Admin CRM & Dispute Engine',
        subtitle: 'Phân xử tranh chấp 3 bên & Hoàn tiền tự động',
        latency: 'Real-time API',
        sla: 'FCR đạt 94%',
        protocols: ['Shopee Admin CRM', '3PL Logistics API', 'Escrow Refund Engine', 'FINVIET ECO Core'],
        operations: [
          'Đối chiếu bằng chứng hình ảnh/video mở hộp giữa Người mua – Người bán – Đơn vị vận chuyển',
          'Tích hợp API trực tiếp với các hãng vận chuyển (3PL) để giục phát hàng hoặc thu hồi hoàn trả',
          'Thực thi lệnh hoàn tiền tự động qua ví ShopeePay / Finviet ngay khi xác minh hợp lệ',
        ],
        executiveImpact: 'Giảm 30% tỷ lệ hủy đơn do chậm hỗ trợ, bảo vệ quyền lợi người tiêu dùng.',
      },
      {
        id: 'stage-4',
        step: 'Tầng 04',
        title: 'Fraud Detection & Kiểm soát Rủi ro',
        subtitle: 'Ngăn chặn trục lợi voucher, đơn ảo & chiếm đoạt tài khoản',
        latency: '< 200ms',
        sla: 'Chặn 99.8% đơn ảo',
        protocols: ['Promo Abuse Filter', 'Device Fingerprinting', 'Escalation Matrix', 'QA Audit'],
        operations: [
          'Quét và khóa tự động các tài khoản tạo đơn ảo trục lợi mã giảm giá hoặc phí vận chuyển',
          'Quy trình Escalation khẩn cấp bảo vệ tài khoản người dùng khi phát hiện dấu hiệu đăng nhập lạ',
          'Kiểm toán chất lượng xử lý ticket định kỳ đảm bảo tính minh bạch và công bằng',
        ],
        executiveImpact: 'Tiết kiệm 25% chi phí vận hành (Cost-to-Serve) và ngăn chặn thất thoát khuyến mãi.',
      },
      {
        id: 'stage-5',
        step: 'Tầng 05',
        title: 'Real-time WFM & Power BI Analytics',
        subtitle: 'Điều phối nhân sự theo thời gian thực & Đo lường CSAT',
        latency: 'Live Stream',
        sla: 'CSAT 98%',
        protocols: ['Power BI Dashboard', 'Real-time WFM', 'Backlog Monitor', 'Root-Cause Analytics'],
        operations: [
          'Giám sát trực quan số lượng ticket tồn đọng (Backlog) và tốc độ xử lý theo từng phút',
          'Phân tích nguyên nhân gốc rễ (Root-Cause) phát sinh khiếu nại để đề xuất cải tiến sản phẩm App',
          'Tự động hóa 90% báo cáo hiệu suất ca trực, KPI cá nhân và điểm hài lòng khách hàng',
        ],
        executiveImpact: 'Nâng chỉ số hài lòng khách hàng CSAT lên 98% chuẩn dịch vụ 5 sao.',
      },
    ],
  },
  '03': {
    domainId: '03',
    domainTitle: 'Dịch vụ bảo hiểm',
    architectureName: 'Kiến Trúc Core Bảo Hiểm AS400, VideoCall Tư Vấn & Duyệt Quyền Lợi Số',
    throughputBadge: 'Hàng trăm nghìn Hợp đồng VIP',
    uptimeBadge: 'FCR 95% • CSAT 99%',
    summary:
      'Hệ thống vận hành dịch vụ khách hàng bảo hiểm nhân thọ chuẩn quốc tế tại Prudential & FWD, kết nối Core AS400, tư vấn định danh VideoCall eKYC, ghi âm tuân thủ 100% và cổng giải quyết quyền lợi bảo hiểm trực tuyến.',
    stages: [
      {
        id: 'stage-1',
        step: 'Tầng 01',
        title: 'Cổng Tiếp Nhận Đa Kênh & VideoCall VIP',
        subtitle: 'Hotline chuyên biệt, VideoCall Advisory & Cổng PruOnline',
        latency: 'HD Video/Voice',
        sla: 'VIP Pickup < 5s',
        protocols: ['VideoCall Advisory', 'PruOnline Portal', 'VIP Priority Line', 'Bancassurance Desk'],
        operations: [
          'Tiếp nhận yêu cầu tư vấn hợp đồng bảo hiểm nhân thọ qua kênh Hotline và VideoCall trực tuyến',
          'Nhận diện tự động khách hàng VIP và đối tác ngân hàng Bancassurance ngay khi kết nối',
          'Xác thực danh tính điện tử eKYC an toàn trước khi cung cấp thông tin chi tiết hợp đồng',
        ],
        executiveImpact: 'Mang lại trải nghiệm tư vấn 5 sao chuẩn mực, tin cậy và tận tâm.',
      },
      {
        id: 'stage-2',
        step: 'Tầng 02',
        title: 'Định tuyến Chuyên sâu theo Nghiệp vụ',
        subtitle: 'Phân luồng Điều chỉnh hợp đồng, Đóng phí & Giải quyết quyền lợi',
        latency: '< 1 giây',
        sla: 'SLA đạt 95%+',
        protocols: ['Policy Skill Router', 'Claims Fast-Track', 'Renewal Reminder', 'Callback Automation'],
        operations: [
          'Phân tách thông minh các luồng nghiệp vụ: Thay đổi thông tin hợp đồng, Gia hạn phí, Giải quyết quyền lợi (Claims)',
          'Ưu tiên tối đa cho các ca thông báo sự kiện bảo hiểm và hỗ trợ viện phí khẩn cấp',
          'Hệ thống tự động gọi lại (Auto-Callback) đảm bảo không bỏ nhỡ bất kỳ yêu cầu nào của khách hàng',
        ],
        executiveImpact: 'Nâng tỷ lệ giải quyết ngay từ lần liên hệ đầu tiên (FCR) lên 95%.',
      },
      {
        id: 'stage-3',
        step: 'Tầng 03',
        title: 'Core System AS400 & e-Claims Engine',
        subtitle: 'Quản trị vòng đời hợp đồng & Thẩm định hồ sơ số hóa',
        latency: 'High Integrity',
        sla: 'Duyệt Claims -50% TG',
        protocols: ['Prudential Life AS400', 'Digital Claims Portal', 'Document OCR', 'Policy Lifecycle'],
        operations: [
          'Tra cứu chính xác lịch sử đóng phí, giá trị hoàn lại, quyền lợi bảo hiểm trên hệ thống lõi AS400',
          'Tiếp nhận chứng từ y tế trực tuyến và phối hợp bộ phận thẩm định (Underwriting & Claims) xử lý nhanh',
          'Cập nhật trạng thái giải quyết quyền lợi tự động qua SMS/App cho khách hàng và tư vấn viên',
        ],
        executiveImpact: 'Rút ngắn 50% thời gian duyệt chi trả quyền lợi bảo hiểm cho khách hàng.',
      },
      {
        id: 'stage-4',
        step: 'Tầng 04',
        title: 'Giám sát Tuân thủ Pháp lý & Chuẩn BCP',
        subtitle: 'Ghi âm 100% cuộc gọi tư vấn & Kế hoạch liên tục kinh doanh',
        latency: '100% Audit',
        sla: '100% Compliance',
        protocols: ['100% Voice Recording', 'Legal Compliance QA', 'BCP Disaster Recovery', 'Data Privacy ISO'],
        operations: [
          'Ghi âm và lưu trữ toàn bộ nội dung tư vấn điều khoản hợp đồng đảm bảo minh bạch pháp lý tuyệt đối',
          'Kiểm soát chất lượng cuộc gọi (Welcome Call & Claims Call) theo bộ tiêu chuẩn chất lượng quốc tế',
          'Vận hành mô hình Business Continuity Plan (BCP) phân tán đảm bảo không gián đoạn dịch vụ',
        ],
        executiveImpact: 'Đạt 100% tiêu chuẩn kiểm toán tuân thủ và bảo mật thông tin khách hàng.',
      },
      {
        id: 'stage-5',
        step: 'Tầng 05',
        title: 'Phân tích Giữ chân Khách hàng (Retention BI)',
        subtitle: 'Dự báo rủi ro mất hiệu lực hợp đồng & Chăm sóc chủ động',
        latency: 'Daily Insights',
        sla: 'Retention +15%',
        protocols: ['Retention Analytics', 'NPS / CSAT Dashboard', 'Proactive Care', 'Advisor Feedback Loop'],
        operations: [
          'Phân tích dữ liệu các hợp đồng sắp đến hạn đóng phí để triển khai chiến dịch chăm sóc chủ động',
          'Đo lường chỉ số NPS và CSAT sau mỗi điểm chạm dịch vụ để nâng cấp quy trình phục vụ',
          'Đồng bộ phản hồi khách hàng cho khối Đại lý và Bancassurance cùng phối hợp chăm sóc',
        ],
        executiveImpact: 'Nâng tỷ lệ duy trì hợp đồng (Retention) thêm +15% và đạt CSAT 99%.',
      },
    ],
  },
  '04': {
    domainId: '04',
    domainTitle: 'Trò chơi điện tử',
    architectureName: 'Kiến Trúc Ticket Desk 80.000 Yêu Cầu/Ngày, AI Classifier & Anti-Hack eSports',
    throughputBadge: '80.000+ Tickets/ngày',
    uptimeBadge: 'Bảo mật 99.9% • CSAT 96%',
    summary:
      'Hệ thống trung tâm hỗ trợ game thủ quy mô siêu lớn tại Garena Vietnam (Vietnam Esports - VED), tích hợp AI phân loại ticket tự động, công cụ khôi phục tài khoản/vật phẩm tức thì và giám sát phòng máy GCafe toàn quốc.',
    stages: [
      {
        id: 'stage-1',
        step: 'Tầng 01',
        title: 'Cổng Hỗ trợ Game thủ & Sự kiện eSports',
        subtitle: 'Tiếp nhận 80.000+ yêu cầu/ngày từ hàng chục triệu người chơi',
        latency: '< 50ms',
        sla: '100% Uptime Giải đấu',
        protocols: ['Garena Support Portal', 'In-Game Live Chat', 'GCafe Network Gateway', 'Tournament Desk'],
        operations: [
          'Tiếp nhận lưu lượng cực lớn từ cộng đồng LMHT, FIFA Online, Free Fire và hệ thống phòng máy GCafe',
          'Cơ chế chống quá tải (Rate-Limiting & CDN Caching) khi ra mắt bản cập nhật lớn hoặc giải đấu quốc tế',
          'Xác thực SSO tài khoản Garena và lịch sử thiết bị đăng nhập ngay khi gửi yêu cầu',
        ],
        executiveImpact: 'Vận hành ổn định tuyệt đối trước lưu lượng 80.000+ yêu cầu hỗ trợ mỗi ngày.',
      },
      {
        id: 'stage-2',
        step: 'Tầng 02',
        title: 'AI Ticket Classifier & Smart Queue',
        subtitle: 'Phân loại tự động Sự cố Nạp thẻ, Tài khoản, Lỗi Game & GCafe',
        latency: '< 500ms',
        sla: 'Chat < 30 giây',
        protocols: ['AI Ticket Classifier', 'Priority Event Routing', 'Auto-Response Bot', 'Shift Load Balancer'],
        operations: [
          'Phân loại tự động hàng chục nghìn ticket theo nhóm: Nạp thẻ ShopeePay/AirPay, Hack tài khoản, Lỗi kỹ thuật',
          'Tự động ưu tiên luồng hỗ trợ nóng cho các tuyển thủ, giải đấu eSports và chủ phòng máy VIP GCafe',
          'Điều phối tải thông minh cho đội ngũ 130 – 500+ nhân sự (Game Supporter, Fraud, CSKH, Kỹ thuật)',
        ],
        executiveImpact: 'Đảm bảo tốc độ phản hồi Live Chat dưới 30 giây và đáp ứng 100% SLA.',
      },
      {
        id: 'stage-3',
        step: 'Tầng 03',
        title: 'Garena Customer Desk & Item Recovery',
        subtitle: 'Tra cứu Log Server Game & Khôi phục vật phẩm/tài khoản',
        latency: 'Direct GameDB',
        sla: 'Chính xác 99.9%',
        protocols: ['Garena Customer Desk', 'Game Server Log API', 'Item Rollback Tool', 'GCafe Billing Manager'],
        operations: [
          'Truy xuất trực tiếp log giao dịch trong game để xác minh sự cố mất vật phẩm hoặc lỗi quy đổi Kim Cương/RP',
          'Thực thi quy trình khôi phục tài khoản và hoàn trả vật phẩm an toàn theo đúng thẩm quyền phân cấp',
          'Hỗ trợ kỹ thuật từ xa và cập nhật phần mềm quản lý tính tiền cho hàng chục nghìn phòng máy GCafe',
        ],
        executiveImpact: 'Giải quyết triệt để sự cố ngay từ tuyến đầu, giữ vững niềm tin cộng đồng game thủ.',
      },
      {
        id: 'stage-4',
        step: 'Tầng 04',
        title: 'Anti-Hack, Fraud Control & Account Security',
        subtitle: 'Phát hiện gian lận thanh toán & Bảo vệ tài khoản 99.9%',
        latency: 'Real-time Scan',
        sla: 'An toàn 99.9%',
        protocols: ['Anti-Cheat Telemetry', 'Chargeback Fraud Guard', '2FA Security Lock', 'Abuse Detection'],
        operations: [
          'Phối hợp hệ thống Anti-Cheat khóa tự động các tài khoản sử dụng phần mềm thứ 3 can thiệp game',
          'Kiểm soát và ngăn chặn hành vi gian lận nạp thẻ hoàn tiền (Chargeback Fraud) hoặc lừa đảo phishing',
          'Thiết lập lớp bảo vệ xác thực 2 yếu tố (2FA) và đóng băng tạm thời tài khoản bị xâm nhập để bảo toàn tài sản',
        ],
        executiveImpact: 'Đạt chỉ số an toàn bảo mật tài khoản 99.9%, giảm thiểu tối đa khiếu nại gay gắt.',
      },
      {
        id: 'stage-5',
        step: 'Tầng 05',
        title: 'CS Academy LMS & Community Sentiment BI',
        subtitle: 'Đào tạo chuẩn hóa đội ngũ & Phân tích sức khỏe cộng đồng',
        latency: 'Real-time BI',
        sla: 'CSAT đạt 96%',
        protocols: ['CS Academy LMS', 'Sentiment Analyzer', 'Event War-Room BI', 'QA Calibration'],
        operations: [
          'Đào tạo cập nhật kiến thức bản vá game mới liên tục cho hàng trăm nhân sự qua hệ thống CS Academy LMS',
          'Theo dõi chỉ số cảm xúc cộng đồng (Community Sentiment) trên diễn đàn và mạng xã hội theo thời gian thực',
          'Cung cấp báo cáo tổng hợp lỗi phát sinh sau mỗi bản cập nhật trực tiếp cho студия phát triển game',
        ],
        executiveImpact: 'Duy trì chỉ số hài lòng game thủ CSAT 96% trên quy mô vận hành siêu lớn.',
      },
    ],
  },
  '05': {
    domainId: '05',
    domainTitle: 'Thanh toán điện tử',
    architectureName: 'Kiến Trúc Cổng Thanh Toán NAPAS, Đối Soát Ngân Hàng & AI Risk Engine',
    throughputBadge: 'Xử lý sự cố < 15 phút',
    uptimeBadge: 'Tra soát 99.5% • An toàn 100%',
    summary:
      'Kiến trúc vận hành hỗ trợ giao dịch tài chính số thời gian thực cho Ví MoMo, ShopeePay, Finviet (Ví ECO) và AirPay, kết nối liên thông cổng NAPAS, hơn 40 ngân hàng nội địa/quốc tế và hệ thống phòng chống gian lận AI.',
    stages: [
      {
        id: 'stage-1',
        step: 'Tầng 01',
        title: 'Cổng Tiếp Nhận Giao Dịch & Hỗ Trợ Merchant',
        subtitle: 'Hỗ trợ 24/7 cho Người dùng Ví điện tử & Điểm chấp nhận thanh toán',
        latency: '< 30ms',
        sla: 'Trực chiến 24/7/365',
        protocols: ['In-App FinTech Helpcenter', 'Merchant VIP Hotline', 'QR Payment Gateway', 'eKYC Verification'],
        operations: [
          'Tiếp nhận yêu cầu hỗ trợ nạp/rút tiền, chuyển tiền, thanh toán hóa đơn và quét mã QR 24/7',
          'Kênh hỗ trợ chuyên biệt cho hàng trăm nghìn điểm đại lý Finviet ECO và đối tác Merchant',
          'Tự động đính kèm mã giao dịch (Transaction ID) và trạng thái ví vào phiếu yêu cầu hỗ trợ',
        ],
        executiveImpact: 'Đảm bảo dòng chảy thanh toán không gián đoạn cho hàng triệu giao dịch mỗi ngày.',
      },
      {
        id: 'stage-2',
        step: 'Tầng 02',
        title: 'Auto-Reconciliation & Phân Luồng Sự Cố',
        subtitle: 'Kiểm tra trạng thái giao dịch tự động & Ưu tiên lỗi trừ tiền',
        latency: '< 800ms',
        sla: 'Xử lý < 15 phút',
        protocols: ['Auto-Check Transaction Bot', 'Incident Priority Queue', 'Bank Timeout Detector', 'SLA Escalation'],
        operations: [
          'Bot tự động truy vấn trạng thái giao dịch treo (Pending/Timeout) giữa Ví điện tử và Ngân hàng liên kết',
          'Ưu tiên mức cao nhất (P1) cho các trường hợp khách hàng đã bị trừ tiền ngân hàng nhưng chưa lên số dư ví',
          'Phân bổ tự động cho đội ngũ 60 – 120+ chuyên viên hỗ trợ giao dịch và đối soát ngân hàng',
        ],
        executiveImpact: 'Rút ngắn thời gian giải quyết sự cố giao dịch lỗi xuống dưới 15 phút.',
      },
      {
        id: 'stage-3',
        step: 'Tầng 03',
        title: 'Cổng Kết Nối NAPAS & Core Banking API',
        subtitle: 'Tra soát liên ngân hàng, Đối soát tự động & Hoàn tiền tức thì',
        latency: 'Real-time Ledger',
        sla: 'Đúng hạn 99.5%',
        protocols: ['NAPAS 247 Gateway', 'Core Banking API', 'Automated Clearing', 'Instant Refund Ledger'],
        operations: [
          'Tra cứu trực tiếp trạng thái bút toán trên cổng chuyển mạch tài chính NAPAS và hệ thống ngân hàng đối tác',
          'Thực hiện quy trình đối soát tự động và kích hoạt lệnh hoàn tiền (Refund/Reversal) chính xác tuyệt đối',
          'Tuân thủ chặt chẽ quy định thời hạn tra soát khiếu nại theo tiêu chuẩn Ngân hàng Nhà nước (NHNN)',
        ],
        executiveImpact: 'Đạt tỷ lệ hoàn thành tra soát đúng và trước hạn lên tới 99.5%.',
      },
      {
        id: 'stage-4',
        step: 'Tầng 04',
        title: 'AI Risk Engine & Phòng Chống Rửa Tiền (AML)',
        subtitle: 'Giám sát giao dịch bất thường real-time & Bảo vệ tài sản 100%',
        latency: '< 100ms',
        sla: 'An toàn 100%',
        protocols: ['AI Fraud Detection', 'AML Compliance Rules', 'PCI-DSS Security', 'Account Freeze Guard'],
        operations: [
          'Hệ thống AI Risk Engine chấm điểm rủi ro từng giao dịch theo thời gian thực để chặn hành vi chiếm đoạt',
          'Quy trình phối hợp khẩn cấp phong tỏa giao dịch đáng ngờ và hỗ trợ khách hàng bảo vệ tài khoản',
          'Đảm bảo tuân thủ tiêu chuẩn bảo mật thẻ quốc tế PCI-DSS và quy định phòng chống rửa tiền (AML)',
        ],
        executiveImpact: 'Bảo vệ an toàn 100% tài sản khách hàng và uy tín thương hiệu FinTech.',
      },
      {
        id: 'stage-5',
        step: 'Tầng 05',
        title: 'FinTech BI Dashboard & Cảnh Báo Sớm',
        subtitle: 'Giám sát sức khỏe kết nối ngân hàng & Tối ưu trải nghiệm ví',
        latency: 'Real-time Alert',
        sla: 'CSAT đạt 98%',
        protocols: ['Bank Connection Monitor', 'Transaction Success BI', 'CSAT & CES Analytics', 'Automated Reporting'],
        operations: [
          'Hiển thị biểu đồ tỷ lệ giao dịch thành công của từng ngân hàng để thông báo chủ động khi ngân hàng bảo trì',
          'Đo lường chỉ số nỗ lực của khách hàng (CES) và mức độ hài lòng (CSAT) sau mỗi phiên hỗ trợ',
          'Cung cấp dữ liệu phân tích lỗi giao dịch giúp khối Sản phẩm & Kỹ thuật tối ưu luồng thanh toán 1 chạm',
        ],
        executiveImpact: 'Duy trì điểm hài lòng CSAT 98% trong lĩnh vực tài chính – thanh toán nhạy cảm.',
      },
    ],
  },
  '06': {
    domainId: '06',
    domainTitle: 'Xây dựng hệ thống',
    architectureName: 'Kiến Trúc Tổng Thể Contact Center Chuẩn COPC/ISO, AI Voicebot & Data Warehouse',
    throughputBadge: '10+ Hệ thống Doanh nghiệp',
    uptimeBadge: 'Năng suất +45% • SLA 99%',
    summary:
      'Bản thiết kế kiến trúc chuẩn mực để tư vấn, xây dựng và chuyển giao trọn gói hơn 10+ hệ thống Trung tâm Trải nghiệm Khách hàng (Contact Center) trên nền tảng Cisco, Genesys, Avaya, Zendesk kết hợp AI và BI.',
    stages: [
      {
        id: 'stage-1',
        step: 'Tầng 01',
        title: 'Nền tảng Hạ tầng Cisco / Genesys / Avaya',
        subtitle: 'Thiết kế kiến trúc mạng, tổng đài IP-PBX & Omnichannel',
        latency: 'Enterprise Grade',
        sla: 'Uptime 99.99%',
        protocols: ['Cisco Networking (CCNA)', 'Genesys Cloud / Avaya', 'Windows Server AD (MCSA)', 'High Availability'],
        operations: [
          'Quy hoạch hạ tầng mạng VLAN, VoIP QoS, máy chủ Windows Server Active Directory và bảo mật GPO',
          'Tích hợp đồng bộ các kênh Thoại, Live Chat, Email, Zalo OA, Facebook, Mobile App vào một nền tảng',
          'Thiết kế kiến trúc dự phòng kép (Active-Active / Active-Standby) sẵn sàng mở rộng từ 20 đến 500+ bàn Agent',
        ],
        executiveImpact: 'Triển khai thành công 10+ hệ thống Contact Center hiện đại cho các doanh nghiệp lớn.',
      },
      {
        id: 'stage-2',
        step: 'Tầng 02',
        title: 'Hệ thống AI Chatbot, Voicebot & Smart Routing',
        subtitle: 'Tự động hóa điểm chạm đầu tiên & Phân bổ nguồn lực thông minh',
        latency: '< 800ms',
        sla: 'Tự động hóa 40%+',
        protocols: ['AI Voicebot / Chatbot', 'Omnichannel ACD', 'Intent Recognition', 'Auto-Callback Queue'],
        operations: [
          'Tích hợp AI Chatbot và Voicebot tự động xử lý các tác vụ tra cứu, đặt lịch và xác nhận thông tin cơ bản',
          'Thiết lập ma trận định tuyến theo kỹ năng (Skill-based Routing) và giá trị vòng đời khách hàng (CLV)',
          'Chuyển giao mượt mà ngữ cảnh hội thoại từ Bot sang Nhân sự thật mà khách hàng không phải lặp lại thông tin',
        ],
        executiveImpact: 'Tăng +45% năng suất vận hành tổng thể ngay sau khi chuẩn hóa và số hóa.',
      },
      {
        id: 'stage-3',
        step: 'Tầng 03',
        title: 'CRM Custom / Zendesk & Chuẩn hóa SOP',
        subtitle: 'Cổng làm việc hợp nhất SDP & Bộ quy trình SOP toàn diện',
        latency: 'Unified Workspace',
        sla: 'Tuân thủ SLA 99%',
        protocols: ['Zendesk / Custom CRM', 'RESTful API / ERP Sync', 'SOP Knowledge Base', 'SLA Escalation Engine'],
        operations: [
          'Thiết kế giao diện làm việc hợp nhất (Unified Agent Desktop) chuẩn UI/UX giúp giảm thao tác thừa',
          'Xây dựng trọn bộ Quy trình Vận hành Chuẩn (SOP), Kịch bản xử lý tình huống và Thư viện Tri thức (KB)',
          'Kết nối API hai chiều giữa CRM với hệ thống ERP, Core Banking, Billing và Logistics của doanh nghiệp',
        ],
        executiveImpact: 'Đảm bảo mức độ tuân thủ cam kết dịch vụ SLA đạt 99% theo chuẩn kiểm toán.',
      },
      {
        id: 'stage-4',
        step: 'Tầng 04',
        title: 'Quản trị Chất lượng COPC/ISO & Đào tạo LMS',
        subtitle: 'Khung kiểm soát chất lượng QA, Speech Analytics & E-learning',
        latency: '100% Standardized',
        sla: 'Onboarding -35% TG',
        protocols: ['COPC / ISO Framework', 'Speech Analytics QA', 'E-learning LMS (TTT)', 'Competency Matrix'],
        operations: [
          'Áp dụng tiêu chuẩn vận hành quốc tế COPC và ISO vào đánh giá chất lượng phục vụ định kỳ',
          'Ứng dụng công nghệ phân tích giọng nói (Speech Analytics) tự động phát hiện từ khóa nhạy cảm',
          'Xây dựng hệ thống đào tạo nội bộ E-learning LMS và khung năng lực rút ngắn 35% thời gian hội nhập',
        ],
        executiveImpact: 'Chuẩn hóa chất lượng đội ngũ đồng đều, giảm mạnh tỷ lệ biến động nhân sự.',
      },
      {
        id: 'stage-5',
        step: 'Tầng 05',
        title: 'Data Warehouse & Báo cáo Quản trị BI Tự động',
        subtitle: 'Hệ thống đo lường KPI/OKR C-Level & Tối ưu hóa ROI',
        latency: 'Real-time BI',
        sla: '90% Auto-Report',
        protocols: ['Enterprise Data Warehouse', 'Power BI / Tableau', 'C-Level Executive KPI', 'TCO & ROI Modeling'],
        operations: [
          'Tập trung dữ liệu từ mọi điểm chạm về Data Warehouse để phân tích hành trình khách hàng đa chiều',
          'Thiết lập hệ thống Dashboard Power BI tự động hóa 90% báo cáo vận hành cho Ban Điều Hành',
          'Đo lường chính xác hiệu quả đầu tư (ROI) và tối ưu tổng chi phí sở hữu (TCO) cho doanh nghiệp',
        ],
        executiveImpact: 'Chuyển đổi trung tâm CSKH từ Trung tâm Chi phí thành Trung tâm Tạo Giá trị & Giữ chân KH.',
      },
    ],
  },
};

export interface TechStackExplorerModalProps {
  domainId: string;
  selectedTechBullet: string;
  allTechBullets: string[];
  accentColor: string;
  isDark: boolean;
  onSelectTechBullet: (bullet: string) => void;
  onClose: () => void;
}

export const TechStackExplorerModal: React.FC<TechStackExplorerModalProps> = ({
  domainId,
  selectedTechBullet,
  allTechBullets,
  accentColor,
  isDark,
  onSelectTechBullet,
  onClose,
}) => {
  const arch = DOMAIN_TECH_ARCHITECTURES[domainId] || DOMAIN_TECH_ARCHITECTURES['01'];

  // Tự động chọn tầng kiến trúc phù hợp nhất với dòng công nghệ người dùng vừa nhấp
  const getInitialStageIndex = (bullet: string): number => {
    const lower = bullet.toLowerCase();
    if (lower.includes('mạng') || lower.includes('4g') || lower.includes('5g') || lower.includes('voip') || lower.includes('cisco')) {
      return 0;
    }
    if (lower.includes('chatbot') || lower.includes('phân luồng') || lower.includes('ai')) {
      return 1;
    }
    if (lower.includes('crm') || lower.includes('call center') || lower.includes('as400') || lower.includes('ticket') || lower.includes('napas')) {
      return 2;
    }
    if (lower.includes('ghi âm') || lower.includes('gian lận') || lower.includes('fraud') || lower.includes('risk')) {
      return 3;
    }
    if (lower.includes('bi') || lower.includes('dashboard') || lower.includes('warehouse') || lower.includes('wfm')) {
      return 4;
    }
    return 2;
  };

  const [activeStageIdx, setActiveStageIdx] = useState<number>(() => getInitialStageIndex(selectedTechBullet));

  const activeStage = arch.stages[activeStageIdx] || arch.stages[0];

  const getStageIcon = (idx: number) => {
    switch (idx) {
      case 0:
        return <Radio className="w-4 h-4" />;
      case 1:
        return <Cpu className="w-4 h-4" />;
      case 2:
        return <Database className="w-4 h-4" />;
      case 3:
        return <ShieldCheck className="w-4 h-4" />;
      case 4:
      default:
        return <BarChart3 className="w-4 h-4" />;
    }
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[70] flex items-center justify-center p-3 sm:p-5 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200 select-none"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`relative w-full max-w-4xl max-h-[92vh] rounded-2xl border shadow-2xl overflow-y-auto no-scrollbar p-4 sm:p-6 flex flex-col justify-between gap-4 ${
          isDark
            ? 'bg-slate-900/95 border-cyan-500/40 text-white shadow-[0_0_60px_rgba(6,182,212,0.25)]'
            : 'bg-white/95 border-slate-300 text-slate-900 shadow-2xl'
        }`}
        style={{ backdropFilter: 'blur(20px)' }}
      >
        {/* 1. Header Modal */}
        <div className="flex items-start justify-between gap-3 pb-3 border-b border-black/10 dark:border-white/10">
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span
                className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold text-white shadow-xs"
                style={{ backgroundColor: accentColor }}
              >
                <Server className="w-3 h-3" />
                <span>{arch.domainTitle}</span>
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-cyan-500/15 text-cyan-700 dark:text-cyan-300 border border-cyan-400/30">
                {arch.throughputBadge}
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-400/30">
                {arch.uptimeBadge}
              </span>
            </div>

            <h3 className="text-base sm:text-xl font-black font-play tracking-tight">
              {arch.architectureName}
            </h3>

            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              {arch.summary}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl border border-slate-300 dark:border-white/15 bg-slate-100 dark:bg-slate-800 hover:bg-rose-500 hover:text-white transition cursor-pointer shrink-0"
            title="Đóng sơ đồ kiến trúc"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* 2. Bộ chọn nhanh các hạng mục Công nghệ hệ thống trong lĩnh vực */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 mr-1 flex items-center gap-1">
            <Layers className="w-3.5 h-3.5 text-purple-500" />
            <span>Hạng mục công nghệ đang chọn:</span>
          </span>
          {allTechBullets.map((bullet, idx) => {
            const isSelected = bullet === selectedTechBullet;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  SoundEngine.playTap();
                  onSelectTechBullet(bullet);
                  setActiveStageIdx(getInitialStageIndex(bullet));
                }}
                className={`px-3 py-1 rounded-full text-[11px] font-bold transition cursor-pointer border ${
                  isSelected
                    ? 'bg-purple-600 text-white border-purple-400 shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300/70 dark:border-white/10 hover:border-purple-400'
                }`}
              >
                {bullet}
              </button>
            );
          })}
        </div>

        {/* 3. SƠ ĐỒ KIẾN TRÚC LUỒNG XỬ LÝ 5 TẦNG TƯƠNG TÁC (5-STAGE PIPELINE DIAGRAM) */}
        <div className="p-3 sm:p-4 rounded-2xl bg-slate-100/80 dark:bg-slate-950/70 border border-slate-200/90 dark:border-white/10">
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-[10.5px] font-mono font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400 flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 animate-pulse" />
              <span>Sơ đồ luồng xử lý cuộc gọi / ticket thực tế (Nhấp từng tầng để xem thông số kỹ thuật)</span>
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 items-stretch">
            {arch.stages.map((stage, idx) => {
              const isActive = idx === activeStageIdx;
              return (
                <div key={stage.id} className="relative flex items-stretch">
                  <button
                    type="button"
                    onClick={() => {
                      SoundEngine.playTap();
                      setActiveStageIdx(idx);
                    }}
                    className={`w-full p-2.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between gap-1.5 ${
                      isActive
                        ? 'bg-gradient-to-br from-cyan-600 to-indigo-600 text-white border-cyan-300 shadow-lg scale-[1.02]'
                        : 'bg-white dark:bg-slate-900/90 text-slate-800 dark:text-slate-200 border-slate-200/90 dark:border-white/10 hover:border-cyan-400/60'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-1">
                      <span
                        className={`text-[9.5px] font-mono font-bold px-1.5 py-0.5 rounded ${
                          isActive
                            ? 'bg-white/20 text-white'
                            : 'bg-cyan-500/15 text-cyan-700 dark:text-cyan-300'
                        }`}
                      >
                        {stage.step}
                      </span>
                      <div className={isActive ? 'text-white' : 'text-cyan-600 dark:text-cyan-400'}>
                        {getStageIcon(idx)}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-xs font-black font-play leading-snug line-clamp-2">
                        {stage.title}
                      </h4>
                      <p
                        className={`text-[10px] leading-tight mt-0.5 line-clamp-2 ${
                          isActive ? 'text-cyan-100' : 'text-slate-500 dark:text-slate-400'
                        }`}
                      >
                        {stage.subtitle}
                      </p>
                    </div>

                    <div className="pt-1 border-t border-current/10 flex items-center justify-between text-[9.5px] font-mono font-bold">
                      <span>{stage.latency}</span>
                      <span>{stage.sla}</span>
                    </div>
                  </button>

                  {idx < arch.stages.length - 1 && (
                    <div className="hidden sm:flex items-center justify-center -right-2.5 top-1/2 -translate-y-1/2 absolute z-10 pointer-events-none">
                      <ArrowRight className="w-3.5 h-3.5 text-cyan-500" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* 4. KHUNG CHI TIẾT THÔNG SỐ KỸ THUẬT CỦA TẦNG ĐANG CHỌN */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3.5 items-stretch">
          {/* Cột Trái (7 cols): Quy trình xử lý thực tế tại tầng công nghệ */}
          <div className="md:col-span-7 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-white/10 flex flex-col justify-between gap-2.5">
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-black font-play text-cyan-700 dark:text-cyan-300 flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-amber-500" />
                  <span>
                    {activeStage.step}: {activeStage.title}
                  </span>
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-400/30">
                  {activeStage.sla}
                </span>
              </div>

              <ul className="space-y-1.5 pt-1">
                {activeStage.operations.map((op, i) => (
                  <li key={i} className="text-xs flex items-start gap-2 leading-relaxed font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{op}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs font-medium text-emerald-800 dark:text-emerald-200">
              <strong className="font-bold">Hiệu quả thực chiến:</strong> {activeStage.executiveImpact}
            </div>
          </div>

          {/* Cột Phải (5 cols): Giao thức & Công nghệ lõi tích hợp */}
          <div className="md:col-span-5 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-white/10 flex flex-col justify-between gap-3">
            <div>
              <span className="text-xs font-black font-play text-purple-700 dark:text-purple-300 block mb-2">
                {formatCardTitle('Công nghệ tích hợp')}
              </span>
              <div className="flex flex-wrap gap-1.5">
                {activeStage.protocols.map((proto, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-lg text-[11px] font-mono font-bold bg-purple-500/15 text-purple-800 dark:text-purple-200 border border-purple-400/30"
                  >
                    {proto}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-black/10 dark:border-white/10">
              <div className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10">
                <span className="text-[10px] text-slate-500 dark:text-slate-400 block">Độ trễ xử lý</span>
                <span className="text-sm font-black font-mono text-cyan-600 dark:text-cyan-400">
                  {activeStage.latency}
                </span>
              </div>
              <div className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10">
                <span className="text-[10px] text-slate-500 dark:text-slate-400 block">Cam kết SLA</span>
                <span className="text-sm font-black font-mono text-emerald-600 dark:text-emerald-400">
                  {activeStage.sla}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
