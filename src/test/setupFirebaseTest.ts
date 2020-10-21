import * as mockFirebase from '@firebase/rules-unit-testing'
import { firebaseConfig } from '../services/firebaseAccess'

const PROJECT_ID = firebaseConfig.projectId

export const setupFirebaseUnitTest = () => {
  const adminDB = mockFirebase
    .initializeTestApp({
      projectId: PROJECT_ID,
      auth: { uid: 'alice', email: 'abc@test.com' },
    })
    .firestore()
  // eslint-disable-next-line no-undef
  beforeEach(async () => {
    await mockFirebase.clearFirestoreData({ projectId: PROJECT_ID })
  })

  return {
    adminDB,
  }
}

export const teardown = async () => {
  Promise.all(mockFirebase.apps().map((app) => app.delete()))
}
