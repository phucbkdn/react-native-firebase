import { TextStyle, ViewStyle } from 'react-native'
import { spacing, color } from '../../themes'

export const homeStyles = {
  wrapper: {
    backgroundColor: color.background,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 20
  } as ViewStyle,
  header: {
    paddingTop: spacing[3],
    paddingBottom: spacing[5] - 1,
    paddingHorizontal: 0,
  } as TextStyle,
  headerTitle: {
    fontWeight: "bold",
    fontSize: 12,
    lineHeight: 15,
    textAlign: "center",
    letterSpacing: 1.5,
  } as TextStyle,
  title: {
    color: color.black,
    fontSize: 14,
    fontWeight: "600",
    lineHeight: 19,
    paddingBottom: 10,
    letterSpacing: 0.43,
  } as TextStyle,
}
