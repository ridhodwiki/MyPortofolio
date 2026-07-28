import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'hd': '1280px',     // 720p
        'fhd': '1920px',    // 1080p
        '2k': '2560px',     // QHD
        '4k': '3840px',     // UHD
      },
      colors: {
        base: "#050816",
        surface: "#0A0F24",
        primary: {
          DEFAULT: "#6C63FF",
          dim: "#514AC7",
          glow: "#8B84FF",
        },
        secondary: {
          DEFAULT: "#00E5FF",
          dim: "#00B8CC",
        },
        accent: {
          DEFAULT: "#FF4D9D",
          dim: "#D93E82",
        },
        text: {
          DEFAULT: "#FFFFFF",
          secondary: "#B5B5B5",
          muted: "#7A7F9A",
        },
      },
      fontFamily: {
        sans: [
          "Inter",
          "Satoshi",
          "-apple-system",
          "BlinkMacSystemFont",
          "sans-serif",
        ],
        display: ["Inter", "Satoshi", "sans-serif"],
      },
      backgroundImage: {
        "grid-pattern":
          "linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)",
        "radial-glow":
          "radial-gradient(circle at center, rgba(108,99,255,0.18), transparent 70%)",
      },
      backgroundSize: {
        grid: "44px 44px",
      },
      boxShadow: {
        glow: "0 0 40px rgba(108, 99, 255, 0.35)",
        "glow-cyan": "0 0 40px rgba(0, 229, 255, 0.3)",
        "glow-pink": "0 0 40px rgba(255, 77, 157, 0.3)",
        glass: "0 8px 32px rgba(0, 0, 0, 0.37)",
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "float-slow": "float 9s ease-in-out infinite",
        "spin-slow": "spin 12s linear infinite",
        glow: "glow 3s ease-in-out infinite",
        marquee: "marquee 30s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-16px)" },
        },
        glow: {
          "0%, 100%": { opacity: "0.55" },
          "50%": { opacity: "1" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};

export default config;
