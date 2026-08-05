import { EXERCISES } from '@clive/exercises';
import { colors, fonts, radius, spacing, touchTarget } from '@clive/design-system';
import { useRouter } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

/**
 * Dashboard — the first real screen, proving design-system + exercises +
 * routing work together end-to-end. Full dashboard content (today's
 * recommended session, Cognitive Age banner, Insights/Profile/Settings
 * entry points) ports in Этап 2; this exercises the 6 game cards + nav.
 */
export default function DashboardScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.root} edges={['top', 'bottom']}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Text style={styles.brand}>CLIVE</Text>
        <Text style={styles.heading}>Today's training</Text>

        <View style={styles.grid}>
          {EXERCISES.map((exercise) => {
            const accent = colors[exercise.colorToken];
            return (
              <Pressable
                key={exercise.id}
                onPress={() => router.push(`/games/${exercise.id}` as never)}
                style={styles.card}
                accessibilityRole="button"
                accessibilityLabel={exercise.title}
              >
                <View style={[styles.cardStripe, { backgroundColor: accent }]} />
                <View style={styles.cardBody}>
                  <Text style={[styles.cardDomain, { color: accent }]}>{exercise.domain}</Text>
                  <Text style={styles.cardTitle}>{exercise.title}</Text>
                  <Text style={styles.cardDesc}>{exercise.desc}</Text>
                </View>
              </Pressable>
            );
          })}
        </View>

        <View style={styles.footerNav}>
          <NavLink label="Cognitive Age Test" onPress={() => router.push('/cognitive-age-test' as never)} />
          <NavLink label="Insights" onPress={() => router.push('/insights' as never)} />
          <NavLink label="Profile" onPress={() => router.push('/profile' as never)} />
          <NavLink label="Settings" onPress={() => router.push('/settings' as never)} />
          <NavLink label="Help Center" onPress={() => router.push('/help' as never)} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function NavLink({ label, onPress }: { label: string; onPress: () => void }) {
  return (
    <Pressable onPress={onPress} style={styles.navLink} accessibilityRole="button">
      <Text style={styles.navLinkLabel}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  scroll: {
    maxWidth: 820,
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xl,
    paddingBottom: spacing['3xl'],
  },
  brand: {
    fontFamily: fonts.display,
    color: colors.navy,
    fontWeight: '600',
    fontSize: 14,
    letterSpacing: 4,
    textTransform: 'uppercase',
    marginBottom: spacing.sm,
  },
  heading: {
    fontFamily: fonts.display,
    color: colors.navy,
    fontSize: 24,
    fontWeight: '600',
    marginBottom: spacing['2xl'],
  },
  grid: {
    gap: spacing.md,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.borderLight,
    overflow: 'hidden',
    minHeight: touchTarget + 20,
  },
  cardStripe: {
    height: 4,
    width: '100%',
  },
  cardBody: {
    padding: spacing.lg,
  },
  cardDomain: {
    fontFamily: fonts.bodyBold,
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  cardTitle: {
    fontFamily: fonts.display,
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  cardDesc: {
    fontFamily: fonts.body,
    fontSize: 13,
    color: colors.textM,
  },
  footerNav: {
    marginTop: spacing['3xl'],
    gap: spacing.sm,
  },
  navLink: {
    minHeight: touchTarget,
    justifyContent: 'center',
    paddingHorizontal: spacing.md,
    borderRadius: radius.md,
  },
  navLinkLabel: {
    fontFamily: fonts.body,
    fontSize: 15,
    fontWeight: '600',
    color: colors.navy,
  },
});
