import { SortedArray } from './SortedArray'
import { ToStringable, Comparator } from './types'

export const sortedArrayFrom = <F extends ToStringable>(
  iterable: Iterable<F> | ArrayLike<F>,
  cmp?: Comparator<F>,
): SortedArray<F> => {
  const a = Array.from(iterable)
  const s = new SortedArray<F>(cmp)
  s.push(...a)
  return s
}
