import { inputObjectType, PluginBuilderLens } from '@nexus/schema'
import type { NexusInputFieldConfig, GetGen } from '@nexus/schema/dist/core'

import { Config } from '../config'
import type { Metadata, TypeMetadata, FieldMetadata } from '../metadata/metadata'

import { SortDirectionEnum } from './enum'

export const addModelInputs = (
  config: Config,
  metadata: Metadata,
  { addType, hasType }: PluginBuilderLens,
) => {
  // TODO: way simpler
  return metadata.types
    .filter(m => m.root === false)
    .flatMap(typeMeta => modelInputBuilder(config, typeMeta))
    .filter(input => {
      if (!hasType(input.name) && (config.force || metadata.refs.has(input.name))) {
        addType(input)
        return true
      }

      return false
    })
}

export const modelInputBuilder = (config: Config, typeMeta: TypeMetadata) => {
  const whereInput = modelWhereInputBuilder(config, typeMeta)
  const filterInput = modelFilterInputBuilder(config, typeMeta)
  const orderByInput = modelOrderByInput(config, typeMeta)

  return [whereInput, filterInput, orderByInput]
}

export const modelWhereInputBuilder = (config: Config, typeMeta: TypeMetadata) => {
  const whereInputName = config.naming.whereInput(typeMeta.typeName)

  const whereInput = inputObjectType({
    name: whereInputName,
    definition: t => {
      typeMeta.fields.forEach(fieldMeta => {
        const fieldConfig = whereFieldBuilder(config, fieldMeta)

        if (fieldConfig) {
          t.field(fieldMeta.fieldName, fieldConfig)
        }
      })

      t.field('AND', {
        type: whereInputName,
        nullable: true,
        list: true,
        description: ``,
      })

      t.field('OR', {
        type: whereInputName,
        nullable: true,
        list: true,
        description: ``,
      })

      t.field('NOT', {
        type: whereInputName,
        nullable: true,
        description: ``,
      })
    },
  })

  return whereInput
}

export const modelFilterInputBuilder = (config: Config, typeMeta: TypeMetadata) => {
  const filterInputName = config.naming.filterInput(typeMeta.typeName)
  const whereInputName = config.naming.whereInput(typeMeta.typeName)

  const filterInput = inputObjectType({
    name: filterInputName,
    definition: t => {
      t.field('every', { type: whereInputName, nullable: true, description: `` })
      t.field('none', { type: whereInputName, nullable: true, description: `` })
      t.field('some', { type: whereInputName, nullable: true, description: `` })
    },
  })

  return filterInput
}

export const modelOrderByInput = (config: Config, typeMeta: TypeMetadata) => {
  const orderByInputName = config.naming.orderByInput(typeMeta.typeName)

  const orderByInput = inputObjectType({
    name: orderByInputName,
    definition(t) {
      typeMeta.fields.forEach(({ fieldName, outputField }) => {
        const { kind } = outputField.outputType

        if (kind === 'scalar' || kind === 'enum') {
          t.field(fieldName, {
            nullable: true,
            type: SortDirectionEnum,
          })
        }
      })
    },
  })

  return orderByInput
}

export const whereFieldBuilder = (
  { naming }: Config,
  { fieldName, params, outputField, parent }: FieldMetadata,
): NexusInputFieldConfig<GetGen<'inputNames', string>, string> | undefined => {
  const description = params?.description ?? `Filter by ${parent.typeName}'s ${fieldName}`
  const { kind } = outputField.outputType

  if (kind === 'enum') {
    const enumFilterInputName = naming.enumFilterInput(params.type, !!params.nullable)

    return {
      type: enumFilterInputName,
      nullable: true,
      description,
    }
  }

  if (kind === 'scalar') {
    const scalarFilterInputName = naming.scalarFilterInput(params.type, !!params.nullable)

    return {
      type: scalarFilterInputName,
      nullable: true,
      description,
    }
  }

  if (kind === 'object') {
    const objectFilterInputName = params.list
      ? naming.filterInput(params.type)
      : naming.whereInput(params.type)

    return {
      type: objectFilterInputName,
      nullable: true,
      description,
    }
  }

  return undefined
}
