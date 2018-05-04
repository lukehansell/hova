const chai = require('chai')
const sinonChai = require('sinon-chai')
chai.use(sinonChai)

const expect = chai.expect
const sinon = require('sinon')

const h = require('./hova')

describe('hover', function () {
  it('returns a function', function () {
    const func = sinon.stub()
    expect(h(func)).to.be.a('function')
  })

  it('calls the internal function with the passed arguments', function () {
    const func = sinon.stub()
    const wrappedFunc = h(func)
    func('foo', 'bar')
    expect(func).to.have.been.calledWith('foo', 'bar')
  })

  describe('when passed validation method', function () {
    beforeEach(function () {
      const func = (param) => param
      const validationMethod = (value) => (value === 'foo')
      this.wrappedFunc = h(func, validationMethod)
    })

    describe('when validation passes', function () {
      it('returns the result of the wrapped function', function () {
        expect(this.wrappedFunc('foo')).to.equal('foo')
      })
    })

    describe('when validation fails', function () {
      it('throws an error', function () {
        expect(() => this.wrappedFunc('bar')).to.throw('Value bar for parameter 0 does not pass parameter validation.')
      })
    })
  })

  describe('when passed multiple validation methods', function () {
    beforeEach(function () {
      const func = (param) => param
      const validationMethod = (value) => (value === 'foo')
      this.wrappedFunc = h(func, validationMethod, validationMethod, validationMethod)
    })

    describe('when validation passes', function () {
      it('returns the result of the wrapped function', function () {
        expect(this.wrappedFunc('foo', 'foo', 'foo')).to.equal('foo')
      })
    })

    describe('when validation fails', function () {
      it('throws an error', function () {
        expect(() => this.wrappedFunc('foo', 'bar', 'foo')).to.throw('Value bar for parameter 1 does not pass parameter validation.')
      })
    })
  })

  describe('when passed more params than validation methods', function () {
    beforeEach(function () {
      const func = (param) => param
      const validationMethod = (value) => (value === 'foo')
      this.wrappedFunc = h(func, validationMethod)
    })

    it('thows an error', function () {
      expect(() => this.wrappedFunc('foo', 'foo', 'foo')).to.throw('Validation not provided for all parameters passed to func.')
    })
  })
})
