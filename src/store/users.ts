import { BehaviorSubject, combineLatest } from 'rxjs'
import { scan, filter } from 'rxjs/operators'
import { authState } from 'rxfire/auth'
import { collectionData } from 'rxfire/firestore'
import firebase, { db } from '../services/firebaseAccess'
import { User } from '../models'
jest.mock('../services/firebaseAccess')
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
    const ref = db.collection('users')
    const user$ = authState(firebase.auth()).pipe(filter((t) => !!t))

    const users$ = collectionData(ref, 'id')

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
