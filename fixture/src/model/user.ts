import { objectType } from '@nexus/schema'

export const UserModel = objectType({
  name: 'User',
  definition(t) {
    t.model.id()
    t.model.createdAt()
    t.model.updatedAt()
  },
})

export const AccountModel = objectType({
  name: 'Account',
  definition(t) {
    t.model('User').id()
    t.model('User').createdAt()
    t.model('User').updatedAt()
    t.model('User').workspaces({
      list: true,
      resolve: (root, args, ctx, info, next) => {
        const workspaces = next(root, args, ctx, info)
        return workspaces
      },
    })
  },
})
