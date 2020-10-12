import { TextStyle, ViewStyle, StatusBar } from 'react-native'
import { color, spacing } from '../../themes'

export const messagesStyles = {
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    paddingTop: 10,
  } as ViewStyle,
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  } as TextStyle,
  input: {
    borderBottomColor: 'red',
    borderBottomWidth: 2,
    width: '80%',
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
    // backgroundColor: color.transparent,
  } as ViewStyle,
}