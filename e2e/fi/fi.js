const { fi, ternary } = require('../../pkg/fi/dist/')

console.log(fi(true, 'yo')(), ternary(false, 'yo', 'jaja'))
