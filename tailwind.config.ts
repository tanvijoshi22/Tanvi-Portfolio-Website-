import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./styles/**/*.css",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Plus Jakarta Sans', 'sans-serif'],
        body:    ['DM Sans', 'sans-serif'],
        mono:    ['Courier Prime', 'monospace'],
      },
      colors: {
        'accent-blue':   '#2B4EFF',
        'accent-orange': '#E85D26',
        'near-black':    '#1C1C1C',
        'muted-text':    '#6B6B6B',
        'card-bg':       '#F2F1EE',
        'off-white':     '#F7F6F3',
      },
    },
  },
  plugins: [],
};
export default config;
