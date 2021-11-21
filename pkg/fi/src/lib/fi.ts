import type { Cond, ValOrRet } from './helpers'
import { retOrCall } from './helpers'

interface Retter<T> {
  (): T
  else(val: ValOrRet<T>): Retter<T>
  elseif(cond: Cond, val: ValOrRet<T>): Retter<T>
}

const createRe = <T>(carry: T | undefined, cond: Cond, val: ValOrRet<T>): Retter<T> => {
  const f = function () {
    return carry ? carry : retOrCall(cond) ? retOrCall(val) : undefined
  }

  const z = new Re(retOrCall(cond) ? retOrCall(val) : carry)

  Object.assign(f, z)
  Object.setPrototypeOf(f, Re.prototype)

  return f as unknown as Retter<T>
}

class Re<T = any> {
  carry?: T

  constructor(carry: T | undefined) {
    this.carry = carry
  }

  else(val: ValOrRet<T>): Retter<T> {
    return createRe(this.carry, true, val)
  }

  elseif(cond: Cond, val: ValOrRet<T>): Retter<T> {
    return createRe(this.carry, cond, val)
  }
}

export const fi = <T>(cond: Cond, val: ValOrRet<T>): Retter<T> => {
  return createRe(undefined, cond, val)
}
