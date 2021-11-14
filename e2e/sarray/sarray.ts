import { SortedArray } from '../../pkg/sarray/dist/'

const a = new SortedArray<number>((a, b) => a - b)

a.push(7)
a.push(2)

console.log([ ...a ])