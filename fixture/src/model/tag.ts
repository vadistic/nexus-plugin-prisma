import { objectType, extendType } from '@nexus/schema'

export const TagModel = objectType({
  name: 'Tag',
  definition(t) {
    t.model.id()
    t.model.createdAt({})
    t.model.updatedAt({})
    t.model.name()
    t.model.description()

    t.model.candidates()
  },
})

export const TagQuery = extendType({
  type: 'Query',
  definition(t) {
    t.crud.tag.findOne({ alias: 'tag' })
    t.crud.tag.findMany({ alias: 'tags' })
  },
})
