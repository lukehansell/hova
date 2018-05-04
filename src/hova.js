const isValid = (func, value) => typeof func === 'undefined' || func(value)

const buildValidationError = (index, value) => new Error(`Value ${value} for parameter ${index} does not pass parameter validation.`)

const buildCountError = (name) => new Error(`Validation not provided for all parameters passed to ${name}.`)

module.exports = (wrappedFunction, ...validations) => (...params) => {
  if (params.length > validations.length) throw buildCountError(wrappedFunction.name)

  validations.forEach((validation, i) => {
    const param = params[i]
    if (!isValid(validation, param)) throw buildValidationError(i, param)
  })

  return wrappedFunction(...params)
}
