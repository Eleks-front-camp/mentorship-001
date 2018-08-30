// sounds API
var soundsAPI = (function () {
  return new Promise(function (resolve, reject) {
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.open('GET', '/api/soundsList');

    xmlhttp.onload = function () {
      if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        resolve(xmlhttp.responseText);
      } else {
        reject(new Error('Some error message....'));
      }
    }
    xmlhttp.send();
  });
})();