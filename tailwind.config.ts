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
        hd: "1280px",
        fhd: "1920px",
        "2k": "2560px",
        "4k": "3840px",
      },
      colors: {
        canvas: "rgb(var(--c-base) / <alpha-value>)",
        surface: "rgb(var(--c-surface) / <alpha-value>)",
        line: "rgb(var(--c-line) / <alpha-value>)",
        primary: {
          DEFAULT: "rgb(var(--c-primary) / <alpha-value>)",
          dim: "rgb(var(--c-primary-dim) / <alpha-value>)",
          glow: "rgb(var(--c-primary-glow) / <alpha-value>)",
        },
        onPrimary: "rgb(var(--c-on-primary) / <alpha-value>)",
        secondary: {
          DEFAULT: "rgb(var(--c-secondary) / <alpha-value>)",
          dim: "rgb(var(--c-secondary-dim) / <alpha-value>)",
        },
        accent: {
          DEFAULT: "rgb(var(--c-accent) / <alpha-value>)",
          dim: "rgb(var(--c-accent-dim) / <alpha-value>)",
        },
        hue: {
          violet: "rgb(var(--c-violet) / <alpha-value>)",
          blue: "rgb(var(--c-blue) / <alpha-value>)",
          cyan: "rgb(var(--c-cyan) / <alpha-value>)",
          emerald: "rgb(var(--c-emerald) / <alpha-value>)",
          amber: "rgb(var(--c-amber) / <alpha-value>)",
          rose: "rgb(var(--c-rose) / <alpha-value>)",
        },
        text: {
          DEFAULT: "rgb(var(--c-text) / <alpha-value>)",
          secondary: "rgb(var(--c-text-secondary) / <alpha-value>)",
          muted: "rgb(var(--c-text-muted) / <alpha-value>)",
        },
      },
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
        display: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
        mono: [
          "JetBrains Mono",
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Consolas",
          "monospace",
        ],
      },
    },
  },
  plugins: [],
};

export default config;
