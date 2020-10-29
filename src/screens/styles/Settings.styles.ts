import { TextStyle, ViewStyle, StatusBar } from 'react-native'
import { color, height } from '../../themes'

export const settingsStyles = {
  scroll: {
    flex: 1,
    backgroundColor: color.while,
    marginTop: 30,
    height: height,
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
  listItemContainer: {
    height: 55,
    borderWidth: 0.5,
    borderColor: color.gallery,
  } as ViewStyle,
  logoutText: {
    color: color.azureRadiance,
    fontSize: 18,
    fontWeight: '400',
  } as TextStyle,
  text: {
    fontSize: 16,
    marginLeft: 20,
    color: 'gray',
    fontWeight: '500',
  } as TextStyle,
  textWrapper: {
    paddingTop: 20,
    paddingBottom: 12,
    backgroundColor: color.grayNurse,
  } as ViewStyle,
}
