const jwt = require('jsonwebtoken')

const getToken = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

module.exports = (request, response, next) => {
  const token = getToken(request)
  const decodedToken = jwt.verify(token, process.env.SECRET) // Error: JsonWebTokenError
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  request.userId = decodedToken.id

  next()
}
