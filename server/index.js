'use strict'

// Basic express setup:
const PORT          = 8080
const express       = require('express')
const bodyParser    = require('body-parser')
const app           = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))

// Get database from MongoDB and boot the routes
const {MongoClient} = require('mongodb')
const MONGODB_URI = 'mongodb://localhost:27017/tweeter'

let tweets = (MongoClient.connect(MONGODB_URI, (err, db) => {
  if (err) {
    console.error(`Failed to connect ${MONGODB_URI}`)
    throw err
  }
  
  const DataHelpers = require('./lib/data-helpers.js')(db)
  const tweetsRoutes = require('./routes/tweets')(DataHelpers)

  app.use('/tweets', tweetsRoutes)
}))

app.listen(PORT, () => {
  console.log('Example app listening on port ' + PORT)
})
