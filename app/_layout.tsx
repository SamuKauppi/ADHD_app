import '@/global.css';
import { KUTRI_COLORS } from '@/lib/brand-colors';

import { PortalHost } from '@rn-primitives/portal';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

// Layout for other pages
export default function RootLayout() {

  return (
    <SafeAreaProvider style={{ backgroundColor: KUTRI_COLORS.background, flex: 1 }}>
      <StatusBar />
      <Stack
        screenOptions={({ route }) => {
          let animation: 'ios_from_right' | 'none' = 'ios_from_right';

          // Disable animation only for index <-> (home)/home transitions
          if (route.name === 'index' || route.name === '(home)/home') {
            animation = 'none';
          }

          return {
            headerShown: false,
            animation,
          };
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="test" />
        <Stack.Screen name='(content)/info' />
        <Stack.Screen name='about' options={{
          headerShown: false,
          animation: 'ios_from_left'
        }}/>
      </Stack>
      <PortalHost />
    </SafeAreaProvider>
  );
}