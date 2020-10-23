import { addMessage, lazyMessages, saveExpoPushToken } from '../index'
import {
  setupFirebaseUnitTest,
  teardown,
  clearFirestoreData,
} from '../../test/setupFirebaseTest'

describe('Testing services', () => {
  let db
  const mockData = {
    'messages/message-1': {
      state: 'online',
      email: 'user-1@test.com',
    },
  }
  beforeEach(async () => {
    await clearFirestoreData()
    db = await setupFirebaseUnitTest(mockData)
  })

  afterEach(async () => {
    await teardown()
  })

  test('Testing get messages function', async (done) => {
    const data = {
      created: '2020-10-12T09:22:36.555Z',
      message: 'Phuc',
      sendTo: 'abc1@test.com',
      time: '4:02',
    }
    await db.collection('messages').doc('message-1').set(data)
    lazyMessages('messages', 'abc').subscribe((it) => {
      expect(it).toEqual([
        {
          ...data,
          id: 'message-1',
        },
      ])
      done()
    })
  })
})
