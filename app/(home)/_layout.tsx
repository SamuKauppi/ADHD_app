import '@/global.css';

import { NAV_THEME } from '@/lib/theme';
import { ThemeProvider } from '@react-navigation/native';
import { PortalHost } from '@rn-primitives/portal';
import { Tabs } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'nativewind';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const HomeLayout = () => {
    const { colorScheme } = useColorScheme();
    const theme = NAV_THEME[colorScheme ?? 'light'];

    return (
        <SafeAreaProvider style={{ backgroundColor: theme.colors.background }}>
            <ThemeProvider value={theme}>
                <StatusBar />
                <Tabs
                    screenOptions={{
                        headerShown: false,
                        tabBarStyle: {
                            backgroundColor: theme.colors.card,
                        },
                    }}
                >
                    <Tabs.Screen name="home" options={{ title: 'Koti' }} />
                    <Tabs.Screen name="result" options={{ title: 'Tulossivu' }} />
                    <Tabs.Screen name='new-test' options={{title: 'Testaa Uudelleen'}}/>
                    <Tabs.Screen name='hint' options={{title: 'Päivän Vinkki'}}/>
                </Tabs>
                <PortalHost />
            </ThemeProvider>
        </SafeAreaProvider>
    );
};

export default HomeLayout;
