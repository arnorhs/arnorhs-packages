import bnch, { Bnch } from '../'

global.console = {
  ...console,
  log: jest.fn(),
}

const logCollector = () => {
  const items: string[] = []

  return {
    results() {
      return items
    },

    add(str: string) {
      items.push(str)
    },
  }
}

describe('instantiation', () => {
  describe('with class', () => {
    it('works', () => {
      expect(new Bnch()).toBeTruthy()
    })
  })

  describe('with factory', () => {
    it('works', () => {
      expect(bnch()).toBeTruthy()
    })
  })
})

describe('test run', () => {
  let bnch: Bnch
  const arr: string[] = new Array(12000)
  arr[12000] = 'mom'
  beforeEach(() => {
    bnch = new Bnch({
      beforeEach: () => arr.slice(0),
    })
  })

  describe('with 0 cases', () => {
    it('throws', () => {
      expect(() => bnch.run()).toThrow()
    })
  })

  describe('of 2 case', () => {
    it('runs', () => {
      bnch.add('indexOf', (arr) => {
        return (arr as string[]).indexOf('mom')
      })
      bnch.add('dumb search', (a) => {
        const arr = a as string[]
        for (let i = 0; i < arr.length; i++) {
          if (arr[i] === 'mom') {
            return i
          }
        }

        return -1
      })

      const { results, add } = logCollector()
      bnch.run(add)
      const res = results()
      expect(res[3]).toMatch(/indexOf: ([0-9\.]+) ops per second\. -- Fastest/)
      expect(res[4]).toMatch(/dumb search: ([0-9\.]+) ops per second\. -- ([0-9\.]+)% slower$/)
    })
  })
})
