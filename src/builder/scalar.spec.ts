import { testBuilderLens, testConfig, testMetadata, testNexus } from '../../test/utils'

import { addScalars, addScalarFilters } from './scalar'
import { buildinScalarNames } from './scalar-config'

describe('scalars', () => {
  const metadata = testMetadata()
  const config = testConfig()

  const scalarsLens = testBuilderLens()
  const scalarFilterLens = testBuilderLens()

  const scalars = addScalars(config, metadata, scalarsLens)
  const scalarFilters = addScalarFilters(config, metadata, scalarFilterLens)

  const nexus = testNexus([...scalars, ...scalarFilters])

  test('ok', () => {
    expect(scalars).toBeDefined()
    expect(scalarFilters).toBeDefined()
  })

  test('add types', () => {
    expect(scalarsLens.addType).toHaveBeenCalledTimes(2)
    expect(scalarFilterLens.addType).toHaveBeenCalledTimes(buildinScalarNames.length * 2)
  })

  test('print', () => {
    expect(nexus.printSchema()).toMatchInlineSnapshot(`
      "\\"\\"\\"\\"\\"\\"
      scalar Json

      \\"\\"\\"\\"\\"\\"
      scalar DateTime

      input JsonNullableFilter {
        \\"\\"\\"\\"\\"\\"
        equals: Json

        \\"\\"\\"\\"\\"\\"
        not: Json

        \\"\\"\\"\\"\\"\\"
        in: [Json]

        \\"\\"\\"\\"\\"\\"
        notInt: [Json]

        \\"\\"\\"\\"\\"\\"
        exists: Boolean
      }

      input JsonFilter {
        \\"\\"\\"\\"\\"\\"
        equals: Json

        \\"\\"\\"\\"\\"\\"
        not: Json

        \\"\\"\\"\\"\\"\\"
        in: [Json]

        \\"\\"\\"\\"\\"\\"
        notInt: [Json]
      }

      input StringNullableFilter {
        \\"\\"\\"\\"\\"\\"
        equals: String

        \\"\\"\\"\\"\\"\\"
        not: String

        \\"\\"\\"\\"\\"\\"
        startsWith: String

        \\"\\"\\"\\"\\"\\"
        endsWith: String

        \\"\\"\\"\\"\\"\\"
        contains: String

        \\"\\"\\"\\"\\"\\"
        in: [String]

        \\"\\"\\"\\"\\"\\"
        notInt: [String]

        \\"\\"\\"\\"\\"\\"
        exists: Boolean
      }

      input StringFilter {
        \\"\\"\\"\\"\\"\\"
        equals: String

        \\"\\"\\"\\"\\"\\"
        not: String

        \\"\\"\\"\\"\\"\\"
        startsWith: String

        \\"\\"\\"\\"\\"\\"
        endsWith: String

        \\"\\"\\"\\"\\"\\"
        contains: String

        \\"\\"\\"\\"\\"\\"
        in: [String]

        \\"\\"\\"\\"\\"\\"
        notInt: [String]
      }

      input IntNullableFilter {
        \\"\\"\\"\\"\\"\\"
        equals: Int

        \\"\\"\\"\\"\\"\\"
        not: Int

        \\"\\"\\"\\"\\"\\"
        lt: Int

        \\"\\"\\"\\"\\"\\"
        lte: Int

        \\"\\"\\"\\"\\"\\"
        gt: Int

        \\"\\"\\"\\"\\"\\"
        gte: Int

        \\"\\"\\"\\"\\"\\"
        in: [Int]

        \\"\\"\\"\\"\\"\\"
        notInt: [Int]

        \\"\\"\\"\\"\\"\\"
        exists: Boolean
      }

      input IntFilter {
        \\"\\"\\"\\"\\"\\"
        equals: Int

        \\"\\"\\"\\"\\"\\"
        not: Int

        \\"\\"\\"\\"\\"\\"
        lt: Int

        \\"\\"\\"\\"\\"\\"
        lte: Int

        \\"\\"\\"\\"\\"\\"
        gt: Int

        \\"\\"\\"\\"\\"\\"
        gte: Int

        \\"\\"\\"\\"\\"\\"
        in: [Int]

        \\"\\"\\"\\"\\"\\"
        notInt: [Int]
      }

      input FloatNullableFilter {
        \\"\\"\\"\\"\\"\\"
        equals: Float

        \\"\\"\\"\\"\\"\\"
        not: Float

        \\"\\"\\"\\"\\"\\"
        lt: Float

        \\"\\"\\"\\"\\"\\"
        lte: Float

        \\"\\"\\"\\"\\"\\"
        gt: Float

        \\"\\"\\"\\"\\"\\"
        gte: Float

        \\"\\"\\"\\"\\"\\"
        in: [Float]

        \\"\\"\\"\\"\\"\\"
        notInt: [Float]

        \\"\\"\\"\\"\\"\\"
        exists: Boolean
      }

      input FloatFilter {
        \\"\\"\\"\\"\\"\\"
        equals: Float

        \\"\\"\\"\\"\\"\\"
        not: Float

        \\"\\"\\"\\"\\"\\"
        lt: Float

        \\"\\"\\"\\"\\"\\"
        lte: Float

        \\"\\"\\"\\"\\"\\"
        gt: Float

        \\"\\"\\"\\"\\"\\"
        gte: Float

        \\"\\"\\"\\"\\"\\"
        in: [Float]

        \\"\\"\\"\\"\\"\\"
        notInt: [Float]
      }

      input DateTimeNullableFilter {
        \\"\\"\\"\\"\\"\\"
        equals: DateTime

        \\"\\"\\"\\"\\"\\"
        not: DateTime

        \\"\\"\\"\\"\\"\\"
        lt: DateTime

        \\"\\"\\"\\"\\"\\"
        lte: DateTime

        \\"\\"\\"\\"\\"\\"
        gt: DateTime

        \\"\\"\\"\\"\\"\\"
        gte: DateTime

        \\"\\"\\"\\"\\"\\"
        in: [DateTime]

        \\"\\"\\"\\"\\"\\"
        notInt: [DateTime]

        \\"\\"\\"\\"\\"\\"
        exists: Boolean
      }

      input DateTimeFilter {
        \\"\\"\\"\\"\\"\\"
        equals: DateTime

        \\"\\"\\"\\"\\"\\"
        not: DateTime

        \\"\\"\\"\\"\\"\\"
        lt: DateTime

        \\"\\"\\"\\"\\"\\"
        lte: DateTime

        \\"\\"\\"\\"\\"\\"
        gt: DateTime

        \\"\\"\\"\\"\\"\\"
        gte: DateTime

        \\"\\"\\"\\"\\"\\"
        in: [DateTime]

        \\"\\"\\"\\"\\"\\"
        notInt: [DateTime]
      }

      input BooleanNullableFilter {
        \\"\\"\\"\\"\\"\\"
        equals: Boolean

        \\"\\"\\"\\"\\"\\"
        not: Boolean

        \\"\\"\\"\\"\\"\\"
        in: [Boolean]

        \\"\\"\\"\\"\\"\\"
        notInt: [Boolean]

        \\"\\"\\"\\"\\"\\"
        exists: Boolean
      }

      input BooleanFilter {
        \\"\\"\\"\\"\\"\\"
        equals: Boolean

        \\"\\"\\"\\"\\"\\"
        not: Boolean

        \\"\\"\\"\\"\\"\\"
        in: [Boolean]

        \\"\\"\\"\\"\\"\\"
        notInt: [Boolean]
      }

      input IDNullableFilter {
        \\"\\"\\"\\"\\"\\"
        equals: ID

        \\"\\"\\"\\"\\"\\"
        not: ID

        \\"\\"\\"\\"\\"\\"
        in: [ID]

        \\"\\"\\"\\"\\"\\"
        notInt: [ID]

        \\"\\"\\"\\"\\"\\"
        exists: Boolean
      }

      input IDFilter {
        \\"\\"\\"\\"\\"\\"
        equals: ID

        \\"\\"\\"\\"\\"\\"
        not: ID

        \\"\\"\\"\\"\\"\\"
        in: [ID]

        \\"\\"\\"\\"\\"\\"
        notInt: [ID]
      }

      type Query {
        noop: Int
      }
      "
    `)
  })
})
