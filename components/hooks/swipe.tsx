// hooks/useSwipe.ts
import { useRef, useEffect } from 'react';
import { PanResponder, GestureResponderEvent, PanResponderGestureState } from 'react-native';

type UseSwipeConfig = {
  onSwipeLeft?: (event: GestureResponderEvent, gesture: PanResponderGestureState) => void;
  onSwipeRight?: (event: GestureResponderEvent, gesture: PanResponderGestureState) => void;
  threshold?: number;
};

export function useSwipe({ onSwipeLeft, onSwipeRight, threshold = 50 }: UseSwipeConfig) {
  // keep latest callbacks in a ref so PanResponder always calls latest versions
  const callbacksRef = useRef<{ onSwipeLeft?: typeof onSwipeLeft; onSwipeRight?: typeof onSwipeRight }>({
    onSwipeLeft,
    onSwipeRight,
  });

  useEffect(() => {
    callbacksRef.current.onSwipeLeft = onSwipeLeft;
    callbacksRef.current.onSwipeRight = onSwipeRight;
  }, [onSwipeLeft, onSwipeRight]);

  const panResponderRef = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => false,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        // only take over for clear horizontal movement
        return Math.abs(gestureState.dx) > Math.abs(gestureState.dy) && Math.abs(gestureState.dx) > 10;
      },
      onPanResponderRelease: (evt, gestureState) => {
        const { dx } = gestureState;
        if (dx > threshold) {
          callbacksRef.current.onSwipeRight?.(evt, gestureState);
        } else if (dx < -threshold) {
          callbacksRef.current.onSwipeLeft?.(evt, gestureState);
        }
      },
    })
  );

  return panResponderRef.current.panHandlers;
}
