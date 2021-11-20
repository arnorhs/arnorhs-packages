export type ValOrRet<T> = T | (() => T)

export const retOrCall = <T>(value: ValOrRet<T>): T => (value instanceof Function ? value() : value)

export type Cond = ValOrRet<boolean>

export type SwKey = ValOrRet<string>

export interface Case<T> {
  key: ValOrRet<T | string>
  val: ValOrRet<T | string>
}

export const objSwitchToCases = <T>(obj: Record<string, ValOrRet<T | string>>): Case<T>[] => {
  if (Object.keys(obj).length === 0) {
    return []
  }

  const cases: Case<T>[] = []
  let def: ValOrRet<T | string> | undefined

  for (const k in obj) {
    if (obj.hasOwnProperty(k)) {
      if (k === 'default') {
        def = obj[k]
      } else {
        cases.push({
          key: k,
          val: obj[k],
        })
      }
    }
  }

  if (def !== undefined) {
    cases.push({
      key: 'default',
      val: def,
    })
  }

  return cases
}

export const arrToCases = <T = string>(arr: ValOrRet<T | string>[]) => {
  const cases: Case<T>[] = []

  for (let i = 0; i < arr.length - 1; i += 2) {
    cases.push({
      key: arr[i],
      val: arr[i + 1],
    })
  }

  // if the last argument is alone, it's considered the default:
  if (arr.length % 2) {
    cases.push({
      key: 'default',
      val: arr[arr.length - 1],
    })
  }

  return cases
}
