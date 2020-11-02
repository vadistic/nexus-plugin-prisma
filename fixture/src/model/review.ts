import { objectType } from '@nexus/schema'

export const ReviewModel = objectType({
  name: 'Review',
  definition(t) {
    t.model.id()
    t.model.createdAt()
    t.model.updatedAt()

    t.model.score()
    t.model.message()
    t.model.stage()

    t.model.application()
    t.model.author()
  },
})
