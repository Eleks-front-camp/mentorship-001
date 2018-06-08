// sounds API
var soundsAPI = (function () {
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

  return new Promise(function (resolve, reject) {
    resolve(_soundsList);
    reject(new Error('Some error message....'));
  });
  
})();