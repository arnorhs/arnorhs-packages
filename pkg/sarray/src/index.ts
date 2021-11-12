function SortedArray(arr, cmp) {
  return SortedSet.call(this, arr, cmp)
}

util.inherits(SortedArray, SortedSet)

/*
 * Add items to the array
 *
 * returns the index of the item inserted
 */

export const sortedArray = (arr, cmp) => new SortedArray(arr, cmp)

export { SortedArray }
