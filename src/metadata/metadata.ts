import { DMMF } from '@prisma/client/runtime'

import { PrismaFieldResolver } from '../interfaces'
import { logError } from '../utils/log-error'

import { Dmmf } from './dmmf'

export type AnyFieldConfig = {
  type: string
  description?: string | null
  nullable: boolean
  list?: true | boolean[]
  alias?: string
  resolve?: PrismaFieldResolver<string, string>
}

export type TypeMetadata = {
  root: boolean
  outputType: DMMF.OutputType
  model?: DMMF.Model

  typeName: string
  fields: FieldMetadata[]
  fieldMapping: Record<string, FieldMetadata>
}

export type FieldMetadata = {
  root: boolean
  parent: TypeMetadata
  fieldName: string
  action: DMMF.ModelAction
  outputField: DMMF.SchemaField
  field?: DMMF.Field
  params: AnyFieldConfig
}

export type AddMetadataFieldProps = {
  typeName: string
  modelField: string
  modelName?: string
  params?: Partial<AnyFieldConfig>
  action?: DMMF.ModelAction
}

export class Metadata {
  typeMapping: Record<string, TypeMetadata> = {}

  types: TypeMetadata[] = []

  refs: Set<string> = new Set()

  constructor(public dmmf: Dmmf) {}

  getType({
    typeName,
    modelName = typeName,
  }: {
    typeName: string
    modelName?: string
  }): TypeMetadata | undefined {
    if (this.typeMapping[typeName]) {
      return this.typeMapping[typeName]
    }

    if (typeof modelName !== 'string') {
      logError(`Expected string for custom model name, but got ${modelName}`)
      return undefined
    }

    // const root = this.dmmf.queryType.

    const outputType: DMMF.OutputType | undefined =
      this.dmmf.outputTypeMap[modelName] || this.dmmf.rootFieldMap[modelName]

    const model: DMMF.Model | undefined = this.dmmf.modelMap[modelName]

    if (!outputType) {
      logError(`Model ${modelName} not found in prisma dmmf`)
      return undefined
    }

    const meta: TypeMetadata = {
      root: !model, // FIXME: maybe compare with Query etc...
      model,
      outputType,
      fields: [],
      fieldMapping: {},
      typeName,
    }

    this.typeMapping[typeName] = meta
    this.types.push(meta)
    this.refs.add(typeName)

    return meta
  }

  addType(typeMeta: TypeMetadata): TypeMetadata | undefined {
    const prev = this.getType({
      typeName: typeMeta.typeName,
      modelName: typeMeta.outputType.name,
    })

    if (!prev) return undefined

    Object.assign(prev, typeMeta)

    return prev
  }

  getField({
    typeName,
    fieldName,
  }: {
    typeName: string
    fieldName: string
  }): FieldMetadata | undefined {
    return this.getType({ typeName })?.fieldMapping[fieldName]
  }

  addField({
    typeName,
    modelField,
    modelName = typeName,
    action: providedAction,
    params = {},
  }: AddMetadataFieldProps): FieldMetadata | undefined {
    const meta = this.getType({ typeName, modelName })

    if (!meta) return undefined

    const outputField = meta.outputType.fieldMap?.[modelField]
    const field = meta.model?.fields.find(f => f.name === modelField)

    if (!outputField) {
      logError(`Field ${modelField} not found in prisma model ${meta.outputType.name}`)
      return undefined
    }

    const FieldMeta: FieldMetadata = {
      root: !field,
      parent: meta,
      outputField,
      field,
      fieldName: params.alias || outputField.name,
      action:
        providedAction || (params.list ?? outputField.outputType.isList) === true
          ? DMMF.ModelAction.findMany
          : DMMF.ModelAction.findOne,
      params: {
        alias: params.alias && params.alias !== outputField.name ? params.alias : undefined,
        list: outputField.outputType.isList ? true : undefined,
        nullable: !outputField.isRequired,
        type: stringifyFieldType(outputField),
        ...params,
      },
    }

    meta.fields.push(FieldMeta)
    meta.fieldMapping[FieldMeta.fieldName] = FieldMeta

    this.refs.add(FieldMeta.params.type)

    return FieldMeta
  }
}

export const stringifyFieldType = (field: DMMF.SchemaField) => {
  const { type } = field.outputType

  if (typeof type === 'string') return type
  if (type.name) return type.name

  throw Error(`Cannot resolve type of ${type}`)
}
