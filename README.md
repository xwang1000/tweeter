# Tweeter Project
A simple single-page AJAX-based Twitter clone.

## Screenshots
!["Browsing experience"](https://github.com/xwang1000/tweeter/blob/master/docs/browsing.png?raw=true)
!["Auto focus composer box"](https://github.com/xwang1000/tweeter/blob/master/docs/composing-tweet.png?raw=true)
!["UX-friendly submission error"](https://github.com/xwang1000/tweeter/blob/master/docs/error-message.png?raw=true)

## Dependencies
- Express
- Node 5.10.x or above
- body-parser
- chance
- md5
- mongodb

## Getting Started
- Install all dependencies (using the `npm install` command).
- Seed your local MongoDB server with the [sample tweets database](https://github.com/xwang1000/tweeter/blob/master/docs/sample-tweets.json), in a 'tweets' collection, in 'tweeter' database. 
- Start local MongoDB server at `mongodb://localhost:27017`.
- Start the web server using the `npm start` command. The app will be served at <http://localhost:8080/>.