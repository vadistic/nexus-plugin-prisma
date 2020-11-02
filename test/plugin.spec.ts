import { objectType, makeSchema } from '@nexus/schema'
import { printSchema } from 'graphql'

import { pluginPrisma } from '../src/plugin'

describe('plugin', () => {
  const TagModel = objectType({
    name: 'Tag',
    definition(t: any) {
      t.model.id()
    },
  })

  const schema = makeSchema({
    types: [TagModel],
    plugins: [pluginPrisma({ output: false })],
    outputs: false,
  })

  const schemaForce = makeSchema({
    types: [TagModel],
    plugins: [pluginPrisma({ output: false, force: true })],
    outputs: false,
  })

  test('ok', () => {
    expect(schema).toBeDefined()
    expect(schemaForce).toBeDefined()
  })

  test('print force schema', () => {
    expect(printSchema(schemaForce)).toMatchSnapshot('schema.graphql')
  })

  test('print schema', () => {
    expect(printSchema(schema)).toMatchInlineSnapshot(`
      "type Tag {
        id: String!
      }

      type Query {
        ok: Boolean!
      }
      "
    `)
  })
})
