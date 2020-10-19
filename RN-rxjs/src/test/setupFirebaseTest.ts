import * as mockFirebase from '@firebase/rules-unit-testing'
export const setupFirebaseUnitTest = () => {
  const adminDB = mockFirebase
    .initializeTestApp({
      projectId: 'unit-test',
      auth: { uid: 'alice', email: 'alice@example.com' },
    })
    .firestore()
  // eslint-disable-next-line no-undef
  beforeEach(async () => {
    await mockFirebase.clearFirestoreData({ projectId: 'unit-test' })
  })
  // eslint-disable-next-line no-undef
  afterAll(async () => {
    await Promise.all(mockFirebase.apps().map((app) => app.delete()))
  })
  return {
    adminDB,
  }
}
