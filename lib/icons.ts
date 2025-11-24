// icons.ts
// require() in RN returns a number (bundle id), so use `number` or `any`
export const iconMap: Record<string, number> = {
  closeL: require('../assets/images/closeL.png'),
  closeD: require('../assets/images/closeD.png'),
  chevronD: require('../assets/images/chevronD.png'),
  chevronL: require('../assets/images/chevronL.png'),
  shareD: require('../assets/images/shareD.png'),
  shareL: require('../assets/images/shareL.png'),
  homeOpenD: require('../assets/images/HomeOpenD.png'),
  homeClosedD: require('../assets/images/HomeClosedD.png'),
  resultOpenD: require('../assets/images/ResultOpenD.png'),
  resultClosedD: require('../assets/images/ResultClosedD.png'),
  testOpenD: require('../assets/images/TestOpenD.png'),
  testClosedD: require('../assets/images/TestClosedD.png'),
  checkmarkD: require('../assets/images/checkmark.png')
}
