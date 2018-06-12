var _soundsList = [
  {
    id: 1,
    author: 'California Wind',
    name: 'New like rock.',
    img: 'musics/img/greenday_l.jpg',
    sound: 'musics/california_wind.mp3'
  }, {
    id: 2,
    author: 'Must Be a Duck',
    name: 'New like rock.',
    img: 'musics/img/let-s-rock.jpg',
    sound: 'musics/Must_Be_a_Duck.mp3'
  }, {
    id: 3,
    author: 'Shoelace',
    name: 'New like rock.',
    img: 'musics/img/photos.jpg',
    sound: 'musics/Shoelace.mp3'
  }
];

// sounds API
var soundsAPI = new Promise(function (resolve, reject) {
  resolve(_soundsList);
  reject(new Error('Some error message....'));
});

function SoundsList() {
  this.audioPlayer = document.querySelector('#audioPlayer');
  this.controlBtn = document.querySelector('.fm-control-btn');
  this.currentAudio = null;
  this.isPlay = false;

  this._getSoundsList();
}

SoundsList.prototype._getSoundsList = function () {
  soundsAPI.then(
    function (data) {
      this._createList(data)
    }.bind(this),
    function (err) { err.message }
  );
}

SoundsList.prototype._createList = function (list) {
  list.forEach(function (item) {
    document.querySelector('.fm-sounds-list')
      .insertAdjacentHTML('beforeend', this._createTemplate(item));
  }.bind(this));

  this._addEventInSoundCard();
}

SoundsList.prototype._createTemplate = function (item) {
  return `
      <div class="fm-sound-card"
        data-sound="${item.sound}"
        style="
          background-image: url('${item.img}');
        ">
        <div class="fm-sound-card-content">
          <h4 class="fm-sound-card-title">${item.author}</h4>
          <p class="fm-sound-card-description">${item.name}</p>
        </div>
      </div>
    `;
}

SoundsList.prototype._addEventInSoundCard = function () {
  document.querySelectorAll('.fm-sound-card').forEach(
    function (item) {
      item.addEventListener('click', function (e) {
        this._playSounds(e)
      }.bind(this));
    }.bind(this)
  );
}

SoundsList.prototype._playSounds = function (e) {
  var el = e.target;

  while (true) {
    if (el.dataset.sound || el == document.body) break;
    el = el.parentElement;
  }

  if (this.currentAudio == el) {
    if (this.isPlay) {
      this.isPlay = false;
      this.audioPlayer.pause();
      controlBtnState.call(this, 'pause');
    } else {
      this.isPlay = true;
      this.audioPlayer.play();
      controlBtnState.call(this, 'play');
    }
  } else {
    this.isPlay = true;
    this.currentAudio = el;
    this.audioPlayer.src = el.dataset.sound;
    this.audioPlayer.play();
    controlBtnState.call(this, 'play');
  }

  function controlBtnState(state) {
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

}

window.onload = function () {
  var soundsList = new SoundsList();
};