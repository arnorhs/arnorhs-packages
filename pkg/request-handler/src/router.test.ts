import { getPathParams, parseRoute, pathMathesRoute } from './router'

describe('parseRoute', () => {
  it('parses /path/to/something', () => {
    const i = parseRoute('/path/to/something')

    expect(i).toEqual({
      regex: new RegExp('^/path/to/something$', 'g'),
      params: [],
    })
  })
  it('parses /path/to/:something', () => {
    const i = parseRoute('/path/to/:something')

    expect(i).toEqual({
      regex: new RegExp('^/path/to/([a-zA-Z0-9_-]+)$', 'g'),
      params: ['something'],
    })
  })
  it('parses path/to', () => {
    const i = parseRoute('path/to')

    expect(i).toEqual({
      regex: new RegExp('^/path/to$', 'g'),
      params: [],
    })
  })
  it('parses /:path/:to/:something', () => {
    const i = parseRoute('/:path/:to/:something')

    expect(i).toEqual({
      regex: new RegExp('^/([a-zA-Z0-9_-]+)/([a-zA-Z0-9_-]+)/([a-zA-Z0-9_-]+)$', 'g'),
      params: ['path', 'to', 'something'],
    })
  })
  it('throws on invalid routes', () => {
    expect(() => parseRoute('/!some/ath')).toThrow()
    expect(() => parseRoute('some%/ath')).toThrow()
    expect(() => parseRoute(':/:adsf')).toThrow()
    expect(() => parseRoute('asdf/ad:sf')).toThrow()
    // i mean.. you can have spaces in urls.. but .. oh well, maybe support one day
    expect(() => parseRoute('some ath')).toThrow()
  })
})

describe('pathMatchesRoute', () => {
  describe('/this/route', () => {
    const params = parseRoute('/this/route')
    it('matches /this/route', () => {
      expect(pathMathesRoute('/this/route', params)).toBe(true)
    })

    it('doesnt match non-matching routes', () => {
      expect(pathMathesRoute('/sthis/route', params)).toBe(false)
      expect(pathMathesRoute('s/this/route', params)).toBe(false)
      expect(pathMathesRoute('//this/route', params)).toBe(false)
      expect(pathMathesRoute('/this/routes', params)).toBe(false)
    })
  })
  describe('/this/:route', () => {
    const params = parseRoute('/this/:route')
    it('matches valid routes', () => {
      expect(pathMathesRoute('/this/route', params)).toBe(true)
      expect(pathMathesRoute('/this/88282', params)).toBe(true)
      expect(pathMathesRoute('/this/_zzJSJS-sjsjjs282-jsj', params)).toBe(true)
    })

    it('doesnt match invalid routes', () => {
      expect(pathMathesRoute('/sthis/route', params)).toBe(false)
      expect(pathMathesRoute('s/this/route', params)).toBe(false)
      expect(pathMathesRoute('//this/route', params)).toBe(false)
      expect(pathMathesRoute('/this/', params)).toBe(false)
    })
  })
  describe('/:crazy/:route/:with/:lots', () => {
    const params = parseRoute('/:crazy/:route/:with/:lots')
    it('matches valid routes', () => {
      expect(pathMathesRoute('/this/route/aint/so', params)).toBe(true)
      expect(pathMathesRoute('/1/2/3/4', params)).toBe(true)
      expect(pathMathesRoute('/asdfj2/d88-ueeu/sasdf__/__', params)).toBe(true)
    })

    it('doesnt match invalid routes', () => {
      expect(pathMathesRoute('////', params)).toBe(false)
      expect(pathMathesRoute('//////', params)).toBe(false)
      expect(pathMathesRoute('/asdf/asdf/asdf/', params)).toBe(false)
      expect(pathMathesRoute('/asdf/asdf', params)).toBe(false)
      expect(pathMathesRoute('/t/asdf/asdf/asdf/sfdhis', params)).toBe(false)
    })
  })
})

describe('getPathParams', () => {
  describe('path with 4 params', () => {
    const route = parseRoute('/:crazy/:route/:with/:lots')
    it('works for 4 wildcards', () => {
      const params = getPathParams('/1/2/3/4', route)
      expect(params).toEqual({
        crazy: '1',
        route: '2',
        with: '3',
        lots: '4',
      })
    })
  })

  describe('path with 2 params', () => {
    const route = parseRoute('/:crazy/route/with/:lots')
    it('works for 2 wildcards', () => {
      const params = getPathParams('/1/route/with/4', route)
      expect(params).toEqual({
        crazy: '1',
        lots: '4',
      })
    })
  })
})
