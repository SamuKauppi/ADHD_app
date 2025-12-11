import { ADHD_TYPE } from "@/lib/adhd-types";
import { Share } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

type ShareProps = {
    url?: string;
};

// Responsible for ALL sharing logic
export async function ShareHandling({ url }: ShareProps = {}) {
    try {
        // Get keys
        const keys = Object.keys(ADHD_TYPE);
        const values = await Promise.all(
            keys.map(key => AsyncStorage.getItem(`finalResult:${key}`))
        );

        // Get values
        const results: Record<string, string | null> = {};
        keys.forEach((key, i) => {
            results[key] = values[i];
        });

        // Sort values
        const sortedEntries = Object.entries(results)
            .sort((a, b) => {
                const valA = a[1] ?? '';
                const valB = b[1] ?? '';
                return (valB as any) > (valA as any) ? 1 : (valB as any) < (valA as any) ? -1 : 0;
            })
        const sortedResults: Record<string, string | null> = Object.fromEntries(sortedEntries);

        // Make message
        let message = 'Tein 5 ADHD-tyyppiä testin ja sen mukaan olen näin paljon eri tyyppejä:\n';
        for (const [key, value] of Object.entries(sortedResults)) {
            message += `${value} % ${ADHD_TYPE[key].name}\n`
        }
        message += 'Kuulostaako tutulta? Halutako tietää omat tyyppisi?\nTsekkaa: Kutri.net'

        await Share.share({
            message: message
        });

    } catch (error) {
        console.log('Error sharing content:', error);
    }
}
