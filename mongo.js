const mongoose = require('mongoose')

const { MONGODB_URI } = process.env

mongoose.connect(MONGODB_URI)
  .then(result => console.log('connected to MongoDB'))
  .catch(error => console.log('error connecting to MongoDB:', error.message))
