import { ternary } from '../ternary'

describe('ternary', () => {
  describe('using functions', () => {
    const cond = () => false,
      v1 = () => 'v1',
      v2 = () => 'v2',
      expected = 'v2'

    it('should return the expected value', () => {
      const ret = ternary(cond, v1, v2)
      expect(ret).toBe(expected)
    })
  })

  describe('using values', () => {
    const cond = false,
      v1 = 'v1',
      v2 = 'v2',
      expected = 'v2'
    it('should return the expected value', () => {
      const ret = ternary(cond, v1, v2)
      expect(ret).toBe(expected)
    })
  })
})
