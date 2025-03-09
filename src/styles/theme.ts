const theme = {
    colors: {
        primary: {
            main: '#6366F1',
            light: '#818CF8',
            dark: '#4F46E5',
            contrast: '#FFFFFF'
        },
        secondary: {
            main: '#9333EA',
            light: '#A855F7',
            dark: '#7E22CE',
            contrast: '#FFFFFF'
        },
        accent: {
            main: '#0EA5E9',
            light: '#38BDF8',
            dark: '#0284C7',
            contrast: '#FFFFFF'
        },
        success: {
            main: '#10B981',
            light: '#34D399',
            dark: '#059669',
            contrast: '#FFFFFF'
        },
        warning: {
            main: '#F59E0B',
            light: '#FBBF24',
            dark: '#D97706',
            contrast: '#FFFFFF'
        },
        error: {
            main: '#EF4444',
            light: '#F87171',
            dark: '#DC2626',
            contrast: '#FFFFFF'
        },
        neutral: {
            50: '#F8FAFC',
            100: '#F1F5F9',
            200: '#E2E8F0',
            300: '#CBD5E1',
            400: '#94A3B8',
            500: '#64748B',
            600: '#475569',
            700: '#334155',
            800: '#1E293B',
            900: '#0F172A'
        }
    },
    typography: {
        fontFamily: {
            sans: 'Inter, system-ui, -apple-system, sans-serif',
            mono: 'JetBrains Mono, monospace'
        },
        fontSize: {
            xs: '0.75rem',
            sm: '0.875rem',
            md: '1rem',
            lg: '1.125rem',
            xl: '1.25rem',
            '2xl': '1.5rem',
            '3xl': '1.875rem',
            '4xl': '2.25rem'
        },
        fontWeight: {
            normal: 400,
            medium: 500,
            semibold: 600,
            bold: 700
        },
        lineHeight: {
            none: 1,
            tight: 1.25,
            normal: 1.5,
            relaxed: 1.75
        }
    },
    spacing: {
        xs: '0.25rem',
        sm: '0.5rem',
        md: '0.75rem',
        lg: '1rem',
        xl: '1.5rem',
        xxl: '2rem'
    },
    radius: {
        sm: '0.25rem',
        md: '0.375rem',
        lg: '0.5rem',
        xl: '0.75rem',
        round: '9999px'
    },
    shadows: {
        sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
        xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
        glow: '0 0 0 3px rgba(99, 102, 241, 0.15)'
    },
    gradients: {
        primary: 'linear-gradient(135deg, #818CF8 0%, #6366F1 100%)',
        secondary: 'linear-gradient(135deg, #A855F7 0%, #9333EA 100%)',
        accent: 'linear-gradient(135deg, #38BDF8 0%, #0EA5E9 100%)'
    },
    transitions: {
        ease: 'all 0.2s ease-in-out'
    },
    zIndices: {
        base: 1,
        dropdown: 10,
        modal: 20,
        tooltip: 30
    }
} as const;

export default theme;