'use strict'
const AWS = require('aws-sdk')
const bcrypt = require('bcryptjs')

module.exports = class User {

  constructor () {
    this.user = {}
  }

  async userEmailExists (email) {
    if (typeof this.user.email !== 'undefined' &&
      this.user.email === email) {
      return true
    } else if (typeof this.user.email === 'undefined') {
      await this.getUser(email)
      if (typeof this.user.email !== 'undefined' &&
        this.user.email === email) {
        return true
      }
    }

    return false
  }

  async userExists (username) {
    if (typeof this.user.username !== 'undefined' &&
      this.user.username === username) {
      return true
    } else if (typeof this.user.username === 'undefined') {
      await this.getUser(username)
      if (typeof this.user.username !== 'undefined' &&
        this.user.username === username) {
        return true
      }
    }

    return false
  }

  async getUser (username) {
    if (typeof this.user.username !== 'undefined' &&
      this.user.username === username) {
      return this.user
    }
    const userQuery = {
      TableName: process.env.DYNAMODB_USER_TABLE,
      KeyConditionExpression: '#username = :username and begins_with(#username_created, :username_created)',
      ExpressionAttributeNames: {
        '#username': 'username',
        '#username_created': 'username_created_at'
      },
      ExpressionAttributeValues: {
        ':username': username,
        ':username_created': username
      }
    }
    let userExistsResult = {}
    try {
      const dynamodb = new AWS.DynamoDB.DocumentClient()
      userExistsResult = await dynamodb.query(userQuery).promise()
    } catch (queryUserError) {
      console.log('There was an error attempting to retrieve the user')
      console.log('queryUserError', queryUserError)
      console.log('userQuery', userQuery)
      return new Error('There was an error retrieving the user: ', queryUserError.message)
    }
    if (typeof userExistsResult.Items !== 'undefined' &&
      userExistsResult.Items.length === 1) {
      this.user = {
        username: userExistsResult.Items[0].username,
        email: userExistsResult.Items[0].email,
        first_name: userExistsResult.Items[0].first_name,
        last_name: userExistsResult.Items[0].last_name,
        age: userExistsResult.Items[0].age,
        password: userExistsResult.Items[0].password
      }
    } else {
      console.log('There is no matching user')
      console.log('userExistsResult', userExistsResult)
      return new Error('No matching user')
    }
    return this.user
  }

  async authenticate (username, password) {
    if (typeof this.user.username === 'undefined' ||
    this.user.username !== username) {
      await this.getUser(username)
    }
    return bcrypt.compareSync(password, this.user.password)
  }
}
