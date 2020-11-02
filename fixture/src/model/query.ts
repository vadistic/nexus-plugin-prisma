import { queryType, mutationType } from '@nexus/schema'

export const Query = queryType({
  definition(t) {
    t.boolean('ok', { resolve: () => true })
  },
})

export const Mutation = mutationType({
  definition(t) {
    t.boolean('ok', { resolve: () => true })
  },
})
