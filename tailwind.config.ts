import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        'logo-gray': '#E4EBF3',
      },
    },
  },
  plugins: [],
};

export default config;
