// NavigationButtons.tsx
import { View, StyleSheet, ViewStyle } from 'react-native';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import Spacer from '@/components/ui/Spacer';
import IconButton from '@/components/custom/icon-button';

interface NavigationButtonsProps {
  onNext: () => void;
  onPrevious: () => void;
  disableNext?: boolean;
  containerStyle?: ViewStyle
}

const NavigationButtons = ({ onNext, onPrevious, disableNext, containerStyle }: NavigationButtonsProps) => {
  return (
    <View style={[styles.navigationContainer, containerStyle]}>
      <Button onPress={onPrevious} style={styles.navigationBtn}>
        <IconButton iconName='chevron' oppositeColor={true} style={styles.navigationBtnImg} mirror={true}/>
        <Text style={styles.navigationBtnTxt}>Edellinen</Text>
      </Button>
      <Spacer width={20} />
      <Button onPress={onNext} disabled={disableNext} style={styles.navigationBtn}>
        <Text style={styles.navigationBtnTxt}>Seuraava</Text>
        <IconButton iconName='chevron' oppositeColor={true} style={styles.navigationBtnImg} />
      </Button>
    </View>
  );
};

export default NavigationButtons;

const styles = StyleSheet.create({
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  navigationBtn: {
    width: '45%',
    height: 50
  },
  navigationBtnTxt: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  navigationBtnImg: {
    width: 15,
    height: 15
  }
});
