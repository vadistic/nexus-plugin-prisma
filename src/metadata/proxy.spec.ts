import { testMetadata } from '../../test/utils'

import { modelProxy, crudProxy } from './proxy'

describe('metadataProxy', () => {
  const metadata = testMetadata([])

  const fn1 = jest.fn()
  const t1 = modelProxy({ metadata, stage: 'walk', typeName: 'Tag', callback: fn1 })
  t1.id()

  const fn2 = jest.fn()
  const t2 = modelProxy({ metadata, stage: 'build', typeName: 'Tag', callback: fn2 })
  t2.id()

  const fn3 = jest.fn()
  const t3 = crudProxy({ metadata, stage: 'walk', typeName: 'Query', callback: fn3 })
  t3.tag.findOne()

  test('callback fn is called', () => {
    expect(fn1).toHaveBeenCalledTimes(1)
    expect(fn2).toHaveBeenCalledTimes(1)
    expect(fn3).toHaveBeenCalledTimes(1)
  })

  test('correct metadatas', () => {
    expect(metadata.types.map(t => t.typeName)).toMatchObject(['Tag', 'Query'])
    expect(Object.keys(metadata.typeMapping)).toMatchObject(['Tag', 'Query'])

    expect(metadata.typeMapping.Tag.typeName).toBe('Tag')

    expect(metadata.typeMapping.Tag.fields.map(f => f.fieldName)).toMatchObject(['id'])
    expect(Object.keys(metadata.typeMapping.Tag.fieldMapping)).toMatchObject(['id'])

    expect(Array.from(metadata.refs)).toMatchInlineSnapshot(`
      Array [
        "Tag",
        "String",
        "Query",
      ]
    `)
  })
})
