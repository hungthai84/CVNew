import { ThemeOption } from '@/types';

export const THEME_LIST: ThemeOption[] = [
  {
    id: 'light-glass',
    name: 'Glass UI Light Multicolor',
    fourWordName: 'Kính sáng đa sắc',
    icon: 'Sun',
    badge: 'Kính Sáng (Mặc định)',
    description: 'Giao diện kính sáng đa màu, nền trắng – lavender, glassmorphism mềm mại, card pastel và ánh sáng tinh tế.',
    accentColor: '#60A5FA',
    isDark: false,
  },
  {
    id: 'dark-neon',
    name: 'Glass UI Dark Neon Multicolor',
    fourWordName: 'Kính tối đa sắc',
    icon: 'Moon',
    badge: 'Kính Tối Neon',
    description: 'Giao diện nền tối huyền bí kết hợp hiệu ứng kính neon đa sắc rực rỡ.',
    accentColor: '#A78BFA',
    isDark: true,
  },
];
