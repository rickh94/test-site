const AWS = require('aws-sdk')

const dynamodb = new AWS.DynamoDB({
  apiVersion: '2012-08-10',
  region: 'us-east-1',
  accessKeyId: process.env.DYNAMO_ACCESS_KEY_ID,
  secretAccessKey: process.env.DYNAMO_SECRET_ACCESS_KEY
})

function countCandidate(name) {
  const params = {
    TableName: process.env.DYNAMO_TABLE_NAME,
    ScanFilter: {
      Choice: {
        ComparisonOperator: 'EQ',
        AttributeValueList: [
          {
            S: name
          }
        ]
      }
    }
  }

  return dynamodb.scan(params).promise()
}
