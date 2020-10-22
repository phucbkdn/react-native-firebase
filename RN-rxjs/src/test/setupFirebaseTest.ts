import * as mockFirebase from '@firebase/rules-unit-testing'
import { firebaseConfig } from '../services/firebaseAccess'
import fs from 'fs'
const PROJECT_ID = firebaseConfig.projectId

export const setupFirebaseUnitTest = async (data) => {
  const adminDB = mockFirebase.initializeTestApp({
    projectId: PROJECT_ID,
    auth: { uid: 'alice', email: 'abc@test.com' },
  })
  const db = adminDB.firestore()

  // Write mock documents before rules
  if (data) {
    for (const key in data) {
      const ref = db.doc(key)
      await ref.set(data[key])
    }
  }
  await mockFirebase.loadFirestoreRules({
    projectId: PROJECT_ID,
    rules: fs.readFileSync('firestore.rules', 'utf8'),
  })

  // eslint-disable-next-line no-undef
  // beforeEach(async () => {
  //   await mockFirebase.clearFirestoreData({ projectId: PROJECT_ID })
  // })

  afterAll(async () => {
    await mockFirebase.clearFirestoreData({ projectId: PROJECT_ID })
    await Promise.all(mockFirebase.apps().map((app) => app.delete()))
  })

  return db
}

export const teardown = async () => {
  Promise.all(mockFirebase.apps().map((app) => app.delete()))
}

export const clearFirestoreData = async () => {
  await mockFirebase.clearFirestoreData({ projectId: PROJECT_ID })
}
