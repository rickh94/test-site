const AWS = require('aws-sdk')
const parse = require('csv-parse/lib/sync')
const axios = require('axios')

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

async function countCandidates() {
  // URL HARDCODE
  const candidateCsv = await axios.get(
    'https://form.temptestsites.online/candidates.csv'
  )

  const results = {
    candidates: {},
    totalVotes: 0
  }
  const candidates = parse(candidateCsv.text(), { columns: true })

  for (candidate of candidates) {
    const data = await countCandidate(candidate.name)
    const votes = data.Count
    results.candidates[candidate.name] = votes
    results.totalVotes += votes
  }
  return results
}

exports.handler = async function(event, context, callback) {
  try {
    const results = await countCandidates()
    return callback(null, {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type'
      },
      body: JSON.stringify(results)
    })
  } catch (err) {
    console.error(err)
    return callback(null, {
      statusCode: 404,
      body: 'Could not get standings data'
    })
  }
}
