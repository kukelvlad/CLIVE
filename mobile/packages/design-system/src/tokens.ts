/**
 * CLIVE design tokens — ported 1:1 from the web app's `T`/`MOTION` objects
 * (index.html, top-level constants). Source of truth is
 * design/CLIVE_Master_Design_Specification.md — this file must not drift
 * from the web version without updating both.
 */

export const colors = {
  navy: '#214A57',
  navyL: '#2C5A69',
  teal: '#6D8A73',
  tealL: '#EEF2EA',
  mint: '#C5A26C',
  mintL: '#FBF3E6',
  gold: '#C5A26C',
  goldL: '#FBF3E6',
  bg: '#F8F5EF',
  surface: '#FFFCF8',
  text: '#1F2A32',
  textM: '#5E6973',
  textS: '#8B949D',
  border: '#DDD4C8',
  borderLight: '#ECE4D8',
  error: '#C56A62',
  errorL: '#F8EBE9',
  success: '#5E8F66',
  successL: '#EAF0E9',
  warning: '#D0A24A',
  info: '#6B92C7',
  focus: '#8AB9FF',
  disabled: '#B8C0C8',
} as const;

/** Border-radius scale. */
export const radius = {
  xs: 8,
  sm: 12,
  md: 16,
  lg: 24,
  xl: 32,
  '2xl': 40,
  full: 999,
} as const;

/**
 * Elevation, expressed as RN shadow props (iOS: shadow*, Android: elevation).
 * Web used CSS box-shadow strings — these are the closest RN equivalents,
 * tuned against the same navy-tinted shadow color.
 */
export const elevation = {
  1: {
    shadowColor: colors.navy,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  2: {
    shadowColor: colors.navy,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 24,
    elevation: 6,
  },
  3: {
    shadowColor: colors.navy,
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.14,
    shadowRadius: 48,
    elevation: 12,
  },
} as const;

/** Motion timings (ms) and easing curves — calm, predictable, no bounce/elastic. */
export const motion = {
  instant: 100,
  fast: 150,
  normal: 250,
  slow: 400,
  extended: 600,
  max: 800,
  easeOut: [0.16, 1, 0.3, 1] as const, // cubic-bezier, for Reanimated Easing.bezier(...)
  easeInOut: 'ease-in-out',
  linear: 'linear',
} as const;

/**
 * Typography. Fraunces is a variable serif loaded as static weights via
 * expo-font (no variable-font axis support needed for the weights we use).
 * Atkinson Hyperlegible is the accessible body/UI font — same choice as web,
 * important for the 55+ audience (low-vision legibility).
 */
export const fonts = {
  display: 'Fraunces_600SemiBold',
  displayBold: 'Fraunces_700Bold',
  body: 'AtkinsonHyperlegible_400Regular',
  bodyBold: 'AtkinsonHyperlegible_700Bold',
  bodyItalic: 'AtkinsonHyperlegible_400Regular_Italic',
} as const;

/** Minimum touch target size (accessibility requirement, same as web: 56×56). */
export const touchTarget = 56;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  '3xl': 32,
} as const;
