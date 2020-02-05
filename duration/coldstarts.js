'use strict'
const AWS = require('aws-sdk')

module.exports.coldstarts = async event => {
  const snsParams = {
    TopicArn: process.env.STARTEDBYSNS,
    Message: 'Whatever'
  }
  let sns = new AWS.SNS()
  let promiseArr = []
  for (let step = 0; step < 20; step++) {
    promiseArr.push(sns.publish(snsParams).promise())
  }
  let result = await Promise.all(promiseArr)
  return true

}
