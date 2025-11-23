import { View, StyleSheet, ViewStyle, Text, Pressable } from 'react-native';
import Spacer from '@/components/ui/Spacer';
import IconButton from '@/components/custom/navigation/icon-button';
import { KUTRI_COLORS } from '@/lib/brand-colors';

interface NavigationButtonsProps {
  onNext: () => void;               // On next functionality
  onPrevious: () => void;           // On previous functionality
  // Button texts 
  nextText?: string;
  prevText?: string;                
  // Hide one of the buttons
  hideNext?: boolean;
  hidePrev?: boolean;
  // Disable one of the buttons
  disableNext?: boolean;
  disablePrev?: boolean;
  // Button arrow orientations
  nextArrowDir?: 'left' | 'right' | 'up' | 'down';
  prevArrowDir?: 'left' | 'right' | 'up' | 'down';
  // Style
  containerStyle?: ViewStyle;
}

// Navigation footer
// Used in test and info page
const NavigationButtons = ({
  onNext,
  onPrevious,
  nextText,
  prevText,
  hideNext,
  hidePrev,
  disableNext,
  disablePrev,
  nextArrowDir = 'right',
  prevArrowDir = 'left',
  containerStyle
}: NavigationButtonsProps) => {

  return (
    <View style={[styles.navigationContainer, containerStyle]}>
      {/* Previous Button */}
      {hidePrev ? (
        <View style={styles.navigationBtn} />
      ) : (
        <Pressable 
        onPress={onPrevious} 
        disabled={disablePrev}
        style={[styles.navigationBtn, {
          backgroundColor: KUTRI_COLORS.foreground,
        }]}>
          <IconButton 
          iconName="chevronD" 
          style={styles.navigationBtnImg}
          direction={prevArrowDir}
          />
          <Text style={styles.navigationBtnTxt}>{prevText ?? 'Edellinen'}</Text>
        </Pressable>
      )}

      <Spacer width={20} />

      {/* Next Button */}
      {hideNext ? (
        <View style={styles.navigationBtn} />
      ) : (
        <Pressable 
        onPress={onNext} 
        disabled={disableNext} 
        style={[styles.navigationBtn, {
          backgroundColor: KUTRI_COLORS.button,
        }]}>
          <Text style={styles.navigationBtnTxt}>{nextText ?? 'Seuraava'}</Text>
          <IconButton 
          iconName="chevronD" 
          style={styles.navigationBtnImg} 
          direction={nextArrowDir}/>
        </Pressable>
      )}
    </View>
  );
};

export default NavigationButtons;

const styles = StyleSheet.create({
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  navigationBtn: {
    width: '45%',
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingHorizontal: 10,
    borderRadius: 10,
    borderColor: KUTRI_COLORS.cardForeground,
    borderWidth: 2
  },
  navigationBtnTxt: {
    fontSize: 19,
    fontWeight: 'bold',
    marginHorizontal: 5,
  },
  navigationBtnImg: {
    width: 15,
    height: 20,
  },
});
