import { useContext, createContext} from 'react'
import { types, Instance, onSnapshot } from 'mobx-state-tree'

import { Todos } from './Todos'
import User from './User'

const RootModule = types.model({
  todos: Todos,
  user: types.map(User),
})

export const rootStore = RootModule.create({
  todos: {}
})

onSnapshot(rootStore, snapshot => {
  console.log(snapshot)
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
