/** @type {import('tailwindcss').Config} */
/**
 * Tokens aligned to designSystem.js (ex–Alabaster Engineering → Gaurav Nagarkoti).
 */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Core brand (design system)
        primary: '#111111',
        'on-primary': '#ffffff',
        secondary: '#64748B',
        'on-secondary': '#ffffff',
        tertiary: {
          DEFAULT: '#F8FAFC',
          container: '#1E293B',
          fixed: '#F1F5F9',
          'fixed-dim': '#CBD5E1',
        },
        'on-tertiary': '#111111',
        'on-tertiary-container': '#F8FAFC',
        'on-tertiary-fixed': '#0F172A',
        'on-tertiary-fixed-variant': '#475569',
        neutral: {
          DEFAULT: '#FFFFFF',
        },
        inverted: {
          DEFAULT: '#1E293B',
        },
        'on-inverted': '#ffffff',

        // Surfaces
        background: '#F8FAFC',
        'on-background': '#111111',
        surface: '#F8FAFC',
        'surface-bright': '#FFFFFF',
        'surface-dim': '#E2E8F0',
        'surface-tint': '#64748B',
        'surface-variant': '#E2E8F0',
        'surface-container': '#E2E8F0',
        'surface-container-low': '#F1F5F9',
        'surface-container-high': '#E2E8F0',
        'surface-container-highest': '#CBD5E1',
        'surface-container-lowest': '#FFFFFF',
        'on-surface': '#111111',
        'on-surface-variant': '#64748B',

        // Borders / chrome
        outline: '#94A3B8',
        'outline-variant': '#E2E8F0',

        // Supporting (kept for Material-adjacent components)
        error: '#EF4444',
        'on-error': '#ffffff',
        'error-container': '#FEE2E2',
        'on-error-container': '#7F1D1D',
        'primary-container': '#1E293B',
        'on-primary-container': '#CBD5E1',
        'primary-fixed': '#E2E8F0',
        'primary-fixed-dim': '#CBD5E1',
        'on-primary-fixed': '#111111',
        'on-primary-fixed-variant': '#475569',
        'secondary-container': '#E2E8F0',
        'on-secondary-container': '#334155',
        'secondary-fixed': '#F1F5F9',
        'secondary-fixed-dim': '#CBD5E1',
        'on-secondary-fixed': '#0F172A',
        'on-secondary-fixed-variant': '#475569',
        'inverse-surface': '#1E293B',
        'inverse-on-surface': '#F8FAFC',
        'inverse-primary': '#CBD5E1',

        slate: {
          50: '#F8FAFC',
          200: '#E2E8F0',
        },
      },
      borderRadius: {
        DEFAULT: '0.125rem',
        lg: '0.25rem',
        xl: '0.5rem',
        full: '0.75rem',
      },
      spacing: {
        gutter: '32px',
        'margin-mobile': '20px',
        unit: '4px',
        'margin-desktop': '64px',
        'section-gap': '4.5rem',
        'section-gap-lg': '8rem',
        'container-max': '1280px',
      },
      maxWidth: {
        'container-max': '1280px',
      },
      fontFamily: {
        sans: ['Geist', 'system-ui', 'sans-serif'],
        'display-lg': ['Geist', 'system-ui', 'sans-serif'],
        'label-caps': ['Geist', 'system-ui', 'sans-serif'],
        'display-lg-mobile': ['Geist', 'system-ui', 'sans-serif'],
        'mono-data': ['Geist Mono', 'ui-monospace', 'monospace'],
        'headline-sm': ['Geist', 'system-ui', 'sans-serif'],
        'body-lg': ['Geist', 'system-ui', 'sans-serif'],
        'headline-md': ['Geist', 'system-ui', 'sans-serif'],
        'body-md': ['Geist', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-lg': [
          '72px',
          { lineHeight: '1.1', letterSpacing: '-0.04em', fontWeight: '600' },
        ],
        'label-caps': [
          '12px',
          { lineHeight: '1.0', letterSpacing: '0.1em', fontWeight: '600' },
        ],
        'display-lg-mobile': [
          'clamp(2rem, 8vw, 2.5rem)',
          { lineHeight: '1.2', letterSpacing: '-0.02em', fontWeight: '600' },
        ],
        'mono-data': [
          '14px',
          { lineHeight: '1.5', letterSpacing: '0', fontWeight: '400' },
        ],
        'headline-sm': [
          '24px',
          { lineHeight: '1.4', letterSpacing: '-0.01em', fontWeight: '500' },
        ],
        'body-lg': [
          '18px',
          { lineHeight: '1.6', letterSpacing: '0', fontWeight: '400' },
        ],
        'headline-md': [
          '32px',
          { lineHeight: '1.3', letterSpacing: '-0.02em', fontWeight: '500' },
        ],
        'body-md': [
          '16px',
          { lineHeight: '1.6', letterSpacing: '0', fontWeight: '400' },
        ],
        'body-sm': [
          '14px',
          { lineHeight: '1.5', letterSpacing: '0', fontWeight: '400' },
        ],
      },
    },
  },
  plugins: [],
}
