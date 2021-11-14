const { SortedArray } = require('../../pkg/sarray/dist/')

const a = new SortedArray((a, b) => a - b)

a.push(7)
a.push(2)

console.log([ ...a ])