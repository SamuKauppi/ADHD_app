import { THEME } from '@/lib/theme';
import React from 'react';
import { StyleSheet, View, Pressable, useColorScheme } from 'react-native';

type StepProgressbarProps = {
    maxSteps: number;
    currentStep?: number;
    style?: object;
    buttonStyle?: object;
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

    const scheme = useColorScheme()
    const theme = THEME[scheme ?? 'light'];

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
                                    ? theme.foreground
                                    : theme.mutedForeground,
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
        marginHorizontal: 3,
        minWidth: 0,
    }
});