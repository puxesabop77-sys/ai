import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        bg: "#0b0f19",
        panel: "#111827",
        panel2: "#0f172a",
        border: "#1f2937",
        text: "#f8fafc",
        muted: "#94a3b8",
        accent: "#10a37f",
        userBubble: "#10a37f",
        aiBubble: "#182235"
      }
    }
  },
  plugins: []
};

export default config;
