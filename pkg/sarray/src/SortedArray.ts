import SortedSet from 'sset'

class SortedArray extends SortedSet {
  addOne(item) {
    var idx = this.indexOf(item),
      x = idx < 0 ? -idx - 1 : idx
    this.items.splice(x, 0, item)
    return x
  }
}
