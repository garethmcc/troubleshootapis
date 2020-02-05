'use strict'
const User = require('../lib/User.class')
const uuidv4 = require('uuid/v4')
const AWS = require('aws-sdk')

module.exports.initiateForgotPassword = async (event, context) => {
  const username = event.pathParameters.username
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
  const passToken = uuidv4()
  const putParams = {
    TableName: process.env.DYNAMODB_FORGOTPASSWORD_TABLE,
    Item: {
      uuid: passToken,
      username: username,
      timeout: Math.floor(Date.now() / 1000) + 300
    }
  }
  let putResult = {}
  try {
    const dynamodb = new AWS.DynamoDB.DocumentClient()
    putResult = await dynamodb.put(putParams).promise()
  } catch (putError) {
    console.log('There was an error creating the forgot password token')
    console.log('putError', putError)
    console.log('putParams', putParams)
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Headers': 'Authorization'
      }
    }
  }

  if (putResult !== null) {
    const UserEntity = await UserObj.getUser(username)
    const publishNotification = {
      Message: JSON.stringify({
        email: UserEntity.email,
        first_name: UserEntity.first_name,
        last_name: UserEntity.last_name,
        token: passToken
      }),
      TopicArn: process.env.SNS_FORGOTPASSWORD_TOPICARN
    }
    let publishResult = {}
    try {
      const sns = new AWS.SNS()
      publishResult = await sns.publish(publishNotification).promise()
    } catch (publishError) {
      console.log('There was an error publishing the forgot password notification')
      console.log('publishError', publishError)
      console.log('publishNotification', publishNotification)
      return {
        statusCode: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
          'Access-Control-Allow-Headers': 'Authorization'
        }
      }
    }

    console.log('publishResult', publishResult)
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
