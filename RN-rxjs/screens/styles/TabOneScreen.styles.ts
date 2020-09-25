import { TextStyle, ViewStyle } from 'react-native'

export const tabOneScreenStyles = {
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10
  } as ViewStyle,
  title: {
    fontSize: 20,
    fontWeight: 'bold',
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
