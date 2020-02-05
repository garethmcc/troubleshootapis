'use strict'
const AWS = require('aws-sdk')

module.exports.sendForgotPasswordMail = async (event, context) => {
  if (typeof event.Records === 'undefined' ||
  !Array.isArray(event.Records) ||
  event.Records.length === 0 ||
  event.Records.length > 1) {
    console.log('Event object does not contain valid message')
    console.log('event', event)
    return new Error('Event object does not contain valid message')
  }
  let messageParams = null
  try {
    messageParams = JSON.parse(event.Records[0].Sns.Message)
  } catch (jsonError) {
    console.log('There was an error parsing the object')
    console.log('jsonError', jsonError)
    console.log('event.Records[0]', event.Records[0])
    return new Error('There was an error parsing the object')
  }
  if (messageParams === null) {
    console.log('There was an error parsing the object')
    console.log('event.Records[0]', event.Records[0])
    return new Error('There was an error parsing the object')
  }

  if (typeof messageParams.email === 'undefined' ||
    typeof messageParams.first_name === 'undefined' ||
    typeof messageParams.last_name === 'undefined' ||
    typeof messageParams.token === 'undefined') {
    console.log('The message does not contain required parameters for sending mail')
    console.log('messageParams', messageParams)
    return new Error('The message does not contain required parameters for sending mail')
  }

  const publishNotification = {
    Message: JSON.stringify({
      toAddress: messageParams.email,
      substitutions: {
        firstname: messageParams.first_name,
        lastname: messageParams.last_name,
        token: messageParams.token
      }
    }),
    TopicArn: process.env.SNS_SENDMAIL_TOPICARN,
    Subject: 'resetPassword'
  }
  try {
    const sns = new AWS.SNS()
    await sns.publish(publishNotification).promise()
  } catch (publishError) {
    console.log('There was an error attempting to send email')
    console.log('publishError', publishError)
    console.log('publishNotification', publishNotification)
    return new Error('There was an error attempting to send email')
  }
}
