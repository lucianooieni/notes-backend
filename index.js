require('dotenv').config()
require('./mongo')
const notFound = require('./middlewares/notFound')
const handleError = require('./middlewares/handleErrors')
const cors = require('cors')
const Note = require('./models/Note')
const express = require('express')

const app = express()

app.use(cors())
app.use(express.json())

app.get('/', (request, response) => {
  response.status(200)
  response.send('<h1>Hello World</h1>')
})

app.get('/api/notes', (request, response) => {
  response.status(200)
  Note.find({}).then(notes => response.json(notes))
})

app.get('/api/notes/:id', (request, response, next) => {
  Note.findById(request.params.id)
    .then(note => {
      if (note) {
        response.json(note)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})
app.delete('/api/notes/:id', (request, response, next) => {
  Note.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.post('/api/notes', (request, response) => {
  const note = request.body
  if (!note.content) {
    return response.status(400).json({
      error: 'content missing'
    })
  }
  const newNote = new Note({
    content: note.content,
    important: note.important || false,
    date: new Date()
  })
  newNote.save().then(savedNote => {
    response.json(savedNote)
  })
})

app.put('/api/notes/:id', (request, response, next) => {
  const body = request.body

  const note = {
    content: body.content,
    important: body.important
  }

  Note.findByIdAndUpdate(request.params.id, note, { new: true })
    .then(updatedNote => {
      response.json(updatedNote)
    })
    .catch(error => next(error))
})

app.use(notFound)
app.use(handleError)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
