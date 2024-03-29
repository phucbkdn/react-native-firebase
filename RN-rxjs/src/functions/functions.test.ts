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

  it('Test function trigger update message', async () => {
    // Mock testing data
    const MESSAGE_ID = 'message-id'
    const context = {
      params: {
        userId: 'test',
        pushId: MESSAGE_ID,
      },
    }
    const afterValue = {
      message: 'bar',
    }
    const beforeValue = {
      message: 'faz',
    }

    // Make snapshot for state of database beforehand
    const beforeSnap = test.firestore.makeDocumentSnapshot(
      beforeValue,
      `/messages/${MESSAGE_ID}`
    )

    // Make snapshot for state of database after the change
    const afterSnap = test.firestore.makeDocumentSnapshot(
      afterValue,
      `/messages/${MESSAGE_ID}`
    )
    const change = test.makeChange(beforeSnap, afterSnap)

    // Call wrapped function with the Change object
    const wrapped = test.wrap(functions.updateMessage)
    wrapped(change, context)

    // Get snapshot
    const snapshot = await admin
      .firestore()
      .collection('messages')
      .doc(MESSAGE_ID)
      .get()

    const responseData = snapshot.data() || {}
    expect(responseData.newValue).toEqual(afterValue.message)
    expect(responseData.previousValue).toEqual(beforeValue.message)
  })

  it('Test function trigger delete message', async () => {
    // Mock testing data
    const MESSAGE_ID = 'delete-message-id'
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
    const wrapperFunction = test.wrap(functions.deleteMessage)

    await wrapperFunction(createdSnapshot, context)

    const snapshot = await admin
      .firestore()
      .collection('logs')
      .doc(MESSAGE_ID)
      .get()

    const responseData = snapshot.data() || {}
    expect(responseData['message-id']).toEqual(MESSAGE_ID)
  })

  it('Test addMessage function', () => {
    const req = { query: { text: 'input' } }
    const res = {
      redirect: (code, url) => {
        expect(code).toEqual(303)

        const expectedRef = new RegExp(
          'https://products-management-db74a.firebaseio.com/news/'
        )
        expect(expectedRef.test(url)).toBeTruthy()
      },
    }
    functions.addMessage(req, res)
  })
})
