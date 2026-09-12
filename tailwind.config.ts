import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        dhaka: {
          navy: "#0a1128",
          blue: "#1c4ed8",
          cyan: "#06b6d4",
          light: "#f8fafc",
          dark: "#020617"
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // English
        bengali: ['Noto Sans Bengali', 'sans-serif'], // For Bangla text
      },
      boxShadow: {
        'glass': '0 4px 30px rgba(0, 0, 0, 0.1)',
      }
    },
  },
  plugins: [],
};
export default config;
