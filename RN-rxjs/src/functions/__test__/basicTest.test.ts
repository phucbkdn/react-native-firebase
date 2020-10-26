import admin from 'firebase-admin'
import test from '../../test/firebase-functions'

let functions, adminStub
describe('testing basic function', () => {
  beforeAll(() => {
    adminStub = jest.spyOn(admin, 'initializeApp')
    functions = require('../index')
    return
  })

  afterAll(() => {
    adminStub.mockRestore()
    test.cleanup()
  })

  it('Test function return value', () => {
    expect(functions.basicTest()).toEqual(6)
  })

  it('Test function trigger create message', async () => {
    // Mock testing data
    const MESSAGE_ID = 'mock-message-id'
    const context = {
      params: {
        userId: 'test',
        pushId: MESSAGE_ID,
      },
    }
    const data = {
      created: '2020-10-12T09:22:36.555Z',
      message: 'function',
      sendTo: 'abc1@test.com',
      thread: 'abc@test.com-abc1@test.com',
      time: '4:02',
      user: 'abc@test.com',
    }

    const createdSnapshot = test.firestore.makeDocumentSnapshot(
      data,
      `/messages/${MESSAGE_ID}`
    )
    const wrapperFunction = test.wrap(functions.upperCaseText)

    await wrapperFunction(createdSnapshot, context)

    const snapshot = await admin
      .firestore()
      .collection('messages')
      .doc(MESSAGE_ID)
      .get()

    const responseData = snapshot.data() || {}
    expect(responseData.message).toEqual(data.message.toUpperCase())
  })
})
