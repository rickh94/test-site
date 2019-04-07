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
    body: JSON.stringify(candidates)
  })
}
