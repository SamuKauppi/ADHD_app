import { ADHD_TYPE } from "@/lib/adhd-types";
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function getSortedResults(): Promise<Record<string, number>> {
    const keys = Object.keys(ADHD_TYPE);
    const rawValues = await Promise.all(
        keys.map(key => AsyncStorage.getItem(`finalResult:${key}`))
    );

    const results: Record<string, number> = {};
    keys.forEach((key, i) => {
        const raw = rawValues[i];
        results[key] = raw ? parseFloat(raw) : 0; // convert to number
    });

    const sortedEntries = Object.entries(results).sort(([, a], [, b]) => b - a);

    return Object.fromEntries(sortedEntries) as Record<string, number>;
}
