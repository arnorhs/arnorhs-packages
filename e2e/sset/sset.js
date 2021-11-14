const { SortedSet } = require('../../pkg/sset/dist/')

const a = new SortedSet((a, b) => a - b)

a.push(7)
a.push(7)
a.push(1)
a.push(7)

console.log([ ...a ])