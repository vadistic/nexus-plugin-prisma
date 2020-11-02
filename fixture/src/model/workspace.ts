import { objectType } from '@nexus/schema'

export const WorkspaceModel = objectType({
  name: 'Workspace',
  definition(t) {
    t.model.id()
    t.model.createdAt()
    t.model.updatedAt()

    t.model.name()
    t.model.description()
    t.model.website()
    t.model.type()
  },
})
