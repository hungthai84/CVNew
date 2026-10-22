'use client';

import React, { useState } from 'react';
import { DOMAINS_DATA } from '@/data/domains';
import { DomainData } from '@/types';
import { WebIcon } from '@/components/ui/WebIcon';

interface DomainExtraConfig {
  heroSubtitle: string;
  heroTags: string[];
  roleBadge: string;
  roleBullets: string[];
  teamBadge: string;
  teamBullets: string[];
  techBadge: string;
  techBullets: string[];
  descTitle: string;
  descText: string;
  metrics: {
    label: string;
    value: string;
    sub: string;
    type: 'chart' | 'shield' | 'timer' | 'users';
    cardStyle: string;
    iconStyle: string;
    valColor: string;
  }[];
  partners: {
    name: string;
    sub: string;
    logo: string;
  }[];
}

const DOMAIN_EXTRAS: Record<string, DomainExtraConfig> = {
  '01': {
    heroSubtitle: 'Kết nối người dùng, xây dựng hạ tầng số, đem lại giá trị bền vững cho cộng đồng.',
    heroTags: ['Hạ tầng số', 'Kết nối', 'Trải nghiệm vượt trội'],
    roleBadge: '9+ NĂM KINH NGHIỆM',
    roleBullets: [
      'Quản lý vận hành dịch vụ viễn thông',
      'Điều phối & giám sát hoạt động khai thác',
      'Phối hợp phát triển kinh doanh, chăm sóc KH',
    ],
    teamBadge: '50 – 130+ NHÂN SỰ / CA',
    teamBullets: [
      'Đội ngũ kỹ thuật, vận hành, CSKH',
      'Đội ngũ chăm sóc & xử lý sự cố',
      'Phối hợp đa phòng ban, đối tác',
    ],
    techBadge: 'CÁC HỆ THỐNG LỚN',
    techBullets: [
      'MobiFone / V247 / LBC / HTVC',
      'Hệ thống CRM & Call Center',
      'Hạ tầng mạng, 4G/5G, VoIP, Data',
    ],
    descTitle: 'Mô tả chi tiết lĩnh vực',
    descText:
      'Phụ trách toàn bộ hoạt động vận hành dịch vụ viễn thông, bao gồm: quản lý hạ tầng mạng, điều phối khai thác dịch vụ, chăm sóc khách hàng, xử lý sự cố và tối ưu chất lượng dịch vụ. Đồng thời, phối hợp với các đối tác chiến lược để phát triển các sản phẩm, dịch vụ mới, mở rộng thị trường và nâng cao trải nghiệm khách hàng, đảm bảo hoạt động ổn định, hiệu quả và bền vững.',
    metrics: [
      {
        label: 'Tăng trưởng doanh thu',
        value: '+32%',
        sub: '(trung bình 3 năm)',
        type: 'chart',
        cardStyle: 'bg-gradient-to-br from-[#f0f9ff] to-[#ffffff] dark:from-sky-950/40 dark:to-slate-900/60 border-sky-100 dark:border-white/10',
        iconStyle: 'bg-blue-100 dark:bg-blue-900/60 text-blue-600 dark:text-blue-400',
        valColor: 'text-sky-600 dark:text-sky-400',
      },
      {
        label: 'Tỷ lệ hài lòng KH',
        value: '99%',
        sub: '(duy trì ổn định)',
        type: 'shield',
        cardStyle: 'bg-gradient-to-br from-[#ecfdf5] to-[#ffffff] dark:from-emerald-950/40 dark:to-slate-900/60 border-emerald-100 dark:border-white/10',
        iconStyle: 'bg-emerald-100 dark:bg-emerald-900/60 text-emerald-600 dark:text-emerald-400',
        valColor: 'text-emerald-600 dark:text-emerald-400',
      },
      {
        label: 'Giảm thời gian xử lý sự cố',
        value: '-40%',
        sub: '(so với trước)',
        type: 'timer',
        cardStyle: 'bg-gradient-to-br from-[#fffbeb] to-[#ffffff] dark:from-amber-950/40 dark:to-slate-900/60 border-amber-100 dark:border-white/10',
        iconStyle: 'bg-amber-100 dark:bg-amber-900/60 text-amber-600 dark:text-amber-400',
        valColor: 'text-amber-600 dark:text-amber-400',
      },
      {
        label: 'Phát triển đội ngũ',
        value: '+50%',
        sub: '(mở rộng quy mô)',
        type: 'users',
        cardStyle: 'bg-gradient-to-br from-[#faf5ff] to-[#ffffff] dark:from-purple-950/40 dark:to-slate-900/60 border-purple-100 dark:border-white/10',
        iconStyle: 'bg-purple-100 dark:bg-purple-900/60 text-purple-600 dark:text-purple-400',
        valColor: 'text-purple-600 dark:text-purple-400',
      },
    ],
    partners: [
      { name: 'MobiFone', sub: 'Nhà mạng viễn thông', logo: 'https://i.ibb.co/hxHm9TsZ/Mobifone.png' },
      { name: 'V247', sub: 'Truyền hình & nội dung số', logo: 'https://i.ibb.co/QvtbdnfP/V247.png' },
      { name: 'LBC', sub: 'Dịch vụ viễn thông', logo: 'https://i.ibb.co/R4YXWyzF/LBC.png' },
      { name: 'HTVC', sub: 'Truyền hình cáp', logo: 'https://i.ibb.co/1fNw0hBq/HTVC.png' },
    ],
  },
  '02': {
    heroSubtitle: 'Vận hành nền tảng TMĐT tốc độ cao, tối ưu tỷ lệ hoàn tất đơn và giải quyết khiếu nại Mega-Sale.',
    heroTags: ['Sàn TMĐT', 'Xử lý đơn Mega-Sale', 'Bảo vệ người mua & người bán'],
    roleBadge: '6+ NĂM KINH NGHIỆM',
    roleBullets: [
      'Quản lý vận hành CSKH Shopee & Finviet',
      'Kiểm soát tranh chấp & gian lận đơn ảo',
      'Tối ưu hóa quy trình tương tác đa kênh',
    ],
    teamBadge: '100+ NHÂN SỰ CSKH & FRAUD',
    teamBullets: [
      'Đội ngũ LiveChat & Call Center 24/7',
      'Chuyên viên xử lý tranh chấp 3 bên',
      'Bộ phận chống gian lận & Risk Management',
    ],
    techBadge: 'HỆ THỐNG HIỆN ĐẠI',
    techBullets: [
      'Zendesk Omnichannel & Shopee Admin',
      'Live Chat Auto-router & Chatbot AI',
      'Power BI & Real-time Ops Dashboard',
    ],
    descTitle: 'Mô tả chi tiết lĩnh vực',
    descText:
      'Quản lý và điều hành trực tiếp 100+ nhân sự CSKH & Fraud, phục vụ hàng triệu người dùng active và xử lý lượng tương tác bùng nổ trong các đợt Mega-Sale. Giải quyết tranh chấp 3 bên (Người mua - Người bán - Vận chuyển), kiểm soát gian lận khuyến mãi và tối ưu tốc độ phản hồi Live Chat.',
    metrics: [
      {
        label: 'Thời gian chờ Chat',
        value: '< 30s',
        sub: '(phản hồi tức thì)',
        type: 'timer',
        cardStyle: 'bg-gradient-to-br from-[#fff7ed] to-[#ffffff] dark:from-orange-950/40 dark:to-slate-900/60 border-orange-100 dark:border-white/10',
        iconStyle: 'bg-orange-100 dark:bg-orange-900/60 text-orange-600 dark:text-orange-400',
        valColor: 'text-orange-600 dark:text-orange-400',
      },
      {
        label: 'Tỷ lệ hài lòng CSAT',
        value: '96.5%',
        sub: '(tăng từ 88%)',
        type: 'shield',
        cardStyle: 'bg-gradient-to-br from-[#ecfdf5] to-[#ffffff] dark:from-emerald-950/40 dark:to-slate-900/60 border-emerald-100 dark:border-white/10',
        iconStyle: 'bg-emerald-100 dark:bg-emerald-900/60 text-emerald-600 dark:text-emerald-400',
        valColor: 'text-emerald-600 dark:text-emerald-400',
      },
      {
        label: 'Giảm tỷ lệ hủy đơn',
        value: '-30%',
        sub: '(do hỗ trợ kịp thời)',
        type: 'chart',
        cardStyle: 'bg-gradient-to-br from-[#f0f9ff] to-[#ffffff] dark:from-sky-950/40 dark:to-slate-900/60 border-sky-100 dark:border-white/10',
        iconStyle: 'bg-blue-100 dark:bg-blue-900/60 text-blue-600 dark:text-blue-400',
        valColor: 'text-sky-600 dark:text-sky-400',
      },
      {
        label: 'Tiết kiệm chi phí',
        value: '-25%',
        sub: '(Cost-to-Serve)',
        type: 'users',
        cardStyle: 'bg-gradient-to-br from-[#faf5ff] to-[#ffffff] dark:from-purple-950/40 dark:to-slate-900/60 border-purple-100 dark:border-white/10',
        iconStyle: 'bg-purple-100 dark:bg-purple-900/60 text-purple-600 dark:text-purple-400',
        valColor: 'text-purple-600 dark:text-purple-400',
      },
    ],
    partners: [
      { name: 'Shopee', sub: 'Sàn TMĐT hàng đầu', logo: 'https://i.ibb.co/BSVS4xf/Shopee.png' },
      { name: 'Finviet', sub: 'Bán lẻ & FinTech', logo: 'https://i.ibb.co/7NtSSz4d/Finviet.png' },
    ],
  },
  '03': {
    heroSubtitle: 'Quản trị chất lượng dịch vụ bảo hiểm nhân thọ chuẩn 5 sao, đảm bảo tính minh bạch và cam kết SLA.',
    heroTags: ['Bảo hiểm nhân thọ', 'Dịch vụ 5 sao', 'Chuẩn BCP & SLA'],
    roleBadge: '3+ NĂM KINH NGHIỆM',
    roleBullets: [
      'Quản lý chất lượng Contact Center Prudential',
      'Giám sát quy trình tư vấn & thẩm định hợp đồng',
      'Tối ưu hóa hành trình trải nghiệm khách hàng',
    ],
    teamBadge: '12 TRỰC TIẾP + 40+ CAO CẤP',
    teamBullets: [
      'Đội ngũ giám sát chất lượng QA/QC',
      'Chuyên viên tư vấn Call Center cao cấp',
      'Bộ phận hỗ trợ chi trả quyền lợi hợp đồng',
    ],
    techBadge: 'CHÍNH XÁC TUYỆT ĐỐI',
    techBullets: [
      'CRM Prudential Life trên AS400',
      'VideoCall Advisory & Voice Recording',
      'Hệ thống thẩm định & Chuẩn BCP quốc tế',
    ],
    descTitle: 'Mô tả chi tiết lĩnh vực',
    descText:
      'Quản lý 12 nhân sự trực tiếp và hơn 40 chuyên viên tư vấn Call Center cao cấp, phục vụ hàng trăm nghìn hợp đồng bảo hiểm giá trị cao. Đảm bảo tính chính xác minh bạch tuyệt đối về pháp lý hợp đồng, xử lý nhạy cảm các ca chi trả quyền lợi và bảo đảm tính liên tục kinh doanh (BCP).',
    metrics: [
      {
        label: 'Rút ngắn xử lý yêu cầu',
        value: '-45%',
        sub: '(thời gian xử lý)',
        type: 'timer',
        cardStyle: 'bg-gradient-to-br from-[#fff1f2] to-[#ffffff] dark:from-rose-950/40 dark:to-slate-900/60 border-rose-100 dark:border-white/10',
        iconStyle: 'bg-rose-100 dark:bg-rose-900/60 text-rose-600 dark:text-rose-400',
        valColor: 'text-rose-600 dark:text-rose-400',
      },
      {
        label: 'Tỷ lệ giải quyết lần đầu FCR',
        value: '> 92%',
        sub: '(đạt chuẩn quốc tế)',
        type: 'shield',
        cardStyle: 'bg-gradient-to-br from-[#ecfdf5] to-[#ffffff] dark:from-emerald-950/40 dark:to-slate-900/60 border-emerald-100 dark:border-white/10',
        iconStyle: 'bg-emerald-100 dark:bg-emerald-900/60 text-emerald-600 dark:text-emerald-400',
        valColor: 'text-emerald-600 dark:text-emerald-400',
      },
      {
        label: 'Tỷ lệ gia hạn hợp đồng',
        value: '+15%',
        sub: '(Retention rate)',
        type: 'chart',
        cardStyle: 'bg-gradient-to-br from-[#f0f9ff] to-[#ffffff] dark:from-sky-950/40 dark:to-slate-900/60 border-sky-100 dark:border-white/10',
        iconStyle: 'bg-blue-100 dark:bg-blue-900/60 text-blue-600 dark:text-blue-400',
        valColor: 'text-sky-600 dark:text-sky-400',
      },
      {
        label: 'Chỉ số SLA dịch vụ',
        value: '95%',
        sub: '(cam kết chất lượng)',
        type: 'users',
        cardStyle: 'bg-gradient-to-br from-[#faf5ff] to-[#ffffff] dark:from-purple-950/40 dark:to-slate-900/60 border-purple-100 dark:border-white/10',
        iconStyle: 'bg-purple-100 dark:bg-purple-900/60 text-purple-600 dark:text-purple-400',
        valColor: 'text-purple-600 dark:text-purple-400',
      },
    ],
    partners: [
      { name: 'Prudential', sub: 'Bảo hiểm nhân thọ', logo: 'https://i.ibb.co/XfpQphWF/Prudential.png' },
    ],
  },
  '04': {
    heroSubtitle: 'Điều hành hệ thống chăm sóc game thủ quy mô hàng đầu Đông Nam Á, chịu tải siêu cao mùa giải đấu.',
    heroTags: ['Game Online', 'VCS & eSports', 'Bảo vệ tài sản ảo'],
    roleBadge: '5+ NĂM KINH NGHIỆM',
    roleBullets: [
      'Lãnh đạo vận hành CSKH Vietnam Esports (VED)',
      'Khôi phục sự cố tài khoản/vật phẩm tức thì',
      'Chịu tải siêu cao khi ra mắt Game & Sự kiện',
    ],
    teamBadge: '130+ NHÂN SỰ TRỰC TIẾP',
    teamBullets: [
      '80+ Game Supporter chuyên sâu từng tựa game',
      'Đội ngũ kiểm soát gian lận & Hack tài khoản',
      'Đội ngũ hỗ trợ sự kiện eSports trực tiếp',
    ],
    techBadge: 'CHỊU TẢI SIÊU CAO',
    techBullets: [
      'CRM Garena Customer Desk nội bộ',
      'Hệ thống quản lý phòng máy Gcafe',
      'AI Ticket Classifier & CS Academy LMS',
    ],
    descTitle: 'Mô tả chi tiết lĩnh vực',
    descText:
      'Lãnh đạo 130 nhân sự trực tiếp (80+ Game Supporter, Fraud, CSKH), xử lý hơn 50.000 ticket/ngày cho hàng chục triệu game thủ trên toàn quốc. Đảm bảo xử lý sự cố tức thì, bảo vệ tài sản ảo và điều phối CSKH trực tiếp tại các giải đấu thể thao điện tử lớn.',
    metrics: [
      {
        label: 'Tốc độ phản hồi Ticket',
        value: '< 30s',
        sub: '(xử lý tức thì)',
        type: 'timer',
        cardStyle: 'bg-gradient-to-br from-[#faf5ff] to-[#ffffff] dark:from-purple-950/40 dark:to-slate-900/60 border-purple-100 dark:border-white/10',
        iconStyle: 'bg-purple-100 dark:bg-purple-900/60 text-purple-600 dark:text-purple-400',
        valColor: 'text-purple-600 dark:text-purple-400',
      },
      {
        label: 'Chỉ số CSAT Gamer',
        value: '96%',
        sub: '(hàng triệu game thủ)',
        type: 'shield',
        cardStyle: 'bg-gradient-to-br from-[#ecfdf5] to-[#ffffff] dark:from-emerald-950/40 dark:to-slate-900/60 border-emerald-100 dark:border-white/10',
        iconStyle: 'bg-emerald-100 dark:bg-emerald-900/60 text-emerald-600 dark:text-emerald-400',
        valColor: 'text-emerald-600 dark:text-emerald-400',
      },
      {
        label: 'Khối lượng xử lý ngày',
        value: '50K+',
        sub: '(ticket / ngày)',
        type: 'chart',
        cardStyle: 'bg-gradient-to-br from-[#f0f9ff] to-[#ffffff] dark:from-sky-950/40 dark:to-slate-900/60 border-sky-100 dark:border-white/10',
        iconStyle: 'bg-blue-100 dark:bg-blue-900/60 text-blue-600 dark:text-blue-400',
        valColor: 'text-sky-600 dark:text-sky-400',
      },
      {
        label: 'Giải đấu eSports lớn',
        value: '100+',
        sub: '(VCS, Liên Quân, LMHT)',
        type: 'users',
        cardStyle: 'bg-gradient-to-br from-[#fffbeb] to-[#ffffff] dark:from-amber-950/40 dark:to-slate-900/60 border-amber-100 dark:border-white/10',
        iconStyle: 'bg-amber-100 dark:bg-amber-900/60 text-amber-600 dark:text-amber-400',
        valColor: 'text-amber-600 dark:text-amber-400',
      },
    ],
    partners: [
      { name: 'Garena', sub: 'Nhà phát hành game', logo: 'https://i.ibb.co/h1Md65yV/Garena.png' },
      { name: 'VED', sub: 'Vietnam Esports', logo: 'https://i.ibb.co/fYPJLfbw/VED.png' },
      { name: 'GCafe', sub: 'Quản lý phòng máy', logo: 'https://i.ibb.co/FkWk3s4W/GCafe.png' },
    ],
  },
  '05': {
    heroSubtitle: 'Kiến tạo giải pháp hỗ trợ tài chính số tin cậy, tự động hóa tra soát và bảo vệ giao dịch tiền thật.',
    heroTags: ['Ví điện tử', 'Tra soát tự động RPA', 'An toàn bảo mật'],
    roleBadge: '5+ NĂM KINH NGHIỆM',
    roleBullets: [
      'Điều hành CSKH MoMo, ShopeePay & Ví ECO',
      'Xử lý tra soát khiếu nại tài chính phức tạp',
      'Kiểm soát gian lận giao dịch tiền thật 24/7',
    ],
    teamBadge: '60 – 120+ NỘI BỘ + 150 BPO',
    teamBullets: [
      'Đội ngũ vận hành CSKH tài chính nội bộ',
      'Quản trị đối tác BPO Mắt Bảo 150 vị trí',
      'Biệt đội phản ứng nhanh War-Room 24/7',
    ],
    techBadge: 'TỰ ĐỘNG HÓA CAO',
    techBullets: [
      'MoMo & Finviet Admin CRM',
      'Core Banking Gateway & RPA Bots',
      'AI Bot RAG 24/7 & War-Room Monitoring',
    ],
    descTitle: 'Mô tả chi tiết lĩnh vực',
    descText:
      'Điều hành 60–120+ nhân sự nội bộ và quản trị đối tác BPO 150+ vị trí, phục vụ hơn 30 triệu người dùng ví điện tử. Rút ngắn thời gian hoàn tiền và tra soát giao dịch, xử lý sự cố kết nối ngân hàng và kiểm soát rủi ro gian lận tiền tệ.',
    metrics: [
      {
        label: 'Rút ngắn hoàn tiền RPA',
        value: '90s',
        sub: '(giảm từ 48 giờ)',
        type: 'timer',
        cardStyle: 'bg-gradient-to-br from-[#fdf2f8] to-[#ffffff] dark:from-pink-950/40 dark:to-slate-900/60 border-pink-100 dark:border-white/10',
        iconStyle: 'bg-pink-100 dark:bg-pink-900/60 text-pink-600 dark:text-pink-400',
        valColor: 'text-pink-600 dark:text-pink-400',
      },
      {
        label: 'Điểm hài lòng CSAT',
        value: '98.2%',
        sub: '(người dùng ví điện tử)',
        type: 'shield',
        cardStyle: 'bg-gradient-to-br from-[#ecfdf5] to-[#ffffff] dark:from-emerald-950/40 dark:to-slate-900/60 border-emerald-100 dark:border-white/10',
        iconStyle: 'bg-emerald-100 dark:bg-emerald-900/60 text-emerald-600 dark:text-emerald-400',
        valColor: 'text-emerald-600 dark:text-emerald-400',
      },
      {
        label: 'Cam kết SLA BPO',
        value: '98.6%',
        sub: '(vượt chuẩn ngành)',
        type: 'chart',
        cardStyle: 'bg-gradient-to-br from-[#f0f9ff] to-[#ffffff] dark:from-sky-950/40 dark:to-slate-900/60 border-sky-100 dark:border-white/10',
        iconStyle: 'bg-blue-100 dark:bg-blue-900/60 text-blue-600 dark:text-blue-400',
        valColor: 'text-sky-600 dark:text-sky-400',
      },
      {
        label: 'Giảm sự cố vận hành',
        value: '-35%',
        sub: '(nhờ War-Room)',
        type: 'users',
        cardStyle: 'bg-gradient-to-br from-[#faf5ff] to-[#ffffff] dark:from-purple-950/40 dark:to-slate-900/60 border-purple-100 dark:border-white/10',
        iconStyle: 'bg-purple-100 dark:bg-purple-900/60 text-purple-600 dark:text-purple-400',
        valColor: 'text-purple-600 dark:text-purple-400',
      },
    ],
    partners: [
      { name: 'MoMo', sub: 'Siêu ứng dụng', logo: 'https://i.ibb.co/k2QtrgTw/Momo.png' },
      { name: 'ShopeePay', sub: 'Ví thanh toán', logo: 'https://i.ibb.co/LdYv3TJy/Shopee-Paye.png' },
      { name: 'Finviet', sub: 'Ví ECO', logo: 'https://i.ibb.co/7NtSSz4d/Finviet.png' },
    ],
  },
  '06': {
    heroSubtitle: 'Đóng gói và chuyển giao toàn diện mô hình Contact Center, chuyển đổi từ Cost Center sang Value Center.',
    heroTags: ['Kiến trúc hệ thống', 'Chuyển đổi số CS', 'Tối ưu SOP/KPI'],
    roleBadge: '22+ NĂM KINH NGHIỆM',
    roleBullets: [
      'Tư vấn chiến lược trải nghiệm khách hàng CX',
      'Thiết lập trọn gói Contact Center 10–150+ seats',
      'Số hóa và tự động hóa quy trình vận hành',
    ],
    teamBadge: '10 ĐẾN 150+ VỊ TRÍ NGỒI',
    teamBullets: [
      'Kiến trúc sư hệ thống & Quản trị dự án',
      'Chuyên gia đào tạo & huấn luyện nhân sự',
      'Đội ngũ tư vấn chuyển giao công nghệ AI',
    ],
    techBadge: 'TIÊN TIẾN & TOÀN DIỆN',
    techBullets: [
      'Zoho / Salesforce Enterprise CRM',
      'AI Agent Copilot & Auto-QA Speech',
      'Notion SOP Matrix & BI Analytics',
    ],
    descTitle: 'Mô tả chi tiết lĩnh vực',
    descText:
      'Tư vấn, thiết lập và chuyển giao trọn gói mô hình Contact Center từ 10 đến 150+ vị trí ngồi cho nhiều doanh nghiệp đa ngành. Chuẩn hóa bộ quy trình SOP, bộ chỉ số KPI, đào tạo đội ngũ và ứng dụng AI tự động hóa nhằm chuyển đổi CSKH từ Cost Center thành Value Center mang lại doanh thu bền vững.',
    metrics: [
      {
        label: 'Chuẩn hóa SOP & KPI',
        value: '100%',
        sub: '(tài liệu vận hành)',
        type: 'chart',
        cardStyle: 'bg-gradient-to-br from-[#ecfdf5] to-[#ffffff] dark:from-emerald-950/40 dark:to-slate-900/60 border-emerald-100 dark:border-white/10',
        iconStyle: 'bg-emerald-100 dark:bg-emerald-900/60 text-emerald-600 dark:text-emerald-400',
        valColor: 'text-emerald-600 dark:text-emerald-400',
      },
      {
        label: 'Rút ngắn Onboarding',
        value: '-65%',
        sub: '(thời gian đào tạo)',
        type: 'timer',
        cardStyle: 'bg-gradient-to-br from-[#f0f9ff] to-[#ffffff] dark:from-sky-950/40 dark:to-slate-900/60 border-sky-100 dark:border-white/10',
        iconStyle: 'bg-blue-100 dark:bg-blue-900/60 text-blue-600 dark:text-blue-400',
        valColor: 'text-sky-600 dark:text-sky-400',
      },
      {
        label: 'Tăng hiệu suất vận hành',
        value: '+40%',
        sub: '(tối ưu chi phí)',
        type: 'shield',
        cardStyle: 'bg-gradient-to-br from-[#fffbeb] to-[#ffffff] dark:from-amber-950/40 dark:to-slate-900/60 border-amber-100 dark:border-white/10',
        iconStyle: 'bg-amber-100 dark:bg-amber-900/60 text-amber-600 dark:text-amber-400',
        valColor: 'text-amber-600 dark:text-amber-400',
      },
      {
        label: 'Chuyển đổi Value Center',
        value: '100%',
        sub: '(tạo ra giá trị)',
        type: 'users',
        cardStyle: 'bg-gradient-to-br from-[#faf5ff] to-[#ffffff] dark:from-purple-950/40 dark:to-slate-900/60 border-purple-100 dark:border-white/10',
        iconStyle: 'bg-purple-100 dark:bg-purple-900/60 text-purple-600 dark:text-purple-400',
        valColor: 'text-purple-600 dark:text-purple-400',
      },
    ],
    partners: [
      { name: 'Power Service', sub: 'Giải pháp dịch vụ', logo: 'https://i.ibb.co/G4QnNzWb/Power-Service.png' },
      { name: 'VED', sub: 'Giải trí số', logo: 'https://i.ibb.co/BKHcWL5R/Logo-VED.gif' },
    ],
  },
};

const renderMetricIcon = (type: string) => {
  switch (type) {
    case 'chart':
      return (
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      );
    case 'shield':
      return (
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.4" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      );
    case 'timer':
      return (
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
    case 'users':
    default:
      return (
        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
        </svg>
      );
  }
};

export const DomainsView: React.FC = () => {
  const [filter, setFilter] = useState<string>('all');
  const [selectedDomain, setSelectedDomain] = useState<DomainData | null>(null);

  // Unframed vector icon before each domain title (matching title size & color)
  const getDomainBadgeIcon = (id: string) => {
    switch (id) {
      case '01': // Viễn thông - Radio Signal Tower (( A ))
        return (
          <svg className="w-[20px] h-[20px] shrink-0" viewBox="0 0 24 24" fill="none">
            <path d="M4.8 6.2a9 9 0 0 0 0 10.6M19.2 6.2a9 9 0 0 1 0 10.6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
            <path d="M7.6 8.5a5.2 5.2 0 0 0 0 6M16.4 8.5a5.2 5.2 0 0 1 0 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
            <circle cx="12" cy="10.5" r="1.9" fill="currentColor" />
            <path d="M12 12.2L8.8 20M12 12.2L15.2 20M10 17h4" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        );
      case '02': // E-Commerce - Bold Shopping Cart
        return (
          <svg className="w-[20px] h-[20px] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 4h2.2l2.2 9.5a1.5 1.5 0 0 0 1.5 1.2h8.2a1.5 1.5 0 0 0 1.4-1l1.8-6.7H6.2" />
            <circle cx="9.5" cy="18.5" r="1.8" fill="currentColor" stroke="none" />
            <circle cx="16.5" cy="18.5" r="1.8" fill="currentColor" stroke="none" />
          </svg>
        );
      case '03': // Bảo hiểm - Shield with Checkmark
        return (
          <svg className="w-[20px] h-[20px] shrink-0" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 2.8L19 5.6v5.6c0 5-3 8.8-7 10.2-4-1.4-7-5.2-7-10.2V5.6L12 2.8z"
              stroke="currentColor"
              strokeWidth="2.3"
              strokeLinejoin="round"
            />
            <path
              d="M9.2 12.2l2 2 4-4.2"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        );
      case '04': // eSports - Gamepad
        return (
          <svg className="w-[20px] h-[20px] shrink-0" viewBox="0 0 24 24" fill="none">
            <path
              d="M6 7.5h12c2.2 0 3.8 2 3.4 4.2l-.7 4.2c-.3 1.8-2.1 2.7-3.6 1.7l-2.1-1.5H9l-2.1 1.5c-1.5 1-3.3.1-3.6-1.7l-.7-4.2C2.2 9.5 3.8 7.5 6 7.5z"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinejoin="round"
            />
            <path d="M8 10.5v3.5M6.25 12.25h3.5" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" />
            <circle cx="15.5" cy="11" r="1" fill="currentColor" />
            <circle cx="17.5" cy="13" r="1" fill="currentColor" />
          </svg>
        );
      case '05': // FinTech - Wallet
        return (
          <svg className="w-[20px] h-[20px] shrink-0" viewBox="0 0 24 24" fill="none">
            <path d="M6.5 7.5V6a1.5 1.5 0 0 1 1.5-1.5h8.5A1.5 1.5 0 0 1 18 6v1.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
            <rect x="3.5" y="7.5" width="17" height="12" rx="2.5" stroke="currentColor" strokeWidth="2.2" />
            <circle cx="16.5" cy="13.5" r="1.5" fill="currentColor" />
          </svg>
        );
      case '06': // Hệ thống CSKH - Globe
      default:
        return (
          <svg className="w-[20px] h-[20px] shrink-0" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2.2" />
            <ellipse cx="12" cy="12" rx="4" ry="9" stroke="currentColor" strokeWidth="2" />
            <path d="M3.5 12h17M4.8 8.2h14.4M4.8 15.8h14.4" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
          </svg>
        );
    }
  };

  // Visual theme config & title per card ID matching user's requested names
  // Sampled directly from the surroundings and ambient atmosphere of each 3D descriptive illustration
  const getCardVisualConfig = (id: string) => {
    switch (id) {
      case '01': // Viễn thông - Sampled from domain_01.png ambient edges (#beddf9, #c4e2fa, #d9f1fd)
        return {
          fourWordTitle: 'Dịch Vụ Viễn Thông',
          accentColor: '#0284c7',
          cardBg: 'linear-gradient(135deg, #f0f7fe 0%, #ddf0fd 30%, #c4e2fa 65%, #beddf9 100%)',
          cardBorder: 'border-[#93c5fd]/90 hover:border-[#38bdf8]',
          ambientGlow: 'radial-gradient(circle at 75% 50%, rgba(190, 221, 249, 0.95) 0%, rgba(196, 226, 250, 0.5) 55%, transparent 75%)',
          titleColor: 'text-[#0284c7]',
          pillBg: 'bg-sky-100/90 border-sky-200/90 text-[#0369a1]',
          arrowBg: 'linear-gradient(135deg, #38bdf8 0%, #0284c7 100%)',
          arrowShadow: '0 4px 12px rgba(2, 132, 199, 0.4)',
        };
      case '02': // E-commerce - Sampled from domain_02.png ambient edges (#fbd2a6, #fccc9b, #fcefdf, #f6eedb)
        return {
          fourWordTitle: 'Thương Mại Điện Tử',
          accentColor: '#ea580c',
          cardBg: 'linear-gradient(135deg, #fffcf7 0%, #fef1e2 30%, #fccc9b 65%, #fbd2a6 100%)',
          cardBorder: 'border-[#fdba74]/90 hover:border-[#fb923c]',
          ambientGlow: 'radial-gradient(circle at 75% 50%, rgba(251, 210, 166, 0.95) 0%, rgba(252, 204, 155, 0.5) 55%, transparent 75%)',
          titleColor: 'text-[#ea580c]',
          pillBg: 'bg-orange-100/80 border-orange-200/90 text-[#c2410c]',
          arrowBg: 'linear-gradient(135deg, #fbbf24 0%, #ea580c 100%)',
          arrowShadow: '0 4px 12px rgba(234, 88, 12, 0.4)',
        };
      case '03': // Bảo hiểm - Sampled from domain_03.png ambient edges (#fdd8cf, #f9b3b1, #fdd7ce, #fccbc4)
        return {
          fourWordTitle: 'Dịch Vụ Bảo Hiểm',
          accentColor: '#e11d48',
          cardBg: 'linear-gradient(135deg, #fff7f6 0%, #feeae5 30%, #fdd8cf 65%, #f9b3b1 100%)',
          cardBorder: 'border-[#fca5a5]/90 hover:border-[#f43f5e]',
          ambientGlow: 'radial-gradient(circle at 75% 50%, rgba(253, 216, 207, 0.95) 0%, rgba(249, 179, 177, 0.5) 55%, transparent 75%)',
          titleColor: 'text-[#e11d48]',
          pillBg: 'bg-rose-100/80 border-rose-200/90 text-[#be123c]',
          arrowBg: 'linear-gradient(135deg, #fb7185 0%, #e11d48 100%)',
          arrowShadow: '0 4px 12px rgba(225, 29, 72, 0.4)',
        };
      case '04': // eSports - Sampled from domain_04.png ambient edges (#d9d0fb, #dcd1fb, #9d7ef3, #7841da)
        return {
          fourWordTitle: 'Game eSports',
          accentColor: '#7c3aed',
          cardBg: 'linear-gradient(135deg, #faf8fe 0%, #ede8fe 30%, #d9d0fb 65%, #c5b5f9 100%)',
          cardBorder: 'border-[#c4b5fd]/90 hover:border-[#a855f7]',
          ambientGlow: 'radial-gradient(circle at 75% 50%, rgba(217, 208, 251, 0.95) 0%, rgba(157, 126, 243, 0.5) 55%, transparent 75%)',
          titleColor: 'text-[#7c3aed]',
          pillBg: 'bg-purple-100/80 border-purple-200/90 text-[#5b21b6]',
          arrowBg: 'linear-gradient(135deg, #a78bfa 0%, #7c3aed 100%)',
          arrowShadow: '0 4px 12px rgba(124, 58, 237, 0.4)',
        };
      case '05': // FinTech - Sampled from domain_05.png ambient edges (#e9c6e4, #eac8e3, #e0c7ef, #dbd0fb)
        return {
          fourWordTitle: 'Thanh Toán Điện Tử',
          accentColor: '#db2777',
          cardBg: 'linear-gradient(135deg, #fdf6fa 0%, #fbe8f5 30%, #e9c6e4 65%, #debad8 100%)',
          cardBorder: 'border-[#f9a8d4]/90 hover:border-[#ec4899]',
          ambientGlow: 'radial-gradient(circle at 75% 50%, rgba(233, 198, 228, 0.95) 0%, rgba(224, 199, 239, 0.5) 55%, transparent 75%)',
          titleColor: 'text-[#db2777]',
          pillBg: 'bg-pink-100/80 border-pink-200/90 text-[#be185d]',
          arrowBg: 'linear-gradient(135deg, #f472b6 0%, #db2777 100%)',
          arrowShadow: '0 4px 12px rgba(219, 39, 119, 0.4)',
        };
      case '06': // Xây Dựng Hệ Thống - Sampled from domain_06.png ambient edges (#abd9d6, #b1dfdd, #c3edec, #c8efec)
      default:
        return {
          fourWordTitle: 'Xây Dựng Hệ Thống',
          accentColor: '#059669',
          cardBg: 'linear-gradient(135deg, #f3fbfa 0%, #dff4f2 30%, #b1dfdd 65%, #abd9d6 100%)',
          cardBorder: 'border-[#6ee7b7]/90 hover:border-[#10b981]',
          ambientGlow: 'radial-gradient(circle at 75% 50%, rgba(171, 217, 214, 0.95) 0%, rgba(177, 223, 221, 0.5) 55%, transparent 75%)',
          titleColor: 'text-[#059669]',
          pillBg: 'bg-emerald-100/80 border-emerald-200/90 text-[#047857]',
          arrowBg: 'linear-gradient(135deg, #34d399 0%, #059669 100%)',
          arrowShadow: '0 4px 12px rgba(5, 150, 105, 0.4)',
        };
    }
  };

  // State to track which card is currently hovered
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);

  // High-resolution transparent illustration images according to user request
  const renderCard3DIllustration = (id: string, isHovered: boolean = false) => {
    const imgMap: Record<string, { src: string; alt: string }> = {
      '01': {
        src: 'https://i.ibb.co/4RYYfBvx/D-ch-v-vi-n-th-ng-removebg-preview.png',
        alt: 'Dịch vụ viễn thông',
      },
      '02': {
        src: 'https://i.ibb.co/xqcR1Yw3/Th-ng-m-i-i-n-t-removebg-preview.png',
        alt: 'Thương mại điện tử',
      },
      '03': {
        src: 'https://i.ibb.co/B8K1Gwr/D-ch-v-b-o-hi-m-removebg-preview.png',
        alt: 'Dịch vụ bảo hiểm',
      },
      '04': {
        src: 'https://i.ibb.co/pBKmWZHc/Game-e-Sports-removebg-preview.png',
        alt: 'Game e Sports',
      },
      '05': {
        src: 'https://i.ibb.co/hRJDnYw4/Thanh-to-n-i-n-t-removebg-preview.png',
        alt: 'Thanh toán điện tử',
      },
      '06': {
        src: 'https://i.ibb.co/Kj5P9tvf/X-y-d-ng-h-th-ng-removebg-preview.png',
        alt: 'Xây dựng hệ thống',
      },
    };
    const item = imgMap[id] || imgMap['01'];

    return (
      <img
        src={item.src}
        alt={item.alt}
        className={`w-full h-full object-contain filter drop-shadow-[0_12px_20px_rgba(0,0,0,0.12)] select-none pointer-events-none transition-transform duration-300 ${
          isHovered ? 'scale-110 brightness-105' : 'scale-100 opacity-95'
        }`}
        loading="eager"
      />
    );
  };

  const filteredDomains = DOMAINS_DATA.filter((d) => {
    const matchesFilter =
      filter === 'all' ||
      (filter === 'telecom' && d.id === '01') ||
      (filter === 'commerce' && (d.id === '02' || d.id === '05')) ||
      (filter === 'finance' && (d.id === '03' || d.id === '05')) ||
      (filter === 'gaming' && d.id === '04') ||
      (filter === 'systems' && d.id === '06');

    return matchesFilter;
  });

  return (
    <div
      className={`w-full h-full flex-1 flex flex-col justify-between gap-[15px] max-w-7xl mx-auto select-none relative text-slate-800 ${
        selectedDomain ? 'overflow-y-auto no-scrollbar pb-2' : 'overflow-hidden'
      }`}
    >
      {/* 1. TOP HERO BANNER (.hero-banner chuẩn kích thước 1920x500, WebP/PNG, bo góc 28px, cao 180-260px, phần dưới trong suốt) */}
      {!selectedDomain && (
        <div className="hero-banner theme-hero-banner relative border-none shadow-sm shrink-0 bg-sky-100/60 overflow-hidden">
        {/* Video MP4 nền banner */}
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="/images/domains/hero-banner.webp"
          className="absolute inset-0 w-full h-full object-cover object-center select-none pointer-events-none"
        >
          <source src="/videos/domains-banner.mp4" type="video/mp4" />
          <source src="https://cdn.scena.ai/project/10169/e07c498cfd5e7e1a0a537b3f12eeaaf42cb878f5300f99d73c9b02a7aa05efce.mp4" type="video/mp4" />
        </video>

        {/* Lớp phủ tương phản để đảm bảo chữ trên banner luôn hiển thị rõ nét */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/50 via-slate-950/20 to-slate-950/55 pointer-events-none" />

        {/* Lớp nội dung chữ trên banner đúng theo hình ảnh mẫu */}
        <div className="absolute inset-0 z-10 px-4 sm:px-6 py-3 sm:py-3.5 flex flex-col justify-between pointer-events-none">
          {/* Hàng chữ phía trên/giữa: Tiêu đề bên trái, Câu nói hay bên phải */}
          <div className="flex items-start justify-between gap-3 w-full">
            {/* Khối chữ bên trái: Tiêu đề + Subtitle + Thanh cam */}
            <div className="flex flex-col items-start pointer-events-auto max-w-[62%] sm:max-w-[48%]">
              {/* Tiêu đề có icon chuyển động tại chỗ trước tiêu đề, màu tiêu đề giống màu icon và màu menu icon ở trang */}
              <h2 className="text-base sm:text-xl md:text-2xl lg:text-[26px] font-black font-play text-amber-400 dark:text-amber-300 tracking-tight leading-tight drop-shadow-[0_2px_6px_rgba(0,0,0,0.85)] select-none flex items-center gap-2">
                <span className="inline-flex animate-banner-icon shrink-0 text-amber-400 dark:text-amber-300">
                  <WebIcon name="globe" className="w-5 h-5 sm:w-6 sm:h-6" />
                </span>
                <span>Lĩnh Vực Hoạt Động</span>
              </h2>
              <p className="text-[11px] sm:text-xs md:text-sm font-bold text-white tracking-normal mt-1 drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)] select-none">
                Học tập không giới hạn – Kiến tạo tương lai
              </p>
              <div className="w-12 sm:w-16 h-1.5 rounded-full bg-gradient-to-r from-amber-500 via-orange-500 to-amber-400 shadow-md mt-1.5" />
            </div>

            {/* Khối chữ bên phải: Câu trích dẫn viết tay tiếng Việt Fleur De Leah chữ vàng rõ nét */}
            <div className="hidden sm:flex flex-col items-end text-right pointer-events-auto max-w-[48%] lg:max-w-[44%] pt-0.5">
              <div className="p-1 sm:p-1.5 bg-transparent border-none shadow-none flex flex-col items-end">
                <p className="font-banner-quote text-2xl sm:text-3xl lg:text-[34px] text-amber-300 font-normal leading-tight select-none drop-shadow-[0_2px_6px_rgba(0,0,0,0.85)]">
                  “Thực chiến đa ngành kiến tạo giải pháp dịch vụ xuất sắc.”
                </p>
                <span className="text-[10px] sm:text-[11px] font-bold text-amber-200/90 mt-0.5 block tracking-wider font-play drop-shadow-[0_1px_4px_rgba(0,0,0,0.85)]">
                  — Nguyễn Hùng Thái
                </span>
                <div className="w-24 sm:w-32 h-[1.5px] bg-gradient-to-r from-transparent via-amber-400 to-transparent relative mt-1.5 flex items-center justify-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-xs" />
                </div>
              </div>
            </div>
          </div>

          {/* Hàng dưới cùng: Nhóm nút lọc lĩnh vực với nền trong suốt */}
          <div className="w-full flex items-center justify-end pointer-events-auto pt-1">
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              {[
                {
                  key: 'all',
                  label: 'Tất cả (6)',
                  icon: (
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="9" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.6 9h16.8M3.6 15h16.8M12 3a15 15 0 014 9 15 15 0 01-4 9 15 15 0 01-4-9 15 15 0 014-9z" />
                    </svg>
                  ),
                },
                {
                  key: 'telecom',
                  label: 'Viễn thông',
                  icon: (
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0" />
                    </svg>
                  ),
                },
                {
                  key: 'commerce',
                  label: 'E-Commerce',
                  icon: (
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17" />
                    </svg>
                  ),
                },
                {
                  key: 'finance',
                  label: 'FinTech & Bảo hiểm',
                  icon: (
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  ),
                },
                {
                  key: 'gaming',
                  label: 'eSports',
                  icon: (
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14 10h4.764a2 2 0 011.789 2.894l-1.5 3A2 2 0 0117.264 17H6.736a2 2 0 01-1.789-1.106l-1.5-3A2 2 0 015.236 10H10" />
                    </svg>
                  ),
                },
                {
                  key: 'systems',
                  label: 'Xây dựng hệ thống',
                  icon: (
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                      <ellipse cx="12" cy="5" rx="9" ry="3" />
                      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
                      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
                    </svg>
                  ),
                },
              ].map((item) => {
                const isActive = filter === item.key;
                return (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => setFilter(item.key)}
                    className={`px-3 py-1 rounded-full text-[11px] font-bold font-play tracking-wide transition-all border cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                      isActive
                        ? 'bg-gradient-to-r from-blue-600 to-sky-500 text-white border-blue-600 shadow-xs'
                        : 'bg-white/95 text-slate-700 border-slate-200/90 hover:bg-white shadow-2xs'
                    }`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      )}

      {/* 3. VÙNG HIỂN THỊ NỘI DUNG LĨNH VỰC (GRID 6 THẺ CĂN CHỈNH CHIỀU CAO NẰM GỌN TRONG THẺ CHÍNH) */}
      <div className="w-full flex-1 min-h-0 relative flex flex-col">
        {!selectedDomain ? (
          /* Grid View 3x2 tự động co giãn chiều cao vừa khít thẻ chính với khoảng cách 15px */
          <div className="w-full h-full flex-1 min-h-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2 gap-[15px] items-stretch">
            {filteredDomains.map((domain) => {
              const cfg = getCardVisualConfig(domain.id);
              return (
                <div
                  key={domain.id}
                  onClick={() => setSelectedDomain(domain)}
                  onMouseEnter={() => setHoveredCardId(domain.id)}
                  onMouseLeave={() => setHoveredCardId(null)}
                  style={{ background: cfg.cardBg }}
                  className={`theme-pastel-card rounded-[20px] px-4 py-2.5 border ${cfg.cardBorder} shadow-[0_10px_26px_-4px_rgba(15,23,42,0.12),0_4px_10px_-2px_rgba(15,23,42,0.06),inset_0_1px_2px_rgba(255,255,255,0.95)] hover:shadow-[0_24px_50px_-8px_rgba(15,23,42,0.24),0_12px_24px_-4px_rgba(15,23,42,0.12),inset_0_1px_2px_rgba(255,255,255,1)] hover:-translate-y-2 hover:scale-[1.018] active:scale-[0.985] cursor-pointer group/card overflow-hidden relative transition-all duration-300 ease-out flex flex-col justify-between h-full min-h-0 text-left`}
                  title="Bấm để xem chi tiết đầy đủ"
                >
                  {/* Soft ambient background sampled directly from descriptive illustration surroundings */}
                  <div
                    className="absolute -right-8 -bottom-8 w-48 h-48 rounded-full pointer-events-none transition-all duration-500 opacity-75 group-hover/card:opacity-100 group-hover/card:scale-120 blur-2xl"
                    style={{ background: cfg.ambientGlow }}
                  />
                  <div className="absolute -right-6 -top-6 w-36 h-36 rounded-full bg-white/60 blur-xl pointer-events-none group-hover/card:scale-125 transition-transform duration-500" />

                  {/* Top & Middle Section: Left Content (6 cols) + Right 2x 3D Illustration (6 cols) */}
                  <div className="relative z-10 grid grid-cols-12 gap-2 items-center flex-1 min-h-0">
                    {/* Left 6 cols: Icon + Tiêu đề dịch vụ + Experience Pill + Font mô tả */}
                    <div className="col-span-6 flex flex-col justify-center gap-1.5 pr-0.5 min-w-0">
                      {/* Header row: Unframed Icon + Tiêu đề dịch vụ tự động xuống dòng khi không đủ chỗ */}
                      <div
                        className="flex items-start gap-1.5 transition-transform duration-300 group-hover/card:translate-x-0.5"
                        style={{ color: cfg.accentColor }}
                      >
                        <div className="w-[18px] h-[18px] shrink-0 mt-0.5 flex items-center justify-center transition-transform duration-300 group-hover/card:rotate-6 group-hover/card:scale-110">
                          {getDomainBadgeIcon(domain.id)}
                        </div>
                        <h4
                          className="text-[13px] sm:text-[14px] font-bold font-play leading-tight tracking-tight break-words flex-1"
                          style={{ color: cfg.accentColor }}
                        >
                          {domain.titleVi}
                        </h4>
                      </div>

                      {/* Experience Pill Badge with arrow */}
                      <div className="flex items-center">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold border shadow-2xs truncate max-w-full leading-tight transition-transform duration-300 group-hover/card:scale-105 ${cfg.pillBg}`}
                        >
                          <svg className="w-3 h-3 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-7-7 7 7-7 7" /></svg>
                          <span className="truncate">{domain.experienceVi}</span>
                        </span>
                      </div>

                      {/* Orientation Description (Kích thước bằng mô tả thẻ học vấn: text-[10.5px]) */}
                      <p className="text-[10.5px] font-medium text-slate-700 line-clamp-2 leading-tight">
                        {domain.orientationVi}
                      </p>
                    </div>

                    {/* Right 6 cols: Hình GIF mô tả tăng gấp đôi kích thước và phát animation khi over mouse */}
                    <div className="col-span-6 h-[140px] sm:h-[155px] lg:h-[165px] flex items-center justify-center relative pointer-events-none overflow-visible">
                      <div className="w-full h-full flex items-center justify-center p-1">
                        {renderCard3DIllustration(domain.id, hoveredCardId === domain.id)}
                      </div>
                    </div>
                  </div>

                  {/* Bottom Row: Partner Brand Pills (Logo tăng gấp đôi kích thước w-6 h-6) + Circular Chevron Button */}
                  <div className="relative z-10 pt-1.5 mt-0.5 border-t border-white/70 flex items-center justify-between gap-1.5 shrink-0">
                    <div className="flex items-center gap-1.5 flex-nowrap overflow-x-auto no-scrollbar">
                      {domain.logos.map((logo) => (
                        <div
                          key={logo.name}
                          className="logo-pill-light h-[32px] px-2.5 rounded-full bg-white/95 border border-white shadow-2xs flex items-center gap-1.5 hover:scale-108 transition-transform shrink-0"
                          title={logo.name}
                        >
                          <img
                            src={logo.src}
                            alt={logo.alt}
                            className="w-6 h-6 object-contain rounded-full shrink-0"
                            loading="lazy"
                          />
                          <span className="logo-pill-text text-[11px] font-extrabold text-slate-700 whitespace-nowrap">
                            {logo.alt}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Circular Action Arrow Button ( > ) with over mouse pop effect */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedDomain(domain);
                      }}
                      style={{
                        background: cfg.arrowBg,
                        boxShadow: cfg.arrowShadow,
                      }}
                      className="w-7 h-7 rounded-full text-white flex items-center justify-center shrink-0 transition-all duration-300 group-hover/card:translate-x-1 group-hover/card:scale-115 group-hover/card:shadow-lg cursor-pointer"
                      title="Xem chi tiết"
                    >
                      <svg className="w-3.5 h-3.5 stroke-[2.8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Detail View matching media_1792342244264_075ab15f.png */
          (() => {
            const extras = DOMAIN_EXTRAS[selectedDomain.id] || DOMAIN_EXTRAS['01'];
            return (
              <div className="w-full flex-1 flex flex-col justify-between gap-3 text-left">
                {/* 1. Breadcrumb Bar */}
                <div className="w-full flex items-center justify-between gap-3 pb-1 shrink-0">
                  <div className="flex items-center gap-2.5">
                    {/* Blue ID badge icon */}
                    <div className="w-7 h-7 rounded-lg bg-blue-500 text-white flex items-center justify-center shadow-xs">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                      </svg>
                    </div>

                    {/* Pill Button LĨNH VỰC HOẠT ĐỘNG */}
                    <button
                      type="button"
                      onClick={() => setSelectedDomain(null)}
                      className="px-3.5 py-1 rounded-full bg-blue-50 hover:bg-blue-100 text-blue-600 dark:bg-blue-950/60 dark:text-blue-300 font-extrabold text-xs font-play transition cursor-pointer border border-blue-200/80 dark:border-blue-800 shadow-2xs"
                    >
                      LĨNH VỰC HOẠT ĐỘNG
                    </button>

                    <span className="text-slate-400 font-bold text-sm">›</span>

                    {/* Current Title */}
                    <h3 className="text-sm sm:text-base font-black text-slate-900 dark:text-white font-play">
                      {selectedDomain.titleVi}
                    </h3>
                  </div>

                  {/* Back / Close button */}
                  <button
                    type="button"
                    onClick={() => setSelectedDomain(null)}
                    className="w-8 h-8 rounded-full bg-slate-100 hover:bg-rose-500 hover:text-white dark:bg-slate-800 dark:hover:bg-rose-600 text-slate-500 dark:text-slate-400 transition-all flex items-center justify-center cursor-pointer shadow-2xs"
                    title="Đóng chi tiết"
                  >
                    <svg className="w-4 h-4 stroke-[2.4]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* 2. Main Content Grid */}
                <div className="w-full flex-1 min-h-0 flex flex-col justify-between gap-3">
                  {/* ROW 1: Hero Banner + 3 Specs Cards + Narrative */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-stretch">
                    {/* Left Hero Card (lg:col-span-5) */}
                    <div className="lg:col-span-5 rounded-[22px] p-4 sm:p-5 bg-gradient-to-br from-[#ebf5ff] via-[#f0f8ff] to-[#ffffff] dark:from-slate-900/90 dark:via-slate-800/80 dark:to-slate-900/90 border border-sky-200/90 dark:border-white/10 shadow-xs relative overflow-hidden flex flex-col justify-between min-h-[200px]">
                      {/* Ambient Glow */}
                      <div className="absolute right-0 bottom-0 w-64 h-64 rounded-full bg-sky-300/20 blur-3xl pointer-events-none" />

                      <div className="flex items-start justify-between gap-3 relative z-10">
                        <div className="space-y-1.5 flex-1">
                          {/* Circular Glowing Icon ((📡)) */}
                          <div className="w-13 h-13 rounded-full bg-gradient-to-tr from-sky-400 via-blue-500 to-blue-600 text-white flex items-center justify-center shadow-md">
                            {getDomainBadgeIcon(selectedDomain.id)}
                          </div>

                          <h2 className="text-xl sm:text-[22px] font-black text-slate-900 dark:text-white font-play tracking-tight pt-1 leading-tight">
                            {selectedDomain.titleVi}
                          </h2>

                          <p className="text-xs text-slate-600 dark:text-slate-300 font-medium leading-relaxed max-w-[270px]">
                            {extras.heroSubtitle}
                          </p>
                        </div>

                        {/* 3D Holographic Illustration on the right */}
                        <div className="w-36 h-36 shrink-0 relative flex items-center justify-center">
                          {renderCard3DIllustration(selectedDomain.id)}
                        </div>
                      </div>

                      {/* Bottom Capsule Pill: Hạ tầng số • Kết nối • Trải nghiệm vượt trội */}
                      <div className="relative z-10 pt-2.5">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/90 dark:bg-slate-800/90 border border-sky-200/90 dark:border-white/10 shadow-2xs text-[10.5px] font-bold text-sky-700 dark:text-sky-300">
                          {extras.heroTags.map((tag, tIdx) => (
                            <React.Fragment key={tIdx}>
                              {tIdx > 0 && <span className="text-sky-400 font-black">•</span>}
                              <span>{tag}</span>
                            </React.Fragment>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Right Section (lg:col-span-7) */}
                    <div className="lg:col-span-7 flex flex-col justify-between gap-2.5">
                      {/* 3 Metric Cards Row */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                        {/* Card 1: Vai trò & Trách nhiệm vận hành */}
                        <div className="rounded-2xl p-3 bg-gradient-to-br from-[#f0f7ff] to-[#ffffff] dark:from-blue-950/40 dark:to-slate-900/60 border border-sky-100 dark:border-white/10 shadow-2xs flex flex-col justify-between gap-1.5">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/60 text-blue-600 dark:text-blue-300 flex items-center justify-center shrink-0">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                              </svg>
                            </div>
                            <div className="min-w-0 flex-1">
                              <h4 className="text-[11.5px] font-black text-slate-900 dark:text-slate-100 font-play truncate">
                                Vai trò & Trách nhiệm
                              </h4>
                              <span className="inline-block mt-0.5 text-[8.5px] font-mono font-bold text-blue-600 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/80 px-2 py-0.2 rounded-full border border-blue-200 dark:border-blue-800">
                                {extras.roleBadge}
                              </span>
                            </div>
                          </div>
                          <ul className="space-y-1 text-left mt-0.5">
                            {extras.roleBullets.map((b, bIdx) => (
                              <li key={bIdx} className="text-[9.5px] leading-snug text-slate-600 dark:text-slate-300 font-medium flex items-start gap-1">
                                <span className="text-slate-400 font-bold shrink-0">•</span>
                                <span>{b}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Card 2: Quy mô đội ngũ */}
                        <div className="rounded-2xl p-3 bg-gradient-to-br from-[#f0fdf4] to-[#ffffff] dark:from-emerald-950/40 dark:to-slate-900/60 border border-emerald-100 dark:border-white/10 shadow-2xs flex flex-col justify-between gap-1.5">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/60 text-emerald-600 dark:text-emerald-300 flex items-center justify-center shrink-0">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                            </div>
                            <div className="min-w-0 flex-1">
                              <h4 className="text-[11.5px] font-black text-slate-900 dark:text-slate-100 font-play truncate">
                                Quy mô đội ngũ
                              </h4>
                              <span className="inline-block mt-0.5 text-[8.5px] font-mono font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/80 px-2 py-0.2 rounded-full border border-emerald-200 dark:border-emerald-800">
                                {extras.teamBadge}
                              </span>
                            </div>
                          </div>
                          <ul className="space-y-1 text-left mt-0.5">
                            {extras.teamBullets.map((b, bIdx) => (
                              <li key={bIdx} className="text-[9.5px] leading-snug text-slate-600 dark:text-slate-300 font-medium flex items-start gap-1">
                                <span className="text-slate-400 font-bold shrink-0">•</span>
                                <span>{b}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Card 3: Công nghệ & Hệ thống */}
                        <div className="rounded-2xl p-3 bg-gradient-to-br from-[#faf5ff] to-[#ffffff] dark:from-purple-950/40 dark:to-slate-900/60 border border-purple-100 dark:border-white/10 shadow-2xs flex flex-col justify-between gap-1.5">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/60 text-purple-600 dark:text-purple-300 flex items-center justify-center shrink-0">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                            </div>
                            <div className="min-w-0 flex-1">
                              <h4 className="text-[11.5px] font-black text-slate-900 dark:text-slate-100 font-play truncate">
                                Công nghệ & Hệ thống
                              </h4>
                              <span className="inline-block mt-0.5 text-[8.5px] font-mono font-bold text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-950/80 px-2 py-0.2 rounded-full border border-purple-200 dark:border-purple-800">
                                {extras.techBadge}
                              </span>
                            </div>
                          </div>
                          <ul className="space-y-1 text-left mt-0.5">
                            {extras.techBullets.map((b, bIdx) => (
                              <li key={bIdx} className="text-[9.5px] leading-snug text-slate-600 dark:text-slate-300 font-medium flex items-start gap-1">
                                <span className="text-slate-400 font-bold shrink-0">•</span>
                                <span>{b}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Middle Card: Mô tả chi tiết lĩnh vực */}
                      <div className="rounded-2xl p-3 sm:p-3.5 bg-white/95 dark:bg-slate-800/90 border border-slate-100 dark:border-white/10 shadow-2xs flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/60 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0 mt-0.5">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                        <div className="space-y-0.5 flex-1">
                          <h4 className="text-xs sm:text-[13px] font-black text-slate-900 dark:text-white font-play">
                            Mô tả chi tiết lĩnh vực
                          </h4>
                          <p className="text-[11px] sm:text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                            {extras.descText}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* ROW 2: Kết quả & Thành tựu nổi bật + Đối tác & Khách hàng tiêu biểu */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-stretch">
                    {/* Left (lg:col-span-7): Kết quả & Thành tựu nổi bật */}
                    <div className="lg:col-span-7 rounded-[22px] p-3.5 sm:p-4 bg-white/95 dark:bg-slate-900/90 border border-slate-100 dark:border-white/10 shadow-xs flex flex-col justify-between gap-2.5">
                      {/* Header */}
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-amber-100 dark:bg-amber-900/60 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5 2a2 2 0 00-2 2v14l3.5-2 3.5 2 3.5-2 3.5 2V4a2 2 0 00-2-2H5zm4.707 3.707a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L8.414 7H12a2 2 0 012 2v1a1 1 0 102 0V9a4 4 0 00-4-4H8.414l1.293-1.293z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <h3 className="text-xs sm:text-sm font-black text-slate-900 dark:text-white font-play">
                          Kết quả & Thành tựu nổi bật
                        </h3>
                      </div>

                      {/* 4 Metric Cards */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {extras.metrics.map((m, mIdx) => (
                          <div
                            key={mIdx}
                            className={`rounded-2xl p-2.5 sm:p-3 flex flex-col justify-between border ${m.cardStyle} shadow-2xs`}
                          >
                            <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${m.iconStyle}`}>
                              {renderMetricIcon(m.type)}
                            </div>
                            <div className="mt-2 space-y-0.5">
                              <span className="text-[9.5px] text-slate-500 dark:text-slate-400 font-medium block leading-tight">
                                {m.label}
                              </span>
                              <span className={`text-lg sm:text-xl font-black font-mono tracking-tight block leading-tight ${m.valColor}`}>
                                {m.value}
                              </span>
                              <span className="text-[9px] text-slate-400 font-medium block leading-none">
                                {m.sub}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Right (lg:col-span-5): Đối tác & Khách hàng tiêu biểu */}
                    <div className="lg:col-span-5 rounded-[22px] p-3.5 sm:p-4 bg-white/95 dark:bg-slate-900/90 border border-slate-100 dark:border-white/10 shadow-xs flex flex-col justify-between gap-2.5">
                      {/* Header */}
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-blue-100 dark:bg-blue-900/60 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                          </svg>
                        </div>
                        <h3 className="text-xs sm:text-sm font-black text-slate-900 dark:text-white font-play">
                          Đối tác & Khách hàng tiêu biểu
                        </h3>
                      </div>

                      {/* 4 Partner Cards */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {extras.partners.map((p, pIdx) => (
                          <div
                            key={pIdx}
                            className="rounded-xl bg-white dark:bg-slate-800/90 border border-slate-100 dark:border-white/10 shadow-2xs p-2 flex flex-col items-center justify-between text-center min-h-[92px] hover:shadow-xs transition"
                          >
                            <div className="h-8 w-full flex items-center justify-center my-auto">
                              <img
                                src={p.logo}
                                alt={p.name}
                                className="max-h-7 max-w-[85%] object-contain"
                              />
                            </div>
                            <div className="space-y-0.5 w-full">
                              <h5 className="text-[10.5px] font-black text-slate-800 dark:text-slate-100 leading-tight truncate">
                                {p.name}
                              </h5>
                              <p className="text-[8.5px] text-slate-400 leading-none truncate">
                                {p.sub}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })()
        )}
      </div>
    </div>
  );
};
