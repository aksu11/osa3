const express = require('express')
const app = express()
app.use(express.static('build'))
app.use(express.json())
const morgan = require('morgan')
app.use(morgan(':method :url :status :body :res[content-length] - :response-time ms'))
const cors = require('cors')
app.use(cors())
const Person = require('./models/person')

morgan.token('body', (req) => {
  if (req.method === 'POST') return JSON.stringify(req.body)
  return null
} )

app.get('/api/persons', (req, res) => {
  Person.find({})
    .then(people => {
      res.json(people)
    })
})

app.get('/info', (req, res) => {
  const time = new Date()
  const date = time.toString()
  Person.find({})
    .then(people => {
      const size = people.length
      const info = `<p> Phonebook has info for ${size} people</p><p> ${date} </p>`
      res.send(info)
    })
})

app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then(person => {
      if(person) {
        res.json(person)
      } else {
        res.status(404).json('not found').end()
      }
    })
    .catch(error => {
      next(error)
    })
})

app.post('/api/persons', (req, res, next) => {
  const person = req.body
  if(!person.name) return res.status(400).json({ error: 'name is missing' })
  if(!person.number) return res.status(400).json({ error: 'number is missing' })
  Person.find({})
    .then(people => {
      const name = people.find(p => p.name === person.name)
      if (name !== undefined) return res.status(400).json({ error: 'name must be unique' })
    })

  const newPerson = new Person({
    name: person.name,
    number: person.number
  })

  newPerson.save()
    .then(savedPerson => {
      res.json(savedPerson).end()
    })
    .catch(error => {
      next(error)
    })
})

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then(() => {
      res.status(204).end()
    })
    .catch(error => {
      next(error)
    })
})

app.put('/api/persons/:id', (req, res, next) => {
  const updatedPerson = {
    name: req.body.name,
    number: req.body.number
  }
  Person.findByIdAndUpdate(req.params.id, updatedPerson, { new: true } )
    .then(updatedPerson => {
      if(updatedPerson) {
        res.json(updatedPerson)
      } else {
        res.status(404).json('not found').end()
      }
    })
    .catch(error => {
      next(error)
    })
})

const errorHandler = (error, request, response, next) => {
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  next(error)
}
app.use(errorHandler)

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
