import { fi } from '../fi'

describe('fi statement', () => {
  it('should return "a"', () => {
    const ret = fi(true, 'a')
    const expected = 'a'
    expect(ret()).toBe(expected)
  })

  it('should return an undefined value', () => {
    const ret = fi(false, 'a')
    const expected = 'undefined'
    expect(typeof ret()).toBe(expected)
  })
})

describe('fi else statement', () => {
  const f = function (a: boolean) {
    return fi(a, 'a').else('b')()
  }

  it('should return "a"', () => {
    const ret = f(true)
    const expected = 'a'
    expect(ret).toBe(expected)
  })

  it('should return "b"', () => {
    const ret = f(false)
    const expected = 'b'
    expect(ret).toBe(expected)
  })
})

describe('fi elsfi statement', () => {
  const f = function (a: boolean, b: boolean) {
    return fi(a, 'a').elseif(b, 'b')()
  }

  it('should return "a"', () => {
    const ret = f(true, false)
    const expected = 'a'
    expect(ret).toBe(expected)
  })

  it('should return "b"', () => {
    const ret = f(false, true)
    const expected = 'b'
    expect(ret).toBe(expected)
  })

  it('should return an undefined value', () => {
    const ret = typeof f(false, false)
    const expected = 'undefined'
    expect(ret).toBe(expected)
  })
})

describe('fi elseif else statement', () => {
  const f = function (a: boolean, b: boolean) {
    return fi(a, 'a').elseif(b, 'b').else('c')()
  }

  it('should return "a"', () => {
    const ret = f(true, false)
    const expected = 'a'
    expect(ret).toBe(expected)
  })

  it('should return "b"', () => {
    const ret = f(false, true)
    const expected = 'b'
    expect(ret).toBe(expected)
  })

  it('should return "c"', () => {
    const ret = f(false, false)
    const expected = 'c'
    expect(ret).toBe(expected)
  })
})
