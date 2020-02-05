'use strict'
const User = require('../lib/User.class')
const jwt = require('jsonwebtoken')

module.exports.authenticate = async (event, context) => {
  const body = JSON.parse(event.body)
  const username = body.username
  const password = body.password
  const UserObj = new User()
  if (!await UserObj.userExists(username)) {
    return {
      statusCode: 404,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Headers': 'Authorization'
      }
    }
  }
  if (await UserObj.authenticate(username, password)) {
    const tokenPayload = {
      username: username,
      scope: {}
    }
    let token = jwt.sign(tokenPayload, process.env.JWT_SECRET)
    return {
      statusCode: 200,
      body: JSON.stringify({
        token: token
      }),
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Headers': 'Authorization'
      }
    }
  } else {
    return {
      statusCode: 404,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Headers': 'Authorization'
      }
    }
  }
}
