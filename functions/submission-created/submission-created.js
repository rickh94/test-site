exports.handler = (event, context, callback) => {
  const body = JSON.parse(event.body).payload
  console.log(body)
  callback(null, {
    statusCode: 200,
    body: 'No worries, all is working fine'
  });
}
