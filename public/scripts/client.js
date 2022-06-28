$(document).ready(function() {

  // Prevents cross-site scripting
  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  // Loops through an object of tweets and
  // adds the output of createTweetElement to html text
  const renderTweets = function(tweets) {
    $('.tweets-column').empty();
    for (let tweet of tweets) {
      $('.tweets-column').prepend(createTweetElement(tweet));
    }
  };

  // Takes individul tweets and turns it into html text
  const createTweetElement = function(tweet) {
    let $tweet = $(` 
  <article class="tweet-container">
  <header class="tweet-container-header">
  <img class= "tweet-profile-image" src=${escape(tweet.user.avatars)}>
  <span class="tweet-name"> ${escape(tweet.user.name)} </span>
  <span class="username"> ${escape(tweet.user.handle)}</span>
  </header>
  <article class="previous-tweet-text">${escape(tweet.content.text)}</article>
  <footer class="tweet-container-bottom">
  <span> ${escape(timeago.format(tweet.created_at))}</span>
  <section class="tweet-icons">
  <i class="fa-solid fa-flag"></i>
  <i class="fa-solid fa-retweet"></i>
  <i class="fa-solid fa-heart"></i>
  </section>
  </footer>
  </article>`);

    return $tweet;

  };

  // Looks for a submit in form element
  $('form').submit(async (event) => {
    event.preventDefault();

    let textInput = $("#tweet-text").val();

    // If input tweet is 0 or over 140 max characters displays error message
    $('.tweet-error').slideUp();
    if (!textInput) {
      return $('.tweet-error').text('⚠ Please enter text ⚠').slideDown();
    }

    if (textInput.length > 140) {
      return $('.tweet-error').text('⚠ Tweet exceeds maximum characters ⚠').slideDown();
    }

    // Ajax takes html tweet data and seralizes it, upon success 
    // calls loadTweets to post the form input to the browser
    // if fails error is displayed
    $.ajax("/tweets/", {
      method: "POST",
      url: "/tweets/",
      data: $('#form-section').serialize(),
      success: () => {
        loadTweets();
        $('#tweet-text').val('');
        $('.counter').text(140);
      },
      error: (data, text, error) => console.error("There is an error", error)
    });


  });

  // Takes the input data and calls renderTweets to turn into html data
  // if fails displays error
  const loadTweets = function() {
    $.ajax('/tweets', {
      method: "GET",
      dataType: "JSON",
      success: tweets => renderTweets(tweets),
      error: (data, text, error) => console.error("There is an error", error)
    });
  };

  // always displays tweet data
  loadTweets();

});

