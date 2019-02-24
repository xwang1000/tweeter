$(() => {
  
  // Takes a tweet object and create its node element
  const createTweetElement = tweet => {
    const $tweet = $(`
      <article class="tweet">
        <header>
          <img class="profile-pic" src=${tweet.user.avatars.small} alt="small avatar">
          <p class="username">${tweet.user.name}</p>
          <p class="userid">${tweet.user.handle}</p>
        </header>
        <div class="tweet-body">
          ${escapeHtml(tweet.content.text)}
        </div>
        <footer>
          <p class="created-at">${getDisplayTime(new Date(tweet.created_at))}</p>
          <div class="icon-wrapper"">
            <img class="icon flag" src="../images/flag.png" alt="flag icon">
            <img class="icon retweet" src="../images/retweet.png" alt="retweet icon">
            <div class="like-wrapper">
              <img class="icon like" src="../images/like.png" alt="like icon">
              <p class="like-count">${tweet.likes}</p>
            </div>
          </div>
        </footer>
      </article>
    `)
    return $tweet
  }

  // Render all tweet nodes
  const renderTweets = tweets => {
    tweets.forEach(tweetData => {
      $('#tweets-container').prepend(createTweetElement(tweetData))
    });
  }

  const loadTweets = () => {
    $.get('/tweets', (tweets) => {   
      renderTweets(tweets)
    })
  }

  // Cleans up
  const resetComposer = () => {
    $('#tweet-composer-input').val('')
    $('.counter').html(140)
  }

  // Sanitizes user input strings
  const escapeHtml = str => {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  const showComposerError = ({header, body}) => {
    $('.error-message-header').text(header)
    $('.error-message-body').text(body)
    $('#error-message').slideToggle(400)
  }

  const pluralize = (word, n) => n === 1 ? word : word + 's'

  const timeAgo = (n, unit) => `${n} ${pluralize(unit, n)} ago`

  const getDisplayTime = dateObj => {
    const today = new Date(Date.now())

    const times = [
      {
        unit: 'year',
        getValue: () => today.getFullYear() - dateObj.getFullYear()
      },
      {
        unit: 'month',
        getValue: () => today.getMonth() - dateObj.getMonth()
      },
      {
        unit: 'day',
        getValue: () => today.getDate() - dateObj.getDate()
      },
      {
        unit: 'hour',
        getValue: () => today.getHours() - dateObj.getHours()
      },
      {
        unit: 'minute',
        getValue: () => today.getMinutes() - dateObj.getMinutes()
      },
      {
        unit: 'second',
        getValue: () => today.getSeconds() - dateObj.getSeconds()
      }
    ]

    if ((today.getSeconds() - dateObj.getSeconds()) === 0) {
      return 'just now'
    }

    for(let i = 0; i < times.length; i++) {
      const {unit, getValue} = times[i]
      const value = getValue()
      if (value > 0) {
        return timeAgo(value, unit)
      }
    }
  }

  // Event handlers

  // Submission handler
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

    // Encode and submit
    const inputSerial = $(this).serialize()
    $.post('/tweets', inputSerial, () => {
      loadTweets()
      resetComposer()
    })  
  })

  // Button listening
  $('.compose-toggle-button').on('click', () => {
    $('.new-tweet').slideToggle('fast')
    $('#tweet-composer-input').focus()
  })

  // Initial content and display of the page
  loadTweets()
  $('.new-tweet').toggle()
  $('#error-message').toggle()

  // Initial like button handler
  $('#tweets-container').on('click', '.like', function(e) {
    $likeCount = $('.like-count')
    console.log($likeCount.html())//buggy!
  })

})
