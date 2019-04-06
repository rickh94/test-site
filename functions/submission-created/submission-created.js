const Airtable = require('airtable')

const apiKey = process.env.AIRTABLE_API_KEY
const baseID = process.env.AIRTABLE_BASE_ID
const tableName = process.env.TABLE_NAME

exports.handler = (event, context, callback) => {
  const body = JSON.parse(event.body).payload
  const { email, name, winner } = body.data

  const base = new Airtable({apiKey}).base(baseID)
  base(tableName).create({
    Email: email,
    Name: name,
    Choice: parseInt(winner)
  }, function(err, record) {
    if (err) {
      console.error(err)
      callback(null, {
        statusCode: 422,
        body: err
      })
      } else {
      callback(null, {
        statusCode: 200,
        body: 'No worries, all is working fine'
      })
    }
  })

}
