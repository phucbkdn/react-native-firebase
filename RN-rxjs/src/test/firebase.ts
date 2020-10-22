jest.mock('firebase', () => {
  const users = [
    {
      email: 'test-1@test.com',
      id: 'IEa751YkWhXT0dKrKlNbK3e1AnA2',
      last_changed: '2020-10-12T17:34:21+07:00',
      state: 'offline',
    },
    {
      email: 'test@test.com',
      id: 'Kunp8W8bF6QjGDsXQ873bFjnutC3',
      last_changed: '2020-10-07T17:36:43+07:00',
      state: 'offline',
    },
  ]
  const set = jest.fn(() => Promise.resolve(users))
  const get = jest.fn(() => Promise.resolve(users))
  const snapshot = { val: () => users }
  const onAuthStateChanged = jest.fn()
  const getRedirectResult = jest.fn(() => {
    return Promise.resolve({
      user: {
        displayName: 'redirectResultTestDisplayName',
        email: 'redirectTest@test.com',
        emailVerified: true,
      },
    })
  })

  const createUserWithEmailAndPassword = jest.fn(() => {
    return Promise.resolve('result of createUserWithEmailAndPassword')
  })

  const signInWithEmailAndPassword = jest.fn(() => {
    return Promise.resolve('result of signInWithEmailAndPassword')
  })

  return {
    database: jest.fn(() => ({
      ref: jest.fn(() => ({
        push: jest.fn(() => ({
          set,
          get,
          once: jest.fn(() => Promise.resolve(snapshot)),
        })),
      })),
    })),
    firestore: jest.fn(() => ({
      collection: jest.fn(),
      where: jest.fn(),
      orderBy: jest.fn(),
      add: jest.fn(),
      get: jest.fn(),
      onSnapshot: jest.fn(),
      reset: jest.fn(),
    })),
    auth: jest.fn().mockReturnValue({
      onAuthStateChanged: jest.fn().mockReturnValue({
        displayName: 'testDisplayName',
        email: 'test@test.com',
        emailVerified: true,
      }),
      onIdTokenChanged: jest.fn().mockReturnValue({
        displayName: 'testDisplayName',
        email: 'test@test.com',
        emailVerified: true,
      }),
      currentUser: {
        displayName: 'testDisplayName',
        email: 'test@test.com',
        emailVerified: true,
      },
      getRedirectResult,
    }),
    apps: [],
    initializeApp: jest.fn().mockReturnValue({
      auth: () => {
        return {
          createUserWithEmailAndPassword,
          signInWithEmailAndPassword,
          onAuthStateChanged: jest.fn().mockReturnValue({
            displayName: 'testDisplayName',
            email: 'test@test.com',
            emailVerified: true,
          }),
          onIdTokenChanged: jest.fn().mockReturnValue({
            displayName: 'testDisplayName',
            email: 'test@test.com',
            emailVerified: true,
          }),
        }
      },
      database: jest.fn(() => ({
        ref: jest.fn(() => ({
          push: jest.fn(() => ({
            set,
            get,
            once: jest.fn(() => Promise.resolve(snapshot)),
          })),
        })),
      })),
      firestore: jest.fn(() => ({
        collection: jest.fn(),
        where: jest.fn(),
        orderBy: jest.fn(),
        add: jest.fn(),
        get: jest.fn(),
        onSnapshot: jest.fn(),
        reset: jest.fn(),
      })),
    }),
  }
})
