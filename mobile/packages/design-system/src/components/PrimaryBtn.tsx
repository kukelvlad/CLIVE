import { useState, type ReactNode } from 'react';
import { Pressable, StyleSheet, Text, type StyleProp, type ViewStyle } from 'react-native';

import { colors, elevation, fonts, radius, touchTarget } from '../tokens';

export interface PrimaryBtnProps {
  children: ReactNode;
  onPress?: () => void;
  disabled?: boolean;
  color?: string;
  icon?: ReactNode;
  style?: StyleProp<ViewStyle>;
}

/**
 * Full-width primary action button. Ported 1:1 from web `PrimaryBtn`
 * (min 64px height, 32px horizontal padding, scale(0.98) press feedback).
 */
export function PrimaryBtn({ children, onPress, disabled, color, icon, style }: PrimaryBtnProps) {
  const [pressed, setPressed] = useState(false);
  const bg = disabled ? colors.disabled : color || colors.navy;

  return (
    <Pressable
      onPress={disabled ? undefined : onPress}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityState={{ disabled: !!disabled }}
      style={[
        styles.base,
        {
          backgroundColor: bg,
          opacity: disabled ? 0.65 : 1,
          transform: [{ scale: pressed && !disabled ? 0.98 : 1 }],
        },
        !disabled && elevation[1],
        style,
      ]}
    >
      {icon}
      <Text style={styles.label}>{children}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    width: '100%',
    minHeight: touchTarget + 8, // 64
    paddingHorizontal: 32,
    borderRadius: radius.xl,
  },
  label: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '600',
    fontFamily: fonts.body,
  },
});
