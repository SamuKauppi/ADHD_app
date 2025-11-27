import { StyleSheet, Text as Txt } from 'react-native'
import { router } from 'expo-router';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Text } from '@/components/ui/text';
import { KUTRI_COLORS } from '@/lib/brand-colors';

import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';


type ResetPopupProps = {
  btnStyle?: any;
  txtStyle?: any;
}

const ResetPopup = ({ btnStyle, txtStyle }: ResetPopupProps) => {
  const [open, setOpen] = useState(false);

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger style={btnStyle}>
        <Txt style={txtStyle}>Poista tiedot</Txt>
      </AlertDialogTrigger>
      <AlertDialogContent onClose={() => setOpen(false)}>
        <AlertDialogHeader>
          <AlertDialogTitle>Haluatko varmasti poistaa tiedot sovelluksesta?</AlertDialogTitle>
          <AlertDialogDescription>
            Tämä poistaa kaikki tallennetut testitulokset ja asetukset sovelluksesta. Toimintoa ei voi peruuttaa.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter style={styles.footer}>
          <AlertDialogCancel style={styles.btn}>
            <Text>Peruuta</Text>
          </AlertDialogCancel>
          <AlertDialogAction 
          style={styles.btn}
          onPress={
            async () => {
              try {
                await AsyncStorage.clear();
                console.log('AsyncStorage cleared');
                router.replace('/');
              } catch (e) {
                console.log('Failed to clear AsyncStorage', e);
              }
            }
          }>
            <Text>Poista</Text>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default ResetPopup

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 20,
  },
  btn: {
    borderColor: KUTRI_COLORS.cardForeground,
  }
})