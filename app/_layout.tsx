import '@/global.css';

import { NAV_THEME } from '@/lib/theme';
import { ThemeProvider } from '@react-navigation/native';
import { PortalHost } from '@rn-primitives/portal';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'nativewind';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export default function RootLayout() {
  const { colorScheme } = useColorScheme();
  const theme = NAV_THEME[colorScheme ?? 'light']

  return (
    <SafeAreaProvider style={{ backgroundColor: theme.colors.background }}>
      <ThemeProvider value={theme} >
        <StatusBar />
        <Stack
          screenOptions={{
            headerShown: false,
            animation: 'simple_push'
          }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="test" />
          <Stack.Screen name="result" />
        </Stack>
        <PortalHost />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
