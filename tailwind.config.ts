import type { Config } from 'tailwindcss'

export default {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)'
      },
      screens: {
        mbs: '320px',
        // => @media (min-width: 320px) { ... }

        mbm: '375px',
        // => @media (min-width: 375px) { ... }

        mbx: '390px',
        // => @media (min-width: 390px) { ... }

        mbl: '425px',
        // => @media (min-width: 425px) { ... }

        tablet: '770px',
        // => @media (min-width: 640px) { ... }

        laptop: '1024px',
        // => @media (min-width: 1024px) { ... }

        desktop: '1280px'
        // => @media (min-width: 1280px) { ... }
      }
    }
  },
  safelist: [
    // Shadows
    'shadow-[0_0_15px_2px_rgba(255,0,0,0.7)]',
    'shadow-[0_0_15px_2px_rgba(0,0,255,0.7)]',
    'shadow-[0_0_15px_2px_rgba(0,255,0,0.7)]',
    'shadow-[0_0_15px_2px_rgba(255,165,0,0.7)]',
    'shadow-[0_0_15px_2px_rgba(255,20,147,0.7)]',
    'shadow-[0_0_15px_2px_rgba(0,255,255,0.7)]',
    'shadow-[0_0_15px_2px_rgba(153,255,51,0.7)]',
    'shadow-[0_0_15px_2px_rgba(255,255,0,0.7)]',
    'shadow-[0_0_15px_2px_rgba(255,0,255,0.7)]',

    // Text
    'text-[rgba(255,0,0,0.8)]',
    'text-[rgba(0,0,255,0.8)]',
    'text-[rgba(0,255,0,0.8)]',
    'text-[rgba(255,165,0,0.8)]',
    'text-[rgba(255,20,147,0.8)]',
    'text-[rgba(0,255,255,0.8)]',
    'text-[rgba(153,255,51,0.8)]',
    'text-[rgba(255,255,0,0.8)]',
    'text-[rgba(255,0,255,0.8)]'
  ],

  plugins: []
} satisfies Config
