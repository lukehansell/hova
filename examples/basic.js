const hova = require('../lib/hova')

const myFunc = (a, b) => a + b
const validationFunc = (param) => typeof param === 'string'

const wrappedFunc = hova(myFunc, validationFunc, validationFunc)

console.log(wrappedFunc('a', 'b'))
console.log(wrappedFunc(1, 2))
