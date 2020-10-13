import usersStore from './users'

const mockEmail = 'mock-email@gmail.com'

describe('Testing users store', () => {
  const store = usersStore.getStore()

  test('Testing default value of store', (done) => {
    store.subscribe((it) => {
      expect(it.user).toEqual('')
      expect(it.users).toEqual([])
    })
    done()
  })

  test('Testing init value of store', (done) => {
    usersStore.init()
    store.subscribe((it) => {
      // TODO: mock firebase database
    })
    done()
  })

  test('Handle action select user', (done) => {
    usersStore.selectUser(mockEmail)
    store.subscribe((it) => {
      expect(it.user).toEqual(mockEmail)
    })
    done()
  })
})
