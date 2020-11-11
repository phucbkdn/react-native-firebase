// we always make sure 'react-native' gets included first
import 'react-native'

// libraries to mock
import './firebase'

declare global {
  let __TEST__
}
