import { objectType } from '@nexus/schema'

export const StageModel = objectType({
  name: 'Stage',
  definition(t) {
    t.model.id()
    t.model.createdAt()
    t.model.updatedAt()
  },
})
