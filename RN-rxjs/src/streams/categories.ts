import { db } from '../services/firebaseAccess'
import { collectionData } from 'rxfire/firestore'

const ref = db.collection('categories')

export default collectionData(ref)
