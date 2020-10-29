import { TextStyle, ViewStyle } from 'react-native'
import { color } from '../../themes'

export const usersStyles = {
  container: {
    flex: 1,
  } as ViewStyle,
  screen: {
    flex: 1,
  } as ViewStyle,
  userRow: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingBottom: 8,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 6,
  } as ViewStyle,
  userImage: {
    marginRight: 12,
  } as ViewStyle,
  chatList: {
    textAlign: 'center',
    fontSize: 20,
  } as TextStyle,
  displayName: {
    fontSize: 18,
  } as TextStyle,
  email: {
    color: color.shadowColor,
    fontSize: 16,
  } as TextStyle,
}
