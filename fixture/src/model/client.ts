import { objectType } from '@nexus/schema'

export const ClientModel = objectType({
  name: 'Client',
  definition(t) {
    t.model.id()
    t.model.createdAt()
    t.model.updatedAt()
  },
})
