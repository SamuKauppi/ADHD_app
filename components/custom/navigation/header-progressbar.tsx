import { View, StyleSheet, ViewStyle } from 'react-native';
import StepProgressbar from '@/components/custom/navigation/step-progressbar';
import IconButton from '@/components/custom/navigation/icon-button';

interface HeaderWithProgressProps {
  currentStep: number;        // 0-based current step
  maxSteps: number;           // total number of steps
  onClose?: () => void;       // close/back handler
  style?: ViewStyle;          // optional style for container
}

// Header with a progressbar
// Used in test and info page
const HeaderWithProgress = ({
  currentStep,
  maxSteps,
  onClose,
  style
}: HeaderWithProgressProps) => {
  return (
    <View style={[styles.headerContainer, style]}>
      <View style={styles.progressWrapper}>
        <StepProgressbar
          maxSteps={maxSteps}
          currentStep={currentStep}
          buttonStyle={styles.progressbar}
        />
      </View>

      <IconButton
        iconName="closeD"
        style={styles.iconContainer}
        onPress={onClose}
      />
    </View>
  );
};

export default HeaderWithProgress;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingBottom: 10,
    zIndex: 10,
    marginHorizontal: '10%',
    top: 0,
    left: 0,
    right: 0,
  },
  progressWrapper: {
    flex: 1,
    marginRight: 12,
    // IMPORTANT: minWidth: 0 lets the child shrink on iOS/Android
    minWidth: 0,
    alignSelf: 'flex-end',
  },
  progressbar: {
    height: 6,
    borderRadius: 6,
  },
  iconContainer: {
    width: 35,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
