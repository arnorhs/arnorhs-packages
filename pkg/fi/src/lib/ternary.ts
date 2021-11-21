import { Cond, retOrCall, ValOrRet } from './helpers'

export const ternary = function <Z>(cond: Cond, a: ValOrRet<Z>, b: ValOrRet<Z>) {
  return retOrCall(cond) ? retOrCall(a) : retOrCall(b)
}
