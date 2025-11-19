import { Share } from 'react-native';

type ShareProps = {
    message: string;
    url?: string
};

// Handles the sharewindow opening
export async function ShareHandling({ message, url }: ShareProps) {
    try {
        await Share.share({
            message: message,
            url: url,
        });
    } catch (error) {
        console.log('Error sharing content:', error);
    }
}
