import { useState } from "react"
import { ADHD_TYPE } from "@/lib/adhd-types";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { ShareHandling } from "./share-handling";
import { Button } from "../ui/button";
import { Text } from "../ui/text";

const ShareResultButton = () => {
    const [loading, setLoading] = useState(false);

    const handleShare = async () => {
        setLoading(true);

        try {
            const highestKey = await AsyncStorage.getItem('result:highest');
            if (!highestKey) {
                console.log('No highest in memory')
                setLoading(false);
                return;
            }

            const valueStr = await AsyncStorage.getItem(`result:${highestKey}`)
            const value = valueStr ? parseInt(valueStr) : 0;

            const typeName = ADHD_TYPE[highestKey]?.name || highestKey;
            const message = `Olen ${value}% ${typeName}! Lue lisää osoitteessa: https://kutri.net/`
            const url = '../assets/images/close.png'

            await ShareHandling({ message, url });

        } catch (err) {
            console.error('Error sharing result', err);
        } finally {
            setLoading(false);
        }
    }

    return(
        <Button onPress={handleShare}>
            <Text>
                {loading ? 'Lataa...' : 'Jaa Tuloksesi!'}
            </Text>
        </Button>
    )
}

export default ShareResultButton;