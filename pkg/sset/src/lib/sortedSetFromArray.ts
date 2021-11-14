import { SortedSet } from './SortedSet'
import { ToStringable, Comparator } from '../types'

export const sortedSetFromArray = <F extends ToStringable>(
  iterable: Iterable<F> | ArrayLike<F>,
  cmp?: Comparator<F>,
): SortedSet<F> => {
  const a = Array.from(iterable)
  const s = new SortedSet<F>(cmp)
  s.push(...a)
  return s
}
