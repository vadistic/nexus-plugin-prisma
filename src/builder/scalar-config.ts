import { scalarType } from '@nexus/schema'
import type { NexusScalarTypeDef } from '@nexus/schema/dist/core'
import { GraphQLScalarType } from 'graphql'
import { DateTimeResolver, JSONResolver } from 'graphql-scalars'
import { uniq } from 'lodash'

import { ArrayElement } from '../utils/types'

import {
  buildNumberLikeFilter,
  buildBooleanLikeFilter,
  buildStringLikeFilter,
} from './scalar-filter'

export type Scalars = Record<string, GraphQLScalarType>

export const DateTimeScalar = scalarType({
  ...DateTimeResolver,
  name: 'DateTime',
  asNexusMethod: 'dateTime',
  description: ``,
})

export const JsonScalar = scalarType({
  ...JSONResolver,
  name: 'Json',
  asNexusMethod: 'json',
  description: ``,
})

export const buildInScalarDefs = [JsonScalar, DateTimeScalar]

export const prismaScalarNames = ['Json', 'String', 'Int', 'Float', 'DateTime', 'Boolean'] as const
export const graphqlScalarNames = ['ID', 'String', 'Int', 'Float', 'Boolean'] as const

export const buildinScalarNames = uniq([...prismaScalarNames, ...graphqlScalarNames])
export type BuildInScalarNames = ArrayElement<typeof buildinScalarNames>

export type ScalarFilterKind = 'number' | 'string' | 'boolean'

export interface ScalarOptions {
  filterKind: ScalarFilterKind
  as?: string | NexusScalarTypeDef<any>
}

export const scalarOptions: Record<string, ScalarOptions> = {
  Boolean: {
    filterKind: 'boolean',
  },
  DateTime: {
    filterKind: 'number',
  },
  Float: {
    filterKind: 'number',
  },
  ID: {
    filterKind: 'boolean',
  },
  Int: {
    filterKind: 'number',
  },
  Json: {
    filterKind: 'boolean',
  },
  String: {
    filterKind: 'string',
  },
}

export const scalarFilterKindToBuilder = (filterKind: ScalarFilterKind) =>
  ({
    number: buildNumberLikeFilter,
    boolean: buildBooleanLikeFilter,
    string: buildStringLikeFilter,
  }[filterKind])
