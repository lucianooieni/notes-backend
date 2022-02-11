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

app.get('/api/notes', async (request, response) => {
  response.status(200)
  const notes = await Note.find({})
  response.json(notes)
})

app.get('/api/notes/:id', async (request, response, next) => {
  try {
    const note = await Note.findById(request.params.id)
    if (note) {
      response.json(note)
    } else {
      response.status(404).end()
    }
  } catch (exception) {
    next(exception)
  }
})
app.delete('/api/notes/:id', async (request, response, next) => {
  try {
    await Note.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } catch (error) {
    next(error)
  }
})

app.post('/api/notes', async (request, response, next) => {
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
  try {
    const savedNote = await newNote.save()
    response.json(savedNote)
  } catch (error) {
    next(error)
  }
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

module.exports = app
