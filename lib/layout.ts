import { PixelRatio, Dimensions } from 'react-native';
import { KUTRI_COLORS } from './brand-colors';

const SCREEN_WIDTH = Dimensions.get('window').width;

export const SCROLLVIEW_HORIZONTAL_MARGIN  =
  PixelRatio.roundToNearestPixel(SCREEN_WIDTH * 0.02);  // 2%

export const SCROLL_CONTENT_HORIZONTAL_MARGIN  =
  PixelRatio.roundToNearestPixel(SCREEN_WIDTH * 0.04);  // 4%

export const TOTAL_MARGIN =
  SCROLLVIEW_HORIZONTAL_MARGIN  + SCROLL_CONTENT_HORIZONTAL_MARGIN ;

export const BUTTON_UNSTABLE_DELAY = 85;

export const BORDER_COLOR = KUTRI_COLORS.cardForeground
