const { fi, ternary } = require('../../pkg/fi/dist/')

console.log(fi(true, 'yo').ret(), ternary(false, 'yo', 'jaja').ret())
