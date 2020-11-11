import { TextStyle, ViewStyle } from 'react-native'
import { color, width } from '../../themes'

export const userStyles = {
  wrapper: {
    flexDirection: 'row',
    paddingBottom: 20,
    alignItems: 'center',
    margin: 10,
    width: width,
    flex: 1,
  } as ViewStyle,
  textStyle: {
    fontSize: 11,
    lineHeight: 13,
    textTransform: 'capitalize',
    paddingLeft: 15,
    width: (width * 3) / 4,
  } as TextStyle,
}
