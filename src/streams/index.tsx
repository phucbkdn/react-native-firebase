import React, { useEffect, useState, FC } from 'react'

export type StreamProps = {
  observable: Record<string, any>
  triggers: Record<string, any>
  initialState: Record<string, any>
}

const withObservableStream = (observable, triggers, initState) => (
  Component: FC | any
) => (props) => {
  const [state, setState] = useState(initState)
  useEffect(() => {
    const subscription = observable.subscribe((newState) => setState(newState))
    return () => subscription.unsubscribe()
  }, [])

  return <Component {...props} {...state} {...triggers} />
}

export default withObservableStream
