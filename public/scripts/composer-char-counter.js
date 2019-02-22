$(() => {
  let $counter = $('.counter')
  let maxLength = 140
  
  // Listening for input event
  $('textarea').on('input', (event) => {
    const charLeft = maxLength -  $('textarea').val().length
    $counter.html(charLeft)

    // Changes classes for styling
    if (charLeft < 0 ) {
      $counter.attr('class', 'counter-error')
    } else {
      $counter.attr('class', 'counter')
    }
  })
})