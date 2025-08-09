import type { Config } from "tailwindcss"

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./pages/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#10b981", // emerald
          foreground: "#0b3b2e",
        },
        background: "var(--background)",
        foreground: "var(--foreground)",
        border: "var(--border)",
      },
        borderColor: {
          DEFAULT: "var(--border)",
        }
    },
  },
  plugins: [],
} satisfies Config
