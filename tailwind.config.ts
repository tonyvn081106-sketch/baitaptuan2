import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}", // <--- Đoạn này cực kỳ quan trọng để Tailwind quét qua thư mục src của bạn
  ],
  theme: {
    extend: {
      colors: {
        'brand-primary': 'var(--color-brand-primary)',
        'brand-dark': 'var(--color-brand-dark)',
        'brand-bg': 'var(--color-brand-bg)',
        'text-main': 'var(--color-text-main)',
        'text-body': 'var(--color-text-body)',
        'text-muted': 'var(--color-text-muted)',
      },
    },
  },
  plugins: [],
};
export default config;