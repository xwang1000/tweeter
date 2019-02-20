$(() => {
  
  const createTweetElement = tweet => {
  const $tweet = $('<article>').addClass('tweet')
  $tweet.html(`
    <header>
            <img class="profile-pic" src=${tweet.user.avatars.small} alt="sample profile picture">
            <p class="username">${tweet.user.name}</p>
            <p class="userid">${tweet.user.handle}</p>
          </header>
          <div class="tweet-body">
           ${tweet.content.text}
          </div>
          <footer>
            <p>${new Date(tweet.created_at)}</p>
          </footer>
  `)
  return $tweet
}

// Take an array of tweets
const renderTweets = tweets => {
  tweets.forEach(tweetData => {
    $('#tweets-container').prepend(createTweetElement(tweetData))
  });
}

// Form submission using ajax
$('#tweet-composer').on('submit', function(event) {
  event.preventDefault()
  const input = $(this).serialize()
  
  // Needs refactor
  $.post('/tweets', input, () => {
    loadTweets()
  })
})

const loadTweets = () => {
  $.get('/tweets', (tweets) => {    
    console.log(tweets)
    renderTweets(tweets)
  })
}

loadTweets()

})
