const mongoose = require('mongoose')
const supertest = require('supertest')
const { initialNotes, notesInDb } = require('./test_helper')
const app = require('../index')
const Note = require('../models/Note')

const api = supertest(app)

beforeEach(async () => {
  await Note.deleteMany()
  let noteObject = new Note(initialNotes[0])
  await noteObject.save()
  noteObject = new Note(initialNotes[1])
  await noteObject.save()
})

test('notes are returned as json', async () => {
  await api
    .get('/api/notes')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are two notes', async () => {
  const response = await api.get('/api/notes')

  expect(response.body).toHaveLength(2)
})

test('the first note is about HTTP methods', async () => {
  const response = await api.get('/api/notes')

  expect(response.body[0].content).toBe('HTML is easy')
})

test('all notes is returned', async () => {
  const response = await api.get('/api/notes')

  expect(response.body).toHaveLength(initialNotes.length)
})

test('a specific note is within the returned notes', async () => {
  const response = api.get('/api/notes')

  const contents = (await response).body.map(note => note.content)
  expect(contents).toContain('Browser can execute only Javascript')
})

test('a valid note can be added', async () => {
  const newNote = {
    content: 'note added',
    important: true
  }

  await api
    .post('/api/notes')
    .send(newNote)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const notesAtEnd = await notesInDb()
  expect(notesAtEnd).toHaveLength(initialNotes.length + 1)

  const contents = notesAtEnd.map(note => note.content)
  expect(contents).toContain('note added')
})

test('note without content is not added', async () => {
  const newNote = {
    important: true
  }

  await api
    .post('/api/notes')
    .send(newNote)
    .expect(400)

  const notesAtEnd = await notesInDb()

  expect(notesAtEnd).toHaveLength(initialNotes.length)
})

test('a specific note can be viewed', async () => {
  const notesAtStart = await notesInDb()

  const noteToView = notesAtStart[0]

  const resultNote = await api
    .get(`/api/notes/${noteToView.id}`)
    .expect(200).expect('Content-Type', /application\/json/)

  const processedNoteToView = JSON.parse(JSON.stringify(noteToView))

  expect(resultNote.body).toEqual(processedNoteToView)
})

test('a note can be deleted', async () => {
  const notesAtStart = await notesInDb()
  const noteToDelete = notesAtStart[0]

  await api.delete(`/api/notes/${noteToDelete.id}`).expect(204)
  const notesAtEnd = await notesInDb()

  expect(notesAtEnd).toHaveLength(
    initialNotes.length - 1
  )

  const contents = notesAtEnd.map(r => r.content)

  expect(contents).not.toContain(noteToDelete.content)
})

afterAll(() => {
  mongoose.connection.close()
})
