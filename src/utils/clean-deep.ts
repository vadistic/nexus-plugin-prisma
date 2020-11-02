/* eslint-disable no-param-reassign */
import { transform, isPlainObject, isEmpty } from 'lodash'

export interface CleanDeepOptions {
  cleanKeys: string[]
  cleanValues: any[]
  emptyArrays: boolean
  emptyObjects: boolean
  emptyStrings: boolean
  nullValues: boolean
  undefinedValues: boolean
}

export const cleanDeep = (
  object: any,
  {
    cleanKeys = [],
    cleanValues = [],
    emptyArrays = true,
    emptyObjects = true,
    emptyStrings = true,
    nullValues = true,
    undefinedValues = true,
  }: Partial<CleanDeepOptions> = {},
) => {
  return transform(object, (result, value, key) => {
    // Exclude specific keys.
    if (cleanKeys.includes(key as any)) {
      return
    }

    // Recurse into arrays and objects.
    if (Array.isArray(value) || isPlainObject(value)) {
      value = cleanDeep(value, {
        cleanKeys,
        cleanValues,
        emptyArrays,
        emptyObjects,
        emptyStrings,
        nullValues,
        undefinedValues,
      })
    }

    // Exclude specific values.
    if (cleanValues.includes(value)) {
      return
    }

    // Exclude empty objects.
    if (emptyObjects && isPlainObject(value) && isEmpty(value)) {
      return
    }

    // Exclude empty arrays.
    if (emptyArrays && Array.isArray(value) && !value.length) {
      return
    }

    // Exclude empty strings.
    if (emptyStrings && value === '') {
      return
    }

    // Exclude null values.
    if (nullValues && value === null) {
      return
    }

    // Exclude undefined values.
    if (undefinedValues && value === undefined) {
      return
    }

    // Append when recursing arrays.
    if (Array.isArray(result)) {
      result.push(value)
      return
    }

    ;(result as any)[key] = value
  })
}
