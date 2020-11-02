import { PrismaClient } from '@prisma/client'

import { Naming, naming } from './builder/naming'
import { AllScalarTypes } from './interfaces'

export interface PluginPrismaConfig {
  prisma?: PrismaClient
  output?:
    | boolean
    | {
        typegen: string
      }
  naming?: Partial<Naming>
  force?: boolean

  pagination?: {
    takeDefault?: number
    takeLimit?: number
  }

  idType?: 'String' | 'Int' | 'ID' | AllScalarTypes
}

export interface Config {
  prisma: PrismaClient
  output:
    | boolean
    | {
        typegen: string
      }
  naming: Naming
  force: boolean

  pagination: {
    takeDefault: number
    takeLimit: number
  }

  idType: 'String' | 'Int' | 'ID' | AllScalarTypes
}

export const pluginPrismaDefaultConfig: Config = {
  prisma: (undefined as unknown) as PrismaClient, // hacky, but nvm for now
  force: false,
  naming,
  output: false,
  pagination: {
    takeDefault: 25,
    takeLimit: 100,
  },
  idType: 'ID',
}
