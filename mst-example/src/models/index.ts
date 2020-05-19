import { types, applySnapshot,  onSnapshot } from 'mobx-state-tree'

// import Models
import User from './User'
import Todo from './Todo'
import { values } from 'mobx';

const states = <any>[]
let currentFrame = -1

const RootStore = types
  .model({
    users: types.map(User),
    todos: types.optional(types.map(Todo), {})
  })
  .views(self => ({
    get pendingCount() {
      return values(self.todos).filter(todo => !todo.done).length
    },
    get completedCount() {
      return values(self.todos).filter(todo => todo.done).length
    },
    getTodosWhereDoneIs(done: boolean) {
      return values(self.todos).filter(todo => todo.done === done)
    }
  }))
  .actions(self => ({
    addToDo(id: any, name: string) {
      self.todos.set(id, Todo.create({ name }))
    }
  }))

const store = RootStore.create({
  users: {}
})

onSnapshot(store, snapshot => {
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

export default store
