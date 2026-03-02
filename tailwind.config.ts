import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        brand: [
          "SachieScript",
          "ui-serif",
          "Georgia",
          "serif",
        ],
        serif: ["ui-serif", "Georgia", "serif"],
        sans: [
          "ui-sans-serif",
          "system-ui",
          "Segoe UI",
          "Roboto",
          "Helvetica",
          "Arial",
        ],
      },
      letterSpacing: {
        wide2: "0.2em",
      },
    },
  },
  plugins: [],
} satisfies Config;