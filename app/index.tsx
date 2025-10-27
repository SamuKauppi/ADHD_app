import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { Link, Stack } from 'expo-router';
import * as React from 'react';
import { View, StyleSheet } from 'react-native';

import Spacer from '@/components/ui/Spacer';

const SCREEN_OPTIONS = {
  title: 'Home',
  headerTransparent: true
};

export default function Screen() {

  return (
    <>
      <Stack.Screen options={SCREEN_OPTIONS} />
      <View style={styles.container}>
        <Text style={styles.title}>ADHD app</Text>

        <Spacer height={50} />

        <Text>This is a starter template for building React Native apps with reusable components.</Text>

        <Spacer height={20} />

        <Button>
          <Link href={'/test'}>
            <Text>Get Started</Text>
          </Link>
        </Button>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
