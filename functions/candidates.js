const candidates = [
    { name: 'Annmarie Akhbar' },
    { name: 'Vivek Ingvar' },
    { name: 'Kyriake Asil' },
    { name: 'Jakob Victor' },
    { name: 'Natille Tessa' },
    { name: 'Anabela Bernardino' }
]

exports.handler = function(event, context, callback) {
    return callback(null, {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Content-Type'
        },
        body: JSON.stringify(candidates)
    })
}

exports.candidates = candidates
