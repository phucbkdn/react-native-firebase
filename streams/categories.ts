import { list } from 'rxfire/database';
import { BehaviorSubject, Subject} from 'rxjs'
import { map } from 'rxjs/operators';
import firebaseApp from '../services'
import { incr, decr } from '../helpers'

const todosRef = firebaseApp.database().ref('products/category');

const fetchCategory$ = list(todosRef)
.pipe(
  map(changes => changes.map(c => {
    return { _key: c.snapshot.key, ...c.snapshot.val(), count: 0 }
  }))
)

export default fetchCategory$
