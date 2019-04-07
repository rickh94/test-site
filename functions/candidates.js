const candidates = [
    'Annmarie Akhbar',
    'Vivek Ingvar',
    'Kyriake Asil',
    'Jakob Victor',
    'Natille Tessa',
    'Anabela Bernardino'
]

exports.handler = function(event, context, callback) {
  return callback(null, {
    statusCode: 200,
    headers: {'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'Content-Type'},
    body: JSON.stringify(candidates)
  })
}
