const Airtable = require('airtable')
const AWS = require('aws-sdk')
const uuid = require('uuid/v4')

exports.handler = (event, context, callback) => {
  const body = JSON.parse(event.body).payload
  const { email, name, winner } = body.data
  const dateCreated = new Date(body.created_at)
  console.log(winner)

  let err = []

  let atError = sendToAirtable(email, name, winner, dateCreated)
  if (atError) {
    err.push(atError)
  }


  let dynamoError = sendToDynamo(email, name, winner, dateCreated)
  if (dynamoError) {
    err.push(dynamoError)
  }

  if (err.length !== 0) {
    console.log(err)
    return callback(null, {
      statusCode: err[0].status,
      body: err,
      error: err
    })
  } else {
    return callback(null, {
      statusCode: 201,
      body: 'Records have been created'
    })
  }
}

function sendToDynamo(email, name, choice, date) {
  const dynamodb = new AWS.DynamoDB({
    apiVersion: '2012-08-10',
    region: 'us-east-1',
    accessKeyId: process.env.DYNAMO_ACCESS_KEY_ID,
    secretAccessKey: process.env.DYNAMO_SECRET_ACCESS_KEY
  })

  const params = {
    Item: {
      uuid: {
        S: `${uuid()}`
      },
      Email: {
        S: email
      },
      Name: {
        S: name
      }, 
      Choice: {
        S: choice
      },
      'Date Created': {
        S: date.toDateString()
      }
    },
    TableName: process.env.DYNAMO_TABLE_NAME
  }

  let err 
  dynamodb.putItem(params, (dynamoErr, data) => {
    if (dynamoErr) {
      err = dynamoErr
    } else {
      console.log(data)
    }
  })

  return err

}

function sendToAirtable(email, name, choice, date) {
  const atApiKey = process.env.AIRTABLE_API_KEY
  const baseID = process.env.AIRTABLE_BASE_ID
  const tableName = process.env.TABLE_NAME

  const base = new Airtable({ apiKey: atApiKey }).base(baseID)

  const newData = {
    Email: email,
    Name: name,
    Choice: choice,
    'Date Created': date.toDateString()
  }

  let err
  base(tableName).create(newData, function(atError, record) {
    if (atError) {
      err = atError
    }
  })

  return err
}
