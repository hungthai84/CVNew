import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ['class', '[data-theme="dark-neon"]'],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-play)", "Play", "sans-serif"],
        play: ["var(--font-play)", "Play", "sans-serif"],
      },
      screens: {
        xs: "480px",
      },
      boxShadow: {
        "2xs": "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
        xs: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)",
      },
    },
  },
  plugins: [],
};

export default config;
