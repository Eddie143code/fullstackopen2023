require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const Persons = require('./model/Contacts')

app.use(morgan('tiny'))
app.use(express.json())
app.use(cors())

app.use(express.static('build'))

morgan.token('body', (req, res) => JSON.stringify(req.body))
app.use(
  morgan(
    ':method :url :status :response-time ms - :res[content-length] :body - :req[content-length]'
  )
)

/*const generateId = () => {

  const maxId = Persons.length > 0 ? Math.max(...Persons.map((n) => n.id)) : 0;
  return maxId + 1;
}; */

app.get('/api/persons', (req, res, next) => {
  Persons.find({})
    .then((fetchedPeople) => res.json(fetchedPeople))
    .catch((error) => next(error))
})

app.get('/api/persons/:id', (req, res, next) => {
  const id = req.params.id
  Persons.findById(id)
    .then((fetchedPerson) => res.json(fetchedPerson))
    .catch((error) => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {
  const id = req.params.id
  Persons.findByIdAndDelete(id)
    .then(() => res.status(204).end())
    .catch((error) => next(error))
})

app.post('/api/persons', (req, res, next) => {
  const body = req.body

  if (!body.name || !body.number) {
    return res.status(400).json({
      error: 'name or number is missing',
    })
  }
  const person = new Persons({
    name: body.name,
    number: body.number,
  })

  person
    .save()
    .then((savedContact) => {
      res.json(savedContact)
    })
    .catch((error) => next(error))
})

app.put('/api/persons/:id', (req, res, next) => {
  const id = req.params.id

  const person = {
    name: req.body.name,
    number: req.body.number,
  }

  Persons.findByIdAndUpdate(id, person, { new: true })
    .then((updatedPerson) => res.json(updatedPerson))
    .catch((error) => next(error))
})

app.get('/info', (req, res) => {
  const date = new Date()
  const text = `<div>Phonebook has info for 2 people</div><br><div>${date}</div>`

  res.end(text)
})

const errorHandler = (error, req, res, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return res.status(400).send({ error: error })
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
const start = async () => {
  try {
    app.listen(PORT, () =>
      console.log(`Server is listening on port ${PORT}...`)
    )
  } catch (error) {
    console.log(error)
  }
}

start()
