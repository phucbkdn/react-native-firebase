import { TextStyle, ViewStyle, StatusBar } from 'react-native'

export const tabTwoScreenStyles = {
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  } as ViewStyle,
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  } as TextStyle,
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  } as ViewStyle,
  wrapper: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    paddingTop: 20,
    paddingRight: 20,
    justifyContent: "space-between",
  } as ViewStyle,
}
