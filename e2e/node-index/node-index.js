const { Index } = require('../../pkg/node-index/dist/')

console.log(new Index().addDocument('yo', { kitten: 'says mewo' }))
