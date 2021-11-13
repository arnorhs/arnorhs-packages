import { countingSort } from '../countingsort'

describe('sorting', () => {
  let unsorted: number[]
  let sorted: number[]
  const min = 0
  const max = 100

  beforeEach(() => {
    // create an array
    unsorted = []

    for (var i = 0; i < 20; i++) {
      unsorted.push((Math.random() * max) << 0)
    }

    sorted = unsorted.slice(0)
    sorted.sort((a, b) => a - b)
  })

  describe('an array', function () {
    it('should be sorted correctly', () => {
      countingSort(unsorted, min, max)
      expect(unsorted).toEqual(sorted)
    })
  })

  describe('an empty array', () => {
    it('should be sorted correctly', () => {
      const empty: number[] = []

      countingSort(empty, min, max)

      expect(empty).toEqual([])
    })
  })
})
