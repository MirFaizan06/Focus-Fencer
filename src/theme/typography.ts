/**
 * FocusFencer Typography System
 * Professional and modern type scale
 */

import {Platform, TextStyle} from 'react-native';

const fontFamily = {
  regular: Platform.select({
    ios: 'System',
    android: 'Roboto',
    default: 'System',
  }),
  medium: Platform.select({
    ios: 'System',
    android: 'Roboto-Medium',
    default: 'System',
  }),
  bold: Platform.select({
    ios: 'System',
    android: 'Roboto-Bold',
    default: 'System',
  }),
};

export const typography = {
  // Display styles
  displayLarge: {
    fontFamily: fontFamily.bold,
    fontSize: 57,
    lineHeight: 64,
    fontWeight: '700' as TextStyle['fontWeight'],
    letterSpacing: -0.25,
  },
  displayMedium: {
    fontFamily: fontFamily.bold,
    fontSize: 45,
    lineHeight: 52,
    fontWeight: '700' as TextStyle['fontWeight'],
    letterSpacing: 0,
  },
  displaySmall: {
    fontFamily: fontFamily.bold,
    fontSize: 36,
    lineHeight: 44,
    fontWeight: '700' as TextStyle['fontWeight'],
    letterSpacing: 0,
  },

  // Headline styles
  headlineLarge: {
    fontFamily: fontFamily.bold,
    fontSize: 32,
    lineHeight: 40,
    fontWeight: '700' as TextStyle['fontWeight'],
    letterSpacing: 0,
  },
  headlineMedium: {
    fontFamily: fontFamily.bold,
    fontSize: 28,
    lineHeight: 36,
    fontWeight: '700' as TextStyle['fontWeight'],
    letterSpacing: 0,
  },
  headlineSmall: {
    fontFamily: fontFamily.bold,
    fontSize: 24,
    lineHeight: 32,
    fontWeight: '700' as TextStyle['fontWeight'],
    letterSpacing: 0,
  },

  // Title styles
  titleLarge: {
    fontFamily: fontFamily.medium,
    fontSize: 22,
    lineHeight: 28,
    fontWeight: '600' as TextStyle['fontWeight'],
    letterSpacing: 0,
  },
  titleMedium: {
    fontFamily: fontFamily.medium,
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600' as TextStyle['fontWeight'],
    letterSpacing: 0.15,
  },
  titleSmall: {
    fontFamily: fontFamily.medium,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '600' as TextStyle['fontWeight'],
    letterSpacing: 0.1,
  },

  // Body styles
  bodyLarge: {
    fontFamily: fontFamily.regular,
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '400' as TextStyle['fontWeight'],
    letterSpacing: 0.5,
  },
  bodyMedium: {
    fontFamily: fontFamily.regular,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '400' as TextStyle['fontWeight'],
    letterSpacing: 0.25,
  },
  bodySmall: {
    fontFamily: fontFamily.regular,
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '400' as TextStyle['fontWeight'],
    letterSpacing: 0.4,
  },

  // Label styles
  labelLarge: {
    fontFamily: fontFamily.medium,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '500' as TextStyle['fontWeight'],
    letterSpacing: 0.1,
  },
  labelMedium: {
    fontFamily: fontFamily.medium,
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '500' as TextStyle['fontWeight'],
    letterSpacing: 0.5,
  },
  labelSmall: {
    fontFamily: fontFamily.medium,
    fontSize: 11,
    lineHeight: 16,
    fontWeight: '500' as TextStyle['fontWeight'],
    letterSpacing: 0.5,
  },
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

export const borderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  xxl: 24,
  full: 9999,
} as const;
