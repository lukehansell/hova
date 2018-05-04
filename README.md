# HOVa

**Higher Order Validations**
Uses higher order pattern to add validation to your functions.

## Why?
Our functions should be small, simple and include only the logic required to complete their task. Unfortunately we can't always trust the data that we throw at our functions. Writing validation into the functions increases their size and complexity and dilutes the logic that they contain. Take the following example:

```
const sum = (foo, bar) => {
  if (typeof foo !== 'number') throw new Error()
  if (typeof bar !== 'number') throw new Error()
  return foo + bar
}

module.exports = sum
```

In this example we can already see how there is duplication and a dilution of the functions purpose. HOVa allows you to move the validation external to the functions body to make your code cleaner, more composable and more repeatable.

```
const hova = require('hova')

const isNumber = (param) => typeof param === 'number'

const sum = (foo, bar) => foo + bar

module.exports = hova(sum, isNumber, isNumber)
```

By doing this your functions are returned to only care about their required logic and your validation methods can be reused again and again. You can even import a validation library such as [validator](https://www.npmjs.com/package/validator) to take care of the validation functions for you.

```
const hova = require('hova')

const { isInt } = require('validator')

const sum = (foo, bar) => foo + bar

module.exports = hova(sum, isInt, isInt)
```

## how

### install
`npm install --save hova`

### use
```
const hova = require('hova')
const isNumber = (param) => typeof param === 'number'

const sum = (foo, bar) => foo + bar

const wrappedSum = hova(sum, isNumber, isNumber)

wrappedSum(1, 2) // 3
wrappedSum('foo', 'bar') // Error
```

| param | Description                       |
|-------|-----------------------------------|
| 0     | function to be wrapped            |
| 1...n | validation function for parameter |

The first parameter is the function to be wrapped. Any subsequent parameters are taken to be validation methods for the parameters passed to the wrapped function.

If a parameter does not pass the validation then an error will be thrown.
If a parameter is passed which does not have a validation method defined for it then a validation error will be thrown.
