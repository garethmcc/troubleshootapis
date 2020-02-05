'use strict'
const AWS = require('aws-sdk')
const bcrypt = require('bcryptjs')
const User = require('../lib/User.class')

module.exports.newUser = async (event, context) => {

  const body = JSON.parse(event.body)
  const username = body.username
  const email = body.email
  const password = body.password
  const firstName = body.first_name || '(none)'
  const lastName = body.last_name || '(none)'
  const age = body.age
  // Check if user exists
  let UserInstance = new User()
  if (await UserInstance.userExists(username)) {
    console.log('User already exists. Exiting')
    console.log('username', username)
    if (context.hasOwnProperty('serverlessSdk')) {
      context.serverlessSdk.captureError('User already exists.')
    }
    return {
      statusCode: 409,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Headers': 'Authorization'
      }
    }
  }

  // Create user
  const putParams = {
    TableName: process.env.DYNAMODB_USER_TABLE,
    Item: {
      username: username,
      username_created_at: username + '|' + Date.now(),
      password: bcrypt.hashSync(password, parseInt(process.env.PASSWORD_SALT_ROUNDS)),
      email: email,
      first_name: firstName,
      last_name: lastName,
      age: age
    }
  }
  let putResult = {}
  try {
    const dynamodb = new AWS.DynamoDB.DocumentClient()
    putResult = await dynamodb.put(putParams).promise()
  } catch (putError) {
    console.log('There was an error attempting to put the user')
    console.log('putError', putError)
    console.log('putParams', putParams)
    if (context.hasOwnProperty('serverlessSdk')) {
      context.serverlessSdk.captureError('There was an error attempting to put the user.')
      return {
        statusCode: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
          'Access-Control-Allow-Headers': 'Authorization'
        }
      }
    } else {
      return putError
    }
  }

  if (putResult === null) {
    console.log('Could not put user')
    console.log('putParams', putParams)
    if (context.hasOwnProperty('serverlessSdk')) {
      context.serverlessSdk.captureError('Could not put the user')
    }
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Headers': 'Authorization'
      }
    }
  }
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
      'Access-Control-Allow-Headers': 'Authorization'
    }
  }
}
