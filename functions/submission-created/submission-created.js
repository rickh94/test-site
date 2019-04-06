exports.handler = (event, context, callback) => {
  body = JSON.parse(event.body)
  console.log(body)
  console.log("email", body.data.email)
  console.log("name", body.data.name)
  console.log("choice", body.data.winner)
  console.log("created", body.created_at)
  callback(null, {
    statusCode: 200,
    body: 'No worries, all is working fine'
  });
}
