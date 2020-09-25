import { TextStyle, ViewStyle } from 'react-native'
import { color, typography } from "../../themes"

export const orderStyles = {
  wrapper: {
    width: '90%',
    backgroundColor: 'white',
    shadowColor: 'rgba(0,0,0,0.5)',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    borderRadius: 10,
    margin: 20,
    paddingVertical: 10,
  } as ViewStyle,
  textWrapper: {
    flexDirection: 'row',
    justifyContent: "center",
    alignItems: "center",
    alignContent: 'center',
  } as ViewStyle,
  textStyle: {
    fontFamily: typography.primary,
    color: color.text,
    fontSize: 20,
    textTransform: "capitalize",
    paddingBottom: 15,
    fontWeight: 'bold'
  } as TextStyle,
  textValue: {
    fontFamily: typography.primary,
    color: color.text,
    fontSize: 20,
    textTransform: "capitalize",
    paddingBottom: 15,
    paddingLeft: 5,
  } as TextStyle,
}
