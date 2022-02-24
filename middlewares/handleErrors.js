module.exports = (error, request, response, next) => {
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({
      error: 'invalid token'
    })
  } else if (error.name === 'MongoServerError' && error.code === 11000) {
    return response.status(401).json({
      error: 'username already in use'
    })
  }
  next(error)
}
