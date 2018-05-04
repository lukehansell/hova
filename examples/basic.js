const hova = require('../lib/hova')

const myFunc = (a, b) => a + b
const validationFunc = (param) => typeof param === 'string'

const wrappedFunc = hova(myFunc, validationFunc, validationFunc)

console.log(wrappedFunc('a', 'b')) // 'ab'
console.log(wrappedFunc(1, 2)) // Error
