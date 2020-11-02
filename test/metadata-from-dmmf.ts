/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { DMMF } from '@prisma/client/runtime'

import { Metadata, FieldMetadata } from '../src/metadata/metadata'

export const metadataFromDmmf = (metadata: Metadata, modelName: string) => {
  const typeMeta = metadata.getType({ typeName: modelName, modelName })

  if (!typeMeta?.model) return undefined

  typeMeta?.model.fields.forEach(field => {
    const FieldMeta: FieldMetadata = {
      root: false,
      parent: typeMeta,
      params: {
        type: field.type,
        list: field.isList ? true : undefined,
        nullable: !field.isRequired,
      },
      field,
      outputField: typeMeta.outputType.fields.find(f => f.name === field.name)!,
      fieldName: field.name,
      action: field.isList ? DMMF.ModelAction.findMany : DMMF.ModelAction.findOne,
    }

    typeMeta.fieldMapping[FieldMeta.fieldName] = FieldMeta
    typeMeta.fields.push(FieldMeta)
    metadata.refs.add(field.type)
  })

  return typeMeta
}
