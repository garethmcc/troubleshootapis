'use strict';
const AWS = require('aws-sdk')
const uuidv4 = require('uuid/v4')

module.exports.nocatch = async event => {

  const putParams = {
    TableName: 'DoesNotExist',
    Item: {
      id: uuidv4()
    }
  }
  let dynamodb = new AWS.DynamoDB.DocumentClient()
  await dynamodb.put(putParams).promise()

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Go Serverless v1.0! Your function executed successfully!',
        input: event,
      },
      null,
      2
    ),
  };

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};

