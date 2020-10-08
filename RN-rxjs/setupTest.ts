import React from 'react'
import "react-native"
import Adapter from "enzyme-adapter-react-16"
import { configure, shallow, mount, render } from 'enzyme'
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
global.React = React
global.shallow = shallow
global.render = render
global.mount = mount
