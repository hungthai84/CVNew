import { ThemeOption } from '@/types';

export const THEME_LIST: ThemeOption[] = [
  {
    id: 'light-glass',
    name: 'Glass UI Light Multicolor',
    fourWordName: 'Kính sáng đa sắc',
    icon: 'Sun',
    badge: 'Light Glass',
    description: 'Giao diện kính sáng đa màu, nền trắng – lavender, glassmorphism mềm mại, card pastel và ánh sáng tinh tế.',
    accentColor: '#60A5FA',
    isDark: false,
  },
  {
    id: 'dark-neon',
    name: 'Glass UI Dark Neon Multicolor',
    fourWordName: 'Kính tối neon',
    icon: 'Moon',
    badge: 'Dark Neon',
    description: 'Giao diện kính tối, neon đa sắc, ánh sáng chiều sâu và chuyển động hiện đại.',
    accentColor: '#22D3EE',
    isDark: true,
  },
  {
    id: 'flat-rainbow',
    name: 'Flat UI Light Multicolor',
    fourWordName: 'Phẳng sáng đa sắc',
    icon: 'Palette',
    badge: 'Flat Light',
    description: 'Giao diện phẳng sáng, pastel đa sắc, bố cục sạch sẽ, card tự co giãn và typography dễ đọc.',
    accentColor: '#60A5FA',
    isDark: false,
  },
];
