import { BehaviorSubject } from 'rxjs'
import { scan } from 'rxjs/operators'
import { collectionData } from 'rxfire/firestore'
import { db } from '../services/firebaseAccess'
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
    collectionData(db.collection('users'), 'id').subscribe((list) => {
      this.dispatcher.next({
        type: UsersStore.ACTIONS.INIT,
        payload: list,
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
