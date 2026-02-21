import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2563eb',
        secondary: '#64748b',
      },
      spacing: {
        '128': '32rem',
      },
      typography: {
        DEFAULT: {
          css: {
            color: '#374151',
          },
        },
      },
    },
  },
  plugins: [],
};

export default config;
