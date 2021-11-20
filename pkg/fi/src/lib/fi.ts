import type { Cond, ValOrRet } from './helpers'
import { retOrCall } from './helpers'

export const fi = function <T>(cond: Cond, val: ValOrRet<T>): Statement<T> {
  return new Statement(cond, val)
}

export class Statement<T> {
  cond: boolean
  val: T

  constructor(cond: Cond, val: ValOrRet<T>) {
    this.cond = retOrCall(cond)
    this.val = retOrCall(val)
  }

  else(val: ValOrRet<T>) {
    if (this.cond) {
      return this
    }

    this.cond = true
    this.val = retOrCall(val)

    return this
  }

  elseif(cond: ValOrRet<boolean>, val: ValOrRet<T>) {
    if (this.cond) {
      return this
    }
    this.cond = retOrCall(cond)
    this.val = retOrCall(val)
    return this
  }

  ret() {
    if (this.cond) {
      return this.val
    }
  }
}
