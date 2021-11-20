import fi, { ternary, sw } from '../cjs'

describe('ternary', function () {
  describe('using functions', function () {
    const cond = () => false,
      v1 = () => 'v1',
      v2 = () => 'v2',
      expected = 'v2'

    it('should return the expected value', function () {
      var ret = ternary(cond, v1, v2).ret()
      expect(ret).toBe(expected)
    })
  })
  describe('using values', function () {
    var cond = false,
      v1 = 'v1',
      v2 = 'v2',
      expected = 'v2'
    it('should return the expected value', function () {
      var ret = ternary(cond, v1, v2).ret()
      expect(ret).toBe(expected)
    })
  })
})

describe('switch', function () {
  describe('using array', function () {
    describe('of values', function () {
      var arr = ['k1', 'key 1', 'k2', 'key 2', 'default value']

      it('should return "key 1"', function () {
        var ret = sw('k1', arr).ret()
        var expected = 'key 1'
        expect(ret).toBe(expected)
      })

      it('should return "key 2"', function () {
        var ret = sw('k2', arr).ret()
        var expected = 'key 2'
        expect(ret).toBe(expected)
      })

      it('should return "default value"', function () {
        var ret = sw('asdf', arr).ret()
        var expected = 'default value'
        expect(ret).toBe(expected)
      })
    })

    describe('of functions', function () {
      // function factory.. laziness
      var f = function <T>(val: T) {
        return function () {
          return val
        }
      }
      var arr = [f('k1'), f('key 1'), f('k2'), f('key 2'), f('default value')]

      it('should return "key 1"', function () {
        var ret = sw('k1', arr).ret()
        var expected = 'key 1'
        expect(ret).toBe(expected)
      })

      it('should return "key 2"', function () {
        var ret = sw('k2', arr).ret()
        var expected = 'key 2'
        expect(ret).toBe(expected)
      })

      it('should return "default value"', function () {
        var ret = sw('asdf', arr).ret()
        var expected = 'default value'
        expect(ret).toBe(expected)
      })
    })
  })
})

describe('fi statement', function () {
  it('should return "a"', function () {
    var ret = fi(true, 'a').ret()
    var expected = 'a'
    expect(ret).toBe(expected)
  })

  it('should return an undefined value', function () {
    var ret = typeof fi(false, 'a').ret()
    var expected = 'undefined'
    expect(ret).toBe(expected)
  })
})

describe('fi els statement', function () {
  // extreme laziness.. factory for our test case
  var f = function (a: boolean) {
    return fi(a, 'a').else('b').ret()
  }

  it('should return "a"', function () {
    var ret = f(true)
    var expected = 'a'
    expect(ret).toBe(expected)
  })

  it('should return "b"', function () {
    var ret = f(false)
    var expected = 'b'
    expect(ret).toBe(expected)
  })
})

describe('fi elsfi statement', function () {
  // extreme laziness.. factory for our test case
  var f = function (a: boolean, b: boolean) {
    return fi(a, 'a').elseif(b, 'b').ret()
  }

  it('should return "a"', function () {
    var ret = f(true, false)
    var expected = 'a'
    expect(ret).toBe(expected)
  })

  it('should return "b"', function () {
    var ret = f(false, true)
    var expected = 'b'
    expect(ret).toBe(expected)
  })

  it('should return an undefined value', function () {
    var ret = typeof f(false, false)
    var expected = 'undefined'
    expect(ret).toBe(expected)
  })
})

describe('fi elsfi els statement', function () {
  // extreme laziness.. factory for our test case
  var f = function (a: boolean, b: boolean) {
    return fi(a, 'a').elseif(b, 'b').else('c').ret()
  }

  it('should return "a"', function () {
    var ret = f(true, false)
    var expected = 'a'
    expect(ret).toBe(expected)
  })

  it('should return "b"', function () {
    var ret = f(false, true)
    var expected = 'b'
    expect(ret).toBe(expected)
  })

  it('should return "c"', function () {
    var ret = f(false, false)
    var expected = 'c'
    expect(ret).toBe(expected)
  })
})
