import "react-native"
import { configure } from "enzyme"
import Adapter from "enzyme-adapter-react-16"

configure({
  adapter: new Adapter(),
})

// Remove warning message
const originalConsoleError = console.error

console.warn = (message: any): void => {
  if (message.startsWith("Warning:")) {
    return
  }
}

console.error = (message: any): void => {
  if (message.startsWith("Warning:")) {
    return
  }
  originalConsoleError('message: ', message)
}
