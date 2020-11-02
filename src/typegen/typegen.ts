import type { PrintedGenTypingImportConfig } from '@nexus/schema/dist/core'
import { write } from 'fs-jetpack'
import { lowerFirst } from 'lodash'

import { Config } from '../config'
import { Dmmf } from '../metadata/dmmf'
import { Metadata } from '../metadata/metadata'

import { printInterface, printImport, printGlobal } from './print'

export const writeTypegen = (config: Config, data: string[]) => {
  if (typeof config.output === 'object' && typeof config.output.typegen) {
    write(config.output.typegen, data.join('\n\n'))
  }
}

export const typegenPrismaModels = (dmmf: Dmmf) => {
  const inner = dmmf.datamodel.models.map(({ name }) => `${name}: Prisma.${name}`)

  return printInterface({ name: 'PrismaModels', fields: inner })
}

export const typegenPrismaOutputs = (dmmf: Dmmf) => {
  const inner = dmmf.datamodel.models.map<[string, string[]]>(model => [
    model.name,
    model.fields.map(field => `${field.name}: '${field.type}'`),
  ])

  return printInterface({ name: 'PrismaOutputs', fields: inner })
}

export const typegenPrismaMappings = (metadata: Metadata) => {
  const inner = metadata.types.map<[string, string[]]>(({ typeName, fields }) => [
    typeName,
    fields.map(({ fieldName, params }) => `${fieldName}: '${params.type}'`),
  ])

  return printInterface({ name: 'PrismaMappings', fields: inner })
}

export const typegenPrismaMethods = (metadata: Metadata) => {
  const custom = metadata.types.map(
    ({ typeName }) => `${lowerFirst(typeName)}: PrismaCrud<'${typeName}'>`,
  )

  const other = metadata.dmmf.datamodel.models
    .filter(model => !metadata.typeMapping[model.name])
    .map(model => `${lowerFirst(model.name)}: PrismaCrud<'${model.name}'>`)

  return printInterface({ name: 'PrismaMethods', fields: [...custom, ...other] })
}

export const typegenPrismaGlobals = () => {
  const prismaGen = printInterface({
    name: 'PrismaGen',
    fields: [
      'outputs: PrismaOutputs',
      'models: PrismaModels',
      'mappings: PrismaMappings',
      'methods: PrismaMethods',
    ],
  })

  return printGlobal(prismaGen)
}

export const typegenPrisma = (
  importDefTypes: PrintedGenTypingImportConfig[],
  metadata: Metadata,
) => {
  const imports = importDefTypes.map(cfg => printImport(cfg)).join('\n')

  const models = typegenPrismaModels(metadata.dmmf)

  const methods = typegenPrismaMethods(metadata)

  const mappings = typegenPrismaMappings(metadata)

  const outputs = typegenPrismaOutputs(metadata.dmmf)

  const globals = typegenPrismaGlobals()

  return [imports, models, methods, mappings, outputs, globals]
}
