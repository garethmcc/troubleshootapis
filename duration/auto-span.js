'use strict'
const uuidv4 = require('uuid/v4')
const AWS = require('aws-sdk')

module.exports.autospan = async event => {
  const putParams = {
    TableName: process.env.DYNAMODB_TABLE,
    Item: {
      uuid:uuidv4()
    }
  }
  console.log(putParams)
  let dynamo = new AWS.DynamoDB.DocumentClient()
  for (let step = 0; step < 20; step++) {
    let putParams = {
      TableName: process.env.DYNAMODB_TABLE,
      Item: {
        uuid:uuidv4()
      }
    }
    await dynamo.put(putParams).promise()
  }
  let promiseArr = []
  for (let step = 0; step < 20; step++) {
    let putParams = {
      TableName: process.env.DYNAMODB_TABLE,
      Item: {
        uuid:uuidv4()
      }
    }
    promiseArr.push(dynamo.put(putParams).promise())
  }
  let result = await Promise.all(promiseArr)
}
