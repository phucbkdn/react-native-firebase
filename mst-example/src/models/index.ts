import { useContext, createContext} from 'react'
import { types, Instance, onSnapshot, addMiddleware } from 'mobx-state-tree'

import { Todos } from './Todos'
import User from './User'

const RootModule = types.model({
  todos: Todos,
  user: types.map(User),
})

// setup logger and inject it when the store is created
const logger = {
  log(msg: string) {
    console.log(msg)
  }
}

// Create root  store
export const rootStore = RootModule.create(
  {
    todos: {}
  },
  {
    logger: logger
  }
)

// log snapshot
onSnapshot(rootStore, snapshot => {
  console.log(snapshot)
})

// Add middleware
addMiddleware(rootStore, (call, next, abort) => {
  console.log(`action ${call.name} was invoked`)
  // runs the next middleware
  // or the implementation of the targeted action
  // if there is no middleware left to run
  // the value returned from the next can be manipulated
  next(call, value => value + 1)
  // return abort("value")
})

export type RootInstance = Instance<typeof RootModule>
const RootModuleContext = createContext<null | RootInstance>(null)

export const Provider = RootModuleContext.Provider

export const useMst = () => {
  const store  = useContext(RootModuleContext)
  if (store === null) {
    throw new Error("Store cannot be null, please add a context provider");
  }
  return store;
}
