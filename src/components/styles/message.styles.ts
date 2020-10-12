import { TextStyle, ViewStyle } from 'react-native'
import { color, width } from '../../themes'

export const messageStyles = {
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    alignContent: 'flex-end',
    padding: 10,
    margin: 10,
  } as ViewStyle,
  textStyle: {
    color: color.text,
    fontSize: 18,
    flexWrap: 'wrap',
  } as TextStyle,
  time: {
    color: color.dim,
    fontSize: 16,
    textTransform: 'capitalize',
    paddingLeft: 20,
  } as TextStyle,
  primary: {
    backgroundColor: color.primary,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  } as ViewStyle,
  secondary: {
    backgroundColor: '#cdd4da',
    borderTopEndRadius: 5,
    borderBottomEndRadius: 5,
  } as ViewStyle,
  primaryWrapper: {
    flex: 1,
    alignItems: 'flex-end',
    width: width,
  } as ViewStyle,
  secondaryWrapper: {
    width: width,
    flex: 1,
    alignItems: 'flex-start',
  } as ViewStyle,
}
