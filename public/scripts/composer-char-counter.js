$(() => {
  let $counter = $('.counter')
  let maxLength = 140
  const $textarea = $('textarea')

  $textarea.on('input', (event) => {
    const charLeft = maxLength - $textarea.val().length
    $counter.html(charLeft)
    if (charLeft <= 0 ) {
      $counter.css('color', 'red')
    } else {
      $counter.css('color', 'inherit')

    }
  })
})