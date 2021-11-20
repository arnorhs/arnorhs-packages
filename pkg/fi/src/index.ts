import { sw } from './lib/switch'
import { ternary } from './lib/ternary'
import { fi } from './lib/fi'

const x = fi as any
x.sw = sw
x.ternary = ternary

export default x
