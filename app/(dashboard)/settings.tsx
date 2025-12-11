import { router, Stack } from 'expo-router';
import { ScrollView, StyleSheet, View } from 'react-native';
import { KUTRI_COLORS } from '@/lib/brand-colors';
import { APP_HORIZONTAL_MARGIN, APP_HORIZONTAL_SCROLL_PADDING } from '@/lib/layout';

import React from 'react';
import Spacer from '@/components/ui/Spacer';
import HeaderTitle from '@/components/custom/navigation/header-title';
import NavbarStyle from '@/components/custom/hooks/navbar-style';
import AppInfo from '@/components/custom/app-info/app-info';

const SettingsPage = () => {
  return (
    <>
      <Stack.Screen />
      <NavbarStyle />
      <HeaderTitle 
      title="TIETOA SOVELLUKSESTA"/>

      <View style={styles.container}>
        <ScrollView style={styles.scrollMargin}>
          <Spacer height={10} />
          <View style={styles.content}>
            <AppInfo showReset={true} />
            <Spacer height={20} />
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default SettingsPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: KUTRI_COLORS.background,
  },
  scrollMargin: {
    marginHorizontal: APP_HORIZONTAL_MARGIN,
    paddingHorizontal: APP_HORIZONTAL_SCROLL_PADDING,
  },
  content: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    flex: 1,
    backgroundColor: KUTRI_COLORS.foreground,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: KUTRI_COLORS.cardForeground,
    padding: '5%',
  },
});
