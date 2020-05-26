import { types, applySnapshot,  onSnapshot, Instance, addMiddleware } from 'mobx-state-tree'

// import Models
import User from './User'
import Todo from './Todo'
import { values, autorun } from 'mobx'

const states = <any>[]
let currentFrame = -1

export const Todos = types
  .model(
    // define model name
    'store',
    {
    // Props
    users: types.map(User),
    // todos: types.optional(types.map(Todo), {})
    todos: types.optional(types.array(Todo), [])
  })
  .views(self => ({
    // computed property
    get pendingCount() {
      return values(self.todos).filter(todo => !todo.done).length
    },
    get completedCount() {
      return values(self.todos).filter(todo => todo.done).length
    },
    getTodosWhereDoneIs(done: boolean) {
      return values(self.todos).filter(todo => todo.done === done)
    },

    // A view function
    findTodosByUser(user: string) {
      return values(self.todos).filter(todo => todo.user === user)
    }
  }))
  .actions(self => ({
    addToDo(name: string) {
      self.todos.push({ name })
      // self.todos.set(id, Todo.create({ name }))
    }
  }))

const store = Todos.create({
  users: {}
})

addMiddleware(store, (call, next, abort) => {
  console.log(`action ${call.name} was invoked`)
  // runs the next middleware
  // or the implementation of the targeted action
  // if there is no middleware left to run
  // the value returned from the next can be manipulated
  next(call, value => value + 1)
  // return abort("value")
})

autorun(() => {
  console.log('store', store.todos)
})

onSnapshot(store, snapshot => {
  console.log('abc:', store)
  if (currentFrame === states.length - 1) {
    currentFrame++
    states.push(snapshot)
  }
})

export function previousState() {
  if (currentFrame === 0) return
  currentFrame--
  applySnapshot(store, states[currentFrame])
}

export function nextState() {
  if (currentFrame === states.length - 1) return
  currentFrame++
  applySnapshot(store, states[currentFrame])
}

export type AppType = Instance<typeof Todos>
export interface TAppType extends Instance<typeof Todos> {}
// export Todos
export default store
