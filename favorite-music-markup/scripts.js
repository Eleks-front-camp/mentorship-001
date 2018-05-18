const _soundsList = [
  {
    author: 'California Wind',
    name: 'New like rock.',
    img: 'musics/img/greenday_l.jpg',
    sound: 'musics/california_wind.mp3'
  }
];

const soundsAPI = new Promise((resolve, reject) => {
  resolve(_soundsList);
});

class SoundsList {
  constructor() {
    this.audioPlayer = document.querySelector('#audioPlayer');
    this.controlBtn = document.querySelector('.fm-control-btn');
    this.currentAudio;

    this._getSoundsList();
  }

  _getSoundsList() {
    soundsAPI.then(
      data => this._createList(data)
    )
  }

  _createList(list) {
    list.forEach(item => {
      document.querySelector('.fm-sounds-list')
        .insertAdjacentHTML('afterbegin',
          `
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
        `
        );

      document.querySelector('.fm-sound-card')
        .addEventListener('click', (e) => this._playSounds(e));
    });
  }

  _playSounds(e) {
    if (this.currentAudio == e.target) {
      this.currentAudio = undefined;
      this.audioPlayer.pause();
      this.controlBtn.classList.remove('fm-control-btn-pause');
      this.controlBtn.classList.add('fm-control-btn-play');
    } else {
      this.currentAudio = e.target;
      this.audioPlayer.src = e.target.dataset.sound;
      this.audioPlayer.play();
      this.controlBtn.classList.remove('fm-control-btn-play');
      this.controlBtn.classList.add('fm-control-btn-pause');
    }
  }
}

window.onload = function () {
  let soundsList = new SoundsList();
};