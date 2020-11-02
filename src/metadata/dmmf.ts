import { PrismaClient } from '@prisma/client'
import { DMMF, DMMFClass as RuntimeDMMFClass } from '@prisma/client/runtime'
import type { DMMFClass } from '@prisma/client/runtime'

export type Dmmf = DMMFClass

export const getDmmfDocument = (packagePath = '@prisma/client'): DMMF.Document => {
  let dmmf: undefined | DMMF.Document

  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires, import/no-dynamic-require, global-require
    dmmf = require(packagePath).dmmf
  } catch (error) {
    throw new Error(
      `Failed to import prisma client package at ${packagePath}. The following error occured while trying:\n${error.stack}`,
    )
  }

  if (!dmmf) {
    throw new Error(
      `You most likely forgot to initialize the Prisma Client. Please run \`prisma generate\` and try to run it again.`,
    )
  }

  return dmmf
}

export const getDmmf = (packageOrClient: string | PrismaClient = '@prisma/client'): DMMFClass => {
  const input = packageOrClient as any

  if (typeof input === 'string') {
    return new RuntimeDMMFClass(getDmmfDocument(input))
  }

  if (input._dmmf) {
    return new RuntimeDMMFClass(input._dmmf)
  }

  throw new Error(`Invalid dmmf input`)
}
