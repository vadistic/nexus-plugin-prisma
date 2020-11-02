import { inputObjectType, AllInputTypes } from '@nexus/schema'

import { Config } from '../config'
import { AllScalarTypes, AllEnumTypes } from '../interfaces'

export interface ScalarFilterBuilderOptions {
  type: AllScalarTypes
  nullable: boolean
}

export const buildNumberLikeFilter = (
  { naming }: Config,
  { type, nullable }: ScalarFilterBuilderOptions,
) => {
  return inputObjectType({
    name: naming.scalarFilterInput(type, nullable),

    definition(t) {
      t.field('equals', { type, nullable: true, description: `` })
      t.field('not', { type, nullable: true, description: `` })

      t.field('lt', { type, nullable: true, description: `` })
      t.field('lte', { type, nullable: true, description: `` })
      t.field('gt', { type, nullable: true, description: `` })
      t.field('gte', { type, nullable: true, description: `` })

      t.list.field('in', { type, nullable: true, description: `` })
      t.list.field('notInt', { type, nullable: true, description: `` })

      if (nullable) {
        t.boolean('exists', { nullable: true, description: `` })
      }
    },
  })
}

export const buildBooleanLikeFilter = (
  { naming }: Config,
  { type, nullable }: ScalarFilterBuilderOptions,
) => {
  return inputObjectType({
    name: naming.scalarFilterInput(type, nullable),

    definition(t) {
      t.field('equals', { type, nullable: true, description: `` })
      t.field('not', { type, nullable: true, description: `` })

      t.list.field('in', { type, nullable: true, description: `` })
      t.list.field('notInt', { type, nullable: true, description: `` })

      if (nullable) {
        t.boolean('exists', { nullable: true, description: `` })
      }
    },
  })
}

export const buildStringLikeFilter = (
  { naming }: Config,
  { type, nullable }: ScalarFilterBuilderOptions,
) => {
  return inputObjectType<AllInputTypes>({
    name: naming.scalarFilterInput(type, nullable),

    definition(t) {
      t.field('equals', { type, nullable: true, description: `` })
      t.field('not', { type, nullable: true, description: `` })
      t.field('startsWith', { type, nullable: true, description: `` })
      t.field('endsWith', { type, nullable: true, description: `` })
      t.field('contains', { type, nullable: true, description: `` })

      t.list.field('in', { type, nullable: true, description: `` })
      t.list.field('notInt', { type, nullable: true, description: `` })

      if (nullable) {
        t.boolean('exists', { nullable: true, description: `` })
      }
    },
  })
}

export interface EnumFilterBuilderOptions {
  type: AllEnumTypes
  nullable: boolean
}

export const buildEnumFilter = (
  { naming }: Config,
  { type, nullable }: EnumFilterBuilderOptions,
) => {
  return inputObjectType({
    name: naming.enumFilterInput(type, nullable),

    definition(t) {
      t.field('equals', { type, nullable: true, description: `` })
      t.field('not', { type, nullable: true, description: `` })

      t.list.field('in', { type, nullable: true, description: `` })
      t.list.field('notInt', { type, nullable: true, description: `` })

      if (nullable) {
        t.boolean('exists', { nullable: true, description: `` })
      }
    },
  })
}
