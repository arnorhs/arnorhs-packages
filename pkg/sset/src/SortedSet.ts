import { addArray, indexOf } from './lib/array-funcs'
import { Comparator, ToStringable } from './types'

const getDefaultComparator =
  (): Comparator<ToStringable> =>
  (a: Object, b: Object): number => {
    const aa = a.toLocaleString()
    const bb = b.toLocaleString()

    return aa.localeCompare(bb)
  }

export class SortedSet<T extends ToStringable> extends Array<T> {
  cmp: Comparator<T>

  constructor(cmp: Comparator<T> = getDefaultComparator()) {
    super()
    this.cmp = cmp
  }

  public getComparator(): Comparator<T> {
    return this.cmp
  }

  public indexOf(item: T): number {
    return indexOf(this, this.cmp, item)
  }

  public push(...items: T[]): number {
    addArray(this, this.cmp, items)
    return this.length
  }

  static fromArray<F extends ToStringable>(
    iterable: Iterable<F> | ArrayLike<F>,
    cmp: Comparator<F>,
  ): SortedSet<F> {
    const a = Array.from(iterable)
    const s = new SortedSet<F>(cmp)
    s.push(...a)
    return s
  }
}
