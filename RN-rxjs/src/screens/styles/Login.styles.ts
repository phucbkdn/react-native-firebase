import { TextStyle, ViewStyle, ImageStyle, TextInputProps } from 'react-native'
import { color, spacing, images, height, width } from '../../themes'

export const loginStyles = {
  container: {
    flex: 1,
  } as ViewStyle,
  bgImage: {
    width: width,
    height: height,
    alignItems: 'center',
    paddingTop: height * 0.4,
  } as ImageStyle,
  logo: {
    width: '80%',
    height: 60,
    marginBottom: 60,
  } as ImageStyle,
  screen: {
    backgroundColor: color.transparent,
  } as ViewStyle,
  input: {
    borderBottomColor: 'red',
    borderBottomWidth: 2,
    width: '80%',
    height: 40,
    paddingLeft: 20,
    marginBottom: 20,
    fontSize: 20,
    backgroundColor: color.transparent,
    color: color.while,
  } as TextInputProps,
  button: {
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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: color.while,
  } as TextStyle,
  link: {
    color: color.while,
    paddingBottom: 30,
  } as TextStyle,
  linkWrapper: {
    flex: 1,
    justifyContent: 'flex-end',
  } as ViewStyle,
}
