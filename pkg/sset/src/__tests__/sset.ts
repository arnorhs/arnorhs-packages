import { sortedSetFromArray } from '../lib/sortedSetFromArray'
import { Comparator } from 'types'
import { SortedSet } from '../lib/SortedSet'

const testArrayCorrectness = <T>(
  g: () => SortedSet<T>,
  expectedLength: number = 0,
  expectedCmp?: Comparator<T>,
  expectedArray?: T[],
) => {
  it('should be an array', () => {
    expect(Array.isArray(g())).toBeTruthy()
  })

  it(`to have ${expectedLength} length`, () => {
    expect(g().length).toStrictEqual(expectedLength)
  })

  if (expectedCmp) {
    it('should have a comparator', () => {
      expect(g().getComparator()).toBe(expectedCmp)
    })
  }

  if (expectedArray) {
    it('is the same as a cloned array', () => {
      expect([...g()]).toStrictEqual(expectedArray)
    })
  }
}

describe('Object behaves like a normal array', () => {
  let ss: SortedSet<number>

  describe('empty arguments', () => {
    beforeEach(() => {
      ss = new SortedSet()
    })

    testArrayCorrectness(() => ss)
  })

  describe('empty array', () => {
    let ss: SortedSet<number>

    beforeEach(() => {
      ss = new SortedSet<number>()
      ss.push(...[])
    })

    testArrayCorrectness(() => ss, 0)
  })

  describe('array with an item', () => {
    let ss: SortedSet<number>,
      arr = [7777],
      arrCopy = arr.slice(0)
    beforeEach(() => {
      ss = new SortedSet()
      ss.push(...arr)
    })
    testArrayCorrectness(() => ss, 1, undefined, arrCopy)
  })

  describe('array with 3 items', () => {
    let ss: SortedSet<number>,
      arr = [1337, 7777, 999],
      arrCopy = arr.slice(0)
    beforeEach(() => {
      ss = new SortedSet()
      ss.push(...arr)
    })
    testArrayCorrectness(() => ss, 3, undefined, arrCopy)
  })
})

describe('SortedSet#push()', () => {
  describe('into [3,2,1,0] a value of', () => {
    let ss: SortedSet<number>,
      arr = [3, 2, 1, 0]

    beforeEach(() => {
      ss = new SortedSet()
      ss.push(...arr)
    })

    describe('7', () => {
      it('should be at the correct index', () => {
        ss.push(7)
        expect(ss.indexOf(7)).toBe(4)
      })
    })

    describe('-100', () => {
      it('should have index 0', () => {
        ss.push(-100)
        expect(ss.indexOf(-100)).toBe(0)
      })
    })

    describe('1.5', () => {
      it('should have index 2', () => {
        ss.push(1.5)

        expect(ss.indexOf(1.5)).toBe(2)
      })
    })

    describe('2', () => {
      it('should have index 2', () => {
        ss.push(2)
        expect(ss.indexOf(2)).toBe(2)
      })

      it('should replace exiting value', () => {
        ss.push(2)

        expect(ss.length).toBe(4)
      })
    })
  })
})

describe('SortedSet index reference', () => {
  const first = 1111,
    last = 2222

  describe('with a ordered list', () => {
    const ss = new SortedSet<number>()
    ss.push(...[first, last])

    it('should have the correct order', () => {
      expect(ss[0]).toBe(first)
      expect(ss[1]).toBe(last)
    })
  })

  describe('with an unordered list', () => {
    const ss = new SortedSet<number>()
    ss.push(...[last, first])

    it('should have the correct order', () => {
      expect(ss[0]).toBe(first)
      expect(ss[1]).toBe(last)
    })
  })
})

describe('sortedSetFromArray', () => {
  let ss: SortedSet<number>,
    arr = [1337, 7777, 999],
    arrCopy = arr.slice(0)

  beforeEach(() => {
    ss = sortedSetFromArray<number>(arr)
    ss.push(...arr)
  })

  testArrayCorrectness(() => ss, 3, undefined, arrCopy)
})
