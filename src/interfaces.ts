import type {
  CommonOutputFieldConfig,
  AllOutputTypes,
  GetGen,
  RootValue,
  ArgsValue,
  MaybePromise,
  ResultValue,
  MaybePromiseDeep,
} from '@nexus/schema/dist/core'
import { GraphQLResolveInfo } from 'graphql'

export type ID = string

export type IDInput = {
  id: ID
}

export type RootName = 'Query' | 'Mutation' | 'Subscription'

export type AllScalarTypes = GetGen<'scalarNames'>
export type AllEnumTypes = GetGen<'enumNames'>
export type AllObjectTypes = GetGen<'objectNames'>
export type AllInterfaceTypes = GetGen<'interfaceNames'>
export type AllUnionTypes = GetGen<'unionNames'>
export type AllObjectLikeTypes = GetGen<'objectNames'> | GetGen<'interfaceNames'>

export type AllPrismaOutputTypes = keyof PrismaGen['outputs'] | keyof PrismaGen['models']

export type PrismaMappings = PrismaGen['mappings']
export type PrismaMethods = PrismaGen['methods']

export type GetTargetMapping<
  TypeName extends string,
  FieldName extends string
> = TypeName extends keyof PrismaMappings
  ? FieldName extends keyof PrismaMappings[TypeName]
    ? PrismaMappings[TypeName][FieldName] extends infer T
      ? T extends keyof PrismaMappings
        ? PrismaMappings[T]
        : never
      : never
    : never
  : never

export type ModelResultValue<TypeName extends string, FieldName extends string> = Pick<
  ResultValue<TypeName, FieldName>,
  keyof GetTargetMapping<TypeName, FieldName>
>

export type PrismaPluginFieldConfig<
  TypeName extends string,
  FieldName extends string
> = CommonOutputFieldConfig<TypeName, FieldName> & {
  type?: AllOutputTypes
  alias?: FieldName

  resolve?: PrismaFieldResolver<TypeName, FieldName>
}

export type PrismaFieldResolver<TypeName extends string, FieldName extends string> = (
  root: RootValue<TypeName>,
  args: ArgsValue<TypeName, FieldName>,
  context: GetGen<'context'>,
  info: GraphQLResolveInfo,
  next: PrismaFieldNext<TypeName, FieldName>,
) =>
  | MaybePromise<ModelResultValue<TypeName, FieldName>>
  | MaybePromiseDeep<ModelResultValue<TypeName, FieldName>>

export type PrismaFieldNext<TypeName extends string, FieldName extends string> = (
  root: RootValue<TypeName>,
  args: ArgsValue<TypeName, FieldName>,
  context: GetGen<'context'>,
  info: GraphQLResolveInfo,
) => ModelResultValue<TypeName, FieldName>

export type PrismaFieldMethod<TypeName extends string> = <FieldName extends string>(
  config?: PrismaPluginFieldConfig<TypeName, FieldName>,
) => void

export type PrismaModelProperty<TypeName extends string> = TypeName extends RootName
  ? never
  : TypeName extends AllPrismaOutputTypes
  ? SimpleModelProperty<TypeName>
  : AliasedModelPluginProperty<TypeName>

export type SimpleModelProperty<TypeName extends keyof PrismaGen['outputs'] & string> = {
  [K in keyof PrismaGen['outputs'][TypeName]]: <FieldName extends string>(
    config?: PrismaPluginFieldConfig<TypeName, FieldName>,
  ) => void
}

export type AliasedModelPluginProperty<TypeName extends string> = <
  ModelName extends AllPrismaOutputTypes
>(
  model: ModelName,
) => {
  [K in keyof PrismaGen['outputs'][ModelName] & string]: PrismaFieldMethod<TypeName>
}

export type PrismaCrudProperty<TypeName extends string> = TypeName extends RootName
  ? PrismaMethods
  : never

export type PrismaCrud<TypeName extends string> = {
  findOne: PrismaFieldMethod<TypeName>
  findMany: PrismaFieldMethod<TypeName>
  create: PrismaFieldMethod<TypeName>
  update: PrismaFieldMethod<TypeName>
  upsert: PrismaFieldMethod<TypeName>
  delete: PrismaFieldMethod<TypeName>
}
