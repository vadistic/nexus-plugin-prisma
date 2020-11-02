/* need this to build generic/global types*/

export interface PrismaModels {}

export interface PrismaMethods {}

export interface PrismaMappings {}

export interface PrismaOutputs {}

declare global {
  export interface PrismaGen {
    models: PrismaModels
    methods: PrismaMethods
    mappings: PrismaMappings
    outputs: PrismaOutputs
  }
}
