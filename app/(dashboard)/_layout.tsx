import IconButton from '@/components/custom/navigation/icon-button';
import '@/global.css';

import { PortalHost } from '@rn-primitives/portal';
import { Tabs } from 'expo-router';
import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { KUTRI_COLORS } from '@/lib/brand-colors';

// Layout page responsible for dashboard
const HomeLayout = () => {

    return (
        <SafeAreaProvider style={{ backgroundColor: KUTRI_COLORS.background, flex: 1 }}>
            <View style={{ flex: 1, backgroundColor: KUTRI_COLORS.background }}>
                <StatusBar />
                <PortalHost />
                <Tabs
                    screenOptions={{
                        headerShown: false,                        
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
                    <Tabs.Screen name='settings' options={{
                        title: 'Tiedot',
                        tabBarIcon: ({ focused }) => (
                            <IconButton
                                iconName={focused ? 'settingsOpenD' : 'settingsClosedD'}
                                style={{
                                    width: 25,
                                    height: 25
                                }}
                            />
                        )
                    }} />
                </Tabs>
            </View>
        </SafeAreaProvider>
    );
};

export default HomeLayout;
