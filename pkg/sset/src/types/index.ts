export type Comparator<T> = (a: T, b: T) => number

export interface ToStringable {
  toString: () => string
  toLocaleString: () => string
}
