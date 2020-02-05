/* eslint-env mocha */
'use strict'

// tests for newUser
// Generated by serverless-mocha-plugin

const mochaPlugin = require('serverless-mocha-plugin')
const dirtyChai = require('dirty-chai')
mochaPlugin.chai.use(dirtyChai)
const expect = mochaPlugin.chai.expect
let wrapped = mochaPlugin.getWrapper('newUser', '../../../src/functions/newUser.js', 'newUser')
let AWS = require('aws-sdk-mock')
let AWS_SDK = require('aws-sdk')
AWS.setSDKInstance(AWS_SDK)

describe('newUser', () => {
  before((done) => {
    done()
  })

  it(' user does not exist', () => {
    let testObject = {
      username: 'testusername',
      age: 20,
      email: 'testemail@test.com',
      password: 'testpassword',
      first_name: 'testfirstname',
      last_name: 'testlastname'
    }
    AWS.mock('DynamoDB.DocumentClient', 'query', (params) => {
      return new Promise((resolve, reject) => {
        console.log('Reached query mock')
        resolve({
          Items: {}
        })
      })
    })
    AWS.mock('DynamoDB.DocumentClient', 'put', (params) => {
      return new Promise((resolve, reject) => {
        console.log('Reached put mock')
        resolve({})
      })
    })
    return wrapped.run({
      body: JSON.stringify(testObject)
    }).then((response) => {
      expect(response).to.not.be.empty()
      let responseObj = response
      console.log(responseObj)
      expect(responseObj.statusCode).to.equal(200)
      AWS.restore()
    })
  })

  it(' user does exist', () => {
    let testObject = {
      username: 'testusername',
      age: 20,
      email: 'testemail@test.com',
      password: 'testpassword',
      first_name: 'testfirstname',
      last_name: 'testlastname'
    }
    AWS.mock('DynamoDB.DocumentClient', 'query', (params) => {
      return new Promise((resolve, reject) => {
        console.log('Reached query mock')
        resolve({
          Items: [
            {
              username: 'testusername',
              age: 20,
              email: 'testemail@test.com',
              first_name: 'testfirstname',
              last_name: 'testlastname'
            }
          ]
        })
      })
    })

    return wrapped.run({
      body: JSON.stringify(testObject)
    }).then((response) => {
      expect(response).to.not.be.empty()
      let responseObj = response
      console.log(responseObj)
      expect(responseObj.statusCode).to.equal(409)
      AWS.restore()
    })
  })
})