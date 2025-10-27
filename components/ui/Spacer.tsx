import {  View } from 'react-native'

const Spacer = ({width = 0, height = 40}) => {
  return (
    <View style={{
      width: width > 0 ? width : '100%',
      height: height,
    }}/>
  )
}

export default Spacer