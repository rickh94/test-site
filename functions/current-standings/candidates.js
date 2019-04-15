const candidates = [
    {
        name: 'Annmarie Akhbar',
        bio: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quam, porro!'
    },
    {
        name: 'Vivek Ingvar',
        bio: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.'
    },
    {
        name: 'Kyriake Asil',
        bio:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis quibusdam modi explicabo aperiam, reiciendis saepe voluptas aut consequuntur excepturi! Saepe.'
    },
    {
        name: 'Jakob Victor',
        bio: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.'
    },
    { name: 'Natille Tessa', bio: 'Lorem ipsum dolor sit.' },
    {
        name: 'Anabela Bernardino',
        bio:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi laboriosam praesentium temporibus voluptates laudantium, quis id vero saepe!'
    }
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
