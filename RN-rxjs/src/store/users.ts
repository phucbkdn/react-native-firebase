import { BehaviorSubject, combineLatest } from 'rxjs'
import { scan, map, filter } from 'rxjs/operators'
import { authState } from 'rxfire/auth'
import { list } from 'rxfire/database'
import firebase from '../services'
import { User } from '../models'

interface ActionType {
  type: string
  payload: any
}

interface StateType {
  users: Array<User>
  user: string
}
const usersStore = new (class UsersStore {
  store: any
  dispatcher: any
  static ACTIONS = {
    INIT: 'INIT',
    SELECT_USER: 'SELECT_USER',
  }

  constructor() {
    this.dispatcher = new BehaviorSubject<StateType>({
      users: [],
      user: '',
    })

    this.store = this.dispatcher.pipe(
      scan(
        (state: StateType, action: ActionType) => this.reducer(state, action),
        { users: [], user: '' }
      )
    )
  }

  reducer(state: StateType, action: ActionType) {
    switch (action.type) {
      case UsersStore.ACTIONS.INIT:
        return {
          ...state,
          users: action.payload,
        }

      case UsersStore.ACTIONS.SELECT_USER:
        return {
          ...state,
          user: action.payload,
        }

      default:
        return state
    }
  }

  init() {
    const ref = firebase.database().ref('users')
    const user$ = authState(firebase.auth()).pipe(filter((t) => !!t))

    const users$ = list(ref).pipe(
      map((changes) =>
        changes.map((c) => ({ id: c.snapshot.key, ...c.snapshot.val() }))
      )
    )

    combineLatest([users$, user$]).subscribe(([items, item]) => {
      const result = items.filter((t) => t.email !== item.email)
      this.dispatcher.next({
        type: UsersStore.ACTIONS.INIT,
        payload: result,
      })
    })
  }

  selectUser(email: string) {
    this.dispatcher.next({
      type: UsersStore.ACTIONS.SELECT_USER,
      payload: email,
    })
  }

  getStore() {
    return this.store
  }
})()

export default usersStore
