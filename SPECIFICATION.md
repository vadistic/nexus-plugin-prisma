# SPECIFICATION

```ts
export const TagModel = objectType({
  name: 'Tag',
  definition(t) {
    // expose model scalar fields
    t.model.id()

    // allow model name aliasing
    t.model('Tag').createdAt()

    // relations to one should work as scalar fields
    t.model.tag()

    // relations to many should expose crud stuff
    t.model.candidates.collection({ alias: 'candidates' })

    t.model.candidates.connection({ alias: 'candidatesConnection' })

    t.model.candidates.count({ alias: 'candidatesCount' })

    // TODO: some aggregation?
  },
})
```
