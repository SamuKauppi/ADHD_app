import '@/global.css';

import IconButton from '@/components/custom/navigation/icon-button';

import { PortalHost } from '@rn-primitives/portal';
import { Tabs } from 'expo-router';
import { StyleSheet, useColorScheme, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { KUTRI_COLORS } from '@/lib/brand-colors';

const HomeLayout = () => {
    const theme = useColorScheme();
    const backgroundColor = theme === 'light' ? KUTRI_COLORS.foreground : KUTRI_COLORS.cardForeground;
    const activeText = theme === 'light' ? KUTRI_COLORS.text : KUTRI_COLORS.textLight;
    const inactiveText = theme === 'light' ? KUTRI_COLORS.textInactive : KUTRI_COLORS.textInactiveLight;

    return (
        <SafeAreaProvider style={{ backgroundColor: KUTRI_COLORS.background, flex: 1 }}>
            <View style={{ flex: 1, backgroundColor: KUTRI_COLORS.background }}>
                <StatusBar
                    animated={true}
                    style='light' />
                <PortalHost />
                <Tabs
                    screenOptions={{
                        headerShown: false,
                        tabBarStyle: {
                            backgroundColor: backgroundColor
                        },
                        tabBarActiveTintColor: activeText,
                        tabBarInactiveTintColor: inactiveText,
                        tabBarLabelStyle: {
                            fontSize: 10,
                            marginTop: 5
                        }
                    }}>
                    <Tabs.Screen name="home" options={{
                        title: 'Koti',
                        tabBarIcon: ({ focused }) => (
                            <IconButton
                                iconName={focused ? 'homeOpen' : 'homeClosed'}
                                style={styles.iconStyle}
                                useColorMode={true}
                                oppositeColorMode={true}
                            />
                        )
                    }} />

                    <Tabs.Screen name="result" options={{
                        title: 'Tulokset',
                        tabBarIcon: ({ focused }) => (
                            <IconButton
                                iconName={focused ? 'resultOpen' : 'resultClosed'}
                                style={styles.iconStyle}
                                useColorMode={true}
                                oppositeColorMode={true}
                            />
                        )
                    }} />

                    <Tabs.Screen name='new-test' options={{
                        title: 'Testaa Uudelleen',
                        tabBarIcon: ({ focused }) => (
                            <IconButton
                                iconName={focused ? 'testOpen' : 'testClosed'}
                                style={styles.iconStyle}
                                useColorMode={true}
                                oppositeColorMode={true}
                            />
                        )
                    }} />

                    <Tabs.Screen name='settings' options={{
                        title: 'Tiedot',
                        tabBarIcon: ({ focused }) => (
                            <IconButton
                                iconName={focused ? 'settingsOpen' : 'settingsClosed'}
                                style={styles.iconStyle}
                                useColorMode={true}
                                oppositeColorMode={true}
                            />
                        )
                    }} />
                </Tabs>
            </View>
        </SafeAreaProvider>
    );
};

export default HomeLayout;

const styles = StyleSheet.create({
    iconStyle: {
        width: 30,
        height: 30,
    }
});
