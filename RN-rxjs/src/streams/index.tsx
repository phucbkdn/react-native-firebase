import React from 'react'

export type StreamProps = {
  observable: Record<string, any>
  triggers: Record<string, any>
  initialState: Record<string, any>
}

const withObservableStream = (observable, triggers, initState) => (
  Component
) => {
  return class extends React.Component {
    subscription: any
    constructor(props) {
      super(props)
      this.state = {
        ...initState,
      }
    }

    componentDidMount() {
      this.subscription = observable.subscribe((newState: any) =>
        this.setState({ ...newState })
      )
    }

    componentWillUnMount() {
      this.subscription.unsubscribe()
    }

    render() {
      return <Component {...this.props} {...this.state} {...triggers} />
    }
  }
}

export default withObservableStream
