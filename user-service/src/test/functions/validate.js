/* eslint-env mocha */
'use strict'

// tests for validate
// Generated by serverless-mocha-plugin

const mochaPlugin = require('serverless-mocha-plugin')
const dirtyChai = require('dirty-chai')
mochaPlugin.chai.use(dirtyChai)
const expect = mochaPlugin.chai.expect
let wrapped = mochaPlugin.getWrapper('validate', '../../../src/functions/validate.js', 'validate')
let AWS = require('aws-sdk-mock')
let AWS_SDK = require('aws-sdk')
AWS.setSDKInstance(AWS_SDK)

describe('validate', () => {
  before((done) => {
    done()
  })

  it('implement tests here', () => {
    return wrapped.run({}).then((response) => {
      expect(response).to.not.be.empty()
    })
  })
})