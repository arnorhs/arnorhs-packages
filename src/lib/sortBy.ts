export function sortBy<T extends Record<string, unknown>>(field: string, direction = 'asc') {
  const dir = direction === 'asc' ? 1 : -1

  return (a: T, b: T) => {
    const av = a[field]
    const bv = b[field]

    const type = typeof av

    if (type !== typeof bv) {
      throw new TypeError(
        'all fields of the same name passed into orderBy ' + 'must be of the same type',
      )
    }

    if (type === 'number') {
      return ((av as number) - (bv as number)) * dir
    }

    if (type === 'string') {
      return (av as string).localeCompare(bv as string) * dir
    }

    if (av instanceof Date) {
      return ((av as Date).getTime() - (bv as Date).getTime()) * dir
    }

    throw new TypeError(
      `orderby - only string and number values are supported, got '${JSON.stringify(av)}'`,
    )
  }
}
