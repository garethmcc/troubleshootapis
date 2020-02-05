'use strict'
const User = require('../lib/User.class')

module.exports.checkEmail = async (event, context) => {
  const email = event.pathParameters.email
 
  let UserInstance = new User()
  if (await UserInstance.userEmailExists(email)) {
    return {
      statusCode: 200
    }
  }
  return {
    statusCode: 404
  }
}
