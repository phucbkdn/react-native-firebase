import { TextStyle, ViewStyle, StatusBar } from 'react-native'
import { color, height } from '../../themes'
import { useThemeColor } from '../../components/Themed'

export const settingsStyles = (mode) => ({
  scroll: {
    flex: 1,
    paddingTop: 30,
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
    backgroundColor: useThemeColor({}, 'background'),
  } as ViewStyle,
  logoutText: {
    color: color.azureRadiance,
    fontSize: 18,
    fontWeight: '400',
  } as TextStyle,
  text: {
    fontSize: 16,
    marginLeft: 20,
    fontWeight: '500',
  } as TextStyle,
  textWrapper: {
    paddingTop: 20,
    paddingBottom: 12,
  } as ViewStyle,
  title: {
    fontSize: 16,
  } as TextStyle,
})
