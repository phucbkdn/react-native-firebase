import { TextStyle, ViewStyle } from 'react-native'
import { color, width } from '../../themes'

export const categoryStyles = {
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    paddingVertical: 15,
  } as ViewStyle,
  button: {
    backgroundColor: color.while,
    shadowColor: color.shadowColor,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    elevation: 1,
    width: 40,
    height: 40,
  } as ViewStyle,
  textStyle: {
    color: color.text,
    fontSize: 20,
    textTransform: 'capitalize',
    paddingBottom: 15,
    width: width / 2,
  } as TextStyle,
  count: {
    color: color.text,
    fontSize: 20,
    textTransform: 'capitalize',
    paddingHorizontal: 15,
  } as TextStyle,
}
