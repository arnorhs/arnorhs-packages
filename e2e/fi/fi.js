const fi = require('../../pkg/fi/dist/')

console.log(fi(true, 'yo').ret(), fi.ternary(false, 'yo', 'jaja').ret())