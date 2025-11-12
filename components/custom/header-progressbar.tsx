// components/custom/header-with-progress.tsx
import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import StepProgressbar from '@/components/custom/step-progressbar';
import IconButton from '@/components/custom/icon-button';

interface HeaderWithProgressProps {
  currentStep: number;        // 0-based current step
  maxSteps: number;           // total number of steps
  onClose: () => void;        // close/back handler
  progressStyle?: ViewStyle;  // optional additional style for the progress bar
}

const HeaderWithProgress = ({
  currentStep,
  maxSteps,
  onClose,
  progressStyle
}: HeaderWithProgressProps) => {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.progressWrapper}>
        <StepProgressbar
          maxSteps={maxSteps}
          currentStep={currentStep}
          buttonStyle={[styles.progressbar, progressStyle]}
        />
      </View>

      <IconButton
        iconName="close"
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
    marginTop: 10,
    marginBottom: '10%',
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
