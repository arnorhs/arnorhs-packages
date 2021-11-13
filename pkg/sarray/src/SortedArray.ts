import { SortedSet, Comparator } from 'sset'

class SortedArray<T> extends SortedSet<T> {
  public push(...items: T[]): number {
    for (let i = items.length - 1; i >= 0; i--) {
      addOne(this, items[i])
    }

    return this.length
  }
}

export const addOne = <T>(arr: SortedArray<T>, item: T) => {
  const idx = arr.indexOf(item)
  const x = idx < 0 ? -idx - 1 : idx
  arr.splice(x, 0, item)
  return arr
}
