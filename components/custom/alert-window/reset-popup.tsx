import { StyleSheet, Text } from 'react-native'
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
        <Text style={txtStyle}>Poista tiedot</Text>
      </AlertDialogTrigger>
      <AlertDialogContent onClose={() => setOpen(false)} style={styles.container}>
        <AlertDialogHeader>
          <AlertDialogTitle style={styles.title}>Haluatko varmasti poistaa omat tiedot sovelluksesta?</AlertDialogTitle>
          <AlertDialogDescription style={styles.subtitle}>
            Tämä poistaa kaikki tallennetut testitulokset ja asetukset sovelluksesta. Toimintoa ei voi peruuttaa.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter style={styles.footer}>
          <AlertDialogCancel style={[styles.btn, {backgroundColor: '#ffff'}]}>
            <Text style={styles.btnText}>Peruuta</Text>
          </AlertDialogCancel>
          <AlertDialogAction 
          style={[styles.btn, {backgroundColor: 'black'}]}
          onPress={
            async () => {
              try {
                await AsyncStorage.clear();
                router.replace('/');
              } catch (e) {
                console.log('Failed to clear AsyncStorage', e);
              }
            }
          }>
            <Text style={[styles.btnText, {color: 'white'}]}>Poista</Text>
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
  container: {
    backgroundColor: 'white',
  },  
  btn: {
    borderColor: KUTRI_COLORS.cardForeground,
    height: 60,
    width: 140
  },
  title: {
    fontSize: 22,
    color: 'black'
  },
  subtitle: {
    fontSize: 16,
    color: '#393939ff'
  },
  btnText: {
    fontSize: 18,
  }
})