'use strict';
const AWS = require('aws-sdk')
const uuidv4 = require('uuid/v4')

module.exports.logging = async event => {

  const putParams = {
    TableName: 'DoesNotExist',
    Item: {
      id: uuidv4()
    }
  }
  try {
    let dynamodb = new AWS.DynamoDB.DocumentClient()
    await dynamodb.put(putParams).promise()
  } catch (putError) {
    console.log('There was an error adding data to table')
    console.log('putError', putError)
    console.log('putParams', putParams)
    return new Error('There was an error adding data to table')
  }

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

