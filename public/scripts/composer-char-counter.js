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


// const { render } = require("express/lib/application");

// $(document).ready(function() {

//   // On input within textarea run function below
//   $('#textarea').on('input', function (event) {
    
//     let $formInput = $(this);
//     let $forms = $formInput.closest("form");
//     let $textCount = $forms.find("#tweet-text");
    
//     // Checks the length of whats being written
//     let inputCharacterCount = $textCount.val().length;

//     // Character count left
//     let remainingCharacters = 140 - inputCharacterCount;
    
//     // Displays the remaining character
//     let counterColour = $("#counter").val(remainingCharacters)

//     // Checks if over or under cmax count
//     if (remainingCharacters < 0) {
//       counterColour.css("color", "red")
//     } else {
//       counterColour.css("color", "white")
//     }
//   });

// });