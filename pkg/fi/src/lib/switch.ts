import { arrToCases, Case, objSwitchToCases, SwKey, ValOrRet } from './helpers'
import { retOrCall } from './helpers'

export const sw = function <T>(
  condition: ValOrRet<T | string>,
  arr: (ValOrRet<T | string> | string)[] | Record<string, ValOrRet<T>>,
) {
  const switches: Case<T>[] = Array.isArray(arr) ? arrToCases(arr) : objSwitchToCases(arr)

  const cond = retOrCall(condition)

  let cs: Case<T> | undefined = switches.find((x: Case<T>) => {
    return retOrCall(x.key) === cond
  })

  if (cs === undefined) {
    cs = switches.find((x) => retOrCall(x.key) === 'default')
  }

  return cs ? retOrCall(cs.val) : undefined
}
