import { KUTRI_COLORS } from '@/lib/brand-colors';
import { THEME } from '@/lib/theme';
import React from 'react';
import { StyleSheet, View, Pressable, useColorScheme } from 'react-native';

type StepProgressbarProps = {
    maxSteps: number;       // How many steps there will be
    currentStep?: number;   // Current step
    // Styles
    style?: object;         
    buttonStyle?: object;
    // What does pressing one step does
    onStepPress?: (stepIndex: number) => void;
};

// Progressbar with steps
const StepProgressbar = ({
    maxSteps,
    currentStep = 0,
    style,
    buttonStyle,
    onStepPress,
}: StepProgressbarProps) => {

    return (
        <View style={[styles.container, style]}>
            {Array.from({ length: maxSteps }).map((_, index) => {
                const active = index <= currentStep;

                return (
                    <Pressable
                        key={index}
                        onPress={() => onStepPress?.(index)}
                        style={[
                            styles.stepButton,
                            buttonStyle,
                            {
                                backgroundColor: active
                                    ? KUTRI_COLORS.cardForeground
                                    : KUTRI_COLORS.background,
                            },
                        ]}
                        disabled={active}
                    />
                );
            })}
        </View>
    );
};

export default StepProgressbar;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 6,
    },
    stepButton: {
        flex: 1,
        height: 6,
        borderRadius: 6,
        borderWidth: 1,
        marginHorizontal: 3,
        minWidth: 0,
    }
});