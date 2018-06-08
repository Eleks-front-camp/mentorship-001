function SoundsList(_player) {
  this.player = _player;

  this._getSoundsList();
}

SoundsList.prototype._getSoundsList = function () {
  soundsAPI.then(
    function (data) {
      this._createList(data);
      soundsData = data;
    }.bind(this),
    function (err) { err.message }
  );
}

SoundsList.prototype._createList = function (list) {
  list.forEach(function (item) {
    document.querySelector('.fm-sounds-list')
      .insertAdjacentHTML('beforeend', this._createTemplate(item));
  }.bind(this));

  this.player._addEventInSoundCard();
}

SoundsList.prototype._createTemplate = function (item) {
  return '<div class="fm-sound-card"'+
    'data-id="' + item.id + '"' +
    'style="background-image: url('+ item.img +');">'+
        '<div class="fm-sound-card-content">'+
          '<h4 class="fm-sound-card-title">' + item.author + '</h4>'+
          '<p class="fm-sound-card-description">' + item.name + '</p>'+
        '</div>'+
      '</div>';
}

function Player() {
  this.audioPlayer = document.querySelector('#audioPlayer');
  this.controlBtn = document.querySelector('.fm-control-btn');
  this.songBand = document.querySelector('.fm-song-band');
  this.songName = document.querySelector('.fm-song-name');
  this.progressBar = document.querySelector('#fm-progress-bar');
  this.currentAudio = null;
  this.isPlay = false;

  this._audioPlayerEvents();

  this.progressBar.addEventListener('click', function (e) {
    if (this.audioPlayer.src) {
      var percent = e.offsetX / this.progressBar.offsetWidth;

      this.audioPlayer.currentTime = percent * this.audioPlayer.duration;
      e.target.value = Math.floor(percent / 100);
      e.target.innerHTML = this.progressBar.value + '% played';
    }
  }.bind(this));
}

Player.prototype._audioPlayerEvents = function () {
  this.audioPlayer.addEventListener('ended', function () {
    this.pause();
  });

  this.audioPlayer.addEventListener('timeupdate', function () {
    this._updateProgressBar();
  }.bind(this));
}

Player.prototype._updateProgressBar = function () {
  var percentage = 0;

  if (this.audioPlayer.duration) {
    percentage = (100 / this.audioPlayer.duration) * this.audioPlayer.currentTime;
  }

  this.progressBar.value = percentage;
};

Player.prototype._addEventInSoundCard = function () {
  document.querySelectorAll('.fm-sound-card').forEach(
    function (item) {
      item.addEventListener('click', function (e) {
        this._playSounds(e);
      }.bind(this));
    }.bind(this)
  );
};

Player.prototype._playSounds = function (e) {
  var el = e.target,
    currentAudioData;

  while (true) {
    if (el.dataset.id || el == document.body) break;
    el = el.parentElement;
  }

  currentAudioData = helper.getObjectById(soundsData, el.dataset.id);

  if (this.currentAudio == currentAudioData) {
    if (this.isPlay) {
      this.isPlay = false;
      this.audioPlayer.pause();
      this._controlBtnState.call(this, 'pause');
    } else {
      this.isPlay = true;
      this.audioPlayer.play();
      this._controlBtnState.call(this, 'play');
    }
  } else {
    this.isPlay = true;
    this.currentAudio = currentAudioData;
    this.audioPlayer.src = currentAudioData.sound;
    this.audioPlayer.play();
    this._controlBtnState.call(this, 'play');
    this.songBand.textContent = currentAudioData.author;
    this.songName.textContent = currentAudioData.name;
  }

}

Player.prototype._controlBtnState = function (state) {
  switch (state.trim().toLowerCase()) {
    case 'play':
      this.controlBtn.classList.remove('fm-control-btn-play');
      this.controlBtn.classList.add('fm-control-btn-pause');
      break;
    case 'pause':
      this.controlBtn.classList.remove('fm-control-btn-pause');
      this.controlBtn.classList.add('fm-control-btn-play');
      break;
    default:
      break;
  }
};

window.onload = function () {
  var soundsData = [];

  var player = new Player();

  var soundsList = new SoundsList(player);
};