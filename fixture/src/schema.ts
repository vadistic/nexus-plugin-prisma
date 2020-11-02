import { makeSchema, nullabilityGuardPlugin } from '@nexus/schema'
import { PrismaClient } from '@prisma/client'
import path from 'path'

import { pluginPrisma } from '../../src'

export const prisma = new PrismaClient()

import * as models from './model'

const plugins = [
  pluginPrisma({
    force: true,
    prisma,
    output: {
      typegen: path.join(__dirname, './generated/prisma.ts'),
    },
    idType: 'ID',
  }),
  nullabilityGuardPlugin({
    shouldGuard: true,
    fallbackValues: {
      String: () => '',
      ID: () => 'MISSING_ID',
      Boolean: () => true,
      DateTime: () => new Date(0),
      Json: () => null,
      Int: () => 0,
      Float: () => 0,
    },
  }),
]

export const schema = makeSchema({
  types: [models],
  plugins,
  outputs: {
    schema: path.join(__dirname, './generated/schema.graphql'),
    typegen: path.join(__dirname, './generated/nexus.ts'),
  },
  typegenAutoConfig: {
    sources: [
      {
        source: path.join(__dirname, 'backing.ts'),
        alias: 'types',
      },
    ],
    contextType: 'types.Context',
  },
})
