import { Cond, retOrCall, ValOrRet } from './helpers'

export const ternary = function <Z>(cond: Cond, a: ValOrRet<Z>, b: ValOrRet<Z>) {
  return new Ternary(cond, a, b)
}

class Ternary<T> {
  cond: Cond
  a: ValOrRet<T>
  b: ValOrRet<T>

  constructor(cond: Cond, a: ValOrRet<T>, b: ValOrRet<T>) {
    this.cond = cond
    this.a = a
    this.b = b
  }

  ret() {
    return retOrCall(this.cond) ? retOrCall(this.a) : retOrCall(this.b)
  }
}
