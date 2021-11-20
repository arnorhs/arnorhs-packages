import introsort from '..'

const test = [4, 2, 10, 8282, 338, 228, 550, 328, 969, 2828, 1010, 292, 84, 28, 3]
const expected = test.slice(0).sort((a, b) => a - b)

describe('sorting an array', () => {
  it('should sort correctly', () => {
    const sorted = test.slice(0)
    introsort(sorted)

    expect(sorted).toEqual(expected)
  })
})
