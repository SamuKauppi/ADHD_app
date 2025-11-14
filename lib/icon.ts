// icons.ts
// require() in RN returns a number (bundle id), so use `number` or `any`
export const iconMap: Record<string, number> = {
  closeL: require('../assets/images/closeL.png'),
  closeD: require('../assets/images/closeD.png'),
  chevronD: require('../assets/images/chevronD.png'),
  chevronL: require('../assets/images/chevronL.png'),
  shareD: require('../assets/images/shareD.png'),
  shareL: require('../assets/images/shareL.png')
}
