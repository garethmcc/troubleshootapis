'use strict';

module.exports.capturespans = async event => {
  await context.serverlessSdk.span('HASH13', async () => {
    return new Promise((resolve, reject) => {
      bcrypt.hash("anotherstring", 13, () => {
        resolve()
      })
    })
  })
  await context.serverlessSdk.span('HASH10', async () => {
    return new Promise((resolve, reject) => {
      bcrypt.hash("anotherstring", 10, () => {
        resolve()
      })
    })
  })
  await context.serverlessSdk.span('HASH6', async () => {
    return new Promise((resolve, reject) => {
      bcrypt.hash("anotherstring", 6, () => {
        resolve()
      })
    })
  })

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
