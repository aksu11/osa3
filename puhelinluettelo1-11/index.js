const express = require('express')
const app = express()
app.use(express.static('build'))
app.use(express.json())
const morgan = require('morgan')
app.use(morgan(':method :url :status :body :res[content-length] - :response-time ms'))
const cors = require('cors')
app.use(cors())

morgan.token('body', (req, res) => {
  if (req.method === 'POST') return JSON.stringify(req.body)
  return null
} )

const persons = [
  {
    "name": "Arto Hellas",
    "number": "040-123456",
    "id": 1
  },
  {
    "name": "Ada Lovelace",
    "number": "39-44-5323523",
    "id": 2
  },
  {
    "name": "Dan Abramov",
    "number": "12-43-234345",
    "id": 3
  },
  {
    "name": "Mary Poppendieck",
    "number": "39-23-6423122",
    "id": 4
  }
]

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.get('/info', (req, res) => {
  const time = new Date()
  const date = time.toString()
  const size = persons.length
  const info = `<p> Phonebook has info for ${size} people</p><p> ${date} </p>`
  res.send(info)
})

app.get('/api/persons/:id', (req, res) => { 
  const id = Number(req.params.id)
  const person = persons.find(person => person.id === id)
  if (person) {
    res.json(person)
  } else res.status(404).end()
})

app.post('/api/persons', (req, res) => {
  const person = req.body
  if(!person.name) return res.status(400).json({error: 'name is missing'})
  if(!person.number) return res.status(400).json({error: 'number is missing'})
  const name = persons.find(p => p.name === person.name)
  if (name !== undefined) return res.status(400).json({error: 'name must be unique'})
  
  const ids = persons.map(p => p.id)
  let r = false
  while(r === false){
    person.id = Math.floor(Math.random() * 1000) + 1
    if(ids.indexOf(person.id) < 0) r = true
  }
  persons.push(person)
  res.json(person)
})

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const personToDelete = persons.find(p => p.id === id)
  if(personToDelete) res.status(204).end()
  else res.status(400).json({ error: 'malformatted id' })
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})