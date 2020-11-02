import { PrintedGenTypingImportConfig } from '@nexus/schema/dist/core'

import { maybeArr, maybeArg, Arrayable } from '../utils/types'

export const printIndent = (content: Arrayable<string>, indentLevel = 1) => {
  const indent = ' '.repeat(indentLevel * 2)
  const contentArr = Array.isArray(content) ? content : content.split('\n')

  return contentArr.map(line => indent + line).join('\n')
}

export type NestableFields = string | (string | [string, string | (string | [string, string])[]])[]

export interface PrintInterfaceConfig {
  name: string
  extend?: Arrayable<string>
  fields: NestableFields
}

export const printInterface = ({ name, fields, extend }: PrintInterfaceConfig) => {
  let res = `export interface ${name} `

  const extendArr = maybeArg(maybeArr, extend)

  if (extendArr?.length) {
    res += `extends ${extendArr.join(', ')} `
  }

  res += printFields(fields)

  return res
}

export const printFields = (fields: NestableFields, indentLevel = 0) => {
  const inner = !Array.isArray(fields)
    ? fields
    : fields.map(field => {
        if (typeof field === 'string') return field

        const [key, val] = field

        if (typeof val === 'string') {
          return `${key}: ${val}`
        }

        return `${key}: ` + printFields(val, indentLevel + 1)
      })

  let res = ''

  res += '{\n'
  res += printIndent(inner, indentLevel + 1)
  res += printIndent('\n}', indentLevel)

  return res
}

export const printImport = (config: PrintedGenTypingImportConfig) => {
  if (config.default) {
    return `import ${config.default} from '${config.module}'`
  }

  if (config.bindings) {
    const named = config.bindings
      .map(val => (typeof val === 'string' ? val : `${val[0]} as ${val[1]}`))
      .join(', ')

    return `import { ${named} } from '${config.module}'`
  }

  return 'INVALID_IMPORT_CONFIG'
}

export const printGlobal = (content: string | string[]) => {
  const inner = maybeArr(content).join('\n\n')

  return 'declare global {\n' + printIndent(inner) + '\n}'
}
