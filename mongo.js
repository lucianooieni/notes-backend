const mongoose = require('mongoose')

const { MONGODB_URI, TEST_MONGODB_URI } = process.env

const connectionString = process.env.NODE_ENV === 'test' ? TEST_MONGODB_URI : MONGODB_URI

mongoose.connect(connectionString)
  .then(() => console.log('connected to MongoDB'))
  .catch(error => console.log('error connecting to MongoDB:', error.message))
