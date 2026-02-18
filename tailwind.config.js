/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0B0D10",
        graphite: "#151A21",
        steel: "#2A313C",
        fog: "#C7CEDA",
        paper: "#F2F4F7",
        electric: "#2D6BFF",
        signal: "#FF3B3B",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Space Grotesk", "Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
      boxShadow: {
        insetHairline: "inset 0 0 0 1px rgba(242,244,247,0.08)",
      },
    },
  },
  plugins: [],
};
