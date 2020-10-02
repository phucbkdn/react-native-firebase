import { TextStyle, ViewStyle } from 'react-native'
import { color, spacing } from '../../themes'

export const tableOrderStyles = {
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  } as ViewStyle,
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  } as TextStyle,
  link: {
    marginTop: 15,
    paddingVertical: 15,
  } as TextStyle,
  linkText: {
    fontSize: 14,
    color: '#2e78b7',
  } as TextStyle,
  wrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingTop: 20,
    paddingRight: 20,
    justifyContent: "space-between",
  } as ViewStyle,
  priceWrapper: {
    flexDirection: "row",
    paddingBottom: 20,
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
    width: 100,
    height: 40,
    marginHorizontal: 10
  } as ViewStyle,
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    width: '50%',
    height: 30,
  },
  discountWrapper: {
    flexDirection: "row",
    paddingBottom: 20,
    alignItems: 'center',
  } as ViewStyle,
  screen: {
    backgroundColor: color.transparent,
    paddingHorizontal: spacing[4],
  } as ViewStyle

}
