'use strict'
const bcrypt = require('bcryptjs')

module.exports.startedBySns = async event => {
  bcrypt.hashSync("anotherstring", 5)
  return true
}
