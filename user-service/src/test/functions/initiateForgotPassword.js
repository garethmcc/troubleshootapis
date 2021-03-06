/* eslint-env mocha */
'use strict'

// tests for initiateForgotPassword
// Generated by serverless-mocha-plugin

const mochaPlugin = require('serverless-mocha-plugin')
const dirtyChai = require('dirty-chai')
mochaPlugin.chai.use(dirtyChai)
const expect = mochaPlugin.chai.expect
let wrapped = mochaPlugin.getWrapper('initiateForgotPassword', '../../../src/functions/initiateForgotPassword.js', 'initiateForgotPassword')
let AWS = require('aws-sdk-mock')
let AWS_SDK = require('aws-sdk')
AWS.setSDKInstance(AWS_SDK)
process.env.DYNAMODB_FORGOTPASSWORD_TABLE = 'passwordtable'
process.env.DYNAMODB_USER_TABLE = 'usertables'

describe('initiateForgotPassword', () => {
  before((done) => {
    done()
  })

  it('implement tests here', () => {
    AWS.mock('DynamoDB.DocumentClient', 'put', (params) => {
      return new Promise((resolve, reject) => {
        resolve({})
      })
    })
    AWS.mock('DynamoDB.DocumentClient', 'query', (params) => {
      console.log('query params', params)
      return new Promise((resolve, reject) => {
        resolve({
          Items: [{
            username: 'ausername',
            first_name: 'firstname',
            last_name: 'lastname',
            email: 'email@address.com',
            age: 21,
            password: 'ahashpassword'
          }]
        })
      })
    })
    AWS.mock('SNS', 'publish', params => {
      console.log('sns params', params)
      return new Promise((resolve, reject) => {
        resolve({
          MessageId: 'anidhere'
        })
      })
    })
    return wrapped.run({
      pathParameters: {
        username: 'ausername'
      }
    }).then((response) => {
      console.log('response', response)
      expect(response).to.not.be.empty()
    })
  })
})
