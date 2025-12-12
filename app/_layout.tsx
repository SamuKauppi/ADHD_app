import '@/global.css';
import { KUTRI_COLORS } from '@/lib/brand-colors';

import { PortalHost } from '@rn-primitives/portal';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export { ErrorBoundary } from 'expo-router';

export default function RootLayout() {
  return (
    <SafeAreaProvider style={{ flex: 1 }}>
      <StatusBar style='light' />
      <Stack
        screenOptions={({ route }) => {
          let animation: 'ios_from_right' | 'none' = 'ios_from_right';

          if (route.name === '/' || route.name === '(home)/home') {
            animation = 'none';
          }

          return {
            headerShown: false,
            animation,
            contentStyle: { backgroundColor: KUTRI_COLORS.background }, 
            detachPreviousScreen: false, 
          };
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="content" />
        <Stack.Screen name="test" />
        <Stack.Screen name='(content)/info' />
        <Stack.Screen name='about' options={{
          headerShown: false,
          animation: 'ios_from_left',
          contentStyle: { backgroundColor: KUTRI_COLORS.background },
        }}/>
      </Stack>
      <PortalHost />
    </SafeAreaProvider>
  );
}
