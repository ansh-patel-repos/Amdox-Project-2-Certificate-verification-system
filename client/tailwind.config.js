/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#6366f1",
        secondary: "#8b5cf6",
        accent: "#ec4899",

        success: "#22c55e",
        danger: "#ef4444",
        warning: "#f59e0b",

        glass: "rgba(255,255,255,0.6)",
      },

      boxShadow: {
        soft: "0 8px 30px rgba(0,0,0,0.08)",
        premium: "0 10px 40px rgba(0,0,0,0.15)",
      },

      borderRadius: {
        xl2: "20px",
      },

      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};