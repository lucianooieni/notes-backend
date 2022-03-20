const mongoose = require('mongoose')

// const { MONGODB_URI, TEST_MONGODB_URI } = process.env

// const connectionString = process.env.NODE_ENV === 'test' ? TEST_MONGODB_URI : MONGODB_URI

mongoose.connect('mongodb+srv://lucianooieni:luciano0682@cluster0.kapok.mongodb.net/app_notes?retryWrites=true&w=majority')
  .then(() => console.log('connected to MongoDB'))
  .catch(error => console.log('error connecting to MongoDB:', error.message))
