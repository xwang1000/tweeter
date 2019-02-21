$(() => {
  
  const createTweetElement = tweet => {
    const $tweet = $('<article>').addClass('tweet')
    $tweet.html(`
      <header>
        <img class="profile-pic" src=${tweet.user.avatars.small} alt="small avatar">
        <p class="username">${tweet.user.name}</p>
        <p class="userid">${tweet.user.handle}</p>
      </header>
      <div class="tweet-body">
        ${escapeHtml(tweet.content.text)}
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

// New tweet submission handler
$('#tweet-composer').on('submit', function(event) {
  event.preventDefault()
  const inputText = this.text.value

  // Error checking
  if (inputText.length === 0 || '') {
    alert('Empty tweet: please say something.')
    return
  } else if (inputText.length > 140) {
    alert('Your tweet is too long. Please keep it less than 140 characters.')
    return
  }

  // All clear, go post!
  const inputSerial = $(this).serialize()
  
  $.post('/tweets', inputSerial, () => {
    loadTweets()
    resetComposer()
  })  
})

const loadTweets = () => {
  $.get('/tweets', (tweets) => {   
    renderTweets(tweets)
  })
}

const resetComposer = () => {
  $('#tweet-composer-input').val('')
  $('.counter').html(140) 
}

// Escape unsafe html
const escapeHtml = str => {
  var div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

loadTweets()

})
