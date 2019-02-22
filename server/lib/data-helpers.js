'use strict'
// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {

  return {
    // Saves a tweet to `db`
    saveTweet: function(newTweet, callback) {
      db.collection('tweets').insertOne(newTweet, (err, r) => {
        callback(err, r)
      })
    },

    // Get all tweets in `db`, sorted by newest first
    getTweets: function(callback) {
      const sortNewestFirst = (a, b) => a.created_at - b.created_at
      const tweets = db.collection('tweets').find().toArray((err, tweetsArray) => {
        callback(err, tweetsArray.sort(sortNewestFirst))
      })
    }

  }
}
