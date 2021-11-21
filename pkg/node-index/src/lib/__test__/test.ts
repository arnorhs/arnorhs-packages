import { Index } from '../Index'

const getIndex = () => {
  const index = new Index()

  index.addDocument('asdf', {
    field1: 'asdf qwerty rock',
    field2: 'qwerty asdf',
  })
  index.addDocument('lol', {
    field1: 'i dream in shadows',
    field2: 'qwerty shadows',
  })
  index.addDocument('rofl', {
    field1: 'the flock of madness chases me',
    field2: 'asdf shadow',
  })

  return index
}

describe('Indexing asdf', () => {
  it('should not result in an error', () => {
    getIndex()
  })
})

describe("Searching for 'qwerty'", () => {
  it('should return correct search results', () => {
    const index = getIndex()
    const results = index.query('qwerty')
    expect(results.length).toBe(2)
    expect(results[0].key === 'asdf')
    expect(results[1].key).toBe('lol')
  })
})
