import admin from 'firebase-admin'
import test from '../../test/firebase-functions'

let index, adminStub
describe('testing basic function', () => {
  beforeAll(() => {
    adminStub = jest.spyOn(admin, 'initializeApp')
    index = require('../index')
    return
  })

  afterAll(() => {
    adminStub.mockRestore()
    test.cleanup()
  })

  it('Test function return value', () => {
    expect(index.basicTest()).toEqual(6)
  })

  it('Test function trigger create message', async () => {
    const context = {
      params: {
        userId: 'test',
        pushId: '-push-id',
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

    const createdSnapshot = test.database.makeDataSnapshot(
      data,
      '/messages/-push-id'
    )

    const wrapperFunction = test.wrap(index.upperCaseText)

    await wrapperFunction(createdSnapshot, context)

    const snapshot = await admin
      .firestore()
      .collection('messages')
      .doc('-push-id')

    expect(snapshot.get()).toEqual(data.message.toUpperCase())
  })
})
