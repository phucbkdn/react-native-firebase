jest.mock('firebase', () => {
  const set = jest.fn()
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
        })),
      })),
    })),
    auth: jest.fn().mockReturnValue({
      onAuthStateChanged,
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
        }
      },
      database: jest.fn(() => ({
        ref: jest.fn(() => ({
          push: jest.fn(() => ({
            set,
          })),
        })),
      })),
    }),
  }
})
