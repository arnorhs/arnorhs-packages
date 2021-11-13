import { Comparator } from 'sset'
import { SortedArray } from '../SortedArray'

const testArrayCorrectness = <T>(
  g: () => SortedArray<T>,
  expectedLength: number = 0,
  expectedCmp?: Comparator<T>,
  expectedArray?: T[],
) => {
  it('should be an array', function () {
    expect(Array.isArray(g())).toBeTruthy()
  })

  it(`to have ${expectedLength} length`, function () {
    expect(g().length).toStrictEqual(expectedLength)
  })

  if (expectedCmp) {
    it('should have a comparator', function () {
      expect(g().getComparator()).toBe(expectedCmp)
    })
  }

  if (expectedArray) {
    it('is the same as a cloned array', () => {
      expect([...g()]).toStrictEqual(expectedArray)
    })
  }
}

describe('Object behaves like a normal array', function () {
  let ss: SortedArray<number>

  describe('empty arguments', function () {
    beforeEach(function () {
      ss = new SortedArray()
    })

    testArrayCorrectness(() => ss)
  })

  describe('empty array', function () {
    let ss: SortedArray<number>

    beforeEach(function () {
      ss = new SortedArray<number>()
      ss.push(...[])
    })

    testArrayCorrectness(() => ss, 0)
  })

  describe('array with an item', function () {
    let ss: SortedArray<number>,
      arr = [7777],
      arrCopy = arr.slice(0)
    beforeEach(function () {
      ss = new SortedArray()
      ss.push(...arr)
    })
    testArrayCorrectness(() => ss, 1, undefined, arrCopy)
  })

  describe('array with 3 items', function () {
    let ss: SortedArray<number>,
      arr = [1337, 7777, 999],
      arrCopy = arr.slice(0)
    beforeEach(() => {
      ss = new SortedArray()
      ss.push(...arr)
    })
    testArrayCorrectness(() => ss, 3, undefined, arrCopy)
  })
})

describe('SortedArray#push()', function () {
  describe('into [3,2,1,0] a value of', function () {
    let ss: SortedArray<number>,
      arr = [3, 2, 1, 0]

    beforeEach(() => {
      ss = new SortedArray()
      ss.push(...arr)
    })

    describe('7', () => {
      it('should be at the correct index', () => {
        ss.push(7)
        expect(ss.indexOf(7)).toBe(4)
      })
    })

    describe('-100', function () {
      it('should have index 0', function () {
        ss.push(-100)
        expect(ss.indexOf(-100)).toBe(0)
      })
    })

    describe('1.5', function () {
      it('should have index 2', function () {
        ss.push(1.5)

        expect(ss.indexOf(1.5)).toBe(2)
      })
    })

    describe('2', () => {
      it('should have index 2', () => {
        ss.push(2)
        expect(ss.indexOf(2)).toBe(2)
      })

      it('should not replace exiting value', () => {
        ss.push(2)

        expect(ss.length).toBe(5)
      })
    })
  })
})

describe('SortedArray index reference', () => {
  const first = 1111,
    last = 2222

  describe('with a ordered list', () => {
    const ss = new SortedArray<number>()
    ss.push(...[first, last])

    it('should have the correct order', () => {
      expect(ss[0]).toBe(first)
      expect(ss[1]).toBe(last)
    })
  })

  describe('with an unordered list', () => {
    const ss = new SortedArray<number>()
    ss.push(...[last, first])

    it('should have the correct order', () => {
      expect(ss[0]).toBe(first)
      expect(ss[1]).toBe(last)
    })
  })
})
