const mongoose = require('mongoose')

// const { MONGODB_URI } = process.env

mongoose.connect('mongodb+srv://lucianooieni:luciano0682@cluster0.kapok.mongodb.net/app_notes?retryWrites=true&w=majority')
  .then(result => console.log('connected to MongoDB'))
  .catch(error => console.log('error connecting to MongoDB:', error.message))
