import Button from '@/components/custom/generic/button';
import { Stack, useRouter } from 'expo-router';
import { StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KUTRI_COLORS } from '@/lib/brand-colors';
import Spacer from '@/components/ui/Spacer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';

// Settings page (was `hint`) — contains reset data action
const SettingsPage = () => {
  const router = useRouter();

  return (
    <>
      <Stack.Screen />
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Asetukset</Text>

        <Spacer height={30} />

        <Button
          onPress={async () => {
            try {
              await AsyncStorage.clear();
              console.log('AsyncStorage cleared');
              router.replace('/');
            } catch (e) {
              console.log('Failed to clear AsyncStorage', e);
            }
          }}
          text='Reset data'
        />
      </SafeAreaView>
    </>
  );
}

export default SettingsPage

const styles = StyleSheet.create({
  title: {
    marginTop: 50,
    fontSize: 24,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: KUTRI_COLORS.background,
  }
});
