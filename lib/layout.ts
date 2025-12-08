import { PixelRatio, Dimensions } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;

export const APP_HORIZONTAL_MARGIN = 
  PixelRatio.roundToNearestPixel(SCREEN_WIDTH * 0.02);  // 4%

export const APP_HORIZONTAL_SCROLL_PADDING = 
  PixelRatio.roundToNearestPixel(SCREEN_WIDTH * 0.04);  // 2%

export const APP_HORIZONTAL_TOTAL_MARGIN = 
  APP_HORIZONTAL_MARGIN + APP_HORIZONTAL_SCROLL_PADDING;
