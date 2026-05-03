// SmartCampus Design System — matches Figma prototype
// Shneiderman Rule 1 (Consistency): centralised design tokens used everywhere

import { Platform } from 'react-native';

export const COLORS = {
  // Primary
  primary: '#1A2FA8',
  primaryDark: '#0F1E6E',
  primaryLight: '#2B3FC0',

  // Accent
  accent: '#D4A017',
  accentLight: '#F0C940',

  // Status
  statusCompleted: '#27AE60',
  statusApproved: '#27AE60',
  statusInReview: '#1A2FA8',
  statusDeclined: '#8E8E93',

  // Neutrals
  white: '#FFFFFF',
  background: '#F2F3F7',
  cardBg: '#FFFFFF',
  textPrimary: '#1C1C1E',
  textSecondary: '#6B7280',
  textTertiary: '#9CA3AF',
  border: '#E5E7EB',
  divider: '#F0F0F0',

  // Chat
  chatBubbleUser: '#1A2FA8',
  chatBubbleBot: '#F0F1F5',
  chatBubbleUserText: '#FFFFFF',
  chatBubbleBotText: '#1C1C1E',

  // Success / Error / Warning
  success: '#27AE60',
  successBg: '#ECFDF5',
  error: '#DC2626',
  errorBg: '#FEF2F2',
  warning: '#F59E0B',
  warningBg: '#FFFBEB',

  // Tab bar
  tabActive: '#1A2FA8',
  tabInactive: '#9CA3AF',

  // Misc
  overlay: 'rgba(0,0,0,0.5)',
  shadow: 'rgba(0,0,0,0.08)',
  skeleton: '#E5E7EB',
  skeletonHighlight: '#F3F4F6',
};

export const FONTS = {
  regular: 'System',
  medium: 'System',
  semiBold: 'System',
  bold: 'System',
};

export const FONT_SIZES = {
  xs: 10,
  sm: 12,
  md: 14,
  lg: 16,
  xl: 18,
  xxl: 20,
  xxxl: 24,
  title: 28,
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
};

export const RADIUS = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  full: 999,
};

export const SHADOWS = {
  card: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  small: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
};

// Minimum touch target size (Apple 44pt / Google 48dp)
// Shneiderman Rule 8 (Reduce short-term memory): clear, tappable targets
export const MIN_TOUCH_SIZE = 44;

// Animation durations for consistency
export const ANIMATION = {
  fast: 150,
  normal: 250,
  slow: 400,
};
