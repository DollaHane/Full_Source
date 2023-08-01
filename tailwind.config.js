const { fontFamily } = require("tailwindcss/defaultTheme")

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["src/app/**/*.{ts,tsx}", "src/components/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        capecod: {
          50: 'hsl(180, 6%, 97%)',
          100: 'hsl(168, 9%, 89%)',
          200: 'hsl(173, 8%, 78%)',
          300: 'hsl(176, 8%, 64%)',
          400: 'hsl(176, 7%, 50%)',
          500: 'hsl(177, 9%, 40%)',
          600: 'hsl(180, 8%, 32%)',
          700: 'hsl(180, 8%, 27%)',
          800: 'hsl(189, 6%, 22%)',
          900: 'hsl(180, 7%, 19%)',
          950: 'hsl(180, 10%, 10%)',
        },
      },
      borderRadius: {
        lg: `var(--radius)`,
        md: `calc(var(--radius) - 2px)`,
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["Prompt", ...fontFamily.sans],
        prompt: ['Prompt', ...fontFamily.sans],
        indie: ['Indie Flower', ...fontFamily.sans],
        bangers: ['Bangers', ...fontFamily.sans],
        galada: ['Galada', ...fontFamily.sans],
        chivo: ['Chivo Mono', ...fontFamily.sans],
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        "accordion-left": {
          from: { width: 0 },
          to: { width: "300px" },
        },
        "accordion-right": {
          from: { width: "300px" },
          to: { width: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "accordion-left": "accordion-left 0.5s linear",
        "accordion-right": "accordion-right 0.5s linear",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
