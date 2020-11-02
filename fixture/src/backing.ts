import { Logger } from '@nexus/logger'
import { PrismaClient } from '@prisma/client'

import { IDInput, Maybe } from './types'

// SCALARS

export type DateTime = Date
export type JSON = any
export type URL = string
export type UnsignedFloat = number
export type UnsignedInt = number

// CONTEXT

export interface Context {
  db: PrismaClient
  log: Logger
  token: JwtToken
}

export type Role = 'USER' | 'ADMIN'

export interface JwtToken {
  uid: string
  wid: string
  roles: Role[]
}

// PAGINATION

export interface PaginationArgs {
  skip?: Maybe<number>
  take?: Maybe<number>
  cursor?: Maybe<IDInput>
}
