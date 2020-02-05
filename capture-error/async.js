'use strict';

module.exports.async = async (event, context) => {
  //Do what I need to here

  try {
    throw new Error('An error .. ermagherd')
  } catch (thrownError) {
    console.log('An error occurred')
    console.log(thrownError)
    if (context.hasOwnProperty('serverlessSdk')) {
      context.serverlessSdk.captureError(thrownError)
    }
  }


  return true

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};
