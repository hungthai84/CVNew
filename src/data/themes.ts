import { ThemeOption } from '@/types';

export const THEME_LIST: ThemeOption[] = [
  {
    id: 'light-glass',
    name: 'Glass UI Light Multicolor',
    fourWordName: 'Kính sáng đa sắc',
    icon: 'Sun',
    badge: 'Light Glass (Mặc định)',
    description: 'Giao diện kính sáng đa màu, nền trắng – lavender, glassmorphism mềm mại, card pastel và ánh sáng tinh tế.',
    accentColor: '#60A5FA',
    isDark: false,
  },
  {
    id: 'luminous-glass',
    name: 'NDesign Luminous Glass Showcase',
    fourWordName: 'Kính sáng quang phổ',
    icon: 'Sparkles',
    badge: 'Luminous Glass (Mới)',
    description: 'Giao diện kính phát quang đa sắc chuyển động (Ambient Mesh Gradient & Floating Glass Blobs), lớp kính mờ bão hòa cao (saturate 190%) và viền sáng phản chiếu đa chiều.',
    accentColor: '#38BDF8',
    isDark: false,
  },
  {
    id: 'dark-neon',
    name: 'Glass UI Dark Neon Multicolor',
    fourWordName: 'Kính tối đa sắc',
    icon: 'Moon',
    badge: 'Dark Neon',
    description: 'Giao diện nền tối huyền bí kết hợp hiệu ứng kính neon đa sắc rực rỡ.',
    accentColor: '#A78BFA',
    isDark: true,
  },
];
