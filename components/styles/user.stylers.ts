import { TextStyle, ViewStyle } from 'react-native'
import { color } from "../../themes"

export const userStyles = {
  wrapper: {
    flexDirection: "row",
    paddingBottom: 20,
    alignItems: "flex-end",
    margin: 10,
  } as ViewStyle,
  textStyle: {
    color: color.text,
    fontSize: 11,
    lineHeight: 13,
    textTransform: "capitalize",
    paddingBottom: 15,
  } as TextStyle,
}
