import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
        },
        banner: {
          light: '#53eaff',
          DEFAULT: '#53eaff',
        },
        header: {
          dark: '#2563eb',
          600: '#2563eb',
          700: '#1e40af',
          DEFAULT: '#2563eb',
        },
      },
    },
  },
  plugins: [],
}

export default config


