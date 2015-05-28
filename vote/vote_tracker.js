$(function() {
  var images, info, imagesLength, photos = [];
  var user = new Tracker();
  $first = $('#one');
  $second = $('#two');

  $.ajax({
    url: "https://api.imgur.com/3/album/ElaLY.json",
    beforeSend: function(xhr) {
      xhr.setRequestHeader('Authorization', 'Client-ID 49d9ff4f5253c99');
    }
  })
    .done( function(info) {
      images = info.data.images;
      imagesLength = info.data.images_count;
      initialize();
      user.displayPhotos();
  })
    .fail( function() {
      $('button').addClass("hidden");
      $first.html("I'm sorry! The kittens are all napping at the moment. Please try again later!");
  });

  function Photo(url) {
    this.src = "src=" + url;
    this.alt = "alt='Photo of a kitten'";
    this.totalVotes = Math.floor(Math.random() * 1500 + 1);
  }

  function Tracker() {
    this.vote = false;
    this.randomPhotos = function() {
      return Math.floor(Math.random() * 14);
    };
  }
  
  var initialize = function() {
    for (var i = 0; i < imagesLength; i++) {
      photos.push(new Photo(images[i].link));
    }
  };

  Tracker.prototype.chooseRandomPhotos = function() {
    this.firstPhoto = this.randomPhotos();
    this.secondPhoto = this.randomPhotos();
    while (this.firstPhoto == this.secondPhoto) {
      this.secondPhoto = this.randomPhotos();
    }
  };

  Tracker.prototype.displayPhotos = function() {
    this.chooseRandomPhotos();
    $('section').children().remove();
    $('section').removeClass('vote');
    $first.append('<img ' + photos[this.firstPhoto].src + ' ' + photos[this.firstPhoto].alt + ' />');
    $first.append('<p>Votes: <strong class="firstVotes">' + photos[this.firstPhoto].totalVotes + '</strong></p>');
    $second.append('<img ' + photos[this.secondPhoto].src + ' ' + photos[this.secondPhoto].alt + ' />');
    $second.append('<p>Votes: <strong class="secondVotes">' + photos[this.secondPhoto].totalVotes + '</strong></p>');
  };

  $('#vs').on('click', function(e) {
    e.preventDefault();
    user.displayPhotos();
    user.vote = false;
  });

  $('section').on('click', function(e) {
    e.preventDefault();
    var $currentVote = ($(this).attr('id') == 'one') ? $first : $second;
    var currentPhoto = ($(this).attr('id') == 'one') ? user.firstPhoto : user.secondPhoto;
    var $totalVotes =  ($(this).attr('id') == 'one') ? $('.firstVotes') : $('.secondVotes');
    if (!user.vote) {
      $currentVote.addClass('vote');
      photos[currentPhoto].totalVotes++;
      $totalVotes.replaceWith(photos[currentPhoto].totalVotes);
      user.vote = true;
    }
  });
});
