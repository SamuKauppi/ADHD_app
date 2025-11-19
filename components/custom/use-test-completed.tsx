import { useEffect, useState, useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useTestCompleted = () => {
  const [completed, setCompleted] = useState<boolean | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const value = await AsyncStorage.getItem('testCompleted');
        setCompleted(value ? JSON.parse(value) === true : false);
      } catch {
        setCompleted(false);
      }
    }
    load();
  }, []);

  return completed;
};
