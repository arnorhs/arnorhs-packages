import { sw } from '../switch'

describe('switch', () => {
  describe('using array', () => {
    describe('of values', () => {
      const arr = ['k1', 'key 1', 'k2', 'key 2', 'default value']

      it('should return "key 1"', () => {
        const ret = sw('k1', arr)
        const expected = 'key 1'
        expect(ret).toBe(expected)
      })

      it('should return "key 2"', () => {
        const ret = sw('k2', arr)
        const expected = 'key 2'
        expect(ret).toBe(expected)
      })

      it('should return "default value"', () => {
        const ret = sw('asdf', arr)
        const expected = 'default value'
        expect(ret).toBe(expected)
      })
    })

    describe('of functions', () => {
      const f =
        <T>(val: T) =>
        () =>
          val

      const arr = [f('k1'), f('key 1'), f('k2'), f('key 2'), f('default value')]

      it('should return "key 1"', () => {
        const ret = sw('k1', arr)
        const expected = 'key 1'
        expect(ret).toBe(expected)
      })

      it('should return "key 2"', () => {
        const ret = sw('k2', arr)
        const expected = 'key 2'
        expect(ret).toBe(expected)
      })

      it('should return "default value"', () => {
        const ret = sw('asdf', arr)
        const expected = 'default value'
        expect(ret).toBe(expected)
      })
    })
  })
})
