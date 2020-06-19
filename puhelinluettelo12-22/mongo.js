const mongoose = require('mongoose')

const Person = mongoose.model('person', {
  name: String,
  number: String
})

const url = `mongodb+srv://aksu:${process.argv[2]}@cluster0-u5ays.mongodb.net/test?retryWrites=true&w=majority`

if(process.argv.length === 5) {

  mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

  const person = new Person ({
    name: process.argv[3],
    number: process.argv[4]
  })

  person.save()
    .then(() => {
      console.log(`added ${process.argv[3]} number ${process.argv[4]} to phonebook`)
      mongoose.connection.close()
    })
}

if(process.argv.length === 3) {

  mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false })

  Person.find({})
    .then(result => {
      console.log('Phonebook:')
      result.forEach(person => {
        console.log(`${person.name}: ${person.number}`)
      })
      mongoose.connection.close()
    })

}