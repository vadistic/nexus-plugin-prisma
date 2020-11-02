import { AllInputTypes, AllOutputTypes } from '@nexus/schema'

import { AllScalarTypes, AllEnumTypes } from '../interfaces'

const scalarFilterInputName = (
  typeName: AllScalarTypes | string,
  nullabe: boolean,
): AllInputTypes => (nullabe ? `${typeName}NullableFilter` : `${typeName}Filter`) as AllInputTypes

const enumFilterInputName = (typeName: AllEnumTypes | string, nullabe: boolean): AllInputTypes =>
  (nullabe ? `${typeName}NullableEnumFilter` : `${typeName}EnumFilter`) as AllInputTypes

const filterInputName = (typeName: AllOutputTypes | string): AllInputTypes =>
  `${typeName}Filter` as AllInputTypes

const whereInputName = (typeName: AllOutputTypes | string): AllInputTypes =>
  `${typeName}Where` as AllInputTypes

const orderByInputName = (typeName: AllOutputTypes | string): AllInputTypes =>
  `${typeName}OrderBy` as AllInputTypes

export const naming = {
  scalarFilterInput: scalarFilterInputName,
  enumFilterInput: enumFilterInputName,
  filterInput: filterInputName,
  whereInput: whereInputName,
  orderByInput: orderByInputName,
}

export type Naming = typeof naming
