import { arrToCases, Case, objSwitchToCases, SwKey, ValOrRet } from './helpers'
import { retOrCall } from './helpers'

export const sw = function <T>(
  cond: ValOrRet<T | string>,
  arr: (ValOrRet<T | string> | string)[] | Record<string, ValOrRet<T>>,
) {
  return new Sw(cond, Array.isArray(arr) ? arrToCases(arr) : objSwitchToCases(arr))
}

class Sw<T> {
  cond: ValOrRet<T | string>
  switches: Case<T>[]

  constructor(cond: ValOrRet<T | string>, switches: Case<T>[]) {
    this.cond = cond
    this.switches = switches
  }

  ret() {
    const cond = retOrCall(this.cond)

    let cs: Case<T> | undefined = this.switches.find((x: Case<T>) => {
      return retOrCall(x.key) === cond
    })

    if (cs === undefined) {
      cs = this.switches.find((x) => retOrCall(x.key) === 'default')
    }

    return cs ? retOrCall(cs.val) : undefined
  }
}
