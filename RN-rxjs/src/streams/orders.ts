import { list, stateChanges } from 'rxfire/database'
import { map, tap } from 'rxjs/operators'
import firebaseApp from '../services'

const ref = firebaseApp.database().ref('products/orders')
const fetchOrder$ = list(ref).pipe(
  map((changes) =>
    changes.map((c) => {
      return { _key: c.snapshot.key, ...c.snapshot.val() }
    })
  )
)

export const createOrder = (data: any) => {
  ref.push(data)
  stateChanges(ref).pipe(
    tap((x) => console.log(x)),
    map((change) => {
      return {
        _key: change.snapshot.key,
        event: change.event,
        ...change.snapshot.val(),
      }
    })
  )
}

export default fetchOrder$
