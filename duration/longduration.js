'use strict';
const bcrypt = require('bcryptjs')

module.exports.longduration = async event => {
  bcrypt.hashSync("anotherstring", 13)
  return {
    statusCode: 200
  };

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};
