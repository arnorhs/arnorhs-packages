import { fi, ternary } from '../../pkg/fi/dist'

console.log(fi(true, 'yo').ret(), ternary(false, 'yo', 'jaja').ret())
