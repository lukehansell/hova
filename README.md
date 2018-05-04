# HOVa

## Higher Order Validations
Uses higher order pattern to add validation to your functions.

Keep your functions simple and validation of inputs separate and compose-able.

### install
`npm i -S hova`

### use
```
const hova = require('hova')
const isNumber = (param) => typeof param === 'number'

const sum = (foo, bar) => foo + bar

const wrappedSum = hova(sum, isNumber, isNumber)

wrappedSum(1, 2) // 3
wrappedSum('foo', 'bar') // Error
```
