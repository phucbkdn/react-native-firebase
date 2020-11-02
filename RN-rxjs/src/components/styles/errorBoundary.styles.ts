import { TextStyle, ViewStyle } from 'react-native'
import { color } from '../../themes'

export const errorStyles = {
  safeAreaView: {
    flex: 1,
  } as ViewStyle,
  container: {
    flex: 1,
    margin: 10,
  } as ViewStyle,
  text: {
    width: '100%',
  } as TextStyle,
  title: {
    fontSize: 32,
  } as TextStyle,
  description: {
    marginVertical: 10,
    lineHeight: 23,
    fontWeight: '500',
  } as TextStyle,
  btn: {
    backgroundColor: color.yellow,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    elevation: 1,
    width: '80%',
    height: 40,
    marginVertical: 20,
  } as ViewStyle,
  btnWrapper: {
    alignItems: 'center',
  } as ViewStyle,
}
