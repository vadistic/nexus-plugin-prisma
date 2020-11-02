import { getDmmf } from './dmmf'

describe('dmmf', () => {
  test('get-dmmf', () => {
    const dmmf = getDmmf()

    expect(dmmf).toBeDefined()
  })
})
