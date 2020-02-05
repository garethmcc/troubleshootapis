'use strict';
const bcrypt = require('bcryptjs')
module.exports.memory_change = async event => {
  bcrypt.hashSync("anotherstring", 13)

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};
