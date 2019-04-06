exports.handler = (event, context, callback) => {
  console.log(event.body)
  return callback(null, {
    statusCode: 200,
    body: 'No worries, all is working fine'
  })
}
