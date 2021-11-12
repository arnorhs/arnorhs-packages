import SortedArray from '../'
import assert from 'assert'

// check that sorting is correct after adding random items
// check that sorting is correct
describe('inserting', function () {
  describe('into 3,2,2,0 a value of', function () {
    var ss
    beforeEach(function () {
      ss = SortedArray([3, 2, 2, 0])
    })
    describe('7', function () {
      it('should have index 4', function () {
        ss.add(7)
        insertAssert(ss.indexOf(7), 4)
      })
    })
    describe('-100', function () {
      it('should have index 0', function () {
        ss.add(-100)
        insertAssert(ss.indexOf(-100), 0)
      })
    })
    describe('1.5', function () {
      it('should have index 1', function () {
        ss.add(1.5)
        insertAssert(ss.indexOf(1.5), 1)
      })
    })
    describe('2', function () {
      it('should have index between 1-2 inclusive', function () {
        ss.add(2)
        var idx = ss.indexOf(2)
        assert(idx >= 1 && idx <= 2, 'Inserted value is not in the right position: ' + idx)
        assert(ss.items.length === 5, 'Inserted value is not the correct length')
      })
    })
  })
})

var insertAssert = function (value, expected) {
  assert(
    value === expected,
    'Was not inserted correctly, expected: ' + expected + ', but was: ' + value,
  )
}
