import { TextStyle, ViewStyle } from 'react-native'
import { color } from '../../themes'

export const messageStyles = {
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    alignContent: 'flex-end',
    padding: 10,
    marginHorizontal: 10,
  } as ViewStyle,
  textStyle: {
    fontSize: 18,
    flexWrap: 'wrap',
    maxWidth: '80%',
  } as TextStyle,
  time: {
    fontSize: 16,
    textTransform: 'capitalize',
    paddingLeft: 20,
  } as TextStyle,
  primary: {
    backgroundColor: color.lighterGrey,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  } as ViewStyle,
  secondary: {
    backgroundColor: color.primary,
    borderTopEndRadius: 5,
    borderBottomEndRadius: 5,
  } as ViewStyle,
  primaryWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: 10,
  } as ViewStyle,
  secondaryWrapper: {
    flexDirection: 'row-reverse',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: 10,
  } as ViewStyle,
}
