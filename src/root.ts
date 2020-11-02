export type RootName = 'Query' | 'Mutation' | 'Subscription'

export const rootNames = {
  Query: 'Query',
  Mutation: 'Mutation',
  Subscription: 'Subscription',
} as const

export const rootNameValues: RootName[] = Object.values(rootNames)

export const isRootName = (x: any): x is RootName => rootNameValues.includes(x)
