/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'ark-bg': '#0a0a0f',
        'ark-card': '#13131a',
        'ark-border': '#1f1f2e',
        'ark-cyan': '#00d9ff',
        'ark-gold': '#fbbf24',
        'ark-text': '#e5e7eb',
        'ark-muted': '#6b7280',
      },
      fontFamily: {
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
    },
  },
  plugins: [],
};
