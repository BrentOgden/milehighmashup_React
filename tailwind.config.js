// tailwind.config.js
import textShadow from 'tailwindcss-textshadow';

export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      // If you still want the plugin-based text-shadow:
      textShadow: {
        'amber-2xs': '1px 1px 2px rgba(252,211,77,0.8)',
      },
      // Your custom drop-shadow utility:
      dropShadow: {
        'text-amber-lg': '2px 2px 4px rgba(252,211,77,0.8)',
      },
    },
  },
  plugins: [
    textShadow,
  ],
}
