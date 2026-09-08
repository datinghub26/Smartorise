import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#05080F",
        surface: "#0B1120",
        slate: {
          850: "#151e32",
          900: "#0f172a",
          950: "#05080f",
        },
      },
    },
  },
  plugins: [],
};
export default config;
