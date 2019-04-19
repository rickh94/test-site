import CSV from 'csv'
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

const stringRecords = `name,bio
Annmarie Akhbar,"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quam, porro!"
Vivek Ingvar,Lorem ipsum dolor sit amet consectetur adipisicing elit.
Kyriake Asil,"Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis quibusdam modi explicabo aperiam, reiciendis saepe voluptas aut consequuntur excepturi! Saepe."
Jakob Victor,"Lorem ipsum dolor sit amet, consectetur adipisicing elit."
Natille Tessa,Lorem ipsum dolor sit.
Anabela Bernardino,"Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi laboriosam praesentium temporibus voluptates laudantium, quis id vero saepe!"`

CSV.stringify(candidates, { header: true, columns: ['name', 'bio'] }, (err, output) => {
  console.log(output)
})
CSV.parse(stringRecords, { columns: true }, (err, records) => {
  console.log(records)
})
