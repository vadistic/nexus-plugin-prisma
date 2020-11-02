import { testBuilderLens, testConfig, testNexus, testMetadata } from '../../test/utils'

import { addEnums, addEnumFilters } from './enum'
import { naming } from './naming'

describe('enums', () => {
  const metadata = testMetadata()
  const config = testConfig()

  const enumsLens = testBuilderLens()
  const enumFiltersLens = testBuilderLens()

  const enums = addEnums(config, metadata, enumsLens)
  const enumFilters = addEnumFilters(config, metadata, enumFiltersLens)

  const nexus = testNexus([...enums, ...enumFilters])

  test('ok', () => {
    expect(enums).toBeDefined()
    expect(enumFilters).toBeDefined()
  })

  test('add types', () => {
    expect(enumsLens.addType).toHaveBeenCalledTimes(1 + metadata.dmmf.datamodel.enums.length)
    expect(enumFiltersLens.addType).toHaveBeenCalledTimes(metadata.dmmf.datamodel.enums.length * 2)
  })

  test('SortDirection is added', () => {
    expect(nexus.printType('SortDirection')).toMatchInlineSnapshot(`
      "enum SortDirection {
        ASC
        DESC
      }"
    `)
  })

  test('enums', () => {
    expect(nexus.printType('StageType')).toMatchInlineSnapshot(`
      "enum StageType {
        INITIAL
        PROCESS
        REJECT
        SUCCESS
      }"
    `)
  })

  test('enum filters', () => {
    const filterName = naming.enumFilterInput('StageType', false)
    const nullableFilterName = naming.enumFilterInput('StageType', true)

    expect(nexus.printType(filterName)).toMatchInlineSnapshot(`
      "input StageTypeEnumFilter {
        \\"\\"\\"\\"\\"\\"
        equals: StageType
        \\"\\"\\"\\"\\"\\"
        not: StageType
        \\"\\"\\"\\"\\"\\"
        in: [StageType]
        \\"\\"\\"\\"\\"\\"
        notInt: [StageType]
      }"
    `)

    expect(nexus.printType(nullableFilterName)).toMatchInlineSnapshot(`
      "input StageTypeNullableEnumFilter {
        \\"\\"\\"\\"\\"\\"
        equals: StageType
        \\"\\"\\"\\"\\"\\"
        not: StageType
        \\"\\"\\"\\"\\"\\"
        in: [StageType]
        \\"\\"\\"\\"\\"\\"
        notInt: [StageType]
        \\"\\"\\"\\"\\"\\"
        exists: Boolean
      }"
    `)
  })
})
