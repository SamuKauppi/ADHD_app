import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { KUTRI_COLORS } from '@/lib/brand-colors';
import { SCROLL_CONTENT_HORIZONTAL_MARGIN, BORDER_COLOR } from '@/lib/layout';
import { Stack, useRouter } from 'expo-router';
import HeaderTitle from '@/components/custom/navigation/header-title';
import NavbarStyle from '@/components/custom/hooks/navbar-style';
import Button from '@/components/custom/navigation/button';
import IconButton from '@/components/custom/navigation/icon-button';
import Spacer from '@/components/ui/Spacer';
import { useSwipe } from '@/components/custom/hooks/swipe';

export default function ContentScreen() {
    const insets = useSafeAreaInsets();
    const router = useRouter();

    const panHandlers = useSwipe({
        onSwipeRight: () => router.back(),
        onSwipeLeft: () => router.replace('/test')
    });

    return (
        <>
            <Stack.Screen />
            <HeaderTitle title='Takaisin' showLeftBtn={true} onPressLeft={() => router.back()} />
            <NavbarStyle buttonStyle='dark' />

            <View style={[styles.container, { paddingBottom: insets.bottom }]} {...panHandlers}>
                <View style={styles.coverContainer}>
                    <IconButton iconName="orava" imgStyle={styles.image} />
                </View>

                <View style={styles.scrollViewContainer}>
                    <ScrollView contentContainerStyle={styles.innerContent}>
                        <Text style={styles.paragraph}>
                            ADHD:n eli tarkkaavuushäiriön takana on joukko erilaisia aivotoiminnan poikkeamia.
                        </Text>

                        <Text style={styles.paragraph}>
                            Viisi ADHD-tyyppiä teksti auttaa sinua selvittämään, millä kaikilla tavoilla oma tarkkaavuushäiriösi ehkä ilmenee ja mistä se johtuu.
                        </Text>

                        <Text style={styles.paragraph}>
                            Valitse vastausvaihtoehdoista kaikki ne, jotka tunnistat itsessäsi. Useimmat ADHD-ihmiset tunnistavat itsessään 2–5 eri tyyppiä.
                        </Text>

                        <Spacer height={25} />

                        <View style={styles.buttonRow}>
                            <Button
                                text="TAKAISIN"
                                onPress={() => router.back()}
                                color={KUTRI_COLORS.foreground}
                                pressedColor={KUTRI_COLORS.background}
                                style={styles.smallButton}
                                contentStyle={styles.buttonContent}
                                textStyle={styles.buttonText}
                                leftIcon={
                                    <IconButton iconName='chevron' style={styles.btnChevron} direction='left' />
                                }
                            />

                            <Button
                                text="KYSYMYKSIIN"
                                onPress={() => router.push('/test')}
                                color={KUTRI_COLORS.button}
                                pressedColor={KUTRI_COLORS.buttonHighlight}
                                style={styles.button}
                                contentStyle={styles.buttonContent}
                                textStyle={styles.buttonText}
                                rightIcon={
                                    <IconButton iconName='chevron' style={styles.btnChevron} />
                                }
                            />
                        </View>
                    </ScrollView>
                </View>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: KUTRI_COLORS.background,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%'
    },
    coverContainer: {
        marginHorizontal: SCROLL_CONTENT_HORIZONTAL_MARGIN,
        backgroundColor: KUTRI_COLORS.card,
        borderTopStartRadius: 10,
        borderTopEndRadius: 10,
        borderTopWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderColor: BORDER_COLOR,
        marginBottom: -1,
        padding: 15
    },
    image: {
        width: '100%',
        height: undefined,
        aspectRatio: 1024 / 468,
        resizeMode: 'contain',
    },
    scrollViewContainer: {
        marginHorizontal: SCROLL_CONTENT_HORIZONTAL_MARGIN,
        backgroundColor: KUTRI_COLORS.foreground,
        borderBottomStartRadius: 10,
        borderBottomEndRadius: 10,
        borderBottomWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderColor: BORDER_COLOR,
        maxHeight: '60%'
    },
    innerContent: {
        padding: 20,
    },
    paragraph: {
        fontSize: 18,
        lineHeight: 24,
        marginBottom: 15,
        textAlign: 'left',
    },
    buttonRow: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        width: '100%',
        gap: 10
    },
    smallButton: {
        borderWidth: 1,
        borderColor: BORDER_COLOR,
        height: 65,
    },
    button: {
        borderWidth: 1,
        borderColor: BORDER_COLOR,
        height: 65,
    },
    buttonContent: {
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 5
    },
    buttonText: {
        color: 'black',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 16,
        flex: 1
    },
    btnChevron: {
        height: 20,
        width: 20,
    }
});
