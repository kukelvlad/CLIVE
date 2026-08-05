import { useRouter } from 'expo-router';
import { Text, View } from 'react-native';

import { Screen, colors, fonts } from '@clive/design-system';

/**
 * Placeholder for screens whose real content ports in Этап 2
 * (STORE_RELEASE_PLAN.md) — exists now so navigation and the design
 * system can be verified end-to-end ahead of the actual game-logic port.
 */
export function StubScreen({ title, domain, color }: { title: string; domain?: string; color?: string }) {
  const router = useRouter();
  return (
    <Screen
      player={{ name: 'Vlad' }}
      title={title}
      subtitle={domain}
      headerColor={color}
      backLabel="Dashboard"
      onBack={() => router.back()}
    >
      <View style={{ paddingTop: 40, alignItems: 'center' }}>
        <Text style={{ fontFamily: fonts.display, fontSize: 18, color: colors.navy, textAlign: 'center' }}>
          Coming in Этап 2
        </Text>
        <Text style={{ fontFamily: fonts.body, fontSize: 14, color: colors.textM, marginTop: 8, textAlign: 'center' }}>
          Navigation and design system verified — game logic ports next.
        </Text>
      </View>
    </Screen>
  );
}
