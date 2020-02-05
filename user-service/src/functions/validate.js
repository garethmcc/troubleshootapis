'use strict'

module.exports.validate = async (event, context) => {
  let authArr = event.authorizationToken.split(' ')
  let token = authArr[authArr.length - 1]
  if (token === 'FAIL') {
    return generatePolicy('unknown', 'Deny', event.methodArn)
  } else {
    return generatePolicy('unknown', 'Allow', event.methodArn)
  }
}

const generatePolicy = function (principalId, effect, resource) {
  var authResponse = {}

  authResponse.principalId = principalId
  if (effect && resource) {
    var policyDocument = {}
    policyDocument.Version = '2012-10-17' // default version
    policyDocument.Statement = []
    var statementOne = {}
    statementOne.Action = 'execute-api:Invoke' // default action
    statementOne.Effect = effect
    statementOne.Resource = resource
    policyDocument.Statement[0] = statementOne
    authResponse.policyDocument = policyDocument
  }
  console.log('authResponse', authResponse)
  return authResponse
}
