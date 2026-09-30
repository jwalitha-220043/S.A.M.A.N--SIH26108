/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        jarvis: {
          cyan: "#00f3ff",
          blue: "#0066ff",
          purple: "#7928ca",
          pink: "#ff0080",
          neonGreen: "#00ff66",
          darkBg: "#050714",
          cardBg: "rgba(13, 19, 43, 0.75)"
        }
      },
      animation: {
        'pulse-glow': 'pulseGlow 2s infinite alternate',
        'float-slow': 'float 6s ease-in-out infinite',
        'spin-slow': 'spin 12s linear infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%': { boxShadow: '0 0 15px rgba(0, 243, 255, 0.4), inset 0 0 15px rgba(0, 243, 255, 0.2)' },
          '100%': { boxShadow: '0 0 40px rgba(0, 243, 255, 0.9), inset 0 0 25px rgba(0, 243, 255, 0.6)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-15px)' },
        }
      }
    },
  },
  plugins: [],
}
