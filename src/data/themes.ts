import { ThemeOption } from '@/types';

export const THEME_LIST: ThemeOption[] = [
  {
    id: 'dark-neon',
    name: 'Glass UI Dark Neon Multicolor',
    fourWordName: 'Kính tối đa sắc',
    icon: 'Moon',
    badge: 'Kính Tối Neon (Mặc định)',
    description: 'Giao diện nền tối huyền bí kết hợp hiệu ứng kính neon đa sắc rực rỡ.',
    accentColor: '#A78BFA',
    isDark: true,
  },
  {
    id: 'light-glass',
    name: 'Glass UI Light Multicolor',
    fourWordName: 'Kính sáng đa sắc',
    icon: 'Sun',
    badge: 'Kính Sáng Pastel Glass',
    description: 'Giao diện nền sáng trong suốt thanh lịch, phong cách Glassmorphism & Soft Claymorphism tinh tế.',
    accentColor: '#60A5FA',
    isDark: false,
  },
];
