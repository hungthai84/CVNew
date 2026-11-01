import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ['class', '[data-theme="dark-neon"]'],
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-family-base)", "Play", "sans-serif"],
        play: ["var(--font-family-base)", "Play", "sans-serif"],
        mono: ["var(--font-family-base)", "Play", "sans-serif"],
      },
      fontWeight: {
        normal: "var(--weight-regular, 400)",
        regular: "var(--weight-regular, 400)",
        medium: "var(--weight-medium, 500)",
        semibold: "var(--weight-semibold, 600)",
        bold: "var(--weight-bold, 700)",
        extrabold: "var(--weight-bold, 700)",
        black: "var(--weight-bold, 700)",
      },
      letterSpacing: {
        tighter: "-0.02em",
        tight: "var(--tracking-heading, -0.015em)",
        normal: "var(--tracking-body, 0em)",
        wide: "0.02em",
        wider: "0.03em",
        widest: "var(--tracking-overline, 0.04em)",
      },
      screens: {
        xs: "480px",
      },
      boxShadow: {
        "2xs": "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
        xs: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)",
      },
      borderRadius: {
        xs: "4px",
        sm: "8px",
        md: "12px",
        lg: "16px",
        xl: "20px",
        "2xl": "24px",
        "3xl": "32px",
        full: "9999px",
        // Phân cấp theo thành phần Design System
        "main-container": "24px",
        "dashboard-container": "24px",
        "bento-card": "20px",
        "glass-card": "20px",
        card: "20px",
        modal: "24px",
        btn: "12px",
        input: "12px",
        img: "14px",
        badge: "9999px",
      },
      cursor: {
        default: 'var(--cursor-default)',
        pointer: 'var(--cursor-pointer)',
        text: 'var(--cursor-text)',
        'not-allowed': 'var(--cursor-disabled)',
        help: 'var(--cursor-help)',
        move: 'var(--cursor-move)',
        grab: 'var(--cursor-grab)',
        crosshair: 'var(--cursor-crosshair)',
        wait: 'var(--cursor-wait)',
      },
    },
  },
  plugins: [],
};

export default config;
