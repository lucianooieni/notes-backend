require('dotenv').config()
require('./mongo')
const notFound = require('./middlewares/notFound')
const handleError = require('./middlewares/handleErrors')
const cors = require('cors')
const express = require('express')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const notesRouter = require('./controllers/notes')

const app = express()

app.use(cors())
app.use(express.json())

app.get('/', (request, response) => {
  response.status(200)
  response.send('<h1>Hello World</h1>')
})

app.use('/api/notes', notesRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

app.use(notFound)
app.use(handleError)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

module.exports = app
