import { Stack, useRouter, useFocusEffect } from 'expo-router';
import { StyleSheet, Text, View} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useCallback } from 'react';

import { useTestCompleted } from '@/components/custom/hooks/use-test-completed';
import { useSwipe } from '@/components/custom/hooks/swipe';
import NavbarStyle from '@/components/custom/hooks/navbar-style';
import HeaderTitle from '@/components/custom/navigation/header-title';
import Button from '@/components/custom/navigation/button';
import IconButton from '@/components/custom/navigation/icon-button';
import Spacer from '@/components/ui/Spacer';
import { KUTRI_COLORS } from '@/lib/brand-colors';
import { BORDER_COLOR, SCROLLVIEW_HORIZONTAL_MARGIN, SCROLL_CONTENT_HORIZONTAL_MARGIN } from '@/lib/layout';

export default function Screen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const testCompleted = useTestCompleted();

  const panHandlers = useSwipe({
    onSwipeRight: () => router.push('/about'),
    onSwipeLeft: () => router.push('/content'),
  });

  useFocusEffect(
    useCallback(() => {
      if (testCompleted === null) return;
      if (testCompleted) {
        while (router.canGoBack()) router.back();
        router.replace('/home');
      }
    }, [testCompleted])
  );

  if (testCompleted === null || testCompleted) return null;

  return (
    <>
      <Stack.Screen />
      <HeaderTitle />
      <NavbarStyle buttonStyle="dark" />
      <View style={styles.container} {...panHandlers}>
        <View style={[styles.outerContent, { paddingBottom: insets.bottom }]}>
          <Spacer height={20} />
          <Cover />
          <ScrollableContent router={router} />
        </View>
      </View>
    </>
  );
}

function Cover() {
  return (
    <View style={styles.coverContainer}>
      <IconButton iconName="cover" imgStyle={styles.image} />
    </View>
  );
}

interface ScrollableContentProps {
  router: ReturnType<typeof useRouter>;
}

function ScrollableContent({ router }: ScrollableContentProps) {
  return (
    <View style={styles.scrollViewContainer}>
      <View style={styles.innerContent}>
        <Text style={styles.title}>Selvitä oma ADHD-tyyppisi</Text>
        <View style={styles.buttonContainer}>
          <TestButton router={router} />
          <Spacer height={25} />
          <OravaButton router={router} />
          <Spacer height={25} />
          <InfoLink router={router} />
        </View>
      </View>
    </View>
  );
}

interface ButtonProps {
  router: ReturnType<typeof useRouter>;
}

function TestButton({ router }: ButtonProps) {
  return (
    <Button
      text="ALOITA TESTI"
      onPress={() => router.push('/content')}
      color={KUTRI_COLORS.button}
      pressedColor={KUTRI_COLORS.buttonHighlight}
      style={styles.mainButton}
      contentStyle={styles.mainButtonContent}
      textStyle={styles.buttonText}
      rightIcon={
        <IconButton iconName='chevron' style={styles.btnChevron}/>
      }
    />
  );
}

function OravaButton({ router }: ButtonProps) {
  return (
    <Button
      onPress={() => router.push('http://kutri.net/ADHD/')}
      color={KUTRI_COLORS.cardBackground}
      pressedColor={KUTRI_COLORS.card}
      style={styles.mainButton}
      textStyle={styles.btnTxt}
      contentStyle={styles.btnContent}
      leftIcon={<IconButton iconName="orava" style={styles.btnLogo} />}
      rightIcon={<IconButton iconName="forward" style={styles.btnArrow} mirror mirrorDirection="vertical" />}
    />
  );
}

function InfoLink({ router }: ButtonProps) {
  return (
    <Text
      style={[styles.paragraph, { textDecorationLine: 'underline', color: 'blue' }]}
      onPress={() => router.push('/about')}
    >
      Tietoa sovelluksesta
    </Text>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: KUTRI_COLORS.background,
  },
  outerContent: {
    marginHorizontal: SCROLLVIEW_HORIZONTAL_MARGIN,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  coverContainer: {
    marginHorizontal: SCROLL_CONTENT_HORIZONTAL_MARGIN,
  },
  scrollViewContainer: {
    marginHorizontal: SCROLL_CONTENT_HORIZONTAL_MARGIN,
    backgroundColor: KUTRI_COLORS.foreground,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: BORDER_COLOR,
  },
  innerContent: {
    padding: 20,
  },
  image: {
    width: '100%',
    height: undefined,
    aspectRatio: 512 / 392,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'left',
  },
  paragraph: {
    fontSize: 18,
    lineHeight: 24,
    marginBottom: 15,
    textAlign: 'left',
  },
  buttonContainer: {
    alignItems: 'center',
  },
  buttonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 18,
  },
  mainButton: {
    borderWidth: 1,
    borderColor: BORDER_COLOR,
    width: '85%',
    height: 65,
  },
  mainButtonContent: {
    justifyContent: 'space-around',
    width: '100%'
  },
  btnTxt: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 18,
  },
  btnContent: {
    justifyContent: 'center',
    width: '100%',
  },
  btnLogo: {
    height: 60,
    width: 100,
  },
  btnArrow: {
    height: 40,
    width: 40,
  },
  btnChevron: {
    height: 20,
    width: 20
  }
});
