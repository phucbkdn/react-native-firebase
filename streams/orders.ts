import { list } from 'rxfire/database'
import { map } from 'rxjs/operators';
import firebaseApp from '../services'

const ref = firebaseApp.database().ref('products/orders');
const fetchOrder$ = list(ref)
.pipe(
  map(changes => changes.map(c => {
    return { _key: c.snapshot.key, ...c.snapshot.val() }
  }))
)

export default fetchOrder$
