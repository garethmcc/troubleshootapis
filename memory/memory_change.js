'use strict';
const AWS = require('aws-sdk')
const _ = require('lodash')
const schema = require('protocol-buffers-schema')

module.exports.memory_change = async event => {
  let arrayVar = []
  for (let step = 0; step < 1000000; step++) {
    arrayVar.push(step.toString())
  }
  return true
};

