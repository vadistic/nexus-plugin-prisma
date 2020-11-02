/* eslint-disable no-underscore-dangle */
import { PluginBuilderLens, plugin, inputObjectType, makeSchema, objectType } from '@nexus/schema'
import { PrismaClient } from '@prisma/client'
import { DMMFClass } from '@prisma/client/runtime'
import { printSchema, print, buildSchema, GraphQLSchema } from 'graphql'

import { Config, pluginPrismaDefaultConfig } from '../src/config'
import { getDmmf } from '../src/metadata/dmmf'
import { Metadata } from '../src/metadata/metadata'

import { metadataFromDmmf } from './metadata-from-dmmf'

const _client = new PrismaClient()
const _dmmf = getDmmf(_client)

export const testBuilderLens = (): PluginBuilderLens => ({
  addType: jest.fn(),
  hasType: jest.fn(() => false),
  hasConfigOption: jest.fn(() => false),
  getConfigOption: jest.fn(() => undefined),
  setConfigOption: jest.fn(() => {
    /*  */
  }),
})

export const testClient = (): PrismaClient => _client

export const testDmmf = (): DMMFClass => _dmmf

export const testConfig = (): Config => ({
  ...pluginPrismaDefaultConfig,
  output: { typegen: './test/tmp/prisma.ts' },
  force: true,
})

export const testMetadata = (modelNames: string[] = ['Tag']): Metadata => {
  const metadata = new Metadata(_dmmf)

  modelNames.forEach(modelName => {
    metadataFromDmmf(metadata, modelName)
  })

  return metadata
}

export const testNexus = (types: any) => {
  const schema = (makeSchema({
    types,
    outputs: false,
    plugins: [pluginNoopOnMissing],
  }) as unknown) as GraphQLSchema

  let astSchema: GraphQLSchema

  // parse + print to make schema with ast nodes so they can be printed
  const getSchema = () => {
    if (!astSchema) {
      astSchema = buildSchema(printSchema(schema))
    }

    return astSchema
  }

  return {
    getSchema,
    getType: (typeName: string) => getSchema().getType(typeName),
    printSchema: () => printSchema(schema),
    printType: (typeName: string) => {
      const type = getSchema().getType(typeName)

      if (!type || !type.astNode) return 'NOT_FOUND'

      return print(type.astNode)
    },
  }
}

export const pluginNoopOnMissing = plugin({
  name: 'MockMissing',
  onMissingType: (typeName, { addType }) => {
    const isInput =
      typeName.includes('Filter') || typeName.includes('Where') || typeName.includes('OrderBy')

    if (isInput) {
      const input = inputObjectType({
        name: typeName,
        definition(t) {
          t.field('noop', { type: 'Int' })
        },
      })

      addType(input)

      return input
    }

    const object = objectType({
      name: typeName,
      definition(t) {
        t.field('noop', { type: 'Int' })
      },
    })

    addType(object)

    return object
  },
})
