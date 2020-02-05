'use strict'
const User = require('../lib/User.class')

module.exports.checkUsername = async (event, context) => {
  const username = event.pathParameters.username
  if (username.length > 16) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: 'Username is too long. 16 character maximum'
      })
    }
  }
  let UserInstance = new User()
  if (await UserInstance.userExists(username)) {
    return {
      statusCode: 200
    }
  }
  return {
    statusCode: 404
  }
}
