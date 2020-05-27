import { types } from 'mobx-state-tree'

const User = types
  .model(
    'User',
    {
    id: types.identifier,
    name: types.optional(types.string, ''),
  })
  .actions(self => (
    {
      setName(newName: string) {
        self.name = newName
      }
    }
  ))

export default User
