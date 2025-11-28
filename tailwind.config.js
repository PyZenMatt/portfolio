/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Placeholder for custom color palette
      },
      fontSize: {
        // Typography Scale 2025 - Minimalismo Tecnico
        'display': ['3.75rem', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],    // 60px - Hero H1
        'h1': ['3rem', { lineHeight: '1.15', letterSpacing: '-0.02em', fontWeight: '700' }],           // 48px
        'h2': ['2.25rem', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '600' }],         // 36px
        'h3': ['1.5rem', { lineHeight: '1.3', fontWeight: '600' }],                                     // 24px
        'h4': ['1.25rem', { lineHeight: '1.4', fontWeight: '500' }],                                    // 20px
        'h5': ['1.125rem', { lineHeight: '1.5', fontWeight: '500' }],                                   // 18px
        'body': ['1rem', { lineHeight: '1.7' }],                                                        // 16px
        'small': ['0.875rem', { lineHeight: '1.5' }],                                                   // 14px
        'micro': ['0.75rem', { lineHeight: '1.4' }],                                                    // 12px
      },
      spacing: {
        // Placeholder for custom spacing system
      },
      borderRadius: {
        // Placeholder for custom border radius
      },
      boxShadow: {
        // Placeholder for custom shadow system
      },
    },
  },
  plugins: [],
}
