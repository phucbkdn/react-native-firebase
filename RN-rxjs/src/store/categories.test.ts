import categoriesStore from './categories'

const mockEmail = 'mock-email@gmail.com'

describe('Testing users store', () => {
  const store = categoriesStore.getStore()

  test('Testing default value of store', (done) => {
    store.subscribe((it) => {
      expect(it.discount).toEqual(0)
      expect(it.categories).toEqual([])
    })
    done()
  })

  test('Handle action decr', (done) => {
    categoriesStore.decr(mockEmail)
    store.subscribe((it) => {
      expect(it.user).toEqual(mockEmail)
    })
    done()
  })

  test('Handle action discount', (done) => {
    categoriesStore.discount(10)
    store.subscribe((it) => {
      expect(it.discount).toEqual(10)
    })
    done()
  })
})
