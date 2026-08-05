import { useState, type ReactNode } from 'react';
import { Pressable, StyleSheet, Text, type StyleProp, type ViewStyle } from 'react-native';

import { colors, fonts, radius, touchTarget } from '../tokens';

export interface SecondaryBtnProps {
  children: ReactNode;
  onPress?: () => void;
  icon?: ReactNode;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
}

/** Outlined secondary button. Ported 1:1 from web `SecondaryBtn`. */
export function SecondaryBtn({ children, onPress, icon, disabled, style }: SecondaryBtnProps) {
  const [pressed, setPressed] = useState(false);

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
          backgroundColor: pressed && !disabled ? colors.tealL : colors.surface,
          opacity: disabled ? 0.65 : 1,
          transform: [{ scale: pressed && !disabled ? 0.98 : 1 }],
        },
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
    gap: 10,
    width: '100%',
    minHeight: touchTarget + 8, // 64
    paddingHorizontal: 32,
    borderRadius: radius.xl,
    borderWidth: 1.5,
    borderColor: colors.border,
  },
  label: {
    color: colors.navy,
    fontSize: 16,
    fontWeight: '600',
    fontFamily: fonts.body,
  },
});
