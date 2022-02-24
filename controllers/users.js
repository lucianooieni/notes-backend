const bcrypt = require('bcrypt')
const User = require('../models/User')
const usersRouter = require('express').Router()

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('notes', { content: 1, date: 1 })
  response.json(users)
})

usersRouter.post('/', async (request, response, next) => {
  try {
    const { username, name, password } = request.body
    if (!username || !password) {
      return response.status(400).json({
        error: 'username or password missing'
      })
    }
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
      username,
      name,
      passwordHash
    })

    const savedUser = await user.save()

    response.json(savedUser)
  } catch (error) {
    // response.status(400).json(error)
    next(error)
  }
})

usersRouter.delete('/:id', async (request, response, next) => {
  try {
    await User.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } catch (error) {
    next(error)
  }
})

module.exports = usersRouter
