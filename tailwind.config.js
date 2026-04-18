/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Surfaces
        canvas: "#fafaf8",
        surface: "#ffffff",
        // Text
        ink: "#1f2937",
        muted: "#6b6b6b",
        subtle: "#6a707d",
        // Borders
        line: "#f0efeb",
        "line-soft": "#ebedf8",
        // Brand — Green
        green: {
          50: "#eff6f0",
          100: "#d8e8db",
          200: "#d2e4d6",
          500: "#4a8c5c",
          600: "#3f8753",
          700: "#2d7f44",
        },
        // Brand — Purple
        purple: {
          50: "#f3f0fa",
          100: "#e7dcff",
          200: "#e2d5ff",
          300: "#ded0ff",
          700: "#451ca3",
        },
        // Brand — Sand
        sand: {
          50: "#f5f5ed",
          100: "#f3f0e9",
          200: "#e5d8b4",
          300: "#f6e8ca",
        },
      },
      spacing: {
        5: "5px",
        10: "10px",
        15: "15px",
        20: "20px",
        25: "25px",
        30: "30px",
        45: "45px",
      },
      borderRadius: {
        sm: "4px",
        md: "10px",
        lg: "16px",
        pill: "999px",
      },
      fontFamily: {
        display: ['Newsreader', 'ui-serif', 'Georgia', 'serif'],
        sans: ['Onest', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        "2xs": ["10px", "1.2"],
        xs: ["12px", "1.4"],
        sm: ["14px", "1.4"],
        base: ["15px", "1.5"],
        lg: ["16px", "1.4"],
        xl: ["22px", "1.2"],
        "2xl": ["24px", "1.2"],
        "4xl": ["40px", "1.1"],
      },
      boxShadow: {
        card: "0 10px 10px 0 #f5f5ed",
        soft: "0 1px 2px 0 rgba(16,24,40,0.04)",
      },
      letterSpacing: {
        eyebrow: "0.72px",
        wide2: "2px",
      },
    },
  },
  plugins: [],
};
