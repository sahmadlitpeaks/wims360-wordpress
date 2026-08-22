import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        surface: "var(--surface)",
        paper: "var(--paper)",
        cream: "var(--cream)",
        ink: "var(--ink)",
        muted: "var(--muted)",
        line: "var(--line)",
        green: "var(--green)",
        "green-mid": "var(--green-mid)",
        "green-deep": "var(--green-deep)",
        "green-soft": "var(--green-soft)",
        brass: "var(--brass)",
        "brass-deep": "var(--brass-deep)",
        "brass-light": "var(--brass-light)",
        "brass-bright": "var(--brass-bright)",
        amber: "var(--amber)",
      },
      fontFamily: {
        display: ["var(--font-display)", "Instrument Serif", "serif"],
        body: ["var(--font-body)"],
        mono: ["var(--font-mono)"],
      },
    },
  },
  plugins: [],
};

export default config;
