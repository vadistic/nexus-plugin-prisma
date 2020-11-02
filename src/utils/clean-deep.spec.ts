import { cleanDeep } from './clean-deep'

describe('clean-deep', () => {
  it('pick defined values from the object', () => {
    const object = {
      bar: {},
      biz: [],
      foo: {
        bar: undefined,
        baz: true,
        biz: false,
        buz: null,
        net: '',
        qux: 100,
      },
    }

    expect(cleanDeep(object)).toMatchObject({
      foo: {
        baz: true,
        biz: false,
        qux: 100,
      },
    })
  })

  it('clean arrays', () => {
    const object = {
      foo: [
        {
          bar: undefined,
          baz: '',
          biz: 0,
        },
      ],
    }

    expect(cleanDeep(object)).toMatchObject({
      foo: [
        {
          biz: 0,
        },
      ],
    })
  })

  it('include non plain objects', () => {
    const object = {
      foo: {
        bar: new Date(0),
        biz: undefined,
      },
    }

    expect(cleanDeep(object)).toMatchObject({
      foo: {
        bar: new Date(0),
      },
    })
  })

  it('support custom values', () => {
    const object = {
      biz: {
        baz: 123,
      },
      foo: {
        bar: 'abc',
      },
    }

    expect(cleanDeep(object, { cleanValues: ['abc'] })).toMatchObject({
      biz: {
        baz: 123,
      },
    })
  })

  it('include empty objects if `emptyObjects` is `false`', () => {
    const object = {
      biz: {
        baz: 123,
      },
      foo: {
        bar: {},
      },
    }

    expect(cleanDeep(object, { emptyObjects: false })).toMatchObject({
      biz: {
        baz: 123,
      },
      foo: {
        bar: {},
      },
    })
  })

  it('include empty arrays if `emptyArrays` is `false`', () => {
    const object = {
      biz: {
        bar: [],
        baz: 123,
      },
      foo: [],
    }

    expect(cleanDeep(object, { emptyArrays: false })).toMatchObject({
      biz: {
        bar: [],
        baz: 123,
      },
      foo: [],
    })
  })

  it('include empty strings if `emptyStrings` is `false`', () => {
    const object = {
      foo: {
        bar: '',
        biz: 123,
      },
    }

    expect(cleanDeep(object, { emptyStrings: false })).toMatchObject({
      foo: {
        bar: '',
        biz: 123,
      },
    })
  })

  it('include null values if `nullValues` is `false`', () => {
    const object = {
      foo: {
        bar: null,
        biz: 123,
      },
    }

    expect(cleanDeep(object, { nullValues: false })).toMatchObject({
      foo: {
        bar: null,
        biz: 123,
      },
    })
  })

  it('include undefined values if `undefinedValues` is `false`', () => {
    const object = {
      foo: {
        bar: undefined,
        biz: 123,
        qux: [undefined, {}, true],
      },
    }

    expect(cleanDeep(object, { undefinedValues: false })).toMatchObject({
      foo: {
        bar: undefined,
        biz: 123,
        qux: [undefined, true],
      },
    })
  })

  it('remove specified keys if `cleanKeys` is passed', () => {
    const object = {
      foo: {
        alsoMe: {
          biz: 123,
        },
        bar: undefined,
        biz: 123,
        qux: [undefined, {}, true],
        removeMe: true,
      },
      removeMe: true,
    }

    expect(cleanDeep(object, { cleanKeys: ['removeMe', 'alsoMe'] })).toMatchObject({
      foo: {
        biz: 123,
        qux: [true],
      },
    })
  })

  it('work on arrays', () => {
    const arr = [{ foo: undefined, bar: null, biz: 1 }, null]

    expect(cleanDeep(arr)).toMatchObject([{ biz: 1 }])
  })
})
