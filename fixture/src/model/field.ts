import { objectType } from '@nexus/schema'

export const FieldDefinitionModel = objectType({
  name: 'FieldDefinition',
  definition(t) {
    t.model.id()
    t.model.createdAt()
    t.model.updatedAt()

    t.model.name()
    t.model.description()

    t.model.type()
  },
})

export const FieldValueModel = objectType({
  name: 'FieldValue',
  definition(t) {
    t.model.value()

    t.model.definition()
  },
})
