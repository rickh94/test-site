exports.handler = (event, context, callback) => {
  const body = JSON.parse(event.body).payload
  console.log(body)
  console.log("Email: ", body.data.email)
  callback(null, {
    statusCode: 200,
    body: 'No worries, all is working fine'
  });
}
