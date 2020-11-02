import { plugin, dynamicOutputProperty } from '@nexus/schema'
import { printedGenTypingImport, extendType } from '@nexus/schema/dist/core'
import { PrismaClient } from '@prisma/client'

import { addEnums, addEnumFilters } from './builder/enum'
import { addOutputField } from './builder/model-field'
import { addModelInputs } from './builder/model-input'
import { addScalars, addScalarFilters } from './builder/scalar'
import { PluginPrismaConfig, pluginPrismaDefaultConfig, Config } from './config'
import { getDmmf } from './metadata/dmmf'
import { Metadata } from './metadata/metadata'
import { crudProxy, modelProxy } from './metadata/proxy'
import { typegenPrisma, writeTypegen } from './typegen/typegen'

const MODULE_NAME = '@vadistic/nexus-plugin-prisma'

export const pluginPrisma = (prismaPluginConfig: PluginPrismaConfig) => {
  const config = {
    ...pluginPrismaDefaultConfig,
    ...prismaPluginConfig,
    prisma: prismaPluginConfig.prisma ?? new PrismaClient(),
    naming: {
      ...pluginPrismaDefaultConfig.naming,
      ...prismaPluginConfig.naming,
    },
    pagination: {
      ...pluginPrismaDefaultConfig.pagination,
      ...prismaPluginConfig.pagination,
    },
  } as Config

  const dmmf = getDmmf(config.prisma)
  const metadata = new Metadata(dmmf)

  return plugin({
    name: 'Prisma',
    fieldDefTypes: [
      printedGenTypingImport({
        module: MODULE_NAME,
        bindings: ['PrismaModelProperty', 'PrismaCrudProperty'],
      }),
    ],
    onInstall() {
      return {
        types: [
          dynamicOutputProperty({
            name: 'model',
            typeDefinition: ': PrismaModelProperty<TypeName>',
            factory: ({ typeName, typeDef, stage }) => {
              return modelProxy({
                metadata,
                typeName,
                stage,
                callback: fieldMeta => {
                  addOutputField(config, fieldMeta, typeDef)
                },
              })
            },
          }),
          dynamicOutputProperty({
            name: 'crud',
            typeDefinition: ': PrismaCrudProperty<TypeName>',
            factory: ({ typeName, typeDef, stage }) => {
              return crudProxy({
                metadata,
                typeName,
                stage,
                callback: fieldMeta => {
                  addOutputField(config, fieldMeta, typeDef)
                },
              })
            },
          }),
        ],
      }
    },

    onBeforeBuild: lens => {
      addScalars(config, metadata, lens)
      addScalarFilters(config, metadata, lens)

      addEnums(config, metadata, lens)
      addEnumFilters(config, metadata, lens)

      addModelInputs(config, metadata, lens)

      metadata.types.forEach(typeMeta => {
        if (!typeMeta.root) return

        const extension = extendType<any>({
          type: typeMeta.typeName,
          definition(t) {
            typeMeta.fields.forEach(fieldMeta => {
              if (fieldMeta.outputField.outputType.kind !== 'object') return

              addOutputField(config, fieldMeta, t, true)
            })
          },
        })

        lens.addType(extension)
      })
    },

    onAfterBuild() {
      writeTypegen(
        config,
        typegenPrisma(
          [
            { module: '@prisma/client', default: '* as Prisma' },
            { module: MODULE_NAME, bindings: ['PrismaCrud'] },
          ],
          metadata,
        ),
      )
    },
  })
}
