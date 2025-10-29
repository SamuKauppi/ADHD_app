import { StyleSheet, View } from 'react-native'
import { Button } from '@/components/ui/button'
import React from 'react'

type StepProgressbarProps = {
    maxSteps: number;
    currentStep?: number;
}

const StepProgressbar = ({ maxSteps, currentStep = 0 }: StepProgressbarProps) => {

    return (
        <View style={styles.container}>
            {Array.from({ length: maxSteps }).map((_, index) => (
                <Button
                    key={index}
                    style={[
                        styles.stepButton
                    ]}
                    disabled={index > currentStep}
                />
            ))}
        </View>
    )
}

export default StepProgressbar

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row', // Align buttons left-to-right
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        gap: 5,
    },
    stepButton: {
        flex: 1,               // Make buttons evenly spaced
        maxHeight: 10,
    },
})