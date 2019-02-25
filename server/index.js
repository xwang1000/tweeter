'use strict'

// Modules
const PORT          = 8080
const express       = require('express')
const bodyParser    = require('body-parser')
const cookieSession = require('cookie-session')
const morgan        = require('morgan')
const app           = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2']
}))
app.use(morgan('dev'))

// Get database from MongoDB and boot the routes
const {MongoClient} = require('mongodb')
const MONGODB_URI = 'mongodb://localhost:27017/tweeter'

// Connect to the mongo server
MongoClient.connect(MONGODB_URI, (err, db) => {
  if (err) {
    console.error(`Failed to connect ${MONGODB_URI}`)
    throw err
  }
  
  const DataHelpers = require('./lib/data-helpers.js')(db)
  const tweetsRoutes = require('./routes/tweets')(DataHelpers)
  const usersRoutes = require('./routes/users')(DataHelpers)

  app.use('/tweets', tweetsRoutes)
  app.use('/users', usersRoutes)
  app.use('/login', usersRoutes)

  
  app.post('/login', (req, res) => {
    const {currentUsername, password_hash} = req.body
    DataHelpers.getUsers(function(users) {
      console.log(users)
      res.send(users)
    })
  })

  app.listen(PORT, () => {
    console.log('Example app listening on port ' + PORT)
  })
})
