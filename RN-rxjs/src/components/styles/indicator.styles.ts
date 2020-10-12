import { StyleSheet } from 'react-native'
import { palette } from '../../themes'

export default StyleSheet.create({
  backdrops: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 10,
    backgroundColor: palette.halfShuttle,
  },
})
