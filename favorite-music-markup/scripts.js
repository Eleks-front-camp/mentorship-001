function SoundsList(_player) {
  this.player = _player;

  this._getSoundsList();
}

// get souns with soundsAPI
SoundsList.prototype._getSoundsList = function () {
  soundsAPI.then(
    function (data) {
      soundsData = data ? JSON.parse(data) : [];
      this._createList(soundsData);
    }.bind(this),
    function (err) { err.message; }
  );
}

// create the sounds list and add in DOM.
SoundsList.prototype._createList = function (list) {
  if (!list) return;

  list.forEach(function (item) {
    document.querySelector('.fm-sounds-list')
      .insertAdjacentHTML('beforeend', this._createTemplate(item));
  }.bind(this));

  if (this.player) {
    this.player.addEventInSoundCard();
    this.player.isFirstSoundCard(list);
  }
}

// create the sound template
SoundsList.prototype._createTemplate = function (item) {
  return '<div class="fm-sound-card"' +
    'data-id="' + item.id + '" style="background-image: url(' + item.img + ')">' +
    '<div class="fm-sound-card-content">' +
    '<h4 class="fm-sound-card-title">' + item.author + '</h4>' +
    '<p class="fm-sound-card-description">' + item.name + '</p>' +
    '</div>' +
    '</div>';
}

function Player() {
  this.audioPlayer = document.querySelector('#audioPlayer');
  this.controlBtn = document.querySelector('.fm-control-btn');
  this.songBand = document.querySelector('.fm-song-band');
  this.songName = document.querySelector('.fm-song-name');
  this.progressBar = document.querySelector('#fm-progress-bar');
  this.audio = {
    previous: null,
    current: null,
    next: null
  };
  this.isPlay = false;

  this._audioPlayerEvents();
}

// add events for player elements
Player.prototype._audioPlayerEvents = function () {
  this.audioPlayer.addEventListener('ended', function () {
    this._pause();
  }.bind(this));

  this.audioPlayer.addEventListener('timeupdate', function () {
    this._updateProgressBar();
  }.bind(this));

  this.progressBar.addEventListener('click', function (e) {
    this._moveProgresBar(e);
  }.bind(this));

  this.controlBtn.addEventListener('click', function () {
    this._togglePlayer();
  }.bind(this));
}

// update player progres bar
Player.prototype._updateProgressBar = function () {
  var percentage = 0;

  if (this.audioPlayer.duration) {
    percentage = (100 / this.audioPlayer.duration) * this.audioPlayer.currentTime;
  }

  this.progressBar.value = percentage;
};

// move progres bar and souds play time
Player.prototype._moveProgresBar = function (e) {
  if (this.audioPlayer.src) {
    var percent = e.offsetX / this.progressBar.offsetWidth;

    this.audioPlayer.currentTime = percent * this.audioPlayer.duration;
    e.target.value = Math.floor(percent / 100);
    e.target.innerHTML = this.progressBar.value;
  }
}

// add events for sounds cards
Player.prototype.addEventInSoundCard = function () {
  var cards = document.querySelectorAll('.fm-sound-card');

  cards.forEach(function (item) {
    item.addEventListener('click', function (e) { this._addSoundsInPlayer(e) }.bind(this));
  }.bind(this));
};

// add sounds in player
Player.prototype._addSoundsInPlayer = function (e) {
  var el = e.target,
    currentAudioData;

  while (true) {
    if (el.dataset.id || el == document.body) break;
    el = el.parentElement;
  }

  if (!el.dataset.id) return;

  currentAudioData = helper.getObjectById(soundsData, el.dataset.id);

  if (this.audio.current == currentAudioData) {
    this._togglePlayer();
    this.isPlayNew = false;
  } else {
    this._addDataInPlayer(currentAudioData);
    this._play();
  }
}

// toggle player, play/pause sounds 
Player.prototype._togglePlayer = function () {
  (this.isPlay) ? this._pause() : this._play();
}

// pause sounds
Player.prototype._pause = function () {
  this.isPlay = false;
  this.audioPlayer.pause();
  this._toggleControlBtn(false);
}

// play sounds
Player.prototype._play = function () {
  this.isPlay = true;
  this.audioPlayer.play();
  this._toggleControlBtn(true);
}

// toggle control button when play/pause sounds 
Player.prototype._toggleControlBtn = function (state) {
  (state)
    ? this.controlBtn.classList.add('pause')
    : this.controlBtn.classList.remove('pause');
}

// add first sounds in player
Player.prototype.isFirstSoundCard = function (data) {
  this._addDataInPlayer(data[0]);
}

// change data fir sounds in player
Player.prototype._addDataInPlayer = function (data) {
  this.audio.previous = this.audio.current;
  this.audio.current = data;
  this.audioPlayer.src = data.sound;
  this.songBand.textContent = data.author;
  this.songName.textContent = data.name;
}

window.onload = function () {
  var soundsData = [];

  var player = new Player();

  var soundsList = new SoundsList(player);
};