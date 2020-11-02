import { objectType } from '@nexus/schema'

export const PipelineModel = objectType({
  name: 'Pipeline',
  definition(t) {
    t.model.id()
    t.model.createdAt()
    t.model.updatedAt()
  },
})
