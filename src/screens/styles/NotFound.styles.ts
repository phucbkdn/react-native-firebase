import { TextStyle, ViewStyle } from 'react-native'
import { color } from '../../themes'

export const notFoundStyles = {
  container: {
    flex: 1,
    backgroundColor: color.while,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  } as ViewStyle,
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  } as TextStyle,
  link: {
    marginTop: 15,
    paddingVertical: 15,
  } as TextStyle,
  linkText: {
    fontSize: 14,
  } as TextStyle,
}
