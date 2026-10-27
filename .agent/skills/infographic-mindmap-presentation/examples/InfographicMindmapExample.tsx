import React from 'react';
import { InfographicMindmap, MindmapCardData } from '@/components/ui/InfographicMindmap';

export const InfographicMindmapExample: React.FC = () => {
  const sampleCards: MindmapCardData[] = [
    {
      id: 'skill-01',
      categoryFilter: 'S',
      themeColor: '#0284c7',
      cardBg: 'linear-gradient(135deg, #ffffff 0%, #e0f2fe 100%)',
      cardDarkBg: 'linear-gradient(135deg, #090e17 0%, #0c4a6e 100%)',
      cardBorder: 'border-sky-300 dark:border-sky-500/40',
      title: 'Nền Tảng Vận Hành',
      groupHeading: 'Quản trị điều hành',
      subTag: 'Thực chiến 22+ năm',
      desc: 'Năng lực cốt lõi xây dựng và điều hành hệ thống dịch vụ khách hàng đa kênh quy mô lớn.',
      metricLabel: 'Mức độ tinh thông',
      pills: [
        { name: 'Trải nghiệm khách hàng', score: '98%', desc: 'Tối ưu hóa hành trình khách hàng' },
        { name: 'KPI SLA vận hành', score: '96%', desc: 'Thiết lập bộ chỉ số giám sát' },
        { name: 'Xử lý khủng hoảng', score: '94%', desc: 'Xử lý sự cố dịch vụ khẩn cấp' },
      ],
      details: [
        { title: 'Thiết kế SOP chuẩn hóa', percent: 95, desc: 'Chuẩn hóa quy trình vận hành' },
      ],
    },
    {
      id: 'skill-02',
      categoryFilter: 'W',
      themeColor: '#2563eb',
      cardBg: 'linear-gradient(135deg, #ffffff 0%, #dbeafe 100%)',
      cardDarkBg: 'linear-gradient(135deg, #090e17 0%, #1e3a8a 100%)',
      cardBorder: 'border-blue-300 dark:border-blue-500/40',
      title: 'Nâng Cao Quản Trị',
      groupHeading: 'Chiến lược phát triển',
      subTag: 'Mở rộng quy mô',
      desc: 'Hoàn thiện năng lực hoạch định ngân sách, quản trị rủi ro và xây dựng văn hóa lấy khách hàng làm trung tâm.',
      metricLabel: 'Mức độ hoàn thiện',
      pills: [
        { name: 'Quản trị chi phí', score: '80%', desc: 'Kiểm soát P&L tối ưu' },
        { name: 'Quản trị rủi ro', score: '80%', desc: 'Dự báo nguy cơ gián đoạn' },
      ],
      details: [
        { title: 'Văn hóa khách hàng', percent: 85, desc: 'Lan tỏa tinh thần phụng sự' },
      ],
    },
  ];

  return (
    <div className="w-full p-4">
      <InfographicMindmap
        cards={sampleCards}
        isDark={false}
        onSelectCard={(c) => console.log('Selected card:', c.id)}
      />
    </div>
  );
};
