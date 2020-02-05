/* eslint-env mocha */
'use strict'

// tests for getUser
// Generated by serverless-mocha-plugin

const mochaPlugin = require('serverless-mocha-plugin')
const dirtyChai = require('dirty-chai')
mochaPlugin.chai.use(dirtyChai)
const expect = mochaPlugin.chai.expect
let wrapped = mochaPlugin.getWrapper('getUser', '../../../src/functions/getUser.js', 'getUser')
let AWS = require('aws-sdk-mock')
let AWS_SDK = require('aws-sdk')
AWS.setSDKInstance(AWS_SDK)

describe('getUser', () => {
  before((done) => {
    done()
  })

  it('implement tests here', () => {
    return wrapped.run({}).then((response) => {
      expect(response).to.not.be.empty()
    })
  })
})
