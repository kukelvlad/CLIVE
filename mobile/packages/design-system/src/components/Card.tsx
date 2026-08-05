import type { ReactNode } from 'react';
import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';

import { colors, elevation, radius } from '../tokens';

export interface CardProps {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  /** Accent color for a 4px top stripe, matching web's `accent` prop. */
  accent?: string;
}

/** Elevated surface. Ported 1:1 from web `Card`. */
export function Card({ children, style, accent }: CardProps) {
  return (
    <View style={[styles.base, elevation[1], style]}>
      {accent && <View style={[styles.accentStripe, { backgroundColor: accent }]} />}
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  accentStripe: {
    height: 4,
    width: '100%',
  },
});
