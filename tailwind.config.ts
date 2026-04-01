import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0F172A", // Midnight Slate
        accent: "#C5A059", // Champagne Gold
        surface: "#FAF9F6", // Bone White
      },
      fontFamily: {
        gujarati: ["var(--font-hind-vadodara)", "sans-serif"],
        sans: ["var(--font-inter)", "sans-serif"],
      },
      backgroundImage: {
        "premium-gradient": "linear-gradient(135deg, #0F172A 0%, #1e293b 100%)",
        "accent-gradient": "linear-gradient(135deg, #C5A059 0%, #A88648 100%)",
      },
    },
  },
  plugins: [],
};
export default config;
