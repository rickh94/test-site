const Airtable = require('airtable')
const firebase = required('firebase')

const atApiKey = process.env.AIRTABLE_API_KEY
const baseID = process.env.AIRTABLE_BASE_ID
const tableName = process.env.TABLE_NAME

const fbConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSendId: process.env.FIREBASE_MESSAGING_SENDER_ID
}

const app = firebase.initializeApp(fbConfig)
const db = firebase.database()

exports.handler = (event, context, callback) => {
  const body = JSON.parse(event.body).payload
  const { email, name, winner } = body.data
  const dateCreated = new Date(body.created_at)

  const newData = {
    Email: email,
    Name: name,
    Choice: parseInt(winner),
    'Date Created': dateCreated.toDateString()
  }

  let err = []

  const base = new Airtable({apiKey: atApiKey}).base(baseID)
  base(tableName).create(newData, function(atError, record) {
    if (atError) {
      err.push(atError)
      // callback(null, {
      //   statusCode: err.status,
      //   body: err.message,
      //   error: err
      // })
      // } else {
      // callback(null, {
      //   statusCode: 200,
      //   body: 'No worries, all is working fine'
      // })
    }
  })

  const newResultKey = db.ref().child('results').push().key
  db.ref(`/results/${newResultKey}`).set(newData, fbErr => {
    if (err) {
      err.push(fbErr)
    } else {
      return
    }
  })

  if err.length() !== 0 {
    console.log(err)
    return callback(null, {
      statusCode: err[0].status,
      body: err,
      error: err
    })
  } else {
    return callback(null, {
      statusCode: 201,
      body: "Records have been created"
    })
  }

}
