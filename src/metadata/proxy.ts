/* eslint-disable consistent-return */

import { upperFirst } from 'lodash'

import { noopFn } from '../utils/types'

import { Metadata, FieldMetadata } from './metadata'

export interface MetadataProxyHandlerProps {
  metadata: Metadata
  typeName: string
  stage: 'walk' | 'build'
  callback?: (FieldMeta: FieldMetadata) => void
}

export const modelProxy = ({ metadata, stage, typeName, callback }: MetadataProxyHandlerProps) =>
  new Proxy(noopFn as any, {
    get(target, key) {
      return (params?: any) => {
        if (typeof key === 'string') {
          const FieldMeta =
            stage === 'walk'
              ? metadata.addField({ modelField: key, typeName, params })
              : metadata.getField({ fieldName: key, typeName })

          if (callback && FieldMeta) {
            return callback(FieldMeta)
          }
        }
      }
    },
    apply(target1, thisArg, [modelName]) {
      return new Proxy(noopFn as any, {
        get(target2, key) {
          return (params?: any) => {
            if (typeof key === 'string') {
              const fieldMeta =
                stage === 'walk'
                  ? metadata.addField({ modelField: key, modelName, typeName, params })
                  : metadata.getField({ fieldName: key, typeName })

              if (callback && fieldMeta) {
                return callback(fieldMeta)
              }
            }
          }
        },
      })
    },
  })

export const crudProxy = ({ metadata, stage, typeName, callback }: MetadataProxyHandlerProps) =>
  new Proxy(noopFn as any, {
    get(_, onType) {
      return new Proxy(noopFn as any, {
        get(__, action) {
          return (params?: any) => {
            if (typeof onType === 'string' && typeof action === 'string') {
              const fieldMeta =
                stage === 'walk'
                  ? metadata.addField({
                      modelField: action + upperFirst(onType),
                      modelName: typeName,
                      typeName,
                      params,
                      action: action as any,
                    })
                  : metadata.getField({ fieldName: onType, typeName })

              if (callback && fieldMeta) {
                return callback(fieldMeta)
              }
            }
          }
        },
      })
    },
  })
