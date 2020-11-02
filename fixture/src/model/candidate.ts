import { objectType } from '@nexus/schema'

export const CandidateModel = objectType({
  name: 'Candidate',
  definition(t) {
    t.model.id()
    t.model.createdAt()
    t.model.updatedAt()

    t.model.firstName()
    t.model.lastName()
    t.model.headline()
    t.model.phones()
    t.model.links()
    t.model.emails()
  },
})
