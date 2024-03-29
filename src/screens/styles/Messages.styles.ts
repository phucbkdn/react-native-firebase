import { TextStyle, ViewStyle, StatusBar, Platform } from 'react-native'
import { color } from '../../themes'

export const messagesStyles = {
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  } as ViewStyle,
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  } as TextStyle,
  input: {
    borderBottomColor: color.red,
    borderBottomWidth: 2,
    width: Platform.OS !== 'web' ? '80%' : '100%',
    height: 40,
    paddingLeft: 5,
    marginRight: 20,
    fontSize: 20,
    backgroundColor: color.transparent,
    color: color.dim,
  },
  textWrapper: {
    flexDirection: 'row',
    paddingBottom: 20,
    alignItems: 'flex-end',
    margin: 10,
  } as ViewStyle,
  screen: {
    flex: 1,
  } as ViewStyle,
}
