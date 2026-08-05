import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { colors } from '@clive/design-system';

SplashScreen.preventAutoHideAsync();

/**
 * Root layout — plain Stack, headers off everywhere. `Screen` (design
 * system) renders its own header/back-button per screen, matching the web
 * app's single custom `Screen` wrapper rather than native nav chrome.
 */
export default function RootLayout() {
  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  return (
    <SafeAreaProvider>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.bg },
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="onboarding" />
        <Stack.Screen name="cognitive-age-test" />
        <Stack.Screen name="insights" />
        <Stack.Screen name="profile" />
        <Stack.Screen name="settings" />
        <Stack.Screen name="help" />
        {/* Game route filenames match the `exercise_id` values already
            stored in Supabase (web app's GAMES array) so session history
            stays consistent across web and native. */}
        <Stack.Screen name="games/shopping" />
        <Stack.Screen name="games/odd" />
        <Stack.Screen name="games/yesterday" />
        <Stack.Screen name="games/chain" />
        <Stack.Screen name="games/pairs" />
        <Stack.Screen name="games/route" />
      </Stack>
    </SafeAreaProvider>
  );
}
