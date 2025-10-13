/**
 * WordPress Divi Design System for Mom Helper USA
 * Extracted from: https://momhelperusa.com
 */

export const colors = {
  // Primary Colors
  primary: '#2EA3F2',           // Main blue (links, primary buttons)
  primaryDark: '#2582C2',        // Darker blue variant

  // Brand Colors (WordPress Divi theme colors)
  brandOrange: '#D37643',        // Primary orange accent
  brandOrangeDark: '#B8551F',    // Darker orange (headings)
  brandOverlay: 'rgba(211,118,67,0.47)', // Hero overlay

  // Text Colors
  textPrimary: '#333333',        // Main text
  textSecondary: '#666666',      // Secondary text
  textLight: '#999999',          // Light text

  // Background Colors
  bgLight: '#f7f7f7',            // Light gray background
  bgLightWarm: '#fff7f4',        // Warm light background (cards)
  bgWhite: '#ffffff',            // White background
  bgDark: '#2d3940',             // Dark background

  // UI Colors
  border: '#eeeeee',
  borderDark: '#bbbbb',
  shadow: 'rgba(0,0,0,0.1)',
};

export const fonts = {
  // Font Families
  korean: "'Noto Sans KR', 'Malgun Gothic', sans-serif",
  english: "'Open Sans', 'Arial', sans-serif",
  body: "'Open Sans', 'Arial', sans-serif",

  // Font Sizes (WordPress Divi defaults)
  base: '14px',
  body: '16px',
  h1: '30px',
  h2: '26px',
  h3: '22px',
  h4: '18px',
  h5: '16px',
  h6: '14px',

  // Korean Page Specific Sizes
  heroTitle: '26pt',        // Hero section title
  heroSubtitle: '18pt',     // Hero section subtitle
  sectionTitle: '24px',     // Section headings
  cardTitle: '20px',        // Card headings

  // Font Weights
  light: '300',
  regular: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
};

export const spacing = {
  // Section Spacing
  sectionPadding: '4rem',          // py-16 (64px)
  sectionPaddingMobile: '3rem',    // py-12 (48px)

  // Container
  containerMax: '1080px',
  containerPadding: '1rem',        // px-4 (16px)

  // Grid Gaps
  gridGap: '2rem',                // gap-8 (32px)
  gridGapSmall: '1.5rem',         // gap-6 (24px)

  // Card Padding
  cardPadding: '1.5rem',          // p-6 (24px)
  cardPaddingLarge: '2rem',       // p-8 (32px)

  // Spacing Scale
  xs: '0.25rem',    // 4px
  sm: '0.5rem',     // 8px
  md: '1rem',       // 16px
  lg: '1.5rem',     // 24px
  xl: '2rem',       // 32px
  '2xl': '3rem',    // 48px
  '3xl': '4rem',    // 64px
};

export const borderRadius = {
  sm: '0.25rem',    // 4px
  md: '0.375rem',   // 6px
  lg: '0.5rem',     // 8px
  xl: '0.75rem',    // 12px
  '2xl': '1rem',    // 16px
  full: '9999px',   // rounded-full
};

export const shadows = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
};

export const breakpoints = {
  xs: '480px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
};

// Component-specific styles
export const components = {
  hero: {
    minHeight: '600px',
    overlayOpacity: 0.47,
    logoMaxWidth: '500px',
    logoMaxWidthMobile: '400px',
  },

  serviceCard: {
    backgroundColor: colors.bgWhite,
    borderRadius: borderRadius.lg,
    padding: spacing.cardPadding,
    shadow: shadows.md,
  },

  button: {
    primary: {
      backgroundColor: colors.brandOrange,
      color: colors.bgWhite,
      hover: colors.brandOrangeDark,
      padding: '0.75rem 2rem',
      borderRadius: borderRadius.full,
    },
    secondary: {
      backgroundColor: 'transparent',
      color: colors.bgWhite,
      border: `2px solid ${colors.bgWhite}`,
      hover: {
        backgroundColor: colors.bgWhite,
        color: colors.brandOrange,
      },
      padding: '0.75rem 2rem',
      borderRadius: borderRadius.full,
    },
  },

  section: {
    light: {
      backgroundColor: colors.bgLight,
    },
    white: {
      backgroundColor: colors.bgWhite,
    },
    warmLight: {
      backgroundColor: colors.bgLightWarm,
    },
  },
};

// Utility functions
export const getResponsiveFont = (size: 'sm' | 'md' | 'lg') => {
  switch (size) {
    case 'sm':
      return 'text-sm md:text-base';
    case 'md':
      return 'text-base md:text-lg';
    case 'lg':
      return 'text-lg md:text-xl lg:text-2xl';
    default:
      return 'text-base';
  }
};

export const getSectionPadding = (variant: 'default' | 'large' | 'small') => {
  switch (variant) {
    case 'large':
      return 'py-20 md:py-24';
    case 'small':
      return 'py-8 md:py-12';
    case 'default':
    default:
      return 'py-12 md:py-16';
  }
};
