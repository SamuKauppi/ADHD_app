import AsyncStorage from '@react-native-async-storage/async-storage';
import { QUESTIONS } from '@/lib/questions';
import { ADHD_TYPE } from '@/lib/adhd-types';

export const SaveFinalResults = async () => {
    const questionCount = Object.keys(QUESTIONS).length;

    const results: Record<string, number> = {};
    Object.keys(ADHD_TYPE).forEach(key => results[key] = 0);

    for (const questionKey of Object.keys(QUESTIONS)) {
        const optionsLength = QUESTIONS[questionKey].options.length;

        for (let i = 0; i < optionsLength; i++) {
            const answerKey = `${questionKey}:${i}`;
            const selected = await AsyncStorage.getItem(answerKey);

            if (selected === 'true' && i !== optionsLength - 1) {
                const typeKey = Object.keys(ADHD_TYPE)[i];
                results[typeKey] += 1;
            }
        }
    }

    // Save percentage results
    for (const [typeKey, value] of Object.entries(results)) {
        const percentage = (value / questionCount) * 100;
        await AsyncStorage.setItem(`finalResult:${typeKey}`, percentage.toString());
    }

    // Save highest scoring type
    const highestType = Object.entries(results).reduce((prev, curr) => curr[1] > prev[1] ? curr : prev)[0];
    await AsyncStorage.setItem('finalResult:highest', highestType);

    // Clear live answers
    const keys = await AsyncStorage.getAllKeys();
    const answerKeys = keys.filter(k => k.includes(':') && !k.startsWith('finalResult:'));
    if (answerKeys.length) await AsyncStorage.multiRemove(answerKeys);

    // Save testCompleted flag
    await AsyncStorage.setItem('testCompleted', 'true');
};
