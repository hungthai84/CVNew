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
        card: "14px",
        "2xl": "14px",
        "3xl": "14px",
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
