import { list } from 'rxfire/database'
import { map } from 'rxjs/operators'
import firebaseApp from '../services'

const todosRef = firebaseApp.database().ref('products/tables')

export const fetchOrders = list(todosRef).pipe(
  map((tables) =>
    tables.map((c) => {
      return { _key: c.snapshot.key, ...c.snapshot.val() }
    })
  )
)

export const updateOrder = (id: string, value: boolean) => {
  const ref = firebaseApp.database().ref(`products/tables/${id}/active`)
  ref.set(value)
}
