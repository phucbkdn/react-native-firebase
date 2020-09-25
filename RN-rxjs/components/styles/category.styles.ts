import { ImageStyle, TextStyle, ViewStyle } from 'react-native'
import { color, typography, width, height } from "../../themes"

export const categoryStyles = {
  wrapper: {
    flexDirection: 'row',
    justifyContent: "center",
    alignItems: "center",
    alignContent: 'center',
    paddingVertical: 15,
  } as ViewStyle,
  button: {
    backgroundColor: 'white',
    shadowColor: 'rgba(0,0,0,0.5)',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    alignContent: 'center',
    elevation: 1,
    width: 40,
    height: 40,
  } as ViewStyle,
  textStyle: {
    fontFamily: typography.primary,
    color: color.text,
    fontSize: 20,
    textTransform: "capitalize",
    paddingBottom: 15,
    width: width / 2,
  } as TextStyle,
  count: {
    fontFamily: typography.primary,
    color: color.text,
    fontSize: 20,
    textTransform: "capitalize",
    paddingHorizontal: 15
  } as TextStyle,
}