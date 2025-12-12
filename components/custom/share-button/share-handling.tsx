import { ADHD_TYPE } from "@/lib/adhd-types";
import { Share } from "react-native";
import { getSortedResults } from "../functions/get-sorted-results";

type ShareProps = {
    url?: string;
};

// Responsible for ALL sharing logic
export async function ShareHandling({ url }: ShareProps = {}) {
    try {
        const sortedResults = await getSortedResults();

        // Make message
        let message = 'Tein 5 ADHD-tyyppiä testin ja sen mukaan olen näin paljon eri tyyppejä:\n';
        for (const [key, value] of Object.entries(sortedResults)) {
            message += `${value} % ${ADHD_TYPE[key].name}\n`;
        }
        message += 'Kuulostaako tutulta? Halutako tietää omat tyyppisi?\nTsekkaa: Kutri.net';

        await Share.share({
            message
        });

    } catch (error) {
        console.log('Error sharing content:', error);
    }
}

