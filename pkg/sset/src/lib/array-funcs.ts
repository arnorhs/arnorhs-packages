import binSearch from 'binary-search'
import { Comparator } from '../types'

export const indexOf = <T>(arr: T[], cmp: Comparator<T>, item: T) => binSearch(arr, item, cmp)

export const addOne = <T>(arr: T[], cmp: Comparator<T>, item: T) => {
  const idx = indexOf(arr, cmp, item)
  const l = idx < 0 ? 0 : 1
  const x = idx < 0 ? -idx - 1 : idx
  arr.splice(x, l, item)
  return arr
}

export const addArray = <T>(arr: T[], cmp: Comparator<T>, items: T[]) => {
  for (let i = items.length - 1; i >= 0; i--) {
    addOne(arr, cmp, items[i])
  }
}
