import { sortBy } from './sortBy'

export class Collection<T extends { permalink: string }> {
  items: T[]

  constructor(items: T[]) {
    this.items = items
  }

  allItems(): T[] {
    return this.items.sort(sortBy('date', 'desc'))
  }

  findItem(permalink: string): T | undefined {
    // use lodash to find by field name:
    return this.items.find((post) => post.permalink === permalink)
  }
}
