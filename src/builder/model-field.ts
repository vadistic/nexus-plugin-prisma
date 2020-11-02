import { OutputDefinitionBlock, FieldResolver } from '@nexus/schema/dist/core'
import { DMMF } from '@prisma/client/runtime'
import { lowerFirst } from 'lodash'

import { Config } from '../config'
import { PrismaFieldResolver } from '../interfaces'
import { FieldMetadata, stringifyFieldType } from '../metadata/metadata'
import { logError } from '../utils/log-error'

import { transformWhereUniqueArgs, transformWhereArgs } from './arg'

export const addOutputField = (
  config: Config,
  fieldMeta: FieldMetadata,
  typeDef: OutputDefinitionBlock<string>,
  resolve?: boolean,
) => {
  const { params, fieldName } = fieldMeta

  const resolverBuilder =
    resolve &&
    fieldMeta.outputField.outputType.kind === 'object' &&
    actionToResolver[fieldMeta.action]

  const resolver = resolverBuilder
    ? composeResolvers(resolverBuilder(config, fieldMeta), params.resolve)
    : undefined

  const fieldConfig = {
    ...params,
    resolve: resolver,
  }

  typeDef.field(fieldName, fieldConfig as any)
}

export const composeResolvers = (
  resolver: FieldResolver<string, string>,
  provided?: PrismaFieldResolver<string, string>,
): FieldResolver<string, string> | undefined => {
  if (!provided) return resolver

  return (root, args, ctx, info) => provided(root, args, ctx, info as any, resolver as any) // clashing graphql versions?
}

// TODO: add smart stuff like rename of keys
export type FindOneDelegate = (args?: any) => any

export const findOneResolver = <
  TypeName extends string = string,
  FieldName extends string = string
>(
  config: Config,
  { fieldName, parent }: FieldMetadata,
): FieldResolver<TypeName, FieldName> => {
  const delegate = (config.prisma as any)[lowerFirst(parent.outputType.name)]

  if (!delegate) {
    logError(
      `Cannot  build resolver method for ${fieldName} of ${fieldName}/${parent.outputType.name}`,
    )
  }

  return (root, args, ctx, info) => {
    return delegate?.findOne(transformWhereUniqueArgs(args))
  }
}

export type FindManyDelegate = (args?: any) => any[]

export const findManyResolver = <
  TypeName extends string = string,
  FieldName extends string = string
>(
  config: Config,
  { fieldName, parent, outputField }: FieldMetadata,
): FieldResolver<TypeName, FieldName> => {
  const prismaMethod = lowerFirst(stringifyFieldType(outputField))
  const delegate = (config.prisma as any)[prismaMethod]

  if (!delegate) {
    logError(
      `Cannot build resolver method for ${fieldName} of ${parent.typeName}/${parent.outputType.name}`,
    )
  }

  return (root, args, ctx, info) => {
    return delegate.findMany(transformWhereArgs(args))
  }
}

export type ResolverBuilder<TypeName extends string = string, FieldName extends string = string> = (
  config: Config,
  { field, fieldName, parent }: FieldMetadata,
) => FieldResolver<TypeName, FieldName>

export const actionToResolver: Partial<Record<DMMF.ModelAction, ResolverBuilder>> = {
  [DMMF.ModelAction.findOne]: findOneResolver,
  [DMMF.ModelAction.findMany]: findManyResolver,
}
