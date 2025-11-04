/**
 * FocusFencer Color Palette
 * Modern, vibrant, and accessibility-friendly colors
 */

export const colors = {
  // Light Theme
  light: {
    background: '#FFFFFF',
    surface: '#F6F6F6',
    surfaceElevated: '#FFFFFF',
    text: '#1A1A1A',
    textSecondary: '#6B7280',
    textTertiary: '#9CA3AF',
    primary: '#3B82F6',
    primaryDark: '#2563EB',
    accent: '#14B8A6',
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
    border: '#E5E7EB',
    overlay: 'rgba(0, 0, 0, 0.5)',
    card: '#FFFFFF',
    shadow: 'rgba(0, 0, 0, 0.1)',
  },

  // Dark Theme
  dark: {
    background: '#0E0E0E',
    surface: '#1F1F1F',
    surfaceElevated: '#2A2A2A',
    text: '#FFFFFF',
    textSecondary: '#D1D5DB',
    textTertiary: '#9CA3AF',
    primary: '#38BDF8',
    primaryDark: '#0EA5E9',
    accent: '#14B8A6',
    success: '#10B981',
    warning: '#FBBF24',
    error: '#F87171',
    border: '#374151',
    overlay: 'rgba(0, 0, 0, 0.7)',
    card: '#1F1F1F',
    shadow: 'rgba(0, 0, 0, 0.4)',
  },

  // Neon Focus Theme (Premium/Rewarded)
  neon: {
    background: '#0A0F1E',
    surface: '#1A1F35',
    surfaceElevated: '#252B47',
    text: '#FFFFFF',
    textSecondary: '#B4C6FC',
    textTertiary: '#8B9DC3',
    primary: '#14B8A6',
    primaryDark: '#0D9488',
    accent: '#3B82F6',
    success: '#14F195',
    warning: '#FDE047',
    error: '#FB7185',
    border: '#2D3561',
    overlay: 'rgba(10, 15, 30, 0.8)',
    card: '#1A1F35',
    shadow: 'rgba(59, 130, 246, 0.2)',
    gradientStart: '#14B8A6',
    gradientEnd: '#3B82F6',
  },
} as const;

export type ThemeMode = 'light' | 'dark' | 'neon';
export type ColorScheme = typeof colors.light;
