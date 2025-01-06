/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  darkMode: ['selector', '[data-theme="dark"]'],
  plugins: [
    // eslint-disable-next-line
    require('tailwindcss-animate'),
    // eslint-disable-next-line
    require('@tailwindcss/typography'),
  ],
  prefix: '',
  safelist: [
    'lg:col-span-4',
    'lg:col-span-6',
    'lg:col-span-8',
    'lg:col-span-12',
    'border-border',
    'bg-card',
    'border-error',
    'bg-error/30',
    'border-success',
    'bg-success/30',
    'border-warning',
    'bg-warning/30',
  ],
  theme: {
    container: {
      center: true,
      padding: {
        '2xl': '2rem',
        DEFAULT: '1rem',
        lg: '2rem',
        md: '2rem',
        sm: '1rem',
        xl: '2rem',
      },
      screens: {
        '2xl': '86rem',
        lg: '64rem',
        md: '48rem',
        sm: '40rem',
        xl: '80rem',
      },
    },
    extend: {
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      colors: {
        accent: {
          DEFAULT: 'hsl(24, 100%, 50%)', // #FF6B00
          foreground: 'hsl(0, 0%, 100%)', // #FFFFFF
        },
        background: 'hsl(0, 0%, 20%)', // #333333
        border: 'hsl(0, 0%, 17%)', // #2B2B2B
        card: {
          DEFAULT: 'hsl(0, 0%, 17%)', // #2B2B2B
          foreground: 'hsl(0, 0%, 100%)', // #FFFFFF
        },
        destructive: {
          DEFAULT: 'hsl(0, 84.2%, 60.2%)',
          foreground: 'hsl(0, 0%, 100%)', // #FFFFFF
        },
        foreground: 'hsl(0, 0%, 100%)', // #FFFFFF
        input: 'hsl(0, 0%, 17%)', // #2B2B2B
        muted: {
          DEFAULT: 'hsl(0, 0%, 17%)', // #2B2B2B
          foreground: 'hsl(0, 0%, 100%)', // #FFFFFF
        },
        popover: {
          DEFAULT: 'hsl(0, 0%, 17%)', // #2B2B2B
          foreground: 'hsl(0, 0%, 100%)', // #FFFFFF
        },
        primary: {
          DEFAULT: 'hsl(24, 100%, 50%)', // #FF6B00
          foreground: 'hsl(0, 0%, 100%)', // #FFFFFF
        },
        ring: 'hsl(24, 100%, 50%)', // #FF6B00
        secondary: {
          DEFAULT: 'hsl(0, 0%, 17%)', // #2B2B2B
          foreground: 'hsl(0, 0%, 100%)', // #FFFFFF
        },
        success: 'hsl(120, 100%, 25%)',
        error: 'hsl(0, 100%, 50%)',
        warning: 'hsl(45, 100%, 50%)',
      },
      fontFamily: {
        mono: ['var(--font-geist-mono)'],
        sans: ['var(--font-geist-sans)'],
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: [
            {
              '--tw-prose-body': 'var(--text)',
              '--tw-prose-headings': 'var(--text)',
              h1: {
                fontWeight: 'normal',
                marginBottom: '0.25em',
              },
            },
          ],
        },
        base: {
          css: [
            {
              h1: {
                fontSize: '2.5rem',
              },
              h2: {
                fontSize: '1.25rem',
                fontWeight: 600,
              },
            },
          ],
        },
        md: {
          css: [
            {
              h1: {
                fontSize: '3.5rem',
              },
              h2: {
                fontSize: '1.5rem',
              },
            },
          ],
        },
      }),
    },
  },
}
