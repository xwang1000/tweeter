'use strict'
const express       = require('express')
const usersRoutes  = express.Router()

module.exports = function(DataHelpers) {

  usersRoutes.get('/', function(req, res) {
    DataHelpers.getUsers((err, users) => {
      res.json(users)
    })
  })
  return usersRoutes
}
