import IconButton from '@/components/custom/navigation/icon-button';
import '@/global.css';

import { NAV_THEME } from '@/lib/theme';
import { ThemeProvider } from '@react-navigation/native';
import { PortalHost } from '@rn-primitives/portal';
import { Tabs } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'nativewind';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Layout page responsible for dashboard
const HomeLayout = () => {
    const { colorScheme } = useColorScheme();
    const theme = NAV_THEME[colorScheme ?? 'light'];

    return (
        <>
            <SafeAreaProvider style={{ backgroundColor: theme.colors.background }}>
                <ThemeProvider value={theme}>
                    <StatusBar />
                    <Tabs
                        screenOptions={{
                            headerShown: false,
                            tabBarStyle: {
                                backgroundColor: theme.colors.card,
                            },
                        }}>
                        <Tabs.Screen name="home" options={{
                            title: 'Koti',
                            tabBarIcon: ({ focused }) => (
                                <IconButton
                                    iconName={focused ? 'homeOpenD' : 'homeClosedD'}
                                    style={{
                                        width: 25,
                                        height: 25
                                    }}
                                />
                            )
                        }} />
                        <Tabs.Screen name="result" options={{
                            title: 'Tulokset',
                            tabBarIcon: ({ focused }) => (
                                <IconButton
                                    iconName={focused ? 'resultOpenD' : 'resultClosedD'}
                                    style={{
                                        width: 25,
                                        height: 25
                                    }}
                                />
                            )
                        }} />
                        <Tabs.Screen name='new-test' options={{
                            title: 'Testaa Uudelleen',
                            tabBarIcon: ({ focused }) => (
                                <IconButton
                                    iconName={focused ? 'testOpenD' : 'testClosedD'}
                                    style={{
                                        width: 25,
                                        height: 25
                                    }}
                                />
                            )
                        }} />
                        <Tabs.Screen name='hint' options={{
                            title: 'Päivän Vinkki',
                        }} />
                    </Tabs>
                    <PortalHost />
                </ThemeProvider>
            </SafeAreaProvider>
        </>
    );
};

export default HomeLayout;
