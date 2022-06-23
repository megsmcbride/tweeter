/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
*/

$(document).ready(function() {

  const renderTweets = function(tweets) {
    for (let tweet of tweets) {
      $('.tweets-column').prepend(createTweetElement(tweet));
    }
  };

  const createTweetElement = function(tweet) {
    let $tweet = $(` 
  <article class="tweet-container">
  <header class="tweet-container-header">
  <img class= "tweet-profile-image" src=${tweet.user.avatars}>
  <span class="tweet-name"> ${tweet.user.name} </span>
  <span class="username"> ${tweet.user.handle}</span>
  </header>
  <article class="previous-tweet-text">${tweet.content.text}</article>
  <footer class="tweet-container-bottom">
  <span> ${timeago.format(tweet.created_at)}</span>
  <section class="tweet-icons">
  <i class="fa-solid fa-flag"></i>
  <i class="fa-solid fa-retweet"></i>
  <i class="fa-solid fa-heart"></i>
  </section>
  </footer>
  </article>`);

    return $tweet;

  };

  $('form').submit(async (event) => {
    event.preventDefault();

    await
      $.ajax("/tweets/", {
        method: "POST",
        url: "/tweets/",
        data: $('#form-section').serialize()
      });
  });

  const loadTweets = function() {
    $.ajax('/tweets', {
      method: "GET",
      dataType: "JSON",
      success: tweets => renderTweets(tweets),
      error: (data, text, error) => console.error("There is an error", error)
    });

  };

  loadTweets();

});

