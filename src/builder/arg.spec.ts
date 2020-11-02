import { queryType } from '@nexus/schema'

import { testConfig, testMetadata, testNexus } from '../../test/utils'

import { buildWhereArgs, buildUniqueArgs } from './arg'

describe('arg', () => {
  const metadata = testMetadata()
  const config = testConfig()

  const tagUniqueArgs = buildUniqueArgs(config, metadata.typeMapping.Tag)
  const tagSearchArgs = buildWhereArgs(config, metadata.typeMapping.Tag)

  const Query = queryType({
    definition(t) {
      t.field('tag', { type: 'Tag', args: tagUniqueArgs })
      t.field('tags', { type: 'Tag', list: true, args: tagSearchArgs })
    },
  })

  const nexus = testNexus([Query])

  test('ok', () => {
    expect(tagUniqueArgs).toBeDefined()
  })

  test('print query', () => {
    expect(nexus.printType('Query')).toMatchInlineSnapshot(`
      "type Query {
        tag(id: String!): Tag
        tags(where: TagWhere, skip: Int, take: Int = 25, cursor: ID): [Tag]
      }"
    `)
  })
})
