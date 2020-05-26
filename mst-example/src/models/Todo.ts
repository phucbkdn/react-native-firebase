import { autorun } from 'mobx'
import { types, Instance, getEnv } from 'mobx-state-tree'
import User from './User'

// declaring the shape of a node with the type `Todo`
const Todo = types
  // define model name
  .model(
    'Todo',
    {
    name: types.optional(types.string, ''),
    done: types.optional(types.boolean, false),
    user: types.maybe(types.reference(types.late(() => User)))
  })
  .views(self => ({
    get taskName() {
      return self.name
    }
  }))
  .actions(self => ({
    setName(newName: string) {
      getEnv(self).logger.log("Changed title to: " + newName)
      self.name = newName
    },

    toggle() {
      self.done = !self.done
    },
    afterCreate() {
      console.log("Created a new todo!", self.name)
    }
  }))

const todoStore = Todo.create()

// Every time the todoStore is updated in a relevant way, log messages will be printed
autorun(() => {
  console.log("There are now ", todoStore.taskName, " task name")
})

export type TodoType = Instance<typeof Todo>
export interface TTodoType extends Instance<typeof Todo>{}
export default Todo
