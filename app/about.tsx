import { Stack, useRouter } from 'expo-router';
import { ScrollView, StyleSheet, View } from 'react-native';
import { KUTRI_COLORS } from '@/lib/brand-colors';
import { APP_HORIZONTAL_MARGIN, APP_HORIZONTAL_SCROLL_PADDING } from '@/lib/layout';

import React from 'react';
import Spacer from '@/components/ui/Spacer';
import HeaderTitle from '@/components/custom/navigation/header-title';
import NavbarStyle from '@/components/custom/hooks/navbar-style';
import Button from '@/components/custom/navigation/button';
import AppInfo from '@/components/custom/app-info/app-info';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import IconButton from '@/components/custom/navigation/icon-button';
import { useSwipe } from '@/components/custom/hooks/swipe';

const AboutPage = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const panHandlers = useSwipe({
    onSwipeLeft: () => router.back()
  })

  return (
    <>
      <Stack.Screen />
      <NavbarStyle />
      <HeaderTitle
        title="TIETOA SOVELLUKSESTA"
        showRightBtn={true} />

      <View style={[styles.container, { paddingBottom: insets.bottom }]} {...panHandlers}>
        <ScrollView style={styles.scrollMargin}>
          <Spacer height={20} />
          <View style={styles.content}>
            <AppInfo showReset={true} />
            <Spacer height={20} />

            <Button
              text="TAKAISIN ALOITUSSIVULLE"
              onPress={() => router.back()}
              color={KUTRI_COLORS.button}
              pressedColor={KUTRI_COLORS.buttonHighlight}
              style={styles.button}
              textStyle={styles.buttonText}
              rightIcon={
                <IconButton
                  iconName='chevron'
                  style={styles.backIcon} />
              }
            />
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default AboutPage;

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
  button: {
    borderWidth: 1,
    width: '80%',
    height: 60,
    borderColor: KUTRI_COLORS.cardForeground,
    marginBottom: 20,
  },
  buttonText: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 17,
    padding: 5,
  },
  backIcon: {
    width: 15,
    height: 20,
  }
});
