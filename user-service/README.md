# user-service

## Introduction
This service provides all features needed to manage and authenticate users as well as provide the validation needed for 
later API requests

## Endpoints

* Staging base URL: https://8kx9wsssm6.execute-api.us-east-1.amazonaws.com/development
### Create user

Please make sure you pass the Content-type as below or the validation does not work.
#### Sample Request
```http request
POST /v1/user
Content-Type: application/json

{
"username":"ausername",
"email":"test@email.com",
"password":"testpassword",
"first_name":"optionalfirstname",
"last_name":"optionallastname",
"age":20 
}
```
### Authenticate

For a user to authenticate and receive a JWT in return

#### Sample Request
```http request
POST /v1/login
Content-Type: application/json

{
"username":"ausername",
"password":"testpassword"
}
```

### Initiate forgot password process
Used when a user wishes to reset their password because they have forgotten it. An email will be sent to the email address registered to that user which will contain a link they need to click.

#### Sample Request
```http request
GET /v1/password/renew/{username}
```
### User exists check

Used to determine if a certain username exists or not.

```http request
GET /v1/username/check/{username}
```

If response status code is 200, the username exists.
