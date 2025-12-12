import { Stack, useRouter, useFocusEffect } from 'expo-router';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { useTestCompleted } from '@/components/custom/hooks/use-test-completed';
import { useCallback } from 'react';
import { KUTRI_COLORS } from '@/lib/brand-colors';

import RssList from '@/components/custom/home/rss-list';
import { BORDER_COLOR, SCROLLVIEW_HORIZONTAL_MARGIN, SCROLL_CONTENT_HORIZONTAL_MARGIN } from '@/lib/layout';
import HeaderTitle from '@/components/custom/navigation/header-title';
import NavbarStyle from '@/components/custom/hooks/navbar-style';
import ResultWidget from '@/components/custom/widget/result-widget';
import Spacer from '@/components/ui/Spacer';
import Button from '@/components/custom/navigation/button';
import IconButton from '@/components/custom/navigation/icon-button';

// Home screen. Redirects to Index if test is not complete
const Home = () => {
  const router = useRouter();
  const testCompleted = useTestCompleted();

  useFocusEffect(
    useCallback(() => {
      if (testCompleted === null) return;

      if (testCompleted === false) {
        while (router.canGoBack()) {
          router.back();
        }
        router.replace('/');
      }
    }, [testCompleted])
  );

  if (testCompleted === null || testCompleted === false) return null;

  return (
    <>
      <Stack.Screen />
      <NavbarStyle />
      <HeaderTitle title='TERVETULOA' />
      <View style={styles.container}>
        <ScrollView style={styles.scroll}>
          <View style={styles.inner}>
            <ResultWidget />
            <Spacer height={20} />
            <Button
              style={styles.btn}
              color={KUTRI_COLORS.cardBackground}
              pressedColor={KUTRI_COLORS.card}
              textStyle={styles.btnTxt}
              contentStyle={styles.btnContent}
              leftIcon={
                <IconButton iconName='orava' style={styles.btnLogo} />
              }
              text='Tutustu'
              rightIcon={
                <IconButton iconName='forward' style={styles.btnArrow} mirror={true} mirrorDirection='vertical' />
              }
              onPress={() => router.push('http://kutri.net/ADHD/')}
            />
            <Spacer height={20} />

            <View style={styles.rssContainer}>
              <Text style={styles.title}>Uusimmat artikkelit</Text>
              <Spacer height={5}/>
              <Text style={styles.text}>Lue lisää alla olevista artikkeleista Kutri.net blogista</Text>
              <Spacer height={15} />
              <RssList url="https://kutri.net/osiot/adhd/feed/" limit={5} />
            </View>
            <Spacer height={15} />

          </View>
        </ScrollView>
      </View>
    </>
  );
}

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: KUTRI_COLORS.background,
  },
  scroll: {
    marginHorizontal: SCROLLVIEW_HORIZONTAL_MARGIN,
  },
  inner: {
    paddingHorizontal: SCROLL_CONTENT_HORIZONTAL_MARGIN,
    alignItems: 'center',
  },
  btn: {
    borderWidth: 1,
    borderColor: BORDER_COLOR,
    height: 85,
    width: '100%',
  },
  btnContent: {
    justifyContent: 'space-evenly',
    width: '100%'
  },
  btnLogo: {
    height: 60,
    width: 100,
  },
  btnArrow: {
    height: 40,
    width: 40,
  },
  btnTxt: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 30,
  },
  rssContainer: {
    backgroundColor: KUTRI_COLORS.foreground,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: BORDER_COLOR,
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    height: 'auto',
    textAlign: 'left',
    textAlignVertical: 'center',
  },
  text: {
    fontSize: 16,
    height: 'auto',
    textAlign: 'left',
    textAlignVertical: 'center'
  }
});
