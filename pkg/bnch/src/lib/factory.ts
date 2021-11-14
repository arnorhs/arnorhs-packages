import { BnchOptions } from './types'
import { Bnch } from './Bnch'

export const factory = (opts: BnchOptions = {}) => {
  return new Bnch(opts)
}
