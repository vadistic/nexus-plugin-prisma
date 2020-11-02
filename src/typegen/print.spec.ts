import { printIndent, printInterface, printFields, printGlobal, printImport } from './print'

describe('print', () => {
  test('printIndent', () => {
    const fix = printIndent(['AAA', '  BBB'].join('\n'))

    expect(fix).toMatchInlineSnapshot(`
      "  AAA
          BBB"
    `)
  })

  test('printFields', () => {
    const fix = printFields(['a: number', 'b?: string'])

    expect(fix).toMatchInlineSnapshot(`
      "{
        a: number
        b?: string
      }"
    `)
  })

  test('printFields nested', () => {
    const fix = printFields(['a: number', ['b', 'string'], ['c', ['a?: string', ['b', 'number']]]])

    expect(fix).toMatchInlineSnapshot(`
      "{
        a: number
        b: string
        c: {
          a?: string
          b: number  
        }
      }"
    `)
  })

  test('printInterface', () => {
    const fix = printInterface({
      name: 'MyInterface',
      extend: 'SomeOtherInterface',
      fields: ['a: number', 'b?: string'],
    })

    expect(fix).toMatchInlineSnapshot(`
      "export interface MyInterface extends SomeOtherInterface {
        a: number
        b?: string
      }"
    `)
  })

  test('printImport bindings', () => {
    const fix = printImport({
      module: '@prisma/client',
      bindings: ['Test', ['Another', 'Aliased']],
    })

    expect(fix).toMatchInlineSnapshot(`"import { Test, Another as Aliased } from '@prisma/client'"`)
  })

  test('printImport default', () => {
    const fix = printImport({
      module: '@prisma/client',
      default: 'Prisma',
    })

    expect(fix).toMatchInlineSnapshot(`"import Prisma from '@prisma/client'"`)
  })

  test('printGlobal', () => {
    const fix = printGlobal(printInterface({ name: 'Test', fields: ['a: string'] }))

    expect(fix).toMatchInlineSnapshot(`
      "declare global {
        export interface Test {
          a: string
        }
      }"
    `)
  })
})
