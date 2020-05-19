import { types } from 'mobx-state-tree'
import User from './User'

const Todo = types
  .model({
    name: types.optional(types.string, ''),
    done: types.optional(types.boolean, false),
    user: types.maybe(types.reference(types.late(() => User)))
  })
  .actions(self => ({
    setName(newName: string) {
      self.name = newName
    },

    toggle() {
      self.done = !self.done
    },

    setUser(user: User) {
      if (!user) {
        self.user = undefined
      } else {
        self.user = user
      }
    }
  }))

export default Todo
