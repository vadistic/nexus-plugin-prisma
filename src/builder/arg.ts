/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { arg } from '@nexus/schema'
import { NexusArgDef, intArg, idArg, AllInputTypes, GetGen } from '@nexus/schema/dist/core'
import { transform, isPlainObject } from 'lodash'

import { Config } from '../config'
import { IDInput } from '../interfaces'
import { TypeMetadata } from '../metadata/metadata'
import { cleanDeep } from '../utils/clean-deep'

export type AnyArgs = Record<string, unknown>
export type AnyArgDefs = Record<string, NexusArgDef<GetGen<'allInputTypes', string>>>

// FIXME: use this maybe?
export const buildUniqueArgs = (
  config: Config,
  { model, fields }: TypeMetadata,
): AnyArgDefs | undefined => {
  if (!model) return undefined

  const simple = fields.filter(({ field }) => field!.isId === true)
  const composite = model.idFields.map(
    modelField => fields.find(({ field }) => field!.name === modelField)!,
  )

  return [...simple, ...composite].reduce((acc, { fieldName, params }) => {
    acc[fieldName] = arg({
      type: params.type as AllInputTypes,
      nullable: false,
      description: ``,
    })

    return acc
  }, {} as AnyArgDefs)
}

export const idArgs = {
  id: arg({
    type: 'ID',
    nullable: false,
    description: ``,
  }),
}

export const transformWhereUniqueArgs = <Args extends AnyArgs>(
  args: Args,
): Omit<Args, 'id'> & { where: IDInput } => {
  const res: any = { ...args }

  if ('id' in res) {
    res.where.id = res.id
    delete res.id
  }

  return res
}

// TODO: configurable filterning, pagination, ordering
export const buildWhereArgs = (config: Config, { typeName }: TypeMetadata): AnyArgDefs => {
  const args: AnyArgDefs = {}

  args.where = arg({
    type: config.naming.whereInput(typeName),
    nullable: true,
    description: ``,
  })

  args.skip = intArg({
    nullable: true,
    description: ``,
  })

  args.take = intArg({
    nullable: true,
    description: ``,
    default: config.pagination.takeDefault,
  })

  args.cursor = idArg({
    nullable: true,
    description: ``,
  })

  return args
}

export const transformWhereArgs = (args: any) => {
  const res: any = { ...args }

  if ('where' in res) {
    const clean: any = cleanDeep(res.where)

    const withExists = transform(clean, (acc, value: any) => {
      if (isPlainObject(value) && 'exists' in value) {
        if (value.exists === true) {
          value.not = null
        }

        if (value.exists === false) {
          value = { eq: null }
        }
      }
    })

    res.where = withExists
  }

  if ('cursor' in res) {
    res.cursor = res.cursor ? { id: res.cursor } : undefined
  }

  if ('take' in res) {
    res.take = res.take ?? undefined
  }

  if ('skip' in res) {
    res.skip = res.skip ?? undefined
  }

  return res
}
