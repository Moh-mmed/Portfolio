import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0f172a",
        mist: "#eef4ff",
        stone: "#64748b",
        line: "#d9e2f2",
        accent: {
          DEFAULT: "#2563eb",
          soft: "#dbeafe",
          deep: "#1d4ed8"
        }
      },
      boxShadow: {
        panel: "0 18px 50px rgba(15, 23, 42, 0.08)"
      },
      borderRadius: {
        panel: "0.75rem"
      },
      backgroundImage: {
        "mesh-gradient":
          "radial-gradient(circle at top, rgba(37, 99, 235, 0.18), transparent 36%), radial-gradient(circle at 80% 20%, rgba(14, 165, 233, 0.12), transparent 28%)"
      }
    }
  },
  plugins: []
};

export default config;
