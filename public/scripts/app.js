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
        <p>${getDisplayTime(new Date(tweet.created_at))}</p>
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

  // Hide previous error message before submission
  $('#error-message').hide('fast')

  // Error checking
  if (inputText.length === 0 || '') {
    showComposerError({
      header: 'Empty tweet:', 
      body: 'please type something.'})
    return
  } else if (inputText.length > 140) {
    showComposerError({
      header: 'Tweet too long:', 
      body: 'less than 140 characters please.'})
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

// show error message 
const showComposerError = ({header, body}) => {
  console.log(header, body)
  $('.error-message-header').text(header)
  $('.error-message-body').text(body)
  $('#error-message').slideToggle(400)
}

const getDisplayTime = dateObj => {
  const today = new Date(Date.now())
  const yearDiff = today.getFullYear() - dateObj.getFullYear()
  const monthDiff = today.getMonth() - dateObj.getMonth()
  const dateDiff = today.getDate() - dateObj.getDate()
  const hourDiff = today.getHours() - dateObj.getHours()
  const minuteDiff = today.getMinutes() - dateObj.getMinutes()
  const secondDiff = today.getSeconds() - dateObj.getSeconds()
  if (yearDiff > 1) {
    return `${yearDiff} years ago`
  } else if (yearDiff === 1) {
    return `1 year ago`
  } else {
    if (monthDiff > 1) {
      return `${monthDiff} months ago`
    } else if (monthDiff === 1) {
      return '1 month ago'
    }
  }

  if (dateDiff > 1) {
    return `${dateDiff} days ago`
  } else if (dateDiff === 1) {
    return '1 day ago'
  }

  if (hourDiff > 1) {
    return `${hourDiff} hours ago`
  } else if (hourDiff === 1) {
    return '1 hour ago'
  }

  if (minuteDiff > 1) {
    return `${minuteDiff} minutes ago`
  } else if (minuteDiff === 1) {
    return '1 minute ago'
  }

  if (secondDiff > 1) {
    return `${secondDiff} seconds ago`
  } else if (secondDiff === 1) {
    return '1 second ago'
  }

  return 'this month'


}

loadTweets()
$('.new-tweet').toggle()
$('#error-message').toggle()
// Nav bar compose button toggle
$('.compose-toggle-button').on('click', () => {
  $('.new-tweet').slideToggle('fast')
  $('#tweet-composer-input').focus()
})
})
