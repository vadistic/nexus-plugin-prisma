import { objectType } from '@nexus/schema'

export const ApplicationModel = objectType({
  name: 'Application',
  definition(t) {
    t.model.id()
    t.model.createdAt()
    t.model.updatedAt()
  },
})
