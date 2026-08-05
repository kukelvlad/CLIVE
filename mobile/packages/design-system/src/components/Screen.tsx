import type { ReactNode } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors, elevation, fonts, radius, touchTarget } from '../tokens';

export interface ScreenPlayer {
  name?: string;
}

export interface ScreenProps {
  player: ScreenPlayer;
  title: ReactNode;
  subtitle?: string;
  onBack: () => void;
  children: ReactNode;
  headerColor?: string;
  backLabel?: string;
  /**
   * Sticky action footer, rendered as a flex sibling to the scrollable
   * content (not inside it) — the same fix applied on web so that
   * round/session-complete action buttons never require scrolling to reach,
   * no matter how tall the content above them is.
   */
  footer?: ReactNode;
}

/**
 * Screen wrapper: sticky header with back button + title + player avatar,
 * scrollable content area, optional sticky footer. Ported 1:1 from web
 * `Screen` (see index.html) — geometry and behavior match; RN uses
 * View/Text/StyleSheet instead of div/span/inline-style.
 */
export function Screen({
  player,
  title,
  subtitle,
  onBack,
  children,
  headerColor,
  backLabel,
  footer,
}: ScreenProps) {
  const accent = headerColor || colors.navy;
  const initial = (player.name || '?').trim()[0]?.toUpperCase() ?? '?';

  return (
    <SafeAreaView style={styles.root} edges={['top', 'bottom']}>
      {/* Header — sticky top app bar */}
      <View style={[styles.header, elevation[1]]}>
        <Pressable
          onPress={onBack}
          accessibilityRole="button"
          accessibilityLabel={`Back to ${backLabel || 'menu'}`}
          style={styles.backBtn}
        >
          <Text style={[styles.backIcon, { color: accent }]}>‹</Text>
          <Text style={styles.backLabel}>{backLabel || 'Menu'}</Text>
        </Pressable>

        <View style={styles.titleBlock}>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
          {subtitle ? (
            <Text style={[styles.subtitle, { color: accent }]}>{subtitle}</Text>
          ) : null}
        </View>

        <View style={styles.avatarWrap}>
          <View style={[styles.avatar, { backgroundColor: `${accent}22` }]}>
            <Text style={[styles.avatarLabel, { color: accent }]}>{initial}</Text>
          </View>
        </View>
      </View>

      {/* Scrollable content — footer sits outside this ScrollView on purpose */}
      <ScrollView
        style={styles.bodyScroll}
        contentContainerStyle={styles.body}
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ScrollView>

      {/* Sticky footer — outside the scrollable area on purpose */}
      {footer ? <View style={styles.footer}>{footer}</View> : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  header: {
    minHeight: touchTarget,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  backBtn: {
    minWidth: 52,
    minHeight: 52,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: radius.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  backIcon: {
    fontSize: 22,
  },
  backLabel: {
    fontSize: 15,
    fontWeight: '600',
    fontFamily: fonts.body,
    color: colors.navy,
  },
  titleBlock: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  title: {
    color: colors.navy,
    fontWeight: '600',
    fontSize: 17,
    fontFamily: fonts.display,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginTop: 2,
    textAlign: 'center',
  },
  avatarWrap: {
    minWidth: 52,
    minHeight: 52,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarLabel: {
    fontWeight: '700',
    fontSize: 14,
    fontFamily: fonts.display,
  },
  bodyScroll: {
    flex: 1,
    width: '100%',
  },
  body: {
    width: '100%',
    maxWidth: 820,
    alignSelf: 'center',
    paddingHorizontal: 16,
    paddingTop: 18,
    paddingBottom: 20,
  },
  footer: {
    flexShrink: 0,
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
});
