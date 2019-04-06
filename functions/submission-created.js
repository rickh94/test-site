exports.handler = (event, context, callback) => {
  // console.log(JSON.parse(event.body).payload);
  callback(null, {
    statusCode: 200,
    body: 'No worries, all is working fine'
  });
}
