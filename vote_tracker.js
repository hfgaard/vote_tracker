$(function() {
  var firstPhoto, secondPhoto, photos = [];
  $first = $('#one');
  $second = $('#two');

  function Photo(id) {
    this.id = id;
    this.src = "src='cutestKittenContestants/" + this.id + ".jpg'";
    this.alt = "alt='Photo of a kitten'";
    this.totalVotes = Math.floor(Math.random() * 1500 + 1);
  }

  function Tracker() {
    this.vote = false;
    this.randomPhotos = function() {
      return Math.floor(Math.random() * 14);
    }
  }

  Tracker.prototype.displayPhotos = function() {
    this.firstPhoto = this.randomPhotos();
    this.secondPhoto = this.randomPhotos();
    while (this.firstPhoto == this.secondPhoto) {
      this.secondPhoto = this.randomPhotos();
    }

    $first.children().remove();
    $first.removeClass('vote');
    $second.children().remove();
    $second.removeClass('vote');
    $first.append('<img ' + photos[this.firstPhoto].src + ' ' + photos[this.firstPhoto].alt + ' />');
    $first.append('<p>Votes: <strong class="firstVotes">' + photos[this.firstPhoto].totalVotes + '</strong></p>');
    $second.append('<img ' + photos[this.secondPhoto].src + ' ' + photos[this.secondPhoto].alt + ' />');
    $second.append('<p>Votes: <strong class="secondVotes">' + photos[this.secondPhoto].totalVotes + '</strong></p>');
  }

  for (var i = 0; i < 14; i++) {
    photos.push(new Photo(i + 1));
  }

  var user = new Tracker();
  user.displayPhotos();

  $('#vs').on('click', function(e) {
    user.displayPhotos();
    user.vote = false;
  });

  $first.on('click', function(e) {
    if (user.vote === false) {
      $first.addClass('vote');
      photos[user.firstPhoto].totalVotes++;
      $('.firstVotes').replaceWith(photos[user.firstPhoto].totalVotes);
      user.vote = true;
    }
  });

  $second.on('click', function() {
    if (user.vote === false) {
      $second.addClass('vote');
      photos[user.secondPhoto].totalVotes++;
      $('.secondVotes').replaceWith(photos[user.secondPhoto].totalVotes);
      user.vote = true;
    }
  });
});
