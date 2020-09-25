import { ImageStyle, TextStyle, ViewStyle } from 'react-native'
import { color, width, height } from "../../themes"

export const categoryStyles = {
  wrapper: {
    width: width / 3,
    height: height / 6,
    paddingBottom: 10,
  } as ViewStyle,
  buttonActive: {
    backgroundColor: 'red',
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
    elevation: 1,
    width: '100%',
    height: '100%',
  } as ViewStyle,
  textStyle: {
    color: color.text,
    fontSize: 11,
    lineHeight: 13,
    textTransform: "capitalize",
    paddingBottom: 15,
  } as TextStyle,
  image: {
    width: "40%",
    height: "60%",
    resizeMode: "contain",
    marginVertical: 10,
  } as ImageStyle
}
