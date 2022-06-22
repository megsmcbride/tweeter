$(document).ready(function() {

  // On input within textarea run function below
  $('.new-tweet textarea').on('input', function () {
    
    // Checks the length of whats being written
    let inputCharacterCount = $(this).val().length;

    // Character count left
    let remainingCharacters = 140 - inputCharacterCount;
    
    // Displays the remaining character
    let counterAmount = $(this).siblings('.counter');
    counterAmount.text(remainingCharacters);

    // Checks if over or under cmax count
    if (remainingCharacters < 0) {
      counterAmount.addClass('tweet-is-too-long')
    } else {
      counterAmount.removeClass('tweet-is-too-long')
    }
  });

});
